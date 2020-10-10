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
    var MoveWanderState = (function (_super) {
        __extends(MoveWanderState, _super);
        function MoveWanderState() {
            var _this = _super.call(this, TypeState.MOVE_WANDER) || this;
            _this._interval = 2000;
            return _this;
        }
        MoveWanderState.prototype.createAction = function () {
            this._action = new s.RunAction();
        };
        MoveWanderState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
            this._action.initialize(body);
        };
        MoveWanderState.prototype.reset = function () {
            _super.prototype.reset.call(this);
        };
        MoveWanderState.prototype.check = function () {
            var that = this;
            var body = that._body;
            if (body.stateDead)
                return false;
            if (body.targetVO)
                return false;
            if (egret.getTimer() - that._lastTime < that._interval)
                return false;
            that._targetTile = battle.manager.getAroundRandomFromNode(body.scene, body.bornTile, body.tileNode, 2);
            if (that._targetTile) {
                return true;
            }
            return false;
        };
        MoveWanderState.prototype.start = function () {
            var that = this;
            that._action.start(that._targetTile);
            that._action.onCompleteOnce(that, that.end);
            that._lastTime = egret.getTimer();
            return _super.prototype.start.call(this);
        };
        MoveWanderState.prototype.end = function () {
            var that = this;
            if (that._targetTile == that._body.targetTile) {
                that._body.targetTile = null;
            }
            that._action.offComplete();
            _super.prototype.end.call(this);
        };
        return MoveWanderState;
    }(s.StateBase));
    s.MoveWanderState = MoveWanderState;
    __reflect(MoveWanderState.prototype, "s.MoveWanderState");
})(s || (s = {}));
