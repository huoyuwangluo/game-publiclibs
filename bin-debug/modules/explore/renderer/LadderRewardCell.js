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
    var LadderRewardCell = (function (_super) {
        __extends(LadderRewardCell, _super);
        function LadderRewardCell() {
            return _super.call(this) || this;
        }
        LadderRewardCell.prototype.initialize = function () {
            this._items = [this.item1, this.item2, this.item3];
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.requestGetReward, this);
            this.item1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
            this.item2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
            this.item3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
        };
        LadderRewardCell.prototype.reset = function () {
            if (!this._items)
                return;
            for (var i = 0; i < this._items.length; i++) {
                this._items[i].reset();
            }
        };
        LadderRewardCell.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this._duanweiData = this.data;
                this.updateState();
            }
        };
        LadderRewardCell.prototype.openItemTip = function (e) {
            var target = e.currentTarget;
            if (target.itemVo instanceof vo.EquipVO) {
                mg.TipManager.instance.showTip(tips.EquipTip, target.itemVo);
            }
            else {
                mg.TipManager.instance.showTip(tips.PropTip, target.itemVo);
            }
        };
        LadderRewardCell.prototype.updateState = function () {
            var filters;
            var touchEnabled;
            this.btnGet.isWarn = false;
            this.btnGet.skinName = "skins.SnapSmallButton3Skin";
            if (this._duanweiData.isRecevied) {
                this.currentState = "hasGet";
            }
            else if (this._duanweiData.canRecevied) {
                filters = utils.filterUtil.sideFilters;
                touchEnabled = true;
                this.btnGet.isWarn = true;
                this.btnGet.skinName = "skins.SnapSmallButton5Skin";
                this.currentState = "waitGet";
            }
            else {
                filters = utils.filterUtil.grayFilters;
                touchEnabled = false;
                this.currentState = "willGet";
            }
            this.btnGet.touchEnabled = touchEnabled;
            this.btnGet.filters = filters;
            this.updateData();
        };
        LadderRewardCell.prototype.updateData = function () {
            var ladderStep = this._duanweiData.template.ladderStep;
            var upItems = this._duanweiData.upRewarditems;
            this.imgGrade.source = dialog.explore.TypeGrade.getGradeImage(ladderStep);
            this.labRange.text = "(" + this._duanweiData.template.upCredit + "-" + this._duanweiData.template.credit + ")";
            if (ladderStep != dialog.explore.TypeGrade.EXTREME) {
                this.imgGrade.x = 25;
                this.imgGrade.y = 32;
                this.imgLv.visible = true;
                this.imgLv.source = dialog.explore.TypeGrade.getLvImge(ladderStep, this._duanweiData.template.lvShow);
            }
            else {
                this.imgGrade.x = 9;
                this.imgGrade.y = 32;
                this.imgLv.visible = false;
            }
            for (var i = 0; i < upItems.length; i++) {
                this._items[i].visible = true;
                this._items[i].updateItemData(upItems[i].id, true, upItems[i].count);
            }
            for (var i = upItems.length; i < this._items.length; i++) {
                this._items[i].visible = false;
            }
        };
        LadderRewardCell.prototype.requestGetReward = function (e) {
            var _this = this;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            GameModels.ladder.requestDuanWeiRewardGet(this._duanweiData.duanWeiId, utils.Handler.create(this, function () {
                var rewards = [];
                var upItems = _this._duanweiData.upRewarditems;
                for (var i = 0; i < upItems.length; i++) {
                    var str = upItems[i].id + "_" + upItems[i].count;
                    rewards.push(str);
                }
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                // this.item1.playEffect();
                // this.item2.playEffect();
                // this.item3.playEffect();
            }));
        };
        Object.defineProperty(LadderRewardCell.prototype, "duanweiData", {
            get: function () {
                return this._duanweiData;
            },
            enumerable: true,
            configurable: true
        });
        return LadderRewardCell;
    }(ui.LadderRewardCellSkin));
    renderer.LadderRewardCell = LadderRewardCell;
    __reflect(LadderRewardCell.prototype, "renderer.LadderRewardCell");
})(renderer || (renderer = {}));
