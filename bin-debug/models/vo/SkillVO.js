var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var vo;
(function (vo) {
    var SkillVO = (function (_super) {
        __extends(SkillVO, _super);
        function SkillVO() {
            var _this = _super.call(this) || this;
            _this._needLv = 0;
            _this._petLv = 0;
            return _this;
        }
        SkillVO.prototype.initialize = function (data, pos, needLv, petLv) {
            if (needLv === void 0) { needLv = 0; }
            if (petLv === void 0) { petLv = 0; }
            if (data) {
                this._pos = pos;
                this._template = data;
                this._needLv = needLv;
                this._petLv = petLv;
                this._level = this._template.id % 100;
                this._upNeedLevel = -1;
                this._actNeedLevel = -1;
                this._suitType = -1;
                if (this._template.nextId != -1) {
                    this._nextSkillTemp = Templates.getTemplateById(templates.Map.SKILLNEW, this._template.nextId);
                }
            }
        };
        SkillVO.prototype.reset = function () {
            this._pos = -1;
            this._template = null;
            this._upNeedLevel = -1;
            this._actNeedLevel = -1;
            this._suitType = -1;
            this._needLv = 0;
            this._petLv = 0;
            this._nextSkillTemp = null;
        };
        Object.defineProperty(SkillVO.prototype, "isLock", {
            get: function () {
                return this._petLv < this._needLv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "needLv", {
            get: function () {
                return this._needLv;
            },
            set: function (v) {
                this._needLv = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "id", {
            get: function () {
                return this._template.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "pos", {
            get: function () {
                return this._pos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "nextTemplate", {
            get: function () {
                return this._nextSkillTemp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "level", {
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "type", {
            get: function () {
                return this._template.skillType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "group", {
            get: function () {
                return this._template.group;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "cd", {
            get: function () {
                return this._template.cd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "name", {
            // public get distance(): number {
            // 	return this._template.distance;
            // }
            // public get sound(): string {
            // 	return this._template.sound;
            // }
            get: function () {
                return this._template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "icon", {
            get: function () {
                return this._template.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "coefficients", {
            get: function () {
                return this._template.dmgRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "damage", {
            get: function () {
                return this._template.dmgValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "desc", {
            get: function () {
                return this._template.Desc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "upNeedLevel", {
            get: function () {
                return this._upNeedLevel;
            },
            /**升级需要的星级 */
            set: function (v) {
                this._upNeedLevel = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "actNeedLevel", {
            /**激活需要的星级 */
            get: function () {
                return this._actNeedLevel;
            },
            set: function (v) {
                this._actNeedLevel = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillVO.prototype, "suitType", {
            get: function () {
                return this._suitType;
            },
            set: function (v) {
                this._suitType = v;
            },
            enumerable: true,
            configurable: true
        });
        return SkillVO;
    }(vo.VOBase));
    vo.SkillVO = SkillVO;
    __reflect(SkillVO.prototype, "vo.SkillVO");
})(vo || (vo = {}));
