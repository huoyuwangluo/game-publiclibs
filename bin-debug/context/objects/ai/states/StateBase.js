var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var StateBase = (function () {
        function StateBase(name) {
            this._name = name;
            this.createAction();
        }
        StateBase.prototype.createAction = function () { };
        Object.defineProperty(StateBase.prototype, "name", {
            get: function () { return this._name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StateBase.prototype, "runing", {
            get: function () { return this._runing; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StateBase.prototype, "nextState", {
            get: function () { return this._nextState; },
            enumerable: true,
            configurable: true
        });
        /**链接到下一个状态 */
        StateBase.prototype.enabledNext = function (value) {
            if (value === void 0) { value = null; }
            this._nextState = value ? value : this._nextRegisterState;
        };
        StateBase.prototype.getLastRunningTime = function () {
            return this._lastRunningTime;
        };
        StateBase.prototype.initialize = function (body, job) {
            var that = this;
            that._body = body;
            that._job = job;
            if (that._action)
                that._action.initialize(body);
        };
        StateBase.prototype.reset = function () {
            this.resetState();
            this.offStart();
        };
        StateBase.prototype.resetState = function () {
            this._runing = false;
            if (this._action) {
                this._action.reset();
                this._action.offComplete();
            }
        };
        StateBase.prototype.check = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return false;
        };
        StateBase.prototype.start = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._runing = true;
            this._nextState = null;
            this._lastRunningTime = egret.getTimer();
            return this;
        };
        StateBase.prototype.end = function () {
            this._runing = false;
            if (this._endHandler) {
                this._endHandler.run();
            }
        };
        StateBase.prototype.updateRender = function (timeStamp) {
            if (!this._runing)
                return true;
            var that = this;
            if (that._action.runing) {
                that._action.updateRender(timeStamp);
                if (!that._action.runing) {
                    that.end();
                }
            }
            else {
                this._runing = false;
            }
            return true;
        };
        StateBase.prototype.onStart = function (caller, method) {
            this.offStart();
            this._startHandler = utils.Handler.create(caller, method, null, false);
        };
        StateBase.prototype.offStart = function () {
            if (this._startHandler) {
                this._startHandler.recover();
                this._startHandler = null;
            }
        };
        StateBase.prototype.onEnd = function (caller, method) {
            this.offEnd();
            this._endHandler = utils.Handler.create(caller, method, null, false);
        };
        StateBase.prototype.offEnd = function () {
            if (this._endHandler) {
                this._endHandler.recover();
                this._endHandler = null;
            }
        };
        return StateBase;
    }());
    s.StateBase = StateBase;
    __reflect(StateBase.prototype, "s.StateBase");
})(s || (s = {}));
