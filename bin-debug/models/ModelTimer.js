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
    var ModelTimer = (function (_super) {
        __extends(ModelTimer, _super);
        function ModelTimer() {
            var _this = _super.call(this) || this;
            _this._syncInterval = 3;
            _this._clientSyncTime = 0;
            _this._serverSyncTime = 0;
            return _this;
        }
        ModelTimer.prototype.initialize = function () {
            this._hearts = [];
            this._date = new Date();
            this._heartMsg = new n.C2G_Heart_Jump();
        };
        ModelTimer.prototype.start = function () {
            if (this._isStart)
                return;
            this._isStart = true;
            this._clientSyncTime = egret.getTimer();
            this._serverSyncTime = this.getTimer();
            this.syncServerTime();
            mg.stageManager.onActivate(this, this.activateHandler);
        };
        ModelTimer.prototype.stop = function () {
            if (!this._isStart)
                return;
            this._isStart = false;
            utils.timer.clear(this, this.timerHandler);
            mg.stageManager.offActivate(this, this.activateHandler);
        };
        ModelTimer.prototype.activateHandler = function () {
            this.syncServerTime();
        };
        ModelTimer.prototype.syncServerTime = function () {
            //logger.log('同步服务器时间....')
            // this._heartMsg.PlayerFight = equation.getPlayerFightValue(GameModels.user.player);
            // this._heartMsg.PetFight1 = equation.getPetFightValue(GameModels.user.player.petList.getFormatVOByPos(1));
            // this._heartMsg.PetFight2 = equation.getPetFightValue(GameModels.user.player.petList.getFormatVOByPos(2));
            // this._heartMsg.PetFight3 = equation.getPetFightValue(GameModels.user.player.petList.getFormatVOByPos(3));
            var _this = this;
            this.request(n.MessageMap.C2G_HEART_JUMP, this._heartMsg, utils.Handler.create(this, function (data) {
                if (!_this._isStart)
                    return;
                utils.timer.clear(_this, _this.timerHandler);
                _this._date.setTime(data.TimeStamp * 1000);
                var clientPassTime = egret.getTimer() - _this._clientSyncTime;
                var serverPassTime = _this.getTimer() - _this._serverSyncTime;
                // if(clientPassTime/serverPassTime>=2){
                //     //本地时间验证失败（大于服务器时间2倍以上）
                //     this.stop();
                //     app.stopContext();
                //     GameModels.login.closeConnect();
                //     return;
                // }
                _this._serverSyncTime = _this.getTimer();
                _this._clientSyncTime = egret.getTimer();
                utils.timer.loop(1000, _this, _this.timerHandler);
            }));
        };
        ModelTimer.prototype.timerHandler = function () {
            var that = this;
            var date = that._date;
            date.setTime(that._date.getTime() + 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            if (seconds % that._syncInterval == 0) {
                that.syncServerTime();
            }
            if (hours == 0 && minutes && seconds == 0) {
                that.dispatchEventWith(ModelTimer.ZERO_TIME);
            }
        };
        ModelTimer.prototype.getTimer = function () {
            return this._date.getTime();
        };
        //------------------------------------------------
        //              Heart
        //------------------------------------------------
        ModelTimer.prototype.startHeart = function () {
            if (this._heartStart)
                return;
            this._heartStart = true;
            utils.timer.loop(1000, this, this.heartHandler);
        };
        ModelTimer.prototype.stopHeart = function () {
            if (!this._heartStart)
                return;
            this._heartStart = false;
            utils.timer.clear(this, this.heartHandler);
        };
        ModelTimer.prototype.heartHandler = function () {
            for (var _i = 0, _a = this._hearts; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler.run();
            }
        };
        ModelTimer.prototype.addHeart = function (caller, method) {
            if (this.getHandlerIndex(caller, method) == -1) {
                this._hearts.push(utils.Handler.create(caller, method, null, false));
                this.startHeart();
            }
        };
        ModelTimer.prototype.removeHeart = function (caller, method) {
            var index = this.getHandlerIndex(caller, method);
            if (index >= 0)
                this._hearts.splice(index, 1);
            if (!this._hearts.length) {
                this.stopHeart();
            }
        };
        ModelTimer.prototype.getHandlerIndex = function (caller, method) {
            var index = 0;
            for (var _i = 0, _a = this._hearts; _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.caller == caller && handler.method == method) {
                    return index;
                }
                index++;
            }
            return -1;
        };
        /*获取今天已经过去多少秒，从今天零点算起*/
        ModelTimer.prototype.getPastSecond = function () {
            var date = new Date(this._date.getTime());
            return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        };
        ModelTimer.ZERO_TIME = "ZERO_TIME";
        return ModelTimer;
    }(mo.ModelBase));
    mo.ModelTimer = ModelTimer;
    __reflect(ModelTimer.prototype, "mo.ModelTimer");
})(mo || (mo = {}));
