
package FSi18n::MultipleRead;
use FSi18n;
use FSi18n::PO;
use Data::Dumper;
use YAML::Syck;
use strict;


sub new {
    my ( $class, @params ) = @_;
    my $self = bless {}, $class;    # returns blessed MyPlugin object
    $self->{aref} = [];
    $self->{missing} = [];
    
    my $template_filename = shift @params;
    my $template = FSi18n->new(filename=>$template_filename);
    $template->read_file;
    $self->{template}=$template;
    
#    my $missing = FSi18n->new(basename=>"missing", locale=>$params[0]);
#    $self->{missing}=$missing;
    
    my @try;
    foreach my $locale (@params) {
      my($atl,$atr) = split(/@/,$locale);
      my($dl,$dr) = split(/_/,$atl);
      push(@try,"$dl");
      push(@try,"$dl\_$dr") if ($dr);
      push(@try,"$dl\@$atr") if ($atr);
      push(@try,"$dl\_$dr\@$atr") if ($dr && $atr);
    }
    
    # Try loading each of them
    my @found;
    foreach my $try (@try) {
      my $i18n = FSi18n->new;
      $i18n->locale($try);
      my $filename = $i18n->filename;
      if ($i18n->read_file) {
        print STDERR "Found $filename\n";
        push(@found,$i18n);
      } else {
#        print STDERR "Missing $filename\n";
      }
    }
    
    $self->{aref} = \@found;
    return $self if (scalar @found);
    return;  # NO joy.
}

sub find {
  my $self = shift;
  my $find = shift;
  my $msgctxt = shift;
  my $aref = $self->{aref};
  foreach my $i18n (@$aref) {
    my $found = $i18n->find($find,$msgctxt);
    if ($found) {
      if (!$found->msgstr) {
        $found->msgstr($find);
      }
      return $found;
    }
  }
  
  # Crap.  Nothing.
  # Find it in the template, mostly so we can find the location.
#  warn "Missing from templates and translations: $find\n";

  my $found = $self->{template}->find($find,$msgctxt);
  if (!$found) {
    # Wow, even missing in the template?
    $found = FSi18n::PO->new();
    $found->msgid($find);
    $found->comment("not in template, but needed");
    $found->reference("unsure");
    $found->msgctxt($msgctxt);
  }
  $found->msgstr("");
#  $self->{missing}->add($find,$msgctxt,$found);
  return $found;
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

sub write_file {
  my $self = shift;
#  if ($self->{missing}) {
#   $self->{missing}->write_file();
#  }
}


1;

# TODO

# Specify multiple inputs (by filename? or by lang?)
# Do searches
# REturned data should indicate where it came from


__END__
sub file {
  my $self = shift;
  if (@_) {
    $self->{file} = shift;
  }
  return $self->{file};
}

sub read_file {
  my $self = shift;
  my $file = $self->file;
  my $href =  Locale::PO->load_file_asarray($file, "UTF-8");
  if ($href) {
    $self->{href} = $href;
  } else {
    warn "Could not read $file: $!";
    return;
  }  
}
sub write_file {
  my $self = shift;
  my $file = self->file;
  Locale::PO->save_file_fromarray($file,$self->{href},"UTF-8");
}

sub find {
  my $self = shift;
  my $find = shift;
  if (exists $self->{href}{$find}) {
    return $self->{href}{$find};
  } else {
    return;
  }
  
}
sub add {
  my $self = shift;
  my $find = shift;
  my $lo = shift;
  if ($lo) {
  $self->{href}{$find}=$lo;
  } else {
    delete $self->{href}{$find};
  }
}

sub delete {
  my $self = shift;
  my $find = shift;
  $self->add($find,undef);
}

1;
