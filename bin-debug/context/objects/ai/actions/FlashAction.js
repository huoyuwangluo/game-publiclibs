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
    var FlashAction = (function (_super) {
        __extends(FlashAction, _super);
        function FlashAction() {
            return _super.call(this, TypeAction.FLASH_NAME) || this;
        }
        FlashAction.prototype.reset = function () {
            egret.Tween.removeTweens(this._body);
            _super.prototype.reset.call(this);
        };
        FlashAction.prototype.start = function (node, direct) {
            if (direct === void 0) { direct = -1; }
            this._body.actionTo(TypeAction.IDLE, direct);
            this._body.setTile(node);
            this._body.alpha = 0;
            egret.Tween.get(this._body).to({ alpha: 1 }, 500);
            this._endTime = egret.getTimer() + 500;
            return _super.prototype.start.call(this);
        };
        FlashAction.prototype.updateRender = function (timeStamp) {
            if (!this._runing)
                return;
            if (timeStamp >= this._endTime) {
                this.end();
            }
            return true;
        };
        return FlashAction;
    }(s.ActionBase));
    s.FlashAction = FlashAction;
    __reflect(FlashAction.prototype, "s.FlashAction");
})(s || (s = {}));
