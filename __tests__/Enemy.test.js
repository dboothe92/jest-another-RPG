const Enemy = require('../lib/Enemy');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

test('testing for object creation', () => {
    const enemy = new Enemy('Henry VII', 'Javelin');

    expect(enemy.name).toBe('Henry VII');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
    expect(enemy.weapon).toBe('Javelin');
});

test('gets enemy health value', () => {
    const enemy = new Enemy('Estaban', 'Weiner');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

test('checks if enemy is alive', () => {
    const enemy = new Enemy('Greg', 'Big Carrot');

    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0

    expect(enemy.isAlive()).toBeFalsy();
});

test('gets enemy attack value', () => {
    const enemy = new Enemy('Henry', 'A Truck');
    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

test("subtracts from enemy health", () => {
    const enemy = new Enemy('Jordan', 'Tattoo Gun');
    const oldHealth = enemy.health

    enemy.reduceHealth(5);

    expect(enemy.health).toBe(oldHealth - 5);

    enemy.reduceHealth(99999999)

    expect(enemy.health).toBe(0);
});

test("test if enemy has a weapon", () => {
    const enemy = new Enemy('Thunderlord', 'Thunder');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('Thunderlord'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('Thunder'));
});