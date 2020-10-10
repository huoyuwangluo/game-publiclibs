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
    var ChangePlayerHeadRenderer = (function (_super) {
        __extends(ChangePlayerHeadRenderer, _super);
        function ChangePlayerHeadRenderer() {
            return _super.call(this) || this;
        }
        ChangePlayerHeadRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.imgHead.source = ResPath.getPlayerIconSmall(this.data);
                this.invalidateProperties();
            }
        };
        ChangePlayerHeadRenderer.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.currentState == "up") {
                this.dataChanged();
            }
        };
        return ChangePlayerHeadRenderer;
    }(ui.ChangePlayerHeadRendererSkin));
    renderer.ChangePlayerHeadRenderer = ChangePlayerHeadRenderer;
    __reflect(ChangePlayerHeadRenderer.prototype, "renderer.ChangePlayerHeadRenderer");
})(renderer || (renderer = {}));
