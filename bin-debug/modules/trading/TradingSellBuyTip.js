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
        var TradingSellBuyTip = (function (_super) {
            __extends(TradingSellBuyTip, _super);
            function TradingSellBuyTip() {
                return _super.call(this) || this;
            }
            TradingSellBuyTip.prototype.show = function (data) {
                this._currData = data;
                this._currCount = 1;
                this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJiaTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJianTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.textInputNum.addEventListener(egret.Event.FOCUS_OUT, this.textInputCountChange, this);
                this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.showView();
            };
            TradingSellBuyTip.prototype.showView = function () {
                if (this._currData) {
                    this.textInputNum.text = "" + this._currCount;
                    var item = Templates.getTemplateById(templates.Map.ITEM, this._currData.itemId);
                    this.imgIcon.source = item.icon;
                    this.labName.text = item.name;
                    this.labName.textColor = TypeQuality.getQualityColor(item.quality);
                    this.imgQuality.source = ResPath.getQuality(item.quality);
                    this.lblCount.text = "" + this._currData.count;
                    this.lblPrice.text = "" + this._currData.price;
                    this.lblTatolPrice.text = "" + this._currCount * this._currData.price;
                }
            };
            TradingSellBuyTip.prototype.textInputCountChange = function (event) {
                var num = Number(this.textInputNum.text);
                this._currCount = num;
                if (num <= 1) {
                    this.textInputNum.text = "" + 1;
                    this._currCount = 1;
                }
                if (num >= this._currData.count) {
                    this.textInputNum.text = "" + this._currData.count;
                    this._currCount = this._currData.count;
                }
                this.lblTatolPrice.text = "" + this._currCount * this._currData.price;
            };
            TradingSellBuyTip.prototype.onBtnClick = function (e) {
                var _this = this;
                if (e.currentTarget == this.btnJia) {
                    this._currCount = this._currCount + 1;
                    if (this._currCount >= this._currData.count) {
                        this._currCount = this._currData.count;
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
                    if (this._currCount >= this._currData.count) {
                        this._currCount = this._currData.count;
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
                else if (e.currentTarget == this.imgIcon) {
                    if (this._currData) {
                        var item = Templates.getTemplateById(templates.Map.ITEM, this._currData.itemId);
                        if (item) {
                            if (item.mainType == TypeItem.EQUIP) {
                                mg.TipManager.instance.showTip(tips.EquipTip, item);
                            }
                            else {
                                mg.TipManager.instance.showTip(tips.PropTip, item);
                            }
                        }
                    }
                }
                else {
                    if (GameModels.user.player.mojing < this._currCount * this._currData.price) {
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.J_BJCZ, TypeBtnLabel.GOTO, null, utils.Handler.create(this, this.rigthCallback));
                        return;
                    }
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    logger.log("购买：：：：：：：id==" + this._currData.itemId + "count==" + this._currCount + "orderId==" + this._currData.orderId);
                    GameModels.tradingSell.requestBuyShop(this._currData.orderId, this._currData.itemId, this._currCount, utils.Handler.create(this, function () {
                        mg.alertManager.tip(Language.J_GMCG);
                        _this.dispatchEventWith(egret.Event.CLOSE);
                    }));
                }
            };
            TradingSellBuyTip.prototype.rigthCallback = function () {
                mg.uiManager.show(MallScene, { tabIndex: 4 }, true);
            };
            TradingSellBuyTip.prototype.hide = function () {
                this._currData = null;
                this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJiaTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnJianTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.textInputNum.removeEventListener(egret.Event.FOCUS_OUT, this.textInputCountChange, this);
                this.imgIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return TradingSellBuyTip;
        }(ui.TradingSellBuyTipSkin));
        trading.TradingSellBuyTip = TradingSellBuyTip;
        __reflect(TradingSellBuyTip.prototype, "dialog.trading.TradingSellBuyTip", ["IAlert", "egret.DisplayObject"]);
    })(trading = dialog.trading || (dialog.trading = {}));
})(dialog || (dialog = {}));
