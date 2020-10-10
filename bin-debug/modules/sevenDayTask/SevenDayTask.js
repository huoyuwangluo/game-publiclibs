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
var dialog;
(function (dialog) {
    var sevenday;
    (function (sevenday) {
        var SevenDayTask = (function (_super) {
            __extends(SevenDayTask, _super);
            function SevenDayTask() {
                return _super.call(this) || this;
            }
            SevenDayTask.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._itemBox = [this.imgBox0, this.imgBox1, this.imgBox2, this.imgBox3, this.imgBox4];
                this._itemBoxLab = [this.labProLab0, this.labProLab1, this.labProLab2, this.labProLab3, this.labProLab4];
                this._rewardBox = [this.reward0, this.reward1, this.reward2, this.reward3, this.reward4, this.reward5, this.reward6];
                this._rewardLab = [this.labDay0, this.labDay1, this.labDay2, this.labDay3, this.labDay4, this.labDay5, this.labDay6];
                this._rewardRedPoint = [this.imgDayRedPoint0, this.imgDayRedPoint1, this.imgDayRedPoint2, this.imgDayRedPoint3,
                    this.imgDayRedPoint4, this.imgDayRedPoint5, this.imgDayRedPoint6];
                this._btnArr = [this.btn0, this.btn1, this.btn2, this.btn3];
                this._btnLabArr = [this.lab0, this.lab1, this.lab2, this.lab3];
                this._btnRedPointArr = [this.imgRedPoint0, this.imgRedPoint1, this.imgRedPoint2, this.imgRedPoint3];
                this._tempIdArr = [890001, 890002, 890003, 890004, 890005];
                this._imgArr = ["exploreBox_json.img_wood_box_", "exploreBox_json.img_silver_box_", "exploreBox_json.img_gold_box_",
                    "exploreBox_json.img_gold1_box_", "exploreBox_json.img_gold2_box_"];
            };
            SevenDayTask.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this._currSelecdIndex = 0;
                this._leftTime = 0;
                this._selectedDay = 0;
                this._btnIndex = 0;
                GameModels.sevenDayTask.requesSevenDayTargetInfo(utils.Handler.create(this, function () {
                    _this.showView();
                }));
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
                for (var i = 0; i < this._itemBox.length; i++) {
                    this._itemBox[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBoxClick, this);
                }
                for (var i = 0; i < this._rewardBox.length; i++) {
                    this._rewardBox[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardBoxClick, this);
                }
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                GameModels.sevenDayTask.addEventListener(mo.ModelSevenDayTask.CHANGE_TASK_INFO, this.showView, this);
            };
            SevenDayTask.prototype.exit = function () {
                this._currSelecdIndex = 0;
                this._leftTime = 0;
                this._selectedDay = 0;
                this.clearList(this.list);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
                for (var i = 0; i < this._itemBox.length; i++) {
                    this._itemBox[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBoxClick, this);
                }
                for (var i = 0; i < this._rewardBox.length; i++) {
                    this._rewardBox[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardBoxClick, this);
                }
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                GameModels.sevenDayTask.removeEventListener(mo.ModelSevenDayTask.CHANGE_TASK_INFO, this.showView, this);
            };
            SevenDayTask.prototype.showView = function () {
                var taskInfo = GameModels.sevenDayTask.sevenDayList;
                if (taskInfo.length <= 0) {
                    mg.alertManager.tip(Language.C_HDYJS);
                    mg.uiManager.remove(this);
                }
                this.labCount.text = GameModels.sevenDayTask.finishTaskCount.toString();
                this._selectedDay = GameModels.sevenDayTask.nowDay;
                this.showLeftTime();
                this.showStepRewardView();
                this.showSevenDayRewardBoxView();
                this.showList();
            };
            SevenDayTask.prototype.showStepRewardView = function () {
                var finishCount = GameModels.sevenDayTask.finishTaskCount;
                var getRewardArr = GameModels.sevenDayTask.stepRewardList;
                this.expProgress.noTweenValue = finishCount / 100;
                for (var i = 0; i < this._tempIdArr.length; i++) {
                    var value = GameModels.dataSet.getDataSettingValueById(this._tempIdArr[i]);
                    if (value) {
                        var count = parseInt(value.split("&")[0]);
                        this._itemBoxLab[i].text = count.toString();
                        if (finishCount >= count) {
                            if (getRewardArr.indexOf(this._tempIdArr[i]) != -1) {
                                this._itemBox[i].source = this._imgArr[i] + "open";
                            }
                            else {
                                this._itemBox[i].source = this._imgArr[i] + "wait";
                            }
                        }
                        else {
                            this._itemBox[i].source = this._imgArr[i] + "close";
                        }
                    }
                    else {
                        this._itemBoxLab[i].text = "";
                    }
                }
            };
            SevenDayTask.prototype.showSevenDayRewardBoxView = function () {
                var nowDay = GameModels.sevenDayTask.nowDay;
                this.imgSecelted.x = this._rewardBox[this._selectedDay - 1].x - 3.5;
                this.imgSecelted.y = this._rewardBox[this._selectedDay - 1].y - 6;
                var valueArr = GameModels.dataSet.getDataSettingValueById(891001).split(";");
                for (var i = 0; i < this._rewardBox.length; i++) {
                    this._rewardRedPoint[i].visible = GameModels.sevenDayTask.getHashRedPointBuyDay(i + 1);
                    this._rewardLab[i].text = Language.getExpression(Language.E_D1T, (i + 1));
                    if (i < nowDay) {
                        this._rewardBox[i].filters = null;
                    }
                    else {
                        this._rewardBox[i].filters = utils.filterUtil.grayFilters;
                    }
                    if (valueArr[i]) {
                        this._rewardBox[i].dataSource = valueArr[i] + "_1";
                        this._rewardBox[i].labCount.text = "";
                        this._rewardBox[i].labName.text = "";
                    }
                    else {
                        this._rewardBox[i].dataSource = null;
                    }
                    mg.TipManager.instance.unBind(this._rewardBox[i]);
                }
            };
            SevenDayTask.prototype.showLeftTime = function () {
                var nowDay = GameModels.sevenDayTask.nowDay;
                var strDay = "";
                var leftDay = 7 - nowDay;
                this._leftTime = 86400 - GameModels.timer.getPastSecond();
                if (leftDay > 0)
                    strDay = Language.getExpression(Language.E_1T1, leftDay);
                this.labTime.text = strDay + utils.DateUtil.formatTimeLeft(this._leftTime);
                utils.timer.loop(1000, this, this.timerHandler);
            };
            SevenDayTask.prototype.timerHandler = function () {
                this._leftTime--;
                if (this._leftTime <= 0) {
                    this._leftTime = 0;
                    this.labTime.text = "";
                    utils.timer.clear(this, this.timerHandler);
                    return;
                }
                var nowDay = GameModels.sevenDayTask.nowDay;
                var strDay = "";
                var leftDay = 7 - nowDay;
                this._leftTime = 86400 - GameModels.timer.getPastSecond();
                if (leftDay > 0)
                    strDay = Language.getExpression(Language.E_1T1, leftDay);
                this.labTime.text = strDay + utils.DateUtil.formatTimeLeft(this._leftTime);
            };
            SevenDayTask.prototype.showList = function () {
                this.showBtnView();
                var taskList = GameModels.sevenDayTask.getTaskVoBuyDayAndType(this._selectedDay, this._btnIndex + 1);
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(taskList);
                }
                else {
                    this._listData.source = taskList;
                }
                this.list.dataProvider = this._listData;
            };
            SevenDayTask.prototype.showBtnView = function () {
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (i == this._btnIndex) {
                        this._btnArr[i].currentState = "down";
                        this._btnLabArr[i].textColor = 0xCCC6BA;
                    }
                    else {
                        this._btnArr[i].currentState = "up";
                        this._btnLabArr[i].textColor = 0x969696;
                    }
                    this._btnLabArr[i].text = GameModels.sevenDayTask.getNameBuyDayAndType(this._selectedDay, i + 1);
                    this._btnRedPointArr[i].visible = GameModels.sevenDayTask.getHashRedPointBuyTable(this._selectedDay, i + 1);
                }
            };
            SevenDayTask.prototype.listClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                var taskVo = this.list.selectedItem;
                if (e.target instanceof components.SnapButton) {
                    if (taskVo.status == 1 || taskVo.type == 4) {
                        if (taskVo.type == 4) {
                            if (GameModels.user.player.vip < taskVo.parm2Target) {
                                mg.alertManager.tip(Language.getExpression(Language.E_DDVIP1KGMGLB, taskVo.parm2Target));
                            }
                            else {
                                if (taskVo.parm1Target > 0) {
                                    mg.alertManager.showCheckAlert(Language.getExpression(Language.E_SFXH1YBGMFLLB, taskVo.parm1Target), TypeBtnLabel.OK, TypeCheck.SEVENDAY_BUY, null, utils.Handler.create(this, function () {
                                        GameModels.sevenDayTask.requestSevenDayGetTaskReward(this._selectedDay, taskVo.id, utils.Handler.create(this, this.getRewardCallback, [e.target.parent.localToGlobal(45, 45)]));
                                    }));
                                }
                                else {
                                    GameModels.sevenDayTask.requestSevenDayGetTaskReward(this._selectedDay, taskVo.id, utils.Handler.create(this, this.getRewardCallback, [taskVo.template.rewards]));
                                }
                            }
                        }
                        else {
                            GameModels.sevenDayTask.requestSevenDayGetTaskReward(this._selectedDay, taskVo.id, utils.Handler.create(this, this.getRewardCallback, [taskVo.template.rewards]));
                        }
                    }
                    else {
                        if (taskVo.template.type == 2) {
                            GameModels.recharge.openRechargeDialog();
                        }
                        else {
                            mg.uiManager.showByName(taskVo.template.functionId);
                        }
                        mg.uiManager.remove(this);
                    }
                }
            };
            SevenDayTask.prototype.onBoxClick = function (e) {
                var _this = this;
                var index = this._itemBox.indexOf(e.currentTarget);
                var getRewardArr = GameModels.sevenDayTask.stepRewardList;
                var value = GameModels.dataSet.getDataSettingValueById(this._tempIdArr[index]).split("&");
                var valueCount = parseInt(value[0]);
                var itemVo = vo.fromPool(vo.ItemVO, parseInt(value[1].split("_")[0]));
                itemVo.count = parseInt(value[1].split("_")[1]);
                var valueStr = value[1];
                var isCan = GameModels.sevenDayTask.finishTaskCount >= valueCount && getRewardArr.indexOf(this._tempIdArr[index]) == -1;
                var status = isCan ? ChestPreviewAlert.HAPLOID : ChestPreviewAlert.NORMAL;
                mg.alertManager.showAlert(ChestPreviewAlert, true, true, [itemVo], function () {
                    GameModels.sevenDayTask.requestSevenDayGetStepReward(_this._tempIdArr[index], utils.Handler.create(_this, function () {
                        _this.showStepRewardView();
                        var rewards = valueStr.split(";");
                        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                        mg.alertManager.closeALert(ChestPreviewAlert);
                    }));
                }, null, status, true, false, null);
            };
            SevenDayTask.prototype.onRewardBoxClick = function (e) {
                var index = this._rewardBox.indexOf(e.currentTarget);
                if (index + 1 > GameModels.sevenDayTask.nowDay) {
                    mg.alertManager.tip(Language.getExpression(Language.E_WJXDD1T, index + 1));
                    return;
                }
                else {
                    if (index + 1 != this._selectedDay) {
                        this._selectedDay = index + 1;
                        this.imgSecelted.x = this._rewardBox[index].x - 3.5;
                        this.imgSecelted.y = this._rewardBox[index].y - 6;
                        this.showList();
                    }
                }
            };
            SevenDayTask.prototype.onBtnClick = function (e) {
                this._btnIndex = this._btnArr.indexOf(e.currentTarget);
                this.showList();
            };
            SevenDayTask.prototype.getRewardCallback = function (str) {
                this.labCount.text = GameModels.sevenDayTask.finishTaskCount.toString();
                this.showStepRewardView();
                this.showSevenDayRewardBoxView();
                this.showList();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                // var taskList: vo.SevenDayTaskVo[] = GameModels.sevenDayTask.getTaskVoBuyDayAndType(this._selectedDay, this._btnIndex + 1);
                // if (this._listData) this._listData.replaceAll(taskList);
            };
            return SevenDayTask;
        }(ui.SevenDayTaskSkin));
        sevenday.SevenDayTask = SevenDayTask;
        __reflect(SevenDayTask.prototype, "dialog.sevenday.SevenDayTask");
    })(sevenday = dialog.sevenday || (dialog.sevenday = {}));
})(dialog || (dialog = {}));
