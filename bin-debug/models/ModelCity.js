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
    var ModelCity = (function (_super) {
        __extends(ModelCity, _super);
        function ModelCity() {
            var _this = _super.call(this) || this;
            _this._lastEnterTime = 0;
            _this._flagLevel1 = 1;
            _this._flagLevel2 = 1;
            _this._flagLevel3 = 1;
            return _this;
        }
        ModelCity.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.onRoute(n.MessageMap.G2C_NOTIFY_ALLUNIONFLAGINFO, utils.Handler.create(this, this.setAllUnionFlagInfo, null, false));
        };
        ModelCity.prototype.setAllUnionFlagInfo = function (data) {
            this._flagLevel1 = data.FlagLevel1;
            this._flagLevel2 = data.FlagLevel2;
            this._flagLevel3 = data.FlagLevel3;
            var flagLevels = [this._flagLevel1, this._flagLevel2, this._flagLevel3];
            this.dispatchEventWith(ModelCity.FLAG_CHANGE, false, flagLevels);
        };
        ModelCity.prototype.updateEnterTime = function () {
            this._lastEnterTime = GameModels.timer.getTimer();
        };
        Object.defineProperty(ModelCity.prototype, "canEnter", {
            get: function () {
                return (GameModels.timer.getTimer() - this._lastEnterTime) > 30000;
            },
            enumerable: true,
            configurable: true
        });
        ModelCity.prototype.getCanEnterTime = function () {
            if (!this.canEnter) {
                return 30000 - (GameModels.timer.getTimer() - this._lastEnterTime);
            }
            return 0;
        };
        ModelCity.FLAG_CHANGE = "flag_change";
        return ModelCity;
    }(mo.ModelBase));
    mo.ModelCity = ModelCity;
    __reflect(ModelCity.prototype, "mo.ModelCity");
})(mo || (mo = {}));
