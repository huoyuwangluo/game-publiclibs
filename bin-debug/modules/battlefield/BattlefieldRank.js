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
var dialog;
(function (dialog) {
    var battlefield;
    (function (battlefield) {
        var BattlefieldRank = (function (_super) {
            __extends(BattlefieldRank, _super);
            function BattlefieldRank() {
                return _super.call(this) || this;
            }
            BattlefieldRank.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._winArr = [this.img_WinWei, this.img_WinShu, this.img_WinWu];
                this._rwards = [this.reward0, this.reward1, this.reward2, this.reward3, this.reward4];
            };
            BattlefieldRank.prototype.enter = function (isShow) {
                if (isShow === void 0) { isShow = false; }
                this.labTishi.visible = isShow;
                var dataWei = GameModels.sceneLegin.getUnionScoreListByUnionId(1);
                var weiScore = dataWei ? dataWei.Score : 0;
                this.labWeiScore.text = "" + weiScore;
                var dataShu = GameModels.sceneLegin.getUnionScoreListByUnionId(2);
                var shuScore = dataShu ? dataShu.Score : 0;
                this.labShuScore.text = "" + shuScore;
                var dataWu = GameModels.sceneLegin.getUnionScoreListByUnionId(3);
                var wuScore = dataWu ? dataWu.Score : 0;
                this.labWuScore.text = "" + wuScore;
                var arrScore = [weiScore, shuScore, wuScore];
                for (var i = 0; i < this._winArr.length; i++) {
                    if (i == this.getMaxScoreIndex(arrScore) && arrScore[this.getMaxScoreIndex(arrScore)] > 0) {
                        this._winArr[i].visible = true;
                    }
                    else {
                        this._winArr[i].visible = false;
                    }
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(GameModels.sceneLegin.personScoreList);
                }
                else {
                    this._listData.source = GameModels.sceneLegin.personScoreList;
                }
                this.list.dataProvider = this._listData;
                this.labMyRank.text = "" + GameModels.sceneLegin.myRank;
                this.labMyScore.text = "" + GameModels.sceneLegin.myScore;
                // var s: string = "201_100;201_200;201_300;201_400;201_500";
                // let rewards: Array<string> = s.split(";");
                // for (var i: number = 0; i < this._rwards.length; i++) {
                // 	var iconBox: components.RewardItemBox = this._rwards[i];
                // 	if (i < rewards.length) {
                // 		iconBox.dataSource = rewards[i];
                // 		this.boxGroup.addChild(iconBox);
                // 	} else {
                // 		if (iconBox.parent) {
                // 			iconBox.parent.removeChild(iconBox);
                // 		}
                // 	}
                // }
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            };
            BattlefieldRank.prototype.getMaxScoreIndex = function (arrScore) {
                var max = arrScore[0];
                var maxIndex = 0;
                for (var i = 0; i < arrScore.length; i++) {
                    if (arrScore[i] > max) {
                        max = arrScore[i];
                        maxIndex = i;
                    }
                }
                return maxIndex;
            };
            BattlefieldRank.prototype.exit = function () {
                this.clearList(this.list);
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    if (reward)
                        reward.dataSource = null;
                }
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            };
            BattlefieldRank.prototype.onClose = function (evt) {
                mg.uiManager.remove(this);
            };
            return BattlefieldRank;
        }(ui.BattlefieldRankSkin));
        battlefield.BattlefieldRank = BattlefieldRank;
        __reflect(BattlefieldRank.prototype, "dialog.battlefield.BattlefieldRank");
    })(battlefield = dialog.battlefield || (dialog.battlefield = {}));
})(dialog || (dialog = {}));
