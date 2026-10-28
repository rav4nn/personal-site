#!/bin/sh
set -eu
cd "$(dirname "$0")"
for svg in *.svg; do
  name="${svg%.svg}"
  rsvg-convert -w 256 -h 256 "$svg" -o "/tmp/$name.png"
  cwebp -quiet -lossless "/tmp/$name.png" -o "../../public/projects/$name.webp"
done
