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
    var ModelShengZhi = (function (_super) {
        __extends(ModelShengZhi, _super);
        function ModelShengZhi() {
            return _super.call(this) || this;
        }
        ModelShengZhi.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._shengZhiVo = [];
            this.requestShengZhiInfo();
        };
        ModelShengZhi.prototype.initShengZhiInfo = function (data) {
            this._shengZhiVo = [];
            for (var i = 0; i < data.length; i++) {
                var shengZhiVo = vo.fromPool(vo.ShengZhiVo);
                shengZhiVo.decode(data[i]);
                this._shengZhiVo.push(shengZhiVo);
            }
        };
        ModelShengZhi.prototype.updataShengZhiTask = function (data) {
            if (this._shengZhiVo) {
                for (var i = this._shengZhiVo.length - 1; i >= 0; i--) {
                    if (data instanceof n.ProtoShengZhiTask) {
                        if (this._shengZhiVo[i].taskId == data.TaskId) {
                            this._shengZhiVo[i].taskRefId = data.TaskRefId;
                            this._shengZhiVo[i].unionList = data.UnionCond;
                            this._shengZhiVo[i].status = data.Status;
                            this._shengZhiVo[i].leftTime = data.LeftTime;
                            this._shengZhiVo[i].petList = data.PetList;
                            this._shengZhiVo[i].older = data.Status;
                        }
                    }
                    else {
                        if (this._shengZhiVo[i].taskId == data) {
                            vo.toPool(this._shengZhiVo[i]);
                            this._shengZhiVo.splice(i, 1);
                        }
                    }
                }
            }
        };
        //请求任务信息
        ModelShengZhi.prototype.requestShengZhiInfo = function (complete) {
            var _this = this;
            this.request(n.MessageMap.C2G_SHENGZHI_GETLIST, n.MessagePool.from(n.C2G_ShengZhi_GetList), utils.Handler.create(this, function (data) {
                if (data) {
                    _this._leftRefreshCount = data.LeftFreeRefreshCount;
                    _this.initShengZhiInfo(data.TaskList);
                    if (complete)
                        complete.runWith(data);
                }
            }));
        };
        //请求执行任务
        ModelShengZhi.prototype.requestCarryOutShengZhiTask = function (taskId, petList, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ShengZhi_StartTask);
            msg.TaskId = taskId;
            msg.PetList = petList;
            this.request(n.MessageMap.C2G_SHENGZHI_STARTTASK, msg, utils.Handler.create(this, function (data) {
                if (data) {
                    _this.updataShengZhiTask(data.TaskInfo);
                    if (complete)
                        complete.runWith(data);
                }
            }));
        };
        //领取任务奖励
        ModelShengZhi.prototype.requestGetRewardShengZhiTask = function (taskId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ShengZhi_GetReward);
            msg.TaskId = taskId;
            this.request(n.MessageMap.C2G_SHENGZHI_GETREWARD, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    mg.alertManager.tip(Language.C_LQCG);
                    _this.updataShengZhiTask(data.TaskId);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        //刷新任务列表
        ModelShengZhi.prototype.requestRefreshShengZhiTask = function (complete) {
            var _this = this;
            this.request(n.MessageMap.C2G_SHENGZHI_REFRESHTASK, n.MessagePool.from(n.C2G_ShengZhi_RefreshTask), utils.Handler.create(this, function (data) {
                if (data) {
                    _this._leftRefreshCount = data.LeftFreeRefreshCount;
                    _this.initShengZhiInfo(data.TaskList);
                    if (complete)
                        complete.runWith(data);
                }
            }));
        };
        //立即完成任务
        ModelShengZhi.prototype.requestCleanCDShengZhiTask = function (taskId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ShengZhi_CleanCD);
            msg.TaskId = taskId;
            this.request(n.MessageMap.C2G_SHENGZHI_CLEANCD, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    _this.updataShengZhiTask(data.TaskInfo);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelShengZhi.prototype, "shengZhiVoLen", {
            get: function () {
                return this._shengZhiVo.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShengZhi.prototype, "shengZhiVo", {
            get: function () {
                if (this._shengZhiVo) {
                    this._shengZhiVo.sort(function (a, b) {
                        if (a.older != b.older) {
                            return b.older - a.older;
                        }
                        else {
                            return b.shengZhiTemp.quality - a.shengZhiTemp.quality;
                        }
                    });
                }
                return this._shengZhiVo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShengZhi.prototype, "leftRefreshCount", {
            get: function () {
                return this._leftRefreshCount;
            },
            enumerable: true,
            configurable: true
        });
        return ModelShengZhi;
    }(mo.ModelBase));
    mo.ModelShengZhi = ModelShengZhi;
    __reflect(ModelShengZhi.prototype, "mo.ModelShengZhi");
})(mo || (mo = {}));
