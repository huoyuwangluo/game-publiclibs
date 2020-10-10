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
    var CheckShenMiShopAlertSkin = (function (_super) {
        __extends(CheckShenMiShopAlertSkin, _super);
        function CheckShenMiShopAlertSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.CheckShenMiShopAlertSkin';
            return _this;
        }
        return CheckShenMiShopAlertSkin;
    }(base.View));
    ui.CheckShenMiShopAlertSkin = CheckShenMiShopAlertSkin;
    __reflect(CheckShenMiShopAlertSkin.prototype, "ui.CheckShenMiShopAlertSkin");
})(ui || (ui = {}));
