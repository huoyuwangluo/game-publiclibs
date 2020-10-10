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
    var CFeiXing = (function (_super) {
        __extends(CFeiXing, _super);
        //private _flyResId:string = "";
        /**通用-飞行*/
        function CFeiXing() {
            var _this = _super.call(this, s.TypeSkill.C_FeiXing) || this;
            _this._speed = 10;
            _this._bodyHeightHalf = 80;
            return _this;
        }
        /*public constructor(type:number, flyResId:string, boomResId:string) {
            super(type, boomResId);
            this._flyResId = flyResId;
        }*/
        CFeiXing.prototype.createEffect = function () {
            _super.prototype.createEffect.call(this);
            var that = this;
            if (!that._effectFly) {
                that._effectFly = utils.ObjectPool.from(s.AnimationSprite);
                that._effectFly.frameRate = 24;
            }
            that._effectFly.resId = that._flyEffect;
        };
        CFeiXing.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.removeEffectFly();
        };
        CFeiXing.prototype.destory = function () {
            if (this._effectFly) {
                utils.ObjectPool.to(this._effectFly, true);
                this._effectFly = null;
            }
            _super.prototype.destory.call(this);
        };
        CFeiXing.prototype.start = function () {
            _super.prototype.start.call(this);
            var that = this;
            var body = that._body;
            var target = that._target;
            if (!target || !that._effectFly || !body || !body.avatarEnabled) {
                that.flyOverHandler();
                return;
            }
            that._startX = body.x;
            that._startY = body.y - body.titleHeight / 2;
            that._endX = target.x;
            that._endY = target.y - target.titleHeight / 2;
            var angle = utils.MathUtil.getAngle(that._endX - that._startX, that._endY - that._startY);
            that._effectFly.x = that._startX;
            that._effectFly.y = that._startY;
            that._effectFly.rotation = angle;
            that._scene.addEffectFront(that._effectFly);
            that._effectFly.play();
            var distance = utils.MathUtil.getDistance(that._startX, that._startY, that._endX, that._endY);
            var time = (distance / this._speed) * 7;
            if (time > 500)
                time = 500;
            if (GameModels.user.player.battleSpeedRate == 0) {
                egret.Tween.get(that._effectFly).to({ x: that._endX, y: that._endY }, time, utils.Ease.linearNone);
            }
            else {
                time = time / 2;
                egret.Tween.get(that._effectFly).to({ x: that._endX, y: that._endY }, time, utils.Ease.linearNone);
            }
            egret.Tween.get(that._effectFly).wait(time >> 0).call(that.flyOverHandler, that); //飞行物提前一点消失，因为有宽度
        };
        CFeiXing.prototype.readyDoHurt = function () {
        };
        CFeiXing.prototype.flyOverHandler = function () {
            var that = this;
            this.removeEffectFly();
            that.doHurt();
        };
        CFeiXing.prototype.removeEffectFly = function () {
            var that = this;
            if (!that._effectFly)
                return;
            egret.Tween.removeTweens(that._effectFly);
            that._effectFly.stop();
            if (that._effectFly.parent) {
                that._scene.removeEffect(that._effectFly);
            }
        };
        return CFeiXing;
    }(s.SkillShowBase));
    s.CFeiXing = CFeiXing;
    __reflect(CFeiXing.prototype, "s.CFeiXing");
})(s || (s = {}));
