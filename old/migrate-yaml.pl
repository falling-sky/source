#! /usr/bin/perl -w

package main;

use strict;
use Cwd;
use FindBin qw($Bin);
use lib "$Bin/perl";

use vars qw( @LANG %COMPRESS  $RUN_YUIC_JS $RUN_YUIC_CSS @PROCESS @PROCESS_APACHE $VARS $INSTALL  %mtime_cache);
use Getopt::Long;
use IO::File;
use Digest::MD5 qw(md5 md5_hex);
use POSIX qw(strftime);
use FSi18n::PO;
use FSi18n;
use FSi18n::MultipleRead;
use YAML::Syck;

use strict;

@LANG = qw( zh-cn en-us fr zh-cn cs  de hu-hu  nb-no sv pt-br ja-jp ru nl hr );

my $pot = new FSi18n( lang => "pot" );
$pot->filename("falling-sky-template.pot");
$pot->read_file() or die;

my $enus = LoadFile("text/text.en-us");

foreach my $lang (@LANG) {
    my $yamlname = "text/text.$lang";
    print "loading $yamlname\n";
    my $ref = LoadFile($yamlname);
    my $i18n = new FSi18n( locale => $lang );
    $i18n->add("",undef,$i18n->poheader);

    foreach my $x ( sort keys %{$ref} ) {
        foreach my $y ( sort keys %{ $ref->{$x} } ) {
            my $v = $ref->{$x}->{$y};
            if ( ref $v ) {
                $v = ${$v}[-1];
            }

            my $e = $enus->{$x}->{$y};
            if ( ref $e ) {
                $e = ${$e}[-1];
            }

            my $found = $pot->find($e);
#            $DB::single=1 if ($v ne $e);
            if (($found) && ($v ne $e)){
                $found->msgstr($v);
                my $context = $found->dequote( $found->msgctxt );
                $i18n->add( $e, $context, $found );
            }
        }
    } ## end foreach my $x ( sort keys %{$ref} )
    $DB::single = 1;
    $i18n->write_file();
} ## end foreach my $lang (@LANG)
