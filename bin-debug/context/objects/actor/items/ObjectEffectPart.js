var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var ObjectEffectPart = (function () {
        function ObjectEffectPart(parent, body, effectPos) {
            if (effectPos === void 0) { effectPos = 3; }
            this._effectPos = 3; //头顶1｜身上2｜脚下3
            this._effectOffsetY = 0;
            this._parent = parent;
            this._body = body;
            this._effectPos = effectPos;
            if (effectPos == 0) {
                if (body instanceof s.GamePlayer) {
                    this._effectOffsetY = -body.titleHeight - 100;
                }
                else {
                    this._effectOffsetY = -body.titleHeight - 50;
                }
            }
            else if (effectPos == 1) {
                this._effectOffsetY = -body.titleHeight;
            }
            else if (effectPos == 2) {
                this._effectOffsetY = -body.titleHeight / 2;
            }
        }
        /**身体外包裹特效**/
        ObjectEffectPart.prototype.show = function (resId, alpha, loop, caller, method, frameRate) {
            if (alpha === void 0) { alpha = 1; }
            if (loop === void 0) { loop = true; }
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            if (frameRate === void 0) { frameRate = 12; }
            this._resId = resId;
            this._loop = loop;
            this._alpha = alpha;
            this._frameRate = frameRate;
            this.update();
            if (this._effect && this._effect.parent) {
                if (TypeGame.isFormationGame()) {
                    this._effect.scaleX = this._effect.scaleY = 1.5;
                }
                else {
                    this._effect.scaleX = this._effect.scaleY = 1.0;
                }
                if (!loop) {
                    this._effect.playOnce();
                    if (caller != null) {
                        this._effect.onCompleteOnce(caller, method);
                    }
                    else {
                        this._effect.onCompleteOnce(this, this.hide);
                    }
                }
                else {
                    this._effect.play();
                }
            }
        };
        ObjectEffectPart.prototype.hide = function () {
            if (this._resId != null) {
                this._resId = null;
            }
            this.update();
        };
        ObjectEffectPart.prototype.update = function () {
            if (!this._body.scene || !this._resId || !this._body.avatarEnabled) {
                if (this._effect) {
                    this._effect.offAllComplete();
                    this._effect.stop();
                    this._effect.reset();
                    if (this._effect.parent) {
                        this._effect.parent.removeChild(this._effect);
                    }
                }
            }
            else {
                if (!this._effect) {
                    this._effect = new s.AnimationSprite();
                    this._effect.frameRate = this._frameRate;
                    this._effect.offAllComplete();
                }
                this._effect.alpha = this._alpha;
                //this._effect.offAllComplete();
                this._effect.resId = this._resId;
                this._parent.addChild(this._effect);
                if (this._loop)
                    this._effect.play();
                this.updatePos();
            }
        };
        ObjectEffectPart.prototype.updatePos = function () {
            if (!this._effect || !this._effect.parent)
                return;
            this._effect.x = this._body.x;
            this._effect.y = this._body.y + this._effectOffsetY;
        };
        Object.defineProperty(ObjectEffectPart.prototype, "resId", {
            get: function () {
                return this._resId;
            },
            enumerable: true,
            configurable: true
        });
        return ObjectEffectPart;
    }());
    s.ObjectEffectPart = ObjectEffectPart;
    __reflect(ObjectEffectPart.prototype, "s.ObjectEffectPart");
})(s || (s = {}));
