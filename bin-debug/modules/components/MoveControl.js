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
/**
 * 自定義組件
 * 移动控制器
 */
var components;
(function (components) {
    var MoveControl = (function (_super) {
        __extends(MoveControl, _super);
        function MoveControl() {
            var _this = _super.call(this) || this;
            _this._isControl = false;
            _this.skinName = 'components.MoveControlSkin';
            return _this;
        }
        MoveControl.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._radius = this.width / 2;
        };
        MoveControl.prototype.start = function () {
            this.ball.x = this.ball.y = this._radius;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.end, this);
        };
        MoveControl.prototype.touchHandler = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    this._isControl = true;
                    var rx = (e.stageX - this.x - this._radius);
                    var ry = (e.stageY - this.y - this._radius);
                    this._angle = utils.MathUtil.getAngle(rx, ry);
                    rx = Math.abs(rx);
                    ry = Math.abs(ry);
                    if (rx > this._radius)
                        rx = this._radius;
                    if (ry > this._radius)
                        ry = this._radius;
                    var s = this._angle * Math.PI / 180;
                    this.ball.x = this._radius + rx * Math.cos(s);
                    this.ball.y = this._radius + ry * Math.sin(s);
                    break;
            }
        };
        MoveControl.prototype.end = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.end, this);
            this.ball.x = this.ball.y = this._radius;
            if (!this.stage)
                return;
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        };
        Object.defineProperty(MoveControl.prototype, "angle", {
            get: function () {
                return this._angle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MoveControl.prototype, "isControl", {
            get: function () {
                return this._isControl;
            },
            enumerable: true,
            configurable: true
        });
        return MoveControl;
    }(eui.Component));
    components.MoveControl = MoveControl;
    __reflect(MoveControl.prototype, "components.MoveControl");
})(components || (components = {}));
