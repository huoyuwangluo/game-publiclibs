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
var ApplyFriendAlert = (function (_super) {
    __extends(ApplyFriendAlert, _super);
    function ApplyFriendAlert() {
        return _super.call(this) || this;
    }
    ApplyFriendAlert.prototype.show = function (data) {
        this._data = data;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.inputTxt.addEventListener(egret.FocusEvent.FOCUS_IN, this.onCharactorFocusIn, this);
    };
    ApplyFriendAlert.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.inputTxt.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onCharactorFocusIn, this);
        this._data = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    ApplyFriendAlert.prototype.onClick = function (e) {
        switch (e.target) {
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnAdd:
                this.sendMessage();
                break;
        }
    };
    ApplyFriendAlert.prototype.onCharactorFocusIn = function (event) {
        this.inputTxt.text = "";
    };
    ApplyFriendAlert.prototype.sendMessage = function () {
        if (this.inputTxt.text == "") {
            mg.alertManager.tip(Language.J_SRNRBNWK);
            return;
        }
        if (GameModels.login.hasSensitives(this.inputTxt.text)) {
            mg.alertManager.tip(Language.J_MCHYFFZF);
            return;
        }
        GameModels.friends.sendAddFriend(this.inputTxt.text, utils.Handler.create(this, this.addBack));
    };
    ApplyFriendAlert.prototype.addBack = function (data) {
        if (data.Result == 1) {
            mg.alertManager.tip(Language.J_SQCG);
            this.inputTxt.text = "";
        }
        else if (data.Result == 2) {
            mg.alertManager.tip(Language.J_TJCG);
            this.dispatchEventWith(egret.Event.CLOSE);
        }
    };
    return ApplyFriendAlert;
}(ui.ApplyFriendAlertSkin));
__reflect(ApplyFriendAlert.prototype, "ApplyFriendAlert", ["IAlert", "egret.DisplayObject"]);
