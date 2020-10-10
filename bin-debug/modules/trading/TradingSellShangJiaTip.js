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
        var TradingSellShangJiaTip = (function (_super) {
            __extends(TradingSellShangJiaTip, _super);
            function TradingSellShangJiaTip() {
                return _super.call(this) || this;
            }
            TradingSellShangJiaTip.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            TradingSellShangJiaTip.prototype.enter = function (data) {
                this._currData = data;
                this._currCount = 1;
                if (this._currData) {
                    this._currPrice = this._currData.templates.price;
                    this.textInputPrice.text = this._currData.templates.price + "";
                    this.reward.visible = true;
                }
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnShangJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.textInputCount.addEventListener(egret.Event.FOCUS_OUT, this.textInputCountChange, this);
                this.textInputPrice.addEventListener(egret.Event.FOCUS_OUT, this.textInputPriceChange, this);
                this.showView();
            };
            TradingSellShangJiaTip.prototype.exit = function () {
                this._currData = null;
                this.reward.dataSource = null;
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnShangJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.textInputCount.removeEventListener(egret.Event.FOCUS_OUT, this.textInputCountChange, this);
                this.textInputPrice.removeEventListener(egret.Event.FOCUS_OUT, this.textInputPriceChange, this);
            };
            TradingSellShangJiaTip.prototype.textInputCountChange = function (event) {
                var num = Number(this.textInputCount.text);
                this._currCount = num;
                if (num <= 1) {
                    this.textInputCount.text = "" + 1;
                    this._currCount = 1;
                }
                if (num >= this._currData.itemCount) {
                    this.textInputCount.text = "" + this._currData.itemCount;
                    this._currCount = this._currData.itemCount;
                }
            };
            TradingSellShangJiaTip.prototype.textInputPriceChange = function (event) {
                var num = Number(this.textInputPrice.text);
                this._currPrice = num;
                if (num <= 0) {
                    this.textInputPrice.text = "0";
                    this._currPrice = 0;
                }
            };
            TradingSellShangJiaTip.prototype.showView = function () {
                var count = GameModels.tradingSell.leftSellCount <= 0 ? 0 : GameModels.tradingSell.leftSellCount;
                this.labCount.text = Language.J_JRSYSJCS + count;
                if (this._currData) {
                    this.reward.dataSource = null;
                    this.reward.dataSource = this._currData.itemId + "_" + this._currData.itemCount;
                    this.textInputCount.text = this._currCount + "";
                    this.textInputPriceFanWei.text = this._currData.templates.priceMin + "-" + this._currData.templates.priceMax;
                }
            };
            TradingSellShangJiaTip.prototype.onBtnClick = function (e) {
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
                else {
                    if (this._currData) {
                        if (this._currPrice < this._currData.templates.priceMin) {
                            // this.textInputPrice.text = "" + this._currData.templates.priceMin;
                            // this._currPrice = this._currData.templates.priceMin;
                            mg.alertManager.tip(Language.J_JGBNXYZDJ);
                            return;
                        }
                        if (this._currPrice > this._currData.templates.priceMax) {
                            // this.textInputPrice.text = "" + this._currData.templates.priceMax;
                            // this._currPrice = this._currData.templates.priceMax;
                            mg.alertManager.tip(Language.J_JGBNDYZGJ);
                            return;
                        }
                        logger.log("上架：：：：：：id==" + this._currData.itemId + "count==" + this._currCount, "price==" + this._currPrice);
                        GameModels.tradingSell.requestSellShop(this._currData.itemId, this._currCount, this._currPrice, utils.Handler.create(this, function () {
                            mg.uiManager.remove(_this);
                            //mg.uiManager.show(dialog.bag.BagDialog, { tabIndex: 4 });
                        }));
                    }
                }
            };
            TradingSellShangJiaTip.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            return TradingSellShangJiaTip;
        }(ui.TradingSellShangJiaTipSkin));
        trading.TradingSellShangJiaTip = TradingSellShangJiaTip;
        __reflect(TradingSellShangJiaTip.prototype, "dialog.trading.TradingSellShangJiaTip");
    })(trading = dialog.trading || (dialog.trading = {}));
})(dialog || (dialog = {}));
