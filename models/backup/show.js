const Item = require('./item');

module.exports = class Show extends Item{
    constructor(t, p = "", s = {}, c={}) {
        super(t, p = "", s = {}, c={});
        this.type = "shows"
    };
};