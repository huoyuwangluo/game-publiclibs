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
var achievement;
(function (achievement) {
    var AchievementWenGuanDialog = (function (_super) {
        __extends(AchievementWenGuanDialog, _super);
        function AchievementWenGuanDialog() {
            return _super.call(this) || this;
        }
        AchievementWenGuanDialog.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._rwards = [this.reward3, this.reward0, this.reward1];
            this._rwardBoxs = [this.rewardBox0, this.rewardBox1, this.rewardBox2, this.rewardBox3];
        };
        AchievementWenGuanDialog.prototype.enter = function () {
            var _this = this;
            GameModels.wenguanTask.isOpenWenGuanFight = false;
            mg.soundManager.playViewLongSound("SoundJM_7", "WENGUAN");
            GameModels.wenguanTask.requestWenGuanInfo(utils.Handler.create(this, function () {
                _this.addEff();
                _this.updata();
                // if (GameModels.task.hasTask && !GameModels.task.curTask.canSubmit && (GameModels.task.curTask.id == 100190 || GameModels.task.curTask.id == 100210)) {
                // 	this.list.validateNow();
                // 	var item: vo.WenGuanTaskVO[] = GameModels.wenguanTask.wenGuanTaskVo;
                // 	if (item[0].state != 2) {
                // 		var btn: components.SnapButton = (this.list.getChildAt(0) as renderer.AchievementWenGuanRenderer).btnGet;
                // 		if (btn && btn.visible && TypeGame.isMainGame(app.gameContext.gameCurrent.type)) {
                // 			mg.guideManager.guideImmediately(btn, item[0].state == 0 ? Language.C_DJQW : Language.C_DJLQ, TypeDirection.UP);
                // 		}
                // 	}
                // }
            }));
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceiveClick, this);
            GameModels.wenguanTask.addEventListener(mo.ModelWenGuanTask.CHANGE_WENGUANTASK_INFO, this.updata, this);
        };
        AchievementWenGuanDialog.prototype.exit = function () {
            // if (this.list.getChildAt(0)) {
            // 	var btn: components.SnapButton = (this.list.getChildAt(0) as renderer.AchievementWenGuanRenderer).btnGet;
            // 	if (btn) mg.guideManager.guideStopImmediately(btn);
            // }
            if (this._effect1) {
                this._effect1.scale(1);
                this._effect1.visible = true;
                if (this._effect1.parent) {
                    this._effect1.parent.removeChild(this._effect1);
                }
                this._effect1.stop();
                utils.ObjectPool.to(this._effect1, true);
                this._effect1 = null;
            }
            if (this._effect2) {
                this._effect2.scale(1);
                this._effect2.visible = true;
                if (this._effect2.parent) {
                    this._effect2.parent.removeChild(this._effect2);
                }
                this._effect2.stop();
                utils.ObjectPool.to(this._effect2, true);
                this._effect2 = null;
            }
            this.clearList(this.list);
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceiveClick, this);
            GameModels.wenguanTask.removeEventListener(mo.ModelWenGuanTask.CHANGE_WENGUANTASK_INFO, this.updata, this);
        };
        AchievementWenGuanDialog.prototype.addEff = function () {
            this._effect1 = this.fromEffect("16201");
            this._effect1.x = 90;
            this._effect1.y = 160;
            this._effect1.scale(0.6);
            this._effect1.play();
            this.addChild(this._effect1);
            this._effect2 = this.fromEffect("16202");
            this._effect2.x = 500;
            this._effect2.y = 160;
            this._effect2.scale(0.6);
            this._effect2.play();
            this.addChild(this._effect2);
        };
        AchievementWenGuanDialog.prototype.updata = function () {
            var currTemp = GameModels.wenguanTask.curWenGuanTemplates;
            var nextTemp = GameModels.wenguanTask.nextWenGuanTemplates;
            if (currTemp) {
                this.labStep.text = currTemp.name;
                if (!this._listCollection) {
                    this._listCollection = new eui.ArrayCollection(GameModels.wenguanTask.wenGuanTaskVo);
                }
                else {
                    this._listCollection.source = GameModels.wenguanTask.wenGuanTaskVo;
                }
                this.list.dataProvider = this._listCollection;
                var isReceive = GameModels.wenguanTask.tatolValue > 0 && GameModels.wenguanTask.finshValue == GameModels.wenguanTask.tatolValue;
                this.group.visible = isReceive;
                if (isReceive) {
                    mg.soundManager.playSoundStopLast("WenGuan_SZD", 1, true);
                }
                this.scroller.visible = !isReceive;
                this.labManJI.visible = nextTemp ? false : true;
                this.rewardGroup.visible = nextTemp ? true : false;
                this._oldStep = currTemp.step;
                var step = currTemp.step;
                var strArr = currTemp.rewards.split(";");
                for (var i = 0; i < 4; i++) {
                    var iconBox = this._rwardBoxs[i];
                    iconBox.labName.stroke = 1;
                    if (i < strArr.length) {
                        iconBox.dataSource = strArr[i];
                        this.rewardGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                if (nextTemp) {
                    this._effect1.resId = currTemp.effcet.toString();
                    this._effect2.resId = nextTemp.effcet.toString();
                    this.labPro.text = GameModels.wenguanTask.finshValue + "/" + GameModels.wenguanTask.tatolValue;
                    this.expProgress.noTweenValue = GameModels.wenguanTask.finshValue / GameModels.wenguanTask.tatolValue;
                    this.labNextStep.text = nextTemp.name;
                    for (var i = 0; i < 3; i++) {
                        var iconBox = this._rwards[i];
                        iconBox.labName.stroke = 1;
                        if (i < strArr.length) {
                            iconBox.dataSource = strArr[i];
                            this.boxGroup.addChild(iconBox);
                        }
                        else {
                            if (iconBox.parent) {
                                iconBox.parent.removeChild(iconBox);
                            }
                        }
                    }
                }
                else {
                    //满级
                    this.labPro.text = Language.C_YMJ;
                    this.labNextStep.text = currTemp.name;
                    this.expProgress.noTweenValue = 100000; //满级设置满进度条
                    this._effect1.resId = currTemp.effcet.toString();
                    this._effect2.resId = currTemp.effcet.toString();
                    this.group.visible = false;
                    this.scroller.visible = false;
                }
            }
            this.updataOfficerList();
        };
        AchievementWenGuanDialog.prototype.updataOfficerList = function () {
            var currTemp = GameModels.wenguanTask.curWenGuanTemplates;
            if (!currTemp || currTemp.step <= 0)
                return;
            var wenGuan = GameModels.wenguanTask.getIdenticalStepTemps(currTemp.step);
            var items = [];
            for (var _i = 0, wenGuan_1 = wenGuan; _i < wenGuan_1.length; _i++) {
                var info = wenGuan_1[_i];
                var state = 0;
                var name = info.name;
                if (info.lv < currTemp.lv) {
                    state = 1;
                }
                else if (info.lv == currTemp.lv) {
                    state = 2;
                }
                else {
                    state = 3;
                }
                items.push({ tempname: name, tempstate: state });
            }
            if (!this._listData) {
                this._listData = new eui.ArrayCollection();
            }
            this._listData.source = items;
            this.officerList.dataProvider = this._listData;
        };
        AchievementWenGuanDialog.prototype.onReceiveClick = function (e) {
            var _this = this;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            GameModels.wenguanTask.requestWenGuanGetTaskBigReward(utils.Handler.create(this, function () {
                // this.updata();
                var currTemps = GameModels.wenguanTask.curWenGuanTemplates;
                var isUpGrade = currTemps.step > _this._oldStep ? true : false;
                var moneyPoint = mg.uiManager.getView(main.MainUIView).getMoneyPostion(true);
                mg.effectManager.flyEffects("6161", 10, _this.reward3.localToGlobal(45, 45), moneyPoint, mg.layerManager.top);
                mg.alertManager.showAlert(achievement.AchievementShengZhiTip, true, true, GameModels.wenguanTask.curWenGuanTemplates, isUpGrade);
                mg.uiManager.removeAllDialogs();
            }));
        };
        // public playEff() {
        // 	var idArr = [101, 301, 501, 701, 901];
        // 	if (idArr.indexOf(GameModels.wenguanTask.curWenGuanId) != -1 && this.imgEff) {
        // 		this.imgEff.source = "img_wenguan_" + GameModels.wenguanTask.curWenGuanId + "_png"
        // 		this.imgEff.visible = true;
        // 		this.imgEff.scaleX = this.imgEff.scaleY = 3;
        // 		egret.Tween.removeTweens(this.imgEff);
        // 		egret.Tween.get(this.imgEff).to({ scaleX: 1, scaleY: 1 }, 500, utils.Ease.backOut).wait(2000).call(this.playEffectCall, this);
        // 	}
        // }
        // private playEffectCall(): void {
        // 	egret.Tween.removeTweens(this.imgEff);
        // 	this.imgEff.visible = false;
        // }
        AchievementWenGuanDialog.prototype.onListClick = function (e) {
            if (e.target instanceof components.SnapButton) {
                var item = this.list.selectedItem;
                if (item.state == 1) {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    // if (GameModels.task.hasTask && !GameModels.task.curTask.canSubmit && (GameModels.task.curTask.id == 100190 || GameModels.task.curTask.id == 100210)) {
                    // 	if (item.templates.type == 3) {
                    // 		if (this.list.getChildAt(0)) {
                    // 			var btn: components.SnapButton = (this.list.getChildAt(0) as renderer.AchievementWenGuanRenderer).btnGet;
                    // 			if (btn) mg.guideManager.guideStopImmediately(btn);
                    // 		}
                    // 	}
                    // }
                    GameModels.wenguanTask.requestWenGuanGetTaskSamllReward(item.taskId, utils.Handler.create(this, this.getRewardCallback));
                }
                else if (item.state == 0) {
                    // if (GameModels.task.hasTask && !GameModels.task.curTask.canSubmit && (GameModels.task.curTask.id == 100190 || GameModels.task.curTask.id == 100210)) {
                    // 	if (this.list.getChildAt(0)) {
                    // 		var btn: components.SnapButton = (this.list.getChildAt(0) as renderer.AchievementWenGuanRenderer).btnGet;
                    // 		if (btn) mg.guideManager.guideStopImmediately(btn);
                    // 	}
                    // }
                    if (item.templates.type == 11) {
                        mg.uiManager.show(dialog.welfare.WelfareMain, { tabIndex: 2, param: 1 });
                        return;
                    }
                    if (item.templates.type == 3) {
                        if (GameModels.scene.getjoinSceneListByType(TypeGame.CHAPTER_BOSS)) {
                            app.gameContext.enterChapterBoss("");
                            return;
                        }
                        if (GameModels.scene.getjoinSceneListByType(TypeGame.DOOR_BOSS)) {
                            app.gameContext.enterChapterCity("");
                            return;
                        }
                        GameModels.wenguanTask.wenguanChapter = item.templates.part1;
                        if (GameModels.chapter.totalChapter < 13) {
                            GameModels.chapter.bossActiveAutoFight();
                            mg.uiManager.removeAllDialogs();
                            app.gameContext.enterChapterBoss("");
                        }
                        else {
                            if (GameModels.chapter.totalChapter >= 400) {
                                mg.alertManager.showAlert(PrewarEmbattle400, true, true, 1, true);
                            }
                            else {
                                mg.alertManager.showAlert(PrewarEmbattle, true, true, 1, null, null, false, true);
                            }
                        }
                        return;
                    }
                    if (item.templates.type == 50) {
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, "301");
                        return;
                    }
                    if (item.templates.functionId == TypeFunOpen.TAOFAI_0 ||
                        item.templates.functionId == TypeFunOpen.TAOFAI_1 ||
                        item.templates.functionId == TypeFunOpen.TAOFAI_2 ||
                        item.templates.functionId == TypeFunOpen.GONGCHENG) {
                        GameModels.wenguanTask.isOpenWenGuanFight = true;
                    }
                    if (item.templates.type == 47) {
                        var itemTemp = Templates.getTemplateById(templates.Map.ITEM, item.templates.part2);
                        if (itemTemp) {
                            if (GameModels.bag.getPetSuiCountById(itemTemp.combine.split("_")[0]) >= parseInt(itemTemp.combine.split("_")[1])) {
                                mg.uiManager.show(dialog.bag.BagDialog, { tabIndex: 2 });
                            }
                            else {
                                mg.uiManager.showByName(item.templates.functionId, item.templates.functionParams, [item.templates.type, 2]);
                            }
                        }
                        else {
                            mg.uiManager.showByName(item.templates.functionId, item.templates.functionParams, [item.templates.type, 2]);
                        }
                        return;
                    }
                    mg.uiManager.showByName(item.templates.functionId, item.templates.functionParams, [item.templates.type, 2]);
                }
            }
        };
        AchievementWenGuanDialog.prototype.getRewardCallback = function () {
            var item = this.list.selectedItem;
            if (item && item.templates.rewards) {
                var rewards = item.templates.rewards.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            }
            this.updata();
        };
        AchievementWenGuanDialog.prototype.checkIsAllFinsh = function () {
            var item = GameModels.wenguanTask.wenGuanTaskVo;
            var isfinsh = true;
            for (var i = 0; i < item.length; i++) {
                if (item[i].state != 2) {
                    isfinsh = false;
                    ;
                }
            }
            return isfinsh;
        };
        AchievementWenGuanDialog.prototype.getCanUseListItem = function () {
            var data = { btn: null, state: 0 };
            this.list.validateNow();
            var item = GameModels.wenguanTask.wenGuanTaskVo;
            for (var i = 0; i < item.length; i++) {
                if (item[i] && item[i].state == 1) {
                    var rend = this.list.getChildAt(i);
                    data.btn = rend ? rend.btnGet : null;
                    data.state = 1;
                    return data;
                }
            }
            for (var i = 0; i < item.length; i++) {
                if (item[i] && item[i].state == 0) {
                    var rend1 = this.list.getChildAt(i);
                    data.btn = rend1 ? rend1.btnGet : null;
                    data.state = 0;
                    return data;
                }
            }
            return null;
        };
        return AchievementWenGuanDialog;
    }(ui.AchievementWenGuanDialogSkin));
    achievement.AchievementWenGuanDialog = AchievementWenGuanDialog;
    __reflect(AchievementWenGuanDialog.prototype, "achievement.AchievementWenGuanDialog");
})(achievement || (achievement = {}));
