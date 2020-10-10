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
    var RoleEquiptSkin = (function (_super) {
        __extends(RoleEquiptSkin, _super);
        function RoleEquiptSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'normal.RoleEquiptSkin';
            return _this;
        }
        return RoleEquiptSkin;
    }(base.View));
    ui.RoleEquiptSkin = RoleEquiptSkin;
    __reflect(RoleEquiptSkin.prototype, "ui.RoleEquiptSkin");
})(ui || (ui = {}));
