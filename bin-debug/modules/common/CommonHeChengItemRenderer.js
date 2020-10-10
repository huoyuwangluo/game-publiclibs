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
var common;
(function (common) {
    var CommonHeChengItemRenderer = (function (_super) {
        __extends(CommonHeChengItemRenderer, _super);
        function CommonHeChengItemRenderer() {
            return _super.call(this) || this;
        }
        CommonHeChengItemRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                if (this.data.petData instanceof vo.GamePetVO) {
                    var vo1 = this.data.petData;
                    var templatePet = Templates.getTemplateById(templates.Map.ITEM, vo1.refId);
                    this.imgQuality.source = ResPath.getQuality(vo1.quality);
                    this.imgIcon.source = templatePet.icon;
                    this.labName.text = vo1.name;
                }
                else {
                    var template = null;
                    if (Math.floor(this.data.id / 100000) == 1) {
                        template = Templates.getTemplateById(templates.Map.EQUIP, this.data.id);
                    }
                    else {
                        template = Templates.getTemplateById(templates.Map.ITEM, this.data.id);
                    }
                    if (template) {
                        this.imgQuality.source = ResPath.getQuality(template.quality);
                        this.imgIcon.source = template.icon;
                        this.labName.text = template.name;
                    }
                    this.filters = this.data.isCanClick ? null : utils.filterUtil.grayFilters;
                    this.touchEnabled = this.data.isCanClick;
                    this.touchChildren = this.data.isCanClick;
                    this.labCount.text = this.data.count > 0 ? this.data.count + "" : "";
                }
            }
        };
        return CommonHeChengItemRenderer;
    }(ui.CommonHeChengItemRendererSkin));
    common.CommonHeChengItemRenderer = CommonHeChengItemRenderer;
    __reflect(CommonHeChengItemRenderer.prototype, "common.CommonHeChengItemRenderer");
})(common || (common = {}));
