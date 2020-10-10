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
    var role;
    (function (role) {
        var wing;
        (function (wing) {
            var RoleWingDialog = (function (_super) {
                __extends(RoleWingDialog, _super);
                function RoleWingDialog() {
                    return _super.call(this) || this;
                }
                RoleWingDialog.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    //this._typeIcons = [this.typeIcon0, this.typeIcon1, this.typeIcon2, this.typeIcon3];
                    this.labGetProp.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_HDCL);
                    this.labGetProp.touchEnabled = true;
                    this._effPonit = [new egret.Point(250, 550), new egret.Point(300, 600), new egret.Point(350, 550)];
                    Mediator.getMediator(this).onAdd(this, this.enter);
                    Mediator.getMediator(this).onRemove(this, this.exit);
                };
                RoleWingDialog.prototype.enter = function () {
                    this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftHandler, this);
                    this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightHandler, this);
                    this.btnDress.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dressHandler, this);
                    this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnUpgrade, this);
                    this.btnGetMaterial.addEventListener(egret.TouchEvent.TOUCH_TAP, this.alertPropView, this);
                    GameModels.bag.onItemChange(ConfigData.ITEM_WING_ID, this, this.refreshView);
                    this.labGetProp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchLinkHandler, this);
                    GameModels.role.addEventListener(mo.ModelRole.WING_REFRESH, this.refreshView, this);
                    mg.alertManager.addEventListener(mg.AlertManager.SHOW_OR_HIED_ALERT, this.closeZDSJ, this);
                    mg.uiManager.addEventListener(mg.UIManager.ADD_NEW_VIEW, this.closeZDSJ, this);
                    // for (var i: number = 0; i < this._typeIcons.length; i++) {
                    // 	this._typeIcons[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.typeIconHandler, this);
                    // 	this.showWingGod(i);
                    // }
                    this.createWingEffect();
                    this._selectWing = GameModels.role.getWingPutOnIndex();
                    this.headList.selectIndex = 0;
                    this.progressStarExp.value = 0;
                    // this.refreshView();
                    this.headList.init(0, this, this.onChange);
                    this.headList.registerWarns(GameRedState.BAOWU_WING_POS1, GameRedState.BAOWU_WING_POS2, GameRedState.BAOWU_WING_POS3, GameRedState.BAOWU_WING_POS4, GameRedState.BAOWU_WING_POS5);
                };
                RoleWingDialog.prototype.exit = function () {
                    this.closeZDSJ();
                    this.headList.reset();
                    this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.leftHandler, this);
                    this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rightHandler, this);
                    this.btnDress.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.dressHandler, this);
                    this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnUpgrade, this);
                    this.btnGetMaterial.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.alertPropView, this);
                    GameModels.role.removeEventListener(mo.ModelRole.WING_REFRESH, this.refreshView, this);
                    GameModels.bag.offItemChange(ConfigData.ITEM_WING_ID, this, this.refreshView);
                    if (this._activeItemId)
                        GameModels.bag.offItemChange(this._activeItemId, this, this.showWingSelected);
                    mg.alertManager.removeEventListener(mg.AlertManager.SHOW_OR_HIED_ALERT, this.closeZDSJ, this);
                    mg.uiManager.removeEventListener(mg.UIManager.ADD_NEW_VIEW, this.closeZDSJ, this);
                    this.labGetProp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchLinkHandler, this);
                    // for (var i: number = 0; i < this._typeIcons.length; i++) {
                    // 	this._typeIcons[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.typeIconHandler, this);
                    // }
                    this.removeWingEffect();
                    utils.timer.clearAll(this);
                };
                // private refreshWingGod(): void {
                // 	for (var i: number = 0; i < this._typeIcons.length; i++) {
                // 		this.showWingGod(i);
                // 	}
                // }
                /*private showWingGod(index: number) {
                    var posData: vo.WingPosVO = GameModels.role.wingPostionInfoList[this.headList.selectIndex];
                    var wingGodVO: vo.WingGodVO = posData.wingGodVOs[index] as vo.WingGodVO;
                    if (wingGodVO) {
                        if (wingGodVO.isPutOn) {
                            this._typeIcons[index].lvShow = true;
                            this._typeIcons[index].lv = wingGodVO.template.step;
                            this._typeIcons[index].filter = true;
                        } else {
                            this._typeIcons[index].lvShow = false;
                            this._typeIcons[index].filter = false;
                        }
                        this._typeIcons[index].index = index;
                        this._typeIcons[index].wingSource = wingGodVO.templateProp.icon;
                        this._typeIcons[index].nameLabel = wingGodVO.template.name;
                        this._typeIcons[index].wingQuality = wingGodVO.templateProp.quality;
                    }
                }*/
                RoleWingDialog.prototype.touchLinkHandler = function (e) {
                    this.closeZDSJ();
                    if (this._activeItemId) {
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, this._activeItemId); //激活道具获得途径
                    }
                };
                RoleWingDialog.prototype.leftHandler = function (e) {
                    this.closeZDSJ();
                    if (this._selectWing > 0) {
                        this._selectWing--;
                        this.showWingSelected();
                    }
                    var viewRole = mg.uiManager.getView(dialog.role.RoleMainDialog);
                    if (viewRole)
                        viewRole.updataChange();
                };
                RoleWingDialog.prototype.rightHandler = function (e) {
                    this.closeZDSJ();
                    if (this._selectWing < GameModels.role.wingInfoList.length) {
                        this._selectWing++;
                        this.showWingSelected();
                    }
                    var viewRole = mg.uiManager.getView(dialog.role.RoleMainDialog);
                    if (viewRole)
                        viewRole.updataChange();
                };
                RoleWingDialog.prototype.dressHandler = function (e) {
                    this.closeZDSJ();
                    var showWingData = GameModels.role.wingInfoList[this._selectWing];
                    if (showWingData) {
                        if (showWingData.isActive) {
                            GameModels.role.net_requestWingPutPon(showWingData.type, utils.Handler.create(this, function () {
                                this.refreshView();
                            }));
                        }
                        else {
                            GameModels.role.net_requestWingActive(showWingData.type, utils.Handler.create(this, function () {
                                /*if (!showWingData.isPutOn && GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.WING_UP) {
                                    GameModels.role.net_requestWingPutPon(showWingData.type, utils.Handler.create(this, function () {
                                        this.refreshView();
                                    }));
                                }
                                else {
                                    this.refreshView();
                                }*/
                                if (!showWingData.isPutOn) {
                                    GameModels.role.net_requestWingPutPon(showWingData.type, utils.Handler.create(this, function () {
                                        this.refreshView();
                                    }));
                                }
                            }));
                        }
                    }
                };
                RoleWingDialog.prototype.onBtnUpgrade = function (e) {
                    if (this._isUpStep) {
                        this.upgradeHandler();
                    }
                    else {
                        common.CommonBtnLongClick.instance.startLongClickFun(this.btnUpgrade, this, this.upgradeHandler);
                    }
                };
                RoleWingDialog.prototype.upgradeHandler = function () {
                    var _this = this;
                    var showPosData = GameModels.role.wingPostionInfoList[this.headList.selectIndex];
                    this._oldNextExp = showPosData.nextExp;
                    if (this._bagCount >= this._needCount || showPosData.lv % 10 == 0) {
                        mg.soundManager.playSound("OpenUI_zdsj", 1, true, true);
                        GameModels.role.net_requestWingUpgradeSatr(showPosData.pos, utils.Handler.create(this, function () {
                            _this.propertyBox.propertyUpEffectPlay();
                            var newData = GameModels.role.wingPostionInfoList[_this.headList.selectIndex];
                            var isJinJie = _this._wingVo.step != 0 && _this._wingVo.lv == 10;
                            if (isJinJie) {
                                _this.closeZDSJ();
                            }
                            else {
                                if (newData.step > _this._wingVo.step) {
                                    _this.closeZDSJ();
                                }
                            }
                            _this.refreshView();
                        }), utils.Handler.create(this, function (data) {
                            mg.alertManager.tip(data.CodeMsg, 0xff0000);
                            _this.closeZDSJ();
                        }));
                    }
                    else {
                        //50级之前且自动升级过时材料不够不弹物品获取Tips
                        if (GameModels.user.player.level <= TypeModel.LimitLevel) {
                            this.closeZDSJ();
                            mg.alertManager.tip(Language.J_CLBZTZZDSJ);
                        }
                        else {
                            this.alertPropView();
                        }
                    }
                };
                RoleWingDialog.prototype.alertPropView = function () {
                    this.closeZDSJ();
                    mg.alertManager.showAlert(PropOfSourceAlert, true, true, ConfigData.ITEM_WING_ID); //升级道具羽毛的获得途径
                };
                RoleWingDialog.prototype.typeIconHandler = function (e) {
                    this.closeZDSJ();
                    var icon = e.target;
                    var posData = GameModels.role.wingPostionInfoList[this.headList.selectIndex];
                    if (posData.step < 5) {
                        mg.alertManager.tip(Language.J_YYWJKQ, 0xff0000);
                        return;
                    }
                    mg.uiManager.show(dialog.role.wing.RoleWingGodDialog, { headTab: this.headList.selectIndex, index: icon.index, tabIndex: 0 });
                };
                RoleWingDialog.prototype.refreshView = function () {
                    this.showPosSelected();
                    this.updateFightNum();
                    this.showWingSelected();
                    //this.refreshWingGod();
                };
                RoleWingDialog.prototype.onChange = function (index) {
                    this.closeZDSJ();
                    this.headList.selectIndex = index;
                    this.progressStarExp.value = 0;
                    this.refreshView();
                };
                RoleWingDialog.prototype.updateFightNum = function () {
                    var _this = this;
                    var num;
                    switch (this.headList.selectIndex) {
                        case 0:
                            num = TypeFunction.Wing_0;
                            break;
                        case 1:
                            num = TypeFunction.Wing_1;
                            break;
                        case 2:
                            num = TypeFunction.Wing_2;
                            break;
                        case 3:
                            num = TypeFunction.Wing_3;
                            break;
                        case 4:
                            num = TypeFunction.Wing_4;
                            break;
                    }
                    GameModels.common.requestFightNum(this, num, function (fightNum) {
                        _this.blabFight.text = fightNum.toString();
                    }, true);
                };
                //显示头像选中
                RoleWingDialog.prototype.showPosSelected = function () {
                    var showPosData = GameModels.role.wingPostionInfoList[this.headList.selectIndex];
                    if (showPosData)
                        this.refreshPosSelectedInfo(showPosData);
                };
                RoleWingDialog.prototype.refreshPosSelectedInfo = function (data) {
                    if (this.headList.selectIndex == 0) {
                        this.setPlayerShow(true);
                    }
                    else {
                        this.setPlayerShow(false);
                    }
                    this.blabNum.text = data.step + "";
                    this.star.setStar(data.lv);
                    this._wingVo = data;
                    this.btnUpgrade.isWarn = false;
                    var addition;
                    this.consumeGroup.visible = true;
                    this.btnGetMaterial.visible = GameModels.platform.isPay;
                    if (data.nextId != -1) {
                        this.labHint.visible = true;
                        utils.CheckUtil.setLabelByItemCount(data.consumeItemId, data.consumeItemNum, this.labCount, true);
                        var myCount = GameModels.bag.getItemCountById(data.consumeItemId);
                        this._bagCount = myCount;
                        this._needCount = data.consumeItemNum;
                        if (data.lv == 10) {
                            this.btnUpgrade.label = Language.C_SJ3;
                            this.progressStarExp.visible = false;
                            this.labProess.visible = false;
                            this._isUpStep = true;
                            this.consumeGroup.visible = false;
                            this.btnGetMaterial.visible = false;
                            this.labHint.visible = false;
                            this.btnUpgrade.skinName = "skins.SnapBigButton3Skin";
                        }
                        else {
                            this._isUpStep = false;
                            this.btnUpgrade.skinName = "skins.SnapBigButton2Skin";
                            this.btnUpgrade.label = Language.C_SJ1;
                            var item = Templates.getTemplateById(templates.Map.ITEM, data.consumeItemId);
                            this.imgNeedIcon.source = item.icon;
                            this.labNeed.text = item.name + ":";
                            this.progressStarExp.visible = true;
                            this.labProess.visible = true;
                            if (data.nextExp != this._oldNextExp) {
                                this.progressStarExp.noTweenValue = 0;
                                this.progressStarExp.max = data.nextExp;
                                this.progressStarExp.value = data.exp;
                            }
                            else {
                                this.progressStarExp.max = data.nextExp;
                                this.progressStarExp.value = data.exp;
                            }
                            this.labProess.text = data.exp + "/" + data.nextExp;
                        }
                        var nextTemp = Templates.getTemplateById(templates.Map.HEROWING, data.nextId);
                        var nextVO = vo.fromPool(vo.WingPosVO, nextTemp);
                        addition = data.wingGodMasterLevel > 0 ? data.wingGodMasterPropAdd * 0.01 : 0;
                        this.propertyBox.updateTemplate({ HP: data.HP, ATT: data.ATT, DEF: data.DEF, CROSS: data.CROSS }, { HP: nextVO.HP, ATT: nextVO.ATT, DEF: nextVO.DEF, CROSS: nextVO.CROSS }, addition);
                    }
                    else {
                        this.labHint.visible = false;
                        this.labProess.visible = false;
                        this.btnUpgrade.label = Language.C_YMJ1;
                        var item = Templates.getTemplateById(templates.Map.ITEM, 212701);
                        this.imgNeedIcon.source = item.icon;
                        this.labNeed.text = item.name + ":";
                        this.labCount.text = Language.C_YMJ1;
                        this.labCount.textColor = TypeColor.RED1;
                        addition = data.wingGodMasterLevel > 0 ? data.wingGodMasterPropAdd * 0.01 : 0;
                        this.propertyBox.updateTemplate({ HP: data.HP, ATT: data.ATT, DEF: data.DEF, CROSS: data.CROSS }, null, addition);
                    }
                    if (GameModels.role.checkWingUpgradeEnabled(data.pos)) {
                        this.btnUpgrade.touchEnabled = true;
                        this.btnUpgrade.filters = null;
                    }
                    else {
                        this.btnUpgrade.touchEnabled = false;
                        this.btnUpgrade.filters = utils.filterUtil.grayFilters;
                    }
                    var isWarn = GameModels.role.checkWingUpgradeRed(data.pos);
                    this.btnUpgrade.isWarn = isWarn;
                    var viewRole = mg.uiManager.getView(dialog.role.RoleMainDialog);
                    if (viewRole)
                        viewRole.updataChange();
                };
                // //设置headIcon提升红点状态
                // private setHeadIconsUpgradeRedState() {
                // 	for (var i: number = 0; i < GameModels.role.wingPostionInfoList.length; i++) {
                // 		var data: vo.WingPosVO = GameModels.role.wingPostionInfoList[i] as vo.WingPosVO;
                // 		var isWarn: boolean = GameModels.role.checkWingPosRed(data.pos);
                // 		let head: item.HeadIcon = this.headList.getHeadByIndex(data.pos);
                // 		head.isUpgrade = isWarn;
                // 	}
                // }
                // //设置headIcon激活和技能红点状态
                // private setHeadIconsActiveRedState() {
                // 	//激活按钮只在角色头像下显示
                // 	let head: item.HeadIcon = this.headList.getHeadByIndex(0);
                // 	var isWarn: boolean = GameModels.role.checkWingTypeHeadIconRed();
                // 	if (!head.isUpgrade) {
                // 		head.isUpgrade = isWarn;
                // 	}
                // }
                // //神羽icon红点
                // private wingGodTypeIconsRed() {
                // 	var posData: vo.WingPosVO = GameModels.role.wingPostionInfoList[this.headList.selectIndex];
                // 	for (var i: number = 0; i < this._typeIcons.length; i++) {
                // 		this._typeIcons[i].isWarn = GameModels.role.getEquipSingleTypeIconRedBoo(posData.wingGodVOs[i], posData);
                // 	}
                // }
                //上一个按钮红点
                RoleWingDialog.prototype.wingPreRed = function () {
                    if (this.headList.selectIndex != 0)
                        return false;
                    if (this._selectWing == 0)
                        return false;
                    //上一个有可以激活的或者有技能可以升级的
                    for (var i = 0; i < GameModels.role.wingInfoList.length; i++) {
                        if (i < this._selectWing) {
                            var wingVO = GameModels.role.wingInfoList[i];
                            var isWarn = GameModels.role.checkWingActiveRed(wingVO.type);
                            if (isWarn) {
                                return true;
                            }
                            // if (wingVO.templateWingSkill) {
                            // 	var myCount: number = GameModels.bag.getItemCountById(wingVO.skillConsumeItemId);
                            // 	var needCount: number = wingVO.skillConsumeItemNum;
                            // 	if (wingVO.isActive) {
                            // 		if (myCount >= needCount && wingVO.templateWingSkill.nextId != -1) {
                            // 			return true;
                            // 		}
                            // 	}
                            // }
                        }
                    }
                    return false;
                };
                //下一个按钮红点
                RoleWingDialog.prototype.wingNextRed = function () {
                    if (this.headList.selectIndex != 0)
                        return false;
                    if (this._selectWing == GameModels.role.wingInfoList.length - 1)
                        return false;
                    //上一个有可以激活的或者有技能可以升级的
                    for (var i = 0; i < GameModels.role.wingInfoList.length; i++) {
                        if (i > this._selectWing) {
                            var wingVO = GameModels.role.wingInfoList[i];
                            var isWarn = GameModels.role.checkWingActiveRed(wingVO.type);
                            if (isWarn) {
                                return true;
                            }
                            // if (wingVO.templateWingSkill) {
                            // 	var myCount: number = GameModels.bag.getItemCountById(wingVO.skillConsumeItemId);
                            // 	var needCount: number = wingVO.skillConsumeItemNum;
                            // 	if (wingVO.isActive) {
                            // 		if (myCount >= needCount && wingVO.templateWingSkill.nextId != -1) {
                            // 			return true;
                            // 		}
                            // 	}
                            // }
                        }
                    }
                    return false;
                };
                //翻页按钮红点：//主要考虑激活和技能红点，不用考虑提升按钮的红点
                RoleWingDialog.prototype.wingChangeRed = function () {
                    this.imgWarnPre.visible = this.wingPreRed();
                    this.imgWarnNext.visible = this.wingNextRed();
                };
                RoleWingDialog.prototype.setPlayerShow = function (boo) {
                    this.btnLeft.visible = boo;
                    this.btnRight.visible = boo;
                    this.btnDress.visible = boo;
                    this.rolePropGroup.visible = boo;
                };
                //显示翅膀选择
                RoleWingDialog.prototype.showWingSelected = function () {
                    var showWingData = GameModels.role.wingInfoList[this._selectWing];
                    if (showWingData)
                        this.refreshSelectedWingInfo(showWingData);
                    // this.setHeadIconsUpgradeRedState();
                    //this.wingGodTypeIconsRed();
                    // this.setHeadIconsActiveRedState();
                    GameModels.role.updataWingRedPoint();
                    this.wingChangeRed();
                };
                //显示当前选中翅膀信息
                RoleWingDialog.prototype.refreshSelectedWingInfo = function (data) {
                    this.imgNeedBg.visible = false;
                    this.labNeedLv.text = "";
                    if (this._effect) {
                        this._effect.stop();
                        this._effect.resId = data.effectId;
                        this._effect.play();
                    }
                    this.labFight.text = Language.P_ZL + data.score;
                    this.labLife.text = Language.P_SM + " : " + data.HP;
                    this.labAttack.text = Language.P_GJ + " : " + data.ATT;
                    this.labWuFang.text = Language.P_FY + " : " + data.DEF;
                    this.labFaFang.text = Language.P_CT + " : " + data.CROSS;
                    this.btnDress.isWarn = false;
                    if (this._activeItemId)
                        GameModels.bag.offItemChange(this._activeItemId, this, this.showWingSelected);
                    if (data.isPutOn) {
                        this.btnDress.label = Language.C_YCD;
                        this.btnDress.touchEnabled = false;
                        this.btnDress.filters = utils.filterUtil.grayFilters;
                        this.btnUpgrade.touchEnabled = true;
                        this.btnUpgrade.filters = null;
                        this.activeLabGroup.visible = false;
                        this.imgNeedBg.visible = true;
                        this.labNeedLv.text = "" + this._wingVo.template.needLv;
                    }
                    else {
                        this.btnDress.touchEnabled = true;
                        this.btnDress.filters = null;
                        if (data.isActive) {
                            this.btnDress.label = Language.C_CD1;
                            this.activeLabGroup.visible = false;
                            this.imgNeedBg.visible = true;
                            this.labNeedLv.text = "" + this._wingVo.template.needLv;
                        }
                        else {
                            this.btnDress.label = Language.C_JH;
                            this._activeItemId = data.consumeItemId;
                            if (this.headList.selectIndex == 0) {
                                this.activeLabGroup.visible = true;
                            }
                            else {
                                this.activeLabGroup.visible = false;
                            }
                            utils.CheckUtil.setLabelByItemCount(data.consumeItemId, data.consumeItemNum, this.labCount0, true);
                            var item = Templates.getTemplateById(templates.Map.ITEM, data.consumeItemId);
                            this.labNeed0.text = Language.C_XH + item.name + ":";
                            GameModels.bag.onItemChange(this._activeItemId, this, this.showWingSelected);
                            if (this.headList.selectIndex == 0) {
                                var isWarn = GameModels.role.checkWingActiveRed(data.type);
                                this.btnDress.isWarn = isWarn;
                            }
                            else {
                                this.btnDress.isWarn = false;
                            }
                        }
                    }
                    this.setBtnShow();
                };
                RoleWingDialog.prototype.setBtnShow = function () {
                    if (this._selectWing <= 0) {
                        this.btnLeft.touchEnabled = false;
                        this.btnLeft.filters = utils.filterUtil.grayFilters;
                    }
                    else {
                        this.btnLeft.touchEnabled = true;
                        this.btnLeft.filters = null;
                    }
                    if (this._selectWing >= GameModels.role.wingInfoList.length - 1) {
                        this.btnRight.touchEnabled = false;
                        this.btnRight.filters = utils.filterUtil.grayFilters;
                    }
                    else {
                        this.btnRight.touchEnabled = true;
                        this.btnRight.filters = null;
                    }
                };
                RoleWingDialog.prototype.createWingEffect = function () {
                    if (!this._effect) {
                        this._effect = utils.ObjectPool.from(s.AnimationSprite);
                        this._effect.y = 500;
                        this._effect.x = this.width * .5;
                        this._effect.frameRate = 6;
                        this.addChildAt(this._effect, 10);
                    }
                };
                RoleWingDialog.prototype.removeWingEffect = function () {
                    if (this._effect) {
                        this._effect.stop();
                        if (this._effect.parent) {
                            this._effect.parent.removeChild(this._effect);
                        }
                        utils.ObjectPool.to(this._effect, true);
                        this._effect = null;
                    }
                };
                Object.defineProperty(RoleWingDialog.prototype, "headIndex", {
                    get: function () {
                        return this.headList.selectIndex;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RoleWingDialog.prototype, "headIcon", {
                    get: function () {
                        return this.headList.getRoleByIndex(0);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RoleWingDialog.prototype, "wingIndex", {
                    get: function () {
                        return this._selectWing;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RoleWingDialog.prototype, "isWingUpgrade", {
                    get: function () {
                        return GameModels.role.checkWingUpgradeEnabled(GameModels.role.wingPostionInfoList[this.headList.selectIndex].pos);
                    },
                    enumerable: true,
                    configurable: true
                });
                RoleWingDialog.prototype.closeZDSJ = function () {
                    common.CommonBtnLongClick.instance.stopLongClickFun();
                    if (this._wingVo) {
                        if (this._wingVo.nextId != -1) {
                            if (this._wingVo.lv == 10) {
                                this.btnUpgrade.label = Language.C_SJ3;
                            }
                            else {
                                this.btnUpgrade.label = Language.C_SJ1;
                            }
                        }
                        else {
                            this.btnUpgrade.label = Language.C_YMJ1;
                        }
                    }
                    else {
                        this.btnUpgrade.label = Language.C_SJ1;
                    }
                };
                return RoleWingDialog;
            }(ui.RoleWingDialogSkin));
            wing.RoleWingDialog = RoleWingDialog;
            __reflect(RoleWingDialog.prototype, "dialog.role.wing.RoleWingDialog");
        })(wing = role.wing || (role.wing = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));
