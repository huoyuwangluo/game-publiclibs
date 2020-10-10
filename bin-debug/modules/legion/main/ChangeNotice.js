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
var ChangeNotice = (function (_super) {
    __extends(ChangeNotice, _super);
    function ChangeNotice() {
        return _super.call(this) || this;
    }
    ChangeNotice.prototype.show = function (data) {
        this.labInput.text = Language.J_SRZXGG;
        this._data = data;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSure, this);
        this.labInput.addEventListener(egret.FocusEvent.FOCUS_IN, this.OnCharactorFocusIn, this);
        // this.labInput.addEventListener(egret.FocusEvent.FOCUS_OUT, this.OnCharactorChange, this);
        // this.labInput.addEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
    };
    ChangeNotice.prototype.OnCharactorFocusIn = function (event) {
        this.labInput.text = "";
    };
    ChangeNotice.prototype.onBtnSure = function (e) {
        if (this.labInput.text == "") {
            mg.alertManager.tip(Language.J_SRNRBNWK, 0xff0000);
            return;
        }
        if (this.labInput.text.length > 30) {
            mg.alertManager.tip(Language.getExpression(Language.E_ZD1Z, 30), 0xff0000);
            return;
        }
        if (GameModels.login.hasSensitives(this.labInput.text)) {
            mg.alertManager.tip(Language.J_MCHYFFZF, 0xff0000);
            return;
        }
    };
    ChangeNotice.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSure, this);
        this.labInput.removeEventListener(egret.FocusEvent.FOCUS_IN, this.OnCharactorFocusIn, this);
        this._data = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    ChangeNotice.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return ChangeNotice;
}(ui.ChangeNoticeSkin));
__reflect(ChangeNotice.prototype, "ChangeNotice", ["IAlert", "egret.DisplayObject"]);
