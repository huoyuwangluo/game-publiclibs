var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var holidayRecharge = (function () {
        function holidayRecharge() {
        }
        Object.defineProperty(holidayRecharge.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayRecharge.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayRecharge.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayRecharge.prototype, "buyTimes", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayRecharge.prototype, "value", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayRecharge.prototype, "rechargeId", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayRecharge.prototype, "order", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayRecharge.prototype, "rewards", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        holidayRecharge.prototype.decode = function (data) {
            this._data = data;
        };
        return holidayRecharge;
    }());
    templates.holidayRecharge = holidayRecharge;
    __reflect(holidayRecharge.prototype, "templates.holidayRecharge");
})(templates || (templates = {}));
