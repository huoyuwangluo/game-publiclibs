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
var WelfareActivityYuLanAlert = (function (_super) {
    __extends(WelfareActivityYuLanAlert, _super);
    function WelfareActivityYuLanAlert() {
        return _super.call(this) || this;
    }
    WelfareActivityYuLanAlert.prototype.show = function (vo) {
        logger.log("活动排行类型===", vo.actType);
        var temp = Templates.getTemplatesByProperty(templates.Map.ACTRANK, "type", vo.actSetTemp.typeTable);
        if (!this._listData) {
            this._listData = new eui.ArrayCollection(temp);
        }
        else {
            this._listData.source = temp;
        }
        this.listRank.dataProvider = this._listData;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    WelfareActivityYuLanAlert.prototype.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
        }
    };
    WelfareActivityYuLanAlert.prototype.hide = function () {
        this.clearList(this.listRank);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return WelfareActivityYuLanAlert;
}(ui.WelfareActivityYuLanAlertSkin));
__reflect(WelfareActivityYuLanAlert.prototype, "WelfareActivityYuLanAlert", ["IAlert", "egret.DisplayObject"]);
