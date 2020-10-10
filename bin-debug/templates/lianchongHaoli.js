var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var lianchongHaoli = (function () {
        function lianchongHaoli() {
        }
        Object.defineProperty(lianchongHaoli.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lianchongHaoli.prototype, "rmb", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lianchongHaoli.prototype, "days", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(lianchongHaoli.prototype, "rewards", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        lianchongHaoli.prototype.decode = function (data) {
            this._data = data;
        };
        return lianchongHaoli;
    }());
    templates.lianchongHaoli = lianchongHaoli;
    __reflect(lianchongHaoli.prototype, "templates.lianchongHaoli");
})(templates || (templates = {}));
