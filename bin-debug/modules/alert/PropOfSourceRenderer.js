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
var PropOfSourceRenderer = (function (_super) {
    __extends(PropOfSourceRenderer, _super);
    function PropOfSourceRenderer() {
        return _super.call(this) || this;
    }
    PropOfSourceRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data) {
            this.labFun.text = this.data.des;
        }
    };
    PropOfSourceRenderer.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.labGo.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_QW);
    };
    return PropOfSourceRenderer;
}(ui.PropOfSourceRendererSkin));
__reflect(PropOfSourceRenderer.prototype, "PropOfSourceRenderer");
