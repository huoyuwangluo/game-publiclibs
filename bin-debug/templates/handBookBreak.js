var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var handBookBreak = (function () {
        function handBookBreak() {
        }
        Object.defineProperty(handBookBreak.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBreak.prototype, "breakLv", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBreak.prototype, "nextId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBreak.prototype, "growGen", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBreak.prototype, "talent", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBreak.prototype, "bingFa", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBreak.prototype, "generalPro", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        handBookBreak.prototype.decode = function (data) {
            this._data = data;
        };
        return handBookBreak;
    }());
    templates.handBookBreak = handBookBreak;
    __reflect(handBookBreak.prototype, "templates.handBookBreak");
})(templates || (templates = {}));
