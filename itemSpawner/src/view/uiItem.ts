import { Item } from '../model/item.js'

export class UIItem {
    item: Item;

    constructor(item : Item)
    {
        this.item = item;
    }

    public html() : HTMLLIElement {
        let li = <HTMLLIElement>document.createElement('li');
        li.className = "item";

        let img = <HTMLSpanElement>document.createElement('span');
        img.className = "icon";
        if (this.item.icon)
        {
            img.className += " " + this.item.icon;
            if (typeof this.item.rarity === "number") img.className += "-" + this.item.rarity;
        }

        let p = <HTMLParagraphElement>document.createElement('p');
        p.className = "itemName";
        p.innerText = `[${this.item.index}] ${this.item.name['en_US']}`;

        li.appendChild(img);
        li.appendChild(p);

        return li;
    }
}