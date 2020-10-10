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
    var ModelWenGuanTask = (function (_super) {
        __extends(ModelWenGuanTask, _super);
        function ModelWenGuanTask() {
            return _super.call(this) || this;
        }
        ModelWenGuanTask.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._curWenGuanId = 0;
            this._wenGuanTaskVo = [];
            this._isOpenWenGuanFight = false;
            this._wenguanChapter = 0;
            this.requestWenGuanInfo();
            n.net.onRoute(n.MessageMap.G2C_WENGUAN_NOTIFYTASKINFO, utils.Handler.create(this, this.notifyTaskInfo, null, false));
        };
        Object.defineProperty(ModelWenGuanTask.prototype, "wenguanChapter", {
            get: function () {
                return this._wenguanChapter;
            },
            set: function (v) {
                this._wenguanChapter = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWenGuanTask.prototype, "isOpenWenGuanFight", {
            get: function () {
                return this._isOpenWenGuanFight;
            },
            set: function (v) {
                this._isOpenWenGuanFight = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelWenGuanTask.prototype.notifyTaskInfo = function (data) {
            this.initWenGuanInfo(data.List);
            this.dispatchEventWith(ModelWenGuanTask.CHANGE_WENGUANTASK_INFO);
            GameModels.state.updateState(GameRedState.GUANZHI_WENGUAN);
            GameModels.state.updateState(GameRedState.GUANZHI1);
            if (GameModels.task.hasTask) {
                GameModels.task.handlersRun();
            }
        };
        ModelWenGuanTask.prototype.initWenGuanInfo = function (data) {
            this._wenGuanTaskVo = [];
            for (var i = 0; i < data.length; i++) {
                var taskVo = vo.fromPool(vo.WenGuanTaskVO);
                taskVo.decode(data[i]);
                this._wenGuanTaskVo.push(taskVo);
            }
        };
        ModelWenGuanTask.prototype.updataWenGuanInfo = function (data) {
            if (this._wenGuanTaskVo) {
                for (var i = 0; i < this._wenGuanTaskVo.length; i++) {
                    if (data.TaskId == this._wenGuanTaskVo[i].taskId) {
                        this._wenGuanTaskVo[i].state = data.Status;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelWenGuanTask.prototype, "curWenGuanTemplates", {
            get: function () {
                return this._templates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWenGuanTask.prototype, "nextWenGuanTemplates", {
            get: function () {
                if (this._templates && this._templates.nextId > 0) {
                    return Templates.getTemplateById(templates.Map.WENGUAN, this._templates.nextId);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWenGuanTask.prototype, "curWenGuanId", {
            get: function () {
                return this._curWenGuanId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWenGuanTask.prototype, "curWenGuanMaxLv", {
            get: function () {
                if (!this.curWenGuanTemplates)
                    return;
                var tempArr = [];
                var wenGuanArr = Templates.getList(templates.Map.WENGUAN);
                for (var i = 0; i < wenGuanArr.length; i++) {
                    if (wenGuanArr[i].step == this.curWenGuanTemplates.step) {
                        tempArr.push(wenGuanArr[i]);
                    }
                }
                tempArr.sort(function (a, b) {
                    return b.step - a.step;
                });
                return tempArr[0].step;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWenGuanTask.prototype, "wenGuanTaskVo", {
            get: function () {
                this._wenGuanTaskVo.sort(function (a, b) {
                    return a.templates.order - b.templates.order;
                });
                return this._wenGuanTaskVo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWenGuanTask.prototype, "tatolValue", {
            get: function () {
                return this._wenGuanTaskVo ? this._wenGuanTaskVo.length : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWenGuanTask.prototype, "rewardValue", {
            get: function () {
                var count = 0;
                if (this._wenGuanTaskVo) {
                    for (var i = 0; i < this._wenGuanTaskVo.length; i++) {
                        if (this._wenGuanTaskVo[i].state >= 1) {
                            count = count + 1;
                        }
                    }
                }
                return count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWenGuanTask.prototype, "finshValue", {
            get: function () {
                var count = 0;
                if (this._wenGuanTaskVo) {
                    for (var i = 0; i < this._wenGuanTaskVo.length; i++) {
                        if (this._wenGuanTaskVo[i].state == 2) {
                            count = count + 1;
                        }
                    }
                }
                return count;
            },
            enumerable: true,
            configurable: true
        });
        ModelWenGuanTask.prototype.getIdenticalStepTemps = function (step) {
            var wenGuan = [];
            var wenGuanTemps = Templates.getList(templates.Map.WENGUAN);
            for (var _i = 0, wenGuanTemps_1 = wenGuanTemps; _i < wenGuanTemps_1.length; _i++) {
                var info = wenGuanTemps_1[_i];
                if (info.step == step) {
                    wenGuan.push(info);
                }
            }
            return wenGuan;
        };
        /**请求文官信息*/
        ModelWenGuanTask.prototype.requestWenGuanInfo = function (complete) {
            var msg = n.MessagePool.from(n.C2G_WenGuan_GetInfo);
            this.request(n.MessageMap.C2G_WENGUAN_GETINFO, msg, utils.Handler.create(this, function (data) {
                this._curWenGuanId = data.CurWenGuanId;
                this._templates = Templates.getTemplateById(templates.Map.WENGUAN, this._curWenGuanId);
                this.initWenGuanInfo(data.List);
                GameModels.state.updateState(GameRedState.GUANZHI_WENGUAN);
                GameModels.state.updateState(GameRedState.GUANZHI1);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**领取文官条件奖励*/
        ModelWenGuanTask.prototype.requestWenGuanGetTaskSamllReward = function (id, complete) {
            var msg = n.MessagePool.from(n.C2G_WenGuan_GetTaskReward);
            msg.TaskId = id;
            this.request(n.MessageMap.C2G_WENGUAN_GETTASKREWARD, msg, utils.Handler.create(this, function (data) {
                this.updataWenGuanInfo(data.TaskInfo);
                this.dispatchEventWith(ModelWenGuanTask.WENTASK_GET_SAMLL_REWARD);
                GameModels.state.updateState(GameRedState.GUANZHI_WENGUAN);
                GameModels.state.updateState(GameRedState.GUANZHI1);
                if (GameModels.task.hasTask) {
                    GameModels.task.handlersRun();
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**领取文官领奖并升官*/
        ModelWenGuanTask.prototype.requestWenGuanGetTaskBigReward = function (complete) {
            var msg = n.MessagePool.from(n.C2G_WenGuan_GetWenGuanReward);
            this.request(n.MessageMap.C2G_WENGUAN_GETWENGUANREWARD, msg, utils.Handler.create(this, function (data) {
                if (this._curWenGuanId != data.CurWenGuanId) {
                    this._curWenGuanId = data.CurWenGuanId;
                    this._templates = Templates.getTemplateById(templates.Map.WENGUAN, this._curWenGuanId);
                    // mg.alertManager.showAlert(achievement.AchievementShengZhiTip, true, true, this._templates);
                }
                this.initWenGuanInfo(data.List);
                this.dispatchEventWith(ModelWenGuanTask.WENGUAN_UPDATA);
                GameModels.state.updateState(GameRedState.GUANZHI_WENGUAN);
                GameModels.state.updateState(GameRedState.GUANZHI1);
                if (GameModels.task.hasTask) {
                    GameModels.task.handlersRun();
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelWenGuanTask.prototype.checkWenGuanUp = function () {
            var isReceive = this.tatolValue > 0 && this.rewardValue == this.tatolValue;
            if (isReceive)
                return true;
        };
        ModelWenGuanTask.prototype.checkWenGuan = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.guanzhi, 0))
                return false;
            var isReceive = this.tatolValue > 0 && this.finshValue == this.tatolValue;
            if (isReceive)
                return true;
            if (this._wenGuanTaskVo) {
                for (var i = 0; i < this._wenGuanTaskVo.length; i++) {
                    if (this._wenGuanTaskVo[i].state == 1) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelWenGuanTask.WENTASK_GET_SAMLL_REWARD = "WENTASK_GET_SAMLL_REWARD";
        ModelWenGuanTask.CHANGE_WENGUANTASK_INFO = "CHANGE_WENGUANTASK_INFO";
        ModelWenGuanTask.WENGUAN_UPDATA = "WENGUAN_UPDATA";
        return ModelWenGuanTask;
    }(mo.ModelBase));
    mo.ModelWenGuanTask = ModelWenGuanTask;
    __reflect(ModelWenGuanTask.prototype, "mo.ModelWenGuanTask");
})(mo || (mo = {}));
