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
    var GameCampBattleWar = (function (_super) {
        __extends(GameCampBattleWar, _super);
        function GameCampBattleWar() {
            return _super.call(this, TypeGame.CAMP_BATTLE_WAR) || this;
        }
        GameCampBattleWar.prototype.enter = function (battleId) {
            if (battleId === void 0) { battleId = 0; }
            _super.prototype.enter.call(this);
            this._scene.clear(true);
            this.enterMap(22011);
            this._battleId = battleId;
        };
        GameCampBattleWar.prototype.exit = function () {
            this._player.remove();
            utils.timer.clear(this, this.end);
            copy.GameCampBattleUI.instance.exit();
            _super.prototype.exit.call(this);
            this._scene.clear(true);
        };
        GameCampBattleWar.prototype.start = function () {
            this._player.stop();
            _super.prototype.start.call(this);
            copy.GameCampBattleUI.instance.enter(this._battleId);
        };
        GameCampBattleWar.prototype.displayMyPlayer = function () {
            _super.prototype.displayMyPlayer.call(this, s.AISmartSync);
            //this._player.initialize(GameModels.user.player);
            this._scene.cameraManager.lookAtCenterFix(30, 50);
        };
        GameCampBattleWar.prototype.stop = function () {
            utils.timer.clearAll(this);
            this._scene.offDropClear();
            this._player.stop();
            this._scene.stop();
            _super.prototype.stop.call(this);
        };
        GameCampBattleWar.prototype.endHandler = function (result, totalStar, dropItems) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this.end(result, totalStar, dropItems);
        };
        return GameCampBattleWar;
    }(s.GameSightsBase));
    s.GameCampBattleWar = GameCampBattleWar;
    __reflect(GameCampBattleWar.prototype, "s.GameCampBattleWar");
})(s || (s = {}));
