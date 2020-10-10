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
    var PickAction = (function (_super) {
        __extends(PickAction, _super);
        function PickAction() {
            return _super.call(this, TypeAction.PICK_NAME) || this;
        }
        PickAction.prototype.start = function () {
            this._body.actionOnce(TypeAction.IDLE);
            this._endTime = egret.getTimer() + 300;
            return _super.prototype.start.call(this);
        };
        PickAction.prototype.updateRender = function (timeStamp) {
            if (!this._runing)
                return;
            if (timeStamp > this._endTime) {
                this.end();
            }
            return true;
        };
        return PickAction;
    }(s.ActionBase));
    s.PickAction = PickAction;
    __reflect(PickAction.prototype, "s.PickAction");
})(s || (s = {}));
