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
    this.enemies.push(new Enemy('Crackerlord Noknuts', ' set of two yo-yos'));
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

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.playerTurn = true;
    } else {
        this.playerTurn = false;
    }

    console.log('Your stats are as follows: ');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
};

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                message: 'Which action would you like to take?',
                name: 'action',
                choices: ['Attack', 'Use Potion']
            })
            .then(({action}) => {
                if (action === 'Use Potion') {
                    if(!this.player.getInventory()) {
                        console.log("You don't have any potions!");

                        return this.checkEndOfBattle();

                    } else {
                        inquirer    
                            .prompt({
                                type: 'list',
                                message:'Which potion would you like to use?',
                                name: 'action',
                                choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                            })
                            .then(({action}) => {
                                const potionDetails = action.split(': ');

                                this.player.usePotion(potionDetails[0] - 1);
                                console.log(`You used a ${potionDetails[1]} potion.`);
                                
                                this.checkEndOfBattle();
                            });
                    }

                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked ${this.currentEnemy.name}!`);
                    console.log(this.currentEnemy.getHealth());

                    this.checkEndOfBattle();
                }
            })

    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by ${this.currentEnemy.name}!`);
        console.log(this.player.getHealth());

        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function() {
    if(this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();

    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated ${this.currentEnemy.name}! You showed their ass!`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion!`);

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log('You Win!');
        }
    } else {
        console.log("You've been defeated... pussy");
    }
};
module.exports = Game;