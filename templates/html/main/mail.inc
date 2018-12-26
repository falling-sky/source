<!--START mail.inc -->

  <div id="comments" style="display:block">

    <div id="comments_wanted" style="display:none">
      <p>{{<b>Your particular configuration is of interest.</b> We are always striving to make the test-ipv6.com code better.  Would you be willing to contribute more information about your browser and computer setup? With your help, we can document for others how to repair their systems.}}</p>
    </div>

    <div id="comments_unwanted" style="display:block">
      <p>{{This form will let you leave a comment, voice concerns, or ask questions.  Your test results will be included automatically.}}
      {{This includes your IP address, which is shared with the site administrator in order to answer your questions.}}
      {{Use of this form implies consent.}}
      </p>
    </div>

    <div id="comments_faq" style="display:none">
      <p>{{<span id="comments_faq_link"></span> (FAQ) page is available for <b>your</b> exact set of results.  Please read it  before leaving comments; many questions have already been answered.  If you still have questions, comments, or concerns, feel free to use this form.}}</p>
    </div>



    <div>

      <p>{{If reporting a problem with the test, or requesting help with your results, please fill out all requested information to the best of your ability.  If leaving general comments, use your best judgement on how much to report.}}</p>

      <p class="subtle">{{Thanks,}}<br/><a mailto=site.mailto href="-"><span lookup=site.contact>-</span> &lt;<span lookup=site.mailto>-</span>&gt;</a></p>

    </div>

    <div>
      <form id="commentform" action="/comment.php" method="post" enctype="multipart/form-data" name="commentform"  onsubmit="return GIGO.validate_form(this)" >





        <input type="hidden" name="form_tab_main" value="" />
        <input type="hidden" name="form_config" value="" />
        <input type="hidden" name="form_results" value="" />
        <input type="hidden" name="form_replay" value="" />
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
              <b>{{Purpose for comment}}</b>:
            </td><td>

            <select id="purpose" name="purpose" onchange="return GIGO.onchange_purpose(this)">
<option value="-">{{Purpose for comment}}</option>
<option value="questions">{{Questions about test results}}</option>
<option value="bug">{{Report a bug with diagnosis or this web site}}</option>
<option value="isp">{{Report problem about slow internet service with your provider}}
<option value="hacked">{{Hacked phone or computer}}
<option value="hacked">{{Being watched by spouse, hackers, mafia, government}}
<option value="gfw">{{Problems with IPv6 in China}}
<option value="suggestion">{{Suggestion}}</option>
<option value="cheersjeers">{{Cheers or Jeers}}</option>
</select>
</td>
          </tr>

</table>



<div id="response_isp" class="nomail"   style="display:none">
<p>{{
Problems relating to your Internet service, should be sent to your Internet Service Provider.
Please contact them for support.}}</p>
</div>

<div id="response_hacked" class="nomail"  style="display:none">
<p>{{
This web site is not a tool for security or forensic analysis.
If you have security concerns, please find a security professional
to consult with.  They can offer investigation and education 
that is appropriately matched to your concerns.
}}</p>
</div>

<div id="response_gfw" class="nomail" style="display:none">
<p>{{
  This web site is subject to the policies 
  and technology limitations of the "Great Wall" for the Internet.
  Because of these limitations, this web site is not reliable 
  for viewing from inside China.
}}</p>
</div>




        <table summary="contact form" id="contact_form" style="display:none">

          <tr>
            <td>&nbsp;</td>
          </tr>

          <tr>
            <td>&nbsp;</td>
          </tr>

          <tr>
            <td>{{Email address if you'll permit me to contact you.  <i>Required, if you wish a response.</i>}}</td>
          </tr>

          <tr>
            <td><input type="text" name="contact" /></td>
          </tr>


          <tr>
            <td>{{Any information you think I might find useful (what router you're using, or a firewall in the way, or type of proxy you use, etc). This includes general feedback.}}</td>
          </tr>

          <tr>
            <td>
            <textarea name="notes" rows="8" cols="80">
</textarea></td>
          </tr>

          <tr>
            <td>
              <div id="help_plugins" style="display:none">
                {{The javascript based test appears to have failed.  This may be browser plugin or extension related. Please indicate what browser plugins and extenions you have enabled in this browser.}}
              </div>

              <div id="help_generic" style="display:none">
                {{If you are technically minded please cut/paste the output of the following commands:}}
                <br/>
                <code>netstat -nr</code><br/>
                <code>ifconfig -a</code><br/>
                {{Copy the output from those commands, into the box below. This will help me confirm/deny any theories relating to your question.}}
              </div>

              <div id="help_linux" style="display:none">
                {{If you are technically minded please cut/paste the output of the following commands:}}
                <br/>
                <code>ip -f inet6 route show</code> <br/>
                <code>ip -f inet6 addr</code> <br/>
                {{Copy the output from those commands, into the box below. This will help me confirm/deny any theories relating to your question.}}
              </div>

              <div id="help_windows" style="display:none">
                {{If you are technically minded, please open a "Command Prompt" or "cmd" window, and run these three commands:}}
		<br/>
                <code>  ipconfig /all</code><br/>
                <code>  netsh interface ipv6 show teredo</code><br/>
                <code>  netsh interface ipv6 show route</code><br/>
                {{Copy the output from those commands, into the box below. This will help me confirm/deny any theories relating to your question.}}
              </div>



            </td>
          </tr>

          <tr>
            <td>
            <textarea name="comments" rows="10" cols="80">
</textarea></td>
          </tr>

          <tr><td>
            <table><tr><td valign=top>
              <input type="checkbox" id="consent" name="consent" value="given">
            </td><td td valign=top class="subtle">
               {{
                 I consent to sharing my IP address(es),
               test results, web browser name and version, operating system name and version,
               and any other information entered above (including email address), as
               email transmitted to
               <a mailto=site.mailto href="-"><span lookup=site.contact></span> &lt;<span lookup=site.mailto></span>&gt;</a>;
               and that this information may be translated by Google Translate.
             }}
             </td></tr></table>
          </td></tr>


          <tr>
            <td><input type="submit" value="{{Send results}}" /></td>
          </tr>
        </table>
      </form>
    </div>
  </div>

<!-- STOP mail.inc -->
