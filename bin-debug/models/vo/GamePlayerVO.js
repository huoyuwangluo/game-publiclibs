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
(function (vo) {
    var GamePlayerVO = (function (_super) {
        __extends(GamePlayerVO, _super);
        function GamePlayerVO() {
            var _this = _super.call(this, TypeActor.PLAYER) || this;
            //private _xpList: vo.GamePlayerXpVO;
            _this._clothesAvatarId = '';
            _this._weaponAvatarId = '';
            _this._isFight = false;
            /**更新属性 */
            _this._oldLevel = 0;
            _this._serverData = {};
            _this._equipList = new vo.EquipListVO(_this);
            _this._petList = new vo.GamePetListVO(_this);
            _this._skillList = new vo.SkillListVO();
            //this._xpList = new vo.GamePlayerXpVO();
            // this._playerAgreement = null;
            _this._tempZZList = [];
            return _this;
        }
        GamePlayerVO.prototype.initialize = function (data, uid) {
            if (uid === void 0) { uid = ""; }
            _super.prototype.initialize.call(this, data);
            this._blessAttValue = 0;
            this._blessDamegeAdd = 0;
            this._blessDamegeReduce = 0;
            var needResetState = true;
            if (data instanceof n.ProtoPlayerDetailInfo || data instanceof n.ProtoCopyPlayer) {
                this.setPropertys(data.Properties);
                if (data instanceof n.ProtoPlayerDetailInfo) {
                    this.decode_CharacterDetailInfo(data);
                }
                else if (data instanceof n.ProtoCopyPlayer) {
                    this.decode_ProtoCopyPlayer(data);
                    needResetState = false;
                }
                this.setAvatarId();
                if (data instanceof n.ProtoCopyPlayer)
                    this.setEquips(data.Equips);
                //this.setSkills(data.Skills);
                this.setXP();
            }
            else if (data instanceof n.ProtoPlayerViewInfo) {
                this.decode_PlayerViewInfo(data);
            }
            else if (data instanceof n.ProtoMineralCopyPlayer) {
                this.decode_ProtoMineralCopyPlayer(data);
            }
            else if (data instanceof templates.taskRobot) {
                this.decode_TaskRobot(data, uid);
            }
            this.updateMaxExp();
            //GameModels.timer.addHeart(this, this.heartHandler);
            if (needResetState) {
                this.resetState();
            }
            this._minLockRange = 3;
            //this.onPropertyChange(TypeProperty.Hp, this, this.teamHpChangeHandler);
            //this.onPropertyChange(TypeProperty.MaxHp, this, this.teamHpChangeHandler);
            //this.onTargetChange(this, this.teamTargetChangeHandler);
            // for (var petVO of this._petList.upFormats) {
            // 	petVO.onPropertyChange(TypeProperty.Hp, this, this.teamHpChangeHandler);
            // 	petVO.onPropertyChange(TypeProperty.MaxHp, this, this.teamHpChangeHandler);
            // }
            // for (var petVO of this._petList.upFormats) {
            // 	petVO.onTargetChange(this, this.teamTargetChangeHandler);
            // }
        };
        GamePlayerVO.prototype.reset = function () {
            //GameModels.timer.removeHeart(this, this.heartHandler);
            this.offPropertyChange(TypeProperty.Hp, this, this.teamHpChangeHandler);
            this.offPropertyChange(TypeProperty.MaxHp, this, this.teamHpChangeHandler);
            for (var _i = 0, _a = this._petList.upFormats; _i < _a.length; _i++) {
                var petVO = _a[_i];
                petVO.offPropertyChange(TypeProperty.Hp, this, this.teamHpChangeHandler);
                petVO.offPropertyChange(TypeProperty.MaxHp, this, this.teamHpChangeHandler);
            }
            this.offTargetChange(this, this.teamTargetChangeHandler);
            for (var _b = 0, _c = this._petList.upFormats; _b < _c.length; _b++) {
                var petVO = _c[_b];
                petVO.offTargetChange(this, this.teamTargetChangeHandler);
                petVO.offTileChange(this, this.teamTileChangeHandler);
            }
            this.offTeamHpChangeAll();
            this.offNameChange();
            this.resetState();
            this._equipList.reset();
            this._petList.reset();
            if (this._xpVO) {
                vo.toPool(this._xpVO);
                this._xpVO = null;
            }
            for (var id in this._serverData) {
                this._serverData[id] = 0;
                delete this._serverData[id];
            }
            _super.prototype.reset.call(this);
        };
        GamePlayerVO.prototype.resetState = function () {
            this.syncHp(this.battleHpMax, this.battleHpMax);
            this._isDead = false;
            this._isTeamAllDead = false;
            this.removeAllBuff();
            this._petList.resetState();
            if (this._xpVO)
                this._xpVO.resetState();
            this.disableBless();
            //this.setMainTarget(null);
            //this._target = null;
        };
        GamePlayerVO.prototype.resetMergeState = function () {
            this._petList.resetMergeState();
        };
        GamePlayerVO.prototype.decode_CharacterDetailInfo = function (data) {
            this._name = data.CharName;
            this._gender = data.Gender;
            this._uid = data.Id;
            this._job = data.Profession;
            this._legionId = data.UnionId == 0 ? "" : data.UnionId.toString();
            this._serverId = parseInt(GameModels.login.serverList.selected.sid);
            this._petList.initialize(data.PetList, data.PetRoomList);
            // for (var talentId of data.TalentIdList) {
            // 	this._talenList.add(vo.fromPool(vo.TalentVO, talentId) as vo.TalentVO)
            // }
        };
        GamePlayerVO.prototype.decode_ProtoCopyPlayer = function (data) {
            this._name = data.PlayerName;
            this._gender = data.Gender;
            this._uid = data.PlayerId;
            this.updateSceneInfo(data.SceneInfo);
            this._job = data.Profession;
            this._headIcon = data.HeadIcon;
            this._tileX = data.PosX;
            this._tileY = data.PosY;
            //this._hp = data.HP;
            this._legionId = data.Flag;
            this._serverId = data.ServerId;
            this._sceneFlag = data.SceneFlag;
            this._isDead = data.IsAlive == 0;
            //this.updatePropertyValue(TypeProperty.HP, data.HP);
            //this.updatePropertyValue(TypeProperty.MaxHP, data.MaxHP);
            this._petList.initialize(data.PetList, data.PetRoomList);
        };
        GamePlayerVO.prototype.updateProtoCopyPlayer = function (data) {
            this.updateSceneInfo(data.SceneInfo);
            //this.petList.reset();
            this.petList.setInBattlePets(data.PetList);
            for (var _i = 0, _a = this._petList.upFormats; _i < _a.length; _i++) {
                var petVO = _a[_i];
                petVO.onPropertyChange(TypeProperty.Hp, this, this.teamHpChangeHandler);
                petVO.onPropertyChange(TypeProperty.MaxHp, this, this.teamHpChangeHandler);
            }
            for (var _b = 0, _c = this._petList.upFormats; _b < _c.length; _b++) {
                var petVO = _c[_b];
                petVO.onTargetChange(this, this.teamTargetChangeHandler);
                petVO.onTileChange(this, this.teamTileChangeHandler);
            }
            /*for (var pet of data.PetList) {
                var petVO: vo.GamePetVO = this.petList.getPetVOByUId(pet.PetId);
                if (petVO != null) {
                    petVO.updateSceneInfo(pet.SceneInfo);
                }
            }*/
        };
        GamePlayerVO.prototype.decode_PlayerViewInfo = function (data) {
            this._uid = data.PlayerId;
            this._name = data.PlayerName;
            this._job = data.Profession;
            this._gender = data.Gender;
            this._headIcon = data.HeadIcon;
            this.setPropertys(data.PlayerPropList);
        };
        GamePlayerVO.prototype.decode_ProtoMineralCopyPlayer = function (data) {
            this._name = data.PlayerName;
            this._gender = 1;
            this._uid = data.PlayerId;
            this._job = 1;
            this._headIcon = data.HeadIcon;
            this.setAvatarId();
            this._petList.initialize(data.PetList, data.PetRoomList);
        };
        GamePlayerVO.prototype.decode_TaskRobot = function (data, uid) {
            if (uid === void 0) { uid = ""; }
            this._gender = data.job == TypeJob.ZHAN ? 1 : 0;
            this._name = GameModels.login.randomName(!!this._gender);
            this._uid = uid;
            this._job = data.job;
            this.setAvatarId();
            this._serverData[TypeProperty.PAtk] = data.ATT;
            this._serverData[TypeProperty.PDef] = data.DEF;
            //this._serverData[TypeProperty.MDef] = data.MDEF;
            this._serverData[TypeProperty.Hp] = this._serverData[TypeProperty.MaxHp] = data.HP;
            if (!this._serverData)
                this._serverData = {};
            var equipVO;
            if (data.equipId1) {
                equipVO = vo.fromPool(vo.EquipVO);
                equipVO.create(data.equipId1, TypeEquip.WEAPON);
                this._serverData[TypeProperty.CLOTH_MODLEID] = equipVO.modelId;
                this._equipList.add(equipVO);
            }
            if (data.equipId2) {
                equipVO = vo.fromPool(vo.EquipVO);
                equipVO.create(data.equipId2, TypeEquip.CLOTHES);
                this._serverData[TypeProperty.WEAPON_MODLEID] = equipVO.modelId;
                this._equipList.add(equipVO);
            }
            if (data.skillId)
                this.addSkill(data.skillId, 1);
        };
        /**解析人物属性 */
        GamePlayerVO.prototype.setPropertys = function (protoPropertys) {
            if (!protoPropertys)
                return;
            for (var i = 0; i < protoPropertys.length; i++) {
                this.updateProperty(protoPropertys[i]);
            }
        };
        /**解析人物装备数据 */
        GamePlayerVO.prototype.setEquips = function (Equips) {
            if (!Equips)
                return;
            for (var i = 0; i < Equips.length; i++) {
                this._equipList.add(vo.fromPool(vo.EquipVO, Equips[i]));
            }
        };
        // /**解析人物技能 */
        // private setSkills(Skills: n.ProtoSkill[]) {
        // 	if (!Skills)
        // 		return;
        // 	for (var skillData of Skills) {
        // 		this.addSkill(skillData.Id, skillData.Level);
        // 	}
        // }
        GamePlayerVO.prototype.setTarget = function (v, event) {
            if (event === void 0) { event = true; }
            /*if (this._target != v) {
                this._target = v;
                for (var petVO of this._petList.upFormats) {
                    petVO.setTarget(v);
                }
                if (event && this._targetHandlers) {
                    this._targetHandlers.runWith(this._target);
                }
                return true;
            }
            */
            return false;
        };
        GamePlayerVO.prototype.getTeamTarget = function () {
            var ret = this.target;
            if (!ret) {
                for (var _i = 0, _a = this._petList.upFormats; _i < _a.length; _i++) {
                    var petVO = _a[_i];
                    ret = petVO.target;
                    if (ret) {
                        break;
                    }
                }
            }
            return ret;
        };
        /**设置XP */
        GamePlayerVO.prototype.setXP = function () {
            if (!this._xpVO) {
                this._xpVO = vo.fromPool(vo.GamePlayerXpVO, this);
            }
        };
        /**设置模型Id */
        GamePlayerVO.prototype.setAvatarId = function () {
            this._clothesAvatarId = TypeJob.getDefaultClothesAvatar(this._job, this._gender);
            this._weaponAvatarId = TypeJob.getDefaultWeaponAvatar(this._job, this._gender);
        };
        GamePlayerVO.prototype.heartHandler = function () {
            if (this.healHP) {
                this.hpRecover(this.healHP);
            }
        };
        GamePlayerVO.prototype.resetXp = function () {
            if (this._xpVO)
                this._xpVO.resetState();
        };
        /**同步血量 */
        /*public syncHp(v: number, max: number = 0) {
            if (max) {
                this._serverData[TypeProperty.MaxHP] = max;
            }
            super.syncHp(v, max);
        }*/
        // public hasPet(petVO: vo.GamePetVO) {
        // 	return this._petList.hasPet(petVO);
        // }
        /**更新解/合体状态 */
        GamePlayerVO.prototype.updatePetMerge = function (pos, state) {
            this._petList.updateMerge(pos, state);
        };
        /**祝福:攻击提升(1=100%) */
        GamePlayerVO.prototype.enableAttBless = function (v) {
            this._blessAttValue = v;
        };
        /**祝福:伤害加深(1=100%) */
        GamePlayerVO.prototype.enableDamegeAddBless = function (v) {
            this._blessDamegeAdd = v / equation.BATTLE_PROBABI;
        };
        /**祝福:伤害减免(1=100%) */
        GamePlayerVO.prototype.enableDamegeReduceBless = function (v) {
            this._blessDamegeReduce = v / equation.BATTLE_PROBABI;
            ;
        };
        GamePlayerVO.prototype.disableBless = function () {
            this._blessAttValue = 0;
            this._blessDamegeAdd = 0;
            this._blessDamegeReduce = 0;
        };
        /**全队死亡 */
        GamePlayerVO.prototype.isStateTeamDead = function () {
            var ret = true;
            if (!this.stateDead) {
                ret = false;
            }
            else {
                for (var _i = 0, _a = this._petList.upFormats; _i < _a.length; _i++) {
                    var petVO = _a[_i];
                    if (!petVO.stateDead) {
                        ret = false;
                        break;
                    }
                }
            }
            return ret;
        };
        /**有一个单位死亡 */
        GamePlayerVO.prototype.hashOneStateIsDead = function () {
            if (this.stateDead) {
                return true;
            }
            else {
                for (var _i = 0, _a = this._petList.upFormats; _i < _a.length; _i++) {
                    var petVO = _a[_i];
                    if (petVO.stateDead) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**获取当前队伍的队长 */
        GamePlayerVO.prototype.getTeamLeaderVO = function () {
            for (var _i = 0, _a = this._petList.upFormats; _i < _a.length; _i++) {
                var petVO = _a[_i];
                if (petVO.stateDead == false) {
                    return petVO;
                }
            }
            return null;
        };
        GamePlayerVO.prototype.getTeamHpMax = function () {
            var ret = this.battleHpMax;
            for (var _i = 0, _a = this._petList.upFormats; _i < _a.length; _i++) {
                var petVO = _a[_i];
                ret += petVO.battleHpMax;
            }
            return ret;
        };
        GamePlayerVO.prototype.getTeamHp = function () {
            var ret = this.battleHp;
            for (var _i = 0, _a = this._petList.upFormats; _i < _a.length; _i++) {
                var petVO = _a[_i];
                ret += petVO.battleHp;
            }
            return ret;
        };
        GamePlayerVO.prototype.teamHpChangeHandler = function () {
            if (this._teamHpChangeHandlers) {
                this._teamHpChangeHandlers.run();
            }
        };
        GamePlayerVO.prototype.onTeamHpChange = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._teamHpChangeHandlers) {
                this._teamHpChangeHandlers = new utils.Handlers();
            }
            this._teamHpChangeHandlers.add(caller, method, args, false);
        };
        GamePlayerVO.prototype.offTeamHpChange = function (caller, method) {
            if (this._teamHpChangeHandlers) {
                this._teamHpChangeHandlers.remove(caller, method);
            }
        };
        GamePlayerVO.prototype.offTeamHpChangeAll = function () {
            if (this._teamHpChangeHandlers) {
                this._teamHpChangeHandlers.clear();
            }
        };
        GamePlayerVO.prototype.teamTargetChangeHandler = function () {
            if (this._teamTargetHandlers) {
                this._teamTargetHandlers.run();
            }
        };
        GamePlayerVO.prototype.onTeamTargetChange = function (caller, method) {
            if (!this._teamTargetHandlers) {
                this._teamTargetHandlers = new utils.Handlers(false);
            }
            this._teamTargetHandlers.add(caller, method, null, false);
        };
        GamePlayerVO.prototype.offTeamTargetChange = function (caller, method) {
            if (this._teamTargetHandlers)
                this._teamTargetHandlers.remove(caller, method);
        };
        GamePlayerVO.prototype.offAllTeamTargetChange = function () {
            if (this._teamTargetHandlers)
                this._teamTargetHandlers.clear();
        };
        GamePlayerVO.prototype.teamTileChangeHandler = function () {
            if (this._teamTileChangeHandler) {
                this._teamTileChangeHandler.run();
            }
        };
        GamePlayerVO.prototype.onTeamTileChange = function (caller, method) {
            if (!this._teamTileChangeHandler) {
                this._teamTileChangeHandler = new utils.Handlers(false);
            }
            this._teamTileChangeHandler.add(caller, method, null, false);
        };
        GamePlayerVO.prototype.offTeamTileChange = function (caller, method) {
            if (this._teamTileChangeHandler)
                this._teamTileChangeHandler.remove(caller, method);
        };
        GamePlayerVO.prototype.offAllTeamTileChange = function () {
            if (this._teamTileChangeHandler)
                this._teamTileChangeHandler.clear();
        };
        Object.defineProperty(GamePlayerVO.prototype, "xpState", {
            get: function () {
                return this._xpVO ? this._xpVO.state : 0;
            },
            /**设置Xp怒气值增长状态 */
            set: function (value) {
                if (this._xpVO)
                    this._xpVO.state = value;
            },
            enumerable: true,
            configurable: true
        });
        GamePlayerVO.prototype.xpActive = function () {
            this._xpVO.active();
        };
        GamePlayerVO.prototype.xpSetValue3_4 = function () {
            this._xpVO.setValue3_4();
        };
        GamePlayerVO.prototype.xpSetValue1_2 = function () {
            this._xpVO.setValue1_2();
        };
        GamePlayerVO.prototype.xpSetValueMax = function () {
            this._xpVO.setValueMax();
        };
        Object.defineProperty(GamePlayerVO.prototype, "xpProgress", {
            get: function () {
                return this._xpVO ? this._xpVO.progress : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "xpValue", {
            get: function () {
                return this._xpVO ? this._xpVO.value : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "xpMaxValue", {
            get: function () {
                return this._xpVO ? this._xpVO.maxValue : 100;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "xpMaxUseTime", {
            get: function () {
                return this._xpVO ? this._xpVO.maxUseTime : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "xpLastTime", {
            get: function () {
                return this._xpVO ? this._xpVO.lastUseTime : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "isXpFulled", {
            get: function () {
                return this._xpVO ? this._xpVO.fulled : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "isXpActive", {
            get: function () {
                return this._xpVO ? this._xpVO.actived : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "xpVO", {
            get: function () {
                return this._xpVO;
            },
            enumerable: true,
            configurable: true
        });
        /**监听Xp值变化 */
        GamePlayerVO.prototype.onXpValueChange = function (caller, method) {
            if (this._xpVO)
                this._xpVO.addEventListener(vo.GamePlayerXpVO.VALUE_CHANGE, method, caller);
        };
        GamePlayerVO.prototype.offXpValueChange = function (caller, method) {
            if (this._xpVO)
                this._xpVO.removeEventListener(vo.GamePlayerXpVO.VALUE_CHANGE, method, caller);
        };
        /**监听Xp冷却时间变化 */
        GamePlayerVO.prototype.onXpUseTimeChange = function (caller, method) {
            if (this._xpVO)
                this._xpVO.addEventListener(vo.GamePlayerXpVO.USETIME_CHANGE, method, caller);
        };
        GamePlayerVO.prototype.offXpUseTimeChange = function (caller, method) {
            if (this._xpVO)
                this._xpVO.removeEventListener(vo.GamePlayerXpVO.USETIME_CHANGE, method, caller);
        };
        /**监听Xp激活状态变化 */
        GamePlayerVO.prototype.onXpActiveChange = function (caller, method) {
            if (this._xpVO)
                this._xpVO.addEventListener(vo.GamePlayerXpVO.ACTIVE_CHANGE, method, caller);
        };
        GamePlayerVO.prototype.offXpActiveChange = function (caller, method) {
            if (this._xpVO)
                this._xpVO.removeEventListener(vo.GamePlayerXpVO.ACTIVE_CHANGE, method, caller);
        };
        GamePlayerVO.prototype.addEquip = function (id, pos) {
            var equipVO = vo.fromPool(vo.EquipVO);
            equipVO.create(id, pos);
            this._equipList.add(equipVO);
        };
        GamePlayerVO.prototype.addSkill = function (skill, level) {
            if (level === void 0) { level = 1; }
            var skillVO = vo.fromPool(vo.SkillVO, Templates.getTemplateById(templates.Map.SKILLNEW, skill));
            this.skillList.add(skillVO);
        };
        // public updataAgreement(index: number, data: n.ProtoPetContractData): void {
        // 	this._playerAgreement.setContractlistbyIndex(index, data);
        // 	GameModels.pet.updataState();
        // 	if (this._agreementChangeHandler) {
        // 		this._agreementChangeHandler.run();
        // 	}
        // }
        // public initAgreement(data: Array<n.ProtoPetContractData>): void {
        // 	let playerAgreementVO: vo.PlayerAgreementVO = <vo.PlayerAgreementVO>vo.fromPool(vo.PlayerAgreementVO);
        // 	playerAgreementVO.decode(data)
        // 	this._playerAgreement = playerAgreementVO;
        // }
        // /**角色的契约**/
        // public get agreementVO(): vo.PlayerAgreementVO {
        // 	return this._playerAgreement;
        // }
        // private _agreementChangeHandler: utils.Handler;
        // public onAgreementChange(caller: any, method: Function) {
        // 	this.offAgreementChange();
        // 	this._agreementChangeHandler = utils.Handler.create(caller, method, null, false);
        // }
        // public offAgreementChange() {
        // 	if (this._agreementChangeHandler) {
        // 		this._agreementChangeHandler.recover();
        // 		this._agreementChangeHandler = null;
        // 	}
        // }
        GamePlayerVO.prototype.syncPetHp = function (pos, v) {
            this._petList.syncHp(pos, v);
        };
        GamePlayerVO.prototype.syncRelifeCount = function (count) {
            this._relifeCount = count;
        };
        /**测试写死扣1点血 */
        GamePlayerVO.prototype.hpHurted = function (value, target) {
            if (!this._damgeEnabled)
                return 0;
            if (this._hp == 0)
                return 0;
            this._hp -= 1;
            this.updateHp(target);
            return 1;
        };
        Object.defineProperty(GamePlayerVO.prototype, "relifeCount", {
            /**复活次数 */
            get: function () {
                return this._relifeCount;
            },
            /**复活次数 */
            set: function (v) {
                this._relifeCount = v;
            },
            enumerable: true,
            configurable: true
        });
        /*private __hp:number = 0;
        public set _hp(v:number)
        {
            this.__hp = v;
        }
        public get _hp():number
        {
            return this.__hp;
        }
        */
        /**
         * 更新经验
         * @param value 当前加了多少
         * @param total 一共多少
         */
        GamePlayerVO.prototype.updateExp = function (value, total) {
            this._serverData[TypeProperty.Exp] = total;
            this.notifyPropertyChange(TypeProperty.Exp, value);
        };
        GamePlayerVO.prototype.updateMaxExp = function () {
            if (this.level == 0)
                return;
            var tem = Templates.getTemplateById(templates.Map.HEROLV, this.level);
            if (!tem)
                return;
            this._maxExp = tem.needExp;
        };
        GamePlayerVO.prototype.updateProperty = function (proto) {
            // logger.log("属性更新:", TypeProperty.getName(proto.Type), proto.Type, ":", proto.Value);
            if (proto.Type == TypeProperty.Level) {
                if (this._oldLevel != proto.Value) {
                    this._oldLevel = proto.Value;
                    logger.log("等级发生变化=", proto.Value);
                    this._serverData[proto.Type] = proto.Value;
                    this.updateMaxExp();
                    this.notifyPropertyChange(proto.Type, proto.Value);
                }
            }
            else if (proto.Type == TypeProperty.HEADICON) {
                this._headIcon = proto.Value;
                this.notifyPropertyChange(proto.Type, proto.Value);
            }
            else {
                this._serverData[proto.Type] = proto.Value;
                if (proto.Type == TypeProperty.Hp) {
                    this._hp = proto.Value;
                }
                this.notifyPropertyChange(proto.Type, proto.Value);
            }
        };
        GamePlayerVO.prototype.updatePropertyValue = function (prototype, value) {
            // logger.log("属性更新:", TypeProperty.getName(prototype), prototype, ":", value);
            this._serverData[prototype] = value;
            if (prototype == TypeProperty.Hp) {
                this._hp = value;
            }
            this.notifyPropertyChange(prototype, value);
        };
        GamePlayerVO.prototype.nPlayerNameUpdate = function (data) {
            this._name = data.NewName;
            if (this._nameChangeHandler) {
                this._nameChangeHandler.run();
            }
        };
        /**监听名字变化 */
        GamePlayerVO.prototype.onNameChange = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offNameChange();
            this._nameChangeHandler = utils.Handler.create(caller, method, args, false);
        };
        /**移除监听名字变化 */
        GamePlayerVO.prototype.offNameChange = function () {
            if (this._nameChangeHandler) {
                this._nameChangeHandler.recover();
                this._nameChangeHandler = null;
            }
        };
        GamePlayerVO.prototype.nCharacterPropertyUpdate = function (data) {
            for (var i = 0, len = data.Properties.length; i < len; i++) {
                this.updateProperty(data.Properties[i]);
            }
        };
        /**获取属性 */
        GamePlayerVO.prototype.getProperty = function (type) {
            return this._serverData[type] ? this._serverData[type] : 0;
        };
        /**更新外观数据 */
        GamePlayerVO.prototype.updateAvatar = function (pos, modelId) {
            switch (pos) {
                case TypeEquip.CLOTHES:
                    this._clothesAvatarId = modelId;
                    break;
                case TypeEquip.WEAPON:
                    this._weaponAvatarId = modelId;
                    break;
                default: return;
            }
            if (this._avatarChangeHandler) {
                this._avatarChangeHandler.runWith(pos);
            }
        };
        /**监听外观变化 */
        GamePlayerVO.prototype.onAvatarChange = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offAvatarChange();
            this._avatarChangeHandler = utils.Handler.create(caller, method, args, false);
        };
        /**移除监听外观变化 */
        GamePlayerVO.prototype.offAvatarChange = function () {
            if (this._avatarChangeHandler) {
                this._avatarChangeHandler.recover();
                this._avatarChangeHandler = null;
            }
        };
        /**获取技能*/
        GamePlayerVO.prototype.getSkillVO = function (id) {
            return this._skillList.getVOById(id);
        };
        /**获取无双技能 */
        //public get WuShuangSkillVo(): vo.GamePlayerXpVO {
        //	return this._xpList;
        //}
        /**
         * 获取当前合体武将
         */
        GamePlayerVO.prototype.getCurrentMergePet = function () {
            return this._petList.getCurrentMergePet();
        };
        Object.defineProperty(GamePlayerVO.prototype, "isFight", {
            /**是否战斗中 实时场景用到 */
            get: function () {
                return this._isFight;
            },
            set: function (v) {
                this._isFight = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "petList", {
            get: function () {
                return this._petList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "equipList", {
            get: function () {
                return this._equipList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "gender", {
            /**性别*/
            get: function () {
                return this._gender;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "job", {
            /**职业*/
            get: function () {
                return this._job;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "headIcon", {
            /**头像*/
            get: function () {
                return this._headIcon;
            },
            /**头像*/
            set: function (v) {
                this._headIcon = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "foolTime", {
            // /**阵型羁绊计*/
            // public get campJibanRefId(): any {
            // 	return this.getProperty(TypeProperty.CampJibanRefId);
            // }
            // public get campJibanTemp(): templates.campJiban {
            // 	return Templates.getTemplateById(templates.Map.CAMPJIBAN, this.getProperty(TypeProperty.CampJibanRefId));
            // }
            // public get campJibanProperty(): string {
            // 	return this.campJibanTemp ? this.campJibanTemp.properties : "";
            // }
            /**征收时间*/
            get: function () {
                return this.getProperty(TypeProperty.FOOD_TIME);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "weaponResId", {
            /**武器*/
            get: function () {
                return this.getProperty(TypeProperty.WEAPON_MODLEID);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "clothResId", {
            /**衣服*/
            get: function () {
                return this.getProperty(TypeProperty.CLOTH_MODLEID);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "gold", {
            /**银两*/
            get: function () {
                return this.getProperty(TypeProperty.Gold);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "diamonds", {
            /**元宝*/
            get: function () {
                return this.getProperty(TypeProperty.UnbindedGold);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "guessCoin", {
            /**竞猜币*/
            get: function () {
                return this.getProperty(TypeProperty.TOPBATTLE_BETCOIN);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "liangcao", {
            /**粮草*/
            get: function () {
                return this.getProperty(TypeProperty.LIANGCAO);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "shouhun", {
            /**兽魂*/
            get: function () {
                return this.getProperty(TypeProperty.SHOUHUN);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "jungong", {
            /**军功*/
            get: function () {
                return this.getProperty(TypeProperty.JUNGONG);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "wenguan", {
            /**文官*/
            get: function () {
                return this.getProperty(TypeProperty.wenGuanId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "totalRecharge", {
            /**充值总金额 */
            get: function () {
                return this.getProperty(TypeProperty.TOTAL_RECHARGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "todayRechargeTotal", {
            /**当天充值总金额 */
            get: function () {
                return this.getProperty(TypeProperty.TODAY_RECHARGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "mojing", {
            // /**首冲的总金额 */
            // public get firstRechargeTotal(): number {
            // 	return this.getProperty(TypeProperty.TOTAL_FIRST_RECHARGE);
            // }
            /**魔晶*/
            get: function () {
                return this.getProperty(TypeProperty.MOJING_ID);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "serverId", {
            /**区服信息 */
            get: function () {
                return this._serverId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "dragonDebris", {
            // /**阵营身份*/
            // public get unionIdentity(): number {
            // 	return this.getProperty(TypeProperty.UnionOfficialId);
            // }
            /**帝龙碎片*/
            get: function () {
                return this.getProperty(TypeProperty.DragonDebris) || 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "fightValue", {
            /**角色战力 */
            get: function () {
                return this.getProperty(TypeProperty.FightValue);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "totalFightValue", {
            /**角色战力加武将战力 */
            get: function () {
                return this.getProperty(TypeProperty.ALLFIGHT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "zhuanShenLevel", {
            /**转生阶级*/
            get: function () {
                return this.getProperty(TypeProperty.ZhuanShenLevel);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "level", {
            /**等级*/
            get: function () {
                return this.getProperty(TypeProperty.Level);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "battleSpeedRate", {
            /**战斗加速*/
            get: function () {
                return this.getProperty(TypeProperty.BattleSettingId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "shengwang", {
            /**声望*/
            get: function () {
                return this.getProperty(TypeProperty.SHENGWANG);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "taofa", {
            /**讨伐积分*/
            get: function () {
                return this.getProperty(TypeProperty.TAOFA);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "yuanzheng", {
            /**远征积分*/
            get: function () {
                return this.getProperty(TypeProperty.YUANZHGENG);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "leijidenglu", {
            /**累计登陆的天数 */
            get: function () {
                return this.getProperty(TypeProperty.LEIJIDENGLU_DATA);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "wuguanLevel", {
            /**武官 */
            get: function () {
                return this.getProperty(TypeProperty.WUGUAN_ID);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "horseAvatarId", {
            /**骑乘的坐骑 */
            get: function () {
                return this.getProperty(TypeProperty.FASHION_HORSE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "clothesAvatarId", {
            /**衣服外观 */
            get: function () {
                return this._clothesAvatarId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "weaponAvatarId", {
            /**武器外观 */
            get: function () {
                return this._weaponAvatarId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "chapterId", {
            /**关卡 服务器推送 */
            get: function () {
                return this.getProperty(TypeProperty.Chapter);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "exp", {
            /**人物当前经验*/
            get: function () {
                return this.getProperty(TypeProperty.Exp);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "maxExp", {
            /**人物当前升级所需经验*/
            get: function () {
                return this._maxExp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "legionId", {
            get: function () {
                return this._legionId;
            },
            /**工会Id */
            set: function (v) {
                this._legionId = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "unionId", {
            get: function () {
                return this.getProperty(TypeProperty.UNIONID);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "handBookExp", {
            // /**出站战骑*/
            // public get zhanqiStep(): number {
            // 	return this.getProperty(TypeProperty.CHUZHANZHANQI);
            // }
            /**图鉴身上有的经验*/
            get: function () {
                return this.getProperty(TypeProperty.HANDBOOK_EXP);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "wuShuangId", {
            /**无双 */
            get: function () {
                return this.getProperty(TypeProperty.CHUZHANWUSHUANG);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "yudiJifen", {
            /**御敌积分 */
            get: function () {
                return this.getProperty(TypeProperty.YUDIJIFEN);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "setAotuID", {
            /**设置 */
            get: function () {
                return this.getProperty(TypeProperty.SET_AUTO_ID);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "ZZScore", {
            /**资质*/
            get: function () {
                return this.getProperty(TypeProperty.UNACTIVEZZPOINT_ID);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "cross_zz_Id", {
            get: function () {
                return this.getProperty(TypeProperty.Cross_zz_Id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "mdef_zz_Id", {
            get: function () {
                return this.getProperty(TypeProperty.Mdef_zz_Id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "pdef_zz_Id", {
            get: function () {
                return this.getProperty(TypeProperty.Pdef_zz_Id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "hp_zz_Id", {
            get: function () {
                return this.getProperty(TypeProperty.Hp_zz_Id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "att_zz_Id", {
            get: function () {
                return this.getProperty(TypeProperty.Att_zz_Id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "cross_zz_from_Id", {
            get: function () {
                return this.getProperty(TypeProperty.Cross_zz_from_Id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "mdef_zz_from_Id", {
            get: function () {
                return this.getProperty(TypeProperty.Mdef_zz_from_Id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "pdef_zz_from_Id", {
            get: function () {
                return this.getProperty(TypeProperty.Pdef_zz_from_Id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "hp_zz_from_Id", {
            get: function () {
                return this.getProperty(TypeProperty.Hp_zz_from_Id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "att_zz_from_Id", {
            get: function () {
                return this.getProperty(TypeProperty.Att_zz_from_Id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "roleLvTemplates", {
            get: function () {
                this._roleLvTemplates = Templates.getTemplateById(templates.Map.HEROLV, this.level);
                return this._roleLvTemplates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "bingFa2CreateCnt", {
            /**2品质兵法重铸次数 */
            get: function () {
                return this.getProperty(TypeProperty.BINGFA2_CREATE_CNT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "bingFa3CreateCnt", {
            /**3品质兵法重铸次数 */
            get: function () {
                return this.getProperty(TypeProperty.BINGFA3_CREATE_CNT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "bingFa4CreateCnt", {
            /**4品质兵法重铸次数 */
            get: function () {
                return this.getProperty(TypeProperty.BINGFA4_CREATE_CNT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "bingFa5CreateCnt", {
            /**5品质兵法重铸次数 */
            get: function () {
                return this.getProperty(TypeProperty.BINGFA5_CREATE_CNT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "bingFa6CreateCnt", {
            /**6品质兵法重铸次数 */
            get: function () {
                return this.getProperty(TypeProperty.BINGFA6_CREATE_CNT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "bingFa7CreateCnt", {
            /**7品质兵法重铸次数 */
            get: function () {
                return this.getProperty(TypeProperty.BINGFA7_CREATE_CNT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "xpExperiencetTime", {
            /**xp体验*/
            get: function () {
                return this.getProperty(TypeProperty.XP_EXPERIENCET_TIME);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "master", {
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "hp", {
            /**生命 */
            get: function () {
                return this._hp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "hpMax", {
            /**生命上限 */
            get: function () {
                return this.getProperty(TypeProperty.MaxHp);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "attack", {
            /**攻击 */
            get: function () {
                return this.getProperty(TypeProperty.PAtk);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "def", {
            /**防御 用以攻击时计算用*/
            get: function () {
                return this._job == TypeJob.ZHAN ? this.pDef : this.mDef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "pDef", {
            /**物防 */
            get: function () {
                return this.getProperty(TypeProperty.PDef);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "mDef", {
            /**法防 */
            get: function () {
                return 0; //this.getProperty(TypeProperty.MDef);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "ignoreDef", {
            /**穿透 用以攻击时计算用*/
            get: function () {
                return this._job == TypeJob.ZHAN ? this.ignorePDef : this.ignoreMDef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "ignorePDef", {
            /**物防穿透 */
            get: function () {
                var add = 0;
                for (var _i = 0, _a = this._petList.upFormats; _i < _a.length; _i++) {
                    var petVO = _a[_i];
                    if (petVO && petVO.isMerged && !petVO.stateDead) {
                        add += petVO.ignorePDef * 0.5;
                    }
                }
                return this.getProperty(TypeProperty.IgnorePDef) + add;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "ignoreMDef", {
            /**法防穿透 */
            get: function () {
                // var add: number = 0;
                // for (var petVO of this._petList.upFormats) {
                // 	if (petVO && petVO.isMerged && !petVO.stateDead) {
                // 		add += petVO.ignoreMDef * 0.5
                // 	}
                // }
                // return this.getProperty(TypeProperty.IgnoreMDef) + add;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "crit", {
            /**暴击 */
            get: function () {
                return this.getProperty(TypeProperty.Crit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "critInjure", {
            /**暴击伤害 */
            get: function () {
                return this.getProperty(TypeProperty.CritInjure);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "ignoreCrit", {
            /**抗暴 */
            get: function () {
                return this.getProperty(TypeProperty.IgnoreCrit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "ignoreCritInjure", {
            /**暴击抵抗 */
            get: function () {
                return this.getProperty(TypeProperty.IgnoreCritInjure);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "hit", {
            /**命中 */
            get: function () {
                return this.getProperty(TypeProperty.Hit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "dodge", {
            /**闪避 */
            get: function () {
                return this.getProperty(TypeProperty.Dodge);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "heal", {
            /**治疗 */
            get: function () {
                return this.getProperty(TypeProperty.Heal);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "beHeal", {
            /**受疗 */
            get: function () {
                return this.getProperty(TypeProperty.BeHeal);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "ctrl", {
            /**控制 */
            get: function () {
                return this.getProperty(TypeProperty.Ctrl);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "ignoreCtrl", {
            /**抗控 */
            get: function () {
                return this.getProperty(TypeProperty.IgnoreCtrl);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "injureAdd", {
            /**伤害加深 */
            get: function () {
                return this.getProperty(TypeProperty.InjureAdd) + this._blessDamegeAdd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "injureIgnore", {
            /**伤害减免 */
            get: function () {
                return this.getProperty(TypeProperty.InjureIgnore) + this._blessDamegeReduce;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "healHP", {
            /**生命回复 */
            get: function () {
                return 0; //this.getProperty(TypeProperty.HealHP);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "vip", {
            /**VIP等级*/
            get: function () {
                return this.getProperty(TypeProperty.VIP_LEVEL);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerVO.prototype, "vpValue", {
            /**疲劳值*/
            get: function () {
                return this.getProperty(TypeProperty.VP_VALUE);
            },
            enumerable: true,
            configurable: true
        });
        return GamePlayerVO;
    }(vo.GameSmartVO));
    vo.GamePlayerVO = GamePlayerVO;
    __reflect(GamePlayerVO.prototype, "vo.GamePlayerVO");
})(vo || (vo = {}));
