package FSi18n::PO;
use base Locale::PO;
our @ISA = 'Locale::PO';

sub _save_file {
    my $self     = shift;
    my $ashash   = shift;
    my $file     = shift;
    my $entries  = shift;
    my $encoding = shift;

    open(OUT, defined($encoding) ? ">:encoding($encoding)" : ">", $file) or return undef;
    
    if ($ashash) {
        print OUT $entries->{""}->dump;
        foreach (sort { sortkey($entries->{$a}) cmp sortkey($entries->{$b}) } keys %$entries) {
            print OUT $entries->{$_}->dump unless ($_ eq "");
        }
    }
    else {
        foreach (@$entries) {  
            print OUT $_->dump;
        }
    }

    close OUT;
}

sub sortkey {
  my($x) = @_;
  return join(" ",$x->reference||"",$x->msgid||"");
}