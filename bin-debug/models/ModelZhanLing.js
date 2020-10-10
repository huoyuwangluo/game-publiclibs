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
    var ModelZhanLing = (function (_super) {
        __extends(ModelZhanLing, _super);
        function ModelZhanLing() {
            return _super.call(this) || this;
        }
        ModelZhanLing.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._zhanlingVoList = [];
            this._exp = this._level = this._stepOpen = 0;
            this._seaon = 0;
            this._pricePer = 100;
            this._leftTime = 0;
            //this.getBPInfo();
            n.net.onRoute(n.MessageMap.NOTIFYSTEPOPENINFO, utils.Handler.create(this, this.updataStepOpen, null, false));
        };
        ModelZhanLing.prototype.updataStepOpen = function (data) {
            this._stepOpen = data.StepOpen;
            this.dispatchEventWith(mo.ModelZhanLing.ZHANLING_CHANGE);
        };
        ModelZhanLing.prototype.initZhanLingVo = function (data) {
            this._zhanlingVoList = [];
            for (var i = 0; i < data.length; i++) {
                var zhanling = vo.fromPool(vo.ZhanLingVO);
                zhanling.decode(data[i]);
                this._zhanlingVoList.push(zhanling);
            }
        };
        Object.defineProperty(ModelZhanLing.prototype, "currTemp", {
            get: function () {
                return this._currTemp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhanLing.prototype, "exp", {
            get: function () {
                return this._exp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhanLing.prototype, "stepOpen", {
            get: function () {
                return this._stepOpen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhanLing.prototype, "seaon", {
            get: function () {
                return this._seaon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhanLing.prototype, "pricePer", {
            get: function () {
                return this._pricePer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhanLing.prototype, "leftTime", {
            get: function () {
                return this._leftTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelZhanLing.prototype, "zhanlingVoList", {
            get: function () {
                if (this._zhanlingVoList) {
                    this._zhanlingVoList.sort(function (a, b) {
                        if (a.state != b.state) {
                            return a.state - b.state;
                        }
                        else {
                            return a.level - b.level;
                        }
                    });
                }
                return this._zhanlingVoList;
            },
            enumerable: true,
            configurable: true
        });
        /**获得战令信息 */
        ModelZhanLing.prototype.getBPInfo = function (successhandler) {
            var msg = n.MessagePool.from(n.C2G_BP_GetInfo);
            this.request(n.MessageMap.C2G_BP_GETINFO, msg, utils.Handler.create(this, function (data) {
                this._exp = data.Exp;
                this._level = data.Level;
                this._stepOpen = data.StepOpen;
                this._seaon = data.Seaon;
                this._pricePer = data.PricePer;
                this._leftTime = data.LeftTime;
                this._currTemp = Templates.getTemplateById(templates.Map.BATTLEPASS, this._level);
                this.initZhanLingVo(data.List);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**购买等级 */
        ModelZhanLing.prototype.buyBPLevel = function (level, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_BP_BuyLevel);
            msg.BuyLevel = level;
            this.request(n.MessageMap.C2G_BP_BUYLEVEL, msg, utils.Handler.create(this, function (data) {
                _this._level = data.NewLevel;
                _this._currTemp = Templates.getTemplateById(templates.Map.BATTLEPASS, _this._level);
                _this.dispatchEventWith(mo.ModelZhanLing.ZHANLING_CHANGE);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**领取战令 1：精英战令，2：进阶战令*/
        ModelZhanLing.prototype.getBPReward = function (level, type, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_BP_GetReward);
            msg.Level = level;
            msg.Type = type;
            this.request(n.MessageMap.C2G_BP_GETREWARD, msg, utils.Handler.create(this, function (data) {
                if (data.Result > 0) {
                    for (var i = 0; i < _this._zhanlingVoList.length; i++) {
                        if (_this._zhanlingVoList[i].level == data.Level) {
                            if (data.Type == 1) {
                                _this._zhanlingVoList[i].reward1State = 1;
                            }
                            else {
                                _this._zhanlingVoList[i].reward2State = 1;
                            }
                            _this.dispatchEventWith(mo.ModelZhanLing.ZHANLING_CHANGE);
                            break;
                        }
                    }
                    if (successhandler)
                        successhandler.run();
                }
            }));
        };
        /**一键领取 */
        ModelZhanLing.prototype.getBPAllReward = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_BP_GetAllReward);
            this.request(n.MessageMap.C2G_BP_GETALLREWARD, msg, utils.Handler.create(this, function (data) {
                if (data.Result > 0) {
                    _this.initZhanLingVo(data.List);
                }
                if (successhandler)
                    successhandler.run();
            }));
        };
        ModelZhanLing.ZHANLING_CHANGE = "ZHANLING_CHANGE";
        return ModelZhanLing;
    }(mo.ModelBase));
    mo.ModelZhanLing = ModelZhanLing;
    __reflect(ModelZhanLing.prototype, "mo.ModelZhanLing");
})(mo || (mo = {}));
