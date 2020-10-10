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
    var SmithyShenBingListRenderer = (function (_super) {
        __extends(SmithyShenBingListRenderer, _super);
        function SmithyShenBingListRenderer() {
            return _super.call(this) || this;
        }
        SmithyShenBingListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var items = Templates.getTemplateById(templates.Map.ITEM, this.data);
                var shenBingVo = GameModels.shenbing.getShenBingVoByRefid(this.data);
                if (items && shenBingVo) {
                    this.imgQuality.source = ResPath.getQuality(items.quality);
                    this.imgIcon.source = items.icon;
                    this.labName.text = items.name;
                    this.labName.textColor = TypeQuality.getQualityColor(items.quality);
                    var petTmp = Templates.getTemplateById(templates.Map.GENERAL, shenBingVo.general);
                    if (petTmp) {
                        var elements = [];
                        elements.push({ text: petTmp.name, style: { textColor: TypeQuality.getStarColor(petTmp.star) } });
                        elements.push({ text: Language.C_QG, style: { textColor: 0xD3D3D3 } });
                        this.labCount.textFlow = elements;
                    }
                    else {
                        this.labCount.text = "";
                    }
                    this.labLv.text = shenBingVo.level < 1 ? "(" + Language.C_WJH + ")" : "Lv." + shenBingVo.level;
                }
            }
        };
        return SmithyShenBingListRenderer;
    }(ui.SmithyShenBingListRendererSkin));
    renderer.SmithyShenBingListRenderer = SmithyShenBingListRenderer;
    __reflect(SmithyShenBingListRenderer.prototype, "renderer.SmithyShenBingListRenderer");
})(renderer || (renderer = {}));
