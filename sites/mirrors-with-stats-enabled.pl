#!/usr/bin/perl

use JSON::Syck;
use YAML::Syck;
use LWP::Simple qw(get);
use strict;

open FILE,"<sites.json" or die "failed to open sites.json: $!";
my $buffer;
{
 local $/ = "";
 $buffer = <FILE>;
 }
my $ref = JSON::Syck::Load($buffer);
#print Dump($ref);


my $siteref = $ref->{sites} or die;

my @sites = sort keys %$siteref;
foreach my $site (@sites) {
  my $href = $siteref->{$site};
  next unless ($href->{mirror});
  next if ($href->{hide});
  my $url = "http://$site/site/config.js";
  my $got = get($url);
  my ($matched) = $got =~ m#"show_stats"#msg;
  next unless ($matched);
  print "$url\t$href->{monitor}\n";

}
