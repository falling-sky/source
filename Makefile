
TOP := $(shell pwd)
FSBUILDER := $(TOP)/src/github.com/falling-sky/fsbuilder

BETA ?= fskyweb@gigo.com:
I18N ?= /var/www/i18n.test-ipv6.com
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
	@echo Travis Prep 2.0 | ./fold_start.sh $@
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
	@./fold_end.sh $@
	

################################################################
# Prep.                                                        #
################################################################

pre: fsbuilder download sites 

post: upload

output: FORCE 
	@echo Generating output using ./fsbuilder | ./fold_start.sh fsbuilder
	./fsbuilder 
	@./fold_end.sh fsbuilder
	make upload

pipeline: pre output post

upload:
	@echo Uploading crowdin strings to translate | ./fold_start.sh crowdin-upload
ifeq ($(TRAVIS_PUBLISH),)
	@echo Uploading crowdin translation POT file 
	cd translations && make upload
else
	@echo skipping make upload on travis 
endif
	@./fold_end.sh crowdin-upload

download:
	@echo Downloading crowdin translations | ./fold_start.sh crowdin-upload
	cd translations && make download
	@./fold_end.sh crowdin-download

sites:: FORCE
	@echo Validating mirror sites | ./fold_start.sh mirrors
	cd sites && make
	@./fold_end.sh mirrors

FORCE::

################################################################
# Publishing                                                   #
################################################################
dist-template:
	test -f output/nat.html.zh_CN
	rsync output/. $(DIST_DESTINATION)/. -a --delete -z

dist-test: 
	@echo Publishing to distribution server | ./fold_start.sh dist-test
	make dist-template DIST_DESTINATION=$(DIST_TEST)
	@./fold_end.sh dist-test

dist-stable:
	@echo Publishing to distribution server | ./fold_start.sh dist-stable
	make dist-template DIST_DESTINATION=$(DIST_STABLE)
	@./fold_end.sh dist-stable


################################################################
# Real targets.                                                #
################################################################

beta: pipeline
	@echo Publishing to beta server | ./fold_start.sh publish-beta
	rsync output/. $(BETA)/.  -a --exclude site --delete -z
	@./fold_end.sh publish-beta

fast: output 
	@echo Publishing to beta server | ./fold_start.sh publish-beta
	rsync output/. $(BETA)/.  -a --exclude site --delete -z
	@./fold_end.sh publish-beta

prod: pipeline
	@echo Publishing to prod server | ./fold_start.sh publish-prod
	rsync output/. $(PROD1)/.  -a --exclude site --delete -z
	rsync output/. $(PROD2)/.  -a --exclude site --delete -z
	@./fold_end.sh publish-prod

i18n: pipeline pofooter
	@echo Publishing to i18n server | ./fold_start.sh publish-i18n
	rsync output/. $(I18N)/.  -a --exclude site --delete -z
	./fold_end.sh publish-i18n

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
	@echo getting fsbuilder source code | ./banner.pl
	mkdir -p $(TOP)/src/github.com/falling-sky
	cd $(TOP)/src/github.com/falling-sky && GOPATH=$(TOP) go get -d "github.com/falling-sky/fsbuilder"
	
$(FSBUILDER)/fsbuilder: $(FSBUILDER)/fsbuilder.go
	@echo building fsbuilder | ./banner.pl
	cd $(FSBUILDER) && GOPATH=$(TOP) go build
	

fsbuilder: $(FSBUILDER)/fsbuilder
	cp $(FSBUILDER)/fsbuilder .

update-fsbuilder:
	rm -fr fsbuilder $(FSBUILDER)
	make fsbuilder


