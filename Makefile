
all: dist-prep sites  download
	./build.pl --maxjobs 8
	cd po && crowdin-cli upload sources --auto-update
	rsync -az work/. /var/www/beta.test-ipv6.com/. --exclude site --delete --progress 
	- test -f /Applications/Safari.app/Contents/MacOS/Safari && open http://beta.test-ipv6.com/

beta: dist-prep sites  download
	./build.pl --locale en_US --config beta.inc
	cd po && crowdin-cli upload sources --auto-update
	rsync -az work/. /var/www/beta.test-ipv6.com/. --exclude site --delete --progress
	- test -f /Applications/Safari.app/Contents/MacOS/Safari && open http://beta.test-ipv6.com/isp/

raw: dist-prep sites  download
	./build.pl --locale en_US --config raw.inc
	rsync -az work/. /var/www/beta.test-ipv6.com/. --exclude site --delete --progress
	- test -f /Applications/Safari.app/Contents/MacOS/Safari && open http://beta.test-ipv6.com/isp/

download:
	cd po && ./download.pl
	
download-snapshot:	download
	rsync -av po/. po-snapshot/.
	
download-diff:
	diff -cr po-snapshot/. po/.

sites::
	cd sites && ./parse-sites-yaml.pl

dist-prep: work sites
	rm -fr work
	mkdir -p work/images
	mkdir -p work/images-nc
	rsync -a images/. work/images/.
	rsync -a images/. work/images-nc/.

dist-test: work sites
	test -f work/nat.html.zh_CN
	 ../dist_support/make-dist.pl --base content --branch test

dist-stable: work sites
	test -f work/nat.html.zh_CN
	 ../dist_support/make-dist.pl --base content --branch stable
	 
dist:	all dist-stable

crowdin:
	make all
	git commit  -m "latest translations" po
	make dist-stable
