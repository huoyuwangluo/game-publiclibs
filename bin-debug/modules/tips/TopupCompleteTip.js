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
var TopupCompleteTip = (function (_super) {
    __extends(TopupCompleteTip, _super);
    function TopupCompleteTip() {
        return _super.call(this) || this;
    }
    TopupCompleteTip.prototype.show = function (num) {
        if (num > 0) {
            this.getNum.text = num + '';
            this._topup = num;
        }
    };
    TopupCompleteTip.prototype.btnUpSureClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    TopupCompleteTip.prototype.hide = function () {
        if (this._topup > 0) {
            var diamondPoint = mg.uiManager.getView(main.MainUIView).getDiamondPostion(true);
            mg.effectManager.flyEffects("6199", 10, this.getNum.localToGlobal(80), diamondPoint, mg.layerManager.top);
        }
        this._topup = 0;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return TopupCompleteTip;
}(ui.TopupCompleteSkin));
__reflect(TopupCompleteTip.prototype, "TopupCompleteTip", ["IAlert", "egret.DisplayObject"]);
