'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animal = function () {
    function Animal(name, race) {
        _classCallCheck(this, Animal);

        this._name = name;
        this._race = race;
    }

    _createClass(Animal, [{
        key: 'name',
        get: function get() {
            return this._name;
        }
    }, {
        key: 'race',
        get: function get() {
            return this._race;
        }
    }]);

    return Animal;
}();

var Dog = function (_Animal) {
    _inherits(Dog, _Animal);

    function Dog(name, race) {
        _classCallCheck(this, Dog);

        return _possibleConstructorReturn(this, (Dog.__proto__ || Object.getPrototypeOf(Dog)).call(this, name, race));
    }

    _createClass(Dog, [{
        key: 'bark',
        value: function bark() {
            return 'Au au!';
        }
    }]);

    return Dog;
}(Animal);

var Cat = function (_Animal2) {
    _inherits(Cat, _Animal2);

    function Cat(name, race) {
        _classCallCheck(this, Cat);

        return _possibleConstructorReturn(this, (Cat.__proto__ || Object.getPrototypeOf(Cat)).call(this, name, race));
    }

    _createClass(Cat, [{
        key: 'meow',
        value: function meow() {
            return 'Meow meow!';
        }
    }]);

    return Cat;
}(Animal);

var Podolski = new Dog('Podolski', 'Chow Chow');
console.log(Podolski.name);
console.log(Podolski.race);
console.log(Podolski.bark());

var Cesar = new Cat('Cesar', 'Siamese');
console.log(Cesar.name);
console.log(Cesar.race);
console.log(Cesar.meow());