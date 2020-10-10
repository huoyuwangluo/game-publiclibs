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
    var SkillAction = (function (_super) {
        __extends(SkillAction, _super);
        function SkillAction() {
            var _this = _super.call(this, TypeAction.ATTACK_NAME) || this;
            /**专注模式 只作用于当前单一目标单位*/
            _this._focusMode = false;
            /**技能整体效果开关  没有效果，没有伤害*/
            _this._effectEnabled = true;
            return _this;
        }
        Object.defineProperty(SkillAction.prototype, "focusMode", {
            /**专注模式 只作用于当前单一目标单位*/
            get: function () {
                return this._focusMode;
            },
            set: function (value) {
                this._focusMode = value;
            },
            enumerable: true,
            configurable: true
        });
        SkillAction.prototype.initialize = function (body) {
            _super.prototype.initialize.call(this, body);
        };
        SkillAction.prototype.reset = function () {
            this._curSkillTarget = null;
            this._skillConfig = null;
            this._skilltemplate = null;
            _super.prototype.reset.call(this);
            this.skillRecover();
        };
        SkillAction.prototype.skillRecover = function () {
            if (this._skill) {
                s.SkillPool.toPool(this._skill);
                this._skill = null;
            }
        };
        SkillAction.prototype.start = function (skillConfig, skillTemplate, skillTarget) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this.skillRecover(); //防止前面的技能还没回收，后面的技能就释放
            //if(this._runing) {
            //	return; //上一次技能没结束，不放下一次技能
            //}
            this._skillParams = args;
            var that = this;
            that._skillConfig = skillConfig;
            that._skilltemplate = skillTemplate;
            that._curSkillTarget = skillTarget;
            _super.prototype.start.call(this);
            battle.manager.showSkillName(this._body, skillTemplate.id);
            /*if(this._skilltemplate.sound && (app.gameContext.isMySelf(this._body) || this._body.type == TypeActor.NPC ) )
            {
                //if(this._skilltemplate.skillType >= 2)
                {
                    mg.soundManager.playSound(this._skilltemplate.sound,1.0,true,true);
                }
            }*/
            //播放攻击声音
            if (app.gameContext.isMySelf(this._body) || this._body.type == TypeActor.NPC) {
                var skillType = that._skilltemplate.skillType;
                if (skillType == 2) {
                    that._body.vo.xpVO.stop();
                }
                var soundStr = "";
                var dataModel = that._body.getModel();
                if (dataModel != null) {
                    if (skillType == 0) {
                        soundStr = dataModel.attackSound;
                    }
                    else if (skillType == 1) {
                        soundStr = dataModel.skill2Sound;
                    }
                    else if (this._skilltemplate.sound) {
                        mg.soundManager.playSound(this._skilltemplate.sound, 1.0, true, true);
                    }
                }
                mg.soundManager.playRandomSound(soundStr);
            }
            var body = that._body;
            that._startRockTime = mg.stageManager.timeStamp + skillConfig.rockbefore / that._body.attackSpeed;
            that._endRockTime = that._startRockTime + skillConfig.rockafter / that._body.attackSpeed;
            that._endTime = mg.stageManager.timeStamp + skillConfig.continue / that._body.attackSpeed;
            if (this._skilltemplate.skillType == 3 || this._skilltemplate.skillType == 4) {
                that._endTime += 400;
            }
            if (skillTarget.tileX > 0 && skillTarget.tileY > 0) {
                that._targetTile = body.scene.getNode(skillTarget.tileX, skillTarget.tileY); //vo里的tileX,tileY为服务器最新数据
            }
            //that._targetTile=body.targetVO?body.scene.getNode(body.targetVO.tileX,body.targetVO.tileY):(body.target?body.target.tileNode:null); //vo里的tileX,tileY为服务器最新数据
            if (!that._targetTile) {
                logger.error('技能释放异常!vo:' + (skillTarget.vo ? 'true' : 'false'));
                this.end();
                return;
            }
            body.actionOnce(skillConfig.action, TypeDirection.getDirection8(body.tileX, body.tileY, that._targetTile.x, that._targetTile.y));
            that._isRockBefore = false;
            that._isRockAfter = false;
            return that;
        };
        SkillAction.prototype.updateRender = function (timeStamp) {
            if (!this.runing)
                return;
            var that = this;
            if (!that._isRockBefore) {
                if (timeStamp >= that._startRockTime) {
                    that._isRockBefore = true;
                    that.rockBefore();
                }
                return;
            }
            if (!that._isRockAfter) {
                if (timeStamp >= that._endRockTime) {
                    that._isRockAfter = true;
                    that.rockAfter();
                }
                return;
            }
            if (timeStamp >= that._endTime) {
                that.end();
            }
            return true;
        };
        /**前摇 */
        SkillAction.prototype.rockBefore = function () {
            if (!this._body || !this._body.scene)
                return;
            if (!this._skillConfig || !this._skilltemplate || !this._curSkillTarget)
                return;
            //if(this._skilltemplate.type!=TypeSkill.Z_ZH&&!this._effectEnabled) return;
            if (!this._effectEnabled)
                return;
            var that = this;
            if (this._skilltemplate.sound && app.gameContext.isMySelf(this._body)) {
                if (this._skilltemplate.skillType < 2) {
                    //mg.soundManager.playSound(this._skilltemplate.sound,0.5);
                }
            }
            var skill = that._skill = s.SkillPool.fromPool(this._skilltemplate.type);
            if (!skill)
                return;
            // if(this._body.vo==GameModels.user.player){
            // 	logger.log('释放技能:',skillData.template.name);
            // }
            /*skill.focusMode=this._focusMode;
            skill.initialize(this._skillConfig,this._skilltemplate,this._body,this._targetTile,this._curSkillTarget);
            skill.start(...this._skillParams);
            skill.onComplete(this,(skill:SkillBase)=>{
                //if(skill.type==TypeSkill.Z_ZH){
                //	var skillChongFeng:ZChongFen=(skill as ZChongFen);
                //	if(this._rockAfterHandler) this._rockAfterHandler.runWith(this._body,this._skilltemplate,skillChongFeng.endNode.x,skillChongFeng.endNode.y);
                //}
                this.skillRecover();
                this.end();
            });			*/
        };
        /**后摇 */
        SkillAction.prototype.rockAfter = function () {
            if (!this._body || !this._body.scene)
                return;
            //if(this._rockAfterHandler&&this._skilltemplate&&this._skilltemplate.type!=TypeSkill.Z_ZH){
            if (this._rockAfterHandler && this._skilltemplate) {
                this._rockAfterHandler.runWith(this._body, this._skilltemplate, this._body.tileX, this._body.tileY);
            }
            if (!this._effectEnabled)
                return;
            if (this._skill) {
                this._skill.rockAfter();
                return;
            }
        };
        SkillAction.prototype.end = function () {
            var body = this._body;
            _super.prototype.end.call(this);
        };
        /**后摇监听 */
        SkillAction.prototype.onRockAfter = function (caller, method) {
            this.offRockAfter();
            this._rockAfterHandler = utils.Handler.create(caller, method, null, false);
        };
        SkillAction.prototype.offRockAfter = function () {
            if (this._rockAfterHandler) {
                this._rockAfterHandler.recover();
                this._rockAfterHandler = null;
            }
        };
        return SkillAction;
    }(s.ActionBase));
    s.SkillAction = SkillAction;
    __reflect(SkillAction.prototype, "s.SkillAction");
})(s || (s = {}));
