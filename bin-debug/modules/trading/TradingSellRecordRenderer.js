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
    var TradingSellRecordRenderer = (function (_super) {
        __extends(TradingSellRecordRenderer, _super);
        function TradingSellRecordRenderer() {
            return _super.call(this) || this;
        }
        TradingSellRecordRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data = this.data;
                this.labName.text = data.sellPlayerName;
                if (data.sellPlayerId == GameModels.user.player.uid) {
                    this.labName.text = Language.Z_WO;
                }
                this.reward.dataSource = data.itemId + "_" + data.count;
                this.lab1.text = data.buyPlayerName;
                this.lab2.text = "" + data.price;
            }
        };
        return TradingSellRecordRenderer;
    }(ui.TradingSellRecordRendererSkin));
    renderer.TradingSellRecordRenderer = TradingSellRecordRenderer;
    __reflect(TradingSellRecordRenderer.prototype, "renderer.TradingSellRecordRenderer");
})(renderer || (renderer = {}));
