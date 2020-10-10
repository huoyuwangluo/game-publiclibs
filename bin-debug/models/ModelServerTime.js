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
    var ModelServerTime = (function (_super) {
        __extends(ModelServerTime, _super);
        function ModelServerTime() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelServerTime.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this.onRoute(n.MessageMap.G2C_ACTIVITY_ONDAYCHANGE, utils.Handler.create(this, function (data) {
                _this._activityDay = data.OpenServerWhichDay < 1 ? 1 : data.OpenServerWhichDay;
                // if (this._birthDate) {
                // 	this._birthDay = Math.floor((GameModels.timer.getTimer() - this._birthDate) / 86400000) + 1;
                // 	logger.log("创建角色的天数:", this._birthDay);
                // }
                if (GameModels.sgActivity)
                    GameModels.sgActivity.requestSGRunningActivitys();
                if (GameModels.sgActivity)
                    GameModels.sgActivity.requestWeekCardInfo();
                if (GameModels.ouYuXianRen)
                    GameModels.ouYuXianRen.chooseGiftGetInfo();
                if (GameModels.redPoint)
                    GameModels.redPoint.requestRedPointInfo();
                if (GameModels.limitTarget)
                    GameModels.limitTarget.requestLimitTargetInfo();
                if (GameModels.sevenDayTask)
                    GameModels.sevenDayTask.requesSevenDayTargetInfo();
                _this.dispatchEventWith(ModelServerTime.CROSS_DAY_EVENT);
            }));
        };
        ModelServerTime.prototype.initializeData = function (dateStr, day, birthStr, sportsActivityValue) {
            this._birthDay = Math.floor((GameModels.timer.getTimer() - parseInt(birthStr)) / 86400000) + 1;
            logger.log("创建角色的天数:", this._birthDay);
            this._activityDay = day < 1 ? 1 : day;
            this._activityDate = this._activityServeDate = parseInt(dateStr);
            var date = new Date(this._activityDate);
            this._activityDate = this._activityDate - (1000 * 3600 * date.getHours()) - (1000 * 60 * date.getMinutes()) - (1000 * date.getSeconds());
            this._birthDate = this._birthServerDate = parseInt(birthStr);
            var date = new Date(this._birthDate);
            this._birthDate = this._birthDate - (1000 * 3600 * date.getHours()) - (1000 * 60 * date.getMinutes()) - (1000 * date.getSeconds());
        };
        Object.defineProperty(ModelServerTime.prototype, "birthServerDate", {
            get: function () {
                return this._birthServerDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelServerTime.prototype, "birthDate", {
            get: function () {
                return this._birthDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelServerTime.prototype, "birthDay", {
            get: function () {
                return this._birthDay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelServerTime.prototype, "activityServeDate", {
            get: function () {
                return this._activityServeDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelServerTime.prototype, "kaifuDate", {
            get: function () {
                return this._activityDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelServerTime.prototype, "kaifuDay", {
            get: function () {
                return this._activityDay;
            },
            enumerable: true,
            configurable: true
        });
        ModelServerTime.prototype.isOpenCrossServer = function () {
            return this._activityDay >= 15 && GameModels.world.isKuaFuOpen != 0;
        };
        /**获取今天是什么季节，0-冬季1-春季2-夏季3-秋季 */
        ModelServerTime.prototype.getSeason = function () {
            var season = -1;
            if (GameModels.serverTime) {
                season = this._activityDay % 4;
            }
            return season;
        };
        //跨天 	
        ModelServerTime.CROSS_DAY_EVENT = "CROSS_DAY_EVENT";
        return ModelServerTime;
    }(mo.ModelBase));
    mo.ModelServerTime = ModelServerTime;
    __reflect(ModelServerTime.prototype, "mo.ModelServerTime");
})(mo || (mo = {}));
