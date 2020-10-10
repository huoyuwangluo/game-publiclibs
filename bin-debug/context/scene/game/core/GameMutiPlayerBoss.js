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
    /**多人BOSS副本 */
    var GameMutiPlayerBoss = (function (_super) {
        __extends(GameMutiPlayerBoss, _super);
        function GameMutiPlayerBoss(type) {
            return _super.call(this, type) || this;
        }
        GameMutiPlayerBoss.prototype.enter = function (copyVO) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this._copyVO = copyVO;
            _super.prototype.enter.call(this);
            this._scene.clear(true);
            this.enterMap(this._copyVO.template.map);
        };
        GameMutiPlayerBoss.prototype.exit = function () {
            this._player.offDeadAll();
            mg.alertManager.closeALert();
            mo.ModelGameBoss.IMMEDIATELY_REVIVE = false;
            this._objectTouchEnabled = false;
            _super.prototype.exit.call(this);
        };
        GameMutiPlayerBoss.prototype.start = function () {
            _super.prototype.start.call(this);
            this._player.damgeEnabled = false;
            this._player.autoAttack = false;
            //this._player.onDead(this, this.userDeadHandler);
            //this._player.onPetAllDead(this, this.userDeadHandler);
            //this._player.onRelife(this, this.userRelifeHandler);
            if (!this._player.isTeamAllDead) {
                //this._player.start();
            }
            else {
                //this._player.deadActionImmediately();
                if (GameModels.scene.killerObjectId) {
                    this.userDeadHandler(GameModels.scene.getObjectByUId(GameModels.scene.killerObjectId), "");
                }
            }
            GameModels.scene.onObjectTeamStatusChange(this, this.sightStatusHandler);
            _super.prototype.startHandler.call(this);
        };
        GameMutiPlayerBoss.prototype.stop = function () {
            GameModels.scene.offObjectTeamStatusChange(this, this.sightStatusHandler);
            this._player.stop();
            this._player.remove();
            //this._player.offDead(this, this.userDeadHandler);
            //this._player.offRelife(this, this.userRelifeHandler);
            _super.prototype.stop.call(this);
        };
        GameMutiPlayerBoss.prototype.enableObjectsTap = function () {
            this._objectTouchEnabled = true;
        };
        GameMutiPlayerBoss.prototype.disableObjectsTap = function () {
            this._objectTouchEnabled = false;
        };
        // //--------------------Move-------------------
        // public startMove(tileX: number, tileY: number) {
        // 	if (this._player) {
        // 		this._player.target = null;
        // 		this._player.movePathTo(tileX, tileY);
        // 	}
        // }
        // protected stopMove() {
        // 	this._player.clearMovePath();
        // }
        // //--------------------Attack-------------------
        // public startAttack(smartVO: vo.GameSmartVO) {
        // 	if (this.selectTarget(smartVO)) return;
        // 	var node: PF.Node = this._scene.getNode(smartVO.tileX, smartVO.tileY);
        // 	if (!node) return;
        // 	this._player.movePathTo(node.x, node.y);
        // 	this._player.onTileChange(this, this.playerTileChangeHandler);
        // }
        // protected stopAttack() {
        // 	this._player.offTileChange(this, this.playerTileChangeHandler);
        // 	this._modelScene.syncTarget(null);
        // }
        // protected selectTarget(smartVO: vo.GameSmartVO) {
        // 	var object: SmartObject = this.getObjectByVO(smartVO);
        // 	if (object) {
        // 		this._modelScene.syncTarget(object.vo);
        // 		return true;
        // 	}
        // 	return false;
        // }
        // protected playerTileChangeHandler() {
        // 	if (this.selectTarget(this._player.vo.target as vo.GamePlayerVO)) {
        // 		this._player.clearMovePath();
        // 		this._player.offTileChange(this, this.playerTileChangeHandler);
        // 	}
        // }
        //--------------------------------------------
        /*protected addPlayerToSight(playerVO: vo.GamePlayerVO) {
            var player: GamePlayer = super.addPlayerToSight(playerVO)
            player.onDead(this, this.otherPlayerDeadHandler, player.vo);
            player.onRelife(this, this.otherPlayerRelifeHandler, player.vo);
            return player;
        }

        protected removeObjectFromSight(smartVO: vo.GameSmartVO) {
            var smartObject: SmartObject = super.removeObjectFromSight(smartVO);
            if (smartObject instanceof GamePlayer) {
                smartObject.offDead(this, this.otherPlayerDeadHandler);
                smartObject.offRelife(this, this.otherPlayerRelifeHandler);
            }
            return smartObject;
        }*/
        GameMutiPlayerBoss.prototype.addMonsterToSight = function (monsterVO) {
            var monster = _super.prototype.addMonsterToSight.call(this, monsterVO);
            if (this._objectTouchEnabled) {
                monster.addEventListener(egret.TouchEvent.TOUCH_TAP, this.objectTouchHandler, this);
                monster.tapEnabled = true;
            }
            return monster;
        };
        /**状态变化 */
        GameMutiPlayerBoss.prototype.sightStatusHandler = function (smartVO, status, killerVO, lostContent) {
            if (smartVO instanceof vo.GamePlayerVO) {
                if (smartVO == this._player.vo) {
                    if (status) {
                        this.userRelifeHandler();
                    }
                    else {
                        this.userDeadHandler(killerVO, lostContent);
                    }
                }
                else {
                    if (status) {
                        this.otherPlayerRelifeHandler(smartVO);
                    }
                    else {
                        this.otherPlayerDeadHandler(smartVO, killerVO, lostContent);
                    }
                }
            }
        };
        /**玩家死亡 */
        GameMutiPlayerBoss.prototype.userDeadHandler = function (killerVO, lostContent) {
            //if(!this._player.isTeamAllDead()) return;
            //this._player.stop();
            if (mo.ModelGameBoss.IMMEDIATELY_REVIVE) {
                GameModels.scene.requestRelife(1);
                return;
            }
            var killerName = 'BOSS';
            if (killerVO instanceof vo.GamePlayerVO) {
                killerName = killerVO.name;
            }
            copy.CopyMainView.instance.relifeView.show(killerName, "", 15, 20, this, function (useGold) {
                GameModels.scene.requestRelife(useGold ? 1 : 0);
            });
        };
        /**玩家复活 */
        GameMutiPlayerBoss.prototype.userRelifeHandler = function () {
            mg.alertManager.closeALert();
            GameModels.user.player.resetState();
            //this._player.initialize(GameModels.user.player);
            this._player.damgeEnabled = false;
            this._player.effectEnabled = true;
            //this._player.autoAttack = false;
            this._player.setTile(this._scene.getNode(GameModels.user.player.tileX, GameModels.user.player.tileY));
            this._player.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
            this._player.petGroup.formatPosition(this._player.direct, this._player.tileNode);
            //this._player.target = null;
            this._player.refreshTeamLeader();
            this._player.start();
        };
        /**其他玩家死亡 */
        GameMutiPlayerBoss.prototype.otherPlayerDeadHandler = function (bodyVO, killerVO, lostContent) {
            if (killerVO == this._player.vo) {
                mg.alertManager.tip(Language.getExpression(Language.E_CGJS1, bodyVO.name));
            }
        };
        /**其他玩家复活 */
        GameMutiPlayerBoss.prototype.otherPlayerRelifeHandler = function (bodyVO) {
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
                //player.target = null;
                player.refreshTeamLeader();
                player.start();
            }
        };
        return GameMutiPlayerBoss;
    }(s.GameSightsBase));
    s.GameMutiPlayerBoss = GameMutiPlayerBoss;
    __reflect(GameMutiPlayerBoss.prototype, "s.GameMutiPlayerBoss");
})(s || (s = {}));
