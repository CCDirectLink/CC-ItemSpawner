# CrossCode - Item Spawner

CrossCode mod to spawn items in.  
Uses [CCLoader](https://github.com/CCDirectLink/CCLoader).

Note that this mod will let you spawn in any item, but it does not trigger any events that normally happen when obtaining certain items. In particular, most valuables will not work when spawned.  

**I can not guarantee that there are no items which will break the game when spawned through the item spawner!**

![](https://i.imgur.com/DvuB8Ae.png)

## Installation

> CCLoader is required. Installation steps can be found on the [official repository](https://github.com/CCDirectLink/CCLoader).

* [Download a release](https://github.com/CCDirectLink/CC-ItemSpawner/releases).
* Unpack `itemSpawner` to `/CrossCode/assets/mods`.

## Usage

> If you set your game to pause when unfocused, the game will be paused while spawning items.

* Press <kbd>U</kbd> in-game to open the item spawner.
* Select an item to spawn it.

## Building the Sources

To build the source code, simply use `npm install` followed by `tsc` within the `itemSpawner` folder to compile the code. This will generate files in the `dist` folder that the mod depends on. All other files are ready as-is.
