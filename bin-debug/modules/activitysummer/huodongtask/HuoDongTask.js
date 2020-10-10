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
var view;
(function (view) {
    var activity;
    (function (activity) {
        var HuoDongTask = (function (_super) {
            __extends(HuoDongTask, _super);
            function HuoDongTask() {
                return _super.call(this) || this;
            }
            HuoDongTask.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._rwards = [this.reward0, this.reward1, this.reward2];
            };
            HuoDongTask.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.TASK);
                if (temp) {
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                    if (GameModels.activitySummer.summerActivityOneResourceType > 0) {
                        this.imgTitle.source = "img_summer_task_" + GameModels.activitySummer.summerActivityOneResourceType + "_jpg";
                    }
                }
                this.listBox.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
                this.btnLingQu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                //请求宝箱
                GameModels.activitySummer.requestRewardInfosData(game.TypeSummerActivity.TASK, utils.Handler.create(this, function () {
                    if (!_this._listBoxData) {
                        _this._listBoxData = new eui.ArrayCollection(GameModels.activitySummer.taskBoxData);
                    }
                    else {
                        _this._listBoxData.source = GameModels.activitySummer.taskBoxData;
                    }
                    _this.listBox.dataProvider = _this._listBoxData;
                    _this.listBox.selectedIndex = 0;
                    if (GameModels.activitySummer.isCanLingqu) {
                        _this.listBox.selectedIndex = GameModels.activitySummer.canLingquIndex;
                    }
                    else {
                        _this.listBox.selectedIndex = GameModels.activitySummer.noCanLingquIndex;
                    }
                    _this._vo = _this.listBox.selectedItem;
                    _this.showJiangLi();
                    _this.labMyJifen.text = "" + GameModels.activitySummer.tatolValue;
                }));
                //请求任务列表
                GameModels.activitySummer.requestTaskInfosData(utils.Handler.create(this, function () {
                    if (!_this._listTaskData) {
                        _this._listTaskData = new eui.ArrayCollection(GameModels.activitySummer.taskData);
                    }
                    else {
                        _this._listTaskData.source = GameModels.activitySummer.taskData;
                    }
                    _this.listTask.dataProvider = _this._listTaskData;
                }));
            };
            HuoDongTask.prototype.exit = function () {
                this.clearList(this.listTask);
                this.clearList(this.listBox);
                this.listBox.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
                this.btnLingQu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            HuoDongTask.prototype.btnBoxClick = function (e) {
                this.listBox.selectedIndex = e.itemIndex;
                var item = this.listBox.selectedItem;
                this._vo = item;
                this.showJiangLi();
            };
            HuoDongTask.prototype.showJiangLi = function () {
                this.getVipBox.visible = false;
                this.notAttain.visible = false;
                this.btnLingQu.visible = false;
                if (this._vo) {
                    var rewards = this._vo.template.rewards.split(";");
                    for (var i = 0; i < 3; i++) {
                        var iconBox = this._rwards[i];
                        iconBox.labName.stroke = 1;
                        if (i < rewards.length) {
                            iconBox.dataSource = rewards[i];
                            this.boxGroup.addChild(iconBox);
                        }
                        else {
                            if (iconBox.parent) {
                                iconBox.parent.removeChild(iconBox);
                            }
                        }
                    }
                    if (this._vo.holidayRewardState == 1) {
                        this.btnLingQu.visible = true;
                    }
                    else if (this._vo.holidayRewardState == 2) {
                        this.notAttain.visible = true;
                    }
                    else {
                        this.getVipBox.visible = true;
                    }
                }
            };
            HuoDongTask.prototype.onBuyClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (this._vo) {
                    //logger.log(this._vo.holidayRewardState);
                    if (this._vo.holidayRewardState == 1) {
                        GameModels.activitySummer.requestGetRewardInfos(this._vo.holidayRewardId, game.TypeSummerActivity.TASK, utils.Handler.create(this, this.getRewardCallback, [this._vo.template.rewards]));
                    }
                }
            };
            HuoDongTask.prototype.getRewardCallback = function (str) {
                this.listBox.dataProvider.replaceAll(GameModels.activitySummer.taskBoxData);
                this.notAttain.visible = false;
                this.btnLingQu.visible = false;
                this.getVipBox.visible = true;
                var rewardArr = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
            };
            return HuoDongTask;
        }(ui.HuoDongTaskSkin));
        activity.HuoDongTask = HuoDongTask;
        __reflect(HuoDongTask.prototype, "view.activity.HuoDongTask", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
