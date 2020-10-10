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
    var MoveFlashState = (function (_super) {
        __extends(MoveFlashState, _super);
        function MoveFlashState(interval) {
            if (interval === void 0) { interval = 0; }
            var _this = _super.call(this, TypeState.MOVE_FLASH) || this;
            //private _leaderLastTile:PF.Node;
            _this._direct = -1;
            _this._interval = interval;
            return _this;
        }
        MoveFlashState.prototype.createAction = function () {
            this._action = new s.FlashAction();
        };
        MoveFlashState.prototype.reset = function () {
            if (this._path) {
                this._path = null;
            }
            this._targetTile = null;
            //this._leaderLastTile = null;
            _super.prototype.reset.call(this);
        };
        MoveFlashState.prototype.check = function () {
            var that = this;
            var body = that._body;
            if (body.isTeamLeader())
                return false;
            if (body.isSleep() || body.isForbiddenMove())
                return false;
            //if(body.target&&body.target.type!=TypeActor.DROP) return false; //有攻击目标不要跟随
            var leader = body.getTeamLeader();
            if (body.stateDead || !leader || leader.stateDead || !leader.tileNode)
                return false;
            //var leaderTile:PF.Node=leader.tileNode;
            //if(this._leaderLastTile == leaderTile) return false;
            //if(Math.abs(body.tileX-leader.tileX)<=8&&Math.abs(body.tileY-leader.tileY)<=8){
            //	return false;
            //}
            var leaderTile = leader.tileNode;
            var distanceLeader = Math.max(Math.abs(body.tileX - leaderTile.x), Math.abs(body.tileY - leaderTile.y));
            var petVO = body.vo;
            //var distanceLeaderX = Math.abs(body.tileX - leaderTile.x);
            //var distanceLeaderY = Math.abs(body.tileY - leaderTile.y);
            if (leader.getAI().isAttackState() == true) {
                //队长进入攻击时，检查是否需要调整武将位置
                var shouldDis = petVO.minLockRange - leader.vo.minLockRange;
                if (distanceLeader - shouldDis >= 0) {
                    return false;
                }
            }
            else if (distanceLeader < 6) {
                return false;
            }
            //that._targetTile=battle.manager.getAroundRandomNode(body.scene,leader.tileNode);			
            that._targetTile = body.master.petGroup.getFellowNode(leaderTile.x, leaderTile.y, leader.direct, leader.vo.minLockRange, petVO.minLockRange);
            if (that._targetTile) {
                this._direct = leader.direct;
                return true;
            }
            return false;
        };
        MoveFlashState.prototype.start = function () {
            var that = this;
            that._action.start(that._targetTile, this._direct);
            if (that._startHandler) {
                that._startHandler.runWith(that._body, that._targetTile);
            }
            return _super.prototype.start.call(this);
        };
        return MoveFlashState;
    }(s.StateBase));
    s.MoveFlashState = MoveFlashState;
    __reflect(MoveFlashState.prototype, "s.MoveFlashState");
})(s || (s = {}));
