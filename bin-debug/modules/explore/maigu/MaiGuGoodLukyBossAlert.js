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
var MaiGuGoodLukyBossAlert = (function (_super) {
    __extends(MaiGuGoodLukyBossAlert, _super);
    function MaiGuGoodLukyBossAlert() {
        var _this = _super.call(this) || this;
        _this._props = [_this.box1, _this.box2, _this.box3, _this.box4];
        return _this;
    }
    MaiGuGoodLukyBossAlert.prototype.show = function (handler) {
        if (handler)
            this._handler = handler;
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okHandler, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.showView();
    };
    MaiGuGoodLukyBossAlert.prototype.hide = function () {
        this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okHandler, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        if (this._handler) {
            this._handler.recover();
            this._handler = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    MaiGuGoodLukyBossAlert.prototype.showView = function () {
        this._count = GameModels.copyMaterial.copyNotifyProgressEx ? GameModels.copyMaterial.copyNotifyProgressEx.LeftCallCount : 0;
        this.labCount.text = Language.getExpression(Language.E_SY1C, this._count);
        var price = GameModels.copyMaterial.zhaoHuanPrice;
        this.labPrice.text = price + "";
        var drops = GameModels.copyMaterial.luckBossDrops;
        this.showDrops(drops);
    };
    MaiGuGoodLukyBossAlert.prototype.showDrops = function (drops) {
        if (!drops || !drops.length)
            return;
        var len = drops.length <= 4 ? drops.length : 4;
        for (var i = 0; i < this._props.length; i++) {
            if (i < len) {
                this._props[i].visible = true;
                this._props[i].dataSource = drops[i];
                this._props[i].labCount.visible = false;
            }
            else {
                this._props[i].visible = false;
            }
        }
    };
    MaiGuGoodLukyBossAlert.prototype.okHandler = function (e) {
        if (this._count < 1) {
            mg.alertManager.tip(Language.J_ZHCSBZ);
            return;
        }
        GameModels.copyMaterial.requestMaiGuBallBoss(utils.Handler.create(this, function () {
            mg.alertManager.tip(Language.C_ZHCG1);
            this.dispatchEventWith(egret.Event.CLOSE);
            if (this._handler) {
                this._handler.run();
            }
        }));
    };
    MaiGuGoodLukyBossAlert.prototype.closeHandler = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return MaiGuGoodLukyBossAlert;
}(ui.MaiGuGoodLukyBossAlertSkin));
__reflect(MaiGuGoodLukyBossAlert.prototype, "MaiGuGoodLukyBossAlert", ["IAlert", "egret.DisplayObject"]);
