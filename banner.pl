#! /usr/bin/perl

$length=60;


print "\e[1;33m\n"; # Yellow
print banner(<>);
print "\e[0m"; # reset

sub banner {
    my (@input) = @_;
    foreach (@input) {
        s/\r//;
        s/\n//;
        $length = length if ( length > $length );
    }
    my (@output);
    push( @output, join( "", ' ' x $indent, '#' x $length, "####\n" ) );
    foreach (@input) {
        push( @output, join( "", ' ' x $indent, "# ", substr( $_ . ' ' x 255, 0, $length ), " #\n" ) );
    }
    push( @output, join( "", ' ' x $indent, '#' x $length, "####\n" ) );
    return @output if (want_array);
    return join( "", @output );
}
