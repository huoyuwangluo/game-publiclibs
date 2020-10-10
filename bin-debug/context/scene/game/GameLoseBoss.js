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
var s;
(function (s) {
    var GameLoseBoss = (function (_super) {
        __extends(GameLoseBoss, _super);
        function GameLoseBoss() {
            return _super.call(this, TypeGame.LOSE_BOSS) || this;
        }
        GameLoseBoss.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 4;
        };
        return GameLoseBoss;
    }(s.GameEveryBoss));
    s.GameLoseBoss = GameLoseBoss;
    __reflect(GameLoseBoss.prototype, "s.GameLoseBoss");
})(s || (s = {}));
