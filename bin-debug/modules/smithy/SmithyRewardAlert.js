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
var SmithyRewardAlert = (function (_super) {
    __extends(SmithyRewardAlert, _super);
    function SmithyRewardAlert() {
        var _this = _super.call(this) || this;
        _this._str = "";
        _this._rwards = [_this.reward1, _this.reward2, _this.reward3, _this.reward4, _this.reward5];
        return _this;
    }
    SmithyRewardAlert.prototype.show = function (str, isShowTitle) {
        if (isShowTitle === void 0) { isShowTitle = false; }
        this.labTitle.visible = isShowTitle;
        this._str = str;
        var rewards = str.split(";");
        for (var i = 0; i < 5; i++) {
            var iconBox = this._rwards[i];
            iconBox.labName.stroke = 1;
            if (i < rewards.length) {
                iconBox.dataSource = rewards[i];
                this.boxGroup.addChild(iconBox);
            }
            else {
                if (iconBox.parent) {
                    iconBox.parent.removeChild(iconBox);
                }
            }
        }
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    SmithyRewardAlert.prototype.clickHandler = function (e) {
        var rewards = this._str.split(";");
        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    SmithyRewardAlert.prototype.hide = function () {
        for (var i = 0; i < 5; i++) {
            var iconBox = this._rwards[i];
            if (iconBox)
                iconBox.dataSource = null;
        }
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return SmithyRewardAlert;
}(ui.SmithyRewardAlertSkin));
__reflect(SmithyRewardAlert.prototype, "SmithyRewardAlert", ["IAlert", "egret.DisplayObject"]);
