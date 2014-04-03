
package Template::Provider::Locale;
use Template::Provider;
use base "Template::Provider";
use strict;

sub fetch {
    my ( $self, $name ) = @_;

   # Order:
    #  filename.locale.site
    #  filename.locale
    #  filename.site
    #  filename

    # Look for locale-specific version.
    # Else look for en-us
    # Else look for no extension at all
    
    if (ref $name) {
        return  $self->SUPER::fetch($name);
    }

#$DB::single=1 if ($name =~ /disclaimer/);

    my $locale = $self->{PARAMS}->{LOCALE};
    my $verbose = $self->{PARAMS}->{VERBOSE} || 0;
    my $aref =$self->{PARAMS}->{VARS}->{site_locals}   ;
    $aref ||= [];
    if (($aref) && (! ref $aref)) {
       $aref = [ $aref];
    }
    if (!$aref) {
      $aref = [];
    }
    
    my @try;
    foreach my $site (@$aref) {
      push(@try,  "$name\.$locale\.$site");
    }
    push(@try, "$name\.$locale");
    foreach my $site (@$aref) {
      push(@try,  "$name\.$site");
    }
    push(@try, "$name");

    foreach my $try (@try) {
      print STDERR "  looking for $try\n" if ($verbose);
      if (-f $try) {
        return  $self->SUPER::fetch($try);
      }
    }    
    
    my $pwd = `/bin/pwd`;
    die "Complete failure looking for any of: @try  while in directory $pwd";
}



1;
