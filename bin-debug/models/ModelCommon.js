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
    var ModelCommon = (function (_super) {
        __extends(ModelCommon, _super);
        function ModelCommon() {
            var _this = _super.call(this) || this;
            _this._mieShiHuangMoFight = 0;
            _this._gold = 0;
            _this._exp = 0;
            _this._food = 0;
            _this._foodCount = 0;
            _this._offLineTime = 0;
            return _this;
        }
        ModelCommon.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._oldLevel = 0;
            this._buyType = 0;
            this._voArr = [];
            this._bingFaSkillVoArr = [];
            this._isSelected = false;
            //this._tiaoguoTag = false;
            this._timePickGiftInfo = null;
            this.requestQiangZhengInfo(this, null);
            this.getAllBingFaSkill();
            this.initSecretBook();
            this.requestTimePickGiftInfo();
            n.net.onRoute(n.MessageMap.NOTIFYTIMEPACKGFIT, utils.Handler.create(this, this.notifyTimePickGiftInfo, null, false));
        };
        Object.defineProperty(ModelCommon.prototype, "buyType", {
            get: function () {
                return this._buyType;
            },
            set: function (v) {
                this._buyType = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCommon.prototype, "oldLevel", {
            get: function () {
                return this._oldLevel;
            },
            // public set tiaoguoTag(v: boolean) {
            //     this._tiaoguoTag = v;
            // }
            // public get tiaoguoTag(): boolean {
            //     return this._tiaoguoTag;
            // }
            set: function (v) {
                this._oldLevel = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelCommon.prototype.requestFightNum = function (caller, functionType, method, conlatePet) {
            var _this = this;
            if (conlatePet === void 0) { conlatePet = false; }
            var msg = n.MessagePool.from(n.C2G_Player_GetComponentFightPower);
            msg.Type = functionType;
            this.request(n.MessageMap.C2G_PLAYER_GETCOMPONENTFIGHTPOWER, msg, utils.Handler.create(this, function (data) {
                if (conlatePet) {
                    _this._fightNum = data.FightPower * GameModels.pet.formatUpVOList.length;
                }
                else {
                    _this._fightNum = data.FightPower;
                }
                if (functionType == TypeFunction.MieShiShenZhuang_TATOL) {
                    _this._mieShiHuangMoFight = data.FightPower;
                }
                method.call(caller, _this._fightNum);
            }));
        };
        Object.defineProperty(ModelCommon.prototype, "mieShiHuangMoFigh", {
            get: function () {
                return this._mieShiHuangMoFight;
            },
            enumerable: true,
            configurable: true
        });
        /**字符串解析成为ItemVo */
        ModelCommon.prototype.paserPrizeItems = function (str) {
            if (!this._items)
                this._items = [];
            vo.toPoolList(this._items);
            this._items.length = 0;
            var itemVo = [];
            var items = str.split(";");
            for (var i = 0; i < items.length; i++) {
                var data = items[i].split("_");
                itemVo.push(vo.fromPool(vo.ItemVO, parseInt(data[0])));
                itemVo[i].count = parseInt(data[1]);
                if (data[0] == "901") {
                    var animal = GameModels.animal.getAnimalBuyType(19);
                    if (animal.isAct && animal.step >= 1) {
                        itemVo[i].count = parseInt(data[1]) + Math.ceil(parseInt(data[1]) / 2);
                    }
                }
            }
            this._items = itemVo;
            return this._items;
        };
        /**获取所有兵法技能 */
        ModelCommon.prototype.getAllBingFaSkill = function () {
            var skillTemp = Templates.getList(templates.Map.SKILLNEW);
            for (var _i = 0, skillTemp_1 = skillTemp; _i < skillTemp_1.length; _i++) {
                var temp = skillTemp_1[_i];
                if (temp.group == 2 || temp.group == 12) {
                    var skillVO = vo.fromPool(vo.SkillVO);
                    skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, temp.id), 0);
                    this._bingFaSkillVoArr.push(skillVO);
                }
            }
        };
        ModelCommon.prototype.getBingFaSkillBuyType = function (type) {
            var skillArr = [];
            for (var _i = 0, _a = this._bingFaSkillVoArr; _i < _a.length; _i++) {
                var skill = _a[_i];
                var skillType = parseInt(skill.id.toString().substring(4, 6));
                if (skillType == type) {
                    skillArr.push(skill);
                }
            }
            skillArr.sort(function (a, b) {
                return b.group - a.group;
            });
            return skillArr;
        };
        /**征收 */
        ModelCommon.prototype.requestFood = function (caller, method) {
            var _this = this;
            this._oldLevel = GameModels.user.player.level;
            var msg = n.MessagePool.from(n.C2G_ZhengShou_Normal);
            this.request(n.MessageMap.C2G_ZHENGSHOU_NORMAL, msg, utils.Handler.create(this, function (data) {
                _this._gold = data.RewardInfo.Gold;
                _this._exp = data.RewardInfo.Exp;
                _this._food = data.RewardInfo.Food;
                _this._offLineTime = data.RewardInfo.OffLineTime;
                _this._voArr = [];
                for (var i = 0; i < data.RewardInfo.RewardInfo.length; i++) {
                    var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.RewardInfo.RewardInfo[i]);
                    _this._voArr.push(listVo);
                }
                method.call(caller);
            }));
        };
        Object.defineProperty(ModelCommon.prototype, "gold", {
            get: function () {
                return this._gold;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCommon.prototype, "exp", {
            get: function () {
                return this._exp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCommon.prototype, "food", {
            get: function () {
                return this._food;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCommon.prototype, "offLineTime", {
            get: function () {
                return this._offLineTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCommon.prototype, "voArr", {
            get: function () {
                var str = [];
                if (this._voArr) {
                    this._voArr.sort(function (a, b) {
                        if (a.older != b.older) {
                            return b.older - a.older;
                        }
                        else {
                            return b.quality - a.quality;
                        }
                    });
                    for (var i = 0; i < this._voArr.length; i++) {
                        str.push(this._voArr[i].strText);
                    }
                }
                return str;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCommon.prototype, "foodCount", {
            get: function () {
                return this._foodCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCommon.prototype, "needBuy", {
            get: function () {
                var count = 0;
                if (GameModels.activitySummer.isOpenActivitySummerList(game.sgActivitysummerType.szkh)) {
                    count = count + 2;
                }
                if (GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.activity_103)) {
                    count = count + 2;
                }
                if (!GameModels.vip.getRewardBuyType(5)) {
                    return ((1 + count) - GameModels.common.foodCount) <= 0;
                }
                else {
                    return ((4 + count) - GameModels.common.foodCount) <= 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCommon.prototype, "needLv", {
            get: function () {
                if (this._foodCount == 0) {
                    return 39;
                }
                else if (this._foodCount == 1) {
                    return 45;
                }
                else if (this._foodCount == 2) {
                    return 55;
                }
                else if (this._foodCount >= 3) {
                    return 60;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCommon.prototype, "levyMaxTime", {
            get: function () {
                var totalTime = 43200;
                if (GameModels.user.player.vip > 0) {
                    var vipTemp = GameModels.vip.vipTemplateById(GameModels.user.player.vip);
                    if (vipTemp)
                        return totalTime + (vipTemp.shuiShouTime * (60 * 60));
                }
                else {
                    return totalTime;
                }
            },
            enumerable: true,
            configurable: true
        });
        //强征，根据当前购买次数获取dataSetting表里的购买消耗的元宝数量
        ModelCommon.prototype.getQiangZhengNeedItemNum = function (order) {
            order = order > 100 ? 100 : order;
            order = order <= 0 ? 1 : order;
            return GameModels.dataSet.getBuyCountNeedPrice(590002, order);
        };
        /**强征 */
        ModelCommon.prototype.requestQiangZhengInfo = function (caller, method) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ZhengShou_ForceCnt);
            this.request(n.MessageMap.C2G_ZHENGSHOU_FORCECNT, msg, utils.Handler.create(this, function (data) {
                _this._foodCount = data.ForceCnt;
                GameModels.state.updateState(GameRedState.QIANGZHENG);
                GameModels.state.updateState(GameRedState.ATKCITY);
                if (method)
                    method.call(caller);
            }));
        };
        ModelCommon.prototype.requestQiangZhengFood = function (caller, method) {
            var _this = this;
            this._oldLevel = GameModels.user.player.level;
            var msg = n.MessagePool.from(n.C2G_ZhengShou_Force);
            this.request(n.MessageMap.C2G_ZHENGSHOU_FORCE, msg, utils.Handler.create(this, function (data) {
                _this._gold = data.RewardInfo.Gold;
                _this._exp = data.RewardInfo.Exp;
                _this._food = data.RewardInfo.Food;
                _this._foodCount = data.ForceCnt;
                _this._voArr = [];
                for (var i = 0; i < data.RewardInfo.RewardInfo.length; i++) {
                    var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.RewardInfo.RewardInfo[i]);
                    _this._voArr.push(listVo);
                }
                GameModels.state.updateState(GameRedState.QIANGZHENG);
                GameModels.state.updateState(GameRedState.ATKCITY);
                method.call(caller);
                _this.dispatchEventWith(mo.ModelCommon.QIANGZHENG_CHANGE);
            }));
        };
        Object.defineProperty(ModelCommon.prototype, "isSelected", {
            get: function () {
                return this._isSelected;
            },
            set: function (v) {
                this._isSelected = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelCommon.prototype.checkDAILYACTIVITYRedPoint = function () {
            var hash1 = GameModels.sgActivity.checkRedPoint(game.sgActivityType.mrlc);
            var hash2 = GameModels.sgActivity.checkRedPoint(game.sgActivityType.mrcz);
            var hash3 = GameModels.sgActivity.checkRedPoint(game.sgActivityType.mzth);
            var hash4 = GameModels.sgActivity.checkRedPoint(game.sgActivityType.myth);
            var hash5 = GameModels.sgActivity.checkRedPoint(game.sgActivityType.lchl);
            var hash6 = GameModels.sgActivity.checkWeekCardRedPoint();
            return hash1 || hash2 || hash3 || hash4 || hash5 || hash6;
        };
        ModelCommon.prototype.checkActivityEndRedPoint = function () {
            var hash1 = GameModels.sgActivity.checkRedPoint(game.sgActivityType.mrlc);
            var hash2 = GameModels.sgActivity.checkWeekCardRedPoint();
            var hash3 = GameModels.redPoint.checkMonthCardRedPoint();
            return hash1 || hash2 || hash3;
        };
        ModelCommon.prototype.checkRedPoint = function () {
            if (!app.gameContext)
                return false;
            if (!app.gameContext.manager)
                return false;
            if (!app.gameContext.manager.gameCurrent)
                return false;
            if (app.gameContext.manager.gameCurrent.type != TypeGame.ATKCITY)
                return false;
            var material0 = GameModels.copyMaterial.checkMaterialRedPointBuyPos(0);
            var material1 = GameModels.copyMaterial.checkMaterialRedPointBuyPos(1);
            var material2 = GameModels.copyMaterial.checkMaterialRedPointBuyPos(2);
            var material3 = GameModels.copyMaterial.checkMaterialRedPointBuyPos(3);
            var activityNotice = GameModels.activityNotice.checkKingbattlefieldHed();
            var copyPet = GameModels.oneCountRedPoint.checkWushenViewRedPoint();
            var copyLock = GameModels.oneCountRedPoint.checkShilianViewRedPoint();
            var smithy = GameModels.smithy.checkRedPoint();
            var chengzhuang1 = GameModels.equip.checkChengEqiup(0);
            var chengzhuang2 = GameModels.equip.checkChengEqiup(1);
            var chengzhuang3 = GameModels.equip.checkChengEqiup(2);
            var chengzhuang4 = GameModels.equip.checkChengEqiup(3);
            var chengzhuang5 = GameModels.equip.checkChengEqiup(4);
            var ladderChest = GameModels.ladder.checkMadelChest();
            var ladderRank = GameModels.ladder.checkLadderReward();
            var everyBoss = GameModels.copyBoss.checkEveryRedPoint();
            var selfBoss = GameModels.copyBoss.checkSelfRedPoint();
            var domainBoss = GameModels.copyBoss.checkDomainBossCount();
            var wenGuan = GameModels.wenguanTask.checkWenGuan();
            var wuGuan = GameModels.legion.canLingQuFengLu();
            return material0 || material1 || material2 || material3 || activityNotice || copyPet || copyLock || smithy || ladderChest
                || ladderRank || everyBoss || selfBoss || domainBoss || chengzhuang1 || chengzhuang2 || chengzhuang3 || chengzhuang4 ||
                chengzhuang5 || wenGuan || wuGuan;
        };
        ModelCommon.prototype.checkRedPoint1 = function () {
            if (!app.gameContext)
                return false;
            if (!app.gameContext.manager)
                return false;
            if (!app.gameContext.manager.gameCurrent)
                return false;
            if (app.gameContext.manager.gameCurrent.type != TypeGame.CITY)
                return false;
            if (GameModels.scene.getjoinSceneListByType(TypeGame.CHAPTER_BOSS)) {
                return false;
            }
            if (GameModels.scene.getjoinSceneListByType(TypeGame.DOOR_BOSS)) {
                return false;
            }
            var shengzhi = GameModels.redPoint.checkShengZhiRedPoint();
            var petGroup = GameModels.petGroup.checkPetGroupRedPoint();
            var mingjiangTask = GameModels.mingJiangTask.checkRedPoint();
            return shengzhi || petGroup || mingjiangTask || this.checkQiangZhengRedPoint();
        };
        ModelCommon.prototype.checkGuanZhiRedPoint = function () {
            var wenguan = GameModels.wenguanTask.checkWenGuan();
            var wuguan = GameModels.legion.canLingQuFengLu();
            return wenguan || wuguan;
        };
        ModelCommon.prototype.checkQiangZhengRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.qiangzheng))
                return false;
            var count = 0;
            if (GameModels.vip && GameModels.vip.specailCardDate.length > 0 && GameModels.vip.getRewardBuyType(5)) {
                count = 12;
            }
            else {
                count = 4;
            }
            if (count - this._foodCount > 0 && GameModels.user.player.level >= this.needLv)
                return true;
            return false;
        };
        ModelCommon.prototype.checkTreasureRedPoint1 = function () {
            var hash1 = GameModels.tavern.checkRedPoint();
            //var hash2: boolean = GameModels.smokepet.checkSmokePetRedPoint();
            return hash1;
        };
        ModelCommon.prototype.checkTreasureRedPoint2 = function () {
            //var hash1: boolean = GameModels.tavern.checkRedPoint();
            var hash2 = GameModels.smokepet.checkSmokePetRedPoint();
            return hash2;
        };
        /**秘典相关配置 */
        ModelCommon.prototype.initSecretBook = function () {
            this._secretBookTempArr = [];
            this._secretBookTempArr = Templates.getList(templates.Map.SECRETBOOK);
        };
        ModelCommon.prototype.getSecretBookTempBuyType = function (type) {
            var secretBookTemp = [];
            for (var i = 0; i < this._secretBookTempArr.length; i++) {
                if (this._secretBookTempArr[i].type == type) {
                    secretBookTemp.push(this._secretBookTempArr[i]);
                }
            }
            secretBookTemp.sort(function (a, b) {
                return a.order - b.order;
            });
            return secretBookTemp;
        };
        /** 测试升级的龙骨的代码 */
        ModelCommon.prototype.showUpLvDragonBone = function (s1, s2) {
            if (s2 <= s1) {
                logger.log("格式输入不对,后面的等级要大于前面", 0xff0000);
                return;
            }
            var sCurr = s1.toString();
            var sNext = s2.toString();
            if (sCurr.length == 1 && sNext.length == 3) {
                logger.log("没有个到百的龙骨");
                return;
            }
            if (this._lvMovie)
                this._lvMovie.stop();
            if (this._lvMovie && this._lvMovie.parent) {
                this._lvMovie.parent.removeChild(this._lvMovie);
                this._lvMovie = null;
            }
            this._lvMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
            this._lvMovie.resId = "jiesuan_lvup";
            var animationName = "gg";
            if (sCurr.length == 1) {
                if (sNext.length == 1) {
                    animationName = "gg";
                    this._lvMovie.replaceSlotImage("lv3", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                    this._lvMovie.replaceSlotImage("lv6", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                }
                else {
                    animationName = "gs";
                    this._lvMovie.replaceSlotImage("lv3", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                    this._lvMovie.replaceSlotImage("lv5", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                    this._lvMovie.replaceSlotImage("lv6", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                }
            }
            else if (sCurr.length == 2) {
                if (sNext.length == 2) {
                    animationName = "ss";
                    this._lvMovie.replaceSlotImage("lv2", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                    this._lvMovie.replaceSlotImage("lv3", sCurr[1] ? "chapterMap_json." + sCurr[1] : "");
                    this._lvMovie.replaceSlotImage("lv5", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                    this._lvMovie.replaceSlotImage("lv6", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                }
                else {
                    animationName = "sb";
                    this._lvMovie.replaceSlotImage("lv2", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                    this._lvMovie.replaceSlotImage("lv3", sCurr[1] ? "chapterMap_json." + sCurr[1] : "");
                    this._lvMovie.replaceSlotImage("lv4", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                    this._lvMovie.replaceSlotImage("lv5", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                    this._lvMovie.replaceSlotImage("lv6", sNext[2] ? "chapterMap_json." + sNext[2] : "");
                }
            }
            else {
                animationName = "bb";
                this._lvMovie.replaceSlotImage("lv1", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                this._lvMovie.replaceSlotImage("lv2", sCurr[1] ? "chapterMap_json." + sCurr[1] : "");
                this._lvMovie.replaceSlotImage("lv3", sCurr[2] ? "chapterMap_json." + sCurr[2] : "");
                this._lvMovie.replaceSlotImage("lv4", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                this._lvMovie.replaceSlotImage("lv5", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                this._lvMovie.replaceSlotImage("lv6", sNext[2] ? "chapterMap_json." + sNext[2] : "");
            }
            this._lvMovie.x = mg.stageManager.stageWidth / 2;
            this._lvMovie.y = mg.stageManager.stageHeight / 2;
            mg.stageManager.stage.addChild(this._lvMovie);
            this._lvMovie.playOnce(animationName);
        };
        /**合成红点 */
        ModelCommon.prototype.checkCommpentHeChengRedPoint = function () {
            var jiuxing = this.checkJiuXingHeChengRedPoint();
            var liudao = this.checkLiuFDaoHeChengRedPoint();
            var bingfa = this.checkBingFaHeChengRedPoint();
            return jiuxing || liudao || bingfa;
        };
        ModelCommon.prototype.checkJiuXingHeChengRedPoint = function () {
            for (var i = 1; i < 6; i++) {
                var propIdArr = GameModels.hecheng.getItemsByTypeAndStep(TypeEquip.JIUQU_EQIUP, i, true);
                for (var j = 0; j < propIdArr.length; j++) {
                    if (GameModels.bag.getEquipCountById(propIdArr[j]) >= 3) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelCommon.prototype.checkLiuFDaoHeChengRedPoint = function () {
            for (var i = 1; i < 6; i++) {
                var propIdArr = GameModels.hecheng.getItemsByTypeAndStep(TypeEquip.LIUDAO_EQIUP, i, true);
                for (var j = 0; j < propIdArr.length; j++) {
                    if (GameModels.bag.getEquipCountById(propIdArr[j]) >= 3) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelCommon.prototype.checkBingFaHeChengRedPoint = function () {
            for (var z = 2; z < 7; z++) {
                var allPropIdArr = [];
                var propIdArr = GameModels.hecheng.getItemsByTypeAndStep(TypeItem.BINGFA_BOOK, z, false);
                for (var i = 0; i < propIdArr.length; i++) {
                    var count = GameModels.bag.getBingFaCountById(propIdArr[i]);
                    for (var j = 0; j < count; j++) {
                        allPropIdArr.push(propIdArr[i]);
                    }
                }
                if (allPropIdArr.length >= 5)
                    return true;
            }
            return false;
        };
        Object.defineProperty(ModelCommon.prototype, "timeGiftInfo", {
            get: function () {
                return this._timePickGiftInfo;
            },
            enumerable: true,
            configurable: true
        });
        //请求信息
        ModelCommon.prototype.requestTimePickGiftInfo = function () {
            var msg = n.MessagePool.from(n.C2G_TimePack_GetInfo);
            this.notify(n.MessageMap.C2G_TIMEPACK_GETINFO, msg);
        };
        ModelCommon.prototype.notifyTimePickGiftInfo = function (data) {
            if (this._timePickGiftInfo) {
                n.MessagePool.to(this._timePickGiftInfo);
                this._timePickGiftInfo = null;
            }
            // //有剩余时间且有任意一个没领取
            if (data.GiftInfo.LeftTime > 0 && (data.GiftInfo.Status1 < 2 || data.GiftInfo.Status2 < 2)) {
                this._timePickGiftInfo = data.GiftInfo;
                data.autoRecover = false;
                if (!mg.uiManager.isOpen(MainTimePickGift)) {
                    mg.uiManager.show(MainTimePickGift);
                }
            }
            GameModels.state.updateState(GameRedState.TIMEPICK_GIFT);
            this.dispatchEventWith(mo.ModelCommon.CHANGE_TIMEPICKGIFT_INFO);
        };
        /**领取奖励*/
        ModelCommon.prototype.requestyGetRewardTimePickGift = function (type, complete) {
            var msg = n.MessagePool.from(n.C2G_TimePack_GetReward);
            msg.RewardIdx = type;
            this.request(n.MessageMap.C2G_TIMEPACK_GETREWARD, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    if (complete)
                        complete.runWith(data);
                }
            }));
        };
        ModelCommon.prototype.checkTimePickGiftRedPoint = function () {
            if (!this._timePickGiftInfo)
                return false;
            if (this._timePickGiftInfo.Status1 == 1 || this._timePickGiftInfo.Status2 == 1)
                return true;
        };
        ModelCommon.QIANGZHENG_CHANGE = "QIANGZHENG_CHANGE";
        ModelCommon.CHANGE_TIMEPICKGIFT_INFO = "CHANGE_TIMEPICKGIFT_INFO";
        return ModelCommon;
    }(mo.ModelBase));
    mo.ModelCommon = ModelCommon;
    __reflect(ModelCommon.prototype, "mo.ModelCommon");
})(mo || (mo = {}));
