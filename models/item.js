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
        if (items.length < num) {
            return cb(items);
        }
        return cb(items.slice(-1*num));
    })
}

module.exports = class Item {
    constructor(t, p = "", s = {}, c={}) {
        this.id = Math.round(Math.random() * 10000)
        this.title = t;
        this.poster = p;
        this.summary = s;
        this.cast = c;
    };

    save() {
            getItemsFromFile(items => {
                items.push(this);
                fs.writeFile(p, JSON.stringify(items), (err) => {
                    console.log(err);
                });
            });
    }

    static fetch(cb, num=0) {
        getItemsFromFile(cb, num);
    }

    static findById(id, cb){
        getItemsFromFile(items => {
            const item = items.find(m => m.id == id);
            cb(item);
        });
    }

}