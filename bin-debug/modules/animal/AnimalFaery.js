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
var animal;
(function (animal) {
    var AnimalFaery = (function (_super) {
        __extends(AnimalFaery, _super);
        function AnimalFaery() {
            return _super.call(this) || this;
        }
        AnimalFaery.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        AnimalFaery.prototype.enter = function () {
            this.showView();
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.imgGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        };
        AnimalFaery.prototype.showView = function () {
            //灵狐仙子类型17
            this._faery = GameModels.animal.getAnimalBuyType(17);
            var animalList = GameModels.animal.faeryAnimal;
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(animalList);
            }
            else {
                this._listData.source = animalList;
            }
            this.list.dataProvider = this._listData;
        };
        AnimalFaery.prototype.onListClick = function (e) {
            var _this = this;
            var item = this.list.selectedItem;
            if (e.target instanceof components.SnapButton) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (this._faery.isAct) {
                    var hashAct = this._faery.step >= item.step;
                    var hashGetReward = GameModels.animal.hashGetRewardBuyId(item.id);
                    if (hashAct) {
                        if (hashGetReward) {
                            mg.alertManager.tip(Language.J_JLYLQ);
                        }
                        else {
                            GameModels.animal.requestGetAnimalReward(item.id, utils.Handler.create(this, function () {
                                _this._listData.itemUpdated(_this.list.selectedItem);
                            }));
                        }
                    }
                    else {
                        mg.alertManager.tip(Language.getExpression(Language.E_LHXZ1BHJH, item.step - 1));
                    }
                }
                else {
                    if (item.step == 1) {
                        mg.alertManager.tip(Language.J_JHLHXZHKLQGJL);
                    }
                    else {
                        mg.alertManager.tip(Language.getExpression(Language.E_LHXZ1BHJH, item.step - 1));
                    }
                }
            }
        };
        AnimalFaery.prototype.onBtnClick = function (e) {
            mg.alertManager.showAlert(dialog.baowu.BaoWuPurchaseLimitation, false, true, 6);
        };
        AnimalFaery.prototype.exit = function () {
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.imgGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        };
        return AnimalFaery;
    }(ui.AnimalFaerySkin));
    animal.AnimalFaery = AnimalFaery;
    __reflect(AnimalFaery.prototype, "animal.AnimalFaery");
})(animal || (animal = {}));
