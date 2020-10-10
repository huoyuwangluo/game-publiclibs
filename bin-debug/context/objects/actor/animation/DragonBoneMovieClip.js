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
    var DragonBoneMovieClip = (function (_super) {
        __extends(DragonBoneMovieClip, _super);
        function DragonBoneMovieClip(type) {
            if (type === void 0) { type = 'MovieClip'; }
            var _this = _super.call(this) || this;
            _this._orderId = 0;
            _this._isPlay = false;
            _this._playTimes = 0;
            _this._timeScale = 1.0;
            _this._replaceSlotInfos = [];
            _this._type = type;
            _this.touchEnabled = _this.touchChildren = false;
            DragonBoneMovieClip._autoOrderTag++;
            _this._orderId = DragonBoneMovieClip._autoOrderTag;
            return _this;
        }
        Object.defineProperty(DragonBoneMovieClip.prototype, "resId", {
            get: function () {
                return this._resId;
            },
            set: function (value) {
                if (this._resId != value) {
                    this._resId = value;
                    mg.dragonbonesManager.createAnimation(this, this.updateAnimation, this._resId, this._type);
                }
            },
            enumerable: true,
            configurable: true
        });
        DragonBoneMovieClip.prototype.updateAnimation = function (animation) {
            if (this._animation) {
                this._animation.animation.reset();
                //this._animation.dispose();
                if (this._animation.parent) {
                    this._animation.parent.removeChild(this._animation);
                }
                this._animation.removeEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.animationCompleteHandler, this);
                this._animation.removeEventListener(dragonBones.EventObject.COMPLETE, this.animationCompleteHandler, this);
            }
            this._animation = animation;
            if (this._animation) {
                this._animation.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.animationCompleteHandler, this);
                this._animation.addEventListener(dragonBones.EventObject.COMPLETE, this.animationCompleteHandler, this);
                this.addChild(this._animation);
                this.updateAnimationState();
            }
            this.updateReplaceSlot();
        };
        DragonBoneMovieClip.prototype.play = function (name, times) {
            if (times === void 0) { times = 0; }
            if (this._isPlay)
                return;
            this._animationName = name;
            this._playTimes = times ? times : 9999999;
            this._isPlay = true;
            this.updateAnimationState();
        };
        DragonBoneMovieClip.prototype.stop = function () {
            if (!this._isPlay)
                return;
            this._isPlay = false;
            this.updateAnimationState();
        };
        DragonBoneMovieClip.prototype.destory = function () {
            //mg.dragonbonesManager.removeAnimation(this._resId);
            mg.dragonbonesManager.removeAnimation(this._orderId + "");
            if (this._animation) {
                this._animation.animation.reset();
                this._animation.dispose(true);
                if (this._animation.parent) {
                    this._animation.parent.removeChild(this._animation);
                }
                this._animation.removeEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.animationCompleteHandler, this);
                this._animation.removeEventListener(dragonBones.EventObject.COMPLETE, this.animationCompleteHandler, this);
            }
            mg.dragonbonesManager.destoryAnimation(this._resId);
            this._animation = null;
            this._resId = null;
            this._orderId = 0;
        };
        Object.defineProperty(DragonBoneMovieClip.prototype, "timeScale", {
            set: function (value) {
                this._timeScale = value;
            },
            enumerable: true,
            configurable: true
        });
        DragonBoneMovieClip.prototype.playOnce = function (name) {
            this.stop();
            if (this._isPlay)
                return;
            this._animationName = name;
            this._playTimes = 1;
            this._isPlay = true;
            this.updateAnimationState();
        };
        DragonBoneMovieClip.prototype.replaceSlotBitmap = function (slotName, imgSrc) {
            this._replaceSlotInfos.push("bitmap");
            this._replaceSlotInfos.push(slotName);
            this._replaceSlotInfos.push(imgSrc);
            //this.updateReplaceSlot();
        };
        DragonBoneMovieClip.prototype.replaceSlotImage = function (slotName, imgSrc) {
            this._replaceSlotInfos.push("image");
            this._replaceSlotInfos.push(slotName);
            this._replaceSlotInfos.push(imgSrc);
            //this.updateReplaceSlot();
        };
        DragonBoneMovieClip.prototype.replaceSlotTextField = function (slotName, txt, fontType) {
            if (fontType === void 0) { fontType = 0; }
            this._replaceSlotInfos.push("text" + fontType);
            this._replaceSlotInfos.push(slotName);
            this._replaceSlotInfos.push(txt);
            //this.updateReplaceSlot();
        };
        DragonBoneMovieClip.prototype.replaceSlotDisplayIndex = function (slotName, index) {
            this._replaceSlotInfos.push("index");
            this._replaceSlotInfos.push(slotName);
            this._replaceSlotInfos.push("" + index);
            //this.updateReplaceSlot();
        };
        DragonBoneMovieClip.prototype.updateReplaceSlot = function () {
            var obj = {};
            if (this._animation && this._animation.armature && this._replaceSlotInfos.length > 0) {
                var _loop_1 = function () {
                    type = this_1._replaceSlotInfos[i];
                    slotName = this_1._replaceSlotInfos[i + 1];
                    replaceStr = this_1._replaceSlotInfos[i + 2];
                    slot = this_1._animation.armature.getSlot(slotName);
                    if (slot == null)
                        return "continue";
                    if (type == "bitmap") {
                        var b = new egret.Bitmap();
                        b.texture = RES.getRes(replaceStr);
                        //b.x = slot.display.x;
                        //b.y = slot.display.y;
                        b.anchorOffsetX = b.width >> 1;
                        b.anchorOffsetY = b.height >> 1;
                        slot.display = b;
                    }
                    else if (type == "image") {
                        var img_1 = new eui.Image();
                        img_1.source = replaceStr;
                        img_1.once(egret.Event.COMPLETE, function (evt) {
                            var tImg = evt.currentTarget;
                            if (tImg) {
                                img_1.anchorOffsetX = tImg.width >> 1;
                                img_1.anchorOffsetY = tImg.height >> 1;
                            }
                            //img.anchorOffsetX = slot.display.width>>1;
                            //img.anchorOffsetY = slot.display.height>>1;
                        }, this_1);
                        //img.x = slot.display.x;
                        //img.y = slot.display.y;
                        //img.anchorOffsetX = slot.display.width>>1;
                        //img.anchorOffsetY = slot.display.height>>1;
                        slot.display = img_1;
                        //img.once(egret.Event.COMPLETE, function(evt:egret.Event){
                        //    img.anchorOffsetX = slot.display.width>>1;
                        //    img.anchorOffsetY = slot.display.height>>1;
                        //}, this);
                    }
                    else if (type == "text0") {
                        var tf = new egret.TextField();
                        tf.text = replaceStr;
                        tf.size = 36;
                        tf.textColor = 0xffffff;
                        tf.strokeColor = 0x3d7db8;
                        tf.stroke = 3;
                        tf.anchorOffsetX = tf.width >> 1;
                        tf.anchorOffsetY = tf.height >> 1;
                        slot.display = tf;
                    }
                    else if (type == "text1") {
                        var tf = new egret.TextField();
                        tf.text = replaceStr;
                        tf.size = 36;
                        tf.textColor = 0xffffff;
                        tf.strokeColor = 0xb52b2b;
                        tf.stroke = 3;
                        tf.anchorOffsetX = tf.width >> 1;
                        tf.anchorOffsetY = tf.height >> 1;
                        slot.display = tf;
                    }
                    else if (type == "index") {
                        tIndex = parseInt(replaceStr);
                        slot.displayIndex = tIndex;
                    }
                };
                var this_1 = this, type, slotName, replaceStr, slot, tIndex;
                for (var i = 0; i < this._replaceSlotInfos.length; i = i + 3) {
                    _loop_1();
                }
                this._replaceSlotInfos.splice(0, this._replaceSlotInfos.length);
                this._replaceSlotInfos = [];
            }
        };
        DragonBoneMovieClip.prototype.updateAnimationState = function () {
            if (this._isPlay) {
                if (this._animation) {
                    //if(this._animation.animation.isPlaying) return;
                    //mg.dragonbonesManager.addAnimation(this._resId,this._animation);
                    mg.dragonbonesManager.addAnimation(this._orderId + "", this._animation);
                    this._animation.animation.play(this._animationName, this._playTimes);
                    var curState = this._animation.animation.getState(this._animationName);
                    curState.timeScale = this._timeScale;
                }
            }
            else {
                if (this._animation) {
                    //if(!this._animation.animation.isPlaying) return;
                    this._animation.animation.stop(this._animationName);
                    //mg.dragonbonesManager.removeAnimation(this._resId);
                    mg.dragonbonesManager.removeAnimation(this._orderId + "");
                }
            }
        };
        DragonBoneMovieClip.prototype.onCompleteOnce = function (caller, method) {
            if (this._completeHandler) {
                this._completeHandler.recover();
                this._completeHandler = null;
            }
            this._completeHandler = utils.Handler.create(caller, method, null, true);
        };
        DragonBoneMovieClip.prototype.offCompleteOnce = function () {
            if (this._completeHandler) {
                this._completeHandler.recover();
                this._completeHandler = null;
            }
        };
        DragonBoneMovieClip.prototype.animationCompleteHandler = function (e) {
            if (this._completeHandler) {
                var handler = this._completeHandler;
                this._completeHandler = null;
                //logger.error("animationCompleteHandler");
                handler.runWith(this);
            }
        };
        DragonBoneMovieClip._autoOrderTag = 0;
        DragonBoneMovieClip.MOVIECLIP = "MovieClip";
        DragonBoneMovieClip.ARMATURE = "Armature";
        return DragonBoneMovieClip;
    }(egret.DisplayObjectContainer));
    s.DragonBoneMovieClip = DragonBoneMovieClip;
    __reflect(DragonBoneMovieClip.prototype, "s.DragonBoneMovieClip");
})(s || (s = {}));
