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
    var RemindLowManager = (function (_super) {
        __extends(RemindLowManager, _super);
        function RemindLowManager() {
            var _this = _super.call(this) || this;
            _this._enabled = true;
            _this._instances = {};
            return _this;
        }
        Object.defineProperty(RemindLowManager, "instance", {
            get: function () {
                if (!RemindLowManager._instance) {
                    RemindLowManager._instance = new RemindLowManager();
                }
                return RemindLowManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化
         */
        RemindLowManager.prototype.initialize = function (stage) {
            this._black = new egret.Sprite();
            this._black.touchEnabled = true;
            mg.layerManager.mainUITop.addChild(this);
            mg.stageManager.onResize(this, this.resizeHandler, true);
        };
        RemindLowManager.prototype.showAlert = function (alertClass, isTouchClose) {
            if (isTouchClose === void 0) { isTouchClose = true; }
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var alert = this.getInstance(alertClass);
            if (this._current) {
                this._current.hide();
            }
            this._current = alert;
            if (this._current) {
                this.showBlack(isTouchClose, alert);
                alert.once(egret.Event.CLOSE, this.closeAlertHandler, this);
                this.addChild(alert);
                (_a = alert.show).call.apply(_a, [alert].concat(args));
                mg.stageManager.resize(this, this.resizeHandler);
                return alert;
            }
            return null;
            var _a;
        };
        RemindLowManager.prototype.closeALert = function (alertClass) {
            if (alertClass === void 0) { alertClass = null; }
            if (!alertClass) {
                this.closeAlertHandler();
                return;
            }
            var alert = this.getInstance(alertClass);
            if (alert == this._current) {
                this.closeAlertHandler();
            }
        };
        RemindLowManager.prototype.closeAlertHandler = function (e) {
            if (e === void 0) { e = null; }
            if (!e && this._current) {
                this._current.hide();
                this.removeBlack();
                this._current = null;
                return;
            }
            if (e) {
                e.target.hide();
                if (this._current == e.target) {
                    this._current = null;
                    this.removeBlack();
                }
            }
        };
        RemindLowManager.prototype.getInstance = function (alertClass) {
            var className = egret.getQualifiedClassName(alertClass);
            if (!this._instances[className]) {
                this._instances[className] = new alertClass();
            }
            return this._instances[className];
        };
        Object.defineProperty(RemindLowManager.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            set: function (value) {
                this._enabled = value;
            },
            enumerable: true,
            configurable: true
        });
        RemindLowManager.prototype.onClose = function (e) {
            this.closeAlertHandler();
        };
        RemindLowManager.prototype.showBlack = function (isTouchHide, alert) {
            if (isTouchHide === void 0) { isTouchHide = true; }
            this.addChildAt(this._black, 0);
            this.resizeBlack();
            egret.Tween.removeTweens(this._black);
            // if (alert instanceof PetHatchFinsh) {
            // 	egret.Tween.get(this._black).to({ alpha: 1 }, 300);
            // } else {
            // 	egret.Tween.get(this._black).to({ alpha: 0.7 }, 300);
            // }
            egret.Tween.get(this._black).to({ alpha: 0.7 }, 300);
            if (isTouchHide)
                this._black.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        RemindLowManager.prototype.removeBlack = function (force) {
            if (force === void 0) { force = false; }
            this._black.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            egret.Tween.removeTweens(this._black);
            if (force) {
                if (this._black.parent) {
                    this._black.parent.removeChild(this._black);
                }
                return;
            }
            egret.Tween.get(this._black).to({ alpha: 0 }, 300 / 2).call(function () {
                egret.Tween.removeTweens(this._black);
                if (this._black.parent) {
                    this._black.parent.removeChild(this._black);
                }
            }, this);
        };
        RemindLowManager.prototype.resizeBlack = function () {
            this._black.graphics.clear();
            this._black.graphics.beginFill(0x0, 1);
            this._black.graphics.drawRect(0, 0, mg.stageManager.stageWidth, mg.stageManager.stageHeight);
            this._black.graphics.endFill();
        };
        RemindLowManager.prototype.resizeHandler = function (w, h) {
            if (this._current) {
                this._current.x = w * .5;
                this._current.y = h * .5;
                this._current.alpha = this._current.scaleX = this._current.scaleY = 0;
                egret.Tween.get(this._current).to({ x: (w - this._current.width) * .5, y: (h - this._current.height) * .5, scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.backOut);
                this.resizeBlack();
            }
        };
        return RemindLowManager;
    }(egret.Sprite));
    mg.RemindLowManager = RemindLowManager;
    __reflect(RemindLowManager.prototype, "mg.RemindLowManager");
})(mg || (mg = {}));
