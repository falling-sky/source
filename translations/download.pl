#! /usr/bin/perl

use YAML::Syck;
use LWP::Simple;

my $config = LoadFile("crowdin.yaml");

my $pid = $config->{"project_identifier"};
my $key = $config->{"api_key"};
my $base = $config->{"base_path"};
my $EXPORT = "https://api.crowdin.net/api/project/${pid}/export?key=${key}";
my $DOWNLOAD = "https://api.crowdin.net/api/project/${pid}/download/all.zip?key=${key}";


die unless (is_success(getprint($EXPORT)));

my $rc = (mirror($DOWNLOAD,"all.zip"));
if ($rc == RC_NOT_MODIFIED) {
  print "Nothing to do!\n";
  exit;
} else {
  print "rc $rc\n";
  system("rm -fr dl && mkdir dl && cd dl && unzip ../all.zip");
}


