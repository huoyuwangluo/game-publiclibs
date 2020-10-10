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
    var LegionRedBagRecordRenderer = (function (_super) {
        __extends(LegionRedBagRecordRenderer, _super);
        function LegionRedBagRecordRenderer() {
            return _super.call(this) || this;
        }
        LegionRedBagRecordRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var record = this.data;
            if (record) {
                var count = GameModels.legion.getRedBagTypeBuyId(record.RefId);
                var lbStr = "";
                if (count == 500) {
                    lbStr = Language.getExpression(Language.E_1YLB1, count);
                }
                else {
                    lbStr = Language.getExpression(Language.E_1YLB, count);
                }
                this.labContent.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_LQHB, record.PlayerName1, record.PlayerName2, lbStr));
            }
            else {
                this.labContent.text = "";
            }
        };
        return LegionRedBagRecordRenderer;
    }(ui.LegionRedBagRecordRendererSkin));
    renderer.LegionRedBagRecordRenderer = LegionRedBagRecordRenderer;
    __reflect(LegionRedBagRecordRenderer.prototype, "renderer.LegionRedBagRecordRenderer");
})(renderer || (renderer = {}));
