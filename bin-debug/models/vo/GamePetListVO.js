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
    var GamePetListVO = (function (_super) {
        __extends(GamePetListVO, _super);
        function GamePetListVO(playerVO) {
            var _this = _super.call(this) || this;
            _this._formats = [];
            _this._inBattlePets = [];
            _this._list = [];
            _this._master = playerVO;
            return _this;
        }
        GamePetListVO.prototype.initialize = function (petList, petRoomList) {
            this._unlockCount = petRoomList.length;
            this._posVOList = [];
            for (var _i = 0, petRoomList_1 = petRoomList; _i < petRoomList_1.length; _i++) {
                var petRoom = petRoomList_1[_i];
                this._posVOList.push(vo.fromPool(vo.GamePetPosVO, petRoom));
            }
            for (var i = 0; i < petList.length; i++) {
                var petVO = vo.fromPool(vo.GamePetVO, petList[i]);
                var petPosVO = this.getPosVOById(petVO.uid);
                if (petPosVO) {
                    petPosVO.updataPropertyList(petList[i].PropertyList, petList[i].FightPower);
                    this.addToFormat(petVO, petPosVO);
                    petVO.setSceneObjectInfo(petList[i].SceneInfo);
                    //this._inBattlePets.push(petVO);
                }
            }
        };
        GamePetListVO.prototype.initPetList = function (petList) {
            for (var i = 0; i < petList.length; i++) {
                var petVO = vo.fromPool(vo.GamePetVO, petList[i]);
                var petPosVO = this.getPosVOById(petVO.uid);
                if (!petPosVO) {
                    this._list.push(petVO);
                }
            }
        };
        GamePetListVO.prototype.setInBattlePets = function (petList) {
            this._inBattlePets = [];
            for (var i = 0; i < petList.length; i++) {
                // for(let j: number = 0; j < this._list.length; j++)
                // {
                //     if(petList[i].PetId == this._list[j].uid)
                //     {
                //         petVO = this._list[j];
                //         break;
                //     }
                // }
                var petVO = vo.fromPool(vo.GamePetVO, petList[i]);
                this._inBattlePets.push(petVO);
                petVO.setMaster(this._master);
            }
        };
        GamePetListVO.prototype.reset = function () {
            for (var _i = 0, _a = this._formats; _i < _a.length; _i++) {
                var petVO = _a[_i];
                vo.toPool(petVO);
            }
            this._formats.length = 0;
            for (var _b = 0, _c = this._inBattlePets; _b < _c.length; _b++) {
                var petVO = _c[_b];
                vo.toPool(petVO);
            }
            this._inBattlePets.length = 0;
            // for(var petVO of this._list){
            //     vo.toPool(petVO);
            // }
            // this._list.length=0;
            // for(var petposVO of this._posVOList){
            //     vo.toPool(petposVO);
            // }
            // this._posVOList.length=0;
        };
        GamePetListVO.prototype.resetState = function () {
            //for (var petVO of this._formats) {
            for (var _i = 0, _a = this._inBattlePets; _i < _a.length; _i++) {
                var petVO = _a[_i];
                petVO.resetState();
            }
        };
        GamePetListVO.prototype.resetMergeState = function () {
            // for (var petVO of this._formats) {
            //     petVO.resetMergeState();
            // }
        };
        GamePetListVO.prototype.getPosVOById = function (uid) {
            for (var _i = 0, _a = this._posVOList; _i < _a.length; _i++) {
                var petPosVO = _a[_i];
                if (petPosVO.petId == uid) {
                    return petPosVO;
                }
            }
            return null;
        };
        GamePetListVO.prototype.getPosVO = function (pos) {
            for (var _i = 0, _a = this._posVOList; _i < _a.length; _i++) {
                var petPosVO = _a[_i];
                if (petPosVO.position == pos) {
                    return petPosVO;
                }
            }
            return null;
        };
        GamePetListVO.prototype.updatePosVO = function (data) {
            var petPosVO = this.getPosVO(data.PosId);
            petPosVO.decodeProto(data);
            return petPosVO;
        };
        // public recoverChildren() {
        //     for (var petVO of this._formats) {
        //         petVO.clearForamtData();
        //         petVO.offMergeStateChange(this, this.mergeStateChange);
        //         vo.toPool(petVO);
        //     }
        //     this._formats.length = 0;
        // }
        /**添加到上阵列表 */
        GamePetListVO.prototype.addToFormat = function (petVO, data) {
            if (this.getFormatVOByObjId(petVO.uid))
                return;
            petVO.autoRecover = false;
            petVO.initFormatData(data);
            this._formats.push(petVO);
            this.sortHandler();
            if (this._addFormatHandler)
                this._addFormatHandler.runWith(petVO);
            petVO.resetState();
            petVO.onMergeStateChange(this, this.mergeStateChange);
            petVO.setMaster(this._master);
            return petVO;
        };
        GamePetListVO.prototype.removeFromFormat = function (pos) {
            var index = this.getFormatIndexByPos(pos);
            if (index != -1) {
                var petVO = this._formats[index];
                petVO.offMergeStateChange(this, this.mergeStateChange);
                petVO.clearForamtData();
                this._formats.splice(index, 1);
                if (this._removeFormatHandler)
                    this._removeFormatHandler.runWith(petVO);
                petVO.autoRecover = true;
                return petVO;
            }
            return null;
        };
        GamePetListVO.prototype.addToDownList = function (petVO) {
            if (this._list.indexOf(petVO) < 0) {
                petVO.autoRecover = false;
                this._list.push(petVO);
            }
        };
        GamePetListVO.prototype.removeFromDownList = function (petVO) {
            var i = this._list.indexOf(petVO);
            if (i >= 0) {
                this._list.splice(i, 1);
            }
        };
        GamePetListVO.prototype.removeFromDownListByUId = function (uid) {
            var i = 0;
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var petVO = _a[_i];
                if (petVO.uid == uid) {
                    this._list.splice(i, 1);
                    petVO.autoRecover = true;
                    return petVO;
                }
                i++;
            }
        };
        GamePetListVO.prototype.syncHp = function (pos, v) {
            var petVO = this.getFormatVOByPos(pos);
            if (petVO) {
                petVO.syncHp(v);
            }
        };
        // public hasPet(petVO: vo.GamePetVO): boolean {
        //     for (var pet of this._formats) {
        //         if (pet == petVO) return true;
        //     }
        //     return false;
        // }
        GamePetListVO.prototype.hasPetByUId = function (uid) {
            for (var _i = 0, _a = this._formats; _i < _a.length; _i++) {
                var pet = _a[_i];
                if (pet.uid == uid)
                    return true;
            }
            return false;
        };
        GamePetListVO.prototype.getPetVOByUId = function (uid) {
            for (var _i = 0, _a = this._inBattlePets; _i < _a.length; _i++) {
                var pet = _a[_i];
                if (pet.uid == uid)
                    return pet;
            }
            return null;
        };
        GamePetListVO.prototype.getObjectBySceneObjectId = function (sceneObjectId) {
            for (var _i = 0, _a = this._inBattlePets; _i < _a.length; _i++) {
                var pet = _a[_i];
                if (pet.sceneObjectId == sceneObjectId)
                    return pet;
            }
            return null;
        };
        GamePetListVO.prototype.updateMerge = function (pos, state) {
            var petVO = this.getFormatVOByPos(pos);
            if (petVO) {
                petVO.updateMergedState(state);
            }
        };
        Object.defineProperty(GamePetListVO.prototype, "hasMerge", {
            get: function () {
                // for (var petVO of this._formats) {
                //     if (petVO.isMerged) return true;
                // }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        GamePetListVO.prototype.mergeStateChange = function (petVO) {
            if (this._mergeChangeHandler) {
                this._mergeChangeHandler.run();
            }
        };
        GamePetListVO.prototype.updateFormat = function (uid, data, FightValue) {
            var petVO = this.getFormatVOByObjId(uid);
            if (petVO)
                petVO.updatePosProperty(data, FightValue);
        };
        GamePetListVO.prototype.updateByUId = function (uid, data, FightValue, BaseFightValue, state) {
            var petVO = this.getDownAndUpListVOByUId(uid);
            if (petVO)
                petVO.updataPropertyList(data, FightValue, BaseFightValue, state);
        };
        GamePetListVO.prototype.updateRankByUId = function (uid, data) {
            var petVO = this.getDownAndUpListVOByUId(uid);
            if (petVO)
                petVO.updataPetRank(data);
        };
        GamePetListVO.prototype.updatePetState = function (uid, data) {
            var petVO = this.getDownAndUpListVOByUId(uid);
            if (petVO)
                petVO.state = data.Status;
        };
        GamePetListVO.prototype.updatePetShenBing = function (uid, data) {
            var petVO = this.getDownAndUpListVOByUId(uid);
            if (petVO)
                petVO.shenBingLv = data.ShenBingLv;
        };
        GamePetListVO.prototype.updatePetLevelOrStar = function (uid, data) {
            var petVO = this.getDownAndUpListVOByUId(uid);
            if (petVO)
                petVO.updatePetLevelOrStar(data);
        };
        GamePetListVO.prototype.updatePetIsLockState = function (uid, data) {
            var petVO = this.getDownAndUpListVOByUId(uid);
            if (petVO)
                petVO.isLock = data.IsLock;
        };
        GamePetListVO.prototype.updatePetIsGongMingState = function (uid, data) {
            var petVO = this.getDownAndUpListVOByUId(uid);
            if (petVO)
                petVO.isGongMing = data.IsGongMing;
        };
        GamePetListVO.prototype.updatePetTanlentAndSkill = function (uid, data) {
            var petVO = this.getDownAndUpListVOByUId(uid);
            if (petVO) {
                petVO.removeAllSkill();
                petVO.removeBingFa();
                for (var i = 0; i < data.BingFaList.length; i++) {
                    var listVo = vo.fromPool(vo.GamePetBingFaVO, data.BingFaList[i]);
                    petVO.bingFaVOList.push(listVo);
                }
                var skillStr = null;
                if (petVO.generalBraekTmp != null) {
                    skillStr = petVO.generalBraekTmp.skillLv.split(";");
                }
                else {
                    skillStr = [];
                }
                for (var i = 0; i < data.SkillList.length; i++) {
                    var skillRefId = parseInt(data.SkillList[i].SkillRedId);
                    if (data.SkillList[i] && data.SkillList[i].SkillRedId != "" && data.SkillList[i].SkillRedId != "-1") {
                        if (skillStr[i]) {
                            skillRefId = skillRefId - 1 + parseInt(skillStr[i]);
                        }
                        var skillVO = vo.fromPool(vo.SkillVO);
                        skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, skillRefId), data.SkillList[i].PosId, data.SkillList[i].NeedPlayerLv, data.Level);
                        petVO.skillList.add(skillVO);
                    }
                }
                petVO.shenBingSkill = null;
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
                    var skillVO = vo.fromPool(vo.SkillVO);
                    skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, skillId), 0);
                    petVO.shenBingSkill = skillVO;
                }
                petVO.hongYanSkill = null;
                if (data.HongYanCfgId != 0) {
                    var hongYanTemp = Templates.getTemplateById(templates.Map.HONGYAN, data.HongYanCfgId.toString());
                    var hySkillId = hongYanTemp.skillId;
                    if (!hySkillId) {
                        logger.log("配置找不到=========", data.HongYanCfgId);
                    }
                    var skillVO = vo.fromPool(vo.SkillVO);
                    skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, hySkillId), 0);
                    petVO.hongYanSkill = skillVO;
                }
            }
        };
        Object.defineProperty(GamePetListVO.prototype, "totalUpFormat", {
            get: function () {
                return this._formats.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "totalDownList", {
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        GamePetListVO.prototype.hasUpFormatVO = function (pos) {
            return !!this.getFormatVOByPos(pos);
        };
        GamePetListVO.prototype.hasDownListVO = function (uid) {
            return !!this.getDownListVOByUId(uid);
        };
        GamePetListVO.prototype.sortHandler = function () {
            this._formats.sort(function (a, b) {
                return a.formatData.position > b.formatData.position ? 1 : -1;
            });
        };
        /**监听列表增加 */
        GamePetListVO.prototype.onAddFormat = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._addFormatHandler) {
                this._addFormatHandler = new utils.Handlers(false);
            }
            this._addFormatHandler.add(caller, method, args);
        };
        GamePetListVO.prototype.offAddFormat = function (caller, method) {
            if (this._addFormatHandler) {
                this._addFormatHandler.remove(caller, method);
            }
        };
        /**监听列表删除 */
        GamePetListVO.prototype.onRemoveFromat = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._removeFormatHandler) {
                this._removeFormatHandler = new utils.Handlers(false);
            }
            this._removeFormatHandler.add(caller, method, args);
        };
        GamePetListVO.prototype.offRemoveFormat = function (caller, method) {
            if (this._removeFormatHandler) {
                this._removeFormatHandler.remove(caller, method);
            }
        };
        /**监听合体状态 */
        GamePetListVO.prototype.onMergeStateChange = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._mergeChangeHandler) {
                this._mergeChangeHandler = new utils.Handlers(false);
            }
            this._mergeChangeHandler.add(caller, method, args);
        };
        GamePetListVO.prototype.offMergeStateChange = function (caller, method) {
            if (this._mergeChangeHandler) {
                this._mergeChangeHandler.remove(caller, method);
            }
        };
        Object.defineProperty(GamePetListVO.prototype, "formats", {
            /** 上阵列表*/
            get: function () {
                return this._formats;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "upFormats", {
            get: function () {
                return this._inBattlePets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "downList", {
            /** 下阵列表*/
            get: function () {
                return this._list;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取当前合体武将
         */
        GamePetListVO.prototype.getCurrentMergePet = function () {
            // var total: number = this._formats.length;
            // if (total) {
            //     while (total--) {
            //         var petVO: vo.GamePetVO = this._formats[total];
            //         if (petVO && petVO.isMerged && !petVO.stateDead) {
            //             return petVO;
            //         }
            //     }
            // }
            return null;
        };
        Object.defineProperty(GamePetListVO.prototype, "unlockCount", {
            get: function () {
                return this._unlockCount;
            },
            enumerable: true,
            configurable: true
        });
        GamePetListVO.prototype.forEach = function (func, caller) {
            for (var _i = 0, _a = this._formats; _i < _a.length; _i++) {
                var petVO = _a[_i];
                func.call(caller, petVO);
            }
        };
        /**从上阵列表根据位置信息获取VO */
        GamePetListVO.prototype.getFormatVOByPos = function (pos) {
            for (var _i = 0, _a = this._formats; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.formatData.position == pos) {
                    return item;
                }
            }
            return null;
        };
        /**从上阵列表根据位置信息获取VO索引 */
        GamePetListVO.prototype.getFormatIndexByPos = function (pos) {
            var index = -1;
            for (var i = 0; i < this._formats.length; i++) {
                if (this._formats[i].formatData.position == pos) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        /** 获得up VO*/
        GamePetListVO.prototype.getFormatVOByObjId = function (objId) {
            for (var _i = 0, _a = this._formats; _i < _a.length; _i++) {
                var petVO = _a[_i];
                if (petVO.uid == objId)
                    return petVO;
            }
            return null;
        };
        /** 获得down VO*/
        GamePetListVO.prototype.getDownListVOByUId = function (objId) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var petVO = _a[_i];
                if (petVO.uid == objId)
                    return petVO;
            }
            return null;
        };
        /** 获得DownAndUp VO*/
        GamePetListVO.prototype.getDownAndUpListVOByUId = function (objId) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var petVO = _a[_i];
                if (petVO.uid == objId)
                    return petVO;
            }
            for (var _b = 0, _c = this._formats; _b < _c.length; _b++) {
                var petVO1 = _c[_b];
                if (petVO1.uid == objId)
                    return petVO1;
            }
            return null;
        };
        /** 获得武将id获得VO*/
        GamePetListVO.prototype.getDownListVOById = function (objId) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var petVO = _a[_i];
                if (petVO.refId == objId)
                    return petVO;
            }
            return null;
        };
        /** 获得武将id获得VO*/
        GamePetListVO.prototype.getFormatListVOById = function (objId) {
            for (var _i = 0, _a = this._formats; _i < _a.length; _i++) {
                var petVO = _a[_i];
                if (petVO.refId == objId)
                    return petVO;
            }
            return null;
        };
        Object.defineProperty(GamePetListVO.prototype, "hpMax", {
            /**生命上限 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].hpMax;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "healHP", {
            /**生命回复 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].healHP;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "attack", {
            /**攻击 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].attack;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "pDef", {
            /**物防 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].pDef;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "mDef", {
            /**法防 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].mDef;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "ignorePDef", {
            /**物防穿透 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].ignorePDef;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "ignoreMDef", {
            /**法防穿透 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].ignoreMDef;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "crit", {
            /**暴击 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].crit;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "critInjure", {
            /**暴击伤害 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].critInjure;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "ignoreCrit", {
            /**抗暴 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].ignoreCrit;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "ignoreCritInjure", {
            /**暴击抵抗 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].ignoreCritInjure;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "hit", {
            /**命中 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].hit;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "dodge", {
            /**闪避 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].dodge;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "injureAdd", {
            /**伤害加深 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].injureAdd;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "injureIgnore", {
            /**伤害减免 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].injureIgnore;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "heal", {
            /**治疗 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].heal;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "beHeal", {
            /**受疗 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].beHeal;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "ctrl", {
            /**控制 */
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].ctrl;
                }
                return value;
            } /**抗控 */,
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetListVO.prototype, "ignoreCtrl", {
            get: function () {
                var value = 0;
                for (var i = 0; i < this._posVOList.length; i++) {
                    value += this._posVOList[i].ignoreCtrl;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        GamePetListVO.prototype.getProperty = function (type) {
            switch (type) {
                case TypeProperty.MaxHp: return this.hpMax;
                case TypeProperty.PAtk: return this.attack;
                case TypeProperty.PDef: return this.pDef;
                case TypeProperty.IgnorePDef: return this.ignorePDef;
                case TypeProperty.Crit: return this.crit;
                case TypeProperty.CritInjure: return this.critInjure;
                case TypeProperty.IgnoreCrit: return this.ignoreCrit;
                case TypeProperty.IgnoreCritInjure: return this.ignoreCritInjure;
                case TypeProperty.Hit: return this.hit;
                case TypeProperty.Dodge: return this.dodge;
                case TypeProperty.InjureAdd: return this.injureAdd;
                case TypeProperty.InjureIgnore: return this.injureIgnore;
            }
        };
        return GamePetListVO;
    }(vo.VOBase));
    vo.GamePetListVO = GamePetListVO;
    __reflect(GamePetListVO.prototype, "vo.GamePetListVO");
})(vo || (vo = {}));
