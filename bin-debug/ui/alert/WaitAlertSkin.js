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
    var WaitAlertSkin = (function (_super) {
        __extends(WaitAlertSkin, _super);
        function WaitAlertSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.WaitAlertSkin';
            return _this;
        }
        return WaitAlertSkin;
    }(base.View));
    ui.WaitAlertSkin = WaitAlertSkin;
    __reflect(WaitAlertSkin.prototype, "ui.WaitAlertSkin");
})(ui || (ui = {}));
