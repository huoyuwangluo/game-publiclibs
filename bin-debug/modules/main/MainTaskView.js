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
var main;
(function (main) {
    var MainTaskView = (function (_super) {
        __extends(MainTaskView, _super);
        function MainTaskView() {
            return _super.call(this) || this;
        }
        Object.defineProperty(MainTaskView.prototype, "isInit", {
            get: function () {
                return this._isInit;
            },
            enumerable: true,
            configurable: true
        });
        MainTaskView.prototype.init = function () {
            this._isInit = true;
            this._parent = this.parent;
            this._taskDoneTip = new eui.Label();
            this._taskDoneTip.size = 20;
            this._taskDoneTip.filters = [new egret.GlowFilter(0xa53513, 0.6, 6, 6)];
            this.taskBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.taskTouchHandler, this);
            //this.taskReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.taskTouchHandler, this);
            GameModels.task.onChange(this, this.taskChangeHandler);
            GameModels.task.curTask.addEventListener(egret.Event.CHANGE, this.updateTask, this);
            app.gameContext.manager.onGameChange(this, this.gameChangeHandler);
            //GameModels.user.player.onXpActiveChange(this, this.updataGuideXp);
            utils.timer.once(1000, this, this.taskChangeHandler);
        };
        MainTaskView.prototype.clear = function () {
            this._isInit = false;
            mg.guideManager.stopGuide();
            GameModels.task.offChange(this, this.taskChangeHandler);
            //GameModels.user.player.offXpActiveChange(this, this.updataGuideXp);
            GameModels.task.offEnd();
            if (GameModels.task.hasTask)
                GameModels.task.curTask.removeEventListener(egret.Event.CHANGE, this.updateTask, this);
            if (this.taskBack) {
                this.taskBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.taskTouchHandler, this);
                if (this.taskBack.parent) {
                    this.taskBack.parent.removeChild(this.taskBack);
                }
                this.taskBack = null;
            }
            if (this.taskReward) {
                //this.taskReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.taskTouchHandler, this);
                if (this.taskReward.parent) {
                    this.taskReward.parent.removeChild(this.taskReward);
                }
                this.taskReward = null;
            }
            if (this._taskDoneTip) {
                if (this._taskDoneTip.parent) {
                    this._taskDoneTip.parent.removeChild(this._taskDoneTip);
                }
                this._taskDoneTip = null;
            }
            if (this._taskEffect) {
                if (this._taskEffect.parent) {
                    this._taskEffect.parent.removeChild(this._taskEffect);
                }
                this._taskEffect.stop();
                this._taskEffect.reset();
                utils.ObjectPool.to(this._taskEffect);
                this._taskEffect = null;
            }
        };
        MainTaskView.prototype.add = function () {
            if (!this.parent) {
                this._parent.addChild(this);
            }
        };
        MainTaskView.prototype.remove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        MainTaskView.prototype.taskTouchHandler = function (e) {
            if (!GameModels.task.hasTask) {
                GameModels.task.offEnd();
                this.remove();
                this.clear();
                return;
            }
            if (app.gameContext.typeGame == TypeGame.BEGIN) {
                if (!GameModels.task.curTask.canSubmit) {
                    if (GameModels.task.curTask.template.unfinished)
                        mg.alertManager.tip(GameModels.task.curTask.template.unfinished, 0xffffff);
                }
                else {
                    mg.alertManager.tip(Language.J_ZZQWMBQSH, 0xffffff);
                }
                return;
            }
            if (app.gameContext.typeGame == TypeGame.ATKCITY || app.gameContext.typeGame == TypeGame.CITY) {
                if (!GameModels.task.curTask.canSubmit) {
                    // if (GameModels.task.curTask.type == TypeTask.NPC_CITY) {
                    // 	//主城npc对话
                    // 	if (parseInt(GameModels.task.curTask.template.target) == 102012) {
                    // 		if (app.gameContext.typeGame != TypeGame.CITY) app.gameContext.enterCity();
                    // 		return;
                    // 	}
                    // 	mg.StoryManager.instance.startBigStory(GameModels.task.curTask.template.storyteamId, this, function () {
                    // 		if (parseInt(GameModels.task.curTask.template.target) == 201005) {
                    // 			if (app.gameContext.typeGame == TypeGame.CITY) {
                    // 				app.gameContext.exitToMainGame();
                    // 			}
                    // 			GameModels.task.requestSubmit();
                    // 		}
                    // 		else if (parseInt(GameModels.task.curTask.template.target) == 102011) {
                    // 			app.gameContext.enterChapterBoss("");
                    // 			GameModels.task.requestSubmit();
                    // 		}
                    // 	});
                    // 	return;
                    // }
                    // if (GameModels.task.curTask.type == TypeTask.CHAT) {
                    // 	var mainView: main.MainUIView = mg.uiManager.getView(s.UserfaceName.main) as main.MainUIView;
                    // 	if (mainView && mainView.chat.parent) {
                    // 		mainView.chat.openHandler();
                    // 	}
                    // 	else {
                    // 		mainView.chat.add();
                    // 		mainView.chat.openHandler();
                    // 	}
                    // 	return;
                    // }
                    if (GameModels.task.curTask.type == TypeTask.FOOD) {
                        if (app.gameContext.typeGame == TypeGame.CITY) {
                            app.gameContext.exitToMainGame();
                        }
                        else {
                            mg.alertManager.tip(Language.J_QXWCZXRW);
                        }
                        return;
                    }
                    if (GameModels.task.curTask.type == TypeTask.SMOMEPET1 || GameModels.task.curTask.type == TypeTask.SMOMEPET2 || GameModels.task.curTask.type == TypeTask.SMOMEPET3 || GameModels.task.curTask.type == TypeTask.SMOMEPET4) {
                        if (app.gameContext.typeGame == TypeGame.ATKCITY) {
                            mg.alertManager.tip(Language.J_QXWCZXRW);
                            return;
                        }
                    }
                    if (GameModels.task.curTask.hasFunc && GameModels.task.curTask.type != TypeTask.PASS) {
                        mg.uiManager.showByName(GameModels.task.curTask.funcId, GameModels.task.curTask.funcParams, [GameModels.task.curTask.type, 1]);
                        return;
                    }
                    switch (GameModels.task.curTask.type) {
                        case TypeTask.PASS:
                            if (GameModels.scene.getjoinSceneListByType(TypeGame.CHAPTER_BOSS)) {
                                app.gameContext.enterChapterBoss("");
                                break;
                            }
                            if (GameModels.scene.getjoinSceneListByType(TypeGame.DOOR_BOSS)) {
                                app.gameContext.enterChapterCity("");
                                break;
                            }
                            if (app.gameContext.typeGame == TypeGame.CITY) {
                                app.gameContext.exitToMainGame();
                            }
                            else {
                                mg.alertManager.tip(Language.J_QXWCZXRW);
                            }
                            break;
                        default:
                            if (GameModels.task.curTask.template.unfinished) {
                                mg.alertManager.tip(GameModels.task.curTask.template.unfinished, 0xffffff);
                            }
                            break;
                    }
                    if (GameModels.task.curTask.template.isAutoGuide) {
                        this.startGuide(5000);
                    }
                    return;
                }
                //TypeTask.ADD_SOUL
                if (!utils.CheckUtil.checkBagSmelting()) {
                    GameModels.task.requestSubmit(this, function () {
                        mg.soundManager.playSound("OpenUI_wcrw", 1, false, true);
                        mg.effectManager.playEffectOnce("6042", mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2 + 100);
                        this.updateTask();
                    });
                }
            }
        };
        /**任务变化 */
        MainTaskView.prototype.taskChangeHandler = function () {
            this.updateTask();
            if (GameModels.guide.guideTypeClinte == 0 && GameModels.guide.guideType == 0)
                mg.guideManager.stopGuide();
            if (GameModels.task.hasTask) {
                if (GameModels.task.curTask.template.isAutoGuide == 1) {
                    this.startGuide();
                }
                else {
                    if (GameModels.task.curTask.canSubmit) {
                        this.startGuide();
                    }
                    else {
                        if (GameModels.task.curTask.type == TypeTask.WENGUAN_TASK && GameModels.wenguanTask.curWenGuanId < 201) {
                            if (GameModels.wenguanTask.checkWenGuanUp()) {
                                this.startGuide(0, true);
                            }
                            else {
                                if (GameModels.wenguanTask.checkWenGuan()) {
                                    this.startGuide(0, true);
                                }
                            }
                        }
                    }
                }
            }
            if (GameModels.task.lastTaskDoneTip)
                this.showTaskDoneTip(GameModels.task.lastTaskDoneTip);
            //if (GameModels.task.curTask.id == 100030) mg.alertManager.showAlert(dialog.task.TaskFirstRecharge, true, true);
        };
        /**玩法变化 */
        MainTaskView.prototype.gameChangeHandler = function () {
            //this.updataGuideXp();
            if (!app.gameContext.typeGameLast)
                return;
            // if (app.gameContext.typeGameLast != TypeGame.CHAPTER && app.gameContext.typeGame == TypeGame.CHAPTER) {
            // 	if (GameModels.task.hasTask && GameModels.task.curTask.template.isAutoGuide) {
            // 		this.startGuide();
            // 	}
            // }
            //utils.timer.clearAll(this);
            if (app.gameContext.typeGameLast != app.gameContext.typeGame) {
                if (GameModels.task.hasTask) {
                    if (GameModels.task.curTask.template.isAutoGuide == 1) {
                        if (GameModels.guide.guideTypeClinte == 0 && GameModels.guide.guideType == 0)
                            mg.guideManager.stopGuide();
                        this.startGuide();
                    }
                    else {
                        if (GameModels.task.curTask.canSubmit) {
                            if (GameModels.guide.guideTypeClinte == 0 && GameModels.guide.guideType == 0)
                                mg.guideManager.stopGuide();
                            this.startGuide();
                        }
                        else {
                            if (GameModels.task.curTask.type == TypeTask.WENGUAN_TASK && GameModels.wenguanTask.curWenGuanId < 201) {
                                if (GameModels.wenguanTask.checkWenGuanUp()) {
                                    if (GameModels.guide.guideTypeClinte == 0 && GameModels.guide.guideType == 0)
                                        mg.guideManager.stopGuide();
                                    this.startGuide(0, true);
                                }
                                else {
                                    if (GameModels.wenguanTask.checkWenGuan()) {
                                        if (GameModels.guide.guideTypeClinte == 0 && GameModels.guide.guideType == 0)
                                            mg.guideManager.stopGuide();
                                        this.startGuide(0, true);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        MainTaskView.prototype.autoFaSongFuZhu = function () {
            var petVO = GameModels.user.player.petList.getFormatVOByPos(1);
            if (petVO && !petVO.isMerged)
                GameModels.scene.syncMerge(petVO.uid, true);
        };
        // private updataGuideXp(): void {
        // 	var isTypeGameCan: boolean = app.gameContext.typeGame == TypeGame.CHAPTER_BOSS || app.gameContext.typeGame == TypeGame.DOOR_BOSS;
        // 	var isLevelCan: boolean = (GameModels.user.player.level >= 3 && GameModels.user.player.level <= 10) || (GameModels.user.player.level > 30 && GameModels.user.player.level <= 50);
        // 	var wushuangCan: boolean = GameModels.user.player.wuShuangId != 0 && GameModels.user.player.isXpFulled;
        // 	// var isAutoXp: boolean = game.state.getState(TypeSetting.AUTO_XP)
        // 	var isAutoXp: boolean = GameModels.user.player.setAotuID && Math.floor(Math.floor(GameModels.user.player.setAotuID % 100000) / 10000) > 0;
        // 	if (isAutoXp) {
        // 		logger.log("自动无双技能，所以不触发无双引导");
        // 		return;
        // 	}
        // 	if (GameModels.task.hasTask && isLevelCan && isTypeGameCan && wushuangCan) {
        // 		// if (mg.guideManager.current instanceof GuideXp) return;
        // 		var guide: GuideBase = utils.ObjectPool.from(GuideXp, true) as GuideXp;
        // 		if (guide) {
        // 			logger.log("======触发了无双引导======");
        // 			mg.guideManager.guide(guide);
        // 		}
        // 	}
        // }
        MainTaskView.prototype.startGuide = function (time, isWenGuan) {
            if (time === void 0) { time = 0; }
            if (isWenGuan === void 0) { isWenGuan = false; }
            if (GameModels.guide.guideTypeClinte != 0 || GameModels.guide.guideType != 0)
                return;
            var guide;
            if (isWenGuan && GameModels.task.curTask.type == TypeTask.WENGUAN_TASK && GameModels.task.curTask.template.isAutoGuide == 0) {
                if (mg.guideManager.current instanceof main.GuideWenGunClinte)
                    return;
                guide = utils.ObjectPool.from(main.GuideWenGunClinte, true);
                if (guide) {
                    mg.guideManager.guide(guide, time);
                }
                return;
            }
            switch (GameModels.task.curTask.type) {
                case TypeTask.PASS:
                    if (mg.guideManager.current instanceof main.GuideChapter)
                        return;
                    guide = utils.ObjectPool.from(main.GuideChapter, true);
                    break;
                case TypeTask.PET_UP:
                    if (mg.guideManager.current instanceof main.GuidePetUp)
                        return;
                    guide = utils.ObjectPool.from(main.GuidePetUp, true);
                    break;
                case TypeTask.UP_LEVEL_POS2:
                case TypeTask.UP_LEVEL_POS3:
                case TypeTask.UP_LEVEL_POS4:
                case TypeTask.UP_LEVEL_POS5:
                    if (mg.guideManager.current instanceof main.GuidePlayerLevelUp)
                        return;
                    guide = utils.ObjectPool.from(main.GuidePlayerLevelUp, true);
                    break;
                case TypeTask.WENGUAN_TASK:
                    if (mg.guideManager.current instanceof main.GuideWenGuan)
                        return;
                    guide = utils.ObjectPool.from(main.GuideWenGuan, true);
                    break;
                case TypeTask.HONGYAN_ACT:
                    if (mg.guideManager.current instanceof main.GuideHongYan)
                        return;
                    guide = utils.ObjectPool.from(main.GuideHongYan, true);
                    break;
                case TypeTask.SMOMEPET1:
                case TypeTask.SMOMEPET2:
                case TypeTask.SMOMEPET4:
                    if (mg.guideManager.current instanceof main.GuideSmoPet)
                        return;
                    guide = utils.ObjectPool.from(main.GuideSmoPet, true);
                    break;
                case TypeTask.FOOD:
                    if (mg.guideManager.current instanceof main.GuideFood)
                        return;
                    guide = utils.ObjectPool.from(main.GuideFood, true);
                    break;
                case TypeTask.PET_HECHENG:
                    if (mg.guideManager.current instanceof main.GuidePetHeCheng)
                        return;
                    guide = utils.ObjectPool.from(main.GuidePetHeCheng, true);
                    break;
            }
            if (guide) {
                mg.guideManager.guide(guide, time);
            }
        };
        MainTaskView.prototype.updateTask = function () {
            if (!GameModels.task.curTask)
                return;
            this.labTaskName.text = GameModels.task.curTask.name;
            var bool = !!GameModels.task.curTask.total;
            this.labTaskProgress.visible = bool;
            var isFinsh = false;
            if (bool) {
                var cur = GameModels.task.curTask.current;
                if (cur >= GameModels.task.curTask.total) {
                    cur = GameModels.task.curTask.total;
                    isFinsh = true;
                }
                switch (GameModels.task.curTask.type) {
                    case TypeTask.PERSON_BOSS:
                        this.labTaskProgress.text = "";
                        break;
                    case TypeTask.PASS:
                        this.labTaskProgress.textColor = isFinsh ? 0X23F100 : 0XFF3434;
                        this.labTaskProgress.text = isFinsh ? "(" + Language.C_YWC + ")" : "(" + Language.C_WWC + ")";
                        if (GameModels.task.curTask.template.isAutoGuide == 1) {
                            this.startGuide();
                        }
                        else {
                            if (GameModels.task.curTask.canSubmit) {
                                this.startGuide();
                            }
                            else {
                                if (GameModels.task.curTask.type == TypeTask.WENGUAN_TASK && GameModels.wenguanTask.curWenGuanId < 201) {
                                    if (GameModels.wenguanTask.checkWenGuanUp()) {
                                        this.startGuide(0, true);
                                    }
                                    else {
                                        if (GameModels.wenguanTask.checkWenGuanUp()) {
                                            this.startGuide(0, true);
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    //case TypeTask.ROLE_ZIZHI:
                    case TypeTask.CHAT:
                        this.labTaskProgress.textColor = GameModels.task.curTask.clientTaskType ? 0X23F100 : 0XFF3434;
                        this.labTaskProgress.text = GameModels.task.curTask.clientTaskType ? "(1/1)" : "(0/1)";
                        break;
                    case TypeTask.WARE:
                        this.labTaskProgress.textColor = GameModels.task.curTask.clientTaskType ? 0X23F100 : 0XFF3434;
                        this.labTaskProgress.text = GameModels.task.curTask.clientTaskType ? "(" + Language.C_YWC + ")" : "(" + Language.C_WWC + ")";
                        break;
                    default:
                        if (GameModels.task.curTask.id == 100935) {
                            var shen = Language.getExpression(Language.E_S1, Math.floor(GameModels.task.curTask.total / 1000));
                            var num = "";
                            if (cur < 1000) {
                                num = "" + cur;
                            }
                            else {
                                num = Language.getExpression(Language.E_S1, Math.floor(cur / 1000));
                            }
                            this.labTaskProgress.text = "(" + num + "/" + shen + ")";
                        }
                        else {
                            this.labTaskProgress.text = "(" + cur + "/" + GameModels.task.curTask.total + ")";
                        }
                        if (cur < GameModels.task.curTask.total) {
                            this.labTaskProgress.textColor = 0XFF3434;
                        }
                        else {
                            this.labTaskProgress.textColor = 0X23F100;
                        }
                        break;
                }
                this.labTaskProgress.x = this.labTaskName.x + this.labTaskName.width;
            }
            if (GameModels.task.curTask.canSubmit) {
                this.showTaskEffect();
                // if (GameModels.task.hasTask && GameModels.task.curTask.template.isAutoGuide != 1) {
                // 	var taskHot = (mg.uiManager.getView(MainUIView) as MainUIView).taskGroup;
                // 	if(taskHot)mg.guideManager.guideImmediately(taskHot, Language.C_WCRW ,TypeDirection.UP);
                // }
            }
            else {
                if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.WENGUAN_TASK && GameModels.task.curTask.template.isAutoGuide == 0 && GameModels.wenguanTask.checkWenGuan()) {
                    this.showTaskEffect();
                }
                else {
                    this.hideTaskEffect();
                }
                //this.hideTaskEffect();
            }
            var itemVO = GameModels.task.curTask.firstItem;
            var bool = !!itemVO;
            this.labTaskContent.visible = bool;
            if (bool) {
                //0xC6C5C4;
                this.labTaskContent.text = itemVO.name + (itemVO.count > 1 ? (" x " + itemVO.count) : "");
                // this.labTaskContent.textColor = TypeQuality.getQualityColor(itemVO.quality);
                this.taskReward.source = itemVO.icon;
            }
        };
        MainTaskView.prototype.showTaskEffect = function () {
            if (!this._taskEffect) {
                this._taskEffect = utils.ObjectPool.from(s.AnimationSprite);
                this._taskEffect.resId = "31019";
            }
            this._taskEffect.x = this.width / 2;
            this._taskEffect.y = this.height / 2;
            this.addChildAt(this._taskEffect, 1);
            this._taskEffect.play();
        };
        MainTaskView.prototype.hideTaskEffect = function () {
            if (this._taskEffect) {
                this._taskEffect.stop();
                if (this._taskEffect.parent) {
                    this._taskEffect.parent.removeChild(this._taskEffect);
                }
                utils.ObjectPool.to(this._taskEffect, true);
                this._taskEffect = null;
            }
        };
        MainTaskView.prototype.showTaskDoneTip = function (text) {
            if (!this._taskDoneTip)
                return;
            mg.stageManager.stage.addChild(this._taskDoneTip);
            this._taskDoneTip.text = text;
            this._taskDoneTip.invalidateSize();
            this._taskDoneTip.x = mg.stageManager.stageWidth / 2 - this._taskDoneTip.width / 2;
            this._taskDoneTip.y = mg.stageManager.stageHeight - 370;
            utils.timer.clear(this, this.hideTaskDoneTip);
            utils.timer.once(4000, this, this.hideTaskDoneTip);
        };
        MainTaskView.prototype.hideTaskDoneTip = function () {
            if (this._taskDoneTip && this._taskDoneTip.parent) {
                this._taskDoneTip.parent.removeChild(this._taskDoneTip);
            }
        };
        return MainTaskView;
    }(ui.MainTaskSkin));
    main.MainTaskView = MainTaskView;
    __reflect(MainTaskView.prototype, "main.MainTaskView");
})(main || (main = {}));
