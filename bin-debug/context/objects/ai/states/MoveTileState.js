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
    var MoveTileState = (function (_super) {
        __extends(MoveTileState, _super);
        function MoveTileState() {
            var _this = _super.call(this, TypeState.MOVE_TILE) || this;
            _this._historyTileList = [];
            return _this;
            //this._nextRegisterState=TypeState.MOVE_PATH;
        }
        MoveTileState.prototype.createAction = function () {
            this._action = new s.RunAction();
        };
        MoveTileState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
            this._action.initialize(body);
            body.onTargetChange(this, this.targetChangeHandler);
        };
        MoveTileState.prototype.reset = function () {
            _super.prototype.reset.call(this);
            var that = this;
            that._body.offTargetChange(this, this.targetChangeHandler);
            that._next = null;
            //that._lastlastlastTile=null;
            //that._lastlastTile=null;
            //that._lastTile=null;
            that._historyTileList = [];
            that.clearPath();
            that.offStart();
            if (that._bodyTarget) {
                that._bodyTarget.offTileChange(this, this.targetTileChange);
            }
        };
        MoveTileState.prototype.resetState = function () {
            _super.prototype.resetState.call(this);
            var that = this;
            that._next = null;
            //that._lastlastlastTile=null;
            //that._lastlastTile=null;
            //that._lastTile=null;
            if (that._path && that._path.length)
                that._path.length = 0;
            //that.offStart();
        };
        MoveTileState.prototype.targetChangeHandler = function () {
            var that = this;
            that.clearPath(); //目标变化时，取消之前的寻路路径
            if (that._bodyTarget != that._body.target) {
                if (that._bodyTarget) {
                    that._bodyTarget.offTileChange(this, this.targetTileChange);
                }
                that._bodyTarget = that._body.target;
                if (that._bodyTarget) {
                    that._bodyTarget.onTileChange(this, this.targetTileChange);
                }
            }
        };
        MoveTileState.prototype.targetTileChange = function () {
            this.clearPath(); //目标移动时，取消之前的寻路路径
        };
        MoveTileState.prototype.check = function () {
            var body = this._body;
            if (body.stateDead || body.vo == null)
                return false;
            if (body.isSleep() || body.isForbiddenMove())
                return false;
            if (this._tileSetter)
                return true;
            /*if(this._path&&this._path.length){
                body.targetTile=null;
                this._next=this._path.shift();
                return true;
            }*/
            this._next = null;
            var distance = this.getTargetDistance();
            if (!this._body.isTeamLeader() && this._body.type == TypeActor.PET) {
                if (distance == 0) {
                    return false; //队长才跑去捡掉落物品
                }
            }
            var endTile = this.getTargetNode();
            if (endTile) {
                //if(battle.manager.getNodeSpace2(body.tileX,body.tileY,endTile.x,endTile.y)==space) return false;
                var nodeDistance = battle.manager.getNodeDistance(body.tileNode, endTile);
                if (nodeDistance <= distance)
                    return false;
                if (!!this._body.target && nodeDistance <= body.vo.minLockRange && distance > 0)
                    return false; //进入射程不要动
                //if(!this._body.isTeamLeader() && this._body.type == TypeActor.PET && nodeDistance > 8) return false; //离目标点太远，走跟随队长逻辑
                if (this._path && this._path.length) {
                    this._next = this._path.shift();
                    return true;
                }
                //挂机玩法不用寻路，减少性能消耗
                //if(TypeGame.isClientGame())
                if (!TypeGame.isNeedAStarFind(app.gameContext.typeGame)) {
                    if (body.tileNode == endTile && distance != 0) {
                        //位置重叠,但目标距离不为0
                        this._next = battle.manager.getNextWalkableNode(body.scene, body.tileNode, endTile, distance, endTile);
                    }
                    else {
                        //还未达到space要求的距离
                        this._next = battle.manager.getNextWalkableNode(body.scene, body.tileNode, endTile, distance, this.getExpcetNode(), distance != 0);
                        if (this._next) {
                            //logger.error(this._next.hasObject());
                        }
                        if (!this._next && distance > 0) {
                            this._next = battle.manager.getNextWalkableNode(body.scene, body.tileNode, endTile, distance, this.getExpcetNode(), false);
                        }
                    }
                    if (!this._next || this._next == body.tileNode) {
                        logger.error('寻找下一个路点异常!');
                        return false;
                    }
                    if (this._body.isTeamLeader() && this.checkIsBackPath()) {
                        //走回头路的话就直接寻路
                        if (this.findPathToTarget()) {
                            this._next = this._path.shift();
                            return true;
                        }
                        return false;
                    }
                    //记录历之前走过的点，用于判断是否走回头路了
                    if (this._next != null) {
                        this._historyTileList.push(this._next);
                        if (this._historyTileList.length > 4) {
                            this._historyTileList.shift();
                        }
                    }
                    return true;
                }
                else {
                    if (this.findPathToTarget()) {
                        this._next = this._path.shift();
                        return true;
                    }
                }
            }
            else {
                if (this._path && this._path.length) {
                    this._next = this._path.shift();
                    return true;
                }
            }
            return false;
        };
        MoveTileState.prototype.getTargetNode = function () {
            if (!!this._body.target) {
                return this._body.target.tileNode;
            }
            else if (!!this._body.targetVO) {
                return app.gameContext.scene.getNode(this._body.targetVO.tileX, this._body.targetVO.tileY);
            }
            else if (!!this._body.targetTile) {
                return this._body.targetTile;
            }
            return null;
        };
        MoveTileState.prototype.getTargetDistance = function () {
            var retDis = 1;
            var type = 0;
            if (!!this._body.target) {
                type = this._body.target.type;
            }
            else if (!!this._body.targetVO) {
                type = this._body.targetVO.type;
            }
            else if (!!this._body.targetTile) {
                type = 0;
            }
            if (type == TypeActor.DROP) {
                retDis = 0;
            }
            else if (type == TypeActor.BOSS) {
                retDis = 2;
            }
            else {
                retDis = 1;
            }
            return retDis;
        };
        MoveTileState.prototype.getExpcetNode = function () {
            if (this._body.isTeamLeader())
                return null;
            if (this._body.type == TypeActor.PET) {
                var leader = this._body.getTeamLeader();
                if (leader && leader != this._body && leader.getAI()) {
                    return leader.getAI().nextTile;
                }
            }
            return null;
        };
        MoveTileState.prototype.setTarget = function (x, y) {
            this._tileSetter = this._body.scene.getNode(x, y);
        };
        MoveTileState.prototype.start = function () {
            var that = this;
            if (that._tileSetter) {
                that._next = that._tileSetter;
                that._tileSetter = null;
            }
            that._action.start(that._next);
            that._action.onCompleteOnce(that, that.end);
            _super.prototype.start.call(this);
            if (that._startHandler) {
                that._startHandler.runWith(that._body, that._next);
            }
            //this.addFootEffect();
            return that;
        };
        MoveTileState.prototype.addFootEffect = function () {
            if (!this._body)
                return;
            if (!this._body.avatarEnabled)
                return;
            if (this._body.type != TypeActor.PLAYER)
                return;
            var effect = utils.ObjectPool.from(s.AnimationSprite);
            effect.resId = "30009";
            effect.x = this._body.x;
            effect.y = this._body.y;
            this._body.scene.addEffectBehind(effect);
            effect.play();
            effect.onComplete(this, this.footEffectOverHandler, effect);
        };
        MoveTileState.prototype.footEffectOverHandler = function (effect) {
            effect.offAllComplete();
            effect.stop();
            effect.resId = null;
            app.gameContext.scene.removeEffect(effect);
            utils.ObjectPool.to(effect);
        };
        MoveTileState.prototype.checkIsBackPath = function () {
            var that = this;
            for (var _i = 0, _a = that._historyTileList; _i < _a.length; _i++) {
                var tNode = _a[_i];
                if (tNode == that._next) {
                    return true;
                }
            }
            return false;
        };
        MoveTileState.prototype.end = function () {
            var that = this;
            var body = that._body;
            if (that._next == body.targetTile) {
                body.targetTile = null;
            }
            //if(that._lastlastlastTile==that._next||that._lastlastTile==that._next){
            //	that.findPath();//走回头路 改为路径寻路
            //that.enabledNext();//走回头路 改为路径寻路
            //}
            /*
            if(that._next != null){
                that._historyTileList.push(that._next);
                if(that._historyTileList.length > 4){
                    that._historyTileList.shift();
                }
                
            }
            */
            //that._lastlastlastTile=that._lastlastTile;
            //that._lastlastTile=that._lastTile;
            //that._lastTile=that._next;
            that._next = null;
            that._action.offComplete();
            _super.prototype.end.call(this);
        };
        Object.defineProperty(MoveTileState.prototype, "nextTile", {
            get: function () {
                return this._next;
            },
            enumerable: true,
            configurable: true
        });
        MoveTileState.prototype.findPath = function () {
            var body = this._body;
            if (body.stateDead)
                return false;
            this._next = null;
            var endNode = this.getTargetNode();
            return this.findPathHandler(endNode);
        };
        MoveTileState.prototype.findPathToTarget = function () {
            var node = this.getTargetNode();
            if (node) {
                this.findPathHandler(node);
                if (this._path.length > 0) {
                    var dis = this.getTargetDistance();
                    if (dis > 0) {
                        this._path.pop(); //最后一个目标点不需要
                    }
                }
            }
            return this._path.length > 0;
        };
        MoveTileState.prototype.findPathTo = function (x, y) {
            var node = this._body.scene.getNode(x, y);
            if (node && node.walkable) {
                this.findPathHandler(node);
            }
        };
        MoveTileState.prototype.findPathHandler = function (endNode) {
            this._historyTileList = [];
            if (endNode) {
                var body = this._body;
                if (!endNode.walkable) {
                    logger.error('目标点不可行走,找最近一个可走点');
                    //return false;
                    endNode = battle.manager.getAroundEmptyNode(body.scene, endNode, body.tileNode);
                    if (endNode == null) {
                        logger.error('找不到可行走点');
                        return false;
                    }
                }
                this._path = body.scene.findPath(body.tileX, body.tileY, endNode.x, endNode.y);
                if (this._path.length > 0) {
                    this._path.shift();
                }
                return this._path.length > 0;
            }
            return false;
        };
        MoveTileState.prototype.hasPath = function () {
            return this._path && (this._path.length > 0);
        };
        MoveTileState.prototype.clearPath = function () {
            if (this._path && this._path.length)
                this._path.length = 0;
            this._path = null;
        };
        return MoveTileState;
    }(s.StateBase));
    s.MoveTileState = MoveTileState;
    __reflect(MoveTileState.prototype, "s.MoveTileState");
})(s || (s = {}));
