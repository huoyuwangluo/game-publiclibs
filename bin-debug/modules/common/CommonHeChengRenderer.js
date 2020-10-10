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
    var CommonHeChengRenderer = (function (_super) {
        __extends(CommonHeChengRenderer, _super);
        function CommonHeChengRenderer() {
            return _super.call(this) || this;
        }
        CommonHeChengRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.labItem.text = this.data.name;
                this.labItem0.text = this.data.name;
                this.redPoint.visible = this.data.redpoint;
            }
        };
        return CommonHeChengRenderer;
    }(ui.CommonHeChengRendererSkin));
    renderer.CommonHeChengRenderer = CommonHeChengRenderer;
    __reflect(CommonHeChengRenderer.prototype, "renderer.CommonHeChengRenderer");
})(renderer || (renderer = {}));
