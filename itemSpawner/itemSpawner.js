{
  let fs = require('fs');
  let locale = 'en_US';
  
  let sounds = {
    hover: new Sound('../../media/sound/menu/menu-hover.ogg'),
    select: new Sound('../../media/sound/menu/menu-submit.ogg')
  };

  fs.readFile('assets/data/item-database.json', (err, data) => {
    if (err) throw err;
    let itemDb = JSON.parse(data);

    let ul = $("#ulItems");
    let i = 0;
    for (let item of itemDb.items) {
      let name = item.name[locale] || item.name.en_US;

      let li = $("<li>").append(
        $("<p>").html(name)
      ).data('index', i).click(spawn).mouseenter(() => sounds.hover.play());
      li.appendTo(ul);

      i++;
    }
  });

  function spawn() {
    let itemIndex = $(this).data('index');
    let amount = 1;
    itemSpawner.spawn(itemIndex, amount);
    sounds.select.play();
  }

  document.addEventListener('keydown', (evt) => {
    if (evt.code === "Escape") window.close();
  });
}