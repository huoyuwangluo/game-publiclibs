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
var SalaryGiftAlert = (function (_super) {
    __extends(SalaryGiftAlert, _super);
    function SalaryGiftAlert() {
        return _super.call(this) || this;
    }
    SalaryGiftAlert.prototype.show = function (data) {
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        var wuguandata = Templates.getTemplateByProperty(templates.Map.CAMPWU, "step", data);
        this.labName0.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_NZWGZDZHDL, wuguandata.name));
        var str = wuguandata.rewards.split(";");
        this.reward1.dataSource = str[0];
    };
    SalaryGiftAlert.prototype.onClose = function (e) {
        var moneyPoint = mg.uiManager.getView(main.MainUIView).getMoneyPostion(true);
        mg.effectManager.flyEffects("6161", 10, this.reward1.localToGlobal(45, 45), moneyPoint, mg.layerManager.top);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    SalaryGiftAlert.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return SalaryGiftAlert;
}(ui.SalaryGiftAlertSkin));
__reflect(SalaryGiftAlert.prototype, "SalaryGiftAlert", ["IAlert", "egret.DisplayObject"]);
