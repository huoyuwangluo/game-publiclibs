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
    var ModelKingWar = (function (_super) {
        __extends(ModelKingWar, _super);
        function ModelKingWar() {
            var _this = _super.call(this) || this;
            _this._fightCityId = 0;
            _this._fightState = 0;
            _this._cityDetailCityId = 0;
            _this._cityDetailCountry = 0;
            _this._cityDetailArmyVOArr = [];
            /**进攻城池 */
            _this._result = 0;
            _this._strArr = "";
            return _this;
        }
        ModelKingWar.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._hasHoldReward = false;
            this._kingWarCityVOArr = [];
            this._kingWarArmyVOArr = [];
            this._friendCountryList = [];
            this._recordList = [];
            this._recordType = 0;
            this._attTargetCityId = 0;
            this._defTargetCityId = 0;
            this.requestMapInfoInfo();
            n.net.onRoute(n.MessageMap.NOTIFYCITYSIMPLEDATA, utils.Handler.create(this, this.notifyCityChange, null, false));
            n.net.onRoute(n.MessageMap.NOTIFYKINGWARARMYDATA, utils.Handler.create(this, this.notifyArmyChange, null, false));
            n.net.onRoute(n.MessageMap.NOTIFYALLIANNCESTATUS, utils.Handler.create(this, this.notifyFriendCountryList, null, false));
            n.net.onRoute(n.MessageMap.NOTIFYFIRSTTARGETCHANGE, utils.Handler.create(this, this.notifyFirstTarget, null, false));
        };
        Object.defineProperty(ModelKingWar.prototype, "fightState", {
            get: function () {
                return this._fightState;
            },
            set: function (v) {
                this._fightState = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelKingWar.prototype, "fightCityId", {
            get: function () {
                return this._fightCityId;
            },
            set: function (v) {
                this._fightCityId = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelKingWar.prototype.notifyFriendCountryList = function (data) {
            this._friendCountryList = data.FriendCountryList.concat();
        };
        ModelKingWar.prototype.notifyFirstTarget = function (data) {
            this._attTargetCityId = data.FirstAttackCityId;
            this._defTargetCityId = data.FirstDefendCityId;
            this.dispatchEventWith(mo.ModelKingWar.SETTARGET_CHANGE);
        };
        ModelKingWar.prototype.notifyCityChange = function (data) {
            for (var i = 0; i < this._kingWarCityVOArr.length; i++) {
                if (this._kingWarCityVOArr[i].cityId == data.CityData.CityId) {
                    this._kingWarCityVOArr[i].country = data.CityData.Country;
                    this._kingWarCityVOArr[i].seizeRewardState = data.CityData.SeizeRewardStatus;
                    this.dispatchEventData();
                    GameModels.state.updateState(GameRedState.KING_WAR);
                    break;
                }
            }
        };
        ModelKingWar.prototype.dispatchEventData = function () {
            this.dispatchEventWith(mo.ModelKingWar.CITY_CHANGE);
        };
        ModelKingWar.prototype.notifyArmyChange = function (data) {
            for (var i = 0; i < this._kingWarArmyVOArr.length; i++) {
                if (this._kingWarArmyVOArr[i].armyId == data.ArmyInfo.ArmyId) {
                    this._kingWarArmyVOArr[i].teamId = data.ArmyInfo.TeamId;
                    this._kingWarArmyVOArr[i].tameBingLi = data.ArmyInfo.TameBingLi;
                    this._kingWarArmyVOArr[i].isFight = data.ArmyInfo.IsFight;
                    this._kingWarArmyVOArr[i].defendCityId = data.ArmyInfo.DefendCityId;
                    this._kingWarArmyVOArr[i].formationType = data.ArmyInfo.FormationType;
                    this._kingWarArmyVOArr[i].setKingWarPetVOArr1(data.ArmyInfo.PetList);
                    this.dispatchEventWith(mo.ModelKingWar.ARMY_CHANGE);
                    break;
                }
            }
        };
        ModelKingWar.prototype.updataCity = function (data) {
            this._kingWarCityVOArr = [];
            for (var i = 0; i < data.length; i++) {
                var tempVo = vo.fromPool(vo.KingWarCityVO, data[i]);
                this._kingWarCityVOArr.push(tempVo);
            }
            GameModels.state.updateState(GameRedState.KING_WAR);
        };
        ModelKingWar.prototype.updataArmy = function (data) {
            this._kingWarArmyVOArr = [];
            for (var i = 0; i < data.length; i++) {
                var tempVo = vo.fromPool(vo.KingWarArmyVO, data[i]);
                this._kingWarArmyVOArr.push(tempVo);
            }
        };
        Object.defineProperty(ModelKingWar.prototype, "kingWarCityVOArr", {
            /**城池信息 */
            get: function () {
                return this._kingWarCityVOArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelKingWar.prototype, "kingWarArmyVOArr", {
            /**编队信息 */
            get: function () {
                return this._kingWarArmyVOArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelKingWar.prototype, "hashTongmeng", {
            get: function () {
                return this._friendCountryList.length >= 2;
            },
            enumerable: true,
            configurable: true
        });
        ModelKingWar.prototype.getTongmengByIndex = function (index) {
            return this._friendCountryList[index];
        };
        Object.defineProperty(ModelKingWar.prototype, "tongmengCounty", {
            /**同盟方 */
            get: function () {
                if (this._friendCountryList.length <= 0)
                    return 0;
                if (this._friendCountryList.indexOf(parseInt(GameModels.user.player.legionId)) != -1) {
                    for (var i = 0; i < this._friendCountryList.length; i++) {
                        if (this._friendCountryList[i] != parseInt(GameModels.user.player.legionId)) {
                            return this._friendCountryList[i];
                        }
                    }
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ModelKingWar.prototype.getCountyCityCount = function (county) {
            var count = 0;
            for (var i = 0; i < this._kingWarCityVOArr.length; i++) {
                if (this._kingWarCityVOArr[i].country == county) {
                    count++;
                }
            }
            return count;
        };
        ModelKingWar.prototype.getCountyCityRewardCount = function (county) {
            var count = 0;
            for (var i = 0; i < this._kingWarCityVOArr.length; i++) {
                if (this._kingWarCityVOArr[i].country == county) {
                    count = count + parseInt(this._kingWarCityVOArr[i].cityTemp.holdTimeReward.split("_")[1]);
                }
            }
            return count;
        };
        ModelKingWar.prototype.getCityDataByID = function (id) {
            for (var i = 0; i < this._kingWarCityVOArr.length; i++) {
                if (this._kingWarCityVOArr[i].cityId == id) {
                    return this._kingWarCityVOArr[i];
                }
            }
            return null;
        };
        /**0--无目标1--进攻2--防守 */
        ModelKingWar.prototype.getCityHashTargetByID = function (id) {
            if (id == this._attTargetCityId) {
                return 1;
            }
            if (id == this._defTargetCityId) {
                return 2;
            }
            return 0;
        };
        Object.defineProperty(ModelKingWar.prototype, "hasHoldReward", {
            /**是否有占领累计奖励可领 */
            get: function () {
                return this._hasHoldReward;
            },
            enumerable: true,
            configurable: true
        });
        /**获得相邻的城是否有被我方归属或者同盟方归属 */
        ModelKingWar.prototype.isGuiShu = function (cityIds) {
            var sArr = cityIds.split(";");
            for (var i = 0; i < sArr.length; i++) {
                if (this.isGuiShuAllCityByCityId(parseInt(sArr[i]))) {
                    return true;
                }
            }
            return false;
        };
        ModelKingWar.prototype.isGuiShuAllCityByCityId = function (cityId) {
            for (var i = 0; i < this._kingWarCityVOArr.length; i++) {
                if (this._kingWarCityVOArr[i].cityId == cityId) {
                    if (this.tongmengCounty) {
                        if (this._kingWarCityVOArr[i].country == parseInt(GameModels.user.player.legionId) || this._kingWarCityVOArr[i].country == this.tongmengCounty) {
                            return true;
                        }
                    }
                    else {
                        if (this._kingWarCityVOArr[i].country == parseInt(GameModels.user.player.legionId)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        /**城是否能打*/
        ModelKingWar.prototype.getCityIsCanAtt = function (cityId) {
            var cityVo = this.getCityDataByID(cityId);
            if (!cityVo)
                return false;
            if (this.isGuiShu(cityVo.cityTemp.adjoinCity)) {
                if (this.tongmengCounty) {
                    if (cityVo.country != parseInt(GameModels.user.player.legionId) && cityVo.country != this.tongmengCounty) {
                        return true;
                    }
                }
                else {
                    if (cityVo.country != parseInt(GameModels.user.player.legionId)) {
                        return true;
                    }
                }
            }
            return false;
        };
        Object.defineProperty(ModelKingWar.prototype, "cityState", {
            /**获得当前城的状态  0为无 1为进攻 2为驻守*/
            get: function () {
                var cityTemp = Templates.getTemplateById(templates.Map.KINGWARCITY, this._cityDetailCityId);
                if (!cityTemp)
                    return 0;
                var sttate = 0;
                if (this.cityDetailCountry) {
                    if (this.tongmengCounty) {
                        if (this.cityDetailCountry == parseInt(GameModels.user.player.legionId) || this.cityDetailCountry == this.tongmengCounty) {
                            sttate = 2;
                        }
                        else {
                            if (this.isGuiShu(cityTemp.adjoinCity)) {
                                sttate = 1;
                            }
                            else {
                                sttate = 0;
                            }
                        }
                    }
                    else {
                        if (this.cityDetailCountry == parseInt(GameModels.user.player.legionId)) {
                            sttate = 2;
                        }
                        else {
                            if (this.isGuiShu(cityTemp.adjoinCity)) {
                                sttate = 1;
                            }
                            else {
                                sttate = 0;
                            }
                        }
                    }
                }
                else {
                    if (this.isGuiShu(cityTemp.adjoinCity)) {
                        sttate = 1;
                    }
                    else {
                        sttate = 0;
                    }
                }
                return sttate;
            },
            enumerable: true,
            configurable: true
        });
        /**0--不在部队中1--武将在某个编辑部队中2--武将在某个编辑部队中且部队正在战斗中 */
        ModelKingWar.prototype.petHashKingWarArmy = function (pet) {
            for (var i = 0; i < this._kingWarArmyVOArr.length; i++) {
                var petArr = this._kingWarArmyVOArr[i].kingWarPetVOArr;
                if (petArr.length <= 0)
                    break;
                for (var _i = 0, petArr_1 = petArr; _i < petArr_1.length; _i++) {
                    var armyPet = petArr_1[_i];
                    if (armyPet.petId == pet.uid) {
                        if (this._kingWarArmyVOArr[i].isFight) {
                            return 2;
                        }
                        else {
                            return 1;
                        }
                    }
                }
            }
            return 0;
        };
        /**请求地图信息 */
        ModelKingWar.prototype.requestMapInfoInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_KingWar_GetMapInfo);
            this.request(n.MessageMap.C2G_KINGWAR_GETMAPINFO, msg, utils.Handler.create(this, function (data) {
                _this.updataCity(data.CityList);
                _this.updataArmy(data.ArmyList);
                _this._friendCountryList = data.FriendCountryList.concat();
                _this._hasHoldReward = data.HasHoldReward == 1;
                _this._attTargetCityId = data.FirstAttackCityId;
                _this._defTargetCityId = data.FirstDefendCityId;
                GameModels.state.updateState(GameRedState.KING_WAR);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**获取单个城池信息 */
        ModelKingWar.prototype.requestGetCityDetail = function (cityId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_KingWar_GetCityDetail);
            msg.CityId = cityId;
            this.request(n.MessageMap.C2G_KINGWAR_GETCITYDETAIL, msg, utils.Handler.create(this, function (data) {
                _this._cityDetailCityId = data.CityData.CityId;
                _this._cityDetailCountry = data.CityData.Country;
                _this._cityDetailArmyVOArr = [];
                for (var i = 0; i < data.CityData.ArmyList.length; i++) {
                    var tempVo = vo.fromPool(vo.KingWarArmyVO1, data.CityData.ArmyList[i]);
                    _this._cityDetailArmyVOArr.push(tempVo);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelKingWar.prototype, "cityDetailCityId", {
            get: function () {
                return this._cityDetailCityId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelKingWar.prototype, "cityDetailCountry", {
            get: function () {
                return this._cityDetailCountry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelKingWar.prototype, "cityDetailArmyVOArr", {
            get: function () {
                for (var i = this._cityDetailArmyVOArr.length - 1; i >= 0; i--) {
                    if (!this._cityDetailArmyVOArr[i].playerName && this._cityDetailArmyVOArr[i].count <= 0) {
                        this._cityDetailArmyVOArr.splice(i, 1);
                    }
                }
                return this._cityDetailArmyVOArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelKingWar.prototype, "cityHashPlayerArmy", {
            get: function () {
                for (var _i = 0, _a = this._cityDetailArmyVOArr; _i < _a.length; _i++) {
                    var army = _a[_i];
                    if (army.playerName) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelKingWar.prototype, "hashReward", {
            get: function () {
                for (var i = 0; i < this._kingWarCityVOArr.length; i++) {
                    if (this._cityDetailCityId == this._kingWarCityVOArr[i].cityId) {
                        return this._kingWarCityVOArr[i].seizeRewardState;
                    }
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelKingWar.prototype, "cityDetailArmyVOArrCount", {
            get: function () {
                var count = 0;
                for (var i = 0; i < this._cityDetailArmyVOArr.length; i++) {
                    count = count + this._cityDetailArmyVOArr[i].count;
                }
                return count;
            },
            enumerable: true,
            configurable: true
        });
        ModelKingWar.prototype.checkRedPoint = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.kingwar))
                return false;
            if (this._hasHoldReward)
                return true;
            for (var i = 0; i < this._kingWarCityVOArr.length; i++) {
                if (this._kingWarCityVOArr[i].cityTemp.type != 1 && this._kingWarCityVOArr[i].seizeRewardState) {
                    return true;
                }
            }
            return false;
        };
        /**驻守城池 */
        ModelKingWar.prototype.requestDefendCity = function (cityId, armyId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_KingWar_DefendCity);
            msg.CityId = cityId;
            msg.ArmyId = armyId;
            this.request(n.MessageMap.C2G_KINGWAR_DEFENDCITY, msg, utils.Handler.create(this, function (data) {
                for (var i = 0; i < _this._kingWarArmyVOArr.length; i++) {
                    if (_this._kingWarArmyVOArr[i].armyId == data.ArmyInfo.ArmyId) {
                        _this._kingWarArmyVOArr[i].defendCityId = data.ArmyInfo.DefendCityId;
                        break;
                    }
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelKingWar.prototype, "result", {
            get: function () {
                return this._result;
            },
            enumerable: true,
            configurable: true
        });
        ModelKingWar.prototype.sendHandler = function (cityId, armyId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_KingWar_AttackCity);
            msg.CityId = cityId;
            msg.ArmyId = armyId;
            this.request(n.MessageMap.C2G_KINGWAR_ATTACKCITY, msg, utils.Handler.create(this, function (data) {
                _this._result = data.Result;
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelKingWar.prototype, "strArr", {
            get: function () {
                return this._strArr;
            },
            enumerable: true,
            configurable: true
        });
        /**领取中立攻破奖励 */
        ModelKingWar.prototype.requestGetSeizeReward = function (cityId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_KingWar_GetSeizeReward);
            msg.CityId = cityId;
            this.request(n.MessageMap.C2G_KINGWAR_GETSEIZEREWARD, msg, utils.Handler.create(this, function (data) {
                _this._strArr = data.RewardStr;
                for (var i = 0; i < _this._kingWarCityVOArr.length; i++) {
                    if (_this._kingWarCityVOArr[i].cityId == data.CityData.CityId) {
                        _this._kingWarCityVOArr[i].seizeRewardState = data.CityData.SeizeRewardStatus;
                        break;
                    }
                }
                GameModels.state.updateState(GameRedState.KING_WAR);
                _this.dispatchEventWith(mo.ModelKingWar.CITY_CHANGE);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**领取占领城池累计收益 */
        ModelKingWar.prototype.requestGetHoldReward = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_KingWar_GetHoldReward);
            this.request(n.MessageMap.C2G_KINGWAR_GETHOLDREWARD, msg, utils.Handler.create(this, function (data) {
                _this._strArr = data.RewardStr;
                _this._hasHoldReward = false;
                mg.alertManager.showAlert(SmithyRewardAlert, true, true, _this._strArr, true);
                GameModels.state.updateState(GameRedState.KING_WAR);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**补充兵力 */
        ModelKingWar.prototype.requestAddBingLi = function (armyId, count, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_KingWar_AddBingLi);
            msg.ArmyId = armyId;
            msg.AddCount = count;
            this.request(n.MessageMap.C2G_KINGWAR_ADDBINGLI, msg, utils.Handler.create(this, function (data) {
                for (var i = 0; i < _this._kingWarArmyVOArr.length; i++) {
                    if (_this._kingWarArmyVOArr[i].armyId == data.ArmyInfo.ArmyId) {
                        _this._kingWarArmyVOArr[i].tameBingLi = data.ArmyInfo.TameBingLi;
                        break;
                    }
                }
                _this.dispatchEventWith(mo.ModelKingWar.ARMY_CHANGE);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**扫荡 */
        ModelKingWar.prototype.requestQuickFight = function (city, armyId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_KingWar_QuickFight);
            msg.ArmyId = armyId;
            msg.CityId = city;
            this.request(n.MessageMap.C2G_KINGWAR_QUICKFIGHT, msg, utils.Handler.create(this, function (data) {
                if (data.RewardStr) {
                    var rewardArr = data.RewardStr.split(";");
                    mg.TipUpManager.instance.showTip(tipUps.CommenGetRewardTips, rewardArr);
                }
                GameModels.state.updateState(GameRedState.KING_WAR);
                _this.dispatchEventWith(mo.ModelKingWar.CITY_CHANGE);
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelKingWar.prototype, "recordType", {
            /**战斗类型 */
            get: function () {
                return this._recordType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelKingWar.prototype, "recordList", {
            /**战斗记录 */
            get: function () {
                return this._recordList;
            },
            enumerable: true,
            configurable: true
        });
        /**请求战斗记录 */
        ModelKingWar.prototype.requestKingWarRecord = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_KingWar_GetRecord);
            msg.Type = type;
            this.request(n.MessageMap.C2G_KINGWAR_GETRECORD, msg, utils.Handler.create(this, function (data) {
                if (_this._recordList) {
                    for (var _i = 0, _a = _this._recordList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._recordList = [];
                }
                _this._recordType = data.Type;
                var RoadInfoList = data.RecordList.concat();
                for (var _b = 0, RoadInfoList_1 = RoadInfoList; _b < RoadInfoList_1.length; _b++) {
                    var RoadItem = RoadInfoList_1[_b];
                    RoadItem.autoRecover = false;
                    _this._recordList.push(RoadItem);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelKingWar.prototype, "attTargetCityId", {
            /**进攻目标城池id */
            get: function () {
                return this._attTargetCityId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelKingWar.prototype, "defTargetCityId", {
            /**防御目标城池id */
            get: function () {
                return this._defTargetCityId;
            },
            enumerable: true,
            configurable: true
        });
        /**请求设置号召目标城池 */
        ModelKingWar.prototype.requestSetFirstTarget = function (type, cityId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_KingWar_SetFirstTarget);
            msg.Type = type;
            msg.CityId = cityId;
            this.request(n.MessageMap.C2G_KINGWAR_SETFIRSTTARGET, msg, utils.Handler.create(this, function (data) {
                if (data.Type == 1) {
                    _this._attTargetCityId = data.CityId;
                }
                else {
                    _this._defTargetCityId = data.CityId;
                }
                if (complete)
                    complete.runWith(data);
                _this.dispatchEventWith(mo.ModelKingWar.SETTARGET_CHANGE);
            }));
        };
        /**城池变化 */
        ModelKingWar.CITY_CHANGE = "CITY_CHANGE";
        /**部队变化 */
        ModelKingWar.ARMY_CHANGE = "ARMY_CHANGE";
        /**进攻目标变化 */
        ModelKingWar.SETTARGET_CHANGE = "SETTARGET_CHANGE";
        return ModelKingWar;
    }(mo.ModelBase));
    mo.ModelKingWar = ModelKingWar;
    __reflect(ModelKingWar.prototype, "mo.ModelKingWar");
})(mo || (mo = {}));
