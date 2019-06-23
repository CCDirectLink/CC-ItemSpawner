if(!cc) {
  throw "CCLoader is required for this mod.";
}

let gui = require('nw.gui');

var itemSpawner = {
  // Spawner Window handler
  window: null,
  // Functions
  spawn: null
};

/**
 * Spawns an item by invoking the GIVE_ITEM event.
 * @param {number} item Item index in ItemDatabase.
 * @param {number} [amount=1] Item count.
 * @param {boolean} [hidden=false] Hide item receive message.
 */
itemSpawner.spawn = function(item, amount = 1, hidden = false) {
  new cc.ig.events.GIVE_ITEM({item: item, amount: amount, skip: hidden}).start();
};

{
  let initialize = function() {
    /**
     * Opens an itemSpawner window.
     * If already opened, focuses existing window.
     */
    let openInterface = function() {
      if (itemSpawner.window) {
        itemSpawner.window.focus();
        return;
      }
      
      gui.Window.open(
        'assets/mods/itemSpawner/index.html',
        {
          position: 'center',
          width: 476,
          height: 310,
          resizable: false
        },
        (window) => {
          itemSpawner.window = window;

          /** Pass itemSpawner to window.
           * Note: Because the window 'loading' event can't be caught
           *       itemSpawner is not available on document load. */
          window.on('loaded', () => {
            window.window.itemSpawner = itemSpawner;
            window.window.simplify = simplify;
          });

          /* Allow new itemSpawner window. */
          window.on('closed', () => {
            itemSpawner.window = null;
          });
        }
      );    
    }

    /* Open itemSpawner window on 'I' key press. */
    document.addEventListener('keydown', (evt) => {
      if (evt.code === "KeyU") openInterface();
    });
  };

  // Bind initialize
  document.body.addEventListener('modsLoaded', initialize);
}

/* Trying to make the window close with the game.
// Attempt 1 (prevents closing the main window):
nw.Window.get().on('close', function() {
  this.hide();
  if (spawnItem.win) spawnItem.win.close(true);
  this.close(true);
});

// Attempt 2 (doesn't do anything):
$("body").on('beforeunload', function() {
  console.log('beforeunload');
  if (itemSpawner.win) itemSpawner.win.close(true);
});
*/

/* Old notes for self:
  // Sets state "key" to true while 73 (i) is pressed.
  ig.input.bind(73, "key");
  
  // Calls function every frame/update.
  simplify.registerUpdate(() => {});

  // Gets current "key" state
  let p = ig.input.state("key");
*/