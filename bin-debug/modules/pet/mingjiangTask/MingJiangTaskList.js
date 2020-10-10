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
var pet;
(function (pet) {
    var MingJiangTaskList = (function (_super) {
        __extends(MingJiangTaskList, _super);
        function MingJiangTaskList() {
            return _super.call(this) || this;
        }
        MingJiangTaskList.prototype.show = function () {
            this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
            this.showList();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
        };
        MingJiangTaskList.prototype.showList = function () {
            var groupList = GameModels.mingJiangTask.voArr;
            this.labNo.visible = groupList.length <= 0;
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(groupList);
            }
            else {
                this._listData.source = groupList;
            }
        };
        MingJiangTaskList.prototype.clickHandler = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        MingJiangTaskList.prototype.onListClick = function (e) {
            var item = this.list.selectedItem;
            GameModels.friends.getPromptInfo(item.playerId, utils.Handler.create(this, function (info, count) {
                mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
            }));
        };
        MingJiangTaskList.prototype.hide = function () {
            this.clearList(this.list);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return MingJiangTaskList;
    }(ui.MingJiangTaskListSkin));
    pet.MingJiangTaskList = MingJiangTaskList;
    __reflect(MingJiangTaskList.prototype, "pet.MingJiangTaskList", ["IAlert", "egret.DisplayObject"]);
})(pet || (pet = {}));
