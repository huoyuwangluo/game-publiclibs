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
    var kingWarMapAttRenderer = (function (_super) {
        __extends(kingWarMapAttRenderer, _super);
        function kingWarMapAttRenderer() {
            return _super.call(this) || this;
        }
        kingWarMapAttRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var vo = this.data;
                if (GameModels.kingwar.cityDetailCountry) {
                    this.labName.text = vo.playerName ? vo.playerName : Language.J_JWJ;
                }
                else {
                    this.labName.text = vo.playerName ? vo.playerName : Language.J_LG;
                }
                this.labCount.text = vo.count + "";
                this.labLv.text = !vo.playerName ? "?" : "" + vo.totalLevel;
            }
        };
        return kingWarMapAttRenderer;
    }(ui.kingWarMapAttRendererSkin));
    renderer.kingWarMapAttRenderer = kingWarMapAttRenderer;
    __reflect(kingWarMapAttRenderer.prototype, "renderer.kingWarMapAttRenderer");
})(renderer || (renderer = {}));
