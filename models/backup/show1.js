const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'shows.json'
);

const getShowsFromFile = (cb, num) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) { return cb([]); }
        const shows = JSON.parse(fileContent);
        if (shows.length < num) {
            return cb(shows);
        }
        return cb(shows.slice(-1*num));
    })
}

module.exports = class Show {
    constructor(t, p = "", s = {}, c={}) {
        this.title = t;
        this.poster = p;
        this.summary = s;
        this.cast = c;
        this.id = Math.round(Math.random() * 10000);
    }

    save() {
            getShowsFromFile(shows => {
                shows.push(this);
                fs.writeFile(p, JSON.stringify(shows), (err) => {
                    console.log(err);
                });
            });
    }

    static fetch(cb, num=0) {
        getShowsFromFile(cb, num);
    }
    
    static findById(id, cb){
        getShowsFromFile(shows => {
            const show = shows.find(s => s.id == id);
            cb(show);
        });
    }
}