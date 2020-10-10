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
    var explore;
    (function (explore) {
        var HuanjieRankView = (function (_super) {
            __extends(HuanjieRankView, _super);
            function HuanjieRankView() {
                return _super.call(this) || this;
            }
            HuanjieRankView.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            HuanjieRankView.prototype.enter = function () {
                var _this = this;
                GameModels.ranking.requestRanking(107, utils.Handler.create(this, function (data) {
                    _this.listRank.dataProvider = new eui.ArrayCollection(GameModels.ranking.laterPlayerData);
                }));
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            };
            HuanjieRankView.prototype.exit = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            };
            HuanjieRankView.prototype.btnCloseClick = function (e) {
                mg.uiManager.remove(this);
            };
            return HuanjieRankView;
        }(ui.HuanjieRankViewSkin));
        explore.HuanjieRankView = HuanjieRankView;
        __reflect(HuanjieRankView.prototype, "dialog.explore.HuanjieRankView");
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));
