var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var GameManager = (function () {
        function GameManager() {
            this._views = {};
            this._games = {};
        }
        Object.defineProperty(GameManager, "instance", {
            get: function () {
                if (!GameManager._instance) {
                    GameManager._instance = new GameManager();
                }
                return GameManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameManager.prototype.initialize = function () {
        };
        GameManager.prototype.enterView = function (viewClass) {
            var name = egret.getQualifiedClassName(viewClass);
            if (!this._views[name]) {
                var view = new viewClass();
                view.initialize();
                if (view instanceof s.ViewScene) {
                    mg.controlManager.initialize(mg.stageManager.stage, view.scene);
                    battle.manager.initialize(view.scene);
                    s.CopyTimerCountDown.instance.initialize(view.scene);
                }
                this._views[name] = view;
            }
            if (this._curView) {
                this._curView.parent.removeChild(this._curView);
                this._curView.stop();
            }
            this._curView = this._views[name];
            if (this._curView) {
                mg.layerManager.map.addChild(this._curView);
                this._curView.start();
            }
        };
        Object.defineProperty(GameManager.prototype, "view", {
            get: function () { return this._curView; },
            enumerable: true,
            configurable: true
        });
        GameManager.prototype.getGameBegin = function () {
            return this.getGame(s.GameBegin);
        };
        // /**关卡玩法*/
        // public getGameChapter(): GameChapter {
        // 	return this.getGame(GameChapter) as GameChapter;
        // }
        GameManager.prototype.getGameChapterBoss = function () {
            return this.getGame(s.GameChapterBoss);
        };
        GameManager.prototype.getGameChapterCity = function () {
            return this.getGame(s.GameChapterCity);
        };
        /**远征副本玩法*/
        GameManager.prototype.getGameExpedition = function () {
            return this.getGame(s.GameExpedition);
        };
        /**远征副本协助玩法*/
        GameManager.prototype.getGameExpeditionSupport = function () {
            return this.getGame(s.GameExpeditionSupport);
        };
        /**材料副本玩法*/
        GameManager.prototype.getGameMaterial = function () {
            return this.getGame(s.GameMaterial);
        };
        /**挑战全民BOSS玩法*/
        GameManager.prototype.getGameBossEveryOneGuide = function () {
            return this.getGame(s.GameEveryBossGuide);
        };
        /**挑战全民BOSS玩法*/
        GameManager.prototype.getGameBossEveryOne = function () {
            return this.getGame(s.GameEveryBoss);
        };
        /**挑战阵营战玩法*/
        GameManager.prototype.getGameLegionFight = function () {
            return this.getGame(s.GameLegionWar);
        };
        /**挑战王者疆场玩法*/
        GameManager.prototype.getGameKingBattlefieldFight = function () {
            return this.getGame(s.GameKingBattleGround);
        };
        /**挑战主城BOSS玩法*/
        GameManager.prototype.getGameCityBoss = function () {
            return this.getGame(s.GameDemonIntrusion);
        };
        /**HolidayBOSS玩法*/
        GameManager.prototype.getGameHolidayBoss = function () {
            return this.getGame(s.GameHolidayBoss);
        };
        /**挑战BOSS之家玩法*/
        GameManager.prototype.getGameFamilyBoss = function () {
            return this.getGame(s.GameFamilyBoss);
        };
        /**挑战失落魔域BOSS玩法*/
        GameManager.prototype.getGameLoseBoss = function () {
            return this.getGame(s.GameLoseBoss);
        };
        /**挑战神域BOSS玩法*/
        GameManager.prototype.getGameDomainBoss = function () {
            return this.getGame(s.GameGodDomain);
        };
        /**挑战幻界禁地玩法*/
        GameManager.prototype.getGameFantasyBoss = function () {
            return this.getGame(s.GameFantasyBoss);
        };
        /**挑战个人BOSS玩法*/
        GameManager.prototype.getGameBossPersonal = function () {
            return this.getGame(s.GamePersonalBoss);
        };
        /**锁妖塔玩法*/
        GameManager.prototype.getGameLockPagoda = function () {
            return this.getGame(s.GamePagodaLock);
        };
        /**武将塔玩法*/
        GameManager.prototype.getGamePetPagoda = function () {
            return this.getGame(s.GamePagodaPet);
        };
        /**武魂塔玩法*/
        GameManager.prototype.getGameWuHunPagoda = function () {
            return this.getGame(s.GamePagodaWuHun);
        };
        /**PVP玩法*/
        GameManager.prototype.getGameLadderPvp = function () {
            return this.getGame(s.GameLadderFight);
        };
        /**演武玩法*/
        GameManager.prototype.getGameLadderPvp1 = function () {
            return this.getGame(s.GameLadderFight1);
        };
        /**巅峰之战玩法*/
        GameManager.prototype.getGamePeaksFinght = function () {
            return this.getGame(s.GamePeaksFight);
        };
        /**跨服武将PVP玩法*/
        GameManager.prototype.getGameCrossPetFight = function () {
            return this.getGame(s.GameCrossPetFight);
        };
        /**主城*/
        GameManager.prototype.getGameSgCity = function () {
            return this.getGame(s.GameSgCity);
        };
        /**跨服主城*/
        GameManager.prototype.getGameCrossCity = function () {
            return this.getGame(s.GameCrossCity);
        };
        /**武官战斗*/
        GameManager.prototype.getGameWuGuanfight = function () {
            return this.getGame(s.GameWuGuan);
        };
        /**王者争霸(国战)*/
        GameManager.prototype.getGameKingWar = function () {
            return this.getGame(s.GameKingWar);
        };
        // /**武斗*/
        // public getGameWuDouBoss(): GameWuDouBoss {
        // 	return this.getGame(GameWuDouBoss) as GameWuDouBoss;
        // }
        /**（经脉副本）原幻界迷城*/
        GameManager.prototype.getGameCopyMaterialHuanJie = function () {
            return this.getGame(s.GameCopyMaterialHuanJie);
        };
        /**埋骨禁地*/
        GameManager.prototype.getGameCopyMaterialMaiGu = function () {
            return this.getGame(s.GameCopyMaterialMaiGu);
        };
        /**好友切磋*/
        GameManager.prototype.getGameFriendDiscussFight = function () {
            return this.getGame(s.GameFriendDiscussFight);
        };
        /**神陨*/
        GameManager.prototype.getGameGodDie = function () {
            return this.getGame(s.GameGodDie);
        };
        /**组队副本*/
        GameManager.prototype.getGameTeamCopyFight = function () {
            return this.getGame(s.GameTeamCopyFight);
        };
        /**九曲之都BOSS玩法*/
        GameManager.prototype.getGameWoorsBoss = function () {
            return this.getGame(s.GameWoorsBoss);
        };
        /**盘古仙境（原灭世荒漠）BOSS玩法*/
        GameManager.prototype.getGameDeathBoss = function () {
            return this.getGame(s.GameDeathBoss);
        };
        // /**红颜BOSS玩法*/
        // public getGameHongYanBoss(): GameHongYanBoss {
        // 	return this.getGame(GameHongYanBoss) as GameHongYanBoss;
        // }
        /**国战车轮战*/
        GameManager.prototype.getGameCampBattleWar = function () {
            return this.getGame(s.GameCampBattleWar);
        };
        /**巅峰赛-观战*/
        GameManager.prototype.getGameTopBattleRoom = function () {
            return this.getGame(s.GameTopBattleRoom);
        };
        /**势力塔魏*/
        GameManager.prototype.getGameShiLiTa1 = function () {
            return this.getGame(s.GameShiLiTa1);
        };
        /**势力塔蜀*/
        GameManager.prototype.getGameShiLiTa2 = function () {
            return this.getGame(s.GameShiLiTa2);
        };
        /**势力塔吴*/
        GameManager.prototype.getGameShiLiTa3 = function () {
            return this.getGame(s.GameShiLiTa3);
        };
        Object.defineProperty(GameManager.prototype, "gameCurrent", {
            /**当前玩法*/
            get: function () {
                return this._gameCurrent;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 进入指定玩法
         */
        GameManager.prototype.enter = function (gameClazz) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            //当前玩法初始化未完成不允许切换玩法
            if (this._gameCurrent && !this._gameCurrent.isEnterOver) {
                return;
            }
            mg.uiManager.getView(main.MainUIView).visible = false;
            var lastGame = this._gameCurrent;
            var lastGameClazz = this._gameClazz;
            if (this._gameCurrent) {
                this._gameCurrent.exit();
                if (this._curView) {
                    if (this._curView instanceof s.ViewScene) {
                        this._curView.scene.data.reset();
                    }
                }
                this._lastGameType = this._gameCurrent.type;
                this._gameCurrent = null;
            }
            this._gameClazz = gameClazz;
            if (!this._gameClazz)
                return;
            var currentGame = gameClazz ? this.getGame(gameClazz) : null;
            ///////
            if (currentGame) {
                // if (currentGame.type != TypeGame.CHAPTER_BOSS && this._lastGameType != TypeGame.CHAPTER_BOSS && GameModels.user.player.name != Language.P_MYZZ) {
                // 	if (!app.gameContext.isFirstStartGame) mg.uiManager.removeAllDialogs();
                // }	
                if (this._lastGameType == TypeGame.ATKCITY || this._lastGameType == TypeGame.CITY) {
                    if (!app.gameContext.isFirstStartGame)
                        mg.uiManager.removeAllDialogs();
                }
                if (!TypeGame.isMainGame(currentGame.type)) {
                    if (lastGame && TypeGame.isMainGame(lastGame.type)) {
                        currentGame.setExitGame(lastGameClazz);
                    }
                }
            }
            /////
            if (!lastGame || currentGame.viewClass != lastGame.viewClass) {
                //if (!app.gameContext.isFirstStartGame) mg.uiManager.removeAllDialogs();
                this.enterView(currentGame.viewClass);
            }
            this._gameCurrent = currentGame;
            TypeGame.CURRENT_GAME_TYPE = currentGame.type;
            this._gameCurrent.initialize(this._curView);
            this._gameCurrent.onEnterOverOnce(this, function () {
                mg.uiManager.getView(main.MainUIView).visible = true;
                if (this._gameChangeHandlers)
                    this._gameChangeHandlers.run();
            });
            (_a = this._gameCurrent).enter.apply(_a, args);
            var _a;
        };
        GameManager.prototype.exit = function () {
        };
        GameManager.prototype.getGame = function (gameClazz) {
            var name = egret.getQualifiedClassName(gameClazz);
            if (!this._games[name]) {
                var game = new gameClazz();
                this._games[name] = game;
            }
            return this._games[name];
        };
        GameManager.prototype.onGameChange = function (caller, method, priority) {
            if (priority === void 0) { priority = false; }
            if (!this._gameChangeHandlers)
                this._gameChangeHandlers = new utils.Handlers(false);
            if (priority) {
                this._gameChangeHandlers.addPriority(caller, method, null, false);
            }
            else {
                this._gameChangeHandlers.add(caller, method, null, false);
            }
        };
        GameManager.prototype.offGameChange = function (caller, method) {
            if (this._gameChangeHandlers)
                this._gameChangeHandlers.remove(caller, method);
        };
        Object.defineProperty(GameManager.prototype, "lastGameType", {
            get: function () {
                return this._lastGameType;
            },
            enumerable: true,
            configurable: true
        });
        return GameManager;
    }());
    s.GameManager = GameManager;
    __reflect(GameManager.prototype, "s.GameManager");
})(s || (s = {}));
