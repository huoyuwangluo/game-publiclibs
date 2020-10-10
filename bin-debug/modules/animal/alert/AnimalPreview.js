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
(function (animal_1) {
    var AnimalPreview = (function (_super) {
        __extends(AnimalPreview, _super);
        function AnimalPreview() {
            var _this = _super.call(this) || this;
            _this._btnArr = [_this.btn0, _this.btn1, _this.btn2, _this.btn3, _this.btn4, _this.btn5];
            _this._labArr = [_this.lab0, _this.lab1, _this.lab2, _this.lab3, _this.lab4, _this.lab5];
            return _this;
        }
        AnimalPreview.prototype.show = function () {
            this._index = 0;
            this.showBtnView();
            this.showList();
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        };
        AnimalPreview.prototype.showBtnView = function () {
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
        AnimalPreview.prototype.onBtnClick = function (e) {
            this._index = this._btnArr.indexOf(e.currentTarget);
            this.showBtnView();
            this.showList();
        };
        AnimalPreview.prototype.showList = function () {
            var animalArr = [];
            var animalList = GameModels.animal.animalArr;
            for (var _i = 0, animalList_1 = animalList; _i < animalList_1.length; _i++) {
                var animal = animalList_1[_i];
                if (this._index == 0) {
                    animalArr.push(animal);
                }
                else {
                    if (animal.quality == this._index + 2) {
                        animalArr.push(animal);
                    }
                }
            }
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(animalArr);
            }
            else {
                this._listData.source = animalArr;
            }
            this.list.dataProvider = this._listData;
        };
        AnimalPreview.prototype.clickHandler = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        AnimalPreview.prototype.hide = function () {
            this._index = 0;
            this.clearList(this.list);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return AnimalPreview;
    }(ui.AnimalPreviewSkin));
    animal_1.AnimalPreview = AnimalPreview;
    __reflect(AnimalPreview.prototype, "animal.AnimalPreview", ["IAlert", "egret.DisplayObject"]);
})(animal || (animal = {}));
