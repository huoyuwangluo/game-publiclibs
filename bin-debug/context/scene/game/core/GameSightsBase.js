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
    /**带战场视野封装的玩法抽象类 */
    var GameSightsBase = (function (_super) {
        __extends(GameSightsBase, _super);
        function GameSightsBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isSupoortNPCState = false;
            return _this;
        }
        GameSightsBase.prototype.initialize = function (view) {
            _super.prototype.initialize.call(this, view);
            this._sights = [];
        };
        GameSightsBase.prototype.exit = function () {
            _super.prototype.exit.call(this);
            this.clearSights();
            GameModels.scene.clearSights();
            this._scene.manager.clear();
            this._scene.clear(true);
        };
        GameSightsBase.prototype.start = function () {
            GameModels.scene.onSightAdd(this, this.sightAddHandler);
            GameModels.scene.onSightRemove(this, this.sightRemoveHandler);
            GameModels.scene.onGameOver(this, this.endHandler);
            this.displayMyPlayer();
            this.displaySightObjects();
            this._scene.start();
            this.sightInitHandler();
            this._player.vo.xpState = TypeXpUp.STOP;
            this._player.vo.xpSetValue3_4();
        };
        GameSightsBase.prototype.startHandler = function () {
            _super.prototype.startHandler.call(this);
            //(this._player.vo as vo.GamePlayerVO).xpState = TypeXpUp.AUTO_UP;
            this._scene.lookAt(this._player.getTeamLeader(), false);
        };
        GameSightsBase.prototype.sightInitHandler = function () { };
        GameSightsBase.prototype.stop = function () {
            this._player.offSkillStart();
            this._player.offMoveStart();
            this._scene.stop();
            GameModels.scene.offSightAdd(this, this.sightAddHandler);
            GameModels.scene.offAllSightRemove();
            GameModels.scene.offGameOver();
        };
        GameSightsBase.prototype.displayMyPlayer = function (aiClass) {
            if (aiClass === void 0) { aiClass = null; }
            var direct = TypeDirection.UP;
            var smartObject = this._scene.getMinEnemy(this._player);
            if (smartObject) {
                //direct = TypeDirection.getDirection8(this._player.x, this._player.y, game.MapConfig.getReaX(smartObject.tileNode.x), game.MapConfig.getReaY(smartObject.tileNode.y));
                direct = TypeDirection.getDirection8(this._player.vo.tileX, this._player.vo.tileY, smartObject.tileNode.x, smartObject.tileNode.y);
            }
            //GameModels.user.player.resetState();
            GameModels.user.player.resetMergeState();
            //this._player.aiClass = AIPlayer;
            //this._player.petAIClass = AIPet;
            if (aiClass == null) {
                this._player.petAIClass = s.AISmartSync; //AITeamPet;
                this._player.aiClass = s.AISmartSync; //AITeamPet;
            }
            else {
                this._player.aiClass = aiClass;
                this._player.petAIClass = aiClass;
            }
            this._player.initialize(GameModels.user.player);
            this._player.scene = this._scene;
            this._player.setTile(this._scene.getNode(this._player.vo.tileX, this._player.vo.tileY));
            this._scene.addPlayer(this._player);
            /*this._scene.addPlayer(this._player);
            //this._player.actionTo(TypeAction.IDLE, direct);
            this._player.actionTo(TypeAction.IDLE);
            this._player.setTile(this._scene.getNode(this._player.vo.tileX, this._player.vo.tileY));
            this._scene.lookAt(this._player);
            */
            //this._player.updatePetTile();
            this._player.focusMode = true;
            this._player.damgeEnabled = false;
            this._player.effectEnabled = true;
            this._player.petGroup.effectEnabled = true;
            //this._player.petGroup.formatPosition(this._player.direct);
            //(this._player.vo as vo.GamePlayerVO).xpState = TypeXpUp.AUTO_UP;
            //(this._player.vo as vo.GamePlayerVO).xpSetValue3_4();
            this._player.hpAutoEnabled = false;
            if (this._player.aiClass == s.AITeamPet) {
                this._player.autoAttack = true;
                this._player.onSkillStart(this, this.skillCastHandler);
                this._player.onMoveStart(this, this.moveStartHandler);
            }
            else {
                this._player.autoAttack = false;
                this._player.offSkillStart();
                this._player.offMoveStart();
            }
            //var direct: number = TypeDirection.DOWN;
            //var smartObject: SmartObject = this._scene.getMinEnemy(this._player);
            //if (smartObject) {
            //    direct = TypeDirection.getDirection8(this._player.x, this._player.y, game.MapConfig.getReaX(smartObject.tileNode.x), game.MapConfig.getReaY(smartObject.tileNode.y))
            //}
            //this._player.actionTo(TypeAction.IDLE, direct);
            //this._player.petGroup.formatPosition(this._player.direct);
            this._player.refreshTeamLeader();
        };
        GameSightsBase.prototype.displaySightObjects = function () {
            for (var _i = 0, _a = GameModels.scene.sights; _i < _a.length; _i++) {
                var smartVO = _a[_i];
                if (smartVO instanceof vo.GamePlayerVO) {
                    this.addPlayerToSight(smartVO);
                }
                else if (smartVO instanceof vo.GameSmartNpcVO) {
                    this.addNpcToSight(smartVO);
                }
                else if (smartVO instanceof vo.GameMonsterVO) {
                    this.addMonsterToSight(smartVO);
                }
            }
        };
        GameSightsBase.prototype.skillCastHandler = function (body, skillTemplate, posX, posY) {
            if (posX === void 0) { posX = 0; }
            if (posY === void 0) { posY = 0; }
            var target = body.target;
            if (body && body.vo && target && target.vo)
                GameModels.scene.syncSkill(body.vo.uid, skillTemplate.id, target.vo.uid, body.direct, posX, posY);
        };
        GameSightsBase.prototype.moveStartHandler = function (body, tile) {
            if (body && body.vo)
                GameModels.scene.syncPosition(this._type, body.vo.uid, tile.x, tile.y);
        };
        GameSightsBase.prototype.sightAddHandler = function (smartVO) {
            if (this.getObjectByUID(smartVO.uid) != null) {
                vo.toPool(smartVO);
                return;
            }
            var smartObject;
            if (smartVO instanceof vo.GamePlayerVO) {
                smartObject = this.addPlayerToSight(smartVO);
            }
            else if (smartVO instanceof vo.GameSmartNpcVO) {
                smartObject = this.addNpcToSight(smartVO);
            }
            else if (smartVO instanceof vo.GameMonsterVO) {
                smartObject = this.addMonsterToSight(smartVO);
            }
            if (!this._player.target && this._player.targetVO == smartVO) {
                this._player.target = smartObject;
            }
        };
        GameSightsBase.prototype.sightRemoveHandler = function (smartVO) {
            var smartObject = this.removeObjectFromSight(smartVO);
            if (this._player.targetVO == smartVO) {
                this._player.target = null;
            }
        };
        GameSightsBase.prototype.addPlayerToSight = function (playerVO) {
            var player = utils.ObjectPool.from(s.GamePlayer);
            player.aiClass = s.AISmartSync;
            player.petAIClass = s.AISmartSync;
            //player.petAIClass=AIPet;
            player.initialize(playerVO);
            //player.petEnabled=!game.state.getState(TypeSetting.SHIELD_PET);
            player.scene = this._scene;
            player.setTile(this._scene.getNode(playerVO.tileX, playerVO.tileY));
            this._scene.addPlayer(player);
            player.autoAttack = false;
            player.hpAutoEnabled = false;
            player.focusMode = true;
            player.damgeEnabled = false;
            player.effectEnabled = false;
            player.tapEnabled = this._objectTouchEnabled;
            if (this._objectTouchEnabled) {
                player.addEventListener(egret.TouchEvent.TOUCH_TAP, this.objectTouchHandler, this);
            }
            player.refreshTeamLeader();
            player.start();
            /*
            if (!player.stateDead) {
                player.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
            } else {
                player.deadActionImmediately();
            }*/
            this.addSightTarget(player);
            this._sights.push(player);
            return player;
        };
        GameSightsBase.prototype.addMonsterToSight = function (monsterVO) {
            var monster = utils.ObjectPool.from(monsterVO.isBoss ? s.GameBoss : s.GameMonster);
            if (this.type == TypeGame.LEGION_WAR) {
                monster.fixedMoveSpeed = 4;
            }
            monster.aiClass = s.AISmartSync;
            monster.tapEnabled = false;
            monster.initialize(monsterVO);
            this._scene.addMonster(monster);
            monster.setTile(this._scene.getNode(monsterVO.tileX, monsterVO.tileY));
            monster.autoAttack = false;
            //monster.focusMode = true;
            monster.damgeEnabled = false;
            monster.effectEnabled = true;
            //monster.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
            monster.actionTo(TypeAction.IDLE);
            monster.start();
            this.addSightTarget(monster);
            this._sights.push(monster);
            if (this._isSupoortNPCState) {
                this._isSupoortNPCState = false;
                this._scene.cameraManager.lookAtViewHight(this._player);
            }
            return monster;
        };
        GameSightsBase.prototype.addNpcToSight = function (npcVO) {
            var npc = utils.ObjectPool.from(s.GameSmartNpc);
            npc.aiClass = s.AISmartSync;
            npc.tapEnabled = false;
            npc.initialize(npcVO);
            this._scene.addNpc(npc);
            npc.setTile(this._scene.getNode(npcVO.tileX, npcVO.tileY));
            npc.autoAttack = false;
            //monster.focusMode = true;
            npc.damgeEnabled = false;
            npc.effectEnabled = false;
            //npc.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
            npc.actionTo(TypeAction.IDLE);
            npc.start();
            this.addSightTarget(npc);
            this._sights.push(npc);
            return npc;
        };
        /**添加单位时刷新视野内单位目标*/
        GameSightsBase.prototype.addSightTarget = function (targetObject) {
            for (var _i = 0, _a = this._sights; _i < _a.length; _i++) {
                var smartObject = _a[_i];
                if (smartObject.targetVO == targetObject.vo) {
                    smartObject.target = targetObject;
                }
            }
        };
        GameSightsBase.prototype.removeObjectFromSight = function (smartVO) {
            var smartObject = this.getObjectByVO(smartVO);
            if (!smartObject)
                return null;
            this._sights.splice(this._sights.indexOf(smartObject), 1);
            smartObject.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.objectTouchHandler, this);
            smartObject.tapEnabled = false;
            smartObject.remove();
            if (smartVO instanceof vo.GameMonsterVO) {
                this._scene.removeMonster(smartObject);
                // if((smartVO as vo.GameMonsterVO).isSupportNPC)
                // {
                //     this._scene.cameraManager.lookAtViewHight(this._player);
                // }
            }
            this.removeSightTarget(smartObject);
            if (smartObject)
                egret.Tween.removeTweens(smartObject);
            utils.ObjectPool.to(smartObject, true);
            return smartObject;
        };
        /**移除单位时刷新视野内单位目标 */
        GameSightsBase.prototype.removeSightTarget = function (targetObject) {
            for (var _i = 0, _a = this._sights; _i < _a.length; _i++) {
                var smartObject = _a[_i];
                if (smartObject.target == targetObject) {
                    smartObject.updateTarget();
                }
            }
        };
        GameSightsBase.prototype.clearSights = function () {
            for (var _i = 0, _a = this._sights; _i < _a.length; _i++) {
                var smartObject = _a[_i];
                smartObject.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.objectTouchHandler, this);
                smartObject.remove();
                utils.ObjectPool.to(smartObject, true);
            }
            this._sights.length = 0;
            utils.timer.clearAll(this);
        };
        GameSightsBase.prototype.getObjectByVO = function (smartVO) {
            if (!smartVO)
                return;
            if (smartVO instanceof vo.GamePetVO) {
                //武将的对象，去玩家对家里去找
                var pet = this._player.getPetObjectByVO(smartVO);
                if (pet != null)
                    return pet;
                for (var _i = 0, _a = this._sights; _i < _a.length; _i++) {
                    var smartObject = _a[_i];
                    if (smartObject instanceof s.GamePlayer) {
                        pet = smartObject.getPetObjectByVO(smartVO);
                        if (pet != null)
                            return pet;
                    }
                }
            }
            else {
                if (this._player.vo == smartVO)
                    return this._player;
                for (var _b = 0, _c = this._sights; _b < _c.length; _b++) {
                    var smartObject = _c[_b];
                    if (smartObject.vo == smartVO) {
                        return smartObject;
                    }
                }
            }
            return null;
        };
        GameSightsBase.prototype.getObjectByUID = function (uid) {
            if (this._player.vo.uid == uid)
                return this._player;
            for (var _i = 0, _a = this._sights; _i < _a.length; _i++) {
                var smartObject = _a[_i];
                if (smartObject.vo.uid == uid) {
                    return smartObject;
                }
            }
            return null;
        };
        GameSightsBase.prototype.endHandler = function (result, totalStar, dropItems) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this.end(result, totalStar, dropItems, args);
        };
        return GameSightsBase;
    }(s.GameBase));
    s.GameSightsBase = GameSightsBase;
    __reflect(GameSightsBase.prototype, "s.GameSightsBase");
})(s || (s = {}));
