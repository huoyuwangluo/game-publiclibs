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
    var GameMonsterVO = (function (_super) {
        __extends(GameMonsterVO, _super);
        function GameMonsterVO(type) {
            var _this = _super.call(this, type ? type : TypeActor.MONSTER) || this;
            _this._supportNPC = false;
            _this._serverData = {};
            return _this;
        }
        /**
         * 初始化
         * @param template 模板数据
         * @param isElite 是否为精英
         */
        GameMonsterVO.prototype.initialize = function (template, actorType) {
            if (actorType === void 0) { actorType = TypeActor.MONSTER; }
            this._skillList = new vo.SkillListVO();
            this._template = template;
            if (actorType)
                this._type = actorType;
            this._liftFactor = (this.isElite ? GameModels.setting.eliteLifeFactor : 1);
            this._attackFactor = (this.isElite ? GameModels.setting.eliteAttackFactor : 1);
            this._level = 0;
            if (template instanceof n.ProtoMonster) {
                for (var i = 0; i < template.PropertyList.length; i++) {
                    this._serverData[template.PropertyList[i].Type] = template.PropertyList[i].Value;
                }
                if (template.Type == TypeActor.NPCSUPPORT) {
                    this._supportNPC = true;
                }
                this._sceneFlag = template.SceneFlag;
            }
            if (template instanceof n.ProtoMonster || template instanceof mo.ChapterMonsterData) {
                // this.updateModelTemplate(template.ResId);
                this.updateName(template.MonsterName);
                if (this._modelTemplate) {
                    this._attType = 0; //this._modelTemplate.attType;
                }
                /*
                for(var skillId of template.SkillList)
                {
                    this.updateSkillTemplate(skillId);
                }
                //this.updateSkillTemplate(template.SkillList[0]);
                if(this._skillList.list.length == 0){
                    logger.error("怪物技能出错：" + template.Id);
                }
                */
                this._uid = template.UniqueId;
                if (template instanceof n.ProtoMonster) {
                    this.updateSceneInfo(template.SceneInfo);
                }
                this._hpMax = Number(template.HPMax);
                this._tileX = template.PosX;
                this._tileY = template.PosY;
                this._level = template.Level;
                if (template instanceof n.ProtoMonster)
                    template.autoRecover = false;
            }
            else if (template instanceof templates.otherMonster || template instanceof templates.relicMonster || template instanceof templates.taskNpc) {
                this.updateName(template.name);
                this._attType = 0; //template.attType;
                this.updateSkillTemplate(201);
            }
            if (template instanceof templates.otherMonster || template instanceof templates.relicMonster) {
                this._level = template.lv;
            }
            _super.prototype.initialize.call(this, template);
            this.resetState();
        };
        GameMonsterVO.prototype.reset = function () {
            this.resetState();
            this._hpMax = 0;
            this._serverData = {};
            if (this._template instanceof n.ProtoMonster) {
                n.MessagePool.to(this._template);
            }
            this._template = null;
            this._name = "";
            this._attType = -1;
            if (this._skillVO) {
                vo.toPool(this._skillVO);
                this._skillVO = null;
            }
            this._modelTemplate = null;
            this._uid = "";
            this._hpMax = 0;
            this._tileX = 0;
            this._tileY = 0;
            this._level = 0;
            _super.prototype.reset.call(this);
        };
        /**获取属性 */
        GameMonsterVO.prototype.getProperty = function (type) {
            return this._serverData[type] ? this._serverData[type] : 0;
        };
        GameMonsterVO.prototype.updateModelTemplate = function (id) {
            this._modelTemplate = Templates.getTemplateById(templates.Map.DATAMODEL, id);
            this.updateName(this._modelTemplate.name);
        };
        GameMonsterVO.prototype.updateSkillTemplate = function (id) {
            var skillTemplate = Templates.getTemplateById(templates.Map.SKILLNEW, id);
            if (skillTemplate) {
                var skillVO = vo.fromPool(vo.SkillVO);
                skillVO.initialize(skillTemplate, 0);
                this._skillList.add(skillVO);
            }
            else if (id > 0) {
                logger.error("Fuck，技能又配错了：：skillId = " + id);
            }
        };
        GameMonsterVO.prototype.updateName = function (n) {
            switch (this._type) {
                case TypeActor.MONSTER:
                case TypeActor.BOSS:
                    this._name = n;
                    break;
                case TypeActor.MONSTERELITE:
                    this._name = Language.getExpression(Language.E_JY1, n);
                    break;
            }
        };
        GameMonsterVO.prototype.resetState = function () {
            if (this._template instanceof n.ProtoMonster) {
                this._hp = Number(this._template.HP);
            }
            else {
                this._hp = this.hpMax;
            }
            this._target = null;
            this._isDead = false;
        };
        GameMonsterVO.prototype.setUId = function (v) {
            this._uid = v;
        };
        Object.defineProperty(GameMonsterVO.prototype, "resId", {
            get: function () {
                if (this._template instanceof n.ProtoMonster || this._template instanceof mo.ChapterMonsterData) {
                    return this._template.ResId;
                }
                if (this._template instanceof templates.otherMonster) {
                    return this._template.resId;
                }
                return this._template.resId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "petId", {
            get: function () {
                if (this._template instanceof n.ProtoMonster || this._template instanceof mo.ChapterMonsterData) {
                    return this._template.PetRefId.toString();
                }
                if (this._template instanceof templates.otherMonster) {
                    return this._template.petId.toString();
                }
                return this._template.resId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "skillVO", {
            get: function () {
                return this._skillVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "configId", {
            /*public get skillType(): number {
                if (this._skillVO) return this._skillVO.type;
                return s.TypeSkill.C_ShunFa;
            }*/
            get: function () {
                if (this._template instanceof n.ProtoMonster || this._template instanceof mo.ChapterMonsterData) {
                    return this._template.Id;
                }
                return this._template.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "level", {
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        /**获取技能*/
        GameMonsterVO.prototype.getSkillVO = function (id) {
            if (this._skillVO && this._skillVO.id != id) {
                logger.error("当前怪物技能类型对不上!", id, this._skillVO ? this._skillVO.id : null);
                return null;
            }
            return this._skillVO;
        };
        Object.defineProperty(GameMonsterVO.prototype, "hp", {
            /**生命 */
            get: function () {
                return this._hp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "hpMax", {
            /**生命上限 */
            get: function () {
                if (this._hpMax)
                    return this._hpMax;
                var result;
                if (this._template instanceof n.ProtoMonster || this._template instanceof mo.ChapterMonsterData) {
                    result = Number(this._template.HPMax);
                }
                else if (this._template instanceof templates.otherMonster || this._template instanceof templates.relicMonster) {
                    result = utils.htmlUtil.getTemplateAndNameToValue(this._template.properties, "HP");
                }
                else {
                    result = this._template ? this._template.HP : 0;
                }
                return result * this._liftFactor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "atkType", {
            get: function () {
                return this._attType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "attack", {
            /**攻击 */
            get: function () {
                if (this._template instanceof templates.otherMonster || this._template instanceof templates.relicMonster) {
                    return utils.htmlUtil.getTemplateAndNameToValue(this._template.properties, "ATT") * this._attackFactor;
                }
                if (this._template instanceof n.ProtoMonster) {
                    return this.getProperty(TypeProperty.PAtk) * this._attackFactor;
                }
                return this._template.ATT * this._attackFactor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "pDef", {
            /**物防 */
            get: function () {
                if (this._template instanceof templates.otherMonster || this._template instanceof templates.relicMonster) {
                    return utils.htmlUtil.getTemplateAndNameToValue(this._template.properties, "DEF");
                }
                if (this._template instanceof n.ProtoMonster) {
                    return this.getProperty(TypeProperty.PDef);
                }
                return this._template.DEF;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "mDef", {
            /**法防 */
            get: function () {
                // if (this._template instanceof templates.otherMonster || this._template instanceof templates.relicMonster) {
                // 	return utils.htmlUtil.getTemplateAndNameToValue(this._template.properties, "MDEF");
                // }
                // if (this._template instanceof n.ProtoMonster) {
                // 	return this.getProperty(TypeProperty.MDef);
                // }
                // return this._template.MDEF;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "ignorePDef", {
            /**物防穿透 */
            get: function () {
                if (this._template instanceof templates.otherMonster || this._template instanceof templates.relicMonster) {
                    return utils.htmlUtil.getTemplateAndNameToValue(this._template.properties, "CROSS");
                }
                if (this._template instanceof n.ProtoMonster) {
                    return this.getProperty(TypeProperty.IgnorePDef);
                }
                return this._template.CROSS;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "ignoreMDef", {
            /**法防穿透 */
            get: function () {
                // if (this._template instanceof templates.otherMonster || this._template instanceof templates.relicMonster) {
                // 	return utils.htmlUtil.getTemplateAndNameToValue(this._template.properties, "MCROSS");
                // }
                // if (this._template instanceof n.ProtoMonster) {
                // 	return this.getProperty(TypeProperty.IgnoreMDef);
                // }
                // return this._template.MCROSS;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "isElite", {
            /**是否精英怪 */
            get: function () {
                return this._type == TypeActor.MONSTERELITE;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "isBoss", {
            /**是否BOSS */
            get: function () {
                return this._type == TypeActor.BOSS;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameMonsterVO.prototype, "isSupportNPC", {
            get: function () {
                return this._supportNPC;
            },
            enumerable: true,
            configurable: true
        });
        return GameMonsterVO;
    }(vo.GameSmartVO));
    vo.GameMonsterVO = GameMonsterVO;
    __reflect(GameMonsterVO.prototype, "vo.GameMonsterVO");
})(vo || (vo = {}));
