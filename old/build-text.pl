#! /usr/bin/perl -w

use YAML::Syck;
use JSON;
use strict;
use Cwd;
use FindBin qw($Bin);
use Getopt::Long;
use IO::File;
use Encode;
use strict;

chdir $Bin or die "Could not chdir $Bin : $!";

my $lang = shift @ARGV;
die "Usage: $0 lang    (ie en-us, en-pl)\n" unless ($lang);

build_lang("en-us",$lang);


sub build_lang {
  my($source,$local) = @_;
  my $source_file = "text/text.$source";
  my $local_file = "text/text.$local";
  my $sref;
  my $lref;
  eval { $sref = LoadFile($source_file);};
  die "$@ while reading $source_file\n" if ($@);
  
    eval {$lref = LoadFile($local_file);};
    die "$@ while reading $local_file\n" if ($@);
  
  foreach my $key1 (sort keys %{$sref}) {
    foreach my $key2 (sort keys %{$sref->{$key1}}) {
      my $val = $sref->{$key1}->{$key2};
      if (! exists $lref->{$key1}) {
        $lref->{$key1} = {};
        warn "$local\: missing $key1\n";
      }
      elsif (! exists $lref->{$key1}->{$key2}) {
        $lref->{$key1}->{$key2}=$val;
        warn "$local\: missing $key1 -> $key2\n";
      }
    }
  }
  
  
  my $json = new JSON;
  my $pretty_printed = $json->canonical(1)->pretty->encode($lref);
  
  
  my $jsfile = IO::File->new(">js/text-generated/text.$local") or die "failed to create js/text-generated/text.$local";
  
  print $jsfile "/* Text messages generated for: $local */\n";
  print $jsfile "/* Used by \$gt(a,b) */\n";
  print $jsfile "/* Input file used: [falling-sky]/source/$local_file */\n";
  print $jsfile "GIGO.gettext_messages = ";
  print $jsfile $pretty_printed;
  print $jsfile ";\n";
  close $jsfile;
  
}


