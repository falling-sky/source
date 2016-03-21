
package FSi18n;
use Data::Dumper;
use YAML::Syck;
use strict;
#use Locale::PO ;
use FSi18n::PO;


sub new {
    my ( $class, @params ) = @_;
    my $self = bless { }, $class;    # returns blessed MyPlugin object
    $self->init(@params);
    return $self;
} 

sub init {
  my ($self,@params) = @_;
    $self->{aref} ||= [];
    $self->{href} ||= {};
    $self->{basename}||="falling-sky";
    $self->{dir}="po/dl";
    if (@params) {
      my %extra = @params;
      @$self{keys %extra}=values %extra;
    }
    return $self;
}

sub basename {
  my $self = shift;
  if (@_ ){
    $self->{basename}=shift;
  }
  return $self->{basename};
}
sub dir {
  my $self = shift;
  if (@_) {
    $self->{dir} = shift;
  }
  return $self->{dir};
}

sub filename {
  my $self = shift;
  if (@_) {
    $self->{filename} = shift;
  }
  return $self->{filename} || "unspecified.po";
}

sub translated {
    my $self = shift;
    my $aref = $self->{aref};
    $DB::single = 1;
    my $changed=0;
    my $total=0;
    foreach my $po (@$aref) {
        my $msgid   = $po->dequote( $po->msgid );
        my $msgctxt = $po->dequote( $po->msgctxt );
        my $msgstr = $po->dequote($po->msgstr);
        $total++;
        $changed++ if (($msgid ne $msgstr) && ('' ne $msgstr));
    }
    $total++ unless ($total);
    my $percent = sprintf("%.1f",$changed * 100 / $total);
    return wantarray ? ($percent,$changed,$total) : $percent;
}

sub scan_array {
 my $self = shift;
 my $aref = $self->{aref};
    foreach my $po (@$aref) {
      my $msgid = $po->dequote($po->msgid);
      my $msgctxt = $po->dequote($po->msgctxt);
      $msgctxt = "unspecified" unless (defined $msgctxt);
      $self->{href}{$msgctxt}{$msgid}=$po;
      $self->{href}{"any"}{$msgid}=$po;
    }
}

sub read_file {
  my $self = shift;
  my $filename = $self->filename;
  my $aref =  FSi18n::PO->load_file_asarray($filename);
  if ($aref) {
    $self->{aref} = $aref;
    $self->scan_array();
    return $aref;
  } else {
    die "Could not read $filename: $!";
    return;
  }  
}

sub write_file {
    my $self = shift;
    my $filename = $self->filename;
    
    if (! scalar @{  $self->{aref}}) {
      unlink($filename);
      return;
    }

    unless ( open( OUT, ">", $filename ) ) {
        die "Could not write $filename\: $!";
    }
#    unless ( open( OUT, ">:encoding(UTF-8)", $filename ) ) {
#        die "Could not write $filename\: $!";
#    }
    
    if ( $self->{aref}->[0]->msgid ne '""' ) {
       my $po  = $self->poheader();
       print OUT $po->dump;
    }
    my %seen;
    foreach my $o ( @{$self->{aref}} ) {
        print OUT $o->dump; #  unless ($seen{ $o->dump}++);
    }
    close OUT;
}

sub find {
    my $self    = shift;
    my $find    = shift;
    my $msgctxt = shift;
      $msgctxt = "unspecified" unless (defined $msgctxt);
    if ( exists $self->{href}{$msgctxt}{$find} ) {
        return $self->{href}{$msgctxt}{$find};
    } elsif ( exists $self->{href}{"any"}{$find} ) {
        return $self->{href}{"any"}{$find};
    } else {
        return;
    }
}

sub find_text {
 my $self = shift;
 my $find = shift;
  my $msgctxt = shift;
 my $found = $self->find($find,$msgctxt);
 if (($found) && ($found->msgstr)){
   my $dq = $found->dequote($found->msgstr);
   return $dq if ($dq);
 }
 return $find;
}

sub add {
    my $self    = shift;
    my $find    = shift;
    my $msgctxt = shift;
    my $lo      = shift;
      $msgctxt = "unspecified" unless (defined $msgctxt);
      
    my $found = $self->find($find,$msgctxt);
    return if ($found);
      
    push( @{ $self->{aref} }, $lo );
    $self->{href}{$msgctxt}{$find} = $lo;
    $self->{href}{"any"}{$find} = $lo;
}

sub poheader {
    my $self     = shift;
    my $poheader = FSi18n::PO->new();
    $poheader->msgid("");
    $poheader->msgstr(   "Project-Id-Version: PACKAGE VERSION\\n"
                       . "PO-Revision-Date: YEAR-MO-DA HO:MI +ZONE\\n"
                       . "Last-Translator: Unspecified Translator <jfesler+unspecified-translator\@test-ipv6.com>\\n"
                       . "Language-Team: LANGUAGE <v6code\@test-ipv6.com>\\n"
                       . "MIME-Version: 1.0\\n"
                       . "Content-Type: text/plain; charset=UTF-8\\n"
                       . "Content-Transfer-Encoding: 8bit\\n" );
    return $poheader;
}



1;
