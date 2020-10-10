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
    var vipBtnRenderer = (function (_super) {
        __extends(vipBtnRenderer, _super);
        function vipBtnRenderer() {
            return _super.call(this) || this;
        }
        vipBtnRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.imgDown.source = "newVip_json.VIP" + this.data.index;
                this.imgUp.source = "newVip_json.VIP0" + this.data.index;
                this.imgSelecd.visible = this.data.selected;
                this.imgDown.visible = this.data.selected;
                this.imgUp.visible = !this.data.selected;
            }
        };
        return vipBtnRenderer;
    }(ui.vipBtnRendererSkin));
    renderer.vipBtnRenderer = vipBtnRenderer;
    __reflect(vipBtnRenderer.prototype, "renderer.vipBtnRenderer");
})(renderer || (renderer = {}));
