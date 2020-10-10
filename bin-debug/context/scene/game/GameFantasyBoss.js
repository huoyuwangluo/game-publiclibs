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
    var GameFantasyBoss = (function (_super) {
        __extends(GameFantasyBoss, _super);
        function GameFantasyBoss() {
            return _super.call(this, TypeGame.COPY_BOSS_FANTASY) || this;
        }
        GameFantasyBoss.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 5;
        };
        return GameFantasyBoss;
    }(s.GameEveryBoss));
    s.GameFantasyBoss = GameFantasyBoss;
    __reflect(GameFantasyBoss.prototype, "s.GameFantasyBoss");
})(s || (s = {}));
