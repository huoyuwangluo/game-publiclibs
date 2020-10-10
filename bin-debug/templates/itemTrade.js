var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var itemTrade = (function () {
        function itemTrade() {
        }
        Object.defineProperty(itemTrade.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemTrade.prototype, "price", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemTrade.prototype, "priceMin", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemTrade.prototype, "priceMax", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemTrade.prototype, "personalPool", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemTrade.prototype, "serverPool1", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemTrade.prototype, "serverPool2", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemTrade.prototype, "serverPool3", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemTrade.prototype, "serverPool4", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        itemTrade.prototype.decode = function (data) {
            this._data = data;
        };
        return itemTrade;
    }());
    templates.itemTrade = itemTrade;
    __reflect(itemTrade.prototype, "templates.itemTrade");
})(templates || (templates = {}));
