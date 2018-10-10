declare const itemSpawner;
declare const require;

var fs = require('fs');

import { ItemDatabase } from './itemDatabase.js';
import { Item } from './model/item.js';
import { SoundManager } from './util/soundManager.js';
import { Categories } from './view/categories.js';
import { UIItem } from './view/uiItem.js';

let sounds = SoundManager.default;
var itemDb : ItemDatabase;
let filters : Map<string, any> = new Map<string, any>();

/* Load categories */
let catDiv = document.getElementById('categories');
Categories.forEach(category => {
  let dom = category.html();
  dom.addEventListener('mouseenter', () => sounds.getSound('hover').play());
  dom.addEventListener('click', function() {
    let on = filters.get('category') !== category.filter;
    filters.set('category', on ? category.filter : null);
    
    // I'm not even gonna attempt this one w/o jQuery
    $(dom).siblings().removeClass("catSelected");
    
    sounds.getSound(on ? 'submit' : 'cancel').play();
    showFiltered();
  });
  catDiv.appendChild(dom);
});

/**
 * Spawns an item.
 * @param item Item to spawn. Must have 'index' set.
 */
function spawn(item : Item) {
  itemSpawner.spawn(item.index, 1);
  sounds.getSound('submit').play();
}

function showFiltered() {
  let items = itemDb.getItems();
  for (let cfg of filters) {
    cfg = cfg[1];
    items = ItemDatabase.filter(items, cfg);
  }

  showItems(items);
}

/**
* Shows items.
* Clears item list and shows the given items.
* @param {Array<Item>} items Items to show. Must have 'index' set.
*/
function showItems(items : Array<Item>) {
  let ul = $("#ulItems").empty();

  // Show items.
  items.forEach(item => {
    let ui = new UIItem(<Item>item);
    let dom = ui.html();
    
    dom.addEventListener('mouseenter', () => sounds.getSound('hover').play());
    dom.addEventListener('click', () => spawn(item));
    ul[0].appendChild(dom);
  })
}

/**
 * On Esc, close window.
 */
document.addEventListener('keydown', (evt) => {
  if (evt.code === "Escape") window.close();
});

var data;
/**
 * Read and show items.
 * Sets index of each item for spawning.
 */
fs.readFile('assets/data/item-database.json', (err, data) => {
  if (err) throw err;
  itemDb = new ItemDatabase(data);
  showItems(itemDb.getItems());
});
