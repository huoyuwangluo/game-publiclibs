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
    var ModelPetChoose = (function (_super) {
        __extends(ModelPetChoose, _super);
        function ModelPetChoose() {
            return _super.call(this) || this;
        }
        ModelPetChoose.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._isUpStar = false;
            this._quickGeneralBreakArr = [];
            this._petList1 = [];
            this._petList2 = [];
            this._petList3 = [];
            this._allPetTempArr = Templates.getList(templates.Map.GENERAL);
            this._quickGeneralBreakArr.push(Templates.getTemplateById(templates.Map.GENERALBREAK, 403));
            this._quickGeneralBreakArr.push(Templates.getTemplateById(templates.Map.GENERALBREAK, 504));
            this._quickGeneralBreakArr.push(Templates.getTemplateById(templates.Map.GENERALBREAK, 605));
        };
        ModelPetChoose.prototype.getGamePetVoArrByPos = function (pos) {
            if (pos == 0) {
                return this._petList1;
            }
            else if (pos == 1) {
                return this._petList2;
            }
            else {
                return this._petList3;
            }
        };
        ModelPetChoose.prototype.getXiYouPetCountArrByPos = function (pos) {
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
            else {
                for (var i = 0; i < this._petList3.length; i++) {
                    if (this._petList3[i].isHashFourSkill) {
                        count++;
                    }
                }
            }
            return count;
        };
        /**有自己阵上的武将的个数*/
        ModelPetChoose.prototype.getUpPetCountArrByPos = function (pos) {
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
            else {
                for (var i = 0; i < this._petList3.length; i++) {
                    if (GameModels.pet.formatUpVORefIdList.indexOf(this._petList3[i].refId) != -1) {
                        count++;
                    }
                }
            }
            return count;
        };
        /**有神魔武将的个数 */
        ModelPetChoose.prototype.getShenMoPetCountArrByPos = function (pos) {
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
            else {
                for (var i = 0; i < this._petList3.length; i++) {
                    if (this._petList3[i].template.godDevil > 0) {
                        count++;
                    }
                }
            }
            return count;
        };
        ModelPetChoose.prototype.getGamePetUIDVoArrByPos = function (pos) {
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
            else {
                for (var i = 0; i < this._petList3.length; i++) {
                    id.push(this._petList3[i].uid);
                }
            }
            return id;
        };
        ModelPetChoose.prototype.addGamePetVo = function (pet, pos) {
            if (pos == 0) {
                this._petList1.push(pet);
            }
            else if (pos == 1) {
                this._petList2.push(pet);
            }
            else {
                this._petList3.push(pet);
            }
            this.dispatchEventWith(mo.ModelPetChoose.ADD_REMOVE_GAMEPETVO);
        };
        ModelPetChoose.prototype.removeGamePetVo = function (pet, pos) {
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
            else {
                for (var i = this._petList3.length - 1; i >= 0; i--) {
                    if (pet == this._petList3[i]) {
                        this._petList3.splice(i, 1);
                        break;
                    }
                }
            }
            this.dispatchEventWith(mo.ModelPetChoose.ADD_REMOVE_GAMEPETVO);
        };
        Object.defineProperty(ModelPetChoose.prototype, "allPetList", {
            get: function () {
                return this._petList1.concat(this._petList2).concat(this._petList3);
            },
            enumerable: true,
            configurable: true
        });
        ModelPetChoose.prototype.clearGamePetVo = function (isClose) {
            if (isClose === void 0) { isClose = false; }
            this._petList1 = [];
            this._petList2 = [];
            this._petList3 = [];
            if (isClose)
                this.dispatchEventWith(mo.ModelPetChoose.ADD_REMOVE_GAMEPETVO);
        };
        Object.defineProperty(ModelPetChoose.prototype, "quickGeneralBreakArr", {
            get: function () {
                return this._quickGeneralBreakArr;
            },
            enumerable: true,
            configurable: true
        });
        ModelPetChoose.prototype.getAllPetTempArrByQuality = function (index) {
            var tem = [];
            for (var i = 0; i < this._allPetTempArr.length; i++) {
                if (this._allPetTempArr[i].type == 1300 && this._allPetTempArr[i].id != 13000 && this._allPetTempArr[i].star == mo.ModelPetChoose.STARARR[index]) {
                    tem.push(this._allPetTempArr[i]);
                }
            }
            return tem;
        };
        Object.defineProperty(ModelPetChoose.prototype, "isOpenUpStar", {
            get: function () {
                return this._isUpStar;
            },
            set: function (value) {
                this._isUpStar = value;
                GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
            },
            enumerable: true,
            configurable: true
        });
        ModelPetChoose.prototype.checkTatolRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.tujian, 2))
                return false;
            var isCan1 = GameModels.petChoose.checkTableRedPoint(0);
            var isCan2 = GameModels.petChoose.checkTableRedPoint(1);
            var isCan3 = !this._isUpStar && GameModels.user.player.level >= 200 && GameModels.petChoose.checkTableRedPoint(2);
            return isCan1 || isCan2 || isCan3;
        };
        ModelPetChoose.prototype.checkTableRedPoint = function (index) {
            var tem = this.getAllPetTempArrByQuality(index);
            var currBreakId = this.quickGeneralBreakArr[index];
            for (var i = 0; i < tem.length; i++) {
                if (GameModels.user.player.level >= currBreakId.needLV && this.checkPetAllRedPoint(tem[i].id, currBreakId)) {
                    return true;
                }
            }
            return false;
        };
        ModelPetChoose.prototype.checkPetAllRedPoint = function (petRefId, temp) {
            if (petRefId == 13052) {
                logger.log("111111111111111");
            }
            var selfCount = GameModels.pet.getPetListByQAndStar(0, petRefId).length;
            var selfNeedCount = temp.selfGenFast;
            var strLegion = temp.campGenFast.split("_");
            var templgeneral = Templates.getTemplateById(templates.Map.GENERAL, petRefId);
            var legionCount = GameModels.pet.getPetListByQAndStar(parseInt(strLegion[0]), 0, templgeneral.country).length;
            var legionNeedCount = parseInt(strLegion[1]);
            if (temp.otherGenFast) {
                var strOther = temp.otherGenFast.split("_");
                var otherCount = GameModels.pet.getPetListByQAndStar(parseInt(strOther[0]), 0).length;
                var otherNeedCount = parseInt(strOther[1]);
                if (selfCount >= selfNeedCount && legionCount - selfNeedCount >= legionNeedCount && otherCount - legionNeedCount - selfNeedCount >= otherNeedCount) {
                    return true;
                }
            }
            else {
                if (selfCount >= selfNeedCount && legionCount - selfNeedCount >= legionNeedCount) {
                    return true;
                }
            }
            return false;
        };
        ModelPetChoose.prototype.checkRedPointSelf = function (petRefId, temp) {
            var selfCount = 0;
            var petListArr = GameModels.pet.getPetListByQAndStar(0, petRefId);
            for (var i = 0; i < petListArr.length; i++) {
                if (this.allPetList.indexOf(petListArr[i]) == -1) {
                    selfCount++;
                }
            }
            return selfCount >= temp.selfGenFast;
        };
        ModelPetChoose.prototype.checkRedPointLegion = function (petRefId, temp) {
            var str = temp.campGenFast.split("_");
            var legionCount = 0;
            var templgeneral = Templates.getTemplateById(templates.Map.GENERAL, petRefId);
            var petListArr = GameModels.pet.getPetListByQAndStar(parseInt(str[0]), 0, templgeneral.country);
            for (var i = 0; i < petListArr.length; i++) {
                if (this.allPetList.indexOf(petListArr[i]) == -1) {
                    legionCount++;
                }
            }
            return legionCount >= parseInt(str[1]);
        };
        ModelPetChoose.prototype.checkRedPointOther = function (petRefId, temp) {
            var str = temp.otherGenFast.split("_");
            var otherCount = 0;
            var petListArr = GameModels.pet.getPetListByQAndStar(parseInt(str[0]), 0);
            for (var i = 0; i < petListArr.length; i++) {
                if (this.allPetList.indexOf(petListArr[i]) == -1) {
                    otherCount++;
                }
            }
            return otherCount >= parseInt(str[1]);
        };
        ModelPetChoose.prototype.getSelfPetVo = function (petRefId) {
            var templ = Templates.getTemplateById(templates.Map.GENERAL, petRefId);
            var temp = [];
            var voArr = GameModels.pet.formatDownVOList;
            voArr.sort(function (a, b) {
                if (a.quality != b.quality) {
                    return a.quality - b.quality;
                }
                else {
                    return parseInt(a.refId) - parseInt(b.refId);
                }
            });
            for (var i = 0; i < voArr.length; i++) {
                if (voArr[i].isGongMing != 1 && voArr[i].isLock != 1 && voArr[i].star == templ.star && parseInt(voArr[i].refId) == petRefId) {
                    temp.push(voArr[i]);
                }
            }
            return temp;
        };
        ModelPetChoose.prototype.getOtherPetVo = function (star) {
            var temp = [];
            var voArr = GameModels.pet.formatDownVOList;
            voArr.sort(function (a, b) {
                if (a.quality != b.quality) {
                    return a.quality - b.quality;
                }
                else {
                    return parseInt(a.refId) - parseInt(b.refId);
                }
            });
            for (var i = 0; i < voArr.length; i++) {
                if (voArr[i].isGongMing != 1 && voArr[i].isLock != 1 && voArr[i].star == star) {
                    temp.push(voArr[i]);
                }
            }
            return temp;
        };
        ModelPetChoose.prototype.getLegionPetVo = function (star, legion) {
            var temp = [];
            var voArr = GameModels.pet.formatDownVOList;
            voArr.sort(function (a, b) {
                if (a.quality != b.quality) {
                    return a.quality - b.quality;
                }
                else {
                    return parseInt(a.refId) - parseInt(b.refId);
                }
            });
            for (var i = 0; i < voArr.length; i++) {
                if (voArr[i].isGongMing != 1 && voArr[i].isLock != 1 && voArr[i].star == star && voArr[i].template.country == legion) {
                    temp.push(voArr[i]);
                }
            }
            return temp;
        };
        /**放阵营武将 */
        ModelPetChoose.prototype.onekeyChooseLegion = function (petRefId, temp) {
            var str = temp.campGenFast.split("_");
            var legionCount = parseInt(str[1]);
            var templ = Templates.getTemplateById(templates.Map.GENERAL, petRefId);
            var voArr1 = this.getLegionPetVo(parseInt(str[0]), templ.country);
            this._petList3 = [];
            for (var i = 0; i < voArr1.length; i++) {
                if (this.allPetList.indexOf(voArr1[i]) == -1) {
                    if (this._petList3.length < legionCount)
                        this.addGamePetVo(voArr1[i], 2);
                }
            }
        };
        /**放其他材料 */
        ModelPetChoose.prototype.onekeyChooseOther = function (petRefId, temp) {
            var str = temp.otherGenFast.split("_");
            var otherCount = parseInt(str[1]);
            var voArr1 = this.getOtherPetVo(parseInt(str[0]));
            this._petList2 = [];
            for (var i = 0; i < voArr1.length; i++) {
                if (this.allPetList.indexOf(voArr1[i]) == -1) {
                    if (this._petList2.length < otherCount)
                        this.addGamePetVo(voArr1[i], 1);
                }
            }
        };
        /**放本体 */
        ModelPetChoose.prototype.onekeyChooseSelf = function (petRefId, temp) {
            var voArr = this.getSelfPetVo(petRefId);
            var selfCount = temp.selfGenFast;
            this._petList1 = [];
            for (var i = 0; i < voArr.length; i++) {
                if (this.allPetList.indexOf(voArr[i]) == -1) {
                    if (this._petList1.length < selfCount)
                        this.addGamePetVo(voArr[i], 0);
                }
            }
        };
        /**快速合成 */
        ModelPetChoose.prototype.petStarBreakFast = function (temp, successhandler) {
            logger.log("快速合成武将SelfPetList===", this.getGamePetVoArrByPos(0));
            logger.log("快速合成武将OtherPetList===", this.getGamePetVoArrByPos(1));
            logger.log("快速合成武将CampPetList===", this.getGamePetVoArrByPos(2));
            var msg = n.MessagePool.from(n.C2G_Pet_StarBreakFast);
            msg.Star = temp.star;
            msg.SelfPetList = this.getGamePetUIDVoArrByPos(0);
            msg.OtherPetList = this.getGamePetUIDVoArrByPos(1);
            msg.CampPetList = this.getGamePetUIDVoArrByPos(2);
            this.request(n.MessageMap.C2G_PET_STARBREAKFAST, msg, utils.Handler.create(this, function (data) {
                GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
                this.dispatchEventWith(mo.ModelPetChoose.PET_CHANGE);
                if (successhandler)
                    successhandler.run();
            }));
        };
        ModelPetChoose.ADD_REMOVE_GAMEPETVO = "ADD_REMOVE_GAMEPETVO";
        ModelPetChoose.PET_CHANGE = "PET_CHANGE";
        ModelPetChoose.STARARR = [3, 4, 5];
        return ModelPetChoose;
    }(mo.ModelBase));
    mo.ModelPetChoose = ModelPetChoose;
    __reflect(ModelPetChoose.prototype, "mo.ModelPetChoose");
})(mo || (mo = {}));
