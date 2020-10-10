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
var animal;
(function (animal_1) {
    var AnimalMain = (function (_super) {
        __extends(AnimalMain, _super);
        function AnimalMain() {
            return _super.call(this) || this;
        }
        AnimalMain.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._btnArr = [this.btn0, this.btn1];
            this._labArr = [this.lab0, this.lab1];
            this._nameArr = [Language.C_YLLS, Language.C_XYLS, Language.C_SSLS, Language.C_SHLS, Language.C_CSLS];
        };
        AnimalMain.prototype.enter = function (data) {
            var _this = this;
            if (data === void 0) { data = null; }
            this.createPhantomEffect();
            var hashRedAnimal = GameModels.animal.hashRedpoint();
            if (!data && hashRedAnimal > 0)
                data = hashRedAnimal;
            var animal = Templates.getTemplateById(templates.Map.ANIMAL, data ? data : 101);
            this._index = animal && animal.quality >= 6 ? 1 : 0;
            GameModels.animal.requestAnimalGetList(utils.Handler.create(this, function () {
                _this._voArr = GameModels.animal.animalArr;
                _this.showBtnView();
                _this.showist(data);
            }));
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
            this.btnPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewClick, this);
            this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectedClick, this);
            GameModels.animal.addEventListener(mo.ModelAnimal.SELECTED_UPDATA, this.showCoumes, this);
            this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgradeClick, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
        };
        AnimalMain.prototype.exit = function () {
            this.removePhantomEffect();
            GameModels.animal.clearSelectedArr();
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
            this.btnPreview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewClick, this);
            this.imgIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectedClick, this);
            GameModels.animal.removeEventListener(mo.ModelAnimal.SELECTED_UPDATA, this.showCoumes, this);
            this.btnUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgradeClick, this);
            this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
        };
        AnimalMain.prototype.showBtnView = function () {
            for (var i = 0; i < this._btnArr.length; i++) {
                if (i == this._index) {
                    this._btnArr[i].currentState = "down";
                    this._labArr[i].textColor = 0xCCC6BA;
                }
                else {
                    this._btnArr[i].currentState = "up";
                    this._labArr[i].textColor = 0x969696;
                }
            }
        };
        AnimalMain.prototype.showist = function (configId) {
            this.scroller.stopAnimation();
            this.scroller.viewport.scrollV = 0;
            var animalArr = [];
            for (var _i = 0, _a = this._voArr; _i < _a.length; _i++) {
                var animal = _a[_i];
                if (this._index == 0) {
                    animalArr.push(animal);
                }
                else {
                    if (animal.quality >= 6) {
                        animalArr.push(animal);
                    }
                }
            }
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(animalArr);
            }
            else {
                this._listData.source = animalArr;
            }
            this.list.dataProvider = this._listData;
            this.list.selectedIndex = 0;
            if (configId) {
                for (var i = 0; i < this._listData.source.length; i++) {
                    if (this._listData.source[i].id == configId) {
                        this.list.selectedIndex = i;
                        break;
                    }
                }
            }
            this._currData = this.list.selectedItem;
            this.showView();
        };
        AnimalMain.prototype.showView = function () {
            if (!this._currData)
                return;
            this.imgStep.visible = false;
            this._oldStep = this._currData.step;
            this.propertyBox.x = 218;
            this.labFight.text = this._currData.isAct ? this._currData.fight.toString() : "0";
            this.labName.text = this._currData.name;
            if (this._effect) {
                this._effect.resId = this._currData.model.toString();
                this._effect.play();
            }
            if (this._currData.isAct) {
                if (this._currData.step >= 2) {
                    this.imgStep.visible = true;
                    this.imgStep.source = "animal_json.img_animalStep_" + this._currData.step;
                }
            }
            var isOpen8Day = GameModels.animal.hashOpen8day;
            if (isOpen8Day) {
                this.labSkill.text = "";
                this.labSkillDes.text = "";
                this.skillGroup.visible = true;
                this.btnBuy.visible = true;
                this.skillGroup.removeChildren();
                var animalArr = GameModels.animal.getTempArrBuyType(this._currData.type);
                for (var i = 0; i < 6; i++) {
                    var skill = new item.PetSKillAndTalent();
                    if (animalArr[i]) {
                        skill.dataSource = animalArr[i];
                        skill.filters = this._currData.isAct ? this._currData.step >= animalArr[i].step ? null : utils.filterUtil.grayFilters : utils.filterUtil.grayFilters;
                    }
                    else {
                        skill.dataSource = "common_json.img_skill_wu_png";
                    }
                    skill.scaleX = skill.scaleY = 0.8;
                    this.skillGroup.addChild(skill);
                    skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
                }
                if (this._currData.nextId == -1) {
                    this.hideCoumes();
                    this.propertyBox.updateAtts(this._currData.proites, this._currData.proites);
                }
                else {
                    this.showCoumes();
                    if (this._currData.isAct) {
                        this.propertyBox.updateAtts(this._currData.proites, this._currData.nextProites);
                    }
                    else {
                        this.propertyBox.updateAtts(this._currData.getNoActProites, this._currData.proites);
                    }
                }
                if (this._currData.isAct) {
                    if (this._currData.selfConsume) {
                        this.btnUpgrade.label = Language.C_BSHEN;
                    }
                    else {
                        this.btnUpgrade.label = Language.C_SJ1;
                    }
                }
                else {
                    this.btnUpgrade.label = Language.C_JH;
                }
            }
            else {
                this.btnBuy.visible = false;
                this.skillGroup.removeChildren();
                this.skillGroup.visible = false;
                var elements = [];
                elements.push({ text: Language.C_XTJN + ": (", style: { textColor: 0xD3D3D3 } });
                elements.push({ text: this._currData.isAct ? Language.C_YJH : Language.C_WJH, style: { textColor: this._currData.isAct ? TypeColor.GREEN1 : TypeColor.RED1 } });
                elements.push({ text: ")", style: { textColor: 0xD3D3D3 } });
                this.labSkill.textFlow = elements;
                this.labSkillDes.text = this._currData.des;
                if (this._currData.isAct) {
                    this.propertyBox.x = 315;
                    this.propertyBox.updateAtts(this._currData.proites, this._currData.proites, 30, false);
                }
                else {
                    this.propertyBox.updateAtts(this._currData.getNoActProites, this._currData.proites);
                }
                if (this._currData.isAct) {
                    this.hideCoumes();
                }
                else {
                    this.btnUpgrade.label = Language.C_JH;
                    this.showCoumes();
                }
            }
        };
        AnimalMain.prototype.showCoumes = function () {
            this.imgQuality.visible = true;
            this.imgIcon.visible = true;
            this.btnUpgrade.visible = true;
            this.imgMax.visible = false;
            var selectedArr = GameModels.animal.selectedAnimal;
            if (this._currData.selfConsume) {
                var strArr = this._currData.selfConsume.split("_");
                var item = Templates.getTemplateById(templates.Map.ITEM, strArr[0]);
                var bagCount = GameModels.bag.getItemCountById(item.id);
                this.imgQuality.source = ResPath.getQuality(item.quality);
                this.imgIcon.source = item.icon;
                this.imgIcon.touchEnabled = false;
                this.labItemName.text = item.name;
                this.labCount.text = bagCount + "/" + strArr[1];
                this.labCount.textColor = bagCount >= parseInt(strArr[1]) ? TypeColor.GREEN1 : TypeColor.RED1;
            }
            else {
                var strArr = this._currData.templateNextLvs.consume1_Item.split(";");
                var otherItem = Templates.getTemplateById(templates.Map.ITEM, strArr[0]);
                this.imgQuality.source = ResPath.getQuality(otherItem.quality);
                this.imgIcon.source = "animal_json.img_animalWho_" + otherItem.quality;
                this.imgIcon.touchEnabled = true;
                this.labItemName.text = this._nameArr[otherItem.quality - 3];
                this.labCount.text = selectedArr.length + "/" + this._currData.otherConsumeCount;
                this.labCount.textColor = selectedArr.length >= this._currData.otherConsumeCount ? TypeColor.GREEN1 : TypeColor.RED1;
            }
            this.imgRedPoint.visible = this._currData.hashRedPoint;
        };
        AnimalMain.prototype.hideCoumes = function () {
            this.imgQuality.visible = false;
            this.imgIcon.visible = false;
            this.btnUpgrade.visible = false;
            this.labCount.text = "";
            this.imgRedPoint.visible = false;
            if (GameModels.animal.hashOpen8day) {
                this.imgMax.source = "img_animalBg5_png";
            }
            else {
                this.imgMax.source = "img_animalBg4_png";
            }
            this.imgMax.visible = true;
            this.labItemName.text = "";
        };
        AnimalMain.prototype.onSkillClick = function (evt) {
            var target = evt.currentTarget;
            if (target.dataSource) {
                var data = target.dataSource;
                if (data instanceof templates.animal) {
                    mg.TipUpManager.instance.showTip(tipUps.AnimalSkillTips, target.dataSource);
                }
            }
        };
        AnimalMain.prototype.onBtnClick = function (e) {
            this._index = this._btnArr.indexOf(e.currentTarget);
            this.showBtnView();
            this.showist();
        };
        AnimalMain.prototype.onUpgradeClick = function (e) {
            var _this = this;
            if (!this._currData)
                return;
            var isAct = this._currData.isAct;
            if (this._currData.selfConsume) {
                var strArr = this._currData.selfConsume.split("_");
                var item = Templates.getTemplateById(templates.Map.ITEM, strArr[0]);
                var bagCount = GameModels.bag.getItemCountById(item.id);
                if (bagCount < parseInt(strArr[1])) {
                    mg.alertManager.tip(Language.J_CLBZ);
                    return;
                }
                GameModels.animal.requestAnimalActive(this._currData.type, "", utils.Handler.create(this, function () {
                    _this._currData = GameModels.animal.getAnimalBuyType(_this._currData.type);
                    if (isAct) {
                        if (_this._currData.step > _this._oldStep) {
                            mg.alertManager.showAlert(PetSkillLockTips, true, true, _this._currData.templates);
                        }
                        mg.alertManager.tip(Language.C_BSCG);
                    }
                    else {
                        mg.alertManager.showAlert(PetSkillLockTips, true, true, _this._currData.templates);
                        mg.effectManager.playEffectOnce(TypeEffectId.JIHUO_EFF, _this.width * 0.5, _this.height * 0.5, _this);
                    }
                    _this._listData.replaceAll(_this._listData.source);
                    _this.showView();
                }));
            }
            else {
                var selectedArr = GameModels.animal.selectedAnimal;
                var selectedId = [];
                var str = "";
                for (var _i = 0, selectedArr_1 = selectedArr; _i < selectedArr_1.length; _i++) {
                    var index = selectedArr_1[_i];
                    if (selectedId.indexOf(index) == -1) {
                        selectedId.push(index);
                        if (!str) {
                            str = index + "_" + this.getSameNum(index, selectedArr);
                        }
                        else {
                            str = str + ";" + index + "_" + this.getSameNum(index, selectedArr);
                        }
                    }
                }
                if (!str) {
                    mg.alertManager.tip(Language.J_QXXZCL);
                    return;
                }
                GameModels.animal.requestAnimalActive(this._currData.type, str, utils.Handler.create(this, function () {
                    _this._currData = GameModels.animal.getAnimalBuyType(_this._currData.type);
                    mg.alertManager.tip(Language.C_SJCG);
                    _this._listData.replaceAll(_this._listData.source);
                    _this.showView();
                }));
            }
        };
        AnimalMain.prototype.onListClick = function (e) {
            this.list.selectedIndex = e.itemIndex;
            this._currData = this.list.selectedItem;
            this.showView();
        };
        AnimalMain.prototype.getSameNum = function (val, arr) {
            var processArr = [];
            processArr = arr.filter(function (value) {
                return value == val;
            });
            return processArr.length;
        };
        AnimalMain.prototype.onPreviewClick = function (e) {
            mg.alertManager.showAlert(animal.AnimalPreview, true, true);
        };
        AnimalMain.prototype.onSelectedClick = function (e) {
            mg.alertManager.showAlert(animal.AnimalSelected, true, true, this._currData);
        };
        AnimalMain.prototype.onBuyClick = function (e) {
            mg.alertManager.showAlert(dialog.baowu.BaoWuPurchaseLimitation, false, true, 6);
        };
        AnimalMain.prototype.createPhantomEffect = function () {
            if (!this._effect) {
                this._effect = utils.ObjectPool.from(s.AnimationSprite);
                this._effect.y = this.imgModel.y;
                this._effect.x = this.imgModel.x;
                this._effect.frameRate = 6;
                this.addChild(this._effect);
            }
        };
        AnimalMain.prototype.removePhantomEffect = function () {
            if (this._effect) {
                this._effect.stop();
                this._effect.filters = null;
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        return AnimalMain;
    }(ui.AnimalMainSkin));
    animal_1.AnimalMain = AnimalMain;
    __reflect(AnimalMain.prototype, "animal.AnimalMain");
})(animal || (animal = {}));
