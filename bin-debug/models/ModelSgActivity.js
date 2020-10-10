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
    var ModelSgActivity = (function (_super) {
        __extends(ModelSgActivity, _super);
        function ModelSgActivity() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**活动红点 */
            _this._isOpen = false;
            _this._days = 0;
            _this._yuanBaoGift = 0;
            _this._normalGift = 0;
            _this._vipGift = 0;
            _this._payGift = 0;
            /**连充豪礼逻辑 */
            _this._lianchongDays = [0, 0, 0];
            _this._lianchongArr1 = [];
            _this._lianchongArr2 = [];
            _this._lianchongArr3 = [];
            /**请求兑换的信息 */
            _this._duihuanArr = [];
            return _this;
        }
        ModelSgActivity.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            //this._openServerTableList = [];
            this._dailyTableList = [];
            this._limitTableList = [];
            this._actListVO = [];
            this._actRankListVO = [];
            this._myScore = this._myRank = 0;
            this.requestSGRunningActivitys();
            this.requestWeekCardInfo();
            this.onRoute(n.MessageMap.G2C_YY_NOTIFYACTINFO, utils.Handler.create(this, this.upDateSGRunningActivity, null, false));
        };
        ModelSgActivity.prototype.initSGRunningActivity = function (data) {
            this._actListVO = [];
            for (var i = 0; i < data.length; i++) {
                var listVo = vo.fromPool(vo.SgActivityListVO, data[i]);
                this._actListVO.push(listVo);
            }
            this.splitActListVO();
        };
        ModelSgActivity.prototype.upDateSGRunningActivity = function (data) {
            //logger.log("旧的活动数据", this._actListVO);
            if (this._actListVO) {
                for (var i = 0; i < this._actListVO.length; i++) {
                    if (this._actListVO[i].actCfgId == data.ActInfo.ActCfgId) {
                        this._actListVO[i].initialize(data.ActInfo);
                        this.dispatchEventWith(mo.ModelSgActivity.SG_ACTIVITY_CHANGE);
                        break;
                    }
                }
            }
            //logger.log("新的活动数据", this._actListVO);
            this.updateRedPoint();
        };
        /**拆分活动 */
        ModelSgActivity.prototype.splitActListVO = function () {
            //this._openServerTableList = [];
            this._dailyTableList = [];
            this._limitTableList = [];
            if (this._actListVO) {
                this._actListVO.sort(function (a, b) {
                    return a.actType - b.actType;
                });
                for (var i = 0; i < this._actListVO.length; i++) {
                    if (this._actListVO[i].actType == game.sgActivityType.sc1)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.sc2)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.sc3)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.ljdl)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.yyqg)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.cjjl)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.viplb)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.zhanling)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.act5)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.qzdl) {
                        //logger.log("征收活动===", this._actListVO[i]);
                        //logger.log("征收活动结束时间===", utils.DateUtil.formatDateInChinese(new Date(this._actListVO[i].endTime * 1000), false));
                        continue;
                    }
                    if (this._actListVO[i].actType == game.sgActivityType.qzdh) {
                        //logger.log("征收兑换活动===", this._actListVO[i]);
                        //logger.log("征收兑换活动结束时间===", utils.DateUtil.formatDateInChinese(new Date(this._actListVO[i].endTime * 1000), false));
                        continue;
                    }
                    if (this._actListVO[i].actType == game.sgActivityType.activity_103)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.activity_104)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.activity_105)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.activity_106)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.activity_303)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.activity_304)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.activity_305)
                        continue;
                    if (this._actListVO[i].actType == game.sgActivityType.activity_306)
                        continue;
                    /**日常活动 */
                    if (this._actListVO[i].actType == game.sgActivityType.mrlc || this._actListVO[i].actType == game.sgActivityType.mrcz || this._actListVO[i].actType == game.sgActivityType.haohuajiangchi ||
                        this._actListVO[i].actType == game.sgActivityType.myth || this._actListVO[i].actType == game.sgActivityType.mzth || this._actListVO[i].actType == game.sgActivityType.lchl) {
                        this._dailyTableList.push(this._actListVO[i]);
                    }
                    else if (this._actListVO[i].actType == game.sgActivityType.act1 || this._actListVO[i].actType == game.sgActivityType.act2 ||
                        this._actListVO[i].actType == game.sgActivityType.act3 || this._actListVO[i].actType == game.sgActivityType.act4 || this._actListVO[i].actType == game.sgActivityType.act6 ||
                        this._actListVO[i].actType == game.sgActivityType.act7) {
                        this._limitTableList.push(this._actListVO[i]);
                    }
                    else {
                        /**开服活动 */
                        //this._openServerTableList.push(this._actListVO[i]);
                    }
                }
            }
        };
        /**结束时间 */
        ModelSgActivity.prototype.getEndDate = function (configId, bol) {
            if (bol === void 0) { bol = true; }
            var tempActSet = Templates.getTemplateById(templates.Map.ACTSETTING, configId);
            if (!tempActSet)
                return "";
            var ms = (tempActSet.startType == 1 ? GameModels.serverTime.kaifuDate : GameModels.serverTime.birthDate) + (1000 * 3600 * 24 * (tempActSet.startDay - 1 + tempActSet.activeTime));
            return utils.DateUtil.formatDateInChinese(new Date(ms - 1000), bol);
        };
        ModelSgActivity.prototype.getHaoHuaJiangChiEndTime = function (configId) {
            var tempActSet = Templates.getTemplateById(templates.Map.ACTSETTING, configId);
            if (!tempActSet)
                return "";
            var nowTemp = new Date(); //当前时间
            var oneDayLong = 24 * 60 * 60 * 1000; //一天的毫秒数
            var c_time = nowTemp.getTime(); //当前时间的毫秒时间
            var c_day = nowTemp.getDay() || 7; //当前时间的星期几
            var m_time = c_time - (c_day - 1) * oneDayLong; //当前周一的毫秒时间
            var endDay = 0;
            if (tempActSet.startDay == 1) {
                endDay = m_time + (86400000 * (tempActSet.activeTime - 1));
            }
            else {
                endDay = m_time + (86400000 * (tempActSet.activeTime + 2));
            }
            var monday = new Date(endDay); //设置周一时间对象
            var m_year = monday.getFullYear();
            var m_month = monday.getMonth() + 1;
            var m_date = monday.getDate();
            var str = m_year + '-' + m_month + '-' + m_date + ' ' + '23:59:59';
            logger.log(m_year + '-' + m_month + '-' + m_date + ' ' + '23:59:59');
            return str;
        };
        ModelSgActivity.prototype.getCurrWeek = function () {
            var nowTemp = new Date(GameModels.timer.getTimer()); //当前时间
            var c_day = nowTemp.getDay() || 7; //当前时间的星期几
            logger.log("1111111111111==", c_day);
            return c_day;
        };
        /**剩余时间 */
        ModelSgActivity.prototype.getLastDateSec = function (configId) {
            var tempActSet = Templates.getTemplateById(templates.Map.ACTSETTING, configId);
            if (!tempActSet)
                return 0;
            var ms = (tempActSet.startType == 1 ? GameModels.serverTime.kaifuDate : GameModels.serverTime.birthDate) + (1000 * 3600 * 24 * (tempActSet.startDay - 1 + tempActSet.activeTime));
            return ms - GameModels.timer.getTimer();
        };
        Object.defineProperty(ModelSgActivity.prototype, "dailyActListVO", {
            // /**开服活动列表 */
            // public get openServerActListVO(): vo.SgActivityListVO[] {
            // 	this._openServerTableList.sort(function (a: vo.SgActivityListVO, b: vo.SgActivityListVO) {
            // 		return b.order - a.order;
            // 	})
            // 	return this._openServerTableList;
            // }
            /**日常活动列表 */
            get: function () {
                this._dailyTableList.sort(function (a, b) {
                    return b.order - a.order;
                });
                return this._dailyTableList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivity.prototype, "limitActListVO", {
            /**限时活动列表 */
            get: function () {
                this._limitTableList.sort(function (a, b) {
                    return a.order - b.order;
                });
                return this._limitTableList;
            },
            enumerable: true,
            configurable: true
        });
        /**日常活动列表 */
        ModelSgActivity.prototype.getDailyActListVOByType = function (type) {
            if (this._dailyTableList) {
                for (var i = 0; i < this._dailyTableList.length; i++) {
                    if (this._dailyTableList[i].actType == type) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**限时活动列表 */
        ModelSgActivity.prototype.getLimitActListVOByType = function (type) {
            if (this._limitTableList) {
                for (var i = 0; i < this._limitTableList.length; i++) {
                    if (this._limitTableList[i].actType == type) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**累计登录vip奖励领取状态 */
        ModelSgActivity.prototype.getLeijidengluActVipRewardListVO = function (id) {
            var dataList = this.getSgActivityListVOByType(game.sgActivityType.ljdl).getLeijidengluActRewardListVO(1);
            if (dataList) {
                for (var i = 0; i < dataList.length; i++) {
                    if (dataList[i].rewardCfgId == id) {
                        return dataList[i].getTimes;
                    }
                }
            }
            return 0;
        };
        /**检查是否还存在首冲 */
        ModelSgActivity.prototype.isHashFirstRecharge = function () {
            if (GameModels.user.player.totalRecharge < mo.ModelSgActivity.FIRSRRECHAGR_MAX * 10)
                return true;
            var list = [];
            list.push(this.getSgActivityListVOByType(game.sgActivityType.sc1));
            list.push(this.getSgActivityListVOByType(game.sgActivityType.sc2));
            list.push(this.getSgActivityListVOByType(game.sgActivityType.sc3));
            for (var i = 0; i < list.length; i++) {
                if (list[i] && list[i].hashFirstRechargeReceive) {
                    return true;
                }
            }
            return false;
        };
        /**根据type获取对应的活动 */
        ModelSgActivity.prototype.getSgActivityListVOByType = function (type) {
            if (this._actListVO) {
                for (var i = 0; i < this._actListVO.length; i++) {
                    if (this._actListVO[i].actType == type) {
                        return this._actListVO[i];
                    }
                }
            }
            return null;
        };
        ModelSgActivity.prototype.requestSGRunningActivitys = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_YY_GetActInfo);
            this.request(n.MessageMap.C2G_YY_GETACTINFO, msg, utils.Handler.create(this, function (data) {
                _this.initSGRunningActivity(data.ActList);
                _this.updateRedPoint();
                _this.dispatchEventWith(mo.ModelSgActivity.SG_ACTIVITY_CHANGE);
                if (complete)
                    complete.run();
            }));
        };
        ModelSgActivity.prototype.requestSGGetActivityReward = function (actCfgId, actRewCfgId, param, complete) {
            var _this = this;
            if (param === void 0) { param = 0; }
            var msg = n.MessagePool.from(n.C2G_YY_GetActReward);
            msg.ActCfgId = actCfgId;
            msg.ActRewardId = actRewCfgId;
            msg.Param = param;
            this.request(n.MessageMap.C2G_YY_GETACTREWARD, msg, utils.Handler.create(this, function (data) {
                _this.upDateSGRunningActivity(data);
                _this.updateRedPoint();
                if (complete)
                    complete.run();
            }));
        };
        ModelSgActivity.prototype.initRankData = function (data) {
            this._actRankListVO = [];
            for (var i = 0; i < data.length; i++) {
                var listVo = vo.fromPool(vo.SgActivityRankVO, data[i]);
                this._actRankListVO.push(listVo);
            }
        };
        Object.defineProperty(ModelSgActivity.prototype, "actRankListVo", {
            get: function () {
                if (this._actRankListVO) {
                    this._actRankListVO.sort(function (a, b) {
                        return a.rank - b.rank;
                    });
                }
                return this._actRankListVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivity.prototype, "myScore", {
            get: function () {
                return this._myScore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivity.prototype, "myRank", {
            get: function () {
                return this._myRank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivity.prototype, "params", {
            get: function () {
                return this._rankParams;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivity.prototype.requestSGGetActivityRank = function (actCfgId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_YY_GetRankActList);
            msg.ActCfgId = actCfgId;
            this.request(n.MessageMap.C2G_YY_GETRANKACTLIST, msg, utils.Handler.create(this, function (data) {
                _this._myScore = data.MyValue;
                _this._myRank = data.MyRank;
                _this._rankParams = data.Params;
                _this.initRankData(data.RankList);
                if (complete)
                    complete.run();
            }));
        };
        ModelSgActivity.prototype.updateRedPoint = function () {
            GameModels.state.updateState(GameRedState.VIP_TEQUAN_XIANGOU);
            GameModels.state.updateState(GameRedState.WELFARE_SEVENDAY);
            GameModels.state.updateState(GameRedState.WELFARE_UPREWARD);
            GameModels.state.updateState(GameRedState.WELFARE_ACITIVITY);
            GameModels.state.updateState(GameRedState.FIRSTRECHARGE);
            GameModels.state.updateState(GameRedState.FIRSTRECHARGE1);
            GameModels.state.updateState(GameRedState.ONEYUANBUY);
            GameModels.state.updateState(GameRedState.VIP_TEQUAN_XIANGOU);
            GameModels.state.updateState(GameRedState.DAILY_ACTIVITY_MEIRILEICHONG);
            GameModels.state.updateState(GameRedState.DAILY_ACTIVITY1);
            GameModels.state.updateState(GameRedState.UNION_FULI_TEHUI_LINGQU);
            GameModels.state.updateState(GameRedState.DAILY_ACTIVITY_MEIRICHONGZHI);
            GameModels.state.updateState(GameRedState.DAILY_ACTIVITY_MEIZHOUTEHUI);
            GameModels.state.updateState(GameRedState.DAILY_ACTIVITY_MEIYUETEHUI);
            GameModels.state.updateState(GameRedState.DAILY_ACTIVITY_LIANCHONGHAOLI);
            GameModels.state.updateState(GameRedState.OPENSERVER_ACTIVITY_ZHUANSHUTEQUAN);
            GameModels.state.updateState(GameRedState.OPENSERVER_ACTIVITY_SIRENDINGZHI);
            GameModels.state.updateState(GameRedState.UNION_FULI_TEHUI_GOUMAI);
            GameModels.state.updateState(GameRedState.WELFARE_FUND);
            GameModels.state.updateState(GameRedState.LIMIT2);
            GameModels.state.updateState(GameRedState.LIMIT1_1);
            GameModels.state.updateState(GameRedState.LIMIT1_2);
            GameModels.state.updateState(GameRedState.LIMIT1_3);
            GameModels.state.updateState(GameRedState.LIMIT1_4);
        };
        /**vip购买活动红点 */
        ModelSgActivity.prototype.checkVipBuyRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.vipTeQuan, 0))
                return false;
            if (GameModels.vip && !GameModels.vip.vipDailyRewardStatus)
                return true;
            if (GameModels.oneCountRedPoint.isOpenVipBuyView)
                return false;
            var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.viplb);
            if (!vo)
                return false;
            for (var i = 0; i < vo.actRewardListVO.length; i++) {
                var rewardVo = vo.actRewardListVO[i];
                if (vo.myValue >= rewardVo.templateNeedVip) {
                    if (rewardVo.getTimes <= 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**专属特权活动红点 */
        ModelSgActivity.prototype.checkZhuanShuRedPoint = function () {
            if (!this._actListVO)
                return false;
            for (var i = 0; i < this._actListVO.length; i++) {
                if (this._actListVO[i].actType == game.sgActivityType.zstq1 || this._actListVO[i].actType == game.sgActivityType.zstq2
                    || this._actListVO[i].actType == game.sgActivityType.zstq3 || this._actListVO[i].actType == game.sgActivityType.zstq4 || this._actListVO[i].actType == game.sgActivityType.zstq5) {
                    if (this._actListVO[i].hasRedPoint == 1)
                        return true;
                }
            }
            return false;
        };
        ModelSgActivity.prototype.setIsopen = function () {
            this._isOpen = true;
            GameModels.state.updateState(GameRedState.LIMIT1_4);
        };
        ModelSgActivity.prototype.checkRedPoint = function (type) {
            if (!this._actListVO)
                return false;
            if (type == game.sgActivityType.act7) {
                for (var i = 0; i < this._actListVO.length; i++) {
                    if (this._actListVO[i].actType == game.sgActivityType.act6) {
                        if (!this._isOpen && this._actListVO[i].actRewardListVOStorState[0].getTimes <= 0)
                            return true;
                    }
                }
            }
            if (type == game.sgActivityType.mzth) {
                for (var i = 0; i < this._actListVO.length; i++) {
                    if (this._actListVO[i].actType == game.sgActivityType.mzth_0) {
                        if (this._actListVO[i].actRewardListVOStorState[0].getTimes <= 0)
                            return true;
                    }
                }
            }
            if (type == game.sgActivityType.myth) {
                for (var i = 0; i < this._actListVO.length; i++) {
                    if (this._actListVO[i].actType == game.sgActivityType.myth_0) {
                        if (this._actListVO[i].actRewardListVOStorState[0].getTimes <= 0)
                            return true;
                    }
                }
            }
            for (var i = 0; i < this._actListVO.length; i++) {
                if (this._actListVO[i].actType == type) {
                    if (this._actListVO[i].hasRedPoint == 1)
                        return true;
                }
            }
            return false;
        };
        /**福利里面的活动红点 */
        ModelSgActivity.prototype.checkAcivityRedPoint = function () {
            if (!this._actListVO)
                return false;
            for (var i = 0; i < this._actListVO.length; i++) {
                if (this._actListVO[i].actType == game.sgActivityType.activity_103
                    || this._actListVO[i].actType == game.sgActivityType.activity_104
                    || this._actListVO[i].actType == game.sgActivityType.activity_105
                    || this._actListVO[i].actType == game.sgActivityType.activity_106) {
                    if (this._actListVO[i].hasRedPoint == 1)
                        return true;
                }
            }
            return false;
        };
        /**首冲红点 */
        ModelSgActivity.prototype.checkFirstRechargeRedPoint = function () {
            return this.checkRedPoint(game.sgActivityType.sc1) || this.checkRedPoint(game.sgActivityType.sc2)
                || this.checkRedPoint(game.sgActivityType.sc3); //|| this.checkRedPoint(game.sgActivityType.sc4);
        };
        /**周卡的红点 */
        ModelSgActivity.prototype.checkWeekCardRedPoint = function () {
            if (this.days <= 0) {
                if (!GameModels.oneCountRedPoint.isOpenWeekCardView)
                    return true;
                return false;
            }
            if (this.yuanBaoGift == 0)
                return true;
            if (this.normalGift == 0)
                return true;
            if (GameModels.user.player.vip >= 1 && this.vipGift == 0)
                return true;
            if (GameModels.user.player.todayRechargeTotal > 0 && this.payGift == 0)
                return true;
            return false;
        };
        Object.defineProperty(ModelSgActivity.prototype, "days", {
            get: function () {
                return this._days;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivity.prototype, "yuanBaoGift", {
            get: function () {
                return this._yuanBaoGift;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivity.prototype, "normalGift", {
            get: function () {
                return this._normalGift;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivity.prototype, "vipGift", {
            get: function () {
                return this._vipGift;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSgActivity.prototype, "payGift", {
            get: function () {
                return this._payGift;
            },
            enumerable: true,
            configurable: true
        });
        /**请求周卡信息 */
        ModelSgActivity.prototype.requestWeekCardInfo = function () {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_WeekCard_GetInfo);
            this.request(n.MessageMap.C2G_WEEKCARD_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this._days = data.CardInfo.Days;
                _this._yuanBaoGift = data.CardInfo.YuanBaoGift;
                _this._normalGift = data.CardInfo.NormalGift;
                _this._vipGift = data.CardInfo.VipGift;
                _this._payGift = data.CardInfo.PayGift;
                GameModels.state.updateState(GameRedState.DAILY_ACTIVITY_ZHOUKA);
                GameModels.state.updateState(GameRedState.DAILY_ACTIVITY1);
                _this.dispatchEventWith(mo.ModelSgActivity.WEEKCARD_CHANGE);
            }));
        };
        /**购买周卡 */
        ModelSgActivity.prototype.requestBuyWeekCard = function () {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_WeekCard_BuyCard);
            this.request(n.MessageMap.C2G_WEEKCARD_BUYCARD, msg, utils.Handler.create(this, function (data) {
                _this._days = data.CardInfo.Days;
                _this._yuanBaoGift = data.CardInfo.YuanBaoGift;
                _this._normalGift = data.CardInfo.NormalGift;
                _this._vipGift = data.CardInfo.VipGift;
                _this._payGift = data.CardInfo.PayGift;
                GameModels.state.updateState(GameRedState.DAILY_ACTIVITY_ZHOUKA);
                GameModels.state.updateState(GameRedState.DAILY_ACTIVITY1);
                _this.dispatchEventWith(mo.ModelSgActivity.WEEKCARD_CHANGE);
            }));
        };
        /**领取周卡奖励 1元宝 2普通 3vip 4充值*/
        ModelSgActivity.prototype.requestGetWeekCard = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_WeekCard_GetReward);
            msg.Type = type;
            this.request(n.MessageMap.C2G_WEEKCARD_GETREWARD, msg, utils.Handler.create(this, function (data) {
                _this._days = data.CardInfo.Days;
                _this._yuanBaoGift = data.CardInfo.YuanBaoGift;
                _this._normalGift = data.CardInfo.NormalGift;
                _this._vipGift = data.CardInfo.VipGift;
                _this._payGift = data.CardInfo.PayGift;
                _this.dispatchEventWith(mo.ModelSgActivity.WEEKCARD_CHANGE);
                GameModels.state.updateState(GameRedState.DAILY_ACTIVITY_ZHOUKA);
                GameModels.state.updateState(GameRedState.DAILY_ACTIVITY1);
                if (complete)
                    complete.run();
            }));
        };
        ModelSgActivity.prototype.getDay = function (index) {
            return this._lianchongDays[index];
        };
        ModelSgActivity.prototype.checkLianChongTableRedPoint = function (index) {
            var arr = [this._lianchongArr1, this._lianchongArr2, this._lianchongArr3];
            if (arr && arr[index]) {
                for (var _i = 0, _a = arr[index]; _i < _a.length; _i++) {
                    var vo = _a[_i];
                    if (vo.value == 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelSgActivity.prototype.getlianchongArr = function (index) {
            var arr = [this._lianchongArr1, this._lianchongArr2, this._lianchongArr3];
            if (arr && arr[index]) {
                arr[index].sort(function (a, b) {
                    if (a.value != b.value) {
                        return a.value - b.value;
                    }
                    else {
                        return a.key - b.key;
                    }
                });
            }
            return arr[index];
        };
        /**请求连充信息 */
        ModelSgActivity.prototype.requestLianChongInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_LianChong_GetInfo);
            this.request(n.MessageMap.C2G_LIANCHONG_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this._lianchongDays = [data.Days1, data.Days2, data.Days3];
                _this._lianchongArr1 = [];
                _this._lianchongArr2 = [];
                _this._lianchongArr3 = [];
                for (var i = 0; i < data.Step1List.length; i++) {
                    var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.Step1List[i]);
                    _this._lianchongArr1.push(listVo);
                }
                for (var i = 0; i < data.Step2List.length; i++) {
                    var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.Step2List[i]);
                    _this._lianchongArr2.push(listVo);
                }
                for (var i = 0; i < data.Step3List.length; i++) {
                    var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.Step3List[i]);
                    _this._lianchongArr3.push(listVo);
                }
                if (complete)
                    complete.run();
            }));
        };
        /**领取连充奖励 */
        ModelSgActivity.prototype.requestLianChongGetReward = function (rewardCfgId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_LianChong_GetReward);
            msg.RewardCfgId = rewardCfgId;
            this.request(n.MessageMap.C2G_LIANCHONG_GETREWARD, msg, utils.Handler.create(this, function (data) {
                var id = data.StepList[0].RewardCfgId;
                if (id > 0 && id <= 7) {
                    _this._lianchongArr1 = [];
                    for (var i = 0; i < data.StepList.length; i++) {
                        var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.StepList[i]);
                        _this._lianchongArr1.push(listVo);
                    }
                }
                else if (id > 7 && id <= 14) {
                    _this._lianchongArr2 = [];
                    for (var i = 0; i < data.StepList.length; i++) {
                        var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.StepList[i]);
                        _this._lianchongArr2.push(listVo);
                    }
                }
                else {
                    _this._lianchongArr3 = [];
                    for (var i = 0; i < data.StepList.length; i++) {
                        var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.StepList[i]);
                        _this._lianchongArr3.push(listVo);
                    }
                }
                if (complete)
                    complete.run();
            }));
        };
        Object.defineProperty(ModelSgActivity.prototype, "duihuanArr", {
            get: function () {
                return this._duihuanArr;
            },
            enumerable: true,
            configurable: true
        });
        ModelSgActivity.prototype.clearSelecdItem = function () {
            for (var i = 0; i < this._duihuanArr.length; i++) {
                this._duihuanArr[i].selecdData = null;
            }
        };
        ModelSgActivity.prototype.setSelecdItemByShopId = function (id, data) {
            for (var i = 0; i < this._duihuanArr.length; i++) {
                if (this._duihuanArr[i].key == id) {
                    this._duihuanArr[i].selecdData = data;
                    this.dispatchEventWith(mo.ModelSgActivity.SG_ACTIVITY_DUIHUAN_CHOOSE);
                }
            }
        };
        ModelSgActivity.prototype.requestDuiHuanInfo = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_YY_GetExchangeInfo);
            msg.ActType = type;
            this.request(n.MessageMap.C2G_YY_GETEXCHANGEINFO, msg, utils.Handler.create(this, function (data) {
                _this._duihuanArr = [];
                for (var i = 0; i < data.BuyTimesList.length; i++) {
                    var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.BuyTimesList[i]);
                    _this._duihuanArr.push(listVo);
                }
                if (complete)
                    complete.run();
            }));
        };
        /**请求兑换 */
        ModelSgActivity.prototype.requestDuiHuan = function (type, shopId, selecd, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_YY_Exchange);
            msg.ShopId = shopId;
            msg.SelectId = selecd;
            msg.ActType = type;
            this.request(n.MessageMap.C2G_YY_EXCHANGE, msg, utils.Handler.create(this, function (data) {
                for (var i = 0; i < _this._duihuanArr.length; i++) {
                    if (_this._duihuanArr[i].key == data.ShopId) {
                        _this._duihuanArr[i].value = data.LeftBuyTimes;
                    }
                }
                if (complete)
                    complete.run();
            }));
        };
        ModelSgActivity.zongshenAndJiuGuanListMaxListCount = 10;
        ModelSgActivity.jingjipaihangListMaxListCount = 20;
        ModelSgActivity.SG_ACTIVITY_CHANGE = "SG_ACTIVITY_CHANGE";
        ModelSgActivity.SG_ACTIVITY_DUIHUAN_CHOOSE = "SG_ACTIVITY_DUIHUAN_CHOOSE";
        ModelSgActivity.FIRSRRECHAGR_MAX = 648;
        /**周卡逻辑 */
        ModelSgActivity.WEEKCARD_CHANGE = "WEEKCARD_CHANGE";
        return ModelSgActivity;
    }(mo.ModelBase));
    mo.ModelSgActivity = ModelSgActivity;
    __reflect(ModelSgActivity.prototype, "mo.ModelSgActivity");
})(mo || (mo = {}));
