TOP := $(shell pwd)
FSBUILDER := $(TOP)/src/github.com/falling-sky/fsbuilder

BETA ?= jfesler@gigo.com:/var/www/beta.test-ipv6.com
PROD ?= jfesler@master.test-ipv6.com:/var/www
DIST_TEST ?= jfesler@gigo.com:/home/fsky/test/content
DIST_STABLE ?= jfesler@gigo.com:/home/fsky/stable/content


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
	@echo Checking to see what sites are up or down
	cd sites && ./parse-sites
	
FORCE:

################################################################
# Publishing                                                   #
################################################################
dist-template:
	test -f output/nat.html.zh_CN
	test -x ../dist_support/make-dist.pl 
	rsync output/. $(DIST_DESTINATION)/. -a --delete

dist-test: 
	make dist-template DIST_DESTINATION=$(DIST_TEST)

dist-stable:
	make dist-template DIST_DESTINATION=$(DIST_STABLE)


################################################################
# Real targets.                                                #
################################################################

beta: pipeline
	rsync output/. $(BETA)/.  -a --exclude site --delete


prod: pipeline
	rsync output/. $(PROD)/.  -a --exclude site --delete
	

test: beta dist-test

stable: prod dist-stable


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
