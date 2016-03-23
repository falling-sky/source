TOP := $(shell pwd)
FSBUILDER := $(TOP)/src/github.com/falling-sky/fsbuilder

BETA ?= jfesler@gigo.com:/var/www/beta.test-ipv6.com
PROD ?= jfesler@master.test-ipv6.com:/var/www
DIST_TEST ?= jfesler@gigo.com:/home/fsky/test/content
DIST_STABLE ?= jfesler@gigo.com:/home/fsky/stable/content


################################################################
# Do we permit publishing to rsync.gigo.com and files.gigo.com?#
################################################################
PUBLISH := false
include Makefile.publish


################################################################
# Prep.                                                        #
################################################################

pre: fsbuilder download sites 

post: upload

output: FORCE 
	@echo Generating output using ./fsbuilder
	./fsbuilder
	make upload

pipeline: pre output post

upload:
	@echo Uploading crowdin translation POT file
	cd translations && make upload

download:
	@echo Downloading crowdin translations
	cd translations && make download

sites:: FORCE
ifeq ($(PUBLISH),true)
	@echo Checking to see what sites are up or down
	cd sites && ./parse-sites
else
	@echo Skipping sites up/down check
endif	
	
FORCE:

################################################################
# Publishing                                                   #
################################################################
dist-template:
	test -f output/nat.html.zh_CN
	test -x ../dist_support/make-dist.pl 
	rsync output/. $(DIST_DESTINATION)/. -a --delete -z

dist-test: 
	make dist-template DIST_DESTINATION=$(DIST_TEST)

dist-stable:
	make dist-template DIST_DESTINATION=$(DIST_STABLE)


################################################################
# Real targets.                                                #
################################################################

beta: pipeline
	rsync output/. $(BETA)/.  -a --exclude site --delete -z


prod: pipeline
	rsync output/. $(PROD)/.  -a --exclude site --delete -z
	

test: beta dist-test

stable: prod dist-stable

dist: stable


################################################################
# Binaries                                                     #
################################################################

$(FSBUILDER)/fsbuilder.go: 
	mkdir -p $(TOP)/src/github.com/falling-sky
	cd $(TOP)/src/github.com/falling-sky && GOPATH=$(TOP) go get -d "github.com/falling-sky/fsbuilder"
	
$(FSBUILDER)/fsbuilder: $(FSBUILDER)/fsbuilder.go
	cd $(FSBUILDER) && GOPATH=$(TOP) go build
	

fsbuilder: $(FSBUILDER)/fsbuilder
	cp $(FSBUILDER)/fsbuilder .

update-fsbuilder:
	rm -fr fsbuilder $(FSBUILDER)
	make fsbuilder
