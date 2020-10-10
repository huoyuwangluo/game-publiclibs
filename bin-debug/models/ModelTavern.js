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
    var ModelTavern = (function (_super) {
        __extends(ModelTavern, _super);
        function ModelTavern() {
            var _this = _super.call(this) || this;
            _this._daojuItemList = [];
            /**请求神之锻造抽奖 1:1次抽奖，2:10连抽*/
            _this._gdItemList = [];
            /**请求宠物森林抽奖 1:1次抽奖，2:10连抽*/
            _this._animalItemList = [];
            return _this;
        }
        ModelTavern.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._tavernRecordListVO = [];
            this._type = 0;
            this._leftTime = 0;
            this._totalCount = 0;
            this._gdScore = 0;
            this._gdLeftCount = 0;
            this._gdItemList = [];
            this._getRawardInfo = [];
            this.requestTavernInfo();
            this.requestAnimalInfo();
            this.requestGodDuanZaoInfo();
        };
        ModelTavern.prototype.initTavernData = function (data) {
            this._tavernRecordListVO = [];
            for (var i = 0; i < data.length; i++) {
                var tavernRecord = vo.fromPool(vo.TavernRecordListVO, data[i]);
                this._tavernRecordListVO.push(tavernRecord);
            }
        };
        Object.defineProperty(ModelTavern.prototype, "tavernRecordListVO", {
            get: function () {
                return this._tavernRecordListVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTavern.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTavern.prototype, "leftTime", {
            get: function () {
                return this._leftTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTavern.prototype, "totalCount", {
            get: function () {
                return this._totalCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTavern.prototype, "getRawardInfo", {
            get: function () {
                return this._getRawardInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTavern.prototype, "tavernTemplates", {
            get: function () {
                var tem = Templates.getTemplatesByProperty(templates.Map.TAVERN, "type", this._type);
                if (tem) {
                    tem.sort(function (a, b) {
                        return a.pos - b.pos;
                    });
                }
                return tem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTavern.prototype, "tavernRawardTemplates", {
            get: function () {
                var tmps = [];
                var tmpArr = Templates.getTemplatesByProperty(templates.Map.ACTREWARD, "target", 1);
                var start = 0;
                for (var i = 0; i < tmpArr.length; i++) {
                    if (this.getRawardInfo.indexOf(tmpArr[i].id) == -1) {
                        start = i;
                        break;
                    }
                }
                var end = start + 3;
                if (end >= tmpArr.length) {
                    start = tmpArr.length - 3;
                    end = tmpArr.length;
                }
                for (; start < end; start++) {
                    tmps.push(tmpArr[start]);
                }
                return tmps;
            },
            enumerable: true,
            configurable: true
        });
        /**请求酒馆信息*/
        ModelTavern.prototype.requestTavernInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern_GetPlayerTavernInfo);
            this.request(n.MessageMap.C2G_TAVERN_GETPLAYERTAVERNINFO, msg, utils.Handler.create(this, function (data) {
                _this.initTavernData(data.AllRecordList);
                _this._type = data.Type;
                _this._leftTime = data.LeftTime;
                _this._totalCount = data.TotalTimes;
                _this._getRawardInfo = [];
                for (var i = 0; i < data.GetRawardInfo.length; i++) {
                    _this._getRawardInfo.push(data.GetRawardInfo[i]);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelTavern.prototype.requestTavernDoChouJiang = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern_DoChouJiang);
            msg.Type = type;
            this.request(n.MessageMap.C2G_TAVERN_DOCHOUJIANG, msg, utils.Handler.create(this, function (data) {
                _this.initTavernData(data.AllRecordList);
                if (_this._daojuChouJiang) {
                    n.MessagePool.to(_this._daojuChouJiang);
                    _this._daojuChouJiang = null;
                }
                if (_this._daojuItemList) {
                    for (var _i = 0, _a = _this._daojuItemList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._daojuItemList.length = 0;
                }
                _this._daojuChouJiang = data;
                _this._daojuChouJiang.autoRecover = false;
                _this._daojuItemList = _this._daojuChouJiang.ItemList;
                _this._totalCount = _this._totalCount + _this._daojuItemList.length;
                GameModels.state.updateState(GameRedState.TREASURE_GUANXING);
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelTavern.prototype, "daojuItemList", {
            get: function () {
                if (this._daojuItemList) {
                    this._daojuItemList.sort(function (a, b) {
                        var a1 = Templates.getTemplateById(templates.Map.ITEM, a.ItemId);
                        if (!a1) {
                            a1 = Templates.getTemplateById(templates.Map.EQUIP, a.ItemId);
                        }
                        var b1 = Templates.getTemplateById(templates.Map.ITEM, b.ItemId);
                        if (!b1) {
                            b1 = Templates.getTemplateById(templates.Map.EQUIP, b.ItemId);
                        }
                        return b1.quality - a1.quality;
                    });
                }
                return this._daojuItemList;
            },
            enumerable: true,
            configurable: true
        });
        /**涮新酒馆*/
        ModelTavern.prototype.requestTavernRefresh = function (complete) {
            var msg = n.MessagePool.from(n.C2G_Tavern_Refresh);
            this.request(n.MessageMap.C2G_TAVERN_REFRESH, msg, utils.Handler.create(this, function (data) {
                //this._type = data.Type;
                //this._leftTime = data.LeftTime;
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**请求酒馆领奖*/
        ModelTavern.prototype.requestTavernGetRaward = function (rewardId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern_GetTimesRaward);
            msg.RewardId = rewardId;
            this.request(n.MessageMap.C2G_TAVERN_GETTIMESRAWARD, msg, utils.Handler.create(this, function (data) {
                _this._totalCount = data.TotalTimes;
                _this._getRawardInfo = [];
                for (var i = 0; i < data.GetRawardInfo.length; i++) {
                    _this._getRawardInfo.push(data.GetRawardInfo[i]);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelTavern.prototype.checkRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.treasure, 2))
                return false;
            if (GameModels.user.player.level < 100 && GameModels.user.player.vip < 2) {
                // mg.alertManager.tip("100级开放或vip2开放", 0xff0000);
                return false;
            }
            if (GameModels.bag.getItemCountById(ConfigData.GUANXINGKA) > 0)
                return true;
            return false;
        };
        Object.defineProperty(ModelTavern.prototype, "gdLeftCount", {
            /** 神之锻造剩余次数*/
            get: function () {
                return this._gdLeftCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTavern.prototype, "gdScore", {
            /** 神之锻造积分*/
            get: function () {
                return this._gdScore;
            },
            enumerable: true,
            configurable: true
        });
        /**请求神之锻造信息*/
        ModelTavern.prototype.requestGodDuanZaoInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern5_GetPlayerTavernInfo);
            this.request(n.MessageMap.C2G_TAVERN5_GETPLAYERTAVERNINFO, msg, utils.Handler.create(this, function (data) {
                _this._gdLeftCount = data.LeftFreeCnt;
                _this._gdScore = data.Score;
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.DAZAO_SHENZHIDUANZAO);
            }));
        };
        ModelTavern.prototype.requestGodDuanZaoDoChouJiang = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern5_DoChouJiang);
            msg.Type = type;
            this.request(n.MessageMap.C2G_TAVERN5_DOCHOUJIANG, msg, utils.Handler.create(this, function (data) {
                if (_this._gdItemList) {
                    for (var _i = 0, _a = _this._gdItemList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._gdItemList = [];
                }
                data.autoRecover = false;
                _this._gdLeftCount = data.LeftFreeCnt;
                _this._gdScore = data.Score;
                _this._gdItemList = data.ItemList.concat();
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.DAZAO_SHENZHIDUANZAO);
                _this.dispatchEventWith(mo.ModelTavern.GODDUANZAO_GETREWARD);
            }));
        };
        /**请求神之锻造积分奖励*/
        ModelTavern.prototype.requestGodDuanZaoScoreReward = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern5_GetJiFenRaward);
            this.request(n.MessageMap.C2G_TAVERN5_GETJIFENRAWARD, msg, utils.Handler.create(this, function (data) {
                _this._gdScore = data.Score;
                _this.dispatchEventWith(mo.ModelTavern.GODDUANZAO_GETREWARD);
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelTavern.prototype, "gdTemplates", {
            get: function () {
                var tem = Templates.getList(templates.Map.TAVERN5);
                if (tem) {
                    tem.sort(function (a, b) {
                        return a.pos - b.pos;
                    });
                }
                return tem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTavern.prototype, "gdItemList", {
            get: function () {
                if (this._gdItemList) {
                    this._gdItemList.sort(function (a, b) {
                        var a1 = Templates.getTemplateById(templates.Map.ITEM, a.ItemId);
                        if (!a1) {
                            a1 = Templates.getTemplateById(templates.Map.EQUIP, a.ItemId);
                        }
                        var b1 = Templates.getTemplateById(templates.Map.ITEM, b.ItemId);
                        if (!b1) {
                            b1 = Templates.getTemplateById(templates.Map.EQUIP, b.ItemId);
                        }
                        return b1.quality - a1.quality;
                    });
                }
                return this._gdItemList;
            },
            enumerable: true,
            configurable: true
        });
        ModelTavern.prototype.checkDodDuanZao = function () {
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.exploreSmithy, 2)) {
                if (this._gdLeftCount > 0)
                    return true;
                if (GameModels.bag.getItemCountById(ConfigData.GODDUANZAO_ITEM) >= 10)
                    return true;
            }
            return false;
        };
        Object.defineProperty(ModelTavern.prototype, "animalLeftCount", {
            /** 宠物森林剩余次数*/
            get: function () {
                return this._animalLeftCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTavern.prototype, "animalScore", {
            /** 宠物森林积分*/
            get: function () {
                return this._animalScore;
            },
            enumerable: true,
            configurable: true
        });
        /**请求宠物森林信息*/
        ModelTavern.prototype.requestAnimalInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern6_GetPlayerTavernInfo);
            this.request(n.MessageMap.C2G_TAVERN6_GETPLAYERTAVERNINFO, msg, utils.Handler.create(this, function (data) {
                _this._animalLeftCount = data.LeftFreeCnt;
                _this._animalScore = data.Score;
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.ANIMAL_CHOUJIANG);
            }));
        };
        ModelTavern.prototype.requestAnimalChouJiang = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern6_DoChouJiang);
            msg.Type = type;
            this.request(n.MessageMap.C2G_TAVERN6_DOCHOUJIANG, msg, utils.Handler.create(this, function (data) {
                if (_this._animalItemList) {
                    for (var _i = 0, _a = _this._animalItemList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._animalItemList = [];
                }
                data.autoRecover = false;
                _this._animalLeftCount = data.LeftFreeCnt;
                _this._animalScore = data.Score;
                _this._animalItemList = data.ItemList.concat();
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.ANIMAL_CHOUJIANG);
            }));
        };
        /**请求宠物森林积分奖励*/
        ModelTavern.prototype.requestAnimalScoreReward = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern6_DoChouJiang);
            this.request(n.MessageMap.C2G_TAVERN6_GETJIFENRAWARD, msg, utils.Handler.create(this, function (data) {
                _this._animalScore = data.Score;
                _this.dispatchEventWith(mo.ModelTavern.ANIMAL_GETREWARD);
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelTavern.prototype, "animalTemplates", {
            get: function () {
                var tem = Templates.getList(templates.Map.TAVERN6);
                if (tem) {
                    tem.sort(function (a, b) {
                        return a.pos - b.pos;
                    });
                }
                return tem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelTavern.prototype, "animalItemList", {
            get: function () {
                return this._animalItemList;
            },
            enumerable: true,
            configurable: true
        });
        ModelTavern.GODDUANZAO_GETREWARD = "GODDUANZAO_GETREWARD";
        ModelTavern.ANIMAL_GETREWARD = "ANIMAL_GETREWARD";
        return ModelTavern;
    }(mo.ModelBase));
    mo.ModelTavern = ModelTavern;
    __reflect(ModelTavern.prototype, "mo.ModelTavern");
})(mo || (mo = {}));
