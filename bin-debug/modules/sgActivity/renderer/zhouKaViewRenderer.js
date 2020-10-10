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
    var zhouKaViewRenderer = (function (_super) {
        __extends(zhouKaViewRenderer, _super);
        function zhouKaViewRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        zhouKaViewRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.labDesc.text = this.data.text;
                var rewards = this.data.reward.split(";");
                var index = 0;
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
                mg.effectManager.unbindEffect(this.btnGet);
                if (this.data.index == 0) {
                    if (GameModels.sgActivity.normalGift != 0) {
                        this.btnGet.visible = false;
                        this.imgBuyFinsh.visible = true;
                    }
                    else {
                        this.btnGet.skinName = "skins.SnapBigButton3Skin";
                        this.btnGet.label = Language.C_LQ;
                        this.btnGet.visible = true;
                        this.imgBuyFinsh.visible = false;
                        mg.effectManager.bindEffect(this.btnGet, TypeEffectId.BUTTON_EFF_BIG_RED);
                    }
                }
                else if (this.data.index == 1) {
                    if (GameModels.user.player.vip >= 1) {
                        if (GameModels.sgActivity.vipGift != 0) {
                            this.btnGet.visible = false;
                            this.imgBuyFinsh.visible = true;
                        }
                        else {
                            this.btnGet.skinName = "skins.SnapBigButton3Skin";
                            this.btnGet.label = Language.C_LQ;
                            this.btnGet.visible = true;
                            this.imgBuyFinsh.visible = false;
                            mg.effectManager.bindEffect(this.btnGet, TypeEffectId.BUTTON_EFF_BIG_RED);
                        }
                    }
                    else {
                        this.btnGet.skinName = "skins.SnapBigButton1Skin";
                        this.btnGet.label = Language.C_QDC;
                        this.btnGet.visible = true;
                        this.imgBuyFinsh.visible = false;
                    }
                }
                else {
                    if (GameModels.user.player.todayRechargeTotal > 0) {
                        if (GameModels.sgActivity.payGift != 0) {
                            this.btnGet.visible = false;
                            this.imgBuyFinsh.visible = true;
                        }
                        else {
                            this.btnGet.skinName = "skins.SnapBigButton3Skin";
                            this.btnGet.label = Language.C_LQ;
                            this.btnGet.visible = true;
                            this.imgBuyFinsh.visible = false;
                            mg.effectManager.bindEffect(this.btnGet, TypeEffectId.BUTTON_EFF_BIG_RED);
                        }
                    }
                    else {
                        this.btnGet.skinName = "skins.SnapBigButton1Skin";
                        this.btnGet.label = Language.C_QDC;
                        this.btnGet.visible = true;
                        this.imgBuyFinsh.visible = false;
                    }
                }
            }
        };
        return zhouKaViewRenderer;
    }(ui.zhouKaViewRendererSkin));
    renderer.zhouKaViewRenderer = zhouKaViewRenderer;
    __reflect(zhouKaViewRenderer.prototype, "renderer.zhouKaViewRenderer");
})(renderer || (renderer = {}));
