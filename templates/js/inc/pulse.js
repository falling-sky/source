/* We will pulse specific CSS elements, 
cycling through colors ranging from yellow to white */

GIGO.pulse_background_speed = 250;
GIGO.pulse_background_colors_function = function () {
 if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // dark mode
  return [
   "#3b3528",
   "#59503c",
   "#786c50",
   "#968150",
   "#968150",
   "#786c50",
   "#59503c",
   "#3b3528"];
 } else {
  return  [
   "#fffeee",
   "#fffeee",
   "#fffddd",
   "#fffccc",
   "#fffaaa",
   "#ffe6aa",
   "#fffaaa",
   "#fffccc",
   "#fffddd",
   "#fffeee",
   "#fffeee"];
 }
}


GIGO.pulse_background_colors = GIGO.pulse_background_colors_function();

// On change, refresh the colors.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
 GIGO.pulse_background_colors = GIGO.pulse_background_colors_function();
});

GIGO.pulse_on = function () {
 var n = GIGO.pulse_background_colors.shift();
 GIGO.pulse_background_colors.push(n);
 jQuery(".help_popup").css("background-color",n);
 jQuery("#comments_faq_link").css("background-color",n);
 setTimeout( function() {
    GIGO.pulse_on();
 }, GIGO.pulse_background_speed);   
}
