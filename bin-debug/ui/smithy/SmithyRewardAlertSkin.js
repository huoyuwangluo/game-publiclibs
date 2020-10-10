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
    var SmithyRewardAlertSkin = (function (_super) {
        __extends(SmithyRewardAlertSkin, _super);
        function SmithyRewardAlertSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.SmithyRewardAlertSkin';
            return _this;
        }
        return SmithyRewardAlertSkin;
    }(base.View));
    ui.SmithyRewardAlertSkin = SmithyRewardAlertSkin;
    __reflect(SmithyRewardAlertSkin.prototype, "ui.SmithyRewardAlertSkin");
})(ui || (ui = {}));
