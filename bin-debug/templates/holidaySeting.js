var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var holidaySeting = (function () {
        function holidaySeting() {
        }
        Object.defineProperty(holidaySeting.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "resourceType", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "type", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "order", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "name", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "des", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "typeTable", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "startDate", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "Time", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "isOpen", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "limitOpenDate", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "limitMergeDate", {
            get: function () {
                return this._data[11];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "dayStart", {
            get: function () {
                return this._data[12];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "dayEnd", {
            get: function () {
                return this._data[13];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "vipStart", {
            get: function () {
                return this._data[14];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "vipEnd", {
            get: function () {
                return this._data[15];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "ResetType", {
            get: function () {
                return this._data[16];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "effect", {
            get: function () {
                return this._data[17];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidaySeting.prototype, "platform", {
            get: function () {
                return this._data[18];
            },
            enumerable: true,
            configurable: true
        });
        ;
        holidaySeting.prototype.decode = function (data) {
            this._data = data;
        };
        return holidaySeting;
    }());
    templates.holidaySeting = holidaySeting;
    __reflect(holidaySeting.prototype, "templates.holidaySeting");
})(templates || (templates = {}));
