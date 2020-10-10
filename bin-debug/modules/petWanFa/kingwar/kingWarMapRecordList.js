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
    var kingwar;
    (function (kingwar) {
        var kingWarMapRecordList = (function (_super) {
            __extends(kingWarMapRecordList, _super);
            function kingWarMapRecordList() {
                var _this = _super.call(this) || this;
                _this._btnArr = [_this.btn1, _this.btn2];
                _this._labArr = [_this.lab1, _this.lab2];
                return _this;
            }
            kingWarMapRecordList.prototype.show = function () {
                this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
                this._index = 0;
                this.showBtnView();
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            };
            kingWarMapRecordList.prototype.showBtnView = function () {
                var _this = this;
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
                GameModels.kingwar.requestKingWarRecord((this._index + 1), utils.Handler.create(this, function () {
                    _this.showList();
                }));
            };
            kingWarMapRecordList.prototype.onBtnClick = function (e) {
                this._index = this._btnArr.indexOf(e.currentTarget);
                this.showBtnView();
            };
            kingWarMapRecordList.prototype.showList = function () {
                var type = GameModels.kingwar.recordType;
                if (type != (this._index + 1))
                    return;
                var anyArr = GameModels.kingwar.recordList.concat();
                this.labNo.visible = anyArr.length <= 0;
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(anyArr);
                }
                else {
                    this._listData.source = anyArr;
                }
            };
            kingWarMapRecordList.prototype.onListClick = function (e) {
                var item = this.list.selectedItem;
                var petVo = item.id;
                GameModels.upStar.updateselectedPet(petVo.uid);
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            kingWarMapRecordList.prototype.clickHandler = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            kingWarMapRecordList.prototype.hide = function () {
                this.clearList(this.list);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return kingWarMapRecordList;
        }(ui.kingWarMapRecordListSkin));
        kingwar.kingWarMapRecordList = kingWarMapRecordList;
        __reflect(kingWarMapRecordList.prototype, "dialog.kingwar.kingWarMapRecordList", ["IAlert", "egret.DisplayObject"]);
    })(kingwar = dialog.kingwar || (dialog.kingwar = {}));
})(dialog || (dialog = {}));
