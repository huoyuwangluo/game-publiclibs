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
    var HaoHuaZhuangPanRenderer = (function (_super) {
        __extends(HaoHuaZhuangPanRenderer, _super);
        function HaoHuaZhuangPanRenderer() {
            return _super.call(this) || this;
        }
        HaoHuaZhuangPanRenderer.prototype.dataChanged = function () {
            if (this.data) {
                if (this.data instanceof n.ProtoHaoHuaZhuanPanRecord) {
                    var data = this.data;
                    var template = null;
                    if (Math.floor(Number(data.Item.ItemId) / 100000) == 1) {
                        template = Templates.getTemplateById(templates.Map.EQUIP, data.Item.ItemId);
                    }
                    else {
                        template = Templates.getTemplateById(templates.Map.ITEM, data.Item.ItemId);
                    }
                    if (data.Item.Param == 0) {
                        this.labContent.textFlow = (new egret.HtmlTextParser).parser("<font color=" + TypeColor.AN_GOLDEN + ">" + data.PlayerName + "</font><font color=" + TypeColor.WHITE + ">" + (" " + Language.C_HD + " ") + "</font><font color=" + TypeQuality.getQualityColor(template.quality) + ">" + (template.name + "x" + data.Item.Count) + "</font>");
                    }
                    else {
                        this.labContent.textFlow = (new egret.HtmlTextParser).parser("<font color=" + TypeColor.AN_GOLDEN + ">" + data.PlayerName + "</font><font color=" + TypeColor.WHITE + ">" + (" " + Language.C_HD + " ") + "</font><font color=" + TypeColor.GREEN + "> " + (data.Item.Param / 100 + "%" + Language.J_JCFLG + "x" + data.Item.Count + Language.C_MS) + "</font>");
                    }
                }
                else {
                    var data1 = this.data;
                    var template = null;
                    if (Math.floor(Number(data1.Item.ItemId) / 100000) == 1) {
                        template = Templates.getTemplateById(templates.Map.EQUIP, data1.Item.ItemId);
                    }
                    else {
                        template = Templates.getTemplateById(templates.Map.ITEM, data1.Item.ItemId);
                    }
                    this.labContent.textFlow = (new egret.HtmlTextParser).parser("<font color=" + TypeColor.AN_GOLDEN + ">" + data1.PlayerName + "</font><font color=" + TypeColor.WHITE + ">" + (" " + Language.C_HD + " ") + "</font><font color=" + TypeQuality.getQualityColor(template.quality) + ">" + (template.name + "x" + data1.Item.Count) + "</font>");
                }
            }
        };
        return HaoHuaZhuangPanRenderer;
    }(ui.HaoHuaZhuangPanRendererSkin));
    renderer.HaoHuaZhuangPanRenderer = HaoHuaZhuangPanRenderer;
    __reflect(HaoHuaZhuangPanRenderer.prototype, "renderer.HaoHuaZhuangPanRenderer");
})(renderer || (renderer = {}));
