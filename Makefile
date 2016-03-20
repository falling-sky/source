TOP := $(shell pwd)
FSBUILDER := $(TOP)/src/github.com/falling-sky/fsbuilder

BETA ?= gigo.com:/var/www/beta.test-ipv6.com

################################################################
# Prep.                                                        #
################################################################

pre: fsbuilder po-download sites 

post: po-upload

output: FORCE 
	./fsbuilder
	make po-upload

pipeline: pre output post

po-upload:
	cd translations && crowdin-cli upload sources --auto-update

po-download:
	cd translations && ./download.pl

sites:: FORCE
	cd sites && ./parse-sites
	
FORCE:

################################################################
# Real targets.                                                #
################################################################

beta: pipeline
	rsync output/. $(BETA)/.  -a --exclude site --delete


################################################################
# Binaries                                                     #
################################################################

$(FSBUILDER)/fsbuilder.go: 
	mkdir -p $(TOP)/src/github.com/falling-sky
	cd $(TOP)/src/github.com/falling-sky &&  git clone git@github.com:falling-sky/fsbuilder.git
	
$(FSBUILDER)/fsbuilder: $(FSBUILDER)/fsbuilder.go
	cd $(FSBUILDER) && GOPATH=$(TOP) go build

fsbuilder: $(FSBUILDER)/fsbuilder
	cp $(FSBUILDER)/fsbuilder .

update-fsbuilder:
	rm -fr fsbuilder $(FSBUILDER)
	make fsbuilder
