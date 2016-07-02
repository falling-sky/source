#! /bin/sh

/bin/echo -en 'travis_fold:end:'$1'\r'
/bin/echo -e "\e[0m\e[K"
