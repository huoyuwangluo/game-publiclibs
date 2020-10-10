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
var renderer;
(function (renderer) {
    var TradingRenderer = (function (_super) {
        __extends(TradingRenderer, _super);
        function TradingRenderer() {
            return _super.call(this) || this;
        }
        TradingRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data = this.data;
                this.reward.dataSource = data.itemId + "_" + data.itemCount;
                this.btnSell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnGain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
            else {
                this.reward = null;
                this.btnSell.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnGain.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
        };
        TradingRenderer.prototype.onBtnClick = function (e) {
            var data = this.data;
            if (e.currentTarget == this.btnSell) {
                mg.uiManager.show(dialog.trading.TradingSellShangJiaTip, data);
            }
            else {
                mg.alertManager.showAlert(dialog.trading.TradingSellPickupTip, true, true, data);
            }
        };
        return TradingRenderer;
    }(ui.TradingRendererSkin));
    renderer.TradingRenderer = TradingRenderer;
    __reflect(TradingRenderer.prototype, "renderer.TradingRenderer");
})(renderer || (renderer = {}));
