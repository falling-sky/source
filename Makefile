
TOP := $(shell pwd)
FSBUILDER := $(TOP)/src/github.com/falling-sky/fsbuilder

BETA ?= fskyweb@gigo.com:
I18N ?= /var/www/i18n.test-ipv6.com
PROD0 ?= fskyweb@ds.vm0.test-ipv6.com:
PROD1 ?= fskyweb@ds.vm1.test-ipv6.com:
PROD2 ?= fskyweb@ds.vm2.test-ipv6.com:
DIST_TEST ?= fskyweb@rsync.gigo.com:test/content
DIST_STABLE ?= fskyweb@rsync.gigo.com:stable/content


################################################################
# Do we permit publishing to rsync.gigo.com and files.gigo.com?#
################################################################
PUBLISH := true
ifeq (,$(wildcard translations/crowdin.yaml))
  PUBLISH := false
endif


################################################################
# Travis                                                       #
################################################################
# Are we on Travis?  We only want to publish from travis
# when on master, non-PR builds.
TRAVIS_PUBLISH := false
ifeq ($(TRAVIS_BRANCH),master)
ifeq ($(TRAVIS_PULL_REQUEST),false)
TRAVIS_PUBLISH := true
endif
endif

ifeq ($(TRAVIS_PUBLISH),true)
travis: travis-prep prod dist
else
travis: travis-prep beta
endif

travis-prep:
	@echo Travis Prep 2.0 | ./support/fold_start.sh $@
	@echo TRAVIS_BRANCH=$(TRAVIS_BRANCH)
	@echo TRAVIS_PULL_REQUEST=$(TRAVIS_PULL_REQUEST)
	@echo TRAVIS_PUBLISH=$(TRAVIS_PUBLISH)
	mkdir -p $(HOME)/.ssh
	mv id_travis $(HOME)/.ssh/id_rsa
	echo BatchMode yes > $(HOME)/.ssh/config
	echo StrictHostKeyChecking no > $(HOME)/.ssh/config
	chmod 700 $(HOME)/.ssh
	chmod 600 $(HOME)/.ssh/*
	find $(HOME)/.ssh -ls
	@echo Git info
	@./support/fold_end.sh $@
	

################################################################
# Prep.                                                        #
################################################################

pre: fsbuilder crowdin-download sites 

post: crowdin-upload

output: FORCE 
	@echo Generating output using ./fsbuilder | ./support/fold_start.sh $@
	./fsbuilder 
	@./support/fold_end.sh $@
	make crowdin-upload

pipeline: pre output post

crowdin-upload:
	@echo Uploading crowdin strings to translate | ./support/fold_start.sh $@
ifeq ($(TRAVIS_PUBLISH),true)
	@echo Uploading crowdin translation POT file 
	-cd translations && make crowdin-upload
else
	@echo skipping make crowdin-upload on travis 
endif
	@./support/fold_end.sh $@

crowdin-download:
	@echo Downloading crowdin translations | ./support/fold_start.sh $@
	cd translations && make crowdin-download
	@./support/fold_end.sh $@

sites:: FORCE
	@echo Validating mirror sites | ./support/fold_start.sh $@
	cd sites && make
	@./support/fold_end.sh $@

FORCE::

################################################################
# Icon updates                                                 #
################################################################
icons::
	for x in icons/export/falling-sky-icons/hires_*.png; do \
	   pngnq < $$x >images/`basename  $$x` || exit 1 ;  \
	   ls -l images/`basename  $$x `; \
	 done
	 # For various health checks 
	 cp images/hires_ok.png images/knob_green.png
	 cp images/hires_ok.png images/knob_valid_green.png
	 cp images/hires_info.png images/knob_info.png
	 for x in 16 32 64 128 152 167 180 192 256; do \
	   convert ./icons/export/falling-sky-icons/favicon.png -resize $$xx$$x  -background white  -alpha remove -alpha off images/favicon-$$x.png || exit 1 ; \
	   ls -l images/favicon-$$x.png ; \
	 done  
	convert images/favicon-16.png images/favicon-32.png  images/favicon-64.png  images/favicon-128.png images/favicon-256.png -colors 256 images/favicon.ico
	ls -l images/favicon.ico
	convert -delay 5 -size 72 -loop 0 +dither -colors 255  -background white icons/export/falling-sky-icons-spinner/*.png images/hires_spinner.gif
	ls -l images/hires_spinner.gif


	

################################################################
# Publishing                                                   #
################################################################
dist-template:
	test -f output/nat.html.zh_CN
	rsync output/. $(DIST_DESTINATION)/. -a --delete -z

dist-test: 
	@echo Publishing to distribution server | ./support/fold_start.sh $@
	make dist-template DIST_DESTINATION=$(DIST_TEST)
	@./support/fold_end.sh $@

dist-stable:
	@echo Publishing to distribution server | ./support/fold_start.sh $@
	make dist-template DIST_DESTINATION=$(DIST_STABLE)
	@./support/fold_end.sh $@


################################################################
# Real targets.                                                #
################################################################

beta: pipeline
	@echo Publishing to beta server | ./support/fold_start.sh $@
	rsync output/. $(BETA)/.  -a --exclude site --delete -z
	@./support/fold_end.sh $@

fast: output 
	@echo Publishing to beta server | ./support/fold_start.sh $@
	rsync output/. $(BETA)/.  -a --exclude site --delete -z
	@./support/fold_end.sh $@

prod: pipeline
	@echo Publishing to prod server | ./support/fold_start.sh $@
	rsync output/. $(PROD0)/.  -a --exclude site --delete -z
	rsync output/. $(PROD1)/.  -a --exclude site --delete -z
	rsync output/. $(PROD2)/.  -a --exclude site --delete -z
	@./support/fold_end.sh $@

i18n: pipeline pofooter
	@echo Publishing to i18n server | ./support/fold_start.sh $@
	rsync output/. $(I18N)/.  -a --exclude site --delete -z
	@./support/fold_end.sh $@

pofooter:
	echo "Built with latest translations from crowdin.net - " > $(I18N)/site/footer.html
	TZ=UTC date --date="`grep PO-Revision-Date translations/dl/de/falling-sky.de_DE.po | cut -f2,3 -d' ' | cut -f1 -d\\\\` " >>  $(I18N)/site/footer.html

test: beta dist-test

stable: prod dist-stable

dist: stable


################################################################
# Binaries                                                     #
################################################################

$(FSBUILDER)/fsbuilder.go: 
	@echo getting fsbuilder source code | ./support/fold_start.sh $@
	mkdir -p $(TOP)/src/github.com/falling-sky
	cd $(TOP)/src/github.com/falling-sky && GOPATH=$(TOP) go get -d "github.com/falling-sky/fsbuilder"
	@./support/fold_end.sh $@
	
$(FSBUILDER)/fsbuilder: $(FSBUILDER)/fsbuilder.go
	@echo building fsbuilder | ./support/fold_start.sh $@
	cd $(FSBUILDER) && GOPATH=$(TOP) go build
	@./support/fold_end.sh $@

fsbuilder: $(FSBUILDER)/fsbuilder
	cp $(FSBUILDER)/fsbuilder .

update-fsbuilder:
	rm -fr fsbuilder $(FSBUILDER)
	make fsbuilder


