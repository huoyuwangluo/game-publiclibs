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
    var ShenBingVO = (function (_super) {
        __extends(ShenBingVO, _super);
        function ShenBingVO() {
            return _super.call(this) || this;
        }
        ShenBingVO.prototype.initialize = function () {
        };
        ShenBingVO.prototype.reset = function () {
            if (this._shenBingInfo) {
                this._shenBingInfo.reset();
                n.MessagePool.to(this._shenBingInfo);
                this._shenBingInfo = null;
            }
        };
        ShenBingVO.prototype.decode = function (data) {
            data.autoRecover = false;
            this._shenBingInfo = data;
            this._refId = this._shenBingInfo.RefId;
            this._level = this._shenBingInfo.Level;
            this._template = Templates.getTemplateById(templates.Map.SMITHYSHENBING, this._refId);
        };
        Object.defineProperty(ShenBingVO.prototype, "refId", {
            get: function () {
                return this._refId;
            },
            set: function (v) {
                this._refId = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "level", {
            get: function () {
                return this._level;
            },
            set: function (v) {
                this._level = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "name", {
            get: function () {
                return this._template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "general", {
            get: function () {
                return this._template.general;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "country", {
            get: function () {
                return this._template.country;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "des", {
            get: function () {
                return this._template.des;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "activateConsume", {
            get: function () {
                return this._template.baseCon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "upGradeConsume", {
            get: function () {
                return this._template.split;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "modle", {
            get: function () {
                return this._template.model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "talent", {
            get: function () {
                return this._template.starTalent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShenBingVO.prototype, "step", {
            get: function () {
                return this._template.step;
            },
            enumerable: true,
            configurable: true
        });
        ShenBingVO.prototype.getUpSkillNeedLevel = function (talentId) {
            var level = 0;
            var talentArr = this._template.starTalent.split(";");
            for (var i = 0; i < talentArr.length; i++) {
                if (parseInt(talentArr[i].split("_")[1]) > talentId) {
                    level = parseInt(talentArr[i].split("_")[0]);
                    break;
                }
            }
            return level;
        };
        ShenBingVO.prototype.getTalentBuyLevel = function (level) {
            var talent = "";
            var talentArr = this._template.starTalent.split(";");
            for (var i = 0; i < talentArr.length; i++) {
                if (level >= parseInt(talentArr[i].split("_")[0])) {
                    talent = talentArr[i];
                }
            }
            if (!talent) {
                return parseInt(talentArr[0].split("_")[1]);
            }
            else {
                return parseInt(talent.split("_")[1]);
            }
        };
        ShenBingVO.prototype.getGrowUpConsume = function (level) {
            var strArr = "";
            var levelTemplate = Templates.getTemplateById(templates.Map.SMITHYSHENBINGLV, level);
            if (!levelTemplate)
                return;
            var name = this._template.split.split("_")[0];
            var count = 0;
            if (levelTemplate.growSplit != -1) {
                count = Math.floor(parseInt(this._template.split.split("_")[1]) * (levelTemplate.growSplit / 10000));
            }
            else {
                var leftlevelTemplate = Templates.getTemplateById(templates.Map.SMITHYSHENBINGLV, level - 1);
                count = Math.floor(parseInt(this._template.split.split("_")[1]) * (leftlevelTemplate.growSplit / 10000));
            }
            strArr = name + "_" + count;
            return strArr;
        };
        ShenBingVO.prototype.getGrowUpProperites = function (level) {
            if (level > 10)
                level = 10;
            var levelTemplate = Templates.getTemplateById(templates.Map.SMITHYSHENBINGLV, level);
            var strArr1 = this._template.properties.split(";");
            var strArr = "";
            if (level <= 0) {
                for (var i = 0; i < strArr1.length; i++) {
                    if (strArr) {
                        strArr = strArr + ";" + strArr1[i].split("_")[0] + "_0";
                    }
                    else {
                        strArr = strArr + strArr1[i].split("_")[0] + "_0";
                    }
                }
            }
            else {
                if (!levelTemplate)
                    return;
                for (var i = 0; i < strArr1.length; i++) {
                    var name = strArr1[i].split("_")[0];
                    var count = Math.floor(parseInt(strArr1[i].split("_")[1]) * (levelTemplate.growProP / 10000));
                    var str = name + "_" + count;
                    if (strArr) {
                        strArr = strArr + ";" + str;
                    }
                    else {
                        strArr = strArr + str;
                    }
                }
            }
            return strArr;
        };
        ShenBingVO.prototype.getGrowBase = function (level) {
            var levelTemplate = Templates.getTemplateById(templates.Map.SMITHYSHENBINGLV, level);
            if (!levelTemplate)
                return;
            return levelTemplate.growBase / 10000;
        };
        Object.defineProperty(ShenBingVO.prototype, "isHashRedPoint", {
            /**1 有红点  2是没有红点 */
            get: function () {
                var consume = "";
                if (this.level > 0) {
                    var num = this.getGrowBase(this.level);
                    if (num > 0) {
                        var strArr = this.template.baseCon.split("_");
                        consume = strArr[0] + "_" + num * parseInt(strArr[1]);
                    }
                    else {
                        consume = this.getGrowUpConsume(this.level);
                    }
                }
                else {
                    consume = this.activateConsume;
                }
                var strcount = parseInt(consume.split("_")[1]);
                var bagcount = GameModels.bag.getItemCountById(consume.split("_")[0]);
                if (bagcount >= strcount && this.level < 10) {
                    return 1;
                }
                return 2;
            },
            enumerable: true,
            configurable: true
        });
        return ShenBingVO;
    }(vo.VOBase));
    vo.ShenBingVO = ShenBingVO;
    __reflect(ShenBingVO.prototype, "vo.ShenBingVO");
})(vo || (vo = {}));
