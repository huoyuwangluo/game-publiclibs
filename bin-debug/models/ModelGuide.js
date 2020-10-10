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
    var ModelGuide = (function (_super) {
        __extends(ModelGuide, _super);
        function ModelGuide() {
            var _this = _super.call(this) || this;
            _this._petPos = -1;
            return _this;
        }
        ModelGuide.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._guideType = 0;
            this._guideTypeClinte = 0;
            this._clinetPetId = 0;
            this.requestGetGuide();
            n.net.onRoute(n.MessageMap.NOTIFYNEWGUIDE, utils.Handler.create(this, this.notifyGuide, null, false));
            GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.updataVipChange);
        };
        Object.defineProperty(ModelGuide.prototype, "clinetPetId", {
            get: function () {
                return this._clinetPetId;
            },
            set: function (v) {
                this._clinetPetId = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGuide.prototype, "guideType", {
            get: function () {
                return this._guideType;
            },
            set: function (v) {
                this._guideType = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelGuide.prototype.gameChangeHandler = function () {
            if (!app.gameContext.gameCurrent)
                return;
            if (!TypeGame.isMainGame(app.gameContext.gameCurrent.type))
                return;
            if (this._guideTypeClinte) {
                this.starClinteGuide();
                return;
            }
            if (!this._guideType)
                return;
            this.startGuide();
        };
        ModelGuide.prototype.updataVipChange = function () {
            if (GameModels.user.player.vip != 4)
                return;
            this._guideType = mo.ModelGuide.guideType14;
            if (!app.gameContext.gameCurrent)
                return;
            if (!TypeGame.isMainGame(app.gameContext.gameCurrent.type))
                return;
            if (!this._guideType)
                return;
            if (this._guideTypeClinte)
                return;
            this.startGuide();
        };
        ModelGuide.prototype.notifyGuide = function (data) {
            this._guideType = data.NewGuideType;
            if (!app.gameContext.gameCurrent)
                return;
            if (!TypeGame.isMainGame(app.gameContext.gameCurrent.type))
                return;
            if (!this._guideType)
                return;
            if (this._guideTypeClinte)
                return;
            this.startGuide();
        };
        ModelGuide.prototype.startGuide = function () {
            if (GameModels.user.player.level > 300) {
                this._guideTypeClinte = this._guideType = 0;
                return;
            }
            if (this._guideType == mo.ModelGuide.guideType14) {
                if (GameModels.user.player.level >= 28 && app.gameContext.gameCurrent.type == TypeGame.ATKCITY && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_7) <= 0) {
                    mg.StoryManager.instance.startBigStory(122, this, this.tiaoGuanEndCallFun);
                    GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_7);
                }
                return;
            }
            var guide;
            logger.log("服务端的等级引导=====", this._guideType);
            switch (this._guideType) {
                // case mo.ModelGuide.guideType0:
                //     if (GameModels.handBook.getSealCount() > 0) {
                //         this._guideType = 0;
                //         return;
                //     }
                //     if (mg.guideManager.current instanceof main.GuideTuJian) return;
                //     mg.guideManager.stopGuide();
                //     guide = utils.ObjectPool.from(main.GuideTuJian, true) as main.GuideTuJian;
                //     break;
                case mo.ModelGuide.guideType1:
                    if (mg.guideManager.current instanceof main.GuideQiangFood)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideQiangFood, true);
                    break;
                case mo.ModelGuide.guideType2:
                    if (mg.guideManager.current instanceof main.GuideLadder)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideLadder, true);
                    break;
                case mo.ModelGuide.guideType3:
                    if (GameModels.user.player.legionId) {
                        this._guideType = 0;
                        return;
                    }
                    if (mg.guideManager.current instanceof main.GuideJoinLegion)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideJoinLegion, true);
                    break;
                case mo.ModelGuide.guideType4:
                    if (mg.guideManager.current instanceof main.GuideQiangFood)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideQiangFood, true);
                    break;
                case mo.ModelGuide.guideType5:
                    if (mg.guideManager.current instanceof main.GuideEveryBoss)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideEveryBoss, true);
                    break;
                // case mo.ModelGuide.guideType6:
                //     if (mg.guideManager.current instanceof main.GuidePaDa) return;
                //     mg.guideManager.stopGuide();
                //     guide = utils.ObjectPool.from(main.GuidePaDa, true) as main.GuidePaDa;
                //     break;
                case mo.ModelGuide.guideType7:
                    if (mg.guideManager.current instanceof main.GuideWuHun)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideWuHun, true);
                    break;
                // case mo.ModelGuide.guideType8:
                //     if (mg.guideManager.current instanceof main.GuideJuYI) return;
                //     mg.guideManager.stopGuide();
                //     guide = utils.ObjectPool.from(main.GuideJuYI, true) as main.GuideJuYI;
                //     break;
                case mo.ModelGuide.guideType9:
                    if (GameModels.chapter && GameModels.chapter.totalChapter < 7) {
                        this._guideType = 0;
                        return;
                    }
                    if (mg.guideManager.current instanceof main.GuideEveryBoss)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideEveryBoss, true);
                    break;
                case mo.ModelGuide.guideType10:
                    if (mg.guideManager.current instanceof main.GuideShengZhi)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideShengZhi, true);
                    break;
                case mo.ModelGuide.guideType11:
                    if (mg.guideManager.current instanceof main.GuideGamMaterial)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideGamMaterial, true);
                    break;
                case mo.ModelGuide.guideType12:
                    if (mg.guideManager.current instanceof main.GuideTeJiangBu)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideTeJiangBu, true);
                    break;
                case mo.ModelGuide.guideType15:
                    if (!GameModels.platform.isPay) {
                        this._guideType = 0;
                        return;
                    }
                    if (!GameModels.user.player.legionId) {
                        this._guideType = 0;
                        return;
                    }
                    if (mg.guideManager.current instanceof main.GuideKingWar)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideKingWar, true);
                    break;
            }
            if (guide) {
                mg.guideManager.guide(guide, 0);
            }
        };
        ModelGuide.prototype.tiaoGuanEndCallFun = function () {
            if (this._tiaoGuanGuideHandler) {
                this._tiaoGuanGuideHandler.run();
            }
        };
        /**跳关对话完成监听 */
        ModelGuide.prototype.ontiaoGuan = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offtiaoGuan();
            this._tiaoGuanGuideHandler = utils.Handler.create(caller, method, args, false);
        };
        ModelGuide.prototype.offtiaoGuan = function () {
            if (this._tiaoGuanGuideHandler) {
                this._tiaoGuanGuideHandler.recover();
                this._tiaoGuanGuideHandler = null;
            }
        };
        Object.defineProperty(ModelGuide.prototype, "guideTypeClinte", {
            get: function () {
                return this._guideTypeClinte;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGuide.prototype, "petPos", {
            get: function () {
                return this._petPos;
            },
            set: function (v) {
                this._petPos = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelGuide.prototype.setClinteGuideType = function (type, pos) {
            this._guideTypeClinte = type;
            logger.log("客户端的条件引导=====", this._guideTypeClinte);
            if (!this._guideTypeClinte)
                return;
            this._petPos = pos;
            this.starClinteGuide();
        };
        ModelGuide.prototype.starClinteGuide = function () {
            if (GameModels.user.player.level > 300) {
                this._guideTypeClinte = this._guideType = 0;
                return;
            }
            var guide;
            switch (this._guideTypeClinte) {
                case mo.ModelGuide.guideType10000:
                    if (mg.guideManager.current instanceof main.GuidePetUp1)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuidePetUp1, true);
                    break;
                case mo.ModelGuide.guideType20000:
                    if (mg.guideManager.current instanceof main.GuidePlayerLevelUp1)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuidePlayerLevelUp1, true);
                    break;
                case mo.ModelGuide.guideType30000:
                    if (mg.guideManager.current instanceof main.GuideWare1)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideWare1, true);
                    break;
                case mo.ModelGuide.guideType40000:
                    if (mg.guideManager.current instanceof main.GuideHongYanCiHun)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideHongYanCiHun, true);
                    break;
                case mo.ModelGuide.guideType50000:
                    if (mg.guideManager.current instanceof main.GuideBingFa)
                        return;
                    mg.guideManager.stopGuide();
                    guide = utils.ObjectPool.from(main.GuideBingFa, true);
                    break;
            }
            if (guide) {
                mg.guideManager.guide(guide, 0);
            }
        };
        ModelGuide.prototype.stopClinteGuide = function () {
            this._guideTypeClinte = 0;
            this._petPos = -1;
            mg.guideManager.stopGuide();
            if (GameModels.task.hasTask) {
                GameModels.task.handlersRun();
            }
        };
        ModelGuide.prototype.requestGetGuide = function () {
            var cmd = n.MessagePool.from(n.C2G_Guide_GetGuide);
            this.notify(n.MessageMap.C2G_GUIDE_GETGUIDE, cmd);
        };
        ModelGuide.prototype.requestGuideDone = function (type, complete) {
            var msg = n.MessagePool.from(n.C2G_Guide_Done);
            msg.GuideType = type;
            this.request(n.MessageMap.C2G_GUIDE_DONE, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    logger.log("提交等级引导前=====", this._guideType);
                    this._guideType = 0;
                    logger.log("提交等级引导后=====", this._guideType);
                    mg.guideManager.stopGuide();
                    if (GameModels.task.hasTask) {
                        GameModels.task.handlersRun();
                    }
                }
            }));
        };
        // public static guideType0: number = 33;//图鉴激活引导 33
        ModelGuide.guideType1 = 39; //强征 39
        ModelGuide.guideType2 = 34; //天梯 34
        ModelGuide.guideType3 = 50; //加入阵营 50
        ModelGuide.guideType4 = 47; //强征 47
        ModelGuide.guideType5 = 120; //群雄逐鹿 120
        // public static guideType6: number = 200;//武神塔 200
        ModelGuide.guideType7 = 75; //武魂塔 75
        // public static guideType8: number = 170;//聚义 170
        ModelGuide.guideType9 = 85; //武将讨伐 85
        ModelGuide.guideType10 = 33; //圣旨任务 33
        ModelGuide.guideType11 = 55; //经验副本 55
        ModelGuide.guideType12 = 220; //铁匠铺 220
        // public static guideType13: number = 80;//跳关引导 80
        ModelGuide.guideType14 = 999; //跳关引导 999
        ModelGuide.guideType15 = 60; //国战引导 60
        ModelGuide.guideType10000 = 10000; //上阵武将
        ModelGuide.guideType20000 = 20000; //升级武将
        ModelGuide.guideType30000 = 30000; //装备武将
        ModelGuide.guideType40000 = 40000; //赐婚引导
        ModelGuide.guideType50000 = 50000; //穿戴兵法
        return ModelGuide;
    }(mo.ModelBase));
    mo.ModelGuide = ModelGuide;
    __reflect(ModelGuide.prototype, "mo.ModelGuide");
})(mo || (mo = {}));
