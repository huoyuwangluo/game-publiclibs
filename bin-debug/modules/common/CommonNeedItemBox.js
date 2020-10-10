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
    var CommonNeedItemBox = (function (_super) {
        __extends(CommonNeedItemBox, _super);
        function CommonNeedItemBox() {
            return _super.call(this) || this;
        }
        CommonNeedItemBox.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var items = Templates.getTemplateById(templates.Map.ITEM, this.data);
                if (items) {
                    this.imgQuality.source = ResPath.getQuality(items.quality);
                    this.imgIcon.source = items.icon;
                    this.labName.text = items.name;
                    this.labCount.text = "";
                    this.labName.textColor = TypeQuality.getQualityColor(items.quality);
                }
            }
        };
        return CommonNeedItemBox;
    }(ui.CommonNeedItemBoxSkin));
    renderer.CommonNeedItemBox = CommonNeedItemBox;
    __reflect(CommonNeedItemBox.prototype, "renderer.CommonNeedItemBox");
})(renderer || (renderer = {}));
