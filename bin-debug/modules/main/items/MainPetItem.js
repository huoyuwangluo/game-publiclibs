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
var item;
(function (item) {
    var MainPetItem = (function (_super) {
        __extends(MainPetItem, _super);
        function MainPetItem() {
            return _super.call(this) || this;
        }
        MainPetItem.prototype.initialize = function () {
            this.hp.minimum = 0;
            this.hp.maximum = 100;
        };
        MainPetItem.prototype.initializeData = function (data, isUnLock, petPos) {
            this.reset();
            this._data = data;
            this.imgBack.source = "uiMain_json.img_main_petbg";
            this.imgJob.visible = false;
            //this.imgJob.source = "common_json.img_pet_samll_"+(petPos+1)+"_png";
            // if(petPos==3)this.imgBack.source = "uiMain_json.img_main_petbg1"
            if (this._data) {
                if (!this.hp.parent) {
                    this.addChild(this.hp);
                }
                if (!this.imgQuality.parent) {
                    this.addChild(this.imgQuality);
                }
                if (!this.icon.parent) {
                    this.addChild(this.icon);
                }
                this.icon.source = ResPath.getPetIconSmall(data.headIcon);
                this.imgQuality.source = ResPath.getLingXingQualityByStar(data.star, data.isHashFourSkill);
                data.onPropertyChange(TypeProperty.Hp, this, this.hpChange);
                data.onPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
                this.hpChange();
                if (this.btnAdd.parent) {
                    this.btnAdd.parent.removeChild(this.btnAdd);
                }
                if (this.btnLock.parent) {
                    this.btnLock.parent.removeChild(this.btnLock);
                }
                this.imgBack.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            }
            else {
                if (this.hp.parent) {
                    this.hp.parent.removeChild(this.hp);
                }
                if (this.imgQuality.parent) {
                    this.imgQuality.parent.removeChild(this.imgQuality);
                }
                if (this.icon.parent) {
                    this.icon.parent.removeChild(this.icon);
                }
                if (!this.btnAdd.parent) {
                    this.addChild(this.btnAdd);
                }
                this.btnAdd.visible = isUnLock;
                this.btnLock.visible = !isUnLock;
                this.imgBack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            }
            //this.addChild(this.imgJob);
        };
        MainPetItem.prototype.reset = function () {
            if (this._data) {
                this._data.offPropertyChange(TypeProperty.Hp, this, this.hpChange);
                this._data.offPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
            }
        };
        MainPetItem.prototype.onTapAdd = function (caller, method) {
            this.offTapAdd();
            this._tapAddHandler = utils.Handler.create(caller, method, null, false);
        };
        MainPetItem.prototype.offTapAdd = function () {
            if (this._tapAddHandler) {
                this._tapAddHandler.recover();
                this._tapAddHandler = null;
            }
        };
        MainPetItem.prototype.touchHandler = function (e) {
            if (this._tapAddHandler) {
                this._tapAddHandler.run();
            }
        };
        MainPetItem.prototype.hpChange = function () {
            if (this._data.stateDead || this._data.battleHp == 0) {
                this.icon.alpha = 0.5;
                this.hp.value = 0;
            }
            else {
                this.hp.value = (this._data.battleHp / this._data.battleHpMax) * 100;
                this.icon.alpha = 1;
            }
        };
        return MainPetItem;
    }(ui.MainPetItemSkin));
    item.MainPetItem = MainPetItem;
    __reflect(MainPetItem.prototype, "item.MainPetItem");
})(item || (item = {}));
