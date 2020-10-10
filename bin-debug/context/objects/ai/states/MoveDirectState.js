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
    var MoveDirectState = (function (_super) {
        __extends(MoveDirectState, _super);
        function MoveDirectState() {
            return _super.call(this, TypeState.MOVE_DIRECT) || this;
        }
        MoveDirectState.prototype.createAction = function () {
            this._action = new s.RunAction();
        };
        MoveDirectState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
            this._action.initialize(body);
        };
        MoveDirectState.prototype.reset = function () {
            if (this._path) {
                this._path = null;
            }
            _super.prototype.reset.call(this);
        };
        // public set direct(value:number){
        // 	this._direct=mg.ControlManager.instance.direction;
        // }
        MoveDirectState.prototype.check = function () {
            var that = this;
            var body = that._body;
            if (body.stateDead || that._direct == undefined)
                return false;
            that._targetTile = null;
            that._targetTile = battle.manager.getDirectNextNode(body.tileNode, that._direct, body.scene);
            if (that._targetTile)
                return true;
            return false;
        };
        MoveDirectState.prototype.start = function () {
            this._action.start(this._targetTile);
            this._action.onCompleteOnce(this, this.end);
            return _super.prototype.start.call(this);
        };
        MoveDirectState.prototype.end = function () {
            this._direct = undefined;
            this._targetTile = null;
            this._action.offComplete();
            _super.prototype.end.call(this);
        };
        return MoveDirectState;
    }(s.StateBase));
    s.MoveDirectState = MoveDirectState;
    __reflect(MoveDirectState.prototype, "s.MoveDirectState");
})(s || (s = {}));
