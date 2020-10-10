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
    var MainPetItemFight = (function (_super) {
        __extends(MainPetItemFight, _super);
        function MainPetItemFight() {
            return _super.call(this) || this;
        }
        MainPetItemFight.prototype.initialize = function () {
            this.hp.minimum = 0;
            this.hp.maximum = 100;
            this.touchChildren = false;
        };
        MainPetItemFight.prototype.initializeData = function (data, petPos) {
            this.reset();
            this._data = data;
            this.imgBack.source = "uiMain_json.img_main_petbg";
            if (petPos == 3)
                this.imgBack.source = "uiMain_json.img_main_petbg1";
            if (this._data) {
                this.icon.source = ResPath.getPetIconSmall(data.headIcon);
                this.imgQuality.source = ResPath.getLingXingQuality(data.quality);
                data.onPropertyChange(TypeProperty.Hp, this, this.hpChange);
                data.onPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
                this.hpChange();
            }
        };
        MainPetItemFight.prototype.reset = function () {
            if (this._data) {
                this._data.offPropertyChange(TypeProperty.Hp, this, this.hpChange);
                this._data.offPropertyChange(TypeProperty.MaxHp, this, this.hpChange);
            }
        };
        MainPetItemFight.prototype.hpChange = function () {
            this.hp.value = (this._data.hp / this._data.hpMax) * 100;
            if (this._data.hp == 0) {
                this.icon.alpha = 0.5;
            }
            else {
                this.icon.alpha = 1;
            }
            this.imgStateDead.visible = (this._data.hp == 0);
        };
        return MainPetItemFight;
    }(ui.MainPetItemFightSkin));
    item.MainPetItemFight = MainPetItemFight;
    __reflect(MainPetItemFight.prototype, "item.MainPetItemFight");
})(item || (item = {}));
