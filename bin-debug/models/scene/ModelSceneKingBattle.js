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
    /**王者疆场*/
    var ModelSceneKingBattle = (function (_super) {
        __extends(ModelSceneKingBattle, _super);
        function ModelSceneKingBattle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._nextRefreshSeconds = 0;
            return _this;
        }
        ModelSceneKingBattle.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            ///////
            this._curMyScore = 0;
            this._curMyRank = 0;
            this._curMyUnionScore = 0;
            this._curMyUnionRank = 0;
            this._curUnionScoreList = [];
            this._curPersonScoreList = [];
            this._attackersCollection = new eui.ArrayCollection();
            this._player = GameModels.user.player;
            this._pointInfoList = [];
            for (var i = 0; i < 5; i++) {
                var pointInfo = new PointInfo();
                pointInfo.pos = (i + 1);
                pointInfo.playerVO = null;
                this._pointInfoList.push(pointInfo);
            }
            this.onRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYRESULT, utils.Handler.create(this, this.resultAward));
            this._pointScoreReward = GameModels.dataSet.getDataSettingArrByType(241);
        };
        ModelSceneKingBattle.prototype.initializeData = function (day) {
            this._serverOpenDay = day;
        };
        ModelSceneKingBattle.prototype.enterGame = function (caller, method) {
            this._battleScene = GameModels.scene;
            this.exit();
            this.addlistenerRoutes();
            GameModels.scene.enterGame(TypeGame.KING_BATTLE_GROUD, "", this, function (result) {
                method.call(caller, result);
            });
        };
        ModelSceneKingBattle.prototype.enableSight = function () {
            this.initAttacks();
        };
        ModelSceneKingBattle.prototype.exit = function () {
            this.offAllAttacksChange();
            this.clearAttacks();
            for (var i = 0; i < this._pointInfoList.length; i++) {
                var pointInfo = this._pointInfoList[i];
                pointInfo.pos = (i + 1);
                pointInfo.playerVO = null;
            }
            this.removelistenerRoutes();
        };
        ModelSceneKingBattle.prototype.requestWarInfo = function (caller, method) {
            if (!this._warInfoMsg)
                this._warInfoMsg = new n.C2G_UnionWar_GetUnionWarInfo();
            this._warInfoMsg.ActivityId = 301;
            this.request(n.MessageMap.C2G_UNIONWAR_GETUNIONWARINFO, this._warInfoMsg, utils.Handler.create(this, function (data) {
                if (method)
                    method.call(caller);
            }));
        };
        ModelSceneKingBattle.prototype.addlistenerRoutes = function () {
            this.onRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYMYINFO, utils.Handler.create(this, this.scoreInitHandler));
            this.onRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYSCORERANK, utils.Handler.create(this, this.rankInitHandler));
            this.onRoute(n.MessageMap.G2C_UNIONWAR_NOTIFYUNIONSCORECHANGE, utils.Handler.create(this, this.scoreTeamHandler));
            this.onRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYGIFTBOX, utils.Handler.create(this, this.refreshScoreBox));
            this.onRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYPOINTENTER, utils.Handler.create(this, this.pointPlayerAddHandler));
            this.onRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYPOINTEXIT, utils.Handler.create(this, this.pointPlayerRemoveHandler));
            this._battleScene.onSightAdd(this, this.sightAddHandler);
            this._battleScene.onSightRemove(this, this.sightRemoveHandler);
            this._battleScene.onTargetChange(this, this.targetChangeHandler);
            this._battleScene.onObjectTeamStatusChange(this, this.objectStatusChangeHandler);
        };
        ModelSceneKingBattle.prototype.removelistenerRoutes = function () {
            this.offRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYMYINFO);
            this.offRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYSCORERANK);
            this.offRoute(n.MessageMap.G2C_UNIONWAR_NOTIFYUNIONSCORECHANGE);
            this.offRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYGIFTBOX);
            this.offRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYPOINTENTER);
            this.offRoute(n.MessageMap.G2C_SWORDWAR_NOTIFYPOINTEXIT);
            this._battleScene.offSightAdd(this, this.sightAddHandler);
            this._battleScene.offSightRemove(this, this.sightRemoveHandler);
            this._battleScene.offTargetChange();
            this._battleScene.offObjectTeamStatusChange(this, this.objectStatusChangeHandler);
            this.offScoreInitHandler();
            this.offScorePersonChangeHandler();
            this.offScoreTeamChangeHandler();
            this.offSwordListChangeHandler();
            this.offAllAttacksChange();
        };
        ModelSceneKingBattle.prototype.resultAward = function (data) {
            utils.timer.once(2000, this, function () {
                mg.alertManager.showAlert(RankAwardGet, true, true, data);
            });
        };
        ModelSceneKingBattle.prototype.refreshScoreBox = function (data) {
            if (this.activityEndTime < 0) {
                return;
            }
            this._boxList = [];
            var gameChaper = app.gameContext.manager.getGameKingBattlefieldFight();
            var GiftBoxList = data.GiftBoxs.concat();
            for (var _i = 0, GiftBoxList_1 = GiftBoxList; _i < GiftBoxList_1.length; _i++) {
                var boxItem = GiftBoxList_1[_i];
                boxItem.autoRecover = false;
                this._boxList.push(boxItem);
            }
            gameChaper.refreshScoreBox();
        };
        /**温泉点玩家进入 */
        ModelSceneKingBattle.prototype.pointPlayerAddHandler = function (data) {
            var playerVO = GameModels.scene.getObjectByUId(data.PlayerId);
            var pointInfo = this._pointInfoList[(data.Pos - 1)];
            pointInfo.pos = data.Pos;
            pointInfo.playerVO = playerVO;
            // this.removeFromAttacks(playerVO);
            if (this._swordListChangeHandler)
                this._swordListChangeHandler.run();
        };
        /**温泉点玩家离开 */
        ModelSceneKingBattle.prototype.pointPlayerRemoveHandler = function (data) {
            var pointInfo = this._pointInfoList[(data.Pos - 1)];
            var playerVO = pointInfo.playerVO;
            pointInfo.playerVO = null;
            // this.addToAttacks(playerVO, false);
            if (this._swordListChangeHandler)
                this._swordListChangeHandler.run();
        };
        /**通过温泉点Id取完整信息 */
        ModelSceneKingBattle.prototype.getPointInfoByPos = function (pos) {
            for (var _i = 0, _a = this._pointInfoList; _i < _a.length; _i++) {
                var pointInfo = _a[_i];
                if (pointInfo.pos == pos) {
                    return pointInfo;
                }
            }
            return null;
        };
        Object.defineProperty(ModelSceneKingBattle.prototype, "pointInfoList", {
            /**温泉点信息数组 */
            get: function () {
                return this._pointInfoList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "pointScoreReward", {
            get: function () {
                return this._pointScoreReward;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneKingBattle.prototype.rankInitHandler = function (data) {
            var unionScoreList = data.PersonScoreList.concat();
            for (var _i = 0, unionScoreList_1 = unionScoreList; _i < unionScoreList_1.length; _i++) {
                var unionItem = unionScoreList_1[_i];
                unionItem.autoRecover = false;
                this._curUnionScoreList.push(unionItem);
            }
            var personScoreList = data.PersonScoreList.concat();
            this._curPersonScoreList = [];
            for (var _a = 0, personScoreList_1 = personScoreList; _a < personScoreList_1.length; _a++) {
                var personItem = personScoreList_1[_a];
                personItem.autoRecover = false;
                this._curPersonScoreList.push(personItem);
            }
            if (this._scoreInitHandler)
                this._scoreInitHandler.run();
        };
        ModelSceneKingBattle.prototype.scoreInitHandler = function (data) {
            if (this._curMyScore < data.MyScore) {
                mg.alertManager.tip(Language.getExpression(Language.E_HD1JF, (data.MyScore - this._curMyScore)));
            }
            this._curMyScore = data.MyScore;
            this._curMyRank = data.MyRank;
            this._nextRefreshSeconds = data.NextRefreshSeconds;
            this._boxStatus = [];
            var boxStatusList = data.BoxStatus.concat();
            for (var _i = 0, boxStatusList_1 = boxStatusList; _i < boxStatusList_1.length; _i++) {
                var boxItem = boxStatusList_1[_i];
                boxItem.autoRecover = false;
                this._boxStatus.push(boxItem);
            }
            if (this._scoreInitHandler)
                this._scoreInitHandler.run();
        };
        ModelSceneKingBattle.prototype.getPersonScoreData = function (uid) {
            for (var _i = 0, _a = this._curPersonScoreList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.PlayerId == uid)
                    return item;
            }
            return null;
        };
        ModelSceneKingBattle.prototype.getUnionScoreList = function (UnionId) {
            for (var _i = 0, _a = this._curUnionScoreList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.UnionId == UnionId)
                    return item;
            }
            return null;
        };
        ModelSceneKingBattle.prototype.scorePersonChangeHandler = function (data) {
            var item = this.getPersonScoreData(data.PlayerId);
            if (item) {
                item.Score = data.Score;
            }
            else {
                data.autoRecover = false;
                this._curPersonScoreList.push(data);
            }
            this._curPersonScoreList.sort(function (a, b) {
                if (a.Score < b.Score)
                    return 1;
                else if (a.Score > b.Score)
                    return -1;
            });
            for (var i = 0; i < this._curPersonScoreList.length; i++) {
                this._curPersonScoreList[i].Rank = (i + 1);
                if (this._curPersonScoreList[i].PlayerId == GameModels.user.player.uid) {
                    this._curMyScore = this._curPersonScoreList[i].Score;
                    this._curMyRank = (i + 1);
                }
            }
            if (this._scorePersonChangeHandler)
                this._scorePersonChangeHandler.run();
        };
        ModelSceneKingBattle.prototype.scoreTeamHandler = function (data) {
            var item = this.getUnionScoreList(data.UnionId.toString());
            if (item) {
                item.Score = data.Score;
            }
            else {
                data.autoRecover = false;
                this._curUnionScoreList.push(data);
            }
            this._curUnionScoreList.sort(function (a, b) {
                if (a.Score < b.Score)
                    return 1;
                else if (a.Score > b.Score)
                    return -1;
            });
            for (var i = 0; i < this._curUnionScoreList.length; i++) {
                this._curUnionScoreList[i].Rank = (i + 1);
                if (this._curUnionScoreList[i].UnionId == GameModels.user.player.legionId) {
                    this._curMyUnionScore = this._curUnionScoreList[i].Score;
                    this._curMyUnionRank = (i + 1);
                }
            }
            if (this._scoreTeamChangeHandler)
                this._scoreTeamChangeHandler.run();
        };
        ModelSceneKingBattle.prototype.sightAddHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.addToAttacks(smartVO, false);
            }
        };
        ModelSceneKingBattle.prototype.sightRemoveHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.removeFromAttacks(smartVO);
            }
        };
        ModelSceneKingBattle.prototype.targetChangeHandler = function (smartVO, target) {
            // if (target == GameModels.user.player && (smartVO instanceof vo.GamePlayerVO)) {
            //     this.addToAttacks(smartVO, true);
            // }
        };
        ModelSceneKingBattle.prototype.objectStatusChangeHandler = function (smartVO, isAlife, killer, lostContent) {
            if (isAlife) {
                if (smartVO instanceof vo.GamePlayerVO) {
                    if (smartVO != GameModels.user.player) {
                        this.addToAttacks(smartVO, false);
                    }
                }
            }
            else {
                if (smartVO instanceof vo.GamePlayerVO) {
                    if (smartVO != GameModels.user.player) {
                        this.removeFromAttacks(smartVO);
                    }
                }
            }
            // if (smartVO instanceof vo.GamePlayerVO) {
            //     if (smartVO.stateDead) {
            //         this.removeFromAttacks(smartVO);
            //     } else {
            //         this.addToAttacks(smartVO, false);
            //     }
            // }
        };
        /**同步位置信息 */
        ModelSceneKingBattle.prototype.syncPosition = function (type, objectId, x, y) {
            GameModels.scene.syncPosition(type, objectId, x, y);
        };
        /**同步技能施放 */
        ModelSceneKingBattle.prototype.syncSkill = function (castObjId, skillId, targetObjId, direct, posX, posY) {
            GameModels.scene.syncSkill(castObjId, skillId, targetObjId, direct, posX, posY);
        };
        // /**同步解合体 */
        // public syncMerge(petUId: string, status: boolean) {
        //     GameModels.scene.syncMerge(petUId, status);
        // }
        /**请求复活 （0:常规，1:原地立即复活）*/
        ModelSceneKingBattle.prototype.requestRelife = function (type) {
            GameModels.scene.requestRelife(type);
        };
        /**同步当前目标 */
        ModelSceneKingBattle.prototype.syncTarget = function (smartVO) {
            GameModels.scene.syncTarget(smartVO);
        };
        /**取视野对象 */
        ModelSceneKingBattle.prototype.getObjectByUId = function (uid) {
            return GameModels.scene.getObjectByUId(uid);
        };
        /**取对象列表 */
        ModelSceneKingBattle.prototype.getObjectVOList = function (actorType) {
            return GameModels.scene.getObjectVOList(actorType);
        };
        ModelSceneKingBattle.prototype.initAttacks = function () {
            for (var _i = 0, _a = this._battleScene.sights; _i < _a.length; _i++) {
                var smartVO = _a[_i];
                if (smartVO instanceof vo.GamePlayerVO) {
                    this._attackersCollection.addItem(smartVO);
                }
            }
        };
        /**添加到攻击列表 */
        ModelSceneKingBattle.prototype.addToAttacks = function (playerVO, prior) {
            if (playerVO == GameModels.user.player)
                return;
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
        ModelSceneKingBattle.prototype.removeFromAttacks = function (playerVO) {
            var index = this._attackersCollection.getItemIndex(playerVO);
            if (index >= 0) {
                this._attackersCollection.removeItemAt(index);
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        /**清空攻击列表 */
        ModelSceneKingBattle.prototype.clearAttacks = function () {
            if (this._attackersCollection.length) {
                this._attackersCollection.removeAll();
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        Object.defineProperty(ModelSceneKingBattle.prototype, "attackersCollection", {
            //获取攻击列表
            get: function () {
                return this._attackersCollection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "killer", {
            /**击杀者 */
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneKingBattle.prototype.onScoreInitHandler = function (caller, method) {
            this.offScoreInitHandler();
            this._scoreInitHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneKingBattle.prototype.offScoreInitHandler = function () {
            if (this._scoreInitHandler) {
                this._scoreInitHandler.recover();
                this._scoreInitHandler = null;
            }
        };
        ModelSceneKingBattle.prototype.onScorePersonChangeHandler = function (caller, method) {
            this.offScorePersonChangeHandler();
            this._scorePersonChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneKingBattle.prototype.offScorePersonChangeHandler = function () {
            if (this._scorePersonChangeHandler) {
                this._scorePersonChangeHandler.recover();
                this._scorePersonChangeHandler = null;
            }
        };
        ModelSceneKingBattle.prototype.onScoreTeamChangeHandler = function (caller, method) {
            this.offScoreTeamChangeHandler();
            this._scoreTeamChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneKingBattle.prototype.offScoreTeamChangeHandler = function () {
            if (this._scoreTeamChangeHandler) {
                this._scoreTeamChangeHandler.recover();
                this._scoreTeamChangeHandler = null;
            }
        };
        ModelSceneKingBattle.prototype.onSwordListChangeHandler = function (caller, method) {
            this.offSwordListChangeHandler();
            this._swordListChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneKingBattle.prototype.offSwordListChangeHandler = function () {
            if (this._swordListChangeHandler) {
                this._swordListChangeHandler.recover();
                this._swordListChangeHandler = null;
            }
        };
        ModelSceneKingBattle.prototype.onAttacksChange = function (caller, method) {
            if (!this._attacksChangeHandlers) {
                this._attacksChangeHandlers = new utils.Handlers(false);
            }
            this._attacksChangeHandlers.add(caller, method, null, false);
        };
        ModelSceneKingBattle.prototype.offAttacksChange = function (caller, method) {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.remove(caller, method);
            }
        };
        ModelSceneKingBattle.prototype.offAllAttacksChange = function () {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.clear();
            }
        };
        Object.defineProperty(ModelSceneKingBattle.prototype, "curMyScore", {
            ////////////////////////////
            get: function () {
                return this._curMyScore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "curMyRank", {
            get: function () {
                return this._curMyRank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "nextRefreshSeconds", {
            get: function () {
                return this._nextRefreshSeconds;
            },
            set: function (v) {
                this._nextRefreshSeconds = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "curMyUnionScore", {
            get: function () {
                return this._curMyUnionScore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "curMyUnionRank", {
            get: function () {
                return this._curMyUnionRank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "curUnionScoreList", {
            get: function () {
                return this._curUnionScoreList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "curPersonScoreList", {
            get: function () {
                return this._curPersonScoreList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "boxList", {
            get: function () {
                return this._boxList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "boxStatus", {
            get: function () {
                this._boxStatus.sort(function (a, b) {
                    return a.BoxId > b.BoxId ? 1 : -1;
                });
                return this._boxStatus;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneKingBattle.prototype.getSwordPos = function (id) {
            var arr = [];
            var data = GameModels.dataSet.getDataSettingById(242001);
            var str = data.value.split(";");
            for (var i = 0; i < str.length; i++) {
                var data_1 = { x: 0, y: 0 };
                data_1.x = parseInt(str[i].split("&")[1].split("_")[0]);
                data_1.y = parseInt(str[i].split("&")[1].split("_")[1]);
                arr.push(data_1);
            }
            return arr[id];
        };
        ModelSceneKingBattle.prototype.getBox = function (xy, complte) {
            var msg = n.MessagePool.from(n.C2G_SwordWar_OpenGiftBox);
            msg.GiftBox = xy;
            this.request(n.MessageMap.C2G_SWORDWAR_OPENGIFTBOX, msg, utils.Handler.create(this, function (data) {
                var gameChaper = app.gameContext.manager.getGameKingBattlefieldFight();
                for (var i = 0; i < this._boxList.length; i++) {
                    if (data.GiftBox.X == this._boxList[i].X && data.GiftBox.Y == this._boxList[i].Y) {
                        this._boxList.splice(i, 1);
                    }
                }
                gameChaper.refreshScoreBox();
                if (complte)
                    complte.run();
            }));
        };
        ModelSceneKingBattle.prototype.ReceiveScoreBox = function (id, complte) {
            var msg = n.MessagePool.from(n.C2G_SwordWar_Receive_ScoreBox);
            msg.BoxId = id;
            this.request(n.MessageMap.C2G_SWORDWAR_RECEIVE_SCOREBOX, msg, utils.Handler.create(this, function (data) {
                if (complte)
                    complte.run();
            }));
        };
        Object.defineProperty(ModelSceneKingBattle.prototype, "activityLastTime", {
            get: function () {
                return GameModels.activityNotice.curActivityLastTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneKingBattle.prototype, "activityEndTime", {
            get: function () {
                return GameModels.activityNotice.curActivityEndTime;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneKingBattle.RELIFETYPE = 501;
        return ModelSceneKingBattle;
    }(mo.ModelBase));
    mo.ModelSceneKingBattle = ModelSceneKingBattle;
    __reflect(ModelSceneKingBattle.prototype, "mo.ModelSceneKingBattle", ["mo.IModelMutilScene", "mo.IModelScene"]);
    var PointInfo = (function () {
        function PointInfo() {
        }
        return PointInfo;
    }());
    mo.PointInfo = PointInfo;
    __reflect(PointInfo.prototype, "mo.PointInfo");
})(mo || (mo = {}));
