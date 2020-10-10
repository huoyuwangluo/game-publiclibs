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
    /**阵营战*/
    var ModelSceneLegion = (function (_super) {
        __extends(ModelSceneLegion, _super);
        function ModelSceneLegion() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelSceneLegion.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._myScore = 0;
            this._myRank = 0;
            this._myUnionScore = 0;
            this._myUnionRank = 0;
            this._unionScoreList = [];
            this._personScoreList = [];
            this._heFuPassDay = 0;
            this._curMyScore = 0;
            this._curMyRank = 0;
            this._curMyUnionScore = 0;
            this._curMyUnionRank = 0;
            this._curUnionScoreList = [];
            this._curPersonScoreList = [];
            this._attackersCollection = new eui.ArrayCollection();
            this._personScoreReward = GameModels.dataSet.getDataSettingArrByType(220);
            this._deffenceSideUnionName = "";
            this._deffenceSideUnionId = "";
            this._guWuTimes = 0;
            this._guWuNeedCount = 0;
            this._allArmyGuWuTimes = 0;
            this._allArmyGuWuNeedCount = 0;
            this._leftWuDiCnt = 0;
            this._bossList = [];
            this._bossListleftWuDiCnt = [];
            this._useBossList = [];
            this.onRoute(n.MessageMap.G2C_UNIONWAR_NOFITYWUDIINFO, utils.Handler.create(this, this.wuDiInitHandler, null, false));
        };
        ModelSceneLegion.prototype.getBoosId = function (legionId) {
            if (legionId == "1") {
                return mo.ModelSceneLegion.weiBossId;
            }
            else if (legionId == "2") {
                return mo.ModelSceneLegion.shuBossId;
            }
            else {
                return mo.ModelSceneLegion.wuBossId;
            }
        };
        ModelSceneLegion.prototype.initializeData = function (day) {
            this._serverOpenDay = day;
        };
        Object.defineProperty(ModelSceneLegion.prototype, "serverOpenDay", {
            get: function () {
                return this._serverOpenDay;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneLegion.prototype.enterGame = function (caller, method) {
            this._battleScene = GameModels.scene;
            this.exit();
            this.addlistenerRoutes();
            GameModels.scene.enterGame(TypeGame.LEGION_WAR, "", this, function (result) {
                method.call(caller, result);
            });
        };
        ModelSceneLegion.prototype.enableSight = function () {
            this.initAttacks();
        };
        ModelSceneLegion.prototype.exit = function () {
            this.offAllAttacksChange();
            this.clearAttacks();
            this.removelistenerRoutes();
            this._deffenceSideUnionName = "";
            this._deffenceSideUnionId = "";
        };
        ModelSceneLegion.prototype.requestWarInfo = function (caller, method) {
            var _this = this;
            if (!this._warInfoMsg)
                this._warInfoMsg = new n.C2G_UnionWar_GetUnionWarInfo();
            this._warInfoMsg.ActivityId = 101;
            this.request(n.MessageMap.C2G_UNIONWAR_GETUNIONWARINFO, this._warInfoMsg, utils.Handler.create(this, function (data) {
                if (_this._unionScoreList) {
                    for (var _i = 0, _a = _this._unionScoreList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._unionScoreList.length = 0;
                }
                if (_this._personScoreList) {
                    for (var _b = 0, _c = _this._personScoreList; _b < _c.length; _b++) {
                        var item1 = _c[_b];
                        n.MessagePool.to(item1);
                    }
                    _this._personScoreList.length = 0;
                }
                _this._winUnionName = data.UnionWarInfo.WinUnionName;
                _this._myScore = data.UnionWarInfo.MyScore;
                _this._myRank = data.UnionWarInfo.MyRank;
                _this._myUnionScore = data.UnionWarInfo.MyUnionScore;
                _this._myUnionRank = data.UnionWarInfo.MyUnionRank;
                _this._heFuPassDay = data.HeFuPassDay;
                _this._guWuTimes = data.UnionWarInfo.GuWuInfo.YuanBaoGuWuTimes;
                _this._guWuNeedCount = data.UnionWarInfo.GuWuInfo.YuanBaoGuWuNeed;
                _this._allArmyGuWuTimes = data.UnionWarInfo.UnionGuWuInfo.YuanBaoGuWuTimes;
                _this._allArmyGuWuNeedCount = data.UnionWarInfo.UnionGuWuInfo.YuanBaoGuWuNeed;
                _this._useBossList = data.UnionWarInfo.UseBossList.concat();
                GameModels.user.player.relifeCount = data.UnionWarInfo.RelifeCount;
                _this._unionScoreList = data.UnionWarInfo.UnionScoreList.concat();
                for (var _d = 0, _e = _this.unionScoreList; _d < _e.length; _d++) {
                    var unionItem = _e[_d];
                    unionItem.autoRecover = false;
                }
                _this._personScoreList = data.UnionWarInfo.PersonScoreList.concat();
                for (var _f = 0, _g = _this._personScoreList; _f < _g.length; _f++) {
                    var personItem = _g[_f];
                    personItem.autoRecover = false;
                }
                if (method)
                    method.call(caller);
            }));
        };
        ModelSceneLegion.prototype.addlistenerRoutes = function () {
            this.onRoute(n.MessageMap.G2C_UNIONWAR_NOTIFYSCORE, utils.Handler.create(this, this.scoreInitHandler));
            this.onRoute(n.MessageMap.G2C_UNIONWAR_MERGENOTIFYSCORECHANGE, utils.Handler.create(this, this.mergeScoreChangeHandler));
            //this.onRoute(n.MessageMap.G2C_UNIONWAR_NOTIFYPERSONALSCORECHANGE, utils.Handler.create(this, this.scorePersonChangeHandler))
            //this.onRoute(n.MessageMap.G2C_UNIONWAR_NOTIFYUNIONSCORECHANGE, utils.Handler.create(this, this.scoreTeamHandler));
            var temp = Templates.getTemplateById(templates.Map.SCENEACTIVITY, mo.ModelActivityNotice.LEGION_WAR);
            var timer = GameModels.timer.getTimer();
            var date = new Date(timer);
            var endNum = (timer / 1000) - (3600 * date.getHours()) - (60 * date.getMinutes()) - date.getSeconds();
            this._endTime = endNum + temp.time + 20 * 3600;
            this._battleScene.onSightAdd(this, this.sightAddHandler);
            this._battleScene.onSightRemove(this, this.sightRemoveHandler);
            this._battleScene.onTargetChange(this, this.targetChangeHandler);
            this._battleScene.onObjectTeamStatusChange(this, this.objectStatusChangeHandler);
        };
        ModelSceneLegion.prototype.removelistenerRoutes = function () {
            this.offRoute(n.MessageMap.G2C_UNIONWAR_NOTIFYSCORE);
            this.offRoute(n.MessageMap.G2C_UNIONWAR_MERGENOTIFYSCORECHANGE);
            //this.offRoute(n.MessageMap.G2C_UNIONWAR_NOTIFYPERSONALSCORECHANGE);
            //this.offRoute(n.MessageMap.G2C_UNIONWAR_NOTIFYUNIONSCORECHANGE);
            this._battleScene.offSightAdd(this, this.sightAddHandler);
            this._battleScene.offSightRemove(this, this.sightRemoveHandler);
            this._battleScene.offTargetChange();
            this._battleScene.offObjectTeamStatusChange(this, this.objectStatusChangeHandler);
            this.offOwnerChange();
            this.offScoreInitHandler();
            this.offScorePersonChangeHandler();
            this.offScoreTeamChangeHandler();
        };
        /**监听归属者变更*/
        ModelSceneLegion.prototype.onOwnerChange = function (caller, method) {
            this.offOwnerChange();
            this._ownerChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneLegion.prototype.offOwnerChange = function () {
            if (this._ownerChangeHandler) {
                this._ownerChangeHandler.recover();
                this._ownerChangeHandler = null;
            }
        };
        /**请求鼓舞 */
        ModelSceneLegion.prototype.requestWarGuWu = function (type) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_UnionWar_DoGuWu);
            msg.Type = type;
            this.request(n.MessageMap.C2G_UNIONWAR_DOGUWU, msg, utils.Handler.create(this, function (data) {
                if (data.Type == 0) {
                    _this._guWuTimes = data.GuWuInfo.YuanBaoGuWuTimes;
                    _this._guWuNeedCount = data.GuWuInfo.YuanBaoGuWuNeed;
                }
                else {
                    _this._allArmyGuWuTimes = data.GuWuInfo.YuanBaoGuWuTimes;
                    _this._allArmyGuWuNeedCount = data.GuWuInfo.YuanBaoGuWuNeed;
                }
                if (_this._guWuCountChangHandler)
                    _this._guWuCountChangHandler.run();
            }));
        };
        /**监听鼓舞次数变更*/
        ModelSceneLegion.prototype.onGuWuCountChangHandler = function (caller, method) {
            this.offGuWuCountChangHandler();
            this._guWuCountChangHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneLegion.prototype.offGuWuCountChangHandler = function () {
            if (this._guWuCountChangHandler) {
                this._guWuCountChangHandler.recover();
                this._guWuCountChangHandler = null;
            }
        };
        ModelSceneLegion.prototype.scoreInitHandler = function (data) {
            if (this._curUnionScoreList) {
                for (var _i = 0, _a = this._curUnionScoreList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    n.MessagePool.to(item);
                }
                this._curUnionScoreList.length = 0;
            }
            if (this._curPersonScoreList) {
                for (var _b = 0, _c = this._curPersonScoreList; _b < _c.length; _b++) {
                    var item1 = _c[_b];
                    n.MessagePool.to(item1);
                }
                this._curPersonScoreList.length = 0;
            }
            this._curMyScore = data.UnionWarInfo.MyScore;
            this._curMyRank = data.UnionWarInfo.MyRank;
            this._curMyUnionScore = data.UnionWarInfo.MyUnionScore;
            this._curMyUnionRank = data.UnionWarInfo.MyUnionRank;
            var unionScoreList = data.UnionWarInfo.UnionScoreList.concat();
            for (var _d = 0, unionScoreList_1 = unionScoreList; _d < unionScoreList_1.length; _d++) {
                var unionItem = unionScoreList_1[_d];
                unionItem.autoRecover = false;
                this._curUnionScoreList.push(unionItem);
            }
            var personScoreList = data.UnionWarInfo.PersonScoreList.concat();
            for (var _e = 0, personScoreList_1 = personScoreList; _e < personScoreList_1.length; _e++) {
                var personItem = personScoreList_1[_e];
                personItem.autoRecover = false;
                this._curPersonScoreList.push(personItem);
            }
            if (this._scoreInitHandler)
                this._scoreInitHandler.run();
        };
        /**请求无敌 */
        ModelSceneLegion.prototype.requestWarWuDi = function (bossId) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_UnionWar_UseWuDi);
            msg.BossObjectId = bossId;
            this.request(n.MessageMap.C2G_UNIONWAR_USEWUDI, msg, utils.Handler.create(this, function (data) {
                _this._useBossList = [];
                _this._useBossList = data.UseBossList.concat();
                if (_this._wuDiChangHandler)
                    _this._wuDiChangHandler.run();
            }));
        };
        /**监听无敌*/
        ModelSceneLegion.prototype.onWuDiChangHandler = function (caller, method) {
            this.offWuDiChangHandler();
            this._wuDiChangHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneLegion.prototype.offWuDiChangHandler = function () {
            if (this._wuDiChangHandler) {
                this._wuDiChangHandler.recover();
                this._wuDiChangHandler = null;
            }
        };
        Object.defineProperty(ModelSceneLegion.prototype, "leftWuDiCnt", {
            get: function () {
                return this._leftWuDiCnt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "bossList", {
            get: function () {
                return this._bossList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "bossListleftWuDiCnt", {
            get: function () {
                return this._bossListleftWuDiCnt;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneLegion.prototype.wuDiInitHandler = function (data) {
            if (data) {
                this._bossList = [];
                this._bossListleftWuDiCnt = [];
                this._bossList = data.BossList.concat();
                this._bossListleftWuDiCnt = data.LeftWuDiTime.concat();
                if (this._wuDiChangHandler)
                    this._wuDiChangHandler.run();
            }
        };
        Object.defineProperty(ModelSceneLegion.prototype, "personScoreReward", {
            get: function () {
                return this._personScoreReward;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneLegion.prototype.getPersonScoreData = function (uid) {
            for (var _i = 0, _a = this._curPersonScoreList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.PlayerId == uid)
                    return item;
            }
            return null;
        };
        ModelSceneLegion.prototype.updatePersonScoreData = function (newItem) {
            for (var _i = 0, _a = this._curPersonScoreList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.PlayerId == newItem.PlayerId) {
                    item.Score = newItem.Score;
                    return;
                }
            }
            this._curPersonScoreList.push(newItem);
            return null;
        };
        ModelSceneLegion.prototype.getUnionScoreData = function (UnionId) {
            for (var _i = 0, _a = this._curUnionScoreList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.UnionId == UnionId)
                    return item;
            }
            return null;
        };
        ModelSceneLegion.prototype.updateUnionScoreData = function (newItem) {
            for (var _i = 0, _a = this._curUnionScoreList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.UnionId == newItem.UnionId) {
                    item.Score = newItem.Score;
                    return;
                }
            }
            this._curUnionScoreList.push(newItem);
            return null;
        };
        ModelSceneLegion.prototype.getAllBosses = function () {
            var sights = this._battleScene.getObjectVOList(TypeActor.MONSTER);
            if (!sights)
                return [];
            var tempSights = [];
            for (var i = 0; i < sights.length; i++) {
                if (sights[i].sceneFlag == GameModels.user.player.sceneFlag) {
                    tempSights.push(sights[i]);
                }
            }
            return tempSights;
        };
        ModelSceneLegion.prototype.mergeScoreChangeHandler = function (data) {
            for (var _i = 0, _a = data.PlayerScoreList; _i < _a.length; _i++) {
                var playerScore = _a[_i];
                this.updatePersonScoreData(playerScore);
            }
            for (var _b = 0, _c = data.UnionScoreList; _b < _c.length; _b++) {
                var unionScore = _c[_b];
                this.updateUnionScoreData(unionScore);
            }
            if (data.PlayerScoreList.length > 0) {
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
            }
            if (data.UnionScoreList.length > 0) {
                this._curUnionScoreList.sort(function (a, b) {
                    if (a.Score < b.Score)
                        return 1;
                    else if (a.Score > b.Score)
                        return -1;
                });
                for (var i = 0; i < this._curUnionScoreList.length; i++) {
                    this._curUnionScoreList[i].Rank = (i + 1);
                    if (this._curUnionScoreList[i].UnionId == parseInt(GameModels.user.player.legionId)) {
                        this._curMyUnionScore = this._curUnionScoreList[i].Score;
                        this._curMyUnionRank = (i + 1);
                    }
                }
            }
            if (this._scoreInitHandler)
                this._scoreInitHandler.run();
        };
        ModelSceneLegion.prototype.scorePersonChangeHandler = function (data) {
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
        ModelSceneLegion.prototype.scoreTeamHandler = function (data) {
            var item = this.getUnionScoreData(data.UnionId);
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
                if (this._curUnionScoreList[i].UnionId == parseInt(GameModels.user.player.legionId)) {
                    this._curMyUnionScore = this._curUnionScoreList[i].Score;
                    this._curMyUnionRank = (i + 1);
                }
            }
            if (this._scoreTeamChangeHandler)
                this._scoreTeamChangeHandler.run();
        };
        ModelSceneLegion.prototype.getOpenDay = function () {
            var timer = GameModels.timer.getTimer();
            var date = new Date(timer);
            var day = date.getDay();
            // if (this.heFuPassDay > 0 && this.heFuPassDay <= 7) {
            //     var heFuTypeDay: number = 0;
            //     if (this.heFuPassDay <= 3) {
            //         heFuTypeDay = 3;
            //     } else if (this.heFuPassDay > 3 && this.heFuPassDay <= 5) {
            //         heFuTypeDay = 5;
            //     } else if (this.heFuPassDay > 5 && this.heFuPassDay <= 7) {
            //         heFuTypeDay = 7;
            //     }
            //     return timer + (heFuTypeDay - this.heFuPassDay) * 24 * 3600 * 1000;
            // } else {
            //     var temp: templates.sceneActivity = Templates.getTemplateById(templates.Map.SCENEACTIVITY, 101);
            //     if (this._serverOpenDay < temp.openDay) {
            //         return timer + (temp.openDay - this._serverOpenDay) * 24 * 3600 * 1000;
            //     }
            //     if (this._serverOpenDay == temp.openDay) {
            //         return timer;
            //     }
            //     if ((this._serverOpenDay - 1) == temp.openDay && (day == 6)) {
            //         return timer + 6 * 24 * 3600 * 1000;
            //     }
            //     return timer + (6 - day) * 24 * 3600 * 1000;
            // }
            var temp = Templates.getTemplateById(templates.Map.SCENEACTIVITY, 101);
            if (this._serverOpenDay < temp.openDay) {
                return timer + (temp.openDay - this._serverOpenDay) * 24 * 3600 * 1000;
            }
            if (this._serverOpenDay == temp.openDay) {
                return timer;
            }
            if ((this._serverOpenDay - 1) == temp.openDay && (day == 6)) {
                return timer + 6 * 24 * 3600 * 1000;
            }
            return timer + (6 - day) * 24 * 3600 * 1000;
        };
        //第几次的价格数
        ModelSceneLegion.prototype.getRelifeTimesPrice = function (times) {
            times = times > 100 ? 100 : times;
            times = times <= 0 ? 1 : times;
            return GameModels.dataSet.getBuyCountNeedPrice(222001, times);
        };
        ModelSceneLegion.prototype.sightAddHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                if (smartVO.legionId != GameModels.user.player.legionId) {
                    this.addToAttacks(smartVO, false);
                }
            }
        };
        ModelSceneLegion.prototype.sightRemoveHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.removeFromAttacks(smartVO);
            }
        };
        ModelSceneLegion.prototype.targetChangeHandler = function (smartVO, target) {
            if (target == GameModels.user.player && (smartVO instanceof vo.GamePlayerVO)) {
                this.addToAttacks(smartVO, true);
            }
        };
        ModelSceneLegion.prototype.objectStatusChangeHandler = function (smartVO, isAlife, killer, lostContent) {
            if (smartVO instanceof vo.GamePlayerVO) {
                if (smartVO.stateDead) {
                    this.removeFromAttacks(smartVO);
                }
                else {
                    if (smartVO.legionId != GameModels.user.player.legionId) {
                        this.addToAttacks(smartVO, false);
                    }
                }
            }
        };
        /**同步位置信息 */
        ModelSceneLegion.prototype.syncPosition = function (type, objectId, x, y) {
            GameModels.scene.syncPosition(type, objectId, x, y);
        };
        /**同步技能施放 */
        ModelSceneLegion.prototype.syncSkill = function (castObjId, skillId, targetObjId, direct, posX, posY) {
            GameModels.scene.syncSkill(castObjId, skillId, targetObjId, direct, posX, posY);
        };
        // /**同步解合体 */
        // public syncMerge(petUId: string, status: boolean) {
        //     GameModels.scene.syncMerge(petUId, status);
        // }
        /**请求复活 （0:常规，1:原地立即复活）*/
        ModelSceneLegion.prototype.requestRelife = function (type) {
            GameModels.scene.requestRelife(type);
        };
        /**同步当前目标 */
        ModelSceneLegion.prototype.syncTarget = function (smartVO) {
            GameModels.scene.syncTarget(smartVO);
        };
        /**取视野对象 */
        ModelSceneLegion.prototype.getObjectByUId = function (uid) {
            return GameModels.scene.getObjectByUId(uid);
        };
        /**取对象列表 */
        ModelSceneLegion.prototype.getObjectVOList = function (actorType) {
            return GameModels.scene.getObjectVOList(actorType);
        };
        /**BossVO */
        ModelSceneLegion.prototype.getNpcVO = function () {
            var npcs = GameModels.scene.getObjectVOList(TypeActor.NPC);
            if (npcs && npcs.length) {
                return npcs[0];
            }
            return null;
        };
        ModelSceneLegion.prototype.initAttacks = function () {
            /*var mineLegionId: string = GameModels.user.player.legionId;
            for (var smartVO of this._battleScene.sights) {
                if (smartVO instanceof vo.GamePlayerVO) {
                    if (smartVO.legionId != mineLegionId) {
                        this._attackersCollection.addItem(smartVO);
                    }
                }
            }*/
        };
        /**添加到攻击列表 */
        ModelSceneLegion.prototype.addToAttacks = function (playerVO, prior) {
            /*if (playerVO == GameModels.user.player) return;
            var index: number = this._attackersCollection.getItemIndex(playerVO);
            if (index < 0) {
                prior ? this._attackersCollection.addItemAt(playerVO, 0) : this._attackersCollection.addItem(playerVO);
            } else {
                if (prior) {
                    this._attackersCollection.removeItemAt(index);
                    this._attackersCollection.addItemAt(playerVO, 0)
                }
            }
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.runWith(true);
            }*/
        };
        /**从攻击列表移除 */
        ModelSceneLegion.prototype.removeFromAttacks = function (playerVO) {
            /*var index: number = this._attackersCollection.getItemIndex(playerVO);
            if (index >= 0) {
                this._attackersCollection.removeItemAt(index);
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }*/
        };
        ModelSceneLegion.prototype.setAttacks = function (players) {
            var isChange = false;
            for (var i = this._attackersCollection.length - 1; i >= 0; i--) {
                var playerVO = this._attackersCollection.getItemAt(i);
                if (players.indexOf(playerVO) == -1) {
                    this._attackersCollection.removeItemAt(i);
                    isChange = true;
                }
            }
            for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
                var smartVO = players_1[_i];
                if (this._attackersCollection.getItemIndex(smartVO) == -1) {
                    this._attackersCollection.addItem(smartVO);
                    isChange = true;
                }
            }
            if (isChange) {
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        /**清空攻击列表 */
        ModelSceneLegion.prototype.clearAttacks = function () {
            if (this._attackersCollection.length) {
                this._attackersCollection.removeAll();
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        Object.defineProperty(ModelSceneLegion.prototype, "attackersCollection", {
            //获取攻击列表
            get: function () {
                return this._attackersCollection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "owner", {
            get: function () {
                return this._owner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "guWuTimes", {
            get: function () {
                return this._guWuTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "guWuNeedCount", {
            get: function () {
                return this._guWuNeedCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "allArmyGuWuTimes", {
            get: function () {
                return this._allArmyGuWuTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "allArmyGuWuNeedCount", {
            get: function () {
                return this._allArmyGuWuNeedCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "deffenceSideUnionId", {
            get: function () {
                return this._deffenceSideUnionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "deffenceSideUnionName", {
            get: function () {
                return this._deffenceSideUnionName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "useBossList", {
            get: function () {
                return this._useBossList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "killer", {
            /**击杀者 */
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneLegion.prototype.onScoreInitHandler = function (caller, method) {
            this.offScoreInitHandler();
            this._scoreInitHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneLegion.prototype.offScoreInitHandler = function () {
            if (this._scoreInitHandler) {
                this._scoreInitHandler.recover();
                this._scoreInitHandler = null;
            }
        };
        ModelSceneLegion.prototype.onScorePersonChangeHandler = function (caller, method) {
            this.offScorePersonChangeHandler();
            this._scorePersonChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneLegion.prototype.offScorePersonChangeHandler = function () {
            if (this._scorePersonChangeHandler) {
                this._scorePersonChangeHandler.recover();
                this._scorePersonChangeHandler = null;
            }
        };
        ModelSceneLegion.prototype.onScoreTeamChangeHandler = function (caller, method) {
            this.offScoreTeamChangeHandler();
            this._scoreTeamChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneLegion.prototype.offScoreTeamChangeHandler = function () {
            if (this._scoreTeamChangeHandler) {
                this._scoreTeamChangeHandler.recover();
                this._scoreTeamChangeHandler = null;
            }
        };
        ModelSceneLegion.prototype.onAttacksChange = function (caller, method) {
            if (!this._attacksChangeHandlers) {
                this._attacksChangeHandlers = new utils.Handlers(false);
            }
            this._attacksChangeHandlers.add(caller, method, null, false);
        };
        ModelSceneLegion.prototype.offAttacksChange = function (caller, method) {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.remove(caller, method);
            }
        };
        ModelSceneLegion.prototype.offAllAttacksChange = function () {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.clear();
            }
        };
        Object.defineProperty(ModelSceneLegion.prototype, "winUnionName", {
            get: function () {
                return this._winUnionName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "winUnionLeaderName", {
            get: function () {
                return this._winUnionLeaderName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "winUnionLeaderPlayerId", {
            get: function () {
                return this._winUnionLeaderPlayerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "myScore", {
            get: function () {
                return this._myScore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "myRank", {
            get: function () {
                return this._myRank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "myUnionScore", {
            get: function () {
                return this._myUnionScore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "myUnionRank", {
            get: function () {
                return this._myUnionRank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "heFuPassDay", {
            get: function () {
                return this._heFuPassDay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "clothResId", {
            get: function () {
                return this._winclothResId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "weaponResId", {
            get: function () {
                return this._winweaponResId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "unionScoreList", {
            get: function () {
                return this._unionScoreList;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneLegion.prototype.getUnionScoreListByUnionId = function (id) {
            if (this._unionScoreList) {
                for (var i = 0; i < this._unionScoreList.length; i++) {
                    if (this._unionScoreList[i].UnionId == id) {
                        return this._unionScoreList[i];
                    }
                }
            }
            return null;
        };
        Object.defineProperty(ModelSceneLegion.prototype, "personScoreList", {
            get: function () {
                return this._personScoreList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "relifeCount", {
            get: function () {
                return GameModels.user.player.relifeCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "curMyScore", {
            ////////////////////////////
            get: function () {
                return this._curMyScore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "curMyRank", {
            get: function () {
                return this._curMyRank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "curMyUnionScore", {
            get: function () {
                return this._curMyUnionScore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "curMyUnionRank", {
            get: function () {
                return this._curMyUnionRank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "curUnionScoreList", {
            get: function () {
                return this._curUnionScoreList;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneLegion.prototype.getcurUnionScoreListByUnionId = function (id) {
            if (this._curUnionScoreList) {
                for (var i = 0; i < this._curUnionScoreList.length; i++) {
                    if (this._curUnionScoreList[i].UnionId == id) {
                        return this._curUnionScoreList[i].Score;
                    }
                }
            }
            return 0;
        };
        Object.defineProperty(ModelSceneLegion.prototype, "curPersonScoreList", {
            get: function () {
                return this._curPersonScoreList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneLegion.prototype, "lastTime", {
            get: function () {
                return this._endTime - (GameModels.timer.getTimer() / 1000);
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneLegion.prototype.wanrenRedPoint = function () {
            return false;
        };
        ModelSceneLegion.DISTRIBUTIONREFRESH = "DISTRIBUTIONREFRESH";
        ModelSceneLegion.RELIFETYPE = 501;
        ModelSceneLegion.GUWUTIMESMAX = 10;
        ModelSceneLegion.weiBossId = [6702003, 6702002, 6702001, 6702005, 6702004];
        ModelSceneLegion.shuBossId = [6703003, 6703002, 6703001, 6703005, 6703004];
        ModelSceneLegion.wuBossId = [6704003, 6704002, 6704001, 6704005, 6704004];
        return ModelSceneLegion;
    }(mo.ModelBase));
    mo.ModelSceneLegion = ModelSceneLegion;
    __reflect(ModelSceneLegion.prototype, "mo.ModelSceneLegion", ["mo.IModelMutilScene", "mo.IModelScene"]);
})(mo || (mo = {}));
