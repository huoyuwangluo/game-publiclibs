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
var s;
(function (s) {
    var IdelState = (function (_super) {
        __extends(IdelState, _super);
        function IdelState(time) {
            var _this = _super.call(this, TypeState.IDEL) || this;
            _this._time = time;
            return _this;
        }
        IdelState.prototype.createAction = function () {
            this._action = new s.IdelAction();
        };
        IdelState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
            this._action.initialize(body);
        };
        IdelState.prototype.check = function () {
            return !this._body.stateDead;
        };
        IdelState.prototype.start = function (timer) {
            this._action.start(timer ? timer : this._time);
            return _super.prototype.start.call(this);
        };
        return IdelState;
    }(s.StateBase));
    s.IdelState = IdelState;
    __reflect(IdelState.prototype, "s.IdelState");
})(s || (s = {}));
