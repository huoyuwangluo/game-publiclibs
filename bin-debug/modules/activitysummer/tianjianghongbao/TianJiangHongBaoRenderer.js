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
    var TianJiangHongBaoRenderer = (function (_super) {
        __extends(TianJiangHongBaoRenderer, _super);
        function TianJiangHongBaoRenderer() {
            return _super.call(this) || this;
        }
        TianJiangHongBaoRenderer.prototype.dataChanged = function () {
            if (this.data) {
                var data = this.data;
                this.labContent.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_WJ1HDLTJHB2BJL3MS, data.PlayerName, data.Rate, data.MoShi));
            }
        };
        return TianJiangHongBaoRenderer;
    }(ui.TianJiangHongBaoRendererSkin));
    renderer.TianJiangHongBaoRenderer = TianJiangHongBaoRenderer;
    __reflect(TianJiangHongBaoRenderer.prototype, "renderer.TianJiangHongBaoRenderer");
})(renderer || (renderer = {}));
