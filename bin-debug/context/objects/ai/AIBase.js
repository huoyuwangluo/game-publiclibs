var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var AIBase = (function () {
        function AIBase() {
            this.autoRecover = true;
            this.toPoolTime = 0;
            this._runing = false;
            this._autoSelectAttack = true;
            this._states = [];
            this._timeInterval = 1000 / 6;
            this._timeLast = 0;
        }
        AIBase.prototype.registerState = function (state) {
            this._states.push(state);
        };
        AIBase.prototype.registerStateAt = function (state, afterState) {
            var that = this;
            for (var i = 0; i < that._states.length; i++) {
                if (that._states[i].name == afterState) {
                    that._states.splice(i + 1, 0, state);
                    break;
                }
            }
        };
        AIBase.prototype.unRegisterState = function (name) {
            var that = this;
            for (var i = 0; i < that._states.length; i++) {
                if (that._states[i].name == name) {
                    that._states.splice(i, 1);
                    break;
                }
            }
        };
        AIBase.prototype.hasState = function (name) {
            var that = this;
            for (var i = 0; i < that._states.length; i++) {
                if (that._states[i].name == name) {
                    return true;
                }
            }
            return false;
        };
        AIBase.prototype.canAttack = function () {
            var attackState = this.getState(TypeState.ATTACK);
            if (attackState)
                return attackState.canAttack();
            return false;
        };
        AIBase.prototype.initialize = function (body, job) {
            if (job === void 0) { job = TypeJob.NONE; }
            var that = this;
            that._body = body;
            that._job = job;
            for (var _i = 0, _a = that._states; _i < _a.length; _i++) {
                var state = _a[_i];
                state.initialize(body, that._job);
            }
            that.initializeSkill();
            that._body.onDeadPriority(that, that.deadHandler);
        };
        AIBase.prototype.initializeSkill = function () { };
        AIBase.prototype.reset = function () {
            this._body.actionTo(TypeAction.IDLE, this._body.direct);
            this.stop();
            var attackState = this.getState(TypeState.ATTACK);
            if (attackState) {
                attackState.focusMode = false;
                attackState.offStart();
            }
            for (var _i = 0, _a = this._states; _i < _a.length; _i++) {
                var state = _a[_i];
                state.reset();
            }
            this._autoSelectAttack = true;
            this._body = null;
            this._job = TypeJob.NONE;
        };
        /**
         * 启动AI
         * @param autoAttack 启动AI后是否自动开始攻击
         */
        AIBase.prototype.start = function () {
            var that = this;
            that._runing = true;
            that._curstate = null;
        };
        /**停止AI */
        AIBase.prototype.stop = function () {
            var that = this;
            that._runing = false;
            for (var _i = 0, _a = that._states; _i < _a.length; _i++) {
                var state = _a[_i];
                state.resetState();
            }
            that._curstate = null;
        };
        AIBase.prototype.end = function () {
            this._runing = false;
        };
        AIBase.prototype.deadHandler = function (killer) {
            var that = this;
            if (that._action)
                that._action.reset();
            that._action = null;
            var deadState = that.getState(TypeState.DEAD);
            that.setState(deadState);
            that._runing = false;
        };
        Object.defineProperty(AIBase.prototype, "autoSelectAttack", {
            /**启动之后 是否会自动选择目标攻击 */
            get: function () {
                return this._autoSelectAttack;
            },
            set: function (value) {
                this._autoSelectAttack = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AIBase.prototype, "focusMode", {
            /**专注模式 只作用于当前单一目标单位*/
            get: function () {
                return this.getState(TypeState.ATTACK).focusMode;
            },
            set: function (value) {
                this.getState(TypeState.ATTACK).focusMode = value;
            },
            enumerable: true,
            configurable: true
        });
        AIBase.prototype.onSkillStart = function (caller, method) {
            var attackState = this.getState(TypeState.ATTACK);
            if (attackState)
                attackState.onStart(caller, method);
        };
        AIBase.prototype.offSkillStart = function () {
            var attackState = this.getState(TypeState.ATTACK);
            if (attackState)
                attackState.offStart();
        };
        AIBase.prototype.onMoveStart = function (caller, method) {
            var moveState = this.getState(TypeState.MOVE_TILE);
            if (moveState)
                moveState.onStart(caller, method);
            var flashState = this.getState(TypeState.MOVE_FLASH);
            if (flashState)
                flashState.onStart(caller, method);
            var fellowState = this.getState(TypeState.MOVE_FOLLOW);
            if (fellowState)
                fellowState.onStart(caller, method);
        };
        AIBase.prototype.offMoveStart = function () {
            var moveState = this.getState(TypeState.MOVE_TILE);
            if (moveState)
                moveState.offStart();
        };
        AIBase.prototype.onMoveEnd = function (caller, method) {
            var moveState = this.getState(TypeState.MOVE_TILE);
            if (moveState)
                moveState.onEnd(caller, method);
        };
        AIBase.prototype.offMoveEnd = function () {
            var moveState = this.getState(TypeState.MOVE_TILE);
            if (moveState)
                moveState.offEnd();
        };
        AIBase.prototype.hasMovePath = function () {
            return this.getState(TypeState.MOVE_TILE).hasPath();
        };
        AIBase.prototype.moveTo = function (x, y) {
            if (!this._runing)
                return;
            var curState = this.getState(TypeState.MOVE_TILE);
            curState.setTarget(x, y);
            this.setState(curState);
        };
        AIBase.prototype.movePathTo = function (x, y) {
            //(this.getState(TypeState.MOVE_TILE) as MoveTileState).findPathTo(x, y);
            //this.moveTo(x, y);
            if (!this._runing)
                return;
            this.getState(TypeState.MOVE_TILE).findPathTo(x, y);
            if (this.hasMovePath()) {
                if (this._curstate && this._curstate.name == TypeState.IDEL) {
                    this._curstate = null;
                }
            }
        };
        AIBase.prototype.clearMovePath = function () {
            var moveState = this.getState(TypeState.MOVE_TILE);
            if (!!moveState) {
                moveState.clearPath();
            }
        };
        Object.defineProperty(AIBase.prototype, "nextTile", {
            get: function () {
                return this.getState(TypeState.MOVE_TILE).nextTile;
            },
            enumerable: true,
            configurable: true
        });
        AIBase.prototype.getState = function (stateName) {
            if (!stateName)
                return null;
            for (var _i = 0, _a = this._states; _i < _a.length; _i++) {
                var state = _a[_i];
                if (state.name == stateName) {
                    return state;
                }
            }
            return null;
        };
        AIBase.prototype.setState = function (state) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!state)
                return false;
            var that = this;
            var curState = that._curstate;
            if (curState && curState != state)
                curState.resetState();
            if (state) {
                if (curState != state) {
                    if (curState && curState.name == TypeState.MOVE_TILE) {
                        that.clearMovePath();
                    }
                }
                curState = that._curstate = state;
                curState.start.apply(curState, args);
                if (curState.name == TypeState.ATTACK) {
                    var moveTileState = that.getState(TypeState.MOVE_TILE);
                    if (moveTileState)
                        moveTileState.clearPath();
                }
                if (that._stateChange) {
                    that._stateChange.runWith(curState.name);
                }
                return true;
            }
            return false;
        };
        AIBase.prototype.setBeatBackState = function (master) {
            for (var _i = 0, _a = this._states; _i < _a.length; _i++) {
                var state = _a[_i];
                if (state.name == TypeState.BACK) {
                    this.setState(state, master);
                    break;
                }
            }
        };
        AIBase.prototype.isAttackState = function () {
            var ret = false;
            if (this._curstate != null && this._curstate.name == TypeState.ATTACK) {
                ret = true;
            }
            return ret;
        };
        AIBase.prototype.updateRender = function (timeStamp) {
            var that = this;
            if (!that._runing)
                return;
            var curState = that._curstate;
            if (curState && curState.runing) {
                curState.updateRender(timeStamp);
                if (!curState.runing) {
                    if (curState.nextState) {
                        var nextState = that.getState(curState.nextState);
                        if (nextState.check()) {
                            that.setState(nextState);
                        }
                    }
                }
                if (curState.runing)
                    return;
            }
            if ((timeStamp - this._timeLast) < this._timeInterval) {
                return;
            }
            this._timeLast = timeStamp;
            that.chooseTarget();
            for (var _i = 0, _a = that._states; _i < _a.length; _i++) {
                var state = _a[_i];
                if (state.check()) {
                    that.setState(state);
                    break;
                }
            }
            return true;
        };
        AIBase.prototype.chooseTarget = function () { };
        Object.defineProperty(AIBase.prototype, "runing", {
            get: function () {
                return this._runing;
            },
            enumerable: true,
            configurable: true
        });
        AIBase.prototype.onStateChange = function (caller, method) {
            this.offStateChange();
            this._stateChange = utils.Handler.create(caller, method, null, false);
        };
        AIBase.prototype.offStateChange = function () {
            var that = this;
            if (that._stateChange) {
                that._stateChange.recover();
                that._stateChange = null;
            }
        };
        return AIBase;
    }());
    s.AIBase = AIBase;
    __reflect(AIBase.prototype, "s.AIBase", ["utils.IPool"]);
})(s || (s = {}));
