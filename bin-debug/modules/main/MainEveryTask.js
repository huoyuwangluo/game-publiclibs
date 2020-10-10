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
    var MainEveryTask = (function (_super) {
        __extends(MainEveryTask, _super);
        function MainEveryTask() {
            return _super.call(this) || this;
        }
        MainEveryTask.prototype.init = function (v) {
            this._parent = v;
            this.taskBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.taskTouchHandler, this);
            this.taskReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.taskTouchHandler, this);
            GameModels.achievement.addEventListener(mo.ModelAchievement.CHANG_EVERY_TASK, this.updateTask, this);
            this.updateTask();
        };
        MainEveryTask.prototype.clear = function () {
            this._currData = null;
            GameModels.achievement.removeEventListener(mo.ModelAchievement.CHANG_EVERY_TASK, this.updateTask, this);
            if (this.taskBack) {
                this.taskBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.taskTouchHandler, this);
                if (this.taskBack.parent) {
                    this.taskBack.parent.removeChild(this.taskBack);
                }
                this.taskBack = null;
            }
            if (this.labTiShi) {
                if (this.labTiShi.parent) {
                    this.labTiShi.parent.removeChild(this.labTiShi);
                }
                this.labTiShi = null;
            }
            if (this.imgtl) {
                if (this.imgtl.parent) {
                    this.imgtl.parent.removeChild(this.imgtl);
                }
                this.imgtl = null;
            }
            if (this.labDes) {
                if (this.labDes.parent) {
                    this.labDes.parent.removeChild(this.labDes);
                }
                this.labDes = null;
            }
            if (this.expBar) {
                if (this.expBar.parent) {
                    this.expBar.parent.removeChild(this.expBar);
                }
                this.expBar = null;
            }
            if (this.labCount) {
                if (this.labCount.parent) {
                    this.labCount.parent.removeChild(this.labCount);
                }
                this.labCount = null;
            }
            if (this.taskReward) {
                this.taskReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.taskTouchHandler, this);
                if (this.taskReward.parent) {
                    this.taskReward.parent.removeChild(this.taskReward);
                }
                this.taskReward = null;
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
        MainEveryTask.prototype.taskTouchHandler = function (e) {
            if (e.currentTarget == this.taskReward) {
                if (this._currData) {
                    mg.alertManager.showAlert(ChestPreviewAlert, true, true, this._currData.items, null, null, null, false, false, null, '');
                }
            }
            else {
                mg.uiManager.show(dialog.legion.LegionTaskMain, { tabIndex: 1 });
            }
        };
        MainEveryTask.prototype.add = function () {
            if (!this.parent) {
                this._parent.addChild(this);
            }
        };
        MainEveryTask.prototype.remove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        MainEveryTask.prototype.updateTask = function () {
            this.hideTaskEffect();
            var data = GameModels.achievement.prizes;
            data.sort(function (a, b) {
                return a.mark - b.mark;
            });
            var currValue = GameModels.achievement.currProgress;
            this._currData = null;
            for (var i = 0; i < data.length; i++) {
                if (data[i].state == item.StatePrize.CLOSE || data[i].state == item.StatePrize.WAIT) {
                    this._currData = data[i];
                    break;
                }
            }
            if (this._currData) {
                switch (this._currData.state) {
                    case item.StatePrize.CLOSE:
                        this.taskReward.source = "exploreBox_json.img_" + item.TypePrize.getName(this._currData.type) + "_box_close";
                        break;
                    case item.StatePrize.WAIT:
                        this.taskReward.source = "exploreBox_json.img_" + item.TypePrize.getName(this._currData.type) + "_box_wait";
                        break;
                    case item.StatePrize.OPEN:
                        this.taskReward.source = "exploreBox_json.img_" + item.TypePrize.getName(this._currData.type) + "_box_open";
                        break;
                }
                this.expBar.maximum = this._currData.mark;
                this.expBar.value = currValue > this._currData.mark ? this._currData.mark : currValue;
                this.labCount.text = (currValue > this._currData.mark ? this._currData.mark : currValue) + "/" + this._currData.mark;
                var taskArrVo = GameModels.achievement.taskEveryDayVo;
                var isShowEff = false;
                for (var i = 0; i < taskArrVo.length; i++) {
                    if (taskArrVo[i].state == 2) {
                        isShowEff = true;
                        break;
                    }
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i].state == 2) {
                        isShowEff = true;
                        break;
                    }
                }
                if (isShowEff)
                    this.showTaskEffect();
            }
            else {
                this.remove();
                this.clear();
            }
        };
        MainEveryTask.prototype.showTaskEffect = function () {
            this.labTiShi.visible = true;
            if (!this._taskEffect) {
                this._taskEffect = utils.ObjectPool.from(s.AnimationSprite);
                this._taskEffect.resId = "31019";
            }
            this._taskEffect.x = this.width / 2;
            this._taskEffect.y = this.height / 2;
            this.addChildAt(this._taskEffect, 1);
            this._taskEffect.play();
        };
        MainEveryTask.prototype.hideTaskEffect = function () {
            this.labTiShi.visible = false;
            if (this._taskEffect) {
                this._taskEffect.stop();
                if (this._taskEffect.parent) {
                    this._taskEffect.parent.removeChild(this._taskEffect);
                }
                utils.ObjectPool.to(this._taskEffect, true);
                this._taskEffect = null;
            }
        };
        return MainEveryTask;
    }(ui.MainEveryTaskSkin));
    main.MainEveryTask = MainEveryTask;
    __reflect(MainEveryTask.prototype, "main.MainEveryTask");
})(main || (main = {}));
