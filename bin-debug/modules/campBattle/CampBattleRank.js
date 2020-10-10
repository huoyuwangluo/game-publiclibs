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
    var campBattle;
    (function (campBattle) {
        var CampBattleRank = (function (_super) {
            __extends(CampBattleRank, _super);
            function CampBattleRank() {
                return _super.call(this) || this;
            }
            CampBattleRank.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._winArr = [this.img_left, this.img_center, this.img_right];
            };
            CampBattleRank.prototype.enter = function () {
                this.img_winUnion.source = "img_countryWar_win_" + GameModels.campBattle.winUnionId + "_png";
                var winArr = GameModels.campBattle.roadWinUnionIdList.concat();
                for (var i = 0; i < this._winArr.length; i++) {
                    if (winArr[i]) {
                        this._winArr[i].source = "img_countryWar_Roadwin_" + winArr[i] + "_png";
                    }
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection();
                }
                this._listData.source = GameModels.campBattle.resultPlayerList.sort(function (a, b) { return b.WinCount - a.WinCount; });
                ;
                this.list.dataProvider = this._listData;
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            };
            CampBattleRank.prototype.exit = function () {
                this.clearList(this.list);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            };
            CampBattleRank.prototype.onClose = function (evt) {
                mg.uiManager.remove(this);
            };
            return CampBattleRank;
        }(ui.CampBattleRankSkin));
        campBattle.CampBattleRank = CampBattleRank;
        __reflect(CampBattleRank.prototype, "dialog.campBattle.CampBattleRank");
    })(campBattle = dialog.campBattle || (dialog.campBattle = {}));
})(dialog || (dialog = {}));
