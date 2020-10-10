var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var itemJump = (function () {
        function itemJump() {
        }
        Object.defineProperty(itemJump.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemJump.prototype, "itemId", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemJump.prototype, "functionId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemJump.prototype, "functionParams", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        itemJump.prototype.decode = function (data) {
            this._data = data;
        };
        return itemJump;
    }());
    templates.itemJump = itemJump;
    __reflect(itemJump.prototype, "templates.itemJump");
})(templates || (templates = {}));
