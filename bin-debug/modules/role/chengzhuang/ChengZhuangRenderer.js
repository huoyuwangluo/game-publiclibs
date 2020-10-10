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
    var ChengZhuangRenderer = (function (_super) {
        __extends(ChengZhuangRenderer, _super);
        function ChengZhuangRenderer() {
            return _super.call(this) || this;
        }
        ChengZhuangRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var temp = this.data;
                this.imgQuila.source = ResPath.getQuality(temp.quality);
                this.labName.textColor = TypeQuality.getQualityColor(temp.templateEquip.quality);
                this.labName.text = temp.templateEquip.name + " Lv." + temp.templateEquip.lv;
                this.imgIcon.source = temp.icon;
                var s = temp.templateEquip.split.split("|");
                var tempItem = Templates.getTemplateById(templates.Map.ITEM, ConfigData.CHENGZHUANG_SUIBIAN);
                this.labCount.text = Language.J_FJHD + tempItem.name + "x" + s[1].split("_")[1];
            }
            else {
                this.imgIcon.source = null;
            }
        };
        return ChengZhuangRenderer;
    }(ui.ChengZhuangRendererSkin));
    renderer.ChengZhuangRenderer = ChengZhuangRenderer;
    __reflect(ChengZhuangRenderer.prototype, "renderer.ChengZhuangRenderer");
})(renderer || (renderer = {}));
