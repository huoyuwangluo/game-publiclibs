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
    var ModelSceneChapter = (function (_super) {
        __extends(ModelSceneChapter, _super);
        function ModelSceneChapter() {
            var _this = _super.call(this) || this;
            _this._bossReadied = false;
            _this._autoFightBoss = false;
            _this._oldCityId = 0;
            _this._oldMapId = 0;
            _this._isAutoAtt = false;
            /**阵营求助 */
            _this._leftSupportCount = 0;
            _this._nowPlayerData = null;
            /**刷怪*/
            _this.refreshIndex = 0;
            return _this;
        }
        ModelSceneChapter.prototype.initialize = function () {
            this._fightType = 0;
            this._cityId = 0;
            // this._wantedId = 0; this._wantedState = 0;
            this._playerVO = GameModels.user.player;
            this._farmFood = this._farmGold = this._farmExp = 0;
            this._sights = [];
            this._sightsHash = {};
            this._mainCity = null;
            this._isShowRewardTitle = false;
            //n.net.onRoute(n.MessageMap.NOTIFYWANTEDCHANGE, utils.Handler.create(this, this.updataWanted, null, false));
        };
        ModelSceneChapter.prototype.resetState = function (caller, method) {
            var _this = this;
            this._bossReadied = false;
            this.refreshIndex = 0;
            this.clearNormalDrops();
            this.clearEliteDrops();
            this.clearBossDrops();
            var msg = n.MessagePool.from(n.C2G_Chapter_GetInfo);
            msg.Id = this._playerVO.chapterId;
            this.request(n.MessageMap.C2G_CHAPTER_GETINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._chapterData) {
                    n.MessagePool.to(_this._chapterData);
                    _this._chapterData = null;
                }
                _this._chapterData = data;
                _this._monsterData = data.FormationInfo;
                _this._cityId = data.CityId;
                // this._wantedId = data.WantedId;
                // this._wantedState = data.WantedStatus;
                _this._farmExp = data.FarmExp;
                _this._farmGold = data.FarmGold;
                _this._farmFood = data.FarmFood;
                _this._totalChapter = data.Total;
                _this._chapterReward = data.ChapterReward;
                _this._showMoive = data.ShowMoive;
                _this._mainCity = Templates.getTemplateById(templates.Map.MAINCITY, _this._chapterData.CityId);
                _this._chapterData.autoRecover = false;
                _this._scene = app.gameContext.scene;
                GameModels.platformActivity.redCReport();
                if (_this._showMoive <= 0) {
                    _this.changeChapterStep();
                }
                _this.dispatchEventWith(ModelSceneChapter.BOSS_STATE_CHANGE);
                if (_this._oldCityId != data.CityId) {
                    _this._oldCityId = data.CityId;
                    _this.bossCancelAutoFight();
                }
                if (_this._chapterReward != 0 || _this._oldMapId != _this.mainMapTemplate.id || (GameModels.wenguanTask.wenguanChapter != 0 && _this._totalChapter > GameModels.wenguanTask.wenguanChapter)) {
                    _this._oldMapId = _this.mainMapTemplate.id;
                    _this.bossCancelAutoFight();
                }
                if (method)
                    method.call(caller);
                /*this.request(n.MessageMap.C2G_PET_SETALLPETROOMHETI, n.MessagePool.from(n.C2G_Pet_SetAllPetRoomHeTi), utils.Handler.create(this, () => {
                    this.dispatchEventWith(ModelSceneChapter.BOSS_STATE_CHANGE);
                    method.call(caller);
                }, null, true));
                */
            }, null, true));
        };
        ModelSceneChapter.prototype.changeChapterStep = function () {
            this.dispatchEventWith(ModelSceneChapter.CHAPTER_STEP_CHANGE);
        };
        Object.defineProperty(ModelSceneChapter.prototype, "totalChapter", {
            get: function () {
                return this._totalChapter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "chaptermonsterData", {
            get: function () {
                return this._monsterData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "isAutoAtt", {
            get: function () {
                return this._isAutoAtt;
            },
            set: function (v) {
                this._isAutoAtt = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneChapter.prototype.requestGetEnemyFormationInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Chapter_GetEnemyFormationInfo);
            msg.ChapterId = this.getChapterRewardBuyNowChapter().chapterId;
            this.request(n.MessageMap.C2G_CHAPTER_GETENEMYFORMATIONINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._chapterData1) {
                    n.MessagePool.to(_this._chapterData1);
                    _this._chapterData1 = null;
                }
                _this._chapterData1 = data;
                _this._chapterData1.autoRecover = false;
                if (complete)
                    complete.run();
            }));
        };
        Object.defineProperty(ModelSceneChapter.prototype, "chaptermonsterData1", {
            get: function () {
                return this._chapterData1.FormationInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "chapterId1", {
            get: function () {
                return this._chapterData1.ChapterId.toString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "chapterReward", {
            get: function () {
                return this._chapterReward;
            },
            // /**通缉令领奖 */
            // public requestWantedGetReward(complete?: utils.Handler): void {
            // 	var msg: n.C2G_Wanted_GetReward = n.MessagePool.from(n.C2G_Wanted_GetReward) as n.C2G_Wanted_GetReward;
            // 	this.request(n.MessageMap.C2G_WANTED_GETREWARD, msg, utils.Handler.create(this, function (data: n.G2C_Wanted_GetReward) {
            // 		if (data.Result == 1) {
            // 			this._wantedId = 0;
            // 			this._wantedState = 0;
            // 			this.dispatchEventWith(mo.ModelSceneChapter.WANTED_CHANGE);
            // 			GameModels.state.updateState(GameRedState.TONGJILING);
            // 			if (complete) complete.run();
            // 		}
            // 	}));
            // }
            // private updataWanted(data: n.NotifyWantedChange): void {
            // 	this._wantedId = data.WantedId;
            // 	this._wantedState = data.WantedStatus;
            // 	GameModels.state.updateState(GameRedState.TONGJILING);
            // 	this.dispatchEventWith(mo.ModelSceneChapter.WANTED_CHANGE);
            // }
            // public get wantedId(): number {
            // 	return this._wantedId;
            // }
            // public get wantedState(): number {
            // 	return this._wantedState;
            // }
            // public checkTongJiRedPoint(): boolean {
            // 	return this._wantedState > 0;
            // }
            set: function (v) {
                this._chapterReward = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneChapter.prototype.getChapterRewardBuyNowChapter = function () {
            var str = null;
            var temps = Templates.getList(templates.Map.CHAPTERREWARD);
            for (var _i = 0, temps_1 = temps; _i < temps_1.length; _i++) {
                var tmp = temps_1[_i];
                if (tmp.chapterId >= this._chapterData.Id) {
                    str = tmp;
                    break;
                }
            }
            if (!str)
                str = temps[0];
            return str;
        };
        /**关卡领奖 */
        ModelSceneChapter.prototype.requestChapterGetReward = function (rewardIndex, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Chapter_GetReward);
            msg.RewardIndex = rewardIndex;
            this.request(n.MessageMap.C2G_CHAPTER_GETREWARD, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    _this.resetState(_this, function () {
                        if (this._showMoive > 0 && app.gameContext.manager.view && (app.gameContext.manager.view instanceof s.ViewCity)) {
                            logger.log("需要播放过场动画。。。。。");
                            this.showChapterGuoDuEff();
                            this.isShowRewardTitle = true;
                        }
                        else {
                            logger.log("不需要播放过场动画。。。。。");
                            this.changeChapterStep();
                            app.gameContext.manager.view.addCityViewToScene();
                        }
                        //(app.gameContext.manager.view as s.ViewCity).addCityViewToScene();
                    });
                    if (complete)
                        complete.run();
                }
            }));
        };
        ModelSceneChapter.prototype.requestChapterGetSupportInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Chapter_GetSupportInfo);
            this.request(n.MessageMap.C2G_CHAPTER_GETSUPPORTINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._nowPlayerData) {
                    n.MessagePool.to(_this._nowPlayerData);
                    _this._nowPlayerData = null;
                }
                _this._nowPlayerData = data;
                _this._nowPlayerData.autoRecover = false;
                _this._leftSupportCount = _this._nowPlayerData.LeftCount;
                if (complete)
                    complete.run();
            }));
        };
        Object.defineProperty(ModelSceneChapter.prototype, "nowPlayerData", {
            get: function () {
                return this._nowPlayerData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "leftSupportCount", {
            get: function () {
                return this._leftSupportCount;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneChapter.prototype.showChapterGuoDuEff = function () {
            this.dispatchEventWith(ModelSceneChapter.SHOWCHAPTER_GUODUEFF);
        };
        ModelSceneChapter.prototype.updateCloseAlter = function () {
            this.dispatchEventWith(mo.ModelSceneChapter.REWARD_CHANGE);
        };
        Object.defineProperty(ModelSceneChapter.prototype, "farmGold", {
            /**城池金币 */
            get: function () {
                return this._farmGold;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "farmExp", {
            /**城池exp */
            get: function () {
                return this._farmExp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "farmFood", {
            /**城池粮草 */
            get: function () {
                return this._farmFood;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "cityId", {
            /**城池id */
            get: function () {
                return this._cityId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "data", {
            /**关卡数据 */
            get: function () {
                return this._chapterData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "mainCityTemplate", {
            /**城池模板 */
            get: function () {
                return this._mainCity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "mainMapTemplate", {
            /**地图模板 */
            get: function () {
                var mainMap = Templates.getList(templates.Map.MAINMAP);
                for (var i = 0; i < mainMap.length; i++) {
                    if (this._chapterData.CityId >= mainMap[i].cityStart && this._chapterData.CityId <= mainMap[i].cityEnd) {
                        return mainMap[i];
                    }
                }
                return mainMap[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "isShowRewardTitle", {
            get: function () {
                return this._isShowRewardTitle;
            },
            set: function (v) {
                this._isShowRewardTitle = v;
            },
            enumerable: true,
            configurable: true
        });
        /**激活自动挑战Boss */
        ModelSceneChapter.prototype.bossActiveAutoFight = function () {
            if (!this._autoFightBoss) {
                this._autoFightBoss = true;
                this.dispatchEventWith(ModelSceneChapter.AUTOFIGHT_STATE_CHANGE);
            }
        };
        /**取消激活自动挑战Boss */
        ModelSceneChapter.prototype.bossCancelAutoFight = function () {
            if (this._autoFightBoss) {
                this._autoFightBoss = false;
                GameModels.wenguanTask.wenguanChapter = 0;
                this.dispatchEventWith(ModelSceneChapter.AUTOFIGHT_STATE_CHANGE);
            }
        };
        Object.defineProperty(ModelSceneChapter.prototype, "autoFightBoss", {
            // /**将boss置于准备状态 */
            // public bossReady(): void {
            // 	if (!this._bossReadied) {
            // 		this._bossReadied = true;
            // 		this.dispatchEventWith(ModelSceneChapter.BOSS_STATE_CHANGE);
            // 	}
            // }
            // /**boss是否处于准备状态 */
            // public get bossReadied(): boolean {
            // 	return this._bossReadied;
            // }
            /**Boss自动挑战是否打开 */
            get: function () {
                return this._autoFightBoss;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "monsterDrops", {
            /**普通掉落 */
            get: function () {
                return this._normalDrops;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "eliteDrops", {
            /**精英掉落 */
            get: function () {
                return this._eliteDrops;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneChapter.prototype, "bossDrops", {
            /**Boss掉落 */
            get: function () {
                return this._bossDrops;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneChapter.prototype.clearNormalDrops = function () {
            if (this._normalDrops) {
                for (var _i = 0, _a = this._normalDrops; _i < _a.length; _i++) {
                    var itemVO = _a[_i];
                    vo.toPool(itemVO);
                }
                this._normalDrops.length = 0;
                this._normalDrops = null;
            }
        };
        ModelSceneChapter.prototype.clearEliteDrops = function () {
            if (this._eliteDrops) {
                for (var _i = 0, _a = this._eliteDrops; _i < _a.length; _i++) {
                    var itemVO = _a[_i];
                    vo.toPool(itemVO);
                }
                this._eliteDrops.length = 0;
                this._eliteDrops = null;
            }
        };
        ModelSceneChapter.prototype.clearBossDrops = function () {
            if (this._bossDrops) {
                for (var _i = 0, _a = this._bossDrops; _i < _a.length; _i++) {
                    var itemVO = _a[_i];
                    vo.toPool(itemVO);
                }
                this._bossDrops.length = 0;
                this._bossDrops = null;
            }
        };
        ModelSceneChapter.prototype.onStateChange = function (caller, method) {
            this.addEventListener(ModelSceneChapter.BOSS_STATE_CHANGE, method, caller);
        };
        ModelSceneChapter.prototype.offStateChange = function (caller, method) {
            this.removeEventListener(ModelSceneChapter.BOSS_STATE_CHANGE, method, caller);
        };
        /**
         * 捡取物品
         * @param items 捡取的物品
         * @param money 是否捡取银两
         */
        ModelSceneChapter.prototype.requestPick = function (items) {
            var hasMonster = false;
            var hasElite = false;
            var hasBoss = false;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var itemVO = items_1[_i];
                if (itemVO.dropType <= 0)
                    hasMonster = true;
                else if (itemVO.dropType == 1)
                    hasElite = true;
                else if (itemVO.dropType == 2)
                    hasBoss = true;
            }
            //if (hasMonster) this.notify(n.MessageMap.C2G_LEVEL_PICKUP, n.MessagePool.from(n.C2G_Level_Pickup));
            // else if (hasElite) this.notify(n.MessageMap.C2G_LEVEL_JINGYING_PICKUP, n.MessagePool.from(n.C2G_Level_JingYing_Pickup));
            // else if (hasBoss) this.notify(n.MessageMap.C2G_LEVEL_BOSS_PICKUP, n.MessagePool.from(n.C2G_Level_Boss_Pickup));
            // if (hasMonster) this.notify(n.MessageMap.C2G_LEVEL_PICKUP, n.MessagePool.from(n.C2G_Level_Pickup));
            // else if (hasBoss) this.notify(n.MessageMap.C2G_LEVEL_BOSS_PICKUP, n.MessagePool.from(n.C2G_Level_Boss_Pickup));
        };
        /**该点是否被占用 */
        ModelSceneChapter.prototype.isOccupyNode = function (node) {
            for (var _i = 0, _a = this._scene.monsters; _i < _a.length; _i++) {
                var monster = _a[_i];
                if (!monster.stateDead) {
                    if (monster.tileNode == node)
                        return true;
                }
            }
            return false;
        };
        /**刷BOSS */
        ModelSceneChapter.prototype.refreshBoss = function (node, monsterVO) {
            if (!node || !node.walkable) {
                logger.error('目标点不可行走,刷怪失败');
                return;
            }
            this.addToSight(node, TypeActor.BOSS, monsterVO);
        };
        /**刷精英怪 */
        ModelSceneChapter.prototype.refreshMonsterElite = function (node) {
            if (!node || !node.walkable) {
                logger.error('目标点不可行走,刷怪失败');
                return;
            }
            //this.addToSight(node, TypeActor.MONSTERELITE, vo.fromPool(vo.GameMonsterVO, this._monsterData) as vo.GameMonsterVO);
        };
        /**刷新一只漫游怪物 */
        ModelSceneChapter.prototype.refreshMonsterWander = function (node, monsterVO) {
            if (!node || !node.walkable) {
                logger.error('目标点不可行走,刷怪失败');
                return null;
            }
            this.addToSight(node, TypeActor.MONSTER, monsterVO);
        };
        ModelSceneChapter.prototype.addToSight = function (node, type, monsterVO, event) {
            if (event === void 0) { event = true; }
            monsterVO.tileX = node.x;
            monsterVO.tileY = node.y;
            this._sights.push(monsterVO);
            this._sightsHash[monsterVO.uid] = monsterVO;
            if (event && this._sightAddHandler) {
                this._sightAddHandler.runWith(monsterVO);
            }
        };
        ModelSceneChapter.prototype.removeFromSight = function (uid, event) {
            if (event === void 0) { event = true; }
            if (this._sightsHash[uid]) {
                var smartVO = this._sightsHash[uid];
                this._sightsHash[uid] = null;
                delete this._sightsHash[uid];
                this._sights.splice(this._sights.indexOf(smartVO), 1);
                if (event && this._sightRemoveHandlers) {
                    this._sightRemoveHandlers.runWith(smartVO);
                }
                vo.toPool(smartVO);
            }
        };
        /**监听视野添加 */
        ModelSceneChapter.prototype.onSightAdd = function (caller, method) {
            this.offSightAdd();
            this._sightAddHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelSceneChapter.prototype.offSightAdd = function () {
            if (this._sightAddHandler) {
                this._sightAddHandler.recover();
                this._sightAddHandler = null;
            }
        };
        /**监听视野移除 */
        ModelSceneChapter.prototype.onSightRemove = function (caller, method) {
            if (!this._sightRemoveHandlers) {
                this._sightRemoveHandlers = new utils.Handlers(false);
            }
            this._sightRemoveHandlers.add(caller, method, null, false);
        };
        ModelSceneChapter.prototype.offSightRemove = function (caller, method) {
            if (this._sightRemoveHandlers) {
                this._sightRemoveHandlers.remove(caller, method);
            }
        };
        ModelSceneChapter.prototype.offAllSightRemove = function () {
            if (this._sightRemoveHandlers) {
                this._sightRemoveHandlers.clear();
            }
        };
        ModelSceneChapter.prototype.killAllMonsters = function () {
            for (var _i = 0, _a = this._sights; _i < _a.length; _i++) {
                var monsterVO = _a[_i];
                if (!monsterVO.stateDead) {
                    monsterVO.hpHurted(monsterVO.hp, GameModels.user.player);
                    monsterVO.syncStatus(true, GameModels.user.player);
                }
            }
        };
        /**同步位置信息 */
        ModelSceneChapter.prototype.syncPosition = function (type, objectId, x, y) { };
        /**同步技能施放 */
        ModelSceneChapter.prototype.syncSkill = function (castObjId, skillId, targetObjId, posX, posY) { };
        /**同步解合体 */
        ModelSceneChapter.prototype.syncMerge = function (petUId, status) { };
        /**请求复活 （0:常规，1:原地立即复活）*/
        ModelSceneChapter.prototype.requestRelife = function (type) { };
        /**同步当前目标 */
        ModelSceneChapter.prototype.syncTarget = function (smartVO) { };
        /**取最近敌人 */
        ModelSceneChapter.prototype.getMinEnemy = function (body, enmeyTypes, range, except) {
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
        ModelSceneChapter.prototype.getObjectByUId = function (uid) {
            return this._sightsHash[uid];
        };
        /**取对象列表 */
        ModelSceneChapter.prototype.getObjectVOList = function (actorType) {
            switch (actorType) {
                case TypeActor.PLAYER:
                case TypeActor.ROBOT:
                    return [GameModels.user.player];
                case TypeActor.MONSTER:
                case TypeActor.BOSS:
                    return this._sights;
            }
            return null;
        };
        ModelSceneChapter.AUTOFIGHT_STATE_CHANGE = "autofight_state_change";
        ModelSceneChapter.BOSS_STATE_CHANGE = "boss_state_change";
        ModelSceneChapter.CHAPTER_STEP_CHANGE = "chapter_step_change";
        // public static WANTED_CHANGE: string = "wanted_change";
        ModelSceneChapter.REWARD_CHANGE = "reward_change";
        ModelSceneChapter.SHOWCHAPTER_GUODUEFF = "SHOWCHAPTER_GUODUEFF";
        return ModelSceneChapter;
    }(mo.ModelBase));
    mo.ModelSceneChapter = ModelSceneChapter;
    __reflect(ModelSceneChapter.prototype, "mo.ModelSceneChapter");
    var ChapterMonsterData = (function () {
        function ChapterMonsterData(data) {
            this.UniqueId = data.UniqueId;
            this.Id = data.Id;
            this.MonsterName = data.MonsterName;
            this.Type = data.Type;
            this.Level = data.Level;
            this.ResId = data.ResId;
            this.SkillList = [];
            for (var i = 0; i < data.SkillList.length; i++) {
                this.SkillList[i] = data.SkillList[i];
            }
            this.AttType = data.AttType;
            this.HP = data.HP;
            this.ATT = this.getValueByType(data.PropertyList, TypeProperty.PAtk);
            this.DEF = this.getValueByType(data.PropertyList, TypeProperty.PDef);
            // this.MDEF = this.getValueByType(data.PropertyList, TypeProperty.MDef);
            this.CROSS = this.getValueByType(data.PropertyList, TypeProperty.IgnorePDef);
            // this.MCROSS = this.getValueByType(data.PropertyList,TypeProperty.IgnoreMDef);
            this.PosX = data.PosX;
            this.PosY = data.PosY;
            this.HPMax = data.HPMax;
            this.Star = data.SceneInfo.Star;
            this.Country = data.SceneInfo.Country;
            this.SoldierType = data.SceneInfo.SoldierType;
            this.PetRefId = data.PetRefId;
        }
        ChapterMonsterData.prototype.getValueByType = function (propertyList, type) {
            for (var i = 0; i < propertyList.length; i++) {
                if (propertyList[i].Type == type) {
                    return propertyList[i].Value;
                }
            }
            return 0;
        };
        return ChapterMonsterData;
    }());
    mo.ChapterMonsterData = ChapterMonsterData;
    __reflect(ChapterMonsterData.prototype, "mo.ChapterMonsterData");
})(mo || (mo = {}));
