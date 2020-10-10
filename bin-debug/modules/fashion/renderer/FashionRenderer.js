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
    var FashionRenderer = (function (_super) {
        __extends(FashionRenderer, _super);
        function FashionRenderer() {
            return _super.call(this) || this;
        }
        FashionRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var info = this.data;
                this.imgIcon.source = info.template.icon;
                // let tmp: templates.item = Templates.getTemplateById(templates.Map.ITEM, info.template.consume.split("_")[0]);
                var tmp = Templates.getTemplateById(templates.Map.ITEM, "201");
                this.imgQuality.source = ResPath.getQuality(tmp.quality);
                this.imgDressed.visible = info.isDressed;
                this.imgIcon.filters = info.isActived ? null : utils.filterUtil.grayFilters;
                if (info.isActived == false) {
                    var activeItem = info.template.consume.split("_");
                    var count = GameModels.bag.getItemCountById(activeItem[0]);
                    this.imgWarn.visible = count >= parseInt(activeItem[1]);
                }
                else {
                    if (this.imgWarn.visible == true) {
                        switch (info.type) {
                            case TypeFashion.CLOTHES:
                                GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_CLOTH);
                                break;
                            case TypeFashion.WEAPON:
                                GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_WEAPON);
                                break;
                            case TypeFashion.HALO:
                                GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_HALO);
                                break;
                        }
                    }
                    this.imgWarn.visible = false;
                }
            }
            else {
                this.imgIcon.source = null;
            }
        };
        return FashionRenderer;
    }(ui.FashionRendererSkin));
    renderer.FashionRenderer = FashionRenderer;
    __reflect(FashionRenderer.prototype, "renderer.FashionRenderer");
})(renderer || (renderer = {}));
