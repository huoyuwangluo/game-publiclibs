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
    var WelfareGetRewardRenderer = (function (_super) {
        __extends(WelfareGetRewardRenderer, _super);
        function WelfareGetRewardRenderer() {
            return _super.call(this) || this;
        }
        WelfareGetRewardRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getReward, this);
            this.btnGetVip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getRewardVip, this);
            this.item1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTipItem, this);
            this.item2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTipItem, this);
            this.item3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTipItem, this);
            this._boxes = [this.item1, this.item2, this.item3];
        };
        WelfareGetRewardRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                mg.effectManager.unbindEffect(this.btnGet);
                mg.effectManager.unbindEffect(this.btnGetVip);
                var data = this.data;
                this.labDesCon.text = data.template.des;
                this.setWelIcon(data.templateRewards.split("|")[0]);
                this.imgFinsh.visible = false;
                if (data.state == 0) {
                    this.btnGet.visible = true;
                    this.btnGet.filters = null;
                    this.btnGet.label = Language.C_LQ;
                    this.btnGet.touchEnabled = true;
                    mg.effectManager.bindEffect(this.btnGet, TypeEffectId.BUTTON_EFF_SAMLL1);
                }
                else if (data.state == 1) {
                    this.btnGet.visible = true;
                    this.btnGet.label = Language.C_WDC;
                    this.btnGet.filters = utils.filterUtil.grayFilters;
                    this.btnGet.touchEnabled = false;
                }
                else {
                    this.btnGet.visible = false;
                    this.imgFinsh.visible = true;
                }
                this.rewardVip.dataSource = data.templateRewards.split("|")[1];
                this.imgFinshVip.visible = false;
                if (GameModels.user.player.vip > 0) {
                    if (GameModels.sgActivity.getLeijidengluActVipRewardListVO(data.rewardCfgId) <= 0) {
                        if (data.state == 1) {
                            this.btnGetVip.visible = true;
                            this.btnGetVip.label = Language.C_WDC;
                            this.btnGetVip.filters = utils.filterUtil.grayFilters;
                            this.btnGetVip.touchEnabled = false;
                        }
                        else {
                            this.btnGetVip.visible = true;
                            this.btnGetVip.label = Language.C_LQ;
                            this.btnGetVip.filters = null;
                            this.btnGetVip.touchEnabled = true;
                            this.btnGetVip.skinName = "skins.SnapSmallButton5Skin";
                            mg.effectManager.bindEffect(this.btnGetVip, TypeEffectId.BUTTON_EFF_SAMLL1);
                        }
                    }
                    else {
                        this.btnGetVip.visible = false;
                        this.imgFinshVip.visible = true;
                    }
                }
                else {
                    this.btnGetVip.visible = true;
                    this.btnGetVip.filters = null;
                    this.btnGetVip.touchEnabled = true;
                    this.btnGetVip.skinName = "skins.SnapSmallButton3Skin";
                    this.btnGetVip.label = Language.J_CWVIP;
                }
            }
            else {
                this.reset();
                this.rewardVip.dataSource = null;
            }
        };
        WelfareGetRewardRenderer.prototype.openTipItem = function (e) {
            var target = e.currentTarget;
            if (target.itemVo instanceof vo.EquipVO) {
                mg.TipManager.instance.showTip(tips.EquipTip, target.itemVo);
            }
            else {
                mg.TipManager.instance.showTip(tips.PropTip, target.itemVo);
            }
        };
        WelfareGetRewardRenderer.prototype.getRewardVip = function () {
            if (GameModels.user.player.vip <= 0) {
                mg.uiManager.remove(s.UserfaceName.welfare);
                GameModels.recharge.openRechargeDialog();
            }
            else {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (this.data) {
                    var data = this.data;
                    GameModels.sgActivity.requestSGGetActivityReward(GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.ljdl).actCfgId, data.rewardCfgId, 1, utils.Handler.create(this, function () {
                        var rewardArr = data.templateRewards.split("|")[1].split(";");
                        mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                    }));
                }
            }
        };
        WelfareGetRewardRenderer.prototype.getReward = function () {
            if (utils.CheckUtil.checkBagSmelting())
                return;
            if (this.data) {
                var data = this.data;
                GameModels.sgActivity.requestSGGetActivityReward(GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.ljdl).actCfgId, data.rewardCfgId, 0, utils.Handler.create(this, function () {
                    var rewardArr = data.templateRewards.split("|")[0].split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                }));
            }
        };
        WelfareGetRewardRenderer.prototype.setWelIcon = function (rewards) {
            var reward = rewards.split(";");
            for (var i = 0; i < this._boxes.length; i++) {
                this._boxes[i].visible = false;
            }
            for (var i = 0; i < reward.length; i++) {
                this._boxes[i].visible = true;
                if (reward[i].indexOf("&") == -1) {
                    this._boxes[i].updateItemHasUnderline(reward[i], true, true);
                }
                else {
                    var str = reward[i].split("&");
                    if (str.length == 3) {
                        if (GameModels.user.player.job == TypeJob.ZHAN) {
                            this._boxes[i].updateItemHasUnderline(str[0], true, true);
                        }
                        if (GameModels.user.player.job == TypeJob.FA) {
                            this._boxes[i].updateItemHasUnderline(str[1], true, true);
                        }
                        if (GameModels.user.player.job == TypeJob.YI) {
                            this._boxes[i].updateItemHasUnderline(str[2], true, true);
                        }
                    }
                }
            }
        };
        WelfareGetRewardRenderer.prototype.reset = function () {
            if (this._boxes) {
                for (var i = 0; i < this._boxes.length; i++) {
                    this._boxes[i].reset();
                }
            }
            this._boxes = null;
        };
        return WelfareGetRewardRenderer;
    }(ui.WelfareAcitiveListRendererSkin));
    renderer.WelfareGetRewardRenderer = WelfareGetRewardRenderer;
    __reflect(WelfareGetRewardRenderer.prototype, "renderer.WelfareGetRewardRenderer");
})(renderer || (renderer = {}));
