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
    var limitChooseItemRenderer = (function (_super) {
        __extends(limitChooseItemRenderer, _super);
        function limitChooseItemRenderer() {
            return _super.call(this) || this;
        }
        limitChooseItemRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var item = this.data;
                if (item instanceof vo.GamePetVO) {
                    this.imgQuality.source = ResPath.getPetQualityByStar(item.star, item.isHashFourSkill);
                    var item1 = Templates.getTemplateById(templates.Map.ITEM, item.refId);
                    this.imgIcon.source = item1.icon;
                    this.labName.text = item.name;
                    this.labName.textColor = TypeQuality.getStarColor(item.star);
                }
                else {
                    this.imgQuality.source = ResPath.getQuality(item.quality);
                    this.imgIcon.source = item.icon;
                    this.labName.text = item.name;
                    this.labName.textColor = TypeQuality.getQualityColor(item.quality);
                }
            }
        };
        return limitChooseItemRenderer;
    }(ui.limitChooseItemRendererSkin));
    renderer.limitChooseItemRenderer = limitChooseItemRenderer;
    __reflect(limitChooseItemRenderer.prototype, "renderer.limitChooseItemRenderer");
})(renderer || (renderer = {}));
