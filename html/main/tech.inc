<!-- START tech.inc -->


<div>
  <p><b>[% "How this test works:" | i18n %]</b> [% "Your browser will be instructed to reach a series of URLs. The combination of successes and failures tells a story about how ready you are for when publishers start offering their web sites on IPv6." | i18n %]</p>
  <p>[% "Click to see" | i18n %] 
     <a href="#" class="tabbutton_xxx" onclick='return GIGO.tabnav_tests("simple")'>[% "Tests Run" | i18n %]</a>
  </p>
<hr/>
</div>


    <table cellpadding="3" border="0" summary=
    "technical details showing ipv6 browser test">
      <tr>
        <td nowrap="nowrap">

          <div>
             [% "Test with IPv4 DNS record" | i18n %]
          </div>

          <div id="test_a">
            [% "pending" | i18n %]
          </div>

          <div id="results_a">
            -
          </div>
        </td>

        <td>
          <div id="detail_a">
            [% "Fetches an object that has just an A record in DNS.  This is expected to use IPv4. IPv6-only users might still reach this, if their provider has employed a NAT64/DNS64 or proxy solution." | i18n %]
          </div>
        </td>
      </tr>

      <tr>
        <td nowrap="nowrap">
          <div>
            [% "Test with IPv6 DNS record" | i18n %]
          </div>

          <div id="test_aaaa">
            [% "pending" | i18n %]
          </div>

          <div id="results_aaaa">
            -
          </div>
        </td>

        <td>
          <div id="detail_aaaa">
            [% "Fetches an object that has just an AAAA record in DNS. This is expected to use IPv6. Users not yet on the IPv6 Internet are likely to see this fail. As long as it fails quickly, it will be OK - for now." | i18n %]
          </div>
        </td>
      </tr>


      <tr>
        <td nowrap="nowrap">
          <div>
            [% "Test with Dual Stack DNS record" | i18n %]
          </div>

          <div id="test_ds">
            [% "pending" | i18n %]
          </div>

          <div id="results_ds">
            -
          </div>
        </td>

        <td>
          <div id="detail_ds">
            <div>[% "This is the most important test. This verifies your browser can connect to a site that has both IPv4 and IPv6 records published.  IPv4 only hosts should  connect fine (using IPv4)." | i18n %]</div>
            <p><b>[% "If this test fails or times out, you can expect major problems as publishers start offering their sites on IPv6." | i18n %]</b></p>
          </div>
        </td>
      </tr>


      <tr>
        <td nowrap="nowrap">
          <div>
             [% "Test for Dual Stack DNS and large packet" | i18n %]
          </div>

          <div id="test_dsmtu">
            [% "pending" | i18n %]
          </div>

          <div id="results_dsmtu">
            -
          </div>
        </td>

        <td>
          <div id="detail_dsmtu">
            [% "Validates that you can connect to a dual-stack server (like the ds test); and that you can send/receive large packets on that connection.  If this test times out for any reason, it indicates trouble for World IPv6 Day." | i18n %]
          </div>
        </td>
      </tr>





      <tr>
        <td nowrap="nowrap">
          <div>
             [% "Test IPv4 without DNS" | i18n %]
          </div>

          <div id="test_ipv4">
            [% "pending" | i18n %]
          </div>

          <div id="results_ipv4">
            -
          </div>
        </td>

        <td>
          <div id="detail_ipv4">
            [% "This will try connecting with a literal IPv4 numeric address. This should work for most people, unless they are running IPv6-only. If the first test worked, but this fails, it likely confirms your provider is using NAT64/DNS64; you'll need to only try connecting using hostnames instead of numeric IP addresses." | i18n %]
          </div>
        </td>
      </tr>

      <tr>
        <td nowrap="nowrap">
          <div>
            [% "Test IPv6 without DNS" | i18n %]
          </div>

          <div id="test_ipv6">
            [% "pending" | i18n %]
          </div>

          <div id="results_ipv6">
            -
          </div>
        </td>

        <td>
          <div id="detail_ipv6">
            [% "This will try connecting with a literal IPv6 hexadecimal address. The primary purpose of this test is to separate out your connectivity on IPv6 from your ability to fetch DNS for it.  A secondary purpose is to see if you have Teredo enabled; some systems may only use Teredo when an IPv6 address is in the URL." | i18n %]
          </div>
        </td>
      </tr>

      <tr>
        <td nowrap="nowrap">
          <div>
            [% "Test IPv6 large packet" | i18n %]
          </div>

          <div id="test_v6mtu">
            [% "pending" | i18n %]
          </div>

          <div id="results_v6mtu">
            -
          </div>
        </td>

        <td>
          <div id="detail_v6mtu">
            [% "Validates that IPv6 requests with large packets work. If this test times out, but other IPv6 tests work, it suggests that there may be PMTUD issues; possibly involving IP tunnels." | i18n %]
          </div>
        </td>
      </tr>

      <tr>
        <td nowrap="nowrap">
          <div>
             [% "Test if your ISP's DNS server uses IPv6" | i18n %]
          </div>

          <div id="test_v6ns">
            [% "pending" | i18n %]
          </div>

          <div id="results_v6ns">
            -
          </div>
          <div>
           [% "(This is bonus credit)" | i18n %]
          </div>
        </td>

        <td>
          <div id="detail_v6ns">
            [% "This is a test of your ISP's resolver (instead of a test of your host). If this test passes, your DNS server (often run by your ISP)  is capable of reaching IPV6-only DNS authoritative servers on the Internet.  This is not critical (at this time) for you to reach sites via IPv6." | i18n %]
          </div>
        </td>
      </tr>


      <tr>
        <td nowrap="nowrap">
          <div>
             [% "Find IPv4 Service Provider" | i18n %]
          </div>

          <div id="test_asn4">
            [% "pending" | i18n %]
          </div>

          <div id="results_asn4">
            -
          </div>
        </td>

        <td>
          <div id="detail_asn4">
            [% "Attempts to identify what Internet Service Provider you use for IPv4.  This may be different from the marketing name you see in your local market; or may reflect a previous company name.  The name shown reflects how it is known in the network operator community." | i18n %]
          </div>
        </td>
      </tr>


      <tr>
        <td nowrap="nowrap">
          <div>
             [% "Find IPv6 Service Provider" | i18n %]
          </div>

          <div id="test_asn6">
            [% "pending" | i18n %]
          </div>

          <div id="results_asn6">
            -
          </div>
        </td>

        <td>
          <div id="detail_asn6">
            [% "Attempts to identify what Internet Service Provider you use for IPv6.  When the IPv4 name and the IPv6 name don't match, it may suggest that you're using a tunnel; or some form of third party provider for IPv6." | i18n %]
          </div>
        </td>
      </tr>





      <tr class="optional_buggydns1" style="display:none">
        <td nowrap="nowrap">
          <div>
            [% "Test for buggy DNS" | i18n %]
          </div>

          <div id="test_buggydns1">
            [% "pending" | i18n %]
          </div>

          <div id="results_buggydns1">
            -
          </div>
        </td>

        <td>
          <div id="detail_buggydns1">
            [% "Queries for a malformed AAAA record. Some routers mishandle these as \"A\" records, and only keep the first 32 bits.  We want this test to fail to connect." | i18n %]
          </div>
        </td>
      </tr>
      
      
    </table>

  <div id="tech_eof"></div>

<div>

  <hr/>
  <p> [% "If the summary results indicated problems, you (or your technical support) may be able to use the information above to diagnose the issues. Each of the test urls and their results is shown on the left side. To the right you'll see a description of what that URL was designed to test." | i18n %]</p>
  <p> [% "After each test is ran. The summary page attempts to look at the results If the summary doesn't seem to make sense given the symptoms recorded above, or if you need further assistance, please feel free to contact us." | i18n %]</p>

</div>

<div><p>
  [% "Click to see" | i18n %]
  <a href="#" class="tabbutton_mail"  onclick='return GIGO.tabnav("mail")'>[% "Share Results / Contact" | i18n %]</a></p></div>

<!-- STOP tech.inc -->
