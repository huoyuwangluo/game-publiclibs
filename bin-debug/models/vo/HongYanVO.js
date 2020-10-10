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
    var HongYanVO = (function (_super) {
        __extends(HongYanVO, _super);
        function HongYanVO() {
            return _super.call(this) || this;
        }
        HongYanVO.prototype.initialize = function (data) {
            this._templates = data;
            this._confId = this._templates.id;
            this._level = 0;
            this._exp = 0;
            this._templateLvs = null;
            this._marryPetId = null;
            this._star = 0;
            this._templateBreak = null;
            this._templateBreak = Templates.getTemplateByProperty(templates.Map.HONGYANBREAK, "star", this._star);
        };
        HongYanVO.prototype.reset = function () {
            this._templates = null;
            this._confId = 0;
            this._level = 0;
            this._exp = 0;
            this._star = 0;
            this._templateLvs = null;
            this._templateBreak = null;
            this._marryPetId = null;
        };
        Object.defineProperty(HongYanVO.prototype, "confId", {
            get: function () {
                return this._confId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "level", {
            get: function () {
                return this._level;
            },
            set: function (v) {
                this._level = v;
                this._templateLvs = Templates.getTemplateById(templates.Map.HONGYANLV, this._level);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "star", {
            get: function () {
                return this._star;
            },
            set: function (v) {
                this._star = v;
                this._templateBreak = Templates.getTemplateByProperty(templates.Map.HONGYANBREAK, "star", this._star);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "templatesBreak", {
            get: function () {
                return this._templateBreak;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "templateLvs", {
            get: function () {
                return this._templateLvs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "exp", {
            get: function () {
                return this._exp;
            },
            set: function (v) {
                this._exp = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "marryPetId", {
            get: function () {
                return this._marryPetId;
            },
            set: function (v) {
                this._marryPetId = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "name", {
            get: function () {
                return this._templates.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "body", {
            get: function () {
                return this._templates.resId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "modelId", {
            get: function () {
                return this._templates.model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "quality", {
            get: function () {
                return this._templates.quality;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "des", {
            get: function () {
                return this._templates.des;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "activaConsume", {
            get: function () {
                return this._templates.actCon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "activaPro", {
            get: function () {
                return this._templates.actPro;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "ciHunPro", {
            get: function () {
                return this._templates.talentPro;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "ciHunProGrow", {
            get: function () {
                return this._templates.talentGrow;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "baseConsume", {
            get: function () {
                return this._templates.baseCon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "basePro", {
            get: function () {
                return this._templates.basePro;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "skillId", {
            get: function () {
                return this._templates.skillId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "skillOpenLv", {
            get: function () {
                return this._templates.skillOpenLv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "maxStar", {
            get: function () {
                return this._templates.maxStar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "breakStarConsume", {
            get: function () {
                return this._templateBreak.consume;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "breakNextId", {
            get: function () {
                return this._templateBreak.nextId;
            },
            enumerable: true,
            configurable: true
        });
        // public get loveNeed(): number {
        // 	return this._templates.loveNeed;
        // }
        // public get loveConsume(): string {
        // 	return this._templates.loveCon;
        // }
        // public get loveTime(): number {
        // 	return this._templates.loveTime;
        // }
        // public get reward(): string {
        // 	return this._templates.rewardPreview;
        // }
        HongYanVO.prototype.getPro = function (v) {
            var s = this.basePro.split(";");
            var temp = "";
            for (var i = 0; i < s.length; i++) {
                var name = s[i].split("_")[0];
                var count = Math.floor(parseInt(s[i].split("_")[1]) * v);
                var str = name + "_" + count;
                if (temp) {
                    temp = temp + ";" + str;
                }
                else {
                    temp = temp + str;
                }
            }
            return utils.htmlUtil.comAttributessorting(utils.htmlUtil.computeAttribute(temp + ";" + this.activaPro));
        };
        Object.defineProperty(HongYanVO.prototype, "isHashRedPoint", {
            /**1 有红点  2是没有红点 */
            get: function () {
                var isRedPoint = 2;
                if (this.level <= 0) {
                    var str = this.activaConsume.split("_");
                    var needCount = parseInt(str[1]);
                    var bagCount = GameModels.bag.getItemCountById(str[0]);
                    if (bagCount >= needCount)
                        isRedPoint = 1;
                }
                else {
                    if (this.checkCanBaseUp)
                        isRedPoint = 1;
                    if (this.checkCanBreakStar)
                        isRedPoint = 1;
                }
                return isRedPoint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "checkCanBaseUp", {
            get: function () {
                if (this.level <= 0)
                    return false;
                var str = this.baseConsume.split("_");
                var temItem = Templates.getTemplateById(templates.Map.ITEM, str[0]);
                var needCount = 0;
                var animal = GameModels.animal.getAnimalBuyType(18);
                if (animal.isAct && animal.step >= 4) {
                    needCount = Math.floor(parseInt(str[1]) * (this.templateLvs.growCon / 10000) / 2);
                }
                else {
                    needCount = parseInt(str[1]) * (this.templateLvs.growCon / 10000);
                }
                var bagCount = GameModels.bag.getItemCountById(str[0]);
                if (bagCount >= needCount && this.templateLvs.nextId != -1 && GameModels.user.player.level >= this.templateLvs.needlv)
                    return true;
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HongYanVO.prototype, "checkCanBreakStar", {
            get: function () {
                if (!this._marryPetId)
                    return false;
                if (!GameModels.funcs.hashFunIsOpen(2008))
                    return false;
                var count = 0;
                var str = this.breakStarConsume.split(";");
                for (var i = 0; i < str.length; i++) {
                    var needCount = parseInt(str[i].split("_")[1]);
                    var bagCount = GameModels.bag.getItemCountById(str[i].split("_")[0]);
                    if (bagCount >= needCount)
                        count++;
                }
                return count >= 2 && this._level >= this.templatesBreak.needLv && this.star < this.maxStar;
            },
            enumerable: true,
            configurable: true
        });
        return HongYanVO;
    }(vo.VOBase));
    vo.HongYanVO = HongYanVO;
    __reflect(HongYanVO.prototype, "vo.HongYanVO");
})(vo || (vo = {}));
