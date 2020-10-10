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
    var ModelLegion = (function (_super) {
        __extends(ModelLegion, _super);
        function ModelLegion() {
            var _this = _super.call(this) || this;
            /**我的阵营成员列表 */
            _this._curPageId = 0;
            _this._maxPage = 0;
            _this._newRedBag = false;
            /**远征逻辑 */
            _this._curSelectMode = 0;
            _this._startStep = 0;
            _this._currStep = 0;
            _this._leftTime = 0;
            /**阵营求助 */
            _this._leftSupportCount = 0;
            return _this;
        }
        ModelLegion.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._legionListDataVo = [];
            this._currSegment = 0;
            this._totalSegments = 1;
            this._unionName = "";
            this._legionPrestige = 0;
            this._legionFightPower = "0";
            this._legionLv = 1;
            this._leftDontaCount = 0;
            this._donateYuanbao = 0;
            this._isOpenWuGuanView = false;
            this._isOpenYuZhengView = false;
            this._redBagList = [];
            this._recordRedBagList = [];
            this._refreshTime = 0;
            this._isOpenBuyView = false;
            this._firstRewardFlag = 0;
            n.net.onRoute(n.MessageMap.G2C_UNION_LV_CHANGE, utils.Handler.create(this, this.updataLegionLv, null, false)); //监听声望和等级
            n.net.onRoute(n.MessageMap.NOTIFYNEWREDBAG, utils.Handler.create(this, this.upDataRedBag, null, false)); //监听红包
            if (GameModels.user.player.legionId)
                this.updateMiliary();
            if (GameModels.user.player.legionId)
                this.myLegionInfo();
            if (GameModels.user.player.legionId)
                this.getLegionRedBagInfo();
            if (GameModels.user.player.legionId)
                this.requestExpeditionInfo(0);
        };
        Object.defineProperty(ModelLegion.prototype, "isOpenWuGuanView", {
            get: function () {
                return this._isOpenWuGuanView;
            },
            set: function (v) {
                this._isOpenWuGuanView = true;
                GameModels.state.updateState(GameRedState.GUANZHI_WUGUAN);
                GameModels.state.updateState(GameRedState.GUANZHI1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "isOpenYuanZhengView", {
            get: function () {
                return this._isOpenYuZhengView;
            },
            set: function (v) {
                this._isOpenYuZhengView = true;
                GameModels.state.updateState(GameRedState.PETWANFA_YUANZHENG);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "isOpenBingFenSanLuView", {
            get: function () {
                return this._isOpenBingFenSanLuView;
            },
            set: function (v) {
                this._isOpenBingFenSanLuView = true;
                GameModels.state.updateState(GameRedState.PETWANFA_BINGFENSANLU);
            },
            enumerable: true,
            configurable: true
        });
        ModelLegion.prototype.updataLegionLv = function (data) {
            this._legionLv = data.UnionLv;
            this._legionPrestige = data.Prestige;
            this.dispatchEventWith(ModelLegion.CHANGE_UNIONLV);
        };
        /**初始化阵营列表数据 */
        ModelLegion.prototype.legionListData = function (array) {
            this._legionListDataVo = [];
            for (var i = 0; i < array.length; i++) {
                var legionVO = vo.fromPool(vo.LegionVo);
                legionVO.decode(array[i]);
                this._legionListDataVo.push(legionVO);
            }
        };
        Object.defineProperty(ModelLegion.prototype, "legionListDataVo", {
            /**获得阵营列表数据 */
            get: function () {
                this._legionListDataVo.sort(function (a, b) {
                    return a.legionId - b.legionId;
                });
                return this._legionListDataVo;
            },
            enumerable: true,
            configurable: true
        });
        ModelLegion.prototype.getLegionListCount = function (isMax) {
            var num = [];
            this._legionListDataVo.sort(function (a, b) {
                return a.memberCount - b.memberCount;
            });
            for (var i = 0; i < this._legionListDataVo.length; i++) {
                num.push(this._legionListDataVo[i].memberCount);
            }
            if (isMax) {
                return num[this._legionListDataVo.length - 1];
            }
            return num[0];
        };
        /**初始化我的阵营数据 */
        ModelLegion.prototype.myLegionMembers = function (data) {
            // this._totalSegments = data.TotalSegments;
            this._unionName = data.UnionName;
            this._unionId = data.UnionId;
            this._legionPrestige = data.Prestige;
            this._legionLv = data.UnionLv;
            this._legionFightPower = data.FightPower;
            this._leftDontaCount = data.LeftFreeDonateCnt;
            this._donateYuanbao = data.DonateYuanbao;
        };
        /**清理我阵营列表数据 */
        ModelLegion.prototype.clearMyLegionMenbers = function () {
        };
        Object.defineProperty(ModelLegion.prototype, "currSegment", {
            get: function () {
                return this._currSegment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "totalSegments", {
            get: function () {
                return this._totalSegments;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "unionName", {
            get: function () {
                return this._unionName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "unionId", {
            get: function () {
                return this._unionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "leftDontaCount", {
            get: function () {
                return this._leftDontaCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "donateYuanbao", {
            get: function () {
                return this._donateYuanbao;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "legionLevel", {
            get: function () {
                return this._legionLv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "EnemyInfo", {
            get: function () {
                return this._EnemyInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "TopThreeList", {
            get: function () {
                if (this._TopThreeList) {
                    this._TopThreeList.sort(function (a, b) {
                        return a.Step - b.Step;
                    });
                }
                return this._TopThreeList;
            },
            enumerable: true,
            configurable: true
        });
        ModelLegion.prototype.canLingQuFengLu = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.legionList))
                return false;
            if (GameModels.user.player.wuguanLevel > 3 && !this.isOpenWuGuanView)
                return true;
            if (this._LastStep > 0)
                return true;
            if (this._firstRewardFlag == 1)
                return true;
            return false;
        };
        ModelLegion.prototype.canMoBai = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.legionList))
                return false;
            if (!this._TopThreeList)
                return false;
            if (this._LastStep > 0)
                return true;
            if (this._TopThreeList) {
                for (var i = 0; i < this._TopThreeList.length; i++) {
                    if (this._TopThreeList[i].CanWorship != 0)
                        return true;
                }
            }
            return false;
        };
        ModelLegion.prototype.canJunXian = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (GameModels.legion.leftDontaCount > 0 || GameModels.bag.getItemCountById(ConfigData.UNION_ITEM) > 0)
                return true;
            return false;
        };
        Object.defineProperty(ModelLegion.prototype, "SelfInfo", {
            get: function () {
                return this._SelfInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "LastStep", {
            get: function () {
                return this._LastStep;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "legionPrestige", {
            get: function () {
                return this._legionPrestige;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "legionFightPower", {
            get: function () {
                return this._legionFightPower;
            },
            enumerable: true,
            configurable: true
        });
        ModelLegion.prototype.setlegionFightPower = function (str) {
            this._legionFightPower = str;
            this.dispatchEventWith(ModelLegion.CHANGE_FIGTHPOWER);
        };
        Object.defineProperty(ModelLegion.prototype, "legionTatolPrestige", {
            get: function () {
                var tem = Templates.getTemplateById(templates.Map.LEGION, this._legionLv);
                return tem.upGrade;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "vipDonateCount", {
            get: function () {
                var count = 1;
                if (GameModels.user.player.vip > 0) {
                    var vipTemp = GameModels.vip.vipTemplateById(GameModels.user.player.vip);
                    if (vipTemp)
                        return count + vipTemp.freeExtraDonateCnt;
                }
                else {
                    return count;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "vipYuanBaoDonateLimit", {
            get: function () {
                var count = 0;
                if (GameModels.user.player.vip > 0) {
                    var vipTemp = GameModels.vip.vipTemplateById(GameModels.user.player.vip);
                    if (vipTemp)
                        return count + vipTemp.yuanbaoDonateLimit;
                }
                else {
                    return count;
                }
            },
            enumerable: true,
            configurable: true
        });
        /***
         * 阵营有关的协议
         */
        /**阵营列表 */
        ModelLegion.prototype.getLegionList = function (segment, complte) {
            var msg = n.MessagePool.from(n.C2G_Union_UnionList);
            // msg.Segment = segment;
            this.request(n.MessageMap.C2G_UNION_UNIONLIST, msg, utils.Handler.create(this, function (data) {
                this.legionListData(data.Unions);
                if (complte)
                    complte.run();
            }));
            // n.net.onError(n.MessageMap.C2G_UNION_UNIONLIST, utils.Handler.create(this, function (data: n.ResultEvent) {
            // 	mg.alertManager.tip(data.CodeMsg);
            // }));
        };
        /**加入阵营 */
        ModelLegion.prototype.joinLegion = function (unionid, complte) {
            var msg = n.MessagePool.from(n.C2G_Union_JoinUnion);
            msg.UnionId = unionid;
            this.request(n.MessageMap.C2G_UNION_JOINUNION, msg, utils.Handler.create(this, function (data) {
                if (data.Joined == 1) {
                    GameModels.user.player.legionId = data.UnionId == 0 ? "" : data.UnionId.toString();
                    mg.alertManager.tip(Language.J_JRJTCG);
                    this.getLegionRedBagInfo();
                    if (complte)
                        complte.run();
                }
            }));
            // n.net.onError(n.MessageMap.C2G_UNION_JOINUNION, utils.Handler.create(this, function (data: n.ResultEvent) {
            // 	mg.alertManager.tip(data.CodeMsg);
            // }));
        };
        /**阵营动态*/
        ModelLegion.prototype.getLegionDynamicInfo = function (complte) {
            this.request(n.MessageMap.C2G_UNION_GETUNIONLOG, n.MessagePool.from(n.C2G_Union_GetUnionLog), complte);
        };
        /**我的阵营信息 */
        ModelLegion.prototype.myLegionInfo = function (segment, complte) {
            var msg = n.MessagePool.from(n.C2G_Union_MyUnion);
            // msg.Segment = segment
            this.request(n.MessageMap.C2G_UNION_MYUNION, msg, utils.Handler.create(this, function (data) {
                GameModels.user.player.legionId = data.UnionId == 0 ? "" : data.UnionId.toString();
                this.myLegionMembers(data);
                if (complte)
                    complte.run();
            }));
            // n.net.onError(n.MessageMap.C2G_UNION_MYUNION, utils.Handler.create(this, function (data: n.ResultEvent) {
            // 	mg.alertManager.tip(data.CodeMsg);
            // }));
        };
        ModelLegion.prototype.legionNumberListData = function (array) {
            this._legionNumberListDataVo = [];
            for (var i = 0; i < array.length; i++) {
                var legionVO = vo.fromPool(vo.LegionNumberListVO, array[i]);
                this._legionNumberListDataVo.push(legionVO);
            }
        };
        ModelLegion.prototype.myLegionNumberList = function (segment, complte) {
            var msg = n.MessagePool.from(n.C2G_Union_GetMemberList);
            msg.PageId = segment;
            this.request(n.MessageMap.C2G_UNION_GETMEMBERLIST, msg, utils.Handler.create(this, function (data) {
                this._curPageId = data.CurPageId;
                this._maxPage = data.MaxPage;
                this.legionNumberListData(data.MemberList);
                if (complte)
                    complte.run();
            }));
        };
        Object.defineProperty(ModelLegion.prototype, "curPageId", {
            get: function () {
                return this._curPageId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "maxPage", {
            get: function () {
                return this._maxPage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "legionNumberListDataVo", {
            get: function () {
                return this._legionNumberListDataVo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "firstRewardFlag", {
            get: function () {
                return this._firstRewardFlag;
            },
            set: function (v) {
                this._firstRewardFlag = v;
            },
            enumerable: true,
            configurable: true
        });
        //武官信息处理
        ModelLegion.prototype.updateMiliary = function (complete) {
            var msg = n.MessagePool.from(n.C2G_UnionWuGuan_GetInfo);
            this.request(n.MessageMap.C2G_UNIONWUGUAN_GETINFO, msg, utils.Handler.create(this, function (data) {
                if (this._TopThreeList && this._TopThreeList.length) {
                    for (var i = 0; i < this._TopThreeList.length; i++) {
                        vo.toPool(this._TopThreeList[i]);
                        this._TopThreeList[i] = null;
                    }
                    this._TopThreeList.length = 0;
                }
                else {
                    this._TopThreeList = [];
                }
                this._EnemyInfo = data.EnemyInfo;
                this._firstRewardFlag = data.FirstRewardFlag;
                for (var i = 0; i < data.TopThreeList.length; i++) {
                    data.TopThreeList[i].autoRecover = false;
                    this._TopThreeList.push(data.TopThreeList[i]);
                }
                this._TopThreeList.sort(function (a, b) {
                    if (a.Step > b.Step) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                });
                this._SelfInfo = data.SelfInfo;
                this._LastStep = data.LastStep;
                GameModels.state.updateState(GameRedState.UNION_RICHANG_MOBAI);
                GameModels.state.updateState(GameRedState.UNION_RICHANG_ZHANQI);
                GameModels.state.updateState(GameRedState.UNION_RICHANG_WUGUAN);
                GameModels.state.updateState(GameRedState.GUANZHI_WUGUAN);
                GameModels.state.updateState(GameRedState.GUANZHI1);
                GameModels.state.updateState(GameRedState.UNION_RICHANG);
                GameModels.state.updateState(GameRedState.UNION_FULI_TEHUI_LINGQU);
                GameModels.state.updateState(GameRedState.PETWANFA_YUANZHENG);
                this.dispatchEventWith(mo.ModelLegion.UNION_FIRSTGIFT);
                if (complete) {
                    complete.run();
                }
            }));
        };
        //更新可挑战的人
        ModelLegion.prototype.updateEnemy = function (complete) {
            var msg = n.MessagePool.from(n.C2G_UnionWuGuan_RefreshEnemy);
            this.request(n.MessageMap.C2G_UNIONWUGUAN_REFRESHENEMY, msg, utils.Handler.create(this, function (data) {
                this._EnemyInfo = data.EnemyInfo;
                if (complete) {
                    complete.run();
                }
            }));
        };
        //获得职位俸禄
        ModelLegion.prototype.getReword = function (complete) {
            var msg = n.MessagePool.from(n.C2G_UnionWuGuan_GetStepReward);
            GameModels.legion.request(n.MessageMap.C2G_UNIONWUGUAN_GETSTEPREWARD, msg, utils.Handler.create(this, function (data) {
                this._LastStep = 0;
                mg.alertManager.showAlert(SalaryGiftAlert, false, true, data.Step);
                GameModels.state.updateState(GameRedState.UNION_RICHANG_WUGUAN);
                GameModels.state.updateState(GameRedState.GUANZHI_WUGUAN);
                GameModels.state.updateState(GameRedState.GUANZHI1);
                GameModels.state.updateState(GameRedState.UNION_RICHANG);
                this.dispatchEventWith(mo.ModelLegion.CHANGE_UNION_FENGLU);
            }));
        };
        ModelLegion.prototype.getdonate = function (type, num, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Union_Donate);
            msg.Type = type;
            msg.Count = num;
            GameModels.legion.request(n.MessageMap.C2G_UNION_DONATE, msg, utils.Handler.create(this, function (data) {
                _this._legionLv = data.UnionLv;
                _this._legionPrestige = data.Prestige;
                _this._leftDontaCount = data.LeftDonateTime;
                _this._donateYuanbao = data.DonateYuanbao;
                _this.dispatchEventWith(ModelLegion.CHANGE_UNIONLV);
                GameModels.state.updateState(GameRedState.UNION_RICHANG_ZHANQI);
                GameModels.state.updateState(GameRedState.UNION_RICHANG);
                if (complete) {
                    complete.run();
                }
            }));
        };
        ModelLegion.prototype.Worship = function (step, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_UnionWuGuan_Worship);
            msg.Step = step;
            GameModels.legion.request(n.MessageMap.C2G_UNIONWUGUAN_WORSHIP, msg, utils.Handler.create(this, function (data) {
                for (var i = 0; i < _this._TopThreeList.length; i++) {
                    if (_this._TopThreeList[i].Step == data.Step) {
                        _this._TopThreeList[i].CanWorship = 0;
                    }
                }
                GameModels.state.updateState(GameRedState.UNION_RICHANG_MOBAI);
                GameModels.state.updateState(GameRedState.UNION_RICHANG);
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelLegion.prototype.Banners = function (vaule, complete) {
            var msg = n.MessagePool.from(n.C2G_UnionDonate_GetRankList);
            msg.GetCount = vaule;
            GameModels.legion.request(n.MessageMap.C2G_UNIONDONATE_GETRANKLIST, msg, utils.Handler.create(this, function (data) {
                if (complete)
                    complete.runWith(data);
            }));
        };
        /////阵营特惠
        ModelLegion.prototype.getLegionRedBagInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Union_GetRedBagInfo);
            this.request(n.MessageMap.C2G_UNION_GETREDBAGINFO, msg, utils.Handler.create(this, function (data) {
                for (var i = 0; i < _this._redBagList.length; i++) {
                    n.MessagePool.to(_this._redBagList[i]);
                }
                _this._redBagList.length = 0;
                for (var i = 0; i < _this._recordRedBagList.length; i++) {
                    n.MessagePool.to(_this._recordRedBagList[i]);
                }
                _this._recordRedBagList.length = 0;
                for (var j = 0; j < data.RedBagList.length; j++) {
                    data.RedBagList[j].autoRecover = false;
                    _this._redBagList.push(data.RedBagList[j]);
                }
                for (var j = 0; j < data.RecordList.length; j++) {
                    data.RecordList[j].autoRecover = false;
                    _this._recordRedBagList.push(data.RecordList[j]);
                }
                GameModels.state.updateState(GameRedState.UNION_FULI_TEHUI_LINGQU);
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelLegion.prototype.getRedBagReward = function (id, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Union_GetRedBagReward);
            msg.Id = id;
            this.request(n.MessageMap.C2G_UNION_GETREDBAGREWARD, msg, utils.Handler.create(this, function (data) {
                for (var i = 0; i < _this._redBagList.length; i++) {
                    n.MessagePool.to(_this._redBagList[i]);
                }
                _this._redBagList.length = 0;
                for (var i = 0; i < _this._recordRedBagList.length; i++) {
                    n.MessagePool.to(_this._recordRedBagList[i]);
                }
                _this._recordRedBagList.length = 0;
                for (var j = 0; j < data.RedBagList.length; j++) {
                    data.RedBagList[j].autoRecover = false;
                    _this._redBagList.push(data.RedBagList[j]);
                }
                for (var j = 0; j < data.RecordList.length; j++) {
                    data.RecordList[j].autoRecover = false;
                    _this._recordRedBagList.push(data.RecordList[j]);
                }
                if (data.RewardStr) {
                    var strArr = data.RewardStr.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, strArr);
                }
                GameModels.state.updateState(GameRedState.UNION_FULI_TEHUI_LINGQU);
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelLegion.prototype, "redBagList", {
            get: function () {
                return this._redBagList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "recordRedBagList", {
            get: function () {
                return this._recordRedBagList;
            },
            enumerable: true,
            configurable: true
        });
        ModelLegion.prototype.getRedBagTypeBuyId = function (id) {
            var count = 0;
            switch (id) {
                case 861001:
                    count = 30;
                    break;
                case 862001:
                    count = 128;
                    break;
                case 863001:
                    count = 448;
                    break;
                case 864001:
                    count = 500;
                    break;
            }
            return count;
        };
        Object.defineProperty(ModelLegion.prototype, "refreshTime", {
            get: function () {
                return this._refreshTime;
            },
            set: function (v) {
                this._refreshTime = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "isOpenBuyView", {
            /**是否打开特惠购买界面 */
            get: function () {
                return this._isOpenBuyView;
            },
            set: function (value) {
                this._isOpenBuyView = value;
                GameModels.state.updateState(GameRedState.UNION_FULI_TEHUI_GOUMAI);
            },
            enumerable: true,
            configurable: true
        });
        ModelLegion.prototype.checkTeHuiGouMaiRedPoint = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.legionBuy))
                return false;
            var actVo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.zyyb);
            if (actVo && actVo.actRewardListVO[0].getTimes <= 0 && !this._isOpenBuyView)
                return true;
        };
        ModelLegion.prototype.checkTeHuiRedPoint = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.legionBuy))
                return false;
            if (this._redBagList && this._redBagList.length > 0)
                return true;
        };
        ModelLegion.prototype.upDataRedBag = function (data) {
            this.newRedBag = true;
        };
        Object.defineProperty(ModelLegion.prototype, "newRedBag", {
            get: function () {
                return this._newRedBag;
            },
            set: function (v) {
                this._newRedBag = v;
                this.dispatchEventWith(ModelLegion.NEW_UNION_REDBAG);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "curSelectMode", {
            get: function () {
                return this._curSelectMode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "startStep", {
            get: function () {
                return this._startStep;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "currStep", {
            get: function () {
                return this._currStep;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "leftTime", {
            get: function () {
                return this._leftTime;
            },
            enumerable: true,
            configurable: true
        });
        ModelLegion.prototype.requestExpeditionInfo = function (modeType, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Expedition_GetInfo);
            msg.ModeType = modeType;
            this.request(n.MessageMap.C2G_EXPEDITION_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this._curSelectMode = data.CurSelectMode;
                _this._startStep = data.StartStep;
                _this._currStep = data.CurrStep;
                _this._leftTime = data.LeftTime;
                _this.dispatchEventWith(mo.ModelLegion.UPDATA_PETWANFAMAIN_VIEW);
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelLegion.prototype.checkYuanZhengRedPoint = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.yuanzheng))
                return false;
            if (!this.isOpenYuanZhengView && this._curSelectMode >= 0 && (this._currStep - this._startStep < 20))
                return true;
            return false;
        };
        ModelLegion.prototype.checkBingFenSanLuRedPoint = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.bingfensanlu))
                return false;
            if (!this.isOpenBingFenSanLuView)
                return true;
            return false;
        };
        Object.defineProperty(ModelLegion.prototype, "leftSupportCount", {
            get: function () {
                return this._leftSupportCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "monsterData", {
            get: function () {
                return this._monsterData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelLegion.prototype, "nowPlayerData", {
            get: function () {
                return this._nowPlayerData;
            },
            enumerable: true,
            configurable: true
        });
        ModelLegion.prototype.requestExpeditionChapterInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Expedition_GetChapterInfo);
            this.request(n.MessageMap.C2G_EXPEDITION_GETCHAPTERINFO, msg, utils.Handler.create(this, function (data) {
                if (_this._nowPlayerData) {
                    n.MessagePool.to(_this._nowPlayerData);
                    _this._nowPlayerData = null;
                }
                _this._nowPlayerData = data;
                _this._nowPlayerData.autoRecover = false;
                _this._monsterData = _this._nowPlayerData.EnemyInfo;
                _this._selfData = _this._nowPlayerData.MyInfo;
                _this._leftSupportCount = _this._nowPlayerData.LeftCount;
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelLegion.prototype.requestExpeditionQuickPass = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Expedition_QuickPass);
            this.request(n.MessageMap.C2G_EXPEDITION_QUICKPASS, msg, utils.Handler.create(this, function (data) {
                if (data.RewardStr) {
                    var rewardArr = data.RewardStr.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                }
                if (complete)
                    complete.runWith(data);
                _this.dispatchEventWith(mo.ModelLegion.UNION_QUICKPASS);
            }));
        };
        ModelLegion.prototype.hashSelfDataHp = function (uid) {
            if (this._selfData) {
                for (var i = 0; i < this._selfData.List.length; i++) {
                    if (this._selfData.List[i] && this._selfData.List[i].PetId == uid) {
                        return this._selfData.List[i].HPRate;
                    }
                }
            }
            return -1;
        };
        //领取大将军礼包C2G_UnionWuGuan_GetFirstReward
        ModelLegion.prototype.requestWuGuanGetFirstReward = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_UnionWuGuan_GetFirstReward);
            this.request(n.MessageMap.C2G_UNIONWUGUAN_GETFIRSTREWARD, msg, utils.Handler.create(this, function (data) {
                if (data.Succ == 1) {
                    _this.updateMiliary();
                    mg.alertManager.tip(Language.C_LQCG);
                    if (complete)
                        complete.runWith(data);
                }
            }));
        };
        ModelLegion.CHANGE_UNIONLV = "CHANGE_UNIONLV";
        ModelLegion.CHANGE_FIGTHPOWER = "CHANGE_FIGTHPOWER";
        ModelLegion.CHANGE_UNION_FENGLU = "CHANGE_UNION_FENGLU";
        ModelLegion.NEW_UNION_REDBAG = "CHANGE_UNION_REDBAG"; //阵营红包
        ModelLegion.UNION_FIRSTGIFT = "UNION_FIRSTGIFT"; //大将军礼包
        ModelLegion.UNION_QUICKPASS = "UNION_QUICKPASS"; //扫荡
        ModelLegion.UPDATA_PETWANFAMAIN_VIEW = "UPDATA_PETWANFAMAIN_VIEW";
        return ModelLegion;
    }(mo.ModelBase));
    mo.ModelLegion = ModelLegion;
    __reflect(ModelLegion.prototype, "mo.ModelLegion");
})(mo || (mo = {}));
