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
        var JueDiQiuShengRankDialog = (function (_super) {
            __extends(JueDiQiuShengRankDialog, _super);
            function JueDiQiuShengRankDialog() {
                var _this = _super.call(this) || this;
                _this._viewStates = ["award"];
                if (!_this._listData)
                    _this._listData = new eui.ArrayCollection();
                _this._personReward = Templates.getTemplatesByProperty(templates.Map.RANKREWARD, "type", 12);
                return _this;
            }
            JueDiQiuShengRankDialog.prototype.show = function (data) {
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.currentState = this._viewStates[0];
                this.updateAward();
            };
            JueDiQiuShengRankDialog.prototype.hide = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            JueDiQiuShengRankDialog.prototype.onTouchHandler = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            JueDiQiuShengRankDialog.prototype.onSelected = function (vaule) {
                this.currentState = this._viewStates[0];
            };
            JueDiQiuShengRankDialog.prototype.updateAward = function () {
                this._listData.source = this._personReward;
                this.rankPersonRewardList0.dataProvider = this._listData;
            };
            return JueDiQiuShengRankDialog;
        }(ui.JueDiQiuShengRankSkin));
        limitactivities.JueDiQiuShengRankDialog = JueDiQiuShengRankDialog;
        __reflect(JueDiQiuShengRankDialog.prototype, "dialog.limitactivities.JueDiQiuShengRankDialog", ["IAlert", "egret.DisplayObject"]);
    })(limitactivities = dialog.limitactivities || (dialog.limitactivities = {}));
})(dialog || (dialog = {}));
