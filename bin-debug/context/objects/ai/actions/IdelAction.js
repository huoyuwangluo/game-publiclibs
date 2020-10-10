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
var s;
(function (s) {
    var IdelAction = (function (_super) {
        __extends(IdelAction, _super);
        function IdelAction() {
            return _super.call(this, TypeAction.IDLE_NAME) || this;
        }
        IdelAction.prototype.start = function (time) {
            this._body.actionTo(TypeAction.IDLE);
            this._endTime = egret.getTimer() + time;
            return _super.prototype.start.call(this);
        };
        IdelAction.prototype.updateRender = function (timeStamp) {
            if (!this._runing)
                return;
            if (timeStamp > this._endTime) {
                this.end();
            }
            return true;
        };
        return IdelAction;
    }(s.ActionBase));
    s.IdelAction = IdelAction;
    __reflect(IdelAction.prototype, "s.IdelAction");
})(s || (s = {}));
