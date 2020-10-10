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
var WaitAlert = (function (_super) {
    __extends(WaitAlert, _super);
    function WaitAlert() {
        return _super.call(this) || this;
    }
    WaitAlert.prototype.show = function (labContent, leftTime, closeHandler, isTextFlow) {
        if (leftTime === void 0) { leftTime = 0; }
        if (closeHandler === void 0) { closeHandler = null; }
        if (isTextFlow === void 0) { isTextFlow = false; }
        this._isTextFlow = isTextFlow;
        this._labContent = labContent;
        if (closeHandler)
            this._closeHandler = closeHandler;
        if (leftTime)
            this._leftTime = leftTime;
        this.initData();
        if (this._leftTime > 0) {
            this.labTime.text = Language.C_DJS + ":" + this._leftTime;
            this.startTime();
        }
    };
    WaitAlert.prototype.hide = function () {
        utils.timer.clearAll(this);
        if (this._closeHandler) {
            this._closeHandler.run();
            this._closeHandler.recover();
            this._closeHandler = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    WaitAlert.prototype.initData = function () {
        if (this._isTextFlow == true) {
            this.labContent.textFlow = this._labContent;
        }
        else {
            this.labContent.text = this._labContent;
        }
    };
    /**开始倒计时*/
    WaitAlert.prototype.startTime = function () {
        this.showTime();
        this.updateTime();
    };
    /**倒计时结束 */
    WaitAlert.prototype.timeOver = function () {
        utils.timer.clearAll(this);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    /**进行倒计时 */
    WaitAlert.prototype.updateTime = function () {
        utils.timer.countdown(this._leftTime, this, this.showTime, this.timeOver);
    };
    /**显示倒计时*/
    WaitAlert.prototype.showTime = function () {
        this._leftTime--;
        this.labTime.text = Language.C_DJS + ":" + this._leftTime;
    };
    return WaitAlert;
}(ui.WaitAlertSkin));
__reflect(WaitAlert.prototype, "WaitAlert", ["IAlert", "egret.DisplayObject"]);
