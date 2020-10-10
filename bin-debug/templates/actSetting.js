var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var actSetting = (function () {
        function actSetting() {
        }
        Object.defineProperty(actSetting.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "des", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "typeTable", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "startType", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "startDay", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "activeTime", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "dayStart", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "dayEnd", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "resetType", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "expand", {
            get: function () {
                return this._data[11];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "isOpen", {
            get: function () {
                return this._data[12];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "platform", {
            get: function () {
                return this._data[13];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "mailId", {
            get: function () {
                return this._data[14];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "params", {
            get: function () {
                return this._data[15];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "params2", {
            get: function () {
                return this._data[16];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(actSetting.prototype, "functionId", {
            get: function () {
                return this._data[17];
            },
            enumerable: true,
            configurable: true
        });
        ;
        actSetting.prototype.decode = function (data) {
            this._data = data;
        };
        return actSetting;
    }());
    templates.actSetting = actSetting;
    __reflect(actSetting.prototype, "templates.actSetting");
})(templates || (templates = {}));
