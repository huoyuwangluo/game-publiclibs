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
    var JifenShangDianRendererSkin = (function (_super) {
        __extends(JifenShangDianRendererSkin, _super);
        function JifenShangDianRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.JifenShangDianRendererSkin';
            return _this;
        }
        return JifenShangDianRendererSkin;
    }(base.ItemRenderer));
    ui.JifenShangDianRendererSkin = JifenShangDianRendererSkin;
    __reflect(JifenShangDianRendererSkin.prototype, "ui.JifenShangDianRendererSkin");
})(ui || (ui = {}));
