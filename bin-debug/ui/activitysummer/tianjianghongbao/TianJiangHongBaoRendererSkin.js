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
    var TianJiangHongBaoRendererSkin = (function (_super) {
        __extends(TianJiangHongBaoRendererSkin, _super);
        function TianJiangHongBaoRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.TianJiangHongBaoRendererSkin';
            return _this;
        }
        return TianJiangHongBaoRendererSkin;
    }(base.ItemRenderer));
    ui.TianJiangHongBaoRendererSkin = TianJiangHongBaoRendererSkin;
    __reflect(TianJiangHongBaoRendererSkin.prototype, "ui.TianJiangHongBaoRendererSkin");
})(ui || (ui = {}));
