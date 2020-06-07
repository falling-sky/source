package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"
)

var input = flag.String("input", "sites.json", "json file to read")
var parsed = flag.String("parsed", "../templates/js/sites_parsed.js", "GIGO.sites_parsed= js file to write for falling-sky")
var raw = flag.String("raw", "../templates/js/sites_parsed_raw.js", "js file to write for other automation")
var validator = flag.String("validator", "http://validator.test-ipv6.com/v0/CheckMirror/Check", "use this validator api")
var slow = flag.Duration("slow", time.Second*12, "time to consider a lookup 'slow'") // TODO Make this slow check per-url?
var minimumCount = flag.Int("minimum", 0, "Minimum number of sites that must answer, else fail")
var skipValidation = flag.Bool("skip-validation",false,"skip validation, just write file")

// SiteRecord describes a single mirror or "Other Sites" record
type SiteRecord struct {
	Site        string `json:"site"`        // What site name to publicly attribute
	Mirror      bool   `json:"mirror"`      // if true, site is a full mirror; if false, just "OtherSites"
	Hide        bool   `json:"hide"`        // If true, stop sending traffic here
	V4          string `json:"v4"`          // IPv4 test URL  (http or https)
	V6          string `json:"v6"`          // IPv6 test URL (http or https)
	Loc         string `json:"loc"`         // Country where the site is located
	Provider    string `json:"provider"`    // What provider to publicly attribute
	Monitor     string `json:"monitor"`     // Who to notify on error (automation)
	Contact     string `json:"contact"`     // Who to notify on error (human)
	Reason      string `json:"reason"`      // Reason disabled
	Transparent bool   `json:"transparent"` // Whether or not the site is a transparent mirror
}

// SitesMap is a series of site records, keyed by site name
type SitesMap map[string]*SiteRecord

// SitesFile is a container, containing a SitesMap
// This works around the problems with Go unmarshalling to a top level map
type SitesFile struct {
	Sites SitesMap `json:"sites"`
}

// Synced from validator service

// CheckMirrorRequest descripts what users can ask of us
type CheckMirrorRequest struct {
	Mirror       string   `json:"mirror"`               // mirror name sent on Start
	Transparent  bool     `json:"transparent"`          // Do transparent checks too
	Session      string   `json:"session"`              // Created on Start; sent back on followups
	ResourceV4   string   `json:"resource_v4"`          // IF not a mirror.. do a resource check. resource_v4 and resource_v6
	ResourceV6   string   `json:"resource_v6"`          // IF not a mirror.. do a resource check. resource_v4 and resource_v6
	TestNames    []string `json:"test_names,omitempty"` // What names do you want?
	WantMarkdown bool     `json:"want_markdown"`
}

// CheckMirrorResponse describes what we give back to the API consumer
type CheckMirrorResponse struct {
	Mirror  string                 `json:"mirror,omitempty"`  // mirror name sent on Start
	Session string                 `json:"session,omitempty"` // Created on Start; sent back on followups
	Status  map[string]*StatusType `json:"status,omitempty"`
	Details map[string]*DetailType `json:"details,omitempty"`
	Done    bool                   `json:"done"`  // If true, stop polling.
	Error   string                 `json:"error"` // Any error we want displayed
}

// StatusType gives the short version of what's going on with all tests.
// Whenever asked, we'll give the dump of this.
// Worst case: 50 tests times 100 bytes? = 5k
type StatusType struct {
	TestName    string   `json:"test_name"`
	Hide        bool     `json:"hide"`        // Not sure that need this yet
	Description string   `json:"description"` // 1-liner
	Status      string   `json:"status"`      // OK BAD WARNING SKIPPED
	DependsOn   []string `json:"depends_on"`  // List of things that (if bad) should half-hide this
}

