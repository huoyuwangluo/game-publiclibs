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
var mg;
(function (mg) {
    var EffectManager = (function (_super) {
        __extends(EffectManager, _super);
        function EffectManager() {
            var _this = _super.call(this) || this;
            _this._bindeffects = [];
            return _this;
        }
        Object.defineProperty(EffectManager, "instance", {
            get: function () {
                if (!EffectManager._instance) {
                    EffectManager._instance = new EffectManager();
                }
                return EffectManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        EffectManager.prototype.initialize = function (stage) {
            this.touchEnabled = this.touchChildren = false;
            mg.layerManager.tip.addChild(this);
        };
        EffectManager.prototype.createEffect = function (parent, x, y, frameRate) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (frameRate === void 0) { frameRate = 10; }
            var effect = utils.ObjectPool.from(s.AnimationSprite);
            effect.frameRate = frameRate ? frameRate : 10;
            effect.x = x;
            effect.y = y;
            if (parent)
                parent.addChild(effect);
            return effect;
        };
        /**将特效置于对象上方 */
        EffectManager.prototype.bindEffect = function (target, resId, scale, x, y, frameRate) {
            if (scale === void 0) { scale = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (frameRate === void 0) { frameRate = 8; }
            if (!this._bindeffects[target.hashCode]) {
                var effect = this.createEffect(null, x ? x : target.x, y ? y : target.y, frameRate);
                effect.touchEnabled = false;
                effect.touchChildren = false;
                effect.resId = resId;
                effect.scaleX = scale;
                effect.scaleY = scale;
                target.parent.addChild(effect);
                effect.play();
                this._bindeffects[target.hashCode] = effect;
            }
        };
        /**移除对象上方的特效 */
        EffectManager.prototype.unbindEffect = function (target) {
            if (this._bindeffects[target.hashCode]) {
                var effect = this._bindeffects[target.hashCode];
                if (effect) {
                    effect.stop();
                    if (effect.parent) {
                        effect.parent.removeChild(effect);
                    }
                    effect.offAllComplete();
                    utils.ObjectPool.to(effect, true);
                }
                this._bindeffects[target.hashCode] = null;
                delete this._bindeffects[target.hashCode];
            }
        };
        /**
         * 播放一次特效(此方法会覆盖之前相同的特效)
         * @param id 特效Id
         * @param x	X坐标
         * @param y	Y坐标
         * @param parent 父容器 默认为layerManager.tip
         * @param blend 叠加模式 参见egret.BlendMode
         */
        EffectManager.prototype.playEffectOnce = function (id, x, y, parent, fps, blend) {
            if (parent === void 0) { parent = null; }
            if (fps === void 0) { fps = 12; }
            if (blend === void 0) { blend = ''; }
            if (parent == null)
                parent = this;
            var effect = utils.ObjectPool.from(s.AnimationSprite);
            effect.resId = id;
            effect.x = x;
            effect.y = y;
            effect.frameRate = fps;
            effect.blendMode = blend ? egret.BlendMode.NORMAL : blend;
            parent.addChild(effect);
            effect.onComplete(this, this.removeEffectHandler, effect);
            effect.playOnce();
            return effect;
        };
        EffectManager.prototype.removeEffectHandler = function (effect) {
            effect.stop();
            if (effect.parent) {
                effect.blendMode = egret.BlendMode.NORMAL;
                effect.offAllComplete();
                if (effect.parent) {
                    effect.parent.removeChild(effect);
                }
                utils.ObjectPool.to(effect, true);
            }
        };
        /**播放图标飞入背包效果*/
        EffectManager.prototype.flyIconsToBag = function (items, fromPoint) {
            if (fromPoint === void 0) { fromPoint = null; }
            var flyItem = new s.FlyIconsEffect();
            if (!fromPoint)
                fromPoint = new egret.Point(mg.stageManager.stageWidth * .5, 300);
            if (items.length > 10) {
                items.length = 10;
            }
            flyItem.initializeConfigStr(items, fromPoint, mg.layerManager.top);
            flyItem.start();
        };
        /**播放图标飞行效果*/
        EffectManager.prototype.flyEffects = function (resId, count, fromPos, targetPos, uiLayer) {
            for (var i = 0; i < count; i++) {
                utils.timer.once(i * 30, this, this.startFlyIcon, false, resId, fromPos, targetPos, uiLayer);
            }
        };
        EffectManager.prototype.startFlyIcon = function (resId, fromPos, targetPos, uiLayer) {
            var unit = utils.ObjectPool.from(components.Icon);
            unit.scaleX = unit.scaleY = .8;
            unit.x = fromPos.x;
            unit.y = fromPos.y;
            unit.source = "common_json.common_" + resId + "_png";
            uiLayer.addChild(unit);
            var x = fromPos.x + (160 * (Math.random() - .5)) >> 0;
            var y = fromPos.y + (160 * (Math.random() - .5)) >> 0;
            egret.Tween.get(unit).to({ x: x, y: y, scaleX: 1, scaleY: 1 }, 600, utils.Ease.cubicInOut).wait(200)
                .to({ x: targetPos.x, y: targetPos.y, scaleX: .8, scaleY: .8 }, 500, utils.Ease.linearOut).call(this.flyIconEnd, this, [unit]);
        };
        EffectManager.prototype.flyIconEnd = function (unit) {
            if (!unit)
                return;
            if (unit.parent)
                unit.parent.removeChild(unit);
            utils.ObjectPool.to(unit, true);
        };
        EffectManager.prototype.addBeAttackedEffect = function (isContinue) {
            var _this = this;
            if (isContinue === void 0) { isContinue = false; }
            if (!this.imgAttack) {
                this.imgAttack = new egret.Bitmap();
                this.imgAttack.touchEnabled = false;
            }
            RES.getResAsync("main_top_red_png", function (t) {
                _this.imgAttack.texture = t;
                _this.imgAttack.scale9Grid = new egret.Rectangle(118, 122, 1, 1);
                _this.imgAttack.width = mg.stageManager.stageWidth;
                _this.imgAttack.height = mg.stageManager.stageHeight;
                mg.layerManager.top.addChild(_this.imgAttack);
                _this.beAttackedEffectTween(false, isContinue);
                mg.stageManager.onResize(_this, _this.beAttackedResizeHandler, true);
            }, this);
        };
        /**移除受击的红屏效果 */
        EffectManager.prototype.removeBeAttackedEffect = function () {
            mg.stageManager.offResize(this, this.beAttackedResizeHandler);
            if (!this.imgAttack)
                return;
            egret.Tween.removeTweens(this.imgAttack);
            if (!this.imgAttack.parent)
                return;
            if (this.imgAttack.parent.contains(this.imgAttack)) {
                this.imgAttack.parent.removeChild(this.imgAttack);
                this.imgAttack = null;
            }
        };
        EffectManager.prototype.beAttackedEffectTween = function (isHide, isContinue) {
            if (isHide === void 0) { isHide = true; }
            if (isContinue === void 0) { isContinue = false; }
            this.imgAttack.alpha = isHide ? 1 : 0.4;
            var tarAlpha = isHide ? 0.4 : 1;
            if (isContinue)
                egret.Tween.get(this.imgAttack).to({ alpha: tarAlpha }, 800).call(this.beAttackedEffectTween, this, [!isHide, isContinue]);
            else
                egret.Tween.get(this.imgAttack).to({ alpha: tarAlpha }, 800);
        };
        EffectManager.prototype.beAttackedResizeHandler = function (w, h) {
            if (this.imgAttack && this.imgAttack.parent.contains(this.imgAttack)) {
                this.imgAttack.width = w;
                this.imgAttack.height = h;
            }
        };
        return EffectManager;
    }(egret.Sprite));
    mg.EffectManager = EffectManager;
    __reflect(EffectManager.prototype, "mg.EffectManager");
})(mg || (mg = {}));
