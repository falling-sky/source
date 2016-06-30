[![Build Status](https://travis-ci.org/falling-sky/source.svg?branch=master)](https://travis-ci.org/falling-sky/source)

source
======

Main source for falling-sky.  Mostly  HTML, JavaScript.

Depnds on Go 1.6.  Newer versions *may* work but are untested at this time.

Depends on "fsbuilder".  Use `make fsbuilder` to make.

Reading/writing latest translations from Crowdin depends on credentials, and crowdin-cli.
If you're working with the cached .po files in git, building won't block on crowdin.

See the `Makefile` for what all can be set or done.


maintainers
===========

I've asked a couple people to step in and help with care and feeding.

 * Check the latest [crowdin translations](https://crowdin.com/project/falling-sky/activity_stream)
   * Spot check recent changes with Google Translate
   * Look for evil JavaScript
 * Check for any support related [issues](https://github.com/falling-sky/source/issues) filed.
 * If there are mirror updates to be made:
   * Edit `sites.json`    [here](https://github.com/falling-sky/source/tree/master/sites) 
   * If this is for "Other Sites" instead of a full mirror, specify `mirror: false`
 * If there were translations changed, and no other recent config changes, give a gratuitious kick to the [build system](https://travis-ci.org/falling-sky/source).
   * Builds take ~2 minutes
   * Builds check all mirrors, and suppress any that are unreachable
   * Builds push to the live site http://master.test-ipv6.com
   * Builds push to the distribution server 

