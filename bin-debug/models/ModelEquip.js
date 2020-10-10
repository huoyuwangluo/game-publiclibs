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
    var ModelEquip = (function (_super) {
        __extends(ModelEquip, _super);
        function ModelEquip() {
            return _super.call(this) || this;
        }
        ModelEquip.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._useNewEquips = [];
            this._itemWay = [];
        };
        ModelEquip.prototype.initializeData = function () {
            this.requesNewEquips(0);
            this.initShenZhuang();
        };
        /**新的装备体系 */
        ModelEquip.prototype.initNewEquips = function (data) {
            this._useNewEquips = [];
            for (var i = 0; i < data.length; i++) {
                var equipVO = vo.fromPool(vo.EquipVO, data[i]);
                this._useNewEquips.push(equipVO);
            }
        };
        /**设置锁 */
        ModelEquip.prototype.requesSetLockNewEquips = function (isLock, gridId, handler) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_NewEquip_SetLock);
            cmd.IsLock = isLock;
            cmd.GridId = gridId;
            this.request(n.MessageMap.C2G_NEWEQUIP_SETLOCK, cmd, utils.Handler.create(this, function (data) {
                var items = GameModels.bag.equips.source;
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    if (item.index == data.GridId) {
                        item.isLock = data.IsLock;
                        break;
                    }
                }
                _this.dispatchEventWith(ModelEquip.LOCK_EQUIP_CHANGE);
                if (handler)
                    handler.runWith(data);
            }));
        };
        ModelEquip.prototype.requesNewEquips = function (eqiupType, handler) {
            var _this = this;
            if (eqiupType === void 0) { eqiupType = 0; }
            var cmd = n.MessagePool.from(n.C2G_NewEquip_Infos);
            cmd.EquipType = eqiupType;
            this.request(n.MessageMap.C2G_NEWEQUIP_INFOS, cmd, utils.Handler.create(this, function (data) {
                _this.initNewEquips(data.NewEquipInfo);
                _this.updataEqiupRedPoint();
                if (handler)
                    handler.run();
            }));
        };
        /**新的装备卸下 */
        ModelEquip.prototype.requesVailNewEquips = function (rolePos, eqiupPos, handler) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_NewEquip_Vail);
            cmd.Position = eqiupPos;
            cmd.RoomPos = rolePos;
            this.request(n.MessageMap.C2G_NEWEQUIP_VAIL, cmd, utils.Handler.create(this, function (data) {
                for (var i = 0; i < _this._useNewEquips.length; i++) {
                    if (_this._useNewEquips[i].rolePos == data.RoomPos && _this._useNewEquips[i].pos == data.Position) {
                        _this._useNewEquips[i].refId = 0;
                        _this.dispatchEventWith(ModelEquip.USE_EQUIP_CHANGE, false, _this._useNewEquips[i].pos);
                        break;
                    }
                }
                _this.updataEqiupRedPoint();
                if (handler)
                    handler.run();
            }));
        };
        /**新的装备穿戴 */
        ModelEquip.prototype.requesDressNewEquips = function (rolePos, eqiupPos, gridId, handler) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_NewEquip_Dress);
            cmd.Position = eqiupPos;
            cmd.RoomPos = rolePos;
            cmd.GridId = gridId;
            this.request(n.MessageMap.C2G_NEWEQUIP_DRESS, cmd, utils.Handler.create(this, function (data) {
                for (var i = 0; i < _this._useNewEquips.length; i++) {
                    if (_this._useNewEquips[i].rolePos == data.RoomPos && _this._useNewEquips[i].pos == data.Position) {
                        _this._useNewEquips[i].refId = data.RefId;
                        _this.dispatchEventWith(ModelEquip.USE_EQUIP_CHANGE, false, _this._useNewEquips[i].pos);
                        break;
                    }
                }
                _this.updataEqiupRedPoint();
                if (handler)
                    handler.run();
            }));
        };
        /**新的装备合成 */
        ModelEquip.prototype.requesHeChengNewEquips = function (rolePos, eqiupPos, handler) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_NewEquip_Upgrade);
            cmd.RoomPos = rolePos;
            cmd.Position = eqiupPos;
            this.request(n.MessageMap.C2G_NEWEQUIP_UPGRADE, cmd, utils.Handler.create(this, function (data) {
                for (var i = 0; i < _this._useNewEquips.length; i++) {
                    if (_this._useNewEquips[i].rolePos == data.RoomPos && _this._useNewEquips[i].pos == data.Position) {
                        _this._useNewEquips[i].refId = data.RefId;
                        _this.dispatchEventWith(ModelEquip.USE_EQUIP_CHANGE, false, _this._useNewEquips[i].pos);
                        break;
                    }
                }
                _this.updataEqiupRedPoint();
                if (handler)
                    handler.run();
            }));
        };
        /**新的装备一键穿戴 */
        ModelEquip.prototype.requesOneDressNewEquips = function (rolePos, startPos, endPos) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_NewEquip_AllDress);
            cmd.RoomPos = rolePos;
            cmd.StartPos = startPos;
            cmd.EndPos = endPos;
            this.request(n.MessageMap.C2G_NEWEQUIP_ALLDRESS, cmd, utils.Handler.create(this, function (data) {
                _this.dispatchEventWith(ModelEquip.USE_EQUIP_CHANGE, false, _this.updateNewEquipList(data.NewEquipInfo, data.RoomPos));
                _this.updataEqiupRedPoint();
            }));
        };
        /**新的装备一键卸下 */
        ModelEquip.prototype.requesOneVailNewEquips = function (rolePos, startPos, endPos, handler) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_NewEquip_AllVail);
            cmd.RoomPos = rolePos;
            cmd.StartPos = startPos;
            cmd.EndPos = endPos;
            this.request(n.MessageMap.C2G_NEWEQUIP_ALLVAIL, cmd, utils.Handler.create(this, function (data) {
                _this.dispatchEventWith(ModelEquip.USE_EQUIP_CHANGE, false, _this.updateNewEquipList(data.NewEquipInfo, data.RoomPos));
                _this.updataEqiupRedPoint();
                if (handler)
                    handler.run();
            }));
        };
        /**新的装备熔炼 */
        ModelEquip.prototype.requesHuiShouNewEquips = function (type, gridId, handler) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_NewEquip_HuiShou);
            cmd.GridIdList = gridId;
            cmd.Type = type;
            this.request(n.MessageMap.C2G_NEWEQUIP_HUISHOU, cmd, utils.Handler.create(this, function (data) {
                if (handler)
                    handler.run();
                _this.dispatchEventWith(ModelEquip.DEL_EQUIP_CHANGE);
                _this.updataEqiupRedPoint();
                if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.WARE) {
                    if (!GameModels.equip.checkEqiupRedPoint(GameModels.task.curTask.template.functionParams)) {
                        GameModels.task.curTask.clientTaskType = true;
                    }
                }
            }));
        };
        ModelEquip.prototype.clearNewEquipList = function (rolePos) {
            for (var i = 0; i < this._useNewEquips.length; i++) {
                if (this._useNewEquips[i].rolePos == rolePos) {
                    this._useNewEquips[i].refId = 0;
                }
            }
            this.dispatchEventWith(ModelEquip.DEL_EQUIP_CHANGE);
        };
        ModelEquip.prototype.updateNewEquipList = function (data, rolePos) {
            var news = [];
            for (var i = 0; i < this._useNewEquips.length; i++) {
                if (this._useNewEquips[i].rolePos == rolePos) {
                    for (var j = 0; j < data.length; j++) {
                        if (this._useNewEquips[i].pos == data[j].Position) {
                            this._useNewEquips[i].refId = data[j].RefId;
                            news.push(this._useNewEquips[i].pos);
                        }
                    }
                }
            }
            return news;
        };
        ModelEquip.prototype.useNewEquipsByPos = function (pos) {
            if (!this._useNewEquips)
                return null;
            for (var i = 0; i < this._useNewEquips.length; i++) {
                if (this._useNewEquips[i].pos == pos) {
                    return this._useNewEquips[i];
                }
            }
            return null;
        };
        ModelEquip.prototype.useNewEquipsByType = function (type) {
            var equip = [];
            if (!this._useNewEquips)
                return;
            for (var i = 0; i < this._useNewEquips.length; i++) {
                if (Math.floor(this._useNewEquips[i].pos / 10) == type) {
                    equip.push(this._useNewEquips[i]);
                }
            }
            equip.sort(function (a, b) {
                return a.pos - b.pos;
            });
            return equip;
        };
        ModelEquip.prototype.useNewEquipsByTypeAndRoomPos = function (type, roomPos) {
            var equip = [];
            if (!this._useNewEquips)
                return;
            for (var i = 0; i < this._useNewEquips.length; i++) {
                if (this._useNewEquips[i].rolePos == roomPos && Math.floor(this._useNewEquips[i].pos / 10) == type) {
                    equip.push(this._useNewEquips[i]);
                }
            }
            equip.sort(function (a, b) {
                return a.pos - b.pos;
            });
            return equip;
        };
        Object.defineProperty(ModelEquip.prototype, "useNewEquips", {
            get: function () {
                return this._useNewEquips;
            },
            enumerable: true,
            configurable: true
        });
        /**神装 */
        ModelEquip.prototype.initShenZhuang = function () {
            var num = [150101, 150201, 150301, 150401, 150501, 150601, 150701, 150801];
            for (var i = 0; i < num.length; i++) {
                var temp = Templates.getTemplateById(templates.Map.EQUIP, num[i]);
                this._itemWay.push(temp);
            }
        };
        Object.defineProperty(ModelEquip.prototype, "shenZhuangEqiupTemp", {
            get: function () {
                if (!this._itemWay)
                    return;
                return this._itemWay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelEquip.prototype, "shenZhuangName", {
            get: function () {
                var str = [];
                for (var i = 0; i < this._itemWay.length; i++) {
                    str.push(this._itemWay[i].name);
                }
                return str;
            },
            enumerable: true,
            configurable: true
        });
        ModelEquip.prototype.getDefaultStarTemp = function (vo) {
            var str = [];
            for (var i = 0; i < vo.length; i++) {
                var temp = Templates.getStarEquipsTempByPosAndTypeAndStep(templates.Map.EQUIP, "type", "pos", "step", TypeEquip.XINGCHEN_EQIUP, vo[i].pos, 1);
                str.push(temp);
            }
            return str;
        };
        ModelEquip.prototype.isHashHigherEqiup = function (step, pos) {
            var bagEquips = GameModels.bag.getEquipsByPos(pos);
            if (bagEquips) {
                for (var i = 0; i < bagEquips.length; i++) {
                    if (bagEquips[i].templateEquip.step > step) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**获取九星六道套装 */
        ModelEquip.prototype.getSystemSuit = function (type, groupStep) {
            this._systemEquip = null;
            this._systemEquip = Templates.getTuMoEquipsTempBySubTypeAndGroupCount(templates.Map.SYSTEMSUIT, "type", "groupStep", type, groupStep);
            return this._systemEquip;
        };
        ModelEquip.prototype.updataEqiupRedPoint = function () {
            GameModels.state.updateState(GameRedState.ROLE_JIUXING_POS1);
            GameModels.state.updateState(GameRedState.ROLE_JIUXING_POS2);
            GameModels.state.updateState(GameRedState.ROLE_JIUXING_POS3);
            GameModels.state.updateState(GameRedState.ROLE_JIUXING_POS4);
            GameModels.state.updateState(GameRedState.ROLE_JIUXING_POS5);
            GameModels.state.updateState(GameRedState.ROLE_LIUDAO_POS1);
            GameModels.state.updateState(GameRedState.ROLE_LIUDAO_POS2);
            GameModels.state.updateState(GameRedState.ROLE_LIUDAO_POS3);
            GameModels.state.updateState(GameRedState.ROLE_LIUDAO_POS4);
            GameModels.state.updateState(GameRedState.ROLE_LIUDAO_POS5);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS1);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS2);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS3);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS4);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS5);
            GameModels.state.updateState(GameRedState.DAZAO_CHENGZHUANG_POS1);
            GameModels.state.updateState(GameRedState.DAZAO_CHENGZHUANG_POS2);
            GameModels.state.updateState(GameRedState.DAZAO_CHENGZHUANG_POS3);
            GameModels.state.updateState(GameRedState.DAZAO_CHENGZHUANG_POS4);
            GameModels.state.updateState(GameRedState.DAZAO_CHENGZHUANG_POS5);
        };
        /**位置升级红点 */
        ModelEquip.prototype.checkPosUpRedPoint = function (pos) {
            if (pos == 0) {
                return false;
            }
            else {
                var petVo = GameModels.pet.getFormatUpVOByPos(pos);
                if (!petVo)
                    return false;
                var generallv = petVo.petLvTemplates;
                if (GameModels.user.player.level < 50 && petVo.lv == GameModels.user.player.level)
                    return false;
                if (generallv && generallv.nextId != -1) {
                    var strArr = generallv.consume.split("_");
                    var bagCount = GameModels.bag.getItemCountById(strArr[0]);
                    var needCount = parseInt(strArr[1]);
                    if (GameModels.user.player.level < 50) {
                        if (bagCount >= (needCount * 5) && petVo.lv < petVo.generalBraekTmp.levelOpen && GameModels.user.player.level - petVo.lv >= 5) {
                            return true;
                        }
                    }
                    else {
                        if (petVo.lv < 200) {
                            if (bagCount >= (needCount * 5) && petVo.lv < petVo.generalBraekTmp.levelOpen) {
                                return true;
                            }
                        }
                        else {
                            if (bagCount >= needCount && petVo.lv < petVo.generalBraekTmp.levelOpen) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        /**装备红点*/
        ModelEquip.prototype.checkEqiupRedPoint = function (data) {
            if (data >= 0 && data <= 4) {
                var petVo = GameModels.pet.getFormatUpVOByPos(data);
                if (data != 0 && !petVo)
                    return false;
                var equipArr = this.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, data);
                if (!equipArr)
                    return false;
                for (var i = 0; i < 4; i++) {
                    if (equipArr[i]) {
                        if (equipArr[i].refId) {
                            if (!equipArr[i].templateEquip)
                                return false;
                            if (this.isHashHigherJiChuEqiup(equipArr[i].templateEquip, equipArr[i].pos, data == 0 ? GameModels.user.player.level : petVo.lv))
                                return true;
                        }
                        else {
                            if (this.isHashHigherJiChuEqiup(null, equipArr[i].pos, data == 0 ? GameModels.user.player.level : petVo.lv))
                                return true;
                        }
                    }
                }
            }
            return false;
        };
        /**兵法红点*/
        ModelEquip.prototype.checkBingFaRedPoint = function (data) {
            if (data >= 0 && data <= 4) {
                var petVo = GameModels.pet.getFormatUpVOByPos(data);
                if (!petVo)
                    return false;
                for (var i = 0; i < 2; i++) {
                    var listVo = petVo.getBingFaVOListByPos(i);
                    if (!listVo) {
                        if (petVo.generalBraekTmp.bingfaOpen > i && GameModels.bag.bingFa.source.length > 0) {
                            if (i == 0) {
                                if (petVo.lv >= 150)
                                    return true;
                            }
                            else {
                                return true;
                            }
                        }
                    }
                    else {
                        if (GameModels.bag && GameModels.bag.isHashHigherBingFaChange(listVo.quality))
                            return true;
                    }
                }
            }
            return false;
        };
        ModelEquip.prototype.isHashHigherJiChuEqiup = function (eqiup, pos, level) {
            if (level === void 0) { level = 0; }
            var bagEquips = GameModels.bag.getEquipsByPos(pos);
            if (!eqiup) {
                if (bagEquips) {
                    for (var i = 0; i < bagEquips.length; i++) {
                        if (bagEquips[i].lv > level)
                            continue;
                        if (utils.htmlUtil.computeModelTatolFighting(bagEquips[i].templateEquip.properties) > 0) {
                            return true;
                        }
                    }
                }
            }
            else {
                if (bagEquips) {
                    for (var i = 0; i < bagEquips.length; i++) {
                        if (bagEquips[i].lv > level)
                            continue;
                        if (utils.htmlUtil.computeModelTatolFighting(bagEquips[i].templateEquip.properties) > utils.htmlUtil.computeModelTatolFighting(eqiup.properties)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        ModelEquip.prototype.checkEqiup = function (data) {
            if (this.checkPosUpRedPoint(data))
                return true;
            if (this.checkEqiupRedPoint(data))
                return true;
            if (this.checkBingFaRedPoint(data))
                return true;
            if (data > 0 && data <= 4) {
                var isUnLock = GameModels.pet.isPosUnLock(data);
                var hasPet = GameModels.pet.hasPetPos(data);
                if (data == 1 || data == 2) {
                    if (isUnLock && !hasPet && GameModels.pet.hashJinZhanPet)
                        return true;
                }
                else {
                    if (isUnLock && !hasPet && GameModels.pet.hashYuanChengPet)
                        return true;
                }
                var petVo = GameModels.pet.getFormatUpVOByPos(data);
                if (petVo) {
                    if (GameModels.pet.isHashHigherPetChange(petVo))
                        return true;
                }
            }
            return false;
        };
        /**六道红点*/
        ModelEquip.prototype.checkLiuDaoRedPoint = function (data) {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.role, 3))
                return false;
            if (data >= 0 && data <= 4) {
                var petVo = GameModels.pet.getFormatUpVOByPos(data);
                if (!petVo)
                    return false;
                if (petVo.star < 8)
                    return false;
                var equipArr = this.useNewEquipsByTypeAndRoomPos(TypeEquip.LIUDAO_EQIUP, data);
                if (!equipArr)
                    return false;
                for (var i = 0; i < 6; i++) {
                    if (equipArr[i]) {
                        if (equipArr[i].refId) {
                            if (!equipArr[i].templateEquip)
                                return false;
                            if (this.isHashHigherEqiup(equipArr[i].templateEquip.step, equipArr[i].pos))
                                return true;
                        }
                        else {
                            if (this.isHashHigherEqiup(0, equipArr[i].pos))
                                return true;
                        }
                    }
                }
            }
            return false;
        };
        /**九星红点*/
        ModelEquip.prototype.checkJiuXingRedPoint = function (data) {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.role, 2))
                return false;
            if (data >= 0 && data <= 4) {
                var petVo = GameModels.pet.getFormatUpVOByPos(data);
                if (!petVo)
                    return false;
                if (petVo.star < 7)
                    return false;
                var equipArr = this.useNewEquipsByTypeAndRoomPos(TypeEquip.JIUQU_EQIUP, data);
                if (!equipArr)
                    return false;
                for (var i = 0; i < 9; i++) {
                    if (equipArr[i]) {
                        if (equipArr[i].refId) {
                            if (!equipArr[i].templateEquip)
                                return false;
                            if (this.isHashHigherEqiup(equipArr[i].templateEquip.step, equipArr[i].pos))
                                return true;
                        }
                        else {
                            if (this.isHashHigherEqiup(0, equipArr[i].pos))
                                return true;
                        }
                    }
                }
            }
            return false;
        };
        ModelEquip.prototype.checkChengEqiup = function (data) {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.exploreSmithy, 0))
                return false;
            if (data >= 0 && data <= 4) {
                var petVo = GameModels.pet.getFormatUpVOByPos(data);
                if (!petVo)
                    return false;
                if (GameModels.bag.getChengZhuangEquips() && GameModels.bag.getChengZhuangEquips().length > 0)
                    return true;
                var equip = this.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, data);
                var level = data == 0 ? GameModels.user.player.level : petVo.lv;
                for (var i = 0; i < 4; i++) {
                    if (equip[i] && equip[i].refId) {
                        if (equip[i].templateEquip.nextId != "-1") {
                            var tempEqiup = Templates.getTemplateById(templates.Map.EQUIP, equip[i].templateEquip.nextId);
                            var needCount = 0;
                            if (equip[i].templateEquip.quality == 5) {
                                needCount = parseInt(tempEqiup.combine.split("_")[1]);
                            }
                            else {
                                var sArr = tempEqiup.split.split("|");
                                var s1 = sArr[1];
                                needCount = parseInt(s1.split("_")[1]);
                            }
                            if (GameModels.bag.getItemCountById(ConfigData.CHENGZHUANG_SUIBIAN) >= needCount && level >= tempEqiup.lv) {
                                return true;
                            }
                        }
                    }
                    else {
                        var tempEqiup = Templates.getTemplateById(templates.Map.EQUIP, TypeEquip.defaultEqiupId[i]);
                        var tempEqiupNext = Templates.getTemplateById(templates.Map.EQUIP, tempEqiup.nextId);
                        var s2 = tempEqiupNext.combine.split("_");
                        if (GameModels.bag.getItemCountById(ConfigData.CHENGZHUANG_SUIBIAN) >= parseInt(s2[1]) && level >= tempEqiupNext.lv) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        ModelEquip.USE_EQUIP_CHANGE = "useEquipChange";
        ModelEquip.DEL_EQUIP_CHANGE = "delEquipChange";
        ModelEquip.LOCK_EQUIP_CHANGE = "lockquipChange";
        return ModelEquip;
    }(mo.ModelBase));
    mo.ModelEquip = ModelEquip;
    __reflect(ModelEquip.prototype, "mo.ModelEquip");
})(mo || (mo = {}));
