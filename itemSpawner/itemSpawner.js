var fs = require('fs');
var locale = 'en_US';

var sounds = {
  hover: new Sound('../../media/sound/menu/menu-hover.ogg'),
  cancel: new Sound('../../media/sound/menu/menu-cancel.ogg'),
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

$(".category").hover(() => sounds.hover.play());
/**
 * Changes category.
 */
$(".category").click(function(evt) {

  let $this = $(this);
  let active = !$this.data('selected');
  
  let snd = active ? sounds.select : sounds.cancel;
  snd.play();

  $this.data('selected', active);
  if (active) $this.addClass("catSelected"); else $this.removeClass("catSelected");
  $this.siblings().removeClass("catSelected").data('selected', null);

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

  let items = itemDb.filter(f);
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
  itemDb = new ItemDatabase(data);
  
  showItems(itemDb.getItems());
});
