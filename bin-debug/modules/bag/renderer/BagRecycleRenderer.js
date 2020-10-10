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
var renderer;
(function (renderer) {
    var BagRecycleRenderer = (function (_super) {
        __extends(BagRecycleRenderer, _super);
        function BagRecycleRenderer() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            return _this;
        }
        BagRecycleRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var item = this.data;
            if (item) {
                if (item.splitItem) {
                    var strArr = (item.splitItem).split("_");
                    var needItem = Templates.getTemplateById(templates.Map.ITEM, strArr[0]);
                    this.imgItem.source = needItem.icon;
                    this.labNum.text = equation.thousandChange(parseInt(strArr[1]));
                }
                this.imgIcon.source = item.icon;
                this.lv.text = "Lv." + item.templateEquip.lv;
                if (item.templateEquip) {
                    this.imgQuility.source = ResPath.getQuality(item.templateEquip.quality);
                    this.labName.textColor = TypeQuality.getQualityColor(item.templateEquip.quality);
                    this.labName.text = item.templateEquip.name;
                }
            }
            else {
                this.imgItem.source = null;
                this.imgIcon.source = null;
            }
        };
        return BagRecycleRenderer;
    }(ui.BagRecycleRendererSkin));
    renderer.BagRecycleRenderer = BagRecycleRenderer;
    __reflect(BagRecycleRenderer.prototype, "renderer.BagRecycleRenderer");
})(renderer || (renderer = {}));
