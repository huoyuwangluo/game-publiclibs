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
    var ModelPet = (function (_super) {
        __extends(ModelPet, _super);
        function ModelPet() {
            var _this = _super.call(this) || this;
            /**
             * 获取兵法重铸信息
             */
            _this._hashTempBingFa = false;
            _this._temBingFa = null;
            _this._formationData = [];
            _this._formationDataLinShi = [];
            _this._formationLadderData = [];
            _this._formationLadderData1 = [];
            _this._formationLadderDataLinShi = [];
            return _this;
        }
        ModelPet.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._lvCorStarDate = {};
            this._isOpenGongMingView = false;
            this._lockList = [0, 0, 1, 1, 1];
            this._playerPetList = GameModels.user.player.petList;
            n.net.onRoute(n.MessageMap.G2C_PET_NEWPET, utils.Handler.create(this, this.addPetHandler, null, false));
            n.net.onRoute(n.MessageMap.G2C_PET_REMOVEPET, utils.Handler.create(this, this.removePetHandler, null, false));
            //n.net.onRoute(n.MessageMap.G2C_PET_PETROOMPROPCHANGE, utils.Handler.create(this, this.updataPosPetProperty, null, false));
            n.net.onRoute(n.MessageMap.G2C_PET_PETPROPCHANGE, utils.Handler.create(this, this.updataPetProperty, null, false));
            n.net.onRoute(n.MessageMap.G2C_PET_PETROOMCHANGE, utils.Handler.create(this, this.changeLockStateAndPetLevel, null, false));
            this._isFirstPetChange = false;
            this._allPetCount = 0;
            this._maxPetCount = 0;
            this._gongMingCDList = [];
            this._gongMingPetList = [];
            this._gongMingMaxPos = 0;
            this._zhuZhanFight = 0;
            this._zhuZhanPetList = [];
            this._zhuZhanTempList = [];
            this._zhuZhanTempArr = [];
            this._isOpenZhuZhanView = false;
            this.getPetList(0, null);
            this.initLvCorrespondingStar();
            this.petGetGongMingInfo();
            this.initZhuZhanTempList();
        };
        ModelPet.prototype.setIsFirstPetChange = function (v) {
            this._isFirstPetChange = v;
            this.updataPosRedPoint();
            this.dispatchEventWith(mo.ModelPet.UPDATA_PETCHANGE_AND_PETJIBAN);
        };
        // private updataPosPetProperty(data: n.G2C_Pet_PetRoomPropChange): void {
        // 	if (this._playerPetList.totalUpFormat > 0) {
        // 		for (var i: number = 0; i < data.PropertyList.length; i++) {
        // 			this._playerPetList.updateFormat(data.PropertyList[i].RoomPos, data.PropertyList[i].PropertyList, data.PropertyList[i].FightValue);
        // 		}
        // 		this.dispatchEventWith(ModelPet.PROPERTY_CHANGE);
        // 	}
        // 	if (this._propertyRemindHandler) {
        // 		this._propertyRemindHandler.run();
        // 	}
        // }
        ModelPet.prototype.updataPetProperty = function (data) {
            var isFormat = false;
            for (var j = 0; j < data.PropertyList.length; j++) {
                this._playerPetList.updateFormat(data.PropertyList[j].PetId, data.PropertyList[j].PropertyList, data.PropertyList[j].FightPower);
                this._playerPetList.updateByUId(data.PropertyList[j].PetId, data.PropertyList[j].PropertyList, data.PropertyList[j].FightPower, data.PropertyList[j].BaseFightPower, data.PropertyList[j].Status);
                this._playerPetList.updateRankByUId(data.PropertyList[j].PetId, data.PropertyList[j]);
                this._playerPetList.updatePetState(data.PropertyList[j].PetId, data.PropertyList[j]);
                this._playerPetList.updatePetLevelOrStar(data.PropertyList[j].PetId, data.PropertyList[j]);
                this._playerPetList.updatePetTanlentAndSkill(data.PropertyList[j].PetId, data.PropertyList[j]);
                this._playerPetList.updatePetShenBing(data.PropertyList[j].PetId, data.PropertyList[j]);
                this._playerPetList.updatePetIsLockState(data.PropertyList[j].PetId, data.PropertyList[j]);
                this._playerPetList.updatePetIsGongMingState(data.PropertyList[j].PetId, data.PropertyList[j]);
                if (data.PropertyList[j].IsInBattle) {
                    isFormat = true;
                }
            }
            if (isFormat) {
                if (this._propertyRemindHandler) {
                    this._propertyRemindHandler.run();
                }
                this.dispatchEventWith(ModelPet.PROPERTY_CHANGE);
            }
        };
        //位置要单独处理!!! 	合体完全客户端处理
        ModelPet.prototype.initializeData = function (petRooms) {
            if (!petRooms || !petRooms.length)
                return;
            for (var i = 0; i < 5; i++) {
                this._lockList[i] = petRooms[i].IsLock;
            }
        };
        ModelPet.prototype.changeLockStateAndPetLevel = function (data) {
            if (this._lockList[data.NewPetRoom.PosId] != data.NewPetRoom.IsLock) {
                this._lockList[data.NewPetRoom.PosId] = data.NewPetRoom.IsLock;
                this.dispatchEventWith(ModelPet.PET_CHANGE_LOCK, false, data.NewPetRoom.PosId);
            }
            var upPetVO = GameModels.pet.getFormatUpVOByPos(data.NewPetRoom.PosId);
            if (upPetVO) {
                upPetVO.formatData.lock = data.NewPetRoom.IsLock;
            }
            this.dispatchEventWith(ModelPet.PET_CHANGE_LEVEL);
        };
        ModelPet.prototype.addPetHandler = function (data) {
            if (data.List.length <= 0)
                return;
            var petVoArr = [];
            var isShowPetTips = true;
            for (var _i = 0, _a = data.List; _i < _a.length; _i++) {
                var newPet = _a[_i];
                var petVO = vo.fromPool(vo.GamePetVO, newPet.NewPet);
                petVO.isFirst = newPet.GetCnt == 1 ? 1 : 0;
                petVO.come = newPet.Reason;
                isShowPetTips = TypeModel.isShowPetTips(newPet.Reason);
                if (newPet.GetCnt == 1) {
                    GameModels.handBook.requestHandbookInfo();
                    GameModels.state.updateState(GameRedState.TUJIAN_TUJIAN);
                }
                this._playerPetList.addToDownList(petVO);
                petVoArr.push(petVO);
            }
            if (TypeModel.isShowPetTips(data.List[0].Reason)) {
                if (data.List[0].Reason == TypeModel.PetCompound || data.List[0].Reason == TypeModel.PetRandomCompound) {
                    var tempData = [];
                    for (var _b = 0, petVoArr_1 = petVoArr; _b < petVoArr_1.length; _b++) {
                        var petVo = petVoArr_1[_b];
                        var str = petVo.refId + "_1";
                        tempData.push(str);
                    }
                    if (tempData.length > 0) {
                        mg.alertManager.showAlert(UsePropGetGift, true, true, tempData, 2);
                    }
                }
            }
            else {
                for (var _c = 0, petVoArr_2 = petVoArr; _c < petVoArr_2.length; _c++) {
                    var pet = petVoArr_2[_c];
                    mg.alertManager.showAlert(bossComing.CopyBossComing, true, true, pet, false);
                }
            }
            this._allPetCount = data.TotalPetCount;
            this.updataPosRedPoint();
            if (this.formatUpVOList.length < 5)
                return;
            for (var i = 0; i < petVoArr.length; i++) {
                var pet1 = GameModels.pet.getFormatUpVOByPos(1);
                if (pet1 && pet1.star < 5 && petVoArr[i].fightType == 1 && petVoArr[i].star >= 5) {
                    GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType10000, 1);
                    break;
                }
                var pet2 = GameModels.pet.getFormatUpVOByPos(2);
                if (pet2 && pet2.star < 5 && petVoArr[i].fightType == 1 && petVoArr[i].star >= 5) {
                    GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType10000, 2);
                    break;
                }
                var pet3 = GameModels.pet.getFormatUpVOByPos(3);
                if (pet3 && pet3.star < 5 && petVoArr[i].fightType == 2 && petVoArr[i].star >= 5) {
                    GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType10000, 3);
                    break;
                }
                var pet4 = GameModels.pet.getFormatUpVOByPos(4);
                if (pet4 && pet4.star < 5 && petVoArr[i].fightType == 2 && petVoArr[i].star >= 5) {
                    GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType10000, 4);
                    break;
                }
            }
        };
        ModelPet.prototype.removePetHandler = function (data) {
            var petVO = this.getFormatDownVO(data.petId);
            this._playerPetList.removeFromDownList(petVO);
            petVO.autoRecover = true;
            vo.toPool(petVO);
            this._allPetCount = data.TotalPetCount;
            this.updataPosRedPoint();
        };
        /**上阵武将 */
        ModelPet.prototype.upformat = function (data) {
            var petPosVO = this._playerPetList.updatePosVO(data);
            if (!this._playerPetList.hasDownListVO(petPosVO.petId)) {
                logger.error('未在下阵列表中找到需要上阵的武将');
                return;
            }
            if (this._playerPetList.hasUpFormatVO(petPosVO.position)) {
                //如果该位置有单位 先下阵该单位
                var upPetVO = this._playerPetList.removeFromFormat(petPosVO.position);
                this._playerPetList.addToDownList(upPetVO);
                // this.dispatchEventWith(ModelPet.FORMAT_DOWN, false, upPetVO);
            }
            //从下阵列表移除
            var downPetVO = this._playerPetList.removeFromDownListByUId(petPosVO.petId);
            //更换上阵属性
            petPosVO.property = downPetVO.property;
            //添加到上阵列表
            this._playerPetList.addToFormat(downPetVO, petPosVO);
            // this.dispatchEventWith(ModelPet.FORMAT_UP, false, downPetVO);
            this.dispatchEventWith(ModelPet.FORMAT_CHANGE, false, petPosVO.position);
            this.updataPosRedPoint();
        };
        /**从下阵列表通过武将唯一标识获取VO */
        ModelPet.prototype.getFormatDownVO = function (uid) {
            return this._playerPetList.getDownListVOByUId(uid);
        };
        /**从上阵列表通过武将唯一标识获取VO */
        ModelPet.prototype.getFormatUpVO = function (uid) {
            return this._playerPetList.getFormatVOByObjId(uid);
        };
        /**从所有列表通过武将唯一标识获取VO */
        ModelPet.prototype.getFormatDownAndUpVO = function (uid) {
            return this._playerPetList.getDownAndUpListVOByUId(uid);
        };
        /**从下阵列表通过武将ID获取VO */
        ModelPet.prototype.getFormatDownVOById = function (petId) {
            return this._playerPetList.getDownListVOById(petId);
        };
        /**从上阵列表通过武将ID获取VO */
        ModelPet.prototype.getFormatUpVOById = function (petId) {
            return this._playerPetList.getFormatListVOById(petId);
        };
        /**从上阵列表根据位置信息获取VO */
        ModelPet.prototype.getFormatUpVOByPos = function (pos) {
            return this._playerPetList.getFormatVOByPos(pos);
        };
        /**上阵武将最大等级 */
        ModelPet.prototype.getFormatUpMaxLevelVOByPos = function (pos) {
            var num = 0;
            for (var i = 0; i < this.formatUpVOList.length; i++) {
                if (this.formatUpVOList[i].refId != "13000" && this.formatUpVOList[i].position != pos) {
                    if (this.formatUpVOList[i].lv >= num) {
                        num = this.formatUpVOList[i].lv;
                    }
                }
            }
            return num;
        };
        Object.defineProperty(ModelPet.prototype, "formatUpVOList", {
            /**上阵列表 */
            get: function () {
                return this._playerPetList.formats;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "hashformatUpVOList6Star", {
            get: function () {
                for (var i = 0; i < this.formatUpVOList.length; i++) {
                    if (this.formatUpVOList[i].star >= 6)
                        return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "formatUpVORefIdList", {
            /**上阵列表武将资源id */
            get: function () {
                var petVo = this._playerPetList.formats;
                var strArr = [];
                for (var i = 0; i < petVo.length; i++) {
                    if (petVo[i])
                        strArr.push(petVo[i].refId);
                }
                return strArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "hashRedPet", {
            /**上阵列表有红色将 */
            get: function () {
                for (var i = 0; i < this.formatUpVOList.length; i++) {
                    if (this.formatUpVOList[i].star >= 5) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "formatDownVOList", {
            /**下阵列表 */
            get: function () {
                return this._playerPetList.downList;
            },
            enumerable: true,
            configurable: true
        });
        /**下阵列表 */
        ModelPet.prototype.getFormatDownVOListByQuality = function (q) {
            var data = this.formatDownVOList;
            var data1 = [];
            for (var i = 0; i < data.length; i++) {
                if (!data[i].isGongMing && !data[i].isLock && data[i].template.quality == q) {
                    data1.push(data[i]);
                }
            }
            return data1;
        };
        Object.defineProperty(ModelPet.prototype, "allPetVOList", {
            /**所有武将列表 */
            get: function () {
                return this.formatUpVOList.concat(this.formatDownVOList);
            },
            enumerable: true,
            configurable: true
        });
        /**从所有列表通过武将唯一标识获取VO */
        ModelPet.prototype.getAllPetVOByUid = function (uid) {
            for (var _i = 0, _a = this.allPetVOList; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo.uid == uid) {
                    return vo;
                }
            }
            return null;
        };
        /**从所有列表通过武将配置id获取VO */
        ModelPet.prototype.getAllPetVOByTempId = function (id) {
            for (var _i = 0, _a = this.allPetVOList; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo.template.id == id) {
                    return vo;
                }
            }
            return null;
        };
        /**从所有列表通过武将配置id获取VO */
        ModelPet.prototype.getAllPetArrVOByTempId = function (id) {
            var petArr = [];
            for (var _i = 0, _a = this.allPetVOList; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo.template.id == id && vo.state == 0) {
                    petArr.push(vo);
                }
            }
            return petArr;
        };
        /**根据类型位置获取武将列表 */
        ModelPet.prototype.getPetVOListByType = function (pos) {
            var petList = [];
            var voList = this.formatDownVOList;
            for (var i = 0; i < voList.length; i++) {
                if (pos < 3 && voList[i].fightType == 1) {
                    petList.push(this.formatDownVOList[i]);
                }
                else {
                    if (voList[i].fightType == 2)
                        petList.push(this.formatDownVOList[i]);
                }
            }
            return petList;
        };
        /**获取位置的状态 */
        ModelPet.prototype.isPosUnLock = function (pos) {
            return this._lockList[pos] == 0 ? true : false;
        };
        /**该位置是否含有武将 */
        ModelPet.prototype.hasPetPos = function (pos) {
            return this.getFormatUpVOByPos(pos) != null;
        };
        ModelPet.prototype.checkHaveTuiJianTeam = function () {
            var count = 0;
            for (var i = 1; i <= 4; i++) {
                var vo = GameModels.pet.getFormatUpVOByPos(i);
                if (vo && vo.quality < 6) {
                    count++;
                }
            }
            return count > 0;
        };
        ModelPet.prototype.hashCanLvRebirth = function () {
            var petArr = this._playerPetList.downList;
            ;
            for (var _i = 0, petArr_1 = petArr; _i < petArr_1.length; _i++) {
                var pet = petArr_1[_i];
                if (pet.lv > 1 && pet.isGongMing != 1) {
                    return true;
                }
            }
            return false;
        };
        ModelPet.prototype.getCampJiBanSkillId = function (arr) {
            var count = arr.length;
            if (count < 3)
                return null;
            if (count < 5)
                count = 3;
            var tempJiBan = null;
            var petTmpArr = [];
            var campTmp = Templates.getList(templates.Map.CAMPJIBAN);
            var starArr = [];
            var campArr = {};
            campArr[0] = 0;
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var pet = arr_1[_i];
                var petStar = 0;
                var camp = 0;
                if (pet instanceof vo.GamePetVO) {
                    petStar = pet.star;
                    camp = pet.template.country;
                }
                else {
                    var petTmp = Templates.getTemplateById(templates.Map.GENERAL, pet);
                    petStar = this.isHashFourSkill(petTmp.id) ? 10 : 9; //有四技能10星，反之9星
                    camp = petTmp.country;
                }
                starArr.push(petStar);
                if (!campArr[camp]) {
                    campArr[camp] = 1;
                }
                else {
                    campArr[camp]++;
                }
            }
            starArr.sort(function (a, b) {
                return a - b;
            });
            for (var _a = 0, campTmp_1 = campTmp; _a < campTmp_1.length; _a++) {
                var tmp = campTmp_1[_a];
                if (starArr.length >= tmp.generalNum1 && starArr[0] >= tmp.needStar) {
                    if (campArr[tmp.camp] >= tmp.generalNum2) {
                        tempJiBan = tmp;
                    }
                }
            }
            return tempJiBan;
        };
        /**
         * 请求武将上位
         */
        ModelPet.prototype.petHost = function (petid, pos, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_DressPet);
            msg.petId = petid;
            msg.petRoomPos = pos;
            this.request(n.MessageMap.C2G_PET_DRESSPET, msg, utils.Handler.create(this, function (data) {
                if (data.Result == "1") {
                    GameModels.pet.upformat(data.petRoom);
                    GameModels.equip.clearNewEquipList(data.petRoom.PosId);
                    complete.run();
                }
                this.updataPosRedPoint();
                GameModels.equip.updataEqiupRedPoint();
            }));
        };
        /**
         * 请求武将分解
         */
        ModelPet.prototype.petResovle = function (petid, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_Recover);
            msg.PetList = petid;
            this.request(n.MessageMap.C2G_PET_RECOVER, msg, utils.Handler.create(this, function (data) {
                if (complete) {
                    complete.runWith(data);
                }
                this.updataPosRedPoint();
                GameModels.equip.updataEqiupRedPoint();
            }));
        };
        /**
         * 请求武将列表
         */
        ModelPet.prototype.getPetList = function (index, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Pet_GetPetList);
            msg.PageId = index;
            this.request(n.MessageMap.C2G_PET_GETPETLIST, msg, utils.Handler.create(this, function (data) {
                if (data) {
                    _this._allPetCount = data.TotalPetCount;
                    _this._maxPetCount = data.MaxPetSize;
                    _this._playerPetList.initPetList(data.PetList);
                    var maxPage = Math.floor(_this._allPetCount / 100);
                    if (maxPage > data.CurPageId) {
                        _this.getPetList(data.CurPageId + 1, null);
                    }
                    if (complete) {
                        complete.runWith(data);
                    }
                }
            }));
        };
        /**
         * 请求购买府邸格子
         */
        ModelPet.prototype.petBuyRoom = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Pet_BuyPetPos);
            this.request(n.MessageMap.C2G_PET_BUYPETPOS, msg, utils.Handler.create(this, function (data) {
                if (data) {
                    _this._maxPetCount = data.MaxPetSize;
                    if (complete) {
                        complete.runWith(data);
                    }
                }
            }));
        };
        Object.defineProperty(ModelPet.prototype, "allPetCount", {
            get: function () {
                return this._allPetCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "maxPetCount", {
            get: function () {
                return this._maxPetCount;
            },
            enumerable: true,
            configurable: true
        });
        ModelPet.prototype.checkPetSmelting = function () {
            return this._maxPetCount - this._allPetCount <= 0;
        };
        ModelPet.prototype.onPropertyRemind = function (caller, method) {
            this.offPropertyRemind();
            this._propertyRemindHandler = utils.Handler.create(caller, method, null, false);
        };
        ModelPet.prototype.offPropertyRemind = function () {
            if (this._propertyRemindHandler) {
                this._propertyRemindHandler.recover();
                this._propertyRemindHandler = null;
            }
        };
        ModelPet.prototype.updataPosRedPoint = function () {
            this.updataPosEquipRedPoint();
            GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
            GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
            GameModels.state.updateState(GameRedState.TUJIAN_LV_ZHONGSEHNG);
            GameModels.state.updateState(GameRedState.MAIN_JUYI);
        };
        ModelPet.prototype.updataPosEquipRedPoint = function () {
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS1);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS2);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS3);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS4);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS5);
        };
        Object.defineProperty(ModelPet.prototype, "isHashMerged", {
            /**是否存在一个已经在合体 */
            get: function () {
                for (var i = 0; i < 4; i++) {
                    var petVO = this.getFormatUpVOByPos(i + 1);
                    if (!!petVO && petVO.template.job == 5 && !petVO.stateDead && petVO.isMerged) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "hashJinZhanPet", {
            /**是否存在近战武将 */
            get: function () {
                var len = this.formatDownVOList;
                for (var i = 0; i < len.length; i++) {
                    if (len[i].fightType == 1)
                        return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "hashYuanChengPet", {
            /**是否存在远程武将 */
            get: function () {
                var len = this.formatDownVOList;
                for (var i = 0; i < len.length; i++) {
                    if (len[i].fightType == 2)
                        return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        /**是否存在比位置上星级更高的武将 */
        ModelPet.prototype.isHashHigherPetChange = function (petVo) {
            var len = this.formatDownVOList;
            for (var i = 0; i < len.length; i++) {
                if (!this._isFirstPetChange && petVo.fightType == len[i].fightType && len[i].star > petVo.star && this.formatUpVORefIdList.indexOf(len[i].refId) == -1 && len[i].isGongMing != 1) {
                    return true;
                }
            }
            return false;
        };
        /**根据品质星级从武将下阵列表中获得 */
        ModelPet.prototype.getPetListByQAndStar1 = function (star, isSelfId, country) {
            if (country === void 0) { country = 0; }
            var voArr = this.formatDownVOList;
            var itemArr = [];
            for (var i = 0; i < voArr.length; i++) {
                if (isSelfId == 0) {
                    if (country) {
                        if (voArr[i].star == star && voArr[i].template.country == country) {
                            itemArr.push(voArr[i]);
                        }
                    }
                    else {
                        if (voArr[i].star == star) {
                            itemArr.push(voArr[i]);
                        }
                    }
                }
                else {
                    var templ = Templates.getTemplateById(templates.Map.GENERAL, isSelfId);
                    if (templ.star == voArr[i].star && parseInt(voArr[i].refId) == isSelfId) {
                        itemArr.push(voArr[i]);
                    }
                }
            }
            return itemArr;
        };
        /**根据品质星级从武将下阵列表中获得 */
        ModelPet.prototype.getPetListByQAndStar = function (star, isSelfId, country) {
            if (country === void 0) { country = 0; }
            var voArr = this.formatDownVOList;
            var itemArr = [];
            for (var i = 0; i < voArr.length; i++) {
                if (isSelfId == 0) {
                    if (country) {
                        if (voArr[i].star == star && voArr[i].template.country == country && voArr[i].isGongMing != 1 && voArr[i].isLock != 1) {
                            itemArr.push(voArr[i]);
                        }
                    }
                    else {
                        if (voArr[i].star == star && voArr[i].isGongMing != 1 && voArr[i].isLock != 1) {
                            itemArr.push(voArr[i]);
                        }
                    }
                }
                else {
                    var templ = Templates.getTemplateById(templates.Map.GENERAL, isSelfId);
                    if (templ.star == voArr[i].star && parseInt(voArr[i].refId) == isSelfId && voArr[i].isGongMing != 1 && voArr[i].isLock != 1) {
                        itemArr.push(voArr[i]);
                    }
                }
            }
            return itemArr;
        };
        ModelPet.prototype.updataPetChange = function () {
            this.dispatchEventWith(ModelPet.PET_CHANGE);
        };
        ModelPet.prototype.getPetRestrain1 = function (petCorps, monsterCorps) {
        };
        /**0--没有克制1--克制，2--被克制 */
        ModelPet.prototype.getPetRestrain = function (petCorps, monsterCorps) {
            if (petCorps == monsterCorps) {
                return 0;
            }
            else {
                if (petCorps == 1) {
                    if (monsterCorps == 2) {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                }
                else if (petCorps == 2) {
                    if (monsterCorps == 3) {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                }
                else {
                    if (monsterCorps == 1) {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                }
            }
        };
        ModelPet.prototype.getPetStarBuyLv = function (lv) {
            var star = 0;
            for (var id in this._lvCorStarDate) {
                if (lv > this._lvCorStarDate[id]) {
                    star = parseInt(id);
                }
            }
            return star;
        };
        /**获取等级对应的星级 */
        ModelPet.prototype.initLvCorrespondingStar = function () {
            var temp = Templates.getList(templates.Map.GENERALBREAK);
            for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
                var tmp = temp_1[_i];
                if (!this._lvCorStarDate[tmp.star] && tmp.star != 13) {
                    this._lvCorStarDate[tmp.star] = tmp.needLV;
                }
            }
        };
        /**
         * 请求武将穿戴兵法
         */
        ModelPet.prototype.petDressBingFa = function (petid, pos, index, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_DressBingFa);
            msg.PetId = petid;
            msg.Pos = pos;
            msg.GridId = index;
            this.request(n.MessageMap.C2G_PET_DRESSBINGFA, msg, utils.Handler.create(this, function (data) {
                this.dispatchEventWith(ModelPet.BINGFA_CHANGE);
                this.updataPosRedPoint();
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        /**
         * 请求武将卸下兵法
         */
        ModelPet.prototype.petUnDressBingFa = function (petid, pos, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_UnDressBingFa);
            msg.PetId = petid;
            msg.Pos = pos;
            this.request(n.MessageMap.C2G_PET_UNDRESSBINGFA, msg, utils.Handler.create(this, function (data) {
                this.dispatchEventWith(ModelPet.BINGFA_CHANGE);
                this.updataPosRedPoint();
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        /**
         * 请求武将兵法重铸
         */
        ModelPet.prototype.petResetBingFa = function (petid, pos, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_ResetBingFa);
            msg.PetId = petid;
            msg.BingFaPos = pos;
            this.request(n.MessageMap.C2G_PET_RESETBINGFA, msg, utils.Handler.create(this, function (data) {
                if (data.TempBingFa.BingFaProp.length <= 0 && data.TempBingFa.BingFaSkillList.length <= 0) {
                    this._hashTempBingFa = false;
                }
                else {
                    this._hashTempBingFa = true;
                }
                this._temBingFa = vo.fromPool(vo.GamePetBingFaVO, data.TempBingFa);
                this.updataPosRedPoint();
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        Object.defineProperty(ModelPet.prototype, "hashTempBingFa", {
            get: function () {
                return this._hashTempBingFa;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "temBingFa", {
            get: function () {
                return this._temBingFa;
            },
            enumerable: true,
            configurable: true
        });
        ModelPet.prototype.petGetBingFaResetInfo = function (petid, pos, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_GetBingFaResetInfo);
            msg.PetId = petid;
            msg.BingFaPos = pos;
            this.request(n.MessageMap.C2G_PET_GETBINGFARESETINFO, msg, utils.Handler.create(this, function (data) {
                //this.dispatchEventWith(ModelPet.BINGFA_CHANGE);
                if (data.TempBingFa.BingFaProp.length <= 0 && data.TempBingFa.BingFaSkillList.length <= 0) {
                    this._hashTempBingFa = false;
                }
                else {
                    this._hashTempBingFa = true;
                }
                this._temBingFa = vo.fromPool(vo.GamePetBingFaVO, data.TempBingFa);
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        /**
         * 保存兵法重铸信息
         */
        ModelPet.prototype.petSaveBingFa = function (petid, pos, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_SaveBingFa);
            msg.PetId = petid;
            msg.BingFaPos = pos;
            msg.IsSave = 1;
            this.request(n.MessageMap.C2G_PET_SAVEBINGFA, msg, utils.Handler.create(this, function (data) {
                this._hashTempBingFa = false;
                vo.toPool(this._temBingFa);
                this.dispatchEventWith(ModelPet.BINGFA_CHANGE);
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        Object.defineProperty(ModelPet.prototype, "currformationType", {
            get: function () {
                return this._currformationType;
            },
            set: function (v) {
                this._currformationType = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "formationData", {
            get: function () {
                return this._formationData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "hashFormationData", {
            get: function () {
                for (var i = 0; i < this._formationData.length; i++) {
                    if (this._formationData[i]) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        ModelPet.prototype.petGetFormationData = function (type, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_GetFormationData);
            msg.Type = type;
            this.request(n.MessageMap.C2G_PET_GETFORMATIONDATA, msg, utils.Handler.create(this, function (data) {
                this._currformationType = data.Type;
                this._formationData = data.FormationData.concat();
                this._formationDataLinShi = this._formationData;
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        ModelPet.prototype.petSetFormationData = function (type, str, complete) {
            logger.log("保存阵型。。。。。。", str);
            var msg = n.MessagePool.from(n.C2G_Pet_SetFormationData);
            msg.Type = type;
            msg.FormationData = str;
            this.request(n.MessageMap.C2G_PET_SETFORMATIONDATA, msg, utils.Handler.create(this, function (data) {
                this._currformationType = data.Type;
                this._formationData = data.FormationData.concat();
                this._formationDataLinShi = this._formationData;
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        Object.defineProperty(ModelPet.prototype, "formationPetRefIdDataLinShi", {
            get: function () {
                var tempPetRefId = [];
                for (var i = 0; i < this._formationDataLinShi.length; i++) {
                    if (this._formationDataLinShi[i]) {
                        var vo = GameModels.pet.getAllPetVOByUid(this._formationDataLinShi[i]);
                        if (vo)
                            tempPetRefId.push(vo.refId);
                    }
                }
                return tempPetRefId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "formationDataLinShi", {
            get: function () {
                return this._formationDataLinShi;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "hashFormationLinShiData1", {
            get: function () {
                for (var i = 0; i < this._formationDataLinShi.length; i++) {
                    if (this._formationDataLinShi[i] && GameModels.legion.hashSelfDataHp(this._formationDataLinShi[i]) != 0) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "hashFormationLinShiData", {
            get: function () {
                for (var i = 0; i < this._formationDataLinShi.length; i++) {
                    if (this._formationDataLinShi[i]) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        ModelPet.prototype.petSetFormationDataLinShi = function (str, complete) {
            logger.log("保存临时阵型。。。。。。", str);
            this._formationDataLinShi = str;
            if (complete) {
                complete.runWith();
            }
        };
        /**加锁 */
        ModelPet.prototype.petSetLockDate = function (petUid, state, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_SetLock);
            msg.PetId = petUid;
            msg.Status = state;
            this.request(n.MessageMap.C2G_PET_SETLOCK, msg, utils.Handler.create(this, function (data) {
                var content = data.Status == 0 ? Language.J_JIESCG : Language.J_JSCG;
                mg.alertManager.tip(content);
                this.dispatchEventWith(ModelPet.PET_SETLOCK);
                GameModels.state.updateState(GameRedState.TUJIAN_LV_ZHONGSEHNG);
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        /**有四技能 */
        ModelPet.prototype.isHashFourSkill = function (refId) {
            var temPet = Templates.getTemplateById(templates.Map.GENERAL, refId);
            if (temPet) {
                var skillArr = temPet.skill.split(";");
                return skillArr.length >= 4 && skillArr[skillArr.length - 1] != "-1";
            }
            return false;
        };
        /**武将回收反还材料数量 */
        ModelPet.prototype.getCaiLiaoCountByClearPet = function (lv) {
            var str = "";
            var templ = Templates.getList(templates.Map.GENERALLV);
            for (var i = 0; i < lv - 1; i++) {
                if (templ[i]) {
                    if (str == "") {
                        str = templ[i].consume;
                    }
                    else {
                        str = str + ";" + templ[i].consume;
                    }
                }
            }
            return utils.htmlUtil.computeAttribute(str);
        };
        ModelPet.prototype.getAllRedPet = function (index) {
            var temId = [];
            var tem = Templates.getList(templates.Map.GENERAL);
            for (var i = 0; i < tem.length; i++) {
                if (tem[i].type == 1300 && tem[i].id != 13000 && tem[i].star >= 5 && !GameModels.pet.isHashFourSkill(tem[i].id)) {
                    if (index == 0) {
                        temId.push(tem[i].id);
                    }
                    else {
                        if (tem[i].country == index) {
                            temId.push(tem[i].id);
                        }
                    }
                }
            }
            return temId;
        };
        Object.defineProperty(ModelPet.prototype, "currType", {
            get: function () {
                return this._currType;
            },
            set: function (v) {
                this._currType = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "headSelfArr", {
            get: function () {
                return this._headSelfArr;
            },
            set: function (v) {
                this._headSelfArr = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelPet.prototype.getformationLadderDataByType = function (type) {
            if (type == 0) {
                return this._formationLadderData;
            }
            else if (type == 1) {
                return this._formationLadderData1;
            }
            return [];
        };
        ModelPet.prototype.petGetFormationLadderData = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Ladder2_GetPetFormation);
            msg.Type = type;
            this.request(n.MessageMap.C2G_LADDER2_GETPETFORMATION, msg, utils.Handler.create(this, function (data) {
                if (data.Type == 0) {
                    _this._formationLadderData = data.PetIdList.concat();
                    _this._formationLadderDataLinShi = _this._formationLadderData;
                }
                if (data.Type == 1) {
                    _this._formationLadderData1 = data.PetIdList.concat();
                    _this._formationLadderDataLinShi = _this._formationLadderData1;
                }
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        ModelPet.prototype.petSetFormationLadderData = function (type, refIdArr, complete) {
            var _this = this;
            logger.log("保存演武阵型refIdArr。。。。。。", refIdArr);
            logger.log("保存演武阵型type。。。。。。", type);
            var msg = n.MessagePool.from(n.C2G_Ladder2_SetPetFormation);
            msg.Type = type;
            msg.PetIdList = refIdArr;
            this.request(n.MessageMap.C2G_LADDER2_SETPETFORMATION, msg, utils.Handler.create(this, function (data) {
                if (data.Type == 0) {
                    _this._formationLadderData = data.PetIdList.concat();
                    _this._formationLadderDataLinShi = _this._formationLadderData;
                }
                if (data.Type == 1) {
                    _this._formationLadderData1 = data.PetIdList.concat();
                    _this._formationLadderDataLinShi = _this._formationLadderData1;
                }
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        Object.defineProperty(ModelPet.prototype, "formationLadderDataLinShi", {
            get: function () {
                return this._formationLadderDataLinShi;
            },
            enumerable: true,
            configurable: true
        });
        ModelPet.prototype.petSetFormationLadderDataLinShi = function (str, complete) {
            logger.log("保存演武临时阵型。。。。。。", str);
            this._formationLadderDataLinShi = str;
            if (complete) {
                complete.runWith();
            }
        };
        /**根据玩法算阵营羁绊计 */
        ModelPet.prototype.getLegionSkillByGameType = function (type) {
            if (type === void 0) { type = 0; }
            if (type == TypeGame.LADDER_FIGHT1) {
                var num = this._formationLadderDataLinShi;
                var tempNum = [];
                for (var i = 0; i < num.length; i++) {
                    if (num[i])
                        tempNum.push(num[i]);
                }
                var temp = GameModels.pet.getCampJiBanSkillId(tempNum);
                return GameModels.pet.getCampJiBanSkillId(tempNum);
            }
            else if (type == TypeGame.KING_WAR || type == TypeGame.EXPEDITION || type == TypeGame.SHILITA_1 || type == TypeGame.SHILITA_2 || type == TypeGame.SHILITA_3) {
                var tempPetVo = [];
                for (var i = 0; i < this._formationDataLinShi.length; i++) {
                    if (this._formationDataLinShi[i]) {
                        var vo = GameModels.pet.getAllPetVOByUid(this._formationDataLinShi[i]);
                        if (vo)
                            tempPetVo.push(vo);
                    }
                }
                return GameModels.pet.getCampJiBanSkillId(tempPetVo);
            }
            else if (type == TypeGame.CHAPTER_BOSS) {
                var tempPetVo = [];
                if (this._formationDataLinShi.length > 0) {
                    for (var i = 0; i < this._formationDataLinShi.length; i++) {
                        if (this._formationDataLinShi[i]) {
                            var vo = GameModels.pet.getAllPetVOByUid(this._formationDataLinShi[i]);
                            if (vo)
                                tempPetVo.push(vo);
                        }
                    }
                }
                else {
                    var petVo = GameModels.pet.formatUpVOList;
                    for (var i = 0; i < petVo.length; i++) {
                        if (petVo[i]) {
                            tempPetVo.push(petVo[i]);
                        }
                    }
                }
                return GameModels.pet.getCampJiBanSkillId(tempPetVo);
            }
            else {
                var tempPetVo = [];
                var petVo = GameModels.pet.formatUpVOList;
                for (var i = 0; i < petVo.length; i++) {
                    if (petVo[i]) {
                        tempPetVo.push(petVo[i]);
                    }
                }
                return GameModels.pet.getCampJiBanSkillId(tempPetVo);
            }
        };
        Object.defineProperty(ModelPet.prototype, "formatUpListRedCount", {
            get: function () {
                var count = 0;
                var petVo = GameModels.pet.formatUpVOList;
                for (var i = 0; i < petVo.length; i++) {
                    if (petVo[i].star >= 5) {
                        count++;
                    }
                }
                return count;
            },
            enumerable: true,
            configurable: true
        });
        /**共鸣-------------------------------------- */
        ModelPet.prototype.getQianPaiAndHouPaiPet = function () {
            var petForamte = this.formatUpVOList;
            var qianPai = [];
            var houPai = [];
            var petList = [];
            for (var _i = 0, petForamte_1 = petForamte; _i < petForamte_1.length; _i++) {
                var pet = petForamte_1[_i];
                if (pet.fightType == 1) {
                    if (pet.refId != "13000")
                        qianPai.push(pet);
                }
                else {
                    houPai.push(pet);
                }
            }
            qianPai.sort(function (a, b) {
                return a.fightValue - b.fightValue;
            });
            houPai.sort(function (a, b) {
                return a.fightValue - b.fightValue;
            });
            petList.push(qianPai[0], houPai[0]);
            return petList;
        };
        Object.defineProperty(ModelPet.prototype, "gongMingPetList", {
            get: function () {
                this._gongMingPetList = [];
                for (var i = 0; i < this.formatDownVOList.length; i++) {
                    if (this.formatDownVOList[i].isGongMing == 1) {
                        this._gongMingPetList.push(this.formatDownVOList[i]);
                    }
                }
                return this._gongMingPetList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "gongMingCDList", {
            get: function () {
                return this._gongMingCDList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "gongmingMaxPos", {
            get: function () {
                return this._gongMingMaxPos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "canSelectedCount", {
            get: function () {
                return this._gongMingMaxPos - this._gongMingPetList.length;
            },
            enumerable: true,
            configurable: true
        });
        ModelPet.prototype.petGetGongMingInfo = function (complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_GetGongMingInfo);
            this.request(n.MessageMap.C2G_PET_GETGONGMINGINFO, msg, utils.Handler.create(this, function (data) {
                if (data)
                    this._gongMingCDList = data.GongMingPosCDList.concat();
                if (data)
                    this._gongMingMaxPos = data.MaxGongMingPos;
                if (complete) {
                    complete.runWith(data);
                }
                GameModels.state.updateState(GameRedState.MAIN_JUYI);
                GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_LV_ZHONGSEHNG);
            }));
        };
        ModelPet.prototype.setGongMing = function (petIDList, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Pet_SetGongMing);
            msg.PetIDList = petIDList;
            this.request(n.MessageMap.C2G_PET_SETGONGMING, msg, utils.Handler.create(this, function (data) {
                _this._gongMingCDList = data.GongMingPosCDList.concat();
                if (complete) {
                    complete.runWith(data);
                }
                GameModels.state.updateState(GameRedState.MAIN_JUYI);
                GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_LV_ZHONGSEHNG);
                _this.dispatchEventWith(mo.ModelPet.UPDATA_PETGONGMING);
            }));
        };
        ModelPet.prototype.cleanGongMingCd = function (index, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_CleanGongMingCD);
            msg.Idx = index;
            this.request(n.MessageMap.C2G_PET_CLEANGONGMINGCD, msg, utils.Handler.create(this, function (data) {
                if (data)
                    this._gongMingCDList = data.GongMingPosCDList.concat();
                if (complete) {
                    complete.runWith(data);
                }
                GameModels.state.updateState(GameRedState.MAIN_JUYI);
                GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
                GameModels.state.updateState(GameRedState.TUJIAN_QUCIK_SHENGXING);
                this.dispatchEventWith(mo.ModelPet.UPDATA_PETGONGMING);
            }));
        };
        /**下阵列表里是否有未共鸣的稀有武将 */
        ModelPet.prototype.checkDownListHashFourSKillPet = function () {
            var petRefIdArr = [];
            for (var _i = 0, _a = this.formatDownVOList; _i < _a.length; _i++) {
                var petVo = _a[_i];
                if (petVo.isGongMing == 1) {
                    petRefIdArr.push(petVo.refId);
                }
            }
            for (var _b = 0, _c = this.formatDownVOList; _b < _c.length; _b++) {
                var pet = _c[_b];
                if (pet.isGongMing != 1 && pet.isHashFourSkill && petRefIdArr.indexOf(pet.refId) == -1) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperty(ModelPet.prototype, "isOpenGongMingView", {
            /**是否打开共鸣界面 */
            get: function () {
                return this._isOpenGongMingView;
            },
            set: function (value) {
                this._isOpenGongMingView = value;
                GameModels.state.updateState(GameRedState.MAIN_JUYI);
            },
            enumerable: true,
            configurable: true
        });
        ModelPet.prototype.checkGongMingRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.gongming))
                return false;
            var petList = this.gongMingPetList;
            var cdList = this.gongMingCDList;
            var maxPos = this.gongmingMaxPos;
            var hashAdd = false;
            var cdListLength = cdList.length;
            for (var i = 0; i < 20; i++) {
                if (!petList[i]) {
                    if (cdListLength > 0) {
                        if (cdList.length < maxPos - i) {
                            if (!hashAdd) {
                                hashAdd = true;
                                break;
                            }
                        }
                    }
                    else {
                        if (i < maxPos) {
                            if (!hashAdd) {
                                hashAdd = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (this.checkDownListHashFourSKillPet() && hashAdd && !this._isOpenGongMingView) {
                return true;
            }
            return false;
        };
        Object.defineProperty(ModelPet.prototype, "zhuZhanFight", {
            /********************助战（羁绊） */
            /**助战战力 */
            get: function () {
                return this._zhuZhanFight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "zhuZhanPetList", {
            /**助战武将列表*/
            get: function () {
                return this._zhuZhanPetList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPet.prototype, "zhuZhanTempList", {
            /**助战配置 */
            get: function () {
                return this._zhuZhanTempList;
            },
            enumerable: true,
            configurable: true
        });
        ModelPet.prototype.initZhuZhanTempList = function () {
            this._zhuZhanTempArr = Templates.getList(templates.Map.ZHUZHAN);
        };
        /**此武将是否在已激活的配置里 */
        ModelPet.prototype.getPetOfZhuZhanTempList = function (petId) {
            for (var _i = 0, _a = this._zhuZhanTempList; _i < _a.length; _i++) {
                var id = _a[_i];
                if (id) {
                    var temp = Templates.getTemplateById(templates.Map.ZHUZHAN, id);
                    if (!temp)
                        return false;
                    var petArr = temp.setting.split(";");
                    if (petArr.indexOf(petId) != -1) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**此羁绊是否已激活 */
        ModelPet.prototype.getTempIdOfZhuZhanTempList = function (id) {
            if (this._zhuZhanTempList.indexOf(id) != -1) {
                return true;
            }
            return false;
        };
        /**武将是否放在阵上了 */
        ModelPet.prototype.getPetOfZhuZhan = function (petid) {
            if (this._zhuZhanPetList.indexOf(petid) != -1) {
                return true;
            }
            return false;
        };
        ModelPet.prototype.getAllTempBuyPetList = function (petrefId) {
            var list = [];
            var tempList = [];
            for (var _i = 0, _a = this._zhuZhanPetList; _i < _a.length; _i++) {
                var id = _a[_i];
                if (id) {
                    var zhuzhanArr = this.getTempBuyPetId(id, petrefId);
                    for (var _b = 0, zhuzhanArr_1 = zhuzhanArr; _b < zhuzhanArr_1.length; _b++) {
                        var zhuzhan = zhuzhanArr_1[_b];
                        if (tempList.indexOf(zhuzhan) == -1) {
                            tempList.push(zhuzhan);
                        }
                    }
                }
            }
            var anyArr = [];
            for (var _c = 0, tempList_1 = tempList; _c < tempList_1.length; _c++) {
                var temp = tempList_1[_c];
                var obj = { tmp: null, count: 0 };
                obj.tmp = temp;
                var petList = temp.setting.split(";");
                for (var _d = 0, petList_1 = petList; _d < petList_1.length; _d++) {
                    var pet = petList_1[_d];
                    if (this._zhuZhanPetList.indexOf(parseInt(pet)) != -1) {
                        obj.count++;
                    }
                }
                anyArr.push(obj);
            }
            anyArr.sort(function (a, b) {
                return b.count - a.count;
            });
            for (var _e = 0, anyArr_1 = anyArr; _e < anyArr_1.length; _e++) {
                var a = anyArr_1[_e];
                list.push(a.tmp);
            }
            return list;
        };
        ModelPet.prototype.getTempBuyPetId = function (petId, petRefId) {
            var tempList = [];
            for (var _i = 0, _a = this._zhuZhanTempArr; _i < _a.length; _i++) {
                var temp = _a[_i];
                if (temp) {
                    var petArr = temp.setting.split(";");
                    if (petRefId == "13000") {
                        if (petArr.indexOf(petId.toString()) != -1) {
                            tempList.push(temp);
                        }
                    }
                    else {
                        if (petArr.indexOf("13000") != -1) {
                            continue;
                        }
                        if (petArr.indexOf(petId.toString()) != -1) {
                            tempList.push(temp);
                        }
                    }
                }
            }
            return tempList;
        };
        ModelPet.prototype.getZhuZhanTempListBuyPetId = function (petId) {
            var tempList = [];
            for (var _i = 0, _a = this._zhuZhanTempArr; _i < _a.length; _i++) {
                var temp = _a[_i];
                if (temp) {
                    var petArr = temp.setting.split(";");
                    var hashRole = false;
                    var hashPet = false;
                    for (var _b = 0, petArr_2 = petArr; _b < petArr_2.length; _b++) {
                        var pet = petArr_2[_b];
                        if (pet == petId)
                            hashPet = true;
                        if (pet == "13000" && petId != "13000")
                            hashRole = true;
                    }
                    if (!hashRole && hashPet) {
                        tempList.push(temp);
                    }
                }
            }
            return tempList;
        };
        /**两个武将是否在同一条羁绊里 */
        ModelPet.prototype.getZhuZhanTempOfTwoPet = function (petId1, petId2) {
            for (var _i = 0, _a = this._zhuZhanTempArr; _i < _a.length; _i++) {
                var temp = _a[_i];
                if (temp) {
                    var petArr = temp.setting.split(";");
                    var hashPet1 = false;
                    var hashPet2 = false;
                    for (var _b = 0, petArr_3 = petArr; _b < petArr_3.length; _b++) {
                        var pet = petArr_3[_b];
                        if (pet == petId1)
                            hashPet1 = true;
                        if (pet == petId2)
                            hashPet2 = true;
                    }
                    if (hashPet1 && hashPet2 && this._zhuZhanTempList.indexOf(temp.id) != -1) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**获得指定武将的助战信息 */
        ModelPet.prototype.petGetZhuZhanBuyPetId = function (petId, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_GetPetZhuZhan);
            msg.PetId = petId;
            this.request(n.MessageMap.C2G_PET_GETPETZHUZHAN, msg, utils.Handler.create(this, function (data) {
                this._zhuZhanFight = data.FightPower;
                this._zhuZhanPetList = data.PetRefList.concat();
                this._zhuZhanTempList = data.ZhuZhanRefList.concat();
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        /**设置指定武将的助战信息 */
        ModelPet.prototype.petSetZhuZhanBuyPetId = function (petId, petIdArr, complete) {
            var msg = n.MessagePool.from(n.C2G_Pet_SetPetZhuZhan);
            msg.PetId = petId;
            msg.PetRefList = petIdArr;
            this.request(n.MessageMap.C2G_PET_SETPETZHUZHAN, msg, utils.Handler.create(this, function (data) {
                this._zhuZhanFight = data.FightPower;
                this._zhuZhanPetList = data.PetRefList.concat();
                this._zhuZhanTempList = data.ZhuZhanRefList.concat();
                this.dispatchEventWith(mo.ModelPet.UPDATA_ZHUZHANCHANGE);
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        Object.defineProperty(ModelPet.prototype, "isOpenZhuZhanView", {
            get: function () {
                return this._isOpenZhuZhanView;
            },
            set: function (value) {
                this._isOpenZhuZhanView = value;
                this.updataPosEquipRedPoint();
                this.dispatchEventWith(mo.ModelPet.UPDATA_ZHUZHANREDPOINT);
            },
            enumerable: true,
            configurable: true
        });
        /**武将上列表阵变化 */
        ModelPet.FORMAT_CHANGE = "FORMAT_CHANGE";
        /**战斗力变化 */
        ModelPet.PROPERTY_CHANGE = "PROPERTY_CHANGE";
        /**武将等级变化 */
        ModelPet.PET_CHANGE_LEVEL = "PET_CHANGE_LEVEL";
        /**武将解锁变化 */
        ModelPet.PET_CHANGE_LOCK = "PET_CHANGE_LOCK";
        /**武将突破 */
        ModelPet.PET_TUPO = "PET_TUPO";
        /**兵法变化 */
        ModelPet.BINGFA_CHANGE = "BINGFA_CHANGE";
        /**切换武将 */
        ModelPet.PET_CHANGE = "PET_CHANGE";
        /**武将解锁变化 */
        ModelPet.PET_SETLOCK = "PET_SETLOCK";
        ModelPet.UPDATA_PETCHANGE_AND_PETJIBAN = "UPDATA_PETCHANGE_AND_PETJIBAN";
        ModelPet.UPDATA_PETGONGMING = "UPDATA_PETGONGMING";
        ModelPet.UPDATA_ZHUZHANCHANGE = "UPDATA_ZHUZHANCHANGE";
        ModelPet.UPDATA_ZHUZHANREDPOINT = "UPDATA_ZHUZHANREDPOINT";
        return ModelPet;
    }(mo.ModelBase));
    mo.ModelPet = ModelPet;
    __reflect(ModelPet.prototype, "mo.ModelPet");
})(mo || (mo = {}));
