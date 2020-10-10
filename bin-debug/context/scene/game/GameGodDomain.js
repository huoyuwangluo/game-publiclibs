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
    /**神域BOOS玩法 */
    var GameGodDomain = (function (_super) {
        __extends(GameGodDomain, _super);
        function GameGodDomain() {
            return _super.call(this, TypeGame.GOD_DOMAIN) || this;
        }
        GameGodDomain.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 2;
        };
        return GameGodDomain;
    }(s.GameEveryBoss));
    s.GameGodDomain = GameGodDomain;
    __reflect(GameGodDomain.prototype, "s.GameGodDomain");
})(s || (s = {}));
