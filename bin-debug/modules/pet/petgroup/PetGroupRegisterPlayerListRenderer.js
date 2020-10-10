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
    var PetGroupRegisterPlayerListRenderer = (function (_super) {
        __extends(PetGroupRegisterPlayerListRenderer, _super);
        function PetGroupRegisterPlayerListRenderer() {
            return _super.call(this) || this;
        }
        PetGroupRegisterPlayerListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.labName.text = this.data.name;
                var elements = [];
                elements.push({ text: Language.J_Y, style: { textColor: 0xD3D3D3 } });
                elements.push({ text: utils.DateUtil.formatDateInChinese(new Date(this.data.time * 1000), false), style: { textColor: 0x44c305 } });
                elements.push({ text: Language.J_DGZWJJXLSC, style: { textColor: 0xD3D3D3 } });
                this.labDes.textFlow = elements;
            }
        };
        return PetGroupRegisterPlayerListRenderer;
    }(ui.PetGroupRegisterPlayerListRendererSkin));
    renderer.PetGroupRegisterPlayerListRenderer = PetGroupRegisterPlayerListRenderer;
    __reflect(PetGroupRegisterPlayerListRenderer.prototype, "renderer.PetGroupRegisterPlayerListRenderer");
})(renderer || (renderer = {}));
