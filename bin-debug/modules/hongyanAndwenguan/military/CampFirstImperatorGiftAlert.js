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
var CampFirstImperatorGiftAlert = (function (_super) {
    __extends(CampFirstImperatorGiftAlert, _super);
    function CampFirstImperatorGiftAlert() {
        var _this = _super.call(this) || this;
        _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
        return _this;
    }
    CampFirstImperatorGiftAlert.prototype.show = function () {
        this.showView();
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        GameModels.legion.addEventListener(mo.ModelLegion.UNION_FIRSTGIFT, this.showView, this);
    };
    CampFirstImperatorGiftAlert.prototype.showView = function () {
        for (var i = 0; i < this._rwards.length; i++) {
            this._rwards[i].dataSource = null;
        }
        var rewards = GameModels.dataSet.getDataSettingValueById(760001).split(";");
        for (var i = 0; i < 4; i++) {
            var iconBox = this._rwards[i];
            iconBox.labName.stroke = 1;
            if (i < rewards.length) {
                iconBox.dataSource = rewards[i];
                iconBox.labName.stroke = 2;
                this.boxGroup.addChild(iconBox);
            }
            else {
                if (iconBox.parent) {
                    iconBox.parent.removeChild(iconBox);
                }
            }
        }
        var status = GameModels.legion.firstRewardFlag;
        if (status == 0) {
            this.btnEnter.label = Language.C_LQ;
            this.btnEnter.skinName = "skins.SnapBigButton2Skin";
        }
        else if (status == 1) {
            this.btnEnter.label = Language.C_LQ;
            this.btnEnter.skinName = "skins.SnapBigButton3Skin";
        }
        else {
            this.btnEnter.label = Language.C_YLQ;
            this.btnEnter.skinName = "skins.SnapBigButton1Skin";
        }
    };
    CampFirstImperatorGiftAlert.prototype.onBtnClick = function (e) {
        var status = GameModels.legion.firstRewardFlag;
        if (status == 0) {
            mg.alertManager.tip(Language.J_DDDJJLQ);
        }
        else if (status == 1) {
            GameModels.legion.requestWuGuanGetFirstReward(utils.Handler.create(this, this.getRewardCallback, [this.boxGroup.localToGlobal(45, 45)]));
        }
        else {
            mg.alertManager.tip(Language.J_JLYLQ);
        }
    };
    CampFirstImperatorGiftAlert.prototype.getRewardCallback = function (fromPoint) {
        var reward = GameModels.dataSet.getDataSettingValueById(760001);
        var rewards = reward.split(";");
        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
    };
    CampFirstImperatorGiftAlert.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    CampFirstImperatorGiftAlert.prototype.hide = function () {
        for (var i = 0; i < this._rwards.length; i++) {
            this._rwards[i].dataSource = null;
        }
        GameModels.legion.removeEventListener(mo.ModelLegion.UNION_FIRSTGIFT, this.showView, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return CampFirstImperatorGiftAlert;
}(ui.CampFirstImperatorGiftAlertSkin));
__reflect(CampFirstImperatorGiftAlert.prototype, "CampFirstImperatorGiftAlert", ["IAlert", "egret.DisplayObject"]);
