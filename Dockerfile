
FROM golang:alpine 

## This dockerfile is for CI/CD.
## We use docker as a build method, but we are not shipping docker artifacts.
##
## If you wish to save the resulting output, map "output/" to 
## a local mount, or do a second stage build that copies "output/".
##


RUN apk add make git rsync curl openssh-client


# Copy what we need, versus trying to exclude.
# Why? I dont want "Dockerfile" edits to trigger a complete 
# cache busting build right now, it's slow to get to this point.
COPY .git /build
COPY icons /build/icons
COPY images /build/images
COPY support /build/support
COPY translations /build/translations
COPY templates /build/templates
COPY sites/*.go /build/sites/
COPY sites/*.json /build/sites/
COPY go.mod /build/
COPY go.sum /build/
COPY Makefi* /build/
COPY .ssh/known_hosts /build/.ssh/known_hosts
WORKDIR /build

RUN go install github.com/falling-sky/fsbuilder

ARG CROWDIN_YAML
ARG CICD_BETA

RUN echo   "${CROWDIN_YAML}" > translations/crowdin.yaml
RUN echo "${CICD_BETA}" > cicd_beta
RUN chmod 600 cicd_beta

# Only if we are publishing will I bother updating "sites"
#RUN if [ ! -z cicd_beta ]; then cd sites && go run parse-sites.go || exit 1 ; fi

# Build the project
RUN fsbuilder

# Post-processing: translation and uploads
#RUN if [ ! -z translations/crowdin.yaml ]; then cd translations && make || exit 1 ; fi



RUN if [ ! -z cicd_beta ]; then HOME=. rsync -av -e "ssh -o UserKnownHostsFile=.ssh/known_hosts  -vvvvvvi cicd_beta"  output/. fskyweb@bender.gigo.com: || exit 1 ; fi



FROM golang:alpine
COPY --from=0 /build /build
WORKDIR /build
