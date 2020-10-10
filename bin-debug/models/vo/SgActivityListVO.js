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
(function (vo) {
    var SgActivityListVO = (function (_super) {
        __extends(SgActivityListVO, _super);
        function SgActivityListVO() {
            return _super.call(this) || this;
        }
        SgActivityListVO.prototype.initialize = function (data) {
            this._actRewardListVO = [];
            this._actTaskListVO = [];
            this._actCfgId = data.ActCfgId;
            this._myValue = data.MyValue;
            this._hasRedPoint = data.HasRedPoint;
            this._myValueStr = data.MyValueStr;
            this._endTime = data.EndTime;
            this._actSetTemp = Templates.getTemplateById(templates.Map.ACTSETTING, this._actCfgId);
            if (this._actSetTemp.type == game.sgActivityType.mrcz) {
                this._order = 2;
            }
            else if (this._actSetTemp.type == game.sgActivityType.mrlc) {
                this._order = 1;
            }
            else {
                this._order = 0;
            }
            if (this._actSetTemp.type == 481) {
                console.log("sssssss");
            }
            if (this._actSetTemp.type == game.sgActivityType.act1) {
                this._order = 0;
            }
            else if (this._actSetTemp.type == game.sgActivityType.act2) {
                this._order = 1;
            }
            else if (this._actSetTemp.type == game.sgActivityType.act3) {
                this._order = 4;
            }
            else if (this._actSetTemp.type == game.sgActivityType.act4) {
                this._order = 3;
            }
            else if (this._actSetTemp.type == game.sgActivityType.act7 || this._actSetTemp.type == game.sgActivityType.act7) {
                this._order = 2;
            }
            for (var i = 0; i < data.GotRewardList.length; i++) {
                var listVo = vo.fromPool(vo.SgActivityRewardListVO, data.GotRewardList[i], this._actSetTemp.type, this._myValue, this._myValueStr);
                this._actRewardListVO.push(listVo);
            }
            for (var i = 0; i < data.TaskList.length; i++) {
                var taskVo = vo.fromPool(vo.SgActivityTaskListVO, data.TaskList[i], this._actSetTemp.type, this._myValue, this._myValueStr);
                this._actTaskListVO.push(taskVo);
            }
        };
        SgActivityListVO.prototype.reset = function () {
            this._actRewardListVO = [];
            this._actCfgId = this._myValue = this._order = 0;
            this._actSetTemp = null;
            this._myValueStr = null;
            this._endTime = 0;
        };
        Object.defineProperty(SgActivityListVO.prototype, "order", {
            get: function () {
                return this._order;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "hasRedPoint", {
            get: function () {
                return this._hasRedPoint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "endTime", {
            get: function () {
                return this._endTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "actTaskListVO", {
            get: function () {
                if (this._actTaskListVO) {
                    this._actTaskListVO.sort(function (a, b) {
                        if (a.orde != b.orde) {
                            return a.orde - b.orde;
                        }
                        else {
                            return a.taskCfgId - b.taskCfgId;
                        }
                    });
                }
                return this._actTaskListVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "actRewardListVO", {
            get: function () {
                if (this._actRewardListVO && this._actSetTemp) {
                    this._actRewardListVO.sort(function (a, b) {
                        return a.rewardCfgId - b.rewardCfgId;
                    });
                }
                return this._actRewardListVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "actRewardListVOStorState", {
            get: function () {
                if (this._actRewardListVO) {
                    this._actRewardListVO.sort(function (a, b) {
                        if (a.state != b.state) {
                            return a.state - b.state;
                        }
                        else {
                            return a.rewardCfgId - b.rewardCfgId;
                        }
                    });
                }
                return this._actRewardListVO;
            },
            enumerable: true,
            configurable: true
        });
        SgActivityListVO.prototype.getLeijidengluActRewardListVO = function (vip) {
            if (vip === void 0) { vip = 0; }
            var dataList = [];
            if (this._actRewardListVO) {
                for (var i = 0; i < this._actRewardListVO.length; i++) {
                    if (this._actRewardListVO[i].param == vip) {
                        dataList.push(this._actRewardListVO[i]);
                    }
                }
            }
            if (vip == 0) {
                dataList.sort(function (a, b) {
                    if (a.leijidengluState != b.leijidengluState) {
                        return a.leijidengluState - b.leijidengluState;
                    }
                    else {
                        return a.rewardCfgId - b.rewardCfgId;
                    }
                });
            }
            return dataList;
        };
        Object.defineProperty(SgActivityListVO.prototype, "actRewardListVOStorRmb", {
            get: function () {
                if (this._actRewardListVO) {
                    this._actRewardListVO.sort(function (a, b) {
                        if (a.state != b.state) {
                            return a.state - b.state;
                        }
                        else {
                            return a.rmb - b.rmb;
                        }
                    });
                }
                return this._actRewardListVO;
            },
            enumerable: true,
            configurable: true
        });
        SgActivityListVO.prototype.getActRewardListVOStorRmb = function (price) {
            var temArr = [];
            if (this._actRewardListVO) {
                for (var i = 0; i < this._actRewardListVO.length; i++) {
                    if (this._actRewardListVO[i].rmb == price) {
                        temArr.push(this._actRewardListVO[i]);
                    }
                }
            }
            return temArr;
        };
        Object.defineProperty(SgActivityListVO.prototype, "hashYYQGAndMRCZReceive", {
            /**检查一元抢购和每日充值是否领取 */
            get: function () {
                var isHashYYQG = true;
                for (var i = 0; i < this.actRewardListVO.length; i++) {
                    if (this.actRewardListVO[i].getTimes <= 0) {
                        isHashYYQG = false;
                        break;
                    }
                }
                return isHashYYQG;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "hashNoHaveReward", {
            /**检查等级礼包是否有奖励没领取 */
            get: function () {
                for (var i = 0; i < this._actRewardListVO.length; i++) {
                    if (this.actRewardListVO[i].state == 0) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "hashFirstRechargeReceive", {
            /**检查首冲是否存在没有领取的  私人定制也可以用这个方法*/
            get: function () {
                var isHashFirst = false;
                for (var i = 0; i < this.actRewardListVO.length; i++) {
                    if (this.actRewardListVO[i].getTimes <= 0) {
                        isHashFirst = true;
                        break;
                    }
                }
                return isHashFirst;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "actCfgId", {
            get: function () {
                return this._actCfgId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "myValue", {
            get: function () {
                return this._myValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "myValueStr", {
            get: function () {
                return this._myValueStr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "isAllBuy", {
            get: function () {
                if (!this.actRewardListVO || this.actRewardListVO.length <= 0)
                    return false;
                for (var i = 0; i < this.actRewardListVO.length; i++) {
                    if (this.actRewardListVO[i].getTimes <= 0)
                        return false;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        SgActivityListVO.prototype.hashMyValueStr = function (id) {
            if (this._myValueStr) {
                var s = this.myValueStr.split(";");
                for (var i = 0; i < s.length; i++) {
                    var sA = s[i].split("_");
                    if (sA[0] == id)
                        return true;
                }
            }
            return false;
        };
        SgActivityListVO.prototype.buyCountByValueStr = function (id) {
            if (this._myValueStr) {
                var s = this.myValueStr.split(";");
                for (var i = 0; i < s.length; i++) {
                    var sA = s[i].split("_");
                    if (sA[0] == id)
                        return parseInt(sA[1]);
                }
            }
            return 0;
        };
        Object.defineProperty(SgActivityListVO.prototype, "actSetTemp", {
            get: function () {
                return this._actSetTemp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "actType", {
            get: function () {
                return this._actSetTemp.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "funId", {
            get: function () {
                return this._actSetTemp.functionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityListVO.prototype, "actTableType", {
            get: function () {
                return this._actSetTemp.typeTable;
            },
            enumerable: true,
            configurable: true
        });
        return SgActivityListVO;
    }(vo.VOBase));
    vo.SgActivityListVO = SgActivityListVO;
    __reflect(SgActivityListVO.prototype, "vo.SgActivityListVO");
})(vo || (vo = {}));
