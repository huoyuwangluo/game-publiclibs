var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var common;
(function (common) {
    var CommonBtnUpDataState = (function () {
        function CommonBtnUpDataState() {
        }
        Object.defineProperty(CommonBtnUpDataState, "instance", {
            get: function () {
                if (!CommonBtnUpDataState._instance) {
                    CommonBtnUpDataState._instance = new CommonBtnUpDataState();
                }
                return CommonBtnUpDataState._instance;
            },
            enumerable: true,
            configurable: true
        });
        CommonBtnUpDataState.prototype.updataTime = function (call, handler) {
            if (call === void 0) { call = null; }
            if (handler === void 0) { handler = null; }
            utils.timer.clear(this);
            this._call = call;
            this._handler = handler;
            utils.timer.once(200, this, this.callFun);
        };
        CommonBtnUpDataState.prototype.callFun = function () {
            //logger.log("自动升级功能111111111=====", this._call);
            //logger.log("自动升级功能222222222=====", this._handler);
            if (this._call && this._handler)
                this._handler.call(this._call);
        };
        CommonBtnUpDataState.prototype.clearTime = function () {
            utils.timer.clearAll(this);
            if (this._call && this._handler)
                utils.timer.clear(this._call, this._handler);
        };
        return CommonBtnUpDataState;
    }());
    common.CommonBtnUpDataState = CommonBtnUpDataState;
    __reflect(CommonBtnUpDataState.prototype, "common.CommonBtnUpDataState");
})(common || (common = {}));
