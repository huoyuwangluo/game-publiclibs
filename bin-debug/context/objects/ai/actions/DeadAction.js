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
    var DeadAction = (function (_super) {
        __extends(DeadAction, _super);
        function DeadAction() {
            return _super.call(this, TypeAction.DEAD_NAME) || this;
        }
        DeadAction.prototype.reset = function () {
            _super.prototype.reset.call(this);
        };
        DeadAction.prototype.start = function (killerVO) {
            var body = this._body;
            body.deadAction();
            var killer = null;
            if (body.scene != null) {
                killer = body.scene.getActorByVO(killerVO);
            }
            if (killer && killer != body) {
                var angle = utils.MathUtil.getLAngle(body.x - killer.x, body.y - killer.y);
                var point = utils.MathUtil.getLinePointByAngle(body.x, body.y, 150, angle);
                egret.Tween.get(body).to({ x: point.x, y: point.y, alpha: 0 }, 500, utils.Ease.quadOut);
            }
            else {
                egret.Tween.get(body).to({ alpha: 0 }, 500, utils.Ease.quadOut);
            }
            this._endTime = egret.getTimer() + 800;
            return _super.prototype.start.call(this);
        };
        DeadAction.prototype.updateRender = function (timeStamp) {
            if (!this._runing)
                return;
            if (timeStamp >= this._endTime) {
                this.end();
            }
            return true;
        };
        return DeadAction;
    }(s.ActionBase));
    s.DeadAction = DeadAction;
    __reflect(DeadAction.prototype, "s.DeadAction");
})(s || (s = {}));
