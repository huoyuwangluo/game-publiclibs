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
        var TopBattleBattleRecordList = (function (_super) {
            __extends(TopBattleBattleRecordList, _super);
            function TopBattleBattleRecordList() {
                return _super.call(this) || this;
            }
            TopBattleBattleRecordList.prototype.show = function () {
                GameModels.topBattle.requsetTopBattleRecord(utils.Handler.create(this, function () {
                    this.showView();
                }));
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            };
            TopBattleBattleRecordList.prototype.showView = function () {
                var recordList = GameModels.topBattle.recordList.concat();
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(recordList);
                }
                else {
                    this._listData.source = recordList;
                }
                this.labNo.visible = recordList.length <= 0;
                this.list.dataProvider = this._listData;
            };
            TopBattleBattleRecordList.prototype.onBtnClick = function (evt) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            TopBattleBattleRecordList.prototype.hide = function () {
                this.clearList(this.list);
                this._listData = null;
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return TopBattleBattleRecordList;
        }(ui.TopBattleBattleRecordListSkin));
        topBattle.TopBattleBattleRecordList = TopBattleBattleRecordList;
        __reflect(TopBattleBattleRecordList.prototype, "dialog.topBattle.TopBattleBattleRecordList", ["IAlert", "egret.DisplayObject"]);
    })(topBattle = dialog.topBattle || (dialog.topBattle = {}));
})(dialog || (dialog = {}));
