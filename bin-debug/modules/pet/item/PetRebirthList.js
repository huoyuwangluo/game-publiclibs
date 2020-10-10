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
    var PetRebirthList = (function (_super) {
        __extends(PetRebirthList, _super);
        function PetRebirthList() {
            return _super.call(this) || this;
        }
        PetRebirthList.prototype.show = function (type) {
            this._type = type;
            this.labhide.text = this._type == 1 ? Language.J_LVTX3 : Language.J_STARTX4;
            this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
            this.showView();
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        };
        PetRebirthList.prototype.showView = function () {
            this._petVo = null;
            var upVoArr = GameModels.pet.formatUpVOList;
            var downVoArr = GameModels.pet.formatDownVOList;
            downVoArr.sort(function (a, b) {
                return b.star - a.star;
            });
            this._petArr = upVoArr.concat(downVoArr);
            var petArr = [];
            var anyArr = [];
            for (var i = 0; i < this._petArr.length; i++) {
                if (this._type == 1) {
                    if (this._petArr[i].lv > 1 && this._petArr[i].refId != "13000" && this._petArr[i].isGongMing == 0) {
                        petArr.push(this._petArr[i]);
                    }
                }
                else {
                    if (this._petArr[i].star > 5 && this._petArr[i].refId != "13000" && this._petArr[i].isGongMing == 0) {
                        petArr.push(this._petArr[i]);
                    }
                }
            }
            this.labNo.visible = petArr.length <= 0;
            if (this._type == 1) {
                petArr.sort(function (a, b) {
                    return b.lv - a.lv;
                });
            }
            else {
                petArr.sort(function (a, b) {
                    return b.star - a.star;
                });
            }
            for (var j = 0; j < petArr.length; j++) {
                var obj = { id: null, selected: false, istask: false, type: 2 };
                obj.id = petArr[j];
                if (this._type == 1) {
                    if (GameModels.upStar.rebirthLvPetVo && GameModels.upStar.rebirthLvPetVo.uid == petArr[j].uid) {
                        this._petVo = petArr[j];
                        obj.selected = true;
                    }
                }
                else {
                    if (GameModels.upStar.rebirthPetVo && GameModels.upStar.rebirthPetVo.uid == petArr[j].uid) {
                        this._petVo = petArr[j];
                        obj.selected = true;
                    }
                }
                if (petArr[j].isFormat) {
                    obj.istask = true;
                }
                anyArr.push(obj);
            }
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(anyArr);
            }
            else {
                this._listData.source = anyArr;
            }
        };
        PetRebirthList.prototype.onListClick = function (e) {
            var item = this.list.selectedItem;
            var petVo = item.id;
            if (petVo.isFormat) {
                mg.alertManager.tip(Language.J_SZZWJBKCS);
                return;
            }
            if (petVo.isLock == 1) {
                mg.alertManager.tip(Language.J_SUWJBKCS);
                return;
            }
            if (item.selected) {
                for (var i = 0; i < this._listData.source.length; i++) {
                    this._listData.source[i].selected = false;
                }
            }
            else {
                for (var i = 0; i < this._listData.source.length; i++) {
                    this._listData.source[i].selected = false;
                }
                this._petVo = item.id;
                item.selected = true;
            }
            this._listData.replaceAll(this._listData.source);
        };
        PetRebirthList.prototype.clickHandler = function (e) {
            if (e.currentTarget == this.btnSure) {
                if (this._type == 1) {
                    GameModels.upStar.rebirthLvPetVo = this._petVo;
                }
                else {
                    GameModels.upStar.rebirthPetVo = this._petVo;
                }
                GameModels.upStar.updateselectedRebirth();
            }
            // GameModels.upStar.rebirthPetVo = null;
            // GameModels.upStar.rebirthLvPetVo = null;
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        PetRebirthList.prototype.hide = function () {
            this.clearList(this.list);
            this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PetRebirthList;
    }(ui.PetRebirthListSkin));
    pet.PetRebirthList = PetRebirthList;
    __reflect(PetRebirthList.prototype, "pet.PetRebirthList", ["IAlert", "egret.DisplayObject"]);
})(pet || (pet = {}));
