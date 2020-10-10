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
    var MovePetFllowState = (function (_super) {
        __extends(MovePetFllowState, _super);
        function MovePetFllowState() {
            var _this = _super.call(this, TypeState.MOVE_FOLLOW) || this;
            _this.cachePoint = new egret.Point();
            return _this;
        }
        MovePetFllowState.prototype.createAction = function () {
            this._action = new s.RunAction();
        };
        MovePetFllowState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
            this._action.initialize(body);
        };
        MovePetFllowState.prototype.reset = function () {
            this._targetTile = null;
            this._leaderLastTile = null;
            this._action.reset();
            _super.prototype.reset.call(this);
        };
        MovePetFllowState.prototype.check = function () {
            var that = this;
            var body = that._body;
            if (body.isTeamLeader())
                return false;
            if (body.isSleep() || body.isForbiddenMove())
                return false;
            if (body.target && body.target.type != TypeActor.DROP) {
                var distance = Math.max(Math.abs(body.tileX - body.target.tileX), Math.abs(body.tileY - body.target.tileY));
                //var distance = battle.manager.getNodeDistance(body.tileNode, body.target.tileNode);
                if (distance <= 8) {
                    //return false; //有攻击目标且目标比较近时不要跟随，直接去找目标
                    //跟随优先
                }
            }
            var leader = body.getTeamLeader();
            if (body.stateDead || !leader || leader.stateDead)
                return false;
            var leaderTile = leader.tileNode;
            var distanceLeader = Math.max(Math.abs(body.tileX - leaderTile.x), Math.abs(body.tileY - leaderTile.y));
            var moveState = leader.getAI().getState(TypeState.MOVE_TILE);
            if (distanceLeader < 5 && moveState && egret.getTimer() - moveState.getLastRunningTime() > 500) {
                return false;
            }
            if (distanceLeader < 4) {
                return false;
            }
            var petVO = body.vo;
            var targetTile = body.master.petGroup.getFellowNode(leaderTile.x, leaderTile.y, leader.direct, leader.vo.minLockRange, petVO.minLockRange);
            that._targetTile = battle.manager.getNextWalkableNode(body.scene, body.tileNode, targetTile, 1);
            if (that._targetTile) {
                return true;
            }
        };
        MovePetFllowState.prototype.start = function () {
            this._action.start(this._targetTile);
            this._action.onCompleteOnce(this, this.end);
            if (this._startHandler) {
                this._startHandler.runWith(this._body, this._targetTile);
            }
            return _super.prototype.start.call(this);
        };
        MovePetFllowState.prototype.end = function () {
            this._action.offComplete();
            _super.prototype.end.call(this);
        };
        MovePetFllowState.prototype.getTargetTile = function (masterTile) {
            var body = this._body;
            //var leader:SmartObject=this._master;
            var leader = body.getTeamLeader();
            var cachePoint = this.cachePoint;
            if (leader) {
                var direct = TypeDirection.getRealDirection8(leader.direct + 3);
                var tx = masterTile.x;
                var ty = masterTile.y;
                cachePoint = TypeDirection.getOffsetByDirection(direct, cachePoint);
                tx += cachePoint.x;
                ty += cachePoint.y;
                var node;
                node = leader.scene.getWalkableNode(tx, ty, body);
                if (node)
                    return node;
                tx -= cachePoint.x;
                ty -= cachePoint.y;
                node = leader.scene.getWalkableNode(tx, ty, body);
                if (node)
                    return node;
                tx -= cachePoint.x;
                ty -= cachePoint.y;
                node = leader.scene.getWalkableNode(tx, ty, body);
                if (node)
                    return node;
                cachePoint = TypeDirection.getOffsetByDirection(direct, cachePoint);
                tx = leader.tileX + cachePoint.x;
                ty = leader.tileY + cachePoint.y;
                node = leader.scene.getWalkableNode(tx, ty, body);
                if (node)
                    return node;
            }
        };
        return MovePetFllowState;
    }(s.StateBase));
    s.MovePetFllowState = MovePetFllowState;
    __reflect(MovePetFllowState.prototype, "s.MovePetFllowState");
})(s || (s = {}));
