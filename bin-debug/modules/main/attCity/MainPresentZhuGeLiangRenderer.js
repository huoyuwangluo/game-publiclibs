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
    var MainPresentZhuGeLiangRenderer = (function (_super) {
        __extends(MainPresentZhuGeLiangRenderer, _super);
        function MainPresentZhuGeLiangRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        MainPresentZhuGeLiangRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            mg.effectManager.unbindEffect(this.btnGet);
            if (this.data) {
                var vo = this.data;
                this.imgFinsh.visible = false;
                if (vo.tatolValue == 0) {
                    this.labDesc.text = vo.templates.des;
                }
                else {
                    var arys = [];
                    if (vo.templates.type == 4) {
                        arys.push({ text: vo.templates.des, style: { textColor: 0xd3d3d3 } });
                        var nowWenGuanTmp = Templates.getTemplateById(templates.Map.WENGUAN, vo.currValue);
                        if (!nowWenGuanTmp)
                            nowWenGuanTmp = GameModels.wenguanTask.curWenGuanTemplates;
                        if (vo.currValue >= vo.tatolValue) {
                            arys.push({ text: "(" + Language.C_YWC + ")", style: { textColor: TypeColor.GREEN1 } });
                        }
                        else {
                            arys.push({ text: "(" + nowWenGuanTmp.name + ")", style: { textColor: TypeColor.RED1 } });
                        }
                    }
                    else {
                        if (vo.templates.type == 9) {
                            var strDes = vo.templates.des.split(Language.J_HUO);
                            arys.push({ text: strDes[0], style: { textColor: 0xd3d3d3 } });
                            if (vo.currValue1 >= vo.tatolValue1) {
                                arys.push({ text: "(" + Language.C_YWC + ")", style: { textColor: TypeColor.GREEN1 } });
                            }
                            else {
                                arys.push({ text: "(" + vo.currValue1 + "/" + vo.tatolValue1 + ")", style: { textColor: TypeColor.RED1 } });
                            }
                            arys.push({ text: Language.J_HUO, style: { textColor: 0xe4d097 } });
                            arys.push({ text: strDes[1], style: { textColor: 0xd3d3d3 } });
                            if (vo.currValue >= vo.tatolValue) {
                                arys.push({ text: "(" + Language.C_YWC + ")", style: { textColor: TypeColor.GREEN1 } });
                            }
                            else {
                                arys.push({ text: "(" + vo.currValue + "/" + vo.tatolValue + ")", style: { textColor: TypeColor.RED1 } });
                            }
                        }
                        else {
                            arys.push({ text: vo.templates.des, style: { textColor: 0xd3d3d3 } });
                            if (vo.currValue >= vo.tatolValue) {
                                arys.push({ text: "(" + Language.C_YWC + ")", style: { textColor: TypeColor.GREEN1 } });
                            }
                            else {
                                arys.push({ text: "(" + vo.currValue + "/" + vo.tatolValue + ")", style: { textColor: TypeColor.RED1 } });
                            }
                        }
                    }
                    this.labDesc.textFlow = arys;
                }
                var rewards = vo.templates.rewards.split(";");
                for (var i = 0; i < 4; i++) {
                    var iconBox = this._rwards[i];
                    iconBox.labName.stroke = 1;
                    if (i < rewards.length) {
                        iconBox.dataSource = rewards[i];
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                if (vo.state == 0) {
                    this.btnGet.visible = true;
                    this.btnGet.skinName = "skins.SnapSmallButton4Skin";
                    this.btnGet.label = Language.C_QW;
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
        return MainPresentZhuGeLiangRenderer;
    }(ui.MainPresentZhuGeLiangRendererSkin));
    renderer.MainPresentZhuGeLiangRenderer = MainPresentZhuGeLiangRenderer;
    __reflect(MainPresentZhuGeLiangRenderer.prototype, "renderer.MainPresentZhuGeLiangRenderer");
})(renderer || (renderer = {}));
