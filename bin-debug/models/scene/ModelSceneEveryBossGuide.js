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
var mo;
(function (mo) {
    var ModelSceneEveryBossGuide = (function (_super) {
        __extends(ModelSceneEveryBossGuide, _super);
        function ModelSceneEveryBossGuide() {
            var _this = _super.call(this) || this;
            _this._attackersCollection = new eui.ArrayCollection();
            _this._sightPlayers = [];
            return _this;
        }
        /**请求进入副本 */
        ModelSceneEveryBossGuide.prototype.enterGame = function (copyVO, caller, method) {
            this._copyVO = copyVO;
            this._player = GameModels.user.player;
            GameModels.user.player.resetState();
            method.call(caller);
        };
        ModelSceneEveryBossGuide.prototype.enableSight = function () {
            this.sightInitialize();
            this.statusInitialize();
        };
        ModelSceneEveryBossGuide.prototype.exit = function () {
            if (this._bossVO) {
                if (this._bossVO.stateDead) {
                    // if(this._copyVO.openLevel==20&&GameModels.task.curTask.type==TypeTask.EVERY_BOSS_GUIDE_20){
                    //     GameModels.task.curTask.updateCurrent(1);
                    //     //GameModels.task.requestSubmit();
                    // }
                    // if(this._copyVO.openLevel==30&&GameModels.task.curTask.type==TypeTask.EVERY_BOSS_GUIDE_30){
                    //     GameModels.task.curTask.updateCurrent(1);
                    //     //GameModels.task.requestSubmit();
                    // }
                }
                this._bossVO.autoRecover = true;
                vo.toPool(this._bossVO);
                this._bossVO = null;
            }
            if (this._sightPlayers && this._sightPlayers.length) {
                for (var _i = 0, _a = this._sightPlayers; _i < _a.length; _i++) {
                    var playerVO = _a[_i];
                    vo.toPool(playerVO);
                }
                this._sightPlayers.length = 0;
            }
            this._copyVO = null;
            this._player = null;
            this.offAllAttacksChange();
            this.clearAttacks();
        };
        /**请求全民BOSS奖励 */
        ModelSceneEveryBossGuide.prototype.result = function (caller, method) {
            method.call(caller, vo.parseItems(GameModels.task.curTask.template.rewards.split(';')));
        };
        //-------------------------------------------------------------------
        ModelSceneEveryBossGuide.prototype.updatePetMerge = function (playerId, pos, state) {
            if (playerId == this._player.uid) {
                this._player.updatePetMerge(pos, state);
                return;
            }
            for (var _i = 0, _a = this._sightPlayers; _i < _a.length; _i++) {
                var player = _a[_i];
                if (player.uid == playerId) {
                    player.updatePetMerge(pos, state);
                    break;
                }
            }
        };
        //-------------------------------------------------------------------
        //初始化视野
        ModelSceneEveryBossGuide.prototype.sightInitialize = function () {
            this._bossVO = vo.fromPool(vo.GameMonsterVO, Templates.getTemplateById(templates.Map.OTHERMONSTER, this._copyVO.templateBoss.id), TypeActor.BOSS);
            this._bossVO.autoRecover = false;
            this._bossVO.setUId("");
            this._bossVO.syncHp(utils.MathUtil.randRange(this._copyVO.bossHP * 0.4, this._copyVO.bossHP * 0.6));
            var uid = 'robot';
            var index = 0;
            var playerTemplates = Templates.getTemplatesByProperty(templates.Map.TASKROBOT, 'type', 3);
            var petTemplates = Templates.getTemplatesByProperty(templates.Map.TASKROBOT, 'type', 4);
            for (var _i = 0, playerTemplates_1 = playerTemplates; _i < playerTemplates_1.length; _i++) {
                var playerTemplate = playerTemplates_1[_i];
                if (playerTemplate.lv == this._copyVO.openLevel) {
                    var playerVO = this.playerSightAdd(playerTemplate, petTemplates[(Math.random() * petTemplates.length) >> 0], uid + index);
                    this.addToAttacks(playerVO);
                    index++;
                }
            }
            this._owner = this._sightPlayers[0];
        };
        ModelSceneEveryBossGuide.prototype.statusInitialize = function () {
            for (var _i = 0, _a = this._sightPlayers; _i < _a.length; _i++) {
                var playerVO = _a[_i];
                playerVO.setTarget(this._bossVO, true);
            }
            this._bossVO.setTarget(this._sightPlayers[(Math.random() * this._sightPlayers.length) >> 0], true);
            this._player.setTarget(this._bossVO, true);
        };
        ModelSceneEveryBossGuide.prototype.playerSightAdd = function (playerTemplate, petemplate, uid) {
            var playerVO = vo.fromPool(vo.GamePlayerVO, playerTemplate, uid);
            var petVO = vo.fromPool(vo.GamePetVO, petemplate);
            playerVO.petList.addToFormat(petVO, { uid: uid + "_0", pos: 0 });
            this._sightPlayers.push(playerVO);
            playerVO.syncHp(playerTemplate.HP);
            playerVO.setTarget(this._bossVO, true);
            return playerVO;
        };
        ModelSceneEveryBossGuide.prototype.playerSightRemove = function (uid) {
            for (var i = 0; i < this._sightPlayers.length; i++) {
                var playeVO = this._sightPlayers[i];
                if (playeVO.uid == uid) {
                    this._sightPlayers.splice(i, 1);
                    vo.toPool(playeVO);
                    break;
                }
            }
        };
        ModelSceneEveryBossGuide.prototype.getSightPlayer = function (uid) {
            for (var i = 0; i < this._sightPlayers.length; i++) {
                var playeVO = this._sightPlayers[i];
                if (playeVO.uid == uid || playeVO.petList.hasPetByUId(uid)) {
                    return playeVO;
                }
            }
            return null;
        };
        ModelSceneEveryBossGuide.prototype.getSightObject = function (uid) {
            if (this._bossVO.uid == uid)
                return this._bossVO;
            if (this._player.uid == uid)
                return this._player;
            if (this._player.petList.hasPetByUId(uid))
                return this._player;
            return this.getSightPlayer(uid);
        };
        //-------------------------------------------------------------------
        /**攻击玩家 */
        ModelSceneEveryBossGuide.prototype.attackPlayer = function (playerVO) {
            if (playerVO.stateDead)
                return;
            GameModels.user.player.setTarget(playerVO, true);
        };
        /**添加到攻击列表 */
        ModelSceneEveryBossGuide.prototype.addToAttacks = function (playerVO) {
            if (playerVO == GameModels.user.player)
                return;
            if (this._attackersCollection.getItemIndex(playerVO) < 0) {
                this._attackersCollection.addItem(playerVO);
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(true);
                }
            }
        };
        /**从攻击列表移除 */
        ModelSceneEveryBossGuide.prototype.removeFromAttacks = function (playerVO) {
            var index = this._attackersCollection.getItemIndex(playerVO);
            if (index >= 0) {
                this._attackersCollection.removeItemAt(index);
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        /**清空攻击列表 */
        ModelSceneEveryBossGuide.prototype.clearAttacks = function () {
            if (this._attackersCollection.length) {
                this._attackersCollection.removeAll();
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        ModelSceneEveryBossGuide.prototype.requestSievesRandom = function (caller, method) { };
        ModelSceneEveryBossGuide.prototype.requestSendProvoke = function (showType, showId, showContent, caller, method) { };
        /**选择目标 */
        ModelSceneEveryBossGuide.prototype.updateTarget = function (uid) {
            this._player.setTarget(this.getSightObject(uid), true);
            //反击
            utils.timer.once(500 + Math.random() * 500, this, function () {
                var target = this.getSightObject(uid);
                if (!target.stateDead && !this._player.stateDead) {
                    target.setTarget(this._player, true);
                }
            });
        };
        ModelSceneEveryBossGuide.prototype.updateOwner = function (playerVO) {
            this._owner = playerVO;
            this._bossVO.setTarget(this._owner, true);
            this.dispatchEventWith('OWNER_CHANGE', false, playerVO);
            if (this._ownerChangeHandler) {
                this._ownerChangeHandler.run();
            }
        };
        Object.defineProperty(ModelSceneEveryBossGuide.prototype, "sightPlayers", {
            get: function () {
                return this._sightPlayers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneEveryBossGuide.prototype, "attackersCollection", {
            get: function () {
                return this._attackersCollection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneEveryBossGuide.prototype, "boss", {
            get: function () {
                return this._bossVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneEveryBossGuide.prototype, "owner", {
            get: function () {
                return this._owner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneEveryBossGuide.prototype, "killer", {
            get: function () {
                return this._killer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneEveryBossGuide.prototype, "copyVO", {
            get: function () {
                return this._copyVO;
            },
            enumerable: true,
            configurable: true
        });
        /**同步位置信息 */
        ModelSceneEveryBossGuide.prototype.syncPosition = function (type, objectId, x, y) { };
        /**同步技能施放 */
        ModelSceneEveryBossGuide.prototype.syncSkill = function (castObjId, skillId, targetObjId, direct, posX, posY) { };
        /**同步解合体 */
        ModelSceneEveryBossGuide.prototype.syncMerge = function (petUId, status) { };
        /**请求复活 （0:常规，1:原地立即复活）*/
        ModelSceneEveryBossGuide.prototype.requestRelife = function (type) { };
        /**同步当前目标 */
        ModelSceneEveryBossGuide.prototype.syncTarget = function (smartVO) {
            GameModels.scene.syncTarget(smartVO);
        };
        /**取最近敌人 */
        ModelSceneEveryBossGuide.prototype.getMinEnemy = function (body, enmeyTypes, range, except) {
            if (range === void 0) { range = 0; }
            if (except === void 0) { except = null; }
            var minDistance = 10000;
            var minObject;
            for (var _i = 0, enmeyTypes_1 = enmeyTypes; _i < enmeyTypes_1.length; _i++) {
                var enemyType = enmeyTypes_1[_i];
                var objects = this.getObjectVOList(enemyType);
                for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
                    var object = objects_1[_a];
                    if (object.stateDead || object == body || object == except)
                        continue;
                    var distance = utils.MathUtil.getDistance(body.tileX, body.tileY, object.tileX, object.tileY);
                    if (range != 0 && distance > range)
                        continue;
                    if (body.type == TypeActor.PET && object.type == TypeActor.PET) {
                        if (object.groupId == body.groupId)
                            continue;
                    }
                    if (distance < minDistance) {
                        minObject = object;
                        minDistance = distance;
                    }
                }
            }
            return minObject;
        };
        /**取视野对象 */
        ModelSceneEveryBossGuide.prototype.getObjectByUId = function (uid) {
            if (this._bossVO.uid == uid)
                return this._bossVO;
            for (var _i = 0, _a = this._sightPlayers; _i < _a.length; _i++) {
                var playerVO = _a[_i];
                if (playerVO.uid == uid)
                    return playerVO;
            }
            return null;
        };
        /**取对象列表 */
        ModelSceneEveryBossGuide.prototype.getObjectVOList = function (actorType) {
            switch (actorType) {
                case TypeActor.PLAYER:
                case TypeActor.ROBOT:
                    return this._sightPlayers;
                case TypeActor.MONSTER:
                case TypeActor.BOSS:
                    return [this._bossVO];
            }
            return null;
        };
        //-------------------------------------------------------------------
        //-------------------------------------------------------------------
        /**我的攻击者列表变更*/
        ModelSceneEveryBossGuide.prototype.onAttacksChange = function (caller, method) {
            if (!this._attacksChangeHandlers) {
                this._attacksChangeHandlers = new utils.Handlers(false);
            }
            this._attacksChangeHandlers.add(caller, method, null, false);
        };
        ModelSceneEveryBossGuide.prototype.offAttacksChange = function (caller, method) {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.remove(caller, method);
            }
        };
        ModelSceneEveryBossGuide.prototype.offAllAttacksChange = function () {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.clear();
            }
        };
        /**监听玩家复活*/
        ModelSceneEveryBossGuide.prototype.onPlayerRelife = function (caller, method) {
            this.offPlayerRelife();
            this._playerRelifeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBossGuide.prototype.offPlayerRelife = function () {
            if (this._playerRelifeHandler) {
                this._playerRelifeHandler.recover();
                this._playerRelifeHandler = null;
            }
        };
        /**监听玩家死亡*/
        ModelSceneEveryBossGuide.prototype.onPlayerDead = function (caller, method) {
            this.offPlayerDead();
            this._playerDeadHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBossGuide.prototype.offPlayerDead = function () {
            if (this._playerDeadHandler) {
                this._playerDeadHandler.recover();
                this._playerDeadHandler = null;
            }
        };
        /**监听归属者变更*/
        ModelSceneEveryBossGuide.prototype.onOwnerChange = function (caller, method) {
            this.offOwnerChange();
            this._ownerChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBossGuide.prototype.offOwnerChange = function () {
            if (this._ownerChangeHandler) {
                this._ownerChangeHandler.recover();
                this._ownerChangeHandler = null;
            }
        };
        ModelSceneEveryBossGuide.prototype.onBossShieldStart = function (caller, method) { };
        ModelSceneEveryBossGuide.prototype.offBossShieldStart = function (caller, method) { };
        ModelSceneEveryBossGuide.prototype.onBossShieldEnd = function (caller, method) { };
        ModelSceneEveryBossGuide.prototype.offBossShieldEnd = function (caller, method) { };
        ModelSceneEveryBossGuide.prototype.onSeiveMaxNumber = function (caller, method) { };
        ModelSceneEveryBossGuide.prototype.offSeiveMaxNumber = function (caller, method) { };
        ModelSceneEveryBossGuide.prototype.onSeiveMaxReward = function (caller, method) { };
        ModelSceneEveryBossGuide.prototype.offSeiveMaxReward = function (caller, method) { };
        ModelSceneEveryBossGuide.prototype.onReceiveProvoke = function (caller, method) { };
        ModelSceneEveryBossGuide.prototype.offReceiveProvoke = function (caller, method) { };
        return ModelSceneEveryBossGuide;
    }(mo.ModelBase));
    mo.ModelSceneEveryBossGuide = ModelSceneEveryBossGuide;
    __reflect(ModelSceneEveryBossGuide.prototype, "mo.ModelSceneEveryBossGuide", ["mo.IModelEveryBoss", "mo.IModelMutilScene", "mo.IModelScene"]);
})(mo || (mo = {}));
