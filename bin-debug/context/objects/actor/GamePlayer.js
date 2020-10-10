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
    var GamePlayer = (function (_super) {
        __extends(GamePlayer, _super);
        function GamePlayer(type) {
            if (type === void 0) { type = TypeActor.PLAYER; }
            var _this = _super.call(this, type) || this;
            // protected _gamePhantom: GamePhantom;
            _this._petEnabled = true;
            _this._pickUpOneByOne = false;
            _this._moveFullDirectEnabled = false;
            _this._horseSkillState = false;
            _this.isuser = false;
            return _this;
            //this.enableMoveFiveDirect();
        }
        GamePlayer.prototype.createChildren = function () {
            this.createShadow();
            this.createTitle();
            this.createAnimation();
            this._petGroup = new s.PetGroup();
        };
        GamePlayer.prototype.createAnimation = function () {
            this._animation = new s.ActorAnimationGroup();
            this.addChild(this.animation);
            this.animation.addPart(TypePart.BODY);
            this.titleHeight = GamePlayer.TITLE_HEIGHT;
            this.bloodVisible = true;
        };
        GamePlayer.prototype.createTitle = function () {
            this._title = new s.TitlePlayerObject();
        };
        GamePlayer.prototype.initialize = function (vo) {
            _super.prototype.initialize.call(this, vo);
            //vo.onNameChange(this, this.namerChangeOfTypeHandler);
            this.showClothesAvatar();
            this.showFashionWeapon();
            this.showFashionWing();
            // this.showFashionHelmet();
            this.showHorse();
            //vo.onPropertyChange(TypeProperty.WUGUAN_ID, this, this.updateWuGuan);
            vo.onPropertyChange(TypeProperty.DRESSEDTITLE, this, this.updateMarktitle);
            vo.onPropertyChange(TypeProperty.FASHION_CLOTH, this, this.avatarChangeHandler);
            vo.onPropertyChange(TypeProperty.FASHION_WEAPON, this, this.avatarChangeHandler);
            vo.onPropertyChange(TypeProperty.WEAPON_MODLEID, this, this.avatarChangeHandler);
            vo.onPropertyChange(TypeProperty.CLOTH_MODLEID, this, this.avatarChangeHandler);
            vo.onPropertyChange(TypeProperty.WING_MODLEID, this, this.avatarChangeHandler);
            vo.onPropertyChange(TypeProperty.PHANTOM_BATTLE_Id, this, this.updateGamePhantom);
            vo.onPropertyChange(TypeProperty.HELMET_MODLEID, this, this.showFashionHelmet);
            vo.onPropertyChange(TypeProperty.FASHION_HALO, this, this.avatarChangeHandler);
            // vo.onPropertyChange(TypeProperty.HP, this, this.hpChange);
            vo.onPropertyChange(TypeProperty.Level, this, this.playLevelUpEffect);
            //vo.petList.onMergeStateChange(this, this.mergeStateChange);
            vo.onPropertyChange(TypeProperty.FASHION_HORSE, this, this.showHorse);
            this.nameVisible = false;
            this.setMaster(this);
            this._petGroup.initialize(this);
            this.updateMarktitle();
            //this.updateWuGuan();
            //this.mergeStateChange();
            this.updateGamePhantom();
            if (vo.stateDead) {
                this.deadActionImmediately();
            }
            // if (vo == GameModels.user.player) {
            // 	this.title.setGreen();
            // }
            /*else if (GameModels.user.player.sceneFlag && vo.sceneFlag == GameModels.user.player.sceneFlag) {
                this.title.setBlue();
            }*/
            if (this._hitRect) {
                this._hitRect.height = this.titleHeight;
                this._hitRect.x = -(this._hitRect.width / 2);
                this._hitRect.y = -this._hitRect.height;
            }
            // this.wingResId='1908';
            this._previousLevel = GameModels.user.player.getProperty(TypeProperty.Level);
            this._modleData = Templates.getTemplateById(templates.Map.DATAMODEL, 1100);
            // this.showDrumChat();
        };
        GamePlayer.prototype.reset = function () {
            this._bodyResId = null;
            this._weaponResId = null;
            this._wingResId = null;
            this._horseResId = null;
            this._shadowResId = null;
            this._effectResId = null;
            this._flyEffectResId = null;
            this._bodyFixedResId = null;
            this._weaponFixedResId = null;
            this._magicDragonResId = null;
            this.animation.reset();
            // if (this._gamePhantom) {
            // 	this._gamePhantom.reset();
            // }
            if (this._petGroup) {
                this._petGroup.reset();
            }
            if (this.vo) {
                // (this.vo as vo.GamePlayerVO).offAvatarChange();
                this.vo.offNameChange();
                // (this.vo as vo.GamePlayerVO).offPropertyChange(TypeProperty.Level,this,this.updateShadowAvatar);
                //(this.vo as vo.GamePlayerVO).offPropertyChange(TypeProperty.WUGUAN_ID, this, this.updateWuGuan);
                this.vo.offPropertyChange(TypeProperty.DRESSEDTITLE, this, this.updateMarktitle);
                this.vo.offPropertyChange(TypeProperty.FASHION_CLOTH, this, this.avatarChangeHandler);
                this.vo.offPropertyChange(TypeProperty.FASHION_WEAPON, this, this.avatarChangeHandler);
                this.vo.offPropertyChange(TypeProperty.WEAPON_MODLEID, this, this.avatarChangeHandler);
                this.vo.offPropertyChange(TypeProperty.CLOTH_MODLEID, this, this.avatarChangeHandler);
                this.vo.offPropertyChange(TypeProperty.WING_MODLEID, this, this.avatarChangeHandler);
                this.vo.offPropertyChange(TypeProperty.FASHION_HALO, this, this.avatarChangeHandler);
                this.vo.offPropertyChange(TypeProperty.PHANTOM_BATTLE_Id, this, this.updateGamePhantom);
                this.vo.offPropertyChange(TypeProperty.HELMET_MODLEID, this, this.showFashionHelmet);
                this.vo.offPropertyChange(TypeProperty.Level, this, this.playLevelUpEffect);
                //(this.vo as vo.GamePlayerVO).petList.offMergeStateChange(this, this.mergeStateChange);
                // (this.vo as vo.GamePlayerVO).offPropertyChange(TypeProperty.HP, this, this.hpChange);
                this.vo.offPropertyChange(TypeProperty.FASHION_HORSE, this, this.showHorse);
            }
            this._petEnabled = true;
            this.offSkillStart();
            this.offHurted();
            this.offMoveStart();
            this.offStateChange();
            this.offAllTileChange();
            // utils.timer.clear(this, this.updtaDrumChat);
            // utils.timer.clear(this, this.clearTimeDrumChat);
            _super.prototype.reset.call(this);
        };
        Object.defineProperty(GamePlayer.prototype, "petAIClass", {
            // private showDrumChat(): void {
            // 	utils.timer.clear(this, this.updtaDrumChat);
            // 	utils.timer.clear(this, this.clearTimeDrumChat);
            // 	if (app.gameContext.typeGame == TypeGame.CHAPTER_BOSS || app.gameContext.typeGame == TypeGame.DOOR_BOSS) {
            // 		if (this.vo == GameModels.user.player && GameModels.user.player.level <= 100 && GameModels.user.player.level > 15) {
            // 			utils.timer.once(5000, this, this.updtaDrumChat);
            // 		}
            // 	}
            // }
            // private updtaDrumChat(): void {
            // 	for (var i = 0; i < this._petGroup.getPetList().length; i++) {
            // 		var petAll : s.GamePet = this._petGroup.getPetList()[i];
            // 		if (petAll&&petAll.titleDrum) petAll.titleDrum.updataConText = null;
            // 	}
            // 	var num: number = Math.floor(Math.random() * (this._petGroup.getPetList().length - 1));
            // 	var pet: s.GamePet = this._petGroup.getPetList()[num];
            // 	if (pet && !pet.stateDead && !pet.stateMerged) {
            // 		if (pet.titleDrum) pet.titleDrum.updataConText = Language.languageGroupText;
            // 		utils.timer.clear(this, this.updtaDrumChat);
            // 		utils.timer.once(5000, this, this.clearTimeDrumChat, true, pet);
            // 	}
            // }
            // private clearTimeDrumChat(petArgs: s.GamePet): void {
            // 	if (petArgs && petArgs.titleDrum) petArgs.titleDrum.updataConText = null;
            // 	utils.timer.once(30000, this, this.updtaDrumChat);
            // }
            set: function (v) {
                this._petGroup.aiClass = v;
            },
            enumerable: true,
            configurable: true
        });
        /**打开行走时5方向显示 */
        GamePlayer.prototype.enableMoveFiveDirect = function () {
            this._moveFullDirectEnabled = true;
        };
        GamePlayer.prototype.setHorseSkillState = function (value) {
            if (this._horseSkillState != value) {
                this._horseSkillState = value;
                this.updateAnimation();
            }
        };
        GamePlayer.prototype.isHorseSkillState = function () {
            return this._horseSkillState;
        };
        GamePlayer.prototype.flash = function () {
            if (this._horseSkillState)
                return;
            _super.prototype.flash.call(this);
        };
        GamePlayer.prototype.setBorn = function (node) {
            this._bornTile = node;
            this.setTile(node);
            // if (this._gamePhantom) {
            // 	this._gamePhantom.updatePosition();
            // }
        };
        //开场属性加成
        GamePlayer.prototype.showStartProAdd = function () {
            if (!TypeGame.isFormationGame())
                return;
            var temp = GameModels.pet.getLegionSkillByGameType(app.gameContext.typeGame);
            var propertyStr = temp ? temp.properties : "";
            if (!propertyStr)
                return;
            for (var _i = 0, _a = this._petGroup.getPetList(); _i < _a.length; _i++) {
                var pet = _a[_i];
                if (pet) {
                    var str = propertyStr.split(";");
                    var atkAdd = str[0] ? parseInt(str[0].split("_")[1]) / 100 : 0;
                    var hpAdd = str[1] ? parseInt(str[1].split("_")[1]) / 100 : 0;
                    battle.manager.showStartProAdd(hpAdd, atkAdd, pet);
                }
            }
        };
        /**刷新玩家队长 */
        GamePlayer.prototype.refreshTeamLeader = function () {
            var smartObj = null;
            if (this._master != null && this._master instanceof GamePlayer) {
                var gamePlayer = this._master;
                if (!gamePlayer.petAllDead) {
                    smartObj = gamePlayer.petGroup.getFirstLifePet();
                }
            }
            this.setTeamLeader(smartObj);
            for (var _i = 0, _a = this._petGroup.getPetList(); _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.setTeamLeader(smartObj);
                pet.nameVisible = false;
                if (pet.isPlayer && TypeGame.isFormationGame(true) && pet.getMarkTitleSkin()) {
                    pet.nameVisible = true;
                }
            }
            this.showFashionHalo();
            this.updateGamePhantom();
            if (smartObj != null) {
                if (TypeGame.isFormationGame(true) == false) {
                    smartObj.nameVisible = true;
                }
            }
            if (smartObj != null && app.gameContext.isMySelf(smartObj)) {
                this.scene.lookAt(smartObj);
            }
        };
        // private namerChangeOfTypeHandler() {
        // 	this._title.name = (this._vo as vo.GamePlayerVO).name;
        // }
        GamePlayer.prototype.deadHandler = function (killer) {
            _super.prototype.deadHandler.call(this, killer);
            //this.removePets();
        };
        GamePlayer.prototype.relifeHandler = function () {
            //super.relifeHandler();
            this.addPets();
        };
        GamePlayer.prototype.addTo = function (scene) {
            _super.prototype.addTo.call(this, scene);
            this.addPets();
            // if (this._gamePhantom) {
            // 	this._gamePhantom.addTo(this._scene);
            // }
            this.showFashionHalo();
            this.showFashionHelmet();
        };
        GamePlayer.prototype.remove = function () {
            // if (this._gamePhantom) {
            // 	this._gamePhantom.remove();
            // }
            this._petGroup.removeFromScene();
            _super.prototype.remove.call(this);
        };
        GamePlayer.prototype.addPets = function () {
            if (this._petEnabled && this._scene && this._tileNode)
                this._petGroup.addToScene(this._scene, this._tileNode, this._direct);
        };
        GamePlayer.prototype.removePets = function () {
            this._petGroup.removeFromScene();
        };
        GamePlayer.prototype.setFriendTitle = function () {
            /*this.title.setBlue();
            for (var pet of this._petGroup.getPetList()) {
                pet.title.setBlue();
            }*/
        };
        /**
         * 带飞入特效的启动方法
         */
        GamePlayer.prototype.come = function (delay) {
            if (delay === void 0) { delay = 0; }
            _super.prototype.come.call(this, delay);
            this._petGroup.come(delay);
        };
        GamePlayer.prototype.start = function (children) {
            if (children === void 0) { children = true; }
            //super.start();
            if (children && this._petGroup)
                this._petGroup.start();
        };
        GamePlayer.prototype.stop = function (children) {
            if (children === void 0) { children = true; }
            _super.prototype.stop.call(this);
            if (children && this._petGroup)
                this._petGroup.stop();
        };
        Object.defineProperty(GamePlayer.prototype, "skinEnabled", {
            /**皮肤开关 */
            get: function () {
                return this._skinEnabled;
            },
            set: function (value) {
                egret.superSetter(GamePlayer, this, "skinEnabled", value);
                this._petGroup.skinEnabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "petEnabled", {
            /**武将开关 */
            set: function (value) {
                if (this._petEnabled != value) {
                    this._petEnabled = value;
                    if (this.vo && this._scene) {
                        this._petEnabled ? this.addPets() : this.removePets();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "pickUpOneByOne", {
            get: function () {
                return this._pickUpOneByOne;
            },
            set: function (oneByOne) {
                this._pickUpOneByOne = oneByOne;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "autoAttack", {
            /**AI启动后是否自动选择目标攻击*/
            get: function () {
                return this._ai.autoSelectAttack;
            },
            set: function (value) {
                this._ai.autoSelectAttack = value;
                this._petGroup.autoAttack = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "hpAutoEnabled", {
            /**设置自动回血开关 */
            set: function (v) {
                this.vo.hpAutoEnabled = v;
                this._petGroup.hpAutoEnabled = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "focusMode", {
            /**专注模式 技能只作用于当前单一目标单位*/
            get: function () {
                return this._ai.focusMode;
            },
            set: function (value) {
                this._ai.focusMode = value;
                this._petGroup.focusMode = value;
            },
            enumerable: true,
            configurable: true
        });
        GamePlayer.prototype.updateTarget = function () {
            _super.prototype.updateTarget.call(this);
            if (!!this.targetVO && (this.targetVO.type == TypeActor.DROP || this.targetVO.type == TypeActor.NPC)) {
                return;
            }
            if (this._target) {
                this._petGroup.target = this._target;
            }
            else {
                this._petGroup.targetVO = this.targetVO;
            }
        };
        Object.defineProperty(GamePlayer.prototype, "target", {
            get: function () {
                return this._target;
            },
            set: function (v) {
                egret.superSetter(GamePlayer, this, "target", v);
                //if (!v || v.type != TypeActor.DROP) this._petGroup.target = v;
                this._petGroup.target = v;
            },
            enumerable: true,
            configurable: true
        });
        GamePlayer.prototype.getTeamTargetVO = function () {
            var ret = this.vo.getTeamTarget();
            return ret;
        };
        GamePlayer.prototype.getPetObjectByVO = function (petVO) {
            if (petVO.master == this.vo && petVO.isMerged)
                return this;
            for (var _i = 0, _a = this._petGroup.getPetList(); _i < _a.length; _i++) {
                var pet = _a[_i];
                if (pet.vo == petVO) {
                    return pet;
                }
            }
            return null;
        };
        GamePlayer.prototype.onSkillStart = function (caller, method) {
            this._ai.onSkillStart(caller, method);
            this._petGroup.onSkillStart(caller, method);
        };
        GamePlayer.prototype.offSkillStart = function () {
            if (this._ai)
                this._ai.offSkillStart();
            this._petGroup.offSkillStart();
        };
        GamePlayer.prototype.onMoveStart = function (caller, method) {
            this._ai.onMoveStart(caller, method);
            this._petGroup.onMoveStart(caller, method);
        };
        GamePlayer.prototype.offMoveStart = function () {
            if (this._ai)
                this._ai.offMoveStart();
            this._petGroup.offMoveStart();
        };
        Object.defineProperty(GamePlayer.prototype, "petAllDead", {
            get: function () {
                return this._petGroup.allDead;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "petGroup", {
            //队伍全部死亡
            /*public isTeamAllDead():boolean
            {
                var ret:boolean = false;
                if(this.stateDead && this.petAllDead)
                {
                    ret = true;
                }
                return ret;
            }*/
            get: function () {
                return this._petGroup;
            },
            enumerable: true,
            configurable: true
        });
        GamePlayer.prototype.onPetAllDead = function (caller, method) {
            this._petGroup.onAllDead(caller, method);
        };
        GamePlayer.prototype.offPetAllDead = function () {
            this._petGroup.offAllDead();
        };
        GamePlayer.prototype.updatePetTile = function () {
            this._petGroup.updateTile();
        };
        GamePlayer.prototype.movePathTo = function (x, y) {
            //this._petGroup.movePathTo(x, y);
            var leader = this._master.getTeamLeader();
            if (leader != null && leader.getAI() != null) {
                leader.getAI().movePathTo(x, y);
            }
        };
        GamePlayer.prototype.clearMovePath = function () {
            this._petGroup.clearMovePath();
        };
        GamePlayer.prototype.moveTo = function (x, y) {
            var leader = this.getTeamLeader();
            if (leader != null && leader.getAI() != null) {
                leader.getAI().moveTo(x, y);
            }
        };
        GamePlayer.prototype.setTile = function (tile) {
            _super.prototype.setTile.call(this, tile);
            this.addPets();
        };
        GamePlayer.prototype.avatarChangeHandler = function (smartVO, propertyId) {
            for (var _i = 0, _a = this._petGroup.getPetList(); _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.avatarChangeHandler(smartVO, propertyId);
            }
            /*switch (propertyId) {
                case TypeProperty.FASHION_CLOTH:
                case TypeProperty.CLOTH_MODLEID:
                    this.showClothesAvatar();
                    break;
                case TypeProperty.WING_MODLEID:
                    this.showFashionWing();
                    break;
                case TypeProperty.FASHION_HALO:
                    this.showFashionHalo();
                    break;
                case TypeProperty.FASHION_WEAPON:
                case TypeProperty.WEAPON_MODLEID:
                    this.showFashionWeapon();
                    break;
            }*/
        };
        GamePlayer.prototype.showClothesAvatar = function () {
            var fashionCloth = this.vo.getProperty(TypeProperty.FASHION_CLOTH);
            if (fashionCloth) {
                var templateCloth = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionCloth);
                if (templateCloth) {
                    this.bodyResId = templateCloth.modelId;
                    return;
                }
            }
            var equipCloth = this.vo.getProperty(TypeProperty.CLOTH_MODLEID);
            if (equipCloth == 0) {
                this.bodyResId = TypeEquip.DEFAULT_CLOTHES;
                return;
            }
            if (equipCloth > 0) {
                this.bodyResId = equipCloth + "";
                return;
            }
            // this.bodyResId = (this.vo as vo.GamePlayerVO).clothesAvatarId;
        };
        GamePlayer.prototype.showFashionWing = function () {
            var fashionWing = this.vo.getProperty(TypeProperty.WING_MODLEID);
            if (fashionWing > 0) {
                this.wingResId = fashionWing + "";
                return;
            }
            //this.wingResId = "";			
        };
        GamePlayer.prototype.showTestWing = function (resId) {
            this.wingResId = resId;
        };
        /**参数主要是为了兼容GM命令 */
        GamePlayer.prototype.showHorse = function (id) {
            if (id === void 0) { id = 0; }
            var fashionHose = this.vo.getProperty(TypeProperty.FASHION_HORSE);
            if (fashionHose) {
                var tempfashio = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionHose);
                if (tempfashio) {
                    var temp = Templates.getTemplateByProperty(templates.Map.ZHANQI, "model", tempfashio.modelId);
                    if (temp != null) {
                        this.horseResId = temp.model;
                        this._horseHeight = temp.height;
                    }
                    else {
                        this.horseResId = null;
                        this._horseHeight = 0;
                        this.setHorseSkillState(false);
                    }
                }
            }
        };
        GamePlayer.prototype.showFashionWeapon = function () {
            var fashionWeapon = this.vo.getProperty(TypeProperty.FASHION_WEAPON);
            if (fashionWeapon) {
                var templateWeapon = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionWeapon);
                if (templateWeapon) {
                    this.weaponResId = templateWeapon.modelId;
                    return;
                }
            }
            var equipWeapon = this.vo.getProperty(TypeProperty.WEAPON_MODLEID);
            if (equipWeapon == 0) {
                this.weaponResId = TypeEquip.DEFAULT_WEAPON;
                return;
            }
            if (equipWeapon > 0) {
                this.weaponResId = equipWeapon + "";
                return;
            }
            // this.weaponResId = (this.vo as vo.GamePlayerVO).weaponAvatarId;
        };
        /**小飞龙围绕特效 */
        GamePlayer.prototype.showFashionHelmet = function () {
            var equipHelmet = this.vo.getProperty(TypeProperty.HELMET_MODLEID);
            if (equipHelmet > 0) {
                this.showBodyEffect(equipHelmet.toString());
                return;
            }
            this.hideBodyEffect();
        };
        /**时装脚底光环 */
        GamePlayer.prototype.showFashionHalo = function () {
            for (var _i = 0, _a = this._petGroup.getPetList(); _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.showFashionHalo();
            }
            /*var equipShoes: number = (this.vo as vo.GamePlayerVO).getProperty(TypeProperty.FASHION_HALO);
            if (!this.stateDead && equipShoes > 0) {
                var fashionHalo: templates.gameFashion = Templates.getTemplateById(templates.Map.GAMEFASHION, equipShoes);
                if (fashionHalo) {
                    this.showFootEffect(fashionHalo.modelId);
                    return;
                }
            }
            this.hideFootEffect();
            */
        };
        GamePlayer.prototype.updateGamePhantom = function () {
            // var phantomBattleId: number = (this.vo as vo.GamePlayerVO).getProperty(TypeProperty.PHANTOM_BATTLE_Id);
            // if (phantomBattleId != 0 && !this.stateDead) {
            // 	if (!this._gamePhantom) {
            // 		this._gamePhantom = new GamePhantom();
            // 	}
            // 	this._gamePhantom.initialize(this);
            // } else {
            // 	if (this._gamePhantom) {
            // 		this._gamePhantom.remove();
            // 	}
            // }
        };
        /**称号显示 */
        GamePlayer.prototype.updateMarktitle = function (v) {
            if (v === void 0) { v = null; }
            for (var _i = 0, _a = this._petGroup.getPetList(); _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.updateMarktitle();
            }
            /*if (v && typeof (v) == "string") {
                this.title.marktitleSkin = v;
                return;
            }
            var template: templates.gameFashion = Templates.getTemplateById(templates.Map.GAMEFASHION, (this.vo as vo.GamePlayerVO).getProperty(TypeProperty.DRESSEDTITLE));
            if (template) {
                if (template.type == TypeFashion.TITLE_GIUDE && GameModels.chapter.cityId > 1005) {
                    this.title.marktitleSkin = null;
                }
                else {
                    this.title.marktitleSkin = template.modelId;
                }

            } else {
                this.title.marktitleSkin = null;
            }*/
        };
        Object.defineProperty(GamePlayer.prototype, "animation", {
            /**武官显示 */
            // private updateWuGuan() {
            // 	var wuguanStep: number = (this.vo as vo.GamePlayerVO).wuguanLevel;
            // 	//var legionId: any = (this.vo as vo.GamePlayerVO).legionId;
            // 	var legionId: number = (this.vo as vo.GamePlayerVO).unionId;
            // 	this.title.setWuguanLevel(wuguanStep, legionId);
            // }
            // private mergeStateChange() {
            // 	if ((this.vo as vo.GamePlayerVO).petList.hasMerge) {
            // 		this.title.bloodMergeVisible = true;
            // 		this._petGroup.onHpChange(this, this.petHpChangeHandler);
            // 		this.petHpChangeHandler();
            // 	} else {
            // 		this.title.bloodMergeVisible = false;
            // 		this._petGroup.offHpChange();
            // 	}
            // }
            // private petHpChangeHandler() {
            // 	this.title.hpMaxMerge = this._petGroup.allHpMax;
            // 	this.title.hpMerge = this._petGroup.allHp;
            // }
            /*public updateAvatarDisplay(isShow: boolean) {
                if (super.updateAvatarDisplay(isShow)) {
                    this.updateAnimation();
                    return true;
                }
                return false;
            }*/
            get: function () {
                return this._animation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "bodyFixedResId", {
            // public get title(): TitlePlayerObject {
            // 	return this._title as TitlePlayerObject;
            // }
            set: function (v) {
                if (this._bodyFixedResId == v)
                    return;
                this._bodyFixedResId = v;
                if (this._bodyResId) {
                    this.animation.addPart(TypePart.BODY);
                }
                else if (!this._bodyResId) {
                    this.animation.removePart(TypePart.BODY);
                }
                egret.callLater(this.updateAnimation, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "weaponFixedResId", {
            set: function (v) {
                if (this._weaponFixedResId == v)
                    return;
                this._weaponFixedResId = v;
                if (this._weaponFixedResId) {
                    this.animation.addPart(TypePart.WEAPON);
                }
                else if (!this._weaponResId) {
                    this.animation.removePart(TypePart.WEAPON);
                }
                egret.callLater(this.updateAnimation, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "bodyResId", {
            set: function (v) {
                if (this._bodyResId == v)
                    return;
                this._bodyResId = v;
                if (this._bodyResId) {
                    this.animation.addPart(TypePart.BODY);
                }
                else {
                    this.animation.removePart(TypePart.BODY);
                }
                egret.callLater(this.updateAnimation, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "wingResId", {
            set: function (v) {
                if (this._wingResId == v)
                    return;
                this._wingResId = v;
                if (this._wingResId) {
                    this.animation.addPart(TypePart.WING);
                }
                else {
                    this.animation.removePart(TypePart.WING);
                }
                egret.callLater(this.updateAnimation, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "weaponResId", {
            set: function (v) {
                if (this._weaponResId == v)
                    return;
                this._weaponResId = v;
                if (this._weaponResId) {
                    this.animation.addPart(TypePart.WEAPON);
                }
                else {
                    this.animation.removePart(TypePart.WEAPON);
                }
                egret.callLater(this.updateAnimation, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "horseResId", {
            set: function (v) {
                if (this._horseResId == v)
                    return;
                this._horseResId = v;
                if (this._horseResId) {
                    this.animation.addPart(TypePart.HORSE);
                }
                else {
                    this.animation.removePart(TypePart.HORSE);
                }
                egret.callLater(this.updateAnimation, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayer.prototype, "effectResId", {
            //跟刀方向特效
            set: function (v) {
                if (this._effectResId == v)
                    return;
                this._effectResId = v;
                if (this._effectResId) {
                    this.animation.addPart(TypePart.EFFECT);
                }
                else {
                    this.animation.removePart(TypePart.EFFECT);
                }
                egret.callLater(this.updateAnimation, this);
            },
            enumerable: true,
            configurable: true
        });
        GamePlayer.prototype.updateAnimation = function () {
            //this.bodyResId = "1024";
            //this.weaponResId = "11111";
            //this.wingResId = "1400";
            if (!this._skinEnabled)
                return;
            if (!this._action || this._direct == -1) {
                return;
            }
            if (this._effectResId)
                this.animation.setEffectResKey(this._avatarEnabled ? this._effectResId : null);
            _super.prototype.updateAnimation.call(this);
            var actionFlag = this._action;
            if (this._action == TypeAction.DEAD) {
                actionFlag = TypeAction.IDLE;
            }
            //actionFlag = TypeAction.IDLE;
            //if (this._horseSkillState && this._horseResId && actionFlag != TypeAction.RUN && actionFlag != TypeAction.IDLE) {
            //	actionFlag = TypeAction.RUN;
            //}
            this.animation.totalFrame = TypeAction.getTotalFrame(TypeActor.PLAYER, TypeJob.ZHAN, this._action);
            this.animation.frameRate = TypeAction.getFrameRate(TypeActor.PLAYER, this._action);
            this.animation.fullDirect = false;
            this.animation.action = this._action;
            this.animation.direct = this._direct;
            var isHorseState = false;
            if (this._horseResId && (actionFlag == TypeAction.RUN || actionFlag == TypeAction.IDLE) && (TypeGame.isHorseGame(app.gameContext.typeGame) || this._horseSkillState)) {
                var isFightState = false;
                //if(this.target != null && this.target.type != TypeActor.DROP)
                if (this.target != null) {
                    var distance = Math.max(Math.abs(this.tileX - this.target.tileX), Math.abs(this.tileY - this.target.tileY));
                    if (distance < 10) {
                        isFightState = true;
                    }
                }
                //isFightState = true;
                //else if (this._scene != null && this._scene.game.type != TypeGame.CITY) {
                //	isFightState = true;
                //}
                if (!isFightState) {
                    this.animation.setHorseResKey(this._avatarEnabled ? (this._horseResId + "_" + actionFlag) : null);
                    this.animation.setBodyResKey(this._avatarEnabled ? (this._bodyResId + "_1200") : null);
                    this.animation.setWeaponResKey(this._avatarEnabled ? (this._weaponResId + "_1200") : null);
                    this.animation.setWingResKey(this._avatarEnabled ? (this._wingResId + "_1200") : null);
                    this.titleHeight = GamePlayer.TITLE_HEIGHT + this._horseHeight - 40;
                    this.animation.setPartOffsetY(TypePart.WEAPON, 80 - this._horseHeight);
                    //this.animation.setPartOffsetY(TypePart.HORSE, 80 - this._horseHeight);
                    this.animation.setPartOffsetY(TypePart.WING, 100 - this._horseHeight);
                    this.animation.setPartOffsetY(TypePart.BODY, 80 - this._horseHeight);
                    //this.animation.setPartOffsetY(TypePart.BODY, -40);
                    this.animation.totalFrame = 4;
                    this.animation.frameRate = 6;
                    isHorseState = true;
                }
            }
            this.animation.isHorseState = isHorseState;
            if (!isHorseState) {
                //this.animation.fullDirect = this._moveFullDirectEnabled && (this._action == TypeAction.RUN || this._action == TypeAction.IDLE);
                this.animation.fullDirect = this._moveFullDirectEnabled;
                this.titleHeight = GamePlayer.TITLE_HEIGHT;
                this.animation.setPartOffsetY(TypePart.WEAPON, 0);
                this.animation.setPartOffsetY(TypePart.HORSE, 0);
                this.animation.setPartOffsetY(TypePart.WING, 0);
                this.animation.setPartOffsetY(TypePart.BODY, 0);
                this.animation.setHorseResKey(null);
                if (this._bodyFixedResId) {
                    this.animation.setBodyResKey(this._avatarEnabled ? (this._bodyFixedResId + "_" + actionFlag) : null);
                }
                else if (this._bodyResId) {
                    this.animation.setBodyResKey(this._avatarEnabled ? (this._bodyResId + "_" + actionFlag) : null);
                }
                if (this._weaponFixedResId) {
                    this.animation.setWeaponResKey(this._avatarEnabled ? (this._weaponFixedResId + "_" + actionFlag) : null);
                }
                else if (this._weaponResId) {
                    this.animation.setWeaponResKey(this._avatarEnabled ? (this._weaponResId + "_" + actionFlag) : null);
                }
                if (actionFlag == TypeAction.RUN || actionFlag == TypeAction.IDLE) {
                    if (this._wingResId)
                        this.animation.setWingResKey(this._avatarEnabled ? (this._wingResId + "_" + actionFlag) : null);
                }
                else {
                    if (this._wingResId)
                        this.animation.setWingResKey(null);
                }
            }
            if (this._flyEffectResId)
                this.animation.setFlyEffectResKey(this._avatarEnabled ? (this._flyEffectResId) : null);
        };
        GamePlayer.prototype.onStateChange = function (caller, method) {
            this._ai.onStateChange(caller, method);
        };
        GamePlayer.prototype.offStateChange = function () {
            if (this._ai)
                this._ai.offStateChange();
        };
        /**人物升级特效 */
        GamePlayer.prototype.playLevelUpEffect = function () {
            if (!this.animation || !this.animation.parent)
                return;
            var level = GameModels.user.player.getProperty(TypeProperty.Level);
            if (level <= this._previousLevel) {
                this._previousLevel = level;
                return;
            }
            this._previousLevel = level;
            mg.effectManager.playEffectOnce("6334", 0, 0, this.animation.parent, 8);
        };
        GamePlayer.TITLE_HEIGHT = 145;
        return GamePlayer;
    }(s.SmartObject));
    s.GamePlayer = GamePlayer;
    __reflect(GamePlayer.prototype, "s.GamePlayer");
})(s || (s = {}));
