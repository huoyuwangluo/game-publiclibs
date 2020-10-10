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
var treasure;
(function (treasure) {
    var GodDuanZaoAllPrize = (function (_super) {
        __extends(GodDuanZaoAllPrize, _super);
        function GodDuanZaoAllPrize() {
            return _super.call(this) || this;
        }
        GodDuanZaoAllPrize.prototype.show = function (id) {
            var dataSeting = GameModels.dataSet.getDataSettingValueById(id);
            var data = dataSeting.split(";");
            this.list.dataProvider = new eui.ArrayCollection(data);
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);
            if (this.scroller.verticalScrollBar) {
                this.scroller.verticalScrollBar.autoVisibility = false;
                this.scroller.verticalScrollBar.visible = false;
            }
        };
        GodDuanZaoAllPrize.prototype.hide = function () {
            this.clearList(this.list);
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        GodDuanZaoAllPrize.prototype.closeThis = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        GodDuanZaoAllPrize.prototype.openItemTip = function (e) {
            var iteId = this.list.selectedItem;
            var item = Templates.getTemplateById(templates.Map.ITEM, iteId);
            mg.TipManager.instance.showTip(tips.PropTip, item);
        };
        return GodDuanZaoAllPrize;
    }(ui.GodDuanZaoAllPrizeSkin));
    treasure.GodDuanZaoAllPrize = GodDuanZaoAllPrize;
    __reflect(GodDuanZaoAllPrize.prototype, "treasure.GodDuanZaoAllPrize", ["IAlert", "egret.DisplayObject"]);
})(treasure || (treasure = {}));
