var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var item = (function () {
        function item() {
        }
        Object.defineProperty(item.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "prompt", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "des", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "mainType", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "type", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "quality", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "icon", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "lv", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "lootLib", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "split", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "nextId", {
            get: function () {
                return this._data[11];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "combine", {
            get: function () {
                return this._data[12];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "extraParam", {
            get: function () {
                return this._data[13];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "table", {
            get: function () {
                return this._data[14];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "outId", {
            get: function () {
                return this._data[15];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "effectId", {
            get: function () {
                return this._data[16];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "functionId", {
            get: function () {
                return this._data[17];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "count", {
            get: function () {
                return this._data[18];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "buyGold", {
            get: function () {
                return this._data[19];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "buyIngot", {
            get: function () {
                return this._data[20];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "score", {
            get: function () {
                return this._data[21];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "properties", {
            get: function () {
                return this._data[22];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "maxAlarm", {
            get: function () {
                return this._data[23];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(item.prototype, "highAlarm", {
            get: function () {
                return this._data[24];
            },
            enumerable: true,
            configurable: true
        });
        ;
        item.prototype.decode = function (data) {
            this._data = data;
        };
        return item;
    }());
    templates.item = item;
    __reflect(item.prototype, "templates.item");
})(templates || (templates = {}));
