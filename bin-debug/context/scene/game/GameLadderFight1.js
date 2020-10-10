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
    var GameLadderFight1 = (function (_super) {
        __extends(GameLadderFight1, _super);
        function GameLadderFight1() {
            var _this = _super.call(this, TypeGame.LADDER_FIGHT1) || this;
            _this._countdownValue = 3;
            return _this;
        }
        GameLadderFight1.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.sports;
        };
        GameLadderFight1.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 1;
        };
        GameLadderFight1.prototype.enter = function (mapId) {
            _super.prototype.enter.call(this, 27002);
        };
        GameLadderFight1.prototype.displayMyPlayer = function () {
            //super.displayMyPlayer(AISmartSync);
            this._player.initialize(GameModels.user.player);
            this._player.showStartProAdd();
        };
        return GameLadderFight1;
    }(s.GameSiginPlayerBoss));
    s.GameLadderFight1 = GameLadderFight1;
    __reflect(GameLadderFight1.prototype, "s.GameLadderFight1");
})(s || (s = {}));
