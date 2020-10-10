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
var copy;
(function (copy) {
    var CopyFailTipView = (function (_super) {
        __extends(CopyFailTipView, _super);
        function CopyFailTipView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CopyFailTipView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._btns = [this.icon3, this.icon0, this.icon1, this.icon2];
            this._rwards1 = [this.reward1, this.reward2, this.reward3, this.reward4];
            this._rwards2 = [this.reward5, this.reward6, this.reward7, this.reward8];
            //Mediator.getMediator(this).onAdd(this, this.enter);
            //Mediator.getMediator(this).onRemove(this, this.exit);
        };
        CopyFailTipView.prototype.enter = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._pos = -1;
            this._completeCaller = caller;
            this._completeMethod = method;
            this._completeArgs = args;
            mg.layerManager.top.addChild(this);
            egret.Tween.removeTweens(this.tag);
            this.tag.alpha = 0;
            egret.Tween.get(this.tag).to({ alpha: 1 }, 800, utils.Ease.linearNone);
            this.img_fubenBg.visible = false;
            this.icon4.visible = false;
            this.payGroup.visible = false;
            this.imgGet.visible = true;
            this.labTime.visible = false;
            this._endTime = 0;
            // this.startCloseTime();
            this.labFailName.text = "";
            if (this._completeArgs.length >= 4) {
                this.labFailName.text = TypeGame.getName(this._completeArgs[3]);
            }
            this.btnTongJi.visible = false;
            if (TypeGame.isFormationGame() && this._completeArgs && this._completeArgs.length >= 3) {
                this.btnTongJi.visible = true;
            }
            var voArr = [];
            for (var i = 1; i < 5; i++) {
                if (GameModels.equip.checkPosUpRedPoint(i)) {
                    voArr.push(GameModels.pet.getFormatUpVOByPos(i));
                }
            }
            var currVo = voArr[0];
            for (var i = 0; i < voArr.length; i++) {
                if (voArr[i].lv < currVo.lv) {
                    currVo = voArr[i];
                }
            }
            if (voArr.length > 0 && GameModels.user.player.level < 60) {
                this.icon4.visible = true;
                this._pos = currVo.formatData.position;
                mg.guideManager.guideImmediately(this.icon4, Language.J_DJQWSJ, TypeDirection.UP, true);
                this.btnGroup.visible = false;
            }
            else {
                this.btnGroup.visible = true;
                for (var i = 0; i < 4; i++) {
                    var btn = this._btns[i];
                    if (i == 1 && GameModels.user.player.level < 100) {
                        if (btn.parent) {
                            btn.parent.removeChild(btn);
                        }
                    }
                    else {
                        this.btnGroup.addChild(btn);
                    }
                }
            }
            this._openView = s.UserfaceName.firstRecharge;
            this._openViewIndex = 0;
            this.imgBg.source = "img_fail_bg1_jpg";
            if (GameModels.user.player.totalRecharge > 0) {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                if (vo && vo.getActRewardListVOStorRmb(38).length == 2) {
                    var voList = vo.getActRewardListVOStorRmb(38);
                    if (voList[0].getTimes <= 0 || voList[1].getTimes <= 0) {
                        this.imgGet.visible = false;
                        this.payGroup.visible = true;
                        this.imgBg.source = "img_fail_bg3_jpg";
                        this.showPayView();
                        this.btnPay1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playClick, this);
                        this.btnPay2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playClick, this);
                        this.btnReward1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playClick, this);
                        this.btnReward2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playClick, this);
                        GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showPayView, this);
                    }
                    else {
                        this.imgBg.source = "img_fail_bg2_jpg";
                        this._openView = s.UserfaceName.treasure;
                        this._openViewIndex = 0;
                    }
                }
                else {
                    this.imgBg.source = "img_fail_bg2_jpg";
                    this._openView = s.UserfaceName.treasure;
                    this._openViewIndex = 0;
                }
            }
            if (this._completeArgs && this._completeArgs.length >= 0 && this._completeArgs[0] == 9) {
                this.img_fubenBg.visible = true;
            }
            this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.imgGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.icon1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.icon0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.icon2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.icon3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.icon4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnTongJi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTongJiHandler, this);
        };
        CopyFailTipView.prototype.showPayView = function () {
            var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
            var voList = vo.getActRewardListVOStorRmb(38);
            var rewards = voList[0].otherRewards.split(";");
            for (var i = 0; i < 4; i++) {
                var iconBox = this._rwards1[i];
                iconBox.labName.stroke = 1;
                if (i < rewards.length) {
                    iconBox.dataSource = rewards[i];
                    this.boxGroup.addChild(iconBox);
                    if (i == 0) {
                        var img = new eui.Image;
                        img.source = "img_doubleTitle_png";
                        img.x = 19;
                        img.y = 3;
                        img.touchEnabled = false;
                        this.boxGroup.addChild(img);
                    }
                }
                else {
                    if (iconBox.parent) {
                        iconBox.parent.removeChild(iconBox);
                    }
                }
            }
            this.btnPay1.visible = false;
            this.btnReward1.visible = false;
            this.imgBuyFinsh1.visible = false;
            if (vo.hashMyValueStr(voList[0].rewardCfgId.toString())) {
                if (voList[0].getTimes <= 0) {
                    this.btnReward1.visible = true;
                }
                else {
                    this.imgBuyFinsh1.visible = true;
                }
            }
            else {
                this.btnPay1.visible = true;
                this.btnPay1.source = "btnMoney_json.btn_sg_chongzhi_" + voList[0].rmb;
            }
            var rewards1 = voList[1].otherRewards.split(";");
            for (var i = 0; i < 4; i++) {
                var iconBox = this._rwards2[i];
                iconBox.labName.stroke = 1;
                if (i < rewards1.length) {
                    iconBox.dataSource = rewards1[i];
                    this.boxGroup0.addChild(iconBox);
                    if (i == 0) {
                        var img = new eui.Image;
                        img.source = "img_doubleTitle_png";
                        img.x = 19;
                        img.y = 3;
                        img.touchEnabled = false;
                        this.boxGroup0.addChild(img);
                    }
                }
                else {
                    if (iconBox.parent) {
                        iconBox.parent.removeChild(iconBox);
                    }
                }
            }
            this.btnPay2.visible = false;
            this.btnReward2.visible = false;
            this.imgBuyFinsh2.visible = false;
            if (vo.hashMyValueStr(voList[1].rewardCfgId.toString())) {
                if (voList[1].getTimes <= 0) {
                    this.btnReward2.visible = true;
                }
                else {
                    this.imgBuyFinsh2.visible = true;
                }
            }
            else {
                this.btnPay2.visible = true;
                this.btnPay2.source = "btnMoney_json.btn_sg_chongzhi_" + voList[1].rmb;
            }
        };
        // private startCloseTime(): void {
        //     this._endTime = 10;
        //     this.stopCloseTime();
        //     this.closeTimeUpdateHandler();
        //     utils.timer.loop(1000, this, this.closeTimeUpdateHandler)
        // }
        // private stopCloseTime() {
        //     utils.timer.clear(this, this.closeTimeUpdateHandler)
        // }
        // private closeTimeUpdateHandler(): void {
        //     if (this._endTime == 0) {
        //         this.clickHandler(null);
        //     }
        //     this.labTime.textFlow = utils.TextFlowMaker.generateTextFlow(Language.getExpression(Language.E_1MHZDGB, this._endTime));
        //     this._endTime--;
        // }
        CopyFailTipView.prototype.exit = function () {
            mg.guideManager.guideStopImmediately(this.icon4);
            egret.Tween.removeTweens(this.tag);
            this._completeMethod = this._completeCaller = null;
            // this.stopCloseTime();
            this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.imgGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.icon1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.icon0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.icon2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.icon3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnTongJi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTongJiHandler, this);
            this.btnPay1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playClick, this);
            this.btnPay2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playClick, this);
            this.btnReward1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playClick, this);
            this.btnReward2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playClick, this);
            GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showPayView, this);
        };
        CopyFailTipView.prototype.btnTongJiHandler = function () {
            // this.stopCloseTime();
            if (this._completeArgs && this._completeArgs.length >= 3) {
                mg.alertManager.showAlert(CopyBattleStatistics, true, true, this._completeArgs[1], this._completeArgs[2]);
            }
        };
        CopyFailTipView.prototype.playClick = function (e) {
            if (e.currentTarget == this.btnPay1) {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                var voList = vo.getActRewardListVOStorRmb(38);
                // this.stopCloseTime();
                GameModels.platform.buy(voList[0].rmb, 1, "" + voList[0].template.id, voList[0].template.name, voList[0].template.des);
            }
            else if (e.currentTarget == this.btnPay2) {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                var voList = vo.getActRewardListVOStorRmb(38);
                // this.stopCloseTime();
                GameModels.platform.buy(voList[1].rmb, 1, "" + voList[1].template.id, voList[1].template.name, voList[1].template.des);
            }
            else if (e.currentTarget == this.btnReward1) {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                var voList = vo.getActRewardListVOStorRmb(38);
                // this.stopCloseTime();
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, voList[0].rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [voList[0].otherRewards]));
            }
            else if (e.currentTarget == this.btnReward2) {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                var voList = vo.getActRewardListVOStorRmb(38);
                // this.stopCloseTime();
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, voList[1].rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [voList[1].otherRewards]));
            }
        };
        CopyFailTipView.prototype.clickHandler = function (e) {
            if (e) {
                if (e.currentTarget != this.icon4)
                    this._pos = -1;
                if (e.currentTarget == this.imgGet) {
                    if (this._openView) {
                        if (app.gameContext.typeGame == TypeGame.ATKCITY) {
                            mg.uiManager.show(this._openView, { tabIndex: this._openViewIndex });
                        }
                        else {
                            app.gameContext.gameCurrent.setExitOpenUI(this._openView, this._openViewIndex);
                        }
                    }
                }
                else if (e.currentTarget == this.icon2) {
                    app.gameContext.gameCurrent.setExitOpenUI(s.UserfaceName.shengZhiMain, 0);
                }
                else if (e.currentTarget == this.icon0) {
                    app.gameContext.gameCurrent.setExitOpenUI(s.UserfaceName.role, 1);
                }
                else if (e.currentTarget == this.icon1) {
                    app.gameContext.gameCurrent.setExitOpenUI(s.UserfaceName.qiangzheng, 0);
                }
                else if (e.currentTarget == this.icon3) {
                    app.gameContext.gameCurrent.setExitOpenUI(s.UserfaceName.role, 0);
                }
                else if (e.currentTarget == this.icon4) {
                    app.gameContext.gameCurrent.setExitOpenUI(s.UserfaceName.role, 0, this._pos);
                    GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType20000, this._pos);
                }
            }
            else {
                this._pos = -1;
            }
            this.callComplete();
            copy.CopyFailInstance.instance.remove();
        };
        CopyFailTipView.prototype.close = function () {
            if (this._completeMethod) {
                (_a = this._completeMethod).call.apply(_a, [this._completeCaller].concat(this._completeArgs));
            }
            copy.CopyFailInstance.instance.remove();
            var _a;
        };
        CopyFailTipView.prototype.getRewardCallback = function (str) {
            this.showPayView();
            var rewards = str.split(";");
            mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
        };
        CopyFailTipView.prototype.callComplete = function () {
            if (this._completeMethod) {
                (_a = this._completeMethod).call.apply(_a, [this._completeCaller].concat(this._completeArgs));
            }
            var _a;
        };
        return CopyFailTipView;
    }(ui.CopyFailSkin));
    copy.CopyFailTipView = CopyFailTipView;
    __reflect(CopyFailTipView.prototype, "copy.CopyFailTipView");
})(copy || (copy = {}));
