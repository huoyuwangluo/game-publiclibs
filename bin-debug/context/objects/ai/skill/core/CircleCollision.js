var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    /**
     * 碰撞检测
     * @author Administrator
     */
    var CircleCollision = (function () {
        function CircleCollision(target, radius, px, py) {
            if (target === void 0) { target = null; }
            if (radius === void 0) { radius = 0; }
            if (px === void 0) { px = 0; }
            if (py === void 0) { py = 0; }
            this._radius = 0;
            var that = this;
            that._center = new egret.Point(px, py);
            that._radius = radius;
            that._target = target;
        }
        CircleCollision.prototype.reset = function () {
            this._target = null;
        };
        Object.defineProperty(CircleCollision.prototype, "target", {
            get: function () {
                return this._target;
            },
            set: function (value) {
                this._target = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CircleCollision.prototype, "center", {
            get: function () {
                return this._center;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CircleCollision.prototype, "centerRealX", {
            get: function () {
                return this._center.x + this._target.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CircleCollision.prototype, "centerRealY", {
            get: function () {
                return this._center.y + this._target.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CircleCollision.prototype, "radius", {
            get: function () {
                return this._radius;
            },
            set: function (value) {
                this._radius = value;
            },
            enumerable: true,
            configurable: true
        });
        CircleCollision.prototype.hitTest = function (collision) {
            return CircleCollision.hitCircle(this, collision);
        };
        CircleCollision.prototype.getIntersectPoint = function (collision) {
            return CircleCollision.getIntersectCircle(this, collision);
        };
        /**
         * 检测圆和圆的碰撞
         * @param circle1
         * @param circle2
         * @return
         */
        CircleCollision.hitCircle = function (circle1, circle2) {
            var length = utils.MathUtil.getDistance(circle1.centerRealX, circle1.centerRealY, circle2.centerRealX, circle2.centerRealY);
            return length < (circle1.radius + circle2.radius);
        };
        /**
         * 获取圆和圆的相交点
         * @param circle1
         * @param circle2
         * @return
         */
        CircleCollision.getIntersectCircle = function (circle1, circle2) {
            var length = utils.MathUtil.getDistance(circle1.centerRealX, circle1.centerRealY, circle2.centerRealX, circle2.centerRealY);
            if (length < (circle1.radius + circle2.radius)) {
                return utils.MathUtil.getLinePoint(circle1.centerRealX, circle1.centerRealY, circle2.centerRealX, circle2.centerRealY, length * (circle1.radius / (circle1.radius + circle2.radius)));
            }
            return null;
        };
        return CircleCollision;
    }());
    s.CircleCollision = CircleCollision;
    __reflect(CircleCollision.prototype, "s.CircleCollision");
})(s || (s = {}));
