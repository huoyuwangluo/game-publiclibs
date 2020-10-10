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
    var resolve;
    (function (resolve) {
        var CommonOtherResovle = (function (_super) {
            __extends(CommonOtherResovle, _super);
            function CommonOtherResovle() {
                return _super.call(this) || this;
            }
            CommonOtherResovle.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            CommonOtherResovle.prototype.enter = function (data, nowItem) {
                if (nowItem === void 0) { nowItem = ""; }
                this._type = data;
                if (nowItem)
                    this._nowItem = nowItem;
                this.list.dataProvider = this._listData = new eui.ArrayCollection();
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
                this.updateItems();
            };
            CommonOtherResovle.prototype.exit = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIconClick, this);
                this.clearList(this.list);
            };
            CommonOtherResovle.prototype.updateItems = function () {
                var items = [];
                var news = [];
                if (this._type == 1) {
                    //items = GameModels.bag.getItemsByType(TypeItem.QIYUE_JIHUO);
                }
                else {
                    items = GameModels.bag.getItemsByType(TypeItem.SHENBIN_PROP);
                    if (this._nowItem && items.length > 0) {
                        var item = GameModels.bag.getItemById(parseInt(this._nowItem));
                        if (item) {
                            for (var i = 0; i < items.length; i++) {
                                if (item.id == items[i].id) {
                                    news[0] = { caller: this, tmp: item, num: items[i].count };
                                    items.splice(items.indexOf(items[i]), 1);
                                    break;
                                }
                            }
                        }
                    }
                }
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    var count = item.count;
                    news.push({ caller: this, tmp: item, num: count });
                }
                this._listData.source = news;
            };
            CommonOtherResovle.prototype.btnIconClick = function (e) {
                mg.uiManager.remove(this);
            };
            CommonOtherResovle.prototype.decomposeCallback = function (data) {
                this.updateItems();
            };
            return CommonOtherResovle;
        }(ui.CommonOtherResovleSkin));
        resolve.CommonOtherResovle = CommonOtherResovle;
        __reflect(CommonOtherResovle.prototype, "dialog.resolve.CommonOtherResovle");
    })(resolve = dialog.resolve || (dialog.resolve = {}));
})(dialog || (dialog = {}));
