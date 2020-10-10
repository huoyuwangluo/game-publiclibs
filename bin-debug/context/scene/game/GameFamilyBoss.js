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
    /**Boss之家 */
    var GameFamilyBoss = (function (_super) {
        __extends(GameFamilyBoss, _super);
        function GameFamilyBoss() {
            return _super.call(this, TypeGame.FAMILY_BOSS) || this;
        }
        GameFamilyBoss.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 3;
        };
        return GameFamilyBoss;
    }(s.GameEveryBoss));
    s.GameFamilyBoss = GameFamilyBoss;
    __reflect(GameFamilyBoss.prototype, "s.GameFamilyBoss");
})(s || (s = {}));
