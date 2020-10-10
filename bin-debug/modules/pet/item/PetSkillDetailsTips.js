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
var tipUps;
(function (tipUps) {
    var PetSkillDetailsTips = (function (_super) {
        __extends(PetSkillDetailsTips, _super);
        function PetSkillDetailsTips() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PetSkillDetailsTips.prototype, "data", {
            set: function (data) {
                this.show(data);
            },
            enumerable: true,
            configurable: true
        });
        PetSkillDetailsTips.prototype.show = function (data) {
            this._nextSKillTemp = null;
            this.imgWuShuang.visible = false;
            this.labNext.text = "";
            if (data) {
                var skillVo = data;
                if (skillVo.type == 2) {
                    this.imgWuShuang.visible = true;
                    this.imgWuShuang.source = "legionSkill_json.img_wushuang_index";
                }
                if (skillVo.group == 3) {
                    this.imgWuShuang.visible = true;
                    this.imgWuShuang.source = "legionSkill_json.img_shenbing_index";
                }
                this.labExclusive.visible = false;
                this.labUpGrade.visible = false;
                if (skillVo.nextTemplate) {
                    this._nextSKillTemp = skillVo.nextTemplate;
                    this.labNext.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_XJYL);
                }
                switch (skillVo.template.group) {
                    case 1:
                        this.labTitle.text = Language.C_WJJN;
                        var elements = [];
                        if (skillVo.isLock) {
                            elements.push({ text: Language.C_JHTJ + ":", style: { textColor: 0xFDDFA1 } });
                            elements.push({ text: Language.getExpression(Language.E_WJDD1J, skillVo.needLv), style: { textColor: 0x44C305 } });
                            this.labUpNeed.textFlow = elements;
                        }
                        else {
                            if (skillVo.upNeedLevel > 0) {
                                elements.push({ text: Language.J_SJTJ + ":", style: { textColor: 0xFDDFA1 } });
                                elements.push({ text: Language.getExpression(Language.E_WJDD1X, skillVo.upNeedLevel), style: { textColor: 0x44C305 } });
                                this.labUpNeed.textFlow = elements;
                            }
                            else {
                                if (skillVo.upNeedLevel < 0) {
                                    this.labUpNeed.text = "";
                                }
                                else {
                                    this.labUpNeed.text = Language.C_YMJ;
                                    this.labUpNeed.textColor = 0x44C305;
                                }
                            }
                        }
                        break;
                    case 2:
                        this.labUpNeed.text = "";
                        this.labTitle.text = Language.C_BFJN;
                        break;
                    case 3:
                        this.labTitle.text = Language.C_SBJN;
                        this.labExclusive.visible = true;
                        this.labUpGrade.visible = true;
                        this.labUpGrade.text = Language.J_SBJNXG;
                        var sBtemp = Templates.getTemplateByProperty(templates.Map.SMITHYSHENBING, "name", skillVo.template.name);
                        if (sBtemp) {
                            var petTmp = Templates.getTemplateById(templates.Map.GENERAL, sBtemp.general);
                            if (petTmp) {
                                var elements = [];
                                elements.push({ text: petTmp.name, style: { textColor: TypeQuality.getStarColor(petTmp.star) } });
                                elements.push({ text: Language.C_ZSSB + Language.P_JN, style: { textColor: 0xD3D3D3 } });
                                this.labExclusive.textFlow = elements;
                            }
                        }
                        var elements1 = [];
                        if (skillVo.needLv > 0) {
                            if (skillVo.needLv == 1) {
                                this.labUpNeed.text = Language.C_SBSX;
                            }
                            else {
                                this.labUpNeed.text = Language.C_JNYSX;
                            }
                        }
                        else {
                            if (skillVo.actNeedLevel > 0) {
                                elements1.push({ text: Language.C_JHTJ + ":", style: { textColor: 0xFDDFA1 } });
                                elements1.push({ text: Language.getExpression(Language.E_SBDD1X, skillVo.actNeedLevel), style: { textColor: 0x44C305 } });
                                this.labUpNeed.textFlow = elements1;
                            }
                            else {
                                if (skillVo.upNeedLevel > 0) {
                                    elements1.push({ text: Language.J_SJTJ + ":", style: { textColor: 0xFDDFA1 } });
                                    elements1.push({ text: Language.getExpression(Language.E_SBDD1X, skillVo.upNeedLevel), style: { textColor: 0x44C305 } });
                                    this.labUpNeed.textFlow = elements1;
                                }
                                else {
                                    if (skillVo.upNeedLevel < 0) {
                                        this.labUpNeed.text = "";
                                    }
                                    else {
                                        this.labUpNeed.text = Language.C_YMJ;
                                        this.labUpNeed.textColor = 0x44C305;
                                    }
                                }
                            }
                        }
                        break;
                    case 4:
                        this.labUpGrade.visible = true;
                        this.labUpGrade.text = Language.J_HYJNXG;
                        this.labTitle.text = Language.C_HYJN;
                        var elements = [];
                        if (skillVo.actNeedLevel > 0) {
                            elements.push({ text: Language.C_JHTJ + ":", style: { textColor: 0xFDDFA1 } });
                            elements.push({ text: Language.getExpression(Language.E_CHGRY6XYSWJ, skillVo.needLv), style: { textColor: 0x44C305 } });
                            this.labUpNeed.textFlow = elements;
                        }
                        else {
                            if (skillVo.upNeedLevel > 0) {
                                this.labUpNeed.text = Language.C_YJH;
                                this.labUpNeed.textColor = 0x44C305;
                            }
                            else {
                                this.labUpNeed.text = "";
                            }
                        }
                        break;
                    case 7:
                        this.labTitle.text = Language.C_TZJN;
                        var elements = [];
                        var suitType = "";
                        var equipCount = 0;
                        if (skillVo.suitType > 0) {
                            suitType = skillVo.suitType == 1 ? Language.C_JXING : Language.C_LDAO;
                            equipCount = skillVo.suitType == 1 ? 9 : 6;
                        }
                        if (skillVo.actNeedLevel > 0) {
                            elements.push({ text: Language.C_JHTJ + ":", style: { textColor: 0xFDDFA1 } });
                            elements.push({ text: Language.getExpression(Language.E_SYZBDD1X, equipCount, skillVo.actNeedLevel, suitType), style: { textColor: 0x44C305 } });
                            this.labUpNeed.textFlow = elements;
                        }
                        else {
                            if (skillVo.upNeedLevel > 0) {
                                elements.push({ text: Language.J_SJTJ + ":", style: { textColor: 0xFDDFA1 } });
                                elements.push({ text: Language.getExpression(Language.E_SYZBDD1X, equipCount, skillVo.upNeedLevel, suitType), style: { textColor: 0x44C305 } });
                                this.labUpNeed.textFlow = elements;
                            }
                            else {
                                if (skillVo.upNeedLevel < 0) {
                                    this.labUpNeed.text = "";
                                }
                                else {
                                    this.labUpNeed.text = Language.C_YMJ;
                                    this.labUpNeed.textColor = 0x44C305;
                                }
                            }
                        }
                        break;
                }
                this.imgQuality.source = ResPath.getQuality(1);
                this.imgIcon.source = skillVo.icon;
                this.labName.text = skillVo.template.name;
                this.labLv.text = "lv." + skillVo.level;
                this.labContent.text = skillVo.template.Desc;
            }
            this.labNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showNextSkillTips, this);
        };
        PetSkillDetailsTips.prototype.showNextSkillTips = function (e) {
            mg.TipUpManager.instance.removeBlack();
            mg.TipUpManager.instance.showTip(tipUps.PetNextSkillDetailsTips, this._nextSKillTemp);
            this.removeSelf();
        };
        PetSkillDetailsTips.prototype.removeSelf = function () {
            this._nextSKillTemp = null;
            // mg.TipUpManager.instance.setCurrent();
            this.labNext.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showNextSkillTips, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PetSkillDetailsTips;
    }(ui.PetSkillDetailsTipsSkin));
    tipUps.PetSkillDetailsTips = PetSkillDetailsTips;
    __reflect(PetSkillDetailsTips.prototype, "tipUps.PetSkillDetailsTips", ["ITipLogic", "egret.DisplayObject"]);
})(tipUps || (tipUps = {}));
