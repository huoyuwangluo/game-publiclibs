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
    var FunPreviewRenderer = (function (_super) {
        __extends(FunPreviewRenderer, _super);
        function FunPreviewRenderer() {
            return _super.call(this) || this;
        }
        FunPreviewRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                // var vo: mo.FuncVO = this.data;
                // this.imgIcon.source = "preview_json.img_preview_icon_" + vo.id;
                // this.labText.text = vo.heraDes;
                // if (GameModels.task.hasTask && vo.openTask > GameModels.task.curTask.id) {
                // 	this.imgIcon.filters = utils.filterUtil.grayFilters;
                // 	this.labName.text = Language.J_ZXRWKQ;
                // }
                // else {
                // 	this.imgIcon.filters = null;
                // 	this.labName.text = Language.J_YKQ;
                // }
            }
        };
        return FunPreviewRenderer;
    }(ui.FunPreviewRendererSkin));
    renderer.FunPreviewRenderer = FunPreviewRenderer;
    __reflect(FunPreviewRenderer.prototype, "renderer.FunPreviewRenderer");
})(renderer || (renderer = {}));
