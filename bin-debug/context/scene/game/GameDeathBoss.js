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
    var GameDeathBoss = (function (_super) {
        __extends(GameDeathBoss, _super);
        function GameDeathBoss() {
            return _super.call(this, TypeGame.DEATH_BOSS) || this;
        }
        GameDeathBoss.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.sports;
        };
        GameDeathBoss.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 2;
        };
        return GameDeathBoss;
    }(s.GameWoorsBoss));
    s.GameDeathBoss = GameDeathBoss;
    __reflect(GameDeathBoss.prototype, "s.GameDeathBoss");
})(s || (s = {}));
