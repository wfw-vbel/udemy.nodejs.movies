const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'shows.json'
);

const getshowsFromFile = (cb, num) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) { return cb([]); }
        const shows = JSON.parse(fileContent);
        if (shows.length < num) {
            return cb(shows);
        }
        return cb(shows.slice(-1*num));
    })
}

module.exports = class Movie {
    constructor(t, p = "") {
        this.title = t;
        this.poster = p
    }

    save() {
            getshowsFromFile(shows => {
                shows.push(this);
                fs.writeFile(p, JSON.stringify(shows), (err) => {
                    console.log(err);
                });
            });
    }

    static fetch(cb, num=0) {
        getshowsFromFile(cb, num);
    }
}