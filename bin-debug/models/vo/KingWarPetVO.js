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
    var KingWarPetVO = (function (_super) {
        __extends(KingWarPetVO, _super);
        function KingWarPetVO() {
            return _super.call(this) || this;
        }
        KingWarPetVO.prototype.initialize = function (tmp) {
            this._petId = tmp.PetId;
            this._petRefId = tmp.PetRefId;
            this._level = tmp.Level;
            this._star = tmp.Star;
        };
        KingWarPetVO.prototype.reset = function () {
            this._petId = "";
            this._petRefId = "";
            this._level = 0;
            this._star = 0;
        };
        Object.defineProperty(KingWarPetVO.prototype, "petId", {
            get: function () {
                return this._petId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarPetVO.prototype, "petRefId", {
            get: function () {
                return this._petRefId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarPetVO.prototype, "level", {
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarPetVO.prototype, "star", {
            get: function () {
                return this._star;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarPetVO.prototype, "template", {
            get: function () {
                return Templates.getTemplateById(templates.Map.GENERAL, this._petRefId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KingWarPetVO.prototype, "isHashFourSkill", {
            get: function () {
                var skillArr = this.template.skill.split(";");
                return skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1";
            },
            enumerable: true,
            configurable: true
        });
        return KingWarPetVO;
    }(vo.VOBase));
    vo.KingWarPetVO = KingWarPetVO;
    __reflect(KingWarPetVO.prototype, "vo.KingWarPetVO");
})(vo || (vo = {}));
