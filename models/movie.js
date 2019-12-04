const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'movies.json'
);

const getMoviesFromFile = (cb, num) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) { return cb([]); }
        const movies = JSON.parse(fileContent);
        if (movies.length < num) {
            return cb(movies);
        }
        return cb(movies.slice(-1*num));
    })
}

module.exports = class Movie {
    constructor(t, p = "") {
        this.title = t;
        this.poster = p
    }

    save() {
            getMoviesFromFile(movies => {
                movies.push(this);
                fs.writeFile(p, JSON.stringify(movies), (err) => {
                    console.log(err);
                });
            });
    }

    static fetch(cb, num=0) {
        getMoviesFromFile(cb, num);
    }
}