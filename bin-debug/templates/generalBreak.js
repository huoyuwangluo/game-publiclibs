var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var generalBreak = (function () {
        function generalBreak() {
        }
        Object.defineProperty(generalBreak.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "quality", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "star", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "levelOpen", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "needLV", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "nextId", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "consume", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "selfGen", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "otherGen", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "campGen", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "skillLv", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "growPro", {
            get: function () {
                return this._data[11];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "generalPro", {
            get: function () {
                return this._data[12];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "bingfaOpen", {
            get: function () {
                return this._data[13];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "shenbingOpen", {
            get: function () {
                return this._data[14];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "selfGenFast", {
            get: function () {
                return this._data[15];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "otherGenFast", {
            get: function () {
                return this._data[16];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "campGenFast", {
            get: function () {
                return this._data[17];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "bentiReduceGen", {
            get: function () {
                return this._data[18];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "reduceGen", {
            get: function () {
                return this._data[19];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "reduceConsume", {
            get: function () {
                return this._data[20];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "recover", {
            get: function () {
                return this._data[21];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(generalBreak.prototype, "properties", {
            get: function () {
                return this._data[22];
            },
            enumerable: true,
            configurable: true
        });
        ;
        generalBreak.prototype.decode = function (data) {
            this._data = data;
        };
        return generalBreak;
    }());
    templates.generalBreak = generalBreak;
    __reflect(generalBreak.prototype, "templates.generalBreak");
})(templates || (templates = {}));
