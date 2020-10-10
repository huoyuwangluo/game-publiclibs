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
    var AITeamPet = (function (_super) {
        __extends(AITeamPet, _super);
        function AITeamPet() {
            var _this = _super.call(this) || this;
            _this.registerStates();
            return _this;
        }
        AITeamPet.prototype.registerStates = function () {
            this.registerState(new s.DeadState());
            this.registerState(new s.MoveFlashState());
            this.registerState(new s.MovePetFllowState());
            this.registerState(new s.AttackState());
            this.registerState(new s.MoveTileState());
            this.registerState(new s.PickSigleState());
            this.registerState(new s.PickAllState());
            this.registerState(new s.IdelState(500));
        };
        AITeamPet.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
            body.vo.onSkillAdd(this, this.initializeSkill);
            body.vo.onSkillRemove(this, this.initializeSkill);
            body.vo.onSkillUpdate(this, this.initializeSkill);
            //body.onTileChange(this, this.tileChangeHandler);
        };
        /*protected tileChangeHandler() {
            if(this._body == null || this._body.vo == null) return;
            GameModels.scene.syncPosition(app.gameContext.typeGame, this._body.vo.uid, this._body.tileX, this._body.tileY);
        }*/
        AITeamPet.prototype.initializeSkill = function () {
            var attackState = this.getState(TypeState.ATTACK);
            attackState.clearSkillList();
            for (var _i = 0, _a = this._body.vo.skillList.list; _i < _a.length; _i++) {
                var skillVO = _a[_i];
                if (skillVO.type != 0)
                    attackState.registerSkill(skillVO.template);
            }
        };
        AITeamPet.prototype.reset = function () {
            if (this._body.vo) {
                this._body.vo.offSkillAdd(this, this.initializeSkill);
                this._body.vo.offSkillRemove(this, this.initializeSkill);
                this._body.vo.offSkillUpdate(this, this.initializeSkill);
                //this._body.offTileChange(this, this.tileChangeHandler);
            }
            var curState = this.getState(TypeState.MOVE_TILE);
            curState.offStart();
            _super.prototype.reset.call(this);
        };
        AITeamPet.prototype.stop = function () {
            this.clearMovePath();
            _super.prototype.stop.call(this);
        };
        AITeamPet.prototype.updateRender = function (timeStamp) {
            if (GameModels.scene.getFightEnabled() == false) {
                this._body.actionTo(TypeAction.IDLE);
                return;
            }
            if (!this._runing)
                return true;
            var that = this;
            var curState = that._curstate;
            if (!!curState && curState.runing) {
                curState.updateRender(timeStamp);
                if (!!curState && !curState.runing) {
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
            if (that.hasMovePath()) {
                var moveTileState = that.getState(TypeState.MOVE_TILE);
                if (moveTileState.check()) {
                    that.setState(moveTileState);
                    return true;
                }
            }
            if ((timeStamp - that._timeLast) < that._timeInterval) {
                return true;
            }
            that._timeLast = timeStamp;
            //if (that._autoSelectAttack) that.chooseTarget();
            if (that._body.isTeamLeader() && that._autoSelectAttack)
                that.chooseTarget();
            for (var _i = 0, _a = that._states; _i < _a.length; _i++) {
                var state = _a[_i];
                if (state.check() && that.setState(state)) {
                    break;
                }
            }
            return true;
        };
        /*public movePathTo(x: number, y: number) {
            super.movePathTo(x, y);
            var that: AITeamPet = this;
            var body: SmartObject = that._body;
            if(body.master != null)
            {
                body.master.target = null;
            }
            else
            {
                body.target = null;
            }
        }*/
        AITeamPet.prototype.chooseTarget = function () {
            var that = this;
            var body = that._body;
            if (!body.scene)
                return;
            if (body.target && body.target.type != TypeActor.DROP) {
                if (body.scene.hasDrop && !TypeGame.isClientGame()) {
                    //logger.error("纠正不捡掉落的错误::oldtarget = " + body.target.vo ? body.target.vo.name : "" );
                    body.target = body.scene.getMinDrop(body);
                }
                else if (body.scene.isEnemyObject(body, body.target) == false) {
                    body.target = null;
                }
                else {
                    if (body.targetVO && !body.targetVO.stateDead)
                        return;
                    if (body.targetVO && body.targetVO.stateDead)
                        body.target = null;
                }
            }
            var findTarget = null;
            /**尝试设置攻击目标 */
            if (!body.target) {
                if (body.type == TypeActor.ROBOT) {
                    findTarget = body.scene.getRandomEnemy(body.master, 500, 500);
                }
                else {
                    findTarget = body.scene.getMinEnemy(body);
                    var distance = 99;
                    if (findTarget != null) {
                        distance = Math.max(Math.abs(body.tileX - findTarget.tileX), Math.abs(body.tileY - findTarget.tileY));
                    }
                    if (distance > 4) {
                        /**尝试设置拾取目标 */
                        var dropTarget = body.scene.getMinDrop(body);
                        if (dropTarget != null) {
                            findTarget = dropTarget;
                        }
                    }
                }
                if (body.master != null) {
                    body.master.target = findTarget;
                }
                else {
                    body.target = findTarget;
                }
            }
        };
        return AITeamPet;
    }(s.AIBase));
    s.AITeamPet = AITeamPet;
    __reflect(AITeamPet.prototype, "s.AITeamPet");
})(s || (s = {}));
