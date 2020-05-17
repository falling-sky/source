
FROM golang:alpine 

## This dockerfile is for CI/CD.
## We use docker as a build method, but we are not shipping docker artifacts.
##
## If you wish to save the resulting output, map "output/" to 
## a local mount, or do a second stage build that copies "output/".
##


RUN apk add make git rsync curl openssh-client


COPY . /build
WORKDIR /build

RUN go install github.com/falling-sky/fsbuilder

# Check sites, but skip on beta (I'm always in a hurry for beta)
RUN if [[ -s cicd_release ||  -s cicd_i18n ]]; then cd sites && go run parse-sites.go || exit 1 ; fi

# Build the project
RUN fsbuilder

# Post-processing: translation and uploads
RUN if [[ -s translations/crowdin.yaml ]]; then cd translations && make || exit 1 ; fi

# Publish
RUN if [ -s cicd_beta ];    then  rsync -av -e "ssh -o UserKnownHostsFile=.ssh/known_hosts  -i cicd_beta"     output/. fskyweb@bender.gigo.com:      || exit 1 ; fi
RUN if [ -s cicd_i18n ];    then  rsync -av -e "ssh -o UserKnownHostsFile=.ssh/known_hosts  -i cicd_i18n"     output/. fskyweb@bender.gigo.com:      || exit 1 ; fi
RUN if [ -s cicd_release ]; then  rsync -av -e "ssh -o UserKnownHostsFile=.ssh/known_hosts  -i cicd_release"  output/. fskyweb@ds.vm0.test-ipv6.com: || exit 1 ; fi
RUN if [ -s cicd_release ]; then  rsync -av -e "ssh -o UserKnownHostsFile=.ssh/known_hosts  -i cicd_release"  output/. fskyweb@ds.vm1.test-ipv6.com: || exit 1 ; fi
RUN if [ -s cicd_release ]; then  rsync -av -e "ssh -o UserKnownHostsFile=.ssh/known_hosts  -i cicd_release"  output/. fskyweb@ds.vm2.test-ipv6.com: || exit 1 ; fi


FROM golang:alpine
COPY --from=0 /build /build
WORKDIR /build
