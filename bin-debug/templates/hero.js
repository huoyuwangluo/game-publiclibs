var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var hero = (function () {
        function hero() {
        }
        Object.defineProperty(hero.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "des", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "type", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "job", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "sex", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "attType", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "equipId1", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "equipId2", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "modelId", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "equipPos", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "skill", {
            get: function () {
                return this._data[11];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "talent", {
            get: function () {
                return this._data[12];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "mainChapterId", {
            get: function () {
                return this._data[13];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(hero.prototype, "properties", {
            get: function () {
                return this._data[14];
            },
            enumerable: true,
            configurable: true
        });
        ;
        hero.prototype.decode = function (data) {
            this._data = data;
        };
        return hero;
    }());
    templates.hero = hero;
    __reflect(hero.prototype, "templates.hero");
})(templates || (templates = {}));
