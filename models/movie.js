Item = require('./item');
db = require('../data/database');

module.exports = class Movie extends Item {
    constructor(title, poster = "", type, summary = {}, cast={}) {
        this.title = title;
        this.poster = poster;
        this.summary = summary;
        this.cast = cast;
        this.type = "movies";
    };

    static fetch() {
        return db.execute("SELECT *, 'movies' as type FROM movies");
    }

    static findById(id) {
        var query = 'SELECT *, "movies" as type FROM movies WHERE id = ?';
        return(db.execute(query, [id]));
    }
}