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
    var LegionRedBagRenderer = (function (_super) {
        __extends(LegionRedBagRenderer, _super);
        function LegionRedBagRenderer() {
            return _super.call(this) || this;
        }
        LegionRedBagRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var redBag = this.data;
            if (redBag) {
                this.labName.text = redBag.PlayerName;
                var count = GameModels.legion.getRedBagTypeBuyId(redBag.RefId);
                if (count == 500) {
                    this.labContent.text = Language.getExpression(Language.E_1YLB1, count);
                }
                else {
                    this.labContent.text = Language.getExpression(Language.E_1YLB, count);
                }
                this.lanCount.text = redBag.LeftCount + "/50";
            }
        };
        return LegionRedBagRenderer;
    }(ui.LegionRedBagRendererSkin));
    renderer.LegionRedBagRenderer = LegionRedBagRenderer;
    __reflect(LegionRedBagRenderer.prototype, "renderer.LegionRedBagRenderer");
})(renderer || (renderer = {}));
