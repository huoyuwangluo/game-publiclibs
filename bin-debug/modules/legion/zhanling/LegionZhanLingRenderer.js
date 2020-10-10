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
    var LegionZhanLingRenderer = (function (_super) {
        __extends(LegionZhanLingRenderer, _super);
        function LegionZhanLingRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2];
            return _this;
        }
        LegionZhanLingRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getReward, this);
            this.btnGetVip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getRewardVip, this);
        };
        LegionZhanLingRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var zhanLingVo = this.data;
                this.lablv.text = zhanLingVo.level + "";
                /**精英战令 */
                this.rewardVip.dataSource = zhanLingVo.template ? zhanLingVo.template.rewards1 : null;
                this.rewardVip.labName.text = "";
                this.imgFinshVip.visible = false;
                if (GameModels.zhanling.currTemp.id >= zhanLingVo.level) {
                    if (zhanLingVo.reward1State <= 0) {
                        this.btnGetVip.visible = true;
                        this.btnGetVip.label = Language.C_LQ;
                        this.btnGetVip.filters = null;
                        this.btnGetVip.skinName = "skins.SnapSmallButton5Skin";
                        this.btnGetVip.touchEnabled = true;
                    }
                    else {
                        this.imgFinshVip.visible = true;
                        this.btnGetVip.visible = false;
                    }
                }
                else {
                    this.btnGetVip.visible = true;
                    this.btnGetVip.label = Language.C_WDC;
                    this.btnGetVip.filters = utils.filterUtil.grayFilters;
                    this.btnGetVip.touchEnabled = false;
                }
                /**进阶战令 */
                this.imgFinsh.visible = false;
                var rewards = zhanLingVo.template.rewards2.split(";");
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
                if (GameModels.zhanling.stepOpen > 0) {
                    if (GameModels.zhanling.currTemp.id >= zhanLingVo.level) {
                        if (zhanLingVo.reward2State <= 0) {
                            this.btnGet.visible = true;
                            this.btnGet.label = Language.C_LQ;
                            this.btnGet.skinName = "skins.SnapSmallButton5Skin";
                            this.btnGet.filters = null;
                            this.btnGet.touchEnabled = true;
                        }
                        else {
                            this.imgFinsh.visible = true;
                            this.btnGet.visible = false;
                        }
                    }
                    else {
                        this.btnGet.visible = true;
                        this.btnGet.label = Language.C_WDC;
                        this.btnGet.skinName = "skins.SnapSmallButton5Skin";
                        this.btnGet.filters = utils.filterUtil.grayFilters;
                        this.btnGet.touchEnabled = false;
                    }
                }
                else {
                    if (GameModels.zhanling.currTemp.id >= zhanLingVo.level) {
                        this.btnGet.visible = true;
                        this.btnGet.label = Language.C_LQ;
                        this.btnGet.skinName = "skins.SnapSmallButton3Skin";
                        this.btnGet.filters = null;
                        this.btnGet.touchEnabled = true;
                    }
                    else {
                        this.btnGet.visible = true;
                        this.btnGet.label = Language.C_WDC;
                        this.btnGet.skinName = "skins.SnapSmallButton3Skin";
                        this.btnGet.filters = utils.filterUtil.grayFilters;
                        this.btnGet.touchEnabled = false;
                    }
                }
            }
        };
        LegionZhanLingRenderer.prototype.getRewardVip = function () {
            if (!this.data)
                return;
            var zhanLingVo = this.data;
            if (GameModels.zhanling.currTemp.id >= zhanLingVo.level) {
                GameModels.zhanling.getBPReward(zhanLingVo.level, 1, utils.Handler.create(this, function (data) {
                    var rewards = zhanLingVo.template.rewards1.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                }));
            }
        };
        LegionZhanLingRenderer.prototype.getReward = function () {
            if (!this.data)
                return;
            var zhanLingVo = this.data;
            if (GameModels.zhanling.currTemp.id >= zhanLingVo.level && GameModels.zhanling.stepOpen > 0) {
                GameModels.zhanling.getBPReward(zhanLingVo.level, 2, utils.Handler.create(this, function (data) {
                    var rewards = zhanLingVo.template.rewards2.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                }));
            }
            else {
                // mg.alertManager.showAlert(LegionZhanLingJinJie, true, true);
                mg.alertManager.tip(Language.J_GMJJZLHKLQ);
            }
        };
        return LegionZhanLingRenderer;
    }(ui.LegionZhanLingRendererSkin));
    renderer.LegionZhanLingRenderer = LegionZhanLingRenderer;
    __reflect(LegionZhanLingRenderer.prototype, "renderer.LegionZhanLingRenderer");
})(renderer || (renderer = {}));
