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
    var role;
    (function (role) {
        var zhuzhan;
        (function (zhuzhan) {
            var RoleZhuZhanPreview = (function (_super) {
                __extends(RoleZhuZhanPreview, _super);
                function RoleZhuZhanPreview() {
                    var _this = _super.call(this) || this;
                    _this._btnArr = [_this.btn0, _this.btn1, _this.btn2, _this.btn3, _this.btn4];
                    _this._labArr = [_this.lab0, _this.lab1, _this.lab2, _this.lab3, _this.lab4];
                    Mediator.getMediator(_this).onAdd(_this, _this.enter);
                    Mediator.getMediator(_this).onRemove(_this, _this.exit);
                    return _this;
                }
                RoleZhuZhanPreview.prototype.enter = function () {
                    this._petTemp = null;
                    this.listhead.dataProvider = this._listHeadData = new eui.ArrayCollection([]);
                    this._index = 0;
                    this.showBtnView();
                    this.showHeadList();
                    for (var i = 0; i < this._btnArr.length; i++) {
                        this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                    }
                    this.listhead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                    this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
                    this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
                };
                RoleZhuZhanPreview.prototype.showBtnView = function () {
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
                RoleZhuZhanPreview.prototype.onBtnClick = function (e) {
                    this._index = this._btnArr.indexOf(e.currentTarget);
                    this.showBtnView();
                    this.showHeadList();
                };
                RoleZhuZhanPreview.prototype.showHeadList = function () {
                    var petArr = [];
                    var handVoArr = GameModels.handBook.getActiviteGeneral();
                    for (var _i = 0, handVoArr_1 = handVoArr; _i < handVoArr_1.length; _i++) {
                        var pet = handVoArr_1[_i];
                        if (this._index == 0 && pet.generalTemps.quality > 4) {
                            petArr.push(pet.generalTemps);
                        }
                        else {
                            if (pet.generalTemps.country == this._index && pet.generalTemps.quality > 4) {
                                petArr.push(pet.generalTemps);
                            }
                        }
                    }
                    petArr.sort(function (a, b) {
                        return b.quality - a.quality;
                    });
                    if (!this._listHeadData) {
                        this._listHeadData = new eui.ArrayCollection(petArr);
                    }
                    else {
                        this._listHeadData.source = petArr;
                    }
                    this.listhead.selectedIndex = 0;
                    this._petTemp = this.listhead.selectedItem;
                    if (this._petTemp) {
                        this.showView();
                    }
                    else {
                        mg.alertManager.tip(Language.C_CGJZWYJHWJ);
                        this._index = 0;
                        this.showBtnView();
                        this.showHeadList();
                    }
                };
                RoleZhuZhanPreview.prototype.showView = function () {
                    this.body.setPetBody(this._petTemp.model);
                    var tempArr = GameModels.pet.getZhuZhanTempListBuyPetId(this._petTemp.id.toString());
                    if (!this._listTempData) {
                        this._listTempData = new eui.ArrayCollection(tempArr);
                    }
                    else {
                        this._listTempData.source = tempArr;
                    }
                    this.list.dataProvider = this._listTempData;
                };
                RoleZhuZhanPreview.prototype.viewToFollow = function () {
                    if (this.scrollerhead == null) {
                        return;
                    }
                    /**视图跟随并居中锁定
                     * itemWidth 单个呈现项的宽度
                     *  */
                    var listSH = this.listhead.scrollH; //可视区域位置
                    var sWidth = this.scrollerhead.width; //滚动轴宽度
                    var listCWidth = this.listhead.contentWidth; //数据总长度
                    this.listhead.validateNow();
                    var itemWidth = this.listhead.getChildAt(0).width;
                    var width = (itemWidth + 6) * (this.listhead.selectedIndex + 1);
                    if (width >= sWidth) {
                        width = width - sWidth;
                    }
                    else {
                        width = 0;
                    }
                    this.listhead.scrollH = width; //显示视图的数量*列间距
                    egret.Tween.get(this.listhead).to({ scrollH: width }, 200);
                };
                RoleZhuZhanPreview.prototype.onListClick = function (e) {
                    this._petTemp = this.listhead.selectedItem;
                    this.showView();
                };
                RoleZhuZhanPreview.prototype.onChangeClick = function (e) {
                    if (e.currentTarget == this.btnLeft) {
                        this.listhead.selectedIndex--;
                        if (this.listhead.selectedIndex < 0)
                            this.listhead.selectedIndex = 0;
                    }
                    else {
                        this.listhead.selectedIndex++;
                        if (this.listhead.selectedIndex >= (this._listHeadData.length - 1))
                            this.listhead.selectedIndex = this._listHeadData.length - 1;
                    }
                    this._petTemp = this.listhead.selectedItem;
                    this.viewToFollow();
                    this.showView();
                };
                RoleZhuZhanPreview.prototype.exit = function () {
                    this._petTemp = null;
                    this._index = 0;
                    this.clearList(this.listhead);
                    this.clearList(this.list);
                    this.listhead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                    this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
                    this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeClick, this);
                };
                return RoleZhuZhanPreview;
            }(ui.RoleZhuZhanPreviewSkin));
            zhuzhan.RoleZhuZhanPreview = RoleZhuZhanPreview;
            __reflect(RoleZhuZhanPreview.prototype, "dialog.role.zhuzhan.RoleZhuZhanPreview");
        })(zhuzhan = role.zhuzhan || (role.zhuzhan = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));
