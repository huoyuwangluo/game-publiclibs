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
    var AIMonster = (function (_super) {
        __extends(AIMonster, _super);
        //private _backState:BackState;
        function AIMonster() {
            var _this = _super.call(this) || this;
            _this._sightDistance = 1200;
            _this._interval = 1000;
            _this._actived = false;
            _this.registerState(new s.DeadState());
            _this.registerState(new s.AttackState());
            _this.registerState(new s.MoveTileState());
            _this.registerState(new s.MoveWanderState());
            _this.registerState(new s.IdelState(_this._interval));
            _this.registerState(new s.BackState());
            return _this;
            //this._backState = new BackState();
        }
        AIMonster.prototype.initializeSkill = function () {
            var monsterVO = this._body.vo;
            var attackState = this.getState(TypeState.ATTACK);
            attackState.clearSkillList();
            for (var _i = 0, _a = monsterVO.skillList.list; _i < _a.length; _i++) {
                var skillVO = _a[_i];
                if (skillVO.type != 0)
                    attackState.registerSkill(skillVO.template);
            }
            //attackState.registerSkill(monsterVO.skillVO.template);
            //this._backState.initialize(this._body, TypeJob.NONE);
        };
        AIMonster.prototype.active = function () {
            // this._actived=true;
        };
        AIMonster.prototype.start = function () {
            _super.prototype.start.call(this);
            // this._actived=false;
            this._endTime = egret.getTimer() + this._interval;
            if (!this._autoSelectAttack) {
                this._body.onHurtedOnce(this, this.hurtedHandler);
            }
        };
        AIMonster.prototype.stop = function () {
            this._body.offHurted();
            //this._backState.reset();
            _super.prototype.stop.call(this);
        };
        AIMonster.prototype.hurtedHandler = function (targetVO) {
            if (!this._body.scene)
                return;
            var target = app.gameContext.scene.getActorByVO(targetVO);
            if (target) {
                if (target.type == TypeActor.PET) {
                    this._body.target = target.master;
                }
                else {
                    this._body.target = target;
                }
            }
        };
        AIMonster.prototype.updateRender = function (timeStamp) {
            if (mg.StoryManager.instance.storyId > 0) {
                return;
            }
            if (!this.runing)
                return true;
            // if(!this._actived){
            //     if(timeStamp>this._endTime){
            //         var enemyTypes:number[]=this._body.scene.manager.gameCurrent.getEnemyTypes(this._body.type);
            //         var player:SmartObject=this._body.scene.getMinEnemy(this._body,enemyTypes,this._sightDistance);
            //         if(player){
            //             this._body.target=player;
            //             this.active();
            //         }
            //         this._endTime=timeStamp+this._interval;
            //     }
            //     return;   
            // }
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
                    if (curState && curState.name != TypeState.IDEL) {
                        curState.enabledNext(TypeState.IDEL);
                    }
                    break;
                }
            }
            return true;
        };
        AIMonster.prototype.chooseTarget = function () {
            var that = this;
            var body = that._body;
            if (body.targetVO || !body.scene)
                return;
            if (!body.targetVO) {
                //var enemyTypes:number[]=body.scene.manager.gameCurrent.getEnemyTypes(body.type);
                body.target = body.scene.getMinEnemy(body, 500);
                //var dis:number = battle.manager.getNodeDistance(this._body.tileNode, body.scene.game.player.tileNode);
                //if(dis < 10)
                //{
                //    body.target=body.scene.game.player;
                //}
            }
        };
        return AIMonster;
    }(s.AIBase));
    s.AIMonster = AIMonster;
    __reflect(AIMonster.prototype, "s.AIMonster");
})(s || (s = {}));
