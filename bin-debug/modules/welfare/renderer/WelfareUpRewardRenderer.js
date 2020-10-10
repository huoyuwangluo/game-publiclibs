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
    var WelfareUpRewardRenderer = (function (_super) {
        __extends(WelfareUpRewardRenderer, _super);
        function WelfareUpRewardRenderer() {
            return _super.call(this) || this;
        }
        WelfareUpRewardRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getReward, this);
            this.item1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTipItem, this);
            this.item2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTipItem, this);
            this.item3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTipItem, this);
            this._boxes = [this.item1, this.item2, this.item3];
        };
        WelfareUpRewardRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                mg.effectManager.unbindEffect(this.btnGet);
                var data = this.data;
                this.labDesCon.text = data.template.des;
                this.setWelIcon(data.templateRewards);
                this.imgFinsh.visible = false;
                if (data.state == 0) {
                    this.btnGet.visible = true;
                    this.btnGet.filters = null;
                    this.btnGet.label = Language.C_LQ;
                    this.btnGet.touchEnabled = true;
                    mg.effectManager.bindEffect(this.btnGet, TypeEffectId.BUTTON_EFF_BIG_RED);
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
            }
            else {
                this.reset();
            }
        };
        WelfareUpRewardRenderer.prototype.openTipItem = function (e) {
            var target = e.currentTarget;
            if (target.itemVo instanceof vo.EquipVO) {
                mg.TipManager.instance.showTip(tips.EquipTip, target.itemVo);
            }
            else {
                mg.TipManager.instance.showTip(tips.PropTip, target.itemVo);
            }
        };
        WelfareUpRewardRenderer.prototype.getReward = function () {
            if (utils.CheckUtil.checkBagSmelting())
                return;
            if (this.data) {
                var data = this.data;
                GameModels.sgActivity.requestSGGetActivityReward(GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.cjjl).actCfgId, data.rewardCfgId, 0, utils.Handler.create(this, function () {
                    var rewardArr = data.templateRewards.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                }));
            }
        };
        WelfareUpRewardRenderer.prototype.setWelIcon = function (rewards) {
            var reward = rewards.split(";");
            for (var i = 0; i < this._boxes.length; i++) {
                this._boxes[i].visible = false;
            }
            for (var i = 0; i < this._boxes.length; i++) {
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
        WelfareUpRewardRenderer.prototype.reset = function () {
            if (this._boxes) {
                for (var i = 0; i < this._boxes.length; i++) {
                    this._boxes[i].reset();
                }
            }
            this._boxes = null;
        };
        return WelfareUpRewardRenderer;
    }(ui.WelfareUpRewardRendererSkin));
    renderer.WelfareUpRewardRenderer = WelfareUpRewardRenderer;
    __reflect(WelfareUpRewardRenderer.prototype, "renderer.WelfareUpRewardRenderer");
})(renderer || (renderer = {}));
