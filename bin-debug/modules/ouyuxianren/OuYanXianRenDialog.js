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
    var ouYuXianRen;
    (function (ouYuXianRen) {
        var OuYanXianRenDialog = (function (_super) {
            __extends(OuYanXianRenDialog, _super);
            function OuYanXianRenDialog() {
                var _this = _super.call(this) || this;
                _this._clickChoose = false;
                _this._isPlay = false;
                return _this;
            }
            OuYanXianRenDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._checkBoxArr = [this.boxChecked0, this.boxChecked1, this.boxChecked2, this.boxChecked3];
                this._rewardArr = [this.reward0, this.reward1, this.reward2, this.reward3];
            };
            OuYanXianRenDialog.prototype.enter = function (isPlay) {
                var _this = this;
                this._isPlay = isPlay;
                this._clickChoose = false;
                this._chooseType = 0;
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLeftClick, this);
                this.btnCenter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCenterClick, this);
                this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRightClick, this);
                for (var i = 0; i < this._checkBoxArr.length; i++) {
                    this._checkBoxArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btncheckClick, this);
                }
                this.iconPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.iconClick, this);
                this.iconLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.iconClick, this);
                this.iconMeiNv.addEventListener(egret.TouchEvent.TOUCH_TAP, this.iconClick, this);
                this.iconYuanBao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.iconClick, this);
                GameModels.ouYuXianRen.chooseGiftGetInfo(utils.Handler.create(this, function () {
                    _this._time = GameModels.ouYuXianRen.leftTime;
                    _this.labTime.text = Language.J_HDSYSJ + utils.DateUtil.formatTimeLeft(_this._time);
                    if (_this._time > 0) {
                        utils.timer.clear(_this, _this.timerHandler);
                        utils.timer.loop(1000, _this, _this.timerHandler);
                    }
                    _this.showViewCurrentState();
                }));
            };
            OuYanXianRenDialog.prototype.timerHandler = function () {
                this._time--;
                if (this._time <= 0) {
                    this._time = 0;
                    this.labTime.text = "";
                    utils.timer.clear(this, this.timerHandler);
                    mg.uiManager.remove(this);
                    return;
                }
                this.labTime.text = Language.J_HDSYSJ + utils.DateUtil.formatTimeLeft(this._time);
            };
            OuYanXianRenDialog.prototype.exit = function () {
                utils.timer.clear(this, this.timerHandler);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLeftClick, this);
                this.btnCenter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCenterClick, this);
                this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRightClick, this);
                for (var i = 0; i < this._checkBoxArr.length; i++) {
                    this._checkBoxArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btncheckClick, this);
                }
                this.iconPet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.iconClick, this);
                this.iconLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.iconClick, this);
                this.iconMeiNv.addEventListener(egret.TouchEvent.TOUCH_TAP, this.iconClick, this);
                this.iconYuanBao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.iconClick, this);
            };
            OuYanXianRenDialog.prototype.showViewCurrentState = function () {
                var _this = this;
                this.labText.text = "";
                this._selecdIndex = -1;
                this._chooseType = 0;
                this._clickChoose = false;
                this.iconPet.filters = null;
                this.iconPet.touchEnabled = true;
                this.iconMeiNv.filters = null;
                this.iconMeiNv.touchEnabled = true;
                this.iconLevel.filters = null;
                this.iconLevel.touchEnabled = true;
                this.iconYuanBao.filters = null;
                this.iconYuanBao.touchEnabled = true;
                for (var i = 0; i < this._checkBoxArr.length; i++) {
                    this._checkBoxArr[i].selected = false;
                }
                this.btnCenter.visible = false;
                this.btnRight.visible = false;
                this.btnLeft.visible = false;
                this.btnRight.label = Language.C_QD;
                this.btnLeft.filters = null;
                this.btnLeft.label = Language.C_GB;
                this.btnLeft.touchEnabled = true;
                this.btnCenter.filters = null;
                this.btnCenter.label = Language.J_LKLQ;
                this.btnCenter.touchEnabled = true;
                this._currVo = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(1);
                if (this._currVo.giftStatus) {
                    this._currVo = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(2);
                    if (this._currVo.giftStatus) {
                        this._currVo = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(3);
                        if (this._currVo.type) {
                            this.labDes.text = Language.J_GXHDYXJL;
                            this.labText.text = Language.J_XYYWYYLFSNDL;
                            this.btnCenter.visible = true;
                            var strArr = this._currVo.rewardStr.split(";");
                            for (var i = 0; i < strArr.length; i++) {
                                this._rewardArr[i].dataSource = strArr[i];
                            }
                            if (this._currVo.canGetLeftTime > 0) {
                                this.labText.text = Language.J_MRZLWJHJNZWDL;
                                mg.soundManager.playViewLongSound("ouyuxianren_3", "OUYUXIANREN3");
                                this.btnCenter.filters = utils.filterUtil.grayFilters;
                                this.btnCenter.touchEnabled = false;
                                this.btnCenter.label = Language.J_CRLQ;
                                this.labDes.text = Language.J_CRDLKLQJL;
                                if (this._currVo.type == 2 && this._currVo.rewardIndex == 1) {
                                    for (var i = 0; i < strArr.length; i++) {
                                        if (strArr[i].split("_")[0] == "201") {
                                            this._rewardArr[i].labCount.text = "?";
                                        }
                                    }
                                }
                            }
                            this._currVo.type == 5 ? this.currentState = "4" : this.currentState = "5";
                        }
                        else {
                            this.labText.text = Language.J_XYSFYBDXQ;
                            mg.soundManager.playViewLongSound("ouyuxianren_2", "OUYUXIANREN2");
                            this.labDes.text = Language.J_ZXYFLW;
                            this.currentState = "0";
                            var vo = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(2);
                            if (vo.type == 2) {
                                this.iconYuanBao.touchEnabled = false;
                                this.iconYuanBao.filters = utils.filterUtil.grayFilters;
                            }
                            else if (vo.type == 3) {
                                this.iconPet.touchEnabled = false;
                                this.iconPet.filters = utils.filterUtil.grayFilters;
                            }
                            else if (vo.type == 4) {
                                this.iconMeiNv.touchEnabled = false;
                                this.iconMeiNv.filters = utils.filterUtil.grayFilters;
                            }
                            else {
                                this.iconLevel.touchEnabled = false;
                                this.iconLevel.filters = utils.filterUtil.grayFilters;
                            }
                        }
                    }
                    else {
                        if (this._currVo.type) {
                            this.labDes.text = Language.J_GXHDYXJL;
                            this.labText.text = Language.J_XYYWYYLFSNDL;
                            this._currVo.type == 5 ? this.currentState = "4" : this.currentState = "5";
                            var strArr = this._currVo.rewardStr.split(";");
                            for (var i = 0; i < strArr.length; i++) {
                                this._rewardArr[i].dataSource = strArr[i];
                            }
                            var vo = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(3);
                            if (this._currVo.canGetLeftTime > 0) {
                                if (vo.type > 0) {
                                    this.btnCenter.visible = true;
                                    this.btnCenter.filters = utils.filterUtil.grayFilters;
                                    this.btnCenter.touchEnabled = false;
                                    this.btnCenter.label = Language.J_CRLQ;
                                    this.labDes.text = Language.J_CRDLKLQJL;
                                    this.labText.text = Language.J_MRZLWJHJNZWDL;
                                    mg.soundManager.playViewLongSound("ouyuxianren_3", "OUYUXIANREN3");
                                    var strArr = (this._currVo.rewardStr + ";" + vo.rewardStr).split(";");
                                    for (var i = 0; i < strArr.length; i++) {
                                        this._rewardArr[i].dataSource = strArr[i];
                                    }
                                    if (strArr.length > 2) {
                                        this.currentState = "7";
                                        if (this._currVo.rewardStr.split(";").length == 1) {
                                            if (this._currVo.type == 2 && this._currVo.rewardIndex == 1) {
                                                this._rewardArr[0].labCount.text = "?";
                                            }
                                        }
                                        if (vo.rewardStr.split(";").length == 1) {
                                            if (vo.type == 2 && vo.rewardIndex == 1) {
                                                this._rewardArr[2].labCount.text = "?";
                                            }
                                        }
                                    }
                                    else {
                                        this.currentState = "4";
                                        if (this._currVo.type == 2 && this._currVo.rewardIndex == 1) {
                                            this._rewardArr[0].labCount.text = "?";
                                        }
                                        if (vo.type == 2 && vo.rewardIndex == 1) {
                                            this._rewardArr[1].labCount.text = "?";
                                        }
                                    }
                                }
                                else {
                                    this.btnRight.visible = true;
                                    this.btnLeft.visible = true;
                                    this.btnRight.label = Language.J_ZXYF;
                                    this.btnLeft.label = Language.J_CRLQ;
                                    this.labDes.text = Language.J_CRDLKLQJL;
                                    this.labText.text = Language.J_MRZLWJHJNZWDL;
                                    mg.soundManager.playViewLongSound("ouyuxianren_3", "OUYUXIANREN3");
                                    this.btnLeft.filters = utils.filterUtil.grayFilters;
                                    this.btnLeft.touchEnabled = false;
                                    if (this._currVo.type == 2 && this._currVo.rewardIndex == 1) {
                                        for (var i = 0; i < strArr.length; i++) {
                                            if (strArr[i].split("_")[0] == "201") {
                                                this._rewardArr[i].labCount.text = "?";
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                this.btnCenter.visible = true;
                                if (vo.type > 0) {
                                    var strArr = (this._currVo.rewardStr + ";" + vo.rewardStr).split(";");
                                    if (strArr.length > 2) {
                                        this.currentState = "7";
                                    }
                                    else {
                                        this.currentState = "4";
                                    }
                                    for (var i = 0; i < strArr.length; i++) {
                                        this._rewardArr[i].dataSource = strArr[i];
                                    }
                                }
                            }
                        }
                        else {
                            this.labDes.text = Language.J_ZXYFLW;
                            this.labText.text = Language.J_XYSFYBDXQ;
                            mg.soundManager.playViewLongSound("ouyuxianren_2", "OUYUXIANREN2");
                            this.currentState = "0";
                        }
                    }
                }
                else {
                    this.labText.text = Language.J_XYYWYYLFSNDL;
                    mg.soundManager.playViewLongSound("ouyuxianren_1", "OUYUXIANREN1");
                    this.currentState = "7";
                    this.labDes.text = Language.J_GXHDYXJL;
                    this.btnCenter.visible = true;
                    var str = GameModels.dataSet.ouYuXianRenProp(1).split(";");
                    for (var i = 0; i < str.length; i++) {
                        this._rewardArr[i].dataSource = str[i];
                    }
                    if (this._currVo.type <= 0) {
                        GameModels.ouYuXianRen.chooseGiftChoose(1, 1, 0, utils.Handler.create(this, function () {
                            _this._currVo = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(1);
                        }));
                    }
                    // if (this._currVo.type) {
                    // 	this.labDes.text = Language.J_GXHDYXJL;
                    // 	this.currentState = "5";
                    // 	this.btnCenter.visible = true;
                    // 	this.reward0.dataSource = this._currVo.rewardStr.split(";")[0];
                    // }
                    // else {
                    // 	this.currentState = "7";
                    // 	this.labDes.text = Language.J_QXZYFSB;
                    // 	this.btnRight.visible = true;
                    // 	this.btnLeft.visible = true;
                    // 	var str: string[] = GameModels.dataSet.ouYuXianRenProp(1).split(";");
                    // 	for (var i = 0; i < str.length; i++) {
                    // 		this._rewardArr[i].dataSource = str[i];
                    // 	}
                    // }
                }
                this.invalidateProperties();
            };
            OuYanXianRenDialog.prototype.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
            };
            OuYanXianRenDialog.prototype.btnLeftClick = function (e) {
                if (this._clickChoose) {
                    this.showViewCurrentState();
                    return;
                }
                if (this._currVo.step == 1) {
                    if (this._isPlay) {
                        mg.uiManager.remove(this);
                        var img = utils.ObjectPool.from(components.Icon);
                        img.initialize("chapterMap_json.btn_map_ouyuxiansren");
                        mg.layerManager.top.addChild(img);
                        var point = new egret.Point(mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2);
                        img.anchorOffsetX = img.width / 2;
                        img.anchorOffsetY = img.height / 2;
                        img.x = point.x + img.width / 2;
                        img.y = point.y + img.height / 2;
                        var position = mg.uiManager.getView(main.MainUIView).getOuYuXainRenPostion(true);
                        egret.Tween.get(img).to({ x: position.x, y: position.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [img]);
                    }
                    else {
                        mg.uiManager.remove(this);
                    }
                }
            };
            OuYanXianRenDialog.prototype.btnCenterClick = function (e) {
                var _this = this;
                var vo = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(3);
                if (this._currVo.step == 2 && this._currVo.type > 0) {
                    GameModels.ouYuXianRen.chooseGiftGetReward(this._currVo.step, utils.Handler.create(this, function () {
                        var rewards = _this._currVo.rewardStr.split(";");
                        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                        _this.onEndRemoveThis();
                    }));
                    if (vo.type > 0) {
                        GameModels.ouYuXianRen.chooseGiftGetReward(3, utils.Handler.create(this, function () {
                            var rewards = _this._currVo.rewardStr.split(";");
                            mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                            _this.onEndRemoveThis();
                        }));
                    }
                    return;
                }
                if (this._currVo.type > 0) {
                    GameModels.ouYuXianRen.chooseGiftGetReward(this._currVo.step, utils.Handler.create(this, function () {
                        var rewards = _this._currVo.rewardStr.split(";");
                        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                        _this.onEndRemoveThis();
                    }));
                }
            };
            OuYanXianRenDialog.prototype.checkChongZhi = function () {
                var vo = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(3);
                if (this._currVo.step == 2 && this._currVo.type && vo.type <= 0 && GameModels.user.player.totalRecharge <= 0) {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_LFDDXBSBLCDXQ, TypeBtnLabel.RECHARGE, null, utils.Handler.create(this, function () {
                        GameModels.recharge.openRechargeDialog();
                    }));
                    return true;
                }
                if (this.btnRight.label == Language.C_QD && this._currVo.step == 3 && this._currVo.type <= 0 && GameModels.user.player.totalRecharge <= 0) {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_LFDDXBSBLCDXQ, TypeBtnLabel.RECHARGE, null, utils.Handler.create(this, function () {
                        GameModels.recharge.openRechargeDialog();
                    }));
                    return true;
                }
                return false;
            };
            OuYanXianRenDialog.prototype.btnRightClick = function (e) {
                var _this = this;
                if (this._currVo.step == 1 && this._currVo.type <= 0) {
                    if (this._selecdIndex == -1) {
                        mg.alertManager.tip(Language.J_QXZYFSB);
                        return;
                    }
                    GameModels.ouYuXianRen.chooseGiftChoose(this._currVo.step, 1, this._selecdIndex, utils.Handler.create(this, function () {
                        _this.showViewCurrentState();
                    }));
                    return;
                }
                if (this._currVo.type <= 0 && this._clickChoose == true && this._chooseType > 0) {
                    // if (this._chooseType == 2) {
                    // 	if (this._selecdIndex == -1) {
                    // 		if (this._chooseType == 2) {
                    // 			mg.alertManager.tip(Language.J_QXZYGYBXX);
                    // 		}
                    // 		// else {
                    // 		// 	mg.alertManager.tip(Language.J_QXZYGMJ);
                    // 		// }
                    // 		return;
                    // 	}
                    // 	if (this.checkChongZhi()) return;
                    // 	GameModels.ouYuXianRen.chooseGiftChoose(this._currVo.step, this._chooseType, this._selecdIndex, utils.Handler.create(this, () => {
                    // 		this.showViewCurrentState();
                    // 	}));
                    // }
                    // else {
                    if (this.checkChongZhi())
                        return;
                    GameModels.ouYuXianRen.chooseGiftChoose(this._currVo.step, this._chooseType, 0, utils.Handler.create(this, function () {
                        _this.showViewCurrentState();
                    }));
                    //}
                    return;
                }
                var vo = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(3);
                if (this._currVo.step == 2 && this._currVo.type && vo.type <= 0) {
                    if (this.currentState != "0" && this._clickChoose == true && this._chooseType > 0) {
                        // if (this._chooseType == 2) {
                        // 	if (this._selecdIndex == -1) {
                        // 		if (this._chooseType == 2) {
                        // 			mg.alertManager.tip(Language.J_QXZYGYBXX);
                        // 		}
                        // 		// else {
                        // 		// 	mg.alertManager.tip(Language.J_QXZYGMJ);
                        // 		// }
                        // 		return;
                        // 	}
                        // 	if (this.checkChongZhi()) return;
                        // 	GameModels.ouYuXianRen.chooseGiftChoose(vo.step, this._chooseType, this._selecdIndex, utils.Handler.create(this, () => {
                        // 		this.showViewCurrentState();
                        // 	}));
                        // }
                        // else {
                        if (this.checkChongZhi())
                            return;
                        GameModels.ouYuXianRen.chooseGiftChoose(vo.step, this._chooseType, 0, utils.Handler.create(this, function () {
                            _this.showViewCurrentState();
                        }));
                        //}
                        return;
                    }
                    this.labDes.text = Language.J_HXZXYFLW;
                    this.currentState = "0";
                    this.labText.text = Language.J_XYSFYBDXQ;
                    mg.soundManager.playViewLongSound("ouyuxianren_2", "OUYUXIANREN2");
                    if (this._currVo.type == 2) {
                        this.iconYuanBao.touchEnabled = false;
                        this.iconYuanBao.filters = utils.filterUtil.grayFilters;
                    }
                    else if (this._currVo.type == 3) {
                        this.iconPet.touchEnabled = false;
                        this.iconPet.filters = utils.filterUtil.grayFilters;
                    }
                    else if (this._currVo.type == 4) {
                        this.iconMeiNv.touchEnabled = false;
                        this.iconMeiNv.filters = utils.filterUtil.grayFilters;
                    }
                    else {
                        this.iconLevel.touchEnabled = false;
                        this.iconLevel.filters = utils.filterUtil.grayFilters;
                    }
                }
            };
            OuYanXianRenDialog.prototype.iconClick = function (e) {
                // var vo: vo.OuYuXianRenVO = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(3);
                // if (this._currVo.step == 2 && this._currVo.type && vo.type <= 0 && GameModels.user.player.totalRecharge <= 0) {
                // 	mg.alertManager.showAlert(PromptAlert, false, true, Language.J_LFDDXBSBLCDXQ, TypeBtnLabel.RECHARGE, null, utils.Handler.create(this, function () {
                // 		GameModels.recharge.openRechargeDialog();
                // 	}))
                // 	return;
                // }
                // if (this._currVo.step == 3 && this._currVo.type <= 0 && GameModels.user.player.totalRecharge <= 0) {
                // 	mg.alertManager.showAlert(PromptAlert, false, true, Language.J_LFDDXBSBLCDXQ, TypeBtnLabel.RECHARGE, null, utils.Handler.create(this, function () {
                // 		GameModels.recharge.openRechargeDialog();
                // 	}))
                // 	return;
                // }
                this._clickChoose = true;
                this.btnCenter.visible = false;
                this.btnRight.visible = true;
                this.btnLeft.visible = true;
                this.btnRight.label = Language.C_QD;
                this.btnLeft.label = Language.J_ZXX;
                this.btnLeft.filters = null;
                this.btnLeft.touchEnabled = true;
                switch (e.currentTarget) {
                    case this.iconPet:
                        this.currentState = "5";
                        this.labDes.text = Language.J_QXZYGMJ;
                        this.labText.text = Language.J_XYSFJSYZXDX;
                        this._chooseType = 3;
                        this.reward0.dataSource = GameModels.dataSet.ouYuXianRenProp(3);
                        break;
                    case this.iconMeiNv:
                        this.currentState = "5";
                        this.labDes.text = Language.J_WYMV;
                        this.labText.text = Language.J_XYSFJSYZXDX;
                        this._chooseType = 4;
                        this.reward0.dataSource = GameModels.dataSet.ouYuXianRenProp(4);
                        break;
                    case this.iconLevel:
                        this.currentState = "4";
                        this.labDes.text = Language.J_WYSJ;
                        this.labText.text = Language.J_XYSFJSYZXDX;
                        this._chooseType = 5;
                        var str = GameModels.dataSet.ouYuXianRenProp(5).split(";");
                        for (var i = 0; i < str.length; i++) {
                            this._rewardArr[i].dataSource = str[i];
                        }
                        break;
                    case this.iconYuanBao:
                        this.currentState = "5";
                        this.labDes.text = Language.J_QXZYGYBXX;
                        this.labText.text = Language.J_XYSFJSYZXDX;
                        this._chooseType = 2;
                        this.reward0.dataSource = GameModels.dataSet.ouYuXianRenProp(2);
                        break;
                }
            };
            OuYanXianRenDialog.prototype.btncheckClick = function (e) {
                for (var i = 0; i < this._checkBoxArr.length; i++) {
                    if (e.currentTarget == this._checkBoxArr[i]) {
                        this._checkBoxArr[i].selected = true;
                        this._selecdIndex = i;
                    }
                    else {
                        this._checkBoxArr[i].selected = false;
                    }
                }
            };
            OuYanXianRenDialog.prototype.onEndRemoveThis = function () {
                if (!GameModels.ouYuXianRen.hashOuYuXianRen) {
                    mg.uiManager.remove(this);
                }
                else {
                    this.showViewCurrentState();
                }
            };
            OuYanXianRenDialog.prototype.btnCloseClick = function (e) {
                if (this._clickChoose) {
                    this.showViewCurrentState();
                    return;
                }
                if (this._isPlay) {
                    mg.uiManager.remove(this);
                    var img = utils.ObjectPool.from(components.Icon);
                    img.initialize("chapterMap_json.btn_map_ouyuxiansren");
                    mg.layerManager.top.addChild(img);
                    var point = new egret.Point(mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2);
                    img.anchorOffsetX = img.width / 2;
                    img.anchorOffsetY = img.height / 2;
                    img.x = point.x + img.width / 2;
                    img.y = point.y + img.height / 2;
                    // img.scaleX = img.scaleY = 2;
                    var position = mg.uiManager.getView(main.MainUIView).getOuYuXainRenPostion(true);
                    egret.Tween.get(img).to({ x: position.x, y: position.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [img]);
                }
                else {
                    mg.uiManager.remove(this);
                }
            };
            OuYanXianRenDialog.prototype.flyOverHandler = function (img) {
                var view = mg.uiManager.getView(main.MainUIView);
                if (view && view.city && view.city.parent) {
                    view.city.updataOuYuXianRen();
                }
                if (img) {
                    img.alpha = 1;
                    img.parent.removeChild(img);
                    utils.ObjectPool.to(img, true);
                }
            };
            return OuYanXianRenDialog;
        }(ui.OuYanXianRenDialogSkin));
        ouYuXianRen.OuYanXianRenDialog = OuYanXianRenDialog;
        __reflect(OuYanXianRenDialog.prototype, "dialog.ouYuXianRen.OuYanXianRenDialog");
    })(ouYuXianRen = dialog.ouYuXianRen || (dialog.ouYuXianRen = {}));
})(dialog || (dialog = {}));
