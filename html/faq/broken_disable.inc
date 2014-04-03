<p><b>[% " Disabling or Deprioritizing your IPv6 address " | i18n %]</b></p>


<div class="os_windows">

  <p>
[% "
  <b>To disable IPv6 entirely, until your ISP offers IPv6 to you:</b> see <b>Microsoft's 
  \"fixit\" site</b> that gives clear instructions. We advocate considering 
  \"Use IPv4 instead of IPv6 in prefix policies\", instead of completely 
  disabling IPv6. Specific Windows features depend on IPv6 being enabled. 
" | i18n %]
</p>

  <ul>
    <li><a href="http://support.microsoft.com/kb/929852">Vista, Win7, Win2008 "fixit"</a></li>
  </ul>
  


  <p>[% " To completely disable IPv6 (Windows 7, Vista; XP should be similiar): " | i18n %]</p>

  <ul>
    <li>[% " Go to the start menu " | i18n %]</li>

    <li>[% " Go to the control panel " | i18n %]</li>

    <li>[% " Go to \"Network and Internet\" " | i18n %]</li>

    <li>[% " Go to \"View network status and tasks\" " | i18n %]</li>

    <li>[% " Go to \"Change adapter settings\". " | i18n %]</li>

    <li>[% " Go to your main Internet connection, double click " | i18n %]</li>

    <li>[% " Go to \"Properties\" " | i18n %]</li>

    <li>[% " Uncheck \"Internet Protocol Version 6\" " | i18n %]</li>

    <li>[% " Hit \"ok\" " | i18n %]</li>

    <li>[% " Shutdown/reboot. " | i18n %]</li>
  </ul>
  
  <p>[% " To disable IPv6 in Windows XP: " | i18n %]</p>
  
  <ul>
    <li>[% "Taken from: " | i18n %] <a href="http://support.microsoft.com/kb/2478747">http://support.microsoft.com/kb/2478747</a></li>
    <li>[% "Make sure you are logged in as an Administrator. " | i18n %]</li>
    <li>[% "Click Start, click All Programs, click Accessories, and then click Command Prompt. " | i18n %]</li>
    <li>[% "At the command prompt, type: netsh int ipv6 uninstall and press the Enter key on your keyboard. " | i18n %]</li>
    <li>[% "Close the Command Prompt window and restart the computer. " | i18n %]</li>
  </ul>
  
  <p><em>[% " Other Windows based OS's: Send jfesler@test-ipv6.com detailed instructions; and I'll add them to the site. " | i18n %]</em></p>
</div>


<div class="os_osx">
  <p><b>[% " OS X users " | i18n %]</b></p>
  
  <p>[% " Before disabling IPv6, please be sure you are running the latest OS version.  In particular, OS X 10.6.7 has several workarounds for being \"Broken\".  This may solve your problems without resorting to completely disabling IPv6. " | i18n %]</p>



    <ul>
    <li>[% " How to disable IPv6 " | i18n %]</li>

    <li style="list-style: none; display: inline">
      <ul>
        <li>[% " Go to the \"Apple\" menu (top left corner) " | i18n %]</li>

        <li>[% " Go to System Preferences " | i18n %]</li>

        <li>[% " Go to Network " | i18n %]</li>

        <li>[% " Click on your primary network (green icon) if you have more than one work. " | i18n %]</li>

        <li>[% " Go to \"Advanced\" " | i18n %]</li>

        <li>[% " Disable IPv6 " | i18n %]</li>

        <li>[% " Apply changes " | i18n %]</li>
      </ul>
    </ul>
    
</div>

<div class="os_ios">
  <p><b>[% " iPhone and iPad users " | i18n %]</b></p>
  <p>[% " IPv6 is not configurable on the iPhone or iPad.   Your only option is to switch to another network. " | i18n %]</p>
</div>


<div class="os_linux">
  <p><b>[% " Linux users: " | i18n %]</b></p>

    <ul>
    <li>[% " How to disable IPv6 " | i18n %]</li>

    <li style="list-style: none; display: inline">
      <ul>
        <li>[% " This is very distribution-specific. Do a web search using your favorite search engine. " | i18n %]</li>

        <li>[% " Example web search: <code>disable ipv6 on centos</code> " | i18n %]</li>
      </ul>
    </li>
  </ul>
</div>

<div class="os_other">
  <p><b>[% " Generic unix instructions, to temporarily remove your IPv6 address. " | i18n %]</b></p>

  <ul>
    <li><code>ifconfig eth0 inet6 [% " IP_ADDRESS " | i18n %] remove</code></li>

    <li>[% " Be aware that if the router re-advertises it, you will relearn the default route. " | i18n %]</li>

    <li>[% " You can do a web search for your particular OS distribution. Example search would be <code>disable ipv6 on freebsd</code>. " | i18n %]</li>
  </ul>
</div>
