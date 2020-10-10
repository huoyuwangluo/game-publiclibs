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
    var GameTopBattleRoom = (function (_super) {
        __extends(GameTopBattleRoom, _super);
        function GameTopBattleRoom() {
            return _super.call(this, TypeGame.TOP_BATTLE_ROOM) || this;
        }
        GameTopBattleRoom.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.topBattle;
        };
        GameTopBattleRoom.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 1;
        };
        GameTopBattleRoom.prototype.enter = function () {
            _super.prototype.enter.call(this);
            //Loading.instance.add();
            //Loading.instance.updateProgress(1);
            this._scene.clear(true);
            this.enterMap(27001);
        };
        GameTopBattleRoom.prototype.exit = function () {
            this._player.remove();
            utils.timer.clear(this, this.end);
            _super.prototype.exit.call(this);
            this._scene.clear(true);
        };
        GameTopBattleRoom.prototype.start = function () {
            this._player.stop();
            //Loading.instance.remove();
            _super.prototype.start.call(this);
            var startX = 22;
            var startY = 37;
            if (this._view.scene.data.born != null) {
                startX = this._view.scene.data.born.x;
                startY = this._view.scene.data.born.y;
            }
            else {
                startX = this._player.vo.tileX;
                startY = this._player.vo.tileY;
            }
            this._scene.cameraManager.lookAtCenterFix(startX + 2, startY - 6);
        };
        GameTopBattleRoom.prototype.displayMyPlayer = function () {
            _super.prototype.displayMyPlayer.call(this, s.AISmartSync);
            //this._scene.cameraManager.lookAtCenterFix(30, 50);
            //this._player.initialize(GameModels.user.player);
        };
        GameTopBattleRoom.prototype.stop = function () {
            utils.timer.clearAll(this);
            this._scene.offDropClear();
            this._player.stop();
            this._scene.stop();
            _super.prototype.stop.call(this);
        };
        GameTopBattleRoom.prototype.endHandler = function (result, totalStar, dropItems) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this.end(result, totalStar, dropItems);
        };
        return GameTopBattleRoom;
    }(s.GameSightsBase));
    s.GameTopBattleRoom = GameTopBattleRoom;
    __reflect(GameTopBattleRoom.prototype, "s.GameTopBattleRoom");
})(s || (s = {}));
