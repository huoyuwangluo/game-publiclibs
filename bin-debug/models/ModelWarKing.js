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
    /**王者争霸*/
    var ModelWarKing = (function (_super) {
        __extends(ModelWarKing, _super);
        function ModelWarKing() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._leftCount = 0;
            _this._seasonCount = 0;
            _this._winCount = 0;
            _this._leftRate = 0;
            _this._headId = "";
            _this._star = 0;
            _this._firstStar = 0;
            _this._buyCount = 0;
            return _this;
        }
        ModelWarKing.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._rankPlayList = [];
            this._hallPlayList = [];
            this.syncPetLadderInfo();
        };
        /**膜拜*/
        ModelWarKing.prototype.petLadderWorship = function (complte) {
            /*var msg: n.C2G_PetLadder_Worship = n.MessagePool.from(n.C2G_PetLadder_Worship) as n.C2G_PetLadder_Worship;
            this.request(n.MessageMap.C2G_PETLADDER_WORSHIP, msg, utils.Handler.create(this, function (data: n.G2C_PetLadder_NotifyWorship) {
                data.autoRecover = false;
                data.WorshipCount;
                if (complte) complte.run();
            }));*/
        };
        /**同步排行榜 */
        ModelWarKing.prototype.syncPetLadderRankList = function (type) {
            /*n.net.onRoute(n.MessageMap.G2C_PETLADDER_NOTIFYRANKLIST, utils.Handler.create(this, function (data: n.G2C_PetLadder_NotifyRankList) {
                n.net.offRoute(n.MessageMap.G2C_PETLADDER_NOTIFYRANKLIST);
                data.autoRecover = false;
                data.MingRenData.autoRecover = false;
                this._rankFirstData = data.MingRenData;
                this.setPlayRank(data.Players);
                this.dispatchEventWith(ModelWarKing.WAR_KING_RANK);
            }));
            var msg: n.C2G_PetLadder_RankList = n.MessagePool.from(n.C2G_PetLadder_RankList) as n.C2G_PetLadder_RankList;
            msg.Type = type;
            this.notify(n.MessageMap.C2G_PETLADDER_RANKLIST, msg);
            */
        };
        /**同步主页信息 */
        ModelWarKing.prototype.syncPetLadderInfo = function () {
            /*n.net.onRoute(n.MessageMap.G2C_PETLADDER_NOTIFYINFO, utils.Handler.create(this, function (data: n.G2C_PetLadder_NotifyInfo) {
                n.net.offRoute(n.MessageMap.G2C_PETLADDER_NOTIFYINFO);
                data.autoRecover = false;
                data.Info.autoRecover = false;
                this._star = data.Info.Star;
                this._winCount = data.Info.Win;
                this._seasonCount = data.Info.Win + data.Info.Lost;
                this._leftCount = data.Info.LeftFreeCount;
                this._buyCount = data.Info.BuyCount;
                this._firstData = data.Info.MingRenData;
                this._headId = data.Info.ShowPetRefId;
                this._getAwardList = data.Info.AlreadyGetListId;
                // GameModels.state.updateState(GameRedState.CROSS_WAR_KING);
                // GameModels.state.updateState(GameRedState.CROSS_ACTIVITY);
                this._firstStar = data.Info.MingRenStar;
                this.dispatchEventWith(ModelWarKing.WAR_KING_INFO);
            }));
            var msg: n.C2G_PetLadder_Info = n.MessagePool.from(n.C2G_PetLadder_Info) as n.C2G_PetLadder_Info;
            this.notify(n.MessageMap.C2G_PETLADDER_INFO, msg);
            */
        };
        /**请求匹配 */
        ModelWarKing.prototype.syncPetLadderMatching = function () {
            /*if (this._leftCount < 1) {
                mg.alertManager.tip(Language.J_SYCS);
                return;
            }
            n.net.onRoute(n.MessageMap.G2C_PETLADDER_NOTIFYMATCHING, utils.Handler.create(this, function (data: n.G2C_PetLadder_NotifyMatching) {
                n.net.offRoute(n.MessageMap.G2C_PETLADDER_NOTIFYMATCHING);
                data.autoRecover = false;
                this._matchFirstData = data.Info;
                this.dispatchEventWith(ModelWarKing.WAR_KING_PIPEI);
            }));
            var msg: n.C2G_PetLadder_Matching = n.MessagePool.from(n.C2G_PetLadder_Matching) as n.C2G_PetLadder_Matching;
            this.notify(n.MessageMap.C2G_PETLADDER_MATCHING, msg);
            */
        };
        /**请求设置形象 */
        ModelWarKing.prototype.syncPetLadderSetSkin = function (PetId) {
            /*n.net.onRoute(n.MessageMap.G2C_PETLADDER_NOTIFYSETSKIN, utils.Handler.create(this, function (data: n.G2C_PetLadder_NotifySetSkin) {
                n.net.offRoute(n.MessageMap.G2C_PETLADDER_NOTIFYSETSKIN);
                data.autoRecover = false;
                this._headId = data.Result.toString();
                mg.alertManager.tip(Language.J_XGCG);
                this.dispatchEventWith(ModelWarKing.WAR_KING_HEAD);
            }));
            var msg: n.C2G_PetLadder_SetSkin = n.MessagePool.from(n.C2G_PetLadder_SetSkin) as n.C2G_PetLadder_SetSkin;
            msg.PetId = PetId;
            this.notify(n.MessageMap.C2G_PETLADDER_SETSKIN, msg);
            */
        };
        /**购买次数*/
        ModelWarKing.prototype.petLadderBuyChallengeCount = function (complte) {
            /*var msg: n.C2G_PetLadder_Buy_Challenge_Count = n.MessagePool.from(n.C2G_PetLadder_Buy_Challenge_Count) as n.C2G_PetLadder_Buy_Challenge_Count;
            this.request(n.MessageMap.C2G_PETLADDER_BUY_CHALLENGE_COUNT, msg, utils.Handler.create(this, function (data: n.G2C_PetLadder_Buy_Challenge_Count) {
                data.autoRecover = false;
                this._leftCount = data.LeftCount;
                this._buyCount = data.BuyCount;
                mg.alertManager.tip(Language.J_GMCG);
                if (complte) complte.run();
                // GameModels.state.updateState(GameRedState.CROSS_WAR_KING);
                // GameModels.state.updateState(GameRedState.CROSS_ACTIVITY);
                this.dispatchEventWith(ModelWarKing.WAR_KING_ADDCOUNT);
            }));
            */
        };
        /**获取段位奖励*/
        ModelWarKing.prototype.syncDanAward = function (id, caller, method) {
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            /*n.net.onRoute(n.MessageMap.G2C_PETLADDER_NOTIFYGETRAWARD, utils.Handler.create(this, function (data: n.G2C_PetLadder_NotifyGetRaward) {
                n.net.offRoute(n.MessageMap.G2C_PETLADDER_NOTIFYGETRAWARD);
                data.autoRecover = false;
                this._getAwardList = data.AlreadyGetListId;
                this.dispatchEventWith(ModelWarKing.GET_AWARD);
                // GameModels.state.updateState(GameRedState.CROSS_WAR_KING);
                // GameModels.state.updateState(GameRedState.CROSS_ACTIVITY);
                if (method) {
                    method.call(caller);
                }
            }));
            var msg: n.C2G_PetLadder_GetRaward = n.MessagePool.from(n.C2G_PetLadder_GetRaward) as n.C2G_PetLadder_GetRaward;
            msg.RawardId = id;
            ModelWarKing.getId = id;
            this.notify(n.MessageMap.C2G_PETLADDER_GETRAWARD, msg);
            */
        };
        Object.defineProperty(ModelWarKing.prototype, "leftCount", {
            /**匹配剩余次数 */
            get: function () {
                return this._leftCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "seasonCount", {
            /**赛季匹配次数 */
            get: function () {
                return this._seasonCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "winCount", {
            /**匹配胜利次数 */
            get: function () {
                return this._winCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "leftRate", {
            /**匹配胜率 */
            get: function () {
                if (this._seasonCount == 0) {
                    return this._seasonCount * 100;
                }
                this._leftRate = this._winCount / this._seasonCount;
                return this._leftRate * 100;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "headId", {
            /**我设置的头像 */
            get: function () {
                if (this._headId == "") {
                    var arr2 = GameModels.pet.formatUpVOList;
                    ;
                    return arr2[0].avatarId;
                }
                return this._headId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "staticData", {
            /**我的数据模型*/
            get: function () {
                this._staticData = Templates.getTemplateById(templates.Map.PETLADDER, this._star + 1);
                return this._staticData;
            },
            enumerable: true,
            configurable: true
        });
        /**获取数据模型*/
        ModelWarKing.prototype.getStaticData = function (star) {
            this._staticData = Templates.getTemplateById(templates.Map.PETLADDER, star + 1);
            return this._staticData;
        };
        Object.defineProperty(ModelWarKing.prototype, "myRank", {
            /**我的数据模型*/
            get: function () {
                var rank = 0;
                if (this._rankPlayList) {
                    for (var i = 0; i < this._rankPlayList.length; i++) {
                        if (GameModels.user.player.uid == this._rankPlayList[i].PlayerId) {
                            rank = (i + 2);
                            break;
                        }
                    }
                }
                return rank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "myHallRank", {
            /**我的数据模型*/
            get: function () {
                var rank = 0;
                if (this._hallPlayList) {
                    for (var i = 0; i < this._hallPlayList.length; i++) {
                        if (GameModels.user.player.uid == this._hallPlayList[i].PlayerId) {
                            rank = (i + 2);
                            break;
                        }
                    }
                }
                return rank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "star", {
            /**我的星级 */
            get: function () {
                return this._star;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "firstStar", {
            /**头名的星级 */
            get: function () {
                return this._firstStar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "buyCount", {
            /**购买次数 */
            get: function () {
                return this._buyCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "firstData", {
            /**第一名信息 */
            get: function () {
                return this._firstData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "rankFirstData", {
            /**排行榜第一名信息 */
            get: function () {
                return this._rankFirstData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "rankFirstStarData", {
            /**排行榜第一名段位信息 */
            get: function () {
                return this._rankFirstStarData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "matchFirstData", {
            /**匹配到的玩家的信息 */
            get: function () {
                return this._matchFirstData;
            },
            enumerable: true,
            configurable: true
        });
        /**退出战斗重置匹配到的玩家的信息 */
        ModelWarKing.prototype.matchFirstDataReset = function () {
            this._matchFirstData = null;
        };
        ModelWarKing.prototype.setPlayRank = function (data /*n.ProtoPetLadderPlayerInfo[]*/) {
            this._hallPlayList = [];
            for (var i = 0; i < data.length; i++) {
                data[i].autoRecover = false;
                data[i]["Rank"] = new Object();
                data[i]["Rank"] = (i + 1);
                if (data[i].Star >= 241) {
                    this._hallPlayList.push(data[i]);
                }
            }
            this._rankPlayList = data;
            if (this._rankPlayList.length > 0) {
                this._rankFirstStarData = this._rankPlayList[0];
                this._rankPlayList.shift();
            }
            // this._rankPlayList.sort(function (a: n.ProtoPetLadderPlayerInfo, b: n.ProtoPetLadderPlayerInfo): number {
            //     if (a.Star > b.Star) return 1;
            //     else if (a.Star < b.Star) return -1;
            //     else return 0;
            // });
        };
        Object.defineProperty(ModelWarKing.prototype, "hallList", {
            /** 名人堂*/
            get: function () {
                return this._hallPlayList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "rankPlayList", {
            /** 排名*/
            get: function () {
                return this._rankPlayList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "getAwardList", {
            /** 已领奖list*/
            get: function () {
                return this._getAwardList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "duanRankAward", {
            /**段位奖励 */
            get: function () {
                if (this._duanRankAward) {
                    return this._duanRankAward;
                }
                this._duanRankAward = [];
                var curTemplate = Templates.getList(templates.Map.PETLADDER);
                for (var i = 0; i < curTemplate.length; i++) {
                    if (curTemplate[i].star == 0 && curTemplate[i].id != 1) {
                        this._duanRankAward.push(curTemplate[i]);
                    }
                }
                this._duanRankAward.sort(function (a, b) {
                    if (a.id > b.id)
                        return 1;
                    else if (a.id < b.id)
                        return -1;
                    else
                        return 0;
                });
                return this._duanRankAward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "seasonAward", {
            /**赛季奖励 */
            get: function () {
                if (this._seasonAward) {
                    return this._seasonAward;
                }
                this._seasonAward = [];
                var curTemplate1 = Templates.getTemplatesByProperty(templates.Map.RANKREWARD, "type", 21);
                var curTemplate2 = Templates.getTemplatesByProperty(templates.Map.RANKREWARD, "type", 22);
                curTemplate2.sort(function (a, b) {
                    if (a.rankMax > b.rankMax)
                        return -1;
                    else if (a.rankMax < b.rankMax)
                        return 1;
                    else
                        return 0;
                });
                this._seasonAward = curTemplate1.concat(curTemplate2);
                return this._seasonAward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWarKing.prototype, "buyCost", {
            get: function () {
                var cost;
                var count = this._buyCount + 1;
                var temp = GameModels.dataSet.getDataSettingById(481001);
                var costArr = temp.value.split(";");
                for (var _i = 0, costArr_1 = costArr; _i < costArr_1.length; _i++) {
                    var costItem = costArr_1[_i];
                    var costItemArr = costItem.split("_");
                    if (count >= parseInt(costItemArr[0]) && count <= parseInt(costItemArr[1])) {
                        cost = parseInt(costItemArr[2]);
                        break;
                    }
                }
                return cost;
            },
            enumerable: true,
            configurable: true
        });
        /**红点 */
        ModelWarKing.prototype.checkRed = function () {
            if (this.checkAwardRed()) {
                return true;
            }
            return (this._leftCount > 0);
        };
        /**领奖红点 */
        ModelWarKing.prototype.checkAwardRed = function () {
            if (!this._staticData) {
                return false;
            }
            var staticData = Templates.getTemplateById(templates.Map.PETLADDER, this._star + 1);
            for (var i = 0; i < this.duanRankAward.length; i++) {
                if (this.duanRankAward[i].id <= staticData.id) {
                    if (GameModels.warKing.getAwardList.indexOf(this.duanRankAward[i].id) < 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelWarKing.WAR_KING_INFO = "WAR_KING_INFO";
        ModelWarKing.WAR_KING_RANK = "WAR_KING_RANK";
        ModelWarKing.WAR_KING_PIPEI = "WAR_KING_PIPEI";
        ModelWarKing.WAR_KING_HEAD = "WAR_KING_HEAD";
        ModelWarKing.WAR_KING_ADDCOUNT = "WAR_KING_ADDCOUNT";
        ModelWarKing.GET_AWARD = "GET_AWARD";
        ModelWarKing.getId = -1;
        return ModelWarKing;
    }(mo.ModelBase));
    mo.ModelWarKing = ModelWarKing;
    __reflect(ModelWarKing.prototype, "mo.ModelWarKing");
})(mo || (mo = {}));
