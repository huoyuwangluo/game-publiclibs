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
    var ModelPlatformActivity = (function (_super) {
        __extends(ModelPlatformActivity, _super);
        function ModelPlatformActivity() {
            var _this = _super.call(this) || this;
            _this._verifyState = false; //认证
            _this._focusState = false; //关注
            _this._todayShareState = 0; //邀请
            _this._shareCountCD = 0; //邀请奖励CD
            _this._Channel = 601;
            _this._yellowDiamondState = 0;
            _this._yellowDiamondLv = 0;
            _this._shoucang = false;
            _this._yearsGiftState = -1;
            _this._downloadGiftState = 1;
            _this._weiduanGiftState = -1;
            _this._firstCReportComplete = false;
            _this._firstHReportComplete = false;
            return _this;
        }
        ModelPlatformActivity.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            if (this.platformOpen()) {
                this.getUesrPlatStateInfo();
                if (platform.sdk && platform.sdk.type == platform.FKYLC) {
                    platform.sdk.showShare(this, this.requesSthare);
                }
                if (platform.sdk && (platform.sdk.type == platform.DJSHPS || platform.sdk.type == platform.DJSHP)) {
                    platform.sdk.setupFocus(this, this.requesFocus);
                    platform.sdk.setupShare(this, this.requesSthare);
                }
                if (platform.sdk && platform.sdk.type == platform.WB) {
                    platform.sdk.setupShare(this, this.requesSthare);
                    GameModels.user.player.onPropertyChange(TypeProperty.Level, this, this.levelChange);
                    this.wanbaShouCangState();
                }
                this.appointment();
            }
            this.onRoute(n.MessageMap.G2C_WANBA_GETHUANGZUANTEQUANSTATE, utils.Handler.create(this, this.getHuangZuanTeQuanState, null, false));
            this.onRoute(n.MessageMap.G2C_WANBA_GETGIFT, utils.Handler.create(this, this.getYellowDiamondGetGift, null, false));
            if (platform.sdk && platform.sdk.type == platform.WB) {
                this.requesYellowDiamondState();
                this.requesYearsGiftState(ModelPlatformActivity.YEARS_GIFT);
            }
            if (platform.sdk && platform.sdk.type == platform.WB && platform.sdk.giftid) {
                this.requesYellowDiamondGetGift(0);
            }
            if (platform.sdk && platform.sdk.type == platform.WB && platform.sdk.giftid && platform.sdk.giftid == 20191) {
                this.getQQKaQuanState(platform.sdk.giftid);
            }
            if (this.btnWeiduanVisible()) {
                this.requesWeiDuanGiftState(ModelPlatformActivity.WEIDUAN_GIFT);
            }
        };
        //预约奖励需求
        ModelPlatformActivity.prototype.appointment = function () {
            if ((GameModels.timer.getTimer() / 1000) > 1536854399) {
                return;
            }
            var channleId = platform.sdk.channleId.toString();
            if (platform.sdk.type == platform.FKYLC) {
                channleId = "hortor";
            }
            if (platform.sdk.type == platform.AWY) {
                channleId = "aiweiyou";
            }
            var url = "https://" + window.config.ip + "/" + window.config.platform
                + "/appointment.php?uid=" + platform.sdk.userId + "&channel=" + channleId + "&playerid=" + platform.sdk.userId
                + "&serverid=" + parseInt(GameModels.login.serverList.selected.sid);
            var loader = new egret.HttpRequest();
            loader.responseType = egret.HttpResponseType.TEXT;
            loader.open(url, egret.HttpMethod.GET);
            loader.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            loader.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            loader.send();
        };
        ModelPlatformActivity.prototype.onGetComplete = function (event) {
        };
        ModelPlatformActivity.prototype.received = function (type) {
            if (this.platformOpen()) {
                switch (type) {
                    case 1:
                        if (platform.sdk.type == platform.DJSHP || platform.sdk.type == platform.DJSHPS || platform.sdk.type == platform.WB) {
                            return false;
                        }
                        else {
                            return this._verifyState;
                        }
                    case 2:
                        if (platform.sdk.type == platform.DJSHP && !platform.sdk.focusbonus) {
                            return false;
                        }
                        if (platform.sdk.type == platform.DJSHPS && !platform.sdk.focusbonus) {
                            return false;
                        }
                        if (platform.sdk.type == platform.FKYLC && !platform.sdk.focusbonus) {
                            return false;
                        }
                        if (platform.sdk.type == platform.WB) {
                            return false;
                        }
                        if (platform.sdk.type == platform.AWY) {
                            return false;
                        }
                        return this._focusState;
                    case 3:
                        if (platform.sdk.type == platform.DJSHP && !platform.sdk.sharebonus) {
                            return false;
                        }
                        if (platform.sdk.type == platform.DJSHPS && !platform.sdk.sharebonus) {
                            return false;
                        }
                        if (platform.sdk.type == platform.WB && !platform.sdk.sharebonus) {
                            return false;
                        }
                        return true;
                    case 4:
                        if (platform.sdk.type == platform.WB && platform.sdk.focusbonus) {
                            return true;
                        }
                        return false;
                    case 5:
                        // logger.log("玩吧平台的pf值", platform.sdk.pf);
                        if (platform.sdk.type == platform.WB && platform.sdk.pf == "wanba_ts.105") {
                            return false;
                        }
                        if (platform.sdk.type == platform.WB && platform.sdk.miniGameVIP) {
                            return true;
                        }
                        return false;
                    case 6:
                        // logger.log("玩吧电竞礼包平台的pf值", platform.sdk.pf);
                        if (platform.sdk.type == platform.WB && (platform.sdk.pf == 'wanba_ts.111' || platform.sdk.pf == 'weixin.112'
                            || (platform.sdk.qua && platform.sdk.qua.app == "QQEGame") || platform.sdk.pf == 'wanba_ts.105'
                            || platform.sdk.via == "H5.QQEGAME.EGAME" || platform.sdk.via == "H5.QQEGAME.QQ")) {
                            return true;
                        }
                        return false;
                    case 7:
                        // logger.log("心悦礼包平台的qua.app值", platform.sdk.qua.app);
                        // logger.log("心悦礼包平台的pf值", platform.sdk.pf);
                        if (platform.sdk.type == platform.WB && (platform.sdk.qua && platform.sdk.qua.app == "xinYueClub" || platform.sdk.wanbachannel == "SQ" || platform.sdk.pf == 'wanba_ts.113' || platform.sdk.pf == 'weixin.114')) {
                            return true;
                        }
                        return false;
                    case 8:
                        if (platform.sdk.type == platform.WB && this._yearsGiftState >= 0) {
                            return true;
                        }
                        return false;
                }
            }
            return false;
        };
        ModelPlatformActivity.prototype.platformOpen = function () {
            if (platform.sdk && (platform.sdk.type == platform.WB || platform.sdk.type == platform.DJSHPS || platform.sdk.type == platform.DJSHP || platform.sdk.type == platform.AWY || platform.sdk.type == platform.FKYLC)) {
                return true;
            }
            return false;
        };
        Object.defineProperty(ModelPlatformActivity.prototype, "todayShareState", {
            get: function () {
                return this._todayShareState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPlatformActivity.prototype, "verifyState", {
            get: function () {
                return this._verifyState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPlatformActivity.prototype, "focusState", {
            get: function () {
                return this._focusState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPlatformActivity.prototype, "shareCountCD", {
            get: function () {
                return this._shareCountCD;
            },
            enumerable: true,
            configurable: true
        });
        ModelPlatformActivity.prototype.showShare = function () {
            platform.sdk.showShare(this, this.requesSthare);
        };
        ModelPlatformActivity.prototype.showFocus = function () {
            platform.sdk.showFocus(this, this.requesFocus);
        };
        ModelPlatformActivity.prototype.verifyIdentity = function () {
            platform.sdk.verifyIdentity(this, this.requesVerify);
        };
        /** 请求平台活动奖励领取信息*/
        ModelPlatformActivity.prototype.getUesrPlatStateInfo = function (complte) {
            var msg = n.MessagePool.from(n.C2G_Get_UserPlatState);
            this.request(n.MessageMap.C2G_GET_USERPLATSTATE, msg, utils.Handler.create(this, function (data) {
                if (data.VerifyState == 0) {
                    this._verifyState = true;
                }
                else {
                    this._verifyState = false;
                }
                if (data.FocusState == 0) {
                    this._focusState = true;
                }
                else {
                    this._focusState = false;
                }
                this._shareCountCD = data.ShareCountCD;
                this._todayShareState = data.TodayLeftShareCount;
                this.dispatchEventWith(ModelPlatformActivity.PLAT_STATE_UPDATE);
                if (this._verifyState && platform.sdk.verifyResult) {
                    this.requesVerify();
                }
                if (this._focusState && platform.sdk.focus) {
                    this.requesFocus();
                }
                if (complte)
                    complte.run();
            }));
        };
        /** 分享奖励*/
        ModelPlatformActivity.prototype.requesSthare = function () {
            if (this._todayShareState < 1 && this._shareCountCD > 0) {
                //已领取
                return;
            }
            var msg = n.MessagePool.from(n.C2G_Send_UserPlatReward);
            msg.Type = 3;
            msg.Channel = this._Channel;
            this.request(n.MessageMap.C2G_SEND_USERPLATREWARD, msg, utils.Handler.create(this, function (data) {
                this._verifyState = (data.VerifyState == 0);
                this._focusState = (data.FocusState == 0);
                this._todayShareState = data.TodayLeftShareCount;
                this._shareCountCD = data.ShareCountCD;
                this.dispatchEventWith(ModelPlatformActivity.PLAT_STATE_UPDATE);
            }));
        };
        /** 关注奖励*/
        ModelPlatformActivity.prototype.requesFocus = function () {
            var msg = n.MessagePool.from(n.C2G_Send_UserPlatReward);
            msg.Channel = this._Channel;
            if (platform.sdk.type == platform.WB) {
                msg.Type = 4;
                msg.Channel = 602;
            }
            else {
                msg.Type = 2;
            }
            logger.log(msg.Channel + "===" + msg.Type);
            this.request(n.MessageMap.C2G_SEND_USERPLATREWARD, msg, utils.Handler.create(this, function (data) {
                this._verifyState = (data.VerifyState == 0);
                this._focusState = (data.FocusState == 0);
                this._todayShareState = data.TodayLeftShareCount;
                this._shareCountCD = data.ShareCountCD;
                this.dispatchEventWith(ModelPlatformActivity.PLAT_STATE_UPDATE);
                if (platform.sdk.type == platform.WB) {
                    this._shoucang == (data.FocusState == 0);
                    //GameModels.state.updateState(GameRedState.SHOU_CNAG);
                }
            }));
        };
        /** 认证奖励*/
        ModelPlatformActivity.prototype.requesVerify = function () {
            var msg = n.MessagePool.from(n.C2G_Send_UserPlatReward);
            msg.Type = 1;
            msg.Channel = this._Channel;
            this.request(n.MessageMap.C2G_SEND_USERPLATREWARD, msg, utils.Handler.create(this, function (data) {
                this._verifyState = (data.VerifyState == 0);
                this._focusState = (data.FocusState == 0);
                this._todayShareState = data.TodayLeftShareCount;
                this._shareCountCD = data.ShareCountCD;
                this.dispatchEventWith(ModelPlatformActivity.PLAT_STATE_UPDATE);
            }));
        };
        ModelPlatformActivity.prototype.checkAttestationReceive = function () {
            return true;
        };
        ModelPlatformActivity.prototype.checkYaoQingReceive = function () {
            return this._todayShareState > 0;
        };
        Object.defineProperty(ModelPlatformActivity.prototype, "yearsGiftState", {
            //-1未开启  0表示未领取 1表示已领取
            get: function () {
                return this._yearsGiftState;
            },
            enumerable: true,
            configurable: true
        });
        /** 元旦礼包信息*/
        ModelPlatformActivity.prototype.requesYearsGiftState = function (giftid, complte) {
            var msg = n.MessagePool.from(n.C2G_WanBa_GetJieRiLiBaoState);
            msg.GiftId = giftid;
            this.request(n.MessageMap.C2G_WANBA_GETJIERILIBAOSTATE, msg, utils.Handler.create(this, function (data) {
                this._yearsGiftState = data.State;
                this.dispatchEventWith(ModelPlatformActivity.PLAT_STATE_UPDATE);
                if (complte)
                    complte.run();
            }));
        };
        /** 领取元旦礼包*/
        ModelPlatformActivity.prototype.requesGetYearsGift = function (giftid, complte) {
            var msg = n.MessagePool.from(n.C2G_WanBa_GetJieRiLiBaoGift);
            msg.GiftId = giftid;
            this.request(n.MessageMap.C2G_WANBA_GETJIERILIBAOGIFT, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    this._yearsGiftState = 1;
                    if (complte)
                        complte.run();
                }
            }));
        };
        /**黄钻状态*/
        ModelPlatformActivity.prototype.requesYellowDiamondState = function () {
            var msg = n.MessagePool.from(n.C2G_WanBa_GetHuangZuanTeQuanState);
            if (!platform.sdk) {
                msg.Appid = ""; //应用的唯一ID
                msg.Openid = ""; //用户ID
                msg.Openkey = ""; //登录态，openkey过期时间为两小时
                msg.Pf = ""; //应用的来源平台
                msg.Format = ""; //定义API返回的数据格式，json
            }
            else {
                msg.Appid = platform.sdk.appId ? platform.sdk.appId : ""; //应用的唯一ID
                msg.Openid = platform.sdk.roleId ? platform.sdk.roleId : ""; //用户ID
                msg.Openkey = platform.sdk.token ? platform.sdk.token : ""; //登录态，openkey过期时间为两小时
                msg.Pf = platform.sdk.pf ? platform.sdk.pf : ""; //应用的来源平台
                msg.Format = "json"; //定义API返回的数据格式，json
            }
            this.notify(n.MessageMap.C2G_WANBA_GETHUANGZUANTEQUANSTATE, msg);
        };
        ModelPlatformActivity.prototype.getHuangZuanTeQuanState = function (data) {
            this._yellowDiamondState = data.State;
            this._yellowDiamondLv = data.VipLevel;
        };
        Object.defineProperty(ModelPlatformActivity.prototype, "yellowDiamondState", {
            get: function () {
                return this._yellowDiamondState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPlatformActivity.prototype, "yellowDiamondLv", {
            get: function () {
                return this._yellowDiamondLv;
            },
            enumerable: true,
            configurable: true
        });
        /**qq卡券状态 */
        ModelPlatformActivity.prototype.getQQKaQuanState = function (giftid) {
            var msg = n.MessagePool.from(n.C2G_WanBa_GetQQKaQuanState);
            msg.GiftId = giftid;
            this.request(n.MessageMap.C2G_WANBA_GETQQKAQUANSTATE, msg, utils.Handler.create(this, function (data) {
                if (data.Result != 2) {
                    //mg.alertManager.showAlert(dialog.platformactivity.QQKaQuanGiftAlert, true, true, data.Result == 1 ? true : false)
                }
            }));
        };
        /** 黄钻礼包*/
        ModelPlatformActivity.prototype.getYellowDiamondGetGift = function (data) {
            logger.log("玩吧平台的礼包数据", data);
            if (data.Result == 2009) {
                if (data.GiftId == 60208 || data.GiftId == 60209) {
                    mg.alertManager.showAlert(JifenGiftAlert, true, true, data.GiftId, false);
                }
                return;
            }
            if (data.Result == 1) {
                if (data.GiftId == 60208 || data.GiftId == 60209) {
                    mg.alertManager.showAlert(JifenGiftAlert, true, true, data.GiftId, true);
                    return;
                }
                if (data.GiftId >= 60241 && data.GiftId <= 60246) {
                    this._yellowDiamondState = 1;
                    this.dispatchEventWith(ModelPlatformActivity.YELLOW_DIAMODE_UPDATE);
                }
            }
        };
        ModelPlatformActivity.prototype.requesYellowDiamondGetGift = function (id, complte) {
            var msg = n.MessagePool.from(n.C2G_WanBa_GetGift);
            msg.Appid = platform.sdk.appId;
            msg.Openid = platform.sdk.roleId;
            msg.Openkey = platform.sdk.token;
            msg.Pf = platform.sdk.pf;
            msg.Format = "json";
            if (id == 0) {
                msg.GiftId = platform.sdk.giftid;
            }
            else {
                msg.GiftId = id;
            }
            this.notify(n.MessageMap.C2G_WANBA_GETGIFT, msg);
        };
        Object.defineProperty(ModelPlatformActivity.prototype, "dailyGiftState", {
            get: function () {
                return this._dailyGiftState;
            },
            enumerable: true,
            configurable: true
        });
        /** 日常礼包信息*/
        ModelPlatformActivity.prototype.requesDailyGiftState = function (giftid, complte) {
            var msg = n.MessagePool.from(n.C2G_WanBa_GetDailyGiftState);
            msg.GiftId = giftid;
            this.request(n.MessageMap.C2G_WANBA_GETDAILYGIFTSTATE, msg, utils.Handler.create(this, function (data) {
                this._dailyGiftState = data.State;
                if (complte)
                    complte.run();
            }));
        };
        /** 领取日常礼包 0表示已领取 1表示未领取*/
        ModelPlatformActivity.prototype.requesGetDailyGift = function (giftid, complte) {
            var msg = n.MessagePool.from(n.C2G_WanBa_GetDailyGift);
            msg.GiftId = giftid;
            this.request(n.MessageMap.C2G_WANBA_GETDAILYGIFT, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    this._dailyGiftState = 0;
                    if (complte)
                        complte.run();
                }
            }));
        };
        Object.defineProperty(ModelPlatformActivity.prototype, "downloadGiftState", {
            get: function () {
                return this._downloadGiftState;
            },
            enumerable: true,
            configurable: true
        });
        /** XY移动端礼包*/
        ModelPlatformActivity.prototype.requesDownloadGift = function (complte) {
            if (this._downloadGiftState == 0) {
                if (complte)
                    complte.run();
                return;
            }
            if (!platform.sdk || (platform.sdk.type != platform.KY)) {
                this._downloadGiftState = 0;
                if (complte)
                    complte.run();
                return;
            }
            var msg = n.MessagePool.from(n.C2G_Mobile_DownloadGift);
            this.request(n.MessageMap.C2G_MOBILE_DOWNLOADGIFT, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    this._downloadGiftState = 1;
                }
                else {
                    this._downloadGiftState = 0;
                }
                logger.log(data.Result + "~~~" + this._downloadGiftState);
                if (complte)
                    complte.run();
            }));
        };
        ModelPlatformActivity.prototype.levelChange = function () {
            var lv = GameModels.user.player.level;
            var gameType = app.gameContext.typeGame;
            if (TypeGame.ATKCITY == gameType) {
                if ((lv == 10 || lv == 30 || lv == 60 || lv == 80) && this._shoucang) {
                    // mg.uiManager.show(dialog.platformactivity.ShouCangAwardDialog);
                }
            }
        };
        ModelPlatformActivity.prototype.wanbaShouCangState = function (complte) {
            var msg = n.MessagePool.from(n.C2G_WanBa_GetFocusGiftState);
            this.request(n.MessageMap.C2G_WANBA_GETFOCUSGIFTSTATE, msg, utils.Handler.create(this, function (data) {
                if (data.State == 0) {
                    this._shoucang = true;
                }
                else {
                    this._shoucang = false;
                }
                //GameModels.state.updateState(GameRedState.SHOU_CNAG);
            }));
        };
        ModelPlatformActivity.prototype.checkShouCang = function () {
            return this._shoucang;
        };
        ModelPlatformActivity.prototype.btnAiwanAdVisible = function () {
            if (platform.sdk && platform.sdk.type == platform.WB && platform.sdk.qua && platform.sdk.qua.app == "QQLive" && platform.sdk.qua.os == "AND") {
                return true;
            }
            return false;
        };
        ModelPlatformActivity.prototype.btnAiwanIosVisible = function () {
            if (platform.sdk && platform.sdk.type == platform.WB && platform.sdk.qua && platform.sdk.qua.app == "QQLive" && platform.sdk.qua.os == "IPH") {
                return true;
            }
            return false;
        };
        //是否显示微端下载
        ModelPlatformActivity.prototype.btnWeiduanVisible = function () {
            if (this._weiduanGiftState == 1) {
                return false;
            }
            // if (platform.sdk && platform.sdk.type == platform.WB && platform.sdk.qua.os == "AND" && platform.sdk.qua.app != "QZ") {
            // 	return false;
            // }
            return false;
        };
        Object.defineProperty(ModelPlatformActivity.prototype, "weiduanGiftState", {
            //-1未开启  0表示未领取 1表示已领取
            get: function () {
                return this._weiduanGiftState;
            },
            enumerable: true,
            configurable: true
        });
        /** 微端礼包信息*/
        ModelPlatformActivity.prototype.requesWeiDuanGiftState = function (giftid, complte) {
            var msg = n.MessagePool.from(n.C2G_WanBa_GetJieRiLiBaoState);
            msg.GiftId = giftid;
            this.request(n.MessageMap.C2G_WANBA_GETJIERILIBAOSTATE, msg, utils.Handler.create(this, function (data) {
                this._weiduanGiftState = data.State;
                if (complte)
                    complte.run();
            }));
        };
        /** 领取微端礼包*/
        ModelPlatformActivity.prototype.requesGetWeiDuanGift = function (giftid, complte) {
            var msg = n.MessagePool.from(n.C2G_WanBa_GetJieRiLiBaoGift);
            msg.GiftId = giftid;
            this.request(n.MessageMap.C2G_WANBA_GETJIERILIBAOGIFT, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    this._weiduanGiftState = 1;
                    if (complte)
                        complte.run();
                }
            }));
        };
        ModelPlatformActivity.prototype.checkWeiduanGiftState = function () {
            if (this._weiduanGiftState == 0) {
                return true;
            }
            return false;
        };
        /** 玩吧红包关卡上报*/
        ModelPlatformActivity.prototype.redCReport = function () {
            // if ((GameModels.timer.getTimer() / 1000) > 1549900800) {
            // 	return;
            // }
            // if (platform.sdk && platform.sdk.type == platform.WB) {
            // 	if (!this._firstCReportComplete) {
            // 		platform.sdk.redPacketReport({ type: 9, num: GameModels.chapter.data.Step }, false);
            // 	} else {
            // 		if (GameModels.chapter.data.Step == 2 || GameModels.chapter.data.Step == 10 || GameModels.chapter.data.Step == 31 || GameModels.chapter.data.Step == 45) {
            // 			platform.sdk.redPacketReport({ type: 9, num: GameModels.chapter.data.Step }, true);
            // 		}
            // 	}
            // 	this._firstCReportComplete = true;
            // }
        };
        /** 玩吧红包武将塔上报*/
        ModelPlatformActivity.prototype.redHReport = function () {
            if ((GameModels.timer.getTimer() / 1000) > 1549900800) {
                return;
            }
            if (platform.sdk && platform.sdk.type == platform.WB) {
                if (!this._firstHReportComplete) {
                    platform.sdk.redPacketReport({ type: 31, num: GameModels.copyPagoda.savageMaxPass }, false);
                }
                else {
                    if (GameModels.copyPagoda.savageMaxPass == 20 || GameModels.copyPagoda.savageMaxPass == 30) {
                        platform.sdk.redPacketReport({ type: 31, num: GameModels.copyPagoda.savageMaxPass }, true);
                    }
                }
                this._firstHReportComplete = true;
            }
        };
        ModelPlatformActivity.PLAT_STATE_UPDATE = "PLAT_STATE_UPDATE";
        ModelPlatformActivity.YELLOW_DIAMODE_UPDATE = "YELLOW_DIAMODE_UPDATE";
        ModelPlatformActivity.DIANJING_GIFT = 718011;
        ModelPlatformActivity.XINYUE_GIFT = 718012;
        ModelPlatformActivity.YEARS_GIFT = 1001;
        ModelPlatformActivity.WEIDUAN_GIFT = 1041;
        return ModelPlatformActivity;
    }(mo.ModelBase));
    mo.ModelPlatformActivity = ModelPlatformActivity;
    __reflect(ModelPlatformActivity.prototype, "mo.ModelPlatformActivity");
})(mo || (mo = {}));
