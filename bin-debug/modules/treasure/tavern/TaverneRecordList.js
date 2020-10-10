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
var TaverneRecordList = (function (_super) {
    __extends(TaverneRecordList, _super);
    function TaverneRecordList() {
        return _super.call(this) || this;
    }
    TaverneRecordList.prototype.show = function () {
        if (!this._listData) {
            this._listData = new eui.ArrayCollection(GameModels.tavern.tavernRecordListVO);
        }
        else {
            this._listData.source = GameModels.tavern.tavernRecordListVO;
        }
        this.list.dataProvider = this._listData;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    TaverneRecordList.prototype.clickHandler = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    TaverneRecordList.prototype.hide = function () {
        this.clearList(this.list);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return TaverneRecordList;
}(ui.TaverneRecordListSkin));
__reflect(TaverneRecordList.prototype, "TaverneRecordList", ["IAlert", "egret.DisplayObject"]);
