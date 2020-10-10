var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var equip = (function () {
        function equip() {
        }
        Object.defineProperty(equip.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "prompt", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "des", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "mainType", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "type", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "pos", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "step", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "quality", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "lv", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "icon", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "model", {
            get: function () {
                return this._data[11];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "starLimit", {
            get: function () {
                return this._data[12];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "split", {
            get: function () {
                return this._data[13];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "nextId", {
            get: function () {
                return this._data[14];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "combine", {
            get: function () {
                return this._data[15];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "count", {
            get: function () {
                return this._data[16];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "buyGold", {
            get: function () {
                return this._data[17];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "buyIngot", {
            get: function () {
                return this._data[18];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "score", {
            get: function () {
                return this._data[19];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "properties", {
            get: function () {
                return this._data[20];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "maxAlarm", {
            get: function () {
                return this._data[21];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(equip.prototype, "highAlarm", {
            get: function () {
                return this._data[22];
            },
            enumerable: true,
            configurable: true
        });
        ;
        equip.prototype.decode = function (data) {
            this._data = data;
        };
        return equip;
    }());
    templates.equip = equip;
    __reflect(equip.prototype, "templates.equip");
})(templates || (templates = {}));
