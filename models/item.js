db = require('../data/database');


module.exports = class Item {
    constructor(title, poster = "", type, summary = {}, cast={}) {
        this.title = title;
        this.poster = poster;
        this.summary = summary;
        this.cast = cast;
        this.type = type;
    };

    save(){
        var query = ('INSERT INTO ?? (title, poster) VALUES (?, ?)');
        var params = [this.type, this.title, this.poster];
        return db.execute(db.format(query, params));
    };

    saveChanges() {
    };

    static deleteById(id){
    };

    static fetch(n=0) {
        var query = "(SELECT *, 'movies' as type FROM movies) UNION (SELECT *, 'shows' as type FROM shows)";
        return db.execute(query);
    }

    static findById(id){

    }

}