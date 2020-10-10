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
    var limitactivities;
    (function (limitactivities) {
        var KingBattlefieldRankDialog = (function (_super) {
            __extends(KingBattlefieldRankDialog, _super);
            function KingBattlefieldRankDialog() {
                var _this = _super.call(this) || this;
                _this._viewStates = ["award"];
                if (!_this._listData)
                    _this._listData = new eui.ArrayCollection();
                _this._personReward = Templates.getTemplatesByProperty(templates.Map.RANKREWARD, "type", 5);
                _this._personScoreReward = GameModels.dataSet.getDataSettingArrByType(241);
                return _this;
            }
            KingBattlefieldRankDialog.prototype.show = function (data) {
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.currentState = this._viewStates[0];
                this.updateAward();
            };
            KingBattlefieldRankDialog.prototype.hide = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            KingBattlefieldRankDialog.prototype.onTouchHandler = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            KingBattlefieldRankDialog.prototype.onSelected = function (vaule) {
                this.currentState = this._viewStates[0];
            };
            KingBattlefieldRankDialog.prototype.updateAward = function () {
                this._listData.source = this._personReward;
                this.rankPersonRewardList0.dataProvider = this._listData;
                for (var i = 0; i < this._personScoreReward.length; i++) {
                    var scoreReward = this._personScoreReward[i].value.split("&");
                    this["labScore" + i].text = scoreReward[0] + Language.C_JF;
                    this["scoreItem" + i].dataSource = scoreReward[1];
                }
            };
            return KingBattlefieldRankDialog;
        }(ui.KingBattlefieldRankSkin));
        limitactivities.KingBattlefieldRankDialog = KingBattlefieldRankDialog;
        __reflect(KingBattlefieldRankDialog.prototype, "dialog.limitactivities.KingBattlefieldRankDialog", ["IAlert", "egret.DisplayObject"]);
    })(limitactivities = dialog.limitactivities || (dialog.limitactivities = {}));
})(dialog || (dialog = {}));
