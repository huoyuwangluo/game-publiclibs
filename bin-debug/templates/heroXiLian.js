var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var heroXiLian = (function () {
        function heroXiLian() {
        }
        Object.defineProperty(heroXiLian.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLian.prototype, "weight", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(heroXiLian.prototype, "properties", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        heroXiLian.prototype.decode = function (data) {
            this._data = data;
        };
        return heroXiLian;
    }());
    templates.heroXiLian = heroXiLian;
    __reflect(heroXiLian.prototype, "templates.heroXiLian");
})(templates || (templates = {}));
