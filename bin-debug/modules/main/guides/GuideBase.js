var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var main;
(function (main) {
    var GuideBase = (function () {
        function GuideBase() {
            this.autoRecover = true;
            this.toPoolTime = 0;
            this._curRect = new egret.Rectangle();
        }
        GuideBase.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        GuideBase.prototype.reset = function () {
            this.offChange();
            this.offEnd();
            this.autoRecover = true;
            this._taskHot = null;
            this._curComponent = null;
        };
        GuideBase.prototype.onChange = function (caller, method) {
            this.offChange();
            this._changeHandler = utils.Handler.create(caller, method, null, false);
        };
        GuideBase.prototype.offChange = function () {
            if (this._changeHandler) {
                this._changeHandler.recover();
                this._changeHandler = null;
            }
        };
        GuideBase.prototype.onEnd = function (caller, method) {
            this.offEnd();
            this._endHandler = utils.Handler.create(caller, method, null, false);
        };
        GuideBase.prototype.offEnd = function () {
            if (this._endHandler) {
                this._endHandler.recover();
                this._endHandler = null;
            }
        };
        GuideBase.prototype.start = function (time) {
            if (time === void 0) { time = 0; }
            this._gameType = app.gameContext.gameCurrent ? app.gameContext.gameCurrent.type : undefined;
            this._taskHot = mg.uiManager.getView(main.MainUIView).taskGroup;
            mg.uiManager.addEventListener(egret.Event.CHANGE, this.uiChangeHandler, this);
            if (GameModels.task.hasTask)
                GameModels.task.curTask.addEventListener(egret.Event.CHANGE, this.taskChangeHandler, this);
            mg.StoryManager.instance.addEventListener(mg.StoryManager.SHOW_OR_HIED_STORY, this.alertUpDate, this);
            mg.alertManager.addEventListener(mg.AlertManager.SHOW_OR_HIED_ALERT, this.alertUpDate, this);
            mg.TipManager.instance.addEventListener(mg.TipManager.SHOW_OR_HIED_TIP, this.alertUpDate, this);
            copy.CopyWinInstance.instance.addEventListener(copy.CopyWinInstance.SHOW_OR_HIED_WINVIEW, this.alertUpDate, this);
            copy.CopyFailInstance.instance.addEventListener(copy.CopyFailInstance.SHOW_OR_HIED_FAILVIEW, this.alertUpDate, this);
            GameModels.chapter.onStateChange(this, this.chapterStateChange);
            app.gameContext.manager.onGameChange(this, this.gameChangeHandler);
            this.update();
            if (time > 0) {
                utils.timer.once(time, this, this.end);
            }
        };
        GuideBase.prototype.stop = function () {
            utils.timer.clear(this, this.end);
            app.gameContext.manager.offGameChange(this, this.gameChangeHandler);
            if (GameModels.task.hasTask)
                GameModels.task.curTask.removeEventListener(egret.Event.CHANGE, this.taskChangeHandler, this);
            mg.alertManager.removeEventListener(mg.AlertManager.SHOW_OR_HIED_ALERT, this.alertUpDate, this);
            mg.TipManager.instance.removeEventListener(mg.TipManager.SHOW_OR_HIED_TIP, this.alertUpDate, this);
            mg.StoryManager.instance.removeEventListener(mg.StoryManager.SHOW_OR_HIED_STORY, this.alertUpDate, this);
            GameModels.chapter.offStateChange(this, this.chapterStateChange);
            mg.uiManager.removeEventListener(egret.Event.CHANGE, this.uiChangeHandler, this);
            copy.CopyWinInstance.instance.removeEventListener(copy.CopyWinInstance.SHOW_OR_HIED_WINVIEW, this.alertUpDate, this);
            copy.CopyFailInstance.instance.removeEventListener(copy.CopyFailInstance.SHOW_OR_HIED_FAILVIEW, this.uiChangeHandler, this);
            if (this._curComponent) {
                this._curComponent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.componentTapHandler, this);
                this._curComponent = null;
            }
            this._curRect.setTo(0, 0, 0, 0);
        };
        GuideBase.prototype.end = function () {
            if (this._endHandler) {
                this._endHandler.run();
            }
        };
        GuideBase.prototype.update = function () {
        };
        GuideBase.prototype.alertUpDate = function () {
            if (GameModels.guide.guideTypeClinte == 0 && GameModels.guide.guideType == 0 && GameModels.task.hasTask && GameModels.task.curTask.template.isAutoGuide == 2 && !GameModels.task.curTask.canSubmit) {
                if (this._endHandler) {
                    this._endHandler.run();
                }
                return;
            }
            var alert = mg.alertManager.getInstance(dialog.hongYanCiHun.AchievementHongYanCiHun);
            if (mg.alertManager.current == alert)
                return;
            var tip = mg.TipManager.instance.reciveTip(egret.getQualifiedClassName(tips.PropTip));
            if (mg.TipManager.instance.current == tip)
                return;
            this.update();
        };
        GuideBase.prototype.updateComponent = function (component, tip, direct) {
            if (tip === void 0) { tip = null; }
            if (direct === void 0) { direct = -1; }
            if (this._curComponent != component) {
                if (this._curComponent) {
                    this._curComponent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.componentTapHandler, this);
                }
                this._curComponent = component;
                this._tip = tip;
                this._direct = direct;
                if (this._curComponent) {
                    this._curComponent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.componentTapHandler, this);
                    var point = this._curComponent.localToGlobal();
                    if (this._curComponent instanceof s.AnimationSprite) {
                        this._curRect.setTo(point.x, point.y, 0, 0);
                    }
                    else {
                        this._curRect.setTo(point.x, point.y, this._curComponent.width, this._curComponent.height);
                    }
                }
                if (this._changeHandler) {
                    this._changeHandler.run();
                }
            }
        };
        GuideBase.prototype.uiChangeHandler = function () {
            this.alertUpDate();
        };
        GuideBase.prototype.gameChangeHandler = function () {
            this._gameType = app.gameContext.gameCurrent.type;
            this.alertUpDate();
        };
        GuideBase.prototype.componentTapHandler = function () {
            this.alertUpDate();
        };
        GuideBase.prototype.taskChangeHandler = function () {
            this.alertUpDate();
            this.checkCommitTask();
        };
        GuideBase.prototype.chapterStateChange = function () {
            //this.update();
        };
        GuideBase.prototype.checkCommitTask = function () {
        };
        Object.defineProperty(GuideBase.prototype, "component", {
            get: function () {
                return this._curComponent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuideBase.prototype, "componentRect", {
            get: function () {
                return this._curRect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuideBase.prototype, "tip", {
            get: function () {
                return this._tip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuideBase.prototype, "direct", {
            get: function () {
                return this._direct;
            },
            enumerable: true,
            configurable: true
        });
        return GuideBase;
    }());
    main.GuideBase = GuideBase;
    __reflect(GuideBase.prototype, "main.GuideBase", ["utils.IPool"]);
})(main || (main = {}));
