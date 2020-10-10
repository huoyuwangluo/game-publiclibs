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
    var RoleZhuZhanPreviewSkin = (function (_super) {
        __extends(RoleZhuZhanPreviewSkin, _super);
        function RoleZhuZhanPreviewSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'RoleZhuZhanPreviewSkin';
            return _this;
        }
        return RoleZhuZhanPreviewSkin;
    }(base.View));
    ui.RoleZhuZhanPreviewSkin = RoleZhuZhanPreviewSkin;
    __reflect(RoleZhuZhanPreviewSkin.prototype, "ui.RoleZhuZhanPreviewSkin");
})(ui || (ui = {}));
