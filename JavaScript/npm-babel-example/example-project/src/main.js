class Animal {
    constructor (name, race) {
        this._name = name;
        this._race = race;
    }

    get name () {
        return this._name;
    }

    get race () {
        return this._race;
    }

}

class Dog extends Animal {
    constructor (name, race) {
        super (name, race);
    }

    bark () {
        return 'Au au!';
    }

}

class Cat extends Animal {
    constructor (name, race) {
        super (name, race);
    }

    meow () {
        return 'Meow meow!'
    }
}

const Podolski = new Dog('Podolski', 'Chow Chow');
console.log(Podolski.name);
console.log(Podolski.race);
console.log(Podolski.bark());

const Cesar = new Cat('Cesar', 'Siamese');
console.log(Cesar.name);
console.log(Cesar.race);
console.log(Cesar.meow());