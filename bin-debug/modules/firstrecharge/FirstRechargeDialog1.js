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
    var firstrecharge;
    (function (firstrecharge) {
        var FirstRechargeDialog1 = (function (_super) {
            __extends(FirstRechargeDialog1, _super);
            function FirstRechargeDialog1() {
                return _super.call(this) || this;
            }
            FirstRechargeDialog1.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._petArr1 = [13040, 13056, 13053];
                this._petArr2 = [13043, 13052, 13046];
                this._petArr3 = [13058, 13067, 13048];
                this._btnArr = [this.pet1, this.pet2, this.pet3];
                this._pos1 = [new egret.Point(53, 259), new egret.Point(334, 191), new egret.Point(503, 259)];
                this._pos2 = [new egret.Point(69, 259), new egret.Point(341, 170), new egret.Point(503, 278)];
                this._pos3 = [new egret.Point(69, 270), new egret.Point(341, 187), new egret.Point(503, 286)];
            };
            FirstRechargeDialog1.prototype.enter = function (dataView, ispersonalBoss) {
                if (ispersonalBoss === void 0) { ispersonalBoss = false; }
                this.btnGroup.removeChildren();
                if (this.group3.parent)
                    this.removeChild(this.group3);
                if (GameModels.user.player.vip >= 1) {
                    this.btnGroup.addChild(this.group1);
                    this.btnGroup.addChild(this.group2);
                    this.btnGroup.addChild(this.group3);
                    this.imgIndex.visible = true;
                }
                else {
                    this.btnGroup.addChild(this.group1);
                    this.btnGroup.addChild(this.group2);
                    this.imgIndex.visible = false;
                }
                // this.group.width = mg.stageManager.stageWidth;
                this._ispersonalBoss = ispersonalBoss;
                this._seledIndex = dataView && dataView.hasOwnProperty("tabIndex") ? dataView.tabIndex : 0;
                this.updataSelected();
                this.showView();
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                GameModels.user.player.onPropertyChange(TypeProperty.TOTAL_FIRST_RECHARGE, this, this.showView);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btn100.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btn648.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btnChongZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChongzhiClick, this);
                this.btnLingQu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLingQuClick, this);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPetClick, this);
                }
                //utils.timer.once(200, this, this.removeTimer);
                //mg.TipUpManager.instance.removeEventListener(mg.TipUpManager.SHOW_OR_HIED_TIP, this.alertUpDate, this);
                //mg.TipManager.instance.addEventListener(mg.TipManager.SHOW_OR_HIED_TIP, this.alertUpDate, this);
            };
            FirstRechargeDialog1.prototype.exit = function () {
                utils.timer.clear(this);
                // if (this.stage) {
                // 	this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
                // }
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                GameModels.user.player.offPropertyChange(TypeProperty.TOTAL_FIRST_RECHARGE, this, this.showView);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btn6.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btn100.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btn648.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.btnChongZhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnChongzhiClick, this);
                this.btnLingQu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLingQuClick, this);
                //mg.TipManager.instance.removeEventListener(mg.TipManager.SHOW_OR_HIED_TIP, this.alertUpDate, this);
                //mg.TipUpManager.instance.removeEventListener(mg.TipUpManager.SHOW_OR_HIED_TIP, this.alertUpDate, this);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPetClick, this);
                }
                if (this._ispersonalBoss) {
                    copy.CopyWinInstance.instance.visibleView = true;
                }
            };
            // private alertUpDate() {
            // 	if (mg.TipUpManager.instance.current || mg.TipManager.instance.current) {
            // 		utils.timer.clear(this);
            // 		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
            // 	}
            // 	else {
            // 		utils.timer.once(200, this, this.removeTimer);
            // 	}
            // }
            // private removeTimer(): void {
            // 	utils.timer.clear(this);
            // 	this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
            // }
            // private onClick(e: egret.TouchEvent): void {
            // 	logger.log("111111111111111X=", e.stageX);
            // 	logger.log("111111111111111Y=", e.stageY);
            // 	var pos: egret.Point = this.group.localToGlobal();
            // 	logger.log("222222222222222X=", pos.x);
            // 	logger.log("222222222222222Y=", pos.y);
            // 	var groupStartPosX: number = pos.x;
            // 	var groupEndPosX: number = pos.x + this.group.width;
            // 	var groupStartPosY: number = pos.y;
            // 	var groupEndPosY: number = pos.y + this.group.height;
            // 	if (e.stageX > groupStartPosX && e.stageX < groupEndPosX && e.stageY > groupStartPosY && e.stageY < groupEndPosY) {
            // 		return;
            // 	}
            // 	mg.uiManager.remove(this);
            // }
            FirstRechargeDialog1.prototype.updataSelected = function () {
                switch (this._seledIndex) {
                    case 0:
                        this._currVo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.sc1);
                        break;
                    case 1:
                        this._currVo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.sc2);
                        break;
                    case 2:
                        this._currVo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.sc3);
                        break;
                }
                var voList = this._currVo.actRewardListVO;
                for (var i = 0; i < voList.length; i++) {
                    if (voList[i].getTimes <= 0) {
                        return;
                    }
                }
                this._seledIndex++;
                if (this._seledIndex > 1)
                    return;
                this.updataSelected();
            };
            FirstRechargeDialog1.prototype.btnChongzhiClick = function () {
                // var temRecharge: templates.gameRecharge = Templates.getTemplateById(templates.Map.GAMERECHARGE, this._currVo.actType);
                // var count: number = (temRecharge.RMB - GameModels.user.player.firstRechargeTotal / 10) > 0 ? (temRecharge.RMB - GameModels.user.player.firstRechargeTotal / 10) : 0
                // if (count <= 0) return;
                // GameModels.platform.buy(count, 1, "" + temRecharge.id, temRecharge.name, temRecharge.des);
                // GameModels.recharge.openRechargeDialog();
                var voMRCZ = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                if (!voMRCZ || (voMRCZ && voMRCZ.hashYYQGAndMRCZReceive)) {
                    mg.uiManager.show(MallScene);
                }
                else {
                    mg.uiManager.show(dialog.activity.sgDailyActivityMainDialog);
                }
            };
            FirstRechargeDialog1.prototype.btnLingQuClick = function () {
                var _this = this;
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                var voList = this._currVo.actRewardListVO;
                for (var i = 0; i < voList.length; i++) {
                    if (this._currVo.myValue >= i + 1 && voList[i].getTimes <= 0) {
                        var fromPoint = new egret.Point();
                        if (i == 0) {
                            fromPoint = this.rewardOne1.localToGlobal();
                        }
                        else if (i == 1) {
                            fromPoint = this.rewardTwo1.localToGlobal();
                        }
                        else {
                            fromPoint = this.rewardThree1.localToGlobal();
                        }
                        GameModels.sgActivity.requestSGGetActivityReward(this._currVo.actCfgId, voList[i].rewardCfgId, 0, utils.Handler.create(this, function () {
                            _this.showView();
                            var rewards = voList[i].templateRewards.split(";");
                            mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                        }));
                        break;
                    }
                }
            };
            FirstRechargeDialog1.prototype.btnClick = function (e) {
                switch (e.currentTarget) {
                    case this.btnClose:
                    case this.btnBack:
                        mg.uiManager.remove(this);
                        break;
                    case this.btn6:
                        this._seledIndex = 0;
                        this.showView();
                        break;
                    case this.btn100:
                        this._seledIndex = 1;
                        this.showView();
                        break;
                    case this.btn648:
                        this._seledIndex = 2;
                        this.showView();
                        break;
                }
            };
            FirstRechargeDialog1.prototype.onPetClick = function (e) {
                var index = this._btnArr.indexOf(e.currentTarget);
                var petTmp = null;
                if (this._seledIndex == 0) {
                    petTmp = Templates.getTemplateById(templates.Map.GENERAL, this._petArr1[index]);
                }
                else if (this._seledIndex == 1) {
                    petTmp = Templates.getTemplateById(templates.Map.GENERAL, this._petArr2[index]);
                }
                else {
                    petTmp = Templates.getTemplateById(templates.Map.GENERAL, this._petArr3[index]);
                }
                if (petTmp)
                    mg.TipManager.instance.showTip(tips.GeneralInfoTip, petTmp);
            };
            FirstRechargeDialog1.prototype.showView = function () {
                this._currVo = null;
                this.imgRedPoint1.visible = GameModels.sgActivity.checkRedPoint(game.sgActivityType.sc1);
                this.imgRedPoint2.visible = GameModels.sgActivity.checkRedPoint(game.sgActivityType.sc2);
                this.imgRedPoint3.visible = GameModels.sgActivity.checkRedPoint(game.sgActivityType.sc3);
                this.btnLingQu.visible = false;
                this.btnChongZhi.visible = false;
                this.imgCiRiLingqu.visible = false;
                this.imgBuyFinsh.visible = false;
                this.imgBg.source = "img_sg_fr_bg_" + this._seledIndex + "_png";
                if (this._seledIndex == 0) {
                    this._currVo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.sc1);
                    this.btn6.currentState = "down";
                    this.btn100.currentState = "up";
                    this.btn648.currentState = "up";
                }
                else if (this._seledIndex == 1) {
                    this._currVo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.sc2);
                    this.btn6.currentState = "up";
                    this.btn100.currentState = "down";
                    this.btn648.currentState = "up";
                }
                else {
                    this._currVo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.sc3);
                    this.btn6.currentState = "up";
                    this.btn100.currentState = "up";
                    this.btn648.currentState = "down";
                }
                for (var i = 0; i < this._pos1.length; i++) {
                    this._btnArr[i].x = this._seledIndex == 0 ? this._pos1[i].x : this._pos2[i].x;
                    this._btnArr[i].y = this._seledIndex == 0 ? this._pos1[i].y : this._pos2[i].y;
                }
                if (this._currVo)
                    this.showReward();
            };
            FirstRechargeDialog1.prototype.showReward = function () {
                var gameGold = parseInt(this._currVo.actSetTemp.params);
                this.btnChongZhi.visible = !(GameModels.user.player.totalRecharge >= gameGold * 10);
                if (GameModels.user.player.totalRecharge >= gameGold * 10) {
                    this.labPro.text = "";
                    this.imgDes.visible = false;
                }
                else {
                    this.imgDes.visible = true;
                    this.labPro.text = (gameGold - GameModels.user.player.totalRecharge / 10).toString();
                }
                var voList = this._currVo.actRewardListVO;
                for (var i = 0; i < voList.length; i++) {
                    var str = voList[i].templateRewards.split(";");
                    if (i == 0) {
                        this.rewardOne1.dataSource = str[1] ? str[1] : null;
                        this.rewardOne2.dataSource = str[2] ? str[2] : null;
                        this.rewardOne1.filters = voList[i].getTimes > 0 ? utils.filterUtil.grayFilters : null;
                        this.rewardOne2.filters = voList[i].getTimes > 0 ? utils.filterUtil.grayFilters : null;
                        this.imgFinsh1.visible = voList[i].getTimes > 0;
                        this.rewardBig0.dataSource = str[0] ? str[0] : null;
                        this.rewardBig0.filters = voList[i].getTimes > 0 ? utils.filterUtil.grayFilters : null;
                        this.imgFinshBig.visible = voList[i].getTimes > 0;
                    }
                    else if (i == 1) {
                        this.rewardTwo1.dataSource = str[0] ? str[0] : null;
                        this.rewardTwo2.dataSource = str[1] ? str[1] : null;
                        this.rewardTwo1.filters = voList[i].getTimes > 0 ? utils.filterUtil.grayFilters : null;
                        this.rewardTwo2.filters = voList[i].getTimes > 0 ? utils.filterUtil.grayFilters : null;
                        this.imgFinsh2.visible = voList[i].getTimes > 0;
                    }
                    else {
                        this.rewardThree1.dataSource = str[0] ? str[0] : null;
                        this.rewardThree2.dataSource = str[1] ? str[1] : null;
                        this.rewardThree1.filters = voList[i].getTimes > 0 ? utils.filterUtil.grayFilters : null;
                        this.rewardThree2.filters = voList[i].getTimes > 0 ? utils.filterUtil.grayFilters : null;
                        this.imgFinsh3.visible = voList[i].getTimes > 0;
                    }
                    if (this._currVo.myValue >= i + 1) {
                        if (voList[i].getTimes <= 0) {
                            this.imgCiRiLingqu.visible = false;
                            this.btnLingQu.visible = true;
                        }
                        else {
                            this.imgCiRiLingqu.visible = true;
                            if (i == voList.length - 1 && voList[i].getTimes > 0) {
                                this.imgCiRiLingqu.visible = false;
                                this.imgBuyFinsh.visible = true;
                            }
                        }
                    }
                }
            };
            return FirstRechargeDialog1;
        }(ui.FirstRechargeDialog1Skin));
        firstrecharge.FirstRechargeDialog1 = FirstRechargeDialog1;
        __reflect(FirstRechargeDialog1.prototype, "dialog.firstrecharge.FirstRechargeDialog1");
    })(firstrecharge = dialog.firstrecharge || (dialog.firstrecharge = {}));
})(dialog || (dialog = {}));
