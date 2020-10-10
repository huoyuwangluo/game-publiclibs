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
    var TopBattleMyGuessListSkin = (function (_super) {
        __extends(TopBattleMyGuessListSkin, _super);
        function TopBattleMyGuessListSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'TopBattleMyGuessListSkin';
            return _this;
        }
        return TopBattleMyGuessListSkin;
    }(base.View));
    ui.TopBattleMyGuessListSkin = TopBattleMyGuessListSkin;
    __reflect(TopBattleMyGuessListSkin.prototype, "ui.TopBattleMyGuessListSkin");
})(ui || (ui = {}));
