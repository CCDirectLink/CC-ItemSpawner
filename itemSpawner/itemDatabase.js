class ItemDatabase {
  constructor(data) {
    // Parse data
    if (data instanceof Buffer) {
      this.database = JSON.parse(data);
    } else if (data instanceof Object) {
      this.database = data;
    } else if (data instanceof Array) {
      this.database = { items: data };
    }
    
    if (!this.database || !this.database.items instanceof Array) {
      throw "Invalid ItemDatabase data.";
    }

    // Assign item indices.
    for (let i = 0; i < this.database.items.length; i++) {
      this.database.items[i].index = i;
    }
    this.order();
  }
  
  order(f) {
    let items = this.database.items.slice();

    if (typeof f === 'function') items.sort(f);
    else items.sort((a, b) => a.order - b.order);

    this.items = items;
    return items;
  }

  filter(predicate) {
    if (typeof predicate !== 'function') throw "predicate must be a function.";
    return this.getItems().filter(predicate);
  }

  getItems() {
    return this.items || this.database.items;
  }
}
