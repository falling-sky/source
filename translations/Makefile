TOP := $(shell pwd)

################################################################
# Do we permit publishing to rsync.gigo.com and files.gigo.com?#
################################################################
PUBLISH := true
ifeq (,$(wildcard crowdin.json))
  PUBLISH := false
endif



################################################################
# Upload and Download                                          #
################################################################

crowdin-download:
ifeq ($(PUBLISH),true)
	rm -f all.zip
	fsbuilder --download all.zip
	rm -fr dl
	mkdir -p dl
	unzip -q -d dl all.zip
	for x in `find dl/ -type d`; do cp README.md $$x/ ; done
	find dl
else
	echo make crowdin-download skipped on this host
endif

crowdin-upload:
ifeq ($(PUBLISH),true)
	fsbuilder --update falling-sky.pot
else
	echo make crowdin-download skipped on this host
endif
