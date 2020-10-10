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
    var GodDieBossRewardRenderer = (function (_super) {
        __extends(GodDieBossRewardRenderer, _super);
        function GodDieBossRewardRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2];
            return _this;
        }
        GodDieBossRewardRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data = this.data;
                this.labDesc.textFlow = utils.TextFlowMaker.generateTextFlow(data.des);
                var rewards = data.rewards.split(";");
                var index = 0;
                for (var i = 0; i < 3; i++) {
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
                this.imgBuyFinsh.visible = false;
                this.btnGet.visible = false;
                this.btnWeiDaCheng.visible = false;
                this.btnWeiDaCheng.filters = utils.filterUtil.grayFilters;
                this.btnWeiDaCheng.touchEnabled = false;
                if (GameModels.sceneGodDie.step.indexOf(data.id) != -1) {
                    this.imgBuyFinsh.visible = true;
                    this.labPro.text = "";
                }
                else {
                    this.labPro.text = GameModels.sceneGodDie.score + "/" + data.value;
                    if (GameModels.sceneGodDie.score >= data.value) {
                        this.btnGet.visible = true;
                        mg.effectManager.bindEffect(this.btnGet, TypeEffectId.BUTTON_EFF_BIG_RED);
                        this.labPro.textColor = 0x00ff00;
                    }
                    else {
                        this.btnWeiDaCheng.visible = true;
                        this.labPro.textColor = 0xff0000;
                    }
                }
            }
        };
        return GodDieBossRewardRenderer;
    }(ui.GodDieBossRewardRendererSkin));
    renderer.GodDieBossRewardRenderer = GodDieBossRewardRenderer;
    __reflect(GodDieBossRewardRenderer.prototype, "renderer.GodDieBossRewardRenderer");
})(renderer || (renderer = {}));
