#! /bin/sh

/bin/echo
/bin/echo -en 'travis_fold:start:'$1'\r'
/bin/echo -en "\e[1m\e[K"
cat
/bin/echo -en '\e[0m'

