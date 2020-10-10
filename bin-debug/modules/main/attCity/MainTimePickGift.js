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
var MainTimePickGift = (function (_super) {
    __extends(MainTimePickGift, _super);
    function MainTimePickGift() {
        return _super.call(this) || this;
    }
    MainTimePickGift.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
        this._itemBox1 = [this.reward0, this.reward1, this.reward2];
        this._itemBox2 = [this.reward3, this.reward4, this.reward5];
    };
    MainTimePickGift.prototype.enter = function () {
        this._giftInfo = null;
        this._temp = null;
        this.showView();
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnMoneyGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    MainTimePickGift.prototype.showView = function () {
        this.imgGetFinsh.visible = false;
        this.imgMoneyFinsh.visible = false;
        this.btnGet.visible = false;
        this.btnMoneyGet.visible = false;
        this._giftInfo = GameModels.common.timeGiftInfo;
        if (!this._giftInfo) {
            mg.alertManager.tip(Language.J_YLQSYJL);
            mg.uiManager.remove(this);
            return;
        }
        this._temp = Templates.getTemplateById(templates.Map.TIMEPACK, this._giftInfo.GiftId);
        if (!this._temp)
            return;
        var str1 = this._temp.rewardStr1.split(";");
        var str2 = this._temp.rewardStr2.split(";");
        for (var i = 0; i < 3; i++) {
            if (str1[i]) {
                this._itemBox1[i].dataSource = str1[i];
            }
            else {
                this._itemBox1[i].dataSource = null;
            }
        }
        for (var i = 0; i < 3; i++) {
            if (str2[i]) {
                this._itemBox2[i].dataSource = str2[i];
            }
            else {
                this._itemBox2[i].dataSource = null;
            }
        }
        if (this._giftInfo.Status1 < 2) {
            this.btnGet.visible = true;
            this.btnGet.label = Language.C_LQ;
            this.btnGet.skinName = "skins.SnapSmallButton5Skin";
        }
        else {
            this.imgGetFinsh.visible = true;
        }
        if (this._giftInfo.Status2 < 2) {
            this.btnMoneyGet.visible = true;
            this.btnMoneyGet.label = this._giftInfo.Status2 == 0 ? Language.C_QCZ : Language.C_LQ;
            this.btnMoneyGet.skinName = this._giftInfo.Status2 == 1 ? "skins.SnapSmallButton5Skin" : "skins.SnapSmallButton4Skin";
            ;
        }
        else {
            this.imgMoneyFinsh.visible = true;
        }
    };
    MainTimePickGift.prototype.onBtnClick = function (e) {
        var _this = this;
        if (e.currentTarget == this.btnGet) {
            if (this._giftInfo.Status1 == 1) {
                GameModels.common.requestyGetRewardTimePickGift(1, utils.Handler.create(this, function (e) {
                    var rewards = _this._temp ? _this._temp.rewardStr1.split(";") : [];
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                    _this.showView();
                }));
            }
            else if (this._giftInfo.Status1 == 0) {
                mg.alertManager.tip(Language.J_GJLBKLQ);
            }
        }
        else {
            if (this._giftInfo.Status2 == 1) {
                GameModels.common.requestyGetRewardTimePickGift(2, utils.Handler.create(this, function (e) {
                    var rewards = _this._temp ? _this._temp.rewardStr2.split(";") : [];
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                    _this.showView();
                }));
            }
            else if (this._giftInfo.Status2 == 0) {
                GameModels.recharge.openRechargeDialog();
                mg.uiManager.remove(this);
            }
        }
    };
    MainTimePickGift.prototype.exit = function () {
        this._giftInfo = null;
        this._temp = null;
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnMoneyGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    MainTimePickGift.prototype.onClose = function (e) {
        mg.uiManager.remove(this);
    };
    return MainTimePickGift;
}(ui.MainTimePickGiftSkin));
__reflect(MainTimePickGift.prototype, "MainTimePickGift");
