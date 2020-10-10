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
    var ModelMingJiangTask = (function (_super) {
        __extends(ModelMingJiangTask, _super);
        function ModelMingJiangTask() {
            return _super.call(this) || this;
        }
        ModelMingJiangTask.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._refreshTime = 0;
            this._mingjiangTaskVoArr = [];
            this._isOpenView = false;
            this._petId = 0;
            this._petName = "";
            this.getTaskInfo();
            n.net.onRoute(n.MessageMap.NOTIFYGENERALTASKINFO, utils.Handler.create(this, this.updataTask, null, false));
        };
        Object.defineProperty(ModelMingJiangTask.prototype, "isOpenView", {
            /**是否打开武魂塔界面 */
            get: function () {
                return this._isOpenView;
            },
            set: function (value) {
                this._isOpenView = value;
                GameModels.state.updateState(GameRedState.MINGJIANGTASK);
                GameModels.state.updateState(GameRedState.ATKCITY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelMingJiangTask.prototype, "petId", {
            get: function () {
                return this._petId;
            },
            set: function (v) {
                this._petId = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelMingJiangTask.prototype.updataTask = function (data) {
            if (!GameModels.platform.isPay)
                return;
            this._petName = "";
            this._petId = 0;
            for (var i = 0; i < this._mingjiangTaskVoArr.length; i++) {
                if (data.TaskInfo.TaskId == this._mingjiangTaskVoArr[i].taskId) {
                    if (this._mingjiangTaskVoArr[i].state == 0 && data.TaskInfo.Status == 1) {
                        this._petName = this._mingjiangTaskVoArr[i].generalTemp.name;
                        this._petId = this._mingjiangTaskVoArr[i].generalTemp.id;
                        mg.StoryManager.instance.startBigStory(this._mingjiangTaskVoArr[i].temp.triggerTalk, this, this.callStoryFun);
                    }
                    this._mingjiangTaskVoArr[i].finishCount = data.TaskInfo.FinishCount;
                    this._mingjiangTaskVoArr[i].param1 = data.TaskInfo.Param1;
                    this._mingjiangTaskVoArr[i].param2 = data.TaskInfo.Param2;
                    this._mingjiangTaskVoArr[i].cond1 = data.TaskInfo.Cond1;
                    this._mingjiangTaskVoArr[i].cond2 = data.TaskInfo.Cond2;
                    this._mingjiangTaskVoArr[i].state = data.TaskInfo.Status;
                }
            }
            GameModels.state.updateState(GameRedState.MINGJIANGTASK);
            GameModels.state.updateState(GameRedState.ATKCITY);
            if (this._changeHandler) {
                this._changeHandler.run();
            }
        };
        ModelMingJiangTask.prototype.callStoryFun = function () {
            if (!this._petName)
                return;
            var str = Language.getExpression(Language.E_YJCF1DMJRW, this._petName);
            mg.alertManager.showAlert(PromptAlert, false, true, str, TypeBtnLabel.VIEW, null, utils.Handler.create(this, function () {
                mg.uiManager.remove(s.UserfaceName.shengZhiMain);
                mg.uiManager.show(pet.PetGroupMain, { tabIndex: 1 });
            }), null, true);
        };
        ModelMingJiangTask.prototype.onChange = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offChange();
            this._changeHandler = utils.Handler.create(caller, method, args, false);
        };
        ModelMingJiangTask.prototype.offChange = function () {
            if (this._changeHandler) {
                this._changeHandler.recover();
                this._changeHandler = null;
            }
        };
        Object.defineProperty(ModelMingJiangTask.prototype, "refreshTime", {
            get: function () {
                return this._refreshTime;
            },
            set: function (v) {
                this._refreshTime = v;
            },
            enumerable: true,
            configurable: true
        });
        /**index 0全部 1进行中或者可领取 2，未激活 3，已完成 */
        ModelMingJiangTask.prototype.getMingjiangTaskVoArr = function (index) {
            var arr = [];
            if (index == 0) {
                arr = this._mingjiangTaskVoArr;
            }
            else if (index == 1) {
                for (var i = 0; i < this._mingjiangTaskVoArr.length; i++) {
                    if (this._mingjiangTaskVoArr[i].state == 1 || this._mingjiangTaskVoArr[i].state == 2) {
                        arr.push(this._mingjiangTaskVoArr[i]);
                    }
                }
            }
            else if (index == 2) {
                for (var i = 0; i < this._mingjiangTaskVoArr.length; i++) {
                    if (this._mingjiangTaskVoArr[i].state == 0) {
                        arr.push(this._mingjiangTaskVoArr[i]);
                    }
                }
            }
            else {
                for (var i = 0; i < this._mingjiangTaskVoArr.length; i++) {
                    if (this._mingjiangTaskVoArr[i].state == 3) {
                        arr.push(this._mingjiangTaskVoArr[i]);
                    }
                }
            }
            arr.sort(function (a, b) {
                return a.orde - b.orde;
            });
            return arr;
        };
        ModelMingJiangTask.prototype.initTask = function (data) {
            this._mingjiangTaskVoArr = [];
            for (var i = 0; i < data.length; i++) {
                var tempVo = vo.fromPool(vo.MingJiangTaskVO, data[i]);
                this._mingjiangTaskVoArr.push(tempVo);
            }
        };
        ModelMingJiangTask.prototype.checkRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.shengZhiMain, 1))
                return false;
            for (var i = 0; i < this._mingjiangTaskVoArr.length; i++) {
                if (this._mingjiangTaskVoArr[i].state == 2) {
                    return true;
                }
                else {
                    if (this._mingjiangTaskVoArr[i].state == 1 && !this._isOpenView) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**获得任务信息 */
        ModelMingJiangTask.prototype.getTaskInfo = function (successhandler) {
            var msg = n.MessagePool.from(n.C2G_GeneralTask_GetList);
            this.request(n.MessageMap.C2G_GENERALTASK_GETLIST, msg, utils.Handler.create(this, function (data) {
                this.initTask(data.TaskList);
                GameModels.state.updateState(GameRedState.MINGJIANGTASK);
                GameModels.state.updateState(GameRedState.ATKCITY);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**领取奖励 */
        ModelMingJiangTask.prototype.getTaskReward = function (taskId, successhandler) {
            var msg = n.MessagePool.from(n.C2G_GeneralTask_GetReward);
            msg.TaskId = taskId;
            this.request(n.MessageMap.C2G_GENERALTASK_GETREWARD, msg, utils.Handler.create(this, function (data) {
                for (var i = 0; i < this._mingjiangTaskVoArr.length; i++) {
                    if (data.TaskInfo.TaskId == this._mingjiangTaskVoArr[i].taskId) {
                        this._mingjiangTaskVoArr[i].finishCount = data.TaskInfo.FinishCount;
                        this._mingjiangTaskVoArr[i].param1 = data.TaskInfo.Param1;
                        this._mingjiangTaskVoArr[i].param2 = data.TaskInfo.Param2;
                        this._mingjiangTaskVoArr[i].cond1 = data.TaskInfo.Cond1;
                        this._mingjiangTaskVoArr[i].cond2 = data.TaskInfo.Cond2;
                        this._mingjiangTaskVoArr[i].state = data.TaskInfo.Status;
                    }
                }
                GameModels.state.updateState(GameRedState.MINGJIANGTASK);
                GameModels.state.updateState(GameRedState.ATKCITY);
                if (successhandler)
                    successhandler.run();
            }));
        };
        Object.defineProperty(ModelMingJiangTask.prototype, "voArr", {
            get: function () {
                return this._voArr;
            },
            enumerable: true,
            configurable: true
        });
        /**完成任务玩家列表 */
        ModelMingJiangTask.prototype.getTaskPlayerLis = function (taskId, successhandler) {
            var msg = n.MessagePool.from(n.C2G_GeneralTask_GetPlayerList);
            msg.TaskId = taskId;
            this.request(n.MessageMap.C2G_GENERALTASK_GETPLAYERLIST, msg, utils.Handler.create(this, function (data) {
                this._voArr = [];
                for (var i = 0; i < data.PlayerList.length; i++) {
                    var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.PlayerList[i]);
                    this._voArr.push(listVo);
                }
                if (successhandler)
                    successhandler.run();
            }));
        };
        return ModelMingJiangTask;
    }(mo.ModelBase));
    mo.ModelMingJiangTask = ModelMingJiangTask;
    __reflect(ModelMingJiangTask.prototype, "mo.ModelMingJiangTask");
})(mo || (mo = {}));
