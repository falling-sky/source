#! /usr/bin/perl

use YAML::Syck;
use JSON::XS;
use utf8;
use Encode;

open( FILE, "<sites.yaml" );
binmode FILE, ":utf8";
my $yaml;
read FILE, $yaml, 1000000;
close FILE;

my $ref = Load($yaml) or die "Failed to parse sites.yaml";

foreach my $key ( keys %$ref ) {
    if ( $ref->{$key}{hide} ) {
        delete $ref->{$key};
    } else {
        fixup( $key, $ref->{$key} );
    }
}

open( FILE, ">../js/sites_parsed.js" );

#binmode FILE, ":utf8";
print FILE "GIGO.sites_parsed=";
print FILE JSON::XS->new->pretty(1)->canonical(1)->encode($ref);
print FILE ";";
close FILE;

open( FILE, ">../js/sites_parsed_raw.js" );

#binmode FILE, ":utf8";
print FILE JSON::XS->new->pretty(1)->canonical(1)->encode($ref);
close FILE;

open( FILE, ">../js/sites_parsed_raw.yaml" );

#binmode FILE, ":utf8";
print FILE Dump($ref);
close FILE;

sub fixup {
    my $key  = shift;
    my $href = shift;
    $href->{"site"} ||= $key;
    $href->{"v4"} = "http://" . $href->{v4} unless ( $href->{v4} =~ m#https?://# );
    $href->{"v6"} = "http://" . $href->{v6} unless ( $href->{v6} =~ m#https?://# );
}

