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
var components;
(function (components) {
    var PlayerShowAvatar = (function (_super) {
        __extends(PlayerShowAvatar, _super);
        function PlayerShowAvatar() {
            var _this = _super.call(this) || this;
            _this._wing = new eui.Image();
            _this.addChild(_this._wing);
            _this._dragon = new eui.Image();
            _this.addChild(_this._dragon);
            _this._weapon = new eui.Image();
            _this.addChild(_this._weapon);
            _this._cloth = new eui.Image();
            _this.addChild(_this._cloth);
            _this._hand = new eui.Image();
            _this.addChild(_this._hand);
            _this.touchEnabled = false;
            _this.touchChildren = false;
            return _this;
        }
        PlayerShowAvatar.prototype.reset = function () {
            this._wing.source = null;
            this._dragon.source = null;
            this._weapon.source = null;
            this._cloth.source = null;
            this._hand.source = null;
            if (this._topeffect) {
                if (this._topeffect.parent) {
                    this._topeffect.parent.removeChild(this._topeffect);
                }
                this._topeffect.stop();
                utils.ObjectPool.to(this._topeffect, true);
                this._topeffect = null;
            }
            if (this._bottomeffect) {
                if (this._bottomeffect.parent) {
                    this._bottomeffect.parent.removeChild(this._bottomeffect);
                }
                this._bottomeffect.stop();
                utils.ObjectPool.to(this._bottomeffect, true);
                this._bottomeffect = null;
            }
            if (this._loopeffect) {
                if (this._loopeffect.parent) {
                    this._loopeffect.parent.removeChild(this._loopeffect);
                }
                this._loopeffect.stop();
                utils.ObjectPool.to(this._loopeffect, true);
                this._loopeffect = null;
            }
            if (this._clotheffect) {
                if (this._clotheffect.parent) {
                    this._clotheffect.parent.removeChild(this._clotheffect);
                }
                this._clotheffect.stop();
                utils.ObjectPool.to(this._clotheffect, true);
                this._clotheffect = null;
            }
            if (this._weaponffect) {
                if (this._weaponffect.parent) {
                    this._weaponffect.parent.removeChild(this._weaponffect);
                }
                this._weaponffect.stop();
                utils.ObjectPool.to(this._weaponffect, true);
                this._weaponffect = null;
            }
            this.stopHat();
        };
        Object.defineProperty(PlayerShowAvatar.prototype, "clothResId", {
            set: function (v) {
                if (!v || v == "0")
                    return;
                if (v == "1024" || v == "1042" || v == "1114") {
                    this._cloth.source = null;
                    this.clothEffResId = v;
                    return;
                }
                var showPoint = GameModels.role.getShowPoint(parseInt(v));
                this._cloth.source = ResPath.getShowPlayerPath(v);
                this._cloth.x = showPoint.x - 600;
                this._cloth.y = showPoint.y - 600;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerShowAvatar.prototype, "clothEffResId", {
            set: function (v) {
                if (this._clotheffect) {
                    if (this._clotheffect.parent) {
                        this._clotheffect.parent.removeChild(this._clotheffect);
                    }
                    this._clotheffect.stop();
                    utils.ObjectPool.to(this._clotheffect, true);
                    this._clotheffect = null;
                }
                if (!this._clotheffect) {
                    this._clotheffect = utils.ObjectPool.from(s.AnimationSprite);
                    if (this._weaponffect) {
                        this.addChild(this._weaponffect);
                    }
                    if (this._weapon.source) {
                        this.addChild(this._weapon);
                    }
                    this.addChild(this._clotheffect);
                }
                this._clotheffect.x = 0;
                this._clotheffect.y = 30;
                this._clotheffect.frameRate = 6;
                this._clotheffect.resId = v;
                this._clotheffect.play();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerShowAvatar.prototype, "weaponResId", {
            set: function (v) {
                if (!v || v == "0")
                    return;
                if (v == "11111" || v == "11112" || v == "11113") {
                    this._weapon.source = null;
                    this.weaponEffResId = v;
                    return;
                }
                var showPoint = GameModels.role.getShowPoint(parseInt(v));
                this._weapon.source = ResPath.getShowPlayerPath(v);
                this._weapon.x = showPoint.x - 600;
                this._weapon.y = showPoint.y - 600;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerShowAvatar.prototype, "weaponEffResId", {
            set: function (v) {
                if (this._weaponffect) {
                    if (this._weaponffect.parent) {
                        this._weaponffect.parent.removeChild(this._weaponffect);
                    }
                    this._weaponffect.stop();
                    utils.ObjectPool.to(this._weaponffect, true);
                    this._weaponffect = null;
                }
                if (!this._weaponffect) {
                    this._weaponffect = utils.ObjectPool.from(s.AnimationSprite);
                    this.addChild(this._weaponffect);
                    if (this._clotheffect) {
                        this.addChild(this._clotheffect);
                    }
                    if (this._cloth.source) {
                        this.addChild(this._cloth);
                    }
                }
                this._weaponffect.x = 0;
                this._weaponffect.y = 30;
                this._weaponffect.frameRate = 6;
                this._weaponffect.resId = v;
                this._weaponffect.play();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerShowAvatar.prototype, "wingResId", {
            set: function (v) {
                if (!v || v == "0")
                    return;
                var showPoint = GameModels.role.getShowPoint(parseInt(v));
                this._wing.source = ResPath.getShowPlayerPath(v);
                this._wing.x = showPoint.x - 600;
                this._wing.y = showPoint.y - 600;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerShowAvatar.prototype, "dragonResId", {
            set: function (v) {
                if (!v || v == "0")
                    return;
                var showPoint = GameModels.role.getShowPoint(parseInt(v));
                this._dragon.source = ResPath.getShowPlayerPath(v);
                this._dragon.x = showPoint.x - 600;
                this._dragon.y = showPoint.y - 600;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerShowAvatar.prototype, "handResId", {
            set: function (v) {
                if (!v || v == "0")
                    return;
                var showPoint = GameModels.role.getShowPoint(parseInt(v));
                this._hand.source = ResPath.getShowPlayerPath(v);
                this._hand.x = showPoint.x - 600;
                this._hand.y = showPoint.y - 600;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerShowAvatar.prototype, "topResId", {
            set: function (v) {
                if (!v || v == "0")
                    return;
                if (this._topeffect) {
                    if (this._topeffect.parent) {
                        this._topeffect.parent.removeChild(this._topeffect);
                    }
                    this._topeffect.stop();
                    utils.ObjectPool.to(this._topeffect, true);
                    this._topeffect = null;
                }
                if (!this._topeffect) {
                    this._topeffect = utils.ObjectPool.from(s.AnimationSprite);
                    this.addChild(this._topeffect);
                }
                this._topeffect.x = 0;
                this._topeffect.y = 0;
                this._topeffect.resId = v;
                this._topeffect.play();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerShowAvatar.prototype, "bottomResId", {
            set: function (v) {
                if (!v || v == "0")
                    return;
                if (this._bottomeffect) {
                    if (this._bottomeffect.parent) {
                        this._bottomeffect.parent.removeChild(this._bottomeffect);
                    }
                    this._bottomeffect.stop();
                    utils.ObjectPool.to(this._bottomeffect, true);
                    this._bottomeffect = null;
                }
                if (!this._bottomeffect) {
                    this._bottomeffect = utils.ObjectPool.from(s.AnimationSprite);
                    this.addChildAt(this._bottomeffect, 0);
                }
                this._bottomeffect.x = 0;
                this._bottomeffect.y = 0;
                this._bottomeffect.resId = v;
                this._bottomeffect.play();
            },
            enumerable: true,
            configurable: true
        });
        PlayerShowAvatar.prototype.playHat = function (step) {
            this.getHatLoopeffect(step);
            if (!this._loopeffect) {
                this._loopeffect = utils.ObjectPool.from(s.AnimationSprite);
                this.addChild(this._loopeffect);
            }
            this._loopeffect.x = 0;
            this._loopeffect.y = -100;
            this.playHatLoopHandler();
        };
        PlayerShowAvatar.prototype.getHatLoopeffect = function (step) {
            switch (step) {
                case 1:
                    this._flyeffectIdAwait = "31027";
                    this._flyeffectIdRound = "31027";
                    break;
                case 2:
                    this._flyeffectIdAwait = "31028";
                    this._flyeffectIdRound = "31028";
                    break;
                case 3:
                    this._flyeffectIdAwait = "31029";
                    this._flyeffectIdRound = "31029";
                    break;
                case 4:
                    this._flyeffectIdAwait = "31030";
                    this._flyeffectIdRound = "31030";
                    break;
                case 5:
                    this._flyeffectIdAwait = "31031";
                    this._flyeffectIdRound = "31031";
                    break;
            }
        };
        PlayerShowAvatar.prototype.playHatLoopHandler = function () {
            this.playHatFlyHandler(this, function () {
                this.playHatIdelHandler(this, this.playHatLoopHandler);
            });
        };
        PlayerShowAvatar.prototype.playHatFlyHandler = function (caller, method) {
            this._loopeffect.offAllComplete();
            this._loopeffect.resId = this._flyeffectIdRound;
            this._loopeffect.playOnce();
            this._loopeffect.onComplete(caller, method);
        };
        PlayerShowAvatar.prototype.playHatIdelHandler = function (caller, method) {
            this._loopeffect.resId = null;
            this._loopeffect.offAllComplete();
            var loop = 0;
            this._loopeffect.resId = this._flyeffectIdAwait;
            this._loopeffect.gotoAndPlay(1);
            this._loopeffect.onComplete(this, function () {
                loop++;
                if (loop >= 3) {
                    method.call(caller);
                }
            });
        };
        PlayerShowAvatar.prototype.stopHat = function () {
            if (this._loopeffect) {
                if (this._loopeffect.parent) {
                    this._loopeffect.parent.removeChild(this._loopeffect);
                }
                this._loopeffect.offAllComplete();
                this._loopeffect.stop();
                utils.ObjectPool.to(this._loopeffect, true);
                this._loopeffect = null;
            }
        };
        return PlayerShowAvatar;
    }(egret.DisplayObjectContainer));
    components.PlayerShowAvatar = PlayerShowAvatar;
    __reflect(PlayerShowAvatar.prototype, "components.PlayerShowAvatar");
})(components || (components = {}));
