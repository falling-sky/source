#! /usr/bin/perl

$length=60;

$BROWN = "\e[0;0;33m";
$YELLOW = "\e[0;1;33m";
$RESET = "\e[0;0;00m";  # Same number of characters as YELLOW

# Yellow!
print banner(<>);
print $RESET . "\n";

sub banner {
    my (@input) = @_;
    foreach (@input) {
        s/\r//;
        s/\n//;
        $length = length if ( length > $length );
    }
    my (@output);
    push( @output, join( "", $BROWN, ' ' x $indent, '#' x $length, "####\n" ) );
    foreach (@input) {
        push( @output, join( "", $YELLOW, ' ' x $indent, "# ", substr( $_ . ' ' x 255, 0, $length ), " #\n" ) );
    }
    push( @output, join( "", $BROWN, ' ' x $indent, '#' x $length, "####\n" ) );
    return @output if (want_array);
    return join( "", @output );
}
