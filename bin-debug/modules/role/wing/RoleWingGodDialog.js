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
        var wing;
        (function (wing) {
            var RoleWingGodDialog = (function (_super) {
                __extends(RoleWingGodDialog, _super);
                function RoleWingGodDialog() {
                    var _this = _super.call(this) || this;
                    _this.typeNames = [Language.C_FY, Language.C_XY2, Language.C_RY, Language.C_LY];
                    return _this;
                }
                RoleWingGodDialog.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._typeIcons = [this.typeIcon0, this.typeIcon1, this.typeIcon2, this.typeIcon3];
                    this.labProp0.text = Language.C_JHSX + ":";
                    this._composIcons = [this.composIcon0, this.composIcon1, this.composIcon2, this.composIcon3, this.composIcon4, this.composIcon5];
                    this._proitesArr = [this.labLife0, this.labAttack0, this.labWuFang0, this.labFaFang0];
                    this._proiresArr1 = [this.labLife1, this.labAttack1, this.labWuFang1, this.labFaFang1];
                    Mediator.getMediator(this).onAdd(this, this.enter);
                    Mediator.getMediator(this).onRemove(this, this.exit);
                };
                RoleWingGodDialog.prototype.enter = function (data) {
                    this.headList.selectIndex = 0;
                    this.headList.init(0, this, this.onChange);
                    this.btnEquipWingGod.addEventListener(egret.TouchEvent.TOUCH_TAP, this.equipWingGodHandler, this);
                    this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upgradeHandler, this);
                    this.selectWingGod.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectWingGodHandler, this);
                    this.selectEquip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectEquipHandler, this);
                    this.btnGetMaterial.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getMaterialHandler2, this);
                    this.btnEquip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stateHandler, this);
                    this.btnComposite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stateHandler, this);
                    this.btnTransform.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stateHandler, this);
                    GameModels.bag.onItemChange(ConfigData.ITEM_GODWING_ID, this, this.showSelectIcon);
                    this._index = data.index;
                    this.showState(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
                    for (var i = 0; i < this._typeIcons.length; i++) {
                        this._typeIcons[i].index = i;
                        this._typeIcons[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.typeIconHandler, this);
                    }
                    for (var j = 0; j < this._composIcons.length; j++) {
                        this._composIcons[j].index = j;
                        this._composIcons[j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.composIconsHandler, this);
                    }
                };
                RoleWingGodDialog.prototype.exit = function () {
                    this.btnEquipWingGod.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.equipWingGodHandler, this);
                    this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.upgradeHandler, this);
                    this.selectWingGod.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectWingGodHandler, this);
                    this.selectEquip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectEquipHandler, this);
                    this.btnGetMaterial.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getMaterialHandler2, this);
                    this.btnEquip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stateHandler, this);
                    this.btnComposite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stateHandler, this);
                    this.btnTransform.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stateHandler, this);
                    for (var i = 0; i < this._typeIcons.length; i++) {
                        this._typeIcons[i].index = i;
                        this._typeIcons[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.typeIconHandler, this);
                    }
                    for (var j = 0; j < this._composIcons.length; j++) {
                        this._composIcons[j].index = j;
                        this._composIcons[j].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.composIconsHandler, this);
                    }
                    this.headList.reset();
                    GameModels.bag.offItemChange(ConfigData.ITEM_GODWING_ID, this, this.showSelectIcon);
                };
                RoleWingGodDialog.prototype.stateHandler = function (e) {
                    switch (e.target) {
                        case this.btnEquip:
                            this.showState(0);
                            break;
                        case this.btnComposite:
                            this.showState(1);
                            break;
                        case this.btnTransform:
                            this.showState(2);
                            break;
                    }
                };
                RoleWingGodDialog.prototype.showState = function (tabIndex) {
                    switch (tabIndex) {
                        case 0:
                            this.currentState = "equip";
                            this.showEquipView();
                            break;
                        case 1:
                            this.currentState = "composite";
                            this.showCompositeView();
                            break;
                        case 2:
                            this.currentState = "transform";
                            this.showTransfromView();
                            break;
                    }
                    this.setToggleRed();
                };
                //头像切换
                RoleWingGodDialog.prototype.onChange = function (index) {
                    this.headList.selectIndex = index;
                    this._index = 0;
                    this.showEquipView();
                };
                RoleWingGodDialog.prototype.setToggleRed = function () {
                    this.imgWarn3.visible = this.equipToggleBtnBoo();
                    this.imgWarn4.visible = this.getTypeIconSingleRed();
                };
                //------------------装备界面--------------------
                //装备界面的显示
                RoleWingGodDialog.prototype.showEquipView = function () {
                    if (this.currentState == "equip") {
                        for (var i = 0; i < this._typeIcons.length; i++) {
                            this.showWingGodEquipIcon(i);
                        }
                        this.showSelectIcon();
                        this.getFightScore();
                        this.showMaster();
                        this.equipViewRed();
                        GameModels.role.updataWingRedPoint();
                    }
                };
                //显示神羽大师
                RoleWingGodDialog.prototype.showMaster = function () {
                    var that = this;
                    var posData = GameModels.role.wingPostionInfoList[that.headList.selectIndex];
                    var num = 0;
                    if (posData.wingGodMasterLevel > 0) {
                        that.imgUnActive.visible = false;
                        that.imgWingGod.filters = that.labMaster.filters = null;
                        if (posData.wingGodMasterLevel >= 6) {
                            that.setMasterLabShow(false);
                        }
                        else {
                            that.setMasterLabShow(true);
                            var nextDataSettingId = 230000 + posData.wingGodMasterLevel + 1;
                            var templateDataSetting = GameModels.dataSet.getDataSettingById(nextDataSettingId);
                            if (templateDataSetting) {
                                that.labNextProp.text = Language.C_XJSX + ":";
                                num = that.getMasterNum(posData.wingGodMasterLevel + 1, posData);
                                var value = parseInt(templateDataSetting.value);
                                var propAdd = value / 100;
                                that.labActive0.text = Language.getExpression(Language.E_YYQSXJ1, propAdd);
                                that.labNextCond.text = Language.C_XJTJ + ":";
                                that.labActive1.textFlow = utils.TextFlowMaker.generateTextFlow(templateDataSetting.des + "(" + num + "/4)");
                            }
                        }
                        that.labProp.textColor = this.labProp0.textColor = 0x34E22A;
                    }
                    else {
                        that.imgUnActive.visible = true;
                        that.imgWingGod.filters = that.labMaster.filters = utils.filterUtil.grayFilters;
                        that.labNextProp.text = Language.C_JHTJ + ":";
                        num = that.getMasterNum(posData.wingGodMasterLevel, posData);
                        that.labActive0.textFlow = utils.TextFlowMaker.generateTextFlow(posData.templateDataSetting.des + "(" + num + "/4)");
                        that.labNextCond.visible = false;
                        that.labActive1.visible = false;
                        that.labProp.textColor = this.labProp0.textColor = 0x808080;
                    }
                    that.labMaster.text = Language.getExpression(Language.E_SYDS1J, posData.wingGodMasterLevel);
                    that.labProp.text = Language.getExpression(Language.E_YYQSXJ1, posData.wingGodMasterPropAdd);
                };
                //当前已经到达大师条件的有几个
                RoleWingGodDialog.prototype.getMasterNum = function (level, posData) {
                    var num = 0;
                    for (var _i = 0, _a = posData.wingGodVOs; _i < _a.length; _i++) {
                        var wingGod = _a[_i];
                        if (wingGod.isPutOn) {
                            if (wingGod.template.step >= level) {
                                num++;
                            }
                        }
                    }
                    return num;
                };
                RoleWingGodDialog.prototype.setMasterLabShow = function (boo) {
                    this.labNextProp.visible = boo;
                    this.labActive0.visible = boo;
                    this.labNextCond.visible = boo;
                    this.labActive1.visible = boo;
                };
                RoleWingGodDialog.prototype.showWingGodEquipIcon = function (index) {
                    var posData = GameModels.role.wingPostionInfoList[this.headList.selectIndex];
                    var wingGodVO = posData.wingGodVOs[index];
                    if (wingGodVO) {
                        if (wingGodVO.isPutOn) {
                            this._typeIcons[index].lvShow = true;
                            this._typeIcons[index].filter = true;
                            this._typeIcons[index].lv = wingGodVO.template.step;
                        }
                        else {
                            this._typeIcons[index].lvShow = false;
                            this._typeIcons[index].filter = false;
                        }
                        this._typeIcons[index].index = index;
                        this._typeIcons[index].wingSource = wingGodVO.templateProp.icon;
                        this._typeIcons[index].nameLabel = wingGodVO.template.name;
                        this._typeIcons[index].wingQuality = wingGodVO.templateProp.quality;
                    }
                };
                RoleWingGodDialog.prototype.showSelectIcon = function () {
                    var that = this;
                    var posData = GameModels.role.wingPostionInfoList[that.headList.selectIndex];
                    var wingGodVO = posData.wingGodVOs[that._index];
                    if (wingGodVO) {
                        that.imgSelect.x = that._typeIcons[that._index].x - 2;
                        that.imgSelect.y = that._typeIcons[that._index].y - 3;
                        that.showEquipTypeIcon(wingGodVO);
                        if (wingGodVO.template.nextId == -1) {
                            that._consumeEnoughBoo = true;
                            that.imgWarn2.visible = false;
                            that.setBtnFiller(true);
                            that.btnUpgrade.label = Language.C_YMJ1;
                        }
                        else {
                            var item;
                            if (wingGodVO.isPutOn) {
                                that.btnUpgrade.label = Language.C_KSSJ;
                                var nextTemp = Templates.getTemplateById(templates.Map.HEROWINGEQUIP, wingGodVO.template.nextId);
                                var nextVO = vo.fromPool(vo.WingGodVO, nextTemp);
                                item = Templates.getTemplateById(templates.Map.ITEM, nextVO.consumeItemId);
                                that._consumeId = nextVO.consumeItemId;
                                var myCount = GameModels.bag.getItemCountById(nextVO.consumeItemId) + 1;
                                that._consumeEnoughBoo = myCount >= nextVO.consumeItemNum;
                                that.labCount.text = myCount + "/" + nextVO.consumeItemNum;
                                that.labCount.textColor = that._consumeEnoughBoo ? TypeColor.GREEN1 : TypeColor.RED1;
                                if (posData.template.step >= nextVO.template.needWingLv) {
                                    that.imgWarn2.visible = that._consumeEnoughBoo;
                                }
                                else {
                                    that.imgWarn2.visible = false;
                                }
                            }
                            else {
                                that.btnUpgrade.label = wingGodVO.template.nextId == -1 ? Language.C_YMJ1 : Language.C_KSHC;
                                that._consumeId = wingGodVO.consumeItemId;
                                item = Templates.getTemplateById(templates.Map.ITEM, wingGodVO.consumeItemId);
                                that._consumeEnoughBoo = utils.CheckUtil.setLabelByItemCount(wingGodVO.consumeItemId, wingGodVO.consumeItemNum, that.labCount, true);
                                if (posData.template.step >= wingGodVO.template.needWingLv) {
                                    that.imgWarn2.visible = that._consumeEnoughBoo;
                                }
                                else {
                                    that.imgWarn2.visible = false;
                                }
                            }
                            this.imgNeedIcon.source = item.icon;
                            that.labConsume.text = item.name + ":"; //Language.getExpression(Language.E_XH,item.name);
                            that.setBtnFiller(false);
                        }
                        that.showUpgradeProp(wingGodVO);
                        that.imgWarn1.visible = GameModels.role.wingGodEquipRedBoo(wingGodVO, posData);
                    }
                };
                //两个typeIcon的显示
                RoleWingGodDialog.prototype.showEquipTypeIcon = function (wingGodVO) {
                    var that = this;
                    if (wingGodVO.isPutOn) {
                        that.typeIcon.lvShow = true;
                        that.typeIcon.lv = wingGodVO.template.step;
                        that.typeIcon.index = that._index;
                        that.typeIcon.wingSource = wingGodVO.templateProp.icon;
                        that.typeIcon.nameLabel = wingGodVO.template.name;
                        that.typeIcon.wingQuality = wingGodVO.templateProp.quality;
                        if (wingGodVO.template.nextId == -1) {
                            that.typeIconNext.index = that._index;
                            that.typeIconNext.wingSource = wingGodVO.templateProp.icon;
                            that.typeIconNext.nameLabel = wingGodVO.template.name;
                            that.typeIconNext.wingQuality = wingGodVO.templateProp.quality;
                            that.typeIconNext.lv = wingGodVO.template.step;
                        }
                        else {
                            var nextTemp = Templates.getTemplateById(templates.Map.HEROWINGEQUIP, wingGodVO.template.nextId);
                            var nextVO = vo.fromPool(vo.WingGodVO, nextTemp);
                            that.typeIconNext.index = that._index + 1;
                            that.typeIconNext.wingSource = nextVO.templateProp.icon;
                            that.typeIconNext.nameLabel = nextVO.template.name;
                            that.typeIconNext.wingQuality = nextVO.templateProp.quality;
                            that.typeIconNext.lv = nextVO.template.step;
                        }
                    }
                    else {
                        that.typeIcon.lvShow = false;
                        that.typeIcon.index = 0;
                        var item = Templates.getTemplateById(templates.Map.ITEM, wingGodVO.consumeItemId);
                        that.typeIcon.wingSource = item.icon;
                        that.typeIcon.nameLabel = item.name;
                        that.typeIcon.wingQuality = item.quality;
                        that.typeIconNext.index = that._index;
                        that.typeIconNext.wingSource = wingGodVO.templateProp.icon;
                        that.typeIconNext.nameLabel = wingGodVO.template.name;
                        that.typeIconNext.wingQuality = wingGodVO.templateProp.quality;
                        that.typeIconNext.lv = wingGodVO.template.step;
                    }
                };
                RoleWingGodDialog.prototype.getFightScore = function () {
                    var posData = GameModels.role.wingPostionInfoList[this.headList.selectIndex];
                    var score = 0;
                    for (var _i = 0, _a = posData.wingGodVOs; _i < _a.length; _i++) {
                        var wingGod = _a[_i];
                        if (wingGod.isPutOn) {
                            score += utils.htmlUtil.computeModelTatolFighting(wingGod.template.properties);
                        }
                    }
                    this.blabFight.text = score + "";
                };
                RoleWingGodDialog.prototype.setBtnFiller = function (boo) {
                    if (boo) {
                        this.btnUpgrade.filters = utils.filterUtil.grayFilters;
                        this.btnUpgrade.touchEnabled = false;
                    }
                    else {
                        this.btnUpgrade.filters = null;
                        this.btnUpgrade.touchEnabled = true;
                    }
                };
                //装备状态神羽属性显示
                RoleWingGodDialog.prototype.showUpgradeProp = function (wingGodVO) {
                    if (wingGodVO.template.nextId == -1) {
                        this.propertyBox.updateAtts(wingGodVO.template.properties, wingGodVO.template.properties);
                    }
                    else {
                        var nextTemp = Templates.getTemplateById(templates.Map.HEROWINGEQUIP, wingGodVO.template.nextId);
                        var nextVO = vo.fromPool(vo.WingGodVO, nextTemp);
                        if (wingGodVO.isPutOn) {
                            this.propertyBox.updateAtts(wingGodVO.template.properties, nextVO.template.properties);
                        }
                        else {
                            var str = this.changProperties(wingGodVO.template.properties);
                            this.propertyBox.updateAtts(str, wingGodVO.template.properties);
                        }
                    }
                };
                RoleWingGodDialog.prototype.changProperties = function (str) {
                    var properties = "";
                    var strArr = str.split(";");
                    for (var i = 0; i < strArr.length; i++) {
                        if (properties) {
                            properties = properties + ";" + strArr[i].split("_")[0] + "_0";
                        }
                        else {
                            properties = properties + strArr[i].split("_")[0] + "_0";
                        }
                    }
                    return properties;
                };
                RoleWingGodDialog.prototype.equipWingGodHandler = function (e) {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    var posData = GameModels.role.wingPostionInfoList[this.headList.selectIndex];
                    var wingGodVO = posData.wingGodVOs[this._index];
                    GameModels.role.net_requestWingGodPutPon(posData.pos, wingGodVO.type, utils.Handler.create(this, function () {
                        mg.alertManager.tip(Language.C_ZBCG, 0x00ff00);
                        this.showEquipView();
                    }));
                };
                RoleWingGodDialog.prototype.upgradeHandler = function (e) {
                    var that = this;
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    if (!that._consumeEnoughBoo) {
                        that.getMaterialHandler();
                        return;
                    }
                    if (that.currentState == "equip") {
                        var posData = GameModels.role.wingPostionInfoList[that.headList.selectIndex];
                        var wingGodVO = posData.wingGodVOs[that._index];
                        if (posData && wingGodVO)
                            GameModels.role.net_requestWingGodUpgrade(posData.pos, wingGodVO.type, utils.Handler.create(that, function () {
                                that.propertyBox.propertyUpEffectPlay();
                                that.showEquipView();
                            }));
                    }
                    else if (that.currentState == "composite") {
                        var showWingDods = GameModels.role.getWingGodComposeData(that._index + 1);
                        var data = showWingDods[that._composSelected];
                        GameModels.role.net_requestWingGodCompose(data.type, data.template.step, utils.Handler.create(that, function () {
                            mg.alertManager.tip(Language.C_HCCG, 0x00ff00);
                            that.showComposeSelected();
                        }));
                    }
                    else if (that.currentState == "transform") {
                        if (!that._curSelectItem) {
                            mg.alertManager.tip(Language.J_QXZXHSY, 0xff0000);
                            return;
                        }
                        if (!that._nextSelectItem) {
                            mg.alertManager.tip(Language.J_QXZYZHSY, 0xff0000);
                            return;
                        }
                        var template = Templates.getTemplateById(templates.Map.HEROWINGEQUIP, that._curSelectItem.id);
                        var wingEquipVO = vo.fromPool(vo.WingGodVO, template);
                        if (!utils.CheckUtil.checkDiamonds(wingEquipVO.changeItemNum, true)) {
                            // if (!utils.CheckUtil.checkDiamonds(300000070, true)) {
                            return;
                        }
                        GameModels.role.net_requestWingGodTransform(parseInt(that._curSelectItem.id), parseInt(that._nextSelectItem.id), utils.Handler.create(that, function (boo) {
                            if (boo) {
                                mg.alertManager.tip(Language.C_ZHCG, 0x00ff00);
                                that.showTransfromView();
                            }
                        }));
                    }
                    this.setToggleRed();
                };
                //四个类型选项是否有红点
                RoleWingGodDialog.prototype.getEquipTypeIconsRed = function () {
                    var posData = GameModels.role.wingPostionInfoList[this.headList.selectIndex];
                    var wingGodVO;
                    for (var i = 0; i < this._typeIcons.length; i++) {
                        wingGodVO = posData.wingGodVOs[i];
                        this._typeIcons[i].isWarn = GameModels.role.getEquipSingleTypeIconRedBoo(wingGodVO, posData);
                    }
                };
                //设置headIcon红点状态
                RoleWingGodDialog.prototype.setHeadIconsRedState = function () {
                    var posData;
                    var isWarn;
                    for (var i = 0; i < GameModels.role.wingPostionInfoList.length; i++) {
                        posData = GameModels.role.wingPostionInfoList[i];
                        isWarn = this.equipHeadTabSingleRedBoo(posData);
                        var head = this.headList.getHeadByIndex(posData.pos);
                        if (head)
                            head.imgWarn.visible = isWarn;
                    }
                };
                //判断头像是否有红点：四个类型选项中有一个红点，该头像就有红点
                RoleWingGodDialog.prototype.equipHeadTabSingleRedBoo = function (posData) {
                    var boo;
                    for (var _i = 0, _a = posData.wingGodVOs; _i < _a.length; _i++) {
                        var wingGodVO = _a[_i];
                        boo = GameModels.role.getEquipSingleTypeIconRedBoo(wingGodVO, posData);
                        if (boo)
                            return true;
                    }
                    return false;
                };
                //判断装备toggle按钮是否有红点：头像有红点，按钮就有红点
                RoleWingGodDialog.prototype.equipToggleBtnBoo = function () {
                    for (var i = 0; i < GameModels.role.wingPostionInfoList.length; i++) {
                        var posData = GameModels.role.wingPostionInfoList[i];
                        var isWarn = this.equipHeadTabSingleRedBoo(posData);
                        if (isWarn)
                            return true;
                    }
                    return false;
                };
                //装备界面所有红点
                RoleWingGodDialog.prototype.equipViewRed = function () {
                    this.getEquipTypeIconsRed();
                    this.setHeadIconsRedState();
                    this.imgWarn3.visible = this.equipToggleBtnBoo();
                };
                RoleWingGodDialog.prototype.getMaterialHandler = function () {
                    if (this._consumeId) {
                        mg.alertManager.tip(Language.J_DJBZCDBZ, 0xff0000);
                        // mg.alertManager.showAlert(PropOfSourceAlert, true,true,this._consumeId);//消耗道具获得途径
                    }
                };
                RoleWingGodDialog.prototype.getMaterialHandler2 = function () {
                    if (this._consumeId) {
                        // mg.alertManager.tip(Language.J_DJBZCDBZ,0xff0000);
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, this._consumeId); //消耗道具获得途径
                    }
                };
                RoleWingGodDialog.prototype.typeIconHandler = function (e) {
                    var icon = e.target;
                    this._index = icon.index;
                    if (this.currentState == "equip") {
                        this.showSelectIcon();
                    }
                    else if (this.currentState == "composite") {
                        this.showCompositeView();
                    }
                    else if (this.currentState == "transform") {
                        this.showTransfromView();
                    }
                };
                //------------------合成界面--------------------
                //合成界面显示
                RoleWingGodDialog.prototype.showCompositeView = function () {
                    for (var i = 0; i < this._typeIcons.length; i++) {
                        this.showWingGodComposeIcon(i);
                    }
                    this._composSelected = 0;
                    this.setBtnFiller(false);
                    this.selectTypeCompose();
                    this.compositeViewRed();
                };
                //合成界面红点
                RoleWingGodDialog.prototype.compositeViewRed = function () {
                    this.getTypeIconRed();
                    GameModels.role.updataWingRedPoint();
                };
                RoleWingGodDialog.prototype.showWingGodComposeIcon = function (i) {
                    this._typeIcons[i].filter = true;
                    this._typeIcons[i].lvShow = false;
                    this._typeIcons[i].index = i;
                    this._typeIcons[i].wingSource = GameModels.role.getWingGodComposeItem(i + 1).icon;
                    this._typeIcons[i].nameLabel = this.typeNames[i];
                    this._typeIcons[i].wingQuality = GameModels.role.getWingGodComposeItem(i + 1).quality;
                };
                //合成阶级选择
                RoleWingGodDialog.prototype.composIconsHandler = function (e) {
                    if (this.currentState == "composite") {
                        var icon = e.target;
                        this._composSelected = icon.index;
                        this.showComposeSelected();
                    }
                };
                RoleWingGodDialog.prototype.selectTypeCompose = function () {
                    var showWingDods = GameModels.role.getWingGodComposeData(this._index + 1);
                    for (var i = 0; i < this._composIcons.length; i++) {
                        this._composIcons[i].nameStr = showWingDods[i].template.name;
                        this._composIcons[i].iconSour = showWingDods[i].templateProp.icon;
                        this._composIcons[i].quality = showWingDods[i].templateProp.quality;
                    }
                    this.imgSelect.x = this._typeIcons[this._index].x - 2;
                    this.imgSelect.y = this._typeIcons[this._index].y - 3;
                    this.showComposeSelected();
                };
                //显示合成选中
                RoleWingGodDialog.prototype.showComposeSelected = function () {
                    var that = this;
                    that.imgSelect2.x = that._composIcons[that._composSelected].x - 7;
                    that.imgSelect2.y = that._composIcons[that._composSelected].y - 7;
                    var showWingDods = GameModels.role.getWingGodComposeData(that._index + 1);
                    var data = showWingDods[that._composSelected];
                    that.typeIcon4.lvShow = that.typeIcon5.lvShow = false;
                    that.typeIcon4.isWarn = that.typeIcon5.isWarn = false;
                    that._consumeId = data.consumeItemId;
                    var consumeItem = Templates.getTemplateById(templates.Map.ITEM, data.consumeItemId);
                    that.typeIcon4.wingSource = consumeItem.icon;
                    that.typeIcon4.nameLabel = consumeItem.name;
                    that.typeIcon4.wingQuality = consumeItem.quality;
                    that.typeIcon5.wingSource = data.templateProp.icon;
                    that.typeIcon5.nameLabel = data.template.name;
                    that.typeIcon5.wingQuality = data.templateProp.quality;
                    that._consumeEnoughBoo = utils.CheckUtil.setLabelByItemCount(data.consumeItemId, data.consumeItemNum, that.labCount, true);
                    that.imgWarn0.visible = that._consumeEnoughBoo;
                    that.showComposePorp();
                    this.compositeViewRed();
                };
                //显示合成属性
                RoleWingGodDialog.prototype.showComposePorp = function () {
                    var that = this;
                    var showWingDods = GameModels.role.getWingGodComposeData(that._index + 1);
                    var data = showWingDods[that._composSelected];
                    if (that._composSelected == 0) {
                        that.nextGroup.visible = false;
                        var properites = data.getPropertiesBuyTypeAndStep(data.type, data.step);
                        var str = properites.split(";");
                        for (var i = 0; i < this._proitesArr.length; i++) {
                            if (str[i]) {
                                this._proitesArr[i].text = utils.htmlUtil.getAttributeFormat(str[i]);
                            }
                            else {
                                this._proitesArr[i].text = "";
                            }
                        }
                    }
                    else {
                        var preData = showWingDods[that._composSelected - 1];
                        that.nextGroup.visible = true;
                        var nowproperites = data.getPropertiesBuyTypeAndStep(data.type, data.step - 1);
                        var nowstr = nowproperites.split(";");
                        for (var i = 0; i < this._proitesArr.length; i++) {
                            if (nowstr[i]) {
                                this._proitesArr[i].text = utils.htmlUtil.getAttributeFormat(nowstr[i]);
                            }
                            else {
                                this._proitesArr[i].text = "";
                            }
                        }
                        var nextproperites = data.getPropertiesBuyTypeAndStep(data.type, data.step);
                        var nextstr = nextproperites.split(";");
                        for (var i = 0; i < this._proiresArr1.length; i++) {
                            if (nextstr[i]) {
                                this._proiresArr1[i].text = utils.htmlUtil.getAttributeFormat(nextstr[i]);
                            }
                            else {
                                this._proiresArr1[i].text = "";
                            }
                        }
                    }
                };
                //合成左侧选择列表的红点
                RoleWingGodDialog.prototype.getComposeIconsRed = function () {
                    var wingDods = GameModels.role.getWingGodComposeData(this._index + 1);
                    for (var i = 0; i < this._composIcons.length; i++) {
                        this._composIcons[i].isWarn = GameModels.role.getComposeIconRed(wingDods[i]);
                    }
                };
                //四种类型的红点设置
                RoleWingGodDialog.prototype.getTypeIconRed = function () {
                    for (var i = 0; i < this._typeIcons.length; i++) {
                        var wingDods = GameModels.role.getWingGodComposeData(i + 1);
                        this._typeIcons[i].isWarn = GameModels.role.getTypeSingleIconRed(wingDods);
                    }
                    this.getComposeIconsRed();
                };
                //四种类型有一种有红点，合成选择按钮就有红点
                RoleWingGodDialog.prototype.getTypeIconSingleRed = function () {
                    for (var i = 0; i < this._typeIcons.length; i++) {
                        var wingDods = GameModels.role.getWingGodComposeData(i + 1);
                        var isWarn = GameModels.role.getTypeSingleIconRed(wingDods);
                        if (isWarn)
                            return true;
                    }
                    return false;
                };
                RoleWingGodDialog.prototype.showTransfromView = function () {
                    this.clearComsumeIcon(this.selectEquip);
                    this.clearComsumeIcon(this.selectWingGod);
                    this._curSelectItem = null;
                    this._nextSelectItem = null;
                    this.setBtnFiller(true);
                    this.labNeed.text = Language.C_XHYL + ":";
                    this.labCount.text = "0";
                    this.setImgAddShow(true, false);
                };
                RoleWingGodDialog.prototype.setImgAddShow = function (boo0, boo1) {
                    if (this.imgAdd0.visible != boo0)
                        this.imgAdd0.visible = boo0;
                    if (this.imgAdd1.visible != boo1)
                        this.imgAdd1.visible = boo1;
                };
                RoleWingGodDialog.prototype.clearComsumeIcon = function (icon) {
                    icon.lvShow = false;
                    icon.nameShow = false;
                    icon.wingSource = null;
                    icon.wingQuality = 1;
                };
                RoleWingGodDialog.prototype.setConsumeIcon = function (icon, item) {
                    icon.lvShow = true;
                    icon.nameShow = true;
                    icon.lv = item.lv;
                    icon.nameLabel = item.name;
                    icon.wingSource = item.icon;
                    icon.wingQuality = item.quality;
                };
                RoleWingGodDialog.prototype.selectEquipHandler = function (e) {
                    mg.alertManager.showAlert(RoleWingGodConcumeAlert, true, true, utils.Handler.create(this, function (item) {
                        this.setConsumeIcon(this.selectEquip, item);
                        this._curSelectItem = item;
                        if (this._nextSelectItem) {
                            this.clearComsumeIcon(this.selectWingGod);
                            this._nextSelectItem = null;
                        }
                        this.setImgAddShow(false, true);
                    }));
                };
                RoleWingGodDialog.prototype.selectWingGodHandler = function (e) {
                    if (!this._curSelectItem) {
                        mg.alertManager.tip(Language.J_QXZXHSY);
                        return;
                    }
                    mg.alertManager.showAlert(RoleWingGodSelectAlert, true, true, this._curSelectItem, utils.Handler.create(this, function (item) {
                        this.setConsumeIcon(this.selectWingGod, item);
                        this._nextSelectItem = item;
                        this.setImgAddShow(false, false);
                        this.setBtnFiller(true);
                        var template = Templates.getTemplateById(templates.Map.HEROWINGEQUIP, item.id);
                        var wingEquipVO = vo.fromPool(vo.WingGodVO, template);
                        this._consumeId = wingEquipVO.changeItemId;
                        var templateItem = Templates.getTemplateById(templates.Map.ITEM, this._consumeId);
                        this.labNeed.text = templateItem.name + ":";
                        this.imgNeedIcon.source = templateItem.icon;
                        if (GameModels.user.player.diamonds >= wingEquipVO.changeItemNum) {
                            this._consumeEnoughBoo = true;
                            this.labCount.textColor = TypeColor.GREEN1;
                        }
                        else {
                            this._consumeEnoughBoo = false;
                            this.labCount.textColor = TypeColor.RED1;
                        }
                        this.labCount.text = GameModels.user.player.diamonds + "/" + wingEquipVO.changeItemNum;
                        this.setBtnFiller(false);
                    }));
                };
                return RoleWingGodDialog;
            }(ui.RoleWingGodDialogSkin));
            wing.RoleWingGodDialog = RoleWingGodDialog;
            __reflect(RoleWingGodDialog.prototype, "dialog.role.wing.RoleWingGodDialog");
        })(wing = role.wing || (role.wing = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));
