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
    /**节日boss玩法 */
    var GameHolidayBoss = (function (_super) {
        __extends(GameHolidayBoss, _super);
        function GameHolidayBoss() {
            return _super.call(this, TypeGame.HOLIDAY_BOSS) || this;
        }
        GameHolidayBoss.prototype.getExitAutoOpenUI = function () {
            return "";
        };
        return GameHolidayBoss;
    }(s.GameEveryBoss));
    s.GameHolidayBoss = GameHolidayBoss;
    __reflect(GameHolidayBoss.prototype, "s.GameHolidayBoss");
})(s || (s = {}));
