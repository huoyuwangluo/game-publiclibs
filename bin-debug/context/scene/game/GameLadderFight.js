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
    var GameLadderFight = (function (_super) {
        __extends(GameLadderFight, _super);
        function GameLadderFight(type) {
            if (type === void 0) { type = 0; }
            var _this = _super.call(this, type ? type : TypeGame.LADDER_FIGHT) || this;
            _this._countdownValue = 3;
            return _this;
        }
        GameLadderFight.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.sports;
        };
        GameLadderFight.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
        };
        GameLadderFight.prototype.enter = function (mapId) {
            _super.prototype.enter.call(this, 27001);
        };
        return GameLadderFight;
    }(s.GameSiginPlayerBoss));
    s.GameLadderFight = GameLadderFight;
    __reflect(GameLadderFight.prototype, "s.GameLadderFight");
})(s || (s = {}));