// DetailType provides details of specific tests
type DetailType struct {
	TestName     string   `json:"test_name"`
	Hide         bool     `json:"hide"`          // Not sure that need this yet
	Description  string   `json:"description"`   // 1-liner
	Status       string   `json:"status"`        // OK BAD WARNING SKIPPED
	DependsOn    []string `json:"depends_on"`    // List of things that (if bad) should half-hide this
	Expected     string   `json:"expected"`      // What we expected when checking
	ExpectedHTML string   `json:"expected_html"` // Expected, rendered
	Found        string   `json:"found"`         // What we found when checking
	FoundHTML    string   `json:"found_html"`    // found, rendered
	Help         string   `json:"help"`          // Big block of text for user
	HelpHTML     string   `json:"help_html"`     // Rendered help
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

func (sf *SitesFile) DeleteHidden() error {
	for key, sr := range sf.Sites {
		if sr.Hide {
			delete(sf.Sites, key)
		}
	}
	return nil
}
func (sf *SitesFile) CountRemaining() error {
	if *minimumCount < 1 {
		return nil
	}
	c := len(sf.Sites)
	if c < *minimumCount {
		return fmt.Errorf("Too few sites (%v) validated, wanted %v.  Fix errors or lower --minimum.", c, *minimumCount)
	}
	return nil
}

/* TimeoutDialer and NewTimeoutClient are from
   http://stackoverflow.com/a/16930649/2399725
   Thanks go to dmichael for sharing!
*/

func TimeoutDialer(cTimeout time.Duration, rwTimeout time.Duration) func(net, addr string) (c net.Conn, err error) {
	return func(netw, addr string) (net.Conn, error) {
		conn, err := net.DialTimeout(netw, addr, cTimeout)
		if err != nil {
			return nil, err
		}
		conn.SetDeadline(time.Now().Add(rwTimeout))
		return conn, nil
	}
}

func NewTimeoutClient(connectTimeout time.Duration, readWriteTimeout time.Duration) *http.Client {

	return &http.Client{
		Transport: &http.Transport{
			Dial: TimeoutDialer(connectTimeout, readWriteTimeout),
		},
	}
}

func (cmr CheckMirrorRequest) String() string {
	b, e := json.Marshal(cmr)
	if e == nil {
		return string(b)
	}
	return fmt.Sprintf("%#v", cmr)
}

func (i CheckMirrorResponse) String() string {
	b, e := json.Marshal(i)
	if e == nil {
		return string(b)
	}
	return fmt.Sprintf("%#v", i)
}

func (i StatusType) String() string {
	b, e := json.Marshal(i)
	if e == nil {
		return string(b)
	}
	return fmt.Sprintf("%#v", i)
}

func (i DetailType) String() string {
	b, e := json.Marshal(i)
	if e == nil {
		return string(b)
	}
	return fmt.Sprintf("%#v", i)
}

func (sr *SiteRecord) CheckVerifier(domain string, wg *sync.WaitGroup) (err error) {
	var jsonStr string
	defer wg.Done()
	defer func() {
		if err != nil {
			sr.Hide = true
			sr.Reason = err.Error()
			log.Printf("Dropping %s: %s\n", domain, sr.Reason)
			if jsonStr != "" {
				//	log.Print(jsonStr)
			}
		}
	}()

	cmr := CheckMirrorRequest{}

	if sr.Mirror {
		cmr.Mirror = domain
		cmr.Transparent = sr.Transparent
		protocol := "http"
		if strings.HasPrefix(sr.V4, "https") {
			protocol = "https"
		}
		// Force the V4 and V6 url to conform, but preseve any protocol they know.
		sr.V4 = fmt.Sprintf("%s://ipv4.%s/images-nc/knob_green.png", protocol, domain)
		sr.V6 = fmt.Sprintf("%s://ipv6.%s/images-nc/knob_green.png", protocol, domain)
	} else {
		cmr.ResourceV4 = sr.V4
		cmr.ResourceV6 = sr.V6
	}

	cmr.WantMarkdown = false

	jsonStr = cmr.String()
	//log.Print(payload)
	payloadBuf := bytes.NewBufferString(jsonStr)
	client := NewTimeoutClient(time.Second*40, time.Second*40)
	req, err := http.NewRequest("POST", *validator, payloadBuf)
	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	// Start the fetch
	defer resp.Body.Close()

	// Finish the fetch
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		//log.Printf("%s: %s after POST with: %s\n", *validator, resp.Status, jsonStr)
		return fmt.Errorf("%s after POST with: %s", resp.Status, jsonStr)
	}

	cmres := CheckMirrorResponse{}
	err = json.Unmarshal(body, &cmres)
	if err != nil {
		//	log.Printf("%s: decode error after POST with: %s\n", *validator, jsonStr)
		return fmt.Errorf("decode error after POST with: %s", jsonStr)
	}

	if cmres.Error != "" {
		return fmt.Errorf("%s", cmres.Error)
	}

	//log.Print(cmres.String())

	bad := []string{}
	for _, test := range cmres.Status {
		if test.Status != "OK" && test.Status != "SKIPPED" && test.Status != "WARNING" {
			log.Printf("%s %s %s %s\n", domain, test.TestName, test.Status, test.Description)
			bad = append(bad, test.TestName)
		}
	}
	if len(bad) > 0 {
		return fmt.Errorf("Bad: %s", strings.Join(bad, "; "))
	}
	return nil
}

// CheckHTTP against the entire SitesFile
func (sf *SitesFile) CheckHTTP() {
	// Each site, we will spin off as a goroutine.
	// When we do so, we need to track their finish.
	wg := &sync.WaitGroup{}

	for domain, sr := range sf.Sites {
		if sr.Hide == false {
			wg.Add(1)
			go sr.CheckVerifier(domain, wg)
			time.Sleep(1 * time.Second / 10)
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
	sf.FixDefaults()  // Fix the v4 and v6 test urls if blank
	sf.DeleteHidden() // First pass cleanup, stuff humans marked hide


	if !*skipValidation {
		log.Printf("Checking %v sites\n", len(sf.Sites))
		sf.CheckHTTP()    // Do active checks against the v4 and v6 test urls
		sf.DeleteHidden() // Second pass cleanup, stuff CheckHTTP marked hide
		log.Printf("After checking, %v sites remain\n", len(sf.Sites))
	}



	if err = sf.CountRemaining(); err != nil {
		log.Fatal(err)
	}

	err = sf.Sites.WriteJS(*parsed, "GIGO.sites_parsed=", ";")
	if err != nil {
		log.Fatal(err)
	}
	err = sf.Sites.WriteJS(*raw, "", "")
	if err != nil {
		log.Fatal(err)
	}

}
