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
    var TreasureAllPrize = (function (_super) {
        __extends(TreasureAllPrize, _super);
        function TreasureAllPrize() {
            return _super.call(this) || this;
        }
        TreasureAllPrize.prototype.show = function (dataSetingId) {
            var dataSeting = GameModels.dataSet.getDataSettingValueById(dataSetingId);
            var data = dataSeting.split(";");
            var data1 = [];
            for (var i = 0; i < data.length; i++) {
                var item = Templates.getTemplateById(templates.Map.GENERAL, data[i]);
                data1.push(item);
            }
            data1.sort(function (a, b) {
                return b.quality - a.quality;
            });
            var anyArr = [];
            for (var _i = 0, data1_1 = data1; _i < data1_1.length; _i++) {
                var pet = data1_1[_i];
                var obj = { id: null };
                obj.id = pet;
                anyArr.push(obj);
            }
            this.listAllPrize.dataProvider = new eui.ArrayCollection(anyArr);
            this.listAllPrize.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);
            if (this.scrollerAllPrize.verticalScrollBar) {
                this.scrollerAllPrize.verticalScrollBar.autoVisibility = false;
                this.scrollerAllPrize.verticalScrollBar.visible = false;
            }
        };
        TreasureAllPrize.prototype.hide = function () {
            this.clearList(this.listAllPrize);
            this.listAllPrize.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTip, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        TreasureAllPrize.prototype.closeThis = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        TreasureAllPrize.prototype.openItemTip = function (e) {
            var pet = this.listAllPrize.selectedItem;
            if (pet)
                mg.TipManager.instance.showTip(tips.GeneralInfoTip, pet);
        };
        return TreasureAllPrize;
    }(ui.TreasureAllPrizeSkin));
    treasure.TreasureAllPrize = TreasureAllPrize;
    __reflect(TreasureAllPrize.prototype, "treasure.TreasureAllPrize", ["IAlert", "egret.DisplayObject"]);
})(treasure || (treasure = {}));
