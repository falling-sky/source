
<!-- Start of "simple dual stack test" by Jason Fesler <jfesler@gigo.com>, January 2011. -->
<!-- Feel free to use the simple test on your own site, so long as you change the image urls.
     Note JavaScript requires jQuery to be loaded.  If JavaScript is missing,
     this page gracefully degrades (broken images instead of red box images).

     If you fail to change the image urls to your own resources, I reserve the right
     to entertain myself and your viewers with http referer hacks.
-->


  <p>{{ The following table will try and load 3 images. }}</p>

<table summary="{{ test images for ipv4, dual stack, and ipv6 }}">

<tr><th>{{ Pass? }}</th><th>{{ Method }}</th><th>{{ More Info }}</th></tr>


<tr>
<td><img  style="height: 2em; width: auto;" src="http://ipv4.test-ipv6.com/images/hires_ok.png" alt="?"/></td>
<td><b>IPv4</b></td>
<td>
{{ IPv4.  Basic traditional Internet.}}
</td></tr>

<tr>
<td><img style="height: 2em; width: auto;" src="http://ds.test-ipv6.com/images/hires_ok.png" alt="?"/></td>
<td><b>IPv4 or IPv6</b></td>
<td>
{{ If green, you will have no problem on World IPv6 day. }}<br/>
{{ If this fails, seek help from your IT department, helpdesk, or ISP tech support. }}<br/>
{{ If this fails, consider using the <a href="/">full test</a>,
with IE, Firefox, Safari, or Chrome, to get more detailed information about possible failure reasons.
 }}
</td></tr>

<tr>
<td><img  style="height: 2em; width: auto;"  src="http://ipv6.test-ipv6.com/images/hires_ok.png" alt="?"/></td>
<td><b>IPv6</b></td>
<td>
{{ <i>If red or blank, do not stress!</i>  Few people already have IPv6 at
this time; and it is not critical for 2011 but will be for the
coming years.
 }}
</td></tr>


</table>


<script type="text/javascript" src="/index.js"></script>
<script type="text/javascript">
// If JavaScript was found, jQuery should be here.
// And if that is the case, we can change the broken
// images, to the red "X" icon to provide visual
// consistency.  IF this function does not actually
// run, it is perhaps still OK.
// Only operate on images where alt="?", to limit scope.
function ChangeToRed () {
    $('img').each(function() {
        if((typeof this.naturalWidth != "undefined" &&
            this.naturalWidth == 0 )
            || this.readyState == 'uninitialized' ) {
                if ($(this).attr("alt") === "?") {
                    $(this).attr('src', '/images/hires_bad.png');
                    $(this).attr('alt','red');
                }
        } else {
            if ($(this).attr("alt") === "?") {
                $(this).attr('alt','green');
            }
        }
    });
};

jQuery(document).ready(function () {
  $(window).bind('load', ChangeToRed);
  setTimeout(ChangeToRed, 10000);
});
</script>

<!-- end of simple dual stack test -->

<p><i>{{ A standalone copy of this test can be found <a href="/simple_test.html">here</a>.}}</i></p>
