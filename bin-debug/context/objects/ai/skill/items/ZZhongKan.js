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
    var ZZhongKan = (function (_super) {
        __extends(ZZhongKan, _super);
        /**斩击*/
        function ZZhongKan() {
            return _super.call(this) || this;
            //this._type = TypeSkill.Z_ZJ;
            //this._fullDirect = true;
            //super(TypeSkill.Z_ZJ, "0", "0", "6051");
        }
        ZZhongKan.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._endNode = null;
            if (this._backPoint != null) {
                egret.Tween.removeTweens(this._backPoint);
                this._backPoint = null;
            }
        };
        ZZhongKan.prototype.start = function () {
            _super.prototype.start.call(this);
            //this.forward();
        };
        ZZhongKan.prototype.rockAfter = function () {
            //super.rockAfter();
            //this.beatBack();
        };
        ZZhongKan.prototype.forward = function () {
            if (this._backPoint == null) {
                this._backPoint = new egret.Point();
            }
            var that = this;
            if (this._target != null) {
                var angle = utils.MathUtil.getLAngle(this._target.x - this._body.x, this._target.y - this._body.y);
                var checkPoint = utils.MathUtil.getLinePointByAngle(this._target.x, this._target.y, 100, angle);
                var checkNode = this._body.scene.getNodeByPixel(checkPoint.x, checkPoint.y);
                //目标被击退方向上100像素为可行走区域
                if (checkNode && checkNode.walkable) {
                    var point = utils.MathUtil.getLinePointByAngle(this._body.x, this._body.y, 25, angle);
                    this._backPoint.setTo(this._body.x, this._body.y);
                    this._endNode = this._body.scene.getNodeByPixel(point.x, point.y);
                    if (this._endNode && this._endNode.walkable) {
                        var endX = point.x >> 0;
                        var endY = point.y >> 0;
                        if (this._endNode != this._body.tileNode) {
                            //endX = this._body.scene.getMapRealX(this._endNode.x);
                            //endY = this._body.scene.getMapRealY(this._endNode.y);
                        }
                        egret.Tween.get(this._backPoint, { onChange: that.onPosChange, onChangeObj: that }).to({ x: endX, y: endY }, 200, utils.Ease.quadOut);
                    }
                }
            }
        };
        ZZhongKan.prototype.onPosChange = function () {
            var that = this;
            if (!that._body)
                return;
            if (that._endNode != that._body.tileNode) {
                that._body.setTile(that._endNode);
            }
            that._body.pos(that._backPoint.x, that._backPoint.y);
        };
        return ZZhongKan;
    }(s.CShunFaResDirect));
    s.ZZhongKan = ZZhongKan;
    __reflect(ZZhongKan.prototype, "s.ZZhongKan");
})(s || (s = {}));
