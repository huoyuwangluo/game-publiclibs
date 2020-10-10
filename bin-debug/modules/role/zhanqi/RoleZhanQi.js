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
    var zhanqi;
    (function (zhanqi) {
        var RoleZhanQi = (function (_super) {
            __extends(RoleZhanQi, _super);
            function RoleZhanQi() {
                return _super.call(this) || this;
            }
            RoleZhanQi.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._effPonit = [new egret.Point(250, 550), new egret.Point(300, 600), new egret.Point(350, 550)];
                this._currProLabArr = [this.labLife, this.labAttack, this.labWuFang, this.labFaFang];
                this.labGetProp0.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_HDCL);
                this.labGetProp0.touchEnabled = true;
            };
            RoleZhanQi.prototype.enter = function (data) {
                this.btnGetItem.visible = GameModels.platform.isPay;
                this.progressStarExp.value = 0;
                this._currMount = null;
                this._currIndex = GameModels.hores.getHashRedPointIndex();
                GameModels.fashion.addEventListener(mo.ModelFashion.FASHION_ITEM_CHANGE, this.currMountView, this);
                GameModels.fashion.addEventListener(mo.ModelFashion.FASHION_ITEM_CHANGE, this.showView, this);
                this.btnAutoUpgrade.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnUpgrade, this);
                this.btnChuZhan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnGetItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.labGetProp0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                GameModels.fashion.net_requestFashionInfo(utils.Handler.create(this, function () {
                    this.requestMount();
                }));
                GameModels.hores.addEventListener(mo.ModelHores.HORES_DATA_CHANGE, this.showView, this);
                GameModels.bag.onItemChange(ConfigData.ITEM_ZHANQI_UPLEVEL, this, this.showConsume);
            };
            RoleZhanQi.prototype.exit = function () {
                this._currMount = null;
                this._currIndex = 0;
                this.closeZDSJ();
                GameModels.fashion.removeEventListener(mo.ModelFashion.FASHION_ITEM_CHANGE, this.currMountView, this);
                GameModels.fashion.addEventListener(mo.ModelFashion.FASHION_ITEM_CHANGE, this.showView, this);
                this.btnAutoUpgrade.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnUpgrade, this);
                this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnChuZhan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.btnGetItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.labGetProp0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                GameModels.hores.removeEventListener(mo.ModelHores.HORES_DATA_CHANGE, this.showView, this);
                GameModels.bag.offItemChange(ConfigData.ITEM_ZHANQI_UPLEVEL, this, this.showConsume);
            };
            RoleZhanQi.prototype.requestMount = function () {
                this.currMountView();
                GameModels.hores.requestHoresinfo(utils.Handler.create(this, function () {
                    this.showView();
                }));
            };
            RoleZhanQi.prototype.currMountView = function () {
                this.btnChuZhan.filters = null;
                this.btnChuZhan.touchEnabled = true;
                this.btnChuZhan.isWarn = false;
                var playerHorse = GameModels.user.player.horseAvatarId;
                var mountList = GameModels.fashion.getFashionData(TypeFashion.MOUNTS);
                this._currMount = mountList[this._currIndex];
                this.labName.text = this._currMount.name;
                this.imgModel.source = ResPath.getShowHoresPath(this._currMount.model);
                var consumeId = this._currMount.consume.split("_")[0];
                var consumeCount = parseInt(this._currMount.consume.split("_")[1]);
                utils.CheckUtil.setLabelByItemCount(consumeId, consumeCount, this.labCount1, true);
                var item = Templates.getTemplateById(templates.Map.ITEM, consumeId);
                this.labNeed1.text = Language.C_XH + item.name + ":";
                this.labItemFight.text = Language.P_ZL + this._currMount.score;
                var proites = this._currMount.proites.split(";");
                for (var i = 0; i < this._currProLabArr.length; i++) {
                    if (proites[i]) {
                        this._currProLabArr[i].text = utils.htmlUtil.getAttributeFormat(proites[i]);
                    }
                    else {
                        this._currProLabArr[i].text = "";
                    }
                }
                if (this._currMount.isActived) {
                    this.activeLabGroup.visible = false;
                    if (playerHorse == this._currMount.id) {
                        this.btnChuZhan.filters = utils.filterUtil.grayFilters;
                        ;
                        this.btnChuZhan.touchEnabled = false;
                        this.btnChuZhan.label = Language.C_YQC;
                    }
                    else {
                        this.btnChuZhan.label = Language.C_QC;
                    }
                }
                else {
                    var bagCount = GameModels.bag.getItemCountById(consumeId);
                    if (bagCount >= consumeCount)
                        this.btnChuZhan.isWarn = true;
                    this.activeLabGroup.visible = true;
                    this.btnChuZhan.label = Language.C_JH;
                }
            };
            RoleZhanQi.prototype.onBtnUpgrade = function (e) {
                if (!this._currVo)
                    return;
                if (this._currVo.templatesHores.nextId < 0) {
                    mg.alertManager.tip(Language.C_ZQYMJ);
                }
                else {
                    common.CommonBtnLongClick.instance.startLongClickFun(this.btnAutoUpgrade, this, this.continuousUpgrade);
                }
            };
            //判断消耗是否足够
            RoleZhanQi.prototype.continuousUpgrade = function () {
                var _this = this;
                var config = this._currVo.templatesHores;
                if (config.nextId > 0) {
                    var item = Templates.getTemplateById(templates.Map.ITEM, parseInt(config.consume.split("_")[0]));
                    var materialNum = GameModels.bag.getItemCountById(item.id);
                    var needMaterial = parseInt(config.consume.split("_")[1]);
                    if (materialNum >= needMaterial) {
                        mg.soundManager.playSound("OpenUI_zdsj", 1, true, true);
                        GameModels.hores.requestHoresUpgrade(this._currVo.isautobuy ? 2 : 1, utils.Handler.create(this, function (data) {
                            _this.propertyBox.propertyUpEffectPlay();
                            if (_this._currVo.templatesHores.star > _this._oldLv || _this._currVo.templatesHores.step > _this._oldStep) {
                                _this.progressStarExp.noTweenValue = 0;
                            }
                            // if (this._currVo.templatesHores.step > this._oldStep) {
                            // 	GameModels.hores.requestHoresBattle(this._currstep, utils.Handler.create(this, () => {
                            // 		mg.alertManager.tip(Language.C_QCCG);
                            // 	}));
                            // }
                            _this.showView();
                        }), utils.Handler.create(this, function (data) {
                            mg.alertManager.tip(data.CodeMsg, 0xff0000);
                            _this.closeZDSJ();
                        }));
                    }
                    else {
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, config.consume.split("_")[0]);
                        this.closeZDSJ();
                    }
                }
            };
            RoleZhanQi.prototype.onBtnClick = function (e) {
                var _this = this;
                switch (e.currentTarget) {
                    case this.imgHelp:
                        mg.alertManager.showAlert(RoleZhanQiWishAlert, false, true, null);
                        break;
                    case this.btnGetItem:
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, this._currVo.templatesHores.consume.split("_")[0]);
                        break;
                    case this.btnChuZhan:
                        if (!this._currMount)
                            return;
                        if (this._currMount.isActived) {
                            GameModels.fashion.net_requestFashionDress(this._currMount.id);
                        }
                        else {
                            GameModels.fashion.net_requestFashionActive(this._currMount.id, utils.Handler.create(this, function () {
                                mg.effectManager.playEffectOnce(TypeEffectId.JIHUO_EFF, _this.width * 0.5, _this.height * 0.5, _this);
                            }));
                        }
                        break;
                    case this.btnRight:
                        this._currIndex++;
                        if (this._currIndex > 4)
                            this._currIndex = 4;
                        this.currMountView();
                        break;
                    case this.btnLeft:
                        this._currIndex--;
                        if (this._currIndex < 0)
                            this._currIndex = 0;
                        this.currMountView();
                        break;
                    case this.labGetProp0:
                        var consumeId = this._currMount.consume.split("_")[0];
                        mg.alertManager.showAlert(PropOfSourceAlert, true, true, consumeId); //激活道具获得途径
                        break;
                }
            };
            RoleZhanQi.prototype.showFightNum = function () {
                var _this = this;
                var num = TypeFunction.ZhanQi;
                GameModels.common.requestFightNum(this, num, function (fightNum) {
                    _this.labFight.text = fightNum.toString();
                });
            };
            RoleZhanQi.prototype.showConsume = function () {
                if (!this._currVo)
                    return;
                var hashAnimal = false;
                var yaoHuanimal = GameModels.animal.getAnimalBuyType(20); //妖虎
                if (yaoHuanimal.isAct && yaoHuanimal.step >= 4) {
                    hashAnimal = true;
                }
                var str = [];
                this.btnAutoUpgrade.isWarn = false;
                str = this._currVo.templatesHores.consume.split("_");
                var item = Templates.getTemplateById(templates.Map.ITEM, str[0]);
                this.labXiaoHao.text = item.name + ":";
                var count = hashAnimal ? Math.floor(parseInt(str[1]) / 2) : parseInt(str[1]);
                this.labCount.text = GameModels.bag.getItemCountById(str[0]) + "/" + count;
                this.btnGetData.source = item.icon;
                var hashActHorse = GameModels.hores.hashActHorse();
                if (GameModels.bag.getItemCountById(str[0]) >= count && hashActHorse) {
                    this.labCount.textColor = TypeColor.GREEN1;
                    if (this._currVo.templatesHores.nextId > 0 && GameModels.user.player.level >= this._currVo.templatesHores.allLv) {
                        this.btnAutoUpgrade.isWarn = true;
                    }
                }
                else {
                    this.labCount.textColor = TypeColor.RED1;
                }
            };
            RoleZhanQi.prototype.showView = function () {
                this._oldStep = this._currVo ? this._currVo.templatesHores.step : 0;
                this._oldLv = this._currVo ? this._currVo.templatesHores.star : 0;
                this._currVo = GameModels.hores.currVo;
                if (this._currVo) {
                    this._currstep = this._currVo.templatesHores.step;
                    this._horesData = Templates.getTemplateByProperty(templates.Map.ZHANQI, "step", this._currstep);
                    this.showFightNum();
                    this.showConsume();
                    this.lab_zfz.text = this._currVo.wishvalue + "/" + this._currVo.templatesHores.wishes;
                    this.labNeedLv.text = "" + this._currVo.templatesHores.allLv;
                    this.blabNum.text = this._currVo.templatesHores.step + "";
                    this.progressStarExp.max = this._currVo.templatesHores.wishes;
                    this.progressStarExp.value = this._currVo.wishvalue;
                    if (this._horesData.step < this._currVo.templatesHores.step) {
                        this.star.setStar(5, 5);
                    }
                    else if (this._horesData.step == this._currVo.templatesHores.step) {
                        this.star.setStar(this._currVo.templatesHores.star, 5);
                    }
                    else {
                        this.star.setStar(0, 5);
                    }
                    this.btnAutoUpgrade.label = Language.C_SJ1;
                    this.labHint.visible = true;
                    if (this._currVo.templatesHores.star == 5) {
                        if (this._currVo.templatesHores.nextId < 0) {
                            this.btnAutoUpgrade.label = Language.C_YMJ;
                            this.labCount.text = Language.C_YMJ;
                            this.labCount.textColor = TypeColor.RED1;
                            this.labHint.visible = false;
                        }
                    }
                    else {
                        this.progressStarExp.max = this._currVo.templatesHores.wishes;
                        this.progressStarExp.value = this._currVo.wishvalue;
                    }
                    if (GameModels.hores.checkCanUpgrade()) {
                        this.btnAutoUpgrade.touchEnabled = true;
                        this.btnAutoUpgrade.filters = null;
                    }
                    else {
                        this.btnAutoUpgrade.touchEnabled = false;
                        this.btnAutoUpgrade.filters = utils.filterUtil.grayFilters;
                        ;
                    }
                    this.showProperties();
                }
            };
            RoleZhanQi.prototype.showProperties = function () {
                this.addProperties();
                var propertyData = {};
                var arr = this._currVo.templatesHores.properties.split(";");
                for (var i = 0; i < arr.length; i++) {
                    var str = arr[i].split("_");
                    // var num: number = this._currVo.getZhanQiValue(str[0]);
                    // if (this._currVo.isActive == 0) num = 0;
                    var count = parseInt(str[1]);
                    if (str[0] == "HP") {
                        propertyData["HP"] = count;
                    }
                    if (str[0] == "ATT") {
                        propertyData["ATT"] = count;
                    }
                    if (str[0] == "DEF") {
                        propertyData["DEF"] = count;
                    }
                    if (str[0] == "CROSS") {
                        propertyData["CROSS"] = count;
                    }
                }
                var addtextCurr = [this._hp, this._att, this._def, this._cross];
                var value = this._currVo.wishvalue / this._currVo.templatesHores.wishes;
                if (this._currVo.templatesHores.nextId > 0) {
                    var tem = Templates.getTemplateById(templates.Map.ZHANQI, this._currVo.templatesHores.nextId);
                    var propertyData1 = {};
                    var arr1 = tem.properties.split(";");
                    for (var i = 0; i < arr1.length; i++) {
                        var str1 = arr1[i].split("_");
                        var needCount = parseInt(str1[1]);
                        var count1 = needCount;
                        if (str1[0] == "HP") {
                            propertyData1["HP"] = count1;
                        }
                        if (str1[0] == "ATT") {
                            propertyData1["ATT"] = count1;
                        }
                        if (str1[0] == "DEF") {
                            propertyData1["DEF"] = count1;
                        }
                        if (str1[0] == "CROSS") {
                            propertyData1["CROSS"] = count1;
                        }
                    }
                    this.propertyBox.updateTemplate(propertyData, propertyData1);
                    // if (this._currVo.zzlevel > 0 && this._currVo.feishenlevel == 0) {
                    // 	this.propertyBox.updateTemplate(propertyData, propertyData1, -1, addtextCurr, value, true, 20);
                    // }
                    // else {
                    // 	this.propertyBox.updateTemplate(propertyData, propertyData1, this._currVo.feishenlevel * 0.01, addtextCurr, value, true, 20);
                    // }
                }
                else {
                    this.propertyBox.updateTemplate(propertyData, propertyData);
                    // if (this._currVo.zzlevel > 0 && this._currVo.feishenlevel == 0) {
                    // 	this.propertyBox.updateTemplate(propertyData, propertyData, -1, addtextCurr, value, true, 20);
                    // }
                    // else {
                    // 	this.propertyBox.updateTemplate(propertyData, propertyData, this._currVo.feishenlevel * 0.01, addtextCurr, value, true, 20);
                    // }
                }
            };
            RoleZhanQi.prototype.addProperties = function () {
                this._hp = this._att = this._def = this._cross = 0;
                this.getCountCurr(GameModels.hores.dataSetZhiLing.value, this._currVo.zzlevel);
                this.getCountCurr(GameModels.hores.dataSetFeiShengDan.value, this._currVo.feishenlevel);
            };
            RoleZhanQi.prototype.getCountCurr = function (str, count) {
                var strArr = str.split(";");
                for (var i = 0; i < strArr.length; i++) {
                    var s = strArr[i].split("_");
                    switch (s[0]) {
                        case "HP":
                            this._hp = this._hp + (parseInt(s[1]) * count);
                            break;
                        case "ATT":
                            this._att = this._att + (parseInt(s[1]) * count);
                            break;
                        case "DEF":
                            this._def = this._def + (parseInt(s[1]) * count);
                            break;
                        case "CROSS":
                            this._cross = this._cross + (parseInt(s[1]) * count);
                            break;
                    }
                }
            };
            RoleZhanQi.prototype.closeZDSJ = function () {
                common.CommonBtnLongClick.instance.stopLongClickFun();
            };
            return RoleZhanQi;
        }(ui.RoleZhanQiSkin));
        zhanqi.RoleZhanQi = RoleZhanQi;
        __reflect(RoleZhanQi.prototype, "dialog.zhanqi.RoleZhanQi");
    })(zhanqi = dialog.zhanqi || (dialog.zhanqi = {}));
})(dialog || (dialog = {}));
