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
    var vipBtnRendererSkin = (function (_super) {
        __extends(vipBtnRendererSkin, _super);
        function vipBtnRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.vipBtnRendererSkin';
            return _this;
        }
        return vipBtnRendererSkin;
    }(base.ItemRenderer));
    ui.vipBtnRendererSkin = vipBtnRendererSkin;
    __reflect(vipBtnRendererSkin.prototype, "ui.vipBtnRendererSkin");
})(ui || (ui = {}));
