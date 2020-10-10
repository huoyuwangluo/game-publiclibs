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
        var TradingSellDialog = (function (_super) {
            __extends(TradingSellDialog, _super);
            function TradingSellDialog() {
                return _super.call(this) || this;
            }
            TradingSellDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            TradingSellDialog.prototype.enter = function () {
                var _this = this;
                GameModels.tradingSell.requestTradingSellMyItem(utils.Handler.create(this, function () {
                    if (!_this._listTrading) {
                        _this._listTrading = new eui.ArrayCollection(GameModels.tradingSell.tradingSellMyItemVO);
                    }
                    else {
                        _this._listTrading.source = GameModels.tradingSell.tradingSellMyItemVO;
                    }
                    _this.listTrade.dataProvider = _this._listTrading;
                    _this.labNo.visible = GameModels.tradingSell.tradingSellMyItemVO.length <= 0;
                }));
                GameModels.tradingSell.addEventListener(mo.ModelTradingSell.TRADINGSELL_MYITEM_CHANGE, this.updataTradingSellView, this);
            };
            TradingSellDialog.prototype.exit = function () {
                this.clearList(this.listTrade);
                GameModels.tradingSell.removeEventListener(mo.ModelTradingSell.TRADINGSELL_MYITEM_CHANGE, this.updataTradingSellView, this);
            };
            TradingSellDialog.prototype.updataTradingSellView = function () {
                this.labNo.visible = GameModels.tradingSell.tradingSellMyItemVO.length <= 0;
                this._listTrading.replaceAll(GameModels.tradingSell.tradingSellMyItemVO);
            };
            return TradingSellDialog;
        }(ui.TradingSellSkin));
        trading.TradingSellDialog = TradingSellDialog;
        __reflect(TradingSellDialog.prototype, "dialog.trading.TradingSellDialog");
    })(trading = dialog.trading || (dialog.trading = {}));
})(dialog || (dialog = {}));
