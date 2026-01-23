
class Favorite {
    constructor() {
        this.items = {};
        this.load();
    }

    add(item) {
        if (this.items[item.id]) {
            delete this.items[item.id]; 
        } else {
            this.items[item.id] = item;
        }
        this.save();
    }

    save() {
        localStorage.setItem('favorite', JSON.stringify(this.items));
    }

    load() {
        const data = localStorage.getItem('favorite');
        if (data) this.items = JSON.parse(data);
    }

    isLiked(id) {
        return !!this.items[id];
    }

    getAll() {
        return Object.values(this.items);
    }

    clear() {
        this.items = {};
        this.save();
    }
}


window.favorite = new Favorite();
