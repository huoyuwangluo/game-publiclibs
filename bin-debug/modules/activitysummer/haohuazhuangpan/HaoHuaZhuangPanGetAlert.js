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
var HaoHuaZhuangPanGetAlert = (function (_super) {
    __extends(HaoHuaZhuangPanGetAlert, _super);
    function HaoHuaZhuangPanGetAlert() {
        return _super.call(this) || this;
    }
    HaoHuaZhuangPanGetAlert.prototype.show = function (data) {
        this.reward.visible = false;
        if (data.length == 1) {
            this.reward.visible = true;
            var str = data[0].ItemId + "_" + data[0].Count;
            this.reward.dataSource = str;
        }
        else {
            this.list.dataProvider = new eui.ArrayCollection(data);
        }
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.showInfo, this);
    };
    HaoHuaZhuangPanGetAlert.prototype.showInfo = function (e) {
        this._targetItem = e.itemRenderer;
        if (!this._targetItem.itemVo)
            return;
        mg.TipManager.instance.showTip(tips.PropTip, this._targetItem.itemVo);
    };
    HaoHuaZhuangPanGetAlert.prototype.hide = function () {
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.showInfo, this);
        this.clearList(this.list);
        this.reward.dataSource = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return HaoHuaZhuangPanGetAlert;
}(ui.HaoHuaZhuangPanGetAlertSkin));
__reflect(HaoHuaZhuangPanGetAlert.prototype, "HaoHuaZhuangPanGetAlert", ["IAlert", "egret.DisplayObject"]);
