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
    var GameKingWar = (function (_super) {
        __extends(GameKingWar, _super);
        function GameKingWar(type) {
            var _this = _super.call(this, TypeGame.KING_WAR) || this;
            _this._countdownValue = 3;
            return _this;
        }
        GameKingWar.prototype.enter = function (mapId) {
            _super.prototype.enter.call(this, mapId);
            mg.soundManager.playBackGround("bgm_tianti");
        };
        GameKingWar.prototype.getExitAutoOpenUI = function () {
            GameModels.kingwar.fightCityId = GameModels.kingwar.cityDetailCityId;
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.kingwar;
        };
        GameKingWar.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
        };
        return GameKingWar;
    }(s.GameSiginPlayerBoss));
    s.GameKingWar = GameKingWar;
    __reflect(GameKingWar.prototype, "s.GameKingWar");
})(s || (s = {}));
