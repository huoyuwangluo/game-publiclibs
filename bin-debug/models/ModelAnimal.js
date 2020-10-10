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
    var ModelAnimal = (function (_super) {
        __extends(ModelAnimal, _super);
        function ModelAnimal() {
            return _super.call(this) || this;
        }
        ModelAnimal.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._animalVo = [];
            this._selectedAnimal = [];
            this.initAnimal();
            this.requestAnimalGetList();
            n.net.onRoute(n.MessageMap.NOTIFYANIMALEVENT, utils.Handler.create(this, this.updataAnimalSkill, null, false));
        };
        Object.defineProperty(ModelAnimal.prototype, "hashOpen8day", {
            get: function () {
                return GameModels.serverTime && GameModels.serverTime.kaifuDay >= 8;
            },
            enumerable: true,
            configurable: true
        });
        ModelAnimal.prototype.initAnimal = function () {
            this._animalVo = [];
            var typeArr = [];
            var temps = Templates.getList(templates.Map.ANIMAL);
            for (var i = 0; i < temps.length; i++) {
                if (typeArr.indexOf(temps[i].type) == -1) {
                    typeArr.push(temps[i].type);
                    var listVo = vo.fromPool(vo.AnimalVo, temps[i]);
                    this._animalVo.push(listVo);
                }
            }
        };
        //更新等级数据
        ModelAnimal.prototype.updataAnimalLevel = function (data) {
            for (var i = 0; i < this._animalVo.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (this._animalVo[i].type == data[j].Key) {
                        this._animalVo[i].level = data[j].Value;
                        break;
                    }
                }
            }
        };
        //是否激活
        ModelAnimal.prototype.updataAnimalIsAct = function (actList) {
            for (var i = 0; i < this._animalVo.length; i++) {
                for (var j = 0; j < actList.length; j++) {
                    if (this._animalVo[i].id == actList[j]) {
                        this._animalVo[i].isAct = true;
                        break;
                    }
                }
            }
        };
        ModelAnimal.prototype.updataAnimalLevelOfType = function (type, level) {
            for (var i = 0; i < this._animalVo.length; i++) {
                if (this._animalVo[i].type == type) {
                    this._animalVo[i].level = level;
                    break;
                }
            }
        };
        ModelAnimal.prototype.getTempArrBuyType = function (type) {
            var animalArr = [];
            var temps = Templates.getList(templates.Map.ANIMAL);
            for (var i = 0; i < temps.length; i++) {
                if (temps[i].type == type) {
                    animalArr.push(temps[i]);
                }
            }
            animalArr.sort(function (a, b) {
                return a.step - b.step;
            });
            return animalArr;
        };
        ModelAnimal.prototype.getAnimalIsActBuyTypeAndStep = function (type, step) {
            for (var i = 0; i < this._animalVo.length; i++) {
                if (this._animalVo[i].type == type) {
                    if (!this._animalVo[i].isAct)
                        return false;
                    if (this._animalVo[i].step >= step)
                        return true;
                }
            }
            return false;
        };
        ModelAnimal.prototype.getAnimalBuyType = function (type) {
            var animal = null;
            for (var i = 0; i < this._animalVo.length; i++) {
                if (this._animalVo[i].type == type) {
                    animal = this._animalVo[i];
                    break;
                }
            }
            return animal;
        };
        ModelAnimal.prototype.hashGetRewardBuyId = function (id) {
            if (this._getRewardList.indexOf(id) != -1) {
                return true;
            }
            return false;
        };
        ModelAnimal.prototype.hashRedpoint = function () {
            var animal = null;
            for (var i = 0; i < this._animalVo.length; i++) {
                if (this._animalVo[i].hashRedPoint) {
                    animal = this._animalVo[i];
                    break;
                }
            }
            return animal ? animal.id : -1;
        };
        Object.defineProperty(ModelAnimal.prototype, "animalArr", {
            get: function () {
                return this._animalVo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelAnimal.prototype, "getRewardList", {
            get: function () {
                return this._getRewardList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelAnimal.prototype, "selectedAnimal", {
            get: function () {
                return this._selectedAnimal;
            },
            enumerable: true,
            configurable: true
        });
        ModelAnimal.prototype.clearSelectedArr = function () {
            this._selectedAnimal = [];
        };
        ModelAnimal.prototype.updataAnimalView = function () {
            this.dispatchEventWith(ModelAnimal.SELECTED_UPDATA);
        };
        Object.defineProperty(ModelAnimal.prototype, "faeryAnimal", {
            get: function () {
                var animalList = [];
                var animalArr = Templates.getTemplatesByProperty(templates.Map.ANIMAL, "type", 17);
                animalArr.sort(function (a, b) {
                    return a.step - b.step;
                });
                for (var i = 0; i < animalArr.length; i++) {
                    if (animalArr[i].step < 5) {
                        animalList.push(animalArr[i]);
                    }
                }
                return animalList;
            },
            enumerable: true,
            configurable: true
        });
        //获取激活列表
        ModelAnimal.prototype.requestAnimalGetList = function (complete) {
            var _this = this;
            this.request(n.MessageMap.C2G_ANIMAL_GETLIST, n.MessagePool.from(n.C2G_Animal_GetList), utils.Handler.create(this, function (data) {
                _this.updataAnimalIsAct(data.AnimalIdList);
                _this.updataAnimalLevel(data.AninalInfoList);
                _this._getRewardList = data.GetRewardIdList.concat();
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.ANIMAL_UPGRADE);
                GameModels.state.updateState(GameRedState.ANIMAL_REWAED);
            }));
        };
        /**请求激活宠物*/
        ModelAnimal.prototype.requestAnimalActive = function (type, consume, complete) {
            var _this = this;
            if (consume === void 0) { consume = ""; }
            var msg = n.MessagePool.from(n.C2G_Animal_Uprade);
            msg.Type = type;
            msg.consume = consume;
            this.request(n.MessageMap.C2G_ANIMAL_UPRADE, msg, utils.Handler.create(this, function (data) {
                _this.updataAnimalIsAct(data.AnimalIdList);
                _this.updataAnimalLevelOfType(data.Type, data.Level);
                _this._selectedAnimal = [];
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.ANIMAL_UPGRADE);
                GameModels.state.updateState(GameRedState.ANIMAL_REWAED);
            }));
        };
        /**请求领取宠物奖励*/
        ModelAnimal.prototype.requestGetAnimalReward = function (id, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Animal_GetReward);
            msg.AnimalId = id;
            this.request(n.MessageMap.C2G_ANIMAL_GETREWARD, msg, utils.Handler.create(this, function (data) {
                if (data.AnimalId)
                    _this._getRewardList.push(data.AnimalId);
                if (data.RewardStr) {
                    var rewardArr = data.RewardStr.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                }
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.ANIMAL_REWAED);
            }));
        };
        ModelAnimal.prototype.updataAnimalSkill = function (data) {
            var temp = Templates.getTemplateById(templates.Map.ANIMAL, data.AnimalId);
            if (temp) {
                mg.alertManager.sourceAnimalTip(temp);
            }
        };
        ModelAnimal.prototype.checkAnimalGradeRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.animal, 0))
                return false;
            for (var i = 0; i < this._animalVo.length; i++) {
                if (this._animalVo[i].hashRedPoint) {
                    return true;
                }
            }
            return false;
        };
        ModelAnimal.prototype.checkAnimalRewardRedPoint = function () {
            if (!this.hashOpen8day)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.animal, 1))
                return false;
            var animalList = this.faeryAnimal;
            var animalVo = this.getAnimalBuyType(17);
            for (var _i = 0, animalList_1 = animalList; _i < animalList_1.length; _i++) {
                var animal = animalList_1[_i];
                if (animalVo.isAct) {
                    var hashAct = animalVo.step >= animal.step;
                    var hashGetReward = this.hashGetRewardBuyId(animal.id);
                    if (hashAct) {
                        if (!hashGetReward) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        ModelAnimal.prototype.checkAnimalTavernRedPoint = function () {
            if (!this.hashOpen8day)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.animal, 2))
                return false;
            if (GameModels.tavern && GameModels.tavern.animalLeftCount > 0)
                return true;
            if (GameModels.bag.getItemCountById(ConfigData.ANIAML_ZHAOHUAN) >= 10)
                return true;
            return false;
        };
        ModelAnimal.SELECTED_UPDATA = "SELECTED_UPDATA";
        return ModelAnimal;
    }(mo.ModelBase));
    mo.ModelAnimal = ModelAnimal;
    __reflect(ModelAnimal.prototype, "mo.ModelAnimal");
})(mo || (mo = {}));
