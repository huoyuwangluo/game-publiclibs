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
    var BackState = (function (_super) {
        __extends(BackState, _super);
        function BackState() {
            return _super.call(this, TypeState.BACK) || this;
        }
        BackState.prototype.createAction = function () {
            this._action = new s.BackAction();
        };
        BackState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
            this._action.initialize(body);
        };
        BackState.prototype.check = function () {
            return !this._body.stateDead;
        };
        BackState.prototype.start = function (master) {
            this._action.start(master);
            return _super.prototype.start.call(this);
        };
        return BackState;
    }(s.StateBase));
    s.BackState = BackState;
    __reflect(BackState.prototype, "s.BackState");
})(s || (s = {}));
