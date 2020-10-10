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
    var XingYingDuoBaoGetAlertSkin = (function (_super) {
        __extends(XingYingDuoBaoGetAlertSkin, _super);
        function XingYingDuoBaoGetAlertSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'XingYingDuoBaoGetAlertSkin';
            return _this;
        }
        return XingYingDuoBaoGetAlertSkin;
    }(base.View));
    ui.XingYingDuoBaoGetAlertSkin = XingYingDuoBaoGetAlertSkin;
    __reflect(XingYingDuoBaoGetAlertSkin.prototype, "ui.XingYingDuoBaoGetAlertSkin");
})(ui || (ui = {}));
