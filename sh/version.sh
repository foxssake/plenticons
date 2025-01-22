#!/bin/bash

version="$(sed -n "s/version=\"\([^\"]*\)\"/\1/p" addons/many-tags/plugin.cfg)"

version_major="$(echo ${version} | cut -f1 -d.)"
version_minor="$(echo ${version} | cut -f2 -d.)"
version_patch="$(echo ${version} | cut -f3 -d.)"
version="$version_major.$version_minor.$version_patch"

persist="false"

if (( $# == 0 )); then
    echo $version
    exit 0
fi

if [ $1 == "bump" ]; then
    if [ "$2" = "major" ]; then
        version_major=$((version_major + 1));
        version_minor=0;
        version_patch=0;
    elif [ "$2" = "minor" ]; then
        version_minor=$((version_minor + 1));
        version_patch=0;
    elif [ "$2" = "patch" ]; then
        version_patch=$((version_patch + 1));
    else
        >&2 echo "Unknown version part: $2"
        exit 1
    fi

    version="$version_major.$version_minor.$version_patch"
    persist="true"
elif [ $1 == "envvar" ]; then
  echo "VERSION=v$version"
  exit 0
fi

if [ "$persist" = "true" ]; then
    sed -i "s/version=.*/version=\"$version\"/g" "addons/many-tags/plugin.cfg"
fi

echo "$version"
