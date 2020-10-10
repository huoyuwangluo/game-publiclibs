var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mg;
(function (mg) {
    var RemindUpManager = (function () {
        function RemindUpManager() {
            this._remindDisplayList = [];
        }
        Object.defineProperty(RemindUpManager, "instance", {
            get: function () {
                if (!RemindUpManager._instance) {
                    RemindUpManager._instance = new RemindUpManager();
                }
                return RemindUpManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        RemindUpManager.prototype.initialize = function (stage) {
        };
        /**对显示对象显示提醒 */
        RemindUpManager.prototype.show = function (hotDisplay, resId, addTouch, playOne, offsetX, offsetY) {
            var _this = this;
            if (playOne === void 0) { playOne = true; }
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            if (this._remindDisplayList.indexOf(hotDisplay) < 0 && hotDisplay.parent && hotDisplay.visible) {
                var effect = utils.ObjectPool.from(s.AnimationSprite);
                effect.resId = resId;
                effect.touchEnabled = effect.touchChildren = false;
                var point = hotDisplay.localToGlobal(offsetX, offsetY);
                effect.x = point.x;
                effect.y = point.y;
                mg.layerManager.remind.addChild(effect);
                if (addTouch)
                    hotDisplay.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchClick, this);
                if (playOne) {
                    effect.playOnce();
                    effect.onComplete(this, function (hotDisplay, effect) {
                        _this.hide(hotDisplay, effect);
                    }, hotDisplay, effect);
                }
                else {
                    effect.play();
                }
                this._remindDisplayList.push({ display: hotDisplay, effect: effect });
            }
        };
        /**隐藏该对象的提醒 */
        RemindUpManager.prototype.hide = function (hotDisplay, effect) {
            for (var i = 0; i < this._remindDisplayList.length; i++) {
                var object = this._remindDisplayList[i];
                if (object.display == hotDisplay) {
                    if (effect && object.effect == effect || !effect) {
                        if (object.effect) {
                            if (object.effect.parent) {
                                object.effect.parent.removeChild(object.effect);
                            }
                            object.effect.stop();
                            utils.ObjectPool.to(object.effect, true);
                        }
                        object.effect = null;
                        object.display = null;
                        this._remindDisplayList.splice(i, 1);
                        return;
                    }
                }
            }
        };
        RemindUpManager.prototype.touchClick = function (e) {
            this.hide(e.currentTarget);
            e.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchClick, this);
        };
        return RemindUpManager;
    }());
    mg.RemindUpManager = RemindUpManager;
    __reflect(RemindUpManager.prototype, "mg.RemindUpManager");
})(mg || (mg = {}));
