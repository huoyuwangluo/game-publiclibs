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
    var WelfarePaging = (function (_super) {
        __extends(WelfarePaging, _super);
        function WelfarePaging() {
            return _super.call(this) || this;
        }
        WelfarePaging.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.listPaging.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
            this.scroller.addEventListener(egret.Event.CHANGE, this.showScrollerBtn, this);
            this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setScrollH, this);
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setScrollH, this);
            utils.callLater(this, this.updateView);
            //this.scroller.scrollPolicyH = "OFF";
        };
        WelfarePaging.prototype.itemClick = function (e) {
            if (this.listPaging.contentWidth > this.scroller.width) {
                this.updateScrollH(e.itemRenderer.x, e.itemRenderer.width);
            }
            this._callBack.runWith(this.listPaging.selectedIndex);
        };
        WelfarePaging.prototype.updateView = function () {
            this.listPaging.validateNow();
            if (this.listPaging.contentWidth > 0) {
                this.scroller.viewport.scrollH = 0;
                this.showScrollerBtn();
            }
            if (this.scroller.horizontalScrollBar) {
                this.scroller.horizontalScrollBar.autoVisibility = false;
            }
        };
        WelfarePaging.prototype.setScrollH = function (e) {
            switch (e.currentTarget) {
                case this.btnLeft:
                    this.rollScroller(0);
                    break;
                case this.btnRight:
                    this.rollScroller(this.listPaging.contentWidth - this.scroller.width);
                    break;
            }
        };
        WelfarePaging.prototype.updateScrollH = function (maxLength, itemLength) {
            this.listPaging.validateNow();
            var pos = maxLength - this.scroller.width / 2 + itemLength / 2;
            var maxScrollH = this.listPaging.contentWidth - this.scroller.width;
            if (pos <= 0)
                pos = 0;
            else if (pos >= maxScrollH)
                pos = maxScrollH;
            this.rollScroller(pos);
        };
        /**滚动条滚动到指定位置 */
        WelfarePaging.prototype.rollScroller = function (pos, duration) {
            if (duration === void 0) { duration = 200; }
            egret.Tween.get(this.scroller.viewport).to({ scrollH: pos }, duration).call(this.showScrollerBtn, this);
        };
        WelfarePaging.prototype.showScrollerBtn = function () {
            if (this.scroller.viewport.scrollH > 0)
                this.btnLeft.visible = true;
            else
                this.btnLeft.visible = false;
            if (this.scroller.viewport.scrollH < this.listPaging.contentWidth - this.scroller.width)
                this.btnRight.visible = true;
            else
                this.btnRight.visible = false;
        };
        WelfarePaging.prototype.removeTween = function () {
            egret.Tween.removeTweens(this.scroller.viewport);
        };
        /**设置页签 */
        WelfarePaging.prototype.setPage = function (listData) {
            this.listPaging.dataProvider = new eui.ArrayCollection(listData);
        };
        /**设置点击回调事件 */
        WelfarePaging.prototype.itemClickCallBack = function (callBack) {
            this._callBack = callBack;
        };
        WelfarePaging.prototype.selectedTab = function (index) {
            if (index > -1 && index < this.listPaging.dataProvider.length) {
                this.listPaging.selectedIndex = index;
                this.scroller.viewport.scrollH = 0;
                this.showScrollerBtn();
                this._callBack.runWith(index);
                if (index >= 4) {
                    this.rollScroller(this.listPaging.contentWidth - this.scroller.width);
                }
            }
        };
        return WelfarePaging;
    }(ui.WelfarePagingSkin));
    item.WelfarePaging = WelfarePaging;
    __reflect(WelfarePaging.prototype, "item.WelfarePaging");
})(item || (item = {}));
