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
    var RolePhantomStarSkin = (function (_super) {
        __extends(RolePhantomStarSkin, _super);
        function RolePhantomStarSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'item.RolePhantomStarSkin';
            return _this;
        }
        return RolePhantomStarSkin;
    }(base.View));
    ui.RolePhantomStarSkin = RolePhantomStarSkin;
    __reflect(RolePhantomStarSkin.prototype, "ui.RolePhantomStarSkin");
})(ui || (ui = {}));
