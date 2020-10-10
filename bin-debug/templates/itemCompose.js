var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var itemCompose = (function () {
        function itemCompose() {
        }
        Object.defineProperty(itemCompose.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemCompose.prototype, "mainType", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemCompose.prototype, "type", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemCompose.prototype, "needItem", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemCompose.prototype, "needNum", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(itemCompose.prototype, "endItem", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        itemCompose.prototype.decode = function (data) {
            this._data = data;
        };
        return itemCompose;
    }());
    templates.itemCompose = itemCompose;
    __reflect(itemCompose.prototype, "templates.itemCompose");
})(templates || (templates = {}));
