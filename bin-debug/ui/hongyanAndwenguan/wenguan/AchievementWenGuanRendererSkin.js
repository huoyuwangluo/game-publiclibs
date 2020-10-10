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
    var AchievementWenGuanRendererSkin = (function (_super) {
        __extends(AchievementWenGuanRendererSkin, _super);
        function AchievementWenGuanRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.AchievementWenGuanRendererSkin';
            return _this;
        }
        return AchievementWenGuanRendererSkin;
    }(base.ItemRenderer));
    ui.AchievementWenGuanRendererSkin = AchievementWenGuanRendererSkin;
    __reflect(AchievementWenGuanRendererSkin.prototype, "ui.AchievementWenGuanRendererSkin");
})(ui || (ui = {}));
