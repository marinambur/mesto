export class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems(items) {
        items.reverse();
        items.forEach((item) => {
            this._renderer(item);
        });
    }

    setItem(element) {
        this._container.prepend(element);
    }
}