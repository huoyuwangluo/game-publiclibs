var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    /**玩家队伍管理 */
    var PetGroup = (function () {
        function PetGroup() {
            this._pets = [];
            this._skinEnabled = true;
            this._mergeEffect = new s.AnimationBitmap();
            this._id = ++PetGroup.uid;
        }
        PetGroup.prototype.initialize = function (player) {
            if (player instanceof s.GamePlayer) {
                this._master = player;
                this._masterVO = player.vo;
                return;
            }
            if (player instanceof vo.GamePlayerVO) {
                this._masterVO = player;
            }
        };
        PetGroup.prototype.reset = function () {
            this.removeFromScene();
            this.offSkillStart();
            this.offMoveStart();
            this.offHpChange();
            this.offAllDead();
            this._master = null;
            this._masterVO = null;
            this._scene = null;
            this._bornNode = null;
            this._directDefault = -1;
            this._aiClass = null;
            this._skinEnabled = true;
        };
        Object.defineProperty(PetGroup.prototype, "aiClass", {
            set: function (v) {
                this._aiClass = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "target", {
            set: function (target) {
                var total = this._pets.length;
                for (var i = 0; i < total; i++) {
                    var pet = this._pets[i];
                    pet.target = target;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "targetVO", {
            set: function (target) {
                var total = this._pets.length;
                for (var i = 0; i < total; i++) {
                    var pet = this._pets[i];
                    pet.targetVO = target;
                }
            },
            enumerable: true,
            configurable: true
        });
        PetGroup.prototype.addToScene = function (scene, node, direct) {
            if (node === void 0) { node = null; }
            if (direct === void 0) { direct = -1; }
            if (!this._scene) {
                this._scene = scene;
                if (node)
                    this._bornNode = node;
                if (direct != -1)
                    this._directDefault = (direct == -1 ? TypeDirection.DOWN : direct);
                if (!this._masterVO)
                    return;
                var playerVO = this._masterVO;
                for (var _i = 0, _a = playerVO.petList.upFormats; _i < _a.length; _i++) {
                    var petVO = _a[_i];
                    this.addToSceneHandler(petVO);
                    /*petVO.onMergeStateChange(this, this.petMergeStateChangeHandler);
                    petVO.onSupportStateChange(this, this.petSupportStateChangeHandler);
                    if (!petVO.isMerged && !petVO.isSupport) {
                        this.addToSceneHandler(petVO);
                    } else {
                        petVO.onPropertyChange(TypeProperty.HP, this, this.hpChangeHandler);
                        petVO.onPropertyChange(TypeProperty.MaxHP, this, this.hpChangeHandler);
                    }*/
                }
                playerVO.petList.onAddFormat(this, this.addToFormatHandler);
                playerVO.petList.onRemoveFromat(this, this.removeFromFormatHandler);
                for (var _b = 0, _c = this._pets; _b < _c.length; _b++) {
                    var pet = _c[_b];
                    pet.setMaster(this._master);
                    pet.setTeamLeader(this._master);
                }
            }
        };
        PetGroup.prototype.removeFromScene = function () {
            if (this._scene) {
                this.stop();
                this._isStart = false;
                this._autoAttack = false;
                if (this._pets.length) {
                    while (this._pets.length) {
                        this.removeFromFormatHandler(this._pets[0]);
                    }
                }
                if (!this._masterVO)
                    return;
                var playerVO = this._masterVO;
                if (playerVO) {
                    /*for (var petVO of playerVO.petList.upFormats) {
                        petVO.offMergeStateChange(this, this.petMergeStateChangeHandler);
                        petVO.offSupportStateChange(this, this.petSupportStateChangeHandler);
                    }*/
                    playerVO.petList.offAddFormat(this, this.addToFormatHandler);
                    playerVO.petList.offRemoveFormat(this, this.removeFromFormatHandler);
                }
                this._scene = null;
                this._skinEnabled = true;
            }
        };
        PetGroup.prototype.updateTile = function () {
            if (this._master && this._master.tileNode)
                this._bornNode = this._master.tileNode;
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.setTile(battle.manager.getAroundRandomNode(this._scene, this._bornNode));
                //pet.actionTo(TypeAction.IDLE, this._directDefault);
                pet.actionTo(TypeAction.IDLE);
            }
        };
        PetGroup.prototype.addToFormatHandler = function (petVO) {
            if (petVO.isFormat) {
                this.addToSceneHandler(petVO).start();
                /*petVO.onMergeStateChange(this, this.petMergeStateChangeHandler);
                petVO.onSupportStateChange(this, this.petSupportStateChangeHandler);
                if (!petVO.isMerged) {
                    this.addToSceneHandler(petVO).start();
                } else {
                    petVO.onPropertyChange(TypeProperty.HP, this, this.hpChangeHandler);
                    petVO.onPropertyChange(TypeProperty.MaxHP, this, this.hpChangeHandler);
                }*/
            }
            return null;
        };
        PetGroup.prototype.addToSceneHandler = function (petVO) {
            if (!this._scene)
                return;
            petVO.offPropertyChange(TypeProperty.Hp, this, this.hpChangeHandler);
            petVO.offPropertyChange(TypeProperty.MaxHp, this, this.hpChangeHandler);
            var pet = this.getPetByVO(petVO);
            if (!!pet)
                return pet;
            var leaderObject = this._master.getTeamLeader();
            pet = utils.ObjectPool.from(s.GamePet, false);
            pet.aiClass = this._aiClass ? this._aiClass : s.AIPet;
            pet.initialize(petVO);
            pet.setMaster(this._master);
            pet.setTeamLeader(leaderObject);
            pet.bloodVisible = true;
            if (this._scene) {
                this._scene.addPet(pet);
                if (petVO.tileX > 0 && petVO.tileY > 0) {
                    pet.setTile(this._scene.getNode(petVO.tileX, petVO.tileY)); //服务端武将的位置
                }
                else {
                    if (leaderObject && leaderObject.tileNode)
                        this._bornNode = leaderObject.tileNode;
                    //pet.setTile(battle.manager.getAroundRandomNode(this._scene, this._bornNode));
                    if (leaderObject != null) {
                        if (pet == leaderObject) {
                            var tNode = app.gameContext.scene.getNode(petVO.tileX, petVO.tileY);
                            pet.setTile(tNode);
                        }
                        else {
                            var leaderMinLockRange = leaderObject.vo ? leaderObject.vo.minLockRange : 3;
                            var fellowNode = this.getFellowNode(this._bornNode.x, this._bornNode.y, leaderObject.direct, leaderMinLockRange, petVO.minLockRange);
                            pet.setTile(fellowNode);
                        }
                    }
                    else {
                        pet.setTile(battle.manager.getAroundRandomNode(this._scene, this._bornNode));
                    }
                }
                //pet.actionTo(TypeAction.IDLE, this._directDefault);
                pet.actionTo(TypeAction.IDLE);
                pet.skinEnabled = this._skinEnabled;
                if (this._isStart) {
                    pet.autoAttack = this._autoAttack;
                    pet.start();
                    if (pet.master)
                        pet.target = pet.master.target;
                }
            }
            if (this._skillStartHandler) {
                pet.onSkillStart(this._skillStartHandler.caller, this._skillStartHandler.method);
            }
            if (this._moveStartHandler) {
                pet.onMoveStart(this._moveStartHandler.caller, this._moveStartHandler.method);
            }
            var index = this._pets.indexOf(pet);
            if (index < 0) {
                this._pets.push(pet);
            }
            if (this._hpChangeHandler) {
                this._hpChangeHandler.run();
            }
            return pet;
        };
        PetGroup.prototype.removeFromFormatHandler = function (target) {
            var petVO;
            if (target instanceof vo.GamePetVO) {
                petVO = target;
            }
            else if (target instanceof s.GamePet) {
                petVO = target.vo;
            }
            //if (!petVO.isFormat) {
            //    petVO.offMergeStateChange(this, this.petMergeStateChangeHandler);
            //    petVO.offSupportStateChange(this, this.petSupportStateChangeHandler);
            //}
            var pet;
            if (!pet)
                pet = this.getPetByVO(petVO);
            if (!pet)
                return;
            pet.stop();
            pet.offDead(this, this.petDeadHandler);
            pet.offSkillStart();
            pet.offMoveStart();
            this._scene.removePet(pet);
            var index = this._pets.indexOf(pet);
            if (index >= 0) {
                this._pets.splice(index, 1);
            }
            utils.ObjectPool.to(pet, true);
            if (this._hpChangeHandler) {
                this._hpChangeHandler.run();
            }
        };
        /*private petMergeStateChangeHandler(petVO: vo.GamePetVO) {
            var pet: GamePet;
            if (petVO.isFormat) {
                if (!petVO.isMerged) {
                    if (!this.getPetByVO(petVO)) this.addToSceneHandler(petVO);
                } else {
                    pet = this.getPetByVO(petVO);
                    if (pet) {
                        pet.stop();
                        pet.actionTo(TypeAction.RUN, TypeDirection.getDirection8(pet.x, pet.y, this._master.x, this._master.y));
                        if (this._master) {
                            egret.Tween.get(pet).to({ x: this._master.x, y: this._master.y, alpha: 0 }, 500, utils.Ease.backInOut).call(this.removeFromFormatHandler, this, [petVO]).call(this.playMasterEffect, this);
                            this._master.showSkillEffect("30003");
                        } else {
                            this.removeFromFormatHandler(petVO);
                        }

                        //播放合体声音和左边提示
                        var dataModel:templates.dataModel = pet.getModel();
                        if(dataModel != null && app.gameContext.isMySelf(this._master))
                        {
                            mg.soundManager.playRandomSound(dataModel.skill3Sound);
                            battle.manager.showLeftHint(Language.J_HZ, pet);
                        }
                    }

                    petVO.onPropertyChange(TypeProperty.HP, this, this.hpChangeHandler);
                    petVO.onPropertyChange(TypeProperty.MaxHP, this, this.hpChangeHandler);
                }
            } else {
                this.removeFromFormatHandler(petVO);
            }
        }

        private petSupportStateChangeHandler(petVO: vo.GamePetVO) {
            var pet: GamePet;
            if (petVO.isFormat) {
                if (!petVO.isSupport) {
                    pet = this.getPetByVO(petVO);
                    if (!pet)
                    {
                        pet = this.addToSceneHandler(petVO);
                        var petId:number = parseInt(petVO.refId);
                        //if(petVO.master == GameModels.user.player)
                        if(app.gameContext.isMySelf(pet))
                        {
                            copy.CopyMainView.instance.showPetSupport(petId); //只有自己的援军播动画
                            pet.justSupportTime = egret.getTimer();
                        }
                    }
                } else {
                    this.removeFromFormatHandler(petVO);
                }
            } else {
                this.removeFromFormatHandler(petVO);
            }
        }
        */
        PetGroup.prototype.playMasterEffect = function () {
            if (!this._master)
                return;
            this._mergeEffect.setResId('6106');
            //this._mergeEffect.blendMode=egret.BlendMode.ADD;
            this._mergeEffect.y = -50;
            this._master.addChild(this._mergeEffect);
            this._mergeEffect.onComplete(this, function () {
                this._mergeEffect.stop();
                this._mergeEffect.offAllComplete();
                if (this._mergeEffect.parent) {
                    this._mergeEffect.parent.removeChild(this._mergeEffect);
                }
            });
            this._mergeEffect.playOnce();
        };
        PetGroup.prototype.getPetByVO = function (petVO) {
            var result;
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                if (pet.vo == petVO) {
                    result = pet;
                    break;
                }
            }
            return result;
        };
        PetGroup.prototype.hpChangeHandler = function () {
            if (this._hpChangeHandler) {
                this._hpChangeHandler.run();
            }
        };
        PetGroup.prototype.clearMaster = function () {
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.setMaster(null);
                pet.setTeamLeader(null);
            }
        };
        /////////////////////////////GETTER SETTER//////////////////////////
        /*public set greened(v: boolean) {
            for (var pet of this._pets) {
                pet.title.greened = true;
            }
        }

        public set blued(v: boolean) {
            for (var pet of this._pets) {
                pet.title.blued = true;
            }
        }*/
        /**移动到某个位置 */
        PetGroup.prototype.movePathTo = function (x, y) {
            if (this._master == null)
                return;
            var leader = this._master.getTeamLeader();
            if (leader != null && leader.getAI() != null) {
                leader.getAI().movePathTo(x, y);
                /*var index:number = 0;
                for (var pet of this._pets)
                {
                    if(pet == leader) continue;
                    if(pet.getAI() == null) continue;
                    var fellowNode:PF.Node = this.getFellowNode(x, y, leader.direct, index);
                    if(fellowNode != null)
                    {
                        pet.getAI().movePathTo(fellowNode.x, fellowNode.y);
                    }
                    index ++;
                }*/
            }
        };
        PetGroup.prototype.clearMovePath = function () {
            if (this._master == null)
                return;
            var leader = this._master.getTeamLeader();
            if (leader != null && leader.getAI() != null) {
                leader.getAI().clearMovePath();
                for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                    var pet = _a[_i];
                    if (pet == leader)
                        continue;
                    if (pet.getAI() == null)
                        continue;
                    pet.getAI().clearMovePath();
                }
            }
        };
        /*public getFellowNode(x: number, y: number, direct: number, index:number): PF.Node {
            var offPos:egret.Point;
            switch (direct) {
                case TypeDirection.UP: offPos = TypeDirection.FELLOW_UP_POS[index]; break;
                case TypeDirection.DOWN: offPos = TypeDirection.FELLOW_DOWN_POS[index]; break;
                case TypeDirection.LEFT: offPos = TypeDirection.FELLOW_LEFT_POS[index]; break;
                case TypeDirection.RIGHT: offPos = TypeDirection.FELLOW_RIGHT_POS[index]; break;
                case TypeDirection.LEFT_UP: offPos = TypeDirection.FELLOW_LEFT_POS[index]; break;
                case TypeDirection.LEFT_DOWN: offPos = TypeDirection.FELLOW_LEFT_POS[index]; break;
                case TypeDirection.RIGHT_UP: offPos = TypeDirection.FELLOW_RIGHT_POS[index]; break;
                case TypeDirection.RIGHT_DOWN: offPos = TypeDirection.FELLOW_RIGHT_POS[index]; break;
                default: offPos = TypeDirection.FELLOW_DOWN_POS[index];
            }
            if(!offPos){
                offPos = TypeDirection.FELLOW_UP_POS[0];
            }
            var scene:s.Scene=app.gameContext.scene;
            var retNode:PF.Node = scene.getNode(x + offPos.x, y + offPos.y);
            if(retNode == null) retNode = scene.getNode(x,y);
            if(retNode == null) return null;
            if(!retNode.walkable)
            {
                retNode = battle.manager.getAroundRandomNode(scene, retNode);
            }
            return retNode;
        }*/
        PetGroup.prototype.getFellowNode = function (x, y, direct, leaderSkillRange, skillRange) {
            var offX = 0;
            var offY = 1;
            switch (direct) {
                case TypeDirection.UP:
                    offX = 0;
                    offY = 1;
                    break;
                case TypeDirection.DOWN:
                    offX = 0;
                    offY = -1;
                    break;
                case TypeDirection.LEFT:
                    offX = 1;
                    offY = 0;
                    break;
                case TypeDirection.RIGHT:
                    offX = -1;
                    offY = 0;
                    break;
                case TypeDirection.LEFT_UP:
                    offX = 1;
                    offY = 1;
                    break;
                case TypeDirection.LEFT_DOWN:
                    offX = 1;
                    offY = -1;
                    break;
                case TypeDirection.RIGHT_UP:
                    offX = -1;
                    offY = 1;
                    break;
                case TypeDirection.RIGHT_DOWN:
                    offX = -1;
                    offY = -1;
                    break;
            }
            var scene = app.gameContext.scene;
            var times = 10;
            var dis = skillRange - leaderSkillRange;
            if (dis < 1)
                dis = 1;
            /*while (times--) {
                dis --;
                if (scene.hasNodeObject(x,y) || dis >= 0) {
                    x += offX;
                    y += offY;
                    continue;
                }
                break;
            }*/
            var retNode = scene.getNode(x + offX * dis, y + offY * dis);
            //retNode = battle.manager.getAroundRandomNode(scene, retNode);
            if (retNode == null)
                retNode = scene.getNode(x, y);
            if (retNode == null)
                return null;
            if (!retNode.walkable) {
                retNode = battle.manager.getAroundRandomNode(scene, retNode);
            }
            return retNode;
        };
        /**
         * 排列阵型
         */
        PetGroup.prototype.formatPosition = function (direct, tile) {
            if (tile === void 0) { tile = null; }
            if (tile)
                this._bornNode = tile;
            //PetGroup.formatPetPosition(this._bornNode.x,this._bornNode.y,this._pets,direct);
        };
        PetGroup.prototype.come = function (delay, direct) {
            if (delay === void 0) { delay = 0; }
            if (direct === void 0) { direct = TypeDirection.DOWN; }
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                //pet.actionTo(TypeAction.IDLE, pet.master ? pet.master.direct : direct);
                pet.come(delay);
            }
        };
        PetGroup.prototype.start = function () {
            //if (!this._isStart) {
            this._isStart = true;
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.autoAttack = !!this._autoAttack;
                pet.start();
            }
            //}
        };
        PetGroup.prototype.stop = function () {
            //if (this._isStart) {
            this._isStart = false;
            this._autoAttack = false;
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.stop();
            }
            //}
        };
        Object.defineProperty(PetGroup.prototype, "skinEnabled", {
            set: function (v) {
                this._skinEnabled = v;
                for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                    var pet = _a[_i];
                    pet.skinEnabled = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "titleEnabled", {
            set: function (v) {
                for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                    var pet = _a[_i];
                    pet.nameVisible = v;
                    pet.bloodVisible = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "hpAutoEnabled", {
            set: function (v) {
                var playerVO = this._masterVO;
                for (var _i = 0, _a = playerVO.petList.upFormats; _i < _a.length; _i++) {
                    var petVO = _a[_i];
                    petVO.hpAutoEnabled = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "autoAttack", {
            set: function (v) {
                this._autoAttack = v;
                for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                    var pet = _a[_i];
                    pet.autoAttack = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "focusMode", {
            set: function (v) {
                for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                    var pet = _a[_i];
                    pet.focusMode = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "damgeEnabled", {
            set: function (v) {
                for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                    var pet = _a[_i];
                    pet.damgeEnabled = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "effectEnabled", {
            set: function (v) {
                for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                    var pet = _a[_i];
                    pet.effectEnabled = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "allDead", {
            get: function () {
                for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                    var pet = _a[_i];
                    if (!pet.stateDead)
                        return false;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "allHpMax", {
            get: function () {
                if (!this._masterVO || !this._masterVO.petList)
                    return 0;
                var hp = 0;
                for (var _i = 0, _a = this._masterVO.petList.upFormats; _i < _a.length; _i++) {
                    var petVO = _a[_i];
                    if (petVO.isFormat && petVO.isMerged)
                        hp += petVO.battleHpMax;
                }
                return hp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "allHp", {
            get: function () {
                if (!this._masterVO || !this._masterVO.petList)
                    return 0;
                var hp = 0;
                for (var _i = 0, _a = this._masterVO.petList.upFormats; _i < _a.length; _i++) {
                    var petVO = _a[_i];
                    if (!petVO.stateDead && petVO.isFormat && petVO.isMerged)
                        hp += petVO.battleHp;
                }
                return hp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroup.prototype, "length", {
            get: function () {
                return this._pets.length;
            },
            enumerable: true,
            configurable: true
        });
        PetGroup.prototype.getPet = function (index) {
            return this._pets[index];
        };
        PetGroup.prototype.getPetList = function () {
            return this._pets;
        };
        //取一个射程最短的武将
        PetGroup.prototype.getFirstLifePet = function () {
            var tDis = 99999;
            var ret = null;
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                if (!pet.stateDead && pet.vo != null && pet.vo.minLockRange < tDis) {
                    ret = pet;
                    tDis = pet.vo.minLockRange;
                }
            }
            return ret;
        };
        PetGroup.prototype.getCenterPoint = function (cachePoint) {
            if (!cachePoint)
                cachePoint = new egret.Point();
            var minX = Number.MAX_VALUE;
            var maxX = 0;
            var minY = Number.MAX_VALUE;
            var maxY = 0;
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                minX = Math.min(pet.x, minX);
                maxX = Math.max(pet.x, maxX);
                minY = Math.min(pet.y, minY);
                maxY = Math.max(pet.y, maxY);
            }
            cachePoint.x = minX + (maxX - minX) / 2;
            cachePoint.y = minY + (maxY - minY) / 2;
            return cachePoint;
        };
        PetGroup.prototype.onSkillStart = function (caller, method) {
            this.offSkillStart();
            this._skillStartHandler = utils.Handler.create(caller, method, null, false);
            if (this._skillStartHandler) {
                for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                    var pet = _a[_i];
                    pet.onSkillStart(this._skillStartHandler.caller, this._skillStartHandler.method);
                }
            }
        };
        PetGroup.prototype.offSkillStart = function () {
            if (this._skillStartHandler) {
                this._skillStartHandler.recover();
                this._skillStartHandler = null;
            }
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.offSkillStart();
            }
        };
        PetGroup.prototype.onMoveStart = function (caller, method) {
            this.offMoveStart();
            this._moveStartHandler = utils.Handler.create(caller, method, null, false);
            if (this._moveStartHandler) {
                for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                    var pet = _a[_i];
                    pet.onMoveStart(this._moveStartHandler.caller, this._moveStartHandler.method);
                }
            }
        };
        PetGroup.prototype.offMoveStart = function () {
            if (this._moveStartHandler) {
                this._moveStartHandler.recover();
                this._moveStartHandler = null;
            }
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.offMoveStart();
            }
        };
        PetGroup.prototype.onHpChange = function (caller, method) {
            this.offHpChange();
            this._hpChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        PetGroup.prototype.offHpChange = function () {
            if (this._hpChangeHandler) {
                this._hpChangeHandler.recover();
                this._hpChangeHandler = null;
            }
        };
        PetGroup.prototype.onAllDead = function (caller, method) {
            this.offAllDead();
            this._deadHandler = utils.Handler.create(caller, method, null, false);
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.onDead(this, this.petDeadHandler);
            }
        };
        PetGroup.prototype.offAllDead = function () {
            if (this._deadHandler) {
                this._deadHandler.recover();
                this._deadHandler = null;
            }
        };
        PetGroup.prototype.petDeadHandler = function () {
            if (!this.allDead)
                return;
            if (this._deadHandler) {
                this._deadHandler.run();
                //this._deadHandler = null;
            }
        };
        PetGroup.uid = 0;
        return PetGroup;
    }());
    s.PetGroup = PetGroup;
    __reflect(PetGroup.prototype, "s.PetGroup");
})(s || (s = {}));
