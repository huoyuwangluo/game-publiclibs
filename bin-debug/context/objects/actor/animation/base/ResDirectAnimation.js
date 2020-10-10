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
    var ResDirectAnimation = (function (_super) {
        __extends(ResDirectAnimation, _super);
        function ResDirectAnimation() {
            var _this = _super.call(this) || this;
            _this._direct = -1;
            _this._assetDirect = -1;
            _this._autoFixedScale = true;
            _this._fullDirect = false;
            return _this;
        }
        ResDirectAnimation.prototype.initialize = function (resType, autoFlip) {
            if (autoFlip === void 0) { autoFlip = true; }
            this._resType = resType;
            this._autoFlip = autoFlip;
        };
        ResDirectAnimation.prototype.reset = function () {
            this.setResId(null);
            this._direct = -1;
            this._assetDirect = -1;
            if (this._resData) {
                this._resData.offReference(this, this.updateResHandler);
                this._resData = null;
            }
            _super.prototype.reset.call(this);
            this._fullDirect = false;
        };
        Object.defineProperty(ResDirectAnimation.prototype, "fullDirect", {
            set: function (v) {
                if (this._fullDirect != v) {
                    this._fullDirect = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResDirectAnimation.prototype, "totalFrame", {
            get: function () {
                return this._timerline.totalFrame;
            },
            set: function (value) {
                this._timerline.totalFrame = value;
            },
            enumerable: true,
            configurable: true
        });
        ResDirectAnimation.prototype.setResId = function (resId) {
            if (this._resId != resId) {
                this.dropData();
                this._resId = resId;
                this._direct = -1;
            }
        };
        Object.defineProperty(ResDirectAnimation.prototype, "direct", {
            get: function () {
                return this._direct;
            },
            set: function (value) {
                if (this._direct != value) {
                    this._direct = value;
                    if (!this._resId)
                        return;
                    var totalDirect = game.TypeAnimaAsset.getTotalDirect(this._resType);
                    this._assetDirect = TypeDirection.getAssetDirection(this._direct, totalDirect, !this._fullDirect);
                    this.dropData();
                    if (this._assetDirect != undefined) {
                        if (this._resType == game.TypeAnimaAsset.EFFECT_DIRECT_5) {
                            this._resKey = this._resId;
                            this._resData = mg.assetsManager.reciveAnimationData(this._resType, this._resId);
                        }
                        else {
                            this._resKey = this._resId + "_" + this._assetDirect;
                            this._resData = mg.assetsManager.reciveAnimationData(this._resType, this._resKey);
                        }
                        this._resData.holdReference(this, this.updateResHandler, this._assetDirect);
                    }
                    if (this._resData.isLoaded) {
                        if (this._resType == game.TypeAnimaAsset.EFFECT_DIRECT_5) {
                            this.updateResHandler(this._resData.getDirectData(this._assetDirect), this._resId, this._assetDirect);
                        }
                        else {
                            this.updateResHandler(this._resData.data, this._resId, this._assetDirect);
                        }
                    }
                    else {
                        this._resData.onComplete(this, this.updateResHandler, this._assetDirect);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        ResDirectAnimation.prototype.dropData = function () {
            if (this._resData) {
                this._resData.offReference(this, this.updateResHandler);
                this._resData = null;
            }
            this.data = null;
            this._resKey = null;
        };
        Object.defineProperty(ResDirectAnimation.prototype, "resId", {
            get: function () {
                return this._resId;
            },
            enumerable: true,
            configurable: true
        });
        ResDirectAnimation.prototype.updateResHandler = function (data, resKey, assetDirect) {
            if (this._resKey == resKey) {
                if (!data)
                    return;
                this.data = data;
                if (this._autoFixedScale)
                    this.scale(1 / this.data.scale);
                this.resChange();
            }
        };
        ResDirectAnimation.prototype.resChange = function () {
            if (this._autoFlip)
                this.fliped = TypeDirection.isNeedRevert(this._direct);
            if (this._timerline)
                this.frameRender(this.currentFrame);
        };
        return ResDirectAnimation;
    }(s.Animation));
    s.ResDirectAnimation = ResDirectAnimation;
    __reflect(ResDirectAnimation.prototype, "s.ResDirectAnimation", ["s.IDirectAnimation"]);
})(s || (s = {}));
