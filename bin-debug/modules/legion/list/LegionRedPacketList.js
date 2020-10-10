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
var LegionRedPacketList = (function (_super) {
    __extends(LegionRedPacketList, _super);
    function LegionRedPacketList() {
        return _super.call(this) || this;
    }
    LegionRedPacketList.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
    };
    LegionRedPacketList.prototype.enter = function (data) {
        this.showView();
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
    };
    LegionRedPacketList.prototype.exit = function () {
        this.clearList(this.list);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
    };
    LegionRedPacketList.prototype.onListClick = function (e) {
    };
    LegionRedPacketList.prototype.showView = function () {
    };
    return LegionRedPacketList;
}(ui.LegionRedPacketListSkin));
__reflect(LegionRedPacketList.prototype, "LegionRedPacketList");
