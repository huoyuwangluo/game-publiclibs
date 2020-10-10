var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var heroLv = (function () {
        function heroLv() {
        }
        Object.defineProperty(heroLv.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroLv.prototype, "needExp", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroLv.prototype, "nextId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        heroLv.prototype.decode = function (data) {
            this._data = data;
        };
        return heroLv;
    }());
    templates.heroLv = heroLv;
    __reflect(heroLv.prototype, "templates.heroLv");
})(templates || (templates = {}));
