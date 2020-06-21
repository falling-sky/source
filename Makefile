build::
	go run github.com/falling-sky/fsbuilder

beta: build
	rsync -azv output/. jfesler@cosco.gigo.com:/persist/rsync.gigo.com/fsky/beta/content/.  --exclude site --delete

sites::
	@echo Validating mirror sites | ./support/fold_start.sh $@
	cd sites && make


################################################################
# Icon updates                                                 #
################################################################
icons::
	for x in icons/export/falling-sky-icons/hires_*.png; do \
	   pngnq < $$x >images/`basename  $$x` || exit 1 ;  \
	   ls -l images/`basename  $$x `; \
	 done
	 # For various health checks 
	 cp images/hires_ok.png images/knob_green.png
	 cp images/hires_ok.png images/knob_valid_green.png
	 cp images/hires_info.png images/knob_info.png
	 for x in 16 32 64 128 152 167 180 192 256; do \
	   convert ./icons/export/falling-sky-icons/favicon.png -resize $$xx$$x  -background white  -alpha remove -alpha off images/favicon-$$x.png || exit 1 ; \
	   ls -l images/favicon-$$x.png ; \
	 done  
	convert images/favicon-16.png images/favicon-32.png  images/favicon-64.png  images/favicon-128.png images/favicon-256.png -colors 256 images/favicon.ico
	ls -l images/favicon.ico
	convert -delay 5 -size 72 -loop 0 +dither -colors 255  -background white icons/export/falling-sky-icons-spinner/*.png images/hires_spinner.gif
	ls -l images/hires_spinner.gif

