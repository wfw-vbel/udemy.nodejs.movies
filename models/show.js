Item = require('./item');
db = require('../data/database');

module.exports = class Show extends Item {
    constructor(id, title, poster = "", type, summary = {}, cast={}) {
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.summary = summary;
        this.cast = cast;
        this.type = type;
    };

    static fetch() {
        return db.execute("SELECT *, 'shows' as type FROM shows");
    }
}