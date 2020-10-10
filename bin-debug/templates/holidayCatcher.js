var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var holidayCatcher = (function () {
        function holidayCatcher() {
        }
        Object.defineProperty(holidayCatcher.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayCatcher.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayCatcher.prototype, "poolId", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayCatcher.prototype, "dropId", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayCatcher.prototype, "itemId", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayCatcher.prototype, "Num", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayCatcher.prototype, "weight", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayCatcher.prototype, "personalCD", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayCatcher.prototype, "serverCD", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayCatcher.prototype, "isShow", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        holidayCatcher.prototype.decode = function (data) {
            this._data = data;
        };
        return holidayCatcher;
    }());
    templates.holidayCatcher = holidayCatcher;
    __reflect(holidayCatcher.prototype, "templates.holidayCatcher");
})(templates || (templates = {}));
