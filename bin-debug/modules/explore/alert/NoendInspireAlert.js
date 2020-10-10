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
var TypeInspire = (function () {
    function TypeInspire() {
    }
    TypeInspire.NOEND = 1;
    TypeInspire.ANIMAL = 2;
    TypeInspire.LOCKDEMON = 3;
    TypeInspire.KINGUA = 4;
    TypeInspire.KINGUD = 5;
    return TypeInspire;
}());
__reflect(TypeInspire.prototype, "TypeInspire");
var NoendInspireAlert = (function (_super) {
    __extends(NoendInspireAlert, _super);
    function NoendInspireAlert() {
        return _super.call(this) || this;
    }
    NoendInspireAlert.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    NoendInspireAlert.prototype.show = function (typeInspire, moshiNum, nowUpScale, successHandler) {
        if (nowUpScale === void 0) { nowUpScale = 0; }
        if (successHandler === void 0) { successHandler = null; }
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okHandler, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this._successHandler = successHandler;
        this._typeInspire = typeInspire;
        switch (this._typeInspire) {
            case TypeInspire.NOEND:
                this.currentState = "noEnd";
                this.labDamageBonus.text = Language.C_SH + "+" + nowUpScale + "%";
                break;
            case TypeInspire.ANIMAL:
                this.currentState = "petPagoda";
                GameModels.copyPagoda.addEventListener(mo.ModelGamePagoda.BATTLE_OVER, this.closeHandler, this);
                break;
            case TypeInspire.LOCKDEMON:
                this.currentState = "demonPagoda";
                GameModels.copyPagoda.addEventListener(mo.ModelGamePagoda.BATTLE_OVER, this.closeHandler, this);
                break;
            case TypeInspire.KINGUA:
                this.currentState = "kingWarA";
                GameModels.copyPagoda.addEventListener(mo.ModelGamePagoda.BATTLE_OVER, this.closeHandler, this);
                break;
            case TypeInspire.KINGUD:
                this.currentState = "kingWarD";
                GameModels.copyPagoda.addEventListener(mo.ModelGamePagoda.BATTLE_OVER, this.closeHandler, this);
                break;
        }
        this.labMoshi.text = moshiNum.toString();
    };
    NoendInspireAlert.prototype.hide = function () {
        if (this._successHandler) {
            this._successHandler.recover();
            this._successHandler = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okHandler, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    };
    NoendInspireAlert.prototype.updata = function (moshiNum, nowUpScale) {
        if (this.currentState == "noEnd") {
            this.labDamageBonus.text = Language.C_SH + "+" + nowUpScale + "%";
            this.labMoshi.text = moshiNum.toString();
        }
    };
    NoendInspireAlert.prototype.okHandler = function () {
        if (this._successHandler) {
            var handler = this._successHandler;
            if (handler.once) {
                this._successHandler = null;
            }
            handler.run();
        }
        switch (this._typeInspire) {
            case TypeInspire.ANIMAL:
            case TypeInspire.LOCKDEMON:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            default: break;
        }
    };
    NoendInspireAlert.prototype.closeHandler = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return NoendInspireAlert;
}(ui.NoendInspireSkin));
__reflect(NoendInspireAlert.prototype, "NoendInspireAlert", ["IAlert", "egret.DisplayObject"]);
