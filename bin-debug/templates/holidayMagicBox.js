var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var holidayMagicBox = (function () {
        function holidayMagicBox() {
        }
        Object.defineProperty(holidayMagicBox.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayMagicBox.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayMagicBox.prototype, "des", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayMagicBox.prototype, "startDate", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayMagicBox.prototype, "openDate", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayMagicBox.prototype, "endDate", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayMagicBox.prototype, "order", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayMagicBox.prototype, "rewards1", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayMagicBox.prototype, "rewards2", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(holidayMagicBox.prototype, "rewards3", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        holidayMagicBox.prototype.decode = function (data) {
            this._data = data;
        };
        return holidayMagicBox;
    }());
    templates.holidayMagicBox = holidayMagicBox;
    __reflect(holidayMagicBox.prototype, "templates.holidayMagicBox");
})(templates || (templates = {}));
