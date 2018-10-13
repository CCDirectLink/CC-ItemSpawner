declare const Buffer;

import { Item } from './model/item';

export class ItemDatabase {
  database: Array<Item>;

  constructor(data : any) {
    if (data instanceof Buffer)
      this.database = JSON.parse(data).items;
    else if (data instanceof Object && data.items instanceof Array) {
      this.database = data.items;
    } else if (data instanceof Array) {
      this.database = data;
    } else {
      throw "Invalid ItemDatabase data.";
    }

    // Assign item index used by events such as GIVE_ITEM.
    for (let i = 0; i < this.database.length; i++) {
      this.database[i].index = i;
    }
  }

  public order(f: (a: Item, b: Item) => number) : Array<Item> {
    let items = this.database.slice();
    
    if (typeof f === 'function') items.sort(f);
    else items.sort((a, b) => a.order - b.order);
    
    return items;
  }

  private static filterPredicate(item : Item, cfg : any) : boolean {
    for (let key in cfg) {
      if (!cfg.hasOwnProperty(key)) continue;
      
      let val = cfg[key];
      if (item[key] !== val) return false;
    }
    return true;
  }
  
  public static filterByRarity(items: Array<Item>, rarities: any) {
    items = items.filter(function(item) {
      if (typeof item.rarity !== "number") return false;
      return rarities.hasOwnProperty(item.rarity) && rarities[item.rarity];
    });
    return items;
  }

  public static filterByText(items: Array<Item>, text: string) {
    text = text.toLowerCase();
    items = items.filter(function(item) {
      let name : string = item.name.en_US.toLowerCase();
      return name.indexOf(text) >= 0 || item.index.toString().indexOf(text) >= 0;
    });
    return items;
  }

  public static filter(items : Array<Item>, cfg : any) : Array<Item> {
    items = items.filter(function(item) {
      return ItemDatabase.filterPredicate(item, cfg);
    });
    return items;
  }

  public filter(predicate: (item: Item) => boolean) : Array<Item> {
    if (typeof predicate !== 'function') throw "predicate must be a function.";
    return this.getItems().filter(predicate);
  }

  public getItems() : Array<Item> {
    return this.database;
  }
}