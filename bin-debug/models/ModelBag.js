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
    var ModelBag = (function (_super) {
        __extends(ModelBag, _super);
        function ModelBag() {
            var _this = _super.call(this) || this;
            _this._count = 0;
            _this.ITEM_ADD = 1;
            _this.ITEM_DEL = 2;
            _this.ITEM_MODIFY = 3;
            _this._getDataItemId = 0;
            _this._listeners = {};
            return _this;
        }
        ModelBag.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._isOpenPetBag = false;
            this._isOpenBingFa = false;
            this._equips = new eui.ArrayCollection();
            this._props = new eui.ArrayCollection();
            this._petSui = new eui.ArrayCollection();
            this._animalSui = new eui.ArrayCollection();
            this._bingFa = new eui.ArrayCollection();
            this._items = {};
            this._usableProps = [];
            this._isMax = false;
            this.onRoute(n.MessageMap.G2C_ITEM_UPDATE, utils.Handler.create(this, this.nItemUpdate, null, false));
            this.onRoute(n.MessageMap.G2C_ITEM_CAPACITY_UPDATE, utils.Handler.create(this, this.upMaxCapacity, null, false));
            this.request(n.MessageMap.C2G_ITEM_LIST, n.MessagePool.from(n.C2G_Item_List), utils.Handler.create(this, this.nItemList));
        };
        Object.defineProperty(ModelBag.prototype, "equipCount", {
            /**装备数量 */
            get: function () {
                // return this._bagEquips.source.length;
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelBag.prototype, "count", {
            get: function () {
                return this._count;
            },
            set: function (value) {
                this._count = value;
                this.checkMax();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelBag.prototype, "maxCapacity", {
            /**最大容量 */
            get: function () {
                return this._maxCapacity;
            },
            set: function (value) {
                this._maxCapacity = value;
                this.checkMax();
            },
            enumerable: true,
            configurable: true
        });
        ModelBag.prototype.upMaxCapacity = function (data) {
            this.maxCapacity = data.MaxCapacity;
        };
        ModelBag.prototype.checkMax = function () {
            var flag = this.maxCapacity == this.count;
            if (this._isMax != flag) {
                this._isMax = flag;
                this.dispatchEventWith(mo.ModelBag.BAG_CAPACITY_MAX, false, flag);
            }
        };
        Object.defineProperty(ModelBag.prototype, "isMax", {
            get: function () {
                return this._isMax;
            },
            enumerable: true,
            configurable: true
        });
        /**根据Id获取物品VO或者装备 */
        ModelBag.prototype.getItemAndEqiupById = function (id) {
            for (var _i = 0, _a = this._props.source; _i < _a.length; _i++) {
                var vo_1 = _a[_i];
                if (vo_1.id == id) {
                    return vo_1;
                }
            }
            for (var _b = 0, _c = this._equips.source; _b < _c.length; _b++) {
                var vo_2 = _c[_b];
                if (vo_2.id == id) {
                    return vo_2;
                }
            }
            return null;
        };
        /**根据Id获取物品VO */
        ModelBag.prototype.getItemById = function (id) {
            for (var _i = 0, _a = this._props.source; _i < _a.length; _i++) {
                var vo_3 = _a[_i];
                if (vo_3.id == id) {
                    return vo_3;
                }
            }
            return null;
        };
        /**根据Id获取装备VO */
        ModelBag.prototype.getEquipById = function (id) {
            for (var _i = 0, _a = this._equips.source; _i < _a.length; _i++) {
                var vo_4 = _a[_i];
                if (vo_4.id == id) {
                    return vo_4;
                }
            }
            return null;
        };
        /**根据Type获取物品集合 */
        ModelBag.prototype.getItemsByType = function (type) {
            var results = [];
            for (var _i = 0, _a = this._props.source; _i < _a.length; _i++) {
                var vo_5 = _a[_i];
                if (vo_5.type == type) {
                    results.push(vo_5);
                }
            }
            return results;
        };
        /**根据Type和品质获取物品集合 */
        ModelBag.prototype.getItemsByTypeAndQuality = function (type, quality) {
            var results = [];
            for (var _i = 0, _a = this._props.source; _i < _a.length; _i++) {
                var vo_6 = _a[_i];
                if (vo_6.type == type && vo_6.quality == quality) {
                    results.push(vo_6);
                }
            }
            return results;
        };
        /**根据index获取物品 */
        ModelBag.prototype.getItemByIndex = function (index) {
            for (var _i = 0, _a = this._props.source; _i < _a.length; _i++) {
                var vo_7 = _a[_i];
                if (vo_7.index == index) {
                    return vo_7;
                }
            }
            return null;
        };
        /**根据Id获取裝配个数 */
        ModelBag.prototype.getEqiupCountById = function (id) {
            var count = 0;
            var items = this._equips.source;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var vo_8 = items_1[_i];
                if (vo_8.id == id) {
                    count += vo_8.count;
                }
            }
            return count;
        };
        /**根据Id获取物品个数 */
        ModelBag.prototype.getItemCountById = function (id) {
            var count = 0;
            var items = this._props.source;
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var vo_9 = items_2[_i];
                if (vo_9.id == id) {
                    count += vo_9.count;
                }
            }
            return count;
        };
        /**根据Id获取装备个数 */
        ModelBag.prototype.getEquipCountById = function (id) {
            var count = 0;
            var items = this._equips.source;
            for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                var vo_10 = items_3[_i];
                if (vo_10.id == id) {
                    count += vo_10.count;
                }
            }
            return count;
        };
        Object.defineProperty(ModelBag.prototype, "baseEquips", {
            /*背包基础装装备对象集合*/
            get: function () {
                var voArr = this.equips.source.concat();
                var tempArr = [];
                for (var i = 0; i < voArr.length; i++) {
                    if (voArr[i] && voArr[i].type == TypeEquip.JICHU_EQIUP && voArr[i].quality != 5) {
                        tempArr.push(voArr[i]);
                    }
                }
                tempArr.sort(function (a, b) {
                    if (a.isLock != b.isLock) {
                        return b.isLock - a.isLock;
                    }
                    else {
                        if (a.quality != b.quality) {
                            return b.quality - a.quality;
                        }
                        else {
                            if (a.lv != b.lv) {
                                return b.lv - a.lv;
                            }
                            else {
                                return parseInt(a.id) - parseInt(b.id);
                            }
                        }
                    }
                });
                return tempArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelBag.prototype, "equips", {
            /*背包装备对象集合*/
            get: function () {
                return this._equips;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelBag.prototype, "isCanHuiShouequips", {
            /*背包可以回收装备对象集合*/
            get: function () {
                var tempArr = [];
                var equipVo = GameModels.bag.baseEquips;
                for (var i = 0; i < equipVo.length; i++) {
                    if (equipVo[i] && equipVo[i].isLock == 0) {
                        tempArr.push(equipVo[i]);
                    }
                }
                return tempArr;
            },
            enumerable: true,
            configurable: true
        });
        /*根据位置背包装备对象集合*/
        ModelBag.prototype.getEquipsByPos = function (pos) {
            var newEquips = [];
            if (!this._equips)
                return newEquips;
            for (var _i = 0, _a = this._equips.source; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.templateEquip.pos == pos) {
                    newEquips.push(e);
                }
            }
            newEquips.sort(function (a, b) {
                return a.templateEquip.step - b.templateEquip.step;
            });
            return newEquips;
        };
        /*根据背包装备橙装对象集合*/
        ModelBag.prototype.getChengZhuangEquips = function () {
            var newEquips = [];
            if (!this._equips)
                return newEquips;
            for (var _i = 0, _a = this._equips.source; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.templateEquip.type == TypeEquip.JICHU_EQIUP && e.templateEquip.quality == 5) {
                    newEquips.push(e);
                }
            }
            newEquips.sort(function (a, b) {
                return a.templateEquip.step - b.templateEquip.step;
            });
            return newEquips;
        };
        Object.defineProperty(ModelBag.prototype, "props", {
            /**背包道具对象集合 */
            get: function () {
                return this._props;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelBag.prototype, "basePetSui", {
            /**武将碎片*/
            get: function () {
                var voArr = this.petSui.source.concat();
                var tempArr = [];
                for (var i = 0; i < voArr.length; i++) {
                    tempArr.push(voArr[i]);
                }
                tempArr.sort(function (a, b) {
                    var itemA = Templates.getTemplateById(templates.Map.ITEM, a.templateProp.nextId);
                    var itemB = Templates.getTemplateById(templates.Map.ITEM, b.templateProp.nextId);
                    var aB = a.count >= parseInt(itemA.combine.split("_")[1]);
                    var bB = b.count >= parseInt(itemB.combine.split("_")[1]);
                    if (aB != bB) {
                        if (aB) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                    else {
                        return b.quality - a.quality;
                    }
                });
                return tempArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelBag.prototype, "petSui", {
            get: function () {
                return this._petSui;
            },
            enumerable: true,
            configurable: true
        });
        /**根据Id获取物品个数（武将） */
        ModelBag.prototype.getPetSuiCountById = function (id) {
            var count = 0;
            var items = this._petSui.source;
            for (var _i = 0, items_4 = items; _i < items_4.length; _i++) {
                var vo_11 = items_4[_i];
                if (vo_11.id == id) {
                    count += vo_11.count;
                }
            }
            return count;
        };
        Object.defineProperty(ModelBag.prototype, "baseAnimalSui", {
            /**灵兽碎片*/
            get: function () {
                var voArr = this._animalSui.source.concat();
                var tempArr = [];
                for (var i = 0; i < voArr.length; i++) {
                    tempArr.push(voArr[i]);
                }
                tempArr.sort(function (a, b) {
                    var itemA = Templates.getTemplateById(templates.Map.ITEM, a.templateProp.nextId);
                    var itemB = Templates.getTemplateById(templates.Map.ITEM, b.templateProp.nextId);
                    var aB = a.count >= parseInt(itemA.combine.split("_")[1]);
                    var bB = b.count >= parseInt(itemB.combine.split("_")[1]);
                    if (aB != bB) {
                        if (aB) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                    else {
                        return b.quality - a.quality;
                    }
                });
                return tempArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelBag.prototype, "animalSui", {
            get: function () {
                return this._animalSui;
            },
            enumerable: true,
            configurable: true
        });
        /**根据Id获取物品个数 (宠物)*/
        ModelBag.prototype.getAnimalSuiCountById = function (id) {
            var count = 0;
            var items = this._animalSui.source;
            for (var _i = 0, items_5 = items; _i < items_5.length; _i++) {
                var vo_12 = items_5[_i];
                if (vo_12.id == id) {
                    count += vo_12.count;
                }
            }
            return count;
        };
        Object.defineProperty(ModelBag.prototype, "bingFa", {
            get: function () {
                return this._bingFa;
            },
            enumerable: true,
            configurable: true
        });
        /**根据Id获取兵法个数 */
        ModelBag.prototype.getBingFaCountById = function (id) {
            var count = 0;
            var items = this._bingFa.source;
            for (var _i = 0, items_6 = items; _i < items_6.length; _i++) {
                var vo_13 = items_6[_i];
                if (vo_13.id == id) {
                    count += vo_13.count;
                }
            }
            return count;
        };
        Object.defineProperty(ModelBag.prototype, "baseBingFa", {
            get: function () {
                var voArr = this.bingFa.source.concat();
                var tempArr = [];
                for (var i = 0; i < voArr.length; i++) {
                    tempArr.push(voArr[i]);
                }
                tempArr.sort(function (a, b) {
                    return b.quality - a.quality;
                });
                return tempArr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelBag.prototype, "isOpenBingFa", {
            get: function () {
                return this._isOpenBingFa;
            },
            set: function (v) {
                this._isOpenBingFa = v;
                this.dispatchEventWith(mo.ModelBag.OPEN_BINGFA_LIST);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS1);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS2);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS3);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS4);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS5);
                GameModels.state.updateState(GameRedState.ROLE_SHENGXING);
            },
            enumerable: true,
            configurable: true
        });
        /**是否存在比位置上品质更高的兵法 */
        ModelBag.prototype.isHashHigherBingFaChange = function (q) {
            if (this._isOpenBingFa)
                return false;
            var len = this.bingFa.source;
            for (var i = 0; i < len.length; i++) {
                if (len[i].quality > q) {
                    return true;
                }
            }
            return false;
        };
        /**监听物品添加*/
        ModelBag.prototype.onItemAdd = function (id, caller, method) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var index = this.getItemAddIndex(id, caller, method);
            if (index != -1)
                return;
            if (!this._listeners[id])
                this._listeners[id] = [];
            if (!this._listeners[id][this.ITEM_ADD])
                this._listeners[id][this.ITEM_ADD] = [];
            var list = this._listeners[id][this.ITEM_ADD];
            list.push(utils.Handler.create(caller, method, null, false));
        };
        ModelBag.prototype.offItemAdd = function (id, caller, method) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var index = this.getItemAddIndex(id, caller, method);
            if (index >= 0) {
                var list = this._listeners[id][this.ITEM_ADD];
                var handler = list[index];
                list.splice(index, 1);
                handler.recover();
            }
        };
        ModelBag.prototype.getItemAddIndex = function (id, caller, method) {
            if (this._listeners[id]) {
                if (this._listeners[id][this.ITEM_ADD]) {
                    var list = this._listeners[id][this.ITEM_ADD];
                    var index = -1;
                    for (var i = 0; i < list.length; i++) {
                        var handler = list[i];
                        if (handler.caller == caller && handler.method == method) {
                            index = i;
                            break;
                        }
                    }
                    return index;
                }
            }
            return -1;
        };
        ModelBag.prototype.callItemAdd = function (id) {
            if (this._listeners[id]) {
                if (this._listeners[id][this.ITEM_ADD]) {
                    var list = this._listeners[id][this.ITEM_ADD];
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var handler = list_1[_i];
                        handler.run();
                    }
                }
            }
        };
        /**监听单个物品删除*/
        ModelBag.prototype.onItemRemove = function (id, caller, method) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var index = this.getItemRemoveIndex(id, caller, method);
            if (index != -1)
                return;
            if (!this._listeners[id])
                this._listeners[id] = [];
            if (!this._listeners[id][this.ITEM_DEL])
                this._listeners[id][this.ITEM_DEL] = [];
            var list = this._listeners[id][this.ITEM_DEL];
            list.push(utils.Handler.create(caller, method, null, false));
        };
        ModelBag.prototype.offItemRemove = function (id, caller, method) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var index = this.getItemRemoveIndex(id, caller, method);
            if (index >= 0) {
                var list = this._listeners[id][this.ITEM_DEL];
                var handler = list[index];
                list.splice(index, 1);
                handler.recover();
            }
        };
        ModelBag.prototype.getItemRemoveIndex = function (id, caller, method) {
            if (this._listeners[id]) {
                if (this._listeners[id][this.ITEM_DEL]) {
                    var list = this._listeners[id][this.ITEM_DEL];
                    var index = -1;
                    for (var i = 0; i < list.length; i++) {
                        var handler = list[i];
                        if (handler.caller == caller && handler.method == method) {
                            index = i;
                            break;
                        }
                    }
                    return index;
                }
            }
            return -1;
        };
        ModelBag.prototype.callItemRemove = function (id) {
            if (this._listeners[id]) {
                if (this._listeners[id][this.ITEM_DEL]) {
                    var list = this._listeners[id][this.ITEM_DEL];
                    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                        var handler = list_2[_i];
                        handler.run();
                    }
                }
            }
        };
        /**
         * 监听单个物品变化
         */
        ModelBag.prototype.onItemChange = function (id, caller, method) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var index = this.getItemChangeIndex(id, caller, method);
            if (index != -1)
                return;
            if (!this._listeners[id])
                this._listeners[id] = [];
            if (!this._listeners[id][this.ITEM_MODIFY])
                this._listeners[id][this.ITEM_MODIFY] = [];
            var list = this._listeners[id][this.ITEM_MODIFY];
            list.push(utils.Handler.create(caller, method, null, false));
        };
        ModelBag.prototype.offItemChange = function (id, caller, method) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var index = this.getItemChangeIndex(id, caller, method);
            if (index >= 0) {
                var list = this._listeners[id][this.ITEM_MODIFY];
                var handler = list[index];
                list.splice(index, 1);
                handler.recover();
            }
        };
        ModelBag.prototype.getItemChangeIndex = function (id, caller, method) {
            if (this._listeners[id]) {
                if (this._listeners[id][this.ITEM_MODIFY]) {
                    var list = this._listeners[id][this.ITEM_MODIFY];
                    var index = -1;
                    for (var i = 0; i < list.length; i++) {
                        var handler = list[i];
                        if (handler.caller == caller && handler.method == method) {
                            index = i;
                            break;
                        }
                    }
                    return index;
                }
            }
            return -1;
        };
        ModelBag.prototype.callItemChange = function (id) {
            if (this._listeners[id]) {
                if (this._listeners[id][this.ITEM_MODIFY]) {
                    var list = this._listeners[id][this.ITEM_MODIFY];
                    for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                        var handler = list_3[_i];
                        handler.run();
                    }
                }
            }
            if (this._changeHandlers) {
                this._changeHandlers.runWith(id);
            }
        };
        /**
         * 物品变化监听
         */
        ModelBag.prototype.onChange = function (caller, method) {
            if (!this._changeHandlers) {
                this._changeHandlers = new utils.Handlers(false);
            }
            this._changeHandlers.add(caller, method);
        };
        ModelBag.prototype.offChange = function (caller, method) {
            this._changeHandlers.remove(caller, method);
        };
        ModelBag.prototype.nItemList = function (data) {
            this.maxCapacity = data.MaxCapacity;
            this._equips.source = [];
            this.addItems(data.Items);
        };
        ModelBag.prototype.nItemUpdate = function (data) {
            switch (data.Type) {
                case this.ITEM_ADD:
                    this.addItems(data.Items, true);
                    break;
                case this.ITEM_DEL:
                    this.removeItems(data.Items);
                    break;
                case this.ITEM_MODIFY:
                    this.updateItems(data.Items);
                    break;
            }
            this._props.source.sort(function (a, b) {
                if (a.id > b.id)
                    return -1;
                else if (a.id < b.id)
                    return 1;
                else
                    return 0;
            });
            var props = this._props.source.concat();
            this._props.replaceAll(props);
        };
        ModelBag.prototype.addItems = function (items, isAdd) {
            if (isAdd === void 0) { isAdd = false; }
            if (!items)
                return;
            for (var _i = 0, items_7 = items; _i < items_7.length; _i++) {
                var item_1 = items_7[_i];
                var itemVO = this.addBagItem(item_1, isAdd);
                if (itemVO) {
                    itemVO.inBag = true;
                    this.callItemAdd(itemVO.id);
                    this.callItemChange(itemVO.id);
                }
                if (isAdd) {
                    this.showGetPropTip(item_1);
                }
                this.changeItemUpDataRedPoint(itemVO);
            }
            if (GameModels.state)
                GameModels.state.updateState(GameRedState.BAG_EQUIP_SMELTING);
        };
        ModelBag.prototype.removeItems = function (items) {
            for (var _i = 0, items_8 = items; _i < items_8.length; _i++) {
                var item_2 = items_8[_i];
                var id = this.removeBagItem(item_2);
                if (id) {
                    this.callItemRemove(id);
                    this.callItemChange(id);
                }
            }
            if (GameModels.state)
                GameModels.state.updateState(GameRedState.BAG_EQUIP_SMELTING);
        };
        ModelBag.prototype.updateItems = function (items) {
            for (var _i = 0, items_9 = items; _i < items_9.length; _i++) {
                var item = items_9[_i];
                this.showGetPropTip(item, true);
                var id = this.updateBagItem(item);
                if (id) {
                    this.callItemChange(id);
                }
            }
        };
        ModelBag.prototype.showGetPropTip = function (item, isModify) {
            if (isModify === void 0) { isModify = false; }
            var type = TypeItem.ITEM;
            if (!isModify) {
                type = Templates.getItemTemplateMainType(item.Id);
            }
            var tmp = Templates.getTemplateById(type == TypeItem.EQUIP ? templates.Map.EQUIP : templates.Map.ITEM, item.Id);
            if (tmp) {
                var count = item.Count;
                if (isModify) {
                    if (this._items[item.Index]) {
                        if (this._items[item.Index].data && this._items[item.Index].data.count) {
                            count -= this._items[item.Index].data.count;
                        }
                    }
                }
                // if (count > 0) {
                // 	mg.alertManager.sourceTip(Language.getExpression(Language.E_HD1x2, tmp.name, count), TypeQuality.getQualityColor(tmp.quality));
                // }
            }
            if (TypeGiftBag.checkGiftBagBuyId(item.Id)) {
                mg.alertManager.showAlert(SelectPropAlert, true, true, this._items[item.Index].data, utils.Handler.create(this, this.sendSelectProp));
            }
        };
        ModelBag.prototype.sendSelectProp = function (data, useCount, selectId) {
            GameModels.bag.requestSelectProp(data.index, useCount, selectId.toString(), utils.Handler.create(this, function () { }));
        };
        ModelBag.prototype.addBagItem = function (data, isAdd) {
            if (isAdd === void 0) { isAdd = false; }
            var type = Templates.getItemTemplateMainType(data.Id);
            if (type == TypeItem.EQUIP) {
                var itemVO = vo.fromPool(vo.EquipVO, data);
                this.count++;
                this.equips.addItem(itemVO);
                this._items[data.Index] = { type: TypeItem.EQUIP, data: itemVO };
                if (GameModels.state) {
                    GameModels.state.updateState(GameRedState.BAG_HECHENG);
                }
                return itemVO;
            }
            else if (TypeItem.checkInItemBag(type)) {
                var itemVO = vo.fromPool(vo.ItemVO, data);
                this.count++;
                this.props.addItem(itemVO);
                if (utils.CheckUtil.checkUseByType(itemVO.mainType, itemVO.type)) {
                    this._usableProps.push(itemVO.index);
                    if (GameModels.state) {
                        GameModels.state.updateState(GameRedState.BAG_USABLE_PROP);
                    }
                }
                this._items[data.Index] = { type: TypeItem.ITEM, data: itemVO };
                if (isAdd)
                    this.showGetDataTips(itemVO);
                return itemVO;
            }
            else if (type == TypeItem.PET) {
                var itemVO = vo.fromPool(vo.ItemVO, data);
                this.count++;
                this.petSui.addItem(itemVO);
                this._items[data.Index] = { type: TypeItem.PET, data: itemVO };
                if (GameModels.state) {
                    GameModels.state.updateState(GameRedState.BAG_PET);
                }
                if (!mg.uiManager.isOpen(dialog.bag.BagDialog)) {
                    var item = Templates.getTemplateById(templates.Map.ITEM, itemVO.templateProp.nextId);
                    if (item) {
                        var needCount = parseInt(item.combine.split("_")[1]);
                        if (itemVO.count >= needCount) {
                            if (isAdd)
                                this.showGetDataTips(itemVO);
                        }
                    }
                }
                return itemVO;
            }
            else if (type == TypeItem.ANIMAL) {
                var itemVO = vo.fromPool(vo.ItemVO, data);
                this.count++;
                this.animalSui.addItem(itemVO);
                this._items[data.Index] = { type: TypeItem.ANIMAL, data: itemVO };
                if (GameModels.state) {
                    GameModels.state.updateState(GameRedState.BAG_PET);
                }
                // if (!mg.uiManager.isOpen(dialog.bag.BagDialog)) {
                // 	var item: templates.item = Templates.getTemplateById(templates.Map.ITEM, itemVO.templateProp.nextId);
                // 	if (item) {
                // 		var needCount: number = parseInt(item.combine.split("_")[1]);
                // 		if (itemVO.count >= needCount) {
                // 			if (isAdd) this.showGetDataTips(itemVO);
                // 		}
                // 	}
                // }
                return itemVO;
            }
            else if (type == TypeItem.BINGFA) {
                var itemVO = vo.fromPool(vo.ItemVO, data);
                this.count++;
                this.bingFa.addItem(itemVO);
                this._items[data.Index] = { type: TypeItem.BINGFA, data: itemVO };
                if (GameModels.state) {
                    GameModels.state.updateState(GameRedState.BAG_HECHENG);
                }
                return itemVO;
            }
            return null;
        };
        Object.defineProperty(ModelBag.prototype, "getDataItemId", {
            get: function () {
                return this._getDataItemId;
            },
            set: function (v) {
                this._getDataItemId = 0;
            },
            enumerable: true,
            configurable: true
        });
        /**道具增加时弹出提示框 */
        ModelBag.prototype.showGetDataTips = function (itemVO) {
            var view = mg.uiManager.getView(main.MainUIView);
            if (view) {
                if (itemVO.type == TypeItem.SHENBIN_PROP || itemVO.type == TypeItem.HONGYAN_ACT || itemVO.type == TypeItem.FASHION_CLOATHING || itemVO.type == TypeItem.FASHION_TITLE || itemVO.type == TypeItem.PET_SUI) {
                    this._getDataItemId = parseInt(itemVO.id);
                    if (this.checkFunsIsOpen(itemVO.id)) {
                        view.showGetItemTips();
                    }
                }
            }
        };
        ModelBag.prototype.checkFunsIsOpen = function (id) {
            var item = Templates.getTemplateById(templates.Map.ITEM, id);
            if (item) {
                if (item.type == TypeItem.SHENBIN_PROP) {
                    return TypeFunOpen.checkFuncOpen(s.UserfaceName.baowu, 3);
                }
                else if (item.type == TypeItem.HONGYAN_ACT) {
                    return TypeFunOpen.checkFuncOpen(s.UserfaceName.baowu, 0);
                }
                else if (item.type == TypeItem.FASHION_CLOATHING) {
                    return TypeFunOpen.checkFuncOpen(s.UserfaceName.roleFashion);
                }
                else if (item.type == TypeItem.PET_SUI) {
                    return true;
                }
                else {
                    return TypeFunOpen.checkFuncOpen(s.UserfaceName.roleFashion);
                }
            }
            return false;
        };
        ModelBag.prototype.removeBagItem = function (data) {
            var id;
            var key = this._items[data.Index];
            if (key) {
                var type = key["type"];
                var tem = key["data"];
                if (type == TypeItem.EQUIP) {
                    var index = this._equips.source.indexOf(tem);
                    this.count--;
                    var equipVO = this._equips.removeItemAt(index);
                    id = equipVO.id;
                    vo.toPool(equipVO);
                    if (GameModels.state) {
                        GameModels.state.updateState(GameRedState.BAG_HECHENG);
                    }
                }
                else if (TypeItem.checkInItemBag(type)) {
                    var index = this._props.source.indexOf(tem);
                    this.count--;
                    var itemVO = this.props.removeItemAt(index);
                    this.changeItemUpDataRedPoint(itemVO);
                    if (utils.CheckUtil.checkUseByType(itemVO.mainType, itemVO.type)) {
                        var i = this._usableProps.indexOf(itemVO.index);
                        if (i != -1)
                            this._usableProps.splice(i, 1);
                        if (GameModels.state) {
                            GameModels.state.updateState(GameRedState.BAG_USABLE_PROP);
                        }
                    }
                    id = itemVO.id;
                    vo.toPool(itemVO);
                }
                else if (type == TypeItem.PET) {
                    var index = this._petSui.source.indexOf(tem);
                    this.count--;
                    var itemVO = this._petSui.removeItemAt(index);
                    id = itemVO.id;
                    vo.toPool(itemVO);
                    if (GameModels.state) {
                        GameModels.state.updateState(GameRedState.BAG_PET);
                    }
                }
                else if (type == TypeItem.ANIMAL) {
                    var index = this._animalSui.source.indexOf(tem);
                    this.count--;
                    var itemVO = this._animalSui.removeItemAt(index);
                    id = itemVO.id;
                    vo.toPool(itemVO);
                    if (GameModels.state) {
                        GameModels.state.updateState(GameRedState.BAG_PET);
                    }
                }
                else if (type == TypeItem.BINGFA) {
                    var index = this._bingFa.source.indexOf(tem);
                    this.count--;
                    var itemVO = this._bingFa.removeItemAt(index);
                    id = itemVO.id;
                    vo.toPool(itemVO);
                    if (GameModels.state) {
                        GameModels.state.updateState(GameRedState.BAG_HECHENG);
                    }
                }
                delete this._items[data.Index];
                if (id == this._getDataItemId.toString()) {
                    this._getDataItemId = 0;
                }
                return id;
            }
            return null;
        };
        ModelBag.prototype.updateBagItem = function (data) {
            var type = Templates.getItemTemplateMainType(data.Id);
            if (TypeItem.checkInItemBag(type)) {
                var items = this.props.source;
                for (var _i = 0, items_10 = items; _i < items_10.length; _i++) {
                    var item_3 = items_10[_i];
                    if (item_3.index == data.Index) {
                        item_3.count = data.Count;
                        this.props.itemUpdated(item_3);
                        this.changeItemUpDataRedPoint(item_3);
                        if (item_3.id == this._getDataItemId.toString()) {
                            this._getDataItemId = 0;
                        }
                        return item_3.id;
                    }
                }
            }
            else if (TypeItem.PET == type) {
                var items = this.petSui.source;
                for (var _a = 0, items_11 = items; _a < items_11.length; _a++) {
                    var item_4 = items_11[_a];
                    if (item_4.index == data.Index) {
                        item_4.count = data.Count;
                        this.petSui.itemUpdated(item_4);
                        if (GameModels.state) {
                            GameModels.state.updateState(GameRedState.BAG_PET);
                        }
                        if (item_4.id == this._getDataItemId.toString()) {
                            this._getDataItemId = 0;
                        }
                        if (!mg.uiManager.isOpen(dialog.bag.BagDialog)) {
                            var item1 = Templates.getTemplateById(templates.Map.ITEM, item_4.templateProp.nextId);
                            if (item1) {
                                var needCount = parseInt(item1.combine.split("_")[1]);
                                if (item_4.count >= needCount) {
                                    this.showGetDataTips(item_4);
                                }
                            }
                        }
                        return item_4.id;
                    }
                }
            }
            else if (TypeItem.ANIMAL == type) {
                var items = this.animalSui.source;
                for (var _b = 0, items_12 = items; _b < items_12.length; _b++) {
                    var item_5 = items_12[_b];
                    if (item_5.index == data.Index) {
                        item_5.count = data.Count;
                        this.animalSui.itemUpdated(item_5);
                        if (GameModels.state) {
                            GameModels.state.updateState(GameRedState.BAG_PET);
                        }
                        // if (!mg.uiManager.isOpen(dialog.bag.BagDialog)) {
                        // 	var item1: templates.item = Templates.getTemplateById(templates.Map.ITEM, item.templateProp.nextId);
                        // 	if (item1) {
                        // 		var needCount: number = parseInt(item1.combine.split("_")[1]);
                        // 		if (item.count >= needCount) {
                        // 			this.showGetDataTips(item);
                        // 		}
                        // 	}
                        // }
                        return item_5.id;
                    }
                }
            }
            else if (TypeItem.BINGFA == type) {
                var items = this.bingFa.source;
                for (var _c = 0, items_13 = items; _c < items_13.length; _c++) {
                    var item_6 = items_13[_c];
                    if (item_6.index == data.Index) {
                        item_6.count = data.Count;
                        this.bingFa.itemUpdated(item_6);
                        if (GameModels.state) {
                            GameModels.state.updateState(GameRedState.BAG_HECHENG);
                        }
                        return item_6.id;
                    }
                }
            }
            return null;
        };
        Object.defineProperty(ModelBag.prototype, "isOpenPetBag", {
            get: function () {
                return this._isOpenPetBag;
            },
            set: function (v) {
                this._isOpenPetBag = v;
            },
            enumerable: true,
            configurable: true
        });
        ModelBag.prototype.requestChangeName = function (name, type, callback) {
            var cmd = n.MessagePool.from(n.C2G_PlayerNameUpdate);
            cmd.NewName = name;
            cmd.Type = type;
            this.request(n.MessageMap.C2G_PLAYERNAMEUPDATE, cmd, utils.Handler.create(this, function (data) {
                if (callback)
                    callback.runWith(data);
            }));
        };
        ModelBag.prototype.requestUseProp = function (index, count, type, callback) {
            var cmd = n.MessagePool.from(n.C2G_Item_Use);
            cmd.Index = index;
            cmd.Count = count;
            cmd.Type = type;
            this.request(n.MessageMap.C2G_ITEM_USE, cmd, callback);
        };
        //请求分解
        ModelBag.prototype.requestResovle = function (type, gridid, count, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Item_Fenjie);
            msg.Type = type;
            msg.GridId = gridid;
            msg.Count = count;
            this.request(n.MessageMap.C2G_ITEM_FENJIE, msg, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    if (complete)
                        complete.runWith(data);
                    _this.dispatchEventWith(ModelBag.HECHENG_CHANG);
                }
            }));
        };
        /**武将随机合成 */
        ModelBag.prototype.requestRandomPetHeCheng = function (id, count, complte) {
            var msg = n.MessagePool.from(n.C2G_Item_RandomPetHeCheng);
            msg.PieceItemId = id;
            msg.Count = count;
            this.request(n.MessageMap.C2G_ITEM_RANDOMPETHECHENG, msg, utils.Handler.create(this, function (data) {
                if (complte && data.Result)
                    complte.runWith(data);
                this.dispatchEventWith(ModelBag.PETRANDOMHECHENG_CHANG);
                mg.alertManager.tip(Language.C_HCCG);
            }));
        };
        /**灵兽随机合成 */
        ModelBag.prototype.requestRandomAnimalHeCheng = function (id, count, complte) {
            var msg = n.MessagePool.from(n.C2G_Item_RandomAnimalHeCheng);
            msg.AnimalItemId = id;
            msg.Count = count;
            this.request(n.MessageMap.C2G_ITEM_RANDOMANIMALHECHENG, msg, utils.Handler.create(this, function (data) {
                if (complte && data.Result)
                    complte.runWith(data);
                if (data.RewardStr) {
                    var rewardArr = data.RewardStr.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                }
                this.dispatchEventWith(ModelBag.PETRANDOMHECHENG_CHANG);
            }));
        };
        /**道具合成 */
        ModelBag.prototype.requestCompoundProp = function (id, count, complte) {
            var msg = n.MessagePool.from(n.C2G_Item_Hecheng);
            msg.TargetItemId = id;
            msg.Count = count;
            this.request(n.MessageMap.C2G_ITEM_HECHENG, msg, utils.Handler.create(this, function (data) {
                if (complte && data.Result)
                    complte.runWith(data);
                if (data.RewardStr) {
                    var rewardArr = data.RewardStr.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewardArr);
                }
                this.dispatchEventWith(ModelBag.HECHENG_CHANG);
            }));
        };
        ModelBag.prototype.requestSelectProp = function (index, count, selectId, callback) {
            var cmd = n.MessagePool.from(n.C2G_Item_SelectGift);
            cmd.Index = index;
            cmd.Count = count;
            cmd.SelectGiftId = selectId;
            this.request(n.MessageMap.C2G_ITEM_SELECTGIFT, cmd, callback);
        };
        ModelBag.prototype.checkOrangeEquipDecompose = function () {
            var equips = this.equips.source;
            for (var _i = 0, equips_1 = equips; _i < equips_1.length; _i++) {
                var equip = equips_1[_i];
                if (equip.templateEquip.quality == TypeQuality.ORANGE) {
                    return true;
                }
            }
            return false;
        };
        ModelBag.prototype.checkUsableProp = function () {
            return this._usableProps.length > 0;
        };
        ModelBag.prototype.checkSmelting = function () {
            return (this.maxCapacity - this.equipCount) < this.maxCapacity / 3;
        };
        ModelBag.prototype.checkOpenSmelting = function () {
            return this.maxCapacity - this.equipCount < 20;
        };
        ModelBag.prototype.checkSuiPianHeCheng = function () {
            var petHashRedPoint = this.checkPetHeCheng();
            var animalHashRedPoint = this.checkAnimalHeCheng();
            return petHashRedPoint || animalHashRedPoint;
        };
        ModelBag.prototype.checkPetHeCheng = function () {
            if (this._petSui) {
                for (var i = 0; i < this._petSui.source.length; i++) {
                    var itemVO = this._petSui.source[i];
                    if (itemVO) {
                        var item = Templates.getTemplateById(templates.Map.ITEM, itemVO.templateProp.nextId);
                        if (item) {
                            var needCount = parseInt(item.combine.split("_")[1]);
                            if (itemVO.count >= needCount) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        ModelBag.prototype.checkAnimalHeCheng = function () {
            if (this._animalSui) {
                for (var i = 0; i < this._animalSui.source.length; i++) {
                    var itemVO = this._animalSui.source[i];
                    if (itemVO) {
                        var item = Templates.getTemplateById(templates.Map.ITEM, itemVO.templateProp.nextId);
                        if (item) {
                            var needCount = parseInt(item.combine.split("_")[1]);
                            if (itemVO.count >= needCount) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        /** 获得扩展背包格子价格*/
        ModelBag.prototype.getSlotPrice = function () {
            var count = GameModels.user.player.getProperty(TypeProperty.BUY_BAG_COUNT) || 0;
            count += 1;
            return GameModels.dataSet.getBuyCountNeedPrice(90001, count).toString();
        };
        ModelBag.prototype.changeItemUpDataRedPoint = function (item) {
            if (GameModels.state) {
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS2);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS3);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS4);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_POS5);
            }
            if (item && (item.mainType == TypeItem.EQUIP)) {
                if (GameModels.state && GameModels.equip) {
                    GameModels.equip.updataEqiupRedPoint();
                }
            }
            if (item && (item.type == TypeItem.SHENBIN_PROP)) {
                if (GameModels.state) {
                    GameModels.state.updateState(GameRedState.BAOWU_SHENBIN);
                }
            }
            if (item && (item.type == TypeItem.WING_JIHUO || item.type == TypeItem.GODWING_1 ||
                item.type == TypeItem.GODWING_2 || item.type == TypeItem.GODWING_3 || item.type == TypeItem.GODWING_4)) {
                if (GameModels.state && GameModels.role) {
                    GameModels.role.updataWingRedPoint();
                }
            }
            if (item && item.type == TypeItem.FASHION_CLOATHING) {
                switch (Templates.getTemplateById(templates.Map.GAMEFASHION, item.id).type) {
                    case TypeFashion.CLOTHES:
                        if (GameModels.state)
                            GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_CLOTH);
                        break;
                    case TypeFashion.WEAPON:
                        if (GameModels.state)
                            GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_WEAPON);
                        break;
                    case TypeFashion.HALO:
                        if (GameModels.state)
                            GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_WEAPON);
                        break;
                }
            }
            if (item && (item.type == TypeItem.HONGYAN_ACT || item.type == TypeItem.HONGYAN_LOVE)) {
                if (GameModels.state) {
                    GameModels.state.updateState(GameRedState.BAOWU_HONGYAN);
                }
            }
            if (item && (item.type == TypeItem.ANIMAL_ONE)) {
                if (GameModels.state) {
                    GameModels.state.updateState(GameRedState.ANIMAL_UPGRADE);
                }
            }
        };
        ModelBag.BAG_CAPACITY_MAX = "BagCapacityMax";
        ModelBag.HECHENG_CHANG = "HECHENG_CHANG"; //神兵合成分解
        ModelBag.PETRANDOMHECHENG_CHANG = "PETRANDOMHECHENG_CHANG"; //神兵合成分解
        ModelBag.OPEN_BINGFA_LIST = "OPEN_BINGFA_LIST"; //打开兵法列表
        return ModelBag;
    }(mo.ModelBase));
    mo.ModelBag = ModelBag;
    __reflect(ModelBag.prototype, "mo.ModelBag");
})(mo || (mo = {}));
