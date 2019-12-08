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
    constructor(t, p = "", s = {}, c={}) {
        this.title = t;
        this.poster = p;
        this.summary = s;
        this.cast = c;
    }

    save() {
            getMoviesFromFile(movies => {
                this.id = movies.length;
                console.log(this.id);
                movies.push(this);
                fs.writeFile(p, JSON.stringify(movies), (err) => {
                    console.log(err);
                });
            });
    }

    static fetch(cb, num=0) {
        getMoviesFromFile(cb, num);
    }

    static findById(id, cb){
        getMoviesFromFile(movies => {
            const movie = movies.find(m => m.id == id);
            cb(movie);
        });
    }

}