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
    /**异族来袭*/
    var ModelSceneGodDie = (function (_super) {
        __extends(ModelSceneGodDie, _super);
        function ModelSceneGodDie() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._step = [];
            _this._score = 0;
            /** 获取神陨boss信息*/
            _this._leftCount = 0;
            return _this;
        }
        ModelSceneGodDie.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._attackersCollection = new eui.ArrayCollection();
            this._player = GameModels.user.player;
            this._temReward = Templates.getTemplatesByProperty(templates.Map.ACTREWARD, "type", 10801);
            this.getDieBossInfo();
            GameModels.user.player.onPropertyChange(TypeProperty.YUDIJIFEN, this, this.updataScoreChange);
        };
        ModelSceneGodDie.prototype.initializeData = function (day) {
            this._serverOpenDay = day;
        };
        ModelSceneGodDie.prototype.enterGame = function (copyId, caller, method) {
            this._copyId = copyId;
            this._battleScene = GameModels.scene;
            this.exit();
            this.addlistenerRoutes();
            GameModels.scene.enterGame(TypeGame.GOD_DIE, copyId, this, function (result) {
                method.call(caller, result);
            });
        };
        ModelSceneGodDie.prototype.enableSight = function () {
            this.initAttacks();
        };
        ModelSceneGodDie.prototype.exit = function () {
            this.offAllAttacksChange();
            this.clearAttacks();
            this.removelistenerRoutes();
        };
        ModelSceneGodDie.prototype.addlistenerRoutes = function () {
            this.getDieBossInfo();
            this._battleScene.onSightAdd(this, this.sightAddHandler);
            this._battleScene.onSightRemove(this, this.sightRemoveHandler);
            this._battleScene.onTargetChange(this, this.targetChangeHandler);
            this._battleScene.onObjectTeamStatusChange(this, this.objectStatusChangeHandler);
            this.onRoute(n.MessageMap.G2C_SHENYUNZHIDI_COPY_INFO, utils.Handler.create(this, this.receiveDieBossInfo));
            this.onRoute(n.MessageMap.G2C_SHENYUNZHIDI_NOTIFYBOSSREWARD, utils.Handler.create(this, this.receiveReward));
        };
        ModelSceneGodDie.prototype.removelistenerRoutes = function () {
            GameModels.sceneGodDie.getDieBossInfo();
            this.offRoute(n.MessageMap.G2C_SHENYUNZHIDI_COPY_INFO);
            this.offRoute(n.MessageMap.G2C_SHENYUNZHIDI_NOTIFYBOSSREWARD);
            this._battleScene.offSightAdd(this, this.sightAddHandler);
            this._battleScene.offSightRemove(this, this.sightRemoveHandler);
            this._battleScene.offTargetChange();
            this._battleScene.offObjectTeamStatusChange(this, this.objectStatusChangeHandler);
            this.offAllAttacksChange();
        };
        ModelSceneGodDie.prototype.sightAddHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.addToAttacks(smartVO, false);
            }
        };
        ModelSceneGodDie.prototype.sightRemoveHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.removeFromAttacks(smartVO);
            }
        };
        ModelSceneGodDie.prototype.targetChangeHandler = function (smartVO, target) {
            if (target == GameModels.user.player && (smartVO instanceof vo.GamePlayerVO)) {
                this.addToAttacks(smartVO, true);
            }
        };
        ModelSceneGodDie.prototype.objectStatusChangeHandler = function (smartVO, isAlife, killer, lostContent) {
            if (smartVO instanceof vo.GamePlayerVO) {
                if (smartVO.stateDead) {
                    this.removeFromAttacks(smartVO);
                }
                else {
                    this.addToAttacks(smartVO, false);
                }
            }
        };
        /**同步位置信息 */
        ModelSceneGodDie.prototype.syncPosition = function (type, objectId, x, y) {
            GameModels.scene.syncPosition(type, objectId, x, y);
        };
        /**同步技能施放 */
        ModelSceneGodDie.prototype.syncSkill = function (castObjId, skillId, targetObjId, direct, posX, posY) {
            GameModels.scene.syncSkill(castObjId, skillId, targetObjId, direct, posX, posY);
        };
        // /**同步解合体 */
        // public syncMerge(petUId: string, status: boolean) {
        //     GameModels.scene.syncMerge(petUId, status);
        // }
        /**请求复活 （0:常规，1:原地立即复活）*/
        ModelSceneGodDie.prototype.requestRelife = function (type) {
            GameModels.scene.requestRelife(type);
        };
        /**同步当前目标 */
        ModelSceneGodDie.prototype.syncTarget = function (smartVO) {
            GameModels.scene.syncTarget(smartVO);
        };
        /**取视野对象 */
        ModelSceneGodDie.prototype.getObjectByUId = function (uid) {
            return GameModels.scene.getObjectByUId(uid);
        };
        /**取对象列表 */
        ModelSceneGodDie.prototype.getObjectVOList = function (actorType) {
            return GameModels.scene.getObjectVOList(actorType);
        };
        ModelSceneGodDie.prototype.initAttacks = function () {
            for (var _i = 0, _a = this._battleScene.sights; _i < _a.length; _i++) {
                var smartVO = _a[_i];
                if (smartVO instanceof vo.GamePlayerVO && smartVO.uid != GameModels.user.player.uid) {
                    this._attackersCollection.addItem(smartVO);
                }
            }
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.runWith(false);
            }
        };
        ModelSceneGodDie.prototype.getBattleSceneSights = function () {
            return this._battleScene.sights;
        };
        ModelSceneGodDie.prototype.getAllBosses = function () {
            return this._battleScene.getObjectVOList(TypeActor.MONSTER);
        };
        /**添加到攻击列表 */
        ModelSceneGodDie.prototype.addToAttacks = function (playerVO, prior) {
            if (playerVO.uid == GameModels.user.player.uid) {
                return;
            }
            var index = this._attackersCollection.getItemIndex(playerVO);
            if (index < 0) {
                prior ? this._attackersCollection.addItemAt(playerVO, 0) : this._attackersCollection.addItem(playerVO);
            }
            else {
                if (prior) {
                    this._attackersCollection.removeItemAt(index);
                    this._attackersCollection.addItemAt(playerVO, 0);
                }
            }
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.runWith(true);
            }
        };
        /**从攻击列表移除 */
        ModelSceneGodDie.prototype.removeFromAttacks = function (playerVO) {
            var index = this._attackersCollection.getItemIndex(playerVO);
            if (index >= 0) {
                this._attackersCollection.removeItemAt(index);
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        /**清空攻击列表 */
        ModelSceneGodDie.prototype.clearAttacks = function () {
            if (this._attackersCollection.length) {
                this._attackersCollection.removeAll();
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        Object.defineProperty(ModelSceneGodDie.prototype, "attackersCollection", {
            //获取攻击列表
            get: function () {
                return this._attackersCollection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneGodDie.prototype, "killer", {
            /**击杀者 */
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneGodDie.prototype.onAttacksChange = function (caller, method) {
            if (!this._attacksChangeHandlers) {
                this._attacksChangeHandlers = new utils.Handlers(false);
            }
            this._attacksChangeHandlers.add(caller, method, null, false);
        };
        ModelSceneGodDie.prototype.offAttacksChange = function (caller, method) {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.remove(caller, method);
            }
        };
        ModelSceneGodDie.prototype.offAllAttacksChange = function () {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.clear();
            }
        };
        Object.defineProperty(ModelSceneGodDie.prototype, "activityLastTime", {
            //////////////神陨数据//////////////
            get: function () {
                return GameModels.activityNotice.curActivityLastTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneGodDie.prototype, "activityEndTime", {
            get: function () {
                return GameModels.activityNotice.curActivityEndTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneGodDie.prototype, "copyId", {
            get: function () {
                var id = (parseInt(this._copyId) - 640000) / 100 - 1;
                return id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneGodDie.prototype, "bossList", {
            get: function () {
                return this._bossList;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneGodDie.prototype.getMonsterData = function (id) {
            var tmp = Templates.getTemplateByProperty(templates.Map.OTHERMONSTER, "id", id);
            return tmp;
        };
        ModelSceneGodDie.prototype.getCopyData = function (id) {
            var tmp = Templates.getTemplateByProperty(templates.Map.OTHERCHAPTER, "id", id);
            return tmp;
        };
        ModelSceneGodDie.prototype.updataScoreChange = function () {
            mg.alertManager.tip(Language.getExpression(Language.E_HD1JF, (GameModels.user.player.yudiJifen - this._score)));
            this._score = GameModels.user.player.yudiJifen;
            this.dispatchEventWith(mo.ModelSceneGodDie.SCORE_CHANGE);
        };
        Object.defineProperty(ModelSceneGodDie.prototype, "step", {
            get: function () {
                return this._step;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneGodDie.prototype, "score", {
            get: function () {
                return this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneGodDie.prototype, "rewardArr", {
            get: function () {
                this._temReward.sort(function (a, b) {
                    return GameModels.sceneGodDie.step.indexOf(a.id) - GameModels.sceneGodDie.step.indexOf(b.id);
                });
                return this._temReward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneGodDie.prototype, "allFinsh", {
            get: function () {
                for (var i = 0; i < this._temReward.length; i++) {
                    if (GameModels.sceneGodDie.step.indexOf(this._temReward[i].id) == -1) {
                        return false;
                    }
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneGodDie.prototype, "redPoint", {
            get: function () {
                for (var i = 0; i < this._temReward.length; i++) {
                    if (this._score >= this._temReward[i].value && GameModels.sceneGodDie.step.indexOf(this._temReward[i].id) == -1) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        /**领奖*/
        ModelSceneGodDie.prototype.GetReward = function (rewardId, complte) {
            var msg = n.MessagePool.from(n.C2G_ShenYunZhiDi_GetReward);
            msg.RewardId = rewardId;
            this.request(n.MessageMap.C2G_SHENYUNZHIDI_GETREWARD, msg, utils.Handler.create(this, function (data) {
                this._step = data.RewardList.concat();
                this.dispatchEventWith(mo.ModelSceneGodDie.SCORE_CHANGE);
                if (complte)
                    complte.run();
            }));
        };
        Object.defineProperty(ModelSceneGodDie.prototype, "leftCount", {
            get: function () {
                return this._leftCount <= 0 ? 0 : this._leftCount;
            },
            set: function (v) {
                this._leftCount = v;
                this.dispatchEventWith(mo.ModelSceneGodDie.LEFT_CHANGE);
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneGodDie.prototype.getDieBossInfo = function (complte) {
            var msg = n.MessagePool.from(n.C2G_ShenYunZhiDi_Copy_Info);
            this.request(n.MessageMap.C2G_SHENYUNZHIDI_COPY_INFO, msg, utils.Handler.create(this, function (data) {
                data.autoRecover = false;
                this._bossList = [];
                for (var i = 0; i < data.BossList.length; i++) {
                    data.BossList[i].autoRecover = false;
                }
                this._bossList = data.BossList;
                this._bossList.sort(function (a, b) {
                    if (a.CopyId < b.CopyId)
                        return -1;
                    else if (a.CopyId > b.CopyId)
                        return 1;
                    else if (a.MonsterId < b.MonsterId)
                        return -1;
                    else if (a.MonsterId > b.MonsterId)
                        return 1;
                    else
                        return 0;
                });
                this._score = data.Score;
                this._step = data.RewardList.concat();
                this.leftCount = data.LeftCount;
                if (complte)
                    complte.run();
                // GameModels.state.updateState(GameRedState.GOD_DIE);
                this.dispatchEventWith(ModelSceneGodDie.GET_INFO);
            }));
        };
        /** 接受神陨boss信息*/
        ModelSceneGodDie.prototype.receiveDieBossInfo = function (data) {
            data.autoRecover = false;
            this._bossList = [];
            for (var i = 0; i < data.BossList.length; i++) {
                data.BossList[i].autoRecover = false;
            }
            this._bossList = data.BossList;
            this._bossList.sort(function (a, b) {
                if (a.CopyId < b.CopyId)
                    return -1;
                else if (a.CopyId > b.CopyId)
                    return 1;
                else if (a.MonsterId < b.MonsterId)
                    return -1;
                else if (a.MonsterId > b.MonsterId)
                    return 1;
                else
                    return 0;
            });
            // GameModels.state.updateState(GameRedState.GOD_DIE);
            this.dispatchEventWith(ModelSceneGodDie.GET_INFO);
        };
        ModelSceneGodDie.prototype.receiveReward = function (data) {
            this.leftCount = data.LeftCount;
            if (data.Items && data.Items.length) {
                var arr = [];
                for (var i = 0; i < data.Items.length; i++) {
                    arr.push(data.Items[i].Id + "_" + data.Items[i].Count);
                }
                mg.alertManager.showAlert(MaiGuLukyBossRewardAlert, true, true, arr, utils.Handler.create(this, function () {
                }));
            }
            else {
                mg.alertManager.tip(Language.J_JRLQCSYYW, 0xff0000);
            }
        };
        ModelSceneGodDie.prototype.checkRed = function () {
            return false;
        };
        //当前正在战斗的
        ModelSceneGodDie.GET_INFO = "GET_INFO";
        ModelSceneGodDie.SCORE_CHANGE = "SCORE_CHANGE";
        ModelSceneGodDie.LEFT_CHANGE = "LEFT_CHANGE";
        return ModelSceneGodDie;
    }(mo.ModelBase));
    mo.ModelSceneGodDie = ModelSceneGodDie;
    __reflect(ModelSceneGodDie.prototype, "mo.ModelSceneGodDie", ["mo.IModelMutilScene", "mo.IModelScene"]);
})(mo || (mo = {}));
