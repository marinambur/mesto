export class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems(items) {
      items.forEach((item) => {
            this._renderer(item);
        });
    }

    setItem(element) {
        this._container.append(element);
    }
}