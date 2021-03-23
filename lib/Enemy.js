const Potion = require('../lib/Potion');
const Character = require('./Character');

class Enemy extends Character {
    constructor(name, weapon) {
        super(name);

        this.weapon = weapon;
        this.potion = new Potion();;
    }

    getDescription() {
        return `${this.name} has appeared weilding a ${this.weapon}, looks like they're ready to FUCK YOU UP!`;
    }
};

module.exports = Enemy;