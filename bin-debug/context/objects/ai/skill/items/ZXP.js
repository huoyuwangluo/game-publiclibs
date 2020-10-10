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
    /**XP-剑气斩 */
    var ZXP = (function (_super) {
        __extends(ZXP, _super);
        function ZXP() {
            var _this = 
            //super(TypeSkill.Z_XP);
            _super.call(this, 0) || this;
            // private _effects:AnimationSprite[];
            _this._total = 7;
            _this._angleSpace = 12;
            _this._collistions = [];
            return _this;
        }
        ZXP.prototype.createEffect = function () { };
        ZXP.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.removeEffects();
        };
        ZXP.prototype.destory = function () {
            _super.prototype.destory.call(this);
            if (this._collistions) {
                this._collistions.length = 0;
                this._collistions = null;
            }
        };
        ZXP.prototype.rockAfter = function () {
            var that = this;
            var body = that._body;
            if (!body.scene) {
                this.end();
                return;
            }
            that._index = 0;
            var angle = body.direct * 45 - 90;
            var startAngle = angle - that._angleSpace * that._total / 2;
            this._collistions.length = 0;
            var object = body.target;
            if (object && object != body) {
                if (!object.stateDead && !this.verifyFcousTarget(object)) {
                    this._collistions.push(object);
                }
            }
            var targets = [];
            if (targets) {
                for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                    var smartObject = targets_1[_i];
                    if (smartObject.stateDead || this.verifyFcousTarget(smartObject))
                        continue;
                    that._collistions.push(smartObject);
                }
            }
            for (var i = 0; i < that._total; i++) {
                var angleResult = startAngle + that._angleSpace * i;
                var effect = utils.ObjectPool.from(s.AnimationCollision);
                effect.initialize(80, '4028', that._collistions);
                effect.frameRate = 12;
                effect.resId = "4020";
                effect.rotation = angleResult - 90;
                that._scene.addEffectFront(effect);
                effect.x = body.x;
                effect.y = body.y - 80;
                effect.start(body, that._template.id, that._focusMode);
                effect.playOnce();
                effect.onComplete(that, that.effectComplete, effect);
                var end = utils.MathUtil.getLinePointByAngle(effect.x, effect.y, 1000, angleResult);
                effect.alpha = 1;
                egret.Tween.get(effect).to({ x: end.x, y: end.y, alpha: 0 }, 800, utils.Ease.linearNone);
            }
        };
        ZXP.prototype.effectComplete = function (effect) {
            var that = this;
            egret.Tween.removeTweens(effect);
            effect.offComplete(that, that.effectComplete);
            effect.stop();
            that._scene.removeEffect(effect);
            utils.ObjectPool.to(effect, true);
            that._index++;
            if (that._index >= that._total) {
                that.end();
            }
        };
        ZXP.prototype.end = function () {
            this.removeEffects();
            _super.prototype.end.call(this);
        };
        ZXP.prototype.removeEffects = function () { };
        return ZXP;
    }(s.SkillBase));
    s.ZXP = ZXP;
    __reflect(ZXP.prototype, "s.ZXP");
})(s || (s = {}));
