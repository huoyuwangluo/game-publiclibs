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
    var topBattle;
    (function (topBattle) {
        var TopBattleMyGuessList = (function (_super) {
            __extends(TopBattleMyGuessList, _super);
            function TopBattleMyGuessList() {
                return _super.call(this) || this;
            }
            TopBattleMyGuessList.prototype.show = function () {
                GameModels.topBattle.requsetTopBattleGetMysBetRecord(utils.Handler.create(this, function () {
                    this.showView();
                }));
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            TopBattleMyGuessList.prototype.showView = function () {
                var recordList = GameModels.topBattle.betRecordList.concat();
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(recordList);
                }
                else {
                    this._listData.source = recordList;
                }
                this.labNo.visible = recordList.length <= 0;
                this.list.dataProvider = this._listData;
            };
            TopBattleMyGuessList.prototype.onBtnClick = function (evt) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            TopBattleMyGuessList.prototype.hide = function () {
                this.clearList(this.list);
                this._listData = null;
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return TopBattleMyGuessList;
        }(ui.TopBattleMyGuessListSkin));
        topBattle.TopBattleMyGuessList = TopBattleMyGuessList;
        __reflect(TopBattleMyGuessList.prototype, "dialog.topBattle.TopBattleMyGuessList", ["IAlert", "egret.DisplayObject"]);
    })(topBattle = dialog.topBattle || (dialog.topBattle = {}));
})(dialog || (dialog = {}));
