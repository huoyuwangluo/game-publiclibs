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
    var WingVO = (function (_super) {
        __extends(WingVO, _super);
        function WingVO() {
            return _super.call(this) || this;
        }
        WingVO.prototype.initialize = function (data) {
            if (data instanceof n.ProtoWingBaseInfo) {
                this.decode(data);
            }
            else if (data instanceof templates.heroWingEvolve) {
                this._template = data;
            }
        };
        WingVO.prototype.reset = function () {
            var that = this;
            if (that._type)
                that._type = 0;
            if (that._isActive)
                that._isActive = false;
            if (that._isPutOn)
                that._isPutOn = false;
            if (that._skillLevel)
                that._skillLevel = 0;
            if (that._template)
                that._template = null;
            if (that._templateWingSkill)
                that._templateWingSkill = null;
            that._skillActive = false;
        };
        WingVO.prototype.decode = function (data) {
            var that = this;
            that.reset();
            that._type = data.Type;
            that._isActive = data.IsActive == 1 ? true : false;
            that._isPutOn = data.IsPutOn == 1 ? true : false;
            that._template = Templates.getTemplateByProperty(templates.Map.HEROWINGEVOLVE, "type", that._type);
            that._skillLevel = 0;
            that.setSkill();
        };
        WingVO.prototype.setSkill = function () {
            var skillId;
            if (this._type <= 12 && this._type > 6) {
                if (this._skillLevel > 0) {
                    skillId = this._skillLevel + this._type * 1000;
                    this._skillActive = true;
                }
                else {
                    skillId = 1 + this._type * 1000;
                    this._skillActive = false;
                }
                this._templateWingSkill = null;
            }
            else {
                this._skillActive = false;
                this._templateWingSkill = null;
            }
        };
        Object.defineProperty(WingVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "templateWingSkill", {
            get: function () {
                return this._templateWingSkill;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "skillActive", {
            get: function () {
                return this._skillActive;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "isActive", {
            get: function () {
                return this._isActive;
            },
            set: function (value) {
                this._isActive = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "isPutOn", {
            get: function () {
                return this._isPutOn;
            },
            set: function (value) {
                this._isPutOn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "skillLevel", {
            get: function () {
                return this._skillLevel;
            },
            set: function (lv) {
                this._skillLevel = lv;
                this.setSkill();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "skillScore", {
            get: function () {
                if (this._isActive) {
                    if (this.templateWingSkill) {
                        return this.templateWingSkill.score;
                    }
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "type", {
            //类型
            get: function () {
                return this._template.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "effectId", {
            //特效id
            get: function () {
                // var job:number = GameModels.user.player.job;
                // var eftId:string;
                // switch(job){
                // 	case TypeJob.ZHAN:
                // 		eftId = this._template.effectId.split("&")[0];
                // 		break;
                // 	case TypeJob.FA:
                // 		eftId = this._template.effectId.split("&")[1];
                // 		break;
                // 	case TypeJob.YI:
                // 		eftId = this._template.effectId.split("&")[2];
                // 		break;
                // }
                return this._template.effectId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "modelId", {
            //模型id
            get: function () {
                // var job:number = GameModels.user.player.job;
                // var modelId:string;
                // switch(job){
                // 	case TypeJob.ZHAN:
                // 		modelId = this._template.modelId.split("&")[0];
                // 		break;
                // 	case TypeJob.FA:
                // 		modelId = this._template.modelId.split("&")[1];
                // 		break;
                // 	case TypeJob.YI:
                // 		modelId = this._template.modelId.split("&")[2];
                // 		break;
                // }
                return this._template.modelId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "score", {
            //技能id
            // public get wingSkillId():number{	
            // 	return this._template.wingSkillId;
            // }
            //战力
            get: function () {
                return this._template.score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "consumeItemId", {
            //消耗的物品id
            get: function () {
                return this._template.consume.split("_")[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "consumeItemNum", {
            //消耗的物品数量
            get: function () {
                return parseInt(this._template.consume.split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "skillConsumeItemId", {
            //技能消耗的物品id
            get: function () {
                if (this._templateWingSkill)
                    return this._templateWingSkill.consume.split("_")[0];
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "skillConsumeItemNum", {
            //技能消耗的物品数量
            get: function () {
                if (this._templateWingSkill)
                    return parseInt(this._templateWingSkill.consume.split("_")[1]);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "properties", {
            //属性集合
            get: function () {
                return this._template.properties;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "HP", {
            get: function () {
                return parseInt(this._template.properties.split(";")[0].split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "ATT", {
            get: function () {
                return parseInt(this._template.properties.split(";")[1].split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "DEF", {
            get: function () {
                return parseInt(this._template.properties.split(";")[2].split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WingVO.prototype, "CROSS", {
            get: function () {
                return parseInt(this._template.properties.split(";")[3].split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        return WingVO;
    }(vo.VOBase));
    vo.WingVO = WingVO;
    __reflect(WingVO.prototype, "vo.WingVO");
})(vo || (vo = {}));
