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
var tips;
(function (tips) {
    var PropTip = (function (_super) {
        __extends(PropTip, _super);
        function PropTip() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PropTip.prototype, "data", {
            set: function (data) {
                if (data instanceof templates.item) {
                    this.setInfo(data, 1);
                }
                else {
                    this.setInfo(data.templateProp, data.count, data.step, data.inBag);
                }
            },
            enumerable: true,
            configurable: true
        });
        PropTip.prototype.setInfo = function (temp, count, step, inBag) {
            if (count === void 0) { count = 0; }
            if (step === void 0) { step = 0; }
            if (inBag === void 0) { inBag = false; }
            this.btnUse.visible = false;
            this._inBag = inBag;
            this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureClick, this);
            this.btnoneKey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureClick, this);
            this.labCheckPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkPet, this);
            this.labCheckGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getPet, this);
            this._temp = temp;
            this._count = count;
            this._step = step;
            // logger.log("tips点击物品item", temp);
            switch (temp.type) {
                // case TypeItem.ZHANQI:
                case TypeItem.PET_SUI:
                case TypeItem.PET_SUIJI_TYPE:
                case TypeItem.ANIMAL_SUI:
                case TypeItem.ANIMAL_SUIJI_TYPE:
                    this.currentState = "hecheng";
                    break;
                case TypeItem.GODWING_1:
                case TypeItem.GODWING_2:
                case TypeItem.GODWING_3:
                case TypeItem.GODWING_4:
                    this.currentState = "tujian";
                    break;
                default:
                    this.currentState = "common";
                    break;
            }
            this.invalidateProperties();
        };
        PropTip.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.currentState == "tujian") {
                this.showTujian();
            }
            else if (this.currentState == "hecheng") {
                this.showHeCheng();
            }
            else {
                this.showCommon();
            }
        };
        PropTip.prototype.showTujian = function () {
            this.hasAdvanced = false;
            this.showBaseValue();
            this.equipLabFight.text = utils.htmlUtil.computeModelTatolFighting(this._temp.properties).toString();
            var propertyData = {};
            var str = this._temp.properties.split(";");
            for (var i = 0; i < str.length; i++) {
                var str1 = str[i].split("_");
                propertyData["" + str1[0]] = str1[1];
            }
            this.labPropertys.textFlow = this.getBestProperty(propertyData);
            this.labPropertys1.textFlow = this.getAdvancedProperty(propertyData);
            if (this.hasAdvanced) {
                this.labPropertys1.visible = true;
                this.labPropertys1.y = this.labPropertys.y + this.labPropertys.height;
                this.btnBack.y = this.labPropertys1.y + this.labPropertys1.height;
                this.imgBg.height = this.btnBack.y - this.imgBg.y + this.btnBack.height / 2;
            }
            else {
                this.labPropertys1.visible = false;
                this.imgBg.height = 380;
                this.btnBack.y = 359;
            }
        };
        PropTip.prototype.showCommon = function () {
            if (this._inBag && (this._temp.id == "230001" || this._temp.id == "230002" || this._temp.id == "230003" || this._temp.type == TypeItem.FASHION_CLOATHING)) {
                this.btnUse.visible = true;
            }
            this.showBaseValue();
        };
        PropTip.prototype.showHeCheng = function () {
            this.btnUse.visible = this._inBag;
            this.showBaseValue();
            if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.PET_HECHENG && !GameModels.task.curTask.canSubmit) {
                if (GameModels.task.curTask.template.needTimes == 13018) {
                    if (this._temp.id == "220018") {
                        if (this.btnUse)
                            mg.guideManager.guideImmediately(this.btnUse, Language.J_DJHC, TypeDirection.UP);
                    }
                }
            }
        };
        PropTip.prototype.showBaseValue = function () {
            this.labCheckPet.visible = false;
            this.labCheckGet.visible = false;
            this.imgQuality.source = ResPath.getQuality(this._temp.quality);
            this.imgIcon.source = ResPath.getItemIconKey(this._temp.icon);
            var index = this._temp.quality;
            if (TypeItem.checkIsPetTypeOrPetSuiTyp(this._temp.type)) {
                var tem = Templates.getTemplateById(templates.Map.GENERAL, this._temp.type == TypeItem.PET_SUI ? this._temp.nextId : this._temp.id);
                index = TypeQuality.getQualityByStar(tem.star);
            }
            this.updateQualityEfct(index);
            this.btnUse.label = this._temp.type == TypeItem.PET_SUI || this._temp.type == TypeItem.PET_SUIJI_TYPE ? Language.C_ZM : Language.C_HC;
            //装扮类型的读时装表的描述
            if (this._temp.type == TypeItem.FASHION_CLOATHING || this._temp.type == TypeItem.FASHION_TITLE) {
                var fashion = Templates.getTemplateById(templates.Map.GAMEFASHION, this._temp.id);
                this.labDesc.textFlow = utils.TextFlowMaker.generateTextFlow(fashion.des);
                this.btnUse.label = Language.C_SY;
            }
            else {
                this.labDesc.textFlow = utils.TextFlowMaker.generateTextFlow(this._temp.des);
            }
            if (this._temp.type == TypeItem.PET_SUI || this._temp.type == TypeItem.PET_SUIJI_TYPE) {
                if (GameModels.bag.isOpenPetBag) {
                    this.labCheckPet.visible = this._temp.type == TypeItem.PET_SUI;
                    this.labCheckGet.visible = this._temp.type == TypeItem.PET_SUI;
                    this.btnUse.visible = true;
                    this.labCheckPet.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_CKWJ);
                    this.labCheckGet.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_HQLJ);
                }
                else {
                    this.btnUse.visible = false;
                }
            }
            if ((this._temp.type != TypeItem.PET_SUI && this._temp.type != TypeItem.PET_SUIJI_TYPE && this._temp.type != TypeItem.ANIMAL_SUI && this._temp.type != TypeItem.ANIMAL_SUIJI_TYPE)) {
                this.btnoneKey.visible = false;
                this.lab10.visible = false;
                this.btnUse.x = 271;
            }
            else {
                if (GameModels.bag.isOpenPetBag) {
                    this.btnoneKey.visible = true;
                    this.lab10.visible = true;
                    this.btnUse.x = 148;
                }
                else {
                    this.lab10.visible = false;
                    this.btnoneKey.visible = false;
                }
            }
            this.labName.text = this._temp.name;
            this.labName.textColor = TypeQuality.getQualityColor(this._temp.quality);
            this.btnoneKey.label = this._temp.type == TypeItem.PET_SUI || this._temp.type == TypeItem.PET_SUIJI_TYPE ? Language.C_YJZM : Language.C_YJHC;
            this.lab10.text = this._temp.type == TypeItem.PET_SUI || this._temp.type == TypeItem.PET_SUIJI_TYPE ? Language.J_ZDZMSG : Language.J_ZDHCSG;
            if (TypeItem.checkIsPetTypeOrPetSuiTyp(this._temp.type)) {
                var tem = Templates.getTemplateById(templates.Map.GENERAL, this._temp.type == TypeItem.PET_SUI ? this._temp.nextId : this._temp.id);
                this.labName.textColor = TypeQuality.getStarColor(tem.star);
                this.imgQuality.source = ResPath.getPetQualityByStar(tem.star, GameModels.pet.isHashFourSkill(tem.id));
            }
            this.labCount.text = "" + (this._count || "");
            this.labLv.text = "" + this._temp.lv;
            this.imgBg.height = 380;
            this.btnBack.y = 359;
        };
        PropTip.prototype.updateQualityEfct = function (quality) {
            this.clearEffect();
            var isPet = false;
            if (this._temp.mainType != TypeItem.EQUIP && TypeItem.checkIsPetTypeOrPetSuiTyp(this._temp.type)) {
                // var tem: templates.general = Templates.getTemplateById(templates.Map.GENERAL, this._itemVO.type == TypeItem.PET_SUI ? this._itemVO.nextId : this._itemVO.id);
                isPet = true;
            }
            if (isPet && quality == TypeQuality.GOLDEN)
                return;
            switch (quality) {
                // case TypeQuality.GREEN:
                // 	this.addEffect(TypeEffectId.GREEN_EFF, 93, 370, this, 12);
                // 	break;
                // case TypeQuality.BLUE:
                // 	this.addEffect(TypeEffectId.BULE_EFF, 93, 370, this, 12);
                // 	break;
                case TypeQuality.PURPLE:
                    this.addEffect(TypeEffectId.PURPLE_EFF, 72, 96, this, 12);
                    break;
                case TypeQuality.ORANGE:
                    this.addEffect(TypeEffectId.ORANGE_EFF, 72, 96, this, 12);
                    break;
                case TypeQuality.RED:
                    this.addEffect(TypeEffectId.RED_EFF, 72, 96, this, 12);
                    break;
                case TypeQuality.GOLDEN:
                case TypeQuality.AN_GOLDEN:
                case TypeQuality.SHENG_GOLDEN:
                    this.addEffect(TypeEffectId.GOLDEN_EFF, 72, 96, this, 12);
                    break;
            }
        };
        PropTip.prototype.getBestProperty = function (data) {
            var arys = [];
            arys.push({ text: Language.C_JBSX + "\n", style: { "textColor": 0Xd1a765 } });
            if (data.HP > 0) {
                arys.push(this.getFormatHtml(Language.P_SM + " : " + data.HP));
            }
            if (data.ATT > 0) {
                arys.push(this.getFormatHtml(Language.P_GJ + " : " + data.ATT));
            }
            if (data.DEF > 0) {
                arys.push(this.getFormatHtml(Language.P_FY + " : " + data.DEF));
            }
            if (data.CROSS > 0) {
                arys.push(this.getFormatHtml(Language.P_CT + " : " + data.CROSS));
            }
            return arys;
        };
        PropTip.prototype.getAdvancedProperty = function (data) {
            var arys = [];
            arys.push({ text: Language.C_GJSX + "\n", style: { "textColor": 0Xd1a765 } });
            if (data.HIT > 0) {
                arys.push(this.getFormatHtml(Language.P_MZ + " : " + (data.HIT * 0.01) + "%"));
            }
            if (data.EVD > 0) {
                arys.push(this.getFormatHtml(Language.P_SB + " : " + (data.EVD * 0.01) + "%"));
            }
            if (data.CRI > 0) {
                arys.push(this.getFormatHtml(Language.P_BJ + " : " + (data.CRI * 0.01) + "%"));
            }
            if (data.ANTICRI > 0) {
                arys.push(this.getFormatHtml(Language.P_KB + " : " + (data.ANTICRI * 0.01) + "%"));
            }
            if (data.CRIDMG > 0) {
                arys.push(this.getFormatHtml(Language.P_BS + " : " + (data.CRIDMG * 0.01) + "%"));
            }
            if (data.ANTICRIDMG > 0) {
                arys.push(this.getFormatHtml(Language.P_RX + " : " + (data.ANTICRIDMG * 0.01) + "%"));
            }
            if (data.DMGREDU > 0) {
                arys.push(this.getFormatHtml(Language.P_SHJM + " : " + (data.DMGREDU * 0.01) + "%"));
            }
            if (data.DMGINCR > 0) {
                arys.push(this.getFormatHtml(Language.P_SHJS + " : " + (data.DMGINCR * 0.01) + "%"));
            }
            if (data.CTRL > 0) {
                arys.push(this.getFormatHtml(Language.P_KZ + " : " + (data.WDR * 0.01) + "%"));
            }
            if (data.IGNORECTRL > 0) {
                arys.push(this.getFormatHtml(Language.P_KK + " : " + (data.WRE * 0.01) + "%"));
            }
            if (data.HEAL > 0) {
                arys.push(this.getFormatHtml(Language.P_ZL1 + " : " + (data.WDR * 0.01) + "%"));
            }
            if (data.BEHEAL > 0) {
                arys.push(this.getFormatHtml(Language.P_SL + " : " + (data.WRE * 0.01) + "%"));
            }
            this.hasAdvanced = arys.length > 1 ? true : false;
            return arys;
        };
        PropTip.prototype.getFormatHtml = function (value, pfx) {
            if (pfx === void 0) { pfx = "\n"; }
            return { text: "         " + value + pfx };
        };
        PropTip.prototype.onSureClick = function (evt) {
            var _this = this;
            var id = this._temp.id;
            if (this.currentState == "hecheng") {
                //nextId就是目标物品id
                if (evt.currentTarget == this.btnUse) {
                    if (this._temp.type == TypeItem.PET_SUI || this._temp.type == TypeItem.PET_SUIJI_TYPE) {
                        if (this._temp.type == TypeItem.PET_SUIJI_TYPE) {
                            GameModels.bag.requestRandomPetHeCheng(parseInt(this._temp.id), 1, utils.Handler.create(this, function () {
                                mg.effectManager.playEffectOnce(TypeEffectId.PETHECHENG_EFF, mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2 + 100);
                            }));
                        }
                        else {
                            GameModels.bag.requestCompoundProp(this._temp.nextId, 1, utils.Handler.create(this, function () {
                                if (id == "220018" && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_16) <= 0) {
                                    mg.StoryManager.instance.startBigStory(143, _this, null);
                                    GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_16);
                                }
                                mg.effectManager.playEffectOnce(TypeEffectId.PETHECHENG_EFF, mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2 + 100);
                            }));
                        }
                        mg.TipManager.instance.removeBlack();
                        this.removeSelf();
                        return;
                    }
                    else if (this._temp.type == TypeItem.ANIMAL_SUI || this._temp.type == TypeItem.ANIMAL_SUIJI_TYPE) {
                        if (this._temp.type == TypeItem.ANIMAL_SUIJI_TYPE) {
                            GameModels.bag.requestRandomAnimalHeCheng(parseInt(this._temp.id), 1);
                        }
                        else {
                            GameModels.bag.requestCompoundProp(this._temp.nextId, 1);
                        }
                        mg.TipManager.instance.removeBlack();
                        this.removeSelf();
                        return;
                    }
                    GameModels.bag.requestCompoundProp(this._temp.nextId, 1);
                    mg.TipManager.instance.removeBlack();
                    this.removeSelf();
                    return;
                }
                else {
                    // if (GameModels.user.player.vip < 1) {
                    // 	mg.alertManager.tip(Language.J_VIPKFHC);
                    // 	return;
                    // }
                    if (this._temp.type == TypeItem.PET_SUI || this._temp.type == TypeItem.PET_SUIJI_TYPE) {
                        var count = GameModels.bag.getPetSuiCountById(this._temp.id);
                        var general = Templates.getTemplateById(templates.Map.ITEM, this._temp.nextId);
                        var hechengCount = Math.floor(count / parseInt(general.extraParam));
                        if (hechengCount <= 0) {
                            hechengCount = 1;
                        }
                        if (hechengCount > 10)
                            hechengCount = 10;
                        if (this._temp.type == TypeItem.PET_SUIJI_TYPE) {
                            GameModels.bag.requestRandomPetHeCheng(parseInt(this._temp.id), hechengCount, utils.Handler.create(this, function () {
                                mg.effectManager.playEffectOnce(TypeEffectId.PETHECHENG_EFF, mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2 + 100);
                            }));
                        }
                        else {
                            GameModels.bag.requestCompoundProp(this._temp.nextId, hechengCount, utils.Handler.create(this, function (data) {
                                if (id == "220018" && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_16) <= 0) {
                                    mg.StoryManager.instance.startBigStory(143, _this, null);
                                    GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_16);
                                }
                                mg.effectManager.playEffectOnce(TypeEffectId.PETHECHENG_EFF, mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2 + 100);
                            }));
                        }
                        mg.TipManager.instance.removeBlack();
                        this.removeSelf();
                        return;
                    }
                    else if (this._temp.type == TypeItem.ANIMAL_SUI || this._temp.type == TypeItem.ANIMAL_SUIJI_TYPE) {
                        var count = GameModels.bag.getAnimalSuiCountById(this._temp.id);
                        var animal = Templates.getTemplateById(templates.Map.ITEM, this._temp.nextId);
                        var animalCount = Math.floor(count / parseInt(animal.extraParam));
                        if (animalCount <= 0) {
                            animalCount = 1;
                        }
                        if (animalCount > 10)
                            animalCount = 10;
                        if (this._temp.type == TypeItem.ANIMAL_SUIJI_TYPE) {
                            GameModels.bag.requestRandomAnimalHeCheng(parseInt(this._temp.id), animalCount);
                        }
                        else {
                            GameModels.bag.requestCompoundProp(this._temp.nextId, animalCount);
                        }
                        mg.TipManager.instance.removeBlack();
                        this.removeSelf();
                        return;
                    }
                }
            }
            if (this._temp.mainType == TypeItem.MATERIAL && this._temp.type == TypeItem.FASHION_CLOATHING) {
                GameModels.fashion.net_requestFashionActive(parseInt(this._temp.id), utils.Handler.create(this, function () {
                    mg.effectManager.playEffectOnce(TypeEffectId.JIHUO_EFF, _this.width * 0.5, _this.height * 0.5, _this);
                }));
                var gameFashion = Templates.getTemplateById(templates.Map.GAMEFASHION, this._temp.id);
                if (gameFashion.type == TypeFashion.WEAPON) {
                    mg.uiManager.show(dialog.fashion.FashionMainDialog, { tabIndex: 0, param: this._temp.id });
                }
                else if (gameFashion.type == TypeFashion.CLOTHES) {
                    mg.uiManager.show(dialog.fashion.FashionMainDialog, { tabIndex: 1, param: this._temp.id });
                }
                else if (gameFashion.type == TypeFashion.MOUNTS) {
                    mg.uiManager.show(dialog.baowu.BaoWuMain, { tabIndex: 2 });
                }
                else {
                    mg.uiManager.show(dialog.fashion.FashionMainDialog, { tabIndex: 2, param: this._temp.id });
                }
                mg.TipManager.instance.removeBlack();
                this.removeSelf();
                return;
            }
            mg.TipManager.instance.removeBlack();
            this.removeSelf();
            switch (id) {
                case "230001":
                    n.net.request(n.MessageMap.C2G_CHECKCANUPDATENAME, n.MessagePool.from(n.C2G_CheckCanUpdateName), utils.Handler.create(this, function (data) {
                        if (data.LeftTime <= 0) {
                            mg.alertManager.showAlert(ChangePlayerName, true, true, 1);
                        }
                        else {
                            var time = data.LeftTime - (data.LeftTime % 60) + ((data.LeftTime % 60 == 0) ? 0 : 60);
                            mg.alertManager.tip(Language.getExpression(Language.E_1HKSY, utils.DateUtil.formatTimeLeftInChinese(time)), 0xff2919);
                        }
                    }));
                    return;
                case "230002":
                    mg.alertManager.showAlert(ChangePlayerName, true, true, 2);
                    return;
                case "230003":
                    mg.alertManager.showAlert(LegionChangeName, true, true);
                    return;
            }
        };
        PropTip.prototype.getPet = function (e) {
            if (!this.labCheckGet.visible)
                return;
            var pet = Templates.getTemplateById(templates.Map.GENERAL, this._temp.nextId);
            if (pet)
                mg.alertManager.showAlert(PropOfSourceAlert, true, true, pet.id);
            mg.TipManager.instance.removeBlack();
            this.removeSelf();
        };
        PropTip.prototype.checkPet = function (e) {
            if (!this.labCheckPet.visible)
                return;
            var pet = Templates.getTemplateById(templates.Map.GENERAL, this._temp.nextId);
            if (pet)
                mg.TipManager.instance.showTip(tips.GeneralInfoTip, pet);
            mg.TipManager.instance.removeBlack();
            this.removeSelf();
        };
        PropTip.prototype.removeSelf = function () {
            if (this.btnUse)
                mg.guideManager.guideStopImmediately(this.btnUse);
            this.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureClick, this);
            this.btnoneKey.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureClick, this);
            this.labCheckPet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkPet, this);
            this.labCheckGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getPet, this);
            this.clearEffect();
            this._temp = null;
            this._count = 0;
            mg.TipManager.instance.setCurrent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PropTip;
    }(ui.PropTipSkin));
    tips.PropTip = PropTip;
    __reflect(PropTip.prototype, "tips.PropTip", ["ITipLogic", "egret.DisplayObject"]);
})(tips || (tips = {}));
