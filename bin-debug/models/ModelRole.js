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
    var ModelRole = (function (_super) {
        __extends(ModelRole, _super);
        function ModelRole() {
            var _this = _super.call(this) || this;
            _this._encounterFairyReward = "";
            //根据类型数据获得表里的列表数据
            _this.templetesWingEquip = Templates.getList(templates.Map.HEROWINGEQUIP);
            return _this;
        }
        ModelRole.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._showPoints = mg.assetsManager.playerConfig;
            this._playerVO = GameModels.user.player;
            this.net_requestWingInfo();
            this._isFirstLegion = true;
            this._isTeamJump = true;
            this._isRoleJump = true;
        };
        ModelRole.prototype.getRoleZZBuyLevel = function (level) {
            var deteTemps = GameModels.dataSet.getDataSettingById(560001);
            var str = deteTemps.value.split(";");
            for (var i = 0; i < str.length; i++) {
                if (level >= parseInt(str[i].split("_")[0]) && level <= parseInt(str[i].split("_")[1])) {
                    return parseInt(str[i].split("_")[2]);
                }
            }
            return 0;
        };
        ModelRole.prototype.getShowPoint = function (id) {
            for (var _i = 0, _a = this._showPoints; _i < _a.length; _i++) {
                var object = _a[_i];
                if (object.id == id) {
                    return object;
                }
            }
            return null;
        };
        Object.defineProperty(ModelRole.prototype, "encounterFairyReward", {
            get: function () {
                return this._encounterFairyReward;
            },
            set: function (v) {
                this._encounterFairyReward = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelRole.prototype, "isFirstLegion", {
            set: function (v) {
                this._isFirstLegion = v;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更换头像
         */
        //更换头像
        ModelRole.prototype.requestChangePlayerHead = function (headId, handler) {
            var msg = n.MessagePool.from(n.C2G_Player_SetHeadIcon);
            msg.HeadIconId = headId;
            this.request(n.MessageMap.C2G_PLAYER_SETHEADICON, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    mg.alertManager.tip(Language.J_GHCG);
                    if (handler) {
                        handler.run();
                    }
                }
            }));
        };
        /**全队伍是不是都在八十级且主公经验溢出 */
        ModelRole.prototype.teamHash80lv = function () {
            var count = 0;
            var petFormateArr = GameModels.pet.formatUpVOList;
            for (var _i = 0, petFormateArr_1 = petFormateArr; _i < petFormateArr_1.length; _i++) {
                var petVo = petFormateArr_1[_i];
                if (petVo.lv == 80)
                    count++;
            }
            return count == 5 && GameModels.user.player.exp >= GameModels.user.player.roleLvTemplates.needExp;
        };
        /**主公是否达到100级且主公经验溢出 */
        ModelRole.prototype.roleHash100lv = function () {
            var rolePet = GameModels.pet.getFormatUpVOByPos(0);
            return rolePet.lv == 100 && GameModels.user.player.exp >= GameModels.user.player.roleLvTemplates.needExp;
        };
        Object.defineProperty(ModelRole.prototype, "isTeamJump", {
            get: function () {
                return this._isTeamJump;
            },
            set: function (v) {
                this._isTeamJump = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelRole.prototype, "isRoleJump", {
            get: function () {
                return this._isRoleJump;
            },
            set: function (v) {
                this._isRoleJump = v;
            },
            enumerable: true,
            configurable: true
        });
        /**获取翅膀信息*/
        ModelRole.prototype.net_requestWingInfo = function (handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Wing_Info);
            this.request(n.MessageMap.C2G_WING_INFO, msg, utils.Handler.create(this, function (data) {
                if (_this._wings) {
                    for (var _i = 0, _a = _this._wings; _i < _a.length; _i++) {
                        var _wing1 = _a[_i];
                        n.MessagePool.to(_wing1);
                    }
                    _this._wings = null;
                }
                for (var _b = 0, _c = data.BaseInfo; _b < _c.length; _b++) {
                    var wing = _c[_b];
                    wing.autoRecover = false;
                }
                _this._wings = data.BaseInfo.concat();
                _this.applyWingListData(_this._wings);
                if (_this._wingPostionInfos) {
                    for (var _d = 0, _e = _this._wingPostionInfos; _d < _e.length; _d++) {
                        var wingPos1 = _e[_d];
                        wingPos1.EquipInfo = [];
                        n.MessagePool.to(wingPos1);
                    }
                    _this._wingPostionInfos = null;
                }
                for (var _f = 0, _g = data.PosInfo; _f < _g.length; _f++) {
                    var pos = _g[_f];
                    pos.autoRecover = false;
                }
                _this._wingPostionInfos = data.PosInfo.concat();
                _this.getWingPostionList(_this._wingPostionInfos);
                if (handler) {
                    handler.run();
                }
                _this.updataWingRedPoint();
            }));
        };
        ModelRole.prototype.updataWingRedPoint = function () {
            GameModels.state.updateState(GameRedState.BAOWU_WING_POS1);
            GameModels.state.updateState(GameRedState.BAOWU_WING_POS2);
            GameModels.state.updateState(GameRedState.BAOWU_WING_POS3);
            GameModels.state.updateState(GameRedState.BAOWU_WING_POS4);
            GameModels.state.updateState(GameRedState.BAOWU_WING_POS5);
        };
        /**初始化翅膀数据 */
        ModelRole.prototype.applyWingListData = function (wings) {
            this._wingsInfoList = [];
            for (var _i = 0, wings_1 = wings; _i < wings_1.length; _i++) {
                var wing = wings_1[_i];
                this._wingsInfoList.push(vo.fromPool(vo.WingVO, wing));
            }
            this._wingsInfoList.sort(function (a, b) {
                if (a.type < b.type)
                    return -1;
                if (a.type > b.type)
                    return 1;
                return 0;
            });
        };
        /**初始化翅膀位置数据 */
        ModelRole.prototype.getWingPostionList = function (wingPosArr) {
            if (!wingPosArr)
                return;
            this._wingPostionInfoList = [];
            for (var _i = 0, wingPosArr_1 = wingPosArr; _i < wingPosArr_1.length; _i++) {
                var wingPos = wingPosArr_1[_i];
                this._wingPostionInfoList.push(vo.fromPool(vo.WingPosVO, wingPos));
            }
            this._wingPostionInfoList.sort(function (a, b) {
                if (a.pos < b.pos)
                    return -1;
                if (a.pos > b.pos)
                    return 1;
                return 0;
            });
        };
        Object.defineProperty(ModelRole.prototype, "wingInfoList", {
            get: function () {
                return this._wingsInfoList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelRole.prototype, "wingPostionInfoList", {
            get: function () {
                return this._wingPostionInfoList;
            },
            enumerable: true,
            configurable: true
        });
        /**翅膀激活*/
        ModelRole.prototype.net_requestWingActive = function (type, handler) {
            var msg = n.MessagePool.from(n.C2G_Wing_Active);
            msg.Type = type;
            this.request(n.MessageMap.C2G_WING_ACTIVE, msg, utils.Handler.create(this, function (data) {
                this.updateWingActive(data.Type);
                if (handler) {
                    handler.run();
                }
            }));
        };
        ModelRole.prototype.updateWingActive = function (type) {
            for (var _i = 0, _a = this._wingsInfoList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.type == type) {
                    item.isActive = true;
                }
            }
            this.updataWingRedPoint();
        };
        /**翅膀穿戴*/
        ModelRole.prototype.net_requestWingPutPon = function (type, handler) {
            var msg = n.MessagePool.from(n.C2G_Wing_PutOn);
            msg.Type = type;
            this.request(n.MessageMap.C2G_WING_PUTON, msg, utils.Handler.create(this, function (data) {
                this.updateWingPutPon(data.Type);
                if (handler) {
                    handler.run();
                }
            }));
        };
        ModelRole.prototype.updateWingPutPon = function (type) {
            for (var _i = 0, _a = this._wingsInfoList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.type == type) {
                    item.isPutOn = true;
                }
                else {
                    item.isPutOn = false;
                }
            }
        };
        //获得当前翅膀穿戴位置
        ModelRole.prototype.getWingPutOnIndex = function () {
            if (!this._wingsInfoList || !this._wingsInfoList.length)
                return 0;
            for (var i = 0; i < this._wingsInfoList.length; i++) {
                if (this._wingsInfoList[i].isPutOn) {
                    return i;
                }
            }
            return 0;
        };
        /**翅膀升星*/
        ModelRole.prototype.net_requestWingUpgradeSatr = function (pos, handler, onerr) {
            var msg = n.MessagePool.from(n.C2G_Wing_Upgrade_Star);
            msg.Position = pos;
            this.request(n.MessageMap.C2G_WING_UPGRADE_STAR, msg, utils.Handler.create(this, function (data) {
                this.updateWingStarState(data.Position, data.NewStep, data.NewStar, data.NewExp);
                if (data.IsFree == 1) {
                    this.dispatchEventWith(ModelRole.LUCKY_WING);
                }
                if (handler) {
                    handler.run();
                }
            }));
            n.net.onError(n.MessageMap.C2G_WING_UPGRADE_STAR, utils.Handler.create(this, function (data) {
                if (onerr)
                    onerr.runWith(data);
            }));
        };
        //更新翅膀升星状态
        ModelRole.prototype.updateWingStarState = function (pos, step, star, exp) {
            for (var _i = 0, _a = this._wingPostionInfoList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.pos == pos) {
                    item.setStepStar(step, star, exp);
                }
            }
            this.updataWingRedPoint();
        };
        ModelRole.prototype.updateWingSkillUpgrade = function (type, lv) {
            for (var _i = 0, _a = this._wingsInfoList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.type == type) {
                    item.skillLevel = lv;
                }
            }
        };
        /**神羽穿戴*/
        ModelRole.prototype.net_requestWingGodPutPon = function (pos, type, handler) {
            var msg = n.MessagePool.from(n.C2G_Wing_PutOn_Equip);
            msg.Position = pos;
            msg.Type = type;
            this.request(n.MessageMap.C2G_WING_PUTON_EQUIP, msg, utils.Handler.create(this, function (data) {
                this.updateWingGodPutPon(data.Position, data.Type, data.NewStep);
                if (handler) {
                    handler.run();
                }
            }));
        };
        ModelRole.prototype.updateWingGodPutPon = function (pos, type, step) {
            for (var _i = 0, _a = this.wingPostionInfoList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.pos == pos) {
                    for (var _b = 0, _c = item.wingGodVOs; _b < _c.length; _b++) {
                        var wingGod = _c[_b];
                        if (wingGod.type == type) {
                            wingGod.step = step;
                        }
                    }
                    item.setWingGodMaster();
                }
            }
            this.dispatchEventWith(ModelRole.WING_REFRESH);
        };
        /**神羽升级*/
        ModelRole.prototype.net_requestWingGodUpgrade = function (pos, type, handler) {
            var msg = n.MessagePool.from(n.C2G_Wing_Upgrade_Equip);
            msg.Position = pos;
            msg.Type = type;
            this.request(n.MessageMap.C2G_WING_UPGRADE_EQUIP, msg, utils.Handler.create(this, function (data) {
                this.updateWingGodPutPon(data.Position, data.Type, data.NewStep);
                if (handler) {
                    handler.run();
                }
            }));
        };
        /**神羽合成*/
        ModelRole.prototype.net_requestWingGodCompose = function (type, step, handler) {
            var msg = n.MessagePool.from(n.C2G_Wing_Compose_Equip);
            msg.Type = type;
            msg.Step = step;
            this.request(n.MessageMap.C2G_WING_COMPOSE_EQUIP, msg, utils.Handler.create(this, function (data) {
                var succ = data.Succ == 1 ? true : false;
                if (handler) {
                    handler.runWith(succ);
                }
                this.dispatchEventWith(ModelRole.WING_REFRESH);
            }));
        };
        ModelRole.prototype.getWingGodComposeData = function (type) {
            var composeWingGods = [];
            for (var _i = 0, _a = this.templetesWingEquip; _i < _a.length; _i++) {
                var templete = _a[_i];
                if (templete.type == type) {
                    composeWingGods.push(vo.fromPool(vo.WingGodVO, templete));
                }
            }
            composeWingGods.sort(function (a, b) {
                if (a.step < b.step)
                    return -1;
                if (a.step > b.step)
                    return 1;
                return 0;
            });
            return composeWingGods;
        };
        //获得合成界面类型icon，每个数组的第一个
        ModelRole.prototype.getWingGodComposeItem = function (type) {
            var composeWingGods = this.getWingGodComposeData(type);
            if (composeWingGods) {
                return composeWingGods[0].templateProp;
            }
        };
        /**神羽转换*/
        ModelRole.prototype.net_requestWingGodTransform = function (itemId, targetId, handler) {
            var msg = n.MessagePool.from(n.C2G_Wing_Change_Equip);
            msg.ItemId = itemId;
            msg.TargetItemId = targetId;
            this.request(n.MessageMap.C2G_WING_CHANGE_EQUIP, msg, utils.Handler.create(this, function (data) {
                var succ = data.Succ == 1 ? true : false;
                if (handler) {
                    handler.runWith(succ);
                }
                this.dispatchEventWith(ModelRole.WING_REFRESH);
            }));
        };
        ModelRole.prototype.getWingGodTransfromBagData = function () {
            var wingGodBag = [];
            var f_arr = GameModels.bag.getItemsByType(TypeItem.GODWING_1);
            var x_arr = GameModels.bag.getItemsByType(TypeItem.GODWING_2);
            var r_arr = GameModels.bag.getItemsByType(TypeItem.GODWING_3);
            var l_arr = GameModels.bag.getItemsByType(TypeItem.GODWING_4);
            for (var _i = 0, f_arr_1 = f_arr; _i < f_arr_1.length; _i++) {
                var item0 = f_arr_1[_i];
                wingGodBag.push(item0);
            }
            for (var _a = 0, x_arr_1 = x_arr; _a < x_arr_1.length; _a++) {
                var item1 = x_arr_1[_a];
                wingGodBag.push(item1);
            }
            for (var _b = 0, r_arr_1 = r_arr; _b < r_arr_1.length; _b++) {
                var item2 = r_arr_1[_b];
                wingGodBag.push(item2);
            }
            for (var _c = 0, l_arr_1 = l_arr; _c < l_arr_1.length; _c++) {
                var item3 = l_arr_1[_c];
                wingGodBag.push(item3);
            }
            wingGodBag.sort(function (a, b) {
                if (a.lv < b.lv)
                    return 1;
                if (a.lv > b.lv)
                    return -1;
                return 0;
            });
            this._wingGodTransfromBagData = [];
            for (var _d = 0, wingGodBag_1 = wingGodBag; _d < wingGodBag_1.length; _d++) {
                var item = wingGodBag_1[_d];
                this._wingGodTransfromBagData.push({ item: item, select: false });
            }
        };
        Object.defineProperty(ModelRole.prototype, "wingGodTransfromBagData", {
            get: function () {
                return this._wingGodTransfromBagData;
            },
            enumerable: true,
            configurable: true
        });
        ModelRole.prototype.setTransfromBagDataSelect = function (data) {
            if (data === void 0) { data = null; }
            var dataArr = this._wingGodTransfromBagData;
            for (var i = 0; i < dataArr.length; i++) {
                if (!data) {
                    if (dataArr[i].select)
                        dataArr[i].select = false;
                }
                else {
                    if (dataArr[i].item.id == data.item.id) {
                        dataArr[i].select = true;
                    }
                    else {
                        dataArr[i].select = false;
                    }
                }
            }
        };
        //检测位置下提升按钮，以及神羽红点
        ModelRole.prototype.checkWingPosRed = function (pos) {
            var upgradeBoo = this.checkWingUpgradeRed(pos);
            if (upgradeBoo)
                return true;
            // var posAllBoo: boolean = this.checkWingAllPosRed(pos);
            // if (posAllBoo) return true;
            return false;
        };
        //检测每个位置提升按钮是否有红点
        ModelRole.prototype.checkWingUpgradeRed = function (pos) {
            var checkWingUpgradeEnabledBoo = this.checkWingUpgradeEnabled(pos);
            if (!checkWingUpgradeEnabledBoo)
                return false;
            for (var _i = 0, _a = this._wingPostionInfoList; _i < _a.length; _i++) {
                var posInfo = _a[_i];
                if (posInfo.pos == pos) {
                    var myCount = GameModels.bag.getItemCountById(posInfo.consumeItemId);
                    var needCount = posInfo.consumeItemNum;
                    if (myCount >= needCount && GameModels.user.player.level >= posInfo.template.needLv) {
                        return true;
                    }
                }
            }
            return false;
        };
        //四个神羽有一个有红点，即为有红点
        ModelRole.prototype.checkWingAllPosRed = function (pos) {
            if (!this._wingsInfoList || this._wingsInfoList.length <= 0)
                return false;
            if (!this._wingPostionInfoList || this._wingPostionInfoList.length <= 0)
                return false;
            var boo;
            for (var _i = 0, _a = this._wingPostionInfoList; _i < _a.length; _i++) {
                var wingPosVO = _a[_i];
                if (wingPosVO.pos == pos) {
                    for (var i = 0; i < 4; i++) {
                        boo = this.getEquipSingleTypeIconRedBoo(wingPosVO.wingGodVOs[i], wingPosVO);
                        if (boo)
                            return true;
                    }
                }
            }
            return false;
        };
        //判断提升按钮是否可用，有一个激活，且当前位置不为最高级，即为可用
        ModelRole.prototype.checkWingUpgradeEnabled = function (pos) {
            if (!this._wingsInfoList || this._wingsInfoList.length <= 0)
                return false;
            if (!this._wingPostionInfoList || this._wingPostionInfoList.length <= 0)
                return false;
            var isActive = false;
            for (var _i = 0, _a = this._wingsInfoList; _i < _a.length; _i++) {
                var wing = _a[_i];
                if (wing.isActive) {
                    isActive = true;
                }
            }
            if (isActive) {
                for (var _b = 0, _c = this._wingPostionInfoList; _b < _c.length; _b++) {
                    var posInfo = _c[_b];
                    if (posInfo.pos == pos) {
                        if (posInfo.nextId != -1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        //检测单个翅膀激活有没有红点:条件:未激活且未穿戴并且激活道具数量足够,且在位置为0的情况
        ModelRole.prototype.checkWingActiveRed = function (type) {
            if (!this._wingsInfoList || this._wingsInfoList.length <= 0)
                return false;
            if (!this._wingPostionInfoList || this._wingPostionInfoList.length <= 0)
                return false;
            for (var _i = 0, _a = this._wingsInfoList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.type == type) {
                    if (!item.isPutOn && !item.isActive) {
                        var myCount = GameModels.bag.getItemCountById(item.consumeItemId);
                        var needCount = item.consumeItemNum;
                        if (myCount >= needCount) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        //激活的按钮红点和技能的红点
        ModelRole.prototype.checkWingTypeHeadIconRed = function () {
            var activeBoo = this.checkWingActiveHeadIconRed();
            if (activeBoo)
                return true;
            // var skillBoo: boolean = this.checkWingSkillRed();
            // if (skillBoo) return true;
            return false;
        };
        //头像激活icon红点显示
        ModelRole.prototype.checkWingActiveHeadIconRed = function () {
            if (!this._wingsInfoList || this._wingsInfoList.length <= 0)
                return false;
            if (!this._wingPostionInfoList || this._wingPostionInfoList.length <= 0)
                return false;
            for (var i = 0; i < this._wingsInfoList.length; i++) {
                var data = this._wingsInfoList[i];
                var isWarn = this.checkWingActiveRed(data.type);
                if (isWarn) {
                    return true;
                }
            }
            return false;
        };
        //是否有技能红点
        ModelRole.prototype.checkWingSkillRed = function () {
            for (var i = 0; i < this._wingsInfoList.length; i++) {
                var wingVO = this._wingsInfoList[i];
                if (wingVO.templateWingSkill) {
                    var myCount = GameModels.bag.getItemCountById(wingVO.skillConsumeItemId);
                    var needCount = wingVO.skillConsumeItemNum;
                    if (wingVO.isActive) {
                        if (myCount >= needCount && wingVO.templateWingSkill.nextId != -1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        //判断翅膀按钮是否有红点
        ModelRole.prototype.checkWingRed = function (pos) {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.baowu, 1))
                return false;
            // if (pos >= 0 && pos <= 4) {
            // 	var petVo: vo.GamePetVO = GameModels.pet.getFormatUpVOByPos(pos);
            // 	if (pos != 0 && !petVo) return false;
            // 	if (!this._wingsInfoList || this._wingsInfoList.length <= 0) return false;
            // 	if (!this._wingPostionInfoList || this._wingPostionInfoList.length <= 0) return false;
            // 	if (pos == 0 && this.checkWingTypeHeadIconRed()) return true
            // 	var data: vo.WingPosVO = this._wingPostionInfoList[pos] as vo.WingPosVO;
            // 	if (data && this.checkWingPosRed(data.pos)) return true
            // }
            if (!this._wingsInfoList || this._wingsInfoList.length <= 0)
                return false;
            if (!this._wingPostionInfoList || this._wingPostionInfoList.length <= 0)
                return false;
            if (pos == 0 && this.checkWingTypeHeadIconRed())
                return true;
            var data = this._wingPostionInfoList[pos];
            if (data && this.checkWingPosRed(data.pos))
                return true;
            return false;
        };
        //神羽装备红点和升阶红点
        ModelRole.prototype.getEquipSingleTypeIconRedBoo = function (wingGodVO, wingPosVO) {
            var equipBoo = this.wingGodEquipRedBoo(wingGodVO, wingPosVO);
            if (equipBoo)
                return true;
            var item;
            var myCount;
            var needCount;
            if (wingGodVO.isPutOn) {
                if (wingGodVO.template.nextId == -1) {
                    return false;
                }
                var nextTemp = Templates.getTemplateById(templates.Map.HEROWINGEQUIP, wingGodVO.template.nextId);
                var nextVO = vo.fromPool(vo.WingGodVO, nextTemp);
                item = Templates.getTemplateById(templates.Map.ITEM, nextVO.consumeItemId);
                myCount = GameModels.bag.getItemCountById(nextVO.consumeItemId) + 1; //背包里需要加上当前身上戴的这个
                needCount = nextVO.consumeItemNum;
                if (wingPosVO.template.step >= nextVO.template.needWingLv) {
                    if (myCount >= needCount) {
                        return true;
                    }
                }
            }
            else {
                myCount = GameModels.bag.getItemCountById(wingGodVO.consumeItemId);
                needCount = wingGodVO.consumeItemNum;
                if (wingPosVO.template.step >= wingGodVO.template.needWingLv) {
                    if (myCount >= needCount) {
                        return true;
                    }
                }
            }
            return false;
        };
        //装备神羽按钮的红点
        ModelRole.prototype.wingGodEquipRedBoo = function (wingGodVO, wingPosVO) {
            var template = Templates.getTemplateById(templates.Map.ITEM, wingGodVO.template.id);
            var items = GameModels.bag.getItemsByType(template.type);
            var wingGods = [];
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                var temp = Templates.getTemplateById(templates.Map.HEROWINGEQUIP, item.id);
                var wingGod = vo.fromPool(vo.WingGodVO, temp);
                wingGods.push(wingGod);
            }
            if (wingGods.length <= 0)
                return false;
            if (wingGodVO.template.nextId != -1) {
                for (var _a = 0, wingGods_1 = wingGods; _a < wingGods_1.length; _a++) {
                    var wingGod1 = wingGods_1[_a];
                    //区分激活与未激活是因为两种状态下都是1级
                    if (wingGodVO.isPutOn) {
                        //激活是下一级:背包里的需要等级小于下一级的等级才有红点
                        var nextTemp = Templates.getTemplateById(templates.Map.HEROWINGEQUIP, wingGodVO.template.nextId);
                        if (wingGod1.template.needWingLv < nextTemp.needWingLv) {
                            if (wingGod1.template.step > wingGodVO.template.step) {
                                return true;
                            }
                        }
                    }
                    else {
                        //未激活是是达到自己的等级
                        if (wingPosVO.template.step >= wingGod1.template.needWingLv) {
                            if (wingGod1.template.step >= wingGodVO.template.step) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        //根据类型判断该类型下面是否有可以合成的
        ModelRole.prototype.wingGodComposeRedBoo = function (type) {
            var showWingDods = this.getWingGodComposeData(type);
            var boo = this.getTypeSingleIconRed(showWingDods);
            return boo;
        };
        //类型数据中有一个有红点，就有红点
        ModelRole.prototype.getTypeSingleIconRed = function (wingDods) {
            for (var _i = 0, wingDods_1 = wingDods; _i < wingDods_1.length; _i++) {
                var wingDod = wingDods_1[_i];
                var singleRed = this.getComposeIconRed(wingDod);
                if (singleRed)
                    return true;
            }
            return false;
        };
        //单个消耗的红点
        ModelRole.prototype.getComposeIconRed = function (data) {
            var myCount = GameModels.bag.getItemCountById(data.consumeItemId);
            var needCount = data.consumeItemNum;
            if (myCount >= needCount) {
                return true;
            }
            return false;
        };
        /**功能是否开启 */
        ModelRole.prototype.checkViewIsOpen = function (funId) {
            var gamefun = Templates.getTemplateById(templates.Map.GAMEFUNCTIONS, funId);
            if (!gamefun)
                return false;
            var str = convert.getLevelName(gamefun.openLv);
            var isopen = true;
            if (gamefun.openLv > 1000) {
                if (GameModels.user.player.zhuanShenLevel < Math.floor(gamefun.openLv / 1000)) {
                    isopen = false;
                }
            }
            else {
                if (GameModels.user.player.level < gamefun.openLv) {
                    isopen = false;
                }
            }
            if (GameModels.serverTime.kaifuDay >= gamefun.openDay && isopen) {
                return true;
            }
            return false;
        };
        /**角色和武将升级 */
        ModelRole.prototype.levelUpgrade = function (pos, times, complte, onerr) {
            var msg = n.MessagePool.from(n.C2G_Level_UpgradeLevels);
            msg.Pos = pos;
            msg.Times = times;
            var pet = GameModels.pet.getFormatUpVOByPos(pos);
            var oldLevel = pet.lv;
            this.request(n.MessageMap.C2G_LEVEL_UPGRADELEVELS, msg, utils.Handler.create(this, function (data) {
                if (data.Pos != 0) {
                    var pet = GameModels.pet.getFormatUpVOByPos(data.Pos);
                    if (pet) {
                        pet.lv = data.NewLevel;
                    }
                }
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS1);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS2);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS3);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS4);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS5);
                if (GameModels.bag.baseBingFa.length > 0 && oldLevel < 150 && pet.lv >= 150 && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_8) <= 0) {
                    GameModels.guide.petPos = data.Pos;
                    mg.StoryManager.instance.startBigStory(118, this, this.storyHongYanEndCallFun);
                    GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_8);
                }
                if (complte)
                    complte.runWith(data);
            }));
            n.net.onError(n.MessageMap.C2G_LEVEL_UPGRADELEVELS, utils.Handler.create(this, function (data) {
                if (onerr)
                    onerr.runWith(data);
            }));
        };
        ModelRole.prototype.storyHongYanEndCallFun = function () {
            GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType50000, GameModels.guide.petPos);
        };
        ///////////////////技能相关///////////////////
        ModelRole.SKILL_AND_WUSHUANG_UPGRADE = "SKILL_AND_WUSHUANG_UPGRADE";
        ModelRole.WUSHUANG_GOOUT = "WUSHUANG_GOOUT"; //无双出战
        //翅膀技能升级
        ModelRole.WING_REFRESH = "wingRefresh"; //翅膀界面刷新;
        ModelRole.LUCKY_WING = "LUCKY_WING"; //幸运翅膀
        return ModelRole;
    }(mo.ModelBase));
    mo.ModelRole = ModelRole;
    __reflect(ModelRole.prototype, "mo.ModelRole");
})(mo || (mo = {}));
