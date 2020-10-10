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
var ChangePlayerName = (function (_super) {
    __extends(ChangePlayerName, _super);
    function ChangePlayerName() {
        return _super.call(this) || this;
    }
    ChangePlayerName.prototype.show = function (type) {
        this._type = type;
        this.input.text = GameModels.user.player.name;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this);
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureClick, this);
        this.btnRandom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRandomClick, this);
        // this.input.addEventListener(egret.FocusEvent.FOCUS_IN, this.OnCharactorFocusIn, this);
    };
    ChangePlayerName.prototype.OnCharactorFocusIn = function (event) {
        this.input.text = "";
    };
    ChangePlayerName.prototype.onCloseClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    ChangePlayerName.prototype.onSureClick = function (e) {
        if (this.input.text == GameModels.user.player.name) {
            mg.alertManager.tip(Language.J_QGHMZ, 0xff0000);
            return;
        }
        if (this.input.text == "") {
            mg.alertManager.tip(Language.J_SRNRBNWK, 0xff0000);
            return;
        }
        if (GameModels.login.hasSensitives(this.input.text)) {
            mg.alertManager.tip(Language.J_MCHYFFZF, 0xff0000);
            return;
        }
        if (this.input.text.length > 6) {
            mg.alertManager.tip(Language.J_ZDZN6FZF, 0xff0000);
            return;
        }
        GameModels.bag.requestChangeName(this.input.text, this._type, utils.Handler.create(this, function () {
            mg.alertManager.tip(Language.J_MZGHCG);
            this.dispatchEventWith(egret.Event.CLOSE);
        }));
    };
    ChangePlayerName.prototype.onRandomClick = function (e) {
        var sex = GameModels.user.player.job == TypeJob.ZHAN ? true : false;
        this.input.text = GameModels.login.randomName(sex);
    };
    ChangePlayerName.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this);
        this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureClick, this);
        // this.btnRandom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRandomClick, this);
        this.input.removeEventListener(egret.FocusEvent.FOCUS_IN, this.OnCharactorFocusIn, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return ChangePlayerName;
}(ui.ChangePlayerNameSkin));
__reflect(ChangePlayerName.prototype, "ChangePlayerName", ["IAlert", "egret.DisplayObject"]);
