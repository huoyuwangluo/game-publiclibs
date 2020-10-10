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
    var ModelGameBoss = (function (_super) {
        __extends(ModelGameBoss, _super);
        function ModelGameBoss() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**九曲之都--原幻兽森林--剩余挑战次数*/
            _this._petWoodsBossCount = 0;
            /** 九曲之都--原幻兽森林--已购买次数*/
            _this._petWoodsBossBuyCount = 0;
            /**盘古仙境（原灭世荒漠）--剩余挑战次数*/
            _this._petDeathBossCount = 0;
            /** 盘古仙境（原灭世荒漠）--已购买次数*/
            _this._petDeathBossBuyCount = 0;
            /**存材料副本 武魂塔 武将塔 试炼塔 势力塔1 势力塔2 势力塔3的战斗的数据 */
            /**data={type:number,copyVo:vo.CopyVo=null,isFive:boolean} */
            _this._fightData = [];
            return _this;
        }
        ModelGameBoss.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._doubleBol = false;
            this.initializeData([ModelGameBoss.COPY_PERSONAL, ModelGameBoss.COPY_EVERYONE, ModelGameBoss.COPY_CITY, ModelGameBoss.COPY_LOSE, ModelGameBoss.COPY_FAMILY, ModelGameBoss.COPY_DOMAIN, ModelGameBoss.COPY_FANTASY, ModelGameBoss.COPY_CROSS_BOSS, ModelGameBoss.COPY_SECRET_BOSS, ModelGameBoss.COPY_HOLIDAY_BOSS, ModelGameBoss.COPY_WOODS, ModelGameBoss.COPY_DEATH, ModelGameBoss.COPY_HONGYAN_BOSS,
                ModelGameBoss.COPY_YUANZHENG_BOSS1, ModelGameBoss.COPY_YUANZHENG_BOSS2, ModelGameBoss.COPY_YUANZHENG_BOSS3,
                ModelGameBoss.COPY_SHILI_WU, ModelGameBoss.COPY_SHILI_SHU, ModelGameBoss.COPY_SHILI_WEI]);
            n.net.onRoute(n.MessageMap.G2C_BOSS_NOTIFY_REBORN, utils.Handler.create(this, this.everyBossRebornHandler, null, false));
            n.net.onRoute(n.MessageMap.G2C_BOSS_NOTIFY_DEAD, utils.Handler.create(this, this.everyBossDeadHandler, null, false));
            n.net.onRoute(n.MessageMap.NOTIFYJIANGJUNLING, utils.Handler.create(this, this.tokenHandler, null, false));
            this.requestBossCopyInfo(null);
            this.requestFamilyBossCopyInfo(null);
            GameModels.task.once('INITIALIZE_DATA', this.taskInitialized, this);
        };
        ModelGameBoss.prototype.taskInitialized = function () {
            GameModels.task.onChange(this, this.taskChangeHandler);
            this.taskChangeHandler();
        };
        /**请求全民和个人BOSS信息，并将信息保存到副本VO中后回调*/
        ModelGameBoss.prototype.requestBossCopyInfo = function (complete) {
            var _this = this;
            this.request(n.MessageMap.C2G_BOSS_COPY_INFO, n.MessagePool.from(n.C2G_Boss_Copy_Info), utils.Handler.create(this, function (data) {
                var time = (GameModels.timer.getTimer() * .001) >> 0;
                _this.everyBossCount = data.LeftPublicBossCnt;
                _this.everyBossRestoreTime = time + data.PublicBossCntRefreshTime;
                _this._everyBossCountBuyCount = data.PublicBossBuyCount;
                _this._godDomainBossCount = data.GodDomainBossLeftCount;
                _this._godDomainBossCanBuyCount = data.GodDomainBossBuyCount;
                // this._dongWuZhengBaBossCount = data.DongWuZhengBaLeftCount;
                // this._dongWuZhengBaBuyBossCount = data.DongWuZhengBaBuyCount;
                // this._pingDingShuZhongBossCount = data.PingDingShuZhongLeftCount;
                // this._pingDingShuZhongBossBuyCount = data.PingDingShuZhongBuyCount;
                _this._personaBossCount = data.PersonalBossLeftCount;
                _this._personaBossBuyCount = data.PersonalBossBuyCount;
                // this._zhuLuZhongYuanBossCount = data.ZhuLuZhongYuanLeftCount;
                // this._zhuLuZhongYuanBossBuyCount = data.ZhuLuZhongYuanBuyCount;
                _this._hasToken = data.HasJiangJunLing != 0;
                _this._tokenTime = 0;
                _this._doubleRewardCnt = data.DoubleRewardCnt;
                _this._publicBossQuickPassLeftTimes = data.PublicBossQuickPassLeftTimes;
                _this._godDomainQuickPassLeftTimes = data.GodDomainQuickPassLeftTimes;
                //Persionnal Boss
                for (var _i = 0, _a = data.PersonalBosses; _i < _a.length; _i++) {
                    var info = _a[_i];
                    // this.getVOByStep(ModelCopyBoss.COPY_PERSONAL, info.Step).isKill = info.LeftCount == 0;
                    _this.getVOByStep(ModelGameBoss.COPY_PERSONAL, info.Step).updateSelfBossState(info);
                }
                // let copys: Array<vo.CopyVO> = this.getCopyList(mo.ModelGameBoss.COPY_PERSONAL);
                // copys.sort(function (a: vo.CopyVO, b: vo.CopyVO): number {
                //     if (a.isBossKilled && !b.isBossKilled) return 1;
                //     else if (!a.isBossKilled && b.isBossKilled) return -1;
                //     else if (a.personSort > b.personSort) return 1;
                //     else if (a.personSort < b.personSort) return -1;
                //     else return 0;
                // });
                //个人boss
                var copys = _this.getCopyList(mo.ModelGameBoss.COPY_PERSONAL);
                // copys.sort(function (a: vo.CopyVO, b: vo.CopyVO): number {
                //     if (a.isBossKilled && !b.isBossKilled) return 1;
                //     else if (!a.isBossKilled && b.isBossKilled) return -1;
                //     else if (a.personSort > b.personSort) return 1;
                //     else if (a.personSort < b.personSort) return -1;
                //     else return 0;
                // });
                copys.sort(function (a, b) {
                    return a.step - b.step;
                });
                //Every Boss
                for (var _b = 0, _c = data.PublicBosses; _b < _c.length; _b++) {
                    var info = _c[_b];
                    info.RefreshTime += time;
                    if (_this.getVOByStep(ModelGameBoss.COPY_EVERYONE, info.Step))
                        _this.getVOByStep(ModelGameBoss.COPY_EVERYONE, info.Step).updateEveryBossState(info);
                }
                copys = _this.getCopyList(mo.ModelGameBoss.COPY_EVERYONE, 1, true);
                copys.sort(function (a, b) {
                    return a.step - b.step;
                });
                // //City Boss
                // for (let info of data.MainCityBosses) {
                //     this.getVOByStep(ModelGameBoss.COPY_CITY, info.Step).updateCityBossState(info);
                // }
                // //Lose Boss
                // for (let info of data.TimedBosses) {
                //     this.getVOByStep(ModelGameBoss.COPY_LOSE, info.Step).updateLoseBossState(info);
                // }
                //神域 Boss
                for (var _d = 0, _e = data.GodDomainBosses; _d < _e.length; _d++) {
                    var info = _e[_d];
                    info.RefreshTime += time;
                    var vo = _this.getVOByStep(ModelGameBoss.COPY_DOMAIN, info.Step);
                    if (vo)
                        vo.updateDomainBossState(info);
                }
                // //幻界 Boss
                // for (let info of data.MagicWorldBoss) {
                //     info.RefreshTime += time;
                //     this.getVOByStep(ModelGameBoss.COPY_FANTASY, info.Step).updateFantasyBossState(info);
                // }
                // //节日 Boss
                // for (let info of data.HolidayMainCityBoss) {
                //     this.getVOByStep(ModelGameBoss.COPY_HOLIDAY_BOSS, info.Step).updateHolidayBossState(info);
                // }
                // //九曲之都 Boss
                // for (let info of data.PetWoodsBossList) {
                //     info.RefreshTime += time;
                //     this.getVOByStep(ModelGameBoss.COPY_WOODS, info.Step).updatePetWoodsBossState(info);
                // }
                // //盘古仙境（原灭世荒漠） Boss
                // for (let info of data.MieShiBossList) {
                //     info.RefreshTime += time;
                //     this.getVOByStep(ModelGameBoss.COPY_DEATH, info.Step).updatePetDeathBossState(info);
                // }
                // this._petWoodsBossCount = data.PetWoodsLeftCount;
                // this._petWoodsBossBuyCount = data.PetWoodsBuyCount;
                copys = _this.getCopyList(mo.ModelGameBoss.COPY_DOMAIN);
                copys.sort(function (a, b) {
                    return a.openLevel < b.openLevel
                        ? -1 : 1;
                });
                copys = _this.getCopyList(mo.ModelGameBoss.COPY_CITY);
                copys.sort(function (a, b) {
                    if (a.step > b.step)
                        return 1;
                    else if (a.step < b.step)
                        return -1;
                    else
                        return 0;
                });
                !complete || complete.run();
                // GameModels.state.updateState(GameRedState.WOORS_BOSS);
                GameModels.state.updateState(GameRedState.BOSS_COPY_SELF);
                // GameModels.state.updateState(GameRedState.BOSS_COPY_CITY);
                // GameModels.state.updateState(GameRedState.BOSS_COPY_LOSE);
                GameModels.state.updateState(GameRedState.BOSS_COPY_DOMAIN);
                // GameModels.state.updateState(GameRedState.BOSS_COPY_FANTASY);
                // GameModels.state.updateState(GameRedState.DEATH_BOSS);
                GameModels.state.updateState(GameRedState.CITY);
            }));
        };
        ModelGameBoss.prototype.requestFamilyBossCopyInfo = function (complete) {
            // this.request(n.MessageMap.C2G_BOSS_HOMEBOSS_INFO, n.MessagePool.from(n.C2G_Boss_HomeBoss_Info),
            //     utils.Handler.create(this, function (data: n.G2C_Boss_HomeBoss_Info): void {
            //         for (let info of data.Infos) {
            //             this.getVOByStep(ModelGameBoss.COPY_FAMILY, info.Step).updateEveryBossState(info);
            //         }
            //         let copys: Array<vo.CopyVO> = this.getCopyList(mo.ModelGameBoss.COPY_FAMILY);
            //         copys.sort(function (a: vo.CopyVO, b: vo.CopyVO): number {
            //             if (a.step < b.step) return -1;
            //             else if (a.step > b.step) return 1;
            //             else return 0;
            //         });
            //         // GameModels.state.updateState(GameRedState.BOSS_COPY_FAMILY);
            //     }))
        };
        ModelGameBoss.prototype.taskChangeHandler = function () {
            //任务变化时判断 体验副本是否应该从列表删除
            var taskTemplate;
            taskTemplate = Templates.getTemplateByProperty(templates.Map.TASKNEWBIE, "type", TypeTask.EVERY_BOSS_GUIDE_20);
            var unlock20 = GameModels.task.hasTask && taskTemplate && GameModels.task.curTask.id >= taskTemplate.id;
            var delete20 = !GameModels.task.hasTask || !taskTemplate || GameModels.task.curTask.id > taskTemplate.id;
            taskTemplate = Templates.getTemplateByProperty(templates.Map.TASKNEWBIE, "type", TypeTask.EVERY_BOSS_GUIDE_30);
            var unlock30 = GameModels.task.hasTask && taskTemplate && GameModels.task.curTask.id >= taskTemplate.id;
            var delete30 = !GameModels.task.hasTask || !taskTemplate || GameModels.task.curTask.id > taskTemplate.id;
            var copys = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_EVERYONE, 1, true);
            for (var i = 0; i < copys.length; i++) {
                var copyVO = copys[i];
                if (copyVO.openLevel == 20) {
                    if (delete20) {
                        copys.splice(i, 1);
                        i--;
                        continue;
                    }
                    copyVO.stateLock = !unlock20;
                }
                else if (copyVO.openLevel == 30) {
                    if (delete30) {
                        copys.splice(i, 1);
                        i--;
                        continue;
                    }
                    copyVO.stateLock = !unlock30;
                }
            }
            if (delete20 && delete30) {
                GameModels.task.offChange(this, this.taskChangeHandler);
            }
        };
        //---------------------------神域BOSS相关------------------------------------------
        //根据次数获取dataSetting表里的单条表数据
        /**神域boss购买挑战次数*/
        ModelGameBoss.prototype.net_requestBuyChallengesTimes = function (handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_GodDomainBoss_Buy_Challenge_Count);
            this.request(n.MessageMap.C2G_GODDOMAINBOSS_BUY_CHALLENGE_COUNT, msg, utils.Handler.create(this, function (data) {
                _this._godDomainBossCount = data.TotalCount;
                _this._godDomainBossCanBuyCount = data.BuyCount;
                if (handler) {
                    handler.run();
                }
                GameModels.state.updateState(GameRedState.BOSS_COPY_DOMAIN);
                GameModels.state.updateState(GameRedState.CITY);
            }));
        };
        //神域，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelGameBoss.prototype.getDomainBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(192001, order);
        };
        Object.defineProperty(ModelGameBoss.prototype, "domainBuyMaxNum", {
            //神域购买上限值
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(191001);
                if (templateDataSetting)
                    var initValue = parseInt(templateDataSetting.value);
                if (GameModels.user.player.vip > 0) {
                    var vipTemp = GameModels.vip.vipTemplateById(GameModels.user.player.vip);
                    if (vipTemp)
                        return initValue + vipTemp.hjbfBuyTimes;
                }
                else {
                    return initValue;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "domainRefreshNum", {
            //神域第二天刷新值
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(190001);
                if (templateDataSetting)
                    return parseInt(templateDataSetting.value);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "personBossCount", {
            /**个人BOSS挑战数量 */
            set: function (value) {
                this._personaBossCount = Math.max(value, 0);
                GameModels.state.updateState(GameRedState.BOSS_COPY_SELF);
                GameModels.state.updateState(GameRedState.CITY);
            },
            enumerable: true,
            configurable: true
        });
        //个人Boss，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelGameBoss.prototype.getPersonaBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(1701001, order);
        };
        Object.defineProperty(ModelGameBoss.prototype, "personaBuyMaxNum", {
            //个人Boss购买上限值
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(1700002);
                if (templateDataSetting)
                    var initValue = parseInt(templateDataSetting.value);
                if (GameModels.user.player.vip > 0) {
                    var vipTemp = GameModels.vip.vipTemplateById(GameModels.user.player.vip);
                    if (vipTemp)
                        return initValue + vipTemp.grbossBuyTimes;
                }
                else {
                    return initValue;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "personaRefreshNum", {
            //个人Boss第二天刷新值
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(1700001);
                if (templateDataSetting) {
                    if (GameModels.vip.getRewardBuyType(6)) {
                        return parseInt(templateDataSetting.value) + 5;
                    }
                    else {
                        return parseInt(templateDataSetting.value);
                    }
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        //平定蜀中Boss，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelGameBoss.prototype.getPingDingShuZhongBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(1601001, order);
        };
        Object.defineProperty(ModelGameBoss.prototype, "pingDingShuZhongBuyMaxNum", {
            //平定蜀中Boss购买上限值
            get: function () {
                var initValue = 0;
                var templateDataSetting = GameModels.dataSet.getDataSettingById(1600002);
                if (templateDataSetting)
                    initValue = parseInt(templateDataSetting.value);
                return initValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "pingDingShuZhongRefreshNum", {
            //平定蜀中Boss第二天刷新值
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(1600001);
                if (templateDataSetting)
                    return parseInt(templateDataSetting.value);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "domainBossCanBuyCount", {
            get: function () {
                return this._godDomainBossCanBuyCount;
            },
            enumerable: true,
            configurable: true
        });
        /**挥军北伐（神域boss红点）**/
        ModelGameBoss.prototype.checkDomainBossCount = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 2))
                return false;
            var domainCopyList = this.getCopyList(ModelGameBoss.COPY_DOMAIN);
            if (domainCopyList && domainCopyList.length) {
                for (var _i = 0, domainCopyList_1 = domainCopyList; _i < domainCopyList_1.length; _i++) {
                    var copyVO = domainCopyList_1[_i];
                    if (copyVO.isBossKilled == false && copyVO.template.openLv <= GameModels.user.myConfigLevel && this._godDomainBossCount > 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        Object.defineProperty(ModelGameBoss.prototype, "dongWuZhengBaBossCount", {
            //-------------------------------------------------------------------
            //                         幻界禁地
            //
            //-------------------------------------------------------------------
            get: function () {
                return this._dongWuZhengBaBossCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "dongWuZhengBaBuyBossCount", {
            get: function () {
                return this._dongWuZhengBaBuyBossCount;
            },
            enumerable: true,
            configurable: true
        });
        //东吴争霸，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelGameBoss.prototype.getdongWuZhengBaBossBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(613001, order);
        };
        Object.defineProperty(ModelGameBoss.prototype, "dongWuZhengBaBossRefreshNum", {
            /**东吴争霸，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量第二天刷新值*/
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(612001);
                if (templateDataSetting)
                    return parseInt(templateDataSetting.value);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "dongWuZhengBaBossBuyMax", {
            /**东吴争霸，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量购买上限 */
            get: function () {
                var initValue = 0;
                var templateDataSetting = GameModels.dataSet.getDataSettingById(612002);
                if (templateDataSetting)
                    var initValue = parseInt(templateDataSetting.value);
                return initValue;
            },
            enumerable: true,
            configurable: true
        });
        ModelGameBoss.prototype.dongWuZhengBaBuyChallengesTimes = function (handler) {
            // var msg: n.C2G_DongWuZhengBa_Buy_Count = n.MessagePool.from(n.C2G_DongWuZhengBa_Buy_Count) as n.C2G_DongWuZhengBa_Buy_Count;
            // this.request(n.MessageMap.C2G_DONGWUZHENGBA_BUY_COUNT, msg, utils.Handler.create(this, (data: n.G2C_DongWuZhengBa_Buy_Count) => {
            //     this._dongWuZhengBaBossCount = data.LeftCount;
            //     this._dongWuZhengBaBuyBossCount = data.BuyCount;
            //     if (handler) {
            //         handler.run();
            //     }
            //     // GameModels.state.updateState(GameRedState.BOSS_COPY_FANTASY);
            // }));
        };
        /**东吴争霸（幻界禁地boss红点）**/
        ModelGameBoss.prototype.checkFantasyBossCount = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 5))
                return false;
            if (this._dongWuZhengBaBossCount <= 0)
                return false;
            var fantasyCopyList = this.getCopyList(ModelGameBoss.COPY_FANTASY);
            var count = 0;
            if (fantasyCopyList && fantasyCopyList.length) {
                for (var _i = 0, fantasyCopyList_1 = fantasyCopyList; _i < fantasyCopyList_1.length; _i++) {
                    var copyVO = fantasyCopyList_1[_i];
                    if (count < 3 && copyVO.isBossKilled == false && copyVO.template.openLv <= GameModels.user.myConfigLevel && GameModels.user.myConfigLevel <= copyVO.template.endLv) {
                        return true;
                    }
                    if (copyVO.isBossKilled == false && copyVO.template.openLv <= GameModels.user.myConfigLevel && GameModels.user.myConfigLevel <= copyVO.template.endLv) {
                        return true;
                    }
                    count++;
                }
            }
            return false;
        };
        //-------------------------------------------------------------------
        //
        //                              全民副本
        //
        //-------------------------------------------------------------------
        ModelGameBoss.prototype.everyBossRebornHandler = function (data) {
            var copy = this.getVOByStep(data.Type, data.Step);
            copy.bossReborn(parseInt(data.HP));
            if (data.Type == ModelGameBoss.COPY_EVERYONE) {
                if (copy.isRemind) {
                    GameModels.state.updateState(GameRedState.BOSS_COPY_EVERY);
                    GameModels.state.updateState(GameRedState.CITY);
                }
                this.dispatchEventWith(ModelGameBoss.BOSS_REBORN_EVERY, false, copy);
            }
            if (data.Type == ModelGameBoss.COPY_FAMILY) {
                // GameModels.state.updateState(GameRedState.BOSS_COPY_FAMILY);
                this.dispatchEventWith(ModelGameBoss.BOSS_REBORN_FAMILY, false, copy);
            }
            if (data.Type == ModelGameBoss.COPY_HOLIDAY_BOSS) {
                this.dispatchEventWith(ModelGameBoss.BOSS_REBORN_HOLIDAY, false, copy);
            }
            // if (data.Type == ModelGameBoss.COPY_HOLIDAY_BOSS) {
            //     copy.setcurAngry();
            //     this.dispatchEventWith(ModelGameBoss.BOSS_REBORN_CITY, false, copy);
            // }
            // if (data.Type == ModelGameBoss.COPY_WOODS) {
            //     GameModels.state.updateState(GameRedState.WOORS_BOSS);
            // }
            // if (data.Type == ModelGameBoss.COPY_DEATH) {
            //     GameModels.state.updateState(GameRedState.DEATH_BOSS);
            // }
            this.dispatchEventWith(ModelGameBoss.BOSS_REBORN, false, copy);
        };
        ModelGameBoss.prototype.everyBossDeadHandler = function (data) {
            var copy = this.getVOByStep(data.Type, data.Step);
            copy.bossDead();
            if (data.Type == ModelGameBoss.COPY_EVERYONE) {
                GameModels.state.updateState(GameRedState.BOSS_COPY_EVERY);
                GameModels.state.updateState(GameRedState.CITY);
            }
            if (data.Type == ModelGameBoss.COPY_CITY) {
                this.dispatchEventWith(ModelGameBoss.BOSS_REBORN_HOLIDAY);
            }
        };
        //全民Boss，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelGameBoss.prototype.getEveryBossBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(422001, order);
        };
        Object.defineProperty(ModelGameBoss.prototype, "everyBossRefreshNum", {
            /**全民boss第二天刷新值*/
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(421001);
                if (templateDataSetting)
                    return parseInt(templateDataSetting.value);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "everyBossCount", {
            get: function () {
                return this._everyBossCount;
            },
            /**全民BOSS挑战数量 */
            set: function (value) {
                this._everyBossCount = Math.max(value, 0);
                GameModels.state.updateState(GameRedState.BOSS_COPY_EVERY);
                GameModels.state.updateState(GameRedState.CITY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "everyBossBuyMax", {
            /**全民BOSS购买上限 */
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(421002);
                if (templateDataSetting)
                    var initValue = parseInt(templateDataSetting.value);
                if (GameModels.user.player.vip > 0) {
                    var vipTemp = GameModels.vip.vipTemplateById(GameModels.user.player.vip);
                    if (vipTemp)
                        return initValue + vipTemp.qmbossBuyTimes;
                }
                else {
                    return initValue;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "everyBossBuyCount", {
            get: function () {
                return this._everyBossCountBuyCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "zhuLuZhongYuanBuyMaxNum", {
            get: function () {
                var initValue = 0;
                var data = GameModels.dataSet.getDataSettingById(200002);
                if (data)
                    initValue = parseInt(data.value);
                return initValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "zhuLuZhongYuanRefreshNum", {
            get: function () {
                var data = GameModels.dataSet.getDataSettingById(200001);
                if (data)
                    return parseInt(data.value);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ModelGameBoss.prototype.getZhuLuZhongYuanBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(201001, order);
        };
        Object.defineProperty(ModelGameBoss.prototype, "deathRefreshNum", {
            /**盘古仙境（原灭世荒漠）boss第二天刷新值*/
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(830001);
                if (templateDataSetting)
                    return parseInt(templateDataSetting.value);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "deathBuyMaxNum", {
            /**盘古仙境（原灭世荒漠）bboss购买上限值*/
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(830002);
                if (templateDataSetting)
                    return parseInt(templateDataSetting.value);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "woorsRefreshNum", {
            /**九曲boss第二天刷新值*/
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(1300001);
                if (templateDataSetting)
                    return parseInt(templateDataSetting.value);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "woorsBuyMaxNum", {
            /**九曲boss购买上限值*/
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(1300002);
                if (templateDataSetting)
                    return parseInt(templateDataSetting.value);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        /**九曲boss购买挑战次数*/
        ModelGameBoss.prototype.woorsBuyChallengesTimes = function (handler) {
            // var msg: n.C2G_PetWoods_Buy_Challenge_Count = n.MessagePool.from(n.C2G_PetWoods_Buy_Challenge_Count) as n.C2G_PetWoods_Buy_Challenge_Count;
            // this.request(n.MessageMap.C2G_PETWOODS_BUY_CHALLENGE_COUNT, msg, utils.Handler.create(this, (data: n.G2C_PetWoods_Buy_Challenge_Count) => {
            //     this._petWoodsBossCount = data.LeftCount;
            //     this._petWoodsBossBuyCount = data.BuyCount;
            //     // GameModels.state.updateState(GameRedState.WOORS_BOSS);
            //     if (handler) {
            //         handler.run();
            //     }
            // }));
        };
        /**平定蜀中购买挑战次数*/
        ModelGameBoss.prototype.pingDingShuZhongBuyChallengesTimes = function (handler) {
            // var msg: n.C2G_PingDingShuZhong_Buy_Count = n.MessagePool.from(n.C2G_PingDingShuZhong_Buy_Count) as n.C2G_PingDingShuZhong_Buy_Count;
            // this.request(n.MessageMap.C2G_PINGDINGSHUZHONG_BUY_COUNT, msg, utils.Handler.create(this, (data: n.G2C_PingDingShuZhong_Buy_Count) => {
            //     this._pingDingShuZhongBossCount = data.TotalCount;
            //     this._pingDingShuZhongBossBuyCount = data.BuyCount;
            //     if (handler) {
            //         handler.run();
            //     }
            // }));
        };
        /**个人Boss购买挑战次数*/
        ModelGameBoss.prototype.personaBuyChallengesTimes = function (handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_PersonalBoss_Buy_Count);
            this.request(n.MessageMap.C2G_PERSONALBOSS_BUY_COUNT, msg, utils.Handler.create(this, function (data) {
                _this._personaBossCount = data.TotalCount;
                _this._personaBossBuyCount = data.BuyCount;
                if (handler) {
                    handler.run();
                }
            }));
        };
        /**个人boss扫荡 */
        ModelGameBoss.prototype.requestQuickPass = function (copyId, callback, count) {
            if (count && count > 0) {
                _super.prototype.requestQuickPass.call(this, copyId, callback, count);
            }
            else {
                _super.prototype.requestQuickPass.call(this, copyId, callback);
            }
        };
        /**全民Boss购买挑战次数*/
        ModelGameBoss.prototype.everyBuyChallengesTimes = function (handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_PublicBoss_Buy_Count);
            this.request(n.MessageMap.C2G_PUBLICBOSS_BUY_COUNT, msg, utils.Handler.create(this, function (data) {
                _this.everyBossCount = data.LeftCount;
                _this._everyBossCountBuyCount = data.BuyCount;
                var time = (GameModels.timer.getTimer() * .001) >> 0;
                _this.everyBossRestoreTime = time + data.LeftTime;
                if (handler) {
                    handler.run();
                }
            }));
        };
        /**逐鹿中原购买挑战次数*/
        ModelGameBoss.prototype.zhuLuZhongYuanBuyChallengesTimes = function (handler) {
            // var msg: n.C2G_ZhuLuZhongYuan_Buy_Count = n.MessagePool.from(n.C2G_ZhuLuZhongYuan_Buy_Count) as n.C2G_ZhuLuZhongYuan_Buy_Count;
            // this.request(n.MessageMap.C2G_ZHULUZHONGYUAN_BUY_COUNT, msg, utils.Handler.create(this, (data: n.G2C_ZhuLuZhongYuan_Buy_Count) => {
            //     this._zhuLuZhongYuanBossCount = data.TotalCount;
            //     this._zhuLuZhongYuanBossBuyCount = data.BuyCount;
            //     if (handler) {
            //         handler.run();
            //     }
            //     // GameModels.state.updateState(GameRedState.BOSS_COPY_LOSE);
            // }));
        };
        /**请求领取双倍额外奖励*/
        ModelGameBoss.prototype.requestDoubleReward = function () {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Boss_GetExtraReward);
            this.request(n.MessageMap.C2G_BOSS_GETEXTRAREWARD, msg, utils.Handler.create(this, function (data) {
                if (data) {
                    mg.alertManager.tip(Language.C_LQCG);
                    _this.dispatchEventWith(ModelGameBoss.DOUBLEREFRESH);
                }
            }));
        };
        Object.defineProperty(ModelGameBoss.prototype, "hongYanBuyMaxNum", {
            //红颜副本购买上限值
            get: function () {
                var initValue = 0;
                var templateDataSetting = GameModels.dataSet.getDataSettingById(820002);
                if (templateDataSetting)
                    initValue = parseInt(templateDataSetting.value);
                return initValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "hongYanRefreshNum", {
            //红颜副本第二天刷新值
            get: function () {
                var templateDataSetting = GameModels.dataSet.getDataSettingById(820001);
                if (templateDataSetting)
                    return parseInt(templateDataSetting.value);
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        //红颜副本，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelGameBoss.prototype.getHongYanBossBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(821001, order);
        };
        ModelGameBoss.prototype.deathBuyCost = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(831001, order);
        };
        Object.defineProperty(ModelGameBoss.prototype, "deathBossCount", {
            get: function () {
                return this._petDeathBossCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "deathBossBuyCount", {
            get: function () {
                return this._petDeathBossBuyCount;
            },
            enumerable: true,
            configurable: true
        });
        ModelGameBoss.prototype.woorsBuyCost = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(1301001, order);
        };
        Object.defineProperty(ModelGameBoss.prototype, "woorsBossCount", {
            get: function () {
                return this._petWoodsBossCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "woorsBossBuyCount", {
            get: function () {
                return this._petWoodsBossBuyCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "domainBossCount", {
            get: function () {
                return this._godDomainBossCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "autoBossEnabled", {
            get: function () {
                return this._autoBossEnabled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "pingDingShuZhongBossCount", {
            get: function () {
                return this._pingDingShuZhongBossCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "pingDingShuZhongBossBuyCount", {
            get: function () {
                return this._pingDingShuZhongBossBuyCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "personaBossCount", {
            get: function () {
                return this._personaBossCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "personaBossBuyCount", {
            get: function () {
                return this._personaBossBuyCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "zhuLuZhongYuanBossCount", {
            get: function () {
                return this._zhuLuZhongYuanBossCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "zhuLuZhongYuanBossBuyCount", {
            get: function () {
                return this._zhuLuZhongYuanBossBuyCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "token", {
            get: function () {
                return this._hasToken;
            },
            set: function (v) {
                this._hasToken = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "tokenTime", {
            get: function () {
                if (this.token) {
                    var nowTime = GameModels.timer.getPastSecond();
                    var twelve = 43200;
                    var twelvethirty = 45000;
                    var six = 64800;
                    var sixthirty = 66600;
                    if (nowTime >= twelve && nowTime <= twelvethirty) {
                        this._tokenTime = twelvethirty - nowTime;
                    }
                    if (nowTime >= six && nowTime <= sixthirty) {
                        this._tokenTime = sixthirty - nowTime;
                    }
                }
                return this._tokenTime;
            },
            set: function (v) {
                this._tokenTime = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "doubleBol", {
            get: function () {
                return this._doubleBol;
            },
            set: function (v) {
                this._doubleBol = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "doubleRewardCnt", {
            get: function () {
                return this._doubleRewardCnt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "publicBossQuickPassLeftTimes", {
            get: function () {
                return this._publicBossQuickPassLeftTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelGameBoss.prototype, "godDomainQuickPassLeftTimes", {
            get: function () {
                return this._godDomainQuickPassLeftTimes;
            },
            enumerable: true,
            configurable: true
        });
        ModelGameBoss.prototype.tokenHandler = function (data) {
            if (data.Status == 1) {
                this._hasToken = true;
            }
            else {
                this._hasToken = false;
            }
            this.dispatchEventWith(mo.ModelGameBoss.TOKEN_RESFIN);
        };
        ModelGameBoss.prototype.getTokenReward = function (handler) {
            var msg = n.MessagePool.from(n.C2G_Copy_GetJiangJunLing);
            this.request(n.MessageMap.C2G_COPY_GETJIANGJUNLING, msg, utils.Handler.create(this, function (data) {
                if (handler) {
                    handler.run();
                }
                // GameModels.state.updateState(GameRedState.MATERIAL_COPY_FUBEN);
                GameModels.copyMaterial.needUpdate = true;
                GameModels.copyMaterial.updateCopyData(null, null);
                GameModels.copyBoss.requestBossCopyInfo(null);
                GameModels.state.updateState(GameRedState.BOSS_COPY_SELF);
                GameModels.state.updateState(GameRedState.CITY);
            }));
        };
        /**获得已经复活的全民BOSS副本*/
        ModelGameBoss.prototype.getAutoBossVO = function () {
            if (!this._autoBossEnabled)
                return null;
            var copys = this.getCopyList(ModelGameBoss.COPY_EVERYONE, 2, false);
            var myLv = GameModels.user.myConfigLevel;
            var result;
            for (var _i = 0, copys_1 = copys; _i < copys_1.length; _i++) {
                var copyVO = copys_1[_i];
                if (!copyVO.isBossKilled && copyVO.template.openLv <= myLv && copyVO.autoEnter) {
                    return copyVO;
                }
            }
            return null;
        };
        ModelGameBoss.prototype.enableAutoBoss = function () {
            this._autoBossEnabled = true;
        };
        ModelGameBoss.prototype.disableAutoBoss = function () {
            this._autoBossEnabled = false;
        };
        ModelGameBoss.prototype.requestBossAutoState = function (copyVO, state, caller, method) {
            // var msg: n.C2G_Public_Boss_Set_AutoChallenge = n.MessagePool.from(n.C2G_Public_Boss_Set_AutoChallenge) as n.C2G_Public_Boss_Set_AutoChallenge;
            // msg.Step = copyVO.step;
            // msg.Challenge = state ? 1 : 0;
            // this.request(n.MessageMap.C2G_PUBLIC_BOSS_SET_AUTOCHALLENGE, msg,
            //     utils.Handler.create(this, (data: n.G2C_Public_Boss_Set_AutoChallenge) => {
            //         this.getVOByStep(ModelGameBoss.COPY_EVERYONE, data.Step).updateAutoFightState(data.Challenge == 1);
            //         method.call(caller);
            //     }));
        };
        /**全民boss，不包含挑战卷**/
        ModelGameBoss.prototype.checkEveryBossCount = function () {
            if (this._everyBossCount > 0) {
                var copyVOList = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_EVERYONE, 1, true);
                var myLv = GameModels.user.myConfigLevel;
                for (var _i = 0, copyVOList_1 = copyVOList; _i < copyVOList_1.length; _i++) {
                    var copyVO = copyVOList_1[_i];
                    if (copyVO.isBossKilled == false && copyVO.template.openLv <= myLv) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**全民boss**/
        ModelGameBoss.prototype.checkEveryRedPoint = function () {
            // if (GameModels.user.player.level < 50) return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 1))
                return false;
            if (this.checkEveryBossCount())
                return true;
            return false;
        };
        /**个人boss */
        ModelGameBoss.prototype.checkSelfBossCount = function () {
            if (this._personaBossCount <= 0)
                return false;
            var copyVOList = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_PERSONAL);
            if (!copyVOList)
                return false;
            for (var _i = 0, copyVOList_2 = copyVOList; _i < copyVOList_2.length; _i++) {
                var copyVO = copyVOList_2[_i];
                if (copyVO && !copyVO.stateLock) {
                    return true;
                }
            }
            return false;
        };
        /**个人boss**/
        ModelGameBoss.prototype.checkSelfRedPoint = function () {
            // if (GameModels.user.player.level < 50) return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 0))
                return false;
            if (this.checkSelfBossCount())
                return true;
            return false;
        };
        /**皇城平乱（城市boss红点）**/
        ModelGameBoss.prototype.checkCityBossCount = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 6))
                return false;
            var cityCopyList = this.getCopyList(ModelGameBoss.COPY_CITY);
            if (cityCopyList && cityCopyList.length) {
                for (var _i = 0, cityCopyList_1 = cityCopyList; _i < cityCopyList_1.length; _i++) {
                    var copyVO = cityCopyList_1[_i];
                    if (copyVO.curAngry >= copyVO.maxAngry && copyVO.bossHP > 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**逐鹿中原（失落魔域红点）**/
        ModelGameBoss.prototype.checkLoseBossCount = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 4))
                return false;
            var cityCopyList = this.getCopyList(ModelGameBoss.COPY_LOSE);
            if (cityCopyList && cityCopyList.length) {
                for (var _i = 0, cityCopyList_2 = cityCopyList; _i < cityCopyList_2.length; _i++) {
                    var copyVO = cityCopyList_2[_i];
                    if (copyVO.template.openLv <= GameModels.user.myConfigLevel && this.zhuLuZhongYuanBossCount > 0 && copyVO.isOpened && copyVO.refreshTime <= 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelGameBoss.prototype.checkPetCommpound = function (copy) {
            var isCan = false;
            var petItem = Templates.getTemplateById(templates.Map.ITEM, copy.dropPet);
            var pet = Templates.getTemplateById(templates.Map.ITEM, petItem.nextId);
            var needCount = parseInt(pet.extraParam);
            var count = GameModels.bag.getPetSuiCountById(copy.dropPet);
            isCan = count >= needCount;
            return isCan;
        };
        ModelGameBoss.prototype.getOpenTimeArr = function () {
            if (this._timestampArr) {
                return this._timestampArr;
            }
            var copyVO = this.getCopyList(mo.ModelGameBoss.COPY_LOSE)[0];
            var str = copyVO.template.parm1;
            this._timestampArr = [[], [], []];
            var configTime = str.split(";");
            var a1 = [];
            var a2 = [];
            for (var i = 0; i < configTime.length; i++) {
                a1 = configTime[i].split("-");
                for (var j = 0; j < a1.length; j++) {
                    a2 = a1[j].split(":");
                    this._timestampArr[i].push(Number(a2[0]) * 3600 + Number(a2[1]) * 60);
                }
            }
            return this._timestampArr;
        };
        //提前15分钟提示
        ModelGameBoss.prototype.getOpenTimeRemind = function (copyVO) {
            if (copyVO === void 0) { copyVO = null; }
            if (copyVO == null) {
                copyVO = this.getCopyList(mo.ModelGameBoss.COPY_LOSE)[0];
            }
            var tampArr = this.getOpenTimeArr();
            var nowTime = GameModels.timer.getPastSecond();
            for (var i = 0; i < tampArr.length; i++) {
                if ((nowTime + 900) > tampArr[i][0] && nowTime < tampArr[i][0]) {
                    return tampArr[i][0] - nowTime;
                }
            }
            return 0;
        };
        ModelGameBoss.prototype.getBossSpeak = function (copyVO) {
            var data = Templates.getTemplateById(templates.Map.DATAMODEL, copyVO.templateBoss.resId);
            var str = data.Lines;
            return str;
        };
        ModelGameBoss.prototype.getFamilyBossByVipLevel = function (vipLevel) {
            var list = this.getCopyList(mo.ModelGameBoss.COPY_FAMILY);
            var arr = [];
            for (var i = 0; i < list.length; i++) {
                if (parseInt(list[i].template.parm1) == vipLevel) {
                    arr.push(list[i]);
                }
            }
            return arr;
        };
        ModelGameBoss.prototype.getFamilyBossTime = function () {
            var arr = [0, 7200, 14400, 21600, 28800, 36000, 43200, 50400, 57600, 64800, 72000, 79200, 86400];
            var nowTime = GameModels.timer.getPastSecond();
            for (var i = 0; i < arr.length; i++) {
                if (nowTime < arr[i] && nowTime > arr[i - 1]) {
                    return arr[i] - nowTime;
                }
            }
            return 0;
        };
        /**平定蜀中（boss之家红点）**/
        ModelGameBoss.prototype.checkFamilyBossCount = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 3))
                return false;
            if (this.pingDingShuZhongBossCount <= 0)
                return false;
            var familyCopyList = this.getCopyList(ModelGameBoss.COPY_FAMILY);
            if (familyCopyList && familyCopyList.length > 0) {
                for (var i = 0; i < familyCopyList.length; i++) {
                    if (familyCopyList[i].bossHP > 0 && familyCopyList[i].template.openLv <= GameModels.user.myConfigLevel) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelGameBoss.prototype.checkWoorsRed = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.sports, 3)) {
                return false;
            }
            var list = this.getCopyList(mo.ModelGameBoss.COPY_WOODS, 1, true);
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].bossHP > 0 && GameModels.user.player.level >= list[i].openLevel && this._petWoodsBossCount > 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelGameBoss.prototype.checkDeathRed = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.sports, 2)) {
                return false;
            }
            var list = this.getCopyList(mo.ModelGameBoss.COPY_DEATH, 1, true);
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].bossHP > 0 && list[i].template.needCE <= GameModels.common.mieShiHuangMoFigh && GameModels.user.player.level >= list[i].openLevel && this._petDeathBossCount > 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**检查那个个人boos开放了 */
        // public showLockPersonalBoss(cityId: number): void {
        //     var boosList: vo.CopyVO[] = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_PERSONAL);
        //     for (var i = 0; i < boosList.length; i++) {
        //         if (boosList[i].cityId == cityId) {
        //             var data = { item: boosList[i], type: 2 };
        //             mg.TipManager.instance.showTip(tips.CommonUnLockItem, data);
        //             break;
        //         }
        //     }
        // }
        //双倍领取，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelGameBoss.prototype.getDoubleRewardBuyItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(530001, order);
        };
        ModelGameBoss.prototype.updataTime = function (copyVO) {
            this.dispatchEventWith(mo.ModelGameBoss.BOSSREFRESH, false, copyVO);
        };
        ModelGameBoss.prototype.addFightData = function (type, copyVo, isFive) {
            if (copyVo === void 0) { copyVo = null; }
            if (isFive === void 0) { isFive = false; }
            for (var i = this._fightData.length - 1; i >= 0; i--) {
                if (this._fightData[i].type == type) {
                    return;
                }
            }
            var data = { type: type, copyVo: copyVo, isFive: isFive };
            this._fightData.push(data);
        };
        ModelGameBoss.prototype.removeFightData = function (type) {
            for (var i = this._fightData.length - 1; i >= 0; i--) {
                if (this._fightData[i].type == type) {
                    this._fightData.splice(i, 1);
                }
            }
        };
        ModelGameBoss.prototype.getFightData = function (type) {
            for (var i = this._fightData.length - 1; i >= 0; i--) {
                if (this._fightData[i].type == type) {
                    return this._fightData[i];
                }
            }
            return null;
        };
        /**个人副本*/
        ModelGameBoss.COPY_PERSONAL = 301;
        /**全民副本*/
        ModelGameBoss.COPY_EVERYONE = 302;
        /**魔界入侵*/
        ModelGameBoss.COPY_CITY = 303;
        /**失落魔域*/
        ModelGameBoss.COPY_LOSE = 304;
        /**boss之家*/
        ModelGameBoss.COPY_FAMILY = 305;
        /**神域*/
        ModelGameBoss.COPY_DOMAIN = 306;
        /**幻界禁地*/
        ModelGameBoss.COPY_FANTASY = 307;
        /**跨服BOSS*/
        ModelGameBoss.COPY_CROSS_BOSS = 351;
        /**秘境BOSS*/
        ModelGameBoss.COPY_SECRET_BOSS = 352;
        /**九曲之都*/
        ModelGameBoss.COPY_WOODS = 309;
        /**盘古仙境（原灭世荒漠）*/
        ModelGameBoss.COPY_DEATH = 310;
        /**主城节日*/
        ModelGameBoss.COPY_HOLIDAY_BOSS = 99101;
        /**红颜之怒boss*/
        ModelGameBoss.COPY_HONGYAN_BOSS = 66;
        /**远征boss */
        ModelGameBoss.COPY_YUANZHENG_BOSS1 = 71;
        ModelGameBoss.COPY_YUANZHENG_BOSS2 = 72;
        ModelGameBoss.COPY_YUANZHENG_BOSS3 = 73;
        /**势力塔boss */
        ModelGameBoss.COPY_SHILI_WEI = 81;
        ModelGameBoss.COPY_SHILI_SHU = 82;
        ModelGameBoss.COPY_SHILI_WU = 83;
        /**关注的BOSS刷新*/
        ModelGameBoss.BOSS_REBORN = "bossReborn";
        ModelGameBoss.BOSS_REBORN_EVERY = "bossRebornEvery";
        ModelGameBoss.BOSS_REBORN_FAMILY = "bossRebornFamily";
        ModelGameBoss.BOSS_REBORN_HOLIDAY = "bossRebornHoliday";
        ModelGameBoss.BOSS_REBORN_CITY = "bossRebornCity";
        /**BOSS关注*/
        ModelGameBoss.BOSS_REMIND = "bossRemind";
        /**BOSS关注*/
        ModelGameBoss.TOKEN_RESFIN = "tokenresfin";
        /**全民boss刷新 */
        ModelGameBoss.BOSSREFRESH = "BOSSREFRESH";
        /**双倍领取刷新界面 */
        ModelGameBoss.DOUBLEREFRESH = "DOUBLEREFRESH";
        /**boss副本玩家是否自动复活*/
        ModelGameBoss.IMMEDIATELY_REVIVE = false;
        return ModelGameBoss;
    }(mo.ModelCopy));
    mo.ModelGameBoss = ModelGameBoss;
    __reflect(ModelGameBoss.prototype, "mo.ModelGameBoss");
})(mo || (mo = {}));
