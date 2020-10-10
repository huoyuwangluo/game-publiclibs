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
    var list;
    (function (list_1) {
        var PetListFenJieDialog = (function (_super) {
            __extends(PetListFenJieDialog, _super);
            function PetListFenJieDialog() {
                return _super.call(this) || this;
            }
            PetListFenJieDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._btnArr = [this.btn0, this.btn1, this.btn2, this.btn3, this.btn4];
                this._labArr = [this.lab0, this.lab1, this.lab2, this.lab3, this.lab4];
                this._rewardArr = [this.labGet1, this.labGet2, this.labGet3, this.labGet4];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            PetListFenJieDialog.prototype.enter = function (data) {
                this.listHuanShou.dataProvider = this._items = new eui.ArrayCollection([]);
                this._index = -1;
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].visible = true;
                    this._labArr[i].visible = true;
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.btnClear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.decomposeHandler, this);
                this.typeRed.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeChange, this);
                this.typePurple.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeChange, this);
                this.typeOrange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeChange, this);
                this.listHuanShou.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTouch, this);
                GameModels.pet.addEventListener(mo.ModelPet.PET_SETLOCK, this.petSetLockUpdata, this);
                this.btnAddCount.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GetHome, this);
                this.showBtnView();
                this.updatePetList();
            };
            PetListFenJieDialog.prototype.exit = function () {
                this._index = -1;
                this.clearList(this.listHuanShou);
                this._items = null;
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.btnClear.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.decomposeHandler, this);
                this.typeRed.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeChange, this);
                this.typePurple.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeChange, this);
                this.typeOrange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeChange, this);
                this.listHuanShou.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTouch, this);
                GameModels.pet.removeEventListener(mo.ModelPet.PET_SETLOCK, this.petSetLockUpdata, this);
                this.btnAddCount.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GetHome, this);
            };
            PetListFenJieDialog.prototype.GetHome = function (evt) {
                mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFXH1YBZJFD, 500), TypeBtnLabel.OK, null, utils.Handler.create(this, this.buyHmoe));
            };
            PetListFenJieDialog.prototype.buyHmoe = function () {
                GameModels.pet.petBuyRoom(utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.J_GMCG);
                    this.showFuDi();
                }));
            };
            PetListFenJieDialog.prototype.onBtnClick = function (e) {
                this._index = this._btnArr.indexOf(e.currentTarget);
                this.showBtnView();
                this.updatePetList();
            };
            PetListFenJieDialog.prototype.showBtnView = function () {
                var index = this._index < 0 ? 0 : this._index;
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (i == index) {
                        this._btnArr[i].currentState = "down";
                        this._labArr[i].textColor = 0xCCC6BA;
                    }
                    else {
                        this._btnArr[i].currentState = "up";
                        this._labArr[i].textColor = 0x969696;
                    }
                }
            };
            PetListFenJieDialog.prototype.decomposeHandler = function (e) {
                var _this = this;
                var picked = [];
                var isSelected = false;
                var isRed = false;
                var isOrangeAndPurple = false;
                for (var _i = 0, _a = this._items.source; _i < _a.length; _i++) {
                    var data = _a[_i];
                    if (data.selected) {
                        picked.push(data.tmp.uid);
                        isSelected = true;
                        for (var i = 1; i < 5; i++) {
                            var pet = GameModels.pet.getFormatUpVOByPos(i);
                            if (pet && data.tmp.star > pet.star)
                                isOrangeAndPurple = true;
                            break;
                        }
                        if (data.tmp.star >= TypeQuality.ORANGE) {
                            isRed = true;
                        }
                    }
                }
                if (!isSelected) {
                    mg.alertManager.tip(Language.J_QXGXXYHSDWJ);
                    return;
                }
                if (isRed) {
                    mg.alertManager.showAlert(PromptAlert, false, true, Language.J_XYHJSQGWJ2, TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                        GameModels.pet.petResovle(picked, utils.Handler.create(this, this.petResovleHandler));
                    }));
                    return;
                }
                if (isOrangeAndPurple) {
                    mg.alertManager.showCheckAlert(Language.J_XYHJSQGWJ1, TypeBtnLabel.OK, TypeCheck.XIAYE_GENERAL_ORANGE, null, utils.Handler.create(this, function () {
                        GameModels.pet.petResovle(picked, utils.Handler.create(_this, _this.petResovleHandler));
                    }));
                    return;
                }
                GameModels.pet.petResovle(picked, utils.Handler.create(this, this.petResovleHandler));
            };
            PetListFenJieDialog.prototype.updatePetList = function () {
                this.scrollerCollege.viewport.scrollV = 0;
                var petListArr = [];
                var items = GameModels.pet.formatDownVOList;
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var pet = items_1[_i];
                    if (this._index <= 0 && pet.isGongMing == 0 && pet.star < 6) {
                        petListArr.push(pet);
                    }
                    else {
                        if (pet.template.country == this._index && pet.isGongMing == 0 && pet.star < 6) {
                            petListArr.push(pet);
                        }
                    }
                }
                this.typeRed.selected = this.typePurple.selected = this.typeOrange.selected = false;
                petListArr.sort(function (a, b) {
                    return b.fightValue - a.fightValue;
                });
                var news = [];
                for (var _a = 0, petListArr_1 = petListArr; _a < petListArr_1.length; _a++) {
                    var item = petListArr_1[_a];
                    news.push({ selected: false, tmp: item });
                }
                this._items.source = news;
                this.labNo.visible = news.length <= 0;
                this.showFuDi();
                this.showGetReward();
            };
            PetListFenJieDialog.prototype.onTypeChange = function (e) {
                switch (e.target) {
                    case this.typeRed:
                        this.selectedQualityChange(TypeQuality.ORANGE, this.typeRed.selected);
                        break;
                    case this.typePurple:
                        this.selectedQualityChange(TypeQuality.BLUE, this.typePurple.selected);
                        break;
                    case this.typeOrange:
                        this.selectedQualityChange(TypeQuality.PURPLE, this.typeOrange.selected);
                        break;
                    default:
                        break;
                }
            };
            PetListFenJieDialog.prototype.selectedQualityChange = function (star, selected) {
                var list = this._items.source;
                for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                    var data = list_2[_i];
                    if (data.tmp.star == star) {
                        data.selected = selected;
                    }
                }
                this._items.replaceAll(list);
                this.showGetReward();
            };
            PetListFenJieDialog.prototype.petSetLockUpdata = function () {
                this._items.itemUpdated(this.listHuanShou.selectedItem);
            };
            PetListFenJieDialog.prototype.itemTouch = function (e) {
                var petVo = this.listHuanShou.selectedItem.tmp;
                if (e.target instanceof components.Icon) {
                    mg.TipManager.instance.showTip(tips.GeneralInfoTip, petVo);
                    return;
                }
                else if (e.target instanceof components.IconButton) {
                    if (this.listHuanShou.selectedItem.selected) {
                        this.listHuanShou.selectedItem.selected = false;
                        this._items.itemUpdated(this.listHuanShou.selectedItem);
                    }
                    var status = petVo.isLock == 0 ? 1 : 0;
                    GameModels.pet.petSetLockDate(petVo.uid, status);
                    return;
                }
                else {
                    if (petVo.isLock == 1) {
                        mg.alertManager.tip(Language.J_WJJSHCNQS);
                        return;
                    }
                }
                this.listHuanShou.selectedItem.selected = !this.listHuanShou.selectedItem.selected;
                this._items.itemUpdated(this.listHuanShou.selectedItem);
                this.showGetReward();
            };
            PetListFenJieDialog.prototype.showGetReward = function () {
                var list = this._items.source;
                var rewardStr = [];
                var str = "";
                for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                    var data = list_3[_i];
                    if (data.selected) {
                        if (!str) {
                            str = data.tmp.generalBraekTmp.recover;
                        }
                        else {
                            str = str + ";" + data.tmp.generalBraekTmp.recover;
                        }
                        if (data.tmp.lv > 1)
                            str = str + ";" + GameModels.pet.getCaiLiaoCountByClearPet(data.tmp.lv);
                    }
                }
                if (!str) {
                    for (var i = 0; i < this._rewardArr.length; i++) {
                        this._rewardArr[i].text = "";
                    }
                    return;
                }
                rewardStr = utils.htmlUtil.computeAttribute(str).split(";");
                for (var i = 0; i < this._rewardArr.length; i++) {
                    if (rewardStr[i]) {
                        var itemTmp = Templates.getTemplateById(templates.Map.ITEM, rewardStr[i].split("_")[0]);
                        var elements1 = [];
                        elements1.push({ text: Language.C_HD + ":", style: { textColor: 0xFDDFA1 } });
                        elements1.push({ text: itemTmp.name, style: { textColor: TypeQuality.getQualityColor(itemTmp.quality) } });
                        elements1.push({ text: "X" + rewardStr[i].split("_")[1], style: { textColor: 0XFDDFA1 } });
                        this._rewardArr[i].textFlow = elements1;
                    }
                    else {
                        this._rewardArr[i].text = "";
                    }
                }
            };
            PetListFenJieDialog.prototype.showFuDi = function () {
                this.labHome.text = Language.C_FD + GameModels.pet.allPetCount + "/" + GameModels.pet.maxPetCount;
            };
            PetListFenJieDialog.prototype.petResovleHandler = function (data) {
                mg.alertManager.tip(Language.J_QSCG);
                var item = data.RewardStr.split(";");
                var itemArr = [];
                for (var i = 0; i < item.length; i++) {
                    if (item[i]) {
                        itemArr.push(item[i].split("_")[0]);
                    }
                }
                mg.effectManager.flyIconsToBag(itemArr, this.localToGlobal(this.width * 0.5, this.height * 0.5));
                this.updatePetList();
            };
            PetListFenJieDialog.prototype.btnCloseClick = function (e) {
                mg.uiManager.remove(this);
            };
            return PetListFenJieDialog;
        }(ui.PetListFenJieDialogSkin));
        list_1.PetListFenJieDialog = PetListFenJieDialog;
        __reflect(PetListFenJieDialog.prototype, "dialog.list.PetListFenJieDialog", ["IModuleView", "egret.DisplayObject"]);
    })(list = dialog.list || (dialog.list = {}));
})(dialog || (dialog = {}));
