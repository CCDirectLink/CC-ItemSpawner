const EventEmitter = require('events');

class CategoryButton {
  constructor(group, name, icon, filter) {
    this.group = group;
    this.name = name;
    this.icon = icon;
    this.filter = filter;
    this.selected = false;
    CategoryButton.emitter.on('toggled', (sender, status) => {
      if (this.group !== sender.group) return;
      if (this === sender) return;
      
      if (status) this.selected = false;
      console.log("Set", this.name, this.selected);
    });
    this.emitter = new EventEmitter();
  }

  toggle() {
    this.selected = !this.selected;
    return this.selected;
  }

  getEmitter() {
    return this.emitter;
  }

  view(vnode) {
    let d = m('div', {
      class: this.selected ? "catSelected category" : "category",
      onclick: () => {
        this.toggle();
        this.emitter.emit('toggled', this, this.selected);
        CategoryButton.emitter.emit('toggled', this, this.selected);
      }
    }, [
      m('img', { src: this.icon }),
      m('span', this.name )
    ]);
    return d;
  }
}

CategoryButton.emitter = new EventEmitter();