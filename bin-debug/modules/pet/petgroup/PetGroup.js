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
    var PetGroup = (function (_super) {
        __extends(PetGroup, _super);
        function PetGroup() {
            return _super.call(this) || this;
        }
        PetGroup.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._btnArr = [this.btn0, this.btn1, this.btn2, this.btn3, this.btn4];
            this._labArr = [this.lab0, this.lab1, this.lab2, this.lab3, this.lab4];
            this._redArr = [this.imgRed0, this.imgRed1, this.imgRed2, this.imgRed3, this.imgRed4];
        };
        PetGroup.prototype.enter = function () {
            this.btnBuy.visible = this.imgPreBg.visible = GameModels.platform.isPay;
            this._petGroupArr = [];
            GameModels.petGroup.isOpenPetGroupView = true;
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].visible = true;
                this._labArr[i].visible = true;
                this._redArr[i].visible = false;
                this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.btnPetGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMyGroupClick, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuyClick, this);
            this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
            GameModels.bag.onItemChange(ConfigData.YINTIAO, this, this.showList);
            GameModels.bag.onItemChange(ConfigData.JINTIAO, this, this.showList);
            this._index = 0;
            this._count = 0;
            this._angle = 0;
            this.tweenPreviewImgHandler();
            GameModels.handBook.requestHandbookInfo(); //先请求一下图鉴信息
            GameModels.petGroup.requestPetGroupInfo(utils.Handler.create(this, function () {
                this.showBtnView();
                this.showList();
            }));
        };
        PetGroup.prototype.onBtnClick = function (e) {
            this.scroller.stopAnimation();
            this.scroller.viewport.scrollV = 0;
            this._index = this._btnArr.indexOf(e.currentTarget);
            this.showBtnView();
            this.showList();
        };
        PetGroup.prototype.updataImgRedPoint = function () {
            for (var i = 0; i < this._redArr.length; i++) {
                var hashRedPoint = GameModels.petGroup.getPetGroupRedPointBuyCountry(i);
                this._redArr[i].visible = hashRedPoint;
            }
            var count = GameModels.petGroup.getMyRegisterZYPetGroupCount();
            var maxCount = 5;
            var animal = GameModels.animal.getAnimalBuyType(17);
            if (animal.isAct && animal.step >= 6) {
                maxCount = 10;
            }
            this.labType.text = this._index == 0 ? Language.getExpression(Language.J_WJGX1, count, maxCount) : Language.J_WJGX2;
        };
        PetGroup.prototype.showBtnView = function () {
            var count = GameModels.petGroup.getMyRegisterZYPetGroupCount();
            var maxCount = 5;
            var animal = GameModels.animal.getAnimalBuyType(17);
            if (animal.isAct && animal.step >= 6) {
                maxCount = 10;
            }
            this.labType.text = this._index == 0 ? Language.getExpression(Language.J_WJGX1, count, maxCount) : Language.J_WJGX2;
            for (var i = 0; i < this._btnArr.length; i++) {
                if (i == this._index) {
                    this._btnArr[i].currentState = "down";
                    this._labArr[i].textColor = 0xCCC6BA;
                    this._redArr[i].visible = GameModels.petGroup.getPetGroupRedPointBuyCountry(this._index);
                }
                else {
                    this._btnArr[i].currentState = "up";
                    this._labArr[i].textColor = 0x969696;
                    this._redArr[i].visible = false;
                }
            }
        };
        PetGroup.prototype.showList = function () {
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(this.getPetList());
            }
            else {
                this._listData.source = this.getPetList();
            }
            this.list.dataProvider = this._listData;
            this.updataImgRedPoint();
        };
        PetGroup.prototype.getPetList = function () {
            this._petGroupArr = GameModels.petGroup.getPetGroupBuyCountry(this._index);
            var anyArr = [];
            for (var j = 0; j < this._petGroupArr.length; j++) {
                var obj = { petGroup: null, type: 1 };
                if (this._petGroupArr[j].country == this._index) {
                    obj.petGroup = this._petGroupArr[j];
                    anyArr.push(obj);
                }
            }
            return anyArr;
        };
        PetGroup.prototype.onListClick = function (e) {
            var _this = this;
            var vo = this.list.selectedItem.petGroup;
            if (e.target instanceof components.SnapButton) {
                if (vo.status == 0) {
                    mg.alertManager.tip(Language.C_XYJHTJ);
                }
                else if (vo.status == 1) {
                    GameModels.petGroup.requestRegisterPetGroup(vo.id, utils.Handler.create(this, function () {
                        _this._listData.replaceAll(_this._listData.source);
                        _this.updataImgRedPoint();
                    }));
                }
                else {
                    if (vo.country == 0) {
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFQXSC, 1000), TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                            var _this = this;
                            GameModels.petGroup.requestUnRegisterPetGroup(vo.id, utils.Handler.create(this, function () {
                                _this._listData.replaceAll(_this._listData.source);
                                _this.updataImgRedPoint();
                            }));
                        }));
                    }
                    else {
                        mg.alertManager.tip(Language.C_YDGZWJJXSC);
                    }
                }
            }
        };
        PetGroup.prototype.onMyGroupClick = function (e) {
            mg.alertManager.showAlert(pet.PetMyGroupList, true, true);
        };
        PetGroup.prototype.onBtnBuyClick = function (e) {
            mg.alertManager.showAlert(dialog.baowu.BaoWuPurchaseLimitation, false, true, 3);
        };
        PetGroup.prototype.onHelpClick = function (e) {
            mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5801).des);
        };
        PetGroup.prototype.tweenPreviewImgHandler = function () {
            this._count++;
            this._angle = this._count * 360;
            egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
        };
        PetGroup.prototype.exit = function () {
            this._petGroupArr = [];
            this.clearList(this.list);
            this._count = 0;
            this._angle = 0;
            egret.Tween.removeTweens(this.imgPreBg);
            this._listData = null;
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
            GameModels.bag.offItemChange(ConfigData.YINTIAO, this, this.showList);
            GameModels.bag.offItemChange(ConfigData.JINTIAO, this, this.showList);
            this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.btnPetGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMyGroupClick, this);
            this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuyClick, this);
        };
        return PetGroup;
    }(ui.PetGroupSkin));
    pet.PetGroup = PetGroup;
    __reflect(PetGroup.prototype, "pet.PetGroup", ["IModuleView", "egret.DisplayObject"]);
})(pet || (pet = {}));
