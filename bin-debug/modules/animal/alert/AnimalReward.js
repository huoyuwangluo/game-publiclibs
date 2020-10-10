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
var animal;
(function (animal) {
    var AnimalReward = (function (_super) {
        __extends(AnimalReward, _super);
        function AnimalReward() {
            return _super.call(this) || this;
        }
        AnimalReward.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            Mediator.getMediator(this).onAdd(this, this.enter);
            Mediator.getMediator(this).onRemove(this, this.exit);
        };
        AnimalReward.prototype.enter = function () {
            this._currData = null;
            this.createPhantomEffect();
            this.showList();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetRewardClick, this);
        };
        AnimalReward.prototype.showList = function () {
            this._lvvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.xflslv);
            this._logvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.xflslog);
            if (!this._lvvo || !this._logvo) {
                mg.uiManager.remove(this);
                return;
            }
            var voList = this._lvvo.actRewardListVO.concat(this._logvo.actRewardListVO);
            voList.sort(function (a, b) {
                if (a.state != b.state) {
                    return a.state - b.state;
                }
                else {
                    return a.order - b.order;
                }
            });
            if (voList) {
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(voList);
                }
                else {
                    this._listData.source = voList;
                }
            }
            else {
                this._listData.source = [];
            }
            this.list.dataProvider = this._listData;
            this.list.selectedIndex = 0;
            for (var i = 0; i < this._listData.source.length; i++) {
                if (this._listData.source[i].state == 0) {
                    this.list.selectedIndex = i;
                    break;
                }
            }
            this._currData = this.list.selectedItem;
            this.showView();
            this.updateScrollH(this.list.selectedIndex * 110);
        };
        AnimalReward.prototype.showView = function () {
            if (!this._currData)
                return;
            this.imgGetFinsh.visible = false;
            this.btnGet.visible = true;
            var targetStr = this._currData.templateTarget.split(";");
            if (this._effect) {
                this._effect.resId = targetStr[1];
                this._effect.play();
            }
            this.labDes.textFlow = utils.TextFlowMaker.generateTextFlow(this._currData.templateDes);
            this.labFight.text = targetStr[0] + Language.C_ZL;
            this.labSkillDes.text = this._currData.templateDes1;
            if (this._currData.state == 0) {
                this.btnGet.filters = null;
                this.btnGet.touchEnabled = true;
                this.btnGet.label = Language.C_LQ;
                this.btnGet.skinName = "skins.SnapBigButton3Skin";
            }
            else if (this._currData.state == 1) {
                this.btnGet.label = Language.C_WDC;
                this.btnGet.filters = utils.filterUtil.grayFilters;
                this.btnGet.touchEnabled = false;
            }
            else {
                this.btnGet.visible = false;
                this.imgGetFinsh.visible = true;
            }
        };
        AnimalReward.prototype.onBtnClick = function (e) {
            if (e.currentTarget == this.btnLeft) {
                this.list.selectedIndex--;
                if (this.list.selectedIndex < 0)
                    this.list.selectedIndex = 0;
            }
            else {
                this.list.selectedIndex++;
                if (this.list.selectedIndex >= (this._listData.length - 1))
                    this.list.selectedIndex = this._listData.length - 1;
            }
            this._currData = this.list.selectedItem;
            this.showView();
            this.updateScrollH(this.list.selectedIndex * 110);
        };
        AnimalReward.prototype.onListClick = function (e) {
            if (e.currentTarget) {
                this._currData = this.list.selectedItem;
                this.showView();
                this.updateScrollH(this.list.selectedIndex * 110);
            }
        };
        AnimalReward.prototype.onGetRewardClick = function (e) {
            if (!this._currData)
                return;
            this._lvvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.xflslv);
            this._logvo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.xflslog);
            if (this._currData.state == 0) {
                if (this._currData.templateValue > 10) {
                    GameModels.sgActivity.requestSGGetActivityReward(this._lvvo.actCfgId, this._currData.rewardCfgId, 0, utils.Handler.create(this, this.getFundRewardCallback));
                }
                else {
                    GameModels.sgActivity.requestSGGetActivityReward(this._logvo.actCfgId, this._currData.rewardCfgId, 0, utils.Handler.create(this, this.getFundRewardCallback));
                }
            }
        };
        AnimalReward.prototype.getFundRewardCallback = function () {
            if (!this._currData)
                return;
            var rewardArr = this._currData.templateRewards.split(";");
            mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            var voList = this._lvvo.actRewardListVO.concat(this._logvo.actRewardListVO);
            voList.sort(function (a, b) {
                if (a.state != b.state) {
                    return a.state - b.state;
                }
                else {
                    return a.rewardCfgId - b.rewardCfgId;
                }
            });
            if (this._listData)
                this._listData.replaceAll(voList);
            this._currData = this.list.selectedItem;
            this.showView();
        };
        AnimalReward.prototype.updateScrollH = function (maxLength) {
            this.list.validateNow();
            var pos = maxLength - 300 + 46;
            var maxScrollH = this.list.contentWidth - 530;
            if (pos <= 0)
                pos = 0;
            else if (pos >= maxScrollH)
                pos = maxScrollH;
            this.rollScroller(pos);
        };
        /**滚动条滚动到指定位置 */
        AnimalReward.prototype.rollScroller = function (pos, duration) {
            if (duration === void 0) { duration = 200; }
            egret.Tween.get(this.scroller.viewport).to({ scrollH: pos }, duration);
        };
        AnimalReward.prototype.createPhantomEffect = function () {
            if (!this._effect) {
                this._effect = utils.ObjectPool.from(s.AnimationSprite);
                this._effect.y = this.imgModel.y;
                this._effect.x = this.imgModel.x;
                this._effect.frameRate = 6;
                this.addChild(this._effect);
            }
        };
        AnimalReward.prototype.removePhantomEffect = function () {
            if (this._effect) {
                this._effect.stop();
                this._effect.filters = null;
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        AnimalReward.prototype.exit = function () {
            this.removePhantomEffect();
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetRewardClick, this);
        };
        AnimalReward.prototype.onClose = function (e) {
            mg.uiManager.remove(this);
        };
        return AnimalReward;
    }(ui.AnimalRewardSkin));
    animal.AnimalReward = AnimalReward;
    __reflect(AnimalReward.prototype, "animal.AnimalReward");
})(animal || (animal = {}));
