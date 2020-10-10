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
    var ModelSceneWoorsBoss = (function (_super) {
        __extends(ModelSceneWoorsBoss, _super);
        function ModelSceneWoorsBoss() {
            var _this = _super.call(this) || this;
            _this._attackersCollection = new eui.ArrayCollection();
            return _this;
        }
        /**请求进入副本 */
        ModelSceneWoorsBoss.prototype.enterGame = function (type, copyVO, caller, method) {
            this._copyVO = copyVO;
            this.addRoutes();
            GameModels.scene.enterGame(type, copyVO.id.toString(), this, function (result) {
                method.call(caller, result);
            });
        };
        ModelSceneWoorsBoss.prototype.exit = function () {
            this.removeRoutes();
            this.clearAttacks();
            this.offAllAttacksChange();
            this._copyVO = null;
            this._flagOwerServerIds = [];
            this._flagIsInTime = 0;
            this._flagPlayerId = "";
            this._flagPlayerName = "";
            this._flagServerId = "";
            this._flagLeftSecond = 0;
        };
        /**请求进入全民副本 */
        ModelSceneWoorsBoss.prototype.addRoutes = function () {
            var _this = this;
            if (this._data) {
                n.MessagePool.to(this._data);
                this._data = null;
            }
            n.net.onRoute(n.MessageMap.G2C_PUBLIC_BOSS_NOTIFY_COPY_INFO, utils.Handler.create(this, function (data) {
                this._data = data;
                this._data.autoRecover = false;
                this._owner = GameModels.scene.getObjectByUId(data.OwnerId);
                if (data.ShieldLeftTime > 0) {
                    if (this._bossShieldStartHandler) {
                        this._bossShieldStartHandler.runWith({ lastTime: data.ShieldLeftTime, mineNum: data.MyShieldNumber, maxName: data.MaxShieldNumberName, maxNum: data.MaxShieldNumber });
                    }
                }
            }));
            n.net.onRoute(n.MessageMap.G2C_SCENE_NOTIFY_GAMERESULT, utils.Handler.create(this, function (data) {
                //logger.log("跨服发奖:", "Stars,", data.Stars, "EndParam,", data.EndParam);
                var list = vo.parseProtoItems(data.Items);
                if (this._gameRewardHandler) {
                    this._gameRewardHandler.runWith(data.Stars, list, GameModels.scene.getObjectByUId(data.EndParam));
                }
            }));
            //归属变更
            n.net.onRoute(n.MessageMap.G2C_PUBLIC_BOSS_NOTIFY_BOSS_OWNER, utils.Handler.create(this, function (data) {
                _this._owner = GameModels.scene.getObjectByUId(data.OwnerId);
                if (_this._ownerChangeHandler) {
                    _this._ownerChangeHandler.run();
                }
            }));
            //通知玩家收到挑衅
            n.net.onRoute(n.MessageMap.G2C_SCENE_NOTIFYSHOWWORDS, utils.Handler.create(this, function (data) {
                if (_this._receiveProvokeHandler) {
                    _this._receiveProvokeHandler.runWith(data);
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
            //通知玩家爆其他玩家远古装备
            //n.net.onRoute(n.MessageMap.G2C_GUDAIEQUIP_NOTIFYDROPMSG, utils.Handler.create(this, this.guDaiEquipNotifyDropMsg, null, false));
            GameModels.scene.onSightSnap(this, this.sightSnapHandler);
            GameModels.scene.onSightAdd(this, this.sightAddHandler);
            GameModels.scene.onSightRemove(this, this.sightRemoveHandler);
            GameModels.scene.onObjectTeamStatusChange(this, this.sightStatusHandler);
        };
        ModelSceneWoorsBoss.prototype.removeRoutes = function () {
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_NOTIFY_COPY_INFO);
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_NOTIFY_BOSS_OWNER);
            n.net.offRoute(n.MessageMap.G2C_SCENE_NOTIFY_GAMERESULT);
            n.net.offRoute(n.MessageMap.G2C_SCENE_NOTIFYSHOWWORDS);
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_START);
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_END);
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_NOTIFY_MAX_NUMBER);
            n.net.offRoute(n.MessageMap.G2C_PUBLIC_BOSS_SHIELD_NOTIFY_REWARD);
            // n.net.offRoute(n.MessageMap.G2C_GUDAIEQUIP_NOTIFYDROPMSG);
            GameModels.scene.offSightSnap();
            GameModels.scene.offSightAdd(this, this.sightAddHandler);
            GameModels.scene.offSightRemove(this, this.sightRemoveHandler);
            GameModels.scene.offObjectTeamStatusChange(this, this.sightStatusHandler);
            this.offAllAttacksChange();
            this.clearAttacks();
        };
        ModelSceneWoorsBoss.prototype.sightSnapHandler = function () {
            GameModels.scene.offSightSnap();
            this.initAttacks();
        };
        ModelSceneWoorsBoss.prototype.sightAddHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.addToAttacks(smartVO);
            }
            if (smartVO instanceof vo.GameMonsterVO) {
                if (this._bossSightChangHandler) {
                    this._bossSightChangHandler.run();
                }
            }
        };
        /**视野移除 */
        ModelSceneWoorsBoss.prototype.sightRemoveHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.removeFromAttacks(smartVO);
            }
            if (smartVO instanceof vo.GameMonsterVO) {
                if (this._bossSightChangHandler) {
                    this._bossSightChangHandler.run();
                }
            }
            if (GameModels.user.player.target == smartVO) {
                GameModels.user.player.setTarget(this.getBossVO(), true);
            }
        };
        /**状态变化 */
        ModelSceneWoorsBoss.prototype.sightStatusHandler = function (smartVO, status, killerVO, lostContent) {
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
                            this.syncTarget(null);
                        }
                    }
                }
            }
        };
        /**放弃归属 */
        ModelSceneWoorsBoss.prototype.dropOwner = function () {
            var _this = this;
            n.net.request(n.MessageMap.C2G_PUBLIC_BOSS_GIVEUPOWNER, n.MessagePool.from(n.C2G_Public_Boss_GiveUpOwner), utils.Handler.create(this, function () {
                _this.syncTarget(null);
            }));
        };
        /**攻击玩家 */
        ModelSceneWoorsBoss.prototype.attackPlayer = function (playerVO) {
            if (playerVO.stateDead)
                return;
            GameModels.user.player.setTarget(playerVO, true);
        };
        ModelSceneWoorsBoss.prototype.initAttacks = function () {
            for (var _i = 0, _a = GameModels.scene.sights; _i < _a.length; _i++) {
                var smartVO = _a[_i];
                if (smartVO instanceof vo.GamePlayerVO) {
                    if (smartVO.legionId != GameModels.user.player.legionId) {
                        this._attackersCollection.addItem(smartVO);
                    }
                }
            }
        };
        /**添加到攻击列表 */
        ModelSceneWoorsBoss.prototype.addToAttacks = function (playerVO) {
            if (playerVO == GameModels.user.player)
                return;
            if (playerVO.legionId == GameModels.user.player.legionId)
                return;
            if (this._attackersCollection.getItemIndex(playerVO) < 0) {
                this._attackersCollection.addItem(playerVO);
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(true);
                }
            }
        };
        /**从攻击列表移除 */
        ModelSceneWoorsBoss.prototype.removeFromAttacks = function (playerVO) {
            var index = this._attackersCollection.getItemIndex(playerVO);
            if (index >= 0) {
                this._attackersCollection.removeItemAt(index);
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        /**清空攻击列表 */
        ModelSceneWoorsBoss.prototype.clearAttacks = function () {
            if (this._attackersCollection.length) {
                this._attackersCollection.removeAll();
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "attackersCollection", {
            //获取攻击列表
            get: function () {
                return this._attackersCollection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "boss", {
            get: function () {
                return GameModels.scene.getObjectByUId(this._data.BossUniqueId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "owner", {
            get: function () {
                return this._owner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "killer", {
            get: function () {
                return this._killer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "copyVO", {
            get: function () {
                return this._copyVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "flagOwerServerIds", {
            get: function () {
                return this._flagOwerServerIds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "flagIsInTime", {
            get: function () {
                return this._flagIsInTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "flagLeftSecond", {
            get: function () {
                return this._flagLeftSecond;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "flagPlayerId", {
            get: function () {
                return this._flagPlayerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "flagPlayerName", {
            get: function () {
                return this._flagPlayerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWoorsBoss.prototype, "flagServerId", {
            get: function () {
                return this._flagServerId;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneWoorsBoss.prototype.isOwerServer = function () {
            for (var _i = 0, _a = this.flagOwerServerIds; _i < _a.length; _i++) {
                var serverId = _a[_i];
                if (serverId == GameModels.login.serverList.selected.sid) {
                    return true;
                }
            }
            return false;
        };
        /**同步位置信息 */
        ModelSceneWoorsBoss.prototype.syncPosition = function (type, objectId, x, y) {
            GameModels.scene.syncPosition(type, objectId, x, y);
        };
        /**同步技能施放 */
        ModelSceneWoorsBoss.prototype.syncSkill = function (castObjId, skillId, targetObjId, direct, posX, posY) {
            GameModels.scene.syncSkill(castObjId, skillId, targetObjId, direct, posX, posY);
        };
        // /**同步解合体 */
        // public syncMerge(petUId: string, status: boolean) {
        //     GameModels.scene.syncMerge(petUId, status);
        // }
        /**请求复活 （0:常规，1:原地立即复活）*/
        ModelSceneWoorsBoss.prototype.requestRelife = function (type) {
            GameModels.scene.requestRelife(type);
        };
        /**同步当前目标 */
        ModelSceneWoorsBoss.prototype.syncTarget = function (smartVO) {
            GameModels.scene.syncTarget(smartVO);
        };
        /**取视野对象 */
        ModelSceneWoorsBoss.prototype.getObjectByUId = function (uid) {
            return GameModels.scene.getObjectByUId(uid);
        };
        /**取对象列表 */
        ModelSceneWoorsBoss.prototype.getObjectVOList = function (actorType) {
            return GameModels.scene.getObjectVOList(actorType);
        };
        /**BossVO */
        ModelSceneWoorsBoss.prototype.getBossVO = function () {
            var monsters = GameModels.scene.getObjectVOList(TypeActor.MONSTER);
            if (monsters && monsters.length) {
                return monsters[0];
            }
            return null;
        };
        ModelSceneWoorsBoss.prototype.getNpcVO = function () {
            var npcs = GameModels.scene.getObjectVOList(TypeActor.NPC);
            if (npcs && npcs.length) {
                return npcs[0];
            }
            return null;
        };
        ModelSceneWoorsBoss.prototype.getMonsterData = function (id) {
            var tmp = Templates.getTemplateByProperty(templates.Map.OTHERMONSTER, "id", id);
            return tmp;
        };
        //-------------------------------------------------------------------
        /**我的攻击者列表变更*/
        ModelSceneWoorsBoss.prototype.onAttacksChange = function (caller, method) {
            if (!this._attacksChangeHandlers) {
                this._attacksChangeHandlers = new utils.Handlers(false);
            }
            this._attacksChangeHandlers.add(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offAttacksChange = function (caller, method) {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.remove(caller, method);
            }
        };
        ModelSceneWoorsBoss.prototype.offAllAttacksChange = function () {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.clear();
            }
        };
        /**监听玩家复活*/
        ModelSceneWoorsBoss.prototype.onPlayerRelife = function (caller, method) {
            this.offPlayerRelife();
            this._playerRelifeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offPlayerRelife = function () {
            if (this._playerRelifeHandler) {
                this._playerRelifeHandler.recover();
                this._playerRelifeHandler = null;
            }
        };
        /**监听玩家死亡*/
        ModelSceneWoorsBoss.prototype.onPlayerDead = function (caller, method) {
            this.offPlayerDead();
            this._playerDeadHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offPlayerDead = function () {
            if (this._playerDeadHandler) {
                this._playerDeadHandler.recover();
                this._playerDeadHandler = null;
            }
        };
        /**监听归属者变更*/
        ModelSceneWoorsBoss.prototype.onOwnerChange = function (caller, method) {
            this.offOwnerChange();
            this._ownerChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offOwnerChange = function () {
            if (this._ownerChangeHandler) {
                this._ownerChangeHandler.recover();
                this._ownerChangeHandler = null;
            }
        };
        /**监听副本发奖*/
        ModelSceneWoorsBoss.prototype.onGameReawrd = function (caller, method) {
            this.offGameReawrd();
            this._gameRewardHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offGameReawrd = function () {
            if (this._gameRewardHandler) {
                this._gameRewardHandler.recover();
                this._gameRewardHandler = null;
            }
        };
        /**监听视野boss变化*/
        ModelSceneWoorsBoss.prototype.onBossSightChangHandler = function (caller, method) {
            this.offBossSightChangHandler();
            this._bossSightChangHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offBossSightChangHandler = function () {
            if (this._bossSightChangHandler) {
                this._bossSightChangHandler.recover();
                this._bossSightChangHandler = null;
            }
        };
        ModelSceneWoorsBoss.prototype.onReceiveProvoke = function (caller, method) {
            this.offReceiveProvoke();
            this._receiveProvokeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offReceiveProvoke = function () {
            if (this._receiveProvokeHandler) {
                this._receiveProvokeHandler.recover();
                this._receiveProvokeHandler = null;
            }
        };
        /**请求发送挑衅 */
        ModelSceneWoorsBoss.prototype.requestSendProvoke = function (showType, showId, showContent, caller, method) {
            var msg = n.MessagePool.from(n.C2G_Scene_ShowWords);
            msg.ShowType = showType;
            msg.ShowId = showId;
            msg.ShowContent = showContent;
            this.request(n.MessageMap.C2G_SCENE_SHOWWORDS, msg, utils.Handler.create(this, function (data) {
                method.call(caller, data);
            }));
        };
        // /**监听爆掉远古装备 */
        // private guDaiEquipNotifyDropMsg(data: n.G2C_GuDaiEquip_NotifyDropMsg) {
        //     data.autoRecover = false;
        //     var itemVo: vo.ItemVO = <vo.ItemVO>vo.fromPool(vo.ItemVO, data.ItemId);
        //     if (data.Type == 1) {
        //         var str = Language.getExpression(Language.E_JB1HD, data.TargetName, itemVo.name);
        //         mg.alertManager.showAlert(WoorsDropAlert, true, true, [itemVo], 5, str);
        //     } else {
        //         var tipStr = Language.getExpression(Language.E_BJB1HD, data.TargetName, itemVo.name);
        //         mg.alertManager.tip(tipStr);
        //     }
        // }
        /**监听BOSS护盾开始*/
        ModelSceneWoorsBoss.prototype.onBossShieldStart = function (caller, method) {
            this.offBossShieldStart();
            this._bossShieldStartHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offBossShieldStart = function () {
            if (this._bossShieldStartHandler) {
                this._bossShieldStartHandler.recover();
                this._bossShieldStartHandler = null;
            }
        };
        /**监听BOSS护盾结束*/
        ModelSceneWoorsBoss.prototype.onBossShieldEnd = function (caller, method) {
            this.offBossShieldEnd();
            this._bossShieldEndHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offBossShieldEnd = function () {
            if (this._bossShieldEndHandler) {
                this._bossShieldEndHandler.recover();
                this._bossShieldEndHandler = null;
            }
        };
        /** */
        ModelSceneWoorsBoss.prototype.onSeiveMaxNumber = function (caller, method) {
            this.offSeiveMaxNumber();
            this._seiveMaxHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offSeiveMaxNumber = function (caller, method) {
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            if (this._seiveMaxHandler) {
                this._seiveMaxHandler.recover();
                this._seiveMaxHandler = null;
            }
        };
        /** */
        ModelSceneWoorsBoss.prototype.onSeiveMaxReward = function (caller, method) {
            this.offSeiveMaxReward();
            this._seiveMaxRewardHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneWoorsBoss.prototype.offSeiveMaxReward = function () {
            if (this._seiveMaxRewardHandler) {
                this._seiveMaxRewardHandler.recover();
                this._seiveMaxRewardHandler = null;
            }
        };
        /**请求扔色子 */
        ModelSceneWoorsBoss.prototype.requestSievesRandom = function (caller, method) {
            if (!this._sivesRandomMsg)
                this._sivesRandomMsg = new n.C2G_Public_Boss_Shield_Rand();
            n.net.request(n.MessageMap.C2G_PUBLIC_BOSS_SHIELD_RAND, this._sivesRandomMsg, utils.Handler.create(this, function (data) {
                method.call(caller, data.MyNumber);
            }));
        };
        return ModelSceneWoorsBoss;
    }(mo.ModelBase));
    mo.ModelSceneWoorsBoss = ModelSceneWoorsBoss;
    __reflect(ModelSceneWoorsBoss.prototype, "mo.ModelSceneWoorsBoss", ["mo.IModelMutilScene", "mo.IModelScene"]);
})(mo || (mo = {}));
