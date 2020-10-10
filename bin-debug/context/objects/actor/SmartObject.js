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
    var hitPoint = new egret.Point();
    var SmartObject = (function (_super) {
        __extends(SmartObject, _super);
        function SmartObject(type) {
            var _this = _super.call(this, type) || this;
            _this._scale = 1.0;
            _this._direct = -1;
            _this._fixedMoveSpeed = 5;
            _this._moveSpeed = 0;
            _this._attackSpeed = 1;
            _this._master = null; //该单位属于哪个主角(主角和武将都有这个属性，怪物没有)
            _this._teamLeader = null;
            _this._buffEffects = {}; //buff特效分为 头顶1｜身上2｜脚下3｜头顶一次11｜身上一次12｜脚下一次13
            _this._justSupportTime = 0;
            _this._targetChangeHandlers = new utils.Handlers(false);
            _this._deadHandlers = new utils.Handlers(false);
            _this._buffListObject = new s.BuffListObject(_this);
            _this._conllision = new s.CircleCollision(_this, 30);
            _this.createChildren();
            _this._hitRect = new egret.Rectangle(0, 0, 75, 150);
            _this._skinEnabled = true;
            return _this;
        }
        SmartObject.prototype.createChildren = function () {
            this.createShadow();
            this.createTitle();
            this.createAnimation();
        };
        SmartObject.prototype.createShadow = function () {
            var _this = this;
            this._shadow = new egret.Bitmap();
            RES.getResAsync("scene_json.scene_shadow", function (t) {
                _this._shadow.texture = t;
                _this._shadow.anchorOffsetX = _this._shadow.width / 2;
                _this._shadow.anchorOffsetY = _this._shadow.height / 2;
            }, this);
        };
        SmartObject.prototype.createTitle = function () {
            this._title = new s.TitleObject();
            this._titleDrum = new s.DrumChatObject();
        };
        SmartObject.prototype.showDebugBuffText = function (str) {
            if (!this._title)
                return;
            this._title.showDebugBuffText(str);
        };
        SmartObject.prototype.createAnimation = function () { };
        /**取模型配置 */
        SmartObject.prototype.getModel = function () {
            return this._modleData;
        };
        SmartObject.prototype.addTo = function (scene) {
            _super.prototype.addTo.call(this, scene);
            if (this.stateDead)
                return;
            if (this._shadow)
                scene.shadowLayer.addChild(this._shadow);
            scene.actorBodyLayer.addChild(this);
            this.updateTitleDisplay();
            //this._title.addTo(scene);
            //if (this._titleDrum) this._titleDrum.addTo(scene);
        };
        SmartObject.prototype.getPosWeight = function () {
            if (this._type == TypeActor.PET) {
                return 1;
            }
            else if (this._type == TypeActor.BOSS) {
                return 1;
            }
            else if (this._type == TypeActor.NPCSUPPORT) {
                return 1;
            }
            return _super.prototype.getPosWeight.call(this);
        };
        SmartObject.prototype.remove = function () {
            _super.prototype.remove.call(this);
            if (this.parent)
                this.parent.removeChild(this);
            if (this._shadow && this._shadow.parent)
                this._shadow.parent.removeChild(this._shadow);
            this._title.remove();
            if (this._titleDrum)
                this._titleDrum.remove();
            this.hideAllEffect();
        };
        SmartObject.prototype.setMaster = function (value) {
            this._master = value;
            if (this._masterChangeHandlers) {
                this._masterChangeHandlers.run();
            }
        };
        Object.defineProperty(SmartObject.prototype, "master", {
            get: function () {
                return this._master;
            },
            enumerable: true,
            configurable: true
        });
        SmartObject.prototype.onMasterChange = function (caller, method) {
            if (!this._masterChangeHandlers) {
                this._masterChangeHandlers = new utils.Handlers(false);
            }
            this._masterChangeHandlers.add(caller, method);
        };
        SmartObject.prototype.offMasterChange = function (caller, method) {
            if (this._masterChangeHandlers) {
                this._masterChangeHandlers.remove(caller, method);
            }
        };
        SmartObject.prototype.offAllMasterChange = function () {
            if (this._masterChangeHandlers) {
                this._masterChangeHandlers.clear();
            }
        };
        /**获取自己当前队长 */
        SmartObject.prototype.getTeamLeader = function () {
            if (this._master != null) {
                return this._teamLeader;
            }
            return this; //不是玩家单位队长就是自己
        };
        SmartObject.prototype.setTeamLeader = function (fs) {
            this._teamLeader = fs;
        };
        SmartObject.prototype.isTeamLeader = function () {
            if (this._teamLeader == this) {
                return true;
            }
            return false;
        };
        //队伍全部死亡
        SmartObject.prototype.isTeamAllDead = function () {
            return this.vo ? this.vo.stateTeamDead : true;
        };
        SmartObject.prototype.pos = function (x, y) {
            _super.prototype.pos.call(this, x, y);
            if (!!this._shadow) {
                this._shadow.x = x;
                this._shadow.y = y;
            }
            this.updateAllEffectPos();
            this._title.pos(x, y);
            if (this._titleDrum)
                this._titleDrum.pos(x, y);
        };
        Object.defineProperty(SmartObject.prototype, "alpha", {
            get: function () {
                return egret.superGetter(SmartObject, this, "alpha");
            },
            set: function (v) {
                egret.superSetter(SmartObject, this, "alpha", v);
                this._animation.alpha = v;
                if (this._shadow)
                    this._shadow.alpha = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "tapEnabled", {
            get: function () {
                return !!this._tapEnabled;
            },
            set: function (v) {
                if (this._tapEnabled != v) {
                    this._tapEnabled = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "conllision", {
            get: function () {
                return this._conllision;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "bornTile", {
            get: function () {
                return this._bornTile;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "titleHeight", {
            get: function () {
                return this._title.titleHeight;
            },
            set: function (value) {
                value = value * this._scale;
                this._title.titleHeight = value;
                if (this._titleDrum)
                    this._titleDrum.titleHeight = value;
                this._conllision.center.y = -value / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "titleColor", {
            set: function (value) {
                this._title.color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "nameVisible", {
            set: function (value) {
                this._title.nameVisible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "levelVisible", {
            set: function (value) {
                this._title.levelVisible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "bloodVisible", {
            set: function (value) {
                this._title.bloodVisible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "autoAttack", {
            /**AI启动后是否自动选择目标攻击*/
            get: function () {
                return this._ai.autoSelectAttack;
            },
            set: function (value) {
                this._ai.autoSelectAttack = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "focusMode", {
            /**专注模式 技能只作用于当前单一目标单位*/
            get: function () {
                return this._ai.focusMode;
            },
            set: function (value) {
                this._ai.focusMode = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "skinEnabled", {
            /**皮肤开关 */
            get: function () {
                return this._skinEnabled;
            },
            set: function (value) {
                if (this._skinEnabled != value) {
                    this._skinEnabled = value;
                    if (this._animation) {
                        if (this._skinEnabled) {
                            if (!this._animation.parent) {
                                this.addChild(this._animation);
                                this.updateAnimation();
                            }
                        }
                        else {
                            if (this._animation.parent) {
                                this._animation.parent.removeChild(this._animation);
                            }
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "effectEnabled", {
            /**技能效果开关 */
            get: function () {
                return this._vo ? this._vo.effectEnabled : false;
            },
            set: function (value) {
                if (this._vo) {
                    this.vo.effectEnabled = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "damgeEnabled", {
            /**技能伤害开关 */
            get: function () {
                return this._vo ? this._vo.damgeEnabled : false;
            },
            set: function (value) {
                if (this._vo) {
                    this.vo.damgeEnabled = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "aiClass", {
            /**AI类型 */
            get: function () {
                return this._aiClass;
            },
            /**设置AI */
            set: function (value) {
                if (this._aiClass == value) {
                    return;
                }
                this._aiClass = value;
                this._aiChange = true;
            },
            enumerable: true,
            configurable: true
        });
        SmartObject.prototype.getAI = function () {
            return this._ai;
        };
        SmartObject.prototype.updateTilePosition = function () {
            if (this._vo && this._tileNode) {
                this._vo.tileX = this._tileNode.x;
                this._vo.tileY = this._tileNode.y;
            }
            _super.prototype.updateTilePosition.call(this);
        };
        Object.defineProperty(SmartObject.prototype, "tileX", {
            get: function () {
                return this._vo ? this._vo.tileX : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "tileY", {
            get: function () {
                return this._vo ? this._vo.tileY : 0;
            },
            enumerable: true,
            configurable: true
        });
        SmartObject.prototype.initialize = function (vo) {
            if (!vo)
                return;
            this._avatarEnabled = true;
            this._vo = vo;
            this._vo.onPropertyChange(TypeProperty.Mp, this, this.propertyChangeHandler);
            this._vo.onPropertyChange(TypeProperty.Hp, this, this.propertyChangeHandler);
            this._vo.onPropertyChange(TypeProperty.MaxHp, this, this.propertyChangeHandler);
            this._vo.onTargetChange(this, this.targetChangeHandler);
            //this._vo.onTileChange(this,this.tileChangeHandler);
            this._vo.onDead(this, this.deadHandler);
            this._vo.onRelife(this, this.relifeHandler);
            this._action = "";
            this._target = null;
            this._targetTile = null;
            if (this._vo.petCountry > 0) {
                this._title.name = TypeUnionName.getCountryName(this._vo.petCountry) + "·" + this._vo.name;
            }
            else {
                this._title.name = this._vo.name;
            }
            this.titleColor = TypeQuality.getStarColor(this._vo.petStar);
            //this._title.hpMax = this._vo.hpMax;
            //this._title.hp = this._vo.hp;
            this.updateHpDisplay();
            this.updateMpDisplay();
            this.direct = vo.direct;
            if (vo.moveSpeed > 0) {
                this._fixedMoveSpeed = vo.moveSpeed;
            }
            this.resetMoveSpeed();
            _super.prototype.initialize.call(this, vo);
            //if (this._scene) {
            //	this._title.addTo(this._scene);
            //	if (this._titleDrum) this._titleDrum.addTo(this._scene);
            //}
            this.updateTitleDisplay();
            this.resetBuff();
            if (this._aiClass && this._aiChange) {
                if (this._ai) {
                    this._ai.stop();
                    utils.ObjectPool.to(this._ai, true);
                    this._ai = null;
                }
                this._ai = utils.ObjectPool.from(this._aiClass);
                this._ai.initialize(this);
            }
            this._buffListObject.initialize();
            this.updateTarget();
            this.justSupportTime = 0;
            if (app.gameContext.isMyFriend(this) || app.gameContext.isMySelf(this)) {
                this._title.setGreen();
            }
            else if (app.gameContext.isMyEnemy(this)) {
                this._title.setRed();
            }
            else {
                this._title.setBlue();
            }
            this.scaleX = this.scaleY = this._scale;
        };
        SmartObject.prototype.reset = function () {
            utils.timer.clearAll(this);
            this.clearBright();
            this.resetBuff();
            this._buffListObject.reset();
            this.setTile(null);
            if (this._ai) {
                this._ai.stop();
                utils.ObjectPool.to(this._ai, true);
                this._ai = null;
            }
            if (this._vo) {
                this._vo.offTargetChange(this, this.targetChangeHandler);
                //this._vo.offAllTargetChange();
                this._vo.offDeadAll();
                this._vo.offRelifeAll();
                this._vo.offTileAllChange();
                this._vo.offPropertyChange(TypeProperty.Mp, this, this.propertyChangeHandler);
                this._vo.offPropertyChange(TypeProperty.Hp, this, this.propertyChangeHandler);
                this._vo.offPropertyChange(TypeProperty.MaxHp, this, this.propertyChangeHandler);
                vo.toPool(this._vo);
                this._vo = null;
            }
            this.scaleX = this.scaleY = this._scale = 1.0;
            this._action = "";
            this.direct = -1;
            this._target = null;
            this._targetTile = null;
            this._aiClass = null;
            this.offDeadAll();
            this.offRelifeAll();
            this.offTargetChangeAll();
            this.hideAllEffect();
            if (this._animation && !this._animation.parent)
                this.addChild(this._animation);
            this._skinEnabled = true;
            this._effectEnabled = true;
            this._master = null;
            this._teamLeader = null;
            this.offAllMasterChange();
            _super.prototype.reset.call(this);
        };
        SmartObject.prototype.resetBuff = function () {
            if (this._buffListObject) {
                this._buffListObject.resetState();
            }
        };
        /**当前是否无法行动 */
        SmartObject.prototype.isSleep = function () {
            if (this.vo == null)
                return false;
            if (this.vo.hasBuff(TypeBuff.BUFF_TYPE_3301)) {
                return true;
            }
            else if (this.vo.hasBuff(TypeBuff.BUFF_TYPE_3308)) {
                return true;
            }
            else if (this.vo.hasBuff(TypeBuff.BUFF_TYPE_3309)) {
                return true;
            }
            return false;
        };
        /**获得当前变身BUFF */
        SmartObject.prototype.getBuffResId = function () {
            var ret = 0;
            if (this.vo != null) {
                ret = this.vo.getBuffValue(TypeBuff.BUFF_TYPE_9013);
            }
            return ret;
        };
        /**普攻CD效果，<0为增加CD，>0为减少CD */
        SmartObject.prototype.getBaseAttackAddCDRate = function () {
            var ret = 0;
            if (this.vo != null) {
                ret -= this.vo.getBuffValue(TypeBuff.BUFF_TYPE_3303);
                ret = ret / 10000;
            }
            return ret;
        };
        /**技能CD效果，<0为增加CD，>0为减少CD */
        SmartObject.prototype.getSkillAttackAddCDRate = function () {
            var ret = 0;
            if (this.vo != null) {
                ret -= this.vo.getBuffValue(TypeBuff.BUFF_TYPE_3304);
                ret = ret / 10000;
            }
            return ret;
        };
        /**移动速度加减比例 */
        SmartObject.prototype.getMoveSpeedAddCDRate = function () {
            var ret = 0;
            if (this.vo != null) {
                ret = this.vo.getBuffValue(TypeBuff.BUFF_TYPE_3305);
                ret = ret / 10000;
            }
            return ret;
        };
        /**沉默【无法释放技能包括XP】 */
        SmartObject.prototype.isForbiddenSkill = function () {
            if (this.vo == null)
                return false;
            if (this.vo.hasBuff(TypeBuff.BUFF_TYPE_3306)) {
                return true;
            }
            return false;
        };
        /**止足【无法移动】 */
        SmartObject.prototype.isForbiddenMove = function () {
            if (this.vo == null)
                return false;
            if (this.vo.hasBuff(TypeBuff.BUFF_TYPE_3307)) {
                return true;
            }
            return false;
        };
        SmartObject.prototype.canAttack = function () {
            if (this._ai) {
                return this._ai.canAttack();
            }
            return false;
        };
        Object.defineProperty(SmartObject.prototype, "hpAutoEnabled", {
            /**设置自动回血开关 */
            set: function (v) {
                this.vo.hpAutoEnabled = v;
            },
            enumerable: true,
            configurable: true
        });
        SmartObject.prototype.targetChangeHandler = function () {
            this.updateTarget();
            this._targetChangeHandlers.runWith(this._target);
        };
        SmartObject.prototype.tileChangeHandler = function (tileX, tileY) {
            if (this._scene)
                _super.prototype.setTile.call(this, this._scene.getNode(tileX, tileY));
            this.updateMaskState();
            if (this._tileChangeHandlers) {
                this._tileChangeHandlers.run();
            }
        };
        SmartObject.prototype.deadHandler = function (killer) {
            this.resetBuff();
            this.hideAllEffect();
            this._title.remove();
            if (this._titleDrum)
                this._titleDrum.remove();
            if (this._master != null) {
                this._master.refreshTeamLeader();
            }
            this._deadHandlers.runWith(killer);
        };
        SmartObject.prototype.relifeHandler = function () {
            this.alpha = 1.0;
            this.updateTilePosition();
            this.updateTitleDisplay();
            // if (this._scene) {
            // 	this._title.addTo(this._scene);
            // 	if (this._titleDrum) this._titleDrum.addTo(this._scene);
            // }
            if (this._relifeHandlers)
                this._relifeHandlers.run();
        };
        SmartObject.prototype.propertyChangeHandler = function (smartVO, propertyId) {
            switch (propertyId) {
                case TypeProperty.MaxHp:
                case TypeProperty.Hp:
                    this.updateHpDisplay();
                    break;
                case TypeProperty.Mp:
                    this.updateMpDisplay();
                    break;
            }
        };
        SmartObject.prototype.updateHpDisplay = function () {
            if (!this._vo)
                return;
            var hpMax = this._vo.battleHpMax;
            this._title.hpMax = hpMax;
            this._title.hp = this._vo.battleHp > hpMax ? hpMax : this._vo.battleHp;
        };
        SmartObject.prototype.updateMpDisplay = function () {
            if (!this._vo)
                return;
            this._title.mpMax = this._vo.mpMax;
            this._title.mp = this._vo.mp;
        };
        /**
         * 带飞入特效的启动方法
         */
        SmartObject.prototype.come = function (delay, resId) {
            if (delay === void 0) { delay = 0; }
            if (resId === void 0) { resId = "6158"; }
            if (delay) {
                utils.timer.once(delay, this, this.comeHandler, false, resId);
            }
            else {
                this.comeHandler(resId);
            }
        };
        SmartObject.prototype.comeHandler = function (resId) {
            var effect = utils.ObjectPool.from(s.AnimationBitmap);
            effect.frameRate = 12;
            effect.setResId(resId);
            this.addChild(effect);
            effect.playOnce();
            //effect.blendMode=egret.BlendMode.ADD;
            effect.onCompleteOnce(this, function () {
                effect.stop();
                effect.reset();
                effect.parent.removeChild(effect);
                utils.ObjectPool.to(effect);
            });
        };
        SmartObject.prototype.setTile = function (tile) {
            _super.prototype.setTile.call(this, tile);
            if (this._vo && this._tileNode) {
                if (this._vo.tileX != this._tileNode.x || this._vo.tileY != this._tileNode.y) {
                    this._vo.tileX = this._tileNode.x;
                    this._vo.tileY = this._tileNode.y;
                }
            }
        };
        Object.defineProperty(SmartObject.prototype, "tileNode", {
            get: function () {
                return this._tileNode ? this._tileNode : (this._scene ? this._scene.getNode(this._vo.tileX, this._vo.tileY) : null);
            },
            enumerable: true,
            configurable: true
        });
        SmartObject.prototype.start = function (children) {
            if (children === void 0) { children = true; }
            this._bornTile = this._tileNode;
            this.updateTilePosition();
            this.updateTitleDisplay();
            if (this.stateDead)
                return;
            // this._title.addTo(this.scene);
            // if (this._titleDrum) this._titleDrum.addTo(this.scene);
            this._ai.start();
        };
        SmartObject.prototype.stop = function (children) {
            if (children === void 0) { children = true; }
            if (this._ai)
                this._ai.stop();
        };
        SmartObject.prototype.stopAnimation = function () {
            if (this._animation != null) {
                this._animation.stop();
            }
        };
        SmartObject.prototype.playAnimation = function () {
            if (this._animation != null) {
                this._animation.play();
            }
        };
        SmartObject.prototype.hpRecover = function (hp) {
            return this._vo.hpRecover(hp);
        };
        /**仅客户端用 */
        SmartObject.prototype.hpHurted = function (value, target) {
            if (target === void 0) { target = null; }
            var v = this._vo.hpHurted(value, target);
            if (this._hurtedHandler) {
                var once = this._hurtedHandler.once;
                this._hurtedHandler.runWith(target);
                if (once)
                    this._hurtedHandler = null;
            }
            return v;
        };
        SmartObject.prototype.setBeatBackState = function (master) {
            if (!this._ai || !this._ai.runing)
                return false;
            this._ai.setBeatBackState(master);
        };
        SmartObject.prototype.flash = function () {
            var brightFilter = utils.filterUtil.brightFilters;
            if (this._animation.filters != brightFilter) {
                this._animation.filters = brightFilter;
            }
            utils.timer.once(100, this, this.clearBright, true);
        };
        SmartObject.prototype.clearBright = function () {
            this._animation.filters = null;
        };
        SmartObject.prototype.doZoom = function () {
            //this.comeHandler("12702");
            //this._animation
            /*var scaleRate:number = this._scale;
            egret.Tween.removeTweens(this);

            var zoomRate:number = 1.35;
            egret.Tween.get(this).to({ scaleX: zoomRate * scaleRate, scaleY: zoomRate * scaleRate }, 100, utils.Ease.quadOut).to({},1600).to({scaleX: 1 * scaleRate, scaleY: 1 * scaleRate }, 100, utils.Ease.quartIn);
            
            //var h:number = this._title.titleHeight;
            egret.Tween.get(this._title).to({titleScale: zoomRate}, 100, utils.Ease.quadOut).to({},1600).to({titleScale: 1.0 }, 100, utils.Ease.quartIn);*/
        };
        //protected _buffHeadEffect: ObjectEffectPart; //buff头顶特效
        //protected _buffBodyEffect: ObjectEffectPart; //buff身上特效
        //protected _buffFootEffect: ObjectEffectPart; //buff脚下特效
        //protected _buffHeadOnceEffect: ObjectEffectPart; //buff头顶一次性特效
        //protected _buffBodyOnceEffect: ObjectEffectPart; //buff身上一次性特效
        //protected _buffFootOnceEffect: ObjectEffectPart; //buff脚下一次性特效
        SmartObject.prototype.hideAllEffect = function () {
            this.hideBodyEffect();
            //this.hideClothesFrontEffect();
            //this.hideClothesBehindEffect();
            this.hideHeadEffect();
            this.hideFootEffect();
            this.hideSkillEffect();
            this.hideAllBuffEffect();
        };
        SmartObject.prototype.updateAllEffectPos = function () {
            if (this._clothesEffectFront)
                this._clothesEffectFront.updatePos();
            if (this._clothesEffectBehind)
                this._clothesEffectBehind.updatePos();
            if (this._headEffect)
                this._headEffect.updatePos();
            if (this._bodyEffect)
                this._bodyEffect.updatePos();
            if (this._footEffect)
                this._footEffect.updatePos();
            if (this._skillEffect)
                this._skillEffect.updatePos();
            for (var pos in this._buffEffects) {
                if (this._buffEffects[pos]) {
                    this._buffEffects[pos].updatePos();
                }
            }
        };
        SmartObject.prototype.updateAllEffect = function () {
            if (this._bodyEffect)
                this._bodyEffect.update();
            if (this._clothesEffectFront)
                this._clothesEffectFront.update();
            if (this._clothesEffectBehind)
                this._clothesEffectBehind.update();
            if (this._headEffect)
                this._headEffect.update();
            if (this._footEffect)
                this._footEffect.update();
            if (this._skillEffect)
                this._skillEffect.update();
            for (var pos in this._buffEffects) {
                if (this._buffEffects[pos]) {
                    this._buffEffects[pos].update();
                }
            }
        };
        /**buff特效**/
        SmartObject.prototype.showBuffEffect = function (pos, resId) {
            if (!this._buffEffects[resId]) {
                var effectPos = pos % 10;
                var effectLayer = this._scene.effectFrontLayer;
                if (effectPos == 4) {
                    effectLayer = this._scene.effectBehindLayer;
                }
                this._buffEffects[resId] = new s.ObjectEffectPart(effectLayer, this, effectPos);
            }
            var loop = true; //pos>10为一次性特效，在battleManager处理
            this._buffEffects[resId].show(resId, 1, loop);
        };
        SmartObject.prototype.hideBuffEffect = function (pos, resId) {
            if (this._buffEffects[resId]) {
                if (this._buffEffects[resId].resId == resId) {
                    this._buffEffects[resId].hide();
                }
            }
        };
        SmartObject.prototype.hideAllBuffEffect = function () {
            for (var pos in this._buffEffects) {
                if (this._buffEffects[pos]) {
                    this._buffEffects[pos].hide();
                }
            }
        };
        /**技能释放或击中特效**/
        SmartObject.prototype.showSkillEffect = function (resId, frameRate) {
            if (frameRate === void 0) { frameRate = 12; }
            if (!this._skillEffect) {
                this._skillEffect = new s.ObjectEffectPart(this._scene.effectFrontLayer, this);
            }
            this._skillEffect.show(resId, 1, false, null, null, frameRate);
        };
        SmartObject.prototype.hideSkillEffect = function () {
            if (this._skillEffect)
                this._skillEffect.hide();
        };
        /**身体外包裹特效  小飞龙围绕特效**/
        SmartObject.prototype.showBodyEffect = function (resId, alpha, loop, caller, method) {
            if (alpha === void 0) { alpha = 1; }
            if (loop === void 0) { loop = true; }
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            if (!this._bodyEffect) {
                this._bodyEffect = new s.ObjectEffectPart(this._scene.effectFrontLayer, this, 2);
            }
            this._bodyEffect.show(resId, alpha, loop, caller, method);
        };
        SmartObject.prototype.hideBodyEffect = function () {
            if (this._bodyEffect)
                this._bodyEffect.hide();
        };
        // /**时装包裹特效**/
        // public showClothesBehindEffect(resId: string, alpha: number = 1, loop: boolean = true, caller: any = null, method: Function = null) {
        // 	if (!this._clothesEffectBehind) {
        // 		this._clothesEffectBehind = new ObjectEffectPart(this._scene.effectBehindLayer, this);
        // 	}
        // 	this._clothesEffectBehind.show(resId, alpha, loop, caller, method);
        // }
        // public hideClothesBehindEffect() {
        // 	if (this._clothesEffectBehind) this._clothesEffectBehind.hide();
        // }
        // /**时装包裹特效**/
        // public showClothesFrontEffect(resId: string, alpha: number = 1, loop: boolean = true, caller: any = null, method: Function = null) {
        // 	if (!this._clothesEffectFront) {
        // 		this._clothesEffectFront = new ObjectEffectPart(this._scene.effectFrontLayer, this);
        // 	}
        // 	this._clothesEffectFront.show(resId, alpha, loop, caller, method);
        // }
        // public hideClothesFrontEffect() {
        // 	if (this._clothesEffectFront) this._clothesEffectFront.hide();
        // }
        /**头顶特效**/
        SmartObject.prototype.showHeadEffect = function (resId, alpha, loop, caller, method) {
            if (alpha === void 0) { alpha = 1; }
            if (loop === void 0) { loop = true; }
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            if (!this._scene)
                return;
            if (!this._headEffect) {
                this._headEffect = new s.ObjectEffectPart(this._scene.effectFrontLayer, this, 0);
            }
            this._headEffect.show(resId, alpha, loop, caller, method);
        };
        SmartObject.prototype.hideHeadEffect = function () {
            if (this._headEffect)
                this._headEffect.hide();
        };
        /**脚底特效**/
        SmartObject.prototype.showFootEffect = function (resId, alpha, loop, caller, method) {
            if (alpha === void 0) { alpha = 1; }
            if (loop === void 0) { loop = true; }
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            if (!this._scene)
                return;
            if (!this._footEffect) {
                this._footEffect = new s.ObjectEffectPart(this._scene.effectBehindLayer, this);
            }
            this._footEffect.show(resId, alpha, loop, caller, method);
        };
        SmartObject.prototype.hideFootEffect = function () {
            if (this._footEffect)
                this._footEffect.hide();
        };
        SmartObject.prototype.addBuff = function (buffVO) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            (_a = this._vo).addBuff.apply(_a, [buffVO].concat(args));
            var _a;
        };
        SmartObject.prototype.removeBuff = function (buff) {
            this._vo.removeBuff(buff);
        };
        SmartObject.prototype.hasBuff = function (type) {
            return this._vo.hasBuff(type);
        };
        SmartObject.prototype.onMoveStart = function (caller, method) {
            this._ai.onMoveStart(caller, method);
        };
        SmartObject.prototype.offMoveStart = function () {
            if (this._ai)
                this._ai.offMoveStart();
        };
        SmartObject.prototype.onMoveEnd = function (caller, method) {
            this._ai.onMoveEnd(caller, method);
        };
        SmartObject.prototype.offMoveEnd = function () {
            if (this._ai)
                this._ai.offMoveEnd();
        };
        SmartObject.prototype.onSkillStart = function (caller, method) {
            this._ai.onSkillStart(caller, method);
        };
        SmartObject.prototype.offSkillStart = function () {
            this._ai.offSkillStart();
        };
        SmartObject.prototype.onDead = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._deadHandlers.add(caller, method, args);
        };
        /**添加死亡优先回调 */
        SmartObject.prototype.onDeadPriority = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._deadHandlers.addPriority(caller, method, args);
        };
        SmartObject.prototype.offDead = function (caller, method) {
            this._deadHandlers.remove(caller, method);
        };
        SmartObject.prototype.offDeadAll = function () {
            this._deadHandlers.clear();
        };
        SmartObject.prototype.onRelife = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._relifeHandlers)
                this._relifeHandlers = new utils.Handlers(false);
            this._relifeHandlers.add(caller, method, args);
        };
        /**添加复活优先回调 */
        SmartObject.prototype.onRelifePriority = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._relifeHandlers)
                this._relifeHandlers = new utils.Handlers(false);
            this._relifeHandlers.addPriority(caller, method, args);
        };
        SmartObject.prototype.offRelife = function (caller, method) {
            if (this._relifeHandlers)
                this._relifeHandlers.remove(caller, method);
        };
        SmartObject.prototype.offRelifeAll = function () {
            if (this._relifeHandlers)
                this._relifeHandlers.clear();
        };
        SmartObject.prototype.onTargetChange = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._targetChangeHandlers)
                this._targetChangeHandlers = new utils.Handlers(false);
            this._targetChangeHandlers.add(caller, method, args);
        };
        /**添加复活优先回调 */
        SmartObject.prototype.onTargetChangePriority = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._targetChangeHandlers)
                this._targetChangeHandlers = new utils.Handlers(false);
            this._targetChangeHandlers.addPriority(caller, method, args);
        };
        SmartObject.prototype.offTargetChange = function (caller, method) {
            if (this._targetChangeHandlers)
                this._targetChangeHandlers.remove(caller, method);
        };
        SmartObject.prototype.offTargetChangeAll = function () {
            if (this._targetChangeHandlers)
                this._targetChangeHandlers.clear();
        };
        /**监听受到伤害 */
        SmartObject.prototype.onHurtedOnce = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offHurted();
            this._hurtedHandler = utils.Handler.create(caller, method, args, true);
        };
        SmartObject.prototype.offHurted = function () {
            if (this._hurtedHandler) {
                this._hurtedHandler.recover();
                this._hurtedHandler = null;
            }
        };
        Object.defineProperty(SmartObject.prototype, "vo", {
            get: function () {
                return this._vo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "stateMerged", {
            get: function () {
                if (!this._vo)
                    return true;
                return this._vo.isMerged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "stateDead", {
            get: function () {
                return !this._vo || this._vo.stateDead;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "isJustDead", {
            get: function () {
                if (this._vo && egret.getTimer() - this._vo.lastDeadTime < 800) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "justSupportTime", {
            get: function () {
                return this._justSupportTime;
            },
            set: function (v) {
                this._justSupportTime = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "fixedMoveSpeed", {
            get: function () {
                return this._fixedMoveSpeed;
            },
            set: function (v) {
                if (this._fixedMoveSpeed != v) {
                    this._fixedMoveSpeed = v;
                    if (this._fixedMoveSpeed > this.moveSpeed) {
                        this.moveSpeed = this._fixedMoveSpeed;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "moveSpeed", {
            get: function () {
                return this._moveSpeed;
            },
            set: function (v) {
                if (this._moveSpeed != v) {
                    this._moveSpeed = v;
                    //this.attackSpeed=(this._moveSpeed/5)*2;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "attackSpeed", {
            get: function () {
                return this._attackSpeed;
            },
            set: function (v) {
                if (this._attackSpeed) {
                    this._attackSpeed = v;
                    //this._animation.frameRateScale = this._attackSpeed;
                }
            },
            enumerable: true,
            configurable: true
        });
        SmartObject.prototype.resetMoveSpeed = function () {
            this.moveSpeed = this._fixedMoveSpeed;
        };
        SmartObject.prototype.resetAttackSpeed = function () {
            this._attackSpeed = 1;
        };
        SmartObject.prototype.updateTarget = function () {
            if (this._target && this._target.vo == this.targetVO)
                return;
            this.target = app.gameContext.gameCurrent.getObjectByVO(this.targetVO);
        };
        Object.defineProperty(SmartObject.prototype, "target", {
            /**目标实体 */
            get: function () {
                return this._target;
            },
            set: function (v) {
                this._target = v;
                /*if (this._vo) {
                    this._vo.setTarget(v ? v.vo : null, true);
                }*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "targetVO", {
            /**目标数据 */
            get: function () {
                return this._vo ? this._vo.target : null;
            },
            set: function (v) {
                if (this._vo) {
                    this._vo.setTarget(v, true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "targetTile", {
            /**目标格子 */
            get: function () {
                return this._targetTile;
            },
            set: function (v) {
                this._targetTile = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "action", {
            get: function () { return this._action; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "direct", {
            get: function () { return this._direct; },
            set: function (value) {
                this._direct = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmartObject.prototype, "avatarEnabled", {
            get: function () {
                return this._avatarEnabled;
            },
            enumerable: true,
            configurable: true
        });
        /**更新外观显示 */
        SmartObject.prototype.updateAvatarDisplay = function (isShow) {
            if (this._avatarEnabled != isShow) {
                this._avatarEnabled = isShow;
                this.updateAllEffect();
                this.updateAnimation();
                this.updateTitleDisplay();
                this.updateShadowDisplay();
                return true;
            }
            return false;
        };
        SmartObject.prototype.updateTitleDisplay = function () {
            if (this._avatarEnabled && this.stateDead == false) {
                this._title.addTo(this._scene);
            }
            else {
                this._title.remove();
            }
        };
        SmartObject.prototype.updateShadowDisplay = function () {
            if (this._avatarEnabled && this.stateDead == false) {
                if (this._shadow && this._scene)
                    this._scene.shadowLayer.addChild(this._shadow);
            }
            else {
                if (this._shadow && this._shadow.parent)
                    this._shadow.parent.removeChild(this._shadow);
            }
        };
        /**重复播放动作 */
        SmartObject.prototype.actionTo = function (v, direction, frameRate) {
            if (direction === void 0) { direction = -1; }
            if (frameRate === void 0) { frameRate = 0; }
            if (this.stateDead)
                return;
            //if(this._action==v) return;
            if (this.type == TypeActor.PLAYER && v != this._action) {
                //logger.log("actionOnce::" + v);
                //logger.error("actionTo::" + v);
            }
            this._action = v;
            if (direction != -1)
                this.direct = direction;
            this._actionLoop = true;
            this._actionFrameRate = frameRate;
            this._animation.offAllComplete();
            egret.callLater(this.updateAction, this);
        };
        /**播放完后回到待机动作 */
        SmartObject.prototype.actionOnce = function (v, direction, frameRate) {
            if (direction === void 0) { direction = -1; }
            if (frameRate === void 0) { frameRate = 0; }
            if (this.stateDead)
                return false;
            if (this.type == TypeActor.PLAYER && v != this._action) {
                //logger.log("actionOnce::" + v);
                //logger.error("actionOnce::" + v);
            }
            this._action = v;
            if (direction != -1)
                this.direct = direction;
            this._actionLoop = false;
            this._actionFrameRate = frameRate;
            this._animation.offAllComplete();
            egret.callLater(this.updateAction, this);
            return true;
        };
        /**死亡不显示后退动画 */
        SmartObject.prototype.deadActionImmediately = function () {
            this.visible = false;
            this.deadAction();
        };
        /**死亡动作 */
        SmartObject.prototype.deadAction = function () {
            this._title.remove();
            if (this._titleDrum)
                this._titleDrum.remove();
            this._action = TypeAction.DEAD;
            this._actionLoop = false;
            this._animation.offAllComplete();
            egret.callLater(this.updateAction, this);
        };
        SmartObject.prototype.idleAction = function () {
            this._animation.offAllComplete();
            this.actionTo(TypeAction.IDLE, this._direct);
        };
        SmartObject.prototype.updateAction = function () {
            if (this._direct == -1)
                this.direct = TypeDirection.DOWN;
            if (this._action == TypeAction.DEAD) {
                this.updateAnimation();
                this._animation.gotoAndStopEnd();
            }
            else {
                this.visible = true;
                if (this._actionLoop) {
                    this.updateAnimation();
                    if (this._actionFrameRate)
                        this._animation.frameRate = this._actionFrameRate;
                    this._animation.play();
                }
                else {
                    this.updateAnimation();
                    if (this._actionFrameRate)
                        this._animation.frameRate = this._actionFrameRate;
                    this._animation.onCompleteOnce(this, this.idleAction);
                    this._animation.playOnce();
                }
            }
        };
        SmartObject.prototype.updateAnimation = function () {
            if (!this._skinEnabled || !this._avatarEnabled || !this._action || this._direct == undefined || this._direct == -1) {
                return;
            }
            this._animation.frameRate = TypeAction.getFrameRate(this._type, this._action);
            if (this._action == TypeAction.ATTACK0) {
                this._animation.frameRateScale = this._attackSpeed;
            }
            else if (this._action == TypeAction.RUN) {
                this._animation.frameRateScale = 0.8 + this.getMoveSpeedAddCDRate(); //移速加快
            }
            else {
                this._animation.frameRateScale = 0.8; //攻速加快
            }
            //this._animation.frameRateScale = 1.0;
        };
        SmartObject.prototype.updateRender = function (timeStamp) {
            if (this._ai)
                this._ai.updateRender(timeStamp);
            return true;
        };
        SmartObject.prototype.hitTestPoint = function (sceneX, sceneY) {
            if (!this._tapEnabled)
                return false;
            hitPoint.x = sceneX - this.x;
            hitPoint.y = sceneY - this.y;
            if (this._hitRect.containsPoint(hitPoint)) {
                return true;
            }
            return false;
        };
        SmartObject.prototype.isNeedShowEffect = function () {
            if (!this.vo)
                return false;
            if (!this.avatarEnabled)
                return false; //不显示外观时，飘血也不显示
            if (this.type != TypeActor.PLAYER && this.stateDead)
                return false; //死了就不显示特效
            if (TypeGame.isFormationGame() == false) {
                if (!app.gameContext.isMySelf(this)) {
                    var gamePlayer = app.gameContext.scene.manager.player;
                    var teamTargetVO = gamePlayer.getTeamTargetVO();
                    if (this.vo.isSelfTeam(teamTargetVO)) {
                        return true;
                    }
                    if (this.vo.master && gamePlayer.vo && gamePlayer.vo.isSelfTeam(this.vo.master.getTeamTarget())) {
                        return true;
                    }
                    return false;
                }
            }
            return true;
        };
        return SmartObject;
    }(s.SceneObject));
    s.SmartObject = SmartObject;
    __reflect(SmartObject.prototype, "s.SmartObject", ["s.IFocusObject"]);
})(s || (s = {}));
