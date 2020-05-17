TOP := $(shell pwd)

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

crowdin-download:
ifeq ($(PUBLISH),true)
	curl "https://api.crowdin.com/api/project/falling-sky/export?key=$(API_KEY)" 
	rm -f all.zip
	wget -O all.zip  "https://api.crowdin.com/api/project/falling-sky/download/all.zip?key=$(API_KEY)"
	rm -fr dl
	mkdir -p dl
	unzip -q -d dl all.zip
	for x in `find dl/ -type d`; do cp README.md $$x/ ; done
else
	echo make crowdin-download skipped on this host
endif

crowdin-upload:
ifeq ($(PUBLISH),true)
	curl \
		-F "files[falling-sky.pot]=@falling-sky.pot" \
		 "https://api.crowdin.com/api/project/falling-sky/update-file?key=$(API_KEY)&update_option=update_without_changes" 
else
	echo make crowdin-download skipped on this host
endif
