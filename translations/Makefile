TOP := $(shell pwd)
CROWDIN := /usr/local/bin/crowdin-cli

#################################################################
# Parse API key from crowdin.yaml (not robust, but good enough) #
#################################################################
API_KEY := $(shell grep api_key crowdin.yaml | cut -f2 -d' ')


################################################################
# Do we permit publishing to rsync.gigo.com and files.gigo.com?#
################################################################
PUBLISH := true
ifeq (,$(wildcard crowdin.yaml))
  PUBLISH := false
endif



################################################################
# Upload and Download                                          #
################################################################

upload:
ifeq ($(PUBLISH),true)
	$(CROWDIN) upload sources --auto-update
else
	echo make download skipped on this host
endif

download:
ifeq ($(PUBLISH),true)
	curl --silent  "http://api.crowdin.net/api/project/falling-sky/export?key=$(API_KEY)" >/dev/null
	wget -O all.zip  "http://api.crowdin.net/api/project/falling-sky/download/all.zip?key=$(API_KEY)"
	rm -fr dl
	unzip -q -d dl all.zip
else
	echo make download skipped on this host
endif
