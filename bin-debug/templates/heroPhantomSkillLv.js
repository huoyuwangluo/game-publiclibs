var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var heroPhantomSkillLv = (function () {
        function heroPhantomSkillLv() {
        }
        Object.defineProperty(heroPhantomSkillLv.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomSkillLv.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomSkillLv.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomSkillLv.prototype, "lv", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomSkillLv.prototype, "talent", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomSkillLv.prototype, "score", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomSkillLv.prototype, "num", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroPhantomSkillLv.prototype, "nextId", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        heroPhantomSkillLv.prototype.decode = function (data) {
            this._data = data;
        };
        return heroPhantomSkillLv;
    }());
    templates.heroPhantomSkillLv = heroPhantomSkillLv;
    __reflect(heroPhantomSkillLv.prototype, "templates.heroPhantomSkillLv");
})(templates || (templates = {}));
