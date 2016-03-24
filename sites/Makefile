################################################################
# Do we permit publishing to rsync.gigo.com and files.gigo.com?#
################################################################
PUBLISH := false
include ../Makefile.publish



sites:: FORCE parse-sites
ifeq ($(PUBLISH),true)
	@echo Checking to see what sites are up or down
	./parse-sites
else
	@echo Skipping sites up/down check
endif  

FORCE::


parse-sites: parse-sites.go
	go build parse-sites.go
