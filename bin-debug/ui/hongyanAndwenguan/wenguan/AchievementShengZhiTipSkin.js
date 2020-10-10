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
    var AchievementShengZhiTipSkin = (function (_super) {
        __extends(AchievementShengZhiTipSkin, _super);
        function AchievementShengZhiTipSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.AchievementShengZhiTipSkin';
            return _this;
        }
        return AchievementShengZhiTipSkin;
    }(base.View));
    ui.AchievementShengZhiTipSkin = AchievementShengZhiTipSkin;
    __reflect(AchievementShengZhiTipSkin.prototype, "ui.AchievementShengZhiTipSkin");
})(ui || (ui = {}));
