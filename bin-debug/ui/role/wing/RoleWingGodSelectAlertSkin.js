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
    var RoleWingGodSelectAlertSkin = (function (_super) {
        __extends(RoleWingGodSelectAlertSkin, _super);
        function RoleWingGodSelectAlertSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.RoleWingGodSelectAlertSkin';
            return _this;
        }
        return RoleWingGodSelectAlertSkin;
    }(base.View));
    ui.RoleWingGodSelectAlertSkin = RoleWingGodSelectAlertSkin;
    __reflect(RoleWingGodSelectAlertSkin.prototype, "ui.RoleWingGodSelectAlertSkin");
})(ui || (ui = {}));
