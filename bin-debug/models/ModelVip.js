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
    var ModelVip = (function (_super) {
        __extends(ModelVip, _super);
        function ModelVip() {
            return _super.call(this) || this;
        }
        ModelVip.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._monthCardInfo = [];
            this._isOpenDuiHuanView = false;
            this._isOpenTeQuanView = false;
            this._vipDailyRewardStatus = 0;
            this._canChangePetList = [];
            this._specailCardInfo = [];
            this._tmps = Templates.getList(templates.Map.GAMEVIP);
            this._vipTemplate = Templates.getTemplateById(templates.Map.GAMEVIP, GameModels.user.player.getProperty(TypeProperty.VIP_LEVEL));
            this._maxVip = this._tmps[this._tmps.length - 1].id;
            n.net.onRoute(n.MessageMap.NOTIFYSPECAILCARDINFO, utils.Handler.create(this, this.updateSpecailInfo, null, false));
            //	n.net.onRoute(n.MessageMap.NOTIFYSPECAILCARDFINISH, utils.Handler.create(this, this.updateSpecailCardFinfsh, null, false));
            GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.refreshVipData);
            GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, function () {
                // GameModels.state.updateState(GameRedState.ACTIVITY_VIPG_Read);
                GameModels.state.updateState(GameRedState.VIP_TEQUAN_XIANGOU);
            });
            this.requestVIPRewardInfo();
            this.requsetVipCanChangList();
            this.requestSpecailCardGetInfo();
        };
        ModelVip.prototype.refreshVipData = function () {
            this._vipTemplate = Templates.getTemplateById(templates.Map.GAMEVIP, GameModels.user.player.getProperty(TypeProperty.VIP_LEVEL));
            // GameModels.state.updateState(GameRedState.MATERIAL_COPY_FUBEN);
            GameModels.state.updateState(GameRedState.MATERIAL_COPY_EXPFUBEN);
            GameModels.state.updateState(GameRedState.MATERIAL_COPY_ZHANGONGFUBEN);
            GameModels.state.updateState(GameRedState.MATERIAL_COPY_ZHANDUNFUBEN);
            GameModels.state.updateState(GameRedState.MATERIAL_COPY_YUMAOFUBEN);
            GameModels.state.updateState(GameRedState.CITY);
        };
        Object.defineProperty(ModelVip.prototype, "vipTemps", {
            get: function () {
                return this._tmps;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelVip.prototype, "dateTimeSec", {
            get: function () {
                return GameModels.timer.getTimer() * .001;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelVip.prototype, "peopleBossMaxCount", {
            /**没有VIP直接返回默认次数有的话 默认次数+VIP次数*/
            // public get materialCount(): number {
            // 	return 1 + (this._vipTemplate && this._vipTemplate.materialTime || 0);
            // }
            get: function () {
                //默认10次+ VIP加成
                return 10 + (this._vipTemplate && this._vipTemplate.qmbossBuyTimes || 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelVip.prototype, "ladderFightCount", {
            // public get freeDoubleBoxCount(): number {
            // 	return this._vipTemplate && this._vipTemplate.doubleBox || 0;
            // }
            get: function () {
                return this._vipTemplate && this._vipTemplate.tttzBuyTimes || 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelVip.prototype, "vipTemplate", {
            get: function () {
                return this._vipTemplate;
            },
            enumerable: true,
            configurable: true
        });
        ModelVip.prototype.vipTemplateById = function (vipGrade) {
            return Templates.getTemplateById(templates.Map.GAMEVIP, vipGrade);
        };
        ModelVip.prototype.updateCanChangePetList = function (list) {
            this._canChangePetList = [];
            for (var i = 0; i < list.length; i++) {
                if (this._canChangePetList.indexOf(list[i]) == -1) {
                    this._canChangePetList.push(list[i]);
                }
            }
        };
        Object.defineProperty(ModelVip.prototype, "canChangePetList", {
            get: function () {
                return this._canChangePetList;
            },
            enumerable: true,
            configurable: true
        });
        ModelVip.prototype.getvipChangeTempBuyVipLv = function (vipLv) {
            var vipChange = [];
            var changeTemp = Templates.getList(templates.Map.VIPEXCHANGE);
            for (var i = 0; i < changeTemp.length; i++) {
                if (changeTemp[i].needVip <= vipLv) {
                    vipChange.push(changeTemp[i]);
                }
            }
            return vipChange;
        };
        ModelVip.prototype.getvipChangeItemVoBuyVipLv = function (vipLv) {
            var vipChange = [];
            var changeTemp = Templates.getList(templates.Map.VIPEXCHANGE);
            for (var i = 0; i < changeTemp.length; i++) {
                if (changeTemp[i].needVip == vipLv) {
                    var item = vo.fromPool(vo.ItemVO, changeTemp[i].id);
                    vipChange.push(item);
                }
            }
            vipChange.sort(function (a, b) {
                return b.quality - a.quality;
            });
            return vipChange;
        };
        ModelVip.prototype.requsetVipCanChangList = function (callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            this.request(n.MessageMap.C2G_PET_GETVIPEXCHANGELIST, n.MessagePool.from(n.C2G_Pet_GetVipExchangeList), utils.Handler.create(this, function (data) {
                _this.updateCanChangePetList(data.CfgIdList);
                if (callback)
                    callback.runWith(data);
            }));
        };
        ModelVip.prototype.requsetPetChange = function (cfgId, callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            var msg = n.MessagePool.from(n.C2G_Pet_VipExchange);
            msg.CfgId = cfgId;
            this.request(n.MessageMap.C2G_PET_VIPEXCHANGE, msg, utils.Handler.create(this, function (data) {
                _this.dispatchEventWith(ModelVip.PETDEBRIS_CHANGE);
                if (callback)
                    callback.runWith(data);
            }));
        };
        Object.defineProperty(ModelVip.prototype, "vipDailyRewardStatus", {
            get: function () {
                return this._vipDailyRewardStatus > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**请求VIP奖励信息 */
        ModelVip.prototype.requestVIPRewardInfo = function (callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            this.request(n.MessageMap.C2G_VIP_REWARDINFO, n.MessagePool.from(n.C2G_VIP_RewardInfo), utils.Handler.create(this, function (data) {
                _this._vipDailyRewardStatus = data.VipDailyRewardStatus;
                GameModels.state.updateState(GameRedState.VIP_TEQUAN_XIANGOU);
                if (callback)
                    callback.runWith(data);
            }));
        };
        /**请求接收VIP每日奖励 */
        ModelVip.prototype.requestVIPDailyReward = function (callback) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_VIP_DailyReward);
            this.request(n.MessageMap.C2G_VIP_DAILYREWARD, cmd, utils.Handler.create(this, function (data) {
                if (data.Result > 0) {
                    _this._vipDailyRewardStatus = 0;
                }
                GameModels.state.updateState(GameRedState.VIP_TEQUAN_XIANGOU);
                if (callback)
                    callback.runWith(data);
            }));
        };
        /**月卡相关逻辑 */
        ModelVip.prototype.initMonthCardInfo = function (data) {
            this._monthCardInfo = [];
            for (var i = 0; i < data.length; i++) {
                var monthCardVo = vo.fromPool(vo.MonthCardVo);
                monthCardVo.decode(data[i]);
                this._monthCardInfo.push(monthCardVo);
            }
        };
        ModelVip.prototype.updataMonthCard = function (data) {
            if (this._monthCardInfo) {
                for (var i = 0; i < this._monthCardInfo.length; i++) {
                    if (this._monthCardInfo[i].type == data.Type) {
                        this._monthCardInfo[i].cardStatus = data.CardStatus;
                        this._monthCardInfo[i].totalPay = data.TotalPay;
                        this._monthCardInfo[i].leftDays = data.LeftDays;
                        this._monthCardInfo[i].doneGotReward = data.DoneGotReward;
                    }
                }
            }
        };
        //请求月卡数据
        ModelVip.prototype.requestMonthCardGetInfo = function (callback) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_MonthCard_GetInfo);
            this.request(n.MessageMap.C2G_MONTHCARD_GETINFO, cmd, utils.Handler.create(this, function (data) {
                if (data) {
                    _this.initMonthCardInfo(data.CardList);
                }
                GameModels.state.updateState(GameRedState.MONTHCARD);
                if (callback)
                    callback.runWith(data);
            }));
        };
        //请求激活月卡
        ModelVip.prototype.requestActivateMonthCard = function (type, callback) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_MonthCard_Active);
            cmd.Type = type;
            this.request(n.MessageMap.C2G_MONTHCARD_ACTIVE, cmd, utils.Handler.create(this, function (data) {
                if (data) {
                    _this.updataMonthCard(data.CardInfo);
                }
                GameModels.state.updateState(GameRedState.MONTHCARD);
                if (callback)
                    callback.runWith(data);
            }));
        };
        //请求领取月卡每日奖励
        ModelVip.prototype.requestMonthCardReward = function (type, callback) {
            var cmd = n.MessagePool.from(n.C2G_MonthCard_GetReward);
            cmd.Type = type;
            this.request(n.MessageMap.C2G_MONTHCARD_GETREWARD, cmd, utils.Handler.create(this, function (data) {
                if (callback)
                    callback.runWith(data);
                GameModels.state.updateState(GameRedState.MONTHCARD);
            }));
        };
        Object.defineProperty(ModelVip.prototype, "monthCardDate", {
            get: function () {
                return this._monthCardInfo;
            },
            enumerable: true,
            configurable: true
        });
        /**特权卡相关逻辑 */
        /************************** */
        ModelVip.prototype.initSpecailCardInfo = function (isbegin, data) {
            this._specailCardInfo = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].NeedWarning == 1) {
                    if (!mg.uiManager.isOpen(MallTeQuanExpire) && !mg.uiManager.isOpen(MainTimePickGift) && !isbegin) {
                        mg.uiManager.show(MallTeQuanExpire, data[i].Type);
                    }
                }
                var specailCardVo = vo.fromPool(vo.SpecailCardVo);
                specailCardVo.decode(data[i]);
                this._specailCardInfo.push(specailCardVo);
            }
        };
        ModelVip.prototype.updataSpecailCard = function (data) {
            if (this._specailCardInfo) {
                for (var i = 0; i < this._specailCardInfo.length; i++) {
                    if (this._specailCardInfo[i].type == data.Type) {
                        this._specailCardInfo[i].cardStatus = data.CardStatus;
                        this._specailCardInfo[i].leftDays = data.LeftDays;
                        this._specailCardInfo[i].doneGotReward = data.DoneGotReward;
                        this._specailCardInfo[i].needWarning = data.NeedWarning;
                    }
                }
            }
        };
        //请求特权卡数据
        ModelVip.prototype.requestSpecailCardGetInfo = function (isBegin, callback) {
            var _this = this;
            if (isBegin === void 0) { isBegin = false; }
            var cmd = n.MessagePool.from(n.C2G_SpecailCard_GetInfo);
            this.request(n.MessageMap.C2G_SPECAILCARD_GETINFO, cmd, utils.Handler.create(this, function (data) {
                if (data) {
                    _this.initSpecailCardInfo(isBegin, data.List);
                }
                GameModels.state.updateState(GameRedState.VIP_TEQUAN_SPECAILCARD);
                GameModels.state.updateState(GameRedState.SPECAICARD);
                GameModels.state.updateState(GameRedState.TEQUAN);
                if (callback)
                    callback.runWith(data);
            }));
        };
        //购买元宝付费特权礼包
        ModelVip.prototype.requestBuySpecailCard = function (type, callback) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_SpecailCard_BuyCard);
            cmd.Type = type;
            this.request(n.MessageMap.C2G_SPECAILCARD_BUYCARD, cmd, utils.Handler.create(this, function (data) {
                if (data) {
                    _this.updataSpecailCard(data.CardInfo);
                    //刷新扫荡次数
                    _this.dispatchEventWith(ModelVip.VIPTEQUAN_CHANGE);
                    GameModels.state.updateState(GameRedState.VIP_TEQUAN_SPECAILCARD);
                    GameModels.state.updateState(GameRedState.SPECAICARD);
                    GameModels.state.updateState(GameRedState.TEQUAN);
                }
                if (callback)
                    callback.runWith(data);
            }));
        };
        //领取特权礼包奖励
        ModelVip.prototype.requestSpecailCardReward = function (type, callback) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_SpecailCard_GetReward);
            cmd.Type = type;
            this.request(n.MessageMap.C2G_SPECAILCARD_GETREWARD, cmd, utils.Handler.create(this, function (data) {
                if (data) {
                    _this.updataSpecailCard(data.CardInfo);
                }
                GameModels.state.updateState(GameRedState.VIP_TEQUAN_SPECAILCARD);
                GameModels.state.updateState(GameRedState.SPECAICARD);
                GameModels.state.updateState(GameRedState.TEQUAN);
                if (callback)
                    callback.runWith(data);
            }));
        };
        ModelVip.prototype.updateSpecailInfo = function (data) {
            if (data) {
                this.updataSpecailCard(data.CardInfo);
                this.dispatchEventWith(ModelVip.VIPTEQUAN_CHANGE);
                GameModels.state.updateState(GameRedState.VIP_TEQUAN_SPECAILCARD);
                GameModels.state.updateState(GameRedState.SPECAICARD);
                GameModels.state.updateState(GameRedState.TEQUAN);
            }
        };
        Object.defineProperty(ModelVip.prototype, "specailCardDate", {
            // private updateSpecailCardFinfsh(data: n.NotifySpecailCardFinish): void {
            // 	if (data) {
            // 		this.specialExpire = true;
            // 		this._expireType = data.Type;
            // 		this.dispatchEventWith(mo.ModelVip.TEQUANCARDEXPIRE);
            // 	}
            // }
            get: function () {
                if (this._specailCardInfo) {
                    this._specailCardInfo.sort(function (a, b) {
                        if (a.doneGotReward != b.doneGotReward) {
                            return a.doneGotReward - b.doneGotReward;
                        }
                        else {
                            return a.older - b.older;
                        }
                    });
                }
                return this._specailCardInfo;
            },
            enumerable: true,
            configurable: true
        });
        /**类型，3：战场双倍，4：快速作战，5：征收特权 6:钻石扫荡 7：圣旨特权*/
        ModelVip.prototype.getRewardBuyType = function (type) {
            if (this.specailCardDate.length < 0)
                return false;
            for (var _i = 0, _a = this.specailCardDate; _i < _a.length; _i++) {
                var card = _a[_i];
                if (card.type == type && card.cardStatus == 1) {
                    return true;
                }
            }
            return false;
        };
        /************************** */
        ModelVip.prototype.getNextVipTemplate = function (level) {
            if (level == this._tmps.length) {
                level--;
            }
            return this._tmps[level];
        };
        ModelVip.prototype.checkMaxVip = function (level) {
            return level >= this._maxVip;
        };
        /**是否打开vip兑换界面 */
        // public get isOpenDuiHuanView(): boolean {
        // 	return this._isOpenDuiHuanView;
        // }
        // public set isOpenDuiHuanView(value: boolean) {
        // 	this._isOpenDuiHuanView = value;
        // 	GameModels.state.updateState(GameRedState.VIP_TEQUAN_DUIHUAN);
        // }
        ModelVip.prototype.vipChangeRedPoint = function () {
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.vipTeQuan, 1)) {
                if (!this._isOpenDuiHuanView && this._canChangePetList.length > 0) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperty(ModelVip.prototype, "isOpenTeQuanView", {
            /**是否打开vip特权界面 */
            get: function () {
                return this._isOpenTeQuanView;
            },
            set: function (value) {
                this._isOpenTeQuanView = value;
                GameModels.state.updateState(GameRedState.VIP_TEQUAN_SPECAILCARD);
            },
            enumerable: true,
            configurable: true
        });
        //特权卡红点
        ModelVip.prototype.vipSpecailCardRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.vipTeQuan, 1))
                return false;
            if (!this._isOpenTeQuanView && !this.getRewardBuyType(4))
                return true;
            if (!this._specailCardInfo)
                return false;
            for (var i = 0; i < this._specailCardInfo.length; i++) {
                if (this._specailCardInfo[i].cardStatus == 1 && this._specailCardInfo[i].doneGotReward == 0) {
                    return true;
                }
            }
            return false;
        };
        ModelVip.ACTIVITY_CARDINFO = "ACTIVITY_CARDINFO";
        ModelVip.REFRESH_VIPGIFT = "REFRESH_VIPGIFT";
        ModelVip.PETDEBRIS_CHANGE = "PETDEBRIS_CHANGE";
        ModelVip.VIPTEQUAN_CHANGE = "VIPTEQUAN_CHANGE";
        ModelVip.TEQUANCARDEXPIRE = "TEQUANCARDEXPIRE";
        return ModelVip;
    }(mo.ModelBase));
    mo.ModelVip = ModelVip;
    __reflect(ModelVip.prototype, "mo.ModelVip");
})(mo || (mo = {}));
