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
var vo;
(function (vo_1) {
    var objectUId = 0;
    var GameSmartVO = (function (_super) {
        __extends(GameSmartVO, _super);
        function GameSmartVO(type) {
            var _this = _super.call(this) || this;
            _this._hp = 0;
            _this._mp = 0;
            _this._mpMax = 1000;
            _this._hpRecover = 0;
            _this._lastDeadTime = 0;
            _this._minLockRange = 2;
            _this._sceneFlag = ""; //场景里的分组标识
            _this._battleHpMax = 0;
            _this._battleHp = 0;
            _this._type = type;
            _this._propertiesHandlers = {};
            _this._buffList = {};
            _this._tileX = _this._tileY = 0;
            return _this;
        }
        GameSmartVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._objectId = ++objectUId;
            this.autoRecover = true;
            this._isDead = false;
            this._isMerged = false;
            this._isTeamAllDead = false;
            this._damgeEnabled = true;
        };
        GameSmartVO.prototype.reset = function () {
            utils.timer.clear(this, this.hpRecoverHandler);
            this._isDead = true;
            this._isMerged = false;
            this._isTeamAllDead = true;
            this.autoRecover = true;
            this._objectId = 0;
            this.offTileAllChange();
            this.offSkillCast();
            this.offAllPropertyChange();
            this.offDeadAll();
            this.offAllTargetChange();
            this.offBuffAdd();
            this.offBuffRemove();
            this.removeAllBuff();
            this.clearTile();
            //this._target = null;
            this._damgeEnabled = true;
            for (var key in this._buffList) {
                vo.toPool(this._buffList[key]);
                this._buffList[key] = null;
                delete this._buffList[key];
            }
            if (this._skillList) {
                this._skillList.reset();
            }
            this._sceneFlag = "";
        };
        Object.defineProperty(GameSmartVO.prototype, "isInitialize", {
            get: function () {
                return this._objectId != 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "objectId", {
            get: function () {
                return this._objectId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "skillList", {
            get: function () {
                return this._skillList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "hpAutoEnabled", {
            set: function (value) {
                if (value) {
                    this.hpAutoRecover = this.hpMax * 0.1;
                }
                else {
                    this.hpAutoRecover = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "hpAutoRecover", {
            get: function () {
                return this._hpRecover;
            },
            set: function (value) {
                if (this._hpRecover != value) {
                    this._hpRecover = value;
                    if (this._hpRecover > 0) {
                        utils.timer.loop(1000, this, this.hpRecoverHandler, true);
                    }
                    else {
                        utils.timer.clear(this, this.hpRecoverHandler);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        GameSmartVO.prototype.hpRecoverHandler = function () {
            if (this.hp < this.hpMax) {
                this.hpRecover(this._hpRecover);
            }
        };
        /**监听服务器位置变化 */
        GameSmartVO.prototype.onTileChange = function (caller, method) {
            if (!this._tileHandlers) {
                this._tileHandlers = new utils.Handlers(false);
            }
            this._tileHandlers.add(caller, method, null, false);
        };
        GameSmartVO.prototype.offTileChange = function (caller, method) {
            if (this._tileHandlers) {
                this._tileHandlers.remove(caller, method);
            }
        };
        GameSmartVO.prototype.offTileAllChange = function () {
            if (this._tileHandlers) {
                this._tileHandlers.clear();
            }
        };
        /**当前目标 */
        GameSmartVO.prototype.setTarget = function (v, event) {
            if (event === void 0) { event = true; }
            /*if (this._target != v) {
                this._target = v;
                if (event && this._targetHandlers) {
                    this._targetHandlers.runWith(this._target);
                }
                return true;
            }*/
            return false;
        };
        /**当前主目标 */
        GameSmartVO.prototype.setMainTarget = function (v, event) {
            if (event === void 0) { event = true; }
            if (this._target != v) {
                this._target = v;
                if (event && this._targetHandlers) {
                    this._targetHandlers.runWith(this._target);
                }
                return true;
            }
            return false;
        };
        Object.defineProperty(GameSmartVO.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        /**同步服务器位置信息 */
        GameSmartVO.prototype.syncTile = function (x, y, event) {
            if (event === void 0) { event = true; }
            if (x < 0)
                x = 0;
            if (y < 0)
                y = 0;
            this._tileX = x;
            this._tileY = y;
            if (event && this._tileHandlers) {
                this._tileHandlers.runWith(x, y);
            }
        };
        Object.defineProperty(GameSmartVO.prototype, "tileX", {
            /**服务器当前坐标位置X */
            get: function () {
                return this._tileX;
            },
            set: function (v) {
                this._tileX = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "tileY", {
            /**服务器当前坐标位置Y */
            get: function () {
                return this._tileY;
            },
            set: function (v) {
                this._tileY = v;
            },
            enumerable: true,
            configurable: true
        });
        GameSmartVO.prototype.clearTile = function () {
            this._tileX = this._tileY = 0;
        };
        GameSmartVO.prototype.onTargetChange = function (caller, method) {
            if (!this._targetHandlers) {
                this._targetHandlers = new utils.Handlers(false);
            }
            this._targetHandlers.add(caller, method, null, false);
        };
        GameSmartVO.prototype.offTargetChange = function (caller, method) {
            if (this._targetHandlers)
                this._targetHandlers.remove(caller, method);
        };
        GameSmartVO.prototype.offAllTargetChange = function () {
            if (this._targetHandlers)
                this._targetHandlers.clear();
        };
        /**监听服务器技能施放 */
        GameSmartVO.prototype.onSkillCast = function (caller, method) {
            this.offSkillCast();
            this._skillCastHandler = utils.Handler.create(caller, method, null, false);
        };
        GameSmartVO.prototype.offSkillCast = function () {
            if (this._skillCastHandler) {
                this._skillCastHandler.recover();
                this._skillCastHandler = null;
            }
        };
        /**同步服务器技能施放 */
        GameSmartVO.prototype.syncSkill = function (skillId, target, posX, posY, event) {
            if (event === void 0) { event = true; }
            if (event && this._skillCastHandler) {
                this._skillCastHandler.runWith(skillId, target, posX, posY);
            }
        };
        GameSmartVO.prototype.syncServerSkill = function (data, event) {
            if (event === void 0) { event = true; }
            if (event && this._skillCastHandler) {
                this._skillCastHandler.runWith(data);
            }
        };
        /*public syncSkill(skillId: number, target: vo.GameSmartVO, posX: number, posY: number, event: boolean = true) {
            if (event && this._skillCastHandler) {
                this._skillCastHandler.runWith(skillId, target, posX, posY);
            }
        }*/
        /**监听服务器天赋触发 */
        GameSmartVO.prototype.onTalentTriger = function (caller, method) {
            this.offTalentTriger();
            this._talentTrigerHandler = utils.Handler.create(caller, method, null, false);
        };
        GameSmartVO.prototype.offTalentTriger = function () {
            if (this._talentTrigerHandler) {
                this._talentTrigerHandler.recover();
                this._talentTrigerHandler = null;
            }
        };
        /**同步服务器天赋触发 */
        GameSmartVO.prototype.syncTalent = function (talentId, value, event) {
            if (event === void 0) { event = true; }
            if (event && this._talentTrigerHandler) {
                this._talentTrigerHandler.runWith(talentId, value);
            }
        };
        GameSmartVO.prototype.updateSceneInfo = function (sceneInfo) {
            this.sceneObjectId = sceneInfo.SceneObjectId;
            this.tileX = sceneInfo.PosX;
            this.tileY = sceneInfo.PosY;
            this.moveSpeed = sceneInfo.MoveSpeed;
            this.direct = sceneInfo.Direct;
            this.petStar = sceneInfo.Star;
            this.petCountry = sceneInfo.Country;
            this.soldierType = sceneInfo.SoldierType;
            this.petConfigId = sceneInfo.PetConfigId;
            this.syncHp(sceneInfo.HP, sceneInfo.HPMax);
            this.syncMp(sceneInfo.MP, sceneInfo.MPMax);
            this.syncStatus(sceneInfo.StateDead == 1, null);
        };
        Object.defineProperty(GameSmartVO.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "uid", {
            /**服务器唯一ID*/
            get: function () {
                return this._uid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "isMerged", {
            get: function () {
                return this._isMerged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "stateDead", {
            get: function () {
                return this._isDead;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "isTeamAllDead", {
            get: function () {
                return this._isTeamAllDead;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "sceneObjectId", {
            get: function () {
                return this._sceneObjectId;
            },
            set: function (value) {
                this._sceneObjectId = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "moveSpeed", {
            get: function () {
                return this._moveSpeed;
            },
            set: function (value) {
                this._moveSpeed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "direct", {
            get: function () {
                return this._direct;
            },
            set: function (value) {
                this._direct = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "petStar", {
            get: function () {
                return this._petStar;
            },
            set: function (value) {
                this._petStar = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "petCountry", {
            get: function () {
                return this._petCountry;
            },
            set: function (value) {
                this._petCountry = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "soldierType", {
            get: function () {
                return this._soldierType;
            },
            set: function (value) {
                this._soldierType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "petConfigId", {
            get: function () {
                return this._petConfigId;
            },
            set: function (value) {
                this._petConfigId = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "stateTeamDead", {
            get: function () {
                if (this.master != null) {
                    //return this.master.isStateTeamDead();
                    return this.master.isTeamAllDead;
                }
                return this._isDead;
            },
            enumerable: true,
            configurable: true
        });
        GameSmartVO.prototype.isSelfTeam = function (vo) {
            if (vo == this)
                return true;
            var ret = false;
            if (vo != null && vo.master && vo.master == this.master) {
                ret = true;
            }
            return ret;
        };
        /**同步死亡状态 */
        GameSmartVO.prototype.syncStatus = function (value, killer) {
            if (this._isDead != value) {
                this._isDead = value;
                if (this._isDead) {
                    if (this._deadHandlers)
                        this._deadHandlers.runWith(killer);
                    this._lastDeadTime = egret.getTimer();
                }
                else {
                    if (this._relifeHandlers)
                        this._relifeHandlers.run();
                }
            }
        };
        /**同步合体状态 */
        GameSmartVO.prototype.syncMergedState = function (bool) {
            this._isMerged = bool;
        };
        /**同步全队死亡状态 */
        GameSmartVO.prototype.syncTeamStatus = function (value, killer) {
            if (this._isTeamAllDead != value) {
                this._isTeamAllDead = value;
                if (this._isTeamAllDead) {
                    if (this._teamDeadHandlers)
                        this._teamDeadHandlers.runWith(killer);
                }
                else {
                    if (this._teamRelifeHandlers)
                        this._teamRelifeHandlers.run();
                }
            }
        };
        /**同步血量 */
        GameSmartVO.prototype.syncHp = function (v, max) {
            if (max === void 0) { max = -1; }
            this._hp = v;
            if (max > -1) {
                this.battleHpMax = max;
                this.battleHp = v;
                this.notifyPropertyChange(TypeProperty.Hp, this._battleHp);
            }
            else {
                this.notifyPropertyChange(TypeProperty.Hp, this._hp);
            }
        };
        /**同步怒气 */
        GameSmartVO.prototype.syncMp = function (v, max) {
            if (max === void 0) { max = -1; }
            if (max > -1) {
                this._mpMax = max;
            }
            this._mp = v;
            this.notifyPropertyChange(TypeProperty.Mp, this._mp);
        };
        /**仅客户端用 */
        GameSmartVO.prototype.hpRecover = function (value) {
            if (!this._damgeEnabled)
                return;
            if (this.hp >= this.hpMax)
                return;
            if (this._hp == 0)
                return;
            this._hp += value;
            if (this.hp > this.hpMax) {
                this._hp = this.hpMax;
            }
            this.notifyPropertyChange(TypeProperty.Hp, value);
            return value;
        };
        /**仅客户端用 */
        GameSmartVO.prototype.hpHurted = function (value, target) {
            if (!this._damgeEnabled)
                return 0;
            if (this._hp == 0)
                return 0;
            this._hp -= value;
            // if(isNaN(this._hp)||this._hp==undefined){
            // 	throw('hp is NaN!!!');
            // }
            this.updateHp(target);
            return value;
        };
        GameSmartVO.prototype.updateHp = function (target) {
            if (target === void 0) { target = null; }
            if (this._hp <= 0) {
                this._hp = 0;
                this._isDead = true;
                this.hpAutoRecover = 0;
                this._lastDeadTime = egret.getTimer();
                if (this._deadHandlers)
                    this._deadHandlers.runWith(target);
            }
            this.notifyPropertyChange(TypeProperty.Hp, this._hp);
        };
        GameSmartVO.prototype.addBuff = function (buffVO) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            /*if(!this._damgeEnabled&&!TypeBuff.isNeedDisplay(buffVO.type)){
                toBuffPool(buffVO);
                return;
            } */
            if (this._objectId == 0) {
                vo_1.toBuffPool(buffVO);
                logger.error("\u8BE5\u5BF9\u8C61[" + this.name + "]\u5DF2\u7ECF\u56DE\u6536,\u65E0\u6CD5\u6DFB\u52A0Buff!");
                return;
            }
            if (this._buffList[buffVO.type]) {
                //logger.error('存在同样的BUFF');
                this.removeBuff(buffVO);
            }
            this._buffList[buffVO.type] = buffVO;
            if (this._buffAddHandler) {
                (_a = this._buffAddHandler).runWith.apply(_a, [buffVO].concat(args));
            }
            return buffVO;
            var _a;
        };
        GameSmartVO.prototype.removeBuff = function (buff) {
            /*if(!this._damgeEnabled &&!TypeBuff.isNeedDisplay(buff.type)){
                toBuffPool(buff);
                return;
            }*/
            var type = buff.type;
            if (this._buffList[type]) {
                if (this._buffRemoveHandler) {
                    this._buffRemoveHandler.runWith(buff);
                }
                vo_1.toBuffPool(this._buffList[type]);
                this._buffList[type] = null;
                delete this._buffList[type];
                return true;
            }
            return false;
        };
        GameSmartVO.prototype.removeAllBuff = function () {
            for (var type in this._buffList) {
                vo_1.toBuffPool(this._buffList[type]);
                this._buffList[type] = null;
                delete this._buffList[type];
            }
        };
        GameSmartVO.prototype.getBuffValue = function (type) {
            if (this._buffList[type] == null)
                return 0;
            return this._buffList[type].template.effectNum;
        };
        GameSmartVO.prototype.getBuff = function (type) {
            return this._buffList[type];
        };
        GameSmartVO.prototype.hasBuff = function (type) {
            return !!this._buffList[type];
        };
        Object.defineProperty(GameSmartVO.prototype, "buffList", {
            get: function () {
                return this._buffList;
            },
            enumerable: true,
            configurable: true
        });
        /**获取技能 子类复写*/
        GameSmartVO.prototype.getSkillVO = function (id) {
            return null;
        };
        Object.defineProperty(GameSmartVO.prototype, "lastDeadTime", {
            /**最后死亡时间 */
            get: function () {
                return this._lastDeadTime;
            },
            enumerable: true,
            configurable: true
        });
        GameSmartVO.prototype.onDead = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._deadHandlers) {
                this._deadHandlers = new utils.Handlers();
            }
            this._deadHandlers.add(caller, method, args, false);
        };
        GameSmartVO.prototype.offDead = function (caller, method) {
            if (this._deadHandlers) {
                this._deadHandlers.remove(caller, method);
            }
        };
        GameSmartVO.prototype.offDeadAll = function () {
            if (this._deadHandlers) {
                this._deadHandlers.clear();
            }
        };
        GameSmartVO.prototype.onRelife = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._relifeHandlers) {
                this._relifeHandlers = new utils.Handlers();
            }
            this._relifeHandlers.add(caller, method, args, false);
        };
        GameSmartVO.prototype.offRelife = function (caller, method) {
            if (this._relifeHandlers) {
                this._relifeHandlers.remove(caller, method);
            }
        };
        GameSmartVO.prototype.offRelifeAll = function () {
            if (this._relifeHandlers) {
                this._relifeHandlers.clear();
            }
        };
        GameSmartVO.prototype.onTeamDead = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._teamDeadHandlers) {
                this._teamDeadHandlers = new utils.Handlers();
            }
            this._teamDeadHandlers.add(caller, method, args, false);
        };
        GameSmartVO.prototype.offTeamDead = function (caller, method) {
            if (this._teamDeadHandlers) {
                this._teamDeadHandlers.remove(caller, method);
            }
        };
        GameSmartVO.prototype.offTeamDeadAll = function () {
            if (this._teamDeadHandlers) {
                this._teamDeadHandlers.clear();
            }
        };
        GameSmartVO.prototype.onTeamRelife = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._teamRelifeHandlers) {
                this._teamRelifeHandlers = new utils.Handlers();
            }
            this._teamRelifeHandlers.add(caller, method, args, false);
        };
        GameSmartVO.prototype.offTeamRelife = function (caller, method) {
            if (this._teamRelifeHandlers) {
                this._teamRelifeHandlers.remove(caller, method);
            }
        };
        GameSmartVO.prototype.offTeamRelifeAll = function () {
            if (this._teamRelifeHandlers) {
                this._teamRelifeHandlers.clear();
            }
        };
        GameSmartVO.prototype.onBuffAdd = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offBuffAdd();
            this._buffAddHandler = utils.Handler.create(caller, method, args, false);
        };
        GameSmartVO.prototype.offBuffAdd = function () {
            if (this._buffAddHandler) {
                this._buffAddHandler.recover();
                this._buffAddHandler = null;
            }
        };
        GameSmartVO.prototype.onBuffRemove = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offBuffRemove();
            this._buffRemoveHandler = utils.Handler.create(caller, method, args, false);
        };
        GameSmartVO.prototype.offBuffRemove = function () {
            if (this._buffRemoveHandler) {
                this._buffRemoveHandler.recover();
                this._buffRemoveHandler = null;
            }
        };
        /**监听技能列表增加 */
        GameSmartVO.prototype.onSkillAdd = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (this._skillList)
                (_a = this._skillList).onAdd.apply(_a, [caller, method].concat(args));
            var _a;
        };
        GameSmartVO.prototype.offSkillAdd = function (caller, method) {
            if (this._skillList)
                this._skillList.offAdd(caller, method);
        };
        GameSmartVO.prototype.onSkillRemove = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (this._skillList)
                (_a = this._skillList).onRemove.apply(_a, [caller, method].concat(args));
            var _a;
        };
        GameSmartVO.prototype.offSkillRemove = function (caller, method) {
            if (this._skillList)
                this._skillList.offRemove(caller, method);
        };
        /**监听某个技能变化 */
        GameSmartVO.prototype.onSkillUpdate = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (this._skillList)
                (_a = this._skillList).onUpdate.apply(_a, [caller, method].concat(args));
            var _a;
        };
        GameSmartVO.prototype.offSkillUpdate = function (caller, method) {
            if (this._skillList)
                this._skillList.offUpdate(caller, method);
        };
        /**发送属性变化*/
        GameSmartVO.prototype.notifyPropertyChange = function (propertyId, value) {
            var list = this._propertiesHandlers[propertyId];
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    var handler = list[i];
                    if (handler.once) {
                        list.splice(i, 1);
                        i--;
                    }
                    handler.runWith(this, propertyId);
                }
                if (list.length == 0) {
                    this._propertiesHandlers[propertyId] = null;
                    delete this._propertiesHandlers[propertyId];
                }
            }
        };
        /**监听属性变化*/
        GameSmartVO.prototype.onPropertyChange = function (propertyId, caller, method, args, once) {
            if (args === void 0) { args = null; }
            if (once === void 0) { once = false; }
            if (propertyId == 10268 || propertyId == 10269 || propertyId == 10270 || propertyId == 10271 || propertyId == 10272) {
                egret.log("111111111111");
            }
            if (!this._propertiesHandlers[propertyId]) {
                this._propertiesHandlers[propertyId] = [];
            }
            if (!this.hasPropertyChange(propertyId, caller, method)) {
                var list = this._propertiesHandlers[propertyId];
                list.push(utils.Handler.create(caller, method, args, once));
            }
        };
        GameSmartVO.prototype.hasPropertyChange = function (propertyId, caller, method) {
            var list = this._propertiesHandlers[propertyId];
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var handler = list_1[_i];
                if (handler.caller == caller && handler.method == method) {
                    return true;
                }
            }
            return false;
        };
        /**取消属性监听*/
        GameSmartVO.prototype.offPropertyChange = function (propertyId, caller, method) {
            var list = this._propertiesHandlers[propertyId];
            if (list) {
                while (true) {
                    var index = -1;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].caller == caller && list[i].method == method) {
                            index = i;
                            break;
                        }
                    }
                    if (index >= 0) {
                        list.splice(index, 1);
                        continue;
                    }
                    break;
                }
                if (list.length == 0) {
                    this._propertiesHandlers[propertyId] = null;
                    delete this._propertiesHandlers[propertyId];
                }
            }
        };
        /**取消属性的所有监听回调*/
        GameSmartVO.prototype.offPropertyAllChange = function (propertyId) {
            var list = this._propertiesHandlers[propertyId];
            if (list) {
                var length = list.length;
                for (var i = 0; i < list.length; i++) {
                    list[i].recover();
                }
                list.length = 0;
                this._propertiesHandlers[propertyId] = null;
                delete this._propertiesHandlers[propertyId];
            }
        };
        GameSmartVO.prototype.offAllPropertyChange = function () {
            for (var _i = 0, _a = this._propertiesHandlers; _i < _a.length; _i++) {
                var list = _a[_i];
                if (list) {
                    var length = list.length;
                    for (var i = 0; i < list.length; i++) {
                        list[i].recover();
                    }
                    list.length = 0;
                }
            }
            for (var key in this._propertiesHandlers) {
                this._propertiesHandlers[key] = null;
                delete this._propertiesHandlers[key];
            }
        };
        /**获取属性 */
        GameSmartVO.prototype.getProperty = function (type) {
            return 0;
        };
        Object.defineProperty(GameSmartVO.prototype, "hpPrercent", {
            get: function () {
                return (((this._hp / this.hpMax) * 100) >> 0) / 100;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "damgeEnabled", {
            /**技能伤害开关 */
            get: function () {
                return this._damgeEnabled;
            },
            set: function (value) {
                this._damgeEnabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "effectEnabled", {
            /**技能效果开关 */
            get: function () {
                return this._effectEnabled;
            },
            set: function (value) {
                this._effectEnabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "minLockRange", {
            get: function () {
                return this._minLockRange;
            },
            set: function (value) {
                this._minLockRange = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "sceneFlag", {
            get: function () {
                return this._sceneFlag;
            },
            set: function (value) {
                this._sceneFlag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "master", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "hp", {
            /**生命 子类复写*/
            get: function () {
                return this._hp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "hpMax", {
            /**生命上限 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "mp", {
            get: function () {
                return this._mp;
            },
            set: function (value) {
                this._mp = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "mpMax", {
            get: function () {
                return this._mpMax;
            },
            set: function (value) {
                this._mpMax = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "battleHp", {
            /**生命 战斗场景专用*/
            get: function () {
                if (this._battleHp > 0) {
                    return this._battleHp;
                }
                return this.hp;
            },
            set: function (value) {
                this._battleHp = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "battleHpMax", {
            /**生命上限 战斗场景专用*/
            get: function () {
                if (this._battleHpMax > 0) {
                    return this._battleHpMax;
                }
                return this.hpMax;
            },
            set: function (value) {
                this._battleHpMax = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "attack", {
            /**攻击 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "pDef", {
            /**物防 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "mDef", {
            /**法防 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "ignorePDef", {
            /**物防穿透 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "ignoreMDef", {
            /**法防穿透 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "crit", {
            /**暴击 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "critInjure", {
            /**暴击伤害 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "ignoreCrit", {
            /**抗暴 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "ignoreCritInjure", {
            /**暴击抵抗 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "hit", {
            /**命中 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "dodge", {
            /**闪避 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "injureAdd", {
            /**伤害加深 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "injureIgnore", {
            /**伤害减免 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "healHP", {
            /**生命回复 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "injureAddBoss", {
            /**BOSS伤害加深 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "critBoss", {
            /**BOSS暴击 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "critInjureBoss", {
            /**BOSS暴击伤害 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSmartVO.prototype, "ignoreDef", {
            /**穿透 用以攻击时计算用 子类复写*/
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        return GameSmartVO;
    }(vo_1.VOBase));
    vo_1.GameSmartVO = GameSmartVO;
    __reflect(GameSmartVO.prototype, "vo.GameSmartVO");
})(vo || (vo = {}));
