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
    var fanchenmi;
    (function (fanchenmi) {
        var FangChenMiDialog = (function (_super) {
            __extends(FangChenMiDialog, _super);
            function FangChenMiDialog() {
                return _super.call(this) || this;
            }
            FangChenMiDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.inputNum.restrict = "X x 0-9";
                this.inputIphone.restrict = "0-9";
                var tmp = Templates.getTemplateById(templates.Map.SYSRULE, 1801);
                this.labConcent.textFlow = utils.TextFlowMaker.generateTextFlow(tmp.des);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            FangChenMiDialog.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.inputName.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputNameFocusIn, this);
                this.inputNum.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputNumFocusIn, this);
                this.inputIphone.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputIphoneFocusIn, this);
            };
            FangChenMiDialog.prototype.exit = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.inputName.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onInputNameFocusIn, this);
                this.inputNum.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onInputNumFocusIn, this);
                this.inputIphone.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onInputIphoneFocusIn, this);
            };
            FangChenMiDialog.prototype.onClick = function (e) {
                switch (e.target) {
                    case this.btnBack:
                    case this.btnClose:
                        mg.uiManager.remove(this);
                        break;
                    case this.btnOK:
                        this.sendRequest();
                        break;
                }
            };
            FangChenMiDialog.prototype.onInputNameFocusIn = function (event) {
                this.inputName.text = "";
            };
            FangChenMiDialog.prototype.onInputNumFocusIn = function (event) {
                this.inputNum.text = "";
            };
            FangChenMiDialog.prototype.onInputIphoneFocusIn = function (event) {
                this.inputIphone.text = "";
            };
            FangChenMiDialog.prototype.sendRequest = function () {
                if (this.inputName.text == "") {
                    mg.alertManager.tip(Language.J_QSRXM);
                    return;
                }
                if (this.inputNum.text == "") {
                    mg.alertManager.tip(Language.J_QSRSFZH);
                    return;
                }
                GameModels.login.addictionPlayerInfo(this.inputName.text, this.inputNum.text, this.inputIphone.text, utils.Handler.create(this, function () {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_SFYZCG, TypeBtnLabel.OK_SIGIN);
                    mg.uiManager.remove(this);
                }));
                this.inputName.text = "";
                this.inputNum.text = "";
                this.inputIphone.text = "";
            };
            return FangChenMiDialog;
        }(ui.FanChenMiAlertSkin));
        fanchenmi.FangChenMiDialog = FangChenMiDialog;
        __reflect(FangChenMiDialog.prototype, "dialog.fanchenmi.FangChenMiDialog");
    })(fanchenmi = dialog.fanchenmi || (dialog.fanchenmi = {}));
})(dialog || (dialog = {}));
