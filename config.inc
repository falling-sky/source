#! /bin/echo used by build.pl

# NOTE

# You can create "config.inc.local" to override anything you see here.
# For mirror sites, this might make tracking test-ipv6.com's code easier.


use strict;

$COMPRESS{"js"} =  "uglifyjs  [INPUT] -o [OUTPUT] -c --warnings=false   --source-map [INPUT].map --stats -b ";
$COMPRESS{"css"} =  "cssmin < [INPUT] > [OUTPUT]";
$COMPRESS{"html"} = "tidy -quiet -indent -asxhtml -utf8 -w 120 --show-warnings false < [INPUT] > [OUTPUT]";

$INSTALL = "work";
chomp($VARS->{"hostname"} = `hostname`);

#  # Stop running yuicompressor, harder to debug
#  # Warning: Much larger bandwidth requirements.
$COMPRESS{"js"} = "cat < [INPUT] > [OUTPUT]"; 
$COMPRESS{"css"} = "cat < [INPUT] > [OUTPUT]";


1;
