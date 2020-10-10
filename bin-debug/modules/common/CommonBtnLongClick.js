var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var common;
(function (common) {
    var CommonBtnLongClick = (function () {
        function CommonBtnLongClick() {
        }
        Object.defineProperty(CommonBtnLongClick, "instance", {
            get: function () {
                if (!CommonBtnLongClick._instance) {
                    CommonBtnLongClick._instance = new CommonBtnLongClick();
                }
                return CommonBtnLongClick._instance;
            },
            enumerable: true,
            configurable: true
        });
        CommonBtnLongClick.prototype.startLongClickFun = function (btn, call, handler) {
            if (call === void 0) { call = null; }
            if (handler === void 0) { handler = null; }
            this._call = call;
            this._handler = handler;
            this._btn = btn;
            utils.timer.clearAll(this);
            this.callFun();
            utils.timer.loop(200, this, this.callFun);
            if (this._btn) {
                this._btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this._btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnded, this);
            }
        };
        CommonBtnLongClick.prototype.onTouchEnd = function (evt) {
            this.stopLongClickFun();
        };
        CommonBtnLongClick.prototype.onTouchEnded = function (evt) {
            this.stopLongClickFun();
        };
        CommonBtnLongClick.prototype.callFun = function () {
            if (this._call && this._handler) {
                this._handler.call(this._call);
            }
        };
        CommonBtnLongClick.prototype.stopLongClickFun = function () {
            utils.timer.clearAll(this);
            this._call = null;
            this._handler = null;
            if (this._btn) {
                this._btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this._btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnded, this);
                this._btn = null;
            }
        };
        return CommonBtnLongClick;
    }());
    common.CommonBtnLongClick = CommonBtnLongClick;
    __reflect(CommonBtnLongClick.prototype, "common.CommonBtnLongClick");
})(common || (common = {}));
