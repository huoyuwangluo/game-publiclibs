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
    var AIPlayer = (function (_super) {
        __extends(AIPlayer, _super);
        function AIPlayer() {
            var _this = _super.call(this) || this;
            _this._moveDirectState = new s.MoveDirectState();
            _this.registerStates();
            return _this;
        }
        AIPlayer.prototype.registerStates = function () {
            this.registerState(new s.DeadState());
            //this.register(this._pickAllState);
            this.registerState(new s.PlayerAttackState());
            this.registerState(new s.MoveTileState());
            this.registerState(new s.IdelState(500));
            this._pickEnabled = false;
            this._pickSigleEnabled = false;
        };
        AIPlayer.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
            this._moveDirectState.initialize(body, job);
            this._body.vo.onSkillAdd(this, this.initializeSkill);
        };
        AIPlayer.prototype.initializeSkill = function () {
            var attackState = this.getState(TypeState.ATTACK);
            attackState.clearSkillList();
            for (var _i = 0, _a = this._body.vo.skillList.list; _i < _a.length; _i++) {
                var skillVO = _a[_i];
                if (skillVO.type != 0)
                    attackState.registerSkill(skillVO.template);
            }
        };
        AIPlayer.prototype.reset = function () {
            if (this._body.vo) {
                this._body.vo.offSkillAdd(this, this.initializeSkill);
            }
            var curState = this.getState(TypeState.MOVE_TILE);
            curState.offStart();
            this._pickEnabled = false;
            this._pickSigleEnabled = false;
            this.updatePickState();
            _super.prototype.reset.call(this);
        };
        AIPlayer.prototype.stop = function () {
            this._moveDirectState.reset();
            this.clearMovePath();
            _super.prototype.stop.call(this);
        };
        Object.defineProperty(AIPlayer.prototype, "nextTile", {
            get: function () {
                return this.getState(TypeState.MOVE_TILE).nextTile;
            },
            enumerable: true,
            configurable: true
        });
        /**打开拾取  默认为关闭拾取 */
        AIPlayer.prototype.enabledPickState = function (oneByOne) {
            if (oneByOne === void 0) { oneByOne = false; }
            this._pickEnabled = true;
            this._pickSigleEnabled = oneByOne;
            this.updatePickState();
        };
        /**关闭拾取  默认为关闭拾取 */
        AIPlayer.prototype.disabledPickState = function () {
            this._pickEnabled = false;
            this.updatePickState();
        };
        AIPlayer.prototype.updatePickState = function () {
            this.unRegisterState(TypeState.PICK);
            if (this._pickEnabled) {
                if (this._pickSigleEnabled) {
                    if (!this._pickSigleState) {
                        this._pickSigleState = new s.PickSigleState();
                        this._pickSigleState.initialize(this._body, this._job);
                    }
                }
                else {
                    if (!this._pickAllState) {
                        this._pickAllState = new s.PickAllState();
                        this._pickAllState.initialize(this._body, this._job);
                    }
                }
                if (!this.hasState(TypeState.PICK)) {
                    this.registerStateAt(this._pickSigleEnabled ? this._pickSigleState : this._pickAllState, TypeState.DEAD);
                }
            }
        };
        AIPlayer.prototype.hasMovePath = function () {
            return this.getState(TypeState.MOVE_TILE).hasPath();
        };
        AIPlayer.prototype.moveTo = function (x, y) {
            if (!this._runing)
                return;
            var curState = this.getState(TypeState.MOVE_TILE);
            curState.setTarget(x, y);
            this.setState(curState);
        };
        AIPlayer.prototype.movePathTo = function (x, y) {
            if (!this._runing)
                return;
            this.getState(TypeState.MOVE_TILE).findPathTo(x, y);
            if (this.hasMovePath()) {
                if (this._curstate && this._curstate.name == TypeState.IDEL) {
                    //this._curstate.reset();
                    this._curstate = null;
                }
            }
        };
        AIPlayer.prototype.moveDirect = function (direct) {
            // this._moveDirectState.direct = direct;
            if (this._moveDirectState.check()) {
                this.setState(this._moveDirectState);
                return;
            }
            var idelState = this.getState(TypeState.IDEL);
            if (idelState.check()) {
                this.setState(idelState);
            }
        };
        AIPlayer.prototype.updateRender = function (timeStamp) {
            if (!this._runing)
                return true;
            var that = this;
            var curState = that._curstate;
            if (!!curState && curState.runing) {
                curState.updateRender(timeStamp);
                if (!!curState && !curState.runing) {
                    //if (!that._isControl || curState.nextState) {
                    if (curState.nextState) {
                        var nextState = that.getState(curState.nextState);
                        if (nextState && nextState.check()) {
                            that.setState(nextState);
                        }
                    }
                }
                if (!!curState && curState.runing)
                    return true;
            }
            if (!that._runing)
                return true;
            // if (that._isControl) {
            // 	if (mg.controlManager.isControl) {
            // 		that.moveDirect(mg.controlManager.direction);
            // 		return true;
            // 	}
            // }
            if (that.hasMovePath()) {
                var moveTileState = that.getState(TypeState.MOVE_TILE);
                if (moveTileState.check()) {
                    that.setState(moveTileState);
                    return true;
                }
            }
            if ((timeStamp - this._timeLast) < this._timeInterval) {
                return true;
            }
            this._timeLast = timeStamp;
            if (that._autoSelectAttack)
                that.chooseTarget();
            for (var _i = 0, _a = that._states; _i < _a.length; _i++) {
                var state = _a[_i];
                if (state.check() && that.setState(state)) {
                    break;
                }
            }
            return true;
        };
        AIPlayer.prototype.chooseTarget = function () {
            var that = this;
            var body = that._body;
            if (!body.scene)
                return;
            if (body.targetVO && !body.targetVO.stateDead)
                return;
            if (body.targetVO && body.targetVO.stateDead)
                body.target = null;
            /**先尝试设置拾取目标 */
            if (this._pickEnabled && !body.targetVO) {
                if (!body.vo.isXpActive || body.scene.deadAllMonster) {
                    body.target = body.scene.getMinDrop(body);
                }
            }
            /**在尝试设置攻击目标 */
            if (!body.target) {
                if (body.type == TypeActor.ROBOT) {
                    body.target = body.scene.getRandomEnemy(body.master, 300, 500);
                }
                else {
                    body.target = body.scene.getMinEnemy(body);
                    //if (!body.target) {
                    //	body.targetVO = app.gameContext.gameCurrent.modelScene.getMinEnemy(body.vo, enemyTypes);
                    //}
                }
            }
        };
        return AIPlayer;
    }(s.AIBase));
    s.AIPlayer = AIPlayer;
    __reflect(AIPlayer.prototype, "s.AIPlayer");
})(s || (s = {}));
