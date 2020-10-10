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
    var AnimationCollision = (function (_super) {
        __extends(AnimationCollision, _super);
        function AnimationCollision() {
            return _super.call(this) || this;
        }
        AnimationCollision.prototype.initialize = function (radius, boomResId, collistionGroup) {
            if (radius === void 0) { radius = 30; }
            if (collistionGroup === void 0) { collistionGroup = null; }
            _super.prototype.initialize.call(this);
            var that = this;
            that.frameRate = 12;
            that._boomResId = boomResId;
            that._conllision = new s.CircleCollision(that, radius);
            that._smarobjects = collistionGroup;
            if (!that._smarobjects)
                that._smarobjects = [];
        };
        AnimationCollision.prototype.reset = function () {
            this.stop();
            var that = this;
            that._body = null;
            that._scene = null;
            if (that._smarobjects) {
                that._smarobjects = null;
            }
            _super.prototype.reset.call(this);
        };
        AnimationCollision.prototype.start = function (body, skillType, focusMode, isPlayOnce) {
            if (isPlayOnce === void 0) { isPlayOnce = false; }
            var that = this;
            that._body = body;
            that._scene = body.scene;
            that._skillId = skillType;
            that._focusMode = focusMode;
            isPlayOnce ? _super.prototype.playOnce.call(this) : _super.prototype.play.call(this);
            utils.timer.loop(1000 / 12, that, that.updateRender, true);
            this._conllision.center.setTo(0, 0);
        };
        AnimationCollision.prototype.stop = function () {
            utils.timer.clear(this, this.updateRender);
            _super.prototype.stop.call(this);
            this._smarobjects = null;
            if (this._conllision)
                egret.Tween.removeTweens(this._conllision.center);
        };
        AnimationCollision.prototype.tweenCollision = function (time, distance, angle, cachePoint) {
            if (cachePoint === void 0) { cachePoint = null; }
            this._conllision.center.setTo(0, 0);
            var end = utils.MathUtil.getLinePointByAngle(0, 0, distance, angle, cachePoint);
            egret.Tween.get(this._conllision.center).to({ x: end.x, y: end.y }, time, utils.Ease.linearNone);
        };
        AnimationCollision.prototype.updateRender = function () {
            var that = this;
            var body = that._body;
            if (that.alpha < 0.2 || !body.scene) {
                that.stop();
                return;
            }
            var objects = that._scene.getAllEnemyList(body);
            for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
                var smartObject = objects_1[_i];
                if (that._focusMode && smartObject != body.target)
                    continue;
                if (smartObject.stateDead || smartObject.hashCode == body.hashCode)
                    continue;
                if (that._smarobjects && that._smarobjects.indexOf(smartObject) == -1) {
                    if (smartObject.conllision.hitTest(that._conllision)) {
                        if (!smartObject.stateDead) {
                            AnimationCollision.addBoom(that._boomResId, smartObject.x, smartObject.y - smartObject.titleHeight / 2);
                            that._smarobjects.push(smartObject);
                        }
                    }
                }
            }
        };
        AnimationCollision.addBoom = function (resId, x, y, frameRate) {
            if (frameRate === void 0) { frameRate = 12; }
            var boom = utils.ObjectPool.from(s.AnimationSprite);
            boom.resId = resId;
            boom.frameRate = frameRate;
            boom.x = x;
            boom.y = y;
            app.gameContext.scene.addEffectFront(boom);
            boom.play();
            boom.onComplete(AnimationCollision, AnimationCollision.boomOverHandler, boom);
        };
        AnimationCollision.boomOverHandler = function (boom) {
            boom.offAllComplete();
            boom.stop();
            boom.resId = null;
            app.gameContext.scene.removeEffect(boom);
            utils.ObjectPool.to(boom);
        };
        return AnimationCollision;
    }(s.AnimationSprite));
    s.AnimationCollision = AnimationCollision;
    __reflect(AnimationCollision.prototype, "s.AnimationCollision");
})(s || (s = {}));
