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
    var LuckyTurntableRenderer = (function (_super) {
        __extends(LuckyTurntableRenderer, _super);
        function LuckyTurntableRenderer() {
            return _super.call(this) || this;
        }
        LuckyTurntableRenderer.prototype.dataChanged = function () {
            var content = '';
            if (this.data) {
                if (this.data.GetType == 1) {
                    content = Language.getExpression(Language.E_1H2BFH3MS, this.data.PlayerName, (this.data.Percent / 100), this.data.MoShi);
                }
                else {
                    content = Language.getExpression(Language.E_1H2BMRFH3MS, this.data.PlayerName, (this.data.Percent / 100), this.data.MoShi);
                }
            }
            this.labContent.textFlow = utils.TextFlowMaker.htmlParser(content);
        };
        return LuckyTurntableRenderer;
    }(ui.LuckyTurntableRendererSkin));
    renderer.LuckyTurntableRenderer = LuckyTurntableRenderer;
    __reflect(LuckyTurntableRenderer.prototype, "renderer.LuckyTurntableRenderer");
})(renderer || (renderer = {}));
