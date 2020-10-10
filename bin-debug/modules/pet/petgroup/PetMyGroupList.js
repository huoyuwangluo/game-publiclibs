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
    var PetMyGroupList = (function (_super) {
        __extends(PetMyGroupList, _super);
        function PetMyGroupList() {
            return _super.call(this) || this;
        }
        PetMyGroupList.prototype.show = function () {
            this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
            this.showList();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        };
        PetMyGroupList.prototype.showList = function () {
            var groupList = GameModels.petGroup.getMyRegisterPetGroup();
            this.labNo.visible = groupList.length <= 0;
            var anyArr = [];
            for (var j = 0; j < groupList.length; j++) {
                var obj = { petGroup: null, type: 2 };
                obj.petGroup = groupList[j];
                anyArr.push(obj);
            }
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(anyArr);
            }
            else {
                this._listData.source = anyArr;
            }
        };
        PetMyGroupList.prototype.clickHandler = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        PetMyGroupList.prototype.hide = function () {
            this.clearList(this.list);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PetMyGroupList;
    }(ui.PetMyGroupListSkin));
    pet.PetMyGroupList = PetMyGroupList;
    __reflect(PetMyGroupList.prototype, "pet.PetMyGroupList", ["IAlert", "egret.DisplayObject"]);
})(pet || (pet = {}));
