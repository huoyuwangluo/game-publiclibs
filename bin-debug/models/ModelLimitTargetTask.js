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
    var ModelLimitTargetTask = (function (_super) {
        __extends(ModelLimitTargetTask, _super);
        function ModelLimitTargetTask() {
            return _super.call(this) || this;
        }
        ModelLimitTargetTask.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._curLimitTaskId = 0;
            this._isShowView = 0;
            this._limitTaskVo = [];
            this.requestLimitTargetInfo();
            n.net.onRoute(n.MessageMap.G2C_LIMITTARGET_NOTIFYTASKINFO, utils.Handler.create(this, this.updatanotifyTaskInfo, null, false));
            n.net.onRoute(n.MessageMap.G2C_LIMITTARGET_GETINFO, utils.Handler.create(this, this.notifyTaskInfo, null, false));
        };
        Object.defineProperty(ModelLimitTargetTask.prototype, "templates", {
            get: function () {
                return this._templates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLimitTargetTask.prototype, "nextLimitTargetTemplates", {
            get: function () {
                if (this._templates && this._templates.nextId > 0) {
                    return Templates.getTemplateById(templates.Map.LIMITTARGET, this._templates.nextId);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLimitTargetTask.prototype, "curLimitTaskId", {
            get: function () {
                return this._curLimitTaskId;
            },
            enumerable: true,
            configurable: true
        });
        ModelLimitTargetTask.prototype.updatanotifyTaskInfo = function (data) {
            this.initLimitTargetInfo(data.List);
            this.dispatchEventWith(ModelLimitTargetTask.CHANGE_LIMITTARGET_INFO);
            GameModels.state.updateState(GameRedState.ZHUGELIANG);
        };
        Object.defineProperty(ModelLimitTargetTask.prototype, "isShowView", {
            get: function () {
                return this._isShowView;
            },
            set: function (v) {
                this._isShowView = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelLimitTargetTask.prototype.notifyTaskInfo = function (data) {
            this._isShowView = 1;
            this._curLimitTaskId = data.CurLimitTargetId;
            this._templates = Templates.getTemplateById(templates.Map.LIMITTARGET, this._curLimitTaskId);
            this.initLimitTargetInfo(data.List);
            if (!app.gameContext.manager.gameCurrent)
                return;
            if (!TypeGame.isMainGame(app.gameContext.manager.gameCurrent.type))
                return;
            this._isShowView = 2;
            mg.uiManager.show(MainPresentZhuGeLiangAlter, true);
        };
        ModelLimitTargetTask.prototype.initLimitTargetInfo = function (data) {
            this._limitTaskVo = [];
            for (var i = 0; i < data.length; i++) {
                var taskVo = vo.fromPool(vo.LimitTargetVo);
                taskVo.decode(data[i]);
                this._limitTaskVo.push(taskVo);
            }
        };
        ModelLimitTargetTask.prototype.updataLimitTargetInfo = function (data) {
            if (this._limitTaskVo) {
                for (var i = 0; i < this._limitTaskVo.length; i++) {
                    if (data.TaskId == this._limitTaskVo[i].taskId) {
                        this._limitTaskVo[i].state = data.Status;
                        this._limitTaskVo[i].state = data.Status;
                        this._limitTaskVo[i].state = data.Status;
                        this._limitTaskVo[i].state = data.Status;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelLimitTargetTask.prototype, "limitTaskVo", {
            get: function () {
                this._limitTaskVo.sort(function (a, b) {
                    return a.older - b.older;
                });
                return this._limitTaskVo;
            },
            enumerable: true,
            configurable: true
        });
        /**请求限时任务信息*/
        ModelLimitTargetTask.prototype.requestLimitTargetInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_LimitTarget_GetInfo);
            this.request(n.MessageMap.C2G_LIMITTARGET_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this._curLimitTaskId = data.CurLimitTargetId;
                _this._templates = Templates.getTemplateById(templates.Map.LIMITTARGET, _this._curLimitTaskId);
                _this.initLimitTargetInfo(data.List);
                _this.dispatchEventWith(ModelLimitTargetTask.LIMITTARGET_GET_SAMLL_REWARD);
                GameModels.state.updateState(GameRedState.ZHUGELIANG);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**领取限时任务条件小奖励*/
        ModelLimitTargetTask.prototype.requestLimitTargetGetTaskSamllReward = function (id, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_LimitTarget_GetTaskReward);
            msg.TaskId = id;
            this.request(n.MessageMap.C2G_LIMITTARGET_GETTASKREWARD, msg, utils.Handler.create(this, function (data) {
                var temp = Templates.getTemplateById(templates.Map.LIMITTARGETTASK, data.TaskInfo.TaskId);
                if (temp) {
                    _this.requestLimitTargetInfo();
                    if (GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_14) <= 0 && temp.id == 101) {
                        mg.StoryManager.instance.startBigStory(134, _this, null);
                        GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_14);
                    }
                    if (complete)
                        complete.runWith(data);
                }
            }));
        };
        ModelLimitTargetTask.prototype.checkPedPoint = function () {
            if (this._curLimitTaskId <= 0 || !this._templates)
                return false;
            if (this._limitTaskVo) {
                for (var i = 0; i < this._limitTaskVo.length; i++) {
                    if (this._limitTaskVo[i].state == 1) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelLimitTargetTask.LIMITTARGET_GET_SAMLL_REWARD = "LIMITTARGET_GET_SAMLL_REWARD";
        ModelLimitTargetTask.CHANGE_LIMITTARGET_INFO = "CHANGE_LIMITTARGET_INFO";
        return ModelLimitTargetTask;
    }(mo.ModelBase));
    mo.ModelLimitTargetTask = ModelLimitTargetTask;
    __reflect(ModelLimitTargetTask.prototype, "mo.ModelLimitTargetTask");
})(mo || (mo = {}));
