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
var DonateAlert = (function (_super) {
    __extends(DonateAlert, _super);
    function DonateAlert() {
        return _super.call(this) || this;
    }
    DonateAlert.prototype.show = function () {
        this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnJiaTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnJianTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.textInputNum.addEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
        var num = 0;
        if (GameModels.legion.vipYuanBaoDonateLimit - GameModels.legion.donateYuanbao >= 10) {
            num = 10;
        }
        else {
            num = GameModels.legion.vipYuanBaoDonateLimit - GameModels.legion.donateYuanbao;
        }
        this.textInputNum.text = num.toString();
        this.contribution.text = Language.getExpression(Language.E_KHDGX, num * 50);
        this.labHint.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_JX1YB, num));
    };
    DonateAlert.prototype.hide = function () {
        this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnJiaTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnJianTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.textInputNum.removeEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    DonateAlert.prototype.OnCharactorChange = function (event) {
        var num = Number(this.textInputNum.text);
        if (num > GameModels.legion.vipYuanBaoDonateLimit - GameModels.legion.donateYuanbao) {
            num = GameModels.legion.vipYuanBaoDonateLimit - GameModels.legion.donateYuanbao;
            mg.alertManager.tip(Language.J_ZQJXBKCGMRJXSX);
        }
        this.textInputNum.text = String(num);
        this.contribution.text = Language.getExpression(Language.E_KHDGX, num * 50);
        this.labHint.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_JX1YB, num));
    };
    DonateAlert.prototype.onClick = function (e) {
        var num = Number(this.textInputNum.text);
        switch (e.target) {
            case this.btnEnter:
                if (GameModels.user.player.diamonds >= num) {
                    GameModels.legion.getdonate(2, num, utils.Handler.create(this, function () {
                        mg.alertManager.tip(Language.getExpression(Language.E_HDGXZ, Number(this.textInputNum.text) * 50));
                    }));
                    this.dispatchEventWith(egret.Event.CLOSE);
                }
                else {
                    mg.alertManager.tip(Language.J_MSBZ);
                }
                break;
            case this.btnJiaTen:
                num = num + 100;
                break;
            case this.btnJianTen:
                num = num - 100;
                break;
            case this.btnJia:
                num = num + 10;
                break;
            case this.btnJian:
                num = num - 10;
                break;
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
        }
        if (this.textInputNum.text == "" || num < 1) {
            this.textInputNum.text = "1";
            num = 1;
        }
        if (num > GameModels.legion.vipYuanBaoDonateLimit - GameModels.legion.donateYuanbao) {
            num = GameModels.legion.vipYuanBaoDonateLimit - GameModels.legion.donateYuanbao;
            mg.alertManager.tip(Language.J_ZQJXBKCGMRJXSX);
        }
        this.textInputNum.text = String(num);
        this.contribution.text = Language.getExpression(Language.E_KHDGX, num * 50);
        this.labHint.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_JX1YB, num));
    };
    return DonateAlert;
}(ui.DonateAlertSkin));
__reflect(DonateAlert.prototype, "DonateAlert", ["IAlert", "egret.DisplayObject"]);
