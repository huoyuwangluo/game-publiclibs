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
    var rank;
    (function (rank) {
        var RankingMainDialog = (function (_super) {
            __extends(RankingMainDialog, _super);
            function RankingMainDialog() {
                return _super.call(this) || this;
            }
            RankingMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._rankType = [101, 102, 103, 105, 106, 108, 109];
                this._funcType = [107, 107, 215, 233, 242, 232, 107];
                this._rankOfFunc = [];
                for (var i = 0; i < this._rankType.length; i++) {
                    this._rankOfFunc[this._rankType[i]] = this._funcType[i];
                }
            };
            RankingMainDialog.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this.showView();
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.ranking.addEventListener(mo.ModelRanking.MOBAI, this.showView, this);
            };
            RankingMainDialog.prototype.exit = function () {
                this.clearList(this.list);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                GameModels.ranking.removeEventListener(mo.ModelRanking.MOBAI, this.showView, this);
            };
            RankingMainDialog.prototype.showView = function () {
                GameModels.ranking.requestAllRankOneData(utils.Handler.create(this, this.showList));
            };
            RankingMainDialog.prototype.showList = function () {
                var data = GameModels.ranking.dataOne;
                var data1 = [];
                for (var i = 0; i < data.SortboardViewList.length; i++) {
                    var rankType = data.SortboardViewList[i].SortboardType;
                    if (data.SortboardViewList[i] && data.SortboardViewList[i].TopPlayerData.PlayerId && TypeFunOpen.checkIsOpenByFunId(this._rankOfFunc[rankType])) {
                        data1.push(data.SortboardViewList[i]);
                    }
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(data1);
                }
                else {
                    this._listData.source = data1;
                }
                this.list.dataProvider = this._listData;
            };
            RankingMainDialog.prototype.onBuyClick = function (e) {
                var data = this.list.selectedItem;
                mg.uiManager.show(dialog.ranking.RankingMain, this.list.selectedIndex);
            };
            return RankingMainDialog;
        }(ui.RankingMainDialogSkin));
        rank.RankingMainDialog = RankingMainDialog;
        __reflect(RankingMainDialog.prototype, "dialog.rank.RankingMainDialog");
    })(rank = dialog.rank || (dialog.rank = {}));
})(dialog || (dialog = {}));
