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
    var TaverneRecordRenderer = (function (_super) {
        __extends(TaverneRecordRenderer, _super);
        function TaverneRecordRenderer() {
            return _super.call(this) || this;
        }
        TaverneRecordRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data1 = this.data;
                var template = Templates.getTemplateById(templates.Map.ITEM, data1.data.Item.ItemId);
                this.labContent.textFlow = (new egret.HtmlTextParser).parser("   <font color=" + TypeColor.GREEN1 + ">" + data1.data.PlayerName + "</font>" + Language.C_ZAI + "<font color=" + 0xFEDB5D + ">" + Language.J_JXQY + "</font>" + Language.J_ZRPBF + "<font color=" + TypeColor.WHITE + ">" + (Language.C_HD + ":") + "</font><font color=" + TypeQuality.getQualityColor(template.quality) + ">" + (template.name + "x" + data1.data.Item.Count + "!") + "</font>");
            }
        };
        return TaverneRecordRenderer;
    }(ui.TaverneRecordRendererSkin));
    renderer.TaverneRecordRenderer = TaverneRecordRenderer;
    __reflect(TaverneRecordRenderer.prototype, "renderer.TaverneRecordRenderer");
})(renderer || (renderer = {}));
