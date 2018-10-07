let fs = require('fs');
let locale = 'en_US';

let sounds = {
  hover: new Sound('../../media/sound/menu/menu-hover.ogg'),
  select: new Sound('../../media/sound/menu/menu-submit.ogg')
};

let itemDb = null;

function spawn() {
  let itemIndex = $(this).data('index');
  console.log("Spawning item with index", itemIndex, itemDb.items[itemIndex]);

  let amount = 1;
  itemSpawner.spawn(itemIndex, amount);
  sounds.select.play();
}

function showItems(items) {
  let ul = $("#ulItems");
  ul.empty();

  let i = 0;
  for (let item of items) {
    let name = item.name[locale] || item.name.en_US;
    
    let li = $("<li>").append(
      $("<p>").html(name)
    );
    li.addClass('item');
    li.data('index', item.index);
    li.click(spawn);
    li.mouseenter(() => sounds.hover.play());
    li.appendTo(ul);
    
    i++;
  }
}

function filter(items, matchItem) {
  // Assign index
  let i = 0;
  let unfiltered = [];
  console.log(items);
  items.reduce(function(_, curr) {
    curr.index = i;
    console.log("filter", curr.name.en_US, curr.index);
    unfiltered.push(curr);
    i++;
  }, {});

  // Order
  unfiltered.sort(function(a, b) {
    return a.order - b.order;
  });

  if (!matchItem) return unfiltered;
  
  // Filter
  let filtered = [];
  for (let item of unfiltered) {
    if (matchItem(item)) filtered.push(item);
  }
  
  return filtered;
}

fs.readFile('assets/data/item-database.json', (err, data) => {
  if (err) throw err;
  itemDb = JSON.parse(data);
  let items = filter(itemDb.items);
  showItems(items);
});

$(".category").click(function(evt) {
  let $this = $(this);
  let active = !$this.data('selected');

  $this.data('selected', active);
  $this.css('background', active ? 'url(img/category-selected.png), url(img/category.png)' : 'url(img/category.png');
  $this.siblings().data('selected', false).css('background', 'url(img/category.png');

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
  showItems(items);
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === "Escape") window.close();
});