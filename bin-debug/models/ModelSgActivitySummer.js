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
    var ModelSgActivitySummer = (function (_super) {
        __extends(ModelSgActivitySummer, _super);
        function ModelSgActivitySummer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._maxRankCount = 0;
            return _this;
        }
        ModelSgActivitySummer.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._itemArr = [];
            this._recordMoshiList = [];
            this._totalGetMoShi = 0;
            this._leftTurnTimes = 0;
            this._usedTurnTimes = 0;
            this._todayPayCount = 0;
            this._taskData = [];
            this._recordHaoHuaBigList = [];
            this._recordHaoHuaAllList = [];
            this._recordDaoJuAllList = [];
            this._haoHuaItemList = [];
            this._daojuItemList = [];
            this._xydbRecord = [];
            this._xydbChouJiangResult = [];
            this._hongbaoRecord = [];
            /**4类型的充值 */
            this._rechargeData = [];
            var items = Templates.getTemplatesByProperty(templates.Map.GAMERECHARGE, "type", 4);
            for (var i = 0; i < items.length; i++) {
                this._rechargeData[i] = vo.fromPool(vo.RechargeVO, items[i], false);
            }
            this._rankTmps = Templates.getTemplatesByProperty(templates.Map.HOLIDAYRANK, "type", 30101);
            this._tatolValue = [];
            this._allJiangChi = 0;
            this._rewardIds = [];
            this._summerOpenActivityList = [];
            this._openSummerActivityOrder = [];
            this._openSummerActivityNewId = [];
            this._openSummerActivityOldId = [];
            this._summerLunPanCentra = [];
            this._summerLunPanAround = [];
            this._chougJiangRecordList = [];
            this.requestHolidayRunningActivitys();
            this.initSummerLunPanCentra();
            this.initSummerLunPanAround();
            this.initExchangeShopData();
            this._myJifen = GameModels.user.player.getProperty(TypeProperty.HOLIDAYSCORE_ID);
            GameModels.user.player.onPropertyChange(TypeProperty.HOLIDAYSCORE_ID, this, this.upmyJifen); //监听我的积分值
            n.net.onRoute(n.MessageMap.G2C_HOLIDAY_RUNNINGACTIVITYS, utils.Handler.create(this, this.upDataSummerOpen, null, false));
            n.net.onRoute(n.MessageMap.NOTIFYRECHARGEBUYINFO, utils.Handler.create(this, this.upDataZhiGouLiBao, null, false));
            n.net.onRoute(n.MessageMap.G2C_HAOHUAZHUANPAN_MONEYPOOLCHANGE, utils.Handler.create(this, this.upDataJiangChi, null, false));
            n.net.onRoute(n.MessageMap.G2C_NOTIFYACTIVITYREWARDITEMS, utils.Handler.create(this, this.updataItem, null, false));
            this._daojuDataSeting = GameModels.dataSet.getDataSettingArrByType(316);
            this._haohuaDataSeting = GameModels.dataSet.getDataSettingArrByType(312);
            this._isFirst = true;
            this.requestHolidayXYDBGetInfo(); //临时处理
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "isFirst", {
            get: function () {
                return this._isFirst;
            },
            set: function (v) {
                this._isFirst = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "currTableType", {
            get: function () {
                return this._currTable;
            },
            set: function (v) {
                this._currTable = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "currHaoHuaDataSeting", {
            get: function () {
                for (var i = 0; i < this._haohuaDataSeting.length; i++) {
                    if (this._haohuaDataSeting[i].order == this.summerActivityOneResourceType) {
                        return this._haohuaDataSeting[i];
                    }
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "currDaoJuDataSeting", {
            get: function () {
                for (var i = 0; i < this._daojuDataSeting.length; i++) {
                    if (this._daojuDataSeting[i].order == this.summerActivityOneResourceType) {
                        return this._daojuDataSeting[i];
                    }
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.updataItem = function (data) {
            if (this._rewardItemsData) {
                n.MessagePool.to(this._rewardItemsData);
                this._rewardItemsData = null;
            }
            if (this._itemArr) {
                for (var _i = 0, _a = this._itemArr; _i < _a.length; _i++) {
                    var item = _a[_i];
                    n.MessagePool.to(item);
                }
                this._itemArr.length = 0;
            }
            this._rewardItemsData = data;
            this._rewardItemsData.autoRecover = false;
            if (this._rewardItemsData.Items[0]) {
                var itemVo = vo.fromPool(vo.ItemVO, parseInt(this._rewardItemsData.Items[0].Id));
                itemVo.count = this._rewardItemsData.Items[0].Count;
                view.activity.GuoQingJiZiTip.instance.show(itemVo);
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "isDaoJuHeZiAnm", {
            get: function () {
                return this._isDaoJuHeZiAnm;
            },
            set: function (v) {
                this._isDaoJuHeZiAnm = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.upDataJiangChi = function (data) {
            if (this.moneyValuePool == data.MoneyValuePool)
                return;
            this._allJiangChi = data.MoneyValuePool;
            this.dispatchEventWith(ModelSgActivitySummer.ACTIVITY_HAOHUAZUANGPAN_POOL);
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "moneyValuePool", {
            get: function () {
                return this._allJiangChi;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.getRankTmps = function (index) {
            if (this._rankTmps && this._rankTmps[index]) {
                return this._rankTmps[index].rewards;
            }
            return null;
        };
        /**在武将介绍界面tips上前面到指定的界面 */
        ModelSgActivitySummer.prototype.goGetPetView = function () {
            this.dispatchEventWith(ModelSgActivitySummer.GO_GET_PET_VIEW);
        };
        /**幸运夺宝Pool改变 */
        ModelSgActivitySummer.prototype.xingyunduobaoPoolChange = function () {
            this.dispatchEventWith(ModelSgActivitySummer.ACTIVITY_XINGYUNDUOHAO_CHANGE_POOL);
        };
        /**轮盘再抽一次 */
        ModelSgActivitySummer.prototype.lunPanAngin = function (count) {
            this.dispatchEventWith(ModelSgActivitySummer.ACTIVITY_SUMMER_LUNPAN_ANGIN, false, count);
        };
        /**抽奖时获得的积分 */
        ModelSgActivitySummer.prototype.upmyJifen = function (vo, type) {
            this._myJifen = vo.getProperty(type); //积分值
            this.dispatchEventWith(ModelSgActivitySummer.ACTIVITY_MY_JIFEN_CHANGE);
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "myJifen", {
            get: function () {
                return this._myJifen;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestHolidayRunningActivitys = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Holiday_RunningActivitys);
            this.request(n.MessageMap.C2G_HOLIDAY_RUNNINGACTIVITYS, msg, utils.Handler.create(this, function (data) {
                _this.upDataSummerOpen(data);
                if (complete)
                    complete.run();
            }));
        };
        ModelSgActivitySummer.prototype.upDataSummerOpen = function (data) {
            this._openSummerActivityOrder = [];
            this._openSummerActivityNewId = [];
            if (this._data) {
                n.MessagePool.to(this._data);
                this._data = null;
            }
            if (this._summerOpenActivityList) {
                for (var _i = 0, _a = this._summerOpenActivityList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    n.MessagePool.to(item);
                }
                this._summerOpenActivityList.length = 0;
            }
            this._data = data;
            this._data.autoRecover = false;
            this._summerOpenActivityList = this._data.Infos;
            for (var i = 0; i < this._summerOpenActivityList.length; i++) {
                this._openSummerActivityNewId.push(this._summerOpenActivityList[i].Id);
                var dataSet = Templates.getTemplateById(templates.Map.HOLIDAYSETING, this._summerOpenActivityList[i].Id);
                if (dataSet)
                    this._openSummerActivityOrder.push(dataSet);
            }
            //根据页签排序
            this._openSummerActivityOrder.sort(function (a, b) {
                return a.order - b.order;
            });
            GameModels.activitySummer.dispatchEventWith(mo.ModelSgActivitySummer.ACTIVITY_SUMMER_OPEN);
            if (this._openSummerActivityNewId.length > 0 && this._openSummerActivityOldId.length > 0) {
                for (var i = 0; i < this._openSummerActivityNewId.length; i++) {
                    if (this._openSummerActivityNewId[i] != this._openSummerActivityOldId[i]) {
                        if (mg.uiManager.isOpen(s.UserfaceName.activitysumme)) {
                            mg.uiManager.remove(s.UserfaceName.activitysumme);
                            //logger.log("节日活动发生改变,点击确实重新打开节日活动界面");
                            //mg.alertManager.showAlert(PromptAlert, false, true, Language.J_HDFSGBSFDK, TypeBtnLabel.OK, null, utils.Handler.create(this, this.openActivitysummeView));
                            //mg.alertManager.showAlert(PromptAlert, false, true, Language.J_HDFSGBSFDK, TypeBtnLabel.OK, null, null);
                            break;
                        }
                    }
                }
            }
            this._openSummerActivityOldId = this._openSummerActivityNewId;
            // if (GameModels.activitySummer.isOpenActivitySummerList(game.TypeSummerActivity.KNLB)) {
            // 	this.requestKuaNianGiftState();
            // }
            GameModels.state.updateState(GameRedState.SNMMER_ACTIVITY_LJDL);
            GameModels.state.updateState(GameRedState.SNMMER_ACTIVITY_ZGLB);
        };
        ModelSgActivitySummer.prototype.openActivitysummeView = function () {
            if (this.summerActivityTemplates.length > 0) {
                mg.uiManager.show(dialog.activitysummer.sgActivitysummerMainDialog);
            }
            else {
                mg.alertManager.tip(Language.J_HDYJJS);
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "summerOpenActivityList", {
            /**获得服务器给过来的获得列表 */
            get: function () {
                return this._summerOpenActivityList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "summerActivityTemplates", {
            /**获得模板列表 */
            get: function () {
                return this._openSummerActivityOrder;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "summerActivityOneResourceType", {
            /**获得第一个模板资源类型 */
            get: function () {
                if (this._openSummerActivityOrder[0]) {
                    return this._openSummerActivityOrder[0].resourceType;
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        /**检查对应类型夏日活动是否已激活 */
        ModelSgActivitySummer.prototype.isOpenActivitySummerList = function (type) {
            if (this._openSummerActivityOrder) {
                for (var i = 0; i < this._openSummerActivityOrder.length; i++) {
                    if (this._openSummerActivityOrder[i].type == type) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**获得夏日活动页签对应的的Index*/
        ModelSgActivitySummer.prototype.getActivitySummerListByIndex = function (type) {
            if (this._openSummerActivityOrder) {
                for (var i = 0; i < this._openSummerActivityOrder.length; i++) {
                    if (this._openSummerActivityOrder[i].type == type) {
                        return i;
                    }
                }
            }
            return 0;
        };
        /**获得夏日活动页签对应的模板*/
        ModelSgActivitySummer.prototype.getActivitySummerListTemplates = function (type) {
            if (this._openSummerActivityOrder) {
                for (var i = 0; i < this._openSummerActivityOrder.length; i++) {
                    if (this._openSummerActivityOrder[i].type == type) {
                        return this._openSummerActivityOrder[i];
                    }
                }
            }
            return null;
        };
        /**获得结束时间 */
        ModelSgActivitySummer.prototype.getSummerActivityListTiem = function (id) {
            if (this._summerOpenActivityList) {
                for (var i = 0; i < this._summerOpenActivityList.length; i++) {
                    if (this._summerOpenActivityList[i].Id == id) {
                        return this._summerOpenActivityList[i].EndTime;
                    }
                }
            }
            return 0;
        };
        /**获得红点状态 */
        ModelSgActivitySummer.prototype.getSummerActivityListRedPonitState = function (id) {
            if (this._summerOpenActivityList) {
                for (var i = 0; i < this._summerOpenActivityList.length; i++) {
                    if (this._summerOpenActivityList[i].Id == id) {
                        return this._summerOpenActivityList[i].RedPointState;
                    }
                }
            }
            return 0;
        };
        ModelSgActivitySummer.prototype.initSummerLunPanCentra = function () {
            var dataSet = GameModels.dataSet.getDataSettingValueById(292001);
            var str = dataSet.split(";");
            for (var i = 0; i < str.length; i++) {
                this._summerLunPanCentra.push(parseInt(str[i]));
            }
        };
        ModelSgActivitySummer.prototype.initSummerLunPanAround = function () {
            var dataSet = GameModels.dataSet.getDataSettingValueById(291001);
            var str = dataSet.split(";");
            for (var i = 0; i < str.length; i++) {
                this._summerLunPanAround.push(parseInt(str[i].split("_")[1]));
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "summerLunPanCentra", {
            get: function () {
                return this._summerLunPanCentra;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "summerLunPanAround", {
            get: function () {
                return this._summerLunPanAround;
            },
            enumerable: true,
            configurable: true
        });
        /**累计登录数据 */
        ModelSgActivitySummer.prototype.checkLeiJiDengLuRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.sgActivitysummerType.ljdl);
            if (temp) {
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelSgActivitySummer.prototype.initLeiJiDengLuData = function (data) {
            this._leiJiDengLuData = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerVO);
                legion.decode(data[i]);
                this._leiJiDengLuData.push(legion);
            }
        };
        ModelSgActivitySummer.prototype.upDataLeiJiDengLuData = function (id) {
            if (this._leiJiDengLuData) {
                for (var i = 0; i < this._leiJiDengLuData.length; i++) {
                    if (this._leiJiDengLuData[i].holidayRewardId == id) {
                        this._leiJiDengLuData[i].holidayRewardState = 3;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "leiJiDengLuData", {
            get: function () {
                if (this._leiJiDengLuData) {
                    this._leiJiDengLuData.sort(function (a, b) {
                        if (a.holidayRewardState != b.holidayRewardState) {
                            return a.holidayRewardState - b.holidayRewardState;
                        }
                        else {
                            return a.holidayRewardId - b.holidayRewardId;
                        }
                    });
                }
                return this._leiJiDengLuData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "tatolValueArr", {
            get: function () {
                return this._tatolValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "tatolValue", {
            get: function () {
                return this._tatolValue[0] ? this._tatolValue[0] : 0;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestRewardInfosData = function (type, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Holiday_TotalActivity_GetInfo);
            msg.HolidayType = type;
            this.request(n.MessageMap.C2G_HOLIDAY_TOTALACTIVITY_GETINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._infoData) {
                    n.MessagePool.to(_this._infoData);
                    _this._infoData = null;
                }
                if (_this._tatolValue) {
                    _this._tatolValue.length = 0;
                }
                _this._infoData = data;
                _this._infoData.autoRecover = false;
                _this._tatolValue = _this._infoData.TotalValue;
                if (data.HolidayType == game.TypeSummerActivity.MRLC) {
                    _this.initXiaRiLeiJiData(data.RewardInfos);
                }
                else if (data.HolidayType == game.TypeSummerActivity.LJDL) {
                    _this.initLeiJiDengLuData(data.RewardInfos);
                }
                else if (data.HolidayType == game.TypeSummerActivity.TASK) {
                    _this.initTaskBoxData(data.RewardInfos);
                }
                else if (data.HolidayType == game.TypeSummerActivity.LCSL) {
                    _this.initLianChongSongLiData(data.RewardInfos);
                }
                else if (data.HolidayType == game.TypeSummerActivity.XYDB) {
                    _this.initXingYingGuoBaoBoxData(data.RewardInfos);
                }
                else if (data.HolidayType == game.TypeSummerActivity.YDSZ) {
                    _this.initYuanDanShiZhuangData(data.RewardInfos);
                }
                else if (data.HolidayType == game.TypeSummerActivity.KNLB) {
                    _this.initKuaNainLiBaoData(data.RewardInfos);
                }
                else if (data.HolidayType == game.TypeSummerActivity.RYCZ) {
                    _this.initRenYiChongZhiData(data.RewardInfos);
                }
                else {
                    _this.initTaskBoxDataZhuanPan(data.RewardInfos);
                }
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        /**领励 */
        ModelSgActivitySummer.prototype.requestGetRewardInfos = function (id, type, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Holiday_TotalActivity_GetReward);
            msg.RewardCfgId = id;
            msg.HolidayType = type;
            this.request(n.MessageMap.C2G_HOLIDAY_TOTALACTIVITY_GETREWARD, msg, utils.Handler.create(this, function (data) {
                if (data.HolidayType == game.TypeSummerActivity.MRLC) {
                    _this.upDataXiaRiLeiJiData(data.RewardCfgId);
                }
                else if (data.HolidayType == game.TypeSummerActivity.LJDL) {
                    _this.upDataLeiJiDengLuData(data.RewardCfgId);
                }
                else if (data.HolidayType == game.TypeSummerActivity.TASK) {
                    _this.upDataTaskBoxLuData(data.RewardCfgId);
                }
                else if (data.HolidayType == game.TypeSummerActivity.LCSL) {
                    _this.uplianChongSongLiData(data.RewardCfgId);
                }
                else if (data.HolidayType == game.TypeSummerActivity.XYDB) {
                    _this.upDataXingYingGuoBaoBoxData(data.RewardCfgId);
                }
                else if (data.HolidayType == game.TypeSummerActivity.YDSZ) {
                    _this.upDataYuanDanShiZhuanData(data.RewardCfgId);
                }
                else if (data.HolidayType == game.TypeSummerActivity.KNLB) {
                    _this.upDataKuaNainLiBaoData(data.RewardCfgId);
                }
                else if (data.HolidayType == game.TypeSummerActivity.RYCZ) {
                    _this.upDataRenYiChongZhiData(data.RewardCfgId);
                }
                else {
                    _this.upDataTaskBoxLuDataZhuanPan(data.RewardCfgId);
                }
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        ModelSgActivitySummer.prototype.initRenYiChongZhiData = function (data) {
            this._renYiChongZhi = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerVO);
                legion.decode(data[i]);
                this._renYiChongZhi.push(legion);
            }
        };
        ModelSgActivitySummer.prototype.upDataRenYiChongZhiData = function (id) {
            if (this._renYiChongZhi) {
                for (var i = 0; i < this._renYiChongZhi.length; i++) {
                    if (this._renYiChongZhi[i].holidayRewardId == id) {
                        this._renYiChongZhi[i].holidayRewardState = 3;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "renYiChongZhiData", {
            get: function () {
                if (this._renYiChongZhi) {
                    this._renYiChongZhi.sort(function (a, b) {
                        return a.holidayRewardId - b.holidayRewardId;
                    });
                }
                return this._renYiChongZhi;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.checkRenYiChongZhiRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.RYCZ);
            if (temp) {
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelSgActivitySummer.prototype.requestKuaNianGiftState = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Holiday_KuaNianGift_GetState);
            this.request(n.MessageMap.C2G_HOLIDAY_KUANIANGIFT_GETSTATE, msg, utils.Handler.create(this, function (data) {
                _this._kuanianState = data.State;
                _this._kuanianTime = data.EndTime - GameModels.timer.getTimer() / 1000;
                GameModels.activitySummer.dispatchEventWith(mo.ModelSgActivitySummer.KUANIAN_GIFT_CHANGE);
                if (successhandler)
                    successhandler.run();
            }));
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "kuanianState", {
            get: function () {
                return this._kuanianState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "kuanianTime", {
            get: function () {
                return this._kuanianTime;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.checkKuaNianLiBaoRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.KNLB);
            if (temp) {
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelSgActivitySummer.prototype.initKuaNainLiBaoData = function (data) {
            this._kuaNainLiBao = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerVO);
                legion.decode(data[i]);
                this._kuaNainLiBao.push(legion);
            }
        };
        ModelSgActivitySummer.prototype.upDataKuaNainLiBaoData = function (id) {
            if (this._kuaNainLiBao) {
                for (var i = 0; i < this._kuaNainLiBao.length; i++) {
                    if (this._kuaNainLiBao[i].holidayRewardId == id) {
                        this._kuaNainLiBao[i].holidayRewardState = 3;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "kuaNainLiBaoData", {
            get: function () {
                if (this._kuaNainLiBao) {
                    this._kuaNainLiBao.sort(function (a, b) {
                        return a.holidayRewardId - b.holidayRewardId;
                    });
                }
                return this._kuaNainLiBao;
            },
            enumerable: true,
            configurable: true
        });
        /**元旦时装 */
        ModelSgActivitySummer.prototype.checkYuanDanShiZhuangRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.YDSZ);
            if (temp) {
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelSgActivitySummer.prototype.initYuanDanShiZhuangData = function (data) {
            this._yuanDanShiZhuang = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerVO);
                legion.decode(data[i]);
                this._yuanDanShiZhuang.push(legion);
            }
        };
        ModelSgActivitySummer.prototype.upDataYuanDanShiZhuanData = function (id) {
            if (this._yuanDanShiZhuang) {
                for (var i = 0; i < this._yuanDanShiZhuang.length; i++) {
                    if (this._yuanDanShiZhuang[i].holidayRewardId == id) {
                        this._yuanDanShiZhuang[i].holidayRewardState = 3;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "yuanDanShiZhuanData", {
            get: function () {
                if (this._yuanDanShiZhuang) {
                    this._yuanDanShiZhuang.sort(function (a, b) {
                        if (a.holidayRewardState != b.holidayRewardState) {
                            return a.holidayRewardState - b.holidayRewardState;
                        }
                        else {
                            return a.holidayRewardId - b.holidayRewardId;
                        }
                    });
                }
                return this._yuanDanShiZhuang;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.initLianChongSongLiData = function (data) {
            this._lianChongSongLiData = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerVO);
                legion.decode(data[i]);
                this._lianChongSongLiData.push(legion);
            }
        };
        ModelSgActivitySummer.prototype.uplianChongSongLiData = function (id) {
            if (this._lianChongSongLiData) {
                for (var i = 0; i < this._lianChongSongLiData.length; i++) {
                    if (this._lianChongSongLiData[i].holidayRewardId == id) {
                        this._lianChongSongLiData[i].holidayRewardState = 3;
                        break;
                    }
                }
            }
        };
        ModelSgActivitySummer.prototype.getLianChongSongLiDataBytarget = function (target) {
            var temp = [];
            if (this.lianChongSongLiData) {
                for (var i = 0; i < this.lianChongSongLiData.length; i++) {
                    if (this.lianChongSongLiData[i].template.target == target) {
                        temp.push(this.lianChongSongLiData[i]);
                    }
                }
            }
            return temp;
        };
        ModelSgActivitySummer.prototype.getLianChongSongLiDataByValue = function () {
            if (this.lianChongSongLiData) {
                for (var i = 0; i < this.lianChongSongLiData.length; i++) {
                    if (this.lianChongSongLiData[i].template.value == 0) {
                        return this.lianChongSongLiData[i];
                    }
                }
            }
            return null;
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "lianChongSongLiData", {
            get: function () {
                if (this._lianChongSongLiData) {
                    this._lianChongSongLiData.sort(function (a, b) {
                        if (a.holidayRewardState != b.holidayRewardState) {
                            return a.holidayRewardState - b.holidayRewardState;
                        }
                        else {
                            return a.holidayRewardId - b.holidayRewardId;
                        }
                    });
                }
                return this._lianChongSongLiData;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestTaskInfosData = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HolidayTask_GetInfo);
            this.request(n.MessageMap.C2G_HOLIDAYTASK_GETINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._taskInfodata) {
                    n.MessagePool.to(_this._taskInfodata);
                    _this._taskInfodata = null;
                }
                if (_this._taskData) {
                    for (var _i = 0, _a = _this._taskData; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._taskData.length = 0;
                }
                _this._taskInfodata = data;
                _this._taskInfodata.autoRecover = false;
                _this._taskData = _this._taskInfodata.TaskInfoList;
                if (successhandler)
                    successhandler.runWith(_this._taskInfodata);
            }));
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "taskData", {
            get: function () {
                return this._taskData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "isCanLingqu", {
            get: function () {
                if (this._taskBoxData) {
                    for (var i = 0; i < this._taskBoxData.length; i++) {
                        if (this._taskBoxData[i].holidayRewardState == 1) {
                            return true;
                        }
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "canLingquIndex", {
            get: function () {
                if (this._taskBoxData) {
                    for (var i = 0; i < this._taskBoxData.length; i++) {
                        if (this._taskBoxData[i].holidayRewardState == 1) {
                            return i;
                        }
                    }
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "noCanLingquIndex", {
            get: function () {
                if (this._taskBoxData) {
                    for (var i = 0; i < this._taskBoxData.length; i++) {
                        if (this._taskBoxData[i].holidayRewardState == 2) {
                            return i;
                        }
                    }
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.initTaskBoxData = function (data) {
            this._taskBoxData = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerVO);
                legion.decode(data[i]);
                this._taskBoxData.push(legion);
            }
        };
        ModelSgActivitySummer.prototype.upDataTaskBoxLuData = function (id) {
            if (this._taskBoxData) {
                for (var i = 0; i < this._taskBoxData.length; i++) {
                    if (this._taskBoxData[i].holidayRewardId == id) {
                        this._taskBoxData[i].holidayRewardState = 3;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "taskBoxData", {
            get: function () {
                if (this._taskBoxData) {
                    this._taskBoxData.sort(function (a, b) {
                        return a.holidayRewardId - b.holidayRewardId;
                    });
                }
                return this._taskBoxData;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.initTaskBoxDataZhuanPan = function (data) {
            this._taskBoxDataZhuanPan = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerVO);
                legion.decode(data[i]);
                this._taskBoxDataZhuanPan.push(legion);
            }
        };
        ModelSgActivitySummer.prototype.upDataTaskBoxLuDataZhuanPan = function (id) {
            if (this._taskBoxDataZhuanPan) {
                for (var i = 0; i < this._taskBoxDataZhuanPan.length; i++) {
                    if (this._taskBoxDataZhuanPan[i].holidayRewardId == id) {
                        this._taskBoxDataZhuanPan[i].holidayRewardState = 3;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "taskBoxDataZhuanPan", {
            get: function () {
                if (this._taskBoxDataZhuanPan) {
                    this._taskBoxDataZhuanPan.sort(function (a, b) {
                        // return a.holidayRewardId - b.holidayRewardId;
                        if (a.holidayRewardState != b.holidayRewardState) {
                            return a.holidayRewardState - b.holidayRewardState;
                        }
                        else {
                            return a.holidayRewardId - b.holidayRewardId;
                        }
                    });
                }
                return this._taskBoxDataZhuanPan;
            },
            enumerable: true,
            configurable: true
        });
        /**夏日累计数据 */
        ModelSgActivitySummer.prototype.checkXiaRiLeiJiRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.MRLC);
            if (temp) {
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelSgActivitySummer.prototype.initXiaRiLeiJiData = function (data) {
            this._xiaRiLeiJiData = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerVO);
                legion.decode(data[i]);
                this._xiaRiLeiJiData.push(legion);
            }
        };
        ModelSgActivitySummer.prototype.upDataXiaRiLeiJiData = function (id) {
            if (this._xiaRiLeiJiData) {
                for (var i = 0; i < this._xiaRiLeiJiData.length; i++) {
                    if (this._xiaRiLeiJiData[i].holidayRewardId == id) {
                        this._xiaRiLeiJiData[i].holidayRewardState = 3;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "xiaRiLeiJiData", {
            get: function () {
                if (this._xiaRiLeiJiData) {
                    this._xiaRiLeiJiData.sort(function (a, b) {
                        if (a.holidayRewardState != b.holidayRewardState) {
                            return a.holidayRewardState - b.holidayRewardState;
                        }
                        else {
                            return a.holidayRewardId - b.holidayRewardId;
                        }
                    });
                }
                return this._xiaRiLeiJiData;
            },
            enumerable: true,
            configurable: true
        });
        /**请求夏日转盘的抽奖 */
        ModelSgActivitySummer.prototype.requestChougJiang = function (count, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Holiday_Turntable_Done);
            msg.Count = count;
            this.request(n.MessageMap.C2G_HOLIDAY_TURNTABLE_DONE, msg, utils.Handler.create(this, function (data) {
                _this._rewardIds = data.RewardIds.concat();
                _this._rewardIdScore = data.NewRecord.Score;
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**请求夏日转盘的抽奖记录 */
        ModelSgActivitySummer.prototype.requestChougJiangRecord = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Holiday_Turntable_GetInfo);
            this.request(n.MessageMap.C2G_HOLIDAY_TURNTABLE_GETINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._recordList) {
                    n.MessagePool.to(_this._recordList);
                    _this._recordList = null;
                }
                if (_this._chougJiangRecordList) {
                    for (var _i = 0, _a = _this._chougJiangRecordList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._chougJiangRecordList.length = 0;
                }
                _this._recordList = data;
                _this._recordList.autoRecover = false;
                _this._chougJiangRecordList = _this._recordList.Records;
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "chougJiangRecord", {
            get: function () {
                return this._chougJiangRecordList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "rewardIds", {
            get: function () {
                return this._rewardIds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "rewardIdScore", {
            get: function () {
                return this._rewardIdScore;
            },
            enumerable: true,
            configurable: true
        });
        // /**兑换商品相关的逻辑 */
        ModelSgActivitySummer.prototype.initExchangeShopData = function () {
            this._exchangeShopVo = [];
            var shops = Templates.getList(templates.Map.SHOP);
            for (var i = 0; i < shops.length; i++) {
                if (shops[i].id == 15002) {
                    continue;
                }
                if (shops[i].shopType != 15) {
                    continue;
                }
                if ((shops[i].job == 0 || shops[i].job == GameModels.user.player.job)) {
                    if (shops[i].shopType == 15) {
                        var shopVO = vo.fromPool(vo.ShopVO);
                        shopVO.decode(shops[i].id);
                        this._exchangeShopVo.push(shopVO);
                    }
                }
            }
        };
        ModelSgActivitySummer.prototype.updataExchangeShopData = function (data) {
            for (var i = 0; i < this._exchangeShopVo.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (this._exchangeShopVo[i].type == 15 && this._exchangeShopVo[i].shopid == data[j].StoreItemId) {
                        this._exchangeShopVo[i].buyCount = (data[j].LeftBuyTimes);
                    }
                }
            }
        };
        ModelSgActivitySummer.prototype.updataExchangeShopDataLeftCount = function (shopid, count) {
            for (var i = 0; i < this._exchangeShopVo.length; i++) {
                if (this._exchangeShopVo[i].type == 15 && this._exchangeShopVo[i].shopid == shopid) {
                    this._exchangeShopVo[i].buyCount = (count);
                    break;
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "exchangeshopData", {
            get: function () {
                if (this._exchangeShopVo) {
                    this._exchangeShopVo.sort(function (a, b) {
                        return a.shopid - b.shopid;
                    });
                }
                return this._exchangeShopVo;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestExchangeShopData = function (type, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Store_GetBuyTimes);
            msg.StoreType = type;
            this.request(n.MessageMap.C2G_STORE_GETBUYTIMES, msg, utils.Handler.create(this, function (data) {
                if (data.StoreType == 15) {
                    _this.updataExchangeShopData(data.BuyTimesList);
                }
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        ModelSgActivitySummer.prototype.exchangeShopDataCall = function (shopid, shopCount, shopType, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Store_BuyItemReq);
            msg.StoreItemRefId = shopid.toString();
            msg.Count = shopCount;
            msg.StoreType = shopType;
            this.request(n.MessageMap.C2G_STORE_BUYITEMREQ, msg, utils.Handler.create(this, function (data) {
                if (data.Result == "1") {
                    if (data.StoreType == 15) {
                        _this.updataExchangeShopDataLeftCount(parseInt(data.StoreItemRefId), data.LeftBuyTimes);
                    }
                    if (successhandler)
                        successhandler.runWith(data);
                }
            }));
        };
        ModelSgActivitySummer.prototype.initXianGouData = function (data) {
            this._xiangouData = [];
            for (var i = 0; i < data.length; i++) {
                var temp = Templates.getTemplateById(templates.Map.HOLIDAYBUY, data[i].GiftId);
                if (temp) {
                    var legion = vo.fromPool(vo.ActivitySummerXianGouVO);
                    legion.decode(data[i]);
                    this._xiangouData.push(legion);
                }
            }
        };
        ModelSgActivitySummer.prototype.updataXianGouData = function (data) {
            if (this._xiangouData) {
                for (var i = 0; i < this._xiangouData.length; i++) {
                    if (this._xiangouData[i].holidayBuyId == data.GiftId) {
                        this._xiangouData[i].holidayBuyCount = data.BuyCount;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "xianGouData", {
            get: function () {
                if (this._xiangouData) {
                    this._xiangouData.sort(function (a, b) {
                        return a.holidayBuyId - b.holidayBuyId;
                    });
                }
                return this._xiangouData;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestXianGouInfosData = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Holiday_GetLimitGiftInfo);
            this.request(n.MessageMap.C2G_HOLIDAY_GETLIMITGIFTINFO, msg, utils.Handler.create(this, function (data) {
                _this.initXianGouData(data.GiftInfoList);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        /**限购活动购买*/
        ModelSgActivitySummer.prototype.requestBuyXianGou = function (id, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Holiday_BuyLimitGift);
            msg.GiftId = id;
            msg.Count = 1;
            this.request(n.MessageMap.C2G_HOLIDAY_BUYLIMITGIFT, msg, utils.Handler.create(this, function (data) {
                _this.updataXianGouData(data.GiftInfo);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        /**直购活动 */
        ModelSgActivitySummer.prototype.upDataZhiGouLiBao = function (data) {
            this.initZhiGouData(data.RechargeList, data.GotRewardListt);
            this.dispatchEventWith(mo.ModelSgActivitySummer.UPDATA_ZHIGOU_LIBAO);
        };
        ModelSgActivitySummer.prototype.checkZhiGouLiBaoRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.sgActivitysummerType.zglb);
            if (temp) {
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelSgActivitySummer.prototype.initZhiGouData = function (data, data1) {
            this._zhigouRechargeData = [];
            for (var i = 0; i < data.length; i++) {
                var tempVO = vo.fromPool(vo.ProtoPairIntIntVO, data[i]);
                this._zhigouRechargeData.push(tempVO);
            }
            this._zhigouGotRewardData = [];
            for (var i = 0; i < data1.length; i++) {
                var tempVO = vo.fromPool(vo.ProtoPairIntIntVO, data1[i]);
                this._zhigouGotRewardData.push(tempVO);
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "zhigouRechargeData", {
            /**充值过的次数 */
            get: function () {
                return this._zhigouRechargeData;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.getZhigouRechargeData = function (key) {
            if (this._zhigouRechargeData) {
                for (var i = 0; i < this._zhigouRechargeData.length; i++) {
                    if (this._zhigouRechargeData[i].key == key) {
                        return this._zhigouRechargeData[i].value;
                    }
                }
            }
            return 0;
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "zhigouGotRewardData", {
            /**领取的次数 */
            get: function () {
                var _this = this;
                this._zhigouGotRewardData.sort(function (a, b) {
                    var aS = _this.getState(a);
                    var bS = _this.getState(b);
                    if (aS != bS) {
                        return aS - bS;
                    }
                    else {
                        return a.key - b.key;
                    }
                });
                return this._zhigouGotRewardData;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.getZhigouGotRewardData = function (key) {
            if (this._zhigouGotRewardData) {
                for (var i = 0; i < this._zhigouGotRewardData.length; i++) {
                    if (this._zhigouGotRewardData[i].key == key) {
                        return this._zhigouGotRewardData[i].value;
                    }
                }
            }
            return 0;
        };
        ModelSgActivitySummer.prototype.getState = function (vo) {
            var state = 0;
            var temp = Templates.getTemplateByProperty(templates.Map.HOLIDAYRECHARGE, "rechargeId", vo.key);
            var count = this.getZhigouRechargeData(vo.key);
            if (count < temp.buyTimes) {
                if (vo.value >= count) {
                    return 1;
                }
            }
            else {
                if (vo.value >= count) {
                    return 2;
                }
            }
            return 0;
        };
        ModelSgActivitySummer.prototype.requestZhiGouInfosData = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Holiday_GetRechargeBuyInfo);
            this.request(n.MessageMap.C2G_HOLIDAY_GETRECHARGEBUYINFO, msg, utils.Handler.create(this, function (data) {
                _this.initZhiGouData(data.RechargeList, data.GotRewardListt);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        /**直购活动购买*/
        ModelSgActivitySummer.prototype.requestBuyZhiGou = function (id, successhandler) {
            var msg = n.MessagePool.from(n.C2G_Holiday_GetRechargeBuyReward);
            msg.RechargeId = id;
            this.request(n.MessageMap.C2G_HOLIDAY_GETRECHARGEBUYREWARD, msg, utils.Handler.create(this, function (data) {
                if (data.Result >= 0 && successhandler)
                    successhandler.runWith(data);
            }));
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "rechargeVO", {
            /**活动中的充值返利 */
            get: function () {
                if (this._rechargeData) {
                    this._rechargeData.sort(function (a, b) {
                        return a.template.id - b.template.id;
                    });
                }
                return this._rechargeData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "haoHuaItemList", {
            // public requestActivityRechargeData(callback: utils.Handler): void {
            // 	n.net.request(n.MessageMap.C2G_RECHARGE_INFO, n.MessagePool.from(n.C2G_Recharge_Info),
            // 		utils.Handler.create(this, function (data: n.G2C_Recharge_Info): void {
            // 			for (let i: number = 0; i < data.RechargeId.length; i++) {
            // 				for (let d of this._rechargeData) {
            // 					if (d.template.id == data.RechargeId[i]) {
            // 						d.buyState = true;
            // 					}
            // 				}
            // 			}
            // 			if (callback) {
            // 				callback.run();
            // 			}
            // 		}));
            // }
            /**豪华装盘 */
            get: function () {
                // if (this._haoHuaItemList) {
                // 	this._haoHuaItemList.sort(function (a: n.ProtoHaoHuaZhuanPanItem, b: n.ProtoHaoHuaZhuanPanItem): number {
                // 		var item: templates.item = Templates.getTemplateById(templates.Map.ITEM, a.ItemId);
                // 		var item1: templates.item = Templates.getTemplateById(templates.Map.ITEM, b.ItemId);
                // 		return item1.quality - item.quality;
                // 	});
                // }
                return this._haoHuaItemList;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.getHaoHuaBigPos = function (pos) {
            if (this._haoHuaItemList) {
                for (var i = 0; i < this._haoHuaItemList.length; i++) {
                    if (this._haoHuaItemList[i].Pos == pos)
                        return true;
                }
            }
            return false;
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "HaoHuaLastPos", {
            get: function () {
                if (this._haoHuaItemList) {
                    return this._haoHuaItemList[this._haoHuaItemList.length - 1].Pos;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestHaoHuaChougJiang = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HaoHuaZhuanPan_DoChouJiang);
            msg.Type = type;
            this.request(n.MessageMap.C2G_HAOHUAZHUANPAN_DOCHOUJIANG, msg, utils.Handler.create(this, function (data) {
                if (_this._doChouJiang) {
                    n.MessagePool.to(_this._doChouJiang);
                    _this._doChouJiang = null;
                }
                if (_this._haoHuaItemList) {
                    for (var _i = 0, _a = _this._haoHuaItemList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._haoHuaItemList.length = 0;
                }
                _this._doChouJiang = data;
                _this._doChouJiang.autoRecover = false;
                _this._haoHuaItemList = _this._doChouJiang.ItemList;
                // logger.log("抽奖信息=====",this._haoHuaItemList);
                if (complete)
                    complete.runWith(_this._doChouJiang);
            }));
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "recordHaoHuaBigList", {
            get: function () {
                return this._recordHaoHuaBigList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "recordHaoHuaAllList", {
            get: function () {
                return this._recordHaoHuaAllList;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestHaoHuaChougJiangRecord = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HaoHuaZhuanPan_GetRecordList);
            this.request(n.MessageMap.C2G_HAOHUAZHUANPAN_GETRECORDLIST, msg, utils.Handler.create(this, function (data) {
                if (_this._haohuaRecordList) {
                    n.MessagePool.to(_this._haohuaRecordList);
                    _this._haohuaRecordList = null;
                }
                if (_this._recordHaoHuaBigList) {
                    for (var _i = 0, _a = _this._recordHaoHuaBigList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._recordHaoHuaBigList.length = 0;
                }
                if (_this._recordHaoHuaAllList) {
                    for (var _b = 0, _c = _this._recordHaoHuaAllList; _b < _c.length; _b++) {
                        var item = _c[_b];
                        n.MessagePool.to(item);
                    }
                    _this._recordHaoHuaAllList.length = 0;
                }
                _this._haohuaRecordList = data;
                _this._haohuaRecordList.autoRecover = false;
                _this._recordHaoHuaBigList = _this._haohuaRecordList.BigRecordList;
                _this._recordHaoHuaAllList = _this._haohuaRecordList.AllRecordList;
                _this._allJiangChi = _this._haohuaRecordList.MoneyValuePool;
                if (complete)
                    complete.runWith(_this._haohuaRecordList);
            }));
        };
        /**豪华转盘红点 */
        ModelSgActivitySummer.prototype.checkZuangPanItemRedPoint = function () {
            if (this.getActivitySummerListTemplates(game.TypeSummerActivity.HHZP)) {
                var seting = GameModels.activitySummer.currHaoHuaDataSeting;
                if (!seting)
                    return false;
                var str = seting.value.split(";");
                return GameModels.bag.getItemCountById(str[1].split("_")[0]) > 0;
            }
            return false;
        };
        /**道具转盘红点 */
        ModelSgActivitySummer.prototype.checkDaoJuZhuanPanRedPoint = function () {
            if (this.getActivitySummerListTemplates(game.TypeSummerActivity.DJZP)) {
                var seting = GameModels.activitySummer.currDaoJuDataSeting;
                if (!seting)
                    return false;
                var str = seting.value.split(";");
                return GameModels.bag.getItemCountById(str[1].split("_")[0]) > 0;
            }
            return false;
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "recordDaoJuAllList", {
            get: function () {
                return this._recordDaoJuAllList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "daoJuItemList", {
            get: function () {
                // if (this._daojuItemList) {
                // 	this._daojuItemList.sort(function (a: n.ProtoDaoJuZhuanPanItem, b: n.ProtoDaoJuZhuanPanItem): number {
                // 		var item: templates.item = Templates.getTemplateById(templates.Map.ITEM, a.ItemId);
                // 		var item1: templates.item = Templates.getTemplateById(templates.Map.ITEM, b.ItemId);
                // 		return item1.quality - item.quality;
                // 	});
                // }
                return this._daojuItemList;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestDaoJuChougJiangRecord = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_DaoJuZhuanPan_GetRecordList);
            this.request(n.MessageMap.C2G_DAOJUZHUANPAN_GETRECORDLIST, msg, utils.Handler.create(this, function (data) {
                if (_this._daojuRecordList) {
                    n.MessagePool.to(_this._daojuRecordList);
                    _this._daojuRecordList = null;
                }
                if (_this._recordDaoJuAllList) {
                    for (var _i = 0, _a = _this._recordDaoJuAllList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._recordDaoJuAllList.length = 0;
                }
                _this._daojuRecordList = data;
                _this._daojuRecordList.autoRecover = false;
                _this._recordDaoJuAllList = _this._daojuRecordList.AllRecordList;
                //logger.log("道具抽奖信息记录=====", this._recordDaoJuAllList);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        ModelSgActivitySummer.prototype.requestDaoJuChougJiang = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_DaoJuZhuanPan_DoChouJiang);
            msg.Type = type;
            this.request(n.MessageMap.C2G_DAOJUZHUANPAN_DOCHOUJIANG, msg, utils.Handler.create(this, function (data) {
                if (_this._daojuChouJiang) {
                    n.MessagePool.to(_this._daojuChouJiang);
                    _this._daojuChouJiang = null;
                }
                if (_this._daojuItemList) {
                    for (var _i = 0, _a = _this._daojuItemList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._daojuItemList.length = 0;
                }
                _this._daojuChouJiang = data;
                _this._daojuChouJiang.autoRecover = false;
                _this._daojuItemList = _this._daojuChouJiang.ItemList;
                //logger.log("道具抽奖信息=====", this._daojuItemList);
                if (complete)
                    complete.runWith(_this._doChouJiang);
            }));
        };
        /**活动任务 */
        ModelSgActivitySummer.prototype.checkHuoDongTaskRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.TASK);
            if (temp) {
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        /**元宝转盘 */
        ModelSgActivitySummer.prototype.checkMoShiRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.MSZP);
            if (temp) {
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        /**连充送礼 */
        ModelSgActivitySummer.prototype.checklianchongRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.LCSL);
            if (temp) {
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        /**元宝转盘 */
        ModelSgActivitySummer.prototype.net_summerZhuanPan = function (callback) {
            var _this = this;
            n.net.onError(n.MessageMap.C2G_HOLIDAYMOSHIZHUANPAN_GETINFO, utils.Handler.create(this, function (data) {
                logger.log("net_summerZhuanPan.onError");
            }));
            this.request(n.MessageMap.C2G_HOLIDAYMOSHIZHUANPAN_GETINFO, n.MessagePool.from(n.C2G_HolidayMoShiZhuanPan_GetInfo), utils.Handler.create(this, function (data) {
                _this._totalGetMoShi = data.TotalGetMoShi;
                _this._leftTurnTimes = data.LeftTimes;
                _this._usedTurnTimes = data.UsedTimes;
                _this._todayPayCount = data.TodayPayCount;
                if (_this._recordMoshiList) {
                    for (var _i = 0, _a = _this._recordMoshiList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._recordMoshiList.length = 0;
                }
                _this._recordMoshiList = data.RecordList.concat();
                for (var _b = 0, _c = _this._recordMoshiList; _b < _c.length; _b++) {
                    var item = _c[_b];
                    item.autoRecover = false;
                }
                if (callback) {
                    callback.run();
                }
            }));
        };
        ModelSgActivitySummer.prototype.summerzhuanPanDone = function (callback) {
            this.request(n.MessageMap.C2G_HOLIDAYMOSHIZHUANPAN_DONE, n.MessagePool.from(n.C2G_HolidayMoShiZhuanPan_Done), utils.Handler.create(this, function (data) {
                var record = data.NewRecord;
                record.autoRecover = false;
                if (callback) {
                    callback.runWith(record);
                }
            }));
        };
        ModelSgActivitySummer.prototype.getLeftTurnTimes = function () {
            return this._leftTurnTimes;
        };
        ModelSgActivitySummer.prototype.getUsedTurnTimes = function () {
            return this._usedTurnTimes;
        };
        ModelSgActivitySummer.prototype.getTodayPayCount = function () {
            return this._todayPayCount;
        };
        ModelSgActivitySummer.prototype.getTotalGetMoShi = function () {
            return this._totalGetMoShi;
        };
        ModelSgActivitySummer.prototype.getMoshiRecordList = function () {
            return this._recordMoshiList;
        };
        ModelSgActivitySummer.prototype.setLeftTurnTimes = function () {
            this._leftTurnTimes -= 1;
        };
        ModelSgActivitySummer.prototype.setUsedTurnTimes = function () {
            this._usedTurnTimes += 1;
        };
        ModelSgActivitySummer.prototype.setTotalGetMoShi = function (glod) {
            this._totalGetMoShi += glod;
        };
        ModelSgActivitySummer.prototype.setRecordList = function (data) {
            if (this._recordMoshiList)
                this._recordMoshiList.push(data);
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "freeTimes", {
            get: function () {
                return this._freeTimes ? this._freeTimes : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "nextRefreshTime", {
            get: function () {
                return this._nextRefreshTime ? this._nextRefreshTime : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "refreshCost", {
            get: function () {
                return this._refreshCost ? this._refreshCost : 0;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestHolidayMysteryShopdInfosData = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HolidayMysteryShop_GetInfo);
            this.request(n.MessageMap.C2G_HOLIDAYMYSTERYSHOP_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this.initMysteryShopData(data.Info.ShopList);
                _this.initMysteryShopLimitData(data.Info.LimitList);
                _this.initMysteryShopRecordData(data.Info.RecordList);
                _this._freeTimes = data.Info.FreeTimes;
                _this._nextRefreshTime = data.Info.NextRefreshTime;
                _this._refreshCost = data.Info.RefreshCost;
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        ModelSgActivitySummer.prototype.requestRefreshMysteryShop = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HolidayMysteryShop_Refresh);
            this.request(n.MessageMap.C2G_HOLIDAYMYSTERYSHOP_REFRESH, msg, utils.Handler.create(this, function (data) {
                _this.initMysteryShopData(data.Info.ShopList);
                _this.initMysteryShopLimitData(data.Info.LimitList);
                _this.initMysteryShopRecordData(data.Info.RecordList);
                _this._freeTimes = data.Info.FreeTimes;
                _this._nextRefreshTime = data.Info.NextRefreshTime;
                _this._refreshCost = data.Info.RefreshCost;
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        ModelSgActivitySummer.prototype.requestbuyMysteryShop = function (shopid, useFree, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HolidayMysteryShop_Buy);
            msg.ShopId = shopid;
            msg.UseFree = useFree;
            this.request(n.MessageMap.C2G_HOLIDAYMYSTERYSHOP_BUY, msg, utils.Handler.create(this, function (data) {
                _this.initMysteryShopData(data.Info.ShopList);
                _this.initMysteryShopLimitData(data.Info.LimitList);
                _this.initMysteryShopRecordData(data.Info.RecordList);
                _this._freeTimes = data.Info.FreeTimes;
                _this._nextRefreshTime = data.Info.NextRefreshTime;
                _this._refreshCost = data.Info.RefreshCost;
                _this.dispatchEventWith(ModelSgActivitySummer.ACTIVITY_SHENMI_SHOP_BUY);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        ModelSgActivitySummer.prototype.initMysteryShopRecordData = function (data) {
            this._mysteryShopRecordData = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerMysteryRecordVO);
                legion.decode(data[i]);
                this._mysteryShopRecordData.push(legion);
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "mysteryShopRecordData", {
            get: function () {
                return this._mysteryShopRecordData ? this._mysteryShopRecordData : [];
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.initMysteryShopData = function (data) {
            this._mysteryShopData = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerMysteryVO);
                legion.decode(data[i]);
                this._mysteryShopData.push(legion);
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "mysteryShopData", {
            get: function () {
                return this._mysteryShopData ? this._mysteryShopData : [];
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.initMysteryShopLimitData = function (data) {
            this._mysteryShopLimitData = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerMysteryVO);
                legion.decode(data[i]);
                this._mysteryShopLimitData.push(legion);
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "mysteryShopLimitData", {
            get: function () {
                if (this._mysteryShopLimitData) {
                    this._mysteryShopLimitData.sort(function (a, b) {
                        return a.template.showPos - b.template.showPos;
                    });
                }
                return this._mysteryShopLimitData ? this._mysteryShopLimitData : [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "mysteryShopLimitDataId", {
            get: function () {
                var num = [];
                if (this._mysteryShopLimitData) {
                    for (var i = 0; i < this._mysteryShopLimitData.length; i++) {
                        num.push(this._mysteryShopLimitData[i].shopid);
                    }
                }
                return num;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestTotalCostInfo = function (caller, method) {
            var serverId = GameModels.login.serverList.selected.sid;
            n.http.request((window.config.ssl ? 'https' : 'http') + "://" + window.config.ip + "/" + window.config.platform + "/totalCostInfoV2.php?serverid=" + serverId, utils.Handler.create(this, function (data) {
                this._totalCostInfos = data;
                this._maxRankCount = data.rank_size;
                method.call(caller);
            }), egret.URLRequestMethod.GET);
        };
        ModelSgActivitySummer.prototype.totalCostInfos = function () {
            return this._totalCostInfos;
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "maxRankCount", {
            get: function () {
                return this._maxRankCount;
            },
            enumerable: true,
            configurable: true
        });
        /**夏日商店处理 */
        ModelSgActivitySummer.prototype.initShopData = function (data) {
            this._shopVo = [];
            for (var i = 0; i < data.length; i++) {
                var shopVO = vo.fromPool(vo.ActivitySummerShopVO);
                shopVO.decode(data[i]);
                this._shopVo.push(shopVO);
            }
        };
        ModelSgActivitySummer.prototype.updataShopDataLeftCount = function (shopid, count) {
            for (var i = 0; i < this._shopVo.length; i++) {
                if (this._shopVo[i].shopid == shopid) {
                    this._shopVo[i].buyCount = (count);
                    this.dispatchEventWith(ModelSgActivitySummer.ACTIVITY_JIFEN_SHOP_CHANGE, false, this._shopVo[i]);
                    break;
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "shopData", {
            get: function () {
                if (this._shopVo) {
                    this._shopVo.sort(function (a, b) {
                        return a.shopid - b.shopid;
                    });
                }
                return this._shopVo;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestShopData = function (type, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HolidayLimitShop_GetInfo);
            msg.HolidayType = type;
            this.request(n.MessageMap.C2G_HOLIDAYLIMITSHOP_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this.initShopData(data.BuyTimesList);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        ModelSgActivitySummer.prototype.buyShopDataCall = function (shopid, shopCount, type, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HolidayLimitShop_Buy);
            msg.ShopId = shopid;
            msg.Count = shopCount;
            msg.HolidayType = type;
            this.request(n.MessageMap.C2G_HOLIDAYLIMITSHOP_BUY, msg, utils.Handler.create(this, function (data) {
                _this.updataShopDataLeftCount(data.ShopId, data.LeftBuyTimes);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        /**圣诞树 */
        ModelSgActivitySummer.prototype.checkShengDanShuRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.SDSBOSS);
            if (temp) {
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelSgActivitySummer.prototype.requestHolidayXYDBGetInfo = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HolidayXYDB_GetInfo);
            this.request(n.MessageMap.C2G_HOLIDAYXYDB_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this._poolId = data.PoolId;
                _this._luckValue = data.LuckValue;
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "poolId", {
            get: function () {
                return this._poolId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "luckValue", {
            get: function () {
                return this._luckValue;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestHolidayXYDBGetRecord = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HolidayXYDB_GetRecord);
            this.request(n.MessageMap.C2G_HOLIDAYXYDB_GETRECORD, msg, utils.Handler.create(this, function (data) {
                if (_this._xydbRecordData) {
                    n.MessagePool.to(_this._xydbRecordData);
                    _this._xydbRecordData = null;
                }
                if (_this._xydbRecord) {
                    for (var _i = 0, _a = _this._xydbRecord; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._xydbRecord.length = 0;
                }
                _this._xydbRecordData = data;
                _this._xydbRecordData.autoRecover = false;
                _this._xydbRecord = _this._xydbRecordData.RecordList;
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "xydbRecord", {
            get: function () {
                return this._xydbRecord;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.requestHolidayXYDBChouJiang = function (conut, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HolidayXYDB_ChouJiang);
            msg.DoTimes = conut;
            this.request(n.MessageMap.C2G_HOLIDAYXYDB_CHOUJIANG, msg, utils.Handler.create(this, function (data) {
                if (_this._xydbChouJiangData) {
                    n.MessagePool.to(_this._xydbChouJiangData);
                    _this._xydbChouJiangData = null;
                }
                _this._xydbChouJiangData = data;
                _this._xydbChouJiangData.autoRecover = false;
                _this._poolId = _this._xydbChouJiangData.PoolId;
                _this._luckValue = _this._xydbChouJiangData.LuckValue;
                _this._chouJiangCount = _this._xydbChouJiangData.DoTimes;
                _this._isBigReward = _this._xydbChouJiangData.BigReward == 1 ? true : false;
                _this.initxydbChouJingResult(_this._xydbChouJiangData.ResultList);
                // logger.log("抽奖的奖池=====", this._poolId);
                // logger.log("抽奖的幸运值=====", this._luckValue);
                // logger.log("抽奖的实际次数=====", this._chouJiangCount);
                // logger.log("抽奖是否有大奖=====", this._isBigReward);
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "isBigReward", {
            get: function () {
                return this._isBigReward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "xydbChouJingCount", {
            get: function () {
                return this._chouJiangCount;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.initxydbChouJingResult = function (data) {
            this._xydbChouJiangResult = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.XingYingDuoBaoVO);
                legion.decode(data[i]);
                logger.log("抽奖的结果顺序为=" + i + "状态为=" + data[i].State + "位置为=" + (data[i].Pos - 1));
                this._xydbChouJiangResult.push(legion);
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "xydbChouJingResult", {
            get: function () {
                return this._xydbChouJiangResult;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.isXYDBHashPos = function (pos) {
            if (this._xydbChouJiangResult) {
                for (var _i = 0, _a = this._xydbChouJiangResult; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.pos == pos)
                        return true;
                }
            }
            return false;
        };
        ModelSgActivitySummer.prototype.getXYDBStateByPos = function (pos) {
            if (this._xydbChouJiangResult) {
                for (var _i = 0, _a = this._xydbChouJiangResult; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.pos == pos)
                        return item.state;
                }
            }
            return 0;
        };
        ModelSgActivitySummer.prototype.initXingYingGuoBaoBoxData = function (data) {
            this._xingyingduobaoBoxData = [];
            for (var i = 0; i < data.length; i++) {
                var legion = vo.fromPool(vo.ActivitySummerVO);
                legion.decode(data[i]);
                this._xingyingduobaoBoxData.push(legion);
            }
        };
        ModelSgActivitySummer.prototype.upDataXingYingGuoBaoBoxData = function (id) {
            if (this._xingyingduobaoBoxData) {
                for (var i = 0; i < this._xingyingduobaoBoxData.length; i++) {
                    if (this._xingyingduobaoBoxData[i].holidayRewardId == id) {
                        this._xingyingduobaoBoxData[i].holidayRewardState = 3;
                        break;
                    }
                }
            }
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "xingYingGuoBaoBoxData", {
            get: function () {
                if (this._xingyingduobaoBoxData) {
                    this._xingyingduobaoBoxData.sort(function (a, b) {
                        // return a.holidayRewardId - b.holidayRewardId;
                        if (a.holidayRewardState != b.holidayRewardState) {
                            return a.holidayRewardState - b.holidayRewardState;
                        }
                        else {
                            return a.holidayRewardId - b.holidayRewardId;
                        }
                    });
                }
                return this._xingyingduobaoBoxData;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.prototype.checkXingYingDuoBaoRedPoint = function () {
            var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.XYDB);
            if (temp) {
                if (GameModels.bag.getItemCountById(ConfigData.ITEM_XINGYINGDUOBAO) > 0)
                    return true;
                return this.getSummerActivityListRedPonitState(temp.id) == 0 ? false : true;
            }
            return false;
        };
        ModelSgActivitySummer.prototype.requestHolidayHongBao = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Holiday_ZaiXianHongBao_GetInfo);
            this.request(n.MessageMap.C2G_HOLIDAY_ZAIXIANHONGBAO_GETINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._hongBaoData) {
                    n.MessagePool.to(_this._hongBaoData);
                    _this._hongBaoData = null;
                }
                if (_this._hongbaoRecord) {
                    for (var _i = 0, _a = _this._hongbaoRecord; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._hongbaoRecord.length = 0;
                }
                _this._hongBaoData = data;
                _this._hongBaoData.autoRecover = false;
                _this._hongbaoRecord = data.RecordList;
                if (successhandler)
                    successhandler.runWith(data);
            }));
        };
        Object.defineProperty(ModelSgActivitySummer.prototype, "hongbagState", {
            get: function () {
                return this._hongBaoData ? this._hongBaoData.State : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "hongbagEndTime", {
            get: function () {
                return this._hongBaoData ? this._hongBaoData.EndTime - GameModels.timer.getTimer() / 1000 : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivitySummer.prototype, "hongbaoRecord", {
            get: function () {
                return this._hongbaoRecord;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivitySummer.ACTIVITY_JIFENDUIHUAN_LINK = "ACTIVITY_JIFENDUIHUAN_LINK";
        ModelSgActivitySummer.ACTIVITY_LUNPAN_LINK = "ACTIVITY_LUNPAN_LINK";
        ModelSgActivitySummer.ACTIVITY_HAOHUAZUANGPAN_LINK = "ACTIVITY_HAOHUAZUANGPAN_LINK";
        ModelSgActivitySummer.ACTIVITY_JIFEN_SHOP_CHANGE = "ACTIVITY_JIFEN_SHOP_CHANGE";
        ModelSgActivitySummer.ACTIVITY_MY_JIFEN_CHANGE = "ACTIVITY_MY_JIFEN_CHANGE";
        ModelSgActivitySummer.ACTIVITY_SUMMER_OPEN = "ACTIVITY_SUMMER_OPEN";
        ModelSgActivitySummer.ACTIVITY_SUMMER_LUNPAN_ANGIN = "ACTIVITY_SUMMER_LUNPAN_ANGIN";
        ModelSgActivitySummer.ACTIVITY_HAOHUAZUANGPAN_POOL = "ACTIVITY_HAOHUAZUANGPAN_POOL";
        ModelSgActivitySummer.ACTIVITY_JIZI_DUIHUAN_LINK = "ACTIVITY_JIZI_DUIHUAN";
        ModelSgActivitySummer.ACTIVITY_SHENMI_SHOP_BUY = "ACTIVITY_SHENMI_SHOP_BUY";
        ModelSgActivitySummer.ACTIVITY_XINGYUNDUOHAO_CHANGE_POOL = "ACTIVITY_XINGYUNDUOHAO_CHANGE_POOL";
        ModelSgActivitySummer.GO_GET_PET_VIEW = "GO_GET_PET_VIEW";
        ModelSgActivitySummer.KUANIAN_GIFT_CHANGE = "KUANIAN_GIFT_CHANGE";
        ModelSgActivitySummer.UPDATA_ZHIGOU_LIBAO = "UPDATA_ZHIGOU_LIBAO";
        return ModelSgActivitySummer;
    }(mo.ModelBase));
    mo.ModelSgActivitySummer = ModelSgActivitySummer;
    __reflect(ModelSgActivitySummer.prototype, "mo.ModelSgActivitySummer");
})(mo || (mo = {}));
