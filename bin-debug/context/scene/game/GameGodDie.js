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
    var GameGodDie = (function (_super) {
        __extends(GameGodDie, _super);
        function GameGodDie(type) {
            if (type === void 0) { type = 0; }
            return _super.call(this, type ? type : TypeGame.GOD_DIE) || this;
        }
        GameGodDie.prototype.enter = function () {
            mo.ModelGameBoss.IMMEDIATELY_REVIVE = true;
            this._isEnter = true;
            this._isEnterOver = false;
            this._battleModel = GameModels.sceneGodDie;
            this._objectTouchEnabled = true;
            this._scene.clear(true);
            this.enterMap(29001);
        };
        GameGodDie.prototype.exit = function () {
            GameModels.sceneGodDie.exit();
            copy.GameGodDieUI.instance.exit();
            this._player.focusMode = false;
            _super.prototype.exit.call(this);
            this.removeSelectEffects();
            this._player.remove();
            this._scene.manager.clear();
            this._scene.clear(true);
            this._player.vo.offTeamTileChange(this, this.updateSelectedBoss);
        };
        GameGodDie.prototype.start = function () {
            _super.prototype.start.call(this);
            this._player.vo.onTeamTileChange(this, this.updateSelectedBoss);
            copy.GameGodDieUI.instance.enter(this._modelScene, utils.Handler.create(this, this.startAttack, null, false));
            GameModels.sceneGodDie.enableSight();
        };
        GameGodDie.prototype.displayMyPlayer = function () {
            _super.prototype.displayMyPlayer.call(this);
            this._player.petGroup.formatPosition(((this._player.direct / 2) >> 0) * 2);
            this._player.autoAttack = false;
            this.enableControl();
        };
        GameGodDie.prototype.stop = function () {
            this._player.offDeadAll();
            this.disableControl();
            _super.prototype.stop.call(this);
        };
        /**其他玩家死亡 */
        GameGodDie.prototype.otherPlayerDeadHandler = function (bodyVO, killerVO, lostContent) {
            _super.prototype.otherPlayerDeadHandler.call(this, bodyVO, killerVO, lostContent);
            if (this._player.target && this._player.target.vo == bodyVO) {
                this._player.target = null;
                this._modelScene.syncTarget(null);
            }
        };
        GameGodDie.prototype.objectTouchHandler = function (e) {
            var target = e.currentTarget;
            this.startAttack(target.vo);
        };
        //public updateSelectedBoss(body: SmartObject, tile: PF.Node) {
        GameGodDie.prototype.updateSelectedBoss = function () {
            //if (body && body.vo) GameModels.scene.syncPosition(this._type,body.vo.uid, body.tileNode.x, body.tileNode.y);
            if (this._player == null)
                return;
            var leader = this._player.getTeamLeader();
            if (leader == null)
                return;
            var bosses = GameModels.sceneGodDie.getAllBosses();
            for (var i = 0; i < bosses.length; i++) {
                if (Math.abs(bosses[i].tileX - leader.tileX) < 10 && Math.abs(bosses[i].tileY - leader.tileY) < 10) {
                    copy.GameGodDieUI.instance.showBossInfo(bosses[i]);
                    return;
                }
            }
            copy.GameGodDieUI.instance.showBossInfo(null);
        };
        GameGodDie.prototype.removeSelectEffects = function () {
            if (this._selectEffectList) {
                for (var _i = 0, _a = this._selectEffectList; _i < _a.length; _i++) {
                    var effect = _a[_i];
                    effect.stop();
                    utils.ObjectPool.to(effect, true);
                }
                this._selectEffectList.length = 0;
            }
        };
        //--------------------------------------------
        GameGodDie.prototype.endHandler = function (result, totalStar, dropItems) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            mg.alertManager.tip(Language.J_PLZYM);
            utils.timer.once(3000, this, function () {
                this.end(result, totalStar, dropItems, args);
            });
        };
        return GameGodDie;
    }(s.GameMutiPlayerBoss));
    s.GameGodDie = GameGodDie;
    __reflect(GameGodDie.prototype, "s.GameGodDie");
})(s || (s = {}));
