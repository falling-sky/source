package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"
)

var input = flag.String("input", "sites.json", "json file to read")
var parsed = flag.String("parsed", "../js/sites_parsed.js", "GIGO.sites_parsed= js file to write for falling-sky")
var raw = flag.String("raw", "../js/sites_parsed_raw.js", "js file to write for other automation")

// SiteRecord describes a single mirror or "Other Sites" record
type SiteRecord struct {
	Mirror   string `json:"mirror"`   // 1=mirror   0="Other Sites"
	Site     string `json:"site"`     // What site name to publicly attribute
	Hide     string `json:"hide"`     // If set to anything other than "" or "0", hide the record.
	V4       string `json:"v4"`       // IPv4 test URL  (http or https)
	V6       string `json:"v6"`       // IPv6 test URL (http or https)
	Loc      string `json:"loc"`      // Country where the site is located
	Provider string `json:"provider"` // What provider to publicly attribute
	Monitor  string `json:"monitor"`  // Who to notify on error
	Reason   string `json:"reason"`   // Reason disabled
}

// SitesMap is a series of site records, keyed by site name
type SitesMap map[string]*SiteRecord

// SitesFile is a container, containing a SitesMap
// This works around the problems with Go unmarshalling to a top level map
type SitesFile struct {
	Sites SitesMap `json:"sites"`
}

// ReadSitesFile reads from disk
func ReadSitesFile(fn string) (*SitesFile, error) {
	var sf SitesFile

	b, err := ioutil.ReadFile(fn)
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(b, &sf)
	if err != nil {
		return nil, err
	}

	return &sf, nil
}

func (sm *SitesMap) WriteJS(fn string, prefix string, suffix string) error {
	if fn == "" {
		return nil
	}
	s := prefix + sm.String() + suffix
	b := []byte(s)
	err := ioutil.WriteFile(fn+".new", b, 0755)
	if err != nil {
		return err
	}
	err = os.Rename(fn+".new", fn)
	return err
}

// Bytes returns formatted data
func (sf *SitesFile) Bytes() ([]byte, error) {
	b, err := json.MarshalIndent(sf, "", " ")
	if err != nil {
		log.Fatal(err)
	}
	return b, err
}

// String returns formatted data
func (sf *SitesFile) String() string {
	b, err := sf.Bytes()
	if err != nil {
		log.Fatal(err)
	}
	return string(b)
}

// Bytes returns formatted data
func (sm *SitesMap) Bytes() ([]byte, error) {
	b, err := json.MarshalIndent(sm, "", " ")
	if err != nil {
		log.Fatal(err)
	}
	return b, err
}

// String returns formatted data
func (sm *SitesMap) String() string {
	b, err := sm.Bytes()
	if err != nil {
		log.Fatal(err)
	}
	return string(b)
}

// Print the sites file to stdout
func (sf *SitesFile) Print() {
	fmt.Println(sf.String())
}

// FixDefaults Scans the records and fixes any missing info,
// canonicalizes 1/0 values.
func (sf *SitesFile) FixDefaults() error {
	for key, sr := range sf.Sites {

		// Make sure the "site" is filled out (same as the key)
		if sr.Site == "" {
			sr.Site = key
		}
		// Canonicalize true/false/empty/etc as "1" and "0" strings
		sr.Hide = fixFakeBoolean(sr.Hide)
		sr.Mirror = fixFakeBoolean(sr.Mirror)
	}

	return nil
}

func (sf *SitesFile) DeleteHidden() error {
	for key, sr := range sf.Sites {
		if sr.Hide == "1" {
			delete(sf.Sites, key)
		}
	}
	return nil
}

func CheckHTTP(url string) error {

	// Complain about slow urls
	t0 := time.Now()
	defer func() {
		t1 := time.Now()
		td := t1.Sub(t0)
		if td > (time.Second * time.Duration(5)) {
			log.Printf("Slow! %s %s\n", td, url)
		}
	}()

	// Start the fetch
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Finish the fetch
	_, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	// Check the content type
	ct := resp.Header.Get("Content-Type")
	if ct == "" {
		return fmt.Errorf("%s: No Content-Type in response", url)
	}
	ctl := strings.ToLower(ct)

	// If we like the content type, return success
	if ctl == "image/gif" ||
		ctl == "image/jpg" ||
		ctl == "image/jpeg" ||
		ctl == "image/png" {
		return nil
	}

	// Otherwise complain
	return fmt.Errorf("%s: Bad Content-Type: %s", url, ct)

}

// CheckHTTP checks if a given URL is good or not;
// and if not good, marks  SiteRecord.Hide=1
func (sr *SiteRecord) CheckHTTP(wg *sync.WaitGroup) {
	// Mark the goroutine as done on function exit
	defer wg.Done()

	// Try IPv4 then IPv6.
	// Don't do these in parallel with each other;
	// we don't want to deal with lock issues
	// on sr.Reason .  So, do them in serial.
	if err4 := CheckHTTP(sr.V4); err4 != nil {
		sr.Reason = err4.Error()
		sr.Hide = "1"
		log.Println(sr.Reason)
		return
	}
	if err6 := CheckHTTP(sr.V6); err6 != nil {
		sr.Reason = err6.Error()
		sr.Hide = "1"
		log.Println(sr.Reason)
		return
	}
}

// CheckHTTP against the entire SitesFile
func (sf *SitesFile) CheckHTTP() {
	// Each site, we will spin off as a goroutine.
	// When we do so, we need to track their finish.
	wg := &sync.WaitGroup{}

	for _, sr := range sf.Sites {
		if sr.Hide == "0" {
			wg.Add(1)
			go sr.CheckHTTP(wg)
		}
	}
	wg.Wait()
}

// fixFakeBoolean takes the various types of strings that represent
// true and false, and forces them to 0 and 1.  This is mostly legacy.
// This can perhaps be cahnged - but I don't want to change falling-sky
// javascript code (yet).
func fixFakeBoolean(s string) string {
	if s == "" || s == "0" || s[0:0] == "f" {
		return "0"
	}
	return "1"
}

func main() {
	flag.Parse()
	sf, err := ReadSitesFile(*input)
	if err != nil {
		log.Fatal(err)
	}
	sf.FixDefaults()
	sf.CheckHTTP()

	sf.DeleteHidden()

	err = sf.Sites.WriteJS(*parsed, "GIGO.sites_parsed=", ";")
	if err != nil {
		log.Fatal(err)
	}
	err = sf.Sites.WriteJS(*raw, "", "")
	if err != nil {
		log.Fatal(err)
	}

}
