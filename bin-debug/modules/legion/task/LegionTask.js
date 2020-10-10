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
var LegionTask = (function (_super) {
    __extends(LegionTask, _super);
    function LegionTask() {
        return _super.call(this) || this;
    }
    LegionTask.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        // Mediator.getMediator(this).onAdd(this, this.enter);
        // Mediator.getMediator(this).onRemove(this, this.exit);
    };
    LegionTask.prototype.enter = function (data) {
        if (data === void 0) { data = null; }
        this.labDes.visible = GameModels.platform.isPay;
        this.prizeProgress.initializeData(GameModels.achievement.prizeMin, GameModels.achievement.prizeMax, GameModels.achievement.prizes);
        this.prizeProgress.update();
        this.showEverydayView();
        GameModels.achievement.addEventListener(mo.ModelAchievement.CHANG_EVERY_TASK, this.showEverydayView, this);
    };
    LegionTask.prototype.exit = function () {
        this.clearList(this.everydayList);
        egret.Tween.removeTweens(this.everydayList);
        this.removeListenerBoxes();
        GameModels.achievement.removeEventListener(mo.ModelAchievement.CHANG_EVERY_TASK, this.showEverydayView, this);
    };
    LegionTask.prototype.getTaskProgressPos = function () {
        return this.getPosition(this.prizeProgress.prorgessBar);
    };
    LegionTask.prototype.addListenerBoxes = function () {
        var boxes = this.prizeProgress.prizeBoxes;
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBoxClick, this);
        }
    };
    LegionTask.prototype.removeListenerBoxes = function () {
        var boxes = this.prizeProgress.prizeBoxes;
        if (!boxes)
            return;
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].removeEffects();
            boxes[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBoxClick, this);
        }
    };
    LegionTask.prototype.btnBoxClick = function (e) {
        var _this = this;
        if (e.currentTarget.data.state == item.StatePrize.WAIT) {
            if (utils.CheckUtil.checkBagSmelting())
                return;
            var rewards = [];
            var itemArr = e.currentTarget.data.items;
            for (var _i = 0, itemArr_1 = itemArr; _i < itemArr_1.length; _i++) {
                var items = itemArr_1[_i];
                var str = items.id + "_" + items.count;
                rewards.push(str);
            }
            GameModels.achievement.requestQstBox(e.currentTarget.data.template.id, utils.Handler.create(this, function (data) {
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                _this.prizeProgress.update();
            }));
        }
        else {
            mg.alertManager.showAlert(ChestPreviewAlert, true, true, e.currentTarget.data.items, null, null, null, false, false, null, '');
        }
    };
    LegionTask.prototype.receiveCall = function (getReward) {
        if (getReward === void 0) { getReward = false; }
        this.labCount.text = "" + GameModels.achievement.currActiveValue;
        this.prizeProgress.value = GameModels.achievement.prizeProgress;
        this.prizeProgress.update();
        if (getReward) {
            this.everydayList.$dataProvider.source = (GameModels.achievement.taskEveryDayVo);
        }
    };
    LegionTask.prototype.getPosition = function (target, isCenter) {
        if (isCenter === void 0) { isCenter = false; }
        if (target) {
            var point = target.localToGlobal(target.value / target.maximum * target.width, 20);
            return point;
        }
        return null;
    };
    LegionTask.prototype.showEverydayView = function () {
        egret.Tween.removeTweens(this.everydayList);
        this.requestEveryList();
    };
    LegionTask.prototype.requestEveryList = function () {
        var _this = this;
        GameModels.achievement.requestQstList(utils.Handler.create(this, function () {
            if (!_this._taskListData) {
                _this._taskListData = new eui.ArrayCollection(GameModels.achievement.taskEveryDayVo);
            }
            else {
                _this._taskListData.source = GameModels.achievement.taskEveryDayVo;
            }
            _this.everydayList.dataProvider = _this._taskListData;
            _this.everydayList.touchEnabled = true;
            _this.everydayList.touchChildren = true;
            _this.receiveCall();
            _this.addListenerBoxes();
        }));
    };
    return LegionTask;
}(ui.LegionTaskSkin));
__reflect(LegionTask.prototype, "LegionTask");
