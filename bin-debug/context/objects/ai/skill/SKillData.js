var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var SkillData = (function () {
        function SkillData() {
            this.autoRecover = true;
            this.toPoolTime = 0;
        }
        SkillData.prototype.initialize = function (template) {
            this._template = template;
            this._data = s.TypeSkill.getData(this._template.type);
            this._cd = this._template.cd;
            this._lastTime = 0;
            this._isValid = true;
        };
        SkillData.prototype.reset = function () {
            this._data = null;
            this._template = null;
            this._cd = this._lastTime = undefined;
            this._isValid = false;
        };
        Object.defineProperty(SkillData.prototype, "isValid", {
            /**当前技能是否有效*/
            get: function () {
                return this._isValid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "sound", {
            get: function () {
                return this._template.sound;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "config", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "lastTime", {
            get: function () {
                return this._lastTime;
            },
            set: function (v) {
                this._lastTime = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "id", {
            get: function () {
                return this._template.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "type", {
            get: function () {
                return this._template.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "lockTarget", {
            get: function () {
                return this._template.lockTarget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "skillType", {
            get: function () {
                return this._template.skillType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "action", {
            get: function () {
                return this._data.action;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "rockbefore", {
            get: function () {
                return this._data.rockbefore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "rockafter", {
            get: function () {
                return this._data.rockafter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "continue", {
            get: function () {
                return this._data.continue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "distanceTile", {
            get: function () {
                if (this._template)
                    return ((this._template.distance > 2 || this._template.distance == 0) ? this._template.distance : 2);
                return this._data.distanceTile;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillData.prototype, "cd", {
            get: function () {
                return this._cd;
            },
            enumerable: true,
            configurable: true
        });
        return SkillData;
    }());
    s.SkillData = SkillData;
    __reflect(SkillData.prototype, "s.SkillData", ["utils.IPool"]);
})(s || (s = {}));
