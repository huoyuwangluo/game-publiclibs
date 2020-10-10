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
    var MainBossRefreshTipSkin = (function (_super) {
        __extends(MainBossRefreshTipSkin, _super);
        function MainBossRefreshTipSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'skin.MainBossRefreshTipSkin';
            return _this;
        }
        return MainBossRefreshTipSkin;
    }(base.View));
    ui.MainBossRefreshTipSkin = MainBossRefreshTipSkin;
    __reflect(MainBossRefreshTipSkin.prototype, "ui.MainBossRefreshTipSkin");
})(ui || (ui = {}));
