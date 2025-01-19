#!/bin/bash

declare -A COLORS=(\
    ["gray"]="#e0e0e0"
    ["red"]="#fc7f7f"
    ["blue"]="#8da5f3"
    ["green"]="#8eef97"
    ["yellow"]="#ffca5f"
)

BASE_COLOR="${COLORS[red]}"

# Clean build area
rm -rf build
mkdir -p build

# Generate variants
cp -r icons/ build/

ICONS="$(find build/ -name "*.svg")"
for ICON in $ICONS; do
    for VARIANT_NAME in ${!COLORS[@]}; do
        VARIANT_COLOR="${COLORS[$VARIANT_NAME]}"
        OUTPUT="${ICON%.*}-$VARIANT_NAME.svg"

        echo "Generating variant $VARIANT_NAME for $(basename $ICON)"

        cat "$ICON" |\
            sed "s/$BASE_COLOR/$VARIANT_COLOR/g" |\
            svgo --multipass - >\
            "$OUTPUT"
    done;

    rm "$ICON"
done;
