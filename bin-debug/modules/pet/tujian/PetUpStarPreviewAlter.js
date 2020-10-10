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
    var PetUpStarPreviewAlter = (function (_super) {
        __extends(PetUpStarPreviewAlter, _super);
        function PetUpStarPreviewAlter() {
            return _super.call(this) || this;
        }
        PetUpStarPreviewAlter.prototype.show = function (petTmp) {
            if (!petTmp)
                return;
            var tempArr = Templates.getTemplatesByProperty(templates.Map.GENERALBREAK, "quality", petTmp.quality);
            this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
            var obj = [];
            var length = 0;
            if (petTmp.quality < 7) {
                length = tempArr.length - 1;
            }
            else {
                if (GameModels.user.player.level >= 300) {
                    length = tempArr.length - 1;
                }
                else {
                    length = tempArr.length - 4;
                }
            }
            for (var i = 0; i < length; i++) {
                obj.push({ pet: petTmp, tmps: tempArr[i] });
            }
            this._listData.source = obj;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        };
        PetUpStarPreviewAlter.prototype.hide = function () {
            this.clearList(this.list);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        PetUpStarPreviewAlter.prototype.btnCloseClick = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        return PetUpStarPreviewAlter;
    }(ui.PetUpStarPreviewAlterSkin));
    pet.PetUpStarPreviewAlter = PetUpStarPreviewAlter;
    __reflect(PetUpStarPreviewAlter.prototype, "pet.PetUpStarPreviewAlter", ["IAlert", "egret.DisplayObject"]);
})(pet || (pet = {}));
