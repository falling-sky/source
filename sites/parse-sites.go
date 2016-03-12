package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"sync"
)

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

func CheckHTTP(url string) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	_, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	ct := resp.Header.Get("Content-Type")
	if ct == "" {
		return fmt.Errorf("%s: No Content-Type in response", url)
	}
	ctl := strings.ToLower(ct)
	if ctl == "image/gif" ||
		ctl == "image/jpg" ||
		ctl == "image/jpeg" ||
		ctl == "image/png" {
		return nil
	}
	return fmt.Errorf("%s: Bad Content-Type: %s", url, ct)

}

// CheckHTTP checks if a given URL is good or not;
// and if not good, marks  SiteRecord.Hide=1
func (sr *SiteRecord) CheckHTTP(wg *sync.WaitGroup) {
	defer wg.Done()
	if err4 := CheckHTTP(sr.V4); err4 != nil {
		sr.Reason = err4.Error()
		log.Println(sr.Reason)
		return
	}
	if err6 := CheckHTTP(sr.V6); err6 != nil {
		sr.Reason = err6.Error()
		log.Println(sr.Reason)
		return
	}
}

// CheckHTTP against the entire SitesFile
func (sf *SitesFile) CheckHTTP() {
	wg := &sync.WaitGroup{}

	for _, sr := range sf.Sites {
		if sr.Hide == "0" {
			wg.Add(1)
			go sr.CheckHTTP(wg)
		}
	}
	wg.Wait()
}

func fixFakeBoolean(s string) string {
	if s == "" || s == "0" || s[0:0] == "f" {
		return "0"
	}
	return "1"
}

func main() {
	sf, err := ReadSitesFile("sites.json")
	if err != nil {
		log.Fatal(err)
	}
	sf.FixDefaults()
	sf.CheckHTTP()
	sf.Print()

}
