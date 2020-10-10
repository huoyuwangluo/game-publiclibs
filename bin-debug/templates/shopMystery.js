var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var shopMystery = (function () {
        function shopMystery() {
        }
        Object.defineProperty(shopMystery.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shopMystery.prototype, "itemId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shopMystery.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shopMystery.prototype, "itemCount", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shopMystery.prototype, "discount", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shopMystery.prototype, "weight", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(shopMystery.prototype, "consume", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        shopMystery.prototype.decode = function (data) {
            this._data = data;
        };
        return shopMystery;
    }());
    templates.shopMystery = shopMystery;
    __reflect(shopMystery.prototype, "templates.shopMystery");
})(templates || (templates = {}));
