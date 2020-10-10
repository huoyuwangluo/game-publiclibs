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
    var PlayerDeadTipSkin = (function (_super) {
        __extends(PlayerDeadTipSkin, _super);
        function PlayerDeadTipSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'PlayerDeadTipSkin';
            return _this;
        }
        return PlayerDeadTipSkin;
    }(base.View));
    ui.PlayerDeadTipSkin = PlayerDeadTipSkin;
    __reflect(PlayerDeadTipSkin.prototype, "ui.PlayerDeadTipSkin");
})(ui || (ui = {}));
