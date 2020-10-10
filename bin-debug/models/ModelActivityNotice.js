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
    var ModelActivityNotice = (function (_super) {
        __extends(ModelActivityNotice, _super);
        function ModelActivityNotice() {
            var _this = _super.call(this) || this;
            /**自己的车轮战活动Id */
            _this._selfcampBattleActivityId = [];
            return _this;
        }
        ModelActivityNotice.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._openActivityIds = [];
            this._statusList = [];
            n.net.onRoute(n.MessageMap.G2C_SA_NOTIFYACTIVITYSTATUE, utils.Handler.create(this, this.net_onRouteComplete, null, false));
        };
        ModelActivityNotice.prototype.requestActivityStatus = function () {
            if (!this._tatusMsg)
                this._tatusMsg = new n.C2G_SA_GetSceneActivityStatus();
            this.request(n.MessageMap.C2G_SA_GETSCENEACTIVITYSTATUS, this._tatusMsg, utils.Handler.create(this, this.onGetSceneActivityStatus));
        };
        ModelActivityNotice.prototype.net_onRouteComplete = function (data) {
            if (this._statusList) {
                for (var _i = 0, _a = this._statusList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    n.MessagePool.to(item);
                }
                this._statusList.length = 0;
            }
            this._statusList = data.StatusList.concat();
            for (var _b = 0, _c = this._statusList; _b < _c.length; _b++) {
                var item = _c[_b];
                item.autoRecover = false;
            }
            this.initNotice();
        };
        ModelActivityNotice.prototype.onGetSceneActivityStatus = function (data) {
            if (this._statusList) {
                for (var _i = 0, _a = this._statusList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    n.MessagePool.to(item);
                }
                this._statusList.length = 0;
            }
            this._statusList = data.StatusList.concat();
            for (var _b = 0, _c = this._statusList; _b < _c.length; _b++) {
                var item = _c[_b];
                item.autoRecover = false;
            }
            this.initNotice();
        };
        Object.defineProperty(ModelActivityNotice.prototype, "selfcampBattleActivityId", {
            get: function () {
                return this._selfcampBattleActivityId;
            },
            set: function (v) {
                this._selfcampBattleActivityId = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "isEndselfcampBattle", {
            /**
             * 	obj.activityId = data.ActivityId;
                obj.state = data.ActivityStatus;
                obj.endTime = data.LeftTime * 1000 + GameModels.timer.getTimer();
             */
            get: function () {
                if (this._selfcampBattleActivityId.length <= 0)
                    return true;
                for (var i = 0; i < this._selfcampBattleActivityId.length; i++) {
                    if (this.getOpenActivityIdData(this._selfcampBattleActivityId[i]).state != 3) {
                        return false;
                    }
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "selfcampBattleBegian", {
            get: function () {
                if (this._selfcampBattleActivityId.length <= 0)
                    return false;
                for (var i = 0; i < this._selfcampBattleActivityId.length; i++) {
                    if (this.getOpenActivityIdData(this._selfcampBattleActivityId[i]).state == 2) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "endLongselfcampBattleTime", {
            get: function () {
                if (this._selfcampBattleActivityId.length <= 0)
                    return 0;
                var time = 0;
                for (var i = 0; i < this._selfcampBattleActivityId.length; i++) {
                    if (this.getOpenActivityIdData(this._selfcampBattleActivityId[i]).endTime > time) {
                        time = this.getOpenActivityIdData(this._selfcampBattleActivityId[i]).endTime;
                    }
                }
                return (time - GameModels.timer.getTimer()) / 1000;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "endSamllselfcampBattleTime", {
            get: function () {
                if (this._selfcampBattleActivityId.length <= 0)
                    return 0;
                var time = GameModels.campBattle.getopenTime(this._selfcampBattleActivityId[0]);
                var id = 0;
                for (var i = 0; i < this._selfcampBattleActivityId.length; i++) {
                    if (this.getOpenActivityIdData(this._selfcampBattleActivityId[i]).endTime < time) {
                        time = GameModels.campBattle.getopenTime(this._selfcampBattleActivityId[i]);
                    }
                }
                return time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "statusList", {
            get: function () {
                return this._statusList;
            },
            enumerable: true,
            configurable: true
        });
        ModelActivityNotice.prototype.initNotice = function () {
            this._openActivityIds = [];
            this._selfcampBattleActivityId = [];
            this._curActivityId = 0;
            this._curActivityState = 0;
            this._curActivityEndTime = 0;
            this._curActivityTemplate = null;
            if (this._statusList.length > 0) {
                for (var _i = 0, _a = this._statusList; _i < _a.length; _i++) {
                    var data = _a[_i];
                    var obj = {};
                    obj.activityId = data.ActivityId;
                    obj.state = data.ActivityStatus;
                    obj.endTime = data.LeftTime * 1000 + GameModels.timer.getTimer();
                    this._openActivityIds.push(obj);
                    if (obj.activityId == mo.ModelActivityNotice.YIZHULAIXI)
                        continue;
                    if (obj.state != 3 && obj.activityId != 201) {
                        this._curActivityId = obj.activityId;
                        this._curActivityState = obj.state;
                        this._curActivityEndTime = obj.endTime;
                        this._curActivityTemplate = Templates.getTemplateById(templates.Map.SCENEACTIVITY, this._curActivityId);
                        if (ModelActivityNotice.topBattleId.indexOf(this._curActivityId) != -1) {
                            GameModels.topBattle.initTopBattleInfo();
                        }
                    }
                    if (ModelActivityNotice.campBattleId.indexOf(data.ActivityId) != -1) {
                        var act = GameModels.campBattle.campBattleIdList;
                        if (act.length > 0 && act.indexOf(data.ActivityId) != -1) {
                            this._selfcampBattleActivityId.push(data.ActivityId);
                        }
                    }
                }
            }
            this.closeActivity();
            this.dispatchEventWith(ModelActivityNotice.ACTIVITY_NOTICE_UPDATA);
            GameModels.state.updateState(GameRedState.XIANSHI_WUSHUANG);
            GameModels.state.updateState(GameRedState.XIANSHI_WANGZHE);
            GameModels.state.updateState(GameRedState.CITY);
            GameModels.state.updateState(GameRedState.XIANSHI_SANGUO);
            GameModels.state.updateState(GameRedState.MAIN_UNION_WANFA_CAMPBATTLE);
        };
        ModelActivityNotice.prototype.closeActivity = function () {
            var actData = this.getOpenActivityIdData(ModelActivityNotice.LEGION_WAR);
            if (app.gameContext.gameCurrent && app.gameContext.gameCurrent.type == TypeGame.LEGION_WAR && actData && actData.state == ModelActivityNotice.STATE_END) {
                app.gameContext.exitToMainGame();
                utils.timer.once(3000, this, function () {
                    GameModels.sceneLegin.requestWarInfo(this, function () {
                        mg.uiManager.show(dialog.battlefield.BattlefieldRank, true);
                    });
                });
            }
        };
        ModelActivityNotice.prototype.getOpenActivityIdData = function (activityId) {
            for (var _i = 0, _a = this._openActivityIds; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.activityId == activityId)
                    return item;
            }
            return null;
        };
        Object.defineProperty(ModelActivityNotice.prototype, "curActivityId", {
            /**当前活动Id */
            get: function () {
                return this._curActivityId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "curActivityTemplate", {
            /**当前活动配置 */
            get: function () {
                return this._curActivityTemplate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "curActivityState", {
            /**当前活动状态 */
            get: function () {
                return this._curActivityState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "curActivityLastTime", {
            /**当前活动剩余时间 秒*/
            get: function () {
                return (this._curActivityEndTime - GameModels.timer.getTimer()) / 1000;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "curActivityEndTime", {
            get: function () {
                return (this._curActivityEndTime) / 1000;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "hasCurActivityTime", {
            /**当前活动是否还有剩余时间 */
            get: function () {
                return this.curActivityLastTime > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelActivityNotice.prototype, "isCampBattleAcvitive", {
            get: function () {
                return this._curActivityId == 801 || this._curActivityId == 802 || this._curActivityId == 803;
            },
            enumerable: true,
            configurable: true
        });
        ModelActivityNotice.prototype.checkLeginWarHed = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (GameModels.serverTime.getSeason() != 2)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.battlefieldMain))
                return false;
            var actData = this.getOpenActivityIdData(ModelActivityNotice.LEGION_WAR);
            return (actData != null && actData.state == 2);
        };
        ModelActivityNotice.prototype.checkCampBattleHed = function () {
            if (!GameModels.user.player.legionId)
                return false;
            if (GameModels.serverTime.getSeason() != 1)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.campBattleMain))
                return false;
            if (this._selfcampBattleActivityId.length <= 0)
                return false;
            if (GameModels.campBattle.canJoin && !GameModels.campBattle.isCampBattleView)
                return true;
            if (GameModels.campBattle.isCampBattleView)
                return false;
            for (var i = 0; i < this._selfcampBattleActivityId.length; i++) {
                if (this.getOpenActivityIdData(this._selfcampBattleActivityId[i]).state == 2 || this.getOpenActivityIdData(this._selfcampBattleActivityId[i]).state == 1) {
                    return true;
                }
            }
            return false;
        };
        ModelActivityNotice.prototype.checkKingbattlefieldHed = function () {
            if (GameModels.serverTime.getSeason() != 3)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.kingBattle))
                return false;
            var open = false;
            if (75000 > GameModels.timer.getPastSecond()) {
                open = (this.curActivityId == ModelActivityNotice.KING_BATTLEFIELD) && (this.curActivityState == 2);
            }
            if (!open) {
                var actData = this.getOpenActivityIdData(ModelActivityNotice.WORSHIP_ID);
                open = (actData != null && actData.state == 2);
            }
            if (!open) {
                var actData = this.getOpenActivityIdData(ModelActivityNotice.QIUSHENG_ID);
                open = (actData != null && actData.state == 2);
            }
            return open;
        };
        ModelActivityNotice.ACTIVITY_NOTICE_UPDATA = "ACTIVITY_NOTICE_UPDATA";
        ModelActivityNotice.LEGION_WAR = 101; //阵营战
        ModelActivityNotice.YIZHULAIXI = 501; //异族来袭
        ModelActivityNotice.KING_BATTLEFIELD = 301; //王之疆场
        ModelActivityNotice.WORSHIP_ID = 401; //城主膜拜
        ModelActivityNotice.KINGUNION_ID = 601; //王之阵营战
        ModelActivityNotice.QIUSHENG_ID = 701; //绝地求生
        ModelActivityNotice.CAMPBATTLE_ID1 = 801; //吞食天地——魏蜀
        ModelActivityNotice.CAMPBATTLE_ID2 = 802; //吞食天地——蜀吴
        ModelActivityNotice.CAMPBATTLE_ID3 = 803; //吞食天地——吴魏
        ModelActivityNotice.DIANFENGSAI = 1101; //巅峰赛第一场
        ModelActivityNotice.STATE_PRE = 1; //1.预告
        ModelActivityNotice.STATE_START = 2; //2.开始
        ModelActivityNotice.STATE_END = 3; //3.结束
        ModelActivityNotice.campBattleId = [801, 802, 803];
        ModelActivityNotice.topBattleId = [1101, 1102, 1103, 1201, 1202, 1203, 1204];
        return ModelActivityNotice;
    }(mo.ModelBase));
    mo.ModelActivityNotice = ModelActivityNotice;
    __reflect(ModelActivityNotice.prototype, "mo.ModelActivityNotice");
})(mo || (mo = {}));
