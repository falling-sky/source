package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"sync"
)

var input = flag.String("input", "sites.json", "json file to read")
var parsed = flag.String("parsed", "../templates/js/sites_parsed.js", "GIGO.sites_parsed= js file to write for falling-sky")
var raw = flag.String("raw", "../templates/js/sites_parsed_raw.js", "js file to write for other automation")

// SiteRecord describes a single mirror or "Other Sites" record
type SiteRecord struct {
	Site     string `json:"site"`     // What site name to publicly attribute
	Mirror   bool   `json:"mirror"`   // if true, site is a full mirror; if false, just "OtherSites"
	Hide     bool   `json:"hide"`     // If true, stop sending traffic here
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
	}

	return nil
}

// CheckHTTP checks if a given URL is good or not;
// and if not good, marks  SiteRecord.Hide=1
func (sr *SiteRecord) CheckVersion(wg *sync.WaitGroup) {
	// Mark the goroutine as done on function exit
	defer wg.Done()
	url := "http://" + sr.Site + "/version.html"

	// Start the fetch
	resp, err := http.Get(url)
	if err != nil {
		log.Printf("error: %s: %s\n", url, err)
		return
	}
	defer resp.Body.Close()

	// Finish the fetch
	content, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("error: %s: %s\n", url, err)
	}
	s := string(content)
	re := regexp.MustCompile(`Revision: (\S+)`)
	m := re.FindStringSubmatch(s)
	if len(m) > 0 {
		log.Printf("%s: %s\n", url, m[1])
	} else {
		log.Printf("%s: unknown\n", url)
	}

	//	fmt.Println(string(content))

}

// CheckHTTP against the entire SitesFile
func (sf *SitesFile) CheckVersion() {
	// Each site, we will spin off as a goroutine.
	// When we do so, we need to track their finish.
	wg := &sync.WaitGroup{}

	for _, sr := range sf.Sites {
		if sr.Hide == false {
			if sr.Mirror == true {
				wg.Add(1)
				go sr.CheckVersion(wg)
			}
		}
	}
	wg.Wait()
}

func main() {
	flag.Parse()
	sf, err := ReadSitesFile(*input)
	if err != nil {
		log.Fatal(err)
	}
	sf.FixDefaults()
	sf.CheckVersion()

}
