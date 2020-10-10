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
    var DeadState = (function (_super) {
        __extends(DeadState, _super);
        function DeadState() {
            return _super.call(this, TypeState.DEAD) || this;
        }
        DeadState.prototype.createAction = function () {
            this._action = new s.DeadAction();
        };
        DeadState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
            this._action.initialize(body);
            body.onDeadPriority(this, this.deadHandler);
        };
        DeadState.prototype.deadHandler = function (killer) {
            this._killerVO = killer;
        };
        DeadState.prototype.check = function () {
            return this._body.stateDead;
        };
        DeadState.prototype.start = function () {
            this._action.start(this._killerVO);
            return _super.prototype.start.call(this);
        };
        return DeadState;
    }(s.StateBase));
    s.DeadState = DeadState;
    __reflect(DeadState.prototype, "s.DeadState");
})(s || (s = {}));
