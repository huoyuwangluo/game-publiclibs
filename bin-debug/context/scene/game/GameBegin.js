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
    var GameBegin = (function (_super) {
        __extends(GameBegin, _super);
        function GameBegin() {
            var _this = _super.call(this, TypeGame.BEGIN) || this;
            _this.TASK_NPC = 1;
            _this.TASK_COLLECT = 2;
            _this.TASK_MONSTER = 3;
            _this.TASK_BOSS = 4;
            return _this;
        }
        GameBegin.prototype.enter = function () {
            _super.prototype.enter.call(this);
            //this.switchScene(GameModels.task.curTask.template.map);
            this.switchScene(29990);
        };
        GameBegin.prototype.exit = function () {
            this.stop();
            _super.prototype.exit.call(this);
            this.removeWuShen();
            this.removeRobots();
            utils.timer.clearAll(this);
            this._player.remove();
            this._scene.clear(true);
        };
        GameBegin.prototype.switchScene = function (mapId) {
            this._curentMapId = mapId;
            this.removeWuShen();
            this.removeRobots();
            this._scene.clear(true);
            this.enterMap(mapId);
            mg.uiManager.show(dialog.WelcomeDialog);
            //GameModels.chapter.resetState(this, function () {
            //	this.enterMap(mapId);
            //	mg.uiManager.show(dialog.WelcomeDialog);
            // this.start();
            //});
        };
        GameBegin.prototype.start = function () {
            GameModels.user.player.resetState();
            GameModels.user.player.resetMergeState();
            this._player.initialize(GameModels.user.player);
            this._scene.addPlayer(this._player);
            this._player.setBorn(this._scene.data.born);
            this._scene.lookAt(this._player);
            this._player.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
            this._player.focusMode = false;
            this._player.damgeEnabled = true;
            this._player.vo.xpState = TypeXpUp.AUTO_UP;
            this._player.autoAttack = false;
            this._player.setTeamLeader(this._player);
            //this._player.petFllow=true;
            this._scene.start();
            this._player.hpAutoEnabled = true;
            this._player.start();
            this.updateWuShen();
            this.addNpcs();
            this.addMonsters();
            if (!GameModels.task.isFirstEnterGame) {
                this.doTask();
            }
            else {
                mg.uiManager.show(dialog.WelcomeDialog);
            }
            GameModels.task.onChange(this, this.doTask);
            this.updateRobots();
            _super.prototype.startHandler.call(this);
        };
        GameBegin.prototype.stop = function () {
            this._player.offStateChange();
            GameModels.task.offChange(this, this.doTask);
            this._scene.offDropClear();
            this._player.stop();
            this._scene.stop();
        };
        GameBegin.prototype.startTask = function () {
            this.doTask();
        };
        GameBegin.prototype.addNpcs = function () {
            for (var _i = 0, _a = this._scene.data.npcs; _i < _a.length; _i++) {
                var npcData = _a[_i];
                var npcTemplate = Templates.getTemplateById(templates.Map.TASKNPC, npcData.id);
                var npcVO = vo.fromPool(vo.GameNpcVO, npcTemplate);
                var npc = utils.ObjectPool.from(s.GameNpc);
                npc.initialize(npcVO);
                this._scene.addNpc(npc);
                npc.setTile(npcData.node);
            }
        };
        GameBegin.prototype.addMonsters = function () {
            for (var i = 0; i < this._scene.data.monsters.length; i++) {
                var monsterMapData = this._scene.data.monsters[i];
                var template = Templates.getTemplateById(templates.Map.TASKNPC, monsterMapData.id);
                var monsterVO = vo.fromPool(vo.GameMonsterVO, template, template.type == this.TASK_BOSS ? TypeActor.BOSS : TypeActor.MONSTER);
                if (monsterVO.type == TypeActor.MONSTER) {
                    this._scene.manager.refreshMonsterWander(monsterMapData.node, monsterVO, true, false);
                }
                else if (monsterVO.type == TypeActor.BOSS) {
                    this._scene.manager.refreshBoss(monsterMapData.node, monsterVO, true, false);
                }
            }
            this._scene.manager.onMonsterRemove(this, this.monsterRemoveHandler);
        };
        GameBegin.prototype.updateRobots = function () {
            // if (GameModels.task.curTask.template.map == 1001) {
            // 	this.addRobots();
            // } else {
            // 	this.removeRobots();
            // }
        };
        GameBegin.prototype.addRobots = function () {
            if (GameModels.task.curTask.template.map == 1001) {
                if (!this._robots)
                    this._robots = [];
                var total = 2;
                var curTask = GameModels.task.curTask.template;
                var tasks = [100050, 100060, 100070, 100080, 100090, 100100, 100110];
                var robotTasks = [];
                var index = 0;
                for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                    var taskId = tasks_1[_i];
                    if (curTask.id == taskId)
                        break;
                    index++;
                }
                var startIndex = index - (total / 2) >> 0;
                if (startIndex < 0)
                    startIndex = 0;
                var robotConfigIds = [101, 102, 103];
                while (total--) {
                    var robot = utils.ObjectPool.from(s.GameNewBieRobot);
                    robot.aiClass = s.AIPlayer;
                    var template = Templates.getTemplateById(templates.Map.TASKROBOT, robotConfigIds[total % 3]);
                    robot.initialize(vo.fromPool(vo.GamePlayerVO, template));
                    this._scene.addPlayer(robot);
                    robot.autoAttack = false;
                    robot.start();
                    var endIndex = startIndex == tasks.length ? 0 : (startIndex);
                    robot.startTask(Templates.getTemplateById(templates.Map.TASKNEWBIE, tasks[startIndex]), Templates.getTemplateById(templates.Map.TASKNEWBIE, tasks[endIndex]));
                    this._robots.push(robot);
                    startIndex++;
                    if (startIndex >= tasks.length) {
                        startIndex = 0;
                    }
                }
            }
        };
        GameBegin.prototype.removeRobots = function () {
            if (this._robots) {
                for (var _i = 0, _a = this._robots; _i < _a.length; _i++) {
                    var robot = _a[_i];
                    this._scene.removePlayer(robot);
                    robot.stop();
                    utils.ObjectPool.to(robot, true);
                }
                this._robots.length = 0;
            }
        };
        GameBegin.prototype.updateWuShen = function () {
            // var taskTemplate: templates.taskNewbie = GameModels.task.curTask.template;
            // if (taskTemplate.id >= 100030 && taskTemplate.id <= 100050) {
            // 	this.addWuShen();
            // } else {
            // 	this.removeWuShen();
            // }
        };
        GameBegin.prototype.addWuShen = function () {
            if (!this._guidePet) {
                this._guidePet = [];
                var temp = [];
                var taskRobotList = Templates.getList(templates.Map.TASKROBOT);
                for (var i = 0; i < taskRobotList.length; i++) {
                    if (taskRobotList[i].type == 2) {
                        temp.push(taskRobotList[i]);
                    }
                }
                for (var i = 0; i < temp.length; i++) {
                    var guidePet = utils.ObjectPool.from(s.GamePet);
                    guidePet.aiClass = s.AITeamPet;
                    guidePet.initialize(vo.fromPool(vo.GamePetVO, temp[i]));
                    guidePet.resId = temp[i].modelId;
                    this._scene.addPet(guidePet);
                    guidePet.setTile(battle.manager.getAroundRandomNode(this._scene, this._player.tileNode));
                    guidePet.vo.initFormatData({ uid: "uid_" + i, pos: i + 1 });
                    //var petVO:vo.GamePetVO=vo.fromPool(vo.GamePetVO, temp[i]) as vo.GamePetVO;
                    //(this._player.vo as vo.GamePlayerVO).petList.addToFormat(petVO,{uid:uid+"_0",pos:0});
                    //this._sightPlayers.push(playerVO);
                    guidePet.setMaster(this._player);
                    guidePet.setTeamLeader(this._player);
                    guidePet.actionTo(TypeAction.IDLE, TypeDirection.LEFT);
                    guidePet.autoAttack = true;
                    guidePet.start();
                    this._guidePet.push(guidePet);
                }
            }
        };
        GameBegin.prototype.removeWuShen = function () {
            if (this._guidePet) {
                for (var i = 0; i < this._guidePet.length; i++) {
                    this._guidePet[i].stop();
                    this._scene.removePet(this._guidePet[i]);
                    utils.ObjectPool.to(this._guidePet[i], true);
                    this._guidePet[i] = null;
                }
                this._guidePet.length = 0;
            }
        };
        GameBegin.prototype.refreshWuShenTarget = function () {
            if (this._guidePet) {
                for (var i = 0; i < this._guidePet.length; i++) {
                    this._guidePet[i].target = this._player.target;
                }
            }
        };
        GameBegin.prototype.killMonster = function (configId, needTimes, caller, complete) {
            var totalTimes = needTimes;
            var times = needTimes;
            function selectMonster(configId) {
                var total = this._scene.getMonsterCountByConfigId(configId);
                var excepts = [];
                var monster;
                while (total--) {
                    monster = configId == 204001 ? this._scene.getMinMonsterByConfigId(this._player, configId, excepts, false) : this._scene.getMinMonsterByConfigId(this._player, configId, excepts);
                    if (monster.target) {
                        excepts.push(monster);
                        continue;
                    }
                    break;
                }
                if (monster != null) {
                    this._player.target = monster;
                    monster.target = this._player;
                }
                this.refreshWuShenTarget();
            }
            function onMonsterDead(smartVO, type, node, killer) {
                if (smartVO.configId != configId)
                    return;
                times--;
                GameModels.task.curTask.updateCurrent(totalTimes - times);
                if (times <= 0) {
                    this._scene.manager.offMonsterDead();
                    this._player.target = null;
                    this.refreshWuShenTarget();
                    complete.call(caller);
                    return;
                }
                if (!this._player.target || this._player.target.stateDead) {
                    selectMonster.call(this, configId);
                }
            }
            selectMonster.call(this, configId);
            this._scene.manager.onMonsterDead(this, onMonsterDead);
        };
        /*private playBossComeinAnimation(caller: any, complete: Function) {
            var movie: s.DragonBoneMovieClip = new s.DragonBoneMovieClip('jian');
            movie.resId = "jian";
            this._scene.effectFrontLayer.addChild(movie);
            var npcData: MapNpcData = this._scene.data.getNpcDataById(106001);
            movie.x = game.MapConfig.getReaX(npcData.node.x);
            movie.y = game.MapConfig.getReaY(npcData.node.y) - 200;
            movie.play('jian01');
            movie.onCompleteOnce(this, function () {
                movie.stop();
                mg.layerManager.world.addChild(movie);
                movie.x = mg.stageManager.stageWidth / 2;
                movie.y = mg.stageManager.stageHeight / 2;
                movie.play('jian02');
                movie.onCompleteOnce(this, function () {
                    movie.stop();
                    var monsterData: MapNpcData = this._scene.data.getMonsterDataById(101001);
                    this._scene.effectFrontLayer.addChild(movie);
                    movie.x = game.MapConfig.getReaX(monsterData.node.x);
                    movie.y = game.MapConfig.getReaY(monsterData.node.y);
                    movie.play('jian03');
                    movie.onCompleteOnce(this, function () {
                        movie.stop();
                        if (movie.parent) {
                            movie.parent.removeChild(movie);
                            movie.destory();
                        }
                        complete.call(caller);
                    })
                })
            })
        }*/
        GameBegin.prototype.doTask = function () {
            var _this = this;
            var taskTemplate = GameModels.task.curTask.template;
            if (this._curentMapId != taskTemplate.map) {
                if (!taskTemplate.map) {
                    var effect = utils.ObjectPool.from(s.AnimationSprite);
                    effect.resId = ('6159');
                    this._scene.addEffectFront(effect);
                    effect.frameRate = 12;
                    effect.x = this._player.x;
                    effect.y = this._player.y;
                    effect.playOnce();
                    effect.onCompleteOnce(this, function () {
                        if (effect) {
                            effect.stop();
                            if (effect.parent) {
                                effect.parent.removeChild(effect);
                            }
                            utils.ObjectPool.to(effect, true);
                        }
                        app.gameContext.enterChapter();
                    });
                    return;
                }
                this.switchScene(taskTemplate.map);
                return;
            }
            this.updateWuShen();
            if (taskTemplate.id == 100030) {
                utils.TweenUtil.shock(mg.layerManager.map, 1000, 20);
                // this.playBossComeinAnimation(this,function(){
                // })
            }
            var type = taskTemplate.type;
            switch (type) {
                case TypeTask.MONSTER:
                    if (GameModels.task.curTask.canSubmit) {
                        GameModels.task.requestSubmit();
                        return;
                    }
                    if (this._guidePet) {
                        for (var i = 0; i < this._guidePet.length; i++) {
                            this._guidePet[i].autoAttack = true;
                        }
                    }
                    this._player.petGroup.autoAttack = true;
                    this.killMonster(parseInt(taskTemplate.target), taskTemplate.needTimes, this, function () {
                        if (_this._guidePet) {
                            for (var i = 0; i < _this._guidePet.length; i++) {
                                _this._guidePet[i].autoAttack = false;
                            }
                        }
                        GameModels.task.requestSubmit();
                    });
                    break;
                case TypeTask.DIALOG:
                    if (GameModels.task.curTask.id == 100130) {
                        logger.log("1111111");
                    }
                    var npcData = this._scene.data.getNpcDataById(parseInt(taskTemplate.target));
                    this._npcData = npcData;
                    var node = battle.manager.getAroundEmptyNode(this._scene, npcData.node, this._player.tileNode);
                    if (Math.abs(this._player.tileX - node.x) < 2 && Math.abs(this._player.tileY - node.y) < 2) {
                        // if (taskTemplate.storyteamId) {
                        // 	mg.StoryManager.instance.startStory(taskTemplate.storyteamId, this, function () {
                        // 		GameModels.task.requestSubmit();
                        // 	});
                        // }
                        // else {
                        // 	this.showTaskDialog();
                        // }
                        this.showTaskDialog();
                        return;
                    }
                    this._player.movePathTo(node.x, node.y);
                    this._player.targetTile = node;
                    this._player.onStateChange(this, function (state) {
                        if (state == TypeState.IDEL) {
                            this._player.offStateChange();
                            // if (taskTemplate.storyteamId) {
                            // 	mg.StoryManager.instance.startStory(taskTemplate.storyteamId, this, function () {
                            // 		GameModels.task.requestSubmit();
                            // 	});
                            // }
                            // else {
                            // 	this.showTaskDialog();
                            // }
                            this.showTaskDialog();
                        }
                    });
                    break;
                // case TypeTask.PET_UP:
                // 	if (GameModels.task.curTask.canSubmit) {
                // 		GameModels.task.requestSubmit();
                // 		return;
                // 	}
                // 	break;
                case TypeTask.COLLECT:
                    if (GameModels.task.curTask.canSubmit) {
                        GameModels.task.requestSubmit();
                        return;
                    }
                    var collectData = this._scene.data.getNpcDataById(parseInt(taskTemplate.target));
                    this._player.targetTile = battle.manager.getAroundEmptyNode(this._scene, collectData.node, this._player.tileNode);
                    this._player.onStateChange(this, function (state) {
                        if (state == TypeState.IDEL) {
                            this.showTaskCollistion(collectData);
                        }
                    });
                    break;
            }
        };
        /**显示任务对话框 */
        GameBegin.prototype.showTaskDialog = function () {
            this._player.offStateChange();
            mg.uiManager.show(dialog.task.TaskDialog, this._npcData.id);
            mg.uiManager.once(egret.Event.REMOVED, function (e) {
                if (e.data == dialog.task.TaskDialog) {
                    GameModels.task.requestSubmit();
                }
            }, this);
        };
        GameBegin.prototype.showTaskCollistion = function (collectData) {
            this._player.offStateChange();
            this._taskCollectView = new dialog.task.TaskCollectView();
            this._taskCollectView.x = mg.stageManager.stage.stageWidth / 2 - this._taskCollectView.width / 2;
            this._taskCollectView.y = mg.stageManager.stage.stageHeight / 2 + 200;
            mg.stageManager.stage.addChild(this._taskCollectView);
            this._taskCollectView.showView(this, this.showTaskCollistionFinsh, collectData);
        };
        GameBegin.prototype.showTaskCollistionFinsh = function (collectData) {
            if (this._taskCollectView) {
                this._taskCollectView.removeThis();
                this._taskCollectView = null;
            }
            GameModels.task.requestSubmit(this, function () {
                this._scene.removeNpcByData(collectData);
            });
        };
        GameBegin.prototype.monsterRemoveHandler = function (monster) {
            if (!monster.vo)
                return;
            if (monster.type == TypeActor.BOSS)
                return;
            var configId = monster.vo.configId;
            var node = monster.bornTile;
            var template = Templates.getTemplateById(templates.Map.TASKNPC, configId);
            if (template.type == this.TASK_MONSTER) {
                var monsterVO = vo.fromPool(vo.GameMonsterVO, template, TypeActor.MONSTER);
                this._scene.manager.refreshMonsterWander(node, monsterVO, true).autoAttack = false;
            }
        };
        GameBegin.prototype.checkEnd = function () {
            if (this._scene.deadAllMonster) {
                this.stop();
                if (this._endHandlers) {
                    this._endHandlers.runWith(true);
                }
            }
        };
        return GameBegin;
    }(s.GameBase));
    s.GameBegin = GameBegin;
    __reflect(GameBegin.prototype, "s.GameBegin");
})(s || (s = {}));
