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
var dialog;
(function (dialog) {
    var baowu;
    (function (baowu) {
        var BaoWuJiuQu = (function (_super) {
            __extends(BaoWuJiuQu, _super);
            function BaoWuJiuQu() {
                return _super.call(this) || this;
            }
            BaoWuJiuQu.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                //特效暂时屏蔽
                // this._posArr = [new egret.Point(290, 686), new egret.Point(210, 541), new egret.Point(155, 372),
                // new egret.Point(175, 239), new egret.Point(294, 150), new egret.Point(437, 145),
                // new egret.Point(519, 270), new egret.Point(496, 400), new egret.Point(292, 320)];
                // this._effectArr = [];
                this._fightType = [TypeFunction.JiuQu_0, TypeFunction.JiuQu_1, TypeFunction.JiuQu_2, TypeFunction.JiuQu_3, TypeFunction.JiuQu_4];
                // this._effectId = ["6307", "6307", "6310", "6308", "6306", "6306", "6305", "6309", "6309"];
                this._imgRedPointArr = [this.a1, this.a2, this.a3, this.a4, this.a5, this.a6, this.a7, this.a8, this.a9];
                this._iconArr = [this.imgIcon_0, this.imgIcon_1, this.imgIcon_2, this.imgIcon_3, this.imgIcon_4, this.imgIcon_5,
                    this.imgIcon_6, this.imgIcon_7, this.imgIcon_8];
                this._skillArr = ["850101", "850102", "850103", "850104", "850105", "850106"];
            };
            BaoWuJiuQu.prototype.enter = function (rolePos) {
                // for (var i = 0; i < 9; i++) {
                // 	var fightEffect: s.AnimationSprite = this.fromEffect("");
                // 	fightEffect.touchEnabled = true;
                // 	fightEffect.x = this._posArr[i].x;
                // 	fightEffect.y = this._posArr[i].y;
                // 	fightEffect.play();
                // 	this._imgRedPointArr[i].visible = false;
                // 	this.addChildAt(fightEffect, this.getChildIndex(this._imgRedPointArr[i]));
                // 	fightEffect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                // 	this._effectArr.push(fightEffect);
                // }
                this.btnBuy.visible = this.imgPreBg.visible = GameModels.platform.isPay;
                this._count = 0;
                this._angle = 0;
                this._preitesStr = "";
                this._systemSuit = null;
                this._skillVo = null;
                this.tweenPreviewImgHandler();
                for (var j = 0; j < this._iconArr.length; j++) {
                    this._iconArr[j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                }
                this.headList.init((rolePos && rolePos >= 0) ? rolePos : TypePetPos.role_currPos, this, this.updata);
                this.headList.registerWarns(GameRedState.ROLE_JIUXING_POS1, GameRedState.ROLE_JIUXING_POS2, GameRedState.ROLE_JIUXING_POS3, GameRedState.ROLE_JIUXING_POS4, GameRedState.ROLE_JIUXING_POS5);
                GameModels.equip.addEventListener(mo.ModelEquip.USE_EQUIP_CHANGE, this.updata, this);
                this.btnUseEquips.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.btnHeCheng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.imgSkillIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSkillTips, this);
                this.btnXieXia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showXianGouView, this);
            };
            BaoWuJiuQu.prototype.exit = function () {
                this._count = 0;
                this._angle = 0;
                this._preitesStr = "";
                egret.Tween.removeTweens(this.imgPreBg);
                this.headList.reset();
                // for (var i = 0; i < 9; i++) {
                // 	if (this._effectArr[i]) {
                // 		this._effectArr[i].scale(1);
                // 		this._effectArr[i].filters = null;
                // 		this._effectArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                // 		if (this._effectArr[i].parent) {
                // 			this._effectArr[i].parent.removeChild(this._effectArr[i]);
                // 		}
                // 		this._effectArr[i].stop();
                // 		utils.ObjectPool.to(this._effectArr[i], true);
                // 		this._effectArr[i] = null;
                // 	}
                // }
                for (var j = 0; j < this._iconArr.length; j++) {
                    this._iconArr[j].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    this._iconArr[j].source = null;
                }
                // this._effectArr.length = 0;
                this._skillVo = null;
                GameModels.equip.removeEventListener(mo.ModelEquip.USE_EQUIP_CHANGE, this.updata, this);
                this.btnUseEquips.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.btnHeCheng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.btnXieXia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.imgSkillIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSkillTips, this);
                this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showXianGouView, this);
            };
            BaoWuJiuQu.prototype.updata = function () {
                this._preitesStr = "";
                TypePetPos.role_currPos = this.headList.selectIndex;
                var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                this.btnUseEquips.isWarn = false;
                this._skillStep = [];
                this.updateFightNum(this.headList.selectIndex);
                var properitesArr = "";
                var equip = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JIUQU_EQIUP, this.headList.selectIndex);
                for (var i = 0; i < this._iconArr.length; i++) {
                    if (equip[i].refId) {
                        this._skillStep.push(equip[i].step);
                        var equips = Templates.getTemplateById(templates.Map.EQUIP, equip[i].refId);
                        if (this._preitesStr) {
                            this._preitesStr = this._preitesStr + ";" + equips.properties;
                        }
                        else {
                            this._preitesStr = equips.properties;
                        }
                        this._iconArr[i].source = equip[i].templateEquip.icon;
                        this._imgRedPointArr[i].visible = pet.star >= 7 && GameModels.equip.isHashHigherEqiup(equip[i].templateEquip.step, equip[i].pos);
                    }
                    else {
                        var equipTemp = Templates.getStarEquipsTempByPosAndTypeAndStep(templates.Map.EQUIP, "type", "pos", "step", TypeEquip.JIUQU_EQIUP, equip[i].pos, 1);
                        this._iconArr[i].source = "forging_json.img_jiuXingIconBg";
                        this._imgRedPointArr[i].visible = pet.star >= 7 && GameModels.equip.isHashHigherEqiup(0, equip[i].pos);
                    }
                }
                if (GameModels.equip.checkJiuXingRedPoint(this.headList.selectIndex))
                    this.btnUseEquips.isWarn = true;
                this.showSuitTalent();
                this.showProperitesLab();
            };
            BaoWuJiuQu.prototype.showProperitesLab = function () {
                for (var z = this.labGroup.numChildren; z >= 0; z--) {
                    var labs = this.labGroup.getChildAt(z);
                    if (labs) {
                        this.labGroup.removeChildAt(z);
                    }
                }
                if (!this._preitesStr) {
                    return;
                }
                var str = "";
                str = utils.htmlUtil.computeAttribute(this._preitesStr);
                var sortStr = utils.htmlUtil.comAttributessorting(str).split(";");
                for (var i = 0; i < sortStr.length; i++) {
                    var lab = new eui.Label();
                    lab.size = 16;
                    lab.textAlign = "left";
                    var labConcent = utils.htmlUtil.getAttributeFormat(sortStr[i]).split(":");
                    var elements = [];
                    elements.push({ text: labConcent[0] + ":", style: { textColor: 0xD3D3D3, stroke: 1 } });
                    elements.push({ text: labConcent[1], style: { textColor: 0x44C305, stroke: 1 } });
                    lab.textFlow = elements;
                    this.labGroup.addChild(lab);
                }
            };
            BaoWuJiuQu.prototype.showSuitTalent = function () {
                var system = null;
                if (this._skillStep.length == 9) {
                    this._skillStep.sort(function (a, b) {
                        return a - b;
                    });
                    this.labActivate.visible = false;
                    system = GameModels.equip.getSystemSuit(7, this._skillStep[0]);
                }
                else {
                    this.labActivate.visible = true;
                    system = GameModels.equip.getSystemSuit(7, 1);
                }
                if (system) {
                    this._systemSuit = system;
                    var skillVO = vo.fromPool(vo.SkillVO);
                    skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, system.talent), 0);
                    this._skillVo = skillVO;
                    if (this._skillVo) {
                        this._skillVo.suitType = 1;
                        this.labSkillLv.text = "Lv." + this._skillVo.level;
                        this.imgSkillIcon.source = this._skillVo.icon;
                        this.labSkillName.text = this._skillVo.name;
                        this.labSkillDes.textFlow = utils.TextFlowMaker.generateTextFlow(this._skillVo.template.Desc);
                        if (this._skillStep.length == 9) {
                            var upneedLv = 0;
                            upneedLv = this._skillStep[0] * 50 + 150;
                            if (upneedLv > 400) {
                                this._skillVo.upNeedLevel = 0;
                            }
                            else {
                                this._skillVo.upNeedLevel = upneedLv;
                            }
                        }
                        else {
                            this._skillVo.actNeedLevel = 150;
                        }
                    }
                }
            };
            BaoWuJiuQu.prototype.onBtnClickHandler = function (e) {
                var items = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JIUQU_EQIUP, this.headList.selectIndex);
                for (var i = 0; i < this._iconArr.length; i++) {
                    if (e.currentTarget == this._iconArr[i]) {
                        if (items[i].refId) {
                            mg.alertManager.showAlert(dialog.role.AncientEquipInfoAlert, true, true, this.headList.selectIndex, items[i]);
                        }
                        else {
                            var bagEquips = GameModels.bag.getEquipsByPos(items[i].pos);
                            if (bagEquips.length > 0) {
                                mg.uiManager.show(dialog.role.AncientEquipDressDialog, this.headList.selectIndex, items[i]);
                            }
                            else {
                                mg.alertManager.showAlert(PropOfSourceAlert, true, true, 221602);
                            }
                        }
                        break;
                    }
                }
            };
            BaoWuJiuQu.prototype.showSkillTips = function (evt) {
                mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this._skillVo);
            };
            BaoWuJiuQu.prototype.showXianGouView = function (evt) {
                mg.alertManager.showAlert(dialog.baowu.BaoWuPurchaseLimitation, false, true, 1);
            };
            BaoWuJiuQu.prototype.changeEquips = function (evt) {
                if (evt.currentTarget == this.btnUseEquips) {
                    var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                    if (pet.star < 7) {
                        mg.alertManager.tip(Language.J_7XCKYZD);
                        return;
                    }
                    GameModels.equip.requesOneDressNewEquips(this.headList.selectIndex, TypeEquip.JIUQU_EQIUP_START_POS, TypeEquip.JIUQU_EQIUP_END_POS);
                }
                else if (evt.currentTarget == this.btnXieXia) {
                    GameModels.equip.requesOneVailNewEquips(this.headList.selectIndex, TypeEquip.JIUQU_EQIUP_START_POS, TypeEquip.JIUQU_EQIUP_END_POS);
                }
                else {
                    mg.uiManager.show(dialog.bag.BagDialog, { tabIndex: 4, param: 1 });
                }
            };
            BaoWuJiuQu.prototype.updateFightNum = function (index) {
                var _this = this;
                GameModels.common.requestFightNum(this, this._fightType[index], function (fightNum) {
                    _this.labFight.text = fightNum.toString();
                });
            };
            BaoWuJiuQu.prototype.tweenPreviewImgHandler = function () {
                this._count++;
                this._angle = this._count * 360;
                egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
            };
            return BaoWuJiuQu;
        }(ui.BaoWuJiuQuSkin));
        baowu.BaoWuJiuQu = BaoWuJiuQu;
        __reflect(BaoWuJiuQu.prototype, "dialog.baowu.BaoWuJiuQu");
    })(baowu = dialog.baowu || (dialog.baowu = {}));
})(dialog || (dialog = {}));
