#! /usr/bin/perl

use strict;

my $length = 60;

print banner(<>);

sub banner {
    my (@input) = @_;
    foreach (@input) {
        s/\r//;
        s/\n//;
        $length = length if ( length > $length );
    }
    my (@output);
    push( @output, join( "", '#' x $length, "####\n" ) );
    foreach (@input) {
        push( @output, join( "", "# ", substr( $_ . ' ' x 255, 0, $length ), " #\n" ) );
    }
    push( @output, join( "", '#' x $length, "####\n" ) );
    return @output;
}
