var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var shenBingShop = (function () {
        function shenBingShop() {
        }
        Object.defineProperty(shenBingShop.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenBingShop.prototype, "itemId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenBingShop.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenBingShop.prototype, "condition", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shenBingShop.prototype, "consume", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        shenBingShop.prototype.decode = function (data) {
            this._data = data;
        };
        return shenBingShop;
    }());
    templates.shenBingShop = shenBingShop;
    __reflect(shenBingShop.prototype, "templates.shenBingShop");
})(templates || (templates = {}));
