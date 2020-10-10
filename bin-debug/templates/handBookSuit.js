var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var handBookSuit = (function () {
        function handBookSuit() {
        }
        Object.defineProperty(handBookSuit.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookSuit.prototype, "order", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookSuit.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookSuit.prototype, "bookType", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookSuit.prototype, "consume", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookSuit.prototype, "properties", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        handBookSuit.prototype.decode = function (data) {
            this._data = data;
        };
        return handBookSuit;
    }());
    templates.handBookSuit = handBookSuit;
    __reflect(handBookSuit.prototype, "templates.handBookSuit");
})(templates || (templates = {}));
