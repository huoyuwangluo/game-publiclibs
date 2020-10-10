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
    /**材料副本*/
    var ModelGameMaterial = (function (_super) {
        __extends(ModelGameMaterial, _super);
        function ModelGameMaterial() {
            var _this = _super.call(this) || this;
            _this._bossActived = false;
            _this._timeCost = 0;
            // public _copyMonsterId: number;//当前怪物ID
            // public _copyMonsterLeftCount: number;//当前剩余挑战次数
            // public _initCount: number;//基础挑战次数
            /**队伍锁定 */
            _this._teamLock = true;
            _this._currStep = 0;
            return _this;
        }
        ModelGameMaterial.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._types = [
                ModelGameMaterial.COPY_EXP,
                ModelGameMaterial.COPY_ZHANGONG,
                ModelGameMaterial.COPY_ZHANDUN,
                ModelGameMaterial.COPY_YUMAO
                /*ModelGameMaterial.COPY_MINGHUN,*/
                /*ModelGameMaterial.COPY_TEAM,
                ModelGameMaterial.COPY_MAIGU*/ 
            ];
            this.initializeData(this._types);
            this._needUpdate = true;
            this.updateCopyData(null, null);
            this.onRoute(n.MessageMap.G2C_COPY_NOTIFYPROGRESS, utils.Handler.create(this, this.refreshWave));
            this.onRoute(n.MessageMap.G2C_COPY_NOTIFYPROGRESSEX, utils.Handler.create(this, this.refreshMaiGuProgressEx));
            //this.onRoute(n.MessageMap.G2C_MAIGU_NOTIFYLUCKBOSSREWARD, utils.Handler.create(this, this.notifyLuckBossReward));
            this.onRoute(n.MessageMap.G2C_TEAM_NOTIFY_ROOMINFO, utils.Handler.create(this, this.notifyTeamRoomInfo, null, false));
            this.onRoute(n.MessageMap.G2C_TEAM_NOTIFY_ENTER, utils.Handler.create(this, this.notifyEnterTeamCopy, null, false));
            this.onRoute(n.MessageMap.G2C_TEAM_NOTIFY_MESSAGE, utils.Handler.create(this, this.notifyTeamMessage, null, false));
            this.onRoute(n.MessageMap.G2C_TEAM_NOTIFY_NOTICE, utils.Handler.create(this, this.notifyTeamLeaderStart, null, false));
            this.requestMaiGuInfoData();
            this.requestHuanJieData();
            this.requesTeamCopyInfo();
        };
        ModelGameMaterial.prototype.refreshWave = function (data) {
            this._indexWave = data.Count;
            this._totalWave = data.Total;
            this.dispatchEventWith(ModelGameMaterial.PROGRESS_CHANGE);
        };
        /**更新副本数据 */
        ModelGameMaterial.prototype.updateCopyData = function (caller, method) {
            var _this = this;
            // if (!this._needUpdate) {
            //     method.call(caller);
            //     return;
            // }
            this.request(n.MessageMap.C2G_MAT_COPY_INFO, n.MessagePool.from(n.C2G_Mat_Copy_Info), utils.Handler.create(this, function (data) {
                if (_this._serverData) {
                    _this._serverData.reset();
                    n.MessagePool.to(_this._serverData);
                    _this._serverData = null;
                }
                data.autoRecover = false;
                _this._serverData = data;
                var time = (GameModels.timer.getTimer() * .001) >> 0;
                // this._copyMonsterId = data.CurCopyId;
                // this._copyMonsterLeftCount = data.LeftCount;
                // this._initCount = data.InitCount;
                _this._needUpdate = false;
                if (method) {
                    method.call(caller);
                }
                GameModels.state.updateState(GameRedState.MATERIAL_COPY_EXPFUBEN);
                GameModels.state.updateState(GameRedState.CITY);
                GameModels.state.updateState(GameRedState.MATERIAL_COPY_ZHANGONGFUBEN);
                GameModels.state.updateState(GameRedState.MATERIAL_COPY_ZHANDUNFUBEN);
                GameModels.state.updateState(GameRedState.MATERIAL_COPY_YUMAOFUBEN);
            }));
        };
        /**幻界相关信息 */
        ModelGameMaterial.prototype.checkHuanjieRedPoint = function () {
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.material, 2)) {
                //if (GameModels.bag.getItemCountById(ConfigData.ITEM_HUANJIE_MICHENG) > 0) return true;
                if (this._huanjieData && this._huanjieData.LeftCount > 0) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperty(ModelGameMaterial.prototype, "currCopyVo", {
            get: function () {
                return this._curCopyVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "huanjieData", {
            get: function () {
                return this._huanjieData;
            },
            enumerable: true,
            configurable: true
        });
        ModelGameMaterial.prototype.requestHuanJieData = function (successhandler) {
            // var msg: n.C2G_LostCity_Info = n.MessagePool.from(n.C2G_LostCity_Info) as n.C2G_LostCity_Info;
            // this.request(n.MessageMap.C2G_LOSTCITY_INFO, msg, utils.Handler.create(this, (data: n.G2C_LostCity_Info) => {
            //     if (this._huanjieData) {
            //         n.MessagePool.to(this._huanjieData);
            //         this._huanjieData = null;
            //     }
            //     this._huanjieData = data;
            //     this._huanjieData.autoRecover = false;
            //     // GameModels.state.updateState(GameRedState.MATERIAL_COPY_HUANJIE_FUBEN);
            //     if (successhandler) successhandler.runWith(data);
            // }));
        };
        //埋骨禁地获取信息
        ModelGameMaterial.prototype.requestMaiGuInfoData = function (handler) {
            // var msg: n.C2G_MaiGu_Info = n.MessagePool.from(n.C2G_MaiGu_Info) as n.C2G_MaiGu_Info;
            // this.request(n.MessageMap.C2G_MAIGU_INFO, msg, utils.Handler.create(this, (data: n.G2C_MaiGu_Info) => {
            //     if (this._maiguInfoData) {
            //         n.MessagePool.to(this._maiguInfoData);
            //         this._maiguInfoData = null;
            //     }
            //     this._maiguInfoData = data;
            //     this._maiguInfoData.autoRecover = false;
            //     this.getLuckBossDrops();
            //     // GameModels.state.updateState(GameRedState.MATERIAL_COPY_MAIGU_FUBEN);
            //     if (handler) handler.run();
            // }));
        };
        //埋骨禁地召唤boss
        ModelGameMaterial.prototype.requestMaiGuBallBoss = function (handler) {
            // var msg: n.C2G_MaiGu_CallBoss = n.MessagePool.from(n.C2G_MaiGu_CallBoss) as n.C2G_MaiGu_CallBoss;
            // this.request(n.MessageMap.C2G_MAIGU_CALLBOSS, msg, utils.Handler.create(this, function (data: n.G2C_MaiGu_CallBoss) {
            //     if (data.Result == 1) {
            //         if (handler) handler.run();
            //     }
            // }));
        };
        //埋骨禁地使用技能
        ModelGameMaterial.prototype.requestMaiGuUseSkill = function (type, handler) {
            // var msg: n.C2G_MaiGu_UseSkill = n.MessagePool.from(n.C2G_MaiGu_UseSkill) as n.C2G_MaiGu_UseSkill;
            // msg.Type = type;
            // this.request(n.MessageMap.C2G_MAIGU_USESKILL, msg, utils.Handler.create(this, function (data: n.G2C_MaiGu_UseSkill) {
            //     if (data.Result == 1) {
            //         if (handler) handler.run();
            //     }
            // }));
        };
        ModelGameMaterial.prototype.refreshMaiGuProgressEx = function (data) {
            if (this._copyNotifyProgressEx) {
                n.MessagePool.to(this._copyNotifyProgressEx);
                this._copyNotifyProgressEx = null;
            }
            this._copyNotifyProgressEx = data;
            this._copyNotifyProgressEx.autoRecover = false;
            this.dispatchEventWith(ModelGameMaterial.PROGRESS_CHANGE);
        };
        ModelGameMaterial.prototype.notifyLuckBossReward = function (data) {
            // this._luckBossServerItems = [];
            // var items: vo.ItemVO[] = [];
            // for (var i: number = 0; i < data.Items.length; i++) {
            //     var itemVO: vo.ItemVO = <vo.ItemVO>vo.fromPool(vo.ItemVO, parseInt(data.Items[i].Id));
            //     if (itemVO) {
            //         itemVO.count = data.Items[i].Count;
            //         this._luckBossServerItems.push(itemVO);
            //     }
            // }
            // this.dispatchEventWith(ModelGameMaterial.MAIGU_LUCKBOSS_REWARD);
        };
        ModelGameMaterial.prototype.checkMaiGuRed = function () {
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.material, 3)) {
                if (this._maiguInfoData && this._maiguInfoData.LeftCount > 0) {
                    return true;
                }
            }
            return false;
        };
        ModelGameMaterial.prototype.getLuckBossDrops = function () {
            this._luckBossDrops = [];
            var templateDataSettings = GameModels.dataSet.getDataSettingArrByType(853);
            var templateDataSetting;
            if (this._maiguInfoData) {
                for (var _i = 0, templateDataSettings_1 = templateDataSettings; _i < templateDataSettings_1.length; _i++) {
                    var temp = templateDataSettings_1[_i];
                    if (temp.order == this._maiguInfoData.CurrStep) {
                        templateDataSetting = temp;
                    }
                }
                if (templateDataSetting && templateDataSetting.value) {
                    var array = templateDataSetting.value.split(';');
                    for (var _a = 0, array_1 = array; _a < array_1.length; _a++) {
                        var id = array_1[_a];
                        var itemTemp = Templates.getItemTemplateById(id);
                        vo.EquipVO;
                        if (itemTemp) {
                            var itemVO = vo.fromPool(vo.ItemVO, parseInt(itemTemp.id));
                            this._luckBossDrops.push(itemVO);
                        }
                    }
                }
            }
        };
        //获取埋骨禁地是否可以扫荡:最大通关层数大于等于当前的层数即可
        ModelGameMaterial.prototype.getMaiGuSaoDangBoo = function () {
            if (!this._maiguInfoData)
                return false;
            var copyVO = GameModels.copyMaterial.getVOByStep(mo.ModelGameMaterial.COPY_MAIGU, this._maiguInfoData.CurrStep);
            if (!copyVO)
                return false;
            if (this._maiguInfoData.MaxPassStep >= this._maiguInfoData.CurrStep) {
                return true;
            }
            return false;
        };
        Object.defineProperty(ModelGameMaterial.prototype, "luckBossDrops", {
            get: function () {
                return this._luckBossDrops;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "luckBossServerItems", {
            //幸运boss服务端推送奖励
            get: function () {
                return this._luckBossServerItems;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "zhaoHuanPrice", {
            get: function () {
                var tempDataSetting = GameModels.dataSet.getDataSettingById(851001);
                var price = 0;
                if (tempDataSetting) {
                    price = parseInt(tempDataSetting.value.split("_")[1]);
                }
                return price;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "maiguInfoData", {
            get: function () {
                return this._maiguInfoData;
            },
            enumerable: true,
            configurable: true
        });
        //六道之城，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelGameMaterial.prototype.getliuDaoZhiChengBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(854001, order);
        };
        Object.defineProperty(ModelGameMaterial.prototype, "liuDaoZhiChengBuyMaxNum", {
            //六道之城购买上限值
            get: function () {
                var initValue = 0;
                var templateDataSetting = GameModels.dataSet.getDataSettingById(850002);
                if (templateDataSetting)
                    initValue = parseInt(templateDataSetting.value);
                return initValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "liuDaoRefreshNum", {
            //六道之城第二天刷新值
            get: function () {
                var tempDataSetting = GameModels.dataSet.getDataSettingById(850001);
                var price = 0;
                if (tempDataSetting) {
                    price = parseInt(tempDataSetting.value);
                }
                return price;
            },
            enumerable: true,
            configurable: true
        });
        /**六道之城购买挑战次数*/
        ModelGameMaterial.prototype.liuDaoZhiChengBuyChallengesTimes = function (handler) {
            // var msg: n.C2G_MaiGuJingDi_Buy_Count = n.MessagePool.from(n.C2G_MaiGuJingDi_Buy_Count) as n.C2G_MaiGuJingDi_Buy_Count;
            // this.request(n.MessageMap.C2G_MAIGUJINGDI_BUY_COUNT, msg, utils.Handler.create(this, (data: n.G2C_MaiGuJingDi_Buy_Count) => {
            //     this._maiguInfoData.LeftCount = data.TotalCount;
            //     this._maiguInfoData.BuyCount = data.BuyCount;
            //     // GameModels.state.updateState(GameRedState.MATERIAL_COPY_MAIGU_FUBEN);
            //     if (handler) {
            //         handler.run();
            //     }
            // }));
        };
        //材料副本，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelGameMaterial.prototype.getMaterialsBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(41001, order);
        };
        Object.defineProperty(ModelGameMaterial.prototype, "getMaterialsBuyItemMax", {
            //材料副本，每日最大购买次数
            get: function () {
                var initValue = 0;
                var templateDataSetting = GameModels.dataSet.getDataSettingById(40002);
                if (templateDataSetting)
                    if (templateDataSetting.value) {
                        initValue = parseInt(templateDataSetting.value);
                    }
                if (GameModels.user.player.vip > 0) {
                    var vipTemp = GameModels.vip.vipTemplateById(GameModels.user.player.vip);
                    if (vipTemp)
                        return initValue + vipTemp.clfbBuyTimes;
                }
                else {
                    return initValue;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "getMaterialsRefreshNum", {
            //材料副本，每日刷新次数
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(40001);
                if (templateDataSetting) {
                    if (GameModels.vip.getRewardBuyType(6)) {
                        return parseInt(templateDataSetting.value) + 2;
                    }
                    else {
                        return parseInt(templateDataSetting.value);
                    }
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        /**材料副本购买挑战次数*/
        ModelGameMaterial.prototype.materialsBuyChallengesTimes = function (type, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Mat_Buy_Count);
            msg.MatType = type;
            this.request(n.MessageMap.C2G_MAT_BUY_COUNT, msg, utils.Handler.create(this, function (data) {
                var index = _this.getTypeIndex(data.MatType);
                _this.serverData.List[index].LeftCount = data.TotalCount;
                _this.serverData.List[index].BuyCount = data.BuyCount;
                if (handler) {
                    handler.run();
                }
                GameModels.state.updateState(GameRedState.MATERIAL_COPY_EXPFUBEN);
                GameModels.state.updateState(GameRedState.CITY);
                GameModels.state.updateState(GameRedState.MATERIAL_COPY_ZHANGONGFUBEN);
                GameModels.state.updateState(GameRedState.MATERIAL_COPY_ZHANDUNFUBEN);
                GameModels.state.updateState(GameRedState.MATERIAL_COPY_YUMAOFUBEN);
            }));
        };
        //（经脉副本）原幻界迷城，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelGameMaterial.prototype.getHuanJieBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(623001, order);
        };
        Object.defineProperty(ModelGameMaterial.prototype, "HuanJieBuyMaxNum", {
            //（经脉副本）原幻界迷城购买上限值
            get: function () {
                var initValue = 0;
                var templateDataSetting = GameModels.dataSet.getDataSettingById(622002);
                if (templateDataSetting)
                    initValue = parseInt(templateDataSetting.value);
                return initValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "HuanJieRefreshNum", {
            //（经脉副本）原幻界迷城第二天刷新值
            get: function () {
                var tempDataSetting = GameModels.dataSet.getDataSettingById(622001);
                var price = 0;
                if (tempDataSetting) {
                    price = parseInt(tempDataSetting.value);
                }
                return price;
            },
            enumerable: true,
            configurable: true
        });
        /**（经脉副本）原幻界迷城购买挑战次数*/
        ModelGameMaterial.prototype.huanJieMiChengBuyChallengesTimes = function (handler) {
            // var msg: n.C2G_HuanJieMiCheng_Buy_Count = n.MessagePool.from(n.C2G_HuanJieMiCheng_Buy_Count) as n.C2G_HuanJieMiCheng_Buy_Count;
            // this.request(n.MessageMap.C2G_HUANJIEMICHENG_BUY_COUNT, msg, utils.Handler.create(this, (data: n.G2C_HuanJieMiCheng_Buy_Count) => {
            //     this._huanjieData.LeftCount = data.LeftCount;
            //     this._huanjieData.BuyCount = data.BuyCount;
            //     if (handler) {
            //         handler.run();
            //     }
            //     // GameModels.state.updateState(GameRedState.MATERIAL_COPY_HUANJIE_FUBEN);
            // }));
        };
        Object.defineProperty(ModelGameMaterial.prototype, "copyNotifyProgressEx", {
            get: function () {
                return this._copyNotifyProgressEx;
            },
            enumerable: true,
            configurable: true
        });
        ModelGameMaterial.prototype.clearCopyNotifyProgressEx = function () {
            this._copyNotifyProgressEx = null;
        };
        //---------------------------------------------------
        ModelGameMaterial.prototype.enterGame = function (type, copyVO, caller, method) {
            this._curCopyVO = copyVO;
            this._needUpdate = true;
            this.resetState();
            GameModels.scene.enterGame(type, copyVO ? copyVO.id.toString() : null, caller, method);
        };
        ModelGameMaterial.prototype.requestQuickPass = function (copyId, callback, count) {
            if (count && count > 0) {
                _super.prototype.requestQuickPass.call(this, copyId, callback, count);
            }
            else {
                _super.prototype.requestQuickPass.call(this, copyId, callback);
            }
            this._needUpdate = true;
        };
        Object.defineProperty(ModelGameMaterial.prototype, "needUpdate", {
            set: function (v) {
                this._needUpdate = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelGameMaterial.prototype.resetState = function () {
            this._bossActived = false;
            this._totalWave = 0;
            this._indexWave = 0;
            this._timeCost = 0;
            this._scoreStar = this._curCopyVO ? this._curCopyVO.scoreStar(this._timeCost) : 0;
            this._scoreStarTime = this._curCopyVO ? this._curCopyVO.getStarTime(this._scoreStar) : 0;
        };
        /**开始计时 */
        ModelGameMaterial.prototype.start = function () {
            this._startTime = utils.timer.timeStamp;
            utils.timer.loop(1000, this, this.timeCountDownHandler);
            this.dispatchEventWith(ModelGameMaterial.TIME_CHANGE);
        };
        /**计时结束 */
        ModelGameMaterial.prototype.end = function () {
            utils.timer.clear(this, this.timeCountDownHandler);
        };
        ModelGameMaterial.prototype.timeCountDownHandler = function () {
            this._timeCost = ((utils.timer.timeStamp - this._startTime) / 1000) >> 0;
            this._scoreStar = this._curCopyVO.scoreStar(this._timeCost);
            this._scoreStarTime = this._curCopyVO.getStarTime(this._scoreStar);
            this.dispatchEventWith(ModelGameMaterial.TIME_CHANGE);
        };
        Object.defineProperty(ModelGameMaterial.prototype, "indexWave", {
            get: function () {
                return this._indexWave;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "totalWave", {
            get: function () {
                return this._totalWave;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "timeCost", {
            get: function () {
                return this._timeCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "scoreStar", {
            get: function () {
                return this._scoreStar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "scoreStarTime", {
            get: function () {
                return this._scoreStarTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "isOverWave", {
            get: function () {
                return (this._indexWave + 1) >= this._totalWave;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameMaterial.prototype, "serverData", {
            // /**副本挑战剩余次数 */
            // public get lastCount() {
            //     return this._copyMonsterLeftCount;
            // }
            // /**基础挑战次数 */
            // public get initCount() {
            //     return this._initCount;
            // }
            // /**当前打过的关卡bossId */
            // public get copyMonsterId() {
            //     return this._copyMonsterId;
            // }
            get: function () {
                return this._serverData;
            },
            enumerable: true,
            configurable: true
        });
        /**获得当前可挑战的难度 */
        ModelGameMaterial.prototype.getCurStep = function (type) {
            if (type == 2) {
                type = 4;
            }
            else {
                if (type == 4) {
                    type = 2;
                }
            }
            var copyId = 0;
            if (this._serverData.List[type - 1].CurCopyId == 0) {
                copyId = 200000 + (type * 1000) + 1;
            }
            else {
                copyId = GameModels.copyMaterial.serverData.List[type - 1].CurCopyId + 1;
                if (copyId - (200000 + ((type) * 1000)) > 13) {
                    copyId = GameModels.copyMaterial.serverData.List[type - 1].CurCopyId;
                }
            }
            var MonsterStep = Templates.getTemplateById(templates.Map.OTHERCHAPTER, copyId);
            if (MonsterStep.openLv <= GameModels.user.player.level) {
                return MonsterStep.step;
            }
            else {
                if (MonsterStep.step - 1 <= 0) {
                    return MonsterStep.step;
                }
                return MonsterStep.step - 1;
            }
        };
        /**是不是第一次打某个材料副本 */
        ModelGameMaterial.prototype.isFirstFight = function (copy, type) {
            if (type == 2) {
                type = 4;
            }
            else {
                if (type == 4) {
                    type = 2;
                }
            }
            if (copy.id <= this._serverData.List[type - 1].CurCopyId) {
                return false;
            }
            else {
                return true;
            }
        };
        //第几次的价格数
        ModelGameMaterial.prototype.getCostTimesPrice = function (times) {
            times = times > 100 ? 100 : times;
            times = times <= 0 ? 1 : times;
            return GameModels.dataSet.getBuyCountNeedPrice(40001, times);
        };
        ModelGameMaterial.prototype.getTypelistVOById = function (type, id) {
            var list = this._typelist[type];
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var vo = list_1[_i];
                if (vo.id == id) {
                    return vo;
                }
            }
            return null;
        };
        ModelGameMaterial.prototype.getTypeIndex = function (type) {
            return this._types.indexOf(type);
        };
        ModelGameMaterial.prototype.onTimeChange = function (caller, method) {
            this.addEventListener(ModelGameMaterial.TIME_CHANGE, method, caller);
        };
        ModelGameMaterial.prototype.offTimeChange = function (caller, method) {
            this.removeEventListener(ModelGameMaterial.TIME_CHANGE, method, caller);
        };
        ModelGameMaterial.prototype.onProgressChange = function (caller, method) {
            this.addEventListener(ModelGameMaterial.PROGRESS_CHANGE, method, caller);
        };
        ModelGameMaterial.prototype.offProgressChange = function (caller, method) {
            this.removeEventListener(ModelGameMaterial.PROGRESS_CHANGE, method, caller);
        };
        ModelGameMaterial.prototype.notifyTeamRoomInfo = function (data) {
            if (this._playerInfos) {
                for (var _i = 0, _a = this._playerInfos; _i < _a.length; _i++) {
                    var item = _a[_i];
                    n.MessagePool.to(item);
                }
                this._playerInfos.length = 0;
            }
            this._createId = data.Info.CreateId;
            if (data.Info.CreateId != "") {
                this._copyId = data.Info.CopyId;
                this._playerInfos = data.Info.PlayerInfos.concat();
                for (var _b = 0, _c = this._playerInfos; _b < _c.length; _b++) {
                    var item = _c[_b];
                    item.autoRecover = false;
                }
                this.dispatchEventWith(ModelGameMaterial.OPEN_TEAM_DIALOG);
            }
            else {
                this.dispatchEventWith(ModelGameMaterial.CLOSE_TEAM_DIALOG);
            }
        };
        //获取玩家组队副本信息
        ModelGameMaterial.prototype.requesTeamCopyInfo = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Team_CopyInfo);
            this.request(n.MessageMap.C2G_TEAM_COPYINFO, msg, utils.Handler.create(this, function (data) {
                _this._currStep = data.step;
                // GameModels.state.updateState(GameRedState.MATERIAL_COPY_ZUDUI_FUBEN);
                if (successhandler)
                    successhandler.run();
            }));
        };
        //组队主动进入玩法
        ModelGameMaterial.prototype.sendTeamStart = function () {
            this._teamLock = true;
            var msg = n.MessagePool.from(n.C2G_Team_Start);
            this.request(n.MessageMap.C2G_TEAM_START, msg, utils.Handler.create(this, function (data) {
                if (data.RoomId != "") {
                    //app.gameContext.enterTeamCopyFight(data.copyId, data.RoomId);
                }
            }));
        };
        //组队被动进入玩法
        ModelGameMaterial.prototype.notifyEnterTeamCopy = function (data) {
            this._teamLock = true;
            //app.gameContext.enterTeamCopyFight(data.copyId, data.RoomId);
        };
        ModelGameMaterial.prototype.notifyTeamMessage = function (data) {
            mg.alertManager.tip(data.Message);
        };
        //----------------------------------
        //提醒队长开始
        ModelGameMaterial.prototype.requesTeamLeaderStart = function (successhandler) {
            var msg = n.MessagePool.from(n.C2G_Team_Notice);
            this.request(n.MessageMap.C2G_TEAM_NOTICE, msg, utils.Handler.create(this, function (data) {
                if (successhandler)
                    successhandler.run();
            }));
        };
        //通知队长队员某某某提醒开始
        ModelGameMaterial.prototype.notifyTeamLeaderStart = function (data) {
            this.dispatchEventWith(ModelGameMaterial.NOTICE_TEAM_LEADER_START, false, data.NoticePlayerName);
        };
        //创建组队房间
        ModelGameMaterial.prototype.sendTeamCreateRoom = function (copyId) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Team_CreateRoom);
            msg.CopyId = copyId;
            this.request(n.MessageMap.C2G_TEAM_CREATEROOM, msg, utils.Handler.create(this, function (data) {
                if (_this._playerInfos) {
                    for (var _i = 0, _a = _this._playerInfos; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._playerInfos.length = 0;
                }
                _this._createId = data.Info.CreateId;
                _this._copyId = data.Info.CopyId;
                _this._playerInfos = data.Info.PlayerInfos.concat();
                for (var _b = 0, _c = _this._playerInfos; _b < _c.length; _b++) {
                    var item = _c[_b];
                    item.autoRecover = false;
                }
                _this.dispatchEventWith(ModelGameMaterial.OPEN_TEAM_DIALOG);
            }));
        };
        //邀请 1：世界邀请 2：阵营邀请
        ModelGameMaterial.prototype.sendTeamInvite = function (type, successhandler) {
            var msg = n.MessagePool.from(n.C2G_Team_Invite);
            msg.Type = type;
            this.request(n.MessageMap.C2G_TEAM_INVITE, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    if (successhandler)
                        successhandler.run();
                }
            }));
        };
        //加入房间
        ModelGameMaterial.prototype.sendTeamJoin = function (roomId) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Team_Join);
            msg.RoomId = roomId;
            this.request(n.MessageMap.C2G_TEAM_JOIN, msg, utils.Handler.create(this, function (data) {
                if (_this._playerInfos) {
                    for (var _i = 0, _a = _this._playerInfos; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._playerInfos.length = 0;
                }
                _this._createId = data.Info.CreateId;
                _this._copyId = data.Info.CopyId;
                _this._playerInfos = data.Info.PlayerInfos.concat();
                for (var _b = 0, _c = _this._playerInfos; _b < _c.length; _b++) {
                    var item = _c[_b];
                    item.autoRecover = false;
                }
                _this.dispatchEventWith(ModelGameMaterial.OPEN_TEAM_DIALOG);
            }));
        };
        //退出房间
        ModelGameMaterial.prototype.sendTeamExit = function () {
            var msg = n.MessagePool.from(n.C2G_Team_Exit);
            this.notify(n.MessageMap.C2G_TEAM_EXIT, msg);
        };
        //踢人
        ModelGameMaterial.prototype.sendTeamKickOut = function (position) {
            var msg = n.MessagePool.from(n.C2G_Team_KickOut);
            msg.Position = position;
            this.request(n.MessageMap.C2G_TEAM_KICKOUT, msg, utils.Handler.create(this, function (data) { }));
        };
        ModelGameMaterial.prototype.copyId = function () {
            return this._copyId;
        };
        ModelGameMaterial.prototype.createId = function () {
            return this._createId;
        };
        ModelGameMaterial.prototype.playerInfos = function () {
            return this._playerInfos;
        };
        //下一个可挑战副本
        ModelGameMaterial.prototype.currStep = function () {
            return this._currStep;
        };
        /**重置队伍锁定状态 */
        ModelGameMaterial.prototype.resetTeamLock = function () {
            this._teamLock = false;
        };
        /**解除队伍锁定状态 */
        ModelGameMaterial.prototype.unTeamLock = function () {
            this._teamLock = true;
        };
        Object.defineProperty(ModelGameMaterial.prototype, "teamLock", {
            get: function () {
                return this._teamLock;
            },
            enumerable: true,
            configurable: true
        });
        ModelGameMaterial.prototype.checkMaterialRedPointBuyPos = function (pos) {
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.material, pos)) {
                if (!GameModels.copyMaterial.serverData)
                    return false;
                var level = GameModels.user.player.level;
                var typeList = [ModelGameMaterial.COPY_EXP, ModelGameMaterial.COPY_YUMAO, ModelGameMaterial.COPY_ZHANDUN, ModelGameMaterial.COPY_ZHANGONG];
                var curCopyList = this.getCopyList(typeList[pos]);
                for (var z = 0; z < curCopyList.length; z++) {
                    if (curCopyList[z].openLevel <= level && curCopyList[z].endLevel >= level) {
                        var leftCount = 0;
                        if (pos == 1) {
                            leftCount = GameModels.copyMaterial.serverData.List[3].LeftCount;
                        }
                        else if (pos == 3) {
                            leftCount = GameModels.copyMaterial.serverData.List[1].LeftCount;
                        }
                        else {
                            leftCount = GameModels.copyMaterial.serverData.List[pos].LeftCount;
                        }
                        if (GameModels.copyMaterial.isFirstFight(curCopyList[z], pos + 1) || leftCount > 0) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        ModelGameMaterial.prototype.teamCopyRedPoint = function () {
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.material, 1)) {
                if (!GameModels.oneCountRedPoint.isOpenTeamView) {
                    var curCopyList = GameModels.copyMaterial.getCopyList(mo.ModelGameMaterial.COPY_TEAM);
                    for (var i = 0; i < curCopyList.length; i++) {
                        var tmp = Templates.getTemplateById(templates.Map.OTHERMONSTER, curCopyList[i].template.boss);
                        if (this._currStep <= curCopyList[i].step && GameModels.user.player.level >= tmp.lv) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        ModelGameMaterial.COSTTYPE = 21;
        ModelGameMaterial.TIME_CHANGE = "time_change";
        ModelGameMaterial.PROGRESS_CHANGE = "progress_change";
        ModelGameMaterial.MAIGU_LUCKBOSS_REWARD = "maigu_luckboss_reward";
        ModelGameMaterial.OPEN_TEAM_DIALOG = "open_team_dialog";
        ModelGameMaterial.CLOSE_TEAM_DIALOG = "close_team_dialog";
        ModelGameMaterial.NOTICE_TEAM_LEADER_START = "notice_team_leader_start";
        // /**宝石副本*/
        // public static COPY_GEM: number = 201;
        // /**武将副本*/
        // public static COPY_FUNPET: number = 202;
        // /**帝龙副本*/
        // public static COPY_DRAGON: number = 203;
        // /**符文副本*/
        // public static COPY_RUNE: number = 204;
        // /**印记副本*/
        // public static COPY_MARK: number = 205;
        /**经验副本*/
        ModelGameMaterial.COPY_EXP = 201;
        /**战骑副本*/
        ModelGameMaterial.COPY_ZHANGONG = 202;
        /**兵法副本*/
        ModelGameMaterial.COPY_ZHANDUN = 203;
        /**羽毛副本*/
        ModelGameMaterial.COPY_YUMAO = 204;
        /**命魂副本*/
        ModelGameMaterial.COPY_MINGHUN = 210;
        /**组队副本*/
        ModelGameMaterial.COPY_TEAM = 62;
        /**埋骨禁地副本*/
        ModelGameMaterial.COPY_MAIGU = 63;
        //---------------------埋骨禁地相关----------------------
        /**埋骨副本玩家是否自动复活*/
        ModelGameMaterial.MAIGU_IMMEDIATELY_REVIVE = false;
        /**埋骨副本是否游戏中*/
        ModelGameMaterial.MAIGU_GAMING_BOO = false;
        return ModelGameMaterial;
    }(mo.ModelCopy));
    mo.ModelGameMaterial = ModelGameMaterial;
    __reflect(ModelGameMaterial.prototype, "mo.ModelGameMaterial");
})(mo || (mo = {}));
