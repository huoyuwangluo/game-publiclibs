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
    var GameTeamCopyFight = (function (_super) {
        __extends(GameTeamCopyFight, _super);
        function GameTeamCopyFight(type) {
            return _super.call(this, TypeGame.TEAM_COPY_FIGHT) || this;
        }
        GameTeamCopyFight.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.material;
        };
        GameTeamCopyFight.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 1;
        };
        GameTeamCopyFight.prototype.enter = function (copyVO) {
            _super.prototype.enter.call(this);
            this._copyVO = copyVO;
            //Loading.instance.add();
            //Loading.instance.updateProgress(1);
            this._scene.clear(true);
            this.enterMap(copyVO.template.map);
        };
        GameTeamCopyFight.prototype.exit = function () {
            copy.GameTeamCopyUI.instance.exit();
            _super.prototype.exit.call(this);
        };
        GameTeamCopyFight.prototype.start = function () {
            var _this = this;
            //Loading.instance.remove();
            _super.prototype.start.call(this);
            this._player.come(500);
            s.CopyTimerCountDown.instance.start(3, this, function () {
                s.CopyTimerCountDown.instance.stop();
                _this.startHandler();
            });
            copy.GameTeamCopyUI.instance.enter(this._player);
            GameModels.scene.onObjectTeamStatusChange(this, this.sightStatusHandler);
        };
        GameTeamCopyFight.prototype.displayMyPlayer = function () {
            _super.prototype.displayMyPlayer.call(this);
            this.enableControl();
        };
        GameTeamCopyFight.prototype.startHandler = function () {
            GameModels.scene.startGame();
            this._player.autoAttack = true;
            this._player.start();
            _super.prototype.startHandler.call(this);
        };
        GameTeamCopyFight.prototype.stop = function () {
            GameModels.scene.offObjectTeamStatusChange(this, this.sightStatusHandler);
            s.CopyTimerCountDown.instance.stop();
            this._player.stop();
            this._player.remove();
            utils.timer.clearAll(this);
            this._scene.offDropClear();
            _super.prototype.stop.call(this);
        };
        /**是否为敌方单位 */
        GameTeamCopyFight.prototype.isEnemyObject = function (fs, target) {
            if (fs == target || fs == null || target == null)
                return false;
            var ret = false;
            if (TypeActor.isPlayerOrPet(fs.type) && TypeActor.isMonster(target.type)) {
                ret = true;
            }
            else if (TypeActor.isPlayerOrPet(target.type) && TypeActor.isMonster(fs.type)) {
                ret = true;
            }
            return ret;
        };
        GameTeamCopyFight.prototype.addMonsterToSight = function (monsterVO) {
            var monster = _super.prototype.addMonsterToSight.call(this, monsterVO);
            if (monster.vo.type == TypeActor.BOSS) {
                copy.CopyMainView.instance.showBossBlood(monster.vo);
            }
            //monster.onDead(this,this.monsterDeadHandler,monster);
            return monster;
        };
        /*
        private monsterDeadHandler(monster:GameMonster,killerVO:vo.GameSmartVO){
            monster.stop();
            monster.offDead(this,this.monsterDeadHandler);
            egret.Tween.removeTweens(monster);
            var killer:s.SmartObject=this._scene.getActorByVO(killerVO);
            var angle:number=utils.MathUtil.getLAngle(monster.x-killer.x,monster.y-killer.y);
            var point:egret.Point=utils.MathUtil.getLinePointByAngle(monster.x,monster.y,120,angle)
            egret.Tween.get(monster).to({x:point.x,y:point.y},800,utils.Ease.quadOut);
        }

         protected removeObjectFromSight(smartVO:vo.GameSmartVO){
             var smartObject:SmartObject=super.removeObjectFromSight(smartVO);
             if(smartObject)egret.Tween.removeTweens(smartObject);
             return smartObject;
         }
         */
        /**状态变化 */
        GameTeamCopyFight.prototype.sightStatusHandler = function (smartVO, status, killerVO, lostContent) {
            if (smartVO instanceof vo.GamePlayerVO) {
                if (smartVO == this._player.vo) {
                    if (status) {
                        this.userRelifeHandler();
                    }
                    else {
                        this.userDeadHandler(killerVO);
                    }
                }
                else {
                    if (status) {
                        this.otherPlayerRelifeHandler(smartVO);
                    }
                    else {
                        this.otherPlayerDeadHandler(smartVO, killerVO);
                    }
                }
            }
        };
        /**玩家死亡 */
        GameTeamCopyFight.prototype.userDeadHandler = function (killerVO) {
            copy.CopyMainView.instance.relifeView.show(killerVO ? killerVO.name : "BOSS", "", 15, 20, this, function (useGold) {
                GameModels.scene.requestRelife(useGold ? 1 : 0);
            });
        };
        /**玩家复活 */
        GameTeamCopyFight.prototype.userRelifeHandler = function () {
            mg.alertManager.closeALert();
            GameModels.user.player.resetState();
            //this._player.initialize(GameModels.user.player);
            this._player.damgeEnabled = false;
            this._player.effectEnabled = true;
            this._player.autoAttack = true;
            this._player.setTile(this._scene.getNode(GameModels.user.player.tileX, GameModels.user.player.tileY));
            this._player.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
            this._player.petGroup.formatPosition(this._player.direct, this._player.tileNode);
            this._player.target = null;
            this._player.refreshTeamLeader();
            this._player.start();
        };
        /**其他玩家死亡 */
        GameTeamCopyFight.prototype.otherPlayerDeadHandler = function (bodyVO, killerVO) {
        };
        /**其他玩家复活 */
        GameTeamCopyFight.prototype.otherPlayerRelifeHandler = function (bodyVO) {
            var player = this.getObjectByVO(bodyVO);
            if (player) {
                bodyVO.resetState();
                //player.initialize(bodyVO);
                player.damgeEnabled = false;
                player.effectEnabled = false;
                player.autoAttack = false;
                player.setTile(this._scene.getNode(bodyVO.tileX, bodyVO.tileY));
                player.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
                player.petGroup.formatPosition(player.direct, player.tileNode);
                player.target = null;
                player.refreshTeamLeader();
                player.start();
            }
        };
        return GameTeamCopyFight;
    }(s.GameSightsBase));
    s.GameTeamCopyFight = GameTeamCopyFight;
    __reflect(GameTeamCopyFight.prototype, "s.GameTeamCopyFight");
})(s || (s = {}));
