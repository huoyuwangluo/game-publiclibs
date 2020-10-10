var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var handBookBase = (function () {
        function handBookBase() {
        }
        Object.defineProperty(handBookBase.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBase.prototype, "general", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBase.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBase.prototype, "maxLv", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBase.prototype, "maxBreak", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBase.prototype, "baseCon", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(handBookBase.prototype, "properties", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        handBookBase.prototype.decode = function (data) {
            this._data = data;
        };
        return handBookBase;
    }());
    templates.handBookBase = handBookBase;
    __reflect(handBookBase.prototype, "templates.handBookBase");
})(templates || (templates = {}));
