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
var vo;
(function (vo_1) {
    var SgActivityRewardListVO = (function (_super) {
        __extends(SgActivityRewardListVO, _super);
        function SgActivityRewardListVO() {
            return _super.call(this) || this;
        }
        SgActivityRewardListVO.prototype.initialize = function (data, actType, myValue, myValueStr) {
            this._actType = actType;
            this._rewardCfgId = data.RewardCfgId;
            this._getTimes = data.GetTimes;
            this._myValue = myValue;
            this._param = data.Param;
            this._myValueStr = myValueStr;
            if (actType > 100 && actType <= 200) {
                //领取奖励
                this._template = Templates.getTemplateById(templates.Map.ACTREWARD, this._rewardCfgId);
            }
            else if (actType > 200 && actType <= 300) {
                //货币购买
                this._template = Templates.getTemplateById(templates.Map.ACTBUY, this._rewardCfgId);
            }
            else if (actType > 300 && actType <= 400) {
                //排行奖励
                this._template = Templates.getTemplateById(templates.Map.ACTRANK, this._rewardCfgId);
            }
            else if (actType > 400 && actType <= 900) {
                //充值活动
                this._template = Templates.getTemplateById(templates.Map.GAMERECHARGE, this._rewardCfgId);
            }
            else {
                //特殊活动
            }
        };
        SgActivityRewardListVO.prototype.reset = function () {
            this._rewardCfgId = this._getTimes = 0;
            this._template = null;
            this._myValue = this._param = 0;
            this._myValueStr = null;
        };
        SgActivityRewardListVO.prototype.hashMyValueStr = function (id) {
            if (this._myValueStr) {
                var s = this._myValueStr.split(";");
                for (var i = 0; i < s.length; i++) {
                    var sA = s[i].split("_");
                    if (sA[0] == id)
                        return true;
                }
            }
            return false;
        };
        SgActivityRewardListVO.prototype.buyCountByValueStr = function (id) {
            if (this._myValueStr) {
                var s = this._myValueStr.split(";");
                for (var i = 0; i < s.length; i++) {
                    var sA = s[i].split("_");
                    if (sA[0] == id)
                        return parseInt(sA[1]);
                }
            }
            return 0;
        };
        Object.defineProperty(SgActivityRewardListVO.prototype, "myValue", {
            get: function () {
                return this._myValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "actType", {
            get: function () {
                return this._actType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "rewardCfgId", {
            get: function () {
                return this._rewardCfgId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "rewardCfgType", {
            get: function () {
                return this._template.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "getTimes", {
            /**购买的次数，对于领奖的是领取的次数 */
            get: function () {
                return this._getTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "param", {
            /**0表示普通，1表示vip */
            get: function () {
                return this._param;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "rmb", {
            get: function () {
                if (this._template instanceof templates.gameRecharge) {
                    return this._template.RMB;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "rechargeParams", {
            get: function () {
                if (this._template instanceof templates.gameRecharge) {
                    return this._template.params;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "everyRewards", {
            get: function () {
                if (this._template instanceof templates.gameRecharge) {
                    return this._template.everyRewards;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "otherRewards", {
            get: function () {
                if (this._template instanceof templates.gameRecharge) {
                    return this._template.otherRewards;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateRewards", {
            get: function () {
                if (this._template instanceof templates.actBuy || this._template instanceof templates.actRank || this._template instanceof templates.actReward) {
                    return this._template.rewards;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateName", {
            get: function () {
                return this._template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateDes", {
            get: function () {
                return this._template.des;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateDes1", {
            get: function () {
                if (this._template instanceof templates.actReward) {
                    return this._template.desc;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "order", {
            get: function () {
                if (this._template instanceof templates.actReward) {
                    return this._template.order;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateDiscount", {
            get: function () {
                if (this._template instanceof templates.actBuy) {
                    return this._template.discount;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateBuyTimes", {
            get: function () {
                if (this._template instanceof templates.actBuy) {
                    return this._template.buyTimes;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateNeedVip", {
            get: function () {
                if (this._template instanceof templates.actBuy) {
                    return this._template.needVip;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateNeedLv", {
            get: function () {
                if (this._template instanceof templates.actBuy) {
                    return this._template.needLv;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateFunctionParams", {
            get: function () {
                if (this._template instanceof templates.actBuy) {
                    return this._template.functionParams;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateConsume", {
            get: function () {
                if (this._template instanceof templates.actBuy) {
                    return this._template.consume;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateConsume1", {
            get: function () {
                if (this._template instanceof templates.actBuy) {
                    return this._template.consume1;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateRankMin", {
            get: function () {
                if (this._template instanceof templates.actRank) {
                    return this._template.rankMin;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateRankMax", {
            get: function () {
                if (this._template instanceof templates.actRank) {
                    return this._template.rankMax;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateFunctionId", {
            get: function () {
                if (this._template instanceof templates.actRank) {
                    return this._template.functionId;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateValue", {
            get: function () {
                if (this._template instanceof templates.actReward) {
                    return this._template.value;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "templateTarget", {
            get: function () {
                if (this._template instanceof templates.actReward) {
                    return this._template.target;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "state", {
            /**0可领取，1未达成，2已领取 */
            get: function () {
                var state = 0;
                if (this._actType == game.sgActivityType.zyth) {
                    if (this.hashMyValueStr(this.rewardCfgId.toString())) {
                        if (this.getTimes > 0) {
                            return 2;
                        }
                        else {
                            return 0;
                        }
                    }
                    return 1;
                }
                if (this._actType == game.sgActivityType.myth || this._actType == game.sgActivityType.mzth || this._actType == game.sgActivityType.act7) {
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(this._actType);
                    var count = vo.buyCountByValueStr(this.rewardCfgId.toString());
                    if (count < this.rechargeParams) {
                        if (this.getTimes >= count) {
                            return 1;
                        }
                    }
                    else {
                        if (this.getTimes >= count) {
                            return 2;
                        }
                    }
                    return 0;
                }
                if (this._actType == game.sgActivityType.czjj) {
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.czjjrmb);
                    if (vo.hashMyValueStr(vo.actSetTemp.params)) {
                        if (this._myValue >= this.templateValue) {
                            if (this.getTimes > 0)
                                return 2;
                        }
                        else {
                            return 1;
                        }
                    }
                    else {
                        return 1;
                    }
                    return 0;
                }
                if (this._template instanceof templates.actReward) {
                    if (this._myValue >= this.templateValue) {
                        if (this.getTimes > 0)
                            state = 2;
                    }
                    else {
                        state = 1;
                    }
                }
                return state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityRewardListVO.prototype, "leijidengluState", {
            /**累计登陆的状态  0可领取，1未达成，2已领取 */
            get: function () {
                if (this.state == 2 && GameModels.sgActivity.getLeijidengluActVipRewardListVO(this.rewardCfgId) > 0)
                    return 2;
                var vipB = this.state != 1 && GameModels.user.player.vip > 0 && GameModels.sgActivity.getLeijidengluActVipRewardListVO(this.rewardCfgId) <= 0;
                if (this.state == 0 || vipB)
                    return 0;
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        return SgActivityRewardListVO;
    }(vo.VOBase));
    vo_1.SgActivityRewardListVO = SgActivityRewardListVO;
    __reflect(SgActivityRewardListVO.prototype, "vo.SgActivityRewardListVO");
})(vo || (vo = {}));
