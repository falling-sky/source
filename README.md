source
======

Main source for falling-sky.  Mostly  HTML, JavaScript.

Depnds on Go 1.6.  Newer versions *may* work but are untested at this time.

Depends on "fsbuilder".  Use `make fsbuilder` to make.

Reading/writing latest translations from Crowdin depends on credentials, and crowdin-cli.
If you're working with the cached .po files in git, building won't block on crowdin.

See the `Makefile` for what all can be set or done.
