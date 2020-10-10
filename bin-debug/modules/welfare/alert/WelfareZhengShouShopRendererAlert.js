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
    var WelfareZhengShouShopRendererAlert = (function (_super) {
        __extends(WelfareZhengShouShopRendererAlert, _super);
        function WelfareZhengShouShopRendererAlert() {
            return _super.call(this) || this;
        }
        WelfareZhengShouShopRendererAlert.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var data = this.data;
            this.labBuyTime0.textColor = 0x00ff00;
            this.imgBuyFinsh.visible = false;
            this.btnDuiHuan.visible = true;
            if (data) {
                this.reward0.dataSource = data.shoptemplate.itemId + "_" + data.shoptemplate.itemCount;
                this.icon.source = data.getPayType();
                this.labRank0.text = "" + data.getPrice();
                this.labBuyTime0.text = data.buyCount + "/" + data.buyTotalCount;
                if (data.buyCount <= 0) {
                    this.labBuyTime0.textColor = 0xff0000;
                    this.imgBuyFinsh.visible = true;
                    this.btnDuiHuan.visible = false;
                }
            }
        };
        return WelfareZhengShouShopRendererAlert;
    }(ui.WelfareZhengShouShopRendererAlertSkin));
    renderer.WelfareZhengShouShopRendererAlert = WelfareZhengShouShopRendererAlert;
    __reflect(WelfareZhengShouShopRendererAlert.prototype, "renderer.WelfareZhengShouShopRendererAlert");
})(renderer || (renderer = {}));
