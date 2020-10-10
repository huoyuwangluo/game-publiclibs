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
var dialog;
(function (dialog) {
    var role;
    (function (role) {
        var chengzhuang;
        (function (chengzhuang) {
            var ChengZhuangDialog = (function (_super) {
                __extends(ChengZhuangDialog, _super);
                function ChengZhuangDialog() {
                    return _super.call(this) || this;
                }
                ChengZhuangDialog.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    // this.propertyBox.rowCount = 2;
                    this._equipBoxs = [this.box1, this.box2, this.box3, this.box4];
                    this._effId = [6304, 6307, 6310, 6309, 6306, 6306, 6305, 6309];
                    this._suitNameArr = [this.labSuitName1, this.labSuitName2];
                    this._fightArr = [TypeFunction.CHENGZHUANG_1, TypeFunction.CHENGZHUANG_2, TypeFunction.CHENGZHUANG_3,
                        TypeFunction.CHENGZHUANG_4, TypeFunction.CHENGZHUANG_5];
                    this._suitArr = Templates.getTemplatesByProperty(templates.Map.SYSTEMSUIT, "type", 9);
                };
                ChengZhuangDialog.prototype.enter = function () {
                    this._effect = this.fromEffect("");
                    this._effect.x = 300;
                    this._effect.y = 400;
                    this._effect.play();
                    this.addChild(this._effect);
                    this._selecdIndex = 0;
                    this.imgSelecd.x = this.box1.x;
                    this.imgSelecd.y = this.box1.y;
                    this.headList.init(TypePetPos.role_currPos, this, this.updata);
                    this.headList.registerWarns(GameRedState.DAZAO_CHENGZHUANG_POS1, GameRedState.DAZAO_CHENGZHUANG_POS2, GameRedState.DAZAO_CHENGZHUANG_POS3, GameRedState.DAZAO_CHENGZHUANG_POS4, GameRedState.DAZAO_CHENGZHUANG_POS5);
                    this.getItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getItemTouch, this);
                    this.btnDuanZao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duanzapTouch, this);
                    this.labSuitName1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSuitAlt, this);
                    this.labSuitName2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSuitAlt, this);
                    for (var i = 0; i < this._equipBoxs.length; i++) {
                        this._equipBoxs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.ancientIconHandler, this);
                    }
                    GameModels.bag.onItemChange(ConfigData.CHENGZHUANG_SUIBIAN, this, this.updata);
                    GameModels.equip.addEventListener(mo.ModelEquip.DEL_EQUIP_CHANGE, this.updataFenJieRedPoint, this);
                    this.updataFenJieRedPoint();
                };
                ChengZhuangDialog.prototype.exit = function () {
                    if (this._effect) {
                        if (this._effect.parent) {
                            this._effect.parent.removeChild(this._effect);
                        }
                        this._effect.stop();
                        utils.ObjectPool.to(this._effect, true);
                        this._effect = null;
                    }
                    this.headList.reset();
                    for (var i = 0; i < this._equipBoxs.length; i++) {
                        this._equipBoxs[i].dataSource = null;
                        this._equipBoxs[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ancientIconHandler, this);
                    }
                    this.getItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getItemTouch, this);
                    this.btnDuanZao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.duanzapTouch, this);
                    GameModels.bag.offItemChange(ConfigData.CHENGZHUANG_SUIBIAN, this, this.updata);
                    GameModels.equip.removeEventListener(mo.ModelEquip.DEL_EQUIP_CHANGE, this.updataFenJieRedPoint, this);
                    this.labSuitName1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSuitAlt, this);
                    this.labSuitName2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSuitAlt, this);
                };
                ChengZhuangDialog.prototype.updataFenJieRedPoint = function () {
                    this.imgRedPoint.visible = GameModels.bag.getChengZhuangEquips().length > 0;
                };
                ChengZhuangDialog.prototype.updata = function () {
                    var _this = this;
                    this._suitStep = [];
                    TypePetPos.role_currPos = this.headList.selectIndex;
                    this.dispatchEventWith(ChengZhuangDialog.CHANG_TAL);
                    var tempItem = Templates.getTemplateById(templates.Map.ITEM, ConfigData.CHENGZHUANG_SUIBIAN);
                    this.labNeedName.text = tempItem.name;
                    this.imgXiaoHao.source = tempItem.icon;
                    var bagCount = GameModels.bag.getItemCountById(tempItem.id);
                    var petVo = GameModels.pet.getFormatUpVOByPos(this.headList.selectIndex);
                    var level = this.headList.selectIndex == 0 ? GameModels.user.player.level : petVo.lv;
                    var equip = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, this.headList.selectIndex);
                    for (var i = 0; i < this._equipBoxs.length; i++) {
                        this._equipBoxs[i].isWarn = false;
                        if (equip[i].refId) {
                            if (equip[i].templateEquip.quality == 5) {
                                this._suitStep.push(equip[i].templateEquip.step);
                                this._equipBoxs[i].quality = equip[i].templateEquip.quality;
                                this._equipBoxs[i].iconSour = equip[i].templateEquip.icon;
                                this._equipBoxs[i].step = "";
                                this._equipBoxs[i].lv = equip[i].templateEquip.lv.toString();
                                this._equipBoxs[i].pos = equip[i].pos;
                                this._equipBoxs[i].lockLv = "";
                                this._equipBoxs[i].updateEffect(true, equip[i].templateEquip.quality);
                            }
                            else {
                                this._equipBoxs[i].quality = "role_json.ancientEquip_type_" + (i + 1) + "_png";
                                this._equipBoxs[i].iconSour = null;
                                this._equipBoxs[i].step = "";
                                this._equipBoxs[i].lv = "";
                                this._equipBoxs[i].pos = 0;
                                this._equipBoxs[i].lockLv = "";
                                this._equipBoxs[i].updateEffect(false);
                            }
                            if (equip[i].templateEquip.nextId != "-1") {
                                var tempEqiup = Templates.getTemplateById(templates.Map.EQUIP, equip[i].templateEquip.nextId);
                                var needCount = 0;
                                if (equip[i].templateEquip.quality == 5) {
                                    needCount = parseInt(tempEqiup.combine.split("_")[1]);
                                }
                                else {
                                    var sArr = tempEqiup.split.split("|");
                                    var s = sArr[1];
                                    needCount = parseInt(s.split("_")[1]);
                                }
                                this._equipBoxs[i].isWarn = bagCount >= needCount && level >= tempEqiup.lv;
                            }
                        }
                        else {
                            this._equipBoxs[i].quality = "role_json.ancientEquip_type_" + (i + 1) + "_png";
                            this._equipBoxs[i].iconSour = null;
                            this._equipBoxs[i].step = "";
                            this._equipBoxs[i].lv = "";
                            this._equipBoxs[i].lockLv = "";
                            this._equipBoxs[i].pos = 0;
                            this._equipBoxs[i].updateEffect(false);
                            var tempEqiup1 = Templates.getTemplateById(templates.Map.EQUIP, TypeEquip.defaultEqiupId[i]);
                            var tempEqiupNext = Templates.getTemplateById(templates.Map.EQUIP, tempEqiup1.nextId);
                            var s1 = tempEqiupNext.combine.split("_");
                            this._equipBoxs[i].isWarn = bagCount >= parseInt(s1[1]) && level >= tempEqiupNext.lv;
                        }
                    }
                    this._effect.resId = this._effId[this._selecdIndex].toString();
                    this.showView(equip[this._selecdIndex]);
                    GameModels.common.requestFightNum(this, this._fightArr[this.headList.selectIndex], function (fightNum) {
                        _this.blabFight.text = fightNum.toString();
                    });
                    this._suitStep.sort(function (a, b) {
                        return a - b;
                    });
                    this.showSuit();
                };
                ChengZhuangDialog.prototype.showView = function (equip) {
                    if (equip && equip.refId) {
                        if (equip.templateEquip.nextId == "-1") {
                            this.labXiaoHaoCount.text = Language.C_YMJ;
                            this.labName.text = Language.C_YMJ;
                            this.showProites(equip.templateEquip.properties, equip.templateEquip.properties);
                        }
                        else {
                            var tempEqiup = Templates.getTemplateById(templates.Map.EQUIP, equip.templateEquip.nextId);
                            this.showProites(equip.templateEquip.properties, tempEqiup.properties);
                            this.labName.text = tempEqiup.name;
                            var needCount = 0;
                            if (equip.templateEquip.quality == 5) {
                                needCount = parseInt(tempEqiup.combine.split("_")[1]);
                            }
                            else {
                                var sArr = tempEqiup.split.split("|");
                                var s = sArr[1];
                                needCount = parseInt(s.split("_")[1]);
                            }
                            this.labXiaoHaoCount.text = GameModels.bag.getItemCountById(ConfigData.CHENGZHUANG_SUIBIAN) + "/" + needCount;
                            var isCan = GameModels.bag.getItemCountById(ConfigData.CHENGZHUANG_SUIBIAN) >= needCount;
                            this.labXiaoHaoCount.textColor = isCan ? 0x00ff00 : 0xff0000;
                        }
                    }
                    else {
                        var tempEqiup = Templates.getTemplateById(templates.Map.EQUIP, TypeEquip.defaultEqiupId[this._selecdIndex]);
                        var tempEqiupNext = Templates.getTemplateById(templates.Map.EQUIP, tempEqiup.nextId);
                        var s1 = tempEqiupNext.combine.split("_");
                        this.labXiaoHaoCount.text = GameModels.bag.getItemCountById(ConfigData.CHENGZHUANG_SUIBIAN) + "/" + s1[1];
                        var isCan = GameModels.bag.getItemCountById(ConfigData.CHENGZHUANG_SUIBIAN) >= parseInt(s1[1]);
                        this.labXiaoHaoCount.textColor = isCan ? 0x00ff00 : 0xff0000;
                        var cArr = tempEqiupNext.properties.split(";");
                        var nowPro = "";
                        for (var j = 0; j < cArr.length; j++) {
                            var cArr1 = cArr[j].split("_");
                            if (nowPro != "") {
                                nowPro = nowPro + ";" + cArr1[0] + "_" + (parseInt(cArr1[1]) * 0);
                            }
                            else {
                                nowPro = cArr1[0] + "_" + (parseInt(cArr1[1]) * 0);
                            }
                        }
                        this.showProites(nowPro, tempEqiupNext.properties);
                        this.labName.text = tempEqiupNext.name;
                    }
                };
                ChengZhuangDialog.prototype.ancientIconHandler = function (e) {
                    for (var i = 0; i < this._equipBoxs.length; i++) {
                        if (e.currentTarget == this._equipBoxs[i]) {
                            this._selecdIndex = i;
                            this.imgSelecd.x = this._equipBoxs[i].x;
                            this.imgSelecd.y = this._equipBoxs[i].y;
                            this.updata();
                            break;
                        }
                    }
                };
                ChengZhuangDialog.prototype.showProites = function (nowPro, nextPro) {
                    for (var i = this.proitesGroup.numChildren; i >= 0; i--) {
                        var items = this.proitesGroup.getChildAt(i);
                        if (items) {
                            this.proitesGroup.removeChildAt(i);
                        }
                    }
                    var nowStr = nowPro.split(";");
                    var nextStr = nextPro.split(";");
                    for (var j = 0; j < nowStr.length; j++) {
                        if (nowStr[j]) {
                            var ProItem = new item.PropertyChangeItem();
                            ProItem.currentState = "state2";
                            ProItem.width = 227;
                            ProItem.updateData(nowStr[j], nextStr[j]);
                            this.proitesGroup.addChild(ProItem);
                        }
                    }
                };
                ChengZhuangDialog.prototype.getItemTouch = function () {
                    mg.uiManager.show(dialog.role.chengzhuang.ChengZhuangSplictDialog, null, ConfigData.CHENGZHUANG_SUIBIAN);
                };
                ChengZhuangDialog.prototype.duanzapTouch = function () {
                    var eqiupPos = 0;
                    var equip = GameModels.equip.useNewEquipsByTypeAndRoomPos(TypeEquip.JICHU_EQIUP, this.headList.selectIndex);
                    for (var i = 0; i < this._equipBoxs.length; i++) {
                        if (i == this._selecdIndex) {
                            eqiupPos = equip[i] ? equip[i].pos : 0;
                            break;
                        }
                    }
                    if (eqiupPos <= 0)
                        return;
                    GameModels.equip.requesHeChengNewEquips(this.headList.selectIndex, eqiupPos, utils.Handler.create(this, function () {
                        this.updata();
                    }));
                };
                Object.defineProperty(ChengZhuangDialog.prototype, "selectIndex", {
                    get: function () {
                        return this._selecdIndex ? this._selecdIndex : 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ChengZhuangDialog.prototype, "headIndex", {
                    get: function () {
                        return this.headList.selectIndex;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ChengZhuangDialog.prototype, "headInfo", {
                    get: function () {
                        return this.headList.getRoleByIndex(0);
                    },
                    enumerable: true,
                    configurable: true
                });
                ChengZhuangDialog.prototype.showSuitGroupText = function () {
                    for (var j = 0; j < this._suitNameArr.length; j++) {
                        if (this._suitCurrArr[j]) {
                            this._suitNameArr[j].textFlow = utils.htmlUtil.getUnderlineFormat(this._suitCurrArr[j].des);
                            this._suitNameArr[j].textColor = 0x00ff00;
                        }
                        else {
                            this._suitNameArr[j].text = Language.getExpression(Language.E_JQ1JCZKJHTZ, (j + 1) * 2);
                            this._suitNameArr[j].textColor = 0xff0000;
                        }
                    }
                };
                ChengZhuangDialog.prototype.showSuit = function () {
                    var obj = {};
                    for (var i = 8; i >= 2; i--, i--) {
                        for (var j = 0; j < this._suitStep.length; j++) {
                            var step = this.hashStep(this._suitStep[j], i);
                            if (step) {
                                obj[i] = step;
                            }
                        }
                    }
                    this._suitCurrArr = [];
                    for (var key in obj) {
                        this._suitCurrArr.push(this.hashSystemSuit(obj[key], key));
                    }
                    this.showSuitGroupText();
                };
                ChengZhuangDialog.prototype.hashStep = function (step, count) {
                    var num = 0;
                    for (var i = 0; i < this._suitStep.length; i++) {
                        if (this._suitStep[i] >= step) {
                            num++;
                        }
                    }
                    if (num >= count)
                        return step;
                    return null;
                };
                ChengZhuangDialog.prototype.hashSystemSuit = function (step, count) {
                    for (var i = 0; i < this._suitArr.length; i++) {
                        if (this._suitArr[i].groupStep == step && this._suitArr[i].groupCount == count) {
                            return this._suitArr[i];
                        }
                    }
                    return null;
                };
                ChengZhuangDialog.prototype.showSuitAlt = function (evt) {
                    var index = this._suitNameArr.indexOf(evt.currentTarget);
                    if (this._suitCurrArr[index]) {
                        mg.alertManager.showAlert(dialog.role.chengzhuang.ChengZhuangSuitProperites, true, true, this._suitCurrArr[index]);
                    }
                };
                /**标签改变 */
                ChengZhuangDialog.CHANG_TAL = "CHANG_TAL";
                return ChengZhuangDialog;
            }(ui.ChengZhuangDialogSkin));
            chengzhuang.ChengZhuangDialog = ChengZhuangDialog;
            __reflect(ChengZhuangDialog.prototype, "dialog.role.chengzhuang.ChengZhuangDialog", ["IModuleView", "egret.DisplayObject"]);
        })(chengzhuang = role.chengzhuang || (role.chengzhuang = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));
