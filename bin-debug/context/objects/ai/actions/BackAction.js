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
    var BackAction = (function (_super) {
        __extends(BackAction, _super);
        function BackAction() {
            var _this = _super.call(this, TypeAction.BACK_NAME) || this;
            //this._backPoint = new egret.Point();
            _this._moveRender = new s.EaseRender();
            return _this;
        }
        BackAction.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._moveRender.reset();
            mg.stageManager.removeFrameTick(this, this.updateRenderMove);
        };
        BackAction.prototype.start = function (master) {
            var body = this._body;
            this._endTime = egret.getTimer() + 600;
            if (master != null) {
                //this._endNode = battle.manager.getDirectNextNode(this._body.tileNode,master.direct,this._body.scene, null, 3);
                if (this._endNode == null) {
                    //this._endNode = battle.manager.getDirectNextNode(this._body.tileNode,master.direct,this._body.scene, null, 2);
                }
                if (this._endNode == null) {
                    this._endNode = battle.manager.getDirectNextNode(this._body.tileNode, master.direct, this._body.scene);
                }
                if (this._endNode) {
                    body.actionTo(TypeAction.IDLE);
                    body.setTileNoUpdate(this._endNode);
                    var speed = 20;
                    var endX = this._body.scene.getMapRealX(this._endNode.x);
                    var endY = this._body.scene.getMapRealY(this._endNode.y);
                    this._moveRender.initialize(body, speed, endX, endY);
                    mg.stageManager.addFrameTick(this, this.updateRenderMove, true);
                }
                /*
                var angle: number = utils.MathUtil.getLAngle(this._body.x - master.x, this._body.y - master.y);

                var checkPoint: egret.Point = utils.MathUtil.getLinePointByAngle(this._body.x, this._body.y, 100, angle);
                var checkNode:PF.Node = this._body.scene.getNodeByPixel(checkPoint.x, checkPoint.y);

                //击退方向上50像素为可行走区域
                if(checkNode && checkNode.walkable)
                {
                    this._endNode = battle.manager.getDirectNextNode(this._body.tileNode,master.direct,this._body.scene);

                    //var point: egret.Point = utils.MathUtil.getLinePointByAngle(this._body.x, this._body.y, 25, angle);
                    this._backPoint.setTo(this._body.x, this._body.y);
                    //this._endNode = this._body.scene.getNodeByPixel(point.x, point.y);
                    if (this._endNode && this._endNode.walkable) {
                        //var endX:number = point.x >> 0;
                        //var endY:number = point.y >> 0;
                        if(this._endNode != this._body.tileNode)
                        {
                            //endX = this._body.scene.getMapRealX(this._endNode.x);
                            //endY = this._body.scene.getMapRealY(this._endNode.y);
                        }
                        var endX:number = this._body.scene.getMapRealX(this._endNode.x);
                        var endY:number = this._body.scene.getMapRealX(this._endNode.y);
                        egret.Tween.get(this._backPoint).to({ x: endX, y: endY }, 300, utils.Ease.quadOut);
                    }
                }
                */
            }
            return _super.prototype.start.call(this);
        };
        BackAction.prototype.updateRender = function (timeStamp) {
            if (!this._runing)
                return;
            if (timeStamp > this._endTime) {
                //if(this._endNode != this._body.tileNode)
                //{
                //	this._body.setTile(this._endNode);
                //}
                this.end();
                //egret.Tween.removeTweens(this._backPoint);
            }
            //this._body.pos(this._backPoint.x, this._backPoint.y);
            return true;
        };
        BackAction.prototype.updateRenderMove = function (passframe) {
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
        return BackAction;
    }(s.ActionBase));
    s.BackAction = BackAction;
    __reflect(BackAction.prototype, "s.BackAction");
})(s || (s = {}));
