const inquirer = require('inquirer');
const Player = require('../lib/Player');
const Enemy = require('../lib/Enemy');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
};

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('Crackerlord Noknuts', 'two yo-yos'));
    this.enemies.push(new Enemy('Jim', 'buster sword'));
    this.enemies.push(new Enemy('that one guy you hate from the gym', 'box of literally all the dumbells'));

    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt ({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        .then(({name}) => {
            this.player = new Player(name);
            this.startNewBattle();
        });
};

module.exports = Game;