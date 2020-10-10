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
    /**魔界入侵玩法 */
    var GameDemonIntrusion = (function (_super) {
        __extends(GameDemonIntrusion, _super);
        function GameDemonIntrusion() {
            return _super.call(this, TypeGame.DEMON_INTRUSION) || this;
        }
        return GameDemonIntrusion;
    }(s.GameEveryBoss));
    s.GameDemonIntrusion = GameDemonIntrusion;
    __reflect(GameDemonIntrusion.prototype, "s.GameDemonIntrusion");
})(s || (s = {}));
