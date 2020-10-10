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
var XingYingLunPanGetAlert = (function (_super) {
    __extends(XingYingLunPanGetAlert, _super);
    function XingYingLunPanGetAlert() {
        return _super.call(this) || this;
    }
    XingYingLunPanGetAlert.prototype.show = function (icon, num, score) {
        var iconArr = [this.icon0, this.icon1, this.icon2, this.icon3, this.icon4];
        var labArr = [this.lab0, this.lab1, this.lab2, this.lab3, this.lab4];
        var bgArr = [this.imgbg0, this.imgbg1, this.imgbg2, this.imgbg3, this.imgbg4];
        var template1 = GameModels.dataSet.getDataSettingById(293001);
        var template2 = GameModels.dataSet.getDataSettingById(294001);
        this.getNum.text = Language.C_XZJF + score;
        for (var i = 0; i < 5; i++) {
            iconArr[i].visible = false;
            labArr[i].visible = false;
            bgArr[i].visible = false;
        }
        if (icon.length == 1 && num.length == 1) {
            this.icon2.visible = true;
            this.icon2.source = icon[0];
            this.lab2.visible = true;
            this.lab2.text = num[0];
            this.imgbg2.visible = true;
            this.btnAngin.label = Language.J_ZCYC;
            this._count = 1;
            this.labCount.text = template1.value.split("_")[1];
        }
        else {
            for (var i = 0; i < 5; i++) {
                iconArr[i].visible = true;
                labArr[i].visible = true;
                bgArr[i].visible = true;
                iconArr[i].source = icon[i];
                labArr[i].text = num[i];
                this.labCount.text = template2.value.split("_")[1];
            }
            this.btnAngin.label = Language.J_ZCWC;
            this._count = 5;
        }
        this.btnCanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnCanel, this);
        this.btnAngin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnAngin, this);
    };
    XingYingLunPanGetAlert.prototype.onbtnCanel = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    XingYingLunPanGetAlert.prototype.onbtnAngin = function (e) {
        GameModels.activitySummer.lunPanAngin(this._count);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    XingYingLunPanGetAlert.prototype.hide = function () {
        this.btnCanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnCanel, this);
        this.btnAngin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnAngin, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return XingYingLunPanGetAlert;
}(ui.XingYingLunPanGetAlertSkin));
__reflect(XingYingLunPanGetAlert.prototype, "XingYingLunPanGetAlert", ["IAlert", "egret.DisplayObject"]);
