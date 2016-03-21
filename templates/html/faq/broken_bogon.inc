<p><b>{{ Bad or Inappropriate IPv6 Addresses (Bogons) }}</b>:
{{ If you IPv6 address starts with any of these, your router needs to be upgraded. }}</p>

<table summary=ipv6_bogons border=1>
    <tr>
        <td valign=top><p><b>fc</b>xx: or <b>fd</b>xx:</p></td>
        <td valign=top>
            <p><a href="#" onclick="return help_page('faq_avm.html','AVM')">AVM FritzBox</a> - {{ disable ULA. }}</p>
            <p>{{ Other routers: Try updating the firmware.  If that fails, look for and disable "ULA" or "Unique Local Addressing". }}</p>
            <p>{{ If that fails, disable IPv6 entirely on the router. }}</p>
        </td>
    </tr>
    <tr>
        <td valign=top><p><b>2002:0A</b>xx: {{ or }} <b>2002:A</b>xx:<br/>
            <b>2002:AC1</b>x:<br/>
            <b>2002:C0A8:</b></br>
            <b>2002:644</b>x:</br>
            <b>2002:645</b>x:</br>
            <b>2002:646</b>x:</br>
            <b>2002:647</b>x:</br>
            </p>
            
            </td>
        <td valign=top><p>{{ This is a router using 6to4, but using a private IPv4 address.  This will never work. }}</p>
            <p>{{ Apple routers: Update to the latest firmware; that has been corrected. }}</p>
            <p>{{ Other routers: Try updating the firmware.  If that fails, look for and disable "6to4" or any form of automatic IPv6 tunnel. }}</p>
            <p>{{ If that fails, disable IPv6 entirely on the router.}}</p>
        </td>
    </tr>
    <tr>
        <td valign=top>
            <p><b>2001:db8:</b></p>
        </td>
        <td valign=top>
            <p>{{ This router is using the official "Documentation" prefix - which is not routable on the IPv6 Internet. }}</p>
            <p>Cisco E2000, E3000, E4200: {{ Update to the latest firmware. }}</p>
            <p>{{ Other routers: Try updating the firmware. }}</p>
            <p>{{ If that fails, disable IPv6 entirely on the router. }}</p>
        </td>
    </tr>
    <tr>
        <td valign=top><p><b>2005:123:456:789:</b></p></td>
        <td valign=top>
            <p>WRVS4400N routers: {{ Disable IPv6. }}</p>
            <p>{{ Other routers: Try updating the firmware. }}</p>
            <p>{{ If that fails, disable IPv6 entirely on the router. }}</p>
        </td>
    </tr>
</table>

            
    
