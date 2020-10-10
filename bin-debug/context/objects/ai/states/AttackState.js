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
    var AttackState = (function (_super) {
        __extends(AttackState, _super);
        function AttackState() {
            var _this = _super.call(this, TypeState.ATTACK) || this;
            _this._lastSkillTime = 0;
            _this._nextRegisterState = TypeState.ATTACK;
            return _this;
        }
        AttackState.prototype.getAction = function () {
            return this._action;
        };
        AttackState.prototype.createAction = function () {
            this._action = new s.SkillAction();
        };
        AttackState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
        };
        AttackState.prototype.reset = function () {
            if (this._skillData)
                this._skillData = null;
            this.getAction().offRockAfter();
            this.getAction().offComplete();
            _super.prototype.reset.call(this);
        };
        AttackState.prototype.registerSkill = function (template) {
            // if (!this._skillList) this._skillList = [];
            // var skillData: SkillData = utils.ObjectPool.from(SkillData, true, template) as SkillData;
            // if(template.prophaseCd > 0)
            // {
            // 	skillData.lastTime = egret.getTimer() + template.prophaseCd - template.cd;
            // }
            // if (TypeSkill.isXP(template.skillType)) {
            // 	this._xpSkillData = skillData;
            // } else {
            // 	this._skillList.push(skillData);
            // }
            return this;
        };
        AttackState.prototype.clearSkillList = function () {
            if (this._skillList) {
                for (var _i = 0, _a = this._skillList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    utils.ObjectPool.to(item, true);
                }
                this._skillList.length = 0;
            }
        };
        Object.defineProperty(AttackState.prototype, "focusMode", {
            /**专注模式 只作用于当前单一目标单位*/
            get: function () {
                return this.getAction().focusMode;
            },
            set: function (value) {
                this.getAction().focusMode = value;
            },
            enumerable: true,
            configurable: true
        });
        AttackState.prototype.canAttack = function () {
            var that = this;
            var body = that._body;
            var bodyType = body.type;
            //if(body.type != TypeActor.PET)
            //{
            //	return false;
            //}
            if (GameModels.scene.getAttackEnabled() == false) {
                return this.retFalse(bodyType, "wait do yuanjunji"); //等待放援军技能，其他单位不攻击，在剧情里用到
            }
            if (!body.vo || body.stateDead) {
                return this.retFalse(bodyType, "bodyDead");
            }
            if (body.isSleep()) {
                return this.retFalse(bodyType, "bodySleep");
            }
            var target = body.target;
            if (!target) {
                return this.retFalse(bodyType, "no target");
            }
            if (target.type == TypeActor.DROP) {
                return this.retFalse(bodyType, "targetIsDrop");
            }
            //if(!this._body.scene.isEnemyObject(this._body, target))
            //{
            //	return this.retFalse(bodyType, "targetIsNotEnemy"); //不是敌人不攻击
            //}
            var leader = body.getTeamLeader();
            if (target.isTeamAllDead()) {
                if (leader != null && leader.target != null && target != leader.target && !leader.target.stateDead) {
                    body.target = leader.target;
                }
                else {
                    return this.retFalse(bodyType, "targetDead");
                }
            }
            if (target.stateDead && target.getTeamLeader() != null) {
                body.target = target.getTeamLeader();
            }
            if (body.scene && body.scene.isFriendObject(body, body.target)) {
                if (leader != null && target != leader.target) {
                    body.target = leader.target;
                }
                if (body.scene.isFriendObject(body, body.target)) {
                    //return this.retFalse(bodyType, "isFriendObject");
                }
            }
            return true;
        };
        AttackState.prototype.check = function () {
            var that = this;
            var body = that._body;
            var bodyType = body.type;
            if (this.getAction().runing) {
                return this.retFalse(bodyType, "attack is not end");
            }
            if (body.type == TypeActor.PLAYER) {
                if (body.vo.isXpActive && that._xpSkillData) {
                    var isDistance = that.checkDistance(that._xpSkillData);
                }
            }
            if (!this.canAttack()) {
                return false;
            }
            //if(body.vo.minLockRange < this.getDistance())
            //{
            //return this.retFalse(bodyType, "target is far");
            //}
            var leader = body.getTeamLeader();
            if (leader != null && leader.tileNode != null) {
                var leaderTile = leader.tileNode;
                var distanceLeader = Math.max(Math.abs(body.tileX - leaderTile.x), Math.abs(body.tileY - leaderTile.y));
                if (distanceLeader >= 6) {
                    return this.retFalse(bodyType, "leader is far");
                }
            }
            if (this.checkCommonCding()) {
                return this.retFalse(bodyType, "commonCd");
            }
            if (body.type == TypeActor.PLAYER) {
                if (body.vo.isXpActive && that._xpSkillData) {
                    if (!that.checkDistance(that._xpSkillData))
                        return false;
                    var isEnemy = body.scene.isEnemyObject(body, body.target);
                    if (!isEnemy && s.TypeSkill.isLockEnemy(that._xpSkillData.lockTarget)) {
                        return false; //锁定目标不是敌人，不攻击
                    }
                    that._skillData = that._xpSkillData;
                }
                if (!that._skillData && AttackState.ShenLongSkillData != null) {
                    if (!this.checkCding(AttackState.ShenLongSkillData) && that.checkDistance(AttackState.ShenLongSkillData)) {
                        that._skillData = AttackState.ShenLongSkillData;
                    }
                }
            }
            if (body.justSupportTime > 0) {
                //先看看有没有可以放的援军技				
                that._skillData = that.getSupportSkill();
                if (that._skillData) {
                    if (egret.getTimer() < body.justSupportTime + 2500) {
                        return this.retFalse(bodyType, "supportskill delay"); //援军技延几秒放
                    }
                }
                body.justSupportTime = 0;
            }
            else {
                if (!that._skillData)
                    that._skillData = that.getUsableSkill();
            }
            if (!that._skillData) {
                return this.retFalse(bodyType, "unuseskill");
            }
            return true;
        };
        AttackState.prototype.retFalse = function (type, desc) {
            if (type == TypeActor.PET) {
                logger.log("retFalse" + desc);
            }
            return false;
        };
        AttackState.prototype.getCd = function (skillData) {
            var cdRate = 0;
            if (skillData.template.skillType == 1) {
                cdRate = this._body.getBaseAttackAddCDRate();
                if (cdRate != 0) {
                    this._body.attackSpeed = 1 / (1 + cdRate);
                }
                else {
                    this._body.attackSpeed = 1.0;
                }
            }
            else if (skillData.template.skillType == 2) {
                cdRate = this._body.getSkillAttackAddCDRate();
            }
            if (cdRate != 0) {
                return skillData.cd * (1 + cdRate) >> 0;
            }
            return skillData.cd;
        };
        AttackState.prototype.start = function () {
            var that = this;
            that.getAction().start(that._skillData.config, that._skillData.template, that._body.target);
            that.getAction().onCompleteOnce(this, this.end);
            that._lastSkillTime = that._skillData.lastTime = egret.getTimer();
            _super.prototype.start.call(this);
            // if(that._startHandler){
            // 	that._startHandler.runWith(that._body,that._skillData);
            // }
            /*
            //播放攻击声音
            if(that._body.type == TypeActor.PLAYER || that._body.type == TypeActor.PET)
            {
                var skillType:number = that._skillData.template.skillType;
                if(skillType == 2)
                {
                    (that._body.vo as vo.GamePlayerVO).xpVO.stop();
                }
                var soundStr:string = "";
                var dataModel:templates.dataModel = that._body.getModel();
                if(dataModel != null && app.gameContext.isMySelf(this._body))
                {
                    if(skillType == 0)
                    {
                        soundStr = dataModel.attackSound;
                    }
                    else if(skillType == 1)
                    {
                        soundStr = dataModel.skill2Sound;
                    }
                    //WuShuangSkillVo
                }
                mg.soundManager.playRandomSound(soundStr);
            }
            */
            that._skillData = null;
            return that;
        };
        AttackState.prototype.end = function () {
            this.getAction().offComplete();
            if (this._body.targetVO && !this._body.targetVO.stateDead) {
                this.enabledNext();
            }
            _super.prototype.end.call(this);
        };
        AttackState.prototype.getSupportSkill = function () {
            for (var key in this._skillList) {
                var skillData = this._skillList[key];
                if (skillData.skillType == 3) {
                    return skillData;
                }
            }
            return null;
        };
        AttackState.prototype.getUsableSkill = function () {
            var ret = null;
            var distance = this.getDistance();
            var body = this._body;
            //var isFriend:boolean = body.scene.isFriendObject(body,body.target as SmartObject);
            var isEnemy = body.scene.isEnemyObject(body, body.target);
            for (var key in this._skillList) {
                var skillData = this._skillList[key];
                if (body.isForbiddenSkill() && skillData.skillType > 0)
                    continue; //禁止用技能和XP	
                if (skillData.skillType == 3)
                    continue; //援军技不主动放
                //if(skillData.type == TypeSkill.Z_ZH) 
                //{
                //	if(distance < 4) continue; //太近了不冲锋
                //}
                if (!isEnemy && s.TypeSkill.isLockEnemy(skillData.lockTarget)) {
                    continue; //锁定目标不是敌人，不攻击
                }
                /*if(this._body.type == TypeActor.PLAYER)
                {
                    //神龙降世展示关卡特殊处理
                    if( (this._body as GamePlayer).isHorseSkillState() && skillData.skillType != 4 )  continue;
                    if( !(this._body as GamePlayer).isHorseSkillState() && skillData.skillType == 4 )  continue;
                }*/
                //var skillDistance:number = skillData.distanceTile == 0 ? this._body.vo.minLockRange + 1 : skillData.distanceTile;
                var skillDistance = skillData.distanceTile;
                if (skillDistance > this._body.vo.minLockRange) {
                    skillDistance = this._body.vo.minLockRange;
                }
                if (skillDistance == 0) {
                    skillDistance = this._body.vo.minLockRange + 1;
                }
                if (!this.checkCding(skillData) && skillDistance >= distance) {
                    if (ret == null || ret.distanceTile < skillData.distanceTile || ret.skillType < skillData.skillType) {
                        ret = skillData;
                    }
                }
            }
            return ret;
        };
        AttackState.prototype.checkCommonCding = function () {
            return (egret.getTimer() - this._lastSkillTime) < s.TypeSkill.CONMON_CD;
        };
        AttackState.prototype.checkCding = function (skillData) {
            var body = this._body;
            var bodyType = body.type;
            //var ret: boolean = ((egret.getTimer() - skillData.lastTime) <(skillData.cd/this._body.attackSpeed));			
            var ret = (egret.getTimer() - skillData.lastTime) < this.getCd(skillData);
            //logger.log("skillData.cd=" + skillData.cd + ";actorType=" + this._body.type + ";ret=" + ret + ";skillData.lastTime=" + skillData.lastTime + ";now=" + egret.getTimer());
            //if(skillData.type != TypeSkill.Z_ZJ) ret = true;
            return ret;
        };
        AttackState.prototype.getDistance = function () {
            var that = this;
            var body = that._body;
            if (!body.vo || !body.target) {
                return 0;
            }
            return Math.max(Math.abs(body.tileX - body.target.tileX), Math.abs(body.tileY - body.target.tileY));
        };
        AttackState.prototype.checkDistance = function (data) {
            var that = this;
            var body = that._body;
            if (!body.vo || !body.target) {
                //logger.log("checkDistance=1");
                return false;
            }
            if (data.distanceTile == 0) {
                //logger.log("checkDistance=2");
                return true;
            }
            if (Math.abs(body.tileX - body.target.tileX) <= data.distanceTile && Math.abs(body.tileY - body.target.tileY) <= data.distanceTile) {
                //logger.log("checkDistance=3");
                return true;
            }
            //logger.log("checkDistance=4");
            return false;
        };
        AttackState.prototype.onStart = function (caller, method) {
            this.getAction().onRockAfter(caller, method);
        };
        AttackState.prototype.offStart = function () {
            this.getAction().offRockAfter();
        };
        return AttackState;
    }(s.StateBase));
    s.AttackState = AttackState;
    __reflect(AttackState.prototype, "s.AttackState");
})(s || (s = {}));
