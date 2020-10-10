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
    var RoleZhanQiWishSkin = (function (_super) {
        __extends(RoleZhanQiWishSkin, _super);
        function RoleZhanQiWishSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.RoleZhanQiWishSkin';
            return _this;
        }
        return RoleZhanQiWishSkin;
    }(base.View));
    ui.RoleZhanQiWishSkin = RoleZhanQiWishSkin;
    __reflect(RoleZhanQiWishSkin.prototype, "ui.RoleZhanQiWishSkin");
})(ui || (ui = {}));
