var fs = require('fs');
var locale = 'en_US';

var sounds = {
  hover: new Sound('../../media/sound/menu/menu-hover.ogg'),
  select: new Sound('../../media/sound/menu/menu-submit.ogg')
};

var itemDb = null;

/** Spawns the selected item. */
function spawn() {
  let itemIndex = $(this).data('index');

  let amount = 1;
  itemSpawner.spawn(itemIndex, amount);
  sounds.select.play();
}

/**
* Shows items.
* Clears item list and shows the given items.
* @param {Array} items Items to show. Must have 'index' key set.
*/
function showItems(items) {
  let ul = $("#ulItems");
  
  // Clear items.
  ul.empty();

  // Show items.
  for (let item of items) {
    let name = item.name[locale] || item.name.en_US;
    
    let li = $("<li>")
      .append($("<p>").html(name))
      .addClass('item')
      .data('index', item.index)
      .click(spawn)
      .mouseenter(() => sounds.hover.play())
      .appendTo(ul);
  }
}

/**
 * Orders array by item.order.
 * @param {Array} items Items to order.
 */
function order(items) {
  items.sort(function(a, b) {
    return a.order - b.order;
  });
}

/**
 * Filters an item list.
 * @param {Array} items Items to filter.
 * @param {function} matchItem Predicate that given an item returns whether it should be included.
 */
function filter(items, matchItem) {
  if (!matchItem) return items;

  let filtered = [];
  for (let item of items) {
    if (matchItem(item)) filtered.push(item);
  }
  return filtered;
}

function matchItem(item, cfg) {
  if (!cfg) return true;
  
  // Filter by type
  if (cfg.type) {
    if (typeof cfg.type === 'string' && item.type !== cfg.type) return false;
    if (cfg.type instanceof Array && cfg.type.indexOf(item.type) == -1) return false;
  }
  
  // Filter by equipType
  if (cfg.equipType) {
    if (typeof cfg.equipType === 'string' && item.equipType !== cfg.equipType) return false;
    if (cfg.equipType instanceof Array && cfg.equipType.indexOf(item.equipType) == -1) return false;
  }

  return true;
};

/**
 * Changes category.
 */
$(".category").click(function(evt) {
  let $this = $(this);
  let active = !$this.data('selected');

  $this.data('selected', active);
  if (active) $this.addClass("catSelected"); else $this.removeClass("catSelected");
  $this.siblings().removeClass("catSelected");

  let filterCfg = active ? ($this.data('filter') || {}) : {};
  let f = function(item) {
    // Filter by type
    if (filterCfg.type) {
      if (typeof filterCfg.type === 'string' && item.type !== filterCfg.type) return false;
      if (filterCfg.type instanceof Array && filterCfg.type.indexOf(item.type) == -1) return false;
    }
    
    // Filter by equipType
    if (filterCfg.equipType) {
      if (typeof filterCfg.equipType === 'string' && item.equipType !== filterCfg.equipType) return false;
      if (filterCfg.equipType instanceof Array && filterCfg.equipType.indexOf(item.equipType) == -1) return false;
    }

    return true;
  };

  let items = filter(itemDb.items, f);
  order(items);
  showItems(items);
});

/**
 * On Esc, close window.
 */
document.addEventListener('keydown', (evt) => {
  if (evt.code === "Escape") window.close();
});

/**
 * Read and show items.
 * Sets index of each item for spawning.
 */
fs.readFile('assets/data/item-database.json', (err, data) => {
  if (err) throw err;
  
  itemDb = JSON.parse(data);
  for (let i = 0; i < itemDb.items.length; i++) {
    itemDb.items[i].index = i;
  }

  order(itemDb.items);
  showItems(itemDb.items);
});

let divCategories = document.getElementById('categories');
let categoryButtons = [];

for (let category of categories) {
  let c = new CategoryButton('categories', category.name, category.icon, category.filter);
  c.getEmitter().on('toggled', function(sender, status) {
    if (status) {
      let items = filter(itemDb.items, function(item) { return matchItem(item, sender.filter); });
      showItems(items);
    } else {
      showItems(itemDb.items);
    }
  });

  categoryButtons.push(c);
}

m.mount(divCategories, {
  view: function(vnode) {
    return categoryButtons.map(comp => m(comp, {}));
  }
});