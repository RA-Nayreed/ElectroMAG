FROM golang:1-trixie AS patched-web

ARG GOEMAXIMA_COMMIT=5fafd1676176d3a944fa5f6a3f46a30825df61bd

RUN git clone https://github.com/mathinstitut/goemaxima.git /src
WORKDIR /src
RUN git checkout "${GOEMAXIMA_COMMIT}"
COPY stack/goemaxima-rahti/nonroot.patch /tmp/nonroot.patch
RUN git apply /tmp/nonroot.patch && ./buildweb.sh

FROM mathinstitut/goemaxima:2026042200-latest

COPY --from=patched-web /src/bin/web /opt/maxima/bin/goweb
