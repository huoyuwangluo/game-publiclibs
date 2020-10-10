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
    var ModelSmithy = (function (_super) {
        __extends(ModelSmithy, _super);
        function ModelSmithy() {
            var _this = _super.call(this) || this;
            _this._smithyLeftTime = 0;
            _this._targetShenBinId = 0;
            _this._baseExp = 0;
            _this._baseRewardStr = "";
            _this._expAddonPercent = 0;
            _this._rewardAddonPercent = 0;
            _this._expTeamAddonPercent = 0;
            _this._rewardTeamAddonPercent = 0;
            _this._status = 0;
            /**神兵兑换 */
            //获取已解锁锻造神兵列表
            _this._shenBingIdList = [];
            return _this;
        }
        ModelSmithy.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._rewardStr = "";
            this._smithyLevel = 0;
            this._smithyCnt = 0;
            this._smithyExp = 0;
            this._leftBuySmithyCnt = 0;
            this._talentPoint = 0;
            this._shenBingList = [];
            this._talentList = [];
            this._talentShenBingMap = [];
            this._smithyPlayerListVo = [];
            this._smithyPlayerListVo1 = [];
            this._isHashRedPoint = false;
            this.requestSmithyInfo();
            this.requestSmithyRedPointInfo();
            this.requestSmithyGetShenBingList();
            n.net.onRoute(n.MessageMap.NOTIFYSMITHYREDPOINTINFO, utils.Handler.create(this, this.updataRedPoint, null, false));
            n.net.onRoute(n.MessageMap.NOTIFYSHENBINGBUILDINGLIST, utils.Handler.create(this, this.updataTalint, null, false));
        };
        ModelSmithy.prototype.updataTalint = function (data) {
            this._shenBingList = [];
            for (var i = 0; i < data.ShenBingBuildingList.length; i++) {
                this._shenBingList.push(data.ShenBingBuildingList[i]);
            }
        };
        ModelSmithy.prototype.updataRedPoint = function (data) {
            this._isHashRedPoint = data.HasRedPoint > 0 ? true : false;
            GameModels.state.updateState(GameRedState.DAZAO_SHENBING);
            GameModels.state.updateState(GameRedState.CITY);
        };
        ModelSmithy.prototype.checkRedPoint = function () {
            if (GameModels.user.player.leijidenglu < 2)
                return false;
            if (TypeFunOpen.checkFuncOpen(s.UserfaceName.exploreSmithy, 1)) {
                if (this._isHashRedPoint)
                    return true;
                if (this.checkTalentRedPoint())
                    return true;
            }
            return false;
        };
        /**神兵天赋红点 */
        ModelSmithy.prototype.checkTalentRedPoint = function () {
            var list = Templates.getList(templates.Map.SMITHYTALENT);
            for (var i = 0; i < list.length; i++) {
                if (this._talentPoint >= list[i].needNum) {
                    if (list[i].prevId && this._talentList.indexOf(list[i].prevId) != -1 && this._talentList.indexOf(list[i].id) == -1) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**请求红点*/
        ModelSmithy.prototype.requestSmithyRedPointInfo = function () {
            var cmd = n.MessagePool.from(n.C2G_Smithy_GetRedPointInfo);
            this.notify(n.MessageMap.C2G_SMITHY_GETREDPOINTINFO, cmd);
        };
        ModelSmithy.prototype.updataSmithyTaskInfo = function (data) {
            this._smithyLeftTime = data.LeftTime;
            this._targetShenBinId = data.TargetShenBinId;
            this._baseExp = data.BaseExp;
            this._baseRewardStr = data.BaseRewardStr;
            this._expAddonPercent = data.ExpAddonPercent;
            this._rewardAddonPercent = data.RewardAddonPercent;
            this._expTeamAddonPercent = data.ExpTeamAddonPercent;
            this._rewardTeamAddonPercent = data.RewardTeamAddonPercent;
            this._status = data.Status;
            this._smithyPlayerListVo = [];
            for (var i = 0; i < data.AssistantList.length; i++) {
                var smithyVO = vo.fromPool(vo.SmithyVO, data.AssistantList[i]);
                this._smithyPlayerListVo.push(smithyVO);
            }
            this.dispatchEventWith(mo.ModelSmithy.UPDATA_SMITHY_TASK_INFO);
        };
        Object.defineProperty(ModelSmithy.prototype, "baseExp", {
            /**任务基础经验*/
            get: function () {
                return this._baseExp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "baseRewardStr", {
            /**任务基础碎片*/
            get: function () {
                return this._baseRewardStr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "expAddonPercent", {
            /**个人经验加成*/
            get: function () {
                return this._expAddonPercent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "rewardAddonPercent", {
            /**个人碎片加成*/
            get: function () {
                return this._rewardAddonPercent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "expTeamAddonPercent", {
            /**队伍经验总加成*/
            get: function () {
                return this._expTeamAddonPercent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "rewardTeamAddonPercent", {
            /**队伍碎片总加成*/
            get: function () {
                return this._rewardTeamAddonPercent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "status", {
            get: function () {
                return this._status;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "targetShenBinId", {
            /**打造目标神兵*/
            get: function () {
                return this._targetShenBinId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "targetShenBinTemp", {
            get: function () {
                return Templates.getTemplateById(templates.Map.SMITHYSHENBING, this._targetShenBinId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "targetShenBinItemTemp", {
            get: function () {
                return Templates.getTemplateById(templates.Map.ITEM, this._targetShenBinId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "reardStr", {
            get: function () {
                return this._rewardStr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "smithyLeftTime", {
            get: function () {
                return this._smithyLeftTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "smithyExp", {
            get: function () {
                return this._smithyExp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "smithyLevel", {
            get: function () {
                return this._smithyLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "smithyTemp", {
            get: function () {
                return Templates.getTemplateById(templates.Map.SMITHY, this._smithyLevel);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "smithyCnt", {
            get: function () {
                return this._smithyCnt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "leftBuySmithyCnt", {
            get: function () {
                return this._leftBuySmithyCnt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "talentPoint", {
            get: function () {
                return this._talentPoint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "talentList", {
            get: function () {
                return this._talentList;
            },
            enumerable: true,
            configurable: true
        });
        ModelSmithy.prototype.hashTalentById = function (id) {
            return this._talentList && this._talentList.indexOf(id) != -1;
        };
        Object.defineProperty(ModelSmithy.prototype, "shenBinIdList", {
            get: function () {
                return this._shenBingList;
            },
            enumerable: true,
            configurable: true
        });
        ModelSmithy.prototype.getShenBinIdByTalent = function (id) {
            if (!this._talentShenBingMap)
                return 0;
            for (var i = 0; i < this._talentShenBingMap.length; i++) {
                if (this._talentShenBingMap[i].Key == id)
                    return this._talentShenBingMap[i].Value;
            }
            return 0;
        };
        Object.defineProperty(ModelSmithy.prototype, "smithyPlayerListVo", {
            get: function () {
                return this._smithyPlayerListVo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "smithyPlayerListVo1", {
            get: function () {
                return this._smithyPlayerListVo1;
            },
            enumerable: true,
            configurable: true
        });
        /**请求打铁信息*/
        ModelSmithy.prototype.requestSmithyInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_GetSmithyInfo);
            this.request(n.MessageMap.C2G_SMITHY_GETSMITHYINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._data) {
                    n.MessagePool.to(_this._data);
                    _this._data = null;
                }
                data.autoRecover = false;
                _this._data = data;
                _this._smithyLevel = data.SmithyLevel;
                _this._smithyCnt = data.SmithyCnt;
                _this._smithyExp = data.SmithyExp;
                _this._leftBuySmithyCnt = data.LeftBuySmithyCnt;
                _this._talentPoint = data.TalentPoint;
                _this._talentList = [];
                for (var i = 0; i < data.TalentList.length; i++) {
                    _this._talentList.push(data.TalentList[i]);
                }
                _this._talentShenBingMap = [];
                for (var i = 0; i < _this._data.TalentShenBingMap.length; i++) {
                    _this._talentShenBingMap.push(_this._data.TalentShenBingMap[i]);
                }
                _this._shenBingList = [];
                for (var i = 0; i < _this._data.ShenBingBuildingList.length; i++) {
                    _this._shenBingList.push(_this._data.ShenBingBuildingList[i]);
                }
                _this.dispatchEventWith(mo.ModelSmithy.UPDATA_SMITHY_INFO);
                GameModels.state.updateState(GameRedState.DAZAO_SHENBING);
                GameModels.state.updateState(GameRedState.CITY);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**创建打铁任务*/
        ModelSmithy.prototype.requestCreateSmithyTask = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_CreateTask);
            this.request(n.MessageMap.C2G_SMITHY_CREATETASK, msg, utils.Handler.create(this, function (data) {
                _this.updataSmithyTaskInfo(data.NewTask);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**选择打铁目标*/
        ModelSmithy.prototype.requestChooseSmithyTarget = function (shenbingId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_ChooseTarget);
            msg.ShenBinId = shenbingId;
            this.request(n.MessageMap.C2G_SMITHY_CHOOSETARGET, msg, utils.Handler.create(this, function (data) {
                if (data.Result && complete) {
                    _this.updataSmithyTaskInfo(data.NewTask);
                    complete.runWith(data);
                }
            }));
        };
        /**获取协助成员列表*/
        ModelSmithy.prototype.requestSmithyGetAssistantList = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_GetAssistantList);
            this.request(n.MessageMap.C2G_SMITHY_GETASSISTANTLIST, msg, utils.Handler.create(this, function (data) {
                _this._smithyPlayerListVo1 = [];
                for (var i = 0; i < data.AssistantList.length; i++) {
                    var smithyVO = vo.fromPool(vo.SmithyVO, data.AssistantList[i]);
                    _this._smithyPlayerListVo1.push(smithyVO);
                }
                if (complete) {
                    complete.runWith(data);
                }
            }));
        };
        /**邀请玩家协助打铁*/
        ModelSmithy.prototype.requestSmithyInviteAssistant = function (playerId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_InviteAssistant);
            msg.PlayerIds = playerId;
            this.request(n.MessageMap.C2G_SMITHY_INVITEASSISTANT, msg, utils.Handler.create(this, function (data) {
                if (data.Result && complete) {
                    _this.updataSmithyTaskInfo(data.NewTask);
                    complete.runWith(data);
                }
            }));
        };
        /**队长剔除成员*/
        ModelSmithy.prototype.requestSmithyKickoutAssistant = function (playerId) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_KickoutAssistant);
            msg.PlayerId = playerId;
            this.request(n.MessageMap.C2G_SMITHY_KICKOUTASSISTANT, msg, utils.Handler.create(this, function (data) {
                if (data.Result) {
                    _this.updataSmithyTaskInfo(data.NewTask);
                }
            }));
        };
        /**开始打造*/
        ModelSmithy.prototype.requestSmithyStartTask = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_StartTask);
            this.request(n.MessageMap.C2G_SMITHY_STARTTASK, msg, utils.Handler.create(this, function (data) {
                if (data.Result) {
                    _this.requestSmithyInfo();
                    _this.updataSmithyTaskInfo(data.NewTask);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**激活打铁天赋*/
        ModelSmithy.prototype.requestSmithyActiveTalent = function (talentId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_ActiveTalent);
            msg.TalentId = talentId;
            this.request(n.MessageMap.C2G_SMITHY_ACTIVETALENT, msg, utils.Handler.create(this, function (data) {
                _this.requestSmithyInfo();
                if (data.NewShenBingId) {
                    var temitem = Templates.getTemplateById(templates.Map.ITEM, data.NewShenBingId);
                    var str = Language.getExpression(Language.E_XSBDZ, temitem.name);
                    mg.alertManager.showAlert(PromptAlert, false, true, str, TypeBtnLabel.OK_SIGIN, null, null, null, true);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**购买次数*/
        ModelSmithy.prototype.requestSmithyBuyTimes = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_BuyTimes);
            this.request(n.MessageMap.C2G_SMITHY_BUYTIMES, msg, utils.Handler.create(this, function (data) {
                _this._smithyCnt = data.SmithyCnt;
                _this._leftBuySmithyCnt = data.LeftBuySmithyCnt;
                _this.dispatchEventWith(mo.ModelSmithy.UPDATA_SMITHY_INFO);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**打铁加速*/
        ModelSmithy.prototype.requestSmithyCleanCD = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_CleanCD);
            this.request(n.MessageMap.C2G_SMITHY_CLEANCD, msg, utils.Handler.create(this, function (data) {
                if (data.Result) {
                    _this.updataSmithyTaskInfo(data.NewTask);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelSmithy.prototype.getAddExp = function () {
            var baseExpCount = this.baseExp;
            var teamExpCount = Math.floor((this.expTeamAddonPercent / 10000) * baseExpCount);
            return baseExpCount + teamExpCount;
        };
        /**领取打铁任务奖励*/
        ModelSmithy.prototype.requestSmithyGetSmithReward = function (complete) {
            var _this = this;
            this._addExp = this.getAddExp();
            var msg = n.MessagePool.from(n.C2G_Smithy_GetSmithReward);
            this.request(n.MessageMap.C2G_SMITHY_GETSMITHREWARD, msg, utils.Handler.create(this, function (data) {
                if (data.Result) {
                    _this._rewardStr = data.RewardStr;
                    logger.log("锻造得到的奖励==" + _this._rewardStr);
                    _this.requestSmithyInfo();
                    mg.alertManager.showAlert(SmithyRewardAlert, true, true, _this._rewardStr, false);
                    if (_this._addExp)
                        mg.alertManager.tip(Language.J_DZJYZJ + _this._addExp);
                    GameModels.smithy.requestCreateSmithyTask();
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelSmithy.prototype, "shenBingIdList", {
            get: function () {
                var templatesA = Templates.getList(templates.Map.SHENBINGSHOP);
                var templatesA1 = [];
                for (var i = 0; i < templatesA.length; i++) {
                    if (!templatesA[i].condition || this._shenBingIdList.indexOf(templatesA[i].condition) != -1) {
                        templatesA1.push(templatesA[i]);
                    }
                }
                return templatesA1;
            },
            enumerable: true,
            configurable: true
        });
        ModelSmithy.prototype.requestSmithyGetShenBingList = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Smithy_GetShenBingList);
            this.request(n.MessageMap.C2G_SMITHY_GETSHENBINGLIST, msg, utils.Handler.create(this, function (data) {
                _this._shenBingIdList = [];
                _this._shenBingIdList = data.ShenBingIdList.concat();
                if (complete)
                    complete.runWith(data);
            }));
        };
        //兑换神兵
        ModelSmithy.prototype.requestSmithyBuyShenBingItem = function (storeRefId, complete) {
            var msg = n.MessagePool.from(n.C2G_Smithy_BuyShenBingItem);
            msg.StoreRefId = storeRefId;
            this.request(n.MessageMap.C2G_SMITHY_BUYSHENBINGITEM, msg, utils.Handler.create(this, function (data) {
                if (data.Result > 0) {
                    if (complete)
                        complete.runWith(data);
                }
            }));
        };
        ModelSmithy.prototype.getSmithyBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(712002, order);
        };
        Object.defineProperty(ModelSmithy.prototype, "smithyBuyMaxNum", {
            //购买上限值
            get: function () {
                var initValue = 0;
                var templateDataSetting = GameModels.dataSet.getDataSettingById(712001);
                if (templateDataSetting) {
                    if (templateDataSetting.value) {
                        initValue = parseInt(templateDataSetting.value);
                    }
                }
                if (GameModels.user.player.vip > 0) {
                    var vipTemp = GameModels.vip.vipTemplateById(GameModels.user.player.vip);
                    if (vipTemp)
                        return initValue + vipTemp.sbBuyTimes;
                }
                else {
                    return initValue;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmithy.prototype, "smithyRefreshNum", {
            //第二天刷新值
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(711001);
                if (templateDataSetting) {
                    return parseInt(templateDataSetting.value);
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ModelSmithy.UPDATA_SMITHY_TASK_INFO = "UPDATA_SMITHY_TASK_INFO";
        ModelSmithy.UPDATA_SMITHY_INFO = "UPDATA_SMITHY_INFO";
        return ModelSmithy;
    }(mo.ModelBase));
    mo.ModelSmithy = ModelSmithy;
    __reflect(ModelSmithy.prototype, "mo.ModelSmithy");
})(mo || (mo = {}));
