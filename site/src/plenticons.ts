import rawManifest from '../manifest.json';

import discordIcon from './assets/discord-mark-white.svg';
import githubIcon from './assets/github-mark-white.svg';
import kofiIcon from './assets/kofi_symbol.svg';

export const Variants = ['gray', 'red', 'blue', 'green', 'yellow', 'white', 'black'] as const;
export const DefaultVariant: Variant = Variants[0];
export type Variant = typeof Variants[number];

export const Resolutions = ['16x', '64x-hidpi'] as const;
export const DefaultResolution = Resolutions[0];
export type Resolution = typeof Resolutions[number];

export type Category = string;

export interface Manifest {
  icons: Record<Category, string[]>;
  bundle: string;
}

export const manifest: Manifest = rawManifest;

export const icons = {
  discord: discordIcon,
  github: githubIcon,
  kofi: kofiIcon
}

export function capitalize(text: string): string {
  return text.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function unslug(text: string): string {
  const knownSlugs: Record<string, string> = {
    '2d': '2D',
    '3d': '3D',
    'foxs-sake': 'Fox\'s Sake'
  }

  return knownSlugs[text] || capitalize(text.replace(/-/, ' '))
}

export function getIconPath(category: Category, name: string, variant: Variant): string {
  return `icons/${category}/${name}-${variant}.svg`;
}

export function getImportPath(category: Category, name: string, variant: Variant, resolution: Resolution = DefaultResolution): string {
  return `res://addons/plenticons/icons/${resolution}/${category}/${name}-${variant}.png`
}
