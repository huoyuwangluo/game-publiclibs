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
    var AIPlayerSync = (function (_super) {
        __extends(AIPlayerSync, _super);
        function AIPlayerSync() {
            var _this = _super.call(this) || this;
            _this._pickEnabled = true;
            _this._pickSigleEnabled = false;
            _this._moveAction = new s.RunAction();
            _this._skillAction = new s.SkillAction();
            _this._deadAction = new s.DeadAction();
            _this._backAction = new s.BackAction();
            _this._skillDataList = [];
            _this._pickSigleState = new s.PickSigleState();
            _this._pickAllState = new s.PickAllState();
            return _this;
        }
        AIPlayerSync.prototype.initialize = function (body, job) {
            if (job === void 0) { job = TypeJob.NONE; }
            _super.prototype.initialize.call(this, body, job);
            this._body.vo.onTileChange(this, this.move);
            this._body.vo.onSkillCast(this, this.skill);
            this._moveAction.initialize(body);
            this._skillAction.initialize(body);
            this._deadAction.initialize(body);
            this._backAction.initialize(body);
            this._pickSigleState.initialize(this._body, this._job);
            this._pickAllState.initialize(this._body, this._job);
            switch (this._body.vo.type) {
                case TypeActor.BOSS:
                case TypeActor.MONSTER:
                case TypeActor.NPC:
                case TypeActor.MONSTERELITE:
                //this._skillDataList.push(utils.ObjectPool.from(SkillData,true,(this._body.vo as vo.GameMonsterVO).skillVO.template) as SkillData);
                //break;
                case TypeActor.PLAYER:
                case TypeActor.PET:
                case TypeActor.ROBOT:
                    for (var _i = 0, _a = this._body.vo.skillList.list; _i < _a.length; _i++) {
                        var skillVO = _a[_i];
                        this._skillDataList.push(utils.ObjectPool.from(s.SkillData, true, skillVO.template));
                    }
                    break;
            }
        };
        AIPlayerSync.prototype.reset = function () {
            if (this._body && this._body.vo) {
                this._body.vo.offTileChange(this, this.move);
                this._body.vo.offSkillCast();
            }
            if (this._currentAction) {
                this._currentAction.reset();
                this._currentAction = null;
            }
            this._moveAction.reset();
            this._skillAction.reset();
            this._deadAction.reset();
            this._backAction.reset();
            this._pickSigleState.reset();
            this._pickAllState.reset();
            for (var _i = 0, _a = this._skillDataList; _i < _a.length; _i++) {
                var skillData = _a[_i];
                utils.ObjectPool.to(skillData, true);
            }
            this._skillDataList.length = 0;
            _super.prototype.reset.call(this);
        };
        AIPlayerSync.prototype.getSkillData = function (id) {
            for (var _i = 0, _a = this._skillDataList; _i < _a.length; _i++) {
                var skillData = _a[_i];
                if (skillData.id == id)
                    return skillData;
            }
            return null;
        };
        AIPlayerSync.prototype.move = function (x, y) {
            this._currentAction = this._moveAction.start(app.gameContext.scene.getNode(x, y));
            this._runing = true;
        };
        AIPlayerSync.prototype.movePathTo = function (x, y) {
            this._currentAction = this._moveAction.start(app.gameContext.scene.getNode(x, y));
            this._runing = true;
        };
        AIPlayerSync.prototype.setBeatBackState = function (master) {
            this._currentAction = this._backAction.start(master);
            this._runing = true;
        };
        AIPlayerSync.prototype.skill = function (skillId, targetVO, posX, posY) {
            if (!targetVO) {
                logger.error('施放对象不存在!');
                return;
            }
            var skillData = this.getSkillData(skillId);
            if (!skillData) {
                logger.error('当前单位身上找不到该技能:', skillId);
            }
            if (this._body.target && skillData) {
                this._currentAction = this._skillAction.start(skillData.config, skillData.template, this._body.target, posX, posY);
                this._runing = true;
            }
            else {
                var direct = TypeDirection.getDirection8(this._body.x, this._body.y, game.MapConfig.getReaX(targetVO.tileX), game.MapConfig.getReaY(targetVO.tileY));
                this._body.actionOnce(TypeAction.ATTACK0, direct);
            }
        };
        AIPlayerSync.prototype.findMinDrop = function () {
            if (this._body.type != TypeActor.PLAYER)
                return false;
            if (!this._body.scene.deadAllMonster)
                return false;
            if (this._body.target != null && this._body.target.type == TypeActor.DROP)
                return false;
            this._body.target = this._body.scene.getMinDrop(this._body);
            return this._body.target != null;
            /**先尝试设置拾取目标 */
            //if (this._pickEnabled && !body.targetVO) {
            //}
        };
        AIPlayerSync.prototype.checkPick = function (timeStamp) {
            if (this._pickSigleEnabled == true) {
                if (this._pickSigleState.runing) {
                    this._pickSigleState.updateRender(timeStamp);
                }
                else if (this._pickSigleState.check()) {
                    this._pickSigleState.start(0);
                    this._pickSigleState.updateRender(timeStamp);
                }
            }
            else {
                if (this._pickAllState.runing) {
                    this._pickAllState.updateRender(timeStamp);
                }
                else if (this._pickAllState.check()) {
                    this._pickAllState.start(0);
                    this._pickAllState.updateRender(timeStamp);
                }
            }
        };
        AIPlayerSync.prototype.idel = function () {
            this._body.actionTo(TypeAction.IDLE);
        };
        AIPlayerSync.prototype.deadHandler = function (killer) {
            if (this._currentAction) {
                this._currentAction.reset();
            }
            this._deadAction.start(killer);
            this._runing = false;
        };
        AIPlayerSync.prototype.onSkillStart = function (caller, method) {
            this._skillAction.onRockAfter(caller, method);
        };
        AIPlayerSync.prototype.offSkillStart = function () {
            this._skillAction.offRockAfter();
        };
        AIPlayerSync.prototype.updateRender = function (timeStamp) {
            if (!this.runing)
                return true;
            if (this._currentAction) {
                if (!this._currentAction.runing) {
                    this._currentAction = null;
                    this.idel();
                    return true;
                }
                this._currentAction.updateRender(timeStamp);
            }
            else {
                if (this._pickEnabled) {
                    if (this.findMinDrop()) {
                        this.move(this._body.target.tileX, this._body.target.tileY);
                    }
                    this.checkPick(timeStamp);
                }
            }
            return true;
        };
        Object.defineProperty(AIPlayerSync.prototype, "focusMode", {
            set: function (value) {
                this._skillAction.focusMode = value;
            },
            enumerable: true,
            configurable: true
        });
        return AIPlayerSync;
    }(s.AIBase));
    s.AIPlayerSync = AIPlayerSync;
    __reflect(AIPlayerSync.prototype, "s.AIPlayerSync");
})(s || (s = {}));
