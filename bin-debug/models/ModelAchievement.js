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
    var ModelAchievement = (function (_super) {
        __extends(ModelAchievement, _super);
        function ModelAchievement() {
            return _super.call(this) || this;
        }
        ModelAchievement.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this._taskEveryDayVo = [];
            this._prizes = [];
            this._aniType = 1;
            this._aniIndex = 280;
            this._currActiveValue = 0;
            this.initializePrizes();
            this.requestQstList();
            this.onRoute(n.MessageMap.G2C_QST_TASKPROGRESS, utils.Handler.create(this, function () {
                _this.requestQstList();
            }));
        };
        /**初始化奖励信息 */
        ModelAchievement.prototype.initializePrizes = function () {
            this._prizeMin = 0;
            this._prizeMax = 0;
            this._prizes = [];
            var boxsTemplates = GameModels.dataSet.getDataSettingArrByType(ModelAchievement.CHESTHUOYUE);
            for (var _i = 0, boxsTemplates_1 = boxsTemplates; _i < boxsTemplates_1.length; _i++) {
                var template = boxsTemplates_1[_i];
                var prizeVO = vo.fromPool(vo.PrizeVO, template);
                this._prizes.push(prizeVO);
                this._prizeMax = Math.max(prizeVO.mark, this._prizeMax);
            }
            this._prizes[0].type = item.TypePrize.WOOD1;
            this._prizes[1].type = item.TypePrize.WOOD;
            this._prizes[2].type = item.TypePrize.SILVER;
            this._prizes[3].type = item.TypePrize.COPPER;
            // this._prizes[4].type = item.TypePrize.GOLD;
            // this._prizes[5].type = item.TypePrize.GOLD1;
            // this._prizes[6].type = item.TypePrize.GOLD2;
            this._prizeMax += this._prizeMax * 0.1;
        };
        Object.defineProperty(ModelAchievement.prototype, "currProgress", {
            /**获得当前的活跃度 */
            get: function () {
                return this._prizeProgress;
            },
            enumerable: true,
            configurable: true
        });
        /**更新奖励信息 */
        ModelAchievement.prototype.updatePrize = function (progressValue, boxInfo) {
            if (boxInfo === void 0) { boxInfo = this._boxInfo; }
            this._prizeProgress = progressValue;
            for (var _i = 0, _a = this._prizes; _i < _a.length; _i++) {
                var prizeVO = _a[_i];
                prizeVO.state = progressValue >= prizeVO.mark ? item.StatePrize.WAIT : item.StatePrize.CLOSE;
            }
            if (boxInfo) {
                this.updatePrizeBoxState(boxInfo);
            }
        };
        /**更新奖励宝箱状态 */
        ModelAchievement.prototype.updatePrizeBoxState = function (boxInfo) {
            var boxTemp = boxInfo.split(";");
            for (var i = 0; i < boxTemp.length; i++) {
                var boxOrder = GameModels.dataSet.getDataSettingById(boxTemp[i]);
                var index = boxOrder.order - 1;
                this._prizes[index].state = item.StatePrize.OPEN;
            }
        };
        ModelAchievement.prototype.updateData = function (type, array) {
            var dataVO = [];
            for (var i = 0; i < array.length; i++) {
                var achievenVO = vo.fromPool(vo.AchievenmentVO);
                achievenVO.decode(type, array[i]);
                // var order: number = achievenVO.achievetemplate.order - 1;
                // if (order >= 0) {
                if (achievenVO.achievetemplate instanceof templates.taskDay) {
                    dataVO.push(achievenVO);
                }
                // }
            }
            return dataVO;
        };
        ModelAchievement.prototype.updateTaskData = function (nowAchiType, data) {
            for (var i = 0; i < this._taskEveryDayVo.length; i++) {
                if (this._taskEveryDayVo[i].achievetemplate.type == nowAchiType) {
                    this._taskEveryDayVo[i].decode("everyDay", data);
                    return this._taskEveryDayVo[i];
                }
            }
        };
        ModelAchievement.prototype.bubbleSort = function (data) {
            var i, j, temp;
            for (j = 0; j < data.length - 1; j++) {
                for (i = 0; i < data.length - 1 - j; i++) {
                    if (data[i].achievetemplate.order > data[i + 1].achievetemplate.order) {
                        temp = data[i];
                        data[i] = data[i + 1];
                        data[i + 1] = temp;
                    }
                    if (data[i].progress < data[i + 1].progress) {
                        temp = data[i];
                        data[i] = data[i + 1];
                        data[i + 1] = temp;
                    }
                    if (data[i].priority > data[i + 1].priority) {
                        temp = data[i];
                        data[i] = data[i + 1];
                        data[i + 1] = temp;
                    }
                }
            }
        };
        ModelAchievement.prototype.setAniIndexAndType = function (taskType, taskData, tagetStr) {
            for (var i = 0; i < taskData.length; i++) {
                if (taskData[i].achievetemplate[tagetStr] == taskType) {
                    this._aniIndex = i;
                    if (taskData[i].state == 2) {
                        this._aniType = 0; //侧滑动画
                    }
                    else {
                        this._aniType = 1; //上滑动画
                    }
                }
            }
        };
        ModelAchievement.prototype.checkQst = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (this._taskEveryDayVo) {
                for (var i = 0; i < this._taskEveryDayVo.length; i++) {
                    if (this._taskEveryDayVo[i].state == 2) {
                        return true;
                    }
                }
            }
            if (this._prizes) {
                for (var i = 0; i < this._prizes.length; i++) {
                    if (this._prizes[i].state == item.StatePrize.WAIT) {
                        return true;
                    }
                }
            }
            return false;
        };
        Object.defineProperty(ModelAchievement.prototype, "taskEveryDayVo", {
            get: function () {
                var task = [];
                for (var i = 0; i < this._taskEveryDayVo.length; i++) {
                    if (this._taskEveryDayVo[i].isOpen) {
                        task.push(this._taskEveryDayVo[i]);
                    }
                }
                return task;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelAchievement.prototype, "prizeMin", {
            get: function () {
                return this._prizeMin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelAchievement.prototype, "prizeMax", {
            get: function () {
                return this._prizeMax;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelAchievement.prototype, "aniType", {
            get: function () {
                return this._aniType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelAchievement.prototype, "aniIndex", {
            get: function () {
                return this._aniIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelAchievement.prototype, "prizes", {
            get: function () {
                return this._prizes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelAchievement.prototype, "allIsReceive", {
            get: function () {
                if (!this._prizes)
                    return false;
                for (var i = 0; i < this._prizes.length; i++) {
                    if (this._prizes[i].state != 1) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelAchievement.prototype, "prizeProgress", {
            get: function () {
                return this._prizeProgress * 1.1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelAchievement.prototype, "currActiveValue", {
            get: function () {
                return this._currActiveValue;
            },
            enumerable: true,
            configurable: true
        });
        ModelAchievement.prototype.initAndToPool = function (items) {
            if (!items)
                items = [];
            vo.toPoolList(items);
            items.length = 0;
        };
        ModelAchievement.prototype.toPoolAndNull = function (items) {
            vo.toPoolList(items);
            items = null;
        };
        ModelAchievement.prototype.requestQstList = function (handler) {
            var _this = this;
            this.request(n.MessageMap.C2G_QST_DAILYTASKLIST, n.MessagePool.from(n.C2G_QST_DailyTaskList), utils.Handler.create(this, function (data) {
                _this._taskEveryDayVo = _this.updateData("everyDay", data.TaskDetails);
                _this.bubbleSort(_this._taskEveryDayVo);
                _this._boxInfo = data.BoxInfo;
                _this._currActiveValue = data.ActiveValue;
                _this.updatePrize(data.ActiveValue, data.BoxInfo);
                GameModels.state.updateState(GameRedState.UNION_RICHANG_TASK_TASK);
                _this.dispatchEventWith(ModelAchievement.CHANG_EVERY_TASK);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        ModelAchievement.prototype.requestQstReceive = function (type, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_QST_DailyReceive);
            msg.TaskType = type;
            this.request(n.MessageMap.C2G_QST_DAILYRECEIVE, msg, utils.Handler.create(this, function (data) {
                _this.updateTaskData(type, data.TaskInfo);
                _this.setAniIndexAndType(type, _this._taskEveryDayVo, "type");
                _this.bubbleSort(_this._taskEveryDayVo);
                _this._currActiveValue = data.ActiveValue;
                _this.updatePrize(data.ActiveValue);
                GameModels.state.updateState(GameRedState.UNION_RICHANG_TASK_TASK);
                _this.dispatchEventWith(ModelAchievement.CHANG_EVERY_TASK);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        ModelAchievement.prototype.requestQstBox = function (id, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_QST_BoxReceive);
            msg.BoxReceiveId = id;
            this.request(n.MessageMap.C2G_QST_BOXRECEIVE, msg, utils.Handler.create(this, function (data) {
                _this._boxInfo = data.BoxInfo;
                _this.updatePrizeBoxState(data.BoxInfo);
                GameModels.state.updateState(GameRedState.UNION_RICHANG_TASK_TASK);
                _this.dispatchEventWith(ModelAchievement.CHANG_EVERY_TASK);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        /**每日任务变化 */
        ModelAchievement.CHANG_EVERY_TASK = "CHANG_EVERY_TASK";
        /** 成就宝箱类型*/
        ModelAchievement.CHESTHUOYUE = 61;
        return ModelAchievement;
    }(mo.ModelBase));
    mo.ModelAchievement = ModelAchievement;
    __reflect(ModelAchievement.prototype, "mo.ModelAchievement");
})(mo || (mo = {}));
