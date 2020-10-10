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
var MaiGuSaoDangAlert = (function (_super) {
    __extends(MaiGuSaoDangAlert, _super);
    function MaiGuSaoDangAlert() {
        var _this = _super.call(this) || this;
        _this._props = [_this.box1, _this.box2, _this.box3, _this.box4];
        return _this;
    }
    MaiGuSaoDangAlert.prototype.show = function (copyVO, handler) {
        this._copyVO = copyVO;
        if (handler)
            this._handler = handler;
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okHandler, this);
        this.btnJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this._count = 1;
        this.textInputNum.text = this._count + "";
        this.showView();
    };
    MaiGuSaoDangAlert.prototype.hide = function () {
        this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okHandler, this);
        this.btnJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
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
    MaiGuSaoDangAlert.prototype.showView = function () {
        this.showPrice();
        var drops = GameModels.copyMaterial.luckBossDrops;
        this.showDrops(drops);
    };
    MaiGuSaoDangAlert.prototype.showPrice = function () {
        var price = GameModels.copyMaterial.zhaoHuanPrice;
        if (price)
            this.labPrice.text = this._count * price + "";
    };
    MaiGuSaoDangAlert.prototype.showDrops = function (drops) {
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
    MaiGuSaoDangAlert.prototype.okHandler = function (e) {
        GameModels.copyMaterial.requestQuickPass(this._copyVO.id, utils.Handler.create(this, function () {
            mg.alertManager.tip(Language.J_SDCG);
            this.dispatchEventWith(egret.Event.CLOSE);
            if (this._handler) {
                this._handler.run();
            }
        }), this._count);
    };
    MaiGuSaoDangAlert.prototype.onClick = function (e) {
        var num = Number(this.textInputNum.text);
        switch (e.target) {
            case this.btnJia:
                num = num + 1;
                break;
            case this.btnJian:
                num = num - 1;
                break;
        }
        if (this.textInputNum.text == "" || num < 0) {
            num = 0;
            this.textInputNum.text = num + "";
        }
        else if (num > 3) {
            num = 3;
            this.textInputNum.text = num + "";
        }
        this._count = num;
        this.textInputNum.text = this._count + "";
        this.showPrice();
    };
    MaiGuSaoDangAlert.prototype.closeHandler = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return MaiGuSaoDangAlert;
}(ui.MaiGuSaoDangAlertSkin));
__reflect(MaiGuSaoDangAlert.prototype, "MaiGuSaoDangAlert", ["IAlert", "egret.DisplayObject"]);
