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
    var AchievementWenGuanRenderer = (function (_super) {
        __extends(AchievementWenGuanRenderer, _super);
        function AchievementWenGuanRenderer() {
            return _super.call(this) || this;
        }
        AchievementWenGuanRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            mg.effectManager.unbindEffect(this.btnGet);
            if (this.data) {
                var vo = this.data;
                this.imgFinsh.visible = false;
                if (vo.tatolValue == 0) {
                    this.labDes.text = vo.templates.des;
                }
                else {
                    var arys = [];
                    arys.push({ text: vo.templates.des, style: { textColor: 0xd3d3d3 } });
                    if (vo.currValue >= vo.tatolValue) {
                        arys.push({ text: "(" + Language.C_YWC + ")", style: { textColor: TypeColor.GREEN1 } });
                    }
                    else {
                        arys.push({ text: "(" + vo.currValue + "/" + vo.tatolValue + ")", style: { textColor: TypeColor.RED1 } });
                    }
                    this.labDes.textFlow = arys;
                }
                var str = vo.templates.rewards.split(";")[0].split("_");
                this.reward.dataSource = vo.templates.rewards.split(";")[0];
                this.reward.labName.text = "";
                if (vo.state == 0) {
                    this.btnGet.visible = true;
                    this.btnGet.skinName = "skins.SnapSmallButton4Skin";
                    if (vo.templates.type == 2 && vo.templates.functionParams == 0) {
                        mg.effectManager.bindEffect(this.btnGet, TypeEffectId.BUTTON_EFF_SAMLL2);
                    }
                    this.btnGet.label = vo.templates.type == 3 ? Language.C_GC : Language.C_QW;
                }
                else if (vo.state == 1) {
                    this.btnGet.visible = true;
                    this.btnGet.skinName = "skins.SnapSmallButton5Skin";
                    mg.effectManager.bindEffect(this.btnGet, TypeEffectId.BUTTON_EFF_SAMLL2);
                    this.btnGet.label = Language.C_LQ;
                }
                else {
                    this.btnGet.visible = false;
                    this.imgFinsh.visible = true;
                }
            }
        };
        return AchievementWenGuanRenderer;
    }(ui.AchievementWenGuanRendererSkin));
    renderer.AchievementWenGuanRenderer = AchievementWenGuanRenderer;
    __reflect(AchievementWenGuanRenderer.prototype, "renderer.AchievementWenGuanRenderer");
})(renderer || (renderer = {}));
