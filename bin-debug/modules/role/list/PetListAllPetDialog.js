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
        var PetListAllPetDialog = (function (_super) {
            __extends(PetListAllPetDialog, _super);
            function PetListAllPetDialog() {
                return _super.call(this) || this;
            }
            PetListAllPetDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._btnArr = [this.btn0, this.btn1, this.btn2, this.btn3, this.btn4];
                this._labArr = [this.lab0, this.lab1, this.lab2, this.lab3, this.lab4];
            };
            PetListAllPetDialog.prototype.enter = function () {
                this._petArr = [];
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].visible = true;
                    this._labArr[i].visible = true;
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this._index = 0;
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
                this.btnAddCount.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GetHome, this);
                this.btnTuiJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GetHome, this);
                GameModels.pet.addEventListener(mo.ModelPet.PET_SETLOCK, this.upTateList, this);
                this.showBtnView();
                this.showList();
            };
            PetListAllPetDialog.prototype.exit = function () {
                this._petArr = [];
                this.clearList(this.list);
                this._listData = null;
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
                this.btnAddCount.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GetHome, this);
                this.btnTuiJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GetHome, this);
                GameModels.pet.removeEventListener(mo.ModelPet.PET_SETLOCK, this.upTateList, this);
            };
            PetListAllPetDialog.prototype.onBtnClick = function (e) {
                this._index = this._btnArr.indexOf(e.currentTarget);
                this.showBtnView();
                this.showList();
            };
            PetListAllPetDialog.prototype.upTateList = function () {
                this._listData.itemUpdated(this.list.selectedItem);
            };
            PetListAllPetDialog.prototype.showBtnView = function () {
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
            PetListAllPetDialog.prototype.showList = function () {
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(this.getPetList(this._index));
                }
                else {
                    this._listData.source = this.getPetList(this._index);
                }
                this.list.dataProvider = this._listData;
                this.labNo.visible = this.getPetList(this._index).length <= 0;
                this.showFuDi();
            };
            PetListAllPetDialog.prototype.showFuDi = function () {
                this.labHome.text = GameModels.pet.allPetCount + "/" + GameModels.pet.maxPetCount;
            };
            PetListAllPetDialog.prototype.getPetList = function (index) {
                var upVoArr = GameModels.pet.formatUpVOList;
                var downVoArr = GameModels.pet.formatDownVOList;
                downVoArr.sort(function (a, b) {
                    if (a.star != b.star) {
                        return b.star - a.star;
                    }
                    else {
                        return b.fightValue - a.fightValue;
                    }
                });
                this._petArr = upVoArr.concat(downVoArr);
                var anyArr = [];
                for (var j = 0; j < this._petArr.length; j++) {
                    var obj = { id: null, selected: false, istask: false, type: 4 };
                    if (this._index == 0) {
                        obj.id = this._petArr[j];
                        if (this._petArr[j].isFormat) {
                            obj.istask = true;
                        }
                        anyArr.push(obj);
                    }
                    else {
                        if (this._petArr[j].template.country == this._index) {
                            obj.id = this._petArr[j];
                            if (this._petArr[j].isFormat) {
                                obj.istask = true;
                            }
                            anyArr.push(obj);
                        }
                    }
                }
                return anyArr;
            };
            PetListAllPetDialog.prototype.listHandler = function (e) {
                var item = this.list.selectedItem;
                var petVo = item.id;
                if (!petVo)
                    return;
                if (petVo.isFormat) {
                    mg.uiManager.show(dialog.role.RoleMainDialog, { tabIndex: 0, param: petVo.position });
                }
                else {
                    mg.TipManager.instance.showTip(tips.GeneralInfoTip, petVo);
                }
            };
            PetListAllPetDialog.prototype.GetHome = function (evt) {
                if (evt.currentTarget == this.btnTuiJian) {
                    mg.alertManager.showAlert(dialog.role.AncientPetTuiJianTeam, true, true);
                    return;
                }
                mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFXH1YBZJFD, 500), TypeBtnLabel.OK, null, utils.Handler.create(this, this.buyHmoe));
            };
            PetListAllPetDialog.prototype.buyHmoe = function () {
                var _this = this;
                GameModels.pet.petBuyRoom(utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.J_GMCG);
                    _this.showFuDi();
                }));
            };
            return PetListAllPetDialog;
        }(ui.PetListAllPetDialogSkin));
        list.PetListAllPetDialog = PetListAllPetDialog;
        __reflect(PetListAllPetDialog.prototype, "dialog.list.PetListAllPetDialog", ["IModuleView", "egret.DisplayObject"]);
    })(list = dialog.list || (dialog.list = {}));
})(dialog || (dialog = {}));
