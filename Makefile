
all: dist-prep sites  download
	./build.pl --maxjobs 8
	rsync -az work/. /var/www/beta.test-ipv6.com/. --exclude site --delete --progress 
	- test -f /Applications/Safari.app/Contents/MacOS/Safari && open http://beta.test-ipv6.com/

beta: dist-prep sites  download
	./build.pl --locale en_US --config beta.inc
	rsync -az work/. /var/www/beta.test-ipv6.com/. --exclude site --delete --progress
	- test -f /Applications/Safari.app/Contents/MacOS/Safari && open http://beta.test-ipv6.com/isp/

raw: dist-prep sites  download
	./build.pl --locale en_US --config raw.inc
	rsync -az work/. /var/www/beta.test-ipv6.com/. --exclude site --delete --progress
	- test -f /Applications/Safari.app/Contents/MacOS/Safari && open http://beta.test-ipv6.com/isp/

download:
	cd po && ./download.pl

sites::
	cd sites && ./parse-sites-yaml.pl

dist-prep: work sites
	rm -fr work
	mkdir -p work/images
	mkdir -p work/images-nc
	rsync -a images/. work/images/.
	rsync -a images/. work/images-nc/.

dist-test: work sites
	 ../dist_support/make-dist.pl --base content --branch test

dist-stable: work sites
	 ../dist_support/make-dist.pl --base content --branch stable
	 
dist:
	cd ../dist_support && make dist-stable-content
