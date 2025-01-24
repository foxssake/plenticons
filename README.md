![plenticons](./icon.png)

# plenticons

[![License](https://img.shields.io/github/license/foxssake/plenticons)](https://github.com/foxssake/plenticons/blob/main/LICENSE)
[![GitHub Release](https://img.shields.io/github/v/release/foxssake/plenticons)](https://github.com/foxssake/plenticons/releases)
[![Site](https://img.shields.io/badge/Site-github.io-blue)](https://foxssake.github.io/plenticons/)
[![Discord](https://img.shields.io/discord/1253434107656933447?logo=discord&label=Discord)](https://discord.gg/xWGh4GskG5)
[![ko-fi](https://img.shields.io/badge/Support%20on-ko--fi-ff5e5b?logo=ko-fi)](https://ko-fi.com/T6T8WZD0W)

A pack of icons to use with custom nodes in the [Godot] editor. Or wherever else!

## Features

* ![plus](./icons/2d/plus.svg) 50+ icons of various categories
* ![chest](./icons/objects/chest.svg) Each icon comes in multiple variants
* ![heart](./icons/creatures/heart-full.svg) Licensed as CC0 - take it and use it
* ![globe](./icons/objects/globe.svg) [Dedicated site] for browsing
* ![check](./icons/2d/checkmark.svg) Available for HiDPI displays too
* ![lightning](./icons/objects/lightning.svg) Optimized for size

## Overview

Often, when working on projects, it would be nice to have some custom icons for
specific nodes, but finishing the project is a big enough task in itself.
Making custom icons for different nodes is often overkill, as it adds effort,
but doesn't effect the finished game at all.

This is where *plenticons* saves the day! Providing many different icons,
instead of having to make them on your own, just pick and choose which one fits
your node!

Each icon comes in multiple color variations, using Godot's standard node
colors for your color coding pleasure! White and black variants are also
included, to be used as masks, or tinting.

And with its permissive license, *plenticons* can be used outside of the Godot
editor, in your games, applications, wherever you deem fit!

## Install

Depending on your preference, you may:

* Download from the Godot Asset Library, searching for *plenticons*
* Download the latest [release] from Github

## Usage

After importing the addon to your Godot project, use the `@icon` annotation on your custom scripts, e.g.:

```gdscript
@icon("res://addons/plenticons/icons/16x/foxs-sake/plenticons-yellow.png")
```

For the HiDPI version, replace `16x` with `64x-hidpi` in the path:

```gdscript
@icon("res://addons/plenticons/icons/64x-hidpi/foxs-sake/plenticons-yellow.png")
```

To pick an icon visually, browsing the [site] and clicking on an icon will show
the corresponding code snippet. Clicking on the snippet will automatically copy
it to the clipboard.

## Support

If you've found *plenticons* useful, feel free to fund us on ko-fi:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T8WZD0W)

## License

*plenticons* is under the [CC0 1.0 license](LICENSE).

[Dedicated site]: https://foxssake.github.io/plenticons/
[Godot]: https://godotengine.org/
[release]: https://github.com/foxssake/plenticons/releases
[site]: https://foxssake.github.io/plenticons/
