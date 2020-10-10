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
    var GamePeaksFight = (function (_super) {
        __extends(GamePeaksFight, _super);
        function GamePeaksFight() {
            return _super.call(this, TypeGame.PEAKS_FIGHT) || this;
        }
        GamePeaksFight.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.peaksBattle;
        };
        GamePeaksFight.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
        };
        GamePeaksFight.prototype.enter = function (enemyPlayerVO) {
            _super.prototype.enter.call(this);
            //Loading.instance.add();
            //Loading.instance.updateProgress(1);
            this._scene.clear(true);
            this.enterMap(2011);
        };
        GamePeaksFight.prototype.exit = function () {
            this._player.remove();
            utils.timer.clear(this, this.end);
            mg.alertManager.closeALert(WaitAlert);
            GameModels.scene.offSightSnap();
            _super.prototype.exit.call(this);
            this._scene.clear(true);
        };
        GamePeaksFight.prototype.start = function () {
            //Loading.instance.remove();
            _super.prototype.start.call(this);
            this._player.come(500);
            this.startHandler();
        };
        GamePeaksFight.prototype.startHandler = function () {
            GameModels.scene.startGame();
            this._player.autoAttack = false;
            this._player.start();
            if (GameModels.scene.sights.length) {
                this._player.targetVO = GameModels.scene.sights[0];
            }
            else {
                var labContent = Language.J_DDDSJR;
                mg.alertManager.showAlert(WaitAlert, false, true, labContent, 10);
            }
            _super.prototype.startHandler.call(this);
        };
        GamePeaksFight.prototype.displayMyPlayer = function () {
            _super.prototype.displayMyPlayer.call(this);
            this._player.autoAttack = true;
        };
        GamePeaksFight.prototype.stop = function () {
            utils.timer.clearAll(this);
            this._scene.offDropClear();
            this._player.stop();
            this._scene.stop();
            _super.prototype.stop.call(this);
        };
        GamePeaksFight.prototype.addPlayerToSight = function (playerVO) {
            var player = _super.prototype.addPlayerToSight.call(this, playerVO);
            this._player.targetVO = playerVO;
            mg.alertManager.closeALert(WaitAlert);
            return player;
        };
        GamePeaksFight.prototype.endHandler = function (result, totalStar, dropItems) {
            var _this = this;
            GameModels.ladder.requestFightList(utils.Handler.create(this, function () {
                if (result) {
                    _super.prototype.end.call(_this, result, totalStar, dropItems);
                }
                else {
                    _this.stop();
                    var roleVO = GameModels.ladder.getRoleLadderVO();
                    for (var i = 0; i < dropItems.length; i++) {
                        mg.alertManager.sourceTip(Language.getExpression(Language.E_HD1x2, dropItems[i].templateProp.name, dropItems[i].count), TypeQuality.getQualityColor(dropItems[i].quality));
                    }
                    utils.timer.once(2000, _this, _this.end, true, result, totalStar, dropItems);
                }
            }));
        };
        return GamePeaksFight;
    }(s.GameSightsBase));
    s.GamePeaksFight = GamePeaksFight;
    __reflect(GamePeaksFight.prototype, "s.GamePeaksFight");
})(s || (s = {}));
