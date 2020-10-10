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
    var jingjiXianGouRenderer = (function (_super) {
        __extends(jingjiXianGouRenderer, _super);
        function jingjiXianGouRenderer() {
            return _super.call(this) || this;
        }
        jingjiXianGouRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data = this.data;
                this.labPrice.text = data.templateConsume1.split("_")[1];
                this.labSale.text = data.templateConsume.split("_")[1];
                this.blabSale.text = "" + (data.templateDiscount / 10);
                this.item.dataSource = data.templateRewards;
                this.labCount.text = (data.templateBuyTimes - data.getTimes) + "/" + data.templateBuyTimes;
                if (data.getTimes >= data.templateBuyTimes) {
                    this.labCount.textColor = 0xff0000;
                    this.imgFinsh.visible = true;
                    this.btnBuy.visible = false;
                }
                else {
                    this.labCount.textColor = 0x00ff00;
                    this.imgFinsh.visible = false;
                    this.btnBuy.visible = true;
                }
            }
        };
        return jingjiXianGouRenderer;
    }(ui.jingjiXianGouRendererSkin));
    renderer.jingjiXianGouRenderer = jingjiXianGouRenderer;
    __reflect(jingjiXianGouRenderer.prototype, "renderer.jingjiXianGouRenderer");
})(renderer || (renderer = {}));
