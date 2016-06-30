#! /usr/bin/perl

$length=60;

print banner(<>);

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
