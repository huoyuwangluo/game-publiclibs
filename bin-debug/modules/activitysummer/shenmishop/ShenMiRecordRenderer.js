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
    var ShenMiRecordRenderer = (function (_super) {
        __extends(ShenMiRecordRenderer, _super);
        function ShenMiRecordRenderer() {
            return _super.call(this) || this;
        }
        ShenMiRecordRenderer.prototype.dataChanged = function () {
            if (this.data) {
                var vo = this.data;
                var content = '';
                var dataSet = GameModels.dataSet.getDataSettingById(319002);
                if (vo.shopid == 0) {
                    // 玩家XXXXXX锦鲤附体，获得了1次2万元宝减免机会
                    content = Language.getExpression(Language.E_WJ1JLFT2JMJH, vo.playerName, dataSet.value);
                }
                else {
                    var itemVo = Templates.getTemplateById(templates.Map.ITEM, vo.template.itemId);
                    if (vo.template.price > parseInt(dataSet.value)) {
                        //减免 玩家XXXXX购买了XXXX*999，减免了20000元宝
                        content = Language.getExpression(Language.E_WJ1GMN2JM3MS, vo.playerName, itemVo.name + "*" + vo.template.itemCount, dataSet.value);
                    }
                    else {
                        //免费 玩家XXXXXX使用减免，免费购买了XXXX*999
                        content = Language.getExpression(Language.E_WJ1SYJMGM2, vo.playerName, itemVo.name + "*" + vo.template.itemCount);
                    }
                }
                this.labContent.textFlow = utils.TextFlowMaker.htmlParser(content);
            }
        };
        return ShenMiRecordRenderer;
    }(ui.ShenMiRecordRendererSkin));
    renderer.ShenMiRecordRenderer = ShenMiRecordRenderer;
    __reflect(ShenMiRecordRenderer.prototype, "renderer.ShenMiRecordRenderer");
})(renderer || (renderer = {}));
