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
    var AchievementTuJianDialogSkin = (function (_super) {
        __extends(AchievementTuJianDialogSkin, _super);
        function AchievementTuJianDialogSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'skins.AchievementTuJianDialogSkin';
            return _this;
        }
        return AchievementTuJianDialogSkin;
    }(base.View));
    ui.AchievementTuJianDialogSkin = AchievementTuJianDialogSkin;
    __reflect(AchievementTuJianDialogSkin.prototype, "ui.AchievementTuJianDialogSkin");
})(ui || (ui = {}));
