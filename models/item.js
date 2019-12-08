const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'items.json'
);

const getItemsFromFile = (cb, num) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) { return cb([]); }
        const items = JSON.parse(fileContent);
        return cb(items);
    })
};


module.exports = class Item {
    constructor(id, title, poster = "", type, summary = {}, cast={}) {
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.summary = summary;
        this.cast = cast;
        this.type = type;
    };

    save() {
        getItemsFromFile(items => {
            items.push(this);
            fs.writeFile(p, JSON.stringify(items), (err) => {
                console.log(err);
            });
        });
    }

    saveChanges() {
        getItemsFromFile(items => {
            const existingItemIndex = items.findIndex(i => i.id == this.id);
            items[existingItemIndex] = this;
            fs.writeFile(p, JSON.stringify(items), (err) => {
                console.log(err);
            })
        });
    };

    static deleteById(id){
        getItemsFromFile(items => {
        const existingItemIndex = items.findIndex(i => i.id === id);
            items.splice(existingItemIndex, 1);
            fs.writeFile(p, JSON.stringify(items), (err) => {
                console.log(err);
            });
        });
    };

    static fetch(cb) {
        getItemsFromFile(cb);
      }

    static findById(id, cb){
        getItemsFromFile(items => {
            const item = items.find(m => m.id == id);
            cb(item);
        });
    }

}