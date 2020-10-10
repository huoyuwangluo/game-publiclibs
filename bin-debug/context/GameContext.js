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
var app;
(function (app) {
    var GameContext = (function (_super) {
        __extends(GameContext, _super);
        function GameContext() {
            var _this = _super.call(this) || this;
            _this._bossSeledId = 0;
            return _this;
        }
        GameContext.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            Loading.instance.remove();
            logger.log('游戏开始初始化...');
            s.GameManager.instance.initialize();
            this.registerPopUI();
            this.registerFloatUI();
            mg.guideManager.initialize(mg.stageManager.stage);
            this._copyWinVO = new vo.CopyWinVO();
            egret.callLater(function () {
                _this._isFirstStartGame = true;
                mg.uiManager.show(main.MainUIView);
                logger.log('游戏初始化完成.');
                _this.firstEnterGame();
                game.GameConfig.isEnterGame = true;
            }, this);
            utils.ObjectPool.create(s.AnimationSprite, new utils.AnimationPool(egret.getQualifiedClassName(s.AnimationSprite), s.AnimationSprite));
            GameModels.copyMaterial.addEventListener(mo.ModelGameMaterial.OPEN_TEAM_DIALOG, this.openTeamDialog, this);
            GameModels.copyMaterial.addEventListener(mo.ModelGameMaterial.CLOSE_TEAM_DIALOG, this.closeTeamDialog, this);
        };
        Object.defineProperty(GameContext.prototype, "isFirstStartGame", {
            /**每次开始游戏的标记 */
            get: function () {
                return this._isFirstStartGame;
            },
            set: function (v) {
                this._isFirstStartGame = v;
            },
            enumerable: true,
            configurable: true
        });
        GameContext.prototype.openTeamDialog = function () {
            if (!mg.uiManager.isOpen(dialog.explore.TeamDialog)) {
                mg.uiManager.show(dialog.explore.TeamDialog);
            }
            else {
                mg.uiManager.update(dialog.explore.TeamDialog);
            }
        };
        GameContext.prototype.closeTeamDialog = function () {
            mg.uiManager.remove(dialog.explore.TeamDialog);
        };
        GameContext.prototype.firstEnterGame = function () {
            var _this = this;
            Loading.instance.remove();
            GameModels.copyBoss.disableAutoBoss();
            if (GameModels.task.isTaskBegin) {
                //this.enterBegin();
                mg.uiManager.show(dialog.WelcomeDialog);
            }
            else {
                if (GameModels.user.player.level > app.GameContext.enterCityLevel) {
                    this.enterCity();
                    var pastTime = 0;
                    if (GameModels.user.player.foolTime <= 0) {
                        pastTime = Math.floor((GameModels.timer.getTimer() / 1000 - GameModels.serverTime.birthServerDate / 1000));
                    }
                    else {
                        pastTime = Math.floor((GameModels.timer.getTimer() / 1000 - GameModels.user.player.foolTime / 1000));
                    }
                    if (pastTime >= 28800) {
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.J_LJSSCSX, TypeBtnLabel.GOTO, null, utils.Handler.create(this, function () {
                            GameModels.copyBoss.disableAutoBoss();
                            this.enterChapter();
                        }));
                        //return;
                    }
                }
                else {
                    this.enterChapter();
                    if (GameModels.user.player.name == Language.P_MYZZ) {
                        mg.uiManager.show(login.CreatePlayerName);
                    }
                }
            }
            GameModels.scene.onKickOut(this, function (reason) {
                mg.alertManager.tip(reason, 0xff0000);
                _this.exitToMainGame();
            });
            GameModels.copyBoss.addEventListener(mo.ModelGameBoss.BOSS_REBORN_EVERY, function () {
                if (app.gameContext.typeGame == TypeGame.ATKCITY && !_this._switching)
                    _this.checkAutoEveryBoss();
            }, this);
            GameModels.login.onReconnect(this, function () {
                _this.exitToMainGame();
            });
            GameModels.platform.uploadEnterGame();
        };
        /**设置场景内层的渲染状态 */
        GameContext.prototype.setSceneLayerRenderEnabled = function (v) {
            if (this._manager.view instanceof s.ViewScene) {
                this._manager.view.scene.layerRenderEnabled = v;
            }
        };
        GameContext.prototype.getSceneLayerRenderEnabled = function () {
            if (this._manager.view instanceof s.ViewScene) {
                return this._manager.view.scene.layerRenderEnabled;
            }
            return false;
        };
        GameContext.prototype.enterCrossGame = function (type, copyVO, playerId) {
            if (copyVO === void 0) { copyVO = null; }
            if (playerId === void 0) { playerId = null; }
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            Loading.instance.add(Language.KF_TIP4, true);
            //if(s.GameManager.instance.gameCurrent) s.GameManager.instance.gameCurrent.exit();
            // GameModels.crossServer.enterCrossServer(type, this, () => {
            // 	//this.enterCrossGameHandler(type, copyVO, playerId, ...args);
            // }, () => {
            // 	logger.log('跨服连接错误,准备退出...');
            // 	this.exitToMainGame();
            // 	mg.alertManager.tip(Language.KF_ERROR3, 0xff0000);
            // });
        };
        // private enterCrossGameHandler(type: number, copyVO: vo.CopyVO = null, playerId: string = null, ...args) {
        // 	switch (type) {
        // 		case TypeGame.CROSS_BOSS:
        // 		case TypeGame.SECRET_BOSS: this.enterCrossEveryOneBoss(type, copyVO, Loading.instance, Loading.instance.remove); break;
        // 		case TypeGame.CROSS_CITY: this.enterCrossCity(type, Loading.instance, Loading.instance.remove); break;
        // 		case TypeGame.CROSS_PEAKS_FIGHT: this.enterCrossPeaksFight(type, playerId, Loading.instance, Loading.instance.remove); break;
        // 	}
        // }
        /**回到主玩法（挂机或者主城） */
        GameContext.prototype.exitToMainGame = function () {
            var gameClazz = s.GameManager.instance.gameCurrent.getExitGame();
            var type = (gameClazz == s.GameSgCity) ? TypeGame.CITY : TypeGame.ATKCITY;
            this.readyGameEnter(type);
            // if (GameModels.crossServer.isCross) {
            // 	Loading.instance.add(Language.KF_TIP5, true);
            // 	//if(s.GameManager.instance.gameCurrent) s.GameManager.instance.gameCurrent.exit();
            // 	GameModels.crossServer.exitCrossServer(this, () => {
            // 		this.enterGameHandler(type);
            // 	}, () => {
            // 		Loading.instance.remove();
            // 	});
            // 	return;
            // }
            // GameModels.crossServer.cancelRequesetCorssServer();
            if (GameModels.login.isConnected) {
                Loading.instance.remove();
                this.enterGameHandler(type);
            }
        };
        GameContext.prototype.enterGameHandler = function (type) {
            Loading.instance.remove();
            var uiName = s.GameManager.instance.gameCurrent.getExitAutoOpenUI();
            var tabIndex = s.GameManager.instance.gameCurrent.getExitAutoOpenUITableIndex();
            var failParam = s.GameManager.instance.gameCurrent.getExitAutoOpenUIfailParam();
            function uiHandler() {
                if (uiName) {
                    if (uiName == s.UserfaceName.chapterBossMainView) {
                        //mg.uiManager.removeAllDialogs();
                    }
                    else {
                        if (uiName == s.UserfaceName.copyboss) {
                            if (tabIndex == 0 || tabIndex == 1 || tabIndex == 2) {
                                mg.uiManager.show(uiName, { tabIndex: tabIndex, param: this._bossSeledId });
                            }
                            else {
                                mg.uiManager.show(uiName, { tabIndex: tabIndex });
                            }
                        }
                        else {
                            if (failParam) {
                                mg.uiManager.show(uiName, { tabIndex: tabIndex, param: failParam });
                            }
                            else {
                                mg.uiManager.show(uiName, { tabIndex: tabIndex });
                            }
                        }
                    }
                }
            }
            switch (type) {
                case TypeGame.ATKCITY:
                    this.enterChapter(this, uiHandler);
                    break;
                case TypeGame.CITY:
                    this.enterCity(this, uiHandler);
                    break;
            }
        };
        /**检查自动挑战BOSS */
        GameContext.prototype.checkAutoEveryBoss = function () {
            if (app.gameContext.typeGame != TypeGame.ATKCITY)
                return;
            var copyVO = GameModels.copyBoss.getAutoBossVO();
            if (copyVO) {
                if (this.checkInCopy())
                    return;
                if (this.checkInChapterBoss())
                    return;
                if (utils.CheckUtil.checkBagSmelting()) {
                    GameModels.copyBoss.disableAutoBoss();
                    mg.alertManager.tip(Language.J_BBYMYQXZDZD);
                    return;
                }
                this.enterEveryOneBoss(copyVO);
            }
        };
        GameContext.prototype.readyGameEnter = function (type) {
            this._switching = true;
        };
        GameContext.prototype.failGameEnter = function (type) {
            this._switching = false;
        };
        GameContext.prototype.overGameEnter = function (type) {
            this._switching = false;
            if (type == TypeGame.ATKCITY) {
                this.checkAutoEveryBoss();
            }
            else if (type != TypeGame.EVERYONE_BOSS && type != TypeGame.CHAPTER_BOSS) {
                GameModels.copyBoss.disableAutoBoss();
            }
        };
        /**进入新手玩法 */
        GameContext.prototype.enterBegin = function () {
            this.readyGameEnter(TypeGame.BEGIN);
            logger.log('进入新手玩法...');
            s.GameManager.instance.enter(s.GameBegin);
            this.overGameEnter(TypeGame.BEGIN);
        };
        /**进入关卡挂机玩法 */
        GameContext.prototype.enterChapter = function (caller, method) {
            var _this = this;
            this.readyGameEnter(TypeGame.ATKCITY);
            logger.log('准备进入挂机玩法...');
            GameModels.scene.enterGame(TypeGame.ATKCITY, null, this, function () {
                logger.log('回到挂机玩法...');
                s.GameManager.instance.enter(s.GameAtkCity);
                _this.overGameEnter(TypeGame.ATKCITY);
                method && method.call(caller);
            });
        };
        /**进入主城 */
        GameContext.prototype.enterCity = function (caller, method) {
            var _this = this;
            this.readyGameEnter(TypeGame.CITY);
            logger.log('准备进入挂机玩法...');
            GameModels.scene.enterGame(TypeGame.CITY, null, this, function () {
                logger.log('回到挂机玩法...');
                s.GameManager.instance.enter(s.GameSgCity);
                _this.overGameEnter(TypeGame.CITY);
                method && method.call(caller);
            });
        };
        GameContext.prototype.copyWinCallFun = function (type, dropItems, isNext, isFive, copyVO, isChangeScene) {
            var _this = this;
            if (isNext === void 0) { isNext = null; }
            if (isFive === void 0) { isFive = null; }
            if (copyVO === void 0) { copyVO = null; }
            if (isChangeScene === void 0) { isChangeScene = true; }
            this._copyWinVO.reset();
            vo.toPoolList(dropItems);
            if (type == TypeGame.CHAPTER_BOSS) {
                if (isNext == 1) {
                    this.enterChapterBoss("");
                }
                else if (isNext == 2) {
                    GameModels.scene.enterNextGame(TypeGame.CHAPTER_BOSS, "", this, function (mapId) {
                        if (mapId <= 0) {
                            _this.failGameEnter(TypeGame.CHAPTER_BOSS);
                            return;
                        }
                    });
                }
                else {
                    this.copyWinToMainGame(type);
                }
                return;
            }
            if (isNext) {
                switch (type) {
                    case TypeGame.SHILITA_1:
                        if (!copyVO) {
                            this.copyWinToMainGame(type);
                            return;
                        }
                        var maxPassUpFloor = GameModels.shilita.getCopyMaxPassUp(80 + GameModels.shilita.currIndex, GameModels.shilita.currStep[GameModels.shilita.currIndex - 1] + 1);
                        var copyNextVO = isFive ? maxPassUpFloor : GameModels.copyBoss.getVOByStep(copyVO.type, copyVO.step + 1);
                        if (copyNextVO && copyNextVO.template.parm1 == copyVO.template.parm1) {
                            if (!isChangeScene) {
                                GameModels.scene.enterNextGame(TypeGame.SHILITA_1, copyNextVO.id.toString(), this, function (result) {
                                    if (!result) {
                                        _this.failGameEnter(TypeGame.SHILITA_1);
                                        return;
                                    }
                                    GameModels.copyBoss.addFightData(TypeGame.SHILITA_1, copyNextVO, isFive);
                                });
                            }
                            else {
                                this._manager.enter(null);
                                this.enterShiLiTa1(copyNextVO, true, isFive);
                            }
                        }
                        else {
                            this.copyWinToMainGame(type);
                        }
                        break;
                    case TypeGame.SHILITA_2:
                        if (!copyVO) {
                            this.copyWinToMainGame(type);
                            return;
                        }
                        var maxPassUpFloor = GameModels.shilita.getCopyMaxPassUp(80 + GameModels.shilita.currIndex, GameModels.shilita.currStep[GameModels.shilita.currIndex - 1] + 1);
                        var copyNextVO = isFive ? maxPassUpFloor : GameModels.copyBoss.getVOByStep(copyVO.type, copyVO.step + 1);
                        if (copyNextVO && copyNextVO.template.parm1 == copyVO.template.parm1) {
                            if (!isChangeScene) {
                                GameModels.scene.enterNextGame(TypeGame.SHILITA_2, copyNextVO.id.toString(), this, function (result) {
                                    if (!result) {
                                        _this.failGameEnter(TypeGame.SHILITA_2);
                                        return;
                                    }
                                    GameModels.copyBoss.addFightData(TypeGame.SHILITA_2, copyNextVO, isFive);
                                });
                            }
                            else {
                                this._manager.enter(null);
                                this.enterShiLiTa2(copyNextVO, true, isFive);
                            }
                        }
                        else {
                            this.copyWinToMainGame(type);
                        }
                        break;
                    case TypeGame.SHILITA_3:
                        if (!copyVO) {
                            this.copyWinToMainGame(type);
                            return;
                        }
                        var maxPassUpFloor = GameModels.shilita.getCopyMaxPassUp(80 + GameModels.shilita.currIndex, GameModels.shilita.currStep[GameModels.shilita.currIndex - 1] + 1);
                        var copyNextVO = isFive ? maxPassUpFloor : GameModels.copyBoss.getVOByStep(copyVO.type, copyVO.step + 1);
                        if (copyNextVO && copyNextVO.template.parm1 == copyVO.template.parm1) {
                            if (!isChangeScene) {
                                GameModels.scene.enterNextGame(TypeGame.SHILITA_3, copyNextVO.id.toString(), this, function (result) {
                                    if (!result) {
                                        _this.failGameEnter(TypeGame.SHILITA_3);
                                        return;
                                    }
                                    GameModels.copyBoss.addFightData(TypeGame.SHILITA_3, copyNextVO, isFive);
                                });
                            }
                            else {
                                this._manager.enter(null);
                                this.enterShiLiTa3(copyNextVO, true, isFive);
                            }
                        }
                        else {
                            this.copyWinToMainGame(type);
                        }
                        break;
                    case TypeGame.PAGODA_LOCK:
                        if (!copyVO) {
                            this.copyWinToMainGame(type);
                            return;
                        }
                        var maxPassUpFloor = GameModels.copyPagoda.getCopyMaxPassUp(copyVO.type, GameModels.copyPagoda.lockMaxPass);
                        var copyNextVO = isFive ? maxPassUpFloor : GameModels.copyPagoda.getCopyNextFloor(copyVO);
                        if (copyNextVO) {
                            if (!isChangeScene) {
                                GameModels.scene.enterNextGame(TypeGame.PAGODA_LOCK, copyNextVO.id.toString(), this, function (result) {
                                    if (!result) {
                                        _this.failGameEnter(TypeGame.PAGODA_LOCK);
                                        return;
                                    }
                                    GameModels.copyBoss.addFightData(TypeGame.PAGODA_LOCK, copyNextVO, isFive);
                                });
                            }
                            else {
                                this._manager.enter(null);
                                this.enterPagodaLock(copyNextVO, true, isFive);
                            }
                        }
                        else {
                            this.copyWinToMainGame(type);
                        }
                        break;
                    case TypeGame.PAGODA_PET:
                        if (!copyVO) {
                            this.copyWinToMainGame(type);
                            return;
                        }
                        var maxPassUpFloor = GameModels.copyPagoda.getCopyMaxPassUp(copyVO.type, GameModels.copyPagoda.savageMaxPass);
                        var copyNextVO = isFive ? maxPassUpFloor : GameModels.copyPagoda.getCopyNextFloor(copyVO);
                        if (copyNextVO) {
                            if (!isChangeScene) {
                                GameModels.scene.enterNextGame(TypeGame.PAGODA_PET, copyNextVO.id.toString(), this, function (result) {
                                    if (!result) {
                                        _this.failGameEnter(TypeGame.PAGODA_PET);
                                        return;
                                    }
                                    GameModels.copyBoss.addFightData(TypeGame.PAGODA_PET, copyNextVO, isFive);
                                });
                            }
                            else {
                                this._manager.enter(null);
                                this.enterPagodaPet(copyNextVO, true, isFive);
                            }
                        }
                        else {
                            this.copyWinToMainGame(type);
                        }
                        break;
                    case TypeGame.PAGODA_WUHUN:
                        if (!copyVO) {
                            this.copyWinToMainGame(type);
                            return;
                        }
                        var maxPassUpFloor = GameModels.copyPagoda.getCopyMaxPassUp(copyVO.type, GameModels.copyPagoda.wuHunMaxPass);
                        var copyNextVO = isFive ? maxPassUpFloor : GameModels.copyPagoda.getCopyNextFloor(copyVO);
                        if (copyNextVO) {
                            logger.log("胜利面板下一关的关数=====", copyNextVO.step);
                            if (!isChangeScene) {
                                GameModels.scene.enterNextGame(TypeGame.PAGODA_WUHUN, copyNextVO.id.toString(), this, function (result) {
                                    if (!result) {
                                        _this.failGameEnter(TypeGame.PAGODA_WUHUN);
                                        return;
                                    }
                                    GameModels.copyBoss.addFightData(TypeGame.PAGODA_WUHUN, copyNextVO, isFive);
                                });
                            }
                            else {
                                this._manager.enter(null);
                                this.enterWuHunPagodaPet(copyNextVO, true, isFive);
                            }
                        }
                        else {
                            this.copyWinToMainGame(type);
                        }
                        break;
                }
            }
            else {
                this.copyWinToMainGame(type);
            }
        };
        GameContext.prototype.copyWinToMainGame = function (fightType) {
            if (fightType === void 0) { fightType = 0; }
            if (fightType != 0 && fightType != app.gameContext.typeGame) {
                return;
            }
            this.exitToMainGame();
        };
        GameContext.prototype.copyFailCallFun = function (type, totalStar, selfEndVo, otherEndVo) {
            if (type == TypeGame.CHAPTER_BOSS || type == TypeGame.DOOR_BOSS) {
                mg.alertManager.tip(Language.J_TZGKSB);
                GameModels.chapter.bossCancelAutoFight();
            }
            if (type != 0 && type != app.gameContext.typeGame) {
                this.showFailTip(this, null, totalStar, selfEndVo, otherEndVo, type);
            }
            else {
                this.showFailTip(this, this.exitToMainGame, totalStar, selfEndVo, otherEndVo, type);
            }
        };
        /**进入关卡BOSS玩法 */
        GameContext.prototype.enterChapterBoss = function (testChapterId, isStarGame) {
            var _this = this;
            if (isStarGame === void 0) { isStarGame = false; }
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            if (GameModels.chapter.data && GameModels.chapter.chapterReward != 0) {
                mg.alertManager.showAlert(MainChapterRewardAlter, false, true, GameModels.chapter.data.Id);
                return;
            }
            if (utils.CheckUtil.checkBagSmelting()) {
                GameModels.chapter.bossCancelAutoFight();
                return;
            }
            mg.alertManager.closeALert();
            this.readyGameEnter(TypeGame.CHAPTER_BOSS);
            GameModels.scene.enterGame(TypeGame.CHAPTER_BOSS, testChapterId, this, function (mapId) {
                if (mapId <= 0) {
                    _this.failGameEnter(TypeGame.CHAPTER_BOSS);
                    return;
                }
                FightLoading.instance.remove();
                if (isStarGame) {
                    _this.enterChapterBoos(mapId);
                }
                else {
                    FightLoading.instance.add(_this, function () {
                        _this.enterChapterBoos(mapId);
                    });
                }
            });
        };
        GameContext.prototype.enterChapterBoos = function (mapId) {
            var _this = this;
            this._copyWinVO.playerLevel = GameModels.user.player.level;
            this._manager.getGameChapterBoss().onEnterOverOnce(this, function () {
                GameModels.scene.requestSightsSnap(_this, function () {
                    _this.overGameEnter(TypeGame.CHAPTER_BOSS);
                    var gameChapterBoss = _this._manager.getGameChapterBoss();
                    gameChapterBoss.start();
                    gameChapterBoss.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                        var _this = this;
                        if (result) {
                            this._copyWinVO.type = TypeGame.CHAPTER_BOSS;
                            this._copyWinVO.dropItems = dropItems;
                            this._copyWinVO.selfEndVo = selfEndVo;
                            this._copyWinVO.otherEndVo = otherEndVo;
                            if (GameModels.task.hasTask && (GameModels.task.curTask.id == 100010 && GameModels.task.curTask.canSubmit) && GameModels.user.player.name == Language.P_MYZZ) {
                                this._copyWinVO.initialize(this, function () {
                                    _this._copyWinVO.reset();
                                    vo.toPoolList(dropItems);
                                    mg.uiManager.show(login.CreatePlayerName);
                                });
                            }
                            else {
                                this._copyWinVO.initialize(this, function (isNext) {
                                    _this.copyWinCallFun(TypeGame.CHAPTER_BOSS, dropItems, isNext);
                                });
                            }
                            this.showWinTip(this._copyWinVO);
                        }
                        else {
                            this.copyFailCallFun(TypeGame.CHAPTER_BOSS, totalStar, selfEndVo, otherEndVo);
                        }
                    });
                });
            });
            this._manager.enter(s.GameChapterBoss, mapId);
        };
        /**进入关卡求助玩法 */
        GameContext.prototype.enterChapterCity = function (playerId) {
            var _this = this;
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            if (utils.CheckUtil.checkBagSmelting()) {
                GameModels.chapter.bossCancelAutoFight();
                return;
            }
            mg.alertManager.closeALert();
            this.readyGameEnter(TypeGame.DOOR_BOSS);
            GameModels.scene.enterGame(TypeGame.DOOR_BOSS, playerId, this, function (mapId) {
                if (mapId <= 0) {
                    _this.failGameEnter(TypeGame.DOOR_BOSS);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._copyWinVO.playerLevel = GameModels.user.player.level;
                    _this._manager.getGameChapterCity().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.DOOR_BOSS);
                            var gameChapterCity = _this._manager.getGameChapterCity();
                            gameChapterCity.start();
                            gameChapterCity.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                var _this = this;
                                if (result) {
                                    this._copyWinVO.type = TypeGame.DOOR_BOSS;
                                    this._copyWinVO.dropItems = dropItems;
                                    this._copyWinVO.star = totalStar;
                                    this._copyWinVO.selfEndVo = selfEndVo;
                                    this._copyWinVO.otherEndVo = otherEndVo;
                                    GameModels.chapter.bossCancelAutoFight();
                                    this._copyWinVO.initialize(this, function () {
                                        _this.copyWinCallFun(TypeGame.DOOR_BOSS, dropItems);
                                    });
                                    this.showWinTip(this._copyWinVO);
                                }
                                else {
                                    this.copyFailCallFun(TypeGame.DOOR_BOSS, totalStar, selfEndVo, otherEndVo);
                                }
                                ;
                            });
                        });
                    });
                    _this._manager.enter(s.GameChapterCity, mapId);
                });
            });
        };
        /**进入材料副本玩法 */
        GameContext.prototype.enterMaterial = function (copyVO, callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            /**扫荡 */
            if (callback) {
                GameModels.copyMaterial.requestQuickPass(copyVO.template.id, callback);
                return;
            }
            this.readyGameEnter(TypeGame.MATERIAL);
            GameModels.copyMaterial.enterGame(TypeGame.MATERIAL, copyVO, this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.MATERIAL);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameMaterial().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.MATERIAL);
                            var gameMaterial = _this._manager.getGameMaterial();
                            gameMaterial.start();
                            GameModels.copyBoss.addFightData(TypeGame.MATERIAL, copyVO, false);
                            gameMaterial.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                if (result) {
                                    _this._copyWinVO.type = TypeGame.MATERIAL;
                                    _this._copyWinVO.star = totalStar;
                                    _this._copyWinVO.dropItems = dropItems;
                                    _this._copyWinVO.selfEndVo = selfEndVo;
                                    _this._copyWinVO.otherEndVo = otherEndVo;
                                    _this._copyWinVO.initialize(_this, function () {
                                        _this.copyWinCallFun(TypeGame.MATERIAL, dropItems);
                                    });
                                    GameModels.copyBoss.removeFightData(TypeGame.MATERIAL);
                                    _this.showWinTip(_this._copyWinVO);
                                }
                                else {
                                    GameModels.copyBoss.removeFightData(TypeGame.MATERIAL);
                                    _this.copyFailCallFun(TypeGame.MATERIAL, totalStar, selfEndVo, otherEndVo);
                                }
                            });
                        });
                    });
                    _this._manager.enter(s.GameMaterial, copyVO);
                });
            });
        };
        /**势力塔玩法 */
        GameContext.prototype.enterShiLiTa = function (copyvo, isNext, isFive) {
            if (isNext === void 0) { isNext = false; }
            if (isFive === void 0) { isFive = false; }
            if (copyvo.type == 81) {
                this.enterShiLiTa1(copyvo, isNext, isFive);
            }
            else if (copyvo.type == 82) {
                this.enterShiLiTa2(copyvo, isNext, isFive);
            }
            else {
                this.enterShiLiTa3(copyvo, isNext, isFive);
            }
        };
        /**进入势力塔魏玩法 */
        GameContext.prototype.enterShiLiTa1 = function (copyVO, isNext, isFive) {
            var _this = this;
            if (isNext === void 0) { isNext = false; }
            if (isFive === void 0) { isFive = false; }
            var mapId = 0;
            if (!isNext && this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this.readyGameEnter(TypeGame.SHILITA_1);
            GameModels.scene.enterGame(TypeGame.SHILITA_1, copyVO ? copyVO.id.toString() : null, this, function (result) {
                mapId = result;
                if (!result) {
                    _this.failGameEnter(TypeGame.SHILITA_1);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameShiLiTa1().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.SHILITA_1);
                            var shiliTa = _this._manager.getGameShiLiTa1();
                            shiliTa.start();
                            GameModels.copyBoss.addFightData(TypeGame.SHILITA_1, copyVO, isFive);
                            shiliTa.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                if (result) {
                                    _this._copyWinVO.copyVo = copyVO;
                                    _this._copyWinVO.type = TypeGame.SHILITA_1;
                                    _this._copyWinVO.dropItems = dropItems;
                                    _this._copyWinVO.selfEndVo = selfEndVo;
                                    _this._copyWinVO.otherEndVo = otherEndVo;
                                    _this._copyWinVO.isFive = isFive;
                                    _this._copyWinVO.initialize(_this, function (isNext, isFive) {
                                        _this.copyWinCallFun(TypeGame.SHILITA_1, dropItems, isNext, isFive, copyVO);
                                    });
                                    GameModels.copyBoss.removeFightData(TypeGame.SHILITA_1);
                                    _this.showWinTip(_this._copyWinVO);
                                }
                                else {
                                    GameModels.copyBoss.removeFightData(TypeGame.SHILITA_1);
                                    _this.copyFailCallFun(TypeGame.SHILITA_1, totalStar, selfEndVo, otherEndVo);
                                }
                            });
                        });
                    });
                    _this._manager.enter(s.GameShiLiTa1, copyVO ? copyVO : mapId);
                });
            });
        };
        /**进入势力塔蜀玩法 */
        GameContext.prototype.enterShiLiTa2 = function (copyVO, isNext, isFive) {
            var _this = this;
            if (isNext === void 0) { isNext = false; }
            if (isFive === void 0) { isFive = false; }
            var mapId = 0;
            if (!isNext && this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this.readyGameEnter(TypeGame.SHILITA_2);
            GameModels.scene.enterGame(TypeGame.SHILITA_2, copyVO ? copyVO.id.toString() : null, this, function (result) {
                mapId = result;
                if (!result) {
                    _this.failGameEnter(TypeGame.SHILITA_2);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameShiLiTa2().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.SHILITA_2);
                            var shiliTa = _this._manager.getGameShiLiTa2();
                            shiliTa.start();
                            GameModels.copyBoss.addFightData(TypeGame.SHILITA_2, copyVO, isFive);
                            shiliTa.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                if (result) {
                                    _this._copyWinVO.copyVo = copyVO;
                                    _this._copyWinVO.type = TypeGame.SHILITA_2;
                                    _this._copyWinVO.dropItems = dropItems;
                                    _this._copyWinVO.selfEndVo = selfEndVo;
                                    _this._copyWinVO.otherEndVo = otherEndVo;
                                    _this._copyWinVO.isFive = isFive;
                                    _this._copyWinVO.initialize(_this, function (isNext, isFive) {
                                        _this.copyWinCallFun(TypeGame.SHILITA_2, dropItems, isNext, isFive, copyVO);
                                    });
                                    GameModels.copyBoss.removeFightData(TypeGame.SHILITA_2);
                                    _this.showWinTip(_this._copyWinVO);
                                }
                                else {
                                    GameModels.copyBoss.removeFightData(TypeGame.SHILITA_2);
                                    _this.copyFailCallFun(TypeGame.SHILITA_2, totalStar, selfEndVo, otherEndVo);
                                }
                            });
                        });
                    });
                    _this._manager.enter(s.GameShiLiTa2, copyVO ? copyVO : mapId);
                });
            });
        };
        /**进入势力塔吴玩法 */
        GameContext.prototype.enterShiLiTa3 = function (copyVO, isNext, isFive) {
            var _this = this;
            if (isNext === void 0) { isNext = false; }
            if (isFive === void 0) { isFive = false; }
            var mapId = 0;
            if (!isNext && this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this.readyGameEnter(TypeGame.SHILITA_3);
            GameModels.scene.enterGame(TypeGame.SHILITA_3, copyVO ? copyVO.id.toString() : null, this, function (result) {
                mapId = result;
                if (!result) {
                    _this.failGameEnter(TypeGame.SHILITA_3);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameShiLiTa3().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.SHILITA_3);
                            var shiliTa = _this._manager.getGameShiLiTa3();
                            shiliTa.start();
                            GameModels.copyBoss.addFightData(TypeGame.SHILITA_3, copyVO, isFive);
                            shiliTa.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                if (result) {
                                    _this._copyWinVO.copyVo = copyVO;
                                    _this._copyWinVO.type = TypeGame.SHILITA_3;
                                    _this._copyWinVO.dropItems = dropItems;
                                    _this._copyWinVO.selfEndVo = selfEndVo;
                                    _this._copyWinVO.otherEndVo = otherEndVo;
                                    _this._copyWinVO.isFive = isFive;
                                    _this._copyWinVO.initialize(_this, function (isNext, isFive) {
                                        _this.copyWinCallFun(TypeGame.SHILITA_3, dropItems, isNext, isFive, copyVO);
                                    });
                                    GameModels.copyBoss.removeFightData(TypeGame.SHILITA_3);
                                    _this.showWinTip(_this._copyWinVO);
                                }
                                else {
                                    GameModels.copyBoss.removeFightData(TypeGame.SHILITA_3);
                                    _this.copyFailCallFun(TypeGame.SHILITA_3, totalStar, selfEndVo, otherEndVo);
                                }
                            });
                        });
                    });
                    _this._manager.enter(s.GameShiLiTa3, copyVO ? copyVO : mapId);
                });
            });
        };
        /**进入锁妖塔塔玩法 */
        GameContext.prototype.enterPagodaLock = function (copyVO, isNext, isFive) {
            var _this = this;
            if (isNext === void 0) { isNext = false; }
            if (isFive === void 0) { isFive = false; }
            var mapId = 0;
            if (!isNext && this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this.readyGameEnter(TypeGame.PAGODA_LOCK);
            GameModels.scene.enterGame(TypeGame.PAGODA_LOCK, copyVO ? copyVO.id.toString() : null, this, function (result) {
                mapId = result;
                if (!result) {
                    _this.failGameEnter(TypeGame.PAGODA_LOCK);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameLockPagoda().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.PAGODA_LOCK);
                            var gamePagoda = _this._manager.getGameLockPagoda();
                            gamePagoda.start();
                            GameModels.copyBoss.addFightData(TypeGame.PAGODA_LOCK, copyVO, isFive);
                            gamePagoda.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                if (result) {
                                    _this._copyWinVO.copyVo = copyVO;
                                    _this._copyWinVO.type = TypeGame.PAGODA_LOCK;
                                    _this._copyWinVO.dropItems = dropItems;
                                    _this._copyWinVO.selfEndVo = selfEndVo;
                                    _this._copyWinVO.otherEndVo = otherEndVo;
                                    _this._copyWinVO.isFive = isFive;
                                    _this._copyWinVO.initialize(_this, function (isNext, isFive) {
                                        _this.copyWinCallFun(TypeGame.PAGODA_LOCK, dropItems, isNext, isFive, copyVO);
                                    });
                                    GameModels.copyBoss.removeFightData(TypeGame.PAGODA_LOCK);
                                    _this.showWinTip(_this._copyWinVO);
                                }
                                else {
                                    GameModels.copyBoss.removeFightData(TypeGame.PAGODA_LOCK);
                                    _this.copyFailCallFun(TypeGame.PAGODA_LOCK, totalStar, selfEndVo, otherEndVo);
                                }
                            });
                        });
                    });
                    _this._manager.enter(s.GamePagodaLock, copyVO ? copyVO : mapId);
                });
            });
        };
        /**进入武将塔玩法 */
        GameContext.prototype.enterPagodaPet = function (copyVO, isNext, isFive) {
            var _this = this;
            if (isNext === void 0) { isNext = false; }
            if (isFive === void 0) { isFive = false; }
            var mapId = 0;
            if (!isNext && this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this.readyGameEnter(TypeGame.PAGODA_PET);
            GameModels.scene.enterGame(TypeGame.PAGODA_PET, copyVO ? copyVO.id.toString() : null, this, function (result) {
                mapId = result;
                if (!result) {
                    _this.failGameEnter(TypeGame.PAGODA_PET);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGamePetPagoda().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.PAGODA_PET);
                            var gamePagoda = _this._manager.getGamePetPagoda();
                            gamePagoda.start();
                            GameModels.copyBoss.addFightData(TypeGame.PAGODA_PET, copyVO, isFive);
                            gamePagoda.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                if (result) {
                                    _this._copyWinVO.copyVo = copyVO;
                                    _this._copyWinVO.type = TypeGame.PAGODA_PET;
                                    _this._copyWinVO.dropItems = dropItems;
                                    _this._copyWinVO.selfEndVo = selfEndVo;
                                    _this._copyWinVO.otherEndVo = otherEndVo;
                                    _this._copyWinVO.isFive = isFive;
                                    _this._copyWinVO.initialize(_this, function (isNext, isFive) {
                                        _this.copyWinCallFun(TypeGame.PAGODA_PET, dropItems, isNext, isFive, copyVO);
                                    });
                                    GameModels.copyBoss.removeFightData(TypeGame.PAGODA_PET);
                                    _this.showWinTip(_this._copyWinVO);
                                }
                                else {
                                    GameModels.copyBoss.removeFightData(TypeGame.PAGODA_PET);
                                    _this.copyFailCallFun(TypeGame.PAGODA_PET, totalStar, selfEndVo, otherEndVo);
                                }
                            });
                        });
                    });
                    _this._manager.enter(s.GamePagodaPet, copyVO ? copyVO : mapId);
                });
            });
        };
        /**进入武魂塔玩法 */
        GameContext.prototype.enterWuHunPagodaPet = function (copyVO, isNext, isFive) {
            var _this = this;
            if (isNext === void 0) { isNext = false; }
            if (isFive === void 0) { isFive = false; }
            var mapId = 0;
            if (!isNext && this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this.readyGameEnter(TypeGame.PAGODA_WUHUN);
            GameModels.scene.enterGame(TypeGame.PAGODA_WUHUN, copyVO ? copyVO.id.toString() : null, this, function (result) {
                mapId = result;
                if (!result) {
                    _this.failGameEnter(TypeGame.PAGODA_WUHUN);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameWuHunPagoda().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.PAGODA_WUHUN);
                            var gamePagoda = _this._manager.getGameWuHunPagoda();
                            gamePagoda.start();
                            GameModels.copyBoss.addFightData(TypeGame.PAGODA_WUHUN, copyVO, isFive);
                            gamePagoda.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                if (result) {
                                    _this._copyWinVO.copyVo = copyVO;
                                    _this._copyWinVO.type = TypeGame.PAGODA_WUHUN;
                                    _this._copyWinVO.dropItems = dropItems;
                                    _this._copyWinVO.selfEndVo = selfEndVo;
                                    _this._copyWinVO.otherEndVo = otherEndVo;
                                    _this._copyWinVO.isFive = isFive;
                                    _this._copyWinVO.initialize(_this, function (isNext, isFive) {
                                        _this.copyWinCallFun(TypeGame.PAGODA_WUHUN, dropItems, isNext, isFive, copyVO);
                                    });
                                    GameModels.copyBoss.removeFightData(TypeGame.PAGODA_WUHUN);
                                    _this.showWinTip(_this._copyWinVO);
                                }
                                else {
                                    GameModels.copyBoss.removeFightData(TypeGame.PAGODA_WUHUN);
                                    _this.copyFailCallFun(TypeGame.PAGODA_WUHUN, totalStar, selfEndVo, otherEndVo);
                                }
                            });
                        });
                    });
                    _this._manager.enter(s.GamePagodaWuHun, copyVO ? copyVO : mapId);
                });
            });
        };
        /**进入演武玩法 */
        GameContext.prototype.enterLadder1Fight = function (playerId, callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            this.readyGameEnter(TypeGame.LADDER_FIGHT1);
            /**扫荡 */
            if (callback) {
                GameModels.ladder1.requestLadderQuickPass(callback);
                return;
            }
            GameModels.scene.enterGame(TypeGame.LADDER_FIGHT1, playerId, this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.LADDER_FIGHT1);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameLadderPvp1().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.LADDER_FIGHT1);
                            var gamePvp = _this._manager.getGameLadderPvp1();
                            gamePvp.start();
                            gamePvp.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                var _this = this;
                                if (result) {
                                    this._copyWinVO.type = TypeGame.LADDER_FIGHT1;
                                    this._copyWinVO.dropItems = dropItems;
                                    this._copyWinVO.selfEndVo = selfEndVo;
                                    this._copyWinVO.otherEndVo = otherEndVo;
                                    this._copyWinVO.initialize(this, function (isNext) {
                                        _this.copyWinCallFun(TypeGame.LADDER_FIGHT1, dropItems);
                                    });
                                    this.showWinTip(this._copyWinVO);
                                }
                                else {
                                    this.copyFailCallFun(TypeGame.LADDER_FIGHT1, totalStar, selfEndVo, otherEndVo);
                                }
                                ;
                            });
                        });
                    });
                    _this._manager.enter(s.GameLadderFight1);
                });
            });
        };
        /**进入天梯PVP玩法 */
        GameContext.prototype.enterLadderFight = function (playerId, callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            this.readyGameEnter(TypeGame.LADDER_FIGHT);
            /**扫荡 */
            if (callback) {
                GameModels.ladder.requestLadderQuickPass(playerId, callback);
                return;
            }
            GameModels.scene.enterGame(TypeGame.LADDER_FIGHT, playerId, this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.LADDER_FIGHT);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameLadderPvp().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.LADDER_FIGHT);
                            var gamePvp = _this._manager.getGameLadderPvp();
                            gamePvp.start();
                            gamePvp.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                var _this = this;
                                if (result) {
                                    this._copyWinVO.type = TypeGame.LADDER_FIGHT;
                                    this._copyWinVO.dropItems = dropItems;
                                    this._copyWinVO.selfEndVo = selfEndVo;
                                    this._copyWinVO.otherEndVo = otherEndVo;
                                    this._copyWinVO.initialize(this, function (isNext) {
                                        _this.copyWinCallFun(TypeGame.LADDER_FIGHT, dropItems);
                                    });
                                    this.showWinTip(this._copyWinVO);
                                }
                                else {
                                    this.copyFailCallFun(TypeGame.LADDER_FIGHT, totalStar, selfEndVo, otherEndVo);
                                }
                                ;
                            });
                        });
                    });
                    _this._manager.enter(s.GameLadderFight);
                });
            });
        };
        /**进入远征副本协助玩法 */
        GameContext.prototype.enterExpeditionSupport = function (playerId) {
            var _this = this;
            var mapId = 0;
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            mg.alertManager.closeALert();
            this.readyGameEnter(TypeGame.EXPEDITION_SUPPORT);
            GameModels.scene.enterGame(TypeGame.EXPEDITION_SUPPORT, playerId, this, function (result) {
                mapId = result;
                if (!result) {
                    _this.failGameEnter(TypeGame.EXPEDITION_SUPPORT);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameExpeditionSupport().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.EXPEDITION_SUPPORT);
                            var tGame = _this._manager.getGameExpeditionSupport();
                            tGame.start();
                            tGame.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                var _this = this;
                                if (result) {
                                    this._copyWinVO.type = TypeGame.EXPEDITION_SUPPORT;
                                    this._copyWinVO.dropItems = dropItems;
                                    this._copyWinVO.selfEndVo = selfEndVo;
                                    this._copyWinVO.otherEndVo = otherEndVo;
                                    this._copyWinVO.initialize(this, function (isNext) {
                                        _this.copyWinCallFun(TypeGame.EXPEDITION_SUPPORT, dropItems);
                                    });
                                    this.showWinTip(this._copyWinVO);
                                }
                                else {
                                    this.copyFailCallFun(TypeGame.EXPEDITION_SUPPORT, totalStar, selfEndVo, otherEndVo);
                                }
                                ;
                            });
                        });
                    });
                    _this._manager.enter(s.GameExpeditionSupport, mapId);
                });
            });
        };
        /**进入远征副本玩法 */
        GameContext.prototype.enterExpedition = function () {
            var _this = this;
            var mapId = 0;
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            mg.alertManager.closeALert();
            this.readyGameEnter(TypeGame.EXPEDITION);
            GameModels.scene.enterGame(TypeGame.EXPEDITION, "", this, function (result) {
                mapId = result;
                if (!result) {
                    _this.failGameEnter(TypeGame.EXPEDITION);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameExpedition().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.EXPEDITION);
                            var tGame = _this._manager.getGameExpedition();
                            tGame.start();
                            tGame.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                var _this = this;
                                if (result) {
                                    this._copyWinVO.type = TypeGame.EXPEDITION;
                                    this._copyWinVO.dropItems = dropItems;
                                    this._copyWinVO.selfEndVo = selfEndVo;
                                    this._copyWinVO.otherEndVo = otherEndVo;
                                    this._copyWinVO.initialize(this, function (isNext) {
                                        _this.copyWinCallFun(TypeGame.EXPEDITION, dropItems);
                                    });
                                    this.showWinTip(this._copyWinVO);
                                }
                                else {
                                    this.copyFailCallFun(TypeGame.EXPEDITION, totalStar, selfEndVo, otherEndVo);
                                }
                                ;
                            });
                        });
                    });
                    _this._manager.enter(s.GameExpedition, mapId);
                });
            });
        };
        /**好友切磋 */
        GameContext.prototype.enterFriendDiscussFight = function (playerId) {
            var _this = this;
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (this.checkInNoFormationGame())
                return;
            this.readyGameEnter(TypeGame.FRIEND_DISCUSS_WAR);
            GameModels.scene.enterGame(TypeGame.FRIEND_DISCUSS_WAR, playerId, this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.FRIEND_DISCUSS_WAR);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameFriendDiscussFight().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.FRIEND_DISCUSS_WAR);
                            var gamePvp = _this._manager.getGameFriendDiscussFight();
                            gamePvp.start();
                            gamePvp.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                var _this = this;
                                if (result) {
                                    this._copyWinVO.type = TypeGame.FRIEND_DISCUSS_WAR;
                                    this._copyWinVO.dropItems = dropItems;
                                    this._copyWinVO.selfEndVo = selfEndVo;
                                    this._copyWinVO.otherEndVo = otherEndVo;
                                    this._copyWinVO.initialize(this, function (isNext) {
                                        _this.copyWinCallFun(TypeGame.FRIEND_DISCUSS_WAR, dropItems);
                                    });
                                    this.showWinTip(this._copyWinVO);
                                }
                                else {
                                    this.copyFailCallFun(TypeGame.FRIEND_DISCUSS_WAR, totalStar, selfEndVo, otherEndVo);
                                }
                                ;
                            });
                        });
                    });
                    _this._manager.enter(s.GameFriendDiscussFight);
                });
            });
        };
        /**武官战斗 */
        GameContext.prototype.enterWuGuanFight = function () {
            var _this = this;
            if (this.checkInCopy())
                return;
            if (this.checkInNoFormationGame())
                return;
            this.readyGameEnter(TypeGame.WUGUAN_FIGHT);
            GameModels.scene.enterGame(TypeGame.WUGUAN_FIGHT, "", this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.WUGUAN_FIGHT);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameWuGuanfight().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.WUGUAN_FIGHT);
                            var gameWuGuanfight = _this._manager.getGameWuGuanfight();
                            gameWuGuanfight.start();
                            gameWuGuanfight.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                if (result) {
                                    _this._copyWinVO.type = TypeGame.WUGUAN_FIGHT;
                                    _this._copyWinVO.dropItems = dropItems;
                                    _this._copyWinVO.selfEndVo = selfEndVo;
                                    _this._copyWinVO.otherEndVo = otherEndVo;
                                    _this._copyWinVO.initialize(_this, function (isNext) {
                                        _this.copyWinCallFun(TypeGame.WUGUAN_FIGHT, dropItems);
                                    });
                                    _this.showWinTip(_this._copyWinVO);
                                }
                                else {
                                    _this.copyFailCallFun(TypeGame.WUGUAN_FIGHT, totalStar, selfEndVo, otherEndVo);
                                }
                            });
                        });
                    });
                    _this._manager.enter(s.GameWuGuan);
                });
            });
        };
        /**王者争霸(国战) */
        GameContext.prototype.enterGameKingWar = function (str) {
            var _this = this;
            var mapId = 0;
            if (this.checkInCopy())
                return;
            if (this.checkInNoFormationGame())
                return;
            this.readyGameEnter(TypeGame.KING_WAR);
            GameModels.scene.enterGame(TypeGame.KING_WAR, str, this, function (result) {
                mapId = result;
                if (!result) {
                    _this.failGameEnter(TypeGame.KING_WAR);
                    return;
                }
                FightLoading.instance.remove();
                FightLoading.instance.add(_this, function () {
                    _this._manager.getGameKingWar().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, function () {
                            _this.overGameEnter(TypeGame.KING_WAR);
                            var tGame = _this._manager.getGameKingWar();
                            tGame.start();
                            tGame.onEndOnce(_this, function (result, totalStar, dropItems, playerlv, selfEndVo, otherEndVo) {
                                if (result) {
                                    _this._copyWinVO.type = TypeGame.KING_WAR;
                                    _this._copyWinVO.dropItems = dropItems;
                                    _this._copyWinVO.selfEndVo = selfEndVo;
                                    _this._copyWinVO.otherEndVo = otherEndVo;
                                    _this._copyWinVO.initialize(_this, function (isNext) {
                                        _this.copyWinCallFun(TypeGame.KING_WAR, dropItems);
                                    });
                                    GameModels.kingwar.fightState = 1;
                                    _this.showWinTip(_this._copyWinVO);
                                }
                                else {
                                    GameModels.kingwar.fightState = 0;
                                    _this.copyFailCallFun(TypeGame.KING_WAR, totalStar, selfEndVo, otherEndVo);
                                }
                            });
                        });
                    });
                    _this._manager.enter(s.GameKingWar, mapId);
                });
            });
        };
        /**以上玩法多场战斗可同时进行 */
        ////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        /**以下玩法只能存在一个战斗 */
        /**进入异族来袭之地 */
        GameContext.prototype.enterGodDie = function (copyId) {
            var _this = this;
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this.readyGameEnter(TypeGame.GOD_DIE);
            GameModels.sceneGodDie.enterGame(copyId, this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.GOD_DIE);
                    return;
                }
                _this._manager.getGameGodDie().onEnterOverOnce(_this, function () {
                    GameModels.scene.requestSightsSnap(_this, function () {
                        _this.overGameEnter(TypeGame.GOD_DIE);
                        var gameGameGodDie = _this._manager.getGameGodDie();
                        gameGameGodDie.start();
                        gameGameGodDie.onEndOnce(_this, function (result, totalStar, dropItems) {
                            _this._copyWinVO.type = TypeGame.GOD_DIE;
                            _this._copyWinVO.dropItems = dropItems;
                            _this._copyWinVO.initialize(_this, function (isNext) {
                                _this._copyWinVO.reset();
                                _this.exitToMainGame();
                            });
                            _this.exitToMainGame();
                        });
                    });
                });
                _this._manager.enter(s.GameGodDie);
            });
        };
        /**进入车轮战玩法 */
        GameContext.prototype.enterCampBattleWar = function (activityId) {
            var _this = this;
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this.readyGameEnter(TypeGame.CAMP_BATTLE_WAR);
            GameModels.scene.enterGame(TypeGame.CAMP_BATTLE_WAR, "" + activityId, this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.CAMP_BATTLE_WAR);
                    return;
                }
                _this._manager.getGameCampBattleWar().onEnterOverOnce(_this, function () {
                    GameModels.scene.requestSightsSnap(_this, function () {
                        _this.overGameEnter(TypeGame.CAMP_BATTLE_WAR);
                        var gameCampBattleWar = _this._manager.getGameCampBattleWar();
                        gameCampBattleWar.start();
                        gameCampBattleWar.onEndOnce(_this, function (result, totalStar, dropItems) {
                            this.exitToMainGame();
                        });
                    });
                });
                _this._manager.enter(s.GameCampBattleWar, activityId);
            });
        };
        /**进入巅峰观战 */
        GameContext.prototype.enterGameTopBattleRoom = function (roomId) {
            var _this = this;
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            this.readyGameEnter(TypeGame.TOP_BATTLE_ROOM);
            GameModels.scene.enterGame(TypeGame.TOP_BATTLE_ROOM, roomId, this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.TOP_BATTLE_ROOM);
                    return;
                }
                _this._manager.getGameTopBattleRoom().onEnterOverOnce(_this, function () {
                    GameModels.scene.requestSightsSnap(_this, function () {
                        _this.overGameEnter(TypeGame.TOP_BATTLE_ROOM);
                        var tGame = _this._manager.getGameTopBattleRoom();
                        tGame.start();
                        tGame.onEndOnce(_this, function (result, totalStar, dropItems) {
                            this.exitToMainGame();
                        });
                    });
                });
                _this._manager.enter(s.GameTopBattleRoom, roomId);
            });
        };
        /**进入武将讨伐玩法 */
        GameContext.prototype.enterPersonalBoss = function (copyVO, callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this._bossSeledId = copyVO.templateBoss.id;
            this.readyGameEnter(TypeGame.PERSONAL_BOSS);
            /**扫荡 */
            if (callback) {
                GameModels.copyBoss.requestQuickPass(copyVO.template.id, callback);
                return;
            }
            GameModels.scene.enterGame(TypeGame.PERSONAL_BOSS, copyVO.id.toString(), this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.PERSONAL_BOSS);
                    return;
                }
                _this._manager.getGameBossPersonal().onEnterOverOnce(_this, function () {
                    GameModels.scene.requestSightsSnap(_this, function () {
                        _this.overGameEnter(TypeGame.PERSONAL_BOSS);
                        var gameBoss = _this._manager.getGameBossPersonal();
                        gameBoss.start();
                        gameBoss.onEndOnce(_this, function (result, totalStar, dropItems) {
                            if (result) {
                                this._copyWinVO.type = TypeGame.PERSONAL_BOSS;
                                this._copyWinVO.petDebris = this.getPetDebris(dropItems, 1)[0];
                                this._copyWinVO.dropItems = this.getPetDebris(dropItems, 0);
                                this._copyWinVO.gold = this.getPetDebris(dropItems, 2)[0];
                                this._copyWinVO.initialize(this, function () {
                                    this._copyWinVO.reset();
                                    vo.toPoolList(dropItems);
                                    this.exitToMainGame();
                                });
                                var superEquips = []; //this.getOrangeEquips(dropItems);
                                if (superEquips.length > 0) {
                                    tips.GetSpuerEquitmentTip.instance.show(superEquips, utils.Handler.create(this, function () {
                                        this.showWinTip(this._copyWinVO);
                                    }));
                                }
                                else {
                                    this.showWinTip(this._copyWinVO);
                                }
                            }
                            else {
                                this.showFailTip(this, this.exitToMainGame, totalStar, null, null, TypeGame.PERSONAL_BOSS);
                            }
                        });
                    });
                });
                _this._manager.enter(s.GamePersonalBoss, copyVO);
            });
        };
        /**进入群雄逐鹿玩法 */
        GameContext.prototype.enterEveryOneBoss = function (copyVO, callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (app.gameContext.typeGame != TypeGame.EVERYONE_BOSS && this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this._bossSeledId = copyVO.templateBoss.id;
            this.readyGameEnter(TypeGame.EVERYONE_BOSS);
            /**扫荡 */
            if (callback) {
                GameModels.copyBoss.requestQuickPass(copyVO.template.id, callback);
                return;
            }
            var isGuide = (copyVO.openLevel == 20);
            if (isGuide) {
                /*GameModels.sceneEveryBossGuide.enterGame(copyVO, this, () => {
                    this._manager.getGameBossEveryOneGuide().onEnterOverOnce(this, () => {
                        this.enterEveryOneBossHandler(isGuide, copyVO);
                    });
                    this._manager.enter(s.GameEveryBossGuide, copyVO);
                });*/
                GameModels.sceneEveryBoss.enterGame(TypeGame.EVERYONE_BOSS_GUIDE, copyVO, this, function (result) {
                    if (!result) {
                        _this.failGameEnter(TypeGame.EVERYONE_BOSS_GUIDE);
                        return;
                    }
                    _this._manager.getGameBossEveryOneGuide().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, _this.enterEveryOneBossHandler, isGuide, copyVO);
                    });
                    _this._manager.enter(s.GameEveryBossGuide, copyVO);
                });
            }
            else {
                GameModels.sceneEveryBoss.enterGame(TypeGame.EVERYONE_BOSS, copyVO, this, function (result) {
                    if (!result) {
                        _this.failGameEnter(TypeGame.EVERYONE_BOSS);
                        return;
                    }
                    GameModels.copyBoss.everyBossCount--;
                    _this._manager.getGameBossEveryOne().onEnterOverOnce(_this, function () {
                        GameModels.scene.requestSightsSnap(_this, _this.enterEveryOneBossHandler, isGuide, copyVO);
                    });
                    _this._manager.enter(s.GameEveryBoss, copyVO);
                });
            }
        };
        GameContext.prototype.enterEveryOneBossHandler = function (isGuide, copyVO) {
            var _this = this;
            this.overGameEnter(TypeGame.EVERYONE_BOSS);
            //var battleScene: mo.IModelEveryBoss = isGuide ? GameModels.sceneEveryBossGuide : GameModels.sceneEveryBoss;
            var battleScene = GameModels.sceneEveryBoss;
            var gameBoss = isGuide ? this._manager.getGameBossEveryOneGuide() : this._manager.getGameBossEveryOne();
            gameBoss.start();
            gameBoss.onEndOnce(this, function (result, totalStar, dropItems, winPlayerVO) {
                if (result) {
                    _this._copyWinVO.type = TypeGame.EVERYONE_BOSS;
                    _this._copyWinVO.petDebris = _this.getPetDebris(dropItems, 1)[0];
                    _this._copyWinVO.dropItems = _this.getPetDebris(dropItems, 0);
                    _this._copyWinVO.gold = _this.getPetDebris(dropItems, 2)[0];
                    _this._copyWinVO.winPlayerVO = winPlayerVO;
                    _this._copyWinVO.initialize(_this, function () {
                        this._copyWinVO.reset();
                        vo.toPoolList(dropItems);
                        if (!!GameModels.copyBoss.getAutoBossVO()) {
                            if (utils.CheckUtil.checkBagSmelting()) {
                                GameModels.copyBoss.disableAutoBoss();
                                this.exitToMainGame();
                                mg.alertManager.tip(Language.J_BBYMYQXZDZD);
                                return;
                            }
                            this.enterEveryOneBoss(GameModels.copyBoss.getAutoBossVO());
                            return;
                        }
                        this.exitToMainGame();
                    });
                    var superEquips = []; //this.getOrangeEquips(dropItems);
                    if (superEquips.length > 0) {
                        tips.GetSpuerEquitmentTip.instance.show(superEquips, utils.Handler.create(_this, function () {
                            this.showWinTip(this._copyWinVO);
                        }));
                    }
                    else {
                        _this.showWinTip(_this._copyWinVO);
                    }
                }
                else {
                    _this.showFailTip(_this, _this.exitToMainGame, totalStar, null, null, TypeGame.EVERYONE_BOSS);
                    GameModels.copyBoss.disableAutoBoss();
                }
            });
        };
        /**进入阵营战玩法 */
        GameContext.prototype.enterLegionWar = function (isCross) {
            var _this = this;
            if (isCross === void 0) { isCross = false; }
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this.readyGameEnter(TypeGame.LEGION_WAR);
            GameModels.sceneLegin.enterGame(this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.LEGION_WAR);
                    _this.exitToMainGame();
                    return;
                }
                _this._manager.getGameLegionFight().onEnterOverOnce(_this, function () {
                    GameModels.scene.requestSightsSnap(_this, function () {
                        _this.overGameEnter(TypeGame.LEGION_WAR);
                        var gameLegionFight = _this._manager.getGameLegionFight();
                        gameLegionFight.start();
                        gameLegionFight.onEndOnce(_this, function (result, totalStar, dropItems) {
                            _this.exitToMainGame();
                        });
                    });
                });
                _this._manager.enter(s.GameLegionWar);
            });
        };
        /**进入阵营征伐玩法 */
        GameContext.prototype.enterGodDomain = function (copyVO, callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this._bossSeledId = copyVO.templateBoss.id;
            this.readyGameEnter(TypeGame.GOD_DOMAIN);
            /**扫荡 */
            if (callback) {
                GameModels.copyBoss.requestQuickPass(copyVO.template.id, callback);
                return;
            }
            GameModels.sceneEveryBoss.enterGame(TypeGame.GOD_DOMAIN, copyVO, this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.GOD_DOMAIN);
                    return;
                }
                _this._manager.getGameDomainBoss().onEnterOverOnce(_this, function () {
                    GameModels.scene.requestSightsSnap(_this, function () {
                        _this.overGameEnter(TypeGame.GOD_DOMAIN);
                        var gameBoss = _this._manager.getGameDomainBoss();
                        gameBoss.start();
                        gameBoss.onEndOnce(_this, function (result, totalStar, dropItems, winPlayerVO) {
                            if (result) {
                                _this._copyWinVO.type = TypeGame.GOD_DOMAIN;
                                _this._copyWinVO.petDebris = _this.getPetDebris(dropItems, 1)[0];
                                _this._copyWinVO.dropItems = _this.getPetDebris(dropItems, 0);
                                _this._copyWinVO.gold = _this.getPetDebris(dropItems, 2)[0];
                                _this._copyWinVO.winPlayerVO = winPlayerVO;
                                _this._copyWinVO.initialize(_this, function () {
                                    this._copyWinVO.reset();
                                    vo.toPoolList(dropItems);
                                    this.exitToMainGame();
                                });
                                var superEquips = []; //this.getOrangeEquips(dropItems);
                                if (superEquips.length > 0) {
                                    tips.GetSpuerEquitmentTip.instance.show(superEquips, utils.Handler.create(_this, function () {
                                        this.showWinTip(this._copyWinVO);
                                    }));
                                }
                                else {
                                    _this.showWinTip(_this._copyWinVO);
                                }
                            }
                            else {
                                _this.showFailTip(_this, _this.exitToMainGame, totalStar, null, null, TypeGame.GOD_DOMAIN);
                            }
                        });
                    });
                });
                _this._manager.enter(s.GameGodDomain, copyVO);
            });
        };
        /**进入王者疆场玩法 */
        GameContext.prototype.enterKingBattleGround = function (isCross) {
            var _this = this;
            if (isCross === void 0) { isCross = false; }
            if (this.checkInCopy())
                return;
            if (this.checkInChapterBoss())
                return;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            this.readyGameEnter(TypeGame.KING_BATTLE_GROUD);
            GameModels.sceneKingBattle.enterGame(this, function (result) {
                if (!result) {
                    _this.failGameEnter(TypeGame.KING_BATTLE_GROUD);
                    return;
                }
                _this._manager.getGameKingBattlefieldFight().onEnterOverOnce(_this, function () {
                    GameModels.scene.requestSightsSnap(_this, function () {
                        _this.overGameEnter(TypeGame.KING_BATTLE_GROUD);
                        var gameKingBattlefieldFight = _this._manager.getGameKingBattlefieldFight();
                        gameKingBattlefieldFight.start();
                        gameKingBattlefieldFight.onEndOnce(_this, function (result, totalStar, dropItems) {
                            _this.exitToMainGame();
                        });
                    });
                });
                _this._manager.enter(s.GameKingBattleGround);
            });
        };
        /**在不是对冲模式的玩法中 */
        GameContext.prototype.checkInNoFormationGame = function () {
            if (!this.manager.gameCurrent)
                return false;
            if (!TypeGame.isFormationGame(true) && TypeGame.CURRENT_GAME_TYPE != TypeGame.CITY && TypeGame.CURRENT_GAME_TYPE != TypeGame.ATKCITY) {
                mg.alertManager.tip(Language.J_GWFWFQHCJ);
                return true;
            }
            return false;
        };
        GameContext.prototype.checkInCopy = function () {
            if (!this.manager.gameCurrent)
                return false;
            // if (TypeGame.isCopy(this.manager.gameCurrent.type)) {
            // 	mg.alertManager.tip(Language.J_FBZWFQH);
            // 	return true;
            // }
            // if (!GameModels.copyMaterial.teamLock) {
            // 	mg.alertManager.tip(Language.J_ZDZTXBNJRQTWF);
            // 	return true;
            // }
            return false;
        };
        GameContext.prototype.checkInChapterBoss = function () {
            // if ((this._manager.gameCurrent && (this._manager.gameCurrent.type == TypeGame.CHAPTER_BOSS || this._manager.gameCurrent.type == TypeGame.DOOR_BOSS))) {
            // 	mg.alertManager.tip(Language.J_GKZWFQH);
            // 	return true;
            // }
            return false;
        };
        //获得橙装
        GameContext.prototype.getOrangeEquips = function (items) {
            if (!items || items.length <= 0)
                return [];
            var itemsArr = [];
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                if ((item.mainType == TypeItem.EQUIP && item.quality >= TypeQuality.ORANGE)) {
                    itemsArr.push(item);
                }
            }
            itemsArr.sort(function (a, b) {
                return a.lv - b.lv;
            });
            return itemsArr;
        };
        /**获得胜利面板的数据  */
        GameContext.prototype.getPetDebris = function (items, type) {
            if (type === void 0) { type = 0; }
            if (!items || items.length <= 0)
                return null;
            var itemsArr = [];
            if (type == 1) {
                for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                    var item = items_2[_i];
                    if (item.id == "215901") {
                        itemsArr.push(item);
                        break;
                    }
                }
            }
            else if (type == 2) {
                for (var _a = 0, items_3 = items; _a < items_3.length; _a++) {
                    var item = items_3[_a];
                    if (item.id == "210302") {
                        itemsArr.push(item);
                        break;
                    }
                }
            }
            else {
                for (var _b = 0, items_4 = items; _b < items_4.length; _b++) {
                    var item = items_4[_b];
                    if (item.id == "215901")
                        continue;
                    if (item.id == "210302")
                        continue;
                    itemsArr.push(item);
                }
            }
            return itemsArr;
        };
        GameContext.prototype.showWinTip = function (copyWinVO) {
            copy.CopyWinInstance.instance.add(copyWinVO);
            var sound = Math.floor(Math.random() * 2) >= 1 ? 'Win_1' : 'Win_2';
            mg.soundManager.stopBackGround();
            mg.soundManager.playSound(sound);
        };
        GameContext.prototype.showFailTip = function (caller, method) {
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            (_a = copy.CopyFailInstance.instance).add.apply(_a, [caller, method].concat(args));
            var sound = Math.floor(Math.random() * 2) >= 1 ? 'Lose_1' : 'Lose_2';
            logger.log(sound);
            mg.soundManager.playSound(sound);
            var _a;
        };
        /**注册pop 需要带title*/
        GameContext.prototype.registerPopUI = function () {
            var that = this;
            // that.registerUI(s.UserfaceName.main, main.MainUIView, game.TypeAlign.TOP_LEFT, null, TypePop.FIX);
            that.registerUI(s.UserfaceName.main, main.MainUIView, game.TypeAlign.TOP_LEFT, new egret.Point(0, platform.sdk.uiOffsetY), TypePop.FIX);
            that.registerUI(s.UserfaceName.bag, dialog.bag.BagDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 100000);
            that.registerUI(s.UserfaceName.bagRecycle, dialog.bag.BagRecycleDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            that.registerUI(s.UserfaceName.shop, MallScene, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 8, 0);
            that.registerUI(s.UserfaceName.guanzhi, dialog.WenGuan.WenGuanDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 0, 0);
            that.registerUI(s.UserfaceName.legionList, LegionList, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 0, 0);
            that.registerUI(s.UserfaceName.legion, LegionMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 10000);
            //that.registerUI(s.UserfaceName.legionDynamic, LegionDynamic, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.legionMembermanage, LegionNumberList, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.legionRedPacket, LegionRedPacketList, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.legionTask, dialog.legion.LegionTaskMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            //that.registerUI(s.UserfaceName.legionShop, LegionShop, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.legionBuy, dialog.legion.LegionTeHuiMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.mail, MailSceneDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 0, 0);
            that.registerUI(s.UserfaceName.treasure, treasure.TreasureMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 0, 0);
            that.registerUI(s.UserfaceName.rankMain, dialog.rank.RankingMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 0, 0);
            that.registerUI(s.UserfaceName.rank, dialog.ranking.RankingMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.sociality, dialog.sociality.SocialityDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.material, dialog.explore.CopyMaterialDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.copyboss, dialog.explore.CopyFightBossDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, -1);
            that.registerUI(s.UserfaceName.explorePetpagoda, dialog.explore.CopyPagodaMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.ladderRanking, dialog.explore.LadderRanking, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.ladderRanking1, dialog.explore.LadderRanking1, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.bingfensanluRank, dialog.yuanzheng.BingFenSanLuRanking, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            that.registerUI(s.UserfaceName.role, dialog.role.RoleMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 100000);
            that.registerUI(s.UserfaceName.roleWingGod, dialog.role.wing.RoleWingGodDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.roleFashion, dialog.fashion.FashionMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 4, 0);
            that.registerUI(s.UserfaceName.sports, dialog.sport.SportsMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            //that.registerUI(s.UserfaceName.recharge, dialog.recharge.RechargeDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 9, 0);
            //that.registerUI(s.UserfaceName.legionWar, dialog.legionWar.LegionWarMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.kingBattle, dialog.limitactivities.KingBattlefieldDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            // that.registerUI(s.UserfaceName.worship, dialog.worship.WorshipDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.teamCopy, dialog.explore.TeamDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.tradingSell, dialog.trading.TradingSellDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            that.registerUI(s.UserfaceName.baowu, dialog.baowu.BaoWuMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.roleEquipDress, dialog.role.AncientEquipDressDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            // that.registerUI(s.UserfaceName.tavern, dialog.tavern.TavernMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 0, 0);
            // that.registerUI(s.UserfaceName.xunFang, dialog.tavern.XunFang, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 0, 0);
            that.registerUI(s.UserfaceName.LegionFengLu, dialog.WenGuan.CampSalary, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.LegionZhenQi, LegionZhenQi, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.welfare, dialog.welfare.WelfareMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.sgDaily, dialog.activity.sgDailyActivityMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            //that.registerUI(s.UserfaceName.sgOpenServer, dialog.activity.sgOpenServerActivityMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            //that.registerUI(s.UserfaceName.moshenFengYin, achievement.AchievementTuJianMoShen, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 4, 0);
            that.registerUI(s.UserfaceName.exploreSmithy, dialog.dazao.DaoZaoMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.smithyTalent, dialog.smithy.SmithyTalentDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.exploreAtivities, dialog.battlefield.BattlefieldMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.battlefieldMain, dialog.battlefield.BattlefieldUnion, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            that.registerUI(s.UserfaceName.campBattleMain, dialog.campBattle.CampBattleMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            that.registerUI(s.UserfaceName.petWanFa, dialog.yuanZheng.petWanFaMainDilog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.yuanzheng, dialog.yuanZheng.LegionYuanZheng, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.bingfensanlu, dialog.yuanZheng.BingFenSanLu, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.campBattleJoin, dialog.campBattle.CampBattleJoin, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            that.registerUI(s.UserfaceName.campBattleCheckPlayer, dialog.campBattle.CampBattleCheckPlayer, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            that.registerUI(s.UserfaceName.vipTeQuan, view.vip.VipMianDailog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 0, 1);
            that.registerUI(s.UserfaceName.activitysumme, dialog.activitysummer.sgActivitysummerMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            //that.registerUI(s.UserfaceName.smokePet, dialog.smokePet.smokePetMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            //that.registerUI(s.UserfaceName.shengzhi, dialog.imperialEdict.ImperialEdict, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.shengZhiMain, pet.PetGroupMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.legioncorps, LegionCorpsMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 4, 0);
            that.registerUI(s.UserfaceName.tujian, dialog.tujian.TuJianMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.haohuaRank, dialog.activity.HaoHuaJiangChiRank, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.buzhen, dialog.buzhen.BuZhenDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.zhuanshuTeQuan, view.activity.zhuanshuTeQuanView, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.strategy, dialog.strategy.StrategyMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.gongming, pet.PetGongMingMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.petFenJie, dialog.list.PetListFenJieDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 4, 0);
            that.registerUI(s.UserfaceName.changeShop, dialog.shop.MallChangeShopMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.xianshiGift, dialog.gift.notifyGiftMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.juebanGift, dialog.gift.notifyGiftMainDialog1, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.topBattle, dialog.topBattle.TopBattleMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            that.registerUI(s.UserfaceName.kingwar, dialog.kingwar.kingWarMapMainDilog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 2, 0);
            that.registerUI(s.UserfaceName.monster, dialog.battlefield.BattlefieldMonster, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 3, 0);
            that.registerUI(s.UserfaceName.sevenDayTask, dialog.sevenday.SevenDayTask, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.zhuzhan, dialog.role.zhuzhan.RoleZhuZhan, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 4, 0);
            that.registerUI(s.UserfaceName.zhuzhanAll, dialog.role.zhuzhan.RoleZhuZhanPreview, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 5, 0);
            that.registerUI(s.UserfaceName.activityLimit, dialog.activityLimit.sgActivityLimitMainDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.activityLimit1, dialog.activityLimit.sgActivityLimitMainDialog1, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.animal, animal.AnimalDialogMain, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 1, 0);
            that.registerUI(s.UserfaceName.shareFriend, dialog.legion.LegionShareFriend, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.POP, 4, 0);
        };
        /**注册float */
        GameContext.prototype.registerFloatUI = function () {
            var that = this;
            that.registerUI(s.UserfaceName.petList, dialog.list.PetListDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.funPreview, dialog.funPreview.FunPreviewDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.contractresolve, dialog.resolve.CommonOtherResovle, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.tradingSellShangJia, dialog.trading.TradingSellShangJiaTip, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.tradingSellRecord, dialog.trading.TradingSellRecord, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            // that.registerUI(s.UserfaceName.chapterBossMainView, main.ChapterBossMainView, game.TypeAlign.CENTER, null, TypePop.FLOAT, 2);
            //that.registerUI(s.UserfaceName.crossBossRewardTip, dialog.cross.CrossBossRewardTip, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
            // that.registerUI(s.UserfaceName.dianjingGift, dialog.platformactivity.DianJingGift, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.copyWinTip, copy.CopyWinTipView, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.copyFailTip, copy.CopyFailTipView, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            // that.registerUI(s.UserfaceName.logInAward, dialog.platformactivity.LogInAwardDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            //that.registerUI(s.UserfaceName.luckybox, dialog.activity.LuckyBoxDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            // that.registerUI(s.UserfaceName.xinyueGift, dialog.platformactivity.XinYueGift, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.yearsGift, dialog.platformactivity.YearsGiftDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.yearsGiftPreview, view.activity.XingYingDuoBaoPreview, game.TypeAlign.CENTER, null, TypePop.FLOAT, 2);
            // that.registerUI(s.UserfaceName.activitysprint, dialog.activity.ActivitySprintMainDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            // that.registerUI(s.UserfaceName.yellowDiamond, dialog.platformactivity.YellowDiamondGift, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.fangChenMi, dialog.fanchenmi.FangChenMiDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.getTitle, GetTitle, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1, 1);
            that.registerUI(s.UserfaceName.activityHeFu, dialog.activity.ActivityHeFuMainDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.huanjieRank, dialog.explore.HuanjieRankView, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            //that.registerUI(s.UserfaceName.legiondonateRank, DonateRank, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            // that.registerUI(s.UserfaceName.attestation, dialog.platformactivity.AttestationAwardDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            // that.registerUI(s.UserfaceName.btnWeiDuan, dialog.platformactivity.WeiDuanAwardDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            // that.registerUI(s.UserfaceName.yaoqing, dialog.platformactivity.YaoQingAwardDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            // that.registerUI(s.UserfaceName.guanzhu, dialog.platformactivity.AttentionAwardDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            // that.registerUI(s.UserfaceName.shoucang, dialog.platformactivity.ShouCangAwardDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            //that.registerUI(s.UserfaceName.shenmishanren, dialog.activity.MysteryMerchantDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.xianshilibao, dialog.activity.XianShiLiBaoDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.limitBigGift, dialog.activity.LimitBigGiftDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.oneYuanBuy, dialog.activity.oneYuanBuyDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.meirichongzhi, dialog.activity.meiriChongZhiView, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.welcome, dialog.WelcomeDialog, game.TypeAlign.CENTER, new egret.Point(0, -100), TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.vip, dialog.vip.VipDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.firstRecharge, dialog.firstrecharge.FirstRechargeDialog1, game.TypeAlign.CENTER, null, TypePop.FLOAT, 2);
            // that.registerUI(s.UserfaceName.zhuanshuGift, dialog.activity.zhuanshuGiftViewDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT, 2);
            that.registerUI(s.UserfaceName.setting, dialog.setting.SettingDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT, 2);
            // that.registerUI(s.UserfaceName.offline, dialog.offline.OfflineDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.task, dialog.task.TaskDialog, game.TypeAlign.CENTER, new egret.Point(0, 200), TypePop.FLOAT);
            // that.registerUI(s.UserfaceName.taskcollect, dialog.task.TaskCollectView, game.TypeAlign.CENTER, new egret.Point(0, 200), TypePop.FLOAT);
            that.registerUI(s.UserfaceName.ladderReward, dialog.explore.LadderReward, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.privateChat, dialog.sociality.friend.PrivateChatDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.applyFriend, dialog.sociality.friend.ApplyFriendListDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.tuijianFriend, dialog.sociality.friend.TuiJianFriendListDialog, game.TypeAlign.TOP_AUTO, new egret.Point(0, 40), TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.treasureAllprize, treasure.TreasureAllPrize, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            //that.registerUI(s.UserfaceName.mailPop, MailPopSceneDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            // that.registerUI(s.UserfaceName.RoleZhanQiTalentUp, dialog.zhanqi.RoleZhanQiTalentUp, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            that.registerUI(s.UserfaceName.createactor, login.CreatePlayerName, game.TypeAlign.TOP, null, TypePop.FLOAT, 100);
            that.registerUI(s.UserfaceName.tuJianUp, AchievementTuJianUp, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            that.registerUI(s.UserfaceName.chengzhuangFenJie, dialog.role.chengzhuang.ChengZhuangSplictDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            // that.registerUI(s.UserfaceName.battlefieldReady, dialog.battlefield.BattlefieldReady, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.battlefieldEnd, dialog.battlefield.BattlefieldRank, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.CampbattlefieldEnd, dialog.campBattle.CampBattleRank, game.TypeAlign.CENTER, null, TypePop.FLOAT);
            that.registerUI(s.UserfaceName.token, main.MainToken, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            that.registerUI(s.UserfaceName.xpMain, dialog.xpExperencet.xpExperencetMain, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            that.registerUI(s.UserfaceName.countryWarAdvanceNotice, main.MainCountryWarAdvanceNotice, game.TypeAlign.CENTER, null, TypePop.FLOAT, 0);
            that.registerUI(s.UserfaceName.shengzhiTask, dialog.imperialEdict.ImperialEdictTask, game.TypeAlign.CENTER, null, TypePop.FLOAT, 2);
            //that.registerUI(s.UserfaceName.tongjiling, TongJiLing, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
            that.registerUI(s.UserfaceName.qiangzheng, MainChapterCityReward1, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
            that.registerUI(s.UserfaceName.tequanExpire, MallTeQuanExpire, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
            //that.registerUI(s.UserfaceName.hongYanCiHun, dialog.hongYanCiHun.AchievementHongYanCiHun, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
            //that.registerUI(s.UserfaceName.hongYanCiHun, dialog.hongYanCiHun.AchievementHongYanCiHun, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
            that.registerUI(s.UserfaceName.bingfaList, dialog.list.BingFaList, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
            that.registerUI(s.UserfaceName.bingfaZhongZhu, BingFaZhongZhu, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
            that.registerUI(s.UserfaceName.ouYuXianRen, dialog.ouYuXianRen.OuYanXianRenDialog, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
            that.registerUI(s.UserfaceName.zhugeliang, MainPresentZhuGeLiangAlter, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
            that.registerUI(s.UserfaceName.timePickGift, MainTimePickGift, game.TypeAlign.CENTER, null, TypePop.FLOAT, 2);
            that.registerUI(s.UserfaceName.animalFloat, animal.AnimalReward, game.TypeAlign.CENTER, null, TypePop.FLOAT, 2);
            that.registerUI(s.UserfaceName.share, animal.AnimalShare, game.TypeAlign.CENTER, null, TypePop.FLOAT, 1);
        };
        GameContext.prototype.reset = function () {
            _super.prototype.reset.call(this);
        };
        GameContext.enterCityLevel = 50;
        return GameContext;
    }(app.ContextBase));
    app.GameContext = GameContext;
    __reflect(GameContext.prototype, "app.GameContext");
})(app || (app = {}));
