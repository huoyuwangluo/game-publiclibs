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
    var ActorAnimationGroup = (function (_super) {
        __extends(ActorAnimationGroup, _super);
        function ActorAnimationGroup() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this._scale = 1;
            _this._fliped = false;
            _this._parts = [];
            _this.touchEnabled = false;
            _this.touchChildren = false;
            _this.enableTimerLine();
            _this._sortInfo = TypePart.getParts();
            GameStatistics.addAnimation(_this);
            return _this;
        }
        ActorAnimationGroup.prototype.initialize = function () {
            GameStatistics.addAnimation(this);
            this._fullDirect = false;
        };
        ActorAnimationGroup.prototype.reset = function () {
            for (var _i = 0, _a = this._parts; _i < _a.length; _i++) {
                var animation = _a[_i];
                if (animation) {
                    animation.stop();
                    animation.reset();
                }
            }
            GameStatistics.removeAnimation(this);
            this._fullDirect = false;
        };
        Object.defineProperty(ActorAnimationGroup.prototype, "resId", {
            get: function () {
                var result = '';
                for (var part in this._parts) {
                    var animation = this._parts[part];
                    if (animation)
                        result += animation.resId + '.';
                }
                return result.length ? result.substring(0, result.length - 1) : result;
            },
            enumerable: true,
            configurable: true
        });
        /*** 打开时间轴渲染**/
        ActorAnimationGroup.prototype.enableTimerLine = function () {
            this._timerline = new s.TimerLine();
            this._timerline.onRender(this, this.frameRender);
        };
        ActorAnimationGroup.prototype.addPart = function (part) {
            if (!this._parts[part]) {
                this._parts[part] = utils.ObjectPool.from(s.ResDirectAnimation);
                if ((part == TypePart.EFFECT || part == TypePart.FLYEFFECT)) {
                    this._parts[part].initialize(game.TypeAnimaAsset.EFFECT_DIRECT_5, false);
                }
                else if (part == TypePart.HORSE) {
                    this._parts[part].initialize(game.TypeAnimaAsset.ACTOR_DIRECT_2, false);
                }
                else {
                    this._parts[part].initialize(game.TypeAnimaAsset.ACTOR_DIRECT_5, false);
                }
            }
            if (!this._parts[part].parent) {
                this.addChild(this._parts[part]);
            }
            this.sortPart();
        };
        ActorAnimationGroup.prototype.removePart = function (part) {
            if (this._parts[part]) {
                this._parts[part].stop();
                if (this._parts[part].parent) {
                    this._parts[part].parent.removeChild(this._parts[part]);
                }
                utils.ObjectPool.to(this._parts[part], true);
                this._parts[part] = null;
            }
            this.sortPart();
        };
        ActorAnimationGroup.prototype.hasPart = function (part) {
            return this._parts[part] && this._parts[part].parent;
        };
        ActorAnimationGroup.prototype.setPartOffsetY = function (part, offsetY) {
            if (this._parts[part]) {
                this._parts[part].setOffset(0, offsetY);
            }
        };
        ActorAnimationGroup.prototype.sortPart = function () {
            this._sortInfo.sort(this.sortHandler.bind(this));
            var index = 0;
            for (var _i = 0, _a = this._sortInfo; _i < _a.length; _i++) {
                var p = _a[_i];
                if (this._parts[p] && this._parts[p].parent) {
                    var i = this.getChildIndex(this._parts[p]);
                    if (i != index) {
                        this.swapChildrenAt(i, index);
                    }
                    index++;
                }
            }
            // var index:number=0;
            // for(var part in this._parts){
            //     if(!this._parts[part]||!this._parts[part].parent) continue;
            //     var i:number=this.getChildIndex(this._parts[part]);
            //     if(i!=index){
            //         this.swapChildrenAt(i,index);
            //     }
            //     index++;
            // }
        };
        ActorAnimationGroup.prototype.sortHandler = function (a, b) {
            var layerA = TypePart.getSortIndex(a, this._direct, this._action, this._isHorseState);
            var layerB = TypePart.getSortIndex(b, this._direct, this._action, this._isHorseState);
            return layerA > layerB ? 1 : -1;
        };
        ActorAnimationGroup.prototype.scale = function (value) {
            this._scale = this.scaleX = this.scaleY = value;
            this.updateFlip();
        };
        Object.defineProperty(ActorAnimationGroup.prototype, "fliped", {
            get: function () {
                return this._fliped;
            },
            set: function (value) {
                if (this._fliped != value) {
                    this._fliped = value;
                    this.updateFlip();
                }
            },
            enumerable: true,
            configurable: true
        });
        ActorAnimationGroup.prototype.updateFlip = function () {
            this.scaleX = (this._fliped ? -1 : 1);
        };
        ActorAnimationGroup.prototype.onCompleteOnce = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            (_a = this._timerline).onCompleteOnce.apply(_a, [caller, method].concat(args));
            var _a;
        };
        ActorAnimationGroup.prototype.onComplete = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            (_a = this._timerline).onComplete.apply(_a, [caller, method].concat(args));
            var _a;
        };
        ActorAnimationGroup.prototype.offComplete = function (caller, method) {
            this._timerline.offComplete(caller, method);
        };
        ActorAnimationGroup.prototype.offAllComplete = function () {
            this._timerline.offAllComplete();
        };
        ActorAnimationGroup.prototype.play = function () {
            this._timerline.play();
            this._timerline.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        ActorAnimationGroup.prototype.stop = function () {
            this._timerline.stop();
            this._timerline.playing ? GameStatistics.addAnimation(this) : GameStatistics.removeAnimation(this);
        };
        Object.defineProperty(ActorAnimationGroup.prototype, "action", {
            set: function (value) {
                if (this._action != value) {
                    this._action = value;
                    this.sortPart();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActorAnimationGroup.prototype, "isHorseState", {
            set: function (value) {
                if (this._isHorseState != value) {
                    this._isHorseState = value;
                    this.sortPart();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActorAnimationGroup.prototype, "direct", {
            get: function () {
                return this._direct;
            },
            set: function (value) {
                if (this._direct != value) {
                    this._direct = value;
                    this.sortPart();
                    this.fliped = TypeDirection.isNeedRevert(this._direct);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActorAnimationGroup.prototype, "fullDirect", {
            /**完整方向动画 */
            set: function (v) {
                if (this._fullDirect != v) {
                    this._fullDirect = v;
                    for (var _i = 0, _a = this._parts; _i < _a.length; _i++) {
                        var animation = _a[_i];
                        if (animation)
                            animation.fullDirect = v;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActorAnimationGroup.prototype, "frameRate", {
            get: function () {
                return this._timerline.frameRate;
            },
            set: function (value) {
                this._timerline.frameRate = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActorAnimationGroup.prototype, "frameRateScale", {
            get: function () {
                return this._timerline.frameRateScale;
            },
            set: function (value) {
                this._timerline.frameRateScale = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActorAnimationGroup.prototype, "totalFrame", {
            get: function () {
                return this._timerline.totalFrame;
            },
            set: function (value) {
                this._timerline.totalFrame = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActorAnimationGroup.prototype, "currentFrame", {
            get: function () {
                return this._timerline.currentFrame;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActorAnimationGroup.prototype, "playing", {
            get: function () {
                return this._timerline.playing;
            },
            enumerable: true,
            configurable: true
        });
        ActorAnimationGroup.prototype.playOnce = function () {
            this._timerline.playOnce();
        };
        ActorAnimationGroup.prototype.gotoAndStop = function (frame) {
            this._timerline.gotoAndStop(frame);
        };
        ActorAnimationGroup.prototype.gotoAndStopEnd = function () {
            this._timerline.gotoAndStopEnd();
        };
        ActorAnimationGroup.prototype.gotoAndPlay = function (frame) {
            this._timerline.gotoAndStop(frame);
        };
        ActorAnimationGroup.prototype.setBodyResKey = function (value) {
            if (this.hasPart(TypePart.BODY)) {
                this._parts[TypePart.BODY].setResId(value);
                this._parts[TypePart.BODY].direct = this._direct;
            }
        };
        ActorAnimationGroup.prototype.setWingResKey = function (value) {
            if (this.hasPart(TypePart.WING)) {
                this._parts[TypePart.WING].setResId(value);
                this._parts[TypePart.WING].direct = this._direct;
            }
        };
        ActorAnimationGroup.prototype.setWeaponResKey = function (value) {
            if (this.hasPart(TypePart.WEAPON)) {
                this._parts[TypePart.WEAPON].setResId(value);
                this._parts[TypePart.WEAPON].direct = this._direct;
            }
        };
        ActorAnimationGroup.prototype.setHorseResKey = function (value) {
            if (this.hasPart(TypePart.HORSE)) {
                this._parts[TypePart.HORSE].setResId(value);
                this._parts[TypePart.HORSE].direct = this._direct;
            }
        };
        ActorAnimationGroup.prototype.setShadowResKey = function (value) {
            if (this.hasPart(TypePart.SHADOW)) {
                this._parts[TypePart.SHADOW].setResId(value);
                this._parts[TypePart.SHADOW].direct = this._direct;
            }
        };
        ActorAnimationGroup.prototype.setEffectResKey = function (value) {
            if (this.hasPart(TypePart.EFFECT)) {
                this._parts[TypePart.EFFECT].setResId(value);
                this._parts[TypePart.EFFECT].direct = this._direct;
            }
        };
        ActorAnimationGroup.prototype.setFlyEffectResKey = function (value) {
            if (this.hasPart(TypePart.FLYEFFECT)) {
                this._parts[TypePart.FLYEFFECT].setResId(value);
                this._parts[TypePart.FLYEFFECT].direct = this._direct;
            }
        };
        ActorAnimationGroup.prototype.frameRender = function (frame) {
            for (var _i = 0, _a = this._parts; _i < _a.length; _i++) {
                var animation = _a[_i];
                if (animation)
                    animation.frameRender(frame);
            }
        };
        return ActorAnimationGroup;
    }(egret.Sprite));
    s.ActorAnimationGroup = ActorAnimationGroup;
    __reflect(ActorAnimationGroup.prototype, "s.ActorAnimationGroup", ["s.IAnimation", "utils.IPool", "egret.DisplayObject", "s.IAnimationStatis"]);
})(s || (s = {}));
