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
    var ModelActivityHeFu = (function (_super) {
        __extends(ModelActivityHeFu, _super);
        function ModelActivityHeFu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelActivityHeFu.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._hefuOpenActivityList = [];
            this._protoHeFuRankData = [];
            this._openhefuActivityOrder = [];
            this._recordList = [];
            this._totalGetMoShi = 0;
            this._leftTurnTimes = 0;
            this._usedTurnTimes = 0;
            this._todayPayCount = 0;
            this.requestHeFuInfos();
            this._currActivityTotal = 0;
            n.net.onRoute(n.MessageMap.G2C_HEFU_INFO, utils.Handler.create(this, this.upDataHeFuOpen, null, false));
        };
        ModelActivityHeFu.prototype.requestHeFuInfos = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HeFu_Info);
            this.request(n.MessageMap.C2G_HEFU_INFO, msg, utils.Handler.create(this, function (data) {
                _this.upDataHeFuOpen(data);
            }));
        };
        ModelActivityHeFu.prototype.upDataHeFuOpen = function (data) {
            this._openhefuActivityOrder = [];
            if (this._data) {
                n.MessagePool.to(this._data);
                this._data = null;
            }
            if (this._hefuOpenActivityList) {
                for (var _i = 0, _a = this._hefuOpenActivityList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    n.MessagePool.to(item);
                }
                this._hefuOpenActivityList.length = 0;
            }
            this._data = data;
            this._data.autoRecover = false;
            this._hefuOpenActivityList = this._data.HeFuActivityInfo;
            for (var i = 0; i < this._hefuOpenActivityList.length; i++) {
                var dataSet = Templates.getTemplateById(templates.Map.MERGESETING, this._hefuOpenActivityList[i].HeFuActivityId);
                this._openhefuActivityOrder.push(dataSet);
            }
            //根据页签排序
            this._openhefuActivityOrder.sort(function (a, b) {
                return a.order - b.order;
            });
            GameModels.activityHeFu.dispatchEventWith(mo.ModelActivityHeFu.ACTIVITY_HEFU_UPDATA);
        };
        Object.defineProperty(ModelActivityHeFu.prototype, "hefuOpenActivityList", {
            /**获得服务器给过来的获得列表 */
            get: function () {
                return this._hefuOpenActivityList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityHeFu.prototype, "hefuActivityTemplates", {
            /**获得模板列表 */
            get: function () {
                return this._openhefuActivityOrder;
            },
            enumerable: true,
            configurable: true
        });
        /**检查对应类型合服活动是否已激活 */
        ModelActivityHeFu.prototype.isOpenActivityHeFuList = function (type) {
            if (this._openhefuActivityOrder) {
                for (var i = 0; i < this._openhefuActivityOrder.length; i++) {
                    if (this._openhefuActivityOrder[i].type == type) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**获得合服活动页签对应的的Index*/
        ModelActivityHeFu.prototype.getActivityHeFuListByIndex = function (type) {
            if (this._openhefuActivityOrder) {
                for (var i = 0; i < this._openhefuActivityOrder.length; i++) {
                    if (this._openhefuActivityOrder[i].type == type) {
                        return i;
                    }
                }
            }
            return 0;
        };
        /**获得合服活动页签对应的模板*/
        ModelActivityHeFu.prototype.getActivityHeFuListTemplates = function (type) {
            if (this._openhefuActivityOrder) {
                for (var i = 0; i < this._openhefuActivityOrder.length; i++) {
                    if (this._openhefuActivityOrder[i].type == type) {
                        return this._openhefuActivityOrder[i];
                    }
                }
            }
            return null;
        };
        /**获得结束时间 */
        ModelActivityHeFu.prototype.getHeFuActivityListTiem = function (id) {
            if (this._hefuOpenActivityList) {
                for (var i = 0; i < this._hefuOpenActivityList.length; i++) {
                    if (this._hefuOpenActivityList[i].HeFuActivityId == id) {
                        return this._hefuOpenActivityList[i].EndTime;
                    }
                }
            }
            return 0;
        };
        /**获得红点状态 */
        ModelActivityHeFu.prototype.getHeFuActivityListRedPonitState = function (id) {
            if (this._hefuOpenActivityList) {
                for (var i = 0; i < this._hefuOpenActivityList.length; i++) {
                    if (this._hefuOpenActivityList[i].HeFuActivityId == id) {
                        return this._hefuOpenActivityList[i].State;
                    }
                }
            }
            return 0;
        };
        ModelActivityHeFu.prototype.checkDengLuRedPoint = function () {
            var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_DENGLU);
            if (temp) {
                return this.getHeFuActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelActivityHeFu.prototype.checkleichongRedPoint = function () {
            var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_LEICHONG);
            if (temp) {
                return this.getHeFuActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelActivityHeFu.prototype.checkQuanMinRedPoint = function () {
            var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_QM_BOSS);
            if (temp) {
                return this.getHeFuActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelActivityHeFu.prototype.checkLianChongRedPoint = function () {
            var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_LIANCHONG_FANLI);
            if (temp) {
                return this.getHeFuActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelActivityHeFu.prototype.checkXiaoHaoFanLiRedPoint = function () {
            var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_XIAOHAO_FANLI);
            if (temp) {
                return this.getHeFuActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelActivityHeFu.prototype.rewardInfosData = function (data, id) {
            this._rewardInfosData = [];
            var mergeSeting = Templates.getTemplateById(templates.Map.MERGESETING, id);
            for (var i = 0; i < data.length; i++) {
                var hefuvo = vo.fromPool(vo.ActivityHeFuVO);
                hefuvo.decode(data[i], mergeSeting.type);
                this._rewardInfosData.push(hefuvo);
            }
        };
        ModelActivityHeFu.prototype.updataInfosData = function (data) {
            if (this._rewardInfosData) {
                for (var i = 0; i < this._rewardInfosData.length; i++) {
                    if (this._rewardInfosData[i].hefuRewardId == data.HeFuGiftId) {
                        this._rewardInfosData[i].hefuRewardState = data.State;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelActivityHeFu.prototype, "rewardInfos", {
            get: function () {
                if (this._rewardInfosData) {
                    this._rewardInfosData.sort(function (a, b) {
                        if (a.hefuRewardState != b.hefuRewardState) {
                            return a.hefuRewardState - b.hefuRewardState;
                        }
                        else {
                            return a.hefuRewardId - b.hefuRewardId;
                        }
                    });
                }
                return this._rewardInfosData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityHeFu.prototype, "isCanLingqu", {
            get: function () {
                if (this._rewardInfosData) {
                    for (var i = 0; i < this._rewardInfosData.length; i++) {
                        if (this._rewardInfosData[i].hefuRewardState == 1) {
                            return true;
                        }
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityHeFu.prototype, "canLingquIndex", {
            get: function () {
                if (this._rewardInfosData) {
                    for (var i = 0; i < this._rewardInfosData.length; i++) {
                        if (this._rewardInfosData[i].hefuRewardState == 1) {
                            return i;
                        }
                    }
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityHeFu.prototype, "noCanLingquIndex", {
            get: function () {
                if (this._rewardInfosData) {
                    for (var i = 0; i < this._rewardInfosData.length; i++) {
                        if (this._rewardInfosData[i].hefuRewardState == 2) {
                            return i;
                        }
                    }
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityHeFu.prototype, "currActivityTotal", {
            get: function () {
                return this._currActivityTotal;
            },
            enumerable: true,
            configurable: true
        });
        /**请求奖励的数据 */
        ModelActivityHeFu.prototype.requestRewardInfosData = function (activityId, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HeFu_GetActivityInfo);
            msg.HeFuActivityId = activityId;
            this.request(n.MessageMap.C2G_HEFU_GETACTIVITYINFO, msg, utils.Handler.create(this, function (data) {
                _this._currActivityTotal = data.ActivityParam;
                _this.rewardInfosData(data.GiftInfo, data.HeFuActivityId);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        /**领励 */
        ModelActivityHeFu.prototype.requestGetRewardInfos = function (activityId, giftId, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HeFu_GetActivityGift);
            msg.HeFuActivityId = activityId;
            msg.HeFuGiftId = giftId;
            this.request(n.MessageMap.C2G_HEFU_GETACTIVITYGIFT, msg, utils.Handler.create(this, function (data) {
                _this.updataInfosData(data.GiftInfo);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        /**消费排行 */
        ModelActivityHeFu.prototype.requestHeFuRankList = function (type, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HeFu_GetRankList);
            msg.Type = type;
            this.request(n.MessageMap.C2G_HEFU_GETRANKLIST, msg, utils.Handler.create(this, function (data) {
                if (_this._protoHeFuRankData) {
                    for (var _i = 0, _a = _this._protoHeFuRankData; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._protoHeFuRankData.length = 0;
                }
                _this._myScore = data.MyValue;
                _this._protoHeFuRankData = data.List.concat();
                for (var _b = 0, _c = _this._protoHeFuRankData; _b < _c.length; _b++) {
                    var item = _c[_b];
                    item.autoRecover = false;
                }
                if (successhandler)
                    successhandler.run();
            }));
        };
        ModelActivityHeFu.prototype.protoHeFuRankData = function () {
            return this._protoHeFuRankData;
        };
        ModelActivityHeFu.prototype.myScore = function () {
            return this._myScore;
        };
        /**合服活动转盘 */
        ModelActivityHeFu.prototype.net_hefuZhuanPan = function (callback) {
            // n.net.onError(n.MessageMap.C2G_LUCKTURNTABLE_GETINFO, utils.Handler.create(this, function (data: any) {
            // 	logger.log("net_hefuZhuanPan.onError");
            // }));
            // this.request(n.MessageMap.C2G_LUCKTURNTABLE_GETINFO, n.MessagePool.from(n.C2G_LuckTurnTable_GetInfo),
            // 	utils.Handler.create(this, (data: n.G2C_LuckTurnTable_GetInfo) => {
            // 		this._totalGetMoShi = data.TurnTableInfo.TotalGetMoShi;
            // 		this._leftTurnTimes = data.TurnTableInfo.LeftTimes;
            // 		this._usedTurnTimes = data.TurnTableInfo.UsedTimes;
            // 		this._todayPayCount = data.TurnTableInfo.TodayPayCount;
            // 		if (this._recordList) {
            // 			for (var item of this._recordList) {
            // 				n.MessagePool.to(item);
            // 			}
            // 			this._recordList.length = 0;
            // 		}
            // 		this._recordList = data.TurnTableInfo.RecordList.concat();
            // 		for (var item of this._recordList) {
            // 			item.autoRecover = false;
            // 		}
            // 		// GameModels.state.updateState(GameRedState.ACTIVITY_XYZP);
            // 		if (callback) {
            // 			callback.run();
            // 		}
            // 	}));
        };
        ModelActivityHeFu.prototype.hefuZhuanPanDone = function (callback) {
            // this.request(n.MessageMap.C2G_LUCKTURNTABLE_DONE, n.MessagePool.from(n.C2G_LuckTurnTable_Done),
            // 	utils.Handler.create(this, (data: n.G2C_LuckTurnTable_Done) => {
            // 		if (data.Result > 0) {
            // 			var record: n.ProtoLuckTurnTableRecord = data.NewRecord;
            // 			record.autoRecover = false;
            // 			if (callback) {
            // 				callback.runWith(record);
            // 			}
            // 		}
            // 	}));
        };
        ModelActivityHeFu.prototype.getLeftTurnTimes = function () {
            return this._leftTurnTimes;
        };
        ModelActivityHeFu.prototype.getUsedTurnTimes = function () {
            return this._usedTurnTimes;
        };
        ModelActivityHeFu.prototype.getTodayPayCount = function () {
            return this._todayPayCount;
        };
        ModelActivityHeFu.prototype.getTotalGetMoShi = function () {
            return this._totalGetMoShi;
        };
        ModelActivityHeFu.prototype.getRecordList = function () {
            return this._recordList;
        };
        ModelActivityHeFu.prototype.setLeftTurnTimes = function () {
            this._leftTurnTimes -= 1;
        };
        ModelActivityHeFu.prototype.setUsedTurnTimes = function () {
            this._usedTurnTimes += 1;
        };
        ModelActivityHeFu.prototype.setTotalGetMoShi = function (glod) {
            this._totalGetMoShi += glod;
        };
        ModelActivityHeFu.prototype.setRecordList = function (data) {
            if (this._recordList)
                this._recordList.push(data);
        };
        ModelActivityHeFu.ACTIVITY_HEFU_UPDATA = "ACTIVITY_HEFU_UPDATA";
        ModelActivityHeFu.REFRESH_TURNTABLE = "REFRESH_TURNTABLE";
        /**合服宝藏钥匙*/
        ModelActivityHeFu.HEFU_GOD_BOX_KEY_CHANGE = "HEFU_GOD_BOX_KEY_CHANGE";
        return ModelActivityHeFu;
    }(mo.ModelBase));
    mo.ModelActivityHeFu = ModelActivityHeFu;
    __reflect(ModelActivityHeFu.prototype, "mo.ModelActivityHeFu");
})(mo || (mo = {}));
