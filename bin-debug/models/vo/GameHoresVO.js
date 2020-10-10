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
    var GameHoresVO = (function (_super) {
        __extends(GameHoresVO, _super);
        function GameHoresVO() {
            return _super.call(this) || this;
        }
        GameHoresVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._templatesHores = null;
        };
        GameHoresVO.prototype.reset = function () {
            this._templatesHores = null;
            this._refId = 0;
            this._resetime = 0;
            this._wishvalue = 0;
            this._feishenlevel = 0;
            this._zzlevel = 0;
        };
        GameHoresVO.prototype.decode = function (data) {
            this.reset();
            this.refId = data.RefId;
            // this.resetime = data.ResetLeftTime;
            this.wishvalue = data.WishValue;
            this.feishenlevel = data.FeiShenLevel;
            this.zzlevel = data.ZZLevel;
            // this._templatesHores = Templates.getTemplateByProperty(templates.Map.ZUOQI, "type", this._type);
            // this._templatesHoresLv = Templates.getZuoQiLvTemplateByLvAndStep(templates.Map.ZUOQILV, "lv", this._star, "step", this._step);
            this._templatesHores = Templates.getTemplateById(templates.Map.ZHANQI, this._refId);
            // if (this._templatesHoresTalent) {
            // 	this._templatesTalent = Templates.getTemplateById(templates.Map.SKILLTALENT, this._templatesHoresTalent.talentId);
            // }
        };
        Object.defineProperty(GameHoresVO.prototype, "resetime", {
            //剩余时间倒计时
            get: function () {
                return this._resetime;
            },
            set: function (v) {
                this._resetime = v;
                // this._templatesHoresLv = Templates.getZuoQiLvTemplateByLvAndStep(templates.Map.ZUOQILV, "lv", this._star, "step", this._step);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameHoresVO.prototype, "wishvalue", {
            // public get star(): number {
            // 	return this._star;
            // }
            // public set star(v: number) {
            // 	this._star = v;
            // 	this._templatesHoresLv = Templates.getZuoQiLvTemplateByLvAndStep(templates.Map.ZUOQILV, "lv", this._star, "step", this._step);
            // }
            get: function () {
                return this._wishvalue;
            },
            set: function (v) {
                this._wishvalue = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameHoresVO.prototype, "feishenlevel", {
            get: function () {
                return this._feishenlevel;
            },
            set: function (v) {
                this._feishenlevel = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameHoresVO.prototype, "isautobuy", {
            get: function () {
                return this._isatuobuy;
            },
            set: function (v) {
                this._isatuobuy = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameHoresVO.prototype, "zzlevel", {
            get: function () {
                return this._zzlevel;
            },
            set: function (v) {
                this._zzlevel = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameHoresVO.prototype, "refId", {
            get: function () {
                return this._refId;
            },
            set: function (v) {
                this._refId = v;
                this._templatesHores = Templates.getTemplateById(templates.Map.ZHANQI, this._refId);
                // if (this._templatesHoresTalent) {
                // 	this._templatesTalent = Templates.getTemplateById(templates.Map.SKILLTALENT, this._templatesHoresTalent.talentId);
                // }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameHoresVO.prototype, "templatesHores", {
            //战骑的模板
            get: function () {
                return this._templatesHores;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameHoresVO.prototype, "templatesTalent", {
            // //战骑等级的模板
            // public get templatesHoresLv(): templates.zuoQiLv {
            // 	return this._templatesHoresLv;
            // }
            // //战骑天赋的模板
            // public get templatesHoresTalent(): templates.zuoQiTalentLv {
            // 	return this._templatesHoresTalent;
            // }
            // public get needStep(): number {
            // 	return this._templatesHoresTalent.needStep;
            // }
            //天赋模板
            get: function () {
                return this._templatesTalent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameHoresVO.prototype, "soulCountProperties", {
            //战骑之灵的属性集
            get: function () {
                var strArr = GameModels.hores.dataSetZhiLing.value.split(";");
                var strCurr = "";
                var strNext = "";
                for (var i = 0; i < strArr.length; i++) {
                    var s = strArr[i].split("_");
                    var num = parseInt(s[1]);
                    if (i == strArr.length - 1) {
                        strCurr = strCurr + s[0] + "_" + (num * this.zzlevel);
                        strNext = strNext + s[0] + "_" + (num * (this.zzlevel + 1));
                    }
                    else {
                        strCurr = strCurr + s[0] + "_" + (num * this.zzlevel) + ";";
                        strNext = strNext + s[0] + "_" + (num * (this.zzlevel + 1)) + ";";
                    }
                }
                return strCurr + "&" + strNext;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameHoresVO.prototype, "feiShenCountProperties", {
            //战骑飞升丹的属性集
            get: function () {
                var strArr = GameModels.hores.dataSetFeiShengDan.value.split(";");
                var strCurr = "";
                var strNext = "";
                for (var i = 0; i < strArr.length; i++) {
                    var s = strArr[i].split("_");
                    var needCount = parseInt(s[1]);
                    var feiShenCountC = Math.floor((this.getZhanQiValue(s[0]) + this.getZhanQiLvValue(s[0])) * (this.feishenlevel * 0.01));
                    var feiShenCountN = Math.floor((this.getZhanQiValue(s[0]) + this.getZhanQiLvValue(s[0])) * ((this.feishenlevel + 1) * 0.01));
                    var showCountC = (needCount * this.feishenlevel) + feiShenCountC;
                    var showCountN = (needCount * (this.feishenlevel + 1)) + feiShenCountN;
                    if (i == strArr.length - 1) {
                        strCurr = strCurr + s[0] + "_" + showCountC;
                        strNext = strNext + s[0] + "_" + showCountN;
                    }
                    else {
                        strCurr = strCurr + s[0] + "_" + showCountC + ";";
                        strNext = strNext + s[0] + "_" + showCountN + ";";
                    }
                }
                return strCurr + "&" + strNext;
            },
            enumerable: true,
            configurable: true
        });
        //战骑本身的属性集
        GameHoresVO.prototype.getZhanQiValue = function (str) {
            if (!this.templatesHores)
                return 0;
            var strArr = this.templatesHores.properties.split(";");
            for (var i = 0; i < strArr.length; i++) {
                var s = strArr[i].split("_");
                if (s[0] == str) {
                    return parseInt(s[1]);
                }
            }
            return 0;
        };
        //战骑等级的属性集
        GameHoresVO.prototype.getZhanQiLvValue = function (str) {
            // if (!this.templatesHoresLv) return 0;
            // var strArr: string[] = this.templatesHoresLv.properties.split(";");
            // for (var i = 0; i < strArr.length; i++) {
            // 	var s: string[] = strArr[i].split("_");
            // 	if (s[0] == str) {
            // 		return parseInt(s[1]);
            // 	}
            // }
            return 0;
        };
        return GameHoresVO;
    }(vo.VOBase));
    vo.GameHoresVO = GameHoresVO;
    __reflect(GameHoresVO.prototype, "vo.GameHoresVO");
})(vo || (vo = {}));
