import { Minimatch } from "minimatch";
import { manifest, type Manifest } from "./plenticons";

export type Synonyms = Record<string, string[]>;

function makeSynonyms(manifest: Manifest, spec: [string | string[], string | string[]][]): Synonyms {
  const result: Synonyms = {}
  const iconNames = Object.entries(manifest.icons)
    .flatMap(([category, icons]) => icons.map(icon => `${category}/${icon}`))

  for (const entry of spec) {
    const patterns = typeof entry[0] == "string" ? [entry[0]] : entry[0];
    const synonyms = typeof entry[1] == "string" ? [entry[1]] : entry[1];

    for (const pattern of patterns) {
      // Find matching icons
      const matcher = new Minimatch(pattern);
      const matches = iconNames.filter(it => matcher.match(it))

      // Warn if pattern doesn't match - probably spec error
      if (matches.length == 0)
        console.warn(`Pattern "${pattern}" didn't match any icons!`)

      // Add synonyms to each icon
      for (const icon of matches) {
        result[icon] = [...(result[icon] ?? []), ...synonyms]
      }
    }
  }

  return result
}

export const synonyms = makeSynonyms(manifest, [
  // 2D
  ["2d/checkmark", [ "tick", "tickmark", "ok", "done", "yes" ]],
  ["2d/circle", [ "ok", "round" ]],
  ["2d/cross", [ "no", "deny", "ban", "cancel" ]],
  ["2d/square", [ "cube", "box" ]],

  ["2d/triangle*", ["cone"]],
  ["*/die*", [ "dice", "random", "chance", "throwing" ]],
  ["2d/*-chevron-*", [ "arrow", "direction" ]],

  ["2d/plus", [ "add" ]],
  ["2d/spark*", [ "star" ]],

  // 3D
  ["3d/cone", [ "triangle" ]],
  ["3d/cube", [ "square", "box" ]],
  ["3d/sphere", [ "circle", "round" ]],

  // Creatures
  ["creatures/bug", [ "insect", "roach", "tick" ]],
  ["creatures/demon", [ "monster", "enemy", "foe", "evil" ]],
  ["creatures/eye-closed", [ "invisible", "blind", "shut" ]],
  [["creatures/eye-hollow", "creatures/eye"], [ "see", "watch", "visible", "open" ]],

  ["creatures/heart*", [ "life", "lives", "health", "love" ]],
  
  ["creatures/person", [ "human", "man", "woman", "guy", "gal", "boy", "girl", "head" ]],

  // Objects
  ["objects/ammo", [ "shells" ]],
  ["objects/axe", [ "hatchet", "timber", "lumber", "wood" ]],
  ["objects/bell", [ "notification", "alert" ]],
  [["objects/bill", "objects/coins"], [ "money", "currency", "dollars", "euros" ]],
  ["objects/cd", [ "dvd" ]],
  ["objects/chain", [ "link", "anchor", "reference" ]],
  ["objects/chest", [ "box", "treasure", "booty" ]],
  ["objects/clock", [ "watch", "time" ]],
  ["objects/comet", [ "falling star" ]],
  ["objects/floppy", [ "save" ]],
  ["objects/globe", [ "planet", "earth", "global", "internet", "web", "www" ]],
  ["objects/gun", [ "weapon", "arm" ]],
  ["objects/hammer", [ "build" ]],
  ["objects/helmet", [ "head", "armor", "hat" ]],
  ["objects/hourglass", [ "time" ]],
  ["objects/key", [ "password", "open", "access" ]],
  ["objects/lightbulb", [ "idea", "new", "create" ]],
  ["objects/lightning", [ "fast", "speed", "measure", "benchmark" ]],
  ["objects/magnifying-glass", [ "search", "find" ]],
  ["objects/pickaxe", [ "mine", "mining" ]],
  ["objects/shield", [ "protect", "armor", "safe", "security" ]],
  ["objects/stopwatch", [ "time", "measure", "benchmark", "speed", "fast" ]],
  ["objects/sword*", [ "fight", "army", "war", "battle", "force" ]],
  ["objects/trashcan", [ "delete", "clear", "remove", "erase", "recycle", "bin" ]],

  [["objects/vial", "objects/*-flask"], ["vial", "flask", "bottle"]],
  ["objects/conical-flask", ["experiment", "chemistry", "chemical"]],

  // Symbols
  ["symbols/crosshair", [ "aim" ]],
  ["symbols/jump-to", [ "go to", "goto" ]],
  ["symbols/refresh", [ "reload" ]],
  ["symbols/todo", [ "list" ]]
])
