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
    var ResAnimation = (function (_super) {
        __extends(ResAnimation, _super);
        function ResAnimation() {
            return _super.call(this) || this;
        }
        ResAnimation.prototype.reset = function () {
            if (this._resData) {
                this._resData.offReference(this, this.updateResHandler);
                this._resData = null;
            }
            this.data = null;
            this._resId = undefined;
            _super.prototype.reset.call(this);
        };
        ResAnimation.prototype.setResId = function (v) {
            if (this._resId != v) {
                if (this._resData) {
                    this._resData.offReference(this, this.updateResHandler);
                    this._resData = null;
                }
                this.data = null;
                this._resId = v;
                if (this._resId) {
                    this._resData = mg.assetsManager.reciveAnimationData(game.TypeAnimaAsset.EFFECT_NORMAL, this._resId);
                    this._resData.holdReference(this, this.updateResHandler);
                }
            }
        };
        Object.defineProperty(ResAnimation.prototype, "resId", {
            get: function () {
                return this._resId;
            },
            enumerable: true,
            configurable: true
        });
        ResAnimation.prototype.updateResHandler = function (data, key) {
            if (this._resId == key) {
                this.data = data;
                if (this.data)
                    this.scale(1 / this.data.scale);
                this._timerline.currentFrame = 1;
                this.resChange();
            }
        };
        ResAnimation.prototype.resChange = function () {
            this.frameRender(this._timerline.currentFrame);
        };
        return ResAnimation;
    }(s.Animation));
    s.ResAnimation = ResAnimation;
    __reflect(ResAnimation.prototype, "s.ResAnimation");
})(s || (s = {}));
