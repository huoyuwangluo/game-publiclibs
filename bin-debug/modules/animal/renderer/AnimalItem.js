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
    var AnimalItem = (function (_super) {
        __extends(AnimalItem, _super);
        function AnimalItem() {
            return _super.call(this) || this;
        }
        AnimalItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var item = this.data.item;
                var selected = this.data.selected;
                var count = this.data.count ? this.data.count : 0;
                ;
                this.imgSelectedBg.visible = false;
                this.imgSelectedCheck.visible = false;
                this.filters = null;
                this.labCount.visible = false;
                if (item instanceof vo.ItemVO) {
                    this.labCount.text = (item.count - count).toString();
                    this.labCount.visible = true;
                    this.imgIcon.source = item.icon;
                    this.imgQuality.source = ResPath.getQuality(item.quality);
                    this.labName.text = item.name;
                    if (item.count - count <= 0) {
                        this.filters = utils.filterUtil.grayFilters;
                    }
                }
                else if (item instanceof templates.item) {
                    this.labCount.text = "";
                    this.imgIcon.source = item.icon;
                    this.imgQuality.source = ResPath.getQuality(item.quality);
                    this.labName.text = item.name;
                }
                else {
                    var str = item.split(";");
                    this.labCount.text = "";
                    this.imgIcon.source = str[1];
                    this.imgQuality.source = str[0];
                    this.labName.text = str[2];
                }
            }
        };
        return AnimalItem;
    }(ui.AnimalItemSkin));
    renderer.AnimalItem = AnimalItem;
    __reflect(AnimalItem.prototype, "renderer.AnimalItem");
})(renderer || (renderer = {}));
