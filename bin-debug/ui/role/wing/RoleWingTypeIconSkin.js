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
    var RoleWingTypeIconSkin = (function (_super) {
        __extends(RoleWingTypeIconSkin, _super);
        function RoleWingTypeIconSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'normal.RoleWingTypeIconSkin';
            return _this;
        }
        return RoleWingTypeIconSkin;
    }(base.View));
    ui.RoleWingTypeIconSkin = RoleWingTypeIconSkin;
    __reflect(RoleWingTypeIconSkin.prototype, "ui.RoleWingTypeIconSkin");
})(ui || (ui = {}));