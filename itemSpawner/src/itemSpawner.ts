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
filters.set('rarity', { [0]: true, [1]: true, [2]: true, [3]: true, [4]: true, [5]: true })

/* Load categories */
let catDiv = document.getElementById('categories');
Categories.forEach(category => {
  let dom = category.html();
  dom.addEventListener('mouseenter', () => sounds.getSound('hover').play());
  dom.addEventListener('click', function() {
    let on = filters.get('category') !== category.filter;
    filters.set('category', on ? category.filter : null);
    
    if (on)
    $(dom).addClass("catSelected");
    else
    $(dom).removeClass("catSelected");
    // I'm not even gonna attempt this one w/o jQuery
    $(dom).siblings().removeClass("catSelected");
    
    sounds.getSound(on ? 'submit' : 'cancel').play();
    showFiltered();
  });
  catDiv.appendChild(dom);
});

$(".rarity").click(function() {
  let $img = $(this).find("img");
  $img.toggle();
  let rarities = filters.get('rarity');
  let r = parseInt($(this).data("index"));
  if ($img.is(":visible")){
    rarities[r] = true;
    sounds.getSound('submit').play();
  } else {
    delete rarities[r];
    sounds.getSound('cancel').play();
  }
  console.log(rarities);

  filters.set('rarity', rarities);

  showFiltered();
});

let noKeySound = {
  [16]: true, [17]: true, [18]: true,
  [27]: true, [37]: true, [39]: true
};
$("#searchText").on('keyup change', function(evt) {
  let v = $(this).val();
  filters.set('text', v);
  showFiltered();
}).on('keydown', function(evt) {
  if (!noKeySound[evt.which]) sounds.getSound('hover').play();
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

  if (filters.has('rarity'))
  {
    items = ItemDatabase.filterByRarity(items, filters.get('rarity'));
  }

  if (filters.has('category'))
  {
    items = ItemDatabase.filter(items, filters.get('category'));
  }

  if (filters.has('text')) {
    let text = filters.get('text');
    if (text && text.trim()) {
      items = ItemDatabase.filterByText(items, text);
    }
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
