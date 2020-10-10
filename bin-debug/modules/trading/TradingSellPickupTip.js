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
    var trading;
    (function (trading) {
        var TradingSellPickupTip = (function (_super) {
            __extends(TradingSellPickupTip, _super);
            function TradingSellPickupTip() {
                return _super.call(this) || this;
            }
            TradingSellPickupTip.prototype.show = function (data) {
                this._currData = data;
                this._currCount = 1;
                this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJiaTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJianTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnShiQu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.textInputNum.addEventListener(egret.Event.FOCUS_OUT, this.textInputCountChange, this);
                this.showView();
            };
            TradingSellPickupTip.prototype.showView = function () {
                this.reward.dataSource = null;
                if (this._currData) {
                    this.reward.dataSource = this._currData.itemId + "_" + this._currData.itemCount;
                    this.textInputNum.text = "" + this._currCount;
                }
            };
            TradingSellPickupTip.prototype.textInputCountChange = function (event) {
                var num = Number(this.textInputNum.text);
                this._currCount = num;
                if (num <= 1) {
                    this.textInputNum.text = "" + 1;
                    this._currCount = 1;
                }
                if (num >= this._currData.itemCount) {
                    this.textInputNum.text = "" + this._currData.itemCount;
                    this._currCount = this._currData.itemCount;
                }
            };
            TradingSellPickupTip.prototype.onBtnClick = function (e) {
                var _this = this;
                if (e.currentTarget == this.btnJia) {
                    this._currCount = this._currCount + 1;
                    if (this._currCount >= this._currData.itemCount) {
                        this._currCount = this._currData.itemCount;
                    }
                    this.showView();
                }
                else if (e.currentTarget == this.btnJian) {
                    this._currCount = this._currCount - 1;
                    if (this._currCount <= 1) {
                        this._currCount = 1;
                    }
                    this.showView();
                }
                else if (e.currentTarget == this.btnJiaTen) {
                    this._currCount = this._currCount + 10;
                    if (this._currCount >= this._currData.itemCount) {
                        this._currCount = this._currData.itemCount;
                    }
                    this.showView();
                }
                else if (e.currentTarget == this.btnJianTen) {
                    this._currCount = this._currCount - 10;
                    if (this._currCount <= 1) {
                        this._currCount = 1;
                    }
                    this.showView();
                }
                else if (e.currentTarget == this.btnClose) {
                    this.dispatchEventWith(egret.Event.CLOSE);
                }
                else {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    logger.log("拾取：：：：：：：id==" + this._currData.itemId + "count==" + this._currCount);
                    GameModels.tradingSell.requestPickupShop(this._currData.itemId, this._currCount, utils.Handler.create(this, function () {
                        _this.dispatchEventWith(egret.Event.CLOSE);
                    }));
                }
            };
            TradingSellPickupTip.prototype.hide = function () {
                this.reward.dataSource = null;
                this._currData = null;
                this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJiaTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJianTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnShiQu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.textInputNum.removeEventListener(egret.Event.FOCUS_OUT, this.textInputCountChange, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return TradingSellPickupTip;
        }(ui.TradingSellPickupTipSkin));
        trading.TradingSellPickupTip = TradingSellPickupTip;
        __reflect(TradingSellPickupTip.prototype, "dialog.trading.TradingSellPickupTip", ["IAlert", "egret.DisplayObject"]);
    })(trading = dialog.trading || (dialog.trading = {}));
})(dialog || (dialog = {}));
