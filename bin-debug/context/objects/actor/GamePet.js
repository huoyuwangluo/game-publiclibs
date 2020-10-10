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
    var GamePet = (function (_super) {
        __extends(GamePet, _super);
        //protected _foot: FootLightObject;
        function GamePet() {
            var _this = _super.call(this, TypeActor.PET) || this;
            _this._lastNotHorseTime = 0;
            _this._isPlayer = false;
            _this._tileObstructEnabled = true;
            return _this;
        }
        GamePet.prototype.createAnimation = function () {
            //this._animation = new DirectAnimationBitmap();
            //this._animation.initialize(game.TypeAnimaAsset.ACTOR_DIRECT_5);
            //this.addChild(this.animation);
            this._animation = new s.ActorAnimationGroup();
            this.addChild(this.animation);
            this.animation.addPart(TypePart.BODY);
            this.titleHeight = 160;
        };
        Object.defineProperty(GamePet.prototype, "animation", {
            get: function () {
                return this._animation;
            },
            enumerable: true,
            configurable: true
        });
        /*public get animation(): DirectAnimationBitmap {
            return this._animation as DirectAnimationBitmap;
        }*/
        GamePet.prototype.createTitle = function () {
            this._title = new s.TitlePetObject();
            //this._foot = new FootLightObject();
            //this._titleDrum = new DrumChatObject();
        };
        GamePet.prototype.initialize = function (petVO) {
            if (TypeGame.isFormationGame()) {
                this._scale = 1.5;
            }
            else {
                this._scale = 1.0;
            }
            _super.prototype.initialize.call(this, petVO);
            this.resId = petVO.avatarId;
            this.nameVisible = false;
            this.levelVisible = true;
            if (petVO.master) {
                if (petVO.master == GameModels.user.player) {
                    this.title.setGreen();
                }
                else if (GameModels.user.player.sceneFlag && petVO.master.sceneFlag == GameModels.user.player.sceneFlag) {
                    this.title.setBlue();
                }
            }
            petVO.addEventListener(vo.GamePetVO.STAR_LEVEL_UPDATE, this.updateStarLevel, this);
            this.updateStarLevel();
            if (this.vo.refId == "13000") {
                this._isPlayer = true;
                //this._title.name = (petVO.master?petVO.master.name:petVO.name) + "(" + petVO.lv + "级)";//TypeUnionName.getCountryName(TypeUnionName.ROLEID) + "·" + (petVO.master?petVO.master.name:petVO.name);
            }
            else {
                this._isPlayer = false;
                //this._title.name = petVO.name + "(" + petVO.lv + "级)";//TypeUnionName.getCountryName(petVO.petCountry) + "·" + petVO.name;
            }
            this._title.name = (petVO.master ? petVO.master.name : petVO.name);
            this._title.level = petVO.lv;
            this.titleColor = TypeColor.WHITE; //TypeQuality.getStarColor(petVO.star);
            this.title.soldierType = petVO.soldierType;
            if (petVO.stateDead) {
                this.deadActionImmediately();
            }
            else {
                //this.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
                this.actionTo(TypeAction.IDLE, this.direct);
            }
        };
        GamePet.prototype.reset = function () {
            this._bodyResId = null;
            this._weaponResId = null;
            this._wingResId = null;
            this._horseResId = null;
            this._shadowResId = null;
            this._effectResId = null;
            this._flyEffectResId = null;
            this._bodyFixedResId = null;
            this._weaponFixedResId = null;
            this.animation.reset();
            if (this._vo) {
                this._vo.removeEventListener(vo.GamePetVO.STAR_LEVEL_UPDATE, this.updateStarLevel, this);
            }
            _super.prototype.reset.call(this);
            this._title.reset();
            //this._foot.reset();
            this._resId = '';
        };
        GamePet.prototype.addTo = function (scene) {
            this._lastNotHorseTime = 0;
            _super.prototype.addTo.call(this, scene);
            this.showFashionHalo();
            this.updateMarktitle();
            this.showClothesAvatar();
            this.showFashionWeapon();
            this.showFashionWing();
            this.showHorse();
            //if (this._foot.skin) {
            //	this._foot.addTo(scene);
            //	this._foot.pos(this.x, this.y);
            //}
        };
        GamePet.prototype.avatarChangeHandler = function (smartVO, propertyId) {
            switch (propertyId) {
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
            }
        };
        GamePet.prototype.showClothesAvatar = function () {
            if (!this.master || !this.master.vo)
                return;
            if (!this._isPlayer)
                return;
            var fashionCloth = this.master.vo.getProperty(TypeProperty.FASHION_CLOTH);
            if (fashionCloth) {
                var templateCloth = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionCloth);
                if (templateCloth) {
                    this.bodyResId = templateCloth.modelId;
                    return;
                }
            }
            var equipCloth = this.master.vo.getProperty(TypeProperty.CLOTH_MODLEID);
            if (equipCloth == 0) {
                this.bodyResId = TypeEquip.DEFAULT_CLOTHES;
                return;
            }
            if (equipCloth > 0) {
                this.bodyResId = equipCloth + "";
                return;
            }
            // this.bodyResId = (this.master.vo as vo.GamePlayerVO).clothesAvatarId;
        };
        GamePet.prototype.showFashionWing = function () {
            if (!this.master || !this.master.vo)
                return;
            if (!this._isPlayer)
                return;
            var fashionWing = this.master.vo.getProperty(TypeProperty.WING_MODLEID);
            if (fashionWing > 0) {
                this.wingResId = fashionWing + "";
                return;
            }
            //this.wingResId = "";			
        };
        /**参数主要是为了兼容GM命令 */
        GamePet.prototype.showHorse = function (id) {
            if (id === void 0) { id = 0; }
            if (!this.master || !this.master.vo)
                return;
            if (!this._isPlayer)
                return;
            var fashionHose = this.master.vo.getProperty(TypeProperty.FASHION_HORSE);
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
                    }
                }
            }
        };
        GamePet.prototype.showFashionWeapon = function () {
            if (!this.master || !this.master.vo)
                return;
            if (!this._isPlayer)
                return;
            var fashionWeapon = this.master.vo.getProperty(TypeProperty.FASHION_WEAPON);
            if (fashionWeapon) {
                var templateWeapon = Templates.getTemplateById(templates.Map.GAMEFASHION, fashionWeapon);
                if (templateWeapon) {
                    this.weaponResId = templateWeapon.modelId;
                    return;
                }
            }
            var equipWeapon = this.master.vo.getProperty(TypeProperty.WEAPON_MODLEID);
            if (equipWeapon == 0) {
                this.weaponResId = TypeEquip.DEFAULT_WEAPON;
                return;
            }
            if (equipWeapon > 0) {
                this.weaponResId = equipWeapon + "";
                return;
            }
            // this.weaponResId = (this.master.vo as vo.GamePlayerVO).weaponAvatarId;
        };
        /**时装脚底光环 */
        GamePet.prototype.showFashionHalo = function () {
            if (!this.master || !this.master.vo || !this.vo)
                return;
            if (app.gameContext.isMySelf(this) && !this.stateDead) {
                if (this._isPlayer) {
                    var equipShoes = this.master.vo.getProperty(TypeProperty.FASHION_HALO);
                    if (equipShoes > 0) {
                        var fashionHalo = Templates.getTemplateById(templates.Map.GAMEFASHION, equipShoes);
                        if (fashionHalo) {
                            this.showFootEffect(fashionHalo.modelId);
                            return;
                        }
                    }
                }
                else {
                    var tpl = this.vo.template;
                    if (tpl != null) {
                        var equipShoes = 0;
                        if (tpl.godDevil == 1) {
                            equipShoes = 271503;
                        }
                        else if (tpl.godDevil == 2) {
                            equipShoes = 271504;
                        }
                        if (equipShoes > 0) {
                            var fashionHalo = Templates.getTemplateById(templates.Map.GAMEFASHION, equipShoes);
                            if (fashionHalo) {
                                this.showFootEffect(fashionHalo.modelId);
                                return;
                            }
                        }
                    }
                }
            }
            this.hideFootEffect();
        };
        /**称号显示 */
        GamePet.prototype.updateMarktitle = function () {
            if (!this._isPlayer || !this.master || !this.master.vo) {
                this.title.marktitleSkin = null;
                return;
            }
            var template = Templates.getTemplateById(templates.Map.GAMEFASHION, this.master.vo.getProperty(TypeProperty.DRESSEDTITLE));
            if (template) {
                this.title.marktitleSkin = template.modelId;
            }
            else {
                this.title.marktitleSkin = null;
            }
        };
        GamePet.prototype.getMarkTitleSkin = function () {
            if (this.title) {
                return this.title.marktitleSkin;
            }
            return "";
        };
        /*protected updateHpDisplay() {
            if (!this._vo) return;
            this._title.hpMax = this._vo.hpMax;
            this._title.hp = this._vo.hp > this._vo.hpMax ? this._vo.hpMax : this._vo.hp;
        }*/
        GamePet.prototype.remove = function () {
            _super.prototype.remove.call(this);
            //this._foot.remove();
        };
        GamePet.prototype.pos = function (x, y) {
            _super.prototype.pos.call(this, x, y);
            //if (this._foot.parent) {
            //	this._foot.pos(x, y);
            //}
        };
        GamePet.prototype.updateStarLevel = function () {
            var petVO = this.vo;
            if (petVO) {
                this.titleColor = TypeQuality.getStarColor(petVO.star);
            }
        };
        Object.defineProperty(GamePet.prototype, "resId", {
            set: function (v) {
                if (this._resId == v)
                    return;
                this._resId = v;
                this._modleData = Templates.getTemplateById(templates.Map.DATAMODEL, parseInt(this._resId));
                if (this._modleData)
                    this.titleHeight = this._modleData.HPHight;
                egret.callLater(this.updateAnimation, this);
            },
            enumerable: true,
            configurable: true
        });
        GamePet.prototype.updateAnimation = function () {
            if (!this._skinEnabled) {
                return;
            }
            if (!this._resId || !this._action || this._direct == -1) {
                return;
            }
            _super.prototype.updateAnimation.call(this);
            if (this._isPlayer) {
                this.animation.totalFrame = TypeAction.getTotalFrame(TypeActor.PLAYER, TypeJob.ZHAN, this._action);
                this.animation.frameRate = TypeAction.getFrameRate(TypeActor.PLAYER, this._action);
                this.animation.fullDirect = false;
                this.animation.action = this._action;
                this.animation.direct = this._direct;
                var isHorseState = false;
                var actionFlag = this._action;
                if (this._action == TypeAction.DEAD) {
                    actionFlag = TypeAction.IDLE;
                }
                if (this._horseResId && (actionFlag == TypeAction.RUN || actionFlag == TypeAction.IDLE) && (TypeGame.isHorseGame(app.gameContext.typeGame))) {
                    var isFightState = false;
                    if (this.targetVO != null) {
                        var distance = Math.max(Math.abs(this.tileX - this.targetVO.tileX), Math.abs(this.tileY - this.targetVO.tileY));
                        if (distance < 10) {
                            isFightState = true;
                            this._lastNotHorseTime = egret.getTimer();
                        }
                    }
                    if (!isFightState && egret.getTimer() - this._lastNotHorseTime > 5000) {
                        this.animation.setHorseResKey(this._avatarEnabled ? (this._horseResId + "_" + actionFlag) : null);
                        this.animation.setBodyResKey(this._avatarEnabled ? (this._bodyResId + "_1200") : null);
                        this.animation.setWeaponResKey(this._avatarEnabled ? (this._weaponResId + "_1200") : null);
                        this.animation.setWingResKey(this._avatarEnabled ? (this._wingResId + "_1200") : null);
                        this.titleHeight = 145 + this._horseHeight - 40;
                        this.animation.setPartOffsetY(TypePart.WEAPON, 80 - this._horseHeight);
                        this.animation.setPartOffsetY(TypePart.WING, 100 - this._horseHeight);
                        this.animation.setPartOffsetY(TypePart.BODY, 80 - this._horseHeight);
                        this.animation.totalFrame = 4;
                        this.animation.frameRate = 6;
                        isHorseState = true;
                    }
                }
                else {
                    this._lastNotHorseTime = egret.getTimer();
                }
                this.animation.isHorseState = isHorseState;
                if (!isHorseState) {
                    this.titleHeight = 145;
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
            }
            else {
                this.animation.direct = this._direct;
                this.animation.totalFrame = TypeAction.getTotalFrame(TypeActor.PET, TypeJob.PET, this._action);
                var curResId = this._resId;
                if (this.getBuffResId() > 0) {
                    curResId = "" + this.getBuffResId();
                }
                if (this._action == TypeAction.DEAD) {
                    this.animation.setBodyResKey(this._avatarEnabled ? (curResId + "_" + TypeAction.IDLE) : null);
                }
                else {
                    this.animation.setBodyResKey(this._avatarEnabled ? (curResId + "_" + this._action) : null);
                }
                this.animation.setPartOffsetY(TypePart.BODY, 0);
            }
        };
        Object.defineProperty(GamePet.prototype, "bodyFixedResId", {
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
        Object.defineProperty(GamePet.prototype, "weaponFixedResId", {
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
        Object.defineProperty(GamePet.prototype, "bodyResId", {
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
        Object.defineProperty(GamePet.prototype, "wingResId", {
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
        Object.defineProperty(GamePet.prototype, "weaponResId", {
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
        Object.defineProperty(GamePet.prototype, "horseResId", {
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
        Object.defineProperty(GamePet.prototype, "groupId", {
            get: function () {
                return this._vo.groupId;
            },
            set: function (v) {
                this._vo.groupId = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePet.prototype, "title", {
            get: function () {
                return this._title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePet.prototype, "isPlayer", {
            get: function () {
                return this._isPlayer;
            },
            enumerable: true,
            configurable: true
        });
        return GamePet;
    }(s.SmartObject));
    s.GamePet = GamePet;
    __reflect(GamePet.prototype, "s.GamePet");
})(s || (s = {}));
