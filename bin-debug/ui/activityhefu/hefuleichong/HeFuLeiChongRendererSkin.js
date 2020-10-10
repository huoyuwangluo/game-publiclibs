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
var ui;
(function (ui) {
    var HeFuLeiChongRendererSkin = (function (_super) {
        __extends(HeFuLeiChongRendererSkin, _super);
        function HeFuLeiChongRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.HeFuLeiChongRendererSkin';
            return _this;
        }
        return HeFuLeiChongRendererSkin;
    }(base.ItemRenderer));
    ui.HeFuLeiChongRendererSkin = HeFuLeiChongRendererSkin;
    __reflect(HeFuLeiChongRendererSkin.prototype, "ui.HeFuLeiChongRendererSkin");
})(ui || (ui = {}));
