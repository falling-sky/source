/* We will pulse specific CSS elements, 
cycling through colors ranging from yellow to white */

GIGO.pulse_background_speed = 250;
GIGO.pulse_background_colors = [
"#fffeee",
"#fffeee",
"#fffddd",
"#fffccc",
"#fffbbb",
'#fffbbb',
"#fffccc",
"#fffddd",
"#fffeee",
"#fffeee"];


GIGO.pulse_on = function () {
 var n = GIGO.pulse_background_colors.shift();
 GIGO.pulse_background_colors.push(n);
 jQuery(".help_popup").css("background-color",n);
 jQuery("#comments_faq_link").css("background-color",n);
 setTimeout( function() {
    GIGO.pulse_on();
 }, GIGO.pulse_background_speed);   
}