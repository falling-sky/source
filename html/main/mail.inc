<!--START mail.inc -->

  <div id="comments" style="display:block">

    <div id="comments_wanted" style="display:none">
      <p>[% "<b>Your particular configuration is of interest.</b> We are always striving to make the test-ipv6.com code better.  Would you be willing to contribute more information about your browser and computer setup? With your help, we can document for others how to repair their systems." | i18n %]</p>
    </div>

    <div id="comments_unwanted" style="display:block">
      <p>[% "This form will let you leave a comment, voice concerns, or ask questions.  Your test results will be included automatically." | i18n %]
      [% "This includes your IP address, which is shared with the site administrator in order to answer your questions." | i18n %]
      [% "Use of this form implies consent." | i18n %]      
      </p>
    </div>
    
    <div id="comments_faq" style="display:none">
      <p>[% "<span id=\"comments_faq_link\"></span> (FAQ) page is available for <b>your</b> exact set of results.  Please read it  before leaving comments; many questions have already been answered.  If you still have questions, comments, or concerns, feel freel to use this form." | i18n %]</p>
    </div>
    
   [% PROCESS "main/mail-language.inc" %]


    <div>

      <p>[% "If reporting a problem with the test, or requesting help with your results, please fill out all requested information to the best of your ability.  If leaving general comments, use your best judgement on how much to report." | i18n %]</p>

      <p class="subtle">[% "Thanks," | i18n %]<br/><a mailto=site.mailto href="-"><span lookup=site.contact>-</span> &lt;<span lookup=site.mailto>-</span>&gt;</a></p>

    </div>

    <div>
      <form id="commentform" action="/comment.php" method="post" enctype="multipart/form-data" name="commentform" onsubmit="return GIGO.validate_form(this)" >

        <input type="hidden" name="form_tab_main" value="" />
        <input type="hidden" name="form_config" value="" />
        <input type="hidden" name="form_results" value="" />
        <input type="hidden" name="a" value="" /> 
        <input type="hidden" name="aaaa" value="" /> 
        <input type="hidden" name="ds4" value="" /> 
        <input type="hidden" name="ds6" value="" /> 
        <input type="hidden" name="ipv4" value="" />
        <input type="hidden" name="ipv6" value="" />
        <input type="hidden" name="v6mtu" value="" />
        <input type="hidden" name="v6ns" value="" />
        <input type="hidden" name="ip4" value="" />
        <input type="hidden" name="ip6" value="" /> 
        <input type="hidden" name="dsmtu" value="" />
        <input type="hidden" name="ip6subtype" value="" /> 
        <input type="hidden" name="tokens" value= "" /> 
        <input type="hidden" name="score_transition" value="" /> 
        <input type="hidden" name="score_strict" value="" /> 
        <input type="hidden" name="nobots" value="" />
	<input type="hidden" name="subdomain" />


<table summary="enable comment form">
          <tr>
            <td>
              <b>[% "Purpose for comment" | i18n %]</b>:
            </td><td>
           
            <select name="purpose" onchange='jQuery("#contact_form").show();'>
<option value="-">[% "Purpose for comment" | i18n %]</option>
<option value="questions">[% "Questions about test results" | i18n %]</option>
<option value="bug">[% "Report a bug with diagnosis" | i18n %]</option>
<option value="suggestion">[% "Suggestion" | i18n %]</option>
<option value="cheersjeers">[% "Cheers or Jeers" | i18n %]</option>
</select>
</td>
          </tr>

</table>



        <table summary="contact form" id="contact_form" style="display:none">




          <tr>
            <td>&nbsp;</td>
          </tr>

          <tr>
            <td>[% "Email address if you'll permit me to contact you.  <i>Required, if you wish a response.</i>" | i18n %]</td>
          </tr>

          <tr>
            <td><input type="text" name="contact" /></td>
          </tr>


          <tr>
            <td>[% "Any information you think I might find useful (what router you're using, or a firewall in the way, or type of proxy you use, etc). This includes general feedback." | i18n %]</td>
          </tr>

          <tr>
            <td>
            <textarea name="notes" rows="8" cols="80">
</textarea></td>
          </tr>

          <tr>
            <td>
              <div id="help_plugins" style="display:none">
                [% "The javascript based test appears to have failed.  This may be browser plugin or extension related. Please indicate what browser plugins and extenions you have enabled in this browser." | i18n %]
              </div>

              <div id="help_generic" style="display:none">
                [% "If you are technically minded please cut/paste the output of the following commands:" | i18n %]
                <br/>
                <code>netstat -nr</code><br/>
                <code>ifconfig -a</code><br/>
                [% "Copy the output from those commands, into the box below. This will help me confirm/deny any theories relating to your question." | i18n %]
              </div>

              <div id="help_linux" style="display:none">
                [% "If you are technically minded please cut/paste the output of the following commands:" | i18n %]
                <br/>
                <code>ip -f inet6 route show</code> <br/>
                <code>ip -f inet6 addr</code> <br/>
                [% "Copy the output from those commands, into the box below. This will help me confirm/deny any theories relating to your question." | i18n %]
              </div>

              <div id="help_windows" style="display:none">
                [% "If you are technically minded, please open a \"Command Prompt\" or \"cmd\" window, and run these three commands:" | i18n %]
		<br/>
                <code>  ipconfig /all</code><br/>
                <code>  netsh interface ipv6 show teredo</code><br/>
                <code>  netsh interface ipv6 show route</code><br/>
                [% "Copy the output from those commands, into the box below. This will help me confirm/deny any theories relating to your question." | i18n %]
              </div>

 

            </td>
          </tr>

          <tr>
            <td>
            <textarea name="comments" rows="10" cols="80">
</textarea></td>
          </tr>

          <tr>
            <td><input type="submit" value="[% "Send results" | i18n %]" /></td>
          </tr>
        </table>
      </form>
    </div>
  </div>

<!-- STOP mail.inc -->
