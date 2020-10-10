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
var item;
(function (item_1) {
    var ShenMiShangDianItem = (function (_super) {
        __extends(ShenMiShangDianItem, _super);
        function ShenMiShangDianItem() {
            return _super.call(this) || this;
        }
        ShenMiShangDianItem.prototype.dataChange = function () {
            if (this.dataSource) {
                this.imgXian.visible = true;
                var item = this.dataSource;
                this.labZheKou.text = "" + (item.template.discount / 10);
                if (item.template.limitTimes <= 0) {
                    this.imgXian.visible = false;
                    this.labCount.text = Language.C_BXG;
                }
                else {
                    this.labCount.text = (item.template.limitTimes - item.shopBuyCount) + "/" + item.template.limitTimes;
                }
                if (item.template.limitTimes <= item.shopBuyCount) {
                    this.labCount.text = Language.C_YGW;
                    this.imgXian.visible = false;
                }
                var str = item.template.itemId + "_" + item.template.itemCount;
                this.reward0.dataSource = str;
            }
        };
        return ShenMiShangDianItem;
    }(ui.ShenMiShangDianItemSkin));
    item_1.ShenMiShangDianItem = ShenMiShangDianItem;
    __reflect(ShenMiShangDianItem.prototype, "item.ShenMiShangDianItem");
})(item || (item = {}));
