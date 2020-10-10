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
    var TradingSellRenderer = (function (_super) {
        __extends(TradingSellRenderer, _super);
        function TradingSellRenderer() {
            return _super.call(this) || this;
        }
        TradingSellRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.btnSell.label = Language.C_GM;
            if (this.data) {
                var data = this.data;
                this.labName.text = data.playerName;
                this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(data.endTime * 1000));
                if (data.playerId == GameModels.user.player.uid) {
                    this.labName.text = Language.Z_WO;
                    this.btnSell.label = Language.C_XJ2;
                }
                this.reward.dataSource = data.itemId + "_" + data.count;
                this.labPrice.text = "" + data.price;
                this.labCount.text = "" + data.count;
            }
        };
        return TradingSellRenderer;
    }(ui.TradingSellRendererSkin));
    renderer.TradingSellRenderer = TradingSellRenderer;
    __reflect(TradingSellRenderer.prototype, "renderer.TradingSellRenderer");
})(renderer || (renderer = {}));
