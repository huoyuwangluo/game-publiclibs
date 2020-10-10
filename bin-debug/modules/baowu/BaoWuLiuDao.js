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
        var BaoWuLiuDao = (function (_super) {
            __extends(BaoWuLiuDao, _super);
            function BaoWuLiuDao() {
                return _super.call(this) || this;
            }
            BaoWuLiuDao.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._iconArr = [this.imgIcon_1, this.imgIcon_2, this.imgIcon_3, this.imgIcon_4, this.imgIcon_5, this.imgIcon_6];
                this._lvArr = [this.imgLv1, this.imgLv2, this.imgLv3, this.imgLv4, this.imgLv5, this.imgLv6];
                this._fightType = [TypeFunction.LiuDao_0, TypeFunction.LiuDao_1, TypeFunction.LiuDao_2, TypeFunction.LiuDao_3, TypeFunction.LiuDao_4];
                this._effectArr = [];
                this._effectId = [TypeEffectId.CHUSHENG_EFF, TypeEffectId.TIANDAO_EFF, TypeEffectId.DIYU_EFF,
                    TypeEffectId.XIULUO_EFF, TypeEffectId.EGUI_EFF, TypeEffectId.RENJIAN_EFF];
                this._redPoint = [this.imgRedPoint1, this.imgRedPoint2, this.imgRedPoint3, this.imgRedPoint4, this.imgRedPoint5, this.imgRedPoint6];
            };
            BaoWuLiuDao.prototype.enter = function (rolePos) {
                this.btnBuy.visible = this.imgPreBg.visible = GameModels.platform.isPay;
                for (var i = 0; i < 6; i++) {
                    var eff = new s.AnimationSprite();
                    eff.touchEnabled = false;
                    eff.visible = false;
                    eff.resId = this._effectId[i];
                    eff.play();
                    this.addChildAt(eff, this.getChildIndex(this._lvArr[i]) - 1);
                    this._effectArr.push(eff);
                }
                this._count = 0;
                this._angle = 0;
                this._preitesStr = "";
                this._systemSuit = null;
                this._skillVo = null;
                this.tweenPreviewImgHandler();
                this.headList.init((rolePos && rolePos >= 0) ? rolePos : TypePetPos.role_currPos, this, this.updata);
                this.headList.registerWarns(GameRedState.ROLE_LIUDAO_POS1, GameRedState.ROLE_LIUDAO_POS2, GameRedState.ROLE_LIUDAO_POS3, GameRedState.ROLE_LIUDAO_POS4, GameRedState.ROLE_LIUDAO_POS5);
                GameModels.equip.addEventListener(mo.ModelEquip.USE_EQUIP_CHANGE, this.updata, this);
                for (var i = 0; i < this._iconArr.length; i++) {
                    this._iconArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                }
                this.btnUseEquips.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.btnHeCheng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.imgSkillIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSkillTips, this);
                this.btnXieXia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showXianGouView, this);
            };
            BaoWuLiuDao.prototype.exit = function () {
                this._count = 0;
                this._angle = 0;
                this._preitesStr = "";
                this.headList.reset();
                this._skillVo = null;
                egret.Tween.removeTweens(this.imgPreBg);
                for (var i = 0; i < 6; i++) {
                    if (this._effectArr[i]) {
                        this._effectArr[i].touchEnabled = true;
                        this._effectArr[i].visible = true;
                        if (this._effectArr[i].parent) {
                            this._effectArr[i].parent.removeChild(this._effectArr[i]);
                        }
                        this._effectArr[i].stop();
                        utils.ObjectPool.to(this._effectArr[i], true);
                        this._effectArr[i] = null;
                    }
                }
                this._effectArr.length = 0;
                GameModels.equip.removeEventListener(mo.ModelEquip.USE_EQUIP_CHANGE, this.updata, this);
                for (var i = 0; i < this._iconArr.length; i++) {
                    this._iconArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
                    this._iconArr[i].source = null;
                    this._lvArr[i].source = null;
                    this._lvArr[i].visible = false;
                }
                this.btnUseEquips.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.btnHeCheng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.imgSkillIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSkillTips, this);
                this.btnXieXia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEquips, this);
                this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showXianGouView, this);
            };
            BaoWuLiuDao.prototype.updata = function () {
                this._preitesStr = "";
                TypePetPos.role_currPos = this.headList.selectIndex;
                var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                this.btnUseEquips.isWarn = false;
                this._skillStep = [];
                this.updateFightNum(this.headList.selectIndex);
                var properitesArr = "";
                var equip = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.LIUDAO_EQIUP, this.headList.selectIndex);
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
                        var str = equip[i].refId.toString().split("");
                        this._iconArr[i].source = ResPath.getLiuDaoRect(i + 1, str[str.length - 1]);
                        this._lvArr[i].visible = true;
                        this._lvArr[i].source = "forging_json.img_ld_" + equips.step;
                        this._effectArr[i].visible = true;
                        this._effectArr[i].x = this._iconArr[i].x + this._iconArr[i].width / 2;
                        this._effectArr[i].y = this._iconArr[i].y + this._iconArr[i].height / 2;
                        this._redPoint[i].visible = pet.star >= 8 && GameModels.equip.isHashHigherEqiup(equip[i].templateEquip.step, equip[i].pos);
                    }
                    else {
                        this._effectArr[i].visible = false;
                        this._lvArr[i].visible = false;
                        this._redPoint[i].visible = pet.star >= 8 && GameModels.equip.isHashHigherEqiup(0, equip[i].pos);
                        this._iconArr[i].source = "forging_json.img_lucency_bg";
                    }
                }
                if (GameModels.equip.checkLiuDaoRedPoint(this.headList.selectIndex))
                    this.btnUseEquips.isWarn = true;
                this.showSuitTalent();
                this.showProperitesLab();
            };
            BaoWuLiuDao.prototype.showProperitesLab = function () {
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
            BaoWuLiuDao.prototype.showSuitTalent = function () {
                var system = null;
                if (this._skillStep.length == 6) {
                    this._skillStep.sort(function (a, b) {
                        return a - b;
                    });
                    this.labActivate.visible = false;
                    system = GameModels.equip.getSystemSuit(8, this._skillStep[0]);
                }
                else {
                    this.labActivate.visible = true;
                    system = GameModels.equip.getSystemSuit(8, 1);
                }
                if (system) {
                    this._systemSuit = system;
                    var skillVO = vo.fromPool(vo.SkillVO);
                    skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, system.talent), 0);
                    this._skillVo = skillVO;
                    if (this._skillVo) {
                        this._skillVo.suitType = 2;
                        this.labSkillLv.text = "Lv." + this._skillVo.level;
                        this.imgSkillIcon.source = this._skillVo.icon;
                        this.labSkillName.text = this._skillVo.name;
                        this.labSkillDes.textFlow = utils.TextFlowMaker.generateTextFlow(this._skillVo.template.Desc);
                        if (this._skillStep.length == 6) {
                            var upneedLv = 0;
                            upneedLv = this._skillStep[0] * 50 + 300;
                            if (upneedLv > 550) {
                                this._skillVo.upNeedLevel = 0;
                            }
                            else {
                                this._skillVo.upNeedLevel = upneedLv;
                            }
                        }
                        else {
                            this._skillVo.actNeedLevel = 300;
                        }
                    }
                }
            };
            BaoWuLiuDao.prototype.onBtnClickHandler = function (e) {
                var items = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.LIUDAO_EQIUP, this.headList.selectIndex);
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
                                mg.alertManager.showAlert(PropOfSourceAlert, true, true, 221601);
                            }
                        }
                        break;
                    }
                }
            };
            BaoWuLiuDao.prototype.changeEquips = function (evt) {
                if (evt.currentTarget == this.btnUseEquips) {
                    var pet = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                    if (pet.star < 8) {
                        mg.alertManager.tip(Language.J_8XCKYZD);
                        return;
                    }
                    GameModels.equip.requesOneDressNewEquips(this.headList.selectIndex, TypeEquip.LIUDAO_EQIUP_START_POS, TypeEquip.LIUDAO_EQIUP_END_POS);
                }
                else if (evt.currentTarget == this.btnXieXia) {
                    GameModels.equip.requesOneVailNewEquips(this.headList.selectIndex, TypeEquip.LIUDAO_EQIUP_START_POS, TypeEquip.LIUDAO_EQIUP_END_POS);
                }
                else {
                    mg.uiManager.show(dialog.bag.BagDialog, { tabIndex: 4, param: 2 });
                }
            };
            BaoWuLiuDao.prototype.showSkillTips = function (evt) {
                mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this._skillVo);
            };
            BaoWuLiuDao.prototype.showXianGouView = function (evt) {
                mg.alertManager.showAlert(dialog.baowu.BaoWuPurchaseLimitation, false, true, 2);
            };
            BaoWuLiuDao.prototype.updateFightNum = function (index) {
                var _this = this;
                GameModels.common.requestFightNum(this, this._fightType[index], function (fightNum) {
                    _this.labFight.text = fightNum.toString();
                });
            };
            BaoWuLiuDao.prototype.tweenPreviewImgHandler = function () {
                this._count++;
                this._angle = this._count * 360;
                egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
            };
            return BaoWuLiuDao;
        }(ui.BaoWuLiuDaoSkin));
        baowu.BaoWuLiuDao = BaoWuLiuDao;
        __reflect(BaoWuLiuDao.prototype, "dialog.baowu.BaoWuLiuDao");
    })(baowu = dialog.baowu || (dialog.baowu = {}));
})(dialog || (dialog = {}));
