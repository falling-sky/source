package Template::Plugin::GT;
use Template::Plugin;
use base "Template::Plugin";
use Data::Dumper;
use YAML::Syck;

our %cache;


sub new {
    my ( $class, $context, @params ) = @_;
    my $self = bless { _CONTEXT => $context, }, $class;    # returns blessed MyPlugin object
    $self->get_yaml();
    return $self;
}

sub cache {
  my($self,$locale) = @_;
  $cache{$locale} ||= LoadFile("../text/text.$locale");
  return  $cache{$locale};
}


sub get_yaml {
  my($self) = @_;
   my $params = $self->{_CONTEXT}->{CONFIG}->{LOAD_TEMPLATES}->[0]->{PARAMS};
   my $locale = $params->{LOCALE} || "en-us";
   $self->{locale}=$locale;
  $self->{enus} = $self->cache("en-us");
  $self->{local} = $self->cache($locale);
}

sub gt {
   my($self,$a,$b) = @_;
#   print STDERR "LOOKUP $a $b\n";
   if (exists $self->{local}->{$a}) {
     if (exists $self->{local}->{$a}->{$b}) {
       return $self->{local}->{$a}->{$b};
     }
   }
   if (exists $self->{enus}->{$a}) {
     if (exists $self->{enus}->{$a}->{$b}) {
        my $v =  $self->{enus}->{$a}->{$b};
        return $v;
     }
   }
   return "[Missing text: $a $b]";
}

sub tab {
  my($self,$a,$b,$c) = @_;
  my($t) = $self->gt($a,$b);
  return <<"EOF";
<a href="#" class="tabbutton_xxx" onclick='return GIGO.tabnav("$c")'>$t</a>
EOF
}
sub tab_tests {
  my($self,$a,$b,$c) = @_;
  my($t) = $self->gt($a,$b);
  return <<"EOF";
<a href="#" class="tabbutton_xxx" onclick='return GIGO.tabnav_tests("$c")'>$t</a>
EOF
}





1;
