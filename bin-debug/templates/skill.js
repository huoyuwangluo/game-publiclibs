var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var skill = (function () {
        function skill() {
        }
        Object.defineProperty(skill.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "pos", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "Level", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "job", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "petId", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "skillType", {
            get: function () {
                return this._data[6];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "Desc", {
            get: function () {
                return this._data[7];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "coefficients", {
            get: function () {
                return this._data[8];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "fixValue", {
            get: function () {
                return this._data[9];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "cd", {
            get: function () {
                return this._data[10];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "prophaseCd", {
            get: function () {
                return this._data[11];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "icon", {
            get: function () {
                return this._data[12];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "buffStr", {
            get: function () {
                return this._data[13];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "triggerRate", {
            get: function () {
                return this._data[14];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "triggerValue", {
            get: function () {
                return this._data[15];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "target", {
            get: function () {
                return this._data[16];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "type", {
            get: function () {
                return this._data[17];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "drifting", {
            get: function () {
                return this._data[18];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "driftingBG", {
            get: function () {
                return this._data[19];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "sound", {
            get: function () {
                return this._data[20];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "releaseEffect", {
            get: function () {
                return this._data[21];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "flyEffect", {
            get: function () {
                return this._data[22];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "hitEffect", {
            get: function () {
                return this._data[23];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "speciallyEffect", {
            get: function () {
                return this._data[24];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "attType", {
            get: function () {
                return this._data[25];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "skillRange", {
            get: function () {
                return this._data[26];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "distance", {
            get: function () {
                return this._data[27];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "lockTarget", {
            get: function () {
                return this._data[28];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(skill.prototype, "maxKill", {
            get: function () {
                return this._data[29];
            },
            enumerable: true,
            configurable: true
        });
        ;
        skill.prototype.decode = function (data) {
            this._data = data;
        };
        return skill;
    }());
    templates.skill = skill;
    __reflect(skill.prototype, "templates.skill");
})(templates || (templates = {}));
