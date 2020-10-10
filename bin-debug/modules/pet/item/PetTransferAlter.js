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
var PetTransferAlter = (function (_super) {
    __extends(PetTransferAlter, _super);
    function PetTransferAlter() {
        var _this = _super.call(this) || this;
        _this._imgIconArr = [_this.img1, _this.img2, _this.img3];
        return _this;
    }
    PetTransferAlter.prototype.show = function () {
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        for (var i = 0; i < this._imgIconArr.length; i++) {
            this._imgIconArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
        }
        var index = game.state.getItem(GameModels.user.player.uid, TypeSetting.SMOKEPET_ID);
        this.selecdIndex = index ? index : 1;
        this.imgSelecd.x = this._imgIconArr[index - 1].x - 2;
    };
    PetTransferAlter.prototype.onIconClick = function (e) {
        for (var i = 0; i < this._imgIconArr.length; i++) {
            if (e.currentTarget == this._imgIconArr[i]) {
                this.selecdIndex = i + 1;
                this.imgSelecd.x = this._imgIconArr[i].x - 2;
                break;
            }
        }
    };
    PetTransferAlter.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        for (var i = 0; i < this._imgIconArr.length; i++) {
            this._imgIconArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    PetTransferAlter.prototype.onClick = function (e) {
        switch (e.target) {
            case this.btnOk:
                game.state.setItem(GameModels.user.player.uid, TypeSetting.SMOKEPET_ID, this.selecdIndex);
                this.dispatchEventWith(egret.Event.CLOSE);
                GameModels.smokepet.changeShiLi();
                break;
            case this.btnClose:
            case this.btnCancel:
                this.dispatchEventWith(egret.Event.CLOSE);
                return;
        }
    };
    return PetTransferAlter;
}(ui.PetTransferAlterSkin));
__reflect(PetTransferAlter.prototype, "PetTransferAlter", ["IAlert", "egret.DisplayObject"]);
