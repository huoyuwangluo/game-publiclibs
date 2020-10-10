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
    var ModelSevenDayTask = (function (_super) {
        __extends(ModelSevenDayTask, _super);
        function ModelSevenDayTask() {
            return _super.call(this) || this;
        }
        ModelSevenDayTask.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._nowDay = 0;
            this._finishTaskCount = 0;
            this._stepRewardList = [];
            this._sevenDayList = [];
            this.requesSevenDayTargetInfo();
        };
        ModelSevenDayTask.prototype.initSevenDayTargetInfo = function (data) {
            this._sevenDayList = [];
            for (var i = 0; i < data.length; i++) {
                var taskVo = vo.fromPool(vo.SevenDayVo);
                taskVo.decode(data[i]);
                this._sevenDayList.push(taskVo);
            }
        };
        ModelSevenDayTask.prototype.updataSevenDayTargetInfo = function (day, data) {
            if (this._sevenDayList) {
                for (var i = 0; i < this._sevenDayList.length; i++) {
                    if (day == this._sevenDayList[i].day) {
                        for (var j = 0; j < this._sevenDayList[i].taskList.length; j++) {
                            if (this._sevenDayList[i].taskList[j].id == data.CfgId) {
                                this._sevenDayList[i].taskList[j].parm1 = data.Param1;
                                this._sevenDayList[i].taskList[j].parm2 = data.Param2;
                                this._sevenDayList[i].taskList[j].status = data.Status;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelSevenDayTask.prototype, "sevenDayList", {
            get: function () {
                return this._sevenDayList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSevenDayTask.prototype, "nowDay", {
            get: function () {
                return this._nowDay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSevenDayTask.prototype, "finishTaskCount", {
            get: function () {
                return this._finishTaskCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSevenDayTask.prototype, "stepRewardList", {
            get: function () {
                return this._stepRewardList;
            },
            enumerable: true,
            configurable: true
        });
        /**请求限时任务信息*/
        ModelSevenDayTask.prototype.requesSevenDayTargetInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_SevenDay_GetInfo);
            this.request(n.MessageMap.C2G_SEVENDAY_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this._nowDay = data.Day;
                _this._finishTaskCount = data.FinishTargetCount;
                _this._stepRewardList = data.StepRewardList.concat();
                _this.initSevenDayTargetInfo(data.DayDataList);
                _this.dispatchEventWith(mo.ModelSevenDayTask.CHANGE_TASK_INFO);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //领取目标奖励
        ModelSevenDayTask.prototype.requestSevenDayGetTaskReward = function (day, id, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_SevenDay_GetTargetReward);
            msg.Day = day;
            msg.TargetCfgId = id;
            this.request(n.MessageMap.C2G_SEVENDAY_GETTARGETREWARD, msg, utils.Handler.create(this, function (data) {
                _this._finishTaskCount = data.FinishTargetCount;
                _this.updataSevenDayTargetInfo(data.Day, data.TargetInfo);
                GameModels.state.updateState(GameRedState.MAIN_SEVENDAY);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //领取活跃宝箱奖励
        ModelSevenDayTask.prototype.requestSevenDayGetStepReward = function (id, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_SevenDay_GetStepReward);
            msg.RewardId = id;
            this.request(n.MessageMap.C2G_SEVENDAY_GETSTEPREWARD, msg, utils.Handler.create(this, function (data) {
                _this._stepRewardList = data.StepRewardList.concat();
                GameModels.state.updateState(GameRedState.MAIN_SEVENDAY);
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelSevenDayTask.prototype.getTaskVoBuyDayAndType = function (day, type) {
            var taskVoArr = [];
            for (var i = 0; i < this._sevenDayList.length; i++) {
                if (day == this._sevenDayList[i].day) {
                    for (var j = 0; j < this._sevenDayList[i].taskList.length; j++) {
                        if (this._sevenDayList[i].taskList[j].type == type) {
                            taskVoArr.push(this._sevenDayList[i].taskList[j]);
                        }
                    }
                }
            }
            taskVoArr.sort(function (a, b) {
                return a.older - b.older;
            });
            return taskVoArr;
        };
        ModelSevenDayTask.prototype.getNameBuyDayAndType = function (day, type) {
            var strName = "";
            for (var i = 0; i < this._sevenDayList.length; i++) {
                if (day == this._sevenDayList[i].day) {
                    for (var j = 0; j < this._sevenDayList[i].taskList.length; j++) {
                        if (this._sevenDayList[i].taskList[j].type == type) {
                            return this._sevenDayList[i].taskList[j].template.name;
                        }
                    }
                }
            }
            return strName;
        };
        ModelSevenDayTask.prototype.getHashRedPointBuyDay = function (day) {
            if (this._nowDay < day)
                return false;
            if (this._sevenDayList) {
                for (var i = 0; i < this._sevenDayList.length; i++) {
                    if (day == this._sevenDayList[i].day) {
                        for (var j = 0; j < this._sevenDayList[i].taskList.length; j++) {
                            if (this._sevenDayList[i].taskList[j].tasktype == 3) {
                                if (this._sevenDayList[i].taskList[j].parm1Target <= 0 && this._sevenDayList[i].taskList[j].status == 1) {
                                    return true;
                                }
                            }
                            else {
                                if (this._sevenDayList[i].taskList[j].status == 1) {
                                    return true;
                                }
                            }
                        }
                        break;
                    }
                }
            }
            return false;
        };
        ModelSevenDayTask.prototype.getHashRedPointBuyTable = function (day, type) {
            if (this._sevenDayList) {
                for (var i = 0; i < this._sevenDayList.length; i++) {
                    if (day == this._sevenDayList[i].day) {
                        for (var j = 0; j < this._sevenDayList[i].taskList.length; j++) {
                            if (this._sevenDayList[i].taskList[j].type == type) {
                                if (this._sevenDayList[i].taskList[j].tasktype == 3) {
                                    if (this._sevenDayList[i].taskList[j].parm1Target <= 0 && this._sevenDayList[i].taskList[j].status == 1) {
                                        return true;
                                    }
                                }
                                else {
                                    if (this._sevenDayList[i].taskList[j].status == 1) {
                                        return true;
                                    }
                                }
                            }
                        }
                        break;
                    }
                }
            }
            return false;
        };
        ModelSevenDayTask.CHANGE_TASK_INFO = "CHANGE_TASK_INFO";
        return ModelSevenDayTask;
    }(mo.ModelBase));
    mo.ModelSevenDayTask = ModelSevenDayTask;
    __reflect(ModelSevenDayTask.prototype, "mo.ModelSevenDayTask");
})(mo || (mo = {}));
