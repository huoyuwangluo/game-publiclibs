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
    var ResDirectPackAnimation = (function (_super) {
        __extends(ResDirectPackAnimation, _super);
        function ResDirectPackAnimation() {
            var _this = _super.call(this) || this;
            _this._direct = -1;
            _this._assetDirect = -1;
            _this._autoFixedScale = true;
            _this._fullDirect = false;
            return _this;
        }
        ResDirectPackAnimation.prototype.initialize = function (resType, autoFlip) {
            if (autoFlip === void 0) { autoFlip = true; }
            this._resType = resType;
            this._autoFlip = autoFlip;
        };
        Object.defineProperty(ResDirectPackAnimation.prototype, "fullDirect", {
            set: function (v) {
                if (this._fullDirect != v) {
                    this._fullDirect = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        ResDirectPackAnimation.prototype.reset = function () {
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
        Object.defineProperty(ResDirectPackAnimation.prototype, "totalFrame", {
            get: function () {
                return this._timerline.totalFrame;
            },
            set: function (value) {
                this._timerline.totalFrame = value;
            },
            enumerable: true,
            configurable: true
        });
        ResDirectPackAnimation.prototype.setResId = function (resId) {
            if (this._resId != resId) {
                if (this._resData) {
                    this._resData.offReference(this, this.updateResHandler);
                    this._resData = null;
                }
                this.data = null;
                this._resId = resId;
                if (this._resId) {
                    this._resData = mg.assetsManager.reciveAnimationData(this._resType, this._resId);
                    this._resData.holdReference(this, this.updateResHandler, this._assetDirect);
                }
                this._direct = -1;
            }
        };
        Object.defineProperty(ResDirectPackAnimation.prototype, "direct", {
            get: function () {
                return this._direct;
            },
            set: function (value) {
                if (this._direct != value) {
                    this._direct = value;
                    var totalDirect = game.TypeAnimaAsset.getTotalDirect(this._resType);
                    this._assetDirect = TypeDirection.getAssetDirection(this._direct, totalDirect, !this._fullDirect);
                    //this._assetDirect=TypeDirection.getAssetDirection(this._direct,totalDirect);
                    if (this._resData) {
                        if (this._assetDirect == undefined)
                            return;
                        if (this._resData.isLoaded) {
                            this.updateResHandler(this._resData.getDirectData(this._assetDirect), this._resId, this._assetDirect);
                        }
                        else {
                            this._resData.onComplete(this, this.updateResHandler, this._assetDirect);
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResDirectPackAnimation.prototype, "resId", {
            get: function () {
                return this._resId;
            },
            enumerable: true,
            configurable: true
        });
        ResDirectPackAnimation.prototype.updateResHandler = function (data, resId, assetDirect) {
            if (this._resId == resId && this._assetDirect == assetDirect) {
                if (!data)
                    return;
                this.data = data;
                if (this._autoFixedScale)
                    this.scale(1 / this.data.scale);
                this.resChange();
            }
        };
        ResDirectPackAnimation.prototype.resChange = function () {
            if (this._autoFlip)
                this.fliped = TypeDirection.isNeedRevert(this._direct);
            if (this._timerline)
                this.frameRender(this.currentFrame);
        };
        return ResDirectPackAnimation;
    }(s.Animation));
    s.ResDirectPackAnimation = ResDirectPackAnimation;
    __reflect(ResDirectPackAnimation.prototype, "s.ResDirectPackAnimation", ["s.IDirectAnimation"]);
})(s || (s = {}));
