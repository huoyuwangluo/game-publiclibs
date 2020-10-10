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
        var zhuzhan;
        (function (zhuzhan) {
            var RoleZhuZhanSelected = (function (_super) {
                __extends(RoleZhuZhanSelected, _super);
                function RoleZhuZhanSelected() {
                    var _this = _super.call(this) || this;
                    _this._petList = [];
                    _this._btnArr = [_this.btn0, _this.btn1, _this.btn2, _this.btn3, _this.btn4];
                    _this._labArr = [_this.lab0, _this.lab1, _this.lab2, _this.lab3, _this.lab4];
                    return _this;
                }
                RoleZhuZhanSelected.prototype.show = function (petUid, selectedIndex) {
                    this._petTemp = null;
                    this._petUid = petUid ? petUid : "";
                    this._selectedIndex = selectedIndex;
                    this._petList = GameModels.pet.zhuZhanPetList.concat();
                    this.listAllPet.dataProvider = this._listPetData = new eui.ArrayCollection([]);
                    this._index = 0;
                    this.showBtnView();
                    this.showPetList();
                    for (var i = 0; i < this._btnArr.length; i++) {
                        this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                    }
                    this.listAllPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
                };
                RoleZhuZhanSelected.prototype.showBtnView = function () {
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
                RoleZhuZhanSelected.prototype.onBtnClick = function (e) {
                    this._index = this._btnArr.indexOf(e.currentTarget);
                    this.showBtnView();
                    this.showPetList();
                };
                RoleZhuZhanSelected.prototype.showPetList = function () {
                    var petArr = [];
                    var handVoArr = GameModels.handBook.getActiviteGeneral();
                    for (var _i = 0, handVoArr_1 = handVoArr; _i < handVoArr_1.length; _i++) {
                        var pet = handVoArr_1[_i];
                        if (this._petList.indexOf(pet.generalTemps.id) != -1)
                            continue;
                        if (this._index == 0 && pet.generalTemps.quality > 4) {
                            petArr.push(pet.generalTemps);
                        }
                        else {
                            if (pet.generalTemps.country == this._index && pet.generalTemps.quality > 4) {
                                petArr.push(pet.generalTemps);
                            }
                        }
                    }
                    petArr.sort(function (a, b) {
                        return b.quality - a.quality;
                    });
                    var anyArr = [];
                    for (var j = 0; j < petArr.length; j++) {
                        var obj = { id: null, selected: false, effect: true };
                        if (j == 0) {
                            obj.selected = true;
                        }
                        else {
                            obj.selected = false;
                        }
                        obj.id = petArr[j];
                        anyArr.push(obj);
                    }
                    if (!this._listPetData) {
                        this._listPetData = new eui.ArrayCollection(anyArr);
                    }
                    else {
                        this._listPetData.source = anyArr;
                    }
                    this.btnOk.visible = anyArr.length > 0;
                    this.listAllPet.selectedIndex = 0;
                    this._petTemp = this.listAllPet.selectedItem ? this.listAllPet.selectedItem.id : null;
                    if (this._petTemp) {
                        this.showView();
                    }
                    else {
                        this.LabDes.text = "";
                        mg.alertManager.tip(Language.C_CGJZWYJHWJ);
                        this._index = 0;
                        this.showBtnView();
                        this.showPetList();
                    }
                };
                RoleZhuZhanSelected.prototype.showView = function () {
                    var tempArr = GameModels.pet.getZhuZhanTempListBuyPetId(this._petTemp.id.toString());
                    if (!this._listTempData) {
                        this._listTempData = new eui.ArrayCollection(tempArr);
                    }
                    else {
                        this._listTempData.source = tempArr;
                    }
                    this.list.dataProvider = this._listTempData;
                    var elements = [];
                    elements.push({ text: Language.J_YXW, style: { textColor: 0xD3D3D3 } });
                    elements.push({ text: this._petTemp.name, style: { textColor: TypeQuality.getStarColor(this._petTemp.star) } });
                    elements.push({ text: Language.J_DJBZH, style: { textColor: 0xD3D3D3 } });
                    this.LabDes.textFlow = elements;
                };
                RoleZhuZhanSelected.prototype.initListView = function () {
                    var list = this._listPetData.source;
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var data = list_1[_i];
                        data.selected = false;
                    }
                    this._listPetData.replaceAll(list);
                };
                RoleZhuZhanSelected.prototype.onListClick = function (e) {
                    var item = this.listAllPet.selectedItem;
                    if (item.selected)
                        return;
                    else {
                        this.initListView();
                        item.selected = true;
                        this._listPetData.itemUpdated(item);
                    }
                    this._petTemp = this.listAllPet.selectedItem.id;
                    this.showView();
                };
                RoleZhuZhanSelected.prototype.onChangeClick = function (e) {
                    var _this = this;
                    if (!this._petUid)
                        return;
                    if (this._selectedIndex < 0)
                        return;
                    this._petList[this._selectedIndex] = this._petTemp.id;
                    GameModels.pet.petSetZhuZhanBuyPetId(this._petUid, this._petList, utils.Handler.create(this, function () {
                        mg.alertManager.tip(Language.J_SZCG);
                        _this.dispatchEventWith(egret.Event.CLOSE);
                    }));
                };
                RoleZhuZhanSelected.prototype.clickHandler = function (e) {
                    this.dispatchEventWith(egret.Event.CLOSE);
                };
                RoleZhuZhanSelected.prototype.hide = function () {
                    this._petTemp = null;
                    this._index = 0;
                    this.clearList(this.list);
                    this.clearList(this.listAllPet);
                    this.listAllPet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                    this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                    this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                };
                return RoleZhuZhanSelected;
            }(ui.RoleZhuZhanSelectedSkin));
            zhuzhan.RoleZhuZhanSelected = RoleZhuZhanSelected;
            __reflect(RoleZhuZhanSelected.prototype, "dialog.role.zhuzhan.RoleZhuZhanSelected", ["IAlert", "egret.DisplayObject"]);
        })(zhuzhan = role.zhuzhan || (role.zhuzhan = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));
