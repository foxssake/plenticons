#!/bin/bash

# Declare variants
declare -A COLORS=(\
    ["gray"]="#e0e0e0"
    ["red"]="#fc7f7f"
    ["blue"]="#8da5f3"
    ["green"]="#8eef97"
    ["yellow"]="#ffca5f"
    ["white"]="#ffffff"
    ["black"]="#000000"
)

BASE_COLOR="${COLORS[red]}"

# Clean build area
rm -rf build
mkdir -p build
echo "" > build/.gdignore

# Settings
THREADS=8
PIDS=()

# Generate variants
CATEGORIES="$(echo icons/*)"
for CATEGORY in $CATEGORIES; do
    CATEGORY="$(basename "$CATEGORY")"
    mkdir -p "build/bundle/icons/64x-hidpi/$CATEGORY"
    mkdir -p "build/bundle/icons/16x/$CATEGORY"
    mkdir -p "build/site/icons/$CATEGORY"

    ICONS="$(find "icons/$CATEGORY" -type f -name "*.svg")"
    for ICON in $ICONS; do
        ICON="$(basename "$ICON")"
        ICON="${ICON%.*}"

        for VARIANT_NAME in ${!COLORS[@]}; do
            VARIANT_COLOR="${COLORS[$VARIANT_NAME]}"
            INPUT="icons/$CATEGORY/$ICON.svg"
            OUT="$ICON-$VARIANT_NAME"

            PIDS=()
            
            echo "Generating variant $VARIANT_NAME for $CATEGORY/$ICON"

            cat "$INPUT" |\
                sed "s/$BASE_COLOR/$VARIANT_COLOR/g" |\
                rsvg-convert |\
                pngquant --strip --posterize 1 --speed 2 - |\
                cat > "build/bundle/icons/16x/$CATEGORY/$OUT.png" &
            PIDS+=($!);

            cat "$INPUT" |\
                sed "s/$BASE_COLOR/$VARIANT_COLOR/g" |\
                rsvg-convert --zoom 4 |\
                pngquant --strip --posterize 1 --speed 2 - |\
                cat > "build/bundle/icons/64x-hidpi/$CATEGORY/$OUT.png" &
            PIDS+=($!);

            cat "$INPUT" |\
                sed "s/$BASE_COLOR/$VARIANT_COLOR/g" |\
                svgo - |\
                cat > "build/site/icons/$CATEGORY/$OUT.svg" &
            PIDS+=($!);
        done;

        if [ "${#PIDS[@]}" -gt "$THREADS" ]; then
          wait "${PIDS[@]}"
          PIDS=()
        fi
    done;
done;

# Await any dangling jobs
wait "${PIDS[@]}"

# Prepare addon
version="$(sh/version.sh)"
root="$(pwd)"
addon_root="$root/build/plenticons-v${version}/addons/plenticons/"

mkdir -p "$addon_root"

cp -r addons/plenticons/* "$addon_root"
cp -r build/bundle/icons "$addon_root"

(
    cd build
    zip -r "plenticons-v${version}.zip" "plenticons-v${version}"
)
