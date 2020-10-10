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
    var RunAction = (function (_super) {
        __extends(RunAction, _super);
        function RunAction() {
            return _super.call(this, TypeAction.RUN_NAME) || this;
        }
        RunAction.prototype.initialize = function (body) {
            _super.prototype.initialize.call(this, body);
            this._moveRender = new s.EaseRender();
        };
        RunAction.prototype.reset = function () {
            egret.Tween.removeTweens(this);
            mg.stageManager.removeFrameTick(this, this.updateRenderMove);
            _super.prototype.reset.call(this);
            this._moveRender.reset();
            this._endNode = null;
        };
        RunAction.prototype.start = function (node, speedRate) {
            if (speedRate === void 0) { speedRate = 1; }
            this._endNode = node;
            _super.prototype.start.call(this);
            var body = this._body;
            //先更新目标格子信息
            body.resetMoveSpeed();
            var endX = game.MapConfig.getReaX(node.x);
            var endY = game.MapConfig.getReaY(node.y);
            var direct = -1;
            if (body.tileNode != node) {
                direct = TypeDirection.getDirection8(body.x, body.y, endX, endY);
                //direct = TypeDirection.getDirection8(body.tileX, body.tileY, node.x, node.y);
                body.setTileNoUpdate(this._endNode);
            }
            body.actionTo(TypeAction.RUN, direct);
            var speed = body.moveSpeed / mg.stageManager.frameRate; //每秒移动的像素转成每一帧移动的速度
            if (speedRate == 1) {
                speed = speed * speedRate * 0.75; //跑80%速度，防止服务端延时
            }
            else {
                speed = speed * speedRate * 0.8; //跑80%速度，防止服务端延时
            }
            this._moveRender.initialize(body, speed, endX, endY);
            mg.stageManager.addFrameTick(this, this.updateRenderMove, true);
            return this;
        };
        RunAction.prototype.updateRender = function (timeStamp) {
            if (!this.runing)
                return true;
        };
        RunAction.prototype.updateRenderMove = function (passframe) {
            var self = this;
            self._moveRender.updateRender(passframe);
            if (self._moveRender.process >= 1) {
                self._body.setTile(self._endNode);
                mg.stageManager.removeFrameTick(self, self.updateRenderMove);
                self._runing = false;
                self.end();
            }
            return true;
        };
        return RunAction;
    }(s.ActionBase));
    s.RunAction = RunAction;
    __reflect(RunAction.prototype, "s.RunAction");
})(s || (s = {}));
