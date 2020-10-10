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
    var WelcomeDialogSkin = (function (_super) {
        __extends(WelcomeDialogSkin, _super);
        function WelcomeDialogSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.WelcomeDialogSkin';
            return _this;
        }
        return WelcomeDialogSkin;
    }(base.View));
    ui.WelcomeDialogSkin = WelcomeDialogSkin;
    __reflect(WelcomeDialogSkin.prototype, "ui.WelcomeDialogSkin");
})(ui || (ui = {}));
