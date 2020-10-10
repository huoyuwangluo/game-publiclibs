var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var itemWay = (function () {
        function itemWay() {
        }
        Object.defineProperty(itemWay.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemWay.prototype, "itemId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemWay.prototype, "type", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemWay.prototype, "des", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemWay.prototype, "functionId", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        itemWay.prototype.decode = function (data) {
            this._data = data;
        };
        return itemWay;
    }());
    templates.itemWay = itemWay;
    __reflect(itemWay.prototype, "templates.itemWay");
})(templates || (templates = {}));
