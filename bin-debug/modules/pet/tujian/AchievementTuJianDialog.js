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
var achievement;
(function (achievement) {
    var AchievementTuJianDialog = (function (_super) {
        __extends(AchievementTuJianDialog, _super);
        function AchievementTuJianDialog() {
            return _super.call(this) || this;
        }
        AchievementTuJianDialog.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.lisdown.dataProvider = this._downListCollection = new eui.ArrayCollection([]);
            this.list.dataProvider = this._listCollection = new eui.ArrayCollection([]);
        };
        AchievementTuJianDialog.prototype.enter = function () {
            var _this = this;
            this._count = 0;
            this._angle = 0;
            this.createPhantomEffect();
            this.lisdown.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onDownListClick, this);
            //this.btn_go.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMoShenView, this);
            this.rewardBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRewardTip, this);
            GameModels.user.player.onPropertyChange(TypeProperty.HANDBOOK_EXP, this, this.showSplienText);
            if (this.downScroller.horizontalScrollBar) {
                this.downScroller.horizontalScrollBar.autoVisibility = false;
                this.downScroller.horizontalScrollBar.visible = true;
            }
            GameModels.handBook.requestHandbookInfo(utils.Handler.create(this, function () {
                _this.downScroller.viewport.scrollH = 0;
                _this.downScroller.viewport.width = 488;
                _this._data = GameModels.handBook.handBookResId;
                _this._downListCollection.source = _this._data;
                _this.lisdown.selectedIndex = 0;
                _this._selectedIndex = 0;
                var vo = GameModels.handBook.getHandBookVoByBookType(_this._selectedIndex + 1);
                _this._listCollection.source = vo;
                _this.showView();
                var viewRole = mg.uiManager.getView(dialog.tujian.TuJianMainDialog);
                if (viewRole)
                    viewRole.updataChange();
            }));
        };
        AchievementTuJianDialog.prototype.showSplienText = function () {
            this.showView();
        };
        AchievementTuJianDialog.prototype.changeRedPoint = function () {
            this._downListCollection.replaceAll(GameModels.handBook.handBookResId);
        };
        AchievementTuJianDialog.prototype.showView = function () {
            var _this = this;
            GameModels.common.requestFightNum(this, TypeFunction.JIANGXING, function (fightNum) {
                _this.blabFight.text = fightNum.toString();
            });
            this._step = 0;
            this.labMoShenValue.text = GameModels.handBook.getSealCount() + "/" + GameModels.handBook.getAllTuJianCount();
            this.imgRedPoint.visible = GameModels.handBook.checkMoShenRedPoint();
            var vo = GameModels.handBook.getHandBookVoByBookType(this._selectedIndex + 1);
            if (this._listCollection)
                this._listCollection.replaceAll(vo);
            if (this._downListCollection)
                this._downListCollection.replaceAll(GameModels.handBook.handBookResId);
            this.showReward();
        };
        AchievementTuJianDialog.prototype.showReward = function () {
            this._rewardStr = [];
            this._isCan = false;
            this.rewardBox.visible = true;
            this.labMoneyCount.text = "";
            this.removePhantomEffect();
            var deteTemps = GameModels.dataSet.getDataSettingById(550001);
            var str = deteTemps.value;
            var steptempArr = [];
            var strArr = str.split("#");
            for (var i = 0; i < strArr.length; i++) {
                var stepIndex = parseInt(strArr[i].split("|")[0]);
                if (steptempArr.indexOf(stepIndex) == -1) {
                    steptempArr.push(stepIndex);
                }
            }
            var step = 0;
            var lastStep = 0;
            var stepArr = GameModels.handBook.gotStepAward;
            if (stepArr.length > 0) {
                lastStep = stepArr[stepArr.length - 1];
                for (var k = 0; k < steptempArr.length; k++) {
                    if (stepArr.indexOf(steptempArr[k]) == -1) {
                        step = k;
                        break;
                    }
                }
            }
            if (!step && stepArr.length == steptempArr.length) {
                this.labRewardValue.text = Language.C_YFYSYJX;
                this.expProgress.noTweenValue = 100000;
                this.rewardBox.visible = false;
            }
            else {
                var stepTemps = strArr[step];
                var count = GameModels.handBook.getSealCount();
                var needCount = parseInt(stepTemps.split("|")[0]);
                var rewardArr = stepTemps.split("|")[1];
                var itemVo = vo.fromPool(vo.ItemVO, parseInt(rewardArr.split("_")[0]));
                itemVo.count = parseInt(rewardArr.split("_")[1]);
                this.labMoneyCount.text = "X" + rewardArr.split("_")[1];
                this._rewardStr.push(itemVo);
                this._step = needCount;
                var minCount = count - lastStep;
                if (minCount <= 0) {
                    minCount = 0;
                }
                else {
                    if (minCount >= needCount - lastStep) {
                        minCount = needCount - lastStep;
                    }
                }
                var maxCount = needCount - lastStep;
                this.labRewardValue.text = minCount + "/" + maxCount;
                this.expProgress.noTweenValue = minCount / maxCount;
                var isCan = count >= needCount;
                this._isCan = minCount >= maxCount;
                this.rewardBox.filters = isCan ? null : utils.filterUtil.grayFilters;
                if (isCan) {
                    if (!this._effect) {
                        this.createPhantomEffect();
                    }
                    this._effect.resId = "6041";
                    this._effect.play();
                }
            }
        };
        // private showMoShenView(): void {
        // 	mg.uiManager.show(achievement.AchievementTuJianMoShen);
        // }
        AchievementTuJianDialog.prototype.showRewardTip = function (evt) {
            var _this = this;
            if (this._rewardStr.length <= 0)
                return;
            if (this._step <= 0)
                return;
            var status = this._isCan ? ChestPreviewAlert.HAPLOID : ChestPreviewAlert.NORMAL;
            mg.alertManager.showAlert(ChestPreviewAlert, true, true, this._rewardStr, function () {
                GameModels.handBook.requestMoShenStepAward(_this._step, utils.Handler.create(_this, function (data) {
                    if (data) {
                        var rewards = _this._rewardStr[0].id + "_" + _this._rewardStr[0].count;
                        mg.alertManager.showAlert(UsePropGetGift, true, true, [rewards]);
                        _this.showView();
                    }
                }));
            }, null, status, true, false, null);
        };
        AchievementTuJianDialog.prototype.onDownListClick = function (e) {
            this._selectedIndex = e.itemIndex;
            var vo = GameModels.handBook.getHandBookVoByBookType(this._selectedIndex + 1);
            this._listCollection.source = vo;
            this.showView();
            var viewRole = mg.uiManager.getView(dialog.tujian.TuJianMainDialog);
            if (viewRole)
                viewRole.updataChange();
        };
        Object.defineProperty(AchievementTuJianDialog.prototype, "downIndex", {
            get: function () {
                return this.lisdown.selectedIndex;
            },
            enumerable: true,
            configurable: true
        });
        AchievementTuJianDialog.prototype.getDownListItem = function () {
            this.lisdown.validateNow();
            if (this.lisdown.numChildren > 1 && this.lisdown.getChildAt(1)) {
                return this.lisdown.getChildAt(0).imgIcon;
            }
            return null;
        };
        // public getListItem(): eui.Image {
        // 	this.list.validateNow();
        // 	if (this.list.numChildren > 1 && this.list.getChildAt(1)) {
        // 		return (this.list.getChildAt(1) as achievement.AchievementTuJianGroupRenderer).getgroupListItem();
        // 	}
        // 	return null;
        // }
        AchievementTuJianDialog.prototype.createPhantomEffect = function () {
            if (!this._effect) {
                this._effect = utils.ObjectPool.from(s.AnimationSprite);
                this._effect.y = this.rewardBox.y;
                this._effect.x = this.rewardBox.x;
                this._effect.frameRate = 6;
                this.addChild(this._effect);
            }
        };
        AchievementTuJianDialog.prototype.removePhantomEffect = function () {
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
        AchievementTuJianDialog.prototype.exit = function () {
            this._count = 0;
            this._angle = 0;
            this.lisdown.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onDownListClick, this);
            //this.btn_go.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showMoShenView, this);
            this.rewardBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showRewardTip, this);
        };
        return AchievementTuJianDialog;
    }(ui.AchievementTuJianDialogSkin));
    achievement.AchievementTuJianDialog = AchievementTuJianDialog;
    __reflect(AchievementTuJianDialog.prototype, "achievement.AchievementTuJianDialog", ["IModuleView", "egret.DisplayObject"]);
})(achievement || (achievement = {}));
