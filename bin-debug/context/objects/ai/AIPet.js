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
    var AIPet = (function (_super) {
        __extends(AIPet, _super);
        function AIPet() {
            var _this = _super.call(this) || this;
            _this.registerState(new s.DeadState());
            _this.registerState(new s.AttackState());
            _this.registerState(new s.MoveTileState());
            //this.registerState(new MovePetFllowState());
            _this.registerState(new s.MoveFlashState());
            _this.registerState(new s.IdelState(500));
            return _this;
        }
        AIPet.prototype.initialize = function (body) {
            _super.prototype.initialize.call(this, body, TypeJob.NONE);
            body.vo.onSkillAdd(this, this.initializeSkill);
            body.vo.onSkillRemove(this, this.initializeSkill);
            body.vo.onSkillUpdate(this, this.initializeSkill);
        };
        AIPet.prototype.reset = function () {
            utils.timer.clearAll(this);
            if (this._body.vo)
                this._body.vo.offSkillAdd(this, this.initializeSkill);
            if (this._body.vo)
                this._body.vo.offSkillRemove(this, this.initializeSkill);
            if (this._body.vo)
                this._body.vo.offSkillUpdate(this, this.initializeSkill);
            _super.prototype.reset.call(this);
        };
        AIPet.prototype.start = function () {
            _super.prototype.start.call(this);
        };
        AIPet.prototype.stop = function () {
            utils.timer.clearAll(this);
            _super.prototype.stop.call(this);
        };
        AIPet.prototype.initializeSkill = function () {
            var petVO = this._body.vo;
            var attackState = this.getState(TypeState.ATTACK);
            attackState.clearSkillList();
            if (!petVO) {
                logger.error('petVO must not be null！');
                return;
            }
            if (petVO.skillList) {
                for (var _i = 0, _a = petVO.skillList.list; _i < _a.length; _i++) {
                    var skillVO = _a[_i];
                    attackState.registerSkill(skillVO.template);
                }
            }
        };
        AIPet.prototype.updateRender = function (timeStamp) {
            if (!this._runing)
                return true;
            var that = this;
            var curState = that._curstate;
            if (curState && curState.runing) {
                curState.updateRender(timeStamp);
                if (!curState)
                    return;
                if (!curState.runing) {
                    if (curState.nextState) {
                        var nextState = that.getState(curState.nextState);
                        if (nextState && nextState.check()) {
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
        AIPet.prototype.chooseTarget = function () {
            var that = this;
            var body = that._body;
            if (!body.scene)
                return;
            if (body.targetVO && !body.targetVO.stateDead)
                return;
            if (body.targetVO && body.targetVO.stateDead)
                body.target = null;
            body.target = body.scene.getMinEnemy(body, 0);
        };
        return AIPet;
    }(s.AIBase));
    s.AIPet = AIPet;
    __reflect(AIPet.prototype, "s.AIPet");
})(s || (s = {}));
