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
var pet;
(function (pet) {
    var PetGongMingList = (function (_super) {
        __extends(PetGongMingList, _super);
        function PetGongMingList() {
            var _this = _super.call(this) || this;
            _this._btnArr = [_this.btn0, _this.btn1, _this.btn2, _this.btn3, _this.btn4];
            _this._labArr = [_this.lab0, _this.lab1, _this.lab2, _this.lab3, _this.lab4];
            return _this;
        }
        PetGongMingList.prototype.show = function () {
            this._petIdList = [];
            this._petRefId = [];
            this._selectedCount = 0;
            this._count = 0;
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].visible = true;
                this._labArr[i].visible = true;
                this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
            this._index = 0;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
            this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.showBtnView();
            this.updataList();
        };
        PetGongMingList.prototype.hide = function () {
            this._count = 0;
            this.clearList(this.list);
            this._listData = null;
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        PetGongMingList.prototype.onBtnClick = function (e) {
            this._index = this._btnArr.indexOf(e.currentTarget);
            this._petIdList = [];
            this._selectedCount = 0;
            this.showBtnView();
            this.updataList();
        };
        PetGongMingList.prototype.showBtnView = function () {
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
        PetGongMingList.prototype.updataList = function () {
            var petList = [];
            var petVoArr = GameModels.pet.formatDownVOList;
            for (var _i = 0, petVoArr_1 = petVoArr; _i < petVoArr_1.length; _i++) {
                var petVo = petVoArr_1[_i];
                if (petVo.isHashFourSkill) {
                    if (petVo.isGongMing == 1) {
                        this._petRefId.push(petVo.refId);
                        this._petIdList.push(petVo.uid);
                    }
                    if (this._index == 0 && petVo.isGongMing != 1 && this._petRefId.indexOf(petVo.refId) == -1) {
                        petList.push(petVo);
                    }
                    else {
                        if (petVo.template.country == this._index && petVo.isGongMing != 1 && this._petRefId.indexOf(petVo.refId) == -1) {
                            petList.push(petVo);
                        }
                    }
                }
            }
            petList.sort(function (a, b) {
                if (a.star != b.star) {
                    return b.star - a.star;
                }
                else {
                    return b.fightValue - a.fightValue;
                }
            });
            var news = [];
            for (var _a = 0, petList_1 = petList; _a < petList_1.length; _a++) {
                var item = petList_1[_a];
                news.push({ selected: false, petVo: item });
            }
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(news);
            }
            else {
                this._listData.source = news;
            }
            this.list.dataProvider = this._listData;
            this.labNo.visible = news.length <= 0;
            this.showCanSelectCount();
        };
        PetGongMingList.prototype.listHandler = function (e) {
            var petVo = this.list.selectedItem.petVo;
            var selected = this.list.selectedItem.selected;
            if (!selected) {
                if (this._selectedCount <= 0) {
                    if (GameModels.user.player.vip < 10) {
                        if (GameModels.platform.isPay) {
                            mg.alertManager.tip(Language.J_KXZWJSLYMTS);
                        }
                    }
                    else {
                        mg.alertManager.tip(Language.J_KXZWJSLYM);
                    }
                    return;
                }
                else {
                    if (this._petRefId.indexOf(petVo.refId) != -1) {
                        mg.alertManager.tip(Language.J_TMWJJYYW);
                        return;
                    }
                    this.list.selectedItem.selected = true;
                    this._petIdList.push(petVo.uid);
                    this._petRefId.push(petVo.refId);
                    this._count++;
                }
            }
            else {
                if (petVo.isGongMing == 1) {
                    mg.alertManager.tip(Language.J_CJYGM);
                }
                else {
                    this.list.selectedItem.selected = false;
                    this._petIdList.splice(this._petIdList.indexOf(petVo.uid), 1);
                    this._petRefId.splice(this._petRefId.indexOf(petVo.refId), 1);
                    this._count--;
                }
            }
            this._listData.itemUpdated(this.list.selectedItem);
            this.showCanSelectCount();
        };
        PetGongMingList.prototype.showCanSelectCount = function () {
            var max = GameModels.pet.canSelectedCount;
            this._selectedCount = GameModels.pet.gongmingMaxPos - this._petIdList.length;
            if (this._selectedCount < 0)
                this._selectedCount = 0;
            this.labCount.text = Language.getExpression(Language.E_KXZ, this._selectedCount, max);
        };
        PetGongMingList.prototype.btnCloseClick = function (e) {
            if (e.currentTarget == this.btnOk) {
                if (this._count <= 0) {
                    mg.alertManager.tip(Language.C_QXZYJYDWJ);
                    return;
                }
                GameModels.pet.setGongMing(this._petIdList, utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_CYCG);
                }));
            }
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        return PetGongMingList;
    }(ui.PetGongMingListSkin));
    pet.PetGongMingList = PetGongMingList;
    __reflect(PetGongMingList.prototype, "pet.PetGongMingList", ["IAlert", "egret.DisplayObject"]);
})(pet || (pet = {}));
