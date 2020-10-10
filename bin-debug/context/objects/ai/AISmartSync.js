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
    var AISmartSync = (function (_super) {
        __extends(AISmartSync, _super);
        //protected _pickEnabled: boolean = true;
        //protected _pickSigleEnabled: boolean = false;
        //protected _pickAllState: PickAllState;
        //protected _pickSigleState: PickSigleState;
        function AISmartSync() {
            var _this = _super.call(this) || this;
            _this.skillId = 0;
            _this.skillTargetId = 0;
            _this.skillTargetList = null;
            _this._moveAction = new s.RunAction();
            _this._flashAction = new s.FlashAction();
            _this._skillAction = new s.SkillAction();
            _this._deadAction = new s.DeadAction();
            _this._backAction = new s.BackAction();
            _this._skillDataList = [];
            return _this;
            //this._pickSigleState = new PickSigleState();
            //this._pickAllState = new PickAllState();
        }
        AISmartSync.prototype.initialize = function (body, job) {
            if (job === void 0) { job = TypeJob.NONE; }
            _super.prototype.initialize.call(this, body, job);
            this._body.vo.onTileChange(this, this.move);
            this._body.vo.onSkillCast(this, this.skill);
            //this._body.vo.onDead(this, this.deadHandler);
            this._moveAction.initialize(body);
            this._flashAction.initialize(body);
            this._skillAction.initialize(body);
            this._deadAction.initialize(body);
            this._backAction.initialize(body);
            //this._pickSigleState.initialize(this._body, this._job);
            //this._pickAllState.initialize(this._body, this._job);
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
        AISmartSync.prototype.reset = function () {
            if (this._body && this._body.vo) {
                this._body.vo.offTileChange(this, this.move);
                this._body.vo.offSkillCast();
                //this._body.vo.offDead(this,this.deadHandler);
            }
            if (this._currentAction) {
                this._currentAction.reset();
                this._currentAction = null;
            }
            this._moveAction.reset();
            this._flashAction.reset();
            this._skillAction.reset();
            this._deadAction.reset();
            this._backAction.reset();
            //this._pickSigleState.reset();
            //this._pickAllState.reset();
            for (var _i = 0, _a = this._skillDataList; _i < _a.length; _i++) {
                var skillData = _a[_i];
                utils.ObjectPool.to(skillData, true);
            }
            this._skillDataList.length = 0;
            _super.prototype.reset.call(this);
        };
        AISmartSync.prototype.getSkillData = function (id) {
            for (var _i = 0, _a = this._skillDataList; _i < _a.length; _i++) {
                var skillData = _a[_i];
                if (skillData.id == id)
                    return skillData;
            }
            var tpl = Templates.getTemplateById(templates.Map.SKILLNEW, id);
            if (tpl != null) {
                var newSkillData = utils.ObjectPool.from(s.SkillData, true, tpl);
                this._skillDataList.push(newSkillData);
                return newSkillData;
            }
            return null;
        };
        AISmartSync.prototype.move = function (x, y) {
            var node = app.gameContext.scene.getNode(x, y);
            var curNode = this._body.scene.getNodeByPixel(this._body.x, this._body.y);
            if (node == null)
                return;
            if (curNode == null) {
                this._currentAction = this._flashAction.start(node);
                return;
            }
            var dis = battle.manager.getNodeDistance(curNode, node);
            if (dis > 3) {
                this._currentAction = this._flashAction.start(node);
            }
            else if (dis > 2) {
                this._currentAction = this._moveAction.start(node, 1.5);
            }
            else if (dis > 1) {
                this._currentAction = this._moveAction.start(node, 1.2);
            }
            else {
                this._currentAction = this._moveAction.start(node);
            }
            this._runing = true;
        };
        AISmartSync.prototype.setBeatBackState = function (master) {
            this._currentAction = this._backAction.start(master);
            this._runing = true;
        };
        AISmartSync.prototype.skill = function (data) {
            if (this._body == null)
                return;
            if (this._body.type != TypeActor.PLAYER && this._body.stateDead)
                return;
            this.skillId = data.SkillId;
            this.skillTargetId = data.TargetId;
            this.skillTargetList = data.TargetList;
            var skillTemplate = Templates.getTemplateById(templates.Map.SKILLNEW, this.skillId);
            if (!skillTemplate) {
                logger.log("找不到技能配置===", this.skillId);
                return;
            }
            if (s.TypeSkill.isCampSkill(skillTemplate.skillType)) {
                var delayTime = s.TypeSkill.getTypeSkillCampDelay() - s.TypeSkill.getTypeSkillNormalDelay();
                utils.timer.once(delayTime, this, this.doSkillAction);
                if (TypeGame.isFormationGame(true)) {
                    if (app.gameContext.isMySelf(this._body) || app.gameContext.isMyFriend(this._body)) {
                        this._body.scene.showHighLightObject(this._body);
                    }
                }
            }
            else if (s.TypeSkill.isBigSkill(skillTemplate.skillType)) {
                var delayTime = s.TypeSkill.getTypeSkillBigDelay() - s.TypeSkill.getTypeSkillNormalDelay();
                utils.timer.once(delayTime, this, this.doSkillAction);
                if (TypeGame.isFormationGame(true)) {
                    //if(GameModels.user.player.battleSpeedRate == 0)
                    {
                        this._body.scene.showHighLightObject(this._body);
                        this._body.doZoom();
                    }
                }
            }
            else if (s.TypeSkill.isTriggerSkill(skillTemplate.skillType)) {
            }
            else {
                //var delayTime:number = TypeSkill.TYPE_SKILL_NORMAL_DELAY - 300;
                var delayTime = 100;
                utils.timer.once(delayTime, this, this.doSkillAction);
                //this.doSkillAction();
            }
            //对冲玩法才显示技能提示，不然太乱了
            if (TypeGame.isFormationGame(true)) {
                battle.manager.showSkillName(this._body, this.skillId);
            }
            //播放攻击声音
            if (app.gameContext.isMySelf(this._body)) {
                var skillType = skillTemplate.skillType;
                var soundStr = "";
                var dataModel = this._body.getModel();
                if (dataModel != null) {
                    if (s.TypeSkill.isNormalSkill(skillType)) {
                        soundStr = dataModel.attackSound;
                    }
                    else if (s.TypeSkill.isBigSkill(skillType)) {
                        soundStr = dataModel.skill2Sound;
                    }
                }
                mg.soundManager.playRandomSound(soundStr);
            }
        };
        AISmartSync.prototype.doSkillAction = function () {
            if (this._body == null)
                return;
            if (this._body.scene == null)
                return;
            if (this._body.type != TypeActor.PLAYER && this._body.stateDead)
                return;
            var skillTemplate = Templates.getTemplateById(templates.Map.SKILLNEW, this.skillId);
            var target = this._body.scene.getSmartObjectBySceneObjectId(this.skillTargetId);
            var model = null;
            var skillEffectStr = "";
            if (!skillTemplate) {
                logger.log("找不到技能配置===", this.skillId);
                return;
            }
            if (s.TypeSkill.isCampSkill(skillTemplate.skillType)) {
                if (TypeGame.isFormationGame(true)) {
                    this._body.scene.hideHighLightObject();
                }
                model = Templates.getTemplateById(templates.Map.DATAMODEL, this.skillId);
                if (model)
                    skillEffectStr = model.skillEffect2;
            }
            else {
                if (s.TypeSkill.isBigSkill(skillTemplate.skillType)) {
                    if (TypeGame.isFormationGame(true)) {
                        //this._body.scene.hideHighLightObject();
                        if (GameModels.user.player.battleSpeedRate == 0) {
                            this._body.attackSpeed = 0.5;
                        }
                        else {
                            this._body.attackSpeed = 0.75;
                        }
                    }
                    else {
                        this._body.attackSpeed = 0.5;
                    }
                }
                else {
                    if (TypeGame.isFormationGame(true)) {
                        if (GameModels.user.player.battleSpeedRate == 0) {
                            this._body.attackSpeed = 0.75;
                        }
                        else {
                            this._body.attackSpeed = 1.25;
                        }
                    }
                    else {
                        this._body.attackSpeed = 0.75;
                    }
                }
                if (target != null) {
                    var direct = TypeDirection.getDirection4(this._body.x, this._body.y, target.x, target.y);
                    this._body.actionOnce(TypeAction.ATTACK0, direct);
                }
                else {
                    this._body.actionOnce(TypeAction.ATTACK0);
                }
                model = this._body.getModel();
                skillEffectStr = model["skillEffect" + skillTemplate.skillType];
            }
            if (skillEffectStr && skillEffectStr != "" && skillEffectStr != "0") {
                var arr = skillEffectStr.split("|");
                if (arr[1] == "0" && arr[2] == "0" && arr[3] == "0") {
                }
                else {
                    var effectType = Number(arr[0]);
                    var skillShowEffect = s.SkillPool.fromPool(effectType);
                    if (skillShowEffect != null) {
                        var targetList = [];
                        for (var _i = 0, _a = this.skillTargetList; _i < _a.length; _i++) {
                            var targetId = _a[_i];
                            var smartObj = this._body.scene.getSmartObjectBySceneObjectId(targetId);
                            if (smartObj != null) {
                                targetList.push(smartObj);
                            }
                        }
                        skillShowEffect.initialize(this._body, target, targetList, arr[1], arr[2], arr[3]);
                        skillShowEffect.start();
                    }
                }
            }
        };
        AISmartSync.prototype.idel = function () {
            this._body.actionTo(TypeAction.IDLE, this._body.direct);
        };
        AISmartSync.prototype.deadHandler = function (killer) {
            if (this._currentAction) {
                this._currentAction.reset();
            }
            this._deadAction.start(killer);
            this._runing = false;
            if (TypeGame.isFormationGame()) {
                /*if(this._body.type == TypeActor.BOSS)
                {
                    battle.manager.showRightDefeatMovie(this._body);
                }
                else if(this._body.type == TypeActor.PET)
                {
                    battle.manager.showLeftDefeatMovie(this._body);
                }*/
                if (this._body.type == TypeActor.BOSS || this._body.type == TypeActor.PET) {
                    if (app.gameContext.isMyFriend(this._body)) {
                        battle.manager.showLeftDefeatMovie(this._body);
                    }
                    else {
                        battle.manager.showRightDefeatMovie(this._body);
                    }
                }
                var dataModel = this._body.getModel();
                if (dataModel != null) {
                    mg.soundManager.playSound(dataModel.deadSound);
                }
            }
        };
        AISmartSync.prototype.onSkillStart = function (caller, method) {
            this._skillAction.onRockAfter(caller, method);
        };
        AISmartSync.prototype.offSkillStart = function () {
            this._skillAction.offRockAfter();
        };
        AISmartSync.prototype.updateRender = function (timeStamp) {
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
            /*else
            {
                if(this._pickEnabled)
                {
                    if(this.findMinDrop())
                    {
                        this.move(this._body.target.tileX, this._body.target.tileY);
                    }
                    this.checkPick(timeStamp);
                }
            }*/
            return true;
        };
        Object.defineProperty(AISmartSync.prototype, "focusMode", {
            set: function (value) {
                this._skillAction.focusMode = value;
            },
            enumerable: true,
            configurable: true
        });
        return AISmartSync;
    }(s.AIBase));
    s.AISmartSync = AISmartSync;
    __reflect(AISmartSync.prototype, "s.AISmartSync");
})(s || (s = {}));
