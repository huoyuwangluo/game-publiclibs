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
    var GamePetVO = (function (_super) {
        __extends(GamePetVO, _super);
        function GamePetVO() {
            var _this = _super.call(this, TypeActor.PET) || this;
            _this._skillList = new vo.SkillListVO();
            _this._serverData = {};
            _this._fightValue = 0;
            _this._baseFightValue = 0;
            _this._ZZList = [];
            _this._bingFaVOList = [];
            _this._state = 0;
            _this._isFirst = 0;
            _this._come = 0;
            _this._star = 0;
            _this._isLock = 0;
            _this._isGongMing = 0;
            _this._hongYanSkill = null;
            _this._shenBingSkill = null;
            return _this;
        }
        Object.defineProperty(GamePetVO.prototype, "groupId", {
            get: function () {
                return this._groupId;
            },
            set: function (v) {
                this._groupId = v;
            },
            enumerable: true,
            configurable: true
        });
        /**更新pet属性 */
        GamePetVO.prototype.updateProperty = function (proto) {
            this._serverData[proto.Type] = proto.Value;
            this.notifyPropertyChange(proto.Type, proto.Value);
        };
        /**获取pet属性 */
        GamePetVO.prototype.getProperty = function (type) {
            return this._serverData[type];
        };
        Object.defineProperty(GamePetVO.prototype, "property", {
            /**获取pet属性 */
            get: function () {
                return this._serverData;
            },
            enumerable: true,
            configurable: true
        });
        /**更新pet属性列表 */
        GamePetVO.prototype.updataPropertyList = function (data, FightValue, BaseFightValue, state) {
            this._fightValue = FightValue;
            this._baseFightValue = BaseFightValue;
            this._state = state;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var property = data_1[_i];
                this.updateProperty(property);
            }
        };
        /**更新petRank */
        GamePetVO.prototype.updataPetRank = function (data) {
            // this._isBestPet = data.IsBestPet > 0 ? true : false;
            // this.dispatchEventWith(GamePetVO.PET_RANK_UPDATE);
        };
        GamePetVO.prototype.initialize = function (data) {
            _super.prototype.initialize.call(this, data);
            if (data instanceof n.ProtoPet) {
                // if (data.PetRefId == "13063" || data.PetRefId == "13061" || data.PetRefId == "13056" || data.PetRefId == "13055") {
                // 	logger.log("11111111111");
                // }
                this.updataPropertyList(data.PropertyList, data.FightPower, data.BaseFightPower, data.Status);
                this._template = Templates.getTemplateById(templates.Map.GENERAL, data.PetRefId);
                var avatarStrs = this._template.model.split(";");
                this._avatarList = [];
                if (avatarStrs) {
                    for (var i = 0; i < avatarStrs.length; i++) {
                        var array = avatarStrs[i].split("_");
                        this._avatarList[parseInt(array[0])] = array[1];
                    }
                }
                this._ZZList = data.ZZ_List;
                this._fightValue = data.FightPower;
                this._baseFightValue = data.BaseFightPower;
                this._uid = data.PetId;
                this.updateSceneInfo(data.SceneInfo);
                this._refId = data.PetRefId;
                this._state = data.Status;
                this._shenBingId = data.ShenBingCfgId;
                this._shenBingLv = data.ShenBingLv;
                this._isInBattle = data.IsInBattle > 0 ? true : false;
                this._talentStates = [];
                this._star = data.Star;
                this._lv = data.Level;
                this._isLock = data.IsLock;
                this._isGongMing = data.IsGongMing;
                this._petLvTemplates = Templates.getTemplateById(templates.Map.GENERALLV, data.Level);
                this._generalBreakTemp = Templates.getTemplateByTwoProperty(templates.Map.GENERALBREAK, "quality", this._template.quality, "star", data.Star);
                for (var i = 0; i < data.BingFaList.length; i++) {
                    var listVo = vo.fromPool(vo.GamePetBingFaVO, data.BingFaList[i]);
                    this._bingFaVOList.push(listVo);
                }
                if (data.ShenBingCfgId != 0) {
                    var shenbingTemp = Templates.getTemplateById(templates.Map.SMITHYSHENBING, data.ShenBingCfgId);
                    var talentArr = shenbingTemp.starTalent.split(";");
                    var shenbingLv = data.ShenBingLv < 1 ? 1 : data.ShenBingLv;
                    for (var i = 0; i < talentArr.length; i++) {
                        if (shenbingLv == parseInt(talentArr[i].split("_")[0])) {
                            var skillId = parseInt(talentArr[i].split("_")[1]);
                            break;
                        }
                    }
                    if (!skillId) {
                        logger.log("配置找不到=========", data.ShenBingLv);
                    }
                    var skillVO = vo.fromPool(vo.SkillVO);
                    skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, skillId), 0);
                    this._shenBingSkill = skillVO;
                }
                if (data.HongYanCfgId != 0) {
                    var hongYanTemp = Templates.getTemplateById(templates.Map.HONGYAN, data.HongYanCfgId.toString());
                    var hySkillId = hongYanTemp.skillId;
                    if (!hySkillId) {
                        logger.log("配置找不到=========", data.HongYanCfgId);
                    }
                    var skillVO = vo.fromPool(vo.SkillVO);
                    skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, hySkillId), 0, hongYanTemp.skillOpenLv, data.HongYanLevel);
                    this._hongYanSkill = skillVO;
                }
                var skillStr = null;
                if (this._generalBreakTemp != null) {
                    skillStr = this._generalBreakTemp.skillLv.split(";");
                }
                else {
                    skillStr = [];
                }
                for (var i = 0; i < data.SkillList.length; i++) {
                    // logger.log("武将技能列表",data.skillList);
                    var skillRefId = parseInt(data.SkillList[i].SkillRedId);
                    if (data.SkillList[i] && data.SkillList[i].SkillRedId != "" && data.SkillList[i].SkillRedId != "-1") {
                        if (skillStr[i]) {
                            skillRefId = skillRefId - 1 + parseInt(skillStr[i]);
                        }
                        var skillVO = vo.fromPool(vo.SkillVO);
                        skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, skillRefId), data.SkillList[i].PosId, data.SkillList[i].NeedPlayerLv, data.Level);
                        this._skillList.add(skillVO);
                    }
                }
            }
            else if (data instanceof templates.taskRobot) {
                this._avatarList = null;
                this._template = data;
                var skillVO = vo.fromPool(vo.SkillVO);
                skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, data.skillId), 0);
                this._skillList.add(skillVO);
                this.resetState();
            }
            //super.initialize.apply(data);
            //GameModels.timer.addHeart(this, this.heartHandler);
            //this.resetState();
        };
        GamePetVO.prototype.setSceneObjectInfo = function (info) {
            //以下是场景信息
            //this._hp = info.HP;
            this.direct = info.Direct;
            this.petStar = info.Star;
            this.petCountry = info.Country;
            this.soldierType = info.SoldierType;
            //if (info.HPMax <= 0 || info.PosX <= 0 || info.PosY <= 0) return;
            this.battleHp = info.HP;
            this.battleHpMax = info.HPMax;
            this.mpMax = info.MPMax;
            this.mp = info.MP;
            this.tileX = info.PosX;
            this.tileY = info.PosY;
            this._isDead = info.StateDead == 1;
        };
        GamePetVO.prototype.reset = function () {
            //GameModels.timer.removeHeart(this, this.heartHandler);
            this._template = null;
            // this._power = null;
            this._uid = null;
            this._hp = 0;
            this._master = null;
            _super.prototype.reset.call(this);
        };
        GamePetVO.prototype.resetState = function () {
            this.syncHp(this.battleHp, this.battleHpMax);
            this.syncMp(this.mp);
            this.removeAllBuff();
            this._isDead = false;
            //this._target = null;
            this.setMainTarget(null);
            this.refreshSupportState();
        };
        Object.defineProperty(GamePetVO.prototype, "bingFaVOList", {
            get: function () {
                return this._bingFaVOList;
            },
            enumerable: true,
            configurable: true
        });
        GamePetVO.prototype.getBingFaVOListByPos = function (pos) {
            for (var i = 0; i < this._bingFaVOList.length; i++) {
                if (this._bingFaVOList[i].pos == pos) {
                    return this._bingFaVOList[i];
                }
            }
            return null;
        };
        GamePetVO.prototype.removeBingFa = function () {
            for (var i = 0; i < this._bingFaVOList.length; i++) {
                if (this._bingFaVOList[i])
                    vo.toPool(this._bingFaVOList[i]);
            }
            this._bingFaVOList.length = 0;
        };
        Object.defineProperty(GamePetVO.prototype, "hongYanSkill", {
            get: function () {
                return this._hongYanSkill;
            },
            set: function (v) {
                this._hongYanSkill = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "shenBingSkill", {
            get: function () {
                return this._shenBingSkill;
            },
            set: function (v) {
                this._shenBingSkill = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "zzList", {
            get: function () {
                return this._ZZList;
            },
            set: function (v) {
                this._ZZList = v;
            },
            enumerable: true,
            configurable: true
        });
        GamePetVO.prototype.getZZListCurValueByType = function (type) {
            for (var i = 0; i < this._ZZList.length; i++) {
                if (this._ZZList[i].Type == type) {
                    return this._ZZList[i].CurValue;
                }
            }
            return 0;
        };
        Object.defineProperty(GamePetVO.prototype, "petMaxZZ", {
            get: function () {
                var num = [this.template.growCROSS, /*this.template.growMDEF,*/ this.template.growHP, this.template.growATT, this.template.growDEF];
                num.sort(function (a, b) {
                    return b - a;
                });
                return num[0] * 2.6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "isHashFourSkill", {
            // public getZzListByTemplates(index: number): number {
            // 	var num: number[] = [this.template.growCROSS, this.template.growMDEF, this.template.growHP, this.template.growATT, this.template.growDEF];
            // 	return num[index];
            // }
            get: function () {
                var skillArr = this.template.skill.split(";");
                return skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1";
            },
            enumerable: true,
            configurable: true
        });
        GamePetVO.prototype.resetMergeState = function () {
            if (this._posVO)
                this._posVO.resetMergeState();
        };
        GamePetVO.prototype.setMaster = function (playerVO) {
            this._master = playerVO;
            this._groupId = this._master.uid;
        };
        GamePetVO.prototype.heartHandler = function () {
            if (this.healHP) {
                this.hpRecover(this.healHP);
            }
        };
        Object.defineProperty(GamePetVO.prototype, "lv", {
            get: function () {
                return this._lv;
            },
            set: function (v) {
                this._lv = v;
                this._petLvTemplates = Templates.getTemplateById(templates.Map.GENERALLV, this._lv);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "petLvTemplates", {
            get: function () {
                return this._petLvTemplates;
            },
            enumerable: true,
            configurable: true
        });
        /**同步血量 */
        /*public syncHp(v: number, max: number = 0) {
            if (max) {
                this._posVO.updatePropertyByType(TypeProperty.MaxHP, max);
            }
            super.syncHp(v, max);
        }*/
        GamePetVO.prototype.updatePosProperty = function (data, FightValue) {
            this._posVO.updataPropertyList(data, FightValue);
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var property = data_2[_i];
                if (property.Type == TypeProperty.MaxHp) {
                    this._hp = property.Value;
                }
                this.notifyPropertyChange(property.Type, property.Value);
            }
        };
        /**初始化上阵数据 */
        GamePetVO.prototype.initFormatData = function (data) {
            if (data instanceof vo.GamePetPosVO) {
                this._posVO = data;
                this._hp = this._posVO.hpMax;
            }
            else {
                if (!this._posVO) {
                    this._posVO = vo.fromPool(vo.GamePetPosVO);
                }
                this._posVO.decodeRobot(data.pos, data.uid);
                this._hp = this._posVO.hpMax;
            }
            //this.isSupport = this._posVO.position == 4;
        };
        /**清空上阵数据 */
        GamePetVO.prototype.clearForamtData = function () {
            if (this._posVO) {
                this._posVO = null;
            }
        };
        Object.defineProperty(GamePetVO.prototype, "isFormat", {
            /**是否在阵上 */
            get: function () {
                return !!this._posVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "isInBattle", {
            /**是否在阵上 */
            get: function () {
                return this._isInBattle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "formatData", {
            /**上阵数据 */
            get: function () {
                return this._posVO;
            },
            enumerable: true,
            configurable: true
        });
        /**刷新武将援助状态 */
        GamePetVO.prototype.refreshSupportState = function () {
            this.isSupport = false;
            /*if (this.formatData && this.formatData.position == 4) {
                this.isSupport = true;
            }
            else {
                this.isSupport = false;
            }*/
        };
        GamePetVO.prototype.updateMergedState = function (bool) {
            this._posVO.updateMergedState(bool);
            if (this._mergeHandlers)
                this._mergeHandlers.runWith(this);
        };
        /**监听合体状态变化 */
        GamePetVO.prototype.onMergeStateChange = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._mergeHandlers)
                this._mergeHandlers = new utils.Handlers(false);
            this._mergeHandlers.add(caller, method, args);
        };
        GamePetVO.prototype.offMergeStateChange = function (caller, method) {
            if (this._mergeHandlers) {
                this._mergeHandlers.remove(caller, method);
            }
        };
        /**监听援助状态变化 */
        GamePetVO.prototype.onSupportStateChange = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._supportHandlers)
                this._supportHandlers = new utils.Handlers(false);
            this._supportHandlers.add(caller, method, args);
        };
        GamePetVO.prototype.offSupportStateChange = function (caller, method) {
            if (this._supportHandlers) {
                this._supportHandlers.remove(caller, method);
            }
        };
        Object.defineProperty(GamePetVO.prototype, "isMerged", {
            /**是否已合体*/
            get: function () {
                return this._posVO ? this._posVO.isMerged : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "isMergeCding", {
            get: function () {
                return this._posVO ? this._posVO.isMergeCding : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "mergeCd", {
            get: function () {
                return this._posVO ? this._posVO.mergeCd : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "isSupport", {
            get: function () {
                return this._isSupport;
            },
            set: function (v) {
                if (this._isSupport != v) {
                    this._isSupport = v;
                    if (this._supportHandlers)
                        this._supportHandlers.runWith(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "position", {
            get: function () {
                return this._posVO ? this._posVO.position : -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "master", {
            get: function () {
                return this._master;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "state", {
            /**1为在圣旨任务中*/
            get: function () {
                return this._state;
            },
            set: function (v) {
                this._state = v;
            },
            enumerable: true,
            configurable: true
        });
        /**获取技能*/
        GamePetVO.prototype.getSkillVO = function (id) {
            return this._skillList.getVOById(id);
        };
        /**设置某个位置的技能 */
        GamePetVO.prototype.updateSkillByPos = function (skillData, pos) {
            if (this._skillList.getVOByPos(pos)) {
                return this._skillList.updatePos(pos, Templates.getTemplateById(templates.Map.SKILLNEW, skillData.SkillRedId));
            }
            var skillVO = skillVO = vo.fromPool(vo.SkillVO);
            skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, skillData.SkillRedId), pos);
            this._skillList.add(skillVO);
            return skillVO;
        };
        /**更新进阶信息 */
        GamePetVO.prototype.updatePetLevelOrStar = function (data) {
            if (this._star < data.Star) {
                this.dispatchEventWith(vo.GamePetVO.STAR_LEVEL_UPDATE);
            }
            if (this._lv < data.Level && data.PetRefId != "13000" && mg.uiManager.isOpen(dialog.role.RoleMainDialog)) {
                var skill = this.getLockSkillBuyLevel(data.Level);
                if (skill) {
                    mg.alertManager.showAlert(PetSkillLockTips, true, true, skill);
                }
            }
            this._star = data.Star;
            this._lv = data.Level;
            this._ZZList = data.ZZ_List;
            this._generalBreakTemp = Templates.getTemplateByTwoProperty(templates.Map.GENERALBREAK, "quality", this._template.quality, "star", data.Star);
        };
        GamePetVO.prototype.removeSkillByPos = function (pos) {
            var skillVO = this._skillList.getVOByPos(pos);
            if (skillVO) {
                vo.toPool(this._skillList.remove(skillVO));
            }
        };
        GamePetVO.prototype.removeAllSkill = function () {
            if (this._skillList) {
                var skillVOArr = this._skillList.list;
                var i = 0;
                while (skillVOArr.length > 0) {
                    var skillVO = skillVOArr[0];
                    vo.toPool(this._skillList.remove(skillVO));
                    i++;
                    if (i > 5)
                        break;
                }
            }
        };
        GamePetVO.prototype.getLockSkillBuyLevel = function (lv) {
            var skillvo = null;
            var skillVOArr = this._skillList.list;
            for (var _i = 0, skillVOArr_1 = skillVOArr; _i < skillVOArr_1.length; _i++) {
                var skill = skillVOArr_1[_i];
                if (lv >= skill.needLv && skill.isLock) {
                    skillvo = skill;
                    break;
                }
            }
            return skillvo;
        };
        Object.defineProperty(GamePetVO.prototype, "shenBingId", {
            get: function () {
                return this._shenBingId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "shenBingLv", {
            get: function () {
                return this._shenBingLv;
            },
            set: function (v) {
                this._shenBingLv = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "refId", {
            get: function () {
                return this._refId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "country", {
            get: function () {
                return this._template.country;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "fightValue", {
            get: function () {
                return this._fightValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "baseFightValue", {
            get: function () {
                return this._baseFightValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "fightType", {
            /*获取位置1--前排2--后排*/
            get: function () {
                var type = 0;
                if (this._template instanceof templates.general) {
                    if (this._template.corps <= 3) {
                        type = 1;
                    }
                    else {
                        type = 2;
                    }
                }
                return type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "headIcon", {
            get: function () {
                return this._template.model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "star", {
            get: function () {
                return this._star;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "isLock", {
            /**0--未锁，1--已锁 */
            get: function () {
                return this._isLock;
            },
            set: function (v) {
                this._isLock = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "isGongMing", {
            get: function () {
                return this._isGongMing;
            },
            /**0--未共鸣，1--已共鸣 */
            set: function (v) {
                this._isGongMing = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "generalBraekTmp", {
            get: function () {
                return this._generalBreakTemp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "hashLegionPet", {
            get: function () {
                return this._generalBreakTemp.campGen ? true : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "legionPetCount", {
            get: function () {
                if (!this._generalBreakTemp.campGen)
                    return 0;
                return parseInt(this._generalBreakTemp.campGen.split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "legionPetStar", {
            get: function () {
                if (!this._generalBreakTemp.campGen)
                    return 0;
                return parseInt(this._generalBreakTemp.campGen.split("_")[0]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "selfPetCount", {
            get: function () {
                return this._generalBreakTemp.selfGen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "hashOtherPetTypeCount", {
            get: function () {
                if (!this._generalBreakTemp.otherGen)
                    return 0;
                var str = this._generalBreakTemp.otherGen.split(";");
                return str.length;
            },
            enumerable: true,
            configurable: true
        });
        GamePetVO.prototype.getOtherPetStar = function (pos) {
            if (pos === void 0) { pos = 0; }
            var str = this._generalBreakTemp.otherGen.split(";");
            return parseInt(str[pos].split("_")[0]);
        };
        GamePetVO.prototype.getOtherPetCount = function (pos) {
            if (pos === void 0) { pos = 0; }
            var str = this._generalBreakTemp.otherGen.split(";");
            return parseInt(str[pos].split("_")[1]);
        };
        GamePetVO.prototype.getOpenBingFaStar = function (quality, openstar) {
            var star = 0;
            var temps = Templates.getTemplatesByProperty(templates.Map.GENERALBREAK, "quality", quality);
            for (var _i = 0, temps_1 = temps; _i < temps_1.length; _i++) {
                var temp = temps_1[_i];
                if (temp.bingfaOpen == openstar) {
                    star = temp.star;
                    break;
                }
            }
            return star;
        };
        GamePetVO.prototype.getSkillUp = function () {
            var skillArr = [];
            var nextStar = this._star + 1;
            if (this._generalBreakTemp.nextId == -1)
                nextStar = this._star;
            var skillLv = this._generalBreakTemp.skillLv.split(";");
            var nextTmp = Templates.getTemplateByTwoProperty(templates.Map.GENERALBREAK, "quality", this._template.quality, "star", nextStar);
            if (nextTmp) {
                var nextSkillLv = nextTmp.skillLv.split(";");
            }
            for (var i = 0; i < 4; i++) {
                if (!skillLv[i]) {
                    skillArr.push(2);
                }
                else {
                    if (nextSkillLv[i] && skillLv[i]) {
                        if (parseInt(nextSkillLv[i]) > parseInt(skillLv[i])) {
                            skillArr.push(1);
                        }
                        else {
                            skillArr.push(0);
                        }
                    }
                }
            }
            return skillArr;
        };
        /**技能升级需要的星级 */
        GamePetVO.prototype.getSkillUpNeedLevel = function (pos) {
            var level = 0;
            var skillLv = this._generalBreakTemp.skillLv.split(";");
            if (!skillLv[pos]) {
                skillLv[pos] = "0";
            }
            var tmps = Templates.getTemplatesByProperty(templates.Map.GENERALBREAK, "quality", this._template.quality);
            for (var _i = 0, tmps_1 = tmps; _i < tmps_1.length; _i++) {
                var tmp = tmps_1[_i];
                var skillArr = tmp.skillLv.split(";");
                if (skillArr[pos] && skillLv[pos]) {
                    if (parseInt(skillArr[pos]) > parseInt(skillLv[pos])) {
                        level = tmp.star;
                        break;
                    }
                }
            }
            return level;
        };
        /**技能激活需要的星级 */
        GamePetVO.prototype.getSkillActNeedLevel = function (pos) {
            var level = 0;
            var skillLv = this._generalBreakTemp.skillLv.split(";");
            var tmps = Templates.getTemplatesByProperty(templates.Map.GENERALBREAK, "quality", this._template.quality);
            for (var _i = 0, tmps_2 = tmps; _i < tmps_2.length; _i++) {
                var tmp = tmps_2[_i];
                var skillArr = tmp.skillLv.split(";");
                if (!skillLv[pos] && skillArr[pos]) {
                    level = tmp.star;
                    break;
                }
            }
            return level;
        };
        Object.defineProperty(GamePetVO.prototype, "avatarId", {
            /**外观 */
            get: function () {
                if (!this._template)
                    return "";
                if (this._template instanceof templates.taskRobot) {
                    return this._template.modelId;
                }
                return this._template.model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "name", {
            get: function () {
                if (!this._template)
                    return "";
                return this._template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "petDes", {
            get: function () {
                if (!this._template)
                    return "";
                return this._template.des;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "quality", {
            get: function () {
                if (!this._template)
                    return 1;
                return this._template.quality;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "hpMax", {
            /**生命上限 */
            get: function () {
                if (this._posVO) {
                    return this._posVO.hpMax;
                }
                var hp = this.getProperty(TypeProperty.MaxHp);
                if (hp)
                    return hp;
                if (this._template instanceof templates.taskRobot) {
                    if (!this._template)
                        return 0;
                    return this._template.HP;
                }
                else {
                    if (!this._template)
                        return 0;
                    return utils.htmlUtil.getTemplateAndNameToValue(this._template.properties, "HP");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "attack", {
            /**攻击 */
            get: function () {
                if (this._template instanceof templates.taskRobot) {
                    return this._template.ATT;
                }
                return this._posVO ? (this._posVO.attack) : this.getProperty(TypeProperty.PAtk);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "pDef", {
            /**物防 */
            get: function () {
                if (this._template instanceof templates.taskRobot) {
                    return this._template.DEF;
                }
                return this._posVO ? (this._posVO.pDef) : this.getProperty(TypeProperty.PDef);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "mDef", {
            /**法防 */
            get: function () {
                // if (this._template instanceof templates.taskRobot) {
                // 	return this._template.MDEF;
                // }
                // return this._posVO ? (this._posVO.mDef) : this.getProperty(TypeProperty.MDef);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "healHP", {
            /**生命回复 */
            get: function () {
                //if (this._template instanceof templates.taskRobot) return 0;
                //return this._posVO ? (this._posVO.healHP) : this.getProperty(TypeProperty.HealHP);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "ignorePDef", {
            /**物防穿透 */
            get: function () {
                if (this._template instanceof templates.taskRobot)
                    return 0;
                return this._posVO ? (this._posVO.ignorePDef) : this.getProperty(TypeProperty.IgnorePDef);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "ignoreMDef", {
            /**法防穿透 */
            get: function () {
                //if (this._template instanceof templates.taskRobot) return 0;
                //return this._posVO ? (this._posVO.ignoreMDef) : this.getProperty(TypeProperty.IgnoreMDef);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "crit", {
            /**暴击 */
            get: function () {
                if (this._template instanceof templates.taskRobot)
                    return 0;
                return this._posVO ? (this._posVO.crit) : this.getProperty(TypeProperty.Crit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "critInjure", {
            /**暴击伤害 */
            get: function () {
                if (this._template instanceof templates.taskRobot)
                    return 0;
                return this._posVO ? (this._posVO.critInjure) : this.getProperty(TypeProperty.CritInjure);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "ignoreCrit", {
            /**抗暴 */
            get: function () {
                if (this._template instanceof templates.taskRobot)
                    return 0;
                return this._posVO ? (this._posVO.ignoreCrit) : this.getProperty(TypeProperty.IgnoreCrit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "ignoreCritInjure", {
            /**暴击抵抗 */
            get: function () {
                if (this._template instanceof templates.taskRobot)
                    return 0;
                return this._posVO ? (this._posVO.ignoreCritInjure) : this.getProperty(TypeProperty.IgnoreCritInjure);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "hit", {
            /**命中 */
            get: function () {
                if (this._template instanceof templates.taskRobot)
                    return 0;
                return this._posVO ? (this._posVO.hit) : this.getProperty(TypeProperty.Hit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "dodge", {
            /**闪避 */
            get: function () {
                if (this._template instanceof templates.taskRobot)
                    return 0;
                return this._posVO ? (this._posVO.dodge) : this.getProperty(TypeProperty.Dodge);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "injureAdd", {
            /**伤害加深 */
            get: function () {
                if (this._template instanceof templates.taskRobot)
                    return 0;
                return this._posVO ? (this._posVO.injureAdd) : this.getProperty(TypeProperty.InjureAdd);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "injureIgnore", {
            /**伤害减免 */
            get: function () {
                if (this._template instanceof templates.taskRobot)
                    return 0;
                return (this._posVO ? (this._posVO.injureIgnore) : this.getProperty(TypeProperty.InjureIgnore));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "isFirst", {
            get: function () {
                return this._isFirst;
            },
            /**是否首次获得 */
            set: function (v) {
                this._isFirst = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetVO.prototype, "come", {
            get: function () {
                return this._come;
            },
            /**武将来源 */
            set: function (v) {
                this._come = v;
            },
            enumerable: true,
            configurable: true
        });
        GamePetVO.STAR_LEVEL_UPDATE = "STAR_LEVEL_UPDATE";
        return GamePetVO;
    }(vo.GameSmartVO));
    vo.GamePetVO = GamePetVO;
    __reflect(GamePetVO.prototype, "vo.GamePetVO");
})(vo || (vo = {}));
