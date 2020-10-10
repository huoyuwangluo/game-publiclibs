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
    var ModelSceneEveryBoss = (function (_super) {
        __extends(ModelSceneEveryBoss, _super);
        function ModelSceneEveryBoss() {
            var _this = _super.call(this) || this;
            _this._attackersCollection = new eui.ArrayCollection();
            return _this;
        }
        /**请求进入副本 */
        ModelSceneEveryBoss.prototype.enterGame = function (type, copyVO, caller, method) {
            this._copyVO = copyVO;
            this.addRoutes();
            GameModels.scene.enterGame(type, copyVO.id.toString(), this, function (result) {
                method.call(caller, result);
            });
        };
        ModelSceneEveryBoss.prototype.exit = function () {
            this.removeRoutes();
            this._copyVO = null;
        };
        /**请求进入全民副本 */
        ModelSceneEveryBoss.prototype.addRoutes = function () {
            var _this = this;
            if (this._data) {
                n.MessagePool.to(this._data);
                this._data = null;
            }
            n.net.onRoute(n.MessageMap.G2C_PUBLIC_BOSS_NOTIFY_COPY_INFO, utils.Handler.create(this, function (data) {
                _this._data = data;
                _this._data.autoRecover = false;
                _this._owner = GameModels.scene.getObjectByUId(data.OwnerId);
                if (data.ShieldLeftTime > 0) {
                    if (_this._bossShieldStartHandler) {
                        _this._bossShieldStartHandler.runWith({ lastTime: data.ShieldLeftTime, mineNum: data.MyShieldNumber, maxName: data.MaxShieldNumberName, maxNum: data.MaxShieldNumber });
                    }
                }
            }));
            //归属变更
            n.net.onRoute(n.MessageMap.G2C_PUBLIC_BOSS_NOTIFY_BOSS_OWNER, utils.Handler.create(this, function (data) {
                _this._owner = GameModels.scene.getObjectByUId(data.OwnerId);
                if (_this._ownerChangeHandler) {
                    _this._ownerChangeHandler.run();
                }
            }));
            //通知护盾开始
            n.net.onRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_START, utils.Handler.create(this, function () {
                if (this._bossShieldStartHandler) {
                    this._bossShieldStartHandler.run();
                }
            }));
            //通知护盾结束
            n.net.onRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_END, utils.Handler.create(this, function () {
                if (this._bossShieldEndHandler) {
                    this._bossShieldEndHandler.run();
                }
            }));
            //通知所有场景玩家，扔出最大色子数的玩家和点数
            n.net.onRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_NOTIFY_MAX_NUMBER, utils.Handler.create(this, function (data) {
                if (this._seiveMaxHandler) {
                    this._seiveMaxHandler.runWith(data);
                }
            }));
            //通知扔出最大点数的玩家获奖
            n.net.onRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_NOTIFY_REWARD, utils.Handler.create(this, function (data) {
                if (_this._seiveMaxRewardHandler) {
                    _this._seiveMaxRewardHandler.runWith(data.Rewards);
                }
            }));
            //通知玩家收到挑衅
            n.net.onRoute(n.MessageMap.G2C_SCENE_NOTIFYSHOWWORDS, utils.Handler.create(this, function (data) {
                if (_this._receiveProvokeHandler) {
                    _this._receiveProvokeHandler.runWith(data);
                }
            }));
            GameModels.scene.onSightSnap(this, this.sightSnapHandler);
            GameModels.scene.onSightAdd(this, this.sightAddHandler);
            GameModels.scene.onSightRemove(this, this.sightRemoveHandler);
            //GameModels.scene.onTargetChange(this, this.targetChangeHandler);
            GameModels.scene.onObjectTeamStatusChange(this, this.sightStatusHandler);
        };
        ModelSceneEveryBoss.prototype.removeRoutes = function () {
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_NOTIFY_COPY_INFO);
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_START);
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_END);
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_NOTIFY_MAX_NUMBER);
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_NOTIFY_REWARD);
            n.net.offRoute(n.MessageMap.G2C_SCENE_NOTIFYSHOWWORDS);
            GameModels.scene.offSightSnap();
            GameModels.scene.offSightAdd(this, this.sightAddHandler);
            GameModels.scene.offSightRemove(this, this.sightRemoveHandler);
            //GameModels.scene.offTargetChange();
            GameModels.scene.offObjectTeamStatusChange(this, this.sightStatusHandler);
            this.offAllAttacksChange();
            this.clearAttacks();
        };
        ModelSceneEveryBoss.prototype.sightSnapHandler = function () {
            GameModels.scene.offSightSnap();
            this.initAttacks();
        };
        ModelSceneEveryBoss.prototype.sightAddHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.addToAttacks(smartVO);
            }
        };
        /**视野移除 */
        ModelSceneEveryBoss.prototype.sightRemoveHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.removeFromAttacks(smartVO);
            }
            if (GameModels.user.player.target == smartVO) {
                GameModels.user.player.setTarget(this.boss, true);
            }
        };
        /**目标变更 */
        /*private targetChangeHandler(smartVO: vo.GameSmartVO, target: vo.GameSmartVO) {
            if (smartVO instanceof vo.GamePetVO) return;
            if (target == GameModels.user.player && (smartVO instanceof vo.GamePlayerVO)) {
                this.addToAttacks(smartVO);
            }
        }*/
        /**状态变化 */
        ModelSceneEveryBoss.prototype.sightStatusHandler = function (smartVO, status, killerVO, lostContent) {
            if (status) {
                if (this._playerRelifeHandler)
                    this._playerRelifeHandler.runWith(smartVO);
                if (smartVO instanceof vo.GamePlayerVO) {
                    if (smartVO != GameModels.user.player) {
                        this.addToAttacks(smartVO);
                    }
                }
            }
            else {
                if (this._playerDeadHandler)
                    this._playerDeadHandler.runWith({ body: smartVO, killer: killerVO });
                if (smartVO instanceof vo.GamePlayerVO) {
                    if (smartVO != GameModels.user.player) {
                        this.removeFromAttacks(smartVO);
                        if (GameModels.user.player.target == smartVO) {
                            GameModels.user.player.setTarget(this.boss, true);
                        }
                    }
                }
            }
        };
        /**状态变化 */
        /*private sightStatusHandler(smartVO: vo.GameSmartVO, status: boolean, killerVO: vo.GameSmartVO) {
            if (status) {
                if (this._playerRelifeHandler) this._playerRelifeHandler.runWith(smartVO);
            } else {
                if (this._playerDeadHandler) this._playerDeadHandler.runWith({ body: smartVO, killer: killerVO });
                if (smartVO.master != null)
                {
                    if (smartVO.master == GameModels.user.player) {
                        this.clearAttacks();
                    } else {
                        this.removeFromAttacks(smartVO.master)
                    }
                }
            }
        }*/
        /**攻击玩家 */
        ModelSceneEveryBoss.prototype.attackPlayer = function (playerVO) {
            if (playerVO.stateDead)
                return;
            GameModels.user.player.setTarget(playerVO, true);
        };
        ModelSceneEveryBoss.prototype.initAttacks = function () {
            for (var _i = 0, _a = GameModels.scene.sights; _i < _a.length; _i++) {
                var smartVO = _a[_i];
                if (smartVO instanceof vo.GamePlayerVO) {
                    //if (smartVO.legionId != GameModels.user.player.legionId) {
                    this._attackersCollection.addItem(smartVO);
                    //}
                }
            }
        };
        /**添加到攻击列表 */
        ModelSceneEveryBoss.prototype.addToAttacks = function (playerVO) {
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
        ModelSceneEveryBoss.prototype.removeFromAttacks = function (playerVO) {
            var index = this._attackersCollection.getItemIndex(playerVO);
            if (index >= 0) {
                this._attackersCollection.removeItemAt(index);
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        /**清空攻击列表 */
        ModelSceneEveryBoss.prototype.clearAttacks = function () {
            if (this._attackersCollection.length) {
                this._attackersCollection.removeAll();
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        Object.defineProperty(ModelSceneEveryBoss.prototype, "attackersCollection", {
            //获取攻击列表
            get: function () {
                return this._attackersCollection;
            },
            enumerable: true,
            configurable: true
        });
        /**请求扔色子 */
        ModelSceneEveryBoss.prototype.requestSievesRandom = function (caller, method) {
            if (!this._sivesRandomMsg)
                this._sivesRandomMsg = new n.C2G_Public_Boss_Shield_Rand();
            n.net.request(n.MessageMap.C2G_PUBLIC_BOSS_SHIELD_RAND, this._sivesRandomMsg, utils.Handler.create(this, function (data) {
                method.call(caller, data.MyNumber);
            }));
        };
        /**请求发送挑衅 */
        ModelSceneEveryBoss.prototype.requestSendProvoke = function (showType, showId, showContent, caller, method) {
            var msg = n.MessagePool.from(n.C2G_Scene_ShowWords);
            msg.ShowType = showType;
            msg.ShowId = showId;
            msg.ShowContent = showContent;
            this.request(n.MessageMap.C2G_SCENE_SHOWWORDS, msg, utils.Handler.create(this, function (data) {
                method.call(caller, data);
            }));
        };
        Object.defineProperty(ModelSceneEveryBoss.prototype, "boss", {
            get: function () {
                return GameModels.scene.getObjectByUId(this._data.BossUniqueId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneEveryBoss.prototype, "owner", {
            get: function () {
                return this._owner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneEveryBoss.prototype, "killer", {
            get: function () {
                return this._killer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneEveryBoss.prototype, "copyVO", {
            get: function () {
                return this._copyVO;
            },
            enumerable: true,
            configurable: true
        });
        /**同步位置信息 */
        ModelSceneEveryBoss.prototype.syncPosition = function (type, objectId, x, y) {
            GameModels.scene.syncPosition(type, objectId, x, y);
        };
        /**同步技能施放 */
        ModelSceneEveryBoss.prototype.syncSkill = function (castObjId, skillId, targetObjId, direct, posX, posY) {
            GameModels.scene.syncSkill(castObjId, skillId, targetObjId, direct, posX, posY);
        };
        // /**同步解合体 */
        // public syncMerge(petUId:string,status:boolean){
        //     GameModels.scene.syncMerge(petUId,status);
        // }
        /**请求复活 （0:常规，1:原地立即复活）*/
        ModelSceneEveryBoss.prototype.requestRelife = function (type) {
            GameModels.scene.requestRelife(type);
        };
        /**同步当前目标 */
        ModelSceneEveryBoss.prototype.syncTarget = function (smartVO) {
            GameModels.scene.syncTarget(smartVO);
        };
        /**放弃归属 */
        ModelSceneEveryBoss.prototype.dropOwner = function () {
            n.net.request(n.MessageMap.C2G_PUBLIC_BOSS_GIVEUPOWNER, n.MessagePool.from(n.C2G_Public_Boss_GiveUpOwner), utils.Handler.create(this, function () {
                //this.syncTarget(null);
            }));
        };
        /**取视野对象 */
        ModelSceneEveryBoss.prototype.getObjectByUId = function (uid) {
            return GameModels.scene.getObjectByUId(uid);
        };
        /**取对象列表 */
        ModelSceneEveryBoss.prototype.getObjectVOList = function (actorType) {
            return GameModels.scene.getObjectVOList(actorType);
        };
        //-------------------------------------------------------------------
        /**我的攻击者列表变更*/
        ModelSceneEveryBoss.prototype.onAttacksChange = function (caller, method) {
            if (!this._attacksChangeHandlers) {
                this._attacksChangeHandlers = new utils.Handlers(false);
            }
            this._attacksChangeHandlers.add(caller, method, null, false);
        };
        ModelSceneEveryBoss.prototype.offAttacksChange = function (caller, method) {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.remove(caller, method);
            }
        };
        ModelSceneEveryBoss.prototype.offAllAttacksChange = function () {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.clear();
            }
        };
        /**监听玩家复活*/
        ModelSceneEveryBoss.prototype.onPlayerRelife = function (caller, method) {
            this.offPlayerRelife();
            this._playerRelifeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBoss.prototype.offPlayerRelife = function () {
            if (this._playerRelifeHandler) {
                this._playerRelifeHandler.recover();
                this._playerRelifeHandler = null;
            }
        };
        /**监听玩家死亡*/
        ModelSceneEveryBoss.prototype.onPlayerDead = function (caller, method) {
            this.offPlayerDead();
            this._playerDeadHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBoss.prototype.offPlayerDead = function () {
            if (this._playerDeadHandler) {
                this._playerDeadHandler.recover();
                this._playerDeadHandler = null;
            }
        };
        /**监听归属者变更*/
        ModelSceneEveryBoss.prototype.onOwnerChange = function (caller, method) {
            this.offOwnerChange();
            this._ownerChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBoss.prototype.offOwnerChange = function () {
            if (this._ownerChangeHandler) {
                this._ownerChangeHandler.recover();
                this._ownerChangeHandler = null;
            }
        };
        /**监听BOSS护盾开始*/
        ModelSceneEveryBoss.prototype.onBossShieldStart = function (caller, method) {
            this.offBossShieldStart();
            this._bossShieldStartHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBoss.prototype.offBossShieldStart = function () {
            if (this._bossShieldStartHandler) {
                this._bossShieldStartHandler.recover();
                this._bossShieldStartHandler = null;
            }
        };
        /**监听BOSS护盾结束*/
        ModelSceneEveryBoss.prototype.onBossShieldEnd = function (caller, method) {
            this.offBossShieldEnd();
            this._bossShieldEndHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBoss.prototype.offBossShieldEnd = function () {
            if (this._bossShieldEndHandler) {
                this._bossShieldEndHandler.recover();
                this._bossShieldEndHandler = null;
            }
        };
        /** */
        ModelSceneEveryBoss.prototype.onSeiveMaxNumber = function (caller, method) {
            this.offSeiveMaxNumber();
            this._seiveMaxHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBoss.prototype.offSeiveMaxNumber = function () {
            if (this._seiveMaxHandler) {
                this._seiveMaxHandler.recover();
                this._seiveMaxHandler = null;
            }
        };
        /** */
        ModelSceneEveryBoss.prototype.onSeiveMaxReward = function (caller, method) {
            this.offSeiveMaxReward();
            this._seiveMaxRewardHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBoss.prototype.offSeiveMaxReward = function () {
            if (this._seiveMaxRewardHandler) {
                this._seiveMaxRewardHandler.recover();
                this._seiveMaxRewardHandler = null;
            }
        };
        ModelSceneEveryBoss.prototype.onReceiveProvoke = function (caller, method) {
            this.offReceiveProvoke();
            this._receiveProvokeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneEveryBoss.prototype.offReceiveProvoke = function () {
            if (this._receiveProvokeHandler) {
                this._receiveProvokeHandler.recover();
                this._receiveProvokeHandler = null;
            }
        };
        return ModelSceneEveryBoss;
    }(mo.ModelBase));
    mo.ModelSceneEveryBoss = ModelSceneEveryBoss;
    __reflect(ModelSceneEveryBoss.prototype, "mo.ModelSceneEveryBoss", ["mo.IModelEveryBoss", "mo.IModelMutilScene", "mo.IModelScene"]);
})(mo || (mo = {}));
