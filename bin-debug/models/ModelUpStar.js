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
var mo;
(function (mo) {
    var ModelUpStar = (function (_super) {
        __extends(ModelUpStar, _super);
        function ModelUpStar() {
            return _super.call(this) || this;
        }
        ModelUpStar.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._petList1 = [];
            this._petList2 = [];
            this._petList3 = [];
            this._petList4 = [];
            this._rebirthStarPetVo = null;
            this._rebirthLvPetVo = null;
            this._isOpenQuickShengXingView = false;
        };
        Object.defineProperty(ModelUpStar.prototype, "isOpenQuickShengXingView", {
            /**是否打开过快速升星 */
            get: function () {
                return this._isOpenQuickShengXingView;
            },
            set: function (value) {
                this._isOpenQuickShengXingView = value;
                this.dispatchEventWith(mo.ModelUpStar.PET_CHOSES);
                GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
            },
            enumerable: true,
            configurable: true
        });
        ModelUpStar.prototype.getGamePetVoArrByPos = function (pos) {
            if (pos == 0) {
                return this._petList1;
            }
            else if (pos == 1) {
                return this._petList2;
            }
            else if (pos == 2) {
                return this._petList3;
            }
            else {
                return this._petList4;
            }
        };
        ModelUpStar.prototype.getXiYouPetCountArrByPos = function (pos) {
            var count = 0;
            if (pos == 0) {
                for (var i = 0; i < this._petList1.length; i++) {
                    if (this._petList1[i].isHashFourSkill) {
                        count++;
                    }
                }
            }
            else if (pos == 1) {
                for (var i = 0; i < this._petList2.length; i++) {
                    if (this._petList2[i].isHashFourSkill) {
                        count++;
                    }
                }
            }
            else if (pos == 2) {
                for (var i = 0; i < this._petList3.length; i++) {
                    if (this._petList3[i].isHashFourSkill) {
                        count++;
                    }
                }
            }
            else {
                for (var i = 0; i < this._petList4.length; i++) {
                    if (this._petList4[i].isHashFourSkill) {
                        count++;
                    }
                }
            }
            return count;
        };
        /**有神魔武将的个数 */
        ModelUpStar.prototype.getShenMoPetCountArrByPos = function (pos) {
            var count = 0;
            if (pos == 0) {
                for (var i = 0; i < this._petList1.length; i++) {
                    if (this._petList1[i].template.godDevil > 0) {
                        count++;
                    }
                }
            }
            else if (pos == 1) {
                for (var i = 0; i < this._petList2.length; i++) {
                    if (this._petList2[i].template.godDevil > 0) {
                        count++;
                    }
                }
            }
            else if (pos == 2) {
                for (var i = 0; i < this._petList3.length; i++) {
                    if (this._petList3[i].template.godDevil > 0) {
                        count++;
                    }
                }
            }
            else {
                for (var i = 0; i < this._petList4.length; i++) {
                    if (this._petList4[i].template.godDevil) {
                        count++;
                    }
                }
            }
            return count;
        };
        /**有自己阵上的武将的个数*/
        ModelUpStar.prototype.getUpPetCountArrByPos = function (pos) {
            var count = 0;
            if (pos == 0) {
                for (var i = 0; i < this._petList1.length; i++) {
                    if (GameModels.pet.formatUpVORefIdList.indexOf(this._petList1[i].refId) != -1) {
                        count++;
                    }
                }
            }
            else if (pos == 1) {
                for (var i = 0; i < this._petList2.length; i++) {
                    if (GameModels.pet.formatUpVORefIdList.indexOf(this._petList2[i].refId) != -1) {
                        count++;
                    }
                }
            }
            else if (pos == 2) {
                for (var i = 0; i < this._petList3.length; i++) {
                    if (GameModels.pet.formatUpVORefIdList.indexOf(this._petList3[i].refId) != -1) {
                        count++;
                    }
                }
            }
            else {
                for (var i = 0; i < this._petList4.length; i++) {
                    if (GameModels.pet.formatUpVORefIdList.indexOf(this._petList4[i].refId) != -1) {
                        count++;
                    }
                }
            }
            return count;
        };
        ModelUpStar.prototype.getGamePetUIDVoArrByPos = function (pos) {
            var id = [];
            if (pos == 0) {
                for (var i = 0; i < this._petList1.length; i++) {
                    id.push(this._petList1[i].uid);
                }
            }
            else if (pos == 1) {
                for (var i = 0; i < this._petList2.length; i++) {
                    id.push(this._petList2[i].uid);
                }
            }
            else if (pos == 2) {
                for (var i = 0; i < this._petList3.length; i++) {
                    id.push(this._petList3[i].uid);
                }
            }
            else {
                for (var i = 0; i < this._petList4.length; i++) {
                    id.push(this._petList4[i].uid);
                }
            }
            return id;
        };
        ModelUpStar.prototype.addGamePetVo = function (pet, pos) {
            if (pos == 0) {
                this._petList1.push(pet);
            }
            else if (pos == 1) {
                this._petList2.push(pet);
            }
            else if (pos == 2) {
                this._petList3.push(pet);
            }
            else {
                this._petList4.push(pet);
            }
            this.dispatchEventWith(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO);
        };
        ModelUpStar.prototype.removeGamePetVo = function (pet, pos) {
            if (pos == 0) {
                for (var i = this._petList1.length - 1; i >= 0; i--) {
                    if (pet == this._petList1[i]) {
                        this._petList1.splice(i, 1);
                        break;
                    }
                }
            }
            else if (pos == 1) {
                for (var i = this._petList2.length - 1; i >= 0; i--) {
                    if (pet == this._petList2[i]) {
                        this._petList2.splice(i, 1);
                        break;
                    }
                }
            }
            else if (pos == 2) {
                for (var i = this._petList3.length - 1; i >= 0; i--) {
                    if (pet == this._petList3[i]) {
                        this._petList3.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                for (var i = this._petList4.length - 1; i >= 0; i--) {
                    if (pet == this._petList4[i]) {
                        this._petList4.splice(i, 1);
                        break;
                    }
                }
            }
            this.dispatchEventWith(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO);
        };
        Object.defineProperty(ModelUpStar.prototype, "allPetList", {
            get: function () {
                return this._petList1.concat(this._petList2).concat(this._petList3).concat(this._petList4);
            },
            enumerable: true,
            configurable: true
        });
        ModelUpStar.prototype.clearGamePetVo = function (isClose) {
            if (isClose === void 0) { isClose = false; }
            this._petList1 = [];
            this._petList2 = [];
            this._petList3 = [];
            this._petList4 = [];
            if (isClose)
                this.dispatchEventWith(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO);
        };
        /**突破 */
        ModelUpStar.prototype.petStarBreak = function (petId, successhandler) {
            logger.log("合成武将SelfPetList===", this.getGamePetVoArrByPos(0));
            logger.log("合成武将OtherPetList===", this.getGamePetUIDVoArrByPos(1).concat(this.getGamePetUIDVoArrByPos(2)));
            logger.log("合成武将CampPetList===", this.getGamePetUIDVoArrByPos(3));
            var msg = n.MessagePool.from(n.C2G_Pet_StarBreak);
            msg.PetId = petId;
            msg.SelfPetList = this.getGamePetUIDVoArrByPos(0);
            msg.OtherPetList = this.getGamePetUIDVoArrByPos(1).concat(this.getGamePetUIDVoArrByPos(2));
            msg.CampPetList = this.getGamePetUIDVoArrByPos(3);
            this.request(n.MessageMap.C2G_PET_STARBREAK, msg, utils.Handler.create(this, function (data) {
                this.dispatchEventWith(mo.ModelUpStar.PET_CHANGE);
                GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
                GameModels.state.updateState(GameRedState.ROLE_JIUXING_POS1);
                GameModels.state.updateState(GameRedState.ROLE_JIUXING_POS2);
                GameModels.state.updateState(GameRedState.ROLE_JIUXING_POS3);
                GameModels.state.updateState(GameRedState.ROLE_JIUXING_POS4);
                GameModels.state.updateState(GameRedState.ROLE_JIUXING_POS5);
                GameModels.state.updateState(GameRedState.ROLE_LIUDAO_POS1);
                GameModels.state.updateState(GameRedState.ROLE_LIUDAO_POS2);
                GameModels.state.updateState(GameRedState.ROLE_LIUDAO_POS3);
                GameModels.state.updateState(GameRedState.ROLE_LIUDAO_POS4);
                GameModels.state.updateState(GameRedState.ROLE_LIUDAO_POS5);
                if (successhandler)
                    successhandler.run();
            }));
        };
        Object.defineProperty(ModelUpStar.prototype, "rebirthPetVo", {
            get: function () {
                return this._rebirthStarPetVo;
            },
            set: function (v) {
                this._rebirthStarPetVo = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelUpStar.prototype, "rebirthLvPetVo", {
            get: function () {
                return this._rebirthLvPetVo;
            },
            set: function (v) {
                this._rebirthLvPetVo = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelUpStar.prototype.updateselectedRebirth = function () {
            this.dispatchEventWith(mo.ModelUpStar.PETREBIRTH_CHANGE);
        };
        ModelUpStar.prototype.updateselectedPet = function (petUid) {
            this.dispatchEventWith(mo.ModelUpStar.PETLIST_CHANGE, false, petUid);
        };
        /**星级重生 */
        ModelUpStar.prototype.petReduceStar = function (petId, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Pet_ReduceStar);
            msg.PetId = petId;
            this.request(n.MessageMap.C2G_PET_REDUCESTAR, msg, utils.Handler.create(this, function (data) {
                _this._rebirthStarPetVo = null;
                _this.dispatchEventWith(mo.ModelUpStar.PET_CHANGE);
                _this.dispatchEventWith(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO);
                GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**等级重生 */
        ModelUpStar.prototype.petLvReduceStar = function (petId, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Pet_ResetLevel);
            msg.PetId = petId;
            this.request(n.MessageMap.C2G_PET_RESETLEVEL, msg, utils.Handler.create(this, function (data) {
                _this._rebirthLvPetVo = null;
                _this.dispatchEventWith(mo.ModelUpStar.PET_CHANGE);
                _this.dispatchEventWith(mo.ModelUpStar.ADD_REMOVE_GAMEPETVO);
                GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_LV_ZHONGSEHNG);
                if (successhandler)
                    successhandler.run();
            }));
        };
        ModelUpStar.prototype.checkTatolUpStarRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.role, 1))
                return false;
            //if (GameModels.petChoose.checkTatolRedPoint() && !this._isOpenQuickShengXingView) return true;
            //if (this.checkPetZhongShengRedPoint()) return true;
            var petVoArr = GameModels.pet.formatUpVOList;
            for (var _i = 0, petVoArr_1 = petVoArr; _i < petVoArr_1.length; _i++) {
                var petVo = petVoArr_1[_i];
                if (this.checkPetHeadUpStarRedPoint(petVo) || GameModels.equip.checkBingFaRedPoint(petVo.formatData.position)) {
                    return true;
                }
            }
            return false;
        };
        ModelUpStar.prototype.checkPetZhongShengRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.tujian, 3))
                return false;
            var downVoArr = GameModels.pet.formatDownVOList;
            for (var _i = 0, downVoArr_1 = downVoArr; _i < downVoArr_1.length; _i++) {
                var pet = downVoArr_1[_i];
                if (pet.lv > 1 && pet.isGongMing == 0 && pet.isLock == 0) {
                    return true;
                }
            }
            return false;
        };
        ModelUpStar.prototype.checkPetHeadUpStarRedPoint = function (petVo) {
            if (!petVo)
                return false;
            if (petVo.generalBraekTmp.nextId == -1 || GameModels.user.player.level < petVo.generalBraekTmp.needLV)
                return false;
            if (petVo.generalBraekTmp.consume && GameModels.bag.getItemCountById(ConfigData.GUANYING) < parseInt(petVo.generalBraekTmp.consume.split("_")[1]))
                return false;
            var petListArr = GameModels.pet.getPetListByQAndStar(0, parseInt(petVo.refId));
            if (petVo.selfPetCount && (petListArr.indexOf(petVo) == -1 ? petListArr.length : petListArr.length - 1) < petVo.selfPetCount)
                return false;
            if (petVo.hashLegionPet) {
                var templgeneral = Templates.getTemplateById(templates.Map.GENERAL, parseInt(petVo.refId));
                var legionPetListArr = GameModels.pet.getPetListByQAndStar(petVo.legionPetStar, 0, petVo.refId == "13000" ? 4 : templgeneral.country);
                if ((legionPetListArr.indexOf(petVo) == -1 ? legionPetListArr.length : legionPetListArr.length - 1) < petVo.legionPetCount)
                    return false;
                if (petVo.selfPetCount) {
                    var selfcount = 0;
                    for (var i = 0; i < legionPetListArr.length; i++) {
                        var templ = Templates.getTemplateById(templates.Map.GENERAL, legionPetListArr[i].refId);
                        if (petListArr.indexOf(legionPetListArr[i]) != -1) {
                            if (selfcount < petVo.selfPetCount)
                                selfcount++;
                        }
                    }
                    if ((legionPetListArr.indexOf(petVo) == -1 ? legionPetListArr.length : legionPetListArr.length - 1) - selfcount < petVo.legionPetCount)
                        return false;
                }
            }
            if (petVo.generalBraekTmp.otherGen) {
                var oneOtherPetListArr = GameModels.pet.getPetListByQAndStar(petVo.getOtherPetStar(0), 0);
                var strArr = petVo.generalBraekTmp.otherGen.split(";");
                if (strArr.length == 1) {
                    if ((oneOtherPetListArr.indexOf(petVo) == -1 ? oneOtherPetListArr.length : oneOtherPetListArr.length - 1) < petVo.getOtherPetCount(0))
                        return false;
                    var selfcount = 0;
                    if (petVo.selfPetCount) {
                        for (var i = 0; i < oneOtherPetListArr.length; i++) {
                            var templ = Templates.getTemplateById(templates.Map.GENERAL, oneOtherPetListArr[i].refId);
                            if (petListArr.indexOf(oneOtherPetListArr[i]) != -1) {
                                if (selfcount < petVo.selfPetCount)
                                    selfcount++;
                            }
                        }
                        if ((oneOtherPetListArr.indexOf(petVo) == -1 ? oneOtherPetListArr.length : oneOtherPetListArr.length - 1) - selfcount < petVo.getOtherPetCount(0))
                            return false;
                    }
                    if (petVo.hashLegionPet) {
                        var legioncount = 0;
                        var templgeneral = Templates.getTemplateById(templates.Map.GENERAL, parseInt(petVo.refId));
                        var legionPetListArr = GameModels.pet.getPetListByQAndStar(petVo.legionPetStar, 0, petVo.refId == "13000" ? 4 : templgeneral.country);
                        for (var i = 0; i < oneOtherPetListArr.length; i++) {
                            for (var j = 0; j < legionPetListArr.length; j++) {
                                if (oneOtherPetListArr[i] == legionPetListArr[j]) {
                                    if (legioncount < petVo.legionPetCount)
                                        legioncount++;
                                }
                            }
                        }
                        if ((oneOtherPetListArr.indexOf(petVo) == -1 ? oneOtherPetListArr.length : oneOtherPetListArr.length - 1) - selfcount - legioncount < petVo.getOtherPetCount(0))
                            return false;
                    }
                }
                else {
                    var twoOtherPetListArr = GameModels.pet.getPetListByQAndStar(petVo.getOtherPetStar(1), 0);
                    if ((oneOtherPetListArr.indexOf(petVo) == -1 ? oneOtherPetListArr.length : oneOtherPetListArr.length - 1) < petVo.getOtherPetCount(0))
                        return false;
                    if ((twoOtherPetListArr.indexOf(petVo) == -1 ? twoOtherPetListArr.length : twoOtherPetListArr.length - 1) < petVo.getOtherPetCount(1))
                        return false;
                    var selfcount = 0;
                    var selfcount1 = 0;
                    if (petVo.selfPetCount) {
                        for (var i = 0; i < oneOtherPetListArr.length; i++) {
                            var templ = Templates.getTemplateById(templates.Map.GENERAL, oneOtherPetListArr[i].refId);
                            if (petListArr.indexOf(oneOtherPetListArr[i]) != -1) {
                                if (selfcount < petVo.selfPetCount)
                                    selfcount++;
                            }
                        }
                        if ((oneOtherPetListArr.indexOf(petVo) == -1 ? oneOtherPetListArr.length : oneOtherPetListArr.length - 1) - selfcount < petVo.getOtherPetCount(0))
                            return false;
                        for (var i = 0; i < twoOtherPetListArr.length; i++) {
                            var templ = Templates.getTemplateById(templates.Map.GENERAL, twoOtherPetListArr[i].refId);
                            if (petListArr.indexOf(twoOtherPetListArr[i]) != -1) {
                                if (selfcount1 < petVo.selfPetCount)
                                    selfcount1++;
                            }
                        }
                        if ((twoOtherPetListArr.indexOf(petVo) == -1 ? twoOtherPetListArr.length : twoOtherPetListArr.length - 1) - selfcount1 < petVo.getOtherPetCount(1))
                            return false;
                    }
                    if (petVo.hashLegionPet) {
                        var legioncount = 0;
                        var templgeneral = Templates.getTemplateById(templates.Map.GENERAL, parseInt(petVo.refId));
                        var legionPetListArr = GameModels.pet.getPetListByQAndStar(petVo.legionPetStar, 0, petVo.refId == "13000" ? 4 : templgeneral.country);
                        for (var i = 0; i < oneOtherPetListArr.length; i++) {
                            for (var j = 0; j < legionPetListArr.length; j++) {
                                if (oneOtherPetListArr[i] == legionPetListArr[j]) {
                                    if (legioncount < petVo.legionPetCount)
                                        legioncount++;
                                }
                            }
                        }
                        if ((oneOtherPetListArr.indexOf(petVo) == -1 ? oneOtherPetListArr.length : oneOtherPetListArr.length - 1) - selfcount - legioncount < petVo.getOtherPetCount(0))
                            return false;
                        var legioncount2 = 0;
                        for (var i = 0; i < twoOtherPetListArr.length; i++) {
                            for (var j = 0; j < legionPetListArr.length; j++) {
                                if (twoOtherPetListArr[i] == legionPetListArr[j]) {
                                    if (legioncount2 < petVo.legionPetCount)
                                        legioncount2++;
                                }
                            }
                        }
                        if ((twoOtherPetListArr.indexOf(petVo) == -1 ? twoOtherPetListArr.length : twoOtherPetListArr.length - 1) - selfcount1 - legioncount2 < petVo.getOtherPetCount(1))
                            return false;
                    }
                }
            }
            return true;
        };
        ModelUpStar.prototype.checkRedPointSelf = function (petVo) {
            var selfCount = 0;
            var petListArr = GameModels.pet.getPetListByQAndStar(0, parseInt(petVo.refId));
            for (var i = 0; i < petListArr.length; i++) {
                if (this.allPetList.indexOf(petListArr[i]) == -1 && petListArr[i] != petVo) {
                    selfCount++;
                }
            }
            return selfCount >= petVo.selfPetCount;
        };
        ModelUpStar.prototype.checkRedPointLegion = function (petVo) {
            var legionCount = 0;
            var templgeneral = Templates.getTemplateById(templates.Map.GENERAL, petVo.refId);
            var petListArr = GameModels.pet.getPetListByQAndStar(petVo.legionPetStar, 0, petVo.refId == "13000" ? 4 : templgeneral.country);
            for (var i = 0; i < petListArr.length; i++) {
                if (this.allPetList.indexOf(petListArr[i]) == -1 && petListArr[i] != petVo) {
                    legionCount++;
                }
            }
            return legionCount >= petVo.legionPetCount;
        };
        ModelUpStar.prototype.checkRedPointOther1 = function (petVo) {
            var otherCount = 0;
            var petListArr = GameModels.pet.getPetListByQAndStar(petVo.getOtherPetStar(0), 0);
            for (var i = 0; i < petListArr.length; i++) {
                if (this.allPetList.indexOf(petListArr[i]) == -1 && petListArr[i] != petVo) {
                    otherCount++;
                }
            }
            return otherCount >= petVo.getOtherPetCount(0);
        };
        ModelUpStar.prototype.checkRedPointOther2 = function (petVo) {
            var otherCount = 0;
            var petListArr = GameModels.pet.getPetListByQAndStar(petVo.getOtherPetStar(1), 0);
            for (var i = 0; i < petListArr.length; i++) {
                if (this.allPetList.indexOf(petListArr[i]) == -1 && petListArr[i] != petVo) {
                    otherCount++;
                }
            }
            return otherCount >= petVo.getOtherPetCount(1);
        };
        ModelUpStar.ADD_REMOVE_GAMEPETVO = "ADD_REMOVE_GAMEPETVO";
        ModelUpStar.PET_CHANGE = "PET_CHANGE";
        ModelUpStar.PET_CHOSES = "PET_CHOSES";
        ModelUpStar.PETREBIRTH_CHANGE = "PETREBIRTH_CHANGE"; //武将重生选择武将监听
        ModelUpStar.PETLIST_CHANGE = "PETLIST_CHANGE"; //选择武将监听
        return ModelUpStar;
    }(mo.ModelBase));
    mo.ModelUpStar = ModelUpStar;
    __reflect(ModelUpStar.prototype, "mo.ModelUpStar");
})(mo || (mo = {}));
