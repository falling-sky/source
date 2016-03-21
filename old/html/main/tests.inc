<!-- START tests.inc -->


<div>
  <p><b>[% "How this test works:" | i18n %]</b> [% "Your browser will be instructed to reach a series of URLs. The combination of successes and failures tells a story about how ready you are for when publishers start offering their web sites on IPv6." | i18n %]</p>
  <p>[% "Click to see" | i18n %] 
   <a href="#" class="tabbutton_xxx" onclick='return GIGO.tabnav_tests("tech")'>[% "Technical Info" | i18n %]</a>
  </p>
<hr/>
</div>


    <table cellpadding="3" border="0" summary="tests run, and pass/fail">
      <tr>
        <td nowrap="nowrap">[% "Test with IPv4 DNS record" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_a">
            [% "pending" | i18n %]
          </div>
        </td>

      </tr>

      <tr>
        <td nowrap="nowrap">[% "Test with IPv6 DNS record" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_aaaa">
            [% "pending" | i18n %]
          </div>
        </td>

      </tr>

      <tr>
        <td nowrap="nowrap">[% "Test with Dual Stack DNS record" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_ds">
            [% "pending" | i18n %]
          </div>
        </td>

      </tr>

      <tr>
        <td nowrap="nowrap">[% "Test for Dual Stack DNS and large packet" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_dsmtu">
            [% "pending" | i18n %]
          </div>
        </td>

      </tr>

      <tr>
        <td nowrap="nowrap">[% "Test IPv4 without DNS" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_ipv4">
            [% "pending" | i18n %]
          </div>
        </td>

      </tr>

      <tr>
        <td nowrap="nowrap">[% "Test IPv6 without DNS" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_ipv6">
            [% "pending" | i18n %]
          </div>
        </td>

      </tr>

      <tr>
        <td nowrap="nowrap">[% "Test IPv6 large packet" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_v6mtu">
            [% "pending" | i18n %]
          </div>
        </td>

      </tr>


      <tr>
        <td nowrap="nowrap">[% "Test if your ISP's DNS server uses IPv6" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_v6ns">
            [% "pending" | i18n %]
          </div>
        </td>

      </tr>


      <tr>
        <td nowrap="nowrap">[% "Find IPv4 Service Provider" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_asn4">
            [% "pending" | i18n %]
          </div>
        </td>

      </tr>

      <tr>
        <td nowrap="nowrap">[% "Find IPv6 Service Provider" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_asn6">
            [% "pending" | i18n %]
          </div>
        </td>

      </tr>






      <tr class="optional_buggydns1" style="display:none">
        <td nowrap="nowrap">[% "Test for buggy DNS" | i18n %]</td>

        <td nowrap="nowrap">&nbsp;</td>

        <td nowrap="nowrap">
          <div id="sum_test_buggydns1">
            [% "pending" | i18n %]
          </div>
        </td>
      </tr>

    </table>

<div><p>
  [% "Click to see" | i18n %]
  <a href="#" class="tabbutton_mail"  onclick='return GIGO.tabnav("mail")'>[% "Share Results / Contact" | i18n %]</a></p></div>


<!-- STOP tests.inc -->
