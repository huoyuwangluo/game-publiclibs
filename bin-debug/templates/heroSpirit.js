var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var heroSpirit = (function () {
        function heroSpirit() {
        }
        Object.defineProperty(heroSpirit.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroSpirit.prototype, "lv", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroSpirit.prototype, "effectId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroSpirit.prototype, "score", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroSpirit.prototype, "consume", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroSpirit.prototype, "properties", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        heroSpirit.prototype.decode = function (data) {
            this._data = data;
        };
        return heroSpirit;
    }());
    templates.heroSpirit = heroSpirit;
    __reflect(heroSpirit.prototype, "templates.heroSpirit");
})(templates || (templates = {}));
