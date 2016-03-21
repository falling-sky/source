<div class="tabbox_outside">
[% $page := "index" %]
[% PROCESS "main/tabnav.inc" %]

  <div class="tabbox_middle">
    <div class="tabbox_inside" id="tabbox_inside">
      <div id="tab_main" style="display:block">
        <div id="tab_main_inside">
        [% PROCESS "main/tab_main.inc" %]
        </div>
      </div>
      <div id="tab_tests" style="display:none">
        <div id="tab_tests_simple" style="display:block">
          [% PROCESS "main/tab_tests.inc" %]
        </div>
        <div id="tab_tests_tech" style="display:none">
          [% PROCESS "main/tab_tech.inc" %]
        </div>
      </div>
      <div id="tab_mail" style="display:none">
        [% PROCESS "main/tab_mail.inc" %]
      </div>
      
      <div id="tab_helpdesk" style="display:none">
        [% PROCESS "main/tab_helpdesk.inc" %]
      </div>
      <!-- Hide these until needed -->
      <div id="tab_faq" style="display:none">
      </div>
      <div id="tab_popup" style="display:none">
      </div>
      
      
      <div id="tab_debug" style="display:none">
        [% PROCESS "main/tab_debug.inc" %]
      </div>

      <div id="tab_sites" style="display:none">
        [% PROCESS "main/tab_other_sites.inc" %]
      </div>
   

    </div>
  </div>
</div>

