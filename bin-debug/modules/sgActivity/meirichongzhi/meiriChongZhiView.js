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
var view;
(function (view) {
    var activity;
    (function (activity) {
        /**game.sgActivityType.mrcz*/
        var meiriChongZhiView = (function (_super) {
            __extends(meiriChongZhiView, _super);
            function meiriChongZhiView() {
                return _super.call(this) || this;
            }
            meiriChongZhiView.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            meiriChongZhiView.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                var index = 0;
                var buyType = GameModels.common.buyType;
                index = buyType ? buyType : 0;
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                var voList = vo.actRewardListVOStorRmb;
                var news = [];
                for (var i = 0; i < voList.length; i++) {
                    if (i == index && GameModels.common.buyType > 0) {
                        news.push({ ActVo: voList[i], effect: true });
                    }
                    else {
                        news.push({ ActVo: voList[i], effect: false });
                    }
                }
                this.group.visible = false;
                if (!this.isRecharge()) {
                    this.group.visible = true;
                    mg.effectManager.bindEffect(this.btnOneKey, TypeEffectId.BUTTON_EFF_SAMLL1);
                }
                this.btnOneKey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOneKeyClick, this);
                this.list.dataProvider = this._listData = new eui.ArrayCollection(news);
                this.list.selectedIndex = index;
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            meiriChongZhiView.prototype.onOneKeyClick = function () {
                var temp = Templates.getTemplateById(templates.Map.GAMERECHARGE, 800);
                GameModels.platform.buy(temp.RMB, 1, "" + temp.id, temp.name, temp.des);
            };
            meiriChongZhiView.prototype.isRecharge = function () {
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                for (var i = 0; i < vo.actRewardListVO.length; i++) {
                    if (vo.hashMyValueStr(vo.actRewardListVO[i].rewardCfgId.toString())) {
                        return true;
                    }
                }
                return false;
            };
            meiriChongZhiView.prototype.exit = function () {
                mg.effectManager.unbindEffect(this.btnOneKey);
                GameModels.common.buyType = 0;
                this.clearList(this.list);
                this.btnOneKey.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOneKeyClick, this);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            meiriChongZhiView.prototype.onBuyClick = function (e) {
                if (e.target instanceof components.IconButton) {
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                    var item = this.list.selectedItem.ActVo;
                    if (vo.hashMyValueStr(item.rewardCfgId.toString())) {
                        if (item.getTimes <= 0) {
                            if (utils.CheckUtil.checkBagSmelting())
                                return;
                            GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.otherRewards]));
                        }
                    }
                    else {
                        GameModels.platform.buy(item.rmb, 1, "" + item.template.id, item.template.name, item.template.des);
                    }
                }
            };
            meiriChongZhiView.prototype.getRewardCallback = function (str) {
                this.showView();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            meiriChongZhiView.prototype.showView = function () {
                this.group.visible = false;
                if (!this.isRecharge()) {
                    this.group.visible = true;
                    mg.effectManager.bindEffect(this.btnOneKey, TypeEffectId.BUTTON_EFF_SAMLL1);
                }
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                var voList = vo.actRewardListVOStorRmb;
                var news = [];
                for (var i = 0; i < voList.length; i++) {
                    news.push({ ActVo: voList[i], effect: false });
                }
                if (this._listData)
                    this._listData.replaceAll(news);
            };
            return meiriChongZhiView;
        }(ui.meiriChongZhiSkin));
        activity.meiriChongZhiView = meiriChongZhiView;
        __reflect(meiriChongZhiView.prototype, "view.activity.meiriChongZhiView", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
