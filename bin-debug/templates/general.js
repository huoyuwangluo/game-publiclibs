var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var general = (function () {
        function general() {
        }
        Object.defineProperty(general.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "type", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "name", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "des", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "star", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "attType", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "country", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "quality", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "corps", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "job", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "godDevil", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "sex", {
            get: function () {
                return this._data[11];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "skillMP", {
            get: function () {
                return this._data[12];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "basicSkillId", {
            get: function () {
                return this._data[13];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "skill", {
            get: function () {
                return this._data[14];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "attackOrder", {
            get: function () {
                return this._data[15];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "model", {
            get: function () {
                return this._data[16];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "talk", {
            get: function () {
                return this._data[17];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "rewards", {
            get: function () {
                return this._data[18];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "growHP", {
            get: function () {
                return this._data[19];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "growATT", {
            get: function () {
                return this._data[20];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "growDEF", {
            get: function () {
                return this._data[21];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "growCROSS", {
            get: function () {
                return this._data[22];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "score", {
            get: function () {
                return this._data[23];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(general.prototype, "properties", {
            get: function () {
                return this._data[24];
            },
            enumerable: true,
            configurable: true
        });
        ;
        general.prototype.decode = function (data) {
            this._data = data;
        };
        return general;
    }());
    templates.general = general;
    __reflect(general.prototype, "templates.general");
})(templates || (templates = {}));
