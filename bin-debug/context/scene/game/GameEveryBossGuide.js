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
    var GameEveryBossGuide = (function (_super) {
        __extends(GameEveryBossGuide, _super);
        function GameEveryBossGuide() {
            return _super.call(this, TypeGame.EVERYONE_BOSS_GUIDE) || this;
        }
        return GameEveryBossGuide;
    }(s.GameEveryBoss));
    s.GameEveryBossGuide = GameEveryBossGuide;
    __reflect(GameEveryBossGuide.prototype, "s.GameEveryBossGuide");
})(s || (s = {}));
