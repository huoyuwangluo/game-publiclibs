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
    var MoShiZhuanPanRenderer = (function (_super) {
        __extends(MoShiZhuanPanRenderer, _super);
        function MoShiZhuanPanRenderer() {
            return _super.call(this) || this;
        }
        MoShiZhuanPanRenderer.prototype.dataChanged = function () {
            if (this.data) {
                this.labContent.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_1H2BFH3MS, this.data.PlayerName, (this.data.Percent / 100), this.data.MoShi));
            }
        };
        return MoShiZhuanPanRenderer;
    }(ui.MoShiZhuanPanRendererSkin));
    renderer.MoShiZhuanPanRenderer = MoShiZhuanPanRenderer;
    __reflect(MoShiZhuanPanRenderer.prototype, "renderer.MoShiZhuanPanRenderer");
})(renderer || (renderer = {}));
