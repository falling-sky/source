#! /usr/bin/perl

use strict;
use DateTime::Locale;
use JSON::XS;

binmode STDOUT, ":utf8";

my %hash;

my @ids = DateTime::Locale->ids();


foreach my $id (@ids) {
    my $loc = DateTime::Locale->load($id);
    $hash{$id} = $loc->native_language;
}

my $coder = JSON::XS->new->ascii(0)->pretty->allow_nonref->canonical(1);
my  $pretty_printed_unencoded = $coder->encode (\%hash);
$pretty_printed_unencoded =~ s/\n$/;\n/;

print "// GIGO.locale_names derived from perl's DateTime::Locale data.\n";
print "// As such this data is covered by the Perl Artistic License.\n";
print  "GIGO.locale_names=";

print $pretty_printed_unencoded;
