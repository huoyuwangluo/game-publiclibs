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
    /**BOSS副本*/
    var ModelGamePagoda = (function (_super) {
        __extends(ModelGamePagoda, _super);
        function ModelGamePagoda() {
            var _this = _super.call(this) || this;
            _this.savageMaxPass = 0;
            _this.lockMaxPass = 0;
            _this.wuHunMaxPass = 0;
            _this.savageTodayPass = 0;
            _this.lockTodayPass = 0;
            _this.wuHunTodayPass = 0;
            return _this;
        }
        ModelGamePagoda.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.initializeData([ModelGamePagoda.COPY_SAVAGE_PAGODA,
                ModelGamePagoda.COPY_LOCK_DEMON, ModelGamePagoda.COPY_WUHUN_PAGODA]);
            this._rankHuanShouTaList = [];
            this._rankSuoYaoTaList = [];
            this._rankWuHunTaList = [];
            // this.requestSavageCopyInfo(this, function () {
            //     //GameModels.state.updateState(GameRedState.EXPLORE_PETPAGODA);
            //     //GameModels.state.updateState(GameRedState.CITY);
            // });
            // this.requestLockCopyInfo(this, function () {
            //     // GameModels.state.updateState(GameRedState.EXPLORE_SUOYAOPAGODA);
            //     //GameModels.state.updateState(GameRedState.CITY);
            // });
            // this.requestWuHunCopyInfo(this, function () {
            // });
            this._inspireTimes = 0;
        };
        ModelGamePagoda.prototype.checkFirstState = function (data) {
            if (data.type == ModelGamePagoda.COPY_SAVAGE_PAGODA) {
                return this.savageMaxPass < data.step;
            }
            else if (data.type == ModelGamePagoda.COPY_LOCK_DEMON) {
                return this.lockMaxPass < data.step;
            }
            else if (data.type == ModelGamePagoda.COPY_WUHUN_PAGODA) {
                return this.wuHunMaxPass < data.step;
            }
            else {
                return false;
            }
        };
        /**武神塔 */
        ModelGamePagoda.prototype.requestSavageCopyInfo = function (caller, method) {
            this.request(n.MessageMap.C2G_HUANSHOUTA_INFO, n.MessagePool.from(n.C2G_HuanShouTa_Info), utils.Handler.create(this, function (data) {
                this.savageMaxPass = data.MaxPassStep;
                this.savageTodayPass = data.CanPassStepToday;
                this.savageFloorPassed = data.CurrStep;
                GameModels.platformActivity.redHReport();
                this.huanShouTa_Info(data);
                if (!this._huanShouTa_Info)
                    this._huanShouTa_Info = {};
                this._huanShouTa_Info.CurrStep = data.CurrStep;
                this._huanShouTa_Info.MaxPassStep = data.MaxPassStep;
                this._huanShouTa_Info.CanPassStepToday = data.MaxPassStep;
                method.call(caller);
            }));
        };
        /**试练塔 */
        ModelGamePagoda.prototype.requestLockCopyInfo = function (caller, method) {
            this.request(n.MessageMap.C2G_SUOYAOTA_INFO, n.MessagePool.from(n.C2G_SuoYaoTa_Info), utils.Handler.create(this, function (data) {
                this.lockMaxPass = data.MaxPassStep;
                this.lockTodayPass = data.CanPassStepToday;
                this.lockFloorPassed = data.CurrStep;
                this.suoYaoTa_Info(data);
                if (!this._suoYaoTa_Info)
                    this._suoYaoTa_Info = {};
                this._suoYaoTa_Info.CurrStep = data.CurrStep;
                this._suoYaoTa_Info.MaxPassStep = data.MaxPassStep;
                this._suoYaoTa_Info.CanPassStepToday = data.CanPassStepToday;
                method.call(caller);
            }));
        };
        /**武魂塔 */
        ModelGamePagoda.prototype.requestWuHunCopyInfo = function (caller, method) {
            var _this = this;
            this.request(n.MessageMap.C2G_WUHUNTA_INFO, n.MessagePool.from(n.C2G_WuHunTa_Info), utils.Handler.create(this, function (data) {
                _this.wuHunMaxPass = data.MaxPassStep;
                _this.wuHunTodayPass = data.CanPassStepToday;
                _this.wuHunFloorPassed = data.CurrStep;
                _this.wuHunTa_Info(data);
                if (!_this._wuHunTa_Info)
                    _this._wuHunTa_Info = {};
                _this._wuHunTa_Info.CurrStep = data.CurrStep;
                _this._wuHunTa_Info.MaxPassStep = data.MaxPassStep;
                _this._wuHunTa_Info.CanPassStepToday = data.CanPassStepToday;
                method.call(caller);
            }));
        };
        ModelGamePagoda.prototype.getCopyNextFloor = function (copyVO) {
            return this.getVOByStep(copyVO.type, copyVO.step + 1);
        };
        ModelGamePagoda.prototype.getCopyTodayPassFloor = function (type) {
            var typeTodayPass = 0;
            switch (type) {
                case ModelGamePagoda.COPY_SAVAGE_PAGODA:
                    typeTodayPass = this.savageTodayPass;
                    break;
                case ModelGamePagoda.COPY_SAVAGE_PAGODA:
                    typeTodayPass = this.lockTodayPass;
                    break;
                case ModelGamePagoda.COPY_WUHUN_PAGODA:
                    typeTodayPass = this.wuHunTodayPass;
                    break;
            }
            return typeTodayPass;
        };
        ModelGamePagoda.prototype.getCurrentSavageList = function (level) {
            level -= 1;
            if (level <= 0)
                level = 0;
            return this.getRangeCopyList(ModelGamePagoda.COPY_SAVAGE_PAGODA, level);
        };
        ModelGamePagoda.prototype.isSavageOver = function (level) {
            return this.isMaxTop(ModelGamePagoda.COPY_SAVAGE_PAGODA, level);
        };
        ModelGamePagoda.prototype.getCurrentLockList = function (level) {
            level -= 1;
            if (level <= 0)
                level = 0;
            return this.getRangeCopyList(ModelGamePagoda.COPY_LOCK_DEMON, level);
        };
        ModelGamePagoda.prototype.isLockDemonOver = function (level) {
            return this.isMaxTop(ModelGamePagoda.COPY_LOCK_DEMON, level);
        };
        ModelGamePagoda.prototype.getCurrentWuHunList = function (level) {
            level -= 1;
            if (level <= 0)
                level = 0;
            return this.getRangeCopyList(ModelGamePagoda.COPY_WUHUN_PAGODA, level);
        };
        ModelGamePagoda.prototype.isWuHunDemonOver = function (level) {
            return this.isMaxTop(ModelGamePagoda.COPY_WUHUN_PAGODA, level);
        };
        ModelGamePagoda.prototype.getRangeCopyList = function (type, level) {
            var arys = this.getCopyList(type);
            var start = level;
            var end = start + ModelGamePagoda.PAGE_COUNT;
            if (end >= arys.length) {
                start = arys.length - ModelGamePagoda.PAGE_COUNT;
                end = arys.length;
            }
            var newArys = [];
            for (; start < end; start++) {
                newArys.push(arys[start]);
            }
            return newArys;
        };
        ModelGamePagoda.prototype.isMaxTop = function (type, level) {
            var arys = this.getCopyList(type);
            var start = (level / ModelGamePagoda.PAGE_COUNT >> 0) * ModelGamePagoda.PAGE_COUNT;
            var end = start + ModelGamePagoda.PAGE_COUNT;
            if (end > arys.length) {
                return true;
            }
            return false;
        };
        //最大通关数往上的关数:比如最大通关数为5，这个数就是10，最大通关数是59，这个数就是60；
        ModelGamePagoda.prototype.getCopyMaxPassUp = function (type, maxPassStep) {
            if (maxPassStep < 5)
                return this.getVOByStep(type, 5);
            var curNum = maxPassStep % 5;
            var maxPassUpStep = maxPassStep + (5 - curNum);
            var copyVoUp = this.getVOByStep(type, maxPassUpStep);
            if (copyVoUp)
                return copyVoUp;
            var copyVoPass = this.getVOByStep(type, maxPassStep);
            if (copyVoPass)
                return copyVoPass;
            return null;
        };
        //获得排名
        ModelGamePagoda.prototype.requestRanking = function (rankingType, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_SortBoard_GetSortBoardData);
            msg.SortBoardType = rankingType;
            this.request(n.MessageMap.C2G_SORTBOARD_GETSORTBOARDDATA, msg, utils.Handler.create(this, function (data) {
                _this.updateRankingData(data);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        ModelGamePagoda.prototype.updateRankingData = function (data) {
            var scoreData = data.SortboardData.ScoreData;
            this._rankHuanShouTaList = [];
            var i;
            if (data.SortboardType == ModelGamePagoda.COPY_SAVAGE_PAGODA_RANK) {
                this._rankMyHuanShouTa = { rank: data.Ranking <= 0 ? 1 : data.Ranking, score: data.Score <= 0 ? 1 : data.Score };
                if (scoreData) {
                    this._rankMyHuanShouTa.length = 0;
                    if (scoreData.length > 20) {
                        for (i = 0; i < 20; i++) {
                            this._rankHuanShouTaList.push(vo.fromPool(vo.PlayerRankVO, scoreData[i], i + 1, data.SortboardType));
                        }
                    }
                    else {
                        for (i = 0; i < scoreData.length; i++) {
                            this._rankHuanShouTaList.push(vo.fromPool(vo.PlayerRankVO, scoreData[i], i + 1, data.SortboardType));
                        }
                    }
                }
            }
            else if (data.SortboardType == ModelGamePagoda.COPY_LOCK_DEMON_RANK) {
                this._rankMySuoYaoTa = { rank: data.Ranking <= 0 ? 1 : data.Ranking, score: data.Score <= 0 ? 1 : data.Score };
                if (scoreData) {
                    this._rankSuoYaoTaList.length = 0;
                    if (scoreData.length > 20) {
                        for (i = 0; i < 20; i++) {
                            this._rankSuoYaoTaList.push(vo.fromPool(vo.PlayerRankVO, scoreData[i], i + 1, data.SortboardType));
                        }
                    }
                    else {
                        for (i = 0; i < scoreData.length; i++) {
                            this._rankSuoYaoTaList.push(vo.fromPool(vo.PlayerRankVO, scoreData[i], i + 1, data.SortboardType));
                        }
                    }
                }
            }
            else if (data.SortboardType == ModelGamePagoda.COPY_WUHUN_PAGODA_RANK) {
                this._rankMyWuHunTa = { rank: data.Ranking <= 0 ? 1 : data.Ranking, score: data.Score <= 0 ? 1 : data.Score };
                if (scoreData) {
                    this._rankWuHunTaList.length = 0;
                    if (scoreData.length > 20) {
                        for (i = 0; i < 20; i++) {
                            this._rankWuHunTaList.push(vo.fromPool(vo.PlayerRankVO, scoreData[i], i + 1, data.SortboardType));
                        }
                    }
                    else {
                        for (i = 0; i < scoreData.length; i++) {
                            this._rankWuHunTaList.push(vo.fromPool(vo.PlayerRankVO, scoreData[i], i + 1, data.SortboardType));
                        }
                    }
                }
            }
        };
        /**请求鼓舞 */
        ModelGamePagoda.prototype.requestEncourage = function (typeInspire, inSpireScale) {
            this._inspireTimes++;
            if (typeInspire == TypeInspire.ANIMAL) {
                GameModels.copyPagoda.requestHuanShouTaEncourage(utils.Handler.create(this, function (data) {
                    GameModels.user.player.enableDamegeAddBless((data.TotalCount * parseInt(inSpireScale.value)) / 10000);
                    mg.alertManager.tip(Language.J_ZFCG);
                }));
            }
            else if (typeInspire == TypeInspire.LOCKDEMON) {
                GameModels.copyPagoda.requestSuoYaoTaEncourage(utils.Handler.create(this, function (data) {
                    GameModels.user.player.enableDamegeReduceBless((data.TotalCount * parseInt(inSpireScale.value)) / 10000);
                    mg.alertManager.tip(Language.J_ZFCG);
                }));
            }
        };
        /**重置鼓舞次数 */
        ModelGamePagoda.prototype.resetInspireTimes = function () {
            this._inspireTimes = 0;
        };
        Object.defineProperty(ModelGamePagoda.prototype, "inspireTimes", {
            /**鼓舞次数 */
            get: function () {
                return this._inspireTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGamePagoda.prototype, "rankHuanShouTaList", {
            get: function () {
                return this._rankHuanShouTaList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGamePagoda.prototype, "rankSuoYaoTaList", {
            get: function () {
                return this._rankSuoYaoTaList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGamePagoda.prototype, "rankWuHunTaList", {
            get: function () {
                return this._rankWuHunTaList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGamePagoda.prototype, "rankMyHuanShouTa", {
            get: function () {
                return this._rankMyHuanShouTa;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGamePagoda.prototype, "rankMySuoYaoTa", {
            get: function () {
                return this._rankMySuoYaoTa;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGamePagoda.prototype, "rankMyWuHunTa", {
            get: function () {
                return this._rankMyWuHunTa;
            },
            enumerable: true,
            configurable: true
        });
        ModelGamePagoda.prototype.huanShouTa_Info = function (value) {
            this._huanShouTa_Info = {};
            this._huanShouTa_Info.CurrStep = value.CurrStep;
            this._huanShouTa_Info.MaxPassStep = value.MaxPassStep;
            this._huanShouTa_Info.CanPassStepToday = value.MaxPassStep;
            //GameModels.state.updateState(GameRedState.EXPLORE_PETPAGODA);
            //GameModels.state.updateState(GameRedState.CITY);
        };
        ModelGamePagoda.prototype.suoYaoTa_Info = function (value) {
            this._suoYaoTa_Info = {};
            this._suoYaoTa_Info.CurrStep = value.CurrStep;
            this._suoYaoTa_Info.MaxPassStep = value.MaxPassStep;
            this._suoYaoTa_Info.CanPassStepToday = value.CanPassStepToday;
            //GameModels.state.updateState(GameRedState.EXPLORE_SUOYAOPAGODA);
            //GameModels.state.updateState(GameRedState.CITY);
        };
        ModelGamePagoda.prototype.wuHunTa_Info = function (value) {
            this._wuHunTa_Info = {};
            this._wuHunTa_Info.CurrStep = value.CurrStep;
            this._wuHunTa_Info.MaxPassStep = value.MaxPassStep;
            this._wuHunTa_Info.CanPassStepToday = value.CanPassStepToday;
            //GameModels.state.updateState(GameRedState.EXPLORE_SUOYAOPAGODA);
            //GameModels.state.updateState(GameRedState.CITY);
        };
        ModelGamePagoda.prototype.requestHuanShouTaEncourage = function (handler) {
            var msg = n.MessagePool.from(n.C2G_HuanShouTa_Encourage);
            this.request(n.MessageMap.C2G_HUANSHOUTA_ENCOURAGE, msg, utils.Handler.create(this, function (data) {
                if (handler)
                    handler.runWith(data);
            }));
        };
        ModelGamePagoda.prototype.requestSuoYaoTaEncourage = function (handler) {
            var msg = n.MessagePool.from(n.C2G_SuoYaoTa_Encourage);
            this.request(n.MessageMap.C2G_SUOYAOTA_ENCOURAGE, msg, utils.Handler.create(this, function (data) {
                if (handler)
                    handler.runWith(data);
            }));
        };
        /**锁妖塔武将塔最大层数*/
        ModelGamePagoda.COPY_MAX = 1000;
        /**武将塔*/
        ModelGamePagoda.COPY_SAVAGE_PAGODA = 51;
        /**锁妖塔*/
        ModelGamePagoda.COPY_LOCK_DEMON = 52;
        /**武魂塔*/
        ModelGamePagoda.COPY_WUHUN_PAGODA = 53;
        /**每页数量*/
        ModelGamePagoda.PAGE_COUNT = 3;
        /**武将塔排行*/
        ModelGamePagoda.COPY_SAVAGE_PAGODA_RANK = 108;
        /**试炼塔排行*/
        ModelGamePagoda.COPY_LOCK_DEMON_RANK = 105;
        /**武魂塔排行*/
        ModelGamePagoda.COPY_WUHUN_PAGODA_RANK = 106;
        ModelGamePagoda.BATTLE_OVER = "BATTLE_OVER";
        return ModelGamePagoda;
    }(mo.ModelCopy));
    mo.ModelGamePagoda = ModelGamePagoda;
    __reflect(ModelGamePagoda.prototype, "mo.ModelGamePagoda");
})(mo || (mo = {}));
