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
    var WelfareFundRenderer = (function (_super) {
        __extends(WelfareFundRenderer, _super);
        function WelfareFundRenderer() {
            return _super.call(this) || this;
        }
        WelfareFundRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data = this.data;
                this.LabNeedLv.text = data.templateValue.toString();
                var rewards = data.templateRewards.split(";");
                this.labLeftMoney.text = rewards[0].split("_")[1];
                this.labRightMoney.text = rewards[1].split("_")[1];
                mg.effectManager.unbindEffect(this.btnGet);
                this.imgBuyFinsh.visible = false;
                this.btnGet.visible = true;
                this.btnGet.touchEnabled = true;
                this.btnGet.filters = null;
                if (data.state == 0) {
                    this.btnGet.label = Language.C_LQ;
                    this.btnGet.skinName = "skins.SnapBigButton3Skin";
                    mg.effectManager.bindEffect(this.btnGet, TypeEffectId.BUTTON_EFF_BIG_RED);
                }
                else if (data.state == 1) {
                    if (GameModels.user.player.level >= data.templateValue) {
                        this.btnGet.skinName = "skins.SnapBigButton2Skin";
                        this.btnGet.label = Language.C_LQ;
                    }
                    else {
                        this.btnGet.label = Language.C_WDC;
                        this.btnGet.filters = utils.filterUtil.grayFilters;
                        this.btnGet.touchEnabled = false;
                    }
                }
                else {
                    this.btnGet.visible = false;
                    this.imgBuyFinsh.visible = true;
                }
            }
        };
        return WelfareFundRenderer;
    }(ui.WelfareFundRendererSkin));
    renderer.WelfareFundRenderer = WelfareFundRenderer;
    __reflect(WelfareFundRenderer.prototype, "renderer.WelfareFundRenderer");
})(renderer || (renderer = {}));
