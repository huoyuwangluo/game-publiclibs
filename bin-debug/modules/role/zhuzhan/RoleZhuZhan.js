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
            var RoleZhuZhan = (function (_super) {
                __extends(RoleZhuZhan, _super);
                function RoleZhuZhan() {
                    return _super.call(this) || this;
                }
                RoleZhuZhan.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._btnArr = [this.btn0, this.btn1];
                    this._btnLabArr = [this.lab0, this.lab1];
                    this._headArr = [this.role0, this.role1, this.role2, this.role3, this.role4, this.role5, this.role6, this.role7, this.role8];
                    this._relevanceArr = [
                        [1], [2], [5],
                        [0], [1, 5, 3, 7], [8],
                        [3], [6], [7],
                    ];
                    Mediator.getMediator(this).onAdd(this, this.enter);
                    Mediator.getMediator(this).onRemove(this, this.exit);
                };
                RoleZhuZhan.prototype.enter = function (pet) {
                    var _this = this;
                    this._petVo = pet ? pet : null;
                    this._petId = pet ? pet.uid : "";
                    this._selectedPetId = pet ? pet.refId : "";
                    this._selectedIndex = 4;
                    GameModels.pet.petGetZhuZhanBuyPetId(this._petId, utils.Handler.create(this, function () {
                        _this.showView();
                        _this.registerMoveItem();
                    }));
                    this.hideReplaceBtn();
                    this._index = 0;
                    this.showBtnView();
                    for (var i = 0; i < this._headArr.length; i++) {
                        if (i == 4) {
                            this.imgSelecd.visible = true;
                            this.imgSelecd.x = this._headArr[i].x;
                            this.imgSelecd.y = this._headArr[i].y - 9;
                        }
                        this._headArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                    }
                    for (var i = 0; i < this._btnArr.length; i++) {
                        this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeBtnClick, this);
                    }
                    GameModels.pet.addEventListener(mo.ModelPet.UPDATA_ZHUZHANCHANGE, this.showView, this);
                    this.btnPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewBtnClick, this);
                    this.btnReplace.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplaceBtnClick, this);
                    this.btnDress.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDressBtnClick, this);
                    this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpBtnClick, this);
                    this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                };
                RoleZhuZhan.prototype.exit = function () {
                    this._selectedIndex = 0;
                    this._selectedPetId = "";
                    this._index = 0;
                    this._petId = "";
                    this.moveItem.reset();
                    this._listData = null;
                    this._petVo = null;
                    this.clearList(this.list);
                    for (var i = 0; i < this._headArr.length; i++) {
                        this._headArr[i].reset();
                    }
                    for (var i = 0; i < this._headArr.length; i++) {
                        this._headArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                    }
                    for (var i = 0; i < this._btnArr.length; i++) {
                        this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeBtnClick, this);
                    }
                    GameModels.pet.removeEventListener(mo.ModelPet.UPDATA_ZHUZHANCHANGE, this.showView, this);
                    this.btnPreview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewBtnClick, this);
                    this.btnReplace.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplaceBtnClick, this);
                    this.btnDress.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDressBtnClick, this);
                    this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpBtnClick, this);
                    this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                };
                RoleZhuZhan.prototype.showBtnView = function () {
                    for (var i = 0; i < this._btnArr.length; i++) {
                        if (i == this._index) {
                            this._btnArr[i].currentState = "down";
                            this._btnLabArr[i].textColor = 0xCCC6BA;
                        }
                        else {
                            this._btnArr[i].currentState = "up";
                            this._btnLabArr[i].textColor = 0x969696;
                        }
                    }
                };
                RoleZhuZhan.prototype.showLightView = function () {
                    for (var i = 0; i < this._petList.length; i++) {
                        var relevanceArr = this._relevanceArr[i];
                        this.checkRelevancePet(i, relevanceArr);
                    }
                };
                RoleZhuZhan.prototype.checkRelevancePet = function (index, arr) {
                    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                        var num = arr_1[_i];
                        this["imgLight_" + index + "_" + num].visible = this.checkCanShowLight(index, num);
                    }
                };
                RoleZhuZhan.prototype.checkCanShowLight = function (nowIndex, nextIndex) {
                    var nowPet = this._petList[nowIndex];
                    var nextPet = this._petList[nextIndex];
                    if (!nowPet || !nextPet)
                        return false;
                    var canBright = GameModels.pet.getZhuZhanTempOfTwoPet(nowPet.toString(), nextPet.toString());
                    if (canBright)
                        return true;
                    return false;
                };
                RoleZhuZhan.prototype.showView = function () {
                    var fightValue = GameModels.pet.zhuZhanFight;
                    this.blabFight.text = fightValue.toString();
                    this._petList = GameModels.pet.zhuZhanPetList;
                    this._tempList = GameModels.pet.zhuZhanTempList;
                    this._selectedPetId = this._petList[this._selectedIndex].toString();
                    this.showPet();
                    this.showList();
                    this.showLightView();
                };
                RoleZhuZhan.prototype.showPet = function () {
                    for (var i = 0; i < this._petList.length; i++) {
                        var petTmp = Templates.getTemplateById(templates.Map.GENERAL, this._petList[i]);
                        if (petTmp) {
                            this._headArr[i].setGeneralInfo(petTmp);
                        }
                        else {
                            if (i < 6) {
                                this._headArr[i].setNullInfo(true);
                            }
                            else {
                                if (this._petVo.star > i) {
                                    this._headArr[i].setNullInfo(true);
                                }
                                else {
                                    this._headArr[i].setNullInfo(false, i + 1);
                                }
                            }
                        }
                    }
                };
                RoleZhuZhan.prototype.showList = function () {
                    var tempArr = [];
                    if (this._index == 0) {
                        tempArr = GameModels.pet.getAllTempBuyPetList(this._petVo.refId);
                    }
                    else {
                        tempArr = GameModels.pet.getZhuZhanTempListBuyPetId(this._selectedPetId);
                    }
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection(tempArr);
                    }
                    else {
                        this._listData.source = tempArr;
                    }
                    this.list.dataProvider = this._listData;
                };
                RoleZhuZhan.prototype.resetPetPosData = function () {
                    var _this = this;
                    this._petList = [];
                    for (var i = 0; i < this._headArr.length; i++) {
                        this._petList.push(this._headArr[i].petId);
                    }
                    GameModels.pet.petSetZhuZhanBuyPetId(this._petId, this._petList, utils.Handler.create(this, function () {
                        _this.showView();
                    }));
                };
                RoleZhuZhan.prototype.registerMoveItem = function () {
                    var _this = this;
                    var drags = this._headArr;
                    var puts = this._headArr;
                    this.moveItem.register(this, drags, function (index) {
                        _this._touchIndex = index;
                        logger.log("dragHandler" + index);
                        _this._headArr[_this._touchIndex].visible = false;
                        _this.hideReplaceBtn();
                        var touchVo = _this._headArr[_this._touchIndex].petVo;
                        if (touchVo) {
                            if (_this._touchIndex == 4) {
                                _this._headArr[_this._touchIndex].visible = true;
                                _this.imgSelecd.visible = true;
                                _this.imgSelecd.x = _this._headArr[_this._touchIndex].x;
                                _this.imgSelecd.y = _this._headArr[_this._touchIndex].y - 9;
                            }
                        }
                        else {
                            _this._headArr[_this._touchIndex].visible = true;
                            if (_this._petVo.star > _this._touchIndex) {
                                _this._headArr[_this._touchIndex].setNullInfo(true);
                            }
                            else {
                                _this._headArr[_this._touchIndex].setNullInfo(false, _this._touchIndex + 1);
                            }
                        }
                        return true;
                    }, puts, function (index) {
                        _this._endIndex = index;
                        logger.log("putHandler" + index);
                        _this._headArr[_this._touchIndex].visible = true;
                        if (_this._endIndex == 9999)
                            return false;
                        if (_this._endIndex == -1) {
                            _this.showReplaceBtn(_this._touchIndex);
                            return false;
                        }
                        if (_this._endIndex == 4 || _this._touchIndex == 4) {
                            mg.alertManager.tip(Language.J_ZXDWJBKGHWZ);
                            _this.resetPetPosData();
                            if (_this._endIndex == 4) {
                                _this._selectedIndex = _this._touchIndex;
                                _this.showReplaceBtn(_this._touchIndex);
                            }
                            return false;
                        }
                        var touchVo = _this._headArr[_this._touchIndex].petVo;
                        var endVo = _this._headArr[_this._endIndex].petVo;
                        if (endVo) {
                            _this._headArr[_this._touchIndex].setGeneralInfo(endVo);
                            _this._headArr[_this._endIndex].setGeneralInfo(touchVo);
                            if (_this._endIndex != 4) {
                                _this._selectedIndex = _this._endIndex;
                            }
                            _this.showReplaceBtn(_this._endIndex);
                        }
                        else {
                            if (_this._endIndex < _this._petVo.star) {
                                _this._headArr[_this._touchIndex].setNullInfo(true);
                                _this._headArr[_this._endIndex].setGeneralInfo(touchVo);
                                _this._selectedIndex = _this._endIndex;
                                _this._index = 1;
                                _this.showBtnView();
                                _this.showReplaceBtn(_this._endIndex);
                            }
                            else {
                                _this._headArr[_this._endIndex].setNullInfo(false, _this._endIndex + 1);
                                mg.alertManager.tip(Language.J_QXSXJSWZ);
                                return false;
                            }
                        }
                        _this.resetPetPosData();
                        return true;
                    }, function (index) {
                        if (!_this._headArr[index].petVo) {
                            _this.hideReplaceBtn();
                            if (_this._petVo.star > index) {
                                mg.alertManager.showAlert(dialog.role.zhuzhan.RoleZhuZhanSelected, true, true, _this._petId, index);
                            }
                            else {
                                mg.alertManager.tip(Language.getExpression(Language.E_1XJS, index + 1));
                            }
                        }
                        else {
                            _this._index = GameModels.pet.getPetOfZhuZhanTempList(_this._headArr[index].petId.toString()) ? 1 : 0;
                            _this.showReplaceBtn(index);
                            _this._selectedIndex = index;
                            _this._selectedPetId = _this._headArr[index].petId.toString();
                            _this.showBtnView();
                            _this.showList();
                        }
                        return true;
                    });
                    this.moveItem.getSourceMethod = function (selectItem, index) {
                        return selectItem.petVo;
                    };
                };
                RoleZhuZhan.prototype.showReplaceBtn = function (index) {
                    this.imgSelecd.visible = true;
                    this.btnReplace.visible = index != 4 ? true : false;
                    this.btnDress.visible = index != 4 ? true : false;
                    this.btnReplace.x = this._headArr[index].x + 45;
                    this.btnReplace.y = this._headArr[index].y + 50;
                    this.btnDress.x = this._headArr[index].x - 40;
                    this.btnDress.y = this._headArr[index].y + 50;
                    this.imgSelecd.x = this._headArr[index].x;
                    this.imgSelecd.y = this._headArr[index].y - 9;
                };
                RoleZhuZhan.prototype.hideReplaceBtn = function () {
                    this.imgSelecd.visible = false;
                    this.btnReplace.visible = false;
                    this.btnDress.visible = false;
                };
                RoleZhuZhan.prototype.onBtnClick = function (e) {
                    for (var i = 0; i < this._headArr.length; i++) {
                        if (e.currentTarget == this._headArr[i]) {
                            this.imgSelecd.visible = true;
                            if (i == 4) {
                                this.hideReplaceBtn();
                                this._index = 0;
                                this.imgSelecd.visible = true;
                                this.imgSelecd.x = this._headArr[i].x;
                                this.imgSelecd.y = this._headArr[i].y - 9;
                                this._selectedPetId = this._headArr[i].petId.toString();
                            }
                            else {
                                if (!this._headArr[i].petVo) {
                                    this.hideReplaceBtn();
                                    if (this._petVo.star > i) {
                                        mg.alertManager.showAlert(dialog.role.zhuzhan.RoleZhuZhanSelected, true, true, this._petId, i);
                                    }
                                    else {
                                        mg.alertManager.tip(Language.getExpression(Language.E_1XJS, i + 1));
                                    }
                                }
                            }
                            break;
                        }
                    }
                };
                RoleZhuZhan.prototype.onTypeBtnClick = function (e) {
                    this._index = this._btnArr.indexOf(e.currentTarget);
                    this.showBtnView();
                    this.showList();
                };
                RoleZhuZhan.prototype.onPreviewBtnClick = function (e) {
                    mg.uiManager.show(dialog.role.zhuzhan.RoleZhuZhanPreview);
                };
                RoleZhuZhan.prototype.onReplaceBtnClick = function (e) {
                    if (!this._petId)
                        return;
                    mg.alertManager.showAlert(dialog.role.zhuzhan.RoleZhuZhanSelected, true, true, this._petId, this._selectedIndex);
                };
                RoleZhuZhan.prototype.onDressBtnClick = function (e) {
                    var _this = this;
                    this._petList = [];
                    this._headArr[this._selectedIndex].setNullInfo(true);
                    for (var i = 0; i < this._headArr.length; i++) {
                        this._petList.push(this._headArr[i].petId);
                    }
                    GameModels.pet.petSetZhuZhanBuyPetId(this._petId, this._petList, utils.Handler.create(this, function () {
                        _this._index = 0;
                        _this.hideReplaceBtn();
                        _this.showReplaceBtn(4);
                        _this.showView();
                    }));
                };
                RoleZhuZhan.prototype.onHelpBtnClick = function (e) {
                    mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 6301).des);
                };
                RoleZhuZhan.prototype.onListClick = function (e) {
                    var _this = this;
                    if (e.target instanceof components.RewardItemBox) {
                        var pet = Templates.getTemplateById(templates.Map.GENERAL, e.target.dataSource);
                        var hashAct = pet.id == 13000 ? true : GameModels.handBook.getActiviteGeneralBuyId(pet.id);
                        if (!hashAct) {
                            mg.alertManager.tip(Language.J_GWJSWHD);
                            return;
                        }
                        var hashPut = GameModels.pet.getPetOfZhuZhan(pet.id);
                        if (hashPut) {
                            if (pet.id == parseInt(this._petVo.refId)) {
                                mg.alertManager.tip(Language.J_ZXDWJBKCZ);
                                return;
                            }
                            var putIndex = this._petList.indexOf(pet.id);
                            this._petList[putIndex] = 0;
                        }
                        else {
                            var hashNullIndex = -1;
                            for (var i = 0; i < this._petList.length; i++) {
                                if (!this._petList[i]) {
                                    if (i < 6) {
                                        hashNullIndex = i;
                                        break;
                                    }
                                    else {
                                        if (this._petVo.star > i) {
                                            hashNullIndex = i;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (hashNullIndex < 0) {
                                mg.alertManager.tip(Language.J_MYKW);
                                return;
                            }
                            else {
                                this._petList[hashNullIndex] = pet.id;
                            }
                        }
                        GameModels.pet.petSetZhuZhanBuyPetId(this._petId, this._petList, utils.Handler.create(this, function () {
                            _this.showView();
                        }));
                    }
                };
                return RoleZhuZhan;
            }(ui.RoleZhuZhanSkin));
            zhuzhan.RoleZhuZhan = RoleZhuZhan;
            __reflect(RoleZhuZhan.prototype, "dialog.role.zhuzhan.RoleZhuZhan");
        })(zhuzhan = role.zhuzhan || (role.zhuzhan = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));
