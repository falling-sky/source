
FROM golang:alpine as builder

## This dockerfile is for CI/CD.
## We use docker as a build method, but we are not shipping docker artifacts.
##
## If you wish to save the resulting output, map "output/" to 
## a local mount, or do a second stage build that copies "output/".
##


RUN apk add make git rsync curl openssh-client


COPY . /build
WORKDIR /build

RUN go install github.com/falling-sky/fsbuilder@latest

# Make sure there is a valid sites file (minimum for beta).
# Under release and i18n conditions, do a full real check.
RUN cd sites && go run parse-sites.go --skip-validation
RUN ls -l cicd_release ; true 
RUN ls -l cicd_i18n  ; true
RUN if [[ -s cicd_release ]]; then cd sites && go run parse-sites.go || exit 1 ; cat ../templates/js/sites_parsed.js ; fi
RUN if [[ -s cicd_i18n ]]; then ./support/add-build-date ; fi

# Download?
RUN if [[ -s translations/crowdin.yaml ]]; then cd translations && make || exit 1 ; fi

# Build the project
RUN fsbuilder

# Post-processing: translation and uploads
RUN if [[ -s translations/crowdin.yaml ]]; then cd translations && make || exit 1 ; fi

# Publish
RUN if [ -s cicd_release ]; then  rsync -a -e "ssh -o StrictHostKeyChecking=no  -i cicd_release -p 2222"  output/. fskyweb@rsync.test-ipv6.com:stable/content/. || exit 1 ; fi
RUN if [ -s cicd_i18n    ]; then  rsync -a -e "ssh -o StrictHostKeyChecking=no  -i cicd_i18n -p 2222"  output/. fskyweb@rsync.test-ipv6.com:i18n/content/. || exit 1 ; fi




# We're not really wanting to publish anything.
FROM scratch
COPY --from=builder /bin/true /bin/true
