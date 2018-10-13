import { Item } from '../model/item.js'

export class UICategory {
    name: string;
    image: string;
    
    filter?: Item;

    constructor(name : string, image: string, filter: Item = null)
    {
        this.name = name;
        this.image = image;
        this.filter = filter;
    }

    public html() : HTMLDivElement {
        let div = <HTMLDivElement>document.createElement('div');
        div.className = "category";
        div.dataset['filter'] = JSON.stringify(this.filter);
        
        /* Deprecated
        let img = <HTMLImageElement>document.createElement('img');
        img.src = this.image;
        */
        
        let span = <HTMLSpanElement>document.createElement('span');
        span.innerText = this.name;

        //div.appendChild(img);
        div.appendChild(span);
        return div;
    }
}