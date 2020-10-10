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
var dialog;
(function (dialog) {
    var list;
    (function (list) {
        var BingFaSkillPreview = (function (_super) {
            __extends(BingFaSkillPreview, _super);
            function BingFaSkillPreview() {
                return _super.call(this) || this;
            }
            BingFaSkillPreview.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._btnArr = [this.btn0, this.btn1, this.btn2, this.btn3];
                this._labArr = [this.lab0, this.lab1, this.lab2, this.lab3];
            };
            BingFaSkillPreview.prototype.show = function () {
                this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
                this._index = 0;
                this.showBtnView();
                this.showList();
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
            };
            BingFaSkillPreview.prototype.showBtnView = function () {
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (i == this._index) {
                        this._btnArr[i].currentState = "down";
                        this._labArr[i].textColor = 0xc4c4c5;
                    }
                    else {
                        this._btnArr[i].currentState = "up";
                        this._labArr[i].textColor = 0x545458;
                    }
                }
            };
            BingFaSkillPreview.prototype.showList = function () {
                var anyArr = GameModels.common.getBingFaSkillBuyType(this._index + 1);
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(anyArr);
                }
                else {
                    this._listData.source = anyArr;
                }
            };
            BingFaSkillPreview.prototype.onBtnClick = function (e) {
                this._index = this._btnArr.indexOf(e.currentTarget);
                this.showBtnView();
                this.showList();
            };
            BingFaSkillPreview.prototype.hide = function () {
                this.clearList(this.list);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            BingFaSkillPreview.prototype.onListClick = function (e) {
                var item = this.list.selectedItem;
                mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, item);
            };
            BingFaSkillPreview.prototype.btnCloseClick = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            return BingFaSkillPreview;
        }(ui.BingFaSkillPreviewSkin));
        list.BingFaSkillPreview = BingFaSkillPreview;
        __reflect(BingFaSkillPreview.prototype, "dialog.list.BingFaSkillPreview", ["IAlert", "egret.DisplayObject"]);
    })(list = dialog.list || (dialog.list = {}));
})(dialog || (dialog = {}));
