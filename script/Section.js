import {Card} from "./Card.js";
import {items} from "./index.js";


export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._container = document.querySelector(`.${containerSelector}`);
    }

    renderItems() {
        items.forEach((item) => {
            const card = new Card(item, '#template');
            // Добавляем в DOM
            document.querySelector('.grid').prepend(card.generateCard());
        });
    }

    //setItem(element) {
      //  this._container.append(element);
    //}
}