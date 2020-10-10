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
    var PetAllPetAlter = (function (_super) {
        __extends(PetAllPetAlter, _super);
        function PetAllPetAlter() {
            var _this = _super.call(this) || this;
            _this._btnArr = [_this.btn0, _this.btn1, _this.btn2, _this.btn3, _this.btn4];
            _this._labArr = [_this.lab0, _this.lab1, _this.lab2, _this.lab3, _this.lab4];
            return _this;
        }
        PetAllPetAlter.prototype.show = function () {
            this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
            this._index = 0;
            this.showBtnView();
            this.showList();
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        };
        PetAllPetAlter.prototype.showBtnView = function () {
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
        PetAllPetAlter.prototype.onBtnClick = function (e) {
            this._index = this._btnArr.indexOf(e.currentTarget);
            this.showBtnView();
            this.showList();
        };
        PetAllPetAlter.prototype.showList = function () {
            var upVoArr = GameModels.pet.formatUpVOList;
            var downVoArr = GameModels.pet.formatDownVOList;
            downVoArr.sort(function (a, b) {
                if (a.lv != b.lv) {
                    return b.lv - a.lv;
                }
                else {
                    return b.star - a.star;
                }
            });
            this._petArr = upVoArr.concat(downVoArr);
            var anyArr = [];
            for (var j = 0; j < this._petArr.length; j++) {
                var obj = { id: null, selected: false, istask: false, type: 3 };
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
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(anyArr);
            }
            else {
                this._listData.source = anyArr;
            }
        };
        PetAllPetAlter.prototype.onListClick = function (e) {
            var item = this.list.selectedItem;
            var petVo = item.id;
            GameModels.upStar.updateselectedPet(petVo.uid);
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        PetAllPetAlter.prototype.clickHandler = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        PetAllPetAlter.prototype.hide = function () {
            this.clearList(this.list);
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PetAllPetAlter;
    }(ui.PetAllPetAlterSkin));
    pet.PetAllPetAlter = PetAllPetAlter;
    __reflect(PetAllPetAlter.prototype, "pet.PetAllPetAlter", ["IAlert", "egret.DisplayObject"]);
})(pet || (pet = {}));
