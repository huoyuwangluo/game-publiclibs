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
    var MovePetDodgeState = (function (_super) {
        __extends(MovePetDodgeState, _super);
        function MovePetDodgeState() {
            var _this = _super.call(this, TypeState.MOVE_DODGE) || this;
            _this.cachePoint = new egret.Point();
            return _this;
        }
        MovePetDodgeState.prototype.createAction = function () {
            this._action = new s.RunAction();
        };
        MovePetDodgeState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
            this._action.initialize(body);
        };
        MovePetDodgeState.prototype.initializeMaster = function (body) {
            this._master = body;
        };
        MovePetDodgeState.prototype.reset = function () {
            _super.prototype.reset.call(this);
        };
        MovePetDodgeState.prototype.check = function () {
            var that = this;
            var body = that._body;
            var master = that._master;
            if (body.stateDead || !master || master.stateDead)
                return false;
            var tileX = game.MapConfig.getTileX(body.x);
            var tileY = game.MapConfig.getTileY(body.y);
            if (body.scene.getNode(tileX, tileY).object != body) {
                that._targetTile = battle.manager.getAroundEmptyNodeByPos(body.scene, master.tileNode, tileX, tileY);
                if (that._targetTile)
                    return true;
            }
            return false;
        };
        MovePetDodgeState.prototype.start = function () {
            this._action.start(this._targetTile);
            this._action.onCompleteOnce(this, this.end);
            return _super.prototype.start.call(this);
        };
        MovePetDodgeState.prototype.end = function () {
            this._action.offComplete();
            _super.prototype.end.call(this);
        };
        MovePetDodgeState.prototype.getTargetTile = function () {
            var master = this._master;
            var cachePoint = this.cachePoint;
            if (master) {
                var direct = TypeDirection.getRealDirection8(master.direct + 2);
                var tx = master.tileX;
                var ty = master.tileY;
                cachePoint = TypeDirection.getOffsetByDirection(direct, cachePoint);
                tx += cachePoint.x * 2;
                ty += cachePoint.y * 2;
                cachePoint = TypeDirection.getOffsetByDirection(master.direct, cachePoint);
                tx += cachePoint.x;
                ty += cachePoint.y;
                var node;
                node = master.scene.getWalkableNode(tx, ty);
                if (node)
                    return node;
                tx -= cachePoint.x * 2;
                ty -= cachePoint.y * 2;
                node = master.scene.getWalkableNode(tx, ty);
                if (node)
                    return node;
                tx -= cachePoint.x;
                ty -= cachePoint.y;
                node = master.scene.getWalkableNode(tx, ty);
                if (node)
                    return node;
                cachePoint = TypeDirection.getOffsetByDirection(direct, cachePoint);
                tx = master.tileX + cachePoint.x;
                ty = master.tileY + cachePoint.y;
                node = master.scene.getWalkableNode(tx, ty);
                if (node)
                    return node;
            }
        };
        return MovePetDodgeState;
    }(s.StateBase));
    s.MovePetDodgeState = MovePetDodgeState;
    __reflect(MovePetDodgeState.prototype, "s.MovePetDodgeState");
})(s || (s = {}));
