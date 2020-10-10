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
    (function (list) {
        var PetListDialog = (function (_super) {
            __extends(PetListDialog, _super);
            function PetListDialog() {
                return _super.call(this) || this;
            }
            PetListDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._btnArr = [this.btn0, this.btn1, this.btn2, this.btn3, this.btn4];
                this._labArr = [this.lab0, this.lab1, this.lab2, this.lab3, this.lab4];
            };
            PetListDialog.prototype.enter = function (rolePos) {
                if (rolePos === void 0) { rolePos = -1; }
                this._cropsType = 0;
                if (GameModels.pet.formatUpVOList.length >= 5) {
                    GameModels.pet.setIsFirstPetChange(true);
                }
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].visible = true;
                    this._labArr[i].visible = true;
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this._index = 0;
                this.listHuanShou.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnAddCount.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GetHome, this);
                this._rolePos = rolePos;
                this.showBtnView();
                this.showList();
            };
            PetListDialog.prototype.exit = function () {
                this.clearList(this.listHuanShou);
                this._listData = null;
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.listHuanShou.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnAddCount.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GetHome, this);
                this._rolePos = -1;
            };
            PetListDialog.prototype.onBtnClick = function (e) {
                this._index = this._btnArr.indexOf(e.currentTarget);
                this.showBtnView();
                this.showList();
                this.updataChange();
            };
            PetListDialog.prototype.showBtnView = function () {
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
            PetListDialog.prototype.showList = function () {
                if (this._rolePos == 1 || this._rolePos == 2) {
                    this._cropsType = 1;
                }
                else {
                    this._cropsType = 2;
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(this.getPetList(this._index));
                }
                else {
                    this._listData.source = this.getPetList(this._index);
                }
                if (this._rolePos < 0) {
                    this.labTitle.visible = false;
                }
                else {
                    this.labTitle.visible = true;
                }
                this.labTitle.text = this._cropsType == 1 ? Language.J_JZTS : Language.J_YCTS;
                this.listHuanShou.dataProvider = this._listData;
                this.labNo.visible = this.getPetList(this._index).length <= 0;
                this.showFuDi();
            };
            PetListDialog.prototype.showFuDi = function () {
                this.labHome.text = GameModels.pet.allPetCount + "/" + GameModels.pet.maxPetCount;
            };
            PetListDialog.prototype.getPetList = function (index) {
                var petList = [];
                var petIdArr = [];
                for (var i = 0; i < 5; i++) {
                    var pet = GameModels.pet.getFormatUpVOByPos(i);
                    if (pet) {
                        if (i != this._rolePos) {
                            petIdArr.push(pet.template.id);
                        }
                        else {
                            if (index == 0) {
                                petList.push(pet);
                            }
                            else {
                                if (pet.template.country == index) {
                                    petList.push(pet);
                                }
                            }
                        }
                    }
                }
                var petVoArr = GameModels.pet.formatDownVOList;
                for (var _i = 0, petVoArr_1 = petVoArr; _i < petVoArr_1.length; _i++) {
                    var petVo = petVoArr_1[_i];
                    if (petIdArr.indexOf(petVo.template.id) == -1 && petVo.fightType == this._cropsType && petVo.isGongMing != 1) {
                        if (index == 0) {
                            petList.push(petVo);
                        }
                        else {
                            if (petVo.template.country == index) {
                                petList.push(petVo);
                            }
                        }
                    }
                }
                petList.sort(function (a, b) {
                    if (a.isFormat && b.isFormat) {
                        return b.fightValue - a.fightValue;
                    }
                    else {
                        if (a.isFormat) {
                            return -1;
                        }
                        else if (b.isFormat) {
                            return 1;
                        }
                        else {
                            if (a.star != b.star) {
                                return b.star - a.star;
                            }
                            else {
                                return b.fightValue - a.fightValue;
                            }
                        }
                    }
                });
                return petList;
            };
            PetListDialog.prototype.listHandler = function (e) {
                if (e.target instanceof components.SnapButton) {
                    var vo = this.listHuanShou.selectedItem;
                    if (GameModels.guide.guideTypeClinte == mo.ModelGuide.guideType10000) {
                        GameModels.guide.stopClinteGuide();
                        GameModels.guide.setClinteGuideType(mo.ModelGuide.guideType20000, this._rolePos);
                    }
                    GameModels.pet.petHost(vo.uid, this._rolePos, utils.Handler.create(this, function () {
                        mg.alertManager.tip(Language.getExpression(Language.E_1YCGSZ, vo.name));
                        mg.uiManager.remove(this);
                    }));
                }
            };
            PetListDialog.prototype.btnCloseClick = function (e) {
                mg.uiManager.remove(this);
            };
            PetListDialog.prototype.GetHome = function (evt) {
                mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFXH1YBZJFD, 500), TypeBtnLabel.OK, null, utils.Handler.create(this, this.buyHmoe));
            };
            PetListDialog.prototype.buyHmoe = function () {
                GameModels.pet.petBuyRoom(utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.J_GMCG);
                    this.showFuDi();
                }));
            };
            PetListDialog.prototype.updataChange = function () {
                this.dispatchEventWith(PetListDialog.CHANG_TAL);
            };
            Object.defineProperty(PetListDialog.prototype, "selectedIndex", {
                get: function () {
                    return this._index;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PetListDialog.prototype, "selectedBtn", {
                get: function () {
                    return this.btn0;
                },
                enumerable: true,
                configurable: true
            });
            PetListDialog.prototype.getCanUseListItem = function (index) {
                if (index === void 0) { index = 0; }
                this.listHuanShou.validateNow();
                var array = this.getPetList(this._index);
                if (array[index]) {
                    return this.listHuanShou.getChildAt(index).btnUp;
                }
                return null;
            };
            PetListDialog.CHANG_TAL = "CHANG_TAL";
            return PetListDialog;
        }(ui.PetListDialogSkin));
        list.PetListDialog = PetListDialog;
        __reflect(PetListDialog.prototype, "dialog.list.PetListDialog");
    })(list = dialog.list || (dialog.list = {}));
})(dialog || (dialog = {}));
