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
    var LegionListRenderer = (function (_super) {
        __extends(LegionListRenderer, _super);
        function LegionListRenderer() {
            var _this = _super.call(this) || this;
            _this.register();
            return _this;
        }
        LegionListRenderer.prototype.register = function () {
            this.btnCreatLegion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnJoinClick, this);
        };
        LegionListRenderer.prototype.btnJoinClick = function () {
            var vo = this.data;
            mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFJR1ZY, vo.legionName), TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                if (GameModels.guide.guideType == mo.ModelGuide.guideType3) {
                    GameModels.guide.requestGuideDone(mo.ModelGuide.guideType3);
                }
                GameModels.legion.joinLegion(vo.legionId, utils.Handler.create(this, function () {
                    mg.uiManager.getView(LegionList).removeThis();
                    mg.uiManager.show(LegionMain);
                }));
            }), null, true);
        };
        LegionListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var vo = this.data;
            if (vo) {
                this.imgBg.source = "img_union_" + vo.legionId + "_png";
                var max = GameModels.legion.getLegionListCount(true);
                var min = GameModels.legion.getLegionListCount(false);
                this.btnCreatLegion.label = Language.C_JR + vo.legionName;
            }
        };
        return LegionListRenderer;
    }(ui.LegionListRendererSkin));
    renderer.LegionListRenderer = LegionListRenderer;
    __reflect(LegionListRenderer.prototype, "renderer.LegionListRenderer");
})(renderer || (renderer = {}));
