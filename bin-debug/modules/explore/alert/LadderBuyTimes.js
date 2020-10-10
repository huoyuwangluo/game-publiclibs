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
var LadderBuyTimes = (function (_super) {
    __extends(LadderBuyTimes, _super);
    function LadderBuyTimes() {
        return _super.call(this) || this;
    }
    Object.defineProperty(LadderBuyTimes, "instance", {
        get: function () {
            if (!LadderBuyTimes._instance) {
                LadderBuyTimes._instance = new LadderBuyTimes();
            }
            return LadderBuyTimes._instance;
        },
        enumerable: true,
        configurable: true
    });
    LadderBuyTimes.prototype.hide = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    LadderBuyTimes.prototype.show = function (unitPrice, maxBuy, okFun, onHide) {
        this._okHandler = okFun;
        this._hideHandler = onHide;
        this._unitPrice = unitPrice;
        this._maxBuy = maxBuy;
        this.initData();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    LadderBuyTimes.prototype.onClick = function (e) {
        switch (e.target) {
            case this.btnBack:
            case this.btnClose:
                if (this._hideHandler) {
                    this._hideHandler.run();
                }
                break;
        }
    };
    LadderBuyTimes.prototype.initData = function () {
        this.labPrice.text;
    };
    return LadderBuyTimes;
}(ui.LadderBuyTimesSkin));
__reflect(LadderBuyTimes.prototype, "LadderBuyTimes", ["IAlert", "egret.DisplayObject"]);
