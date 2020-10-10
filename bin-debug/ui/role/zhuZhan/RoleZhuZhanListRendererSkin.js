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
    var RoleZhuZhanListRendererSkin = (function (_super) {
        __extends(RoleZhuZhanListRendererSkin, _super);
        function RoleZhuZhanListRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.RoleZhuZhanListRendererSkin';
            return _this;
        }
        return RoleZhuZhanListRendererSkin;
    }(base.ItemRenderer));
    ui.RoleZhuZhanListRendererSkin = RoleZhuZhanListRendererSkin;
    __reflect(RoleZhuZhanListRendererSkin.prototype, "ui.RoleZhuZhanListRendererSkin");
})(ui || (ui = {}));
