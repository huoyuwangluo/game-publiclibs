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
var mo;
(function (mo) {
    var ModelTask = (function (_super) {
        __extends(ModelTask, _super);
        function ModelTask() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelTask.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._handlers = new utils.Handlers(false);
            this.onRoute(n.MessageMap.G2C_TASK_UPDATE, utils.Handler.create(this, function (data) {
                //logger.log('更新任务进度....');
                this.curTask.updateCurrent(data.Curr.Progress);
            }, null, false));
        };
        ModelTask.prototype.initializeData = function (data) {
            if (data.TaskId == 0) {
                if (this._endHandler) {
                    this._endHandler.run();
                }
                this.dispatchEventWith('INITIALIZE_DATA');
                return;
            }
            if (!this._curTask)
                this._curTask = new vo.TaskVO();
            this.updateCurTask(data.TaskId);
            this.curTask.updateCurrent(data.Progress);
            this.dispatchEventWith('INITIALIZE_DATA');
        };
        Object.defineProperty(ModelTask.prototype, "isFirstEnterGame", {
            get: function () {
                return this.curTask.id == 100010; //GameModels.user.player.getProperty(TypeProperty.Exp) == 0;
            },
            enumerable: true,
            configurable: true
        });
        ModelTask.prototype.updateCurTask = function (id) {
            if (this._curTask.template) {
                this._lastTaskDoneTip = this._curTask.template.finished;
            }
            this._curTask.initialize(Templates.getTemplateById(templates.Map.TASKNEWBIE, id));
        };
        Object.defineProperty(ModelTask.prototype, "isTaskBegin", {
            get: function () {
                // return this.hasTask ? this._curTask.isBegin : false;
                return this.hasTask && (this._curTask.id == 100010 && !this._curTask.canSubmit) ? true : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTask.prototype, "curTask", {
            get: function () {
                return this._curTask;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTask.prototype, "hasTask", {
            get: function () {
                return !!this._curTask;
            },
            enumerable: true,
            configurable: true
        });
        ModelTask.prototype.requestSubmit = function (caller, method) {
            var _this = this;
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            var reuestData = n.MessagePool.from(n.C2G_Task_Submit);
            reuestData.TaskId = this.curTask.id;
            logger.log("提交任务:", reuestData.TaskId);
            if (this.curTask.id == 100110) {
                logger.log("1111111111111111");
            }
            this.request(n.MessageMap.C2G_TASK_SUBMIT, reuestData, utils.Handler.create(this, function (data) {
                // mg.soundManager.playSound('UI_finishtask');
                logger.log('任务提交响应....', data.Next.TaskId);
                if (data.Next.TaskId == 0) {
                    _this._curTask = null;
                    if (method)
                        method.call(caller);
                    if (_this._endHandler) {
                        _this._endHandler.run();
                    }
                    return;
                }
                _this.updateCurTask(data.Next.TaskId);
                _this.curTask.updateCurrent(data.Next.Progress);
                /**招募贾诩对话 */
                if (GameModels.task.curTask.id == mo.ModelTask.getPet) {
                    mg.StoryManager.instance.startBigStory(123, _this, null);
                }
                /**高级10连抽对话 */
                if (GameModels.task.curTask.id == mo.ModelTask.tenLianchong) {
                    mg.StoryManager.instance.startBigStory(113, _this, null);
                }
                /**回营对话 */
                if (GameModels.task.curTask.id == mo.ModelTask.huiyingStoryTalk) {
                    mg.StoryManager.instance.startBigStory(120, _this, null);
                }
                /**红将上阵对话 */
                if (GameModels.task.curTask.id == mo.ModelTask.redPetUp) {
                    mg.StoryManager.instance.startBigStory(130, _this, null);
                }
                /**解锁红颜对话 */
                if (GameModels.task.curTask.id == mo.ModelTask.wenguanSongHongYanEnd) {
                    mg.StoryManager.instance.startBigStory(112, _this, _this.storyHongYanEndCallFun1);
                }
                /**偶遇仙人开启回调 */
                if (GameModels.task.curTask.id == mo.ModelTask.ouyuxianrenOpenId) {
                    if (_this._ouYuXianRenHandler) {
                        _this._ouYuXianRenHandler.run();
                    }
                }
                /**客户端换装引导检查是否有装备可换 */
                if (GameModels.task.curTask.type == TypeTask.WARE) {
                    if (!GameModels.equip.checkEqiupRedPoint(GameModels.task.curTask.template.functionParams)) {
                        GameModels.task.curTask.clientTaskType = true;
                    }
                }
                _this.handlersRun();
                // if (data.Next.TaskId == 100500 && platform.sdk && platform.sdk.type == platform.WB && platform.sdk.qua && platform.sdk.qua.app == "QQLive") {
                // 	mg.alertManager.showAlert(WanBaAiWanDialog, true, true, null);
                // }
                if (method)
                    method.call(caller);
            }));
        };
        /**主线任务改变的回调 */
        ModelTask.prototype.handlersRun = function () {
            if (this._handlers)
                this._handlers.run();
        };
        /**解锁红颜对话完成回调 */
        ModelTask.prototype.storyHongYanEndCallFun1 = function () {
            if (this._wenguanSongHongYanHandler) {
                this._wenguanSongHongYanHandler.run();
            }
        };
        ModelTask.prototype.onChange = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._handlers.add(caller, method, args);
        };
        ModelTask.prototype.offChange = function (caller, method) {
            this._handlers.remove(caller, method);
        };
        /**解锁红颜监听 */
        ModelTask.prototype.onWenGuanSongHongYan = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offWenGuanSongHongYan();
            this._wenguanSongHongYanHandler = utils.Handler.create(caller, method, args, false);
        };
        ModelTask.prototype.offWenGuanSongHongYan = function () {
            if (this._wenguanSongHongYanHandler) {
                this._wenguanSongHongYanHandler.recover();
                this._wenguanSongHongYanHandler = null;
            }
        };
        /**开启偶遇仙人监听 */
        ModelTask.prototype.onOuYuXianRen = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offOuYuXianRen();
            this._ouYuXianRenHandler = utils.Handler.create(caller, method, args, false);
        };
        ModelTask.prototype.offOuYuXianRen = function () {
            if (this._ouYuXianRenHandler) {
                this._ouYuXianRenHandler.recover();
                this._ouYuXianRenHandler = null;
            }
        };
        ModelTask.prototype.onEnd = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offEnd();
            this._endHandler = utils.Handler.create(caller, method, args, false);
        };
        ModelTask.prototype.offEnd = function () {
            if (this._endHandler) {
                this._endHandler.recover();
                this._endHandler = null;
            }
        };
        Object.defineProperty(ModelTask.prototype, "lastTaskDoneTip", {
            get: function () {
                return this._lastTaskDoneTip;
            },
            enumerable: true,
            configurable: true
        });
        ModelTask.ouyuxianrenOpenId = 100220;
        ModelTask.huiyingStoryTalk = 100020;
        ModelTask.redPetUp = 100150;
        ModelTask.wenguanSongHongYanStart = 100010;
        ModelTask.wenguanSongHongYanEnd = 100210;
        ModelTask.tenLianchong = 100141;
        ModelTask.getPet = 100100;
        return ModelTask;
    }(mo.ModelBase));
    mo.ModelTask = ModelTask;
    __reflect(ModelTask.prototype, "mo.ModelTask");
})(mo || (mo = {}));
