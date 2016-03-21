<p><b>{{ Disabling or Deprioritizing your IPv6 address }}</b></p>


<div class="os_windows">

  <p>
{{
  <b>To disable IPv6 entirely, until your ISP offers IPv6 to you:</b> see <b>Microsoft's 
  "fixit" site</b> that gives clear instructions. We advocate considering 
  "Use IPv4 instead of IPv6 in prefix policies", instead of completely 
  disabling IPv6. Specific Windows features depend on IPv6 being enabled. 
}}
</p>

  <ul>
    <li><a href="http://support.microsoft.com/kb/929852">Vista, Win7, Win2008 "fixit"</a></li>
  </ul>
  


  <p>{{ To completely disable IPv6 (Windows 7, Vista; XP should be similiar): }}</p>

  <ul>
    <li>{{ Go to the start menu }}</li>

    <li>{{ Go to the control panel }}</li>

    <li>{{ Go to "Network and Internet" }}</li>

    <li>{{ Go to "View network status and tasks" }}</li>

    <li>{{ Go to "Change adapter settings". }}</li>

    <li>{{ Go to your main Internet connection, double click }}</li>

    <li>{{ Go to "Properties" }}</li>

    <li>{{ Uncheck "Internet Protocol Version 6" }}</li>

    <li>{{ Hit "ok" }}</li>

    <li>{{ Shutdown/reboot. }}</li>
  </ul>
  
  <p>{{ To disable IPv6 in Windows XP: }}</p>
  
  <ul>
    <li>{{Taken from: }} <a href="http://support.microsoft.com/kb/2478747">http://support.microsoft.com/kb/2478747</a></li>
    <li>{{Make sure you are logged in as an Administrator. }}</li>
    <li>{{Click Start, click All Programs, click Accessories, and then click Command Prompt. }}</li>
    <li>{{At the command prompt, type: netsh int ipv6 uninstall and press the Enter key on your keyboard. }}</li>
    <li>{{Close the Command Prompt window and restart the computer. }}</li>
  </ul>
  
  <p><em>{{ Other Windows based OS's: Send jfesler@test-ipv6.com detailed instructions; and I'll add them to the site. }}</em></p>
</div>


<div class="os_osx">
  <p><b>{{ OS X users }}</b></p>
  
  <p>{{ Before disabling IPv6, please be sure you are running the latest OS version.  In particular, OS X 10.6.7 has several workarounds for being "Broken".  This may solve your problems without resorting to completely disabling IPv6. }}</p>



    <ul>
    <li>{{ How to disable IPv6 }}</li>

    <li style="list-style: none; display: inline">
      <ul>
        <li>{{ Go to the "Apple" menu (top left corner) }}</li>

        <li>{{ Go to System Preferences }}</li>

        <li>{{ Go to Network }}</li>

        <li>{{ Click on your primary network (green icon) if you have more than one work. }}</li>

        <li>{{ Go to "Advanced" }}</li>

        <li>{{ Disable IPv6 }}</li>

        <li>{{ Apply changes }}</li>
      </ul>
    </ul>
    
</div>

<div class="os_ios">
  <p><b>{{ iPhone and iPad users }}</b></p>
  <p>{{ IPv6 is not configurable on the iPhone or iPad.   Your only option is to switch to another network. }}</p>
</div>


<div class="os_linux">
  <p><b>{{ Linux users: }}</b></p>

    <ul>
    <li>{{ How to disable IPv6 }}</li>

    <li style="list-style: none; display: inline">
      <ul>
        <li>{{ This is very distribution-specific. Do a web search using your favorite search engine. }}</li>

        <li>{{ Example web search: <code>disable ipv6 on centos</code> }}</li>
      </ul>
    </li>
  </ul>
</div>

<div class="os_other">
  <p><b>{{ Generic unix instructions, to temporarily remove your IPv6 address. }}</b></p>

  <ul>
    <li><code>ifconfig eth0 inet6 {{ IP_ADDRESS }} remove</code></li>

    <li>{{ Be aware that if the router re-advertises it, you will relearn the default route. }}</li>

    <li>{{ You can do a web search for your particular OS distribution. Example search would be <code>disable ipv6 on freebsd</code>. }}</li>
  </ul>
</div>
