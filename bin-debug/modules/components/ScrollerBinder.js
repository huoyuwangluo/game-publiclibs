var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var components;
(function (components) {
    var ScrollerBinder = (function () {
        function ScrollerBinder() {
        }
        ScrollerBinder.prototype.initialize = function (scroller, list, btnPrev, btnNext, isHorizontal) {
            if (isHorizontal === void 0) { isHorizontal = false; }
            this.reset();
            this._scroller = scroller;
            this._isHorizontal = isHorizontal;
            this._list = list;
            this._btnPrev = btnPrev;
            this._btnNext = btnNext;
            this._btnPrev.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this._btnNext.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this._scroller.addEventListener(egret.Event.CHANGE, this.scrollChangeHandler, this);
            this._list.validateNow();
            if (isHorizontal) {
                // this._scroller.scrollPolicyH  = eui.ScrollPolicy.ON
                // this._scroller.scrollPolicyV  = eui.ScrollPolicy.OFF
                if (this._scroller.verticalScrollBar) {
                    this._scroller.verticalScrollBar.autoVisibility = false;
                    this._scroller.verticalScrollBar.visible = false;
                }
                this._width = this._list.contentWidth - this._scroller.viewport.width;
                this._space = this._width / this._list.dataProvider.length;
                this.updateHandler1();
            }
            else {
                // this._scroller.scrollPolicyH  = eui.ScrollPolicy.OFF
                // this._scroller.scrollPolicyV  = eui.ScrollPolicy.ON
                if (this._scroller.horizontalScrollBar) {
                    this._scroller.horizontalScrollBar.autoVisibility = false;
                    this._scroller.horizontalScrollBar.visible = false;
                }
                this._height = this._list.contentHeight - this._scroller.viewport.height;
                this._space = this._height / this._list.dataProvider.length;
                this.updateHandler();
            }
        };
        ScrollerBinder.prototype.reset = function () {
            if (this._scroller)
                this._scroller.removeEventListener(egret.Event.CHANGE, this.scrollChangeHandler, this);
            if (this._btnPrev)
                this._btnPrev.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            if (this._btnNext)
                this._btnNext.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this._scroller = null;
            this._list = null;
            this._btnPrev = null;
            this._btnNext = null;
        };
        ScrollerBinder.prototype.touchHandler = function (e) {
            egret.Tween.removeTweens(this._scroller.viewport);
            var value;
            switch (e.currentTarget) {
                case this._btnPrev:
                    value = this._isHorizontal == false ? this._scroller.viewport.scrollV - this._space : this._scroller.viewport.scrollH - this._space;
                    if (value < 0)
                        value = 0;
                    if (this._isHorizontal) {
                        egret.Tween.get(this._scroller.viewport).to({ scrollH: value }, 300, utils.Ease.expoOut).call(this.updateHandler1, this);
                    }
                    else {
                        egret.Tween.get(this._scroller.viewport).to({ scrollV: value }, 300, utils.Ease.expoOut).call(this.updateHandler, this);
                    }
                    break;
                case this._btnNext:
                    value = this._isHorizontal == false ? this._scroller.viewport.scrollV + this._space : this._scroller.viewport.scrollH + this._space;
                    if (this._isHorizontal) {
                        if (value > this._width)
                            value = this._width;
                        egret.Tween.get(this._scroller.viewport).to({ scrollH: value }, 300, utils.Ease.expoOut).call(this.updateHandler1, this);
                    }
                    else {
                        if (value > this._height)
                            value = this._height;
                        egret.Tween.get(this._scroller.viewport).to({ scrollV: value }, 300, utils.Ease.expoOut).call(this.updateHandler, this);
                    }
                    break;
            }
        };
        ScrollerBinder.prototype.scrollChangeHandler = function (e) {
            this.updateHandler();
        };
        ScrollerBinder.prototype.updateHandler = function () {
            if (this._scroller.viewport.scrollV <= 0) {
                this._btnPrev.touchEnabled = false;
                this._btnPrev.alpha = 0.5;
            }
            else {
                this._btnPrev.touchEnabled = true;
                this._btnPrev.alpha = 1;
            }
            if (this._scroller.viewport.scrollV >= this._height) {
                this._btnNext.touchEnabled = false;
                this._btnNext.alpha = 0.5;
            }
            else {
                this._btnNext.touchEnabled = true;
                this._btnNext.alpha = 1;
            }
        };
        ScrollerBinder.prototype.updateHandler1 = function () {
            if (this._scroller.viewport.scrollH <= 0) {
                this._btnPrev.touchEnabled = false;
                this._btnPrev.alpha = 0.5;
            }
            else {
                this._btnPrev.touchEnabled = true;
                this._btnPrev.alpha = 1;
            }
            if (this._scroller.viewport.scrollH >= this._width) {
                this._btnNext.touchEnabled = false;
                this._btnNext.alpha = 0.5;
            }
            else {
                this._btnNext.touchEnabled = true;
                this._btnNext.alpha = 1;
            }
        };
        return ScrollerBinder;
    }());
    components.ScrollerBinder = ScrollerBinder;
    __reflect(ScrollerBinder.prototype, "components.ScrollerBinder");
})(components || (components = {}));
