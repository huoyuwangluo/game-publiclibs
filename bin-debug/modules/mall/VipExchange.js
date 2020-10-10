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
var view;
(function (view) {
    var vip;
    (function (vip) {
        var VipExchange = (function (_super) {
            __extends(VipExchange, _super);
            function VipExchange() {
                return _super.call(this) || this;
            }
            VipExchange.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._nowVip = 0;
                this._btnArr = [this.btn0, this.btn1, this.btn2, this.btn3];
                this._labArr = [this.lab0, this.lab1, this.lab2, this.lab3];
            };
            VipExchange.prototype.enter = function (data) {
                if (this.scroller.verticalScrollBar) {
                    this.scroller.verticalScrollBar.autoVisibility = false;
                    this.scroller.verticalScrollBar.visible = false;
                }
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].visible = true;
                    this._labArr[i].visible = true;
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                GameModels.vip.addEventListener(mo.ModelVip.PETDEBRIS_CHANGE, this.refreshList, this);
                // GameModels.vip.isOpenDuiHuanView = true;
                this.updataChangeList();
            };
            VipExchange.prototype.exit = function () {
                this.clearList(this.list);
                this.clearList(this.listDown);
                GameModels.vip.removeEventListener(mo.ModelVip.PETDEBRIS_CHANGE, this.refreshList, this);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
            };
            VipExchange.prototype.updataChangeList = function () {
                var _this = this;
                GameModels.vip.requsetVipCanChangList(utils.Handler.create(this, function (data) {
                    _this._nowVip = GameModels.user.player.vip;
                    var nextVip = GameModels.user.player.vip + 1;
                    if (nextVip > 6)
                        nextVip = 6;
                    for (var i = 0; i < _this._btnArr.length; i++) {
                        if (i == nextVip - 1) {
                            _this._btnArr[i].currentState = "down";
                            _this._labArr[i].textColor = 0xc4c4c5;
                        }
                        else {
                            _this._btnArr[i].currentState = "up";
                            _this._labArr[i].textColor = 0x545458;
                        }
                    }
                    _this.labHint1.text = Language.getExpression(Language.E_VIPTX, GameModels.user.player.vip);
                    _this.showList();
                    _this.showListDown(nextVip);
                }));
            };
            VipExchange.prototype.showList = function () {
                var petArr = [];
                var changeItem = GameModels.vip.getvipChangeTempBuyVipLv(this._nowVip);
                var changList = GameModels.vip.canChangePetList;
                for (var i = 0; i < changeItem.length; i++) {
                    var tempData = { temp: null, isCan: false };
                    if (changeItem[i]) {
                        tempData.temp = changeItem[i];
                        if (changList.indexOf(changeItem[i].id) != -1) {
                            tempData.isCan = true;
                        }
                        petArr.push(tempData);
                    }
                }
                petArr.sort(function (a, b) {
                    if (a.isCan && b.isCan) {
                        return b.temp.needVip - a.temp.needVip;
                    }
                    else {
                        if (a.isCan || b.isCan) {
                            if (a.isCan) {
                                return -1;
                            }
                            else {
                                return 1;
                            }
                        }
                        else {
                            return b.temp.needVip - a.temp.needVip;
                        }
                    }
                });
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(petArr);
                }
                else {
                    this._listData.source = petArr;
                }
                this.list.dataProvider = this._listData;
            };
            VipExchange.prototype.onBtnClick = function (e) {
                var index = this._btnArr.indexOf(e.currentTarget);
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (i == index) {
                        this._btnArr[i].currentState = "down";
                        this._labArr[i].textColor = 0xc4c4c5;
                    }
                    else {
                        this._btnArr[i].currentState = "up";
                        this._labArr[i].textColor = 0x545458;
                    }
                }
                this.showListDown(index + 1);
            };
            VipExchange.prototype.showListDown = function (vipLv) {
                if (GameModels.user.player.vip < 4) {
                    this.scroller.height = 610;
                    this.imgBg.visible = true;
                    var nextCanChangeItem = GameModels.vip.getvipChangeItemVoBuyVipLv(vipLv);
                    if (!this._listDataDown) {
                        this._listDataDown = new eui.ArrayCollection(nextCanChangeItem);
                    }
                    else {
                        this._listDataDown.source = nextCanChangeItem;
                    }
                    this.listDown.dataProvider = this._listDataDown;
                }
                else {
                    this.scroller.height = 795;
                    this.imgBg.visible = false;
                    this.listDown.dataProvider = new eui.ArrayCollection([]);
                    for (var i = 0; i < this._btnArr.length; i++) {
                        this._btnArr[i].visible = false;
                        this._labArr[i].visible = false;
                    }
                }
                this.scroller.validateNow();
            };
            VipExchange.prototype.refreshList = function () {
                this._listData.replaceAll(this._listData.source);
            };
            return VipExchange;
        }(ui.VipExchangeSkin));
        vip.VipExchange = VipExchange;
        __reflect(VipExchange.prototype, "view.vip.VipExchange", ["IModuleView", "egret.DisplayObject"]);
    })(vip = view.vip || (view.vip = {}));
})(view || (view = {}));
