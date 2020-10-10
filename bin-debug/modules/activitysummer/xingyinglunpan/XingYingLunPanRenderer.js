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
    var XingYingLunPanRenderer = (function (_super) {
        __extends(XingYingLunPanRenderer, _super);
        function XingYingLunPanRenderer() {
            return _super.call(this) || this;
        }
        XingYingLunPanRenderer.prototype.dataChanged = function () {
            if (this.data) {
                if (this.data instanceof n.ProtoXYDBRecord) {
                    //玩家XXXXXX获得了XXXX*999
                    //玩家XXXXXX触发了暴击获得了XXXX*999
                    //玩家XXXXXX触发了连击获得了XXXX*999，XXXX*999
                    var temp1 = this.data;
                    var str = temp1.ItemStr.split(";");
                    var arr = null;
                    if (temp1.TreasureState == 0) {
                        if (str[0]) {
                            var str1 = str[0].split("_");
                            var template = Templates.getTemplateById(templates.Map.ITEM, str1[0]);
                            arr = (new egret.HtmlTextParser).parser("<font color=" + TypeColor.AN_GOLDEN + ">" + temp1.PlayerName + "</font><font color=" + TypeColor.WHITE + ">" + (" " + Language.C_HD + " ") + "</font><font color=" + TypeQuality.getQualityColor(template.quality) + ">" + (template.name + "x" + str1[1]) + "</font>");
                        }
                    }
                    else if (temp1.TreasureState == 1) {
                        var count = 0;
                        for (var i = 0; i < str.length; i++) {
                            var s = str[i].split("_");
                            count = count + parseInt(s[1]);
                        }
                        if (str[0]) {
                            var str1 = str[0].split("_");
                            var template = Templates.getTemplateById(templates.Map.ITEM, str1[0]);
                            arr = (new egret.HtmlTextParser).parser("<font color=" + TypeColor.AN_GOLDEN + ">" + temp1.PlayerName + "</font><font color=" + TypeColor.GREEN + ">" + (" " + Language.C_CFBJ + " ") + "</font><font color=" + TypeQuality.getQualityColor(template.quality) + ">" + (template.name + "x" + count) + "</font>");
                        }
                    }
                    else {
                        var ss = "";
                        for (var i = 0; i < str.length; i++) {
                            var s = str[i].split("_");
                            var template = Templates.getTemplateById(templates.Map.ITEM, s[0]);
                            ss = ss + ("<font color=" + TypeQuality.getQualityColor(template.quality) + ">" + (template.name + "x" + +s[1]) + "</font>");
                        }
                        arr = (new egret.HtmlTextParser).parser("<font color=" + TypeColor.AN_GOLDEN + ">" + temp1.PlayerName + "</font><font color=" + TypeColor.GREEN + ">" + (" " + Language.C_CFLJ + " ") + "</font>" + ss);
                    }
                    if (arr)
                        this.labContent.textFlow = arr;
                }
                else {
                    var temp = this.data;
                    if (temp.RewardCount == 1) {
                        this.labContent.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_12HDJF1, temp.PlayerName, temp.Score));
                    }
                    else {
                        this.labContent.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_12HDJF, temp.PlayerName, temp.Score));
                    }
                }
            }
        };
        return XingYingLunPanRenderer;
    }(ui.XingYingLunPanRendererSkin));
    renderer.XingYingLunPanRenderer = XingYingLunPanRenderer;
    __reflect(XingYingLunPanRenderer.prototype, "renderer.XingYingLunPanRenderer");
})(renderer || (renderer = {}));
