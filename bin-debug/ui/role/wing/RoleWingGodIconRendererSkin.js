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
    var RoleWingGodIconRendererSkin = (function (_super) {
        __extends(RoleWingGodIconRendererSkin, _super);
        function RoleWingGodIconRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.RoleWingGodIconRendererSkin';
            return _this;
        }
        return RoleWingGodIconRendererSkin;
    }(base.ItemRenderer));
    ui.RoleWingGodIconRendererSkin = RoleWingGodIconRendererSkin;
    __reflect(RoleWingGodIconRendererSkin.prototype, "ui.RoleWingGodIconRendererSkin");
})(ui || (ui = {}));
