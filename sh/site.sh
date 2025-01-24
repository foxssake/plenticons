#!/bin/bash

# Run build
./sh/build.sh

# Copy icons to site
cp -r build/site/icons site/

# Add favicon
rsvg-convert --zoom 2 icon.svg > site/favicon.png

# Copy bundle
bundle="$(echo build/*.zip)"
bundle="$(basename "$bundle")"

cp "build/$bundle" "site/$bundle"

# Generate manifest
MANIFEST="site/manifest.json"
printf "" > "$MANIFEST"

function out {
  echo "$@" >> "$MANIFEST"
}

out "{"
out "  \"icons\": {"

CATEGORIES="$(echo icons/*)"
CATEGORY_COUNT="$(echo "$CATEGORIES" | wc -w)"
CATEGORY_IDX=0

for CATEGORY in $CATEGORIES; do
  CATEGORY_IDX=$((CATEGORY_IDX + 1))
  CATEGORY="$(basename $CATEGORY)"
  ICONS="$(echo icons/$CATEGORY/*.svg)"
  ICON_COUNT=$(echo "$ICONS" | wc -w)
  ICON_IDX=0

  out "    \"$CATEGORY\": ["
  for ICON in $(echo "icons/$CATEGORY/*.svg"); do
    ICON_IDX=$((ICON_IDX + 1))
    ICON="$(basename $ICON)"
    ICON="${ICON%.*}"

    if (( ICON_IDX != ICON_COUNT )); then
      out "      \"$ICON\","
    else
      out "      \"$ICON\""
    fi
  done

  if (( CATEGORY_IDX != CATEGORY_COUNT )); then
    out "    ],"
  else
    out "    ]"
  fi
done;

out "  },"
out "  \"bundle\": \"$bundle\""

out "}"
