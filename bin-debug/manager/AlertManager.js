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
    var AlertManager = (function (_super) {
        __extends(AlertManager, _super);
        function AlertManager() {
            var _this = _super.call(this) || this;
            _this._enabled = true;
            _this._instances = {};
            return _this;
        }
        Object.defineProperty(AlertManager, "instance", {
            get: function () {
                if (!AlertManager._instance) {
                    AlertManager._instance = new AlertManager();
                }
                return AlertManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化
         */
        AlertManager.prototype.initialize = function (stage) {
            this._messageBox = new MessageBox(10);
            mg.layerManager.notice.addChild(this._messageBox);
            this._messageBox.speed = 100;
            this._sourceBox = new MessageBox(20);
            mg.layerManager.tip.addChild(this._sourceBox);
            this._propertyBox = new MessageBox(10);
            this._propertyBox.speed = 100;
            mg.layerManager.tip.addChild(this._propertyBox);
            this._black = new egret.Sprite();
            this._black.touchEnabled = true;
            mg.layerManager.alert.addChild(this);
            mg.stageManager.onResize(this, this.resizeHandler, true);
        };
        /**勾选记录提示，勾选记录状态后同时存在确认和取消方法默认执行确认*/
        AlertManager.prototype.showCheckAlert = function (labContent, type, selectType, cancelHandler, okHandler, bol, data, isTextFlow, hideClose, handlerClose) {
            if (cancelHandler === void 0) { cancelHandler = null; }
            if (okHandler === void 0) { okHandler = null; }
            if (bol === void 0) { bol = false; }
            if (data === void 0) { data = null; }
            if (isTextFlow === void 0) { isTextFlow = false; }
            if (hideClose === void 0) { hideClose = false; }
            if (handlerClose === void 0) { handlerClose = true; }
            var currentType = 0;
            if (typeof (selectType) == "number") {
                currentType = selectType;
            }
            else {
                TypeCheck.updateCheckTypeListStr(selectType);
                currentType = parseInt(selectType.split("_")[0]);
            }
            if (!TypeCheck.getCheckType(currentType)) {
                mg.alertManager.showAlert(CheckAlert, false, true, labContent, type, currentType, okHandler, cancelHandler, bol, data, isTextFlow, handlerClose, hideClose);
            }
            else {
                if (okHandler)
                    okHandler.once = true;
                if (okHandler) {
                    okHandler.runWith(data);
                    okHandler = null;
                    return;
                }
                if (cancelHandler)
                    cancelHandler.once = true;
                if (cancelHandler) {
                    cancelHandler.run();
                    cancelHandler = null;
                }
            }
        };
        AlertManager.prototype.showAlert = function (alertClass, isTouchClose, backAlpha) {
            if (isTouchClose === void 0) { isTouchClose = true; }
            if (backAlpha === void 0) { backAlpha = true; }
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var alert = this.getInstance(alertClass);
            if (this._current) {
                this._current.hide();
            }
            this._current = alert;
            if (this._current) {
                this.showBlack(isTouchClose, backAlpha, alert);
                alert.once(egret.Event.CLOSE, this.closeAlertHandler, this);
                this.addChild(alert);
                (_a = alert.show).call.apply(_a, [alert].concat(args));
                mg.stageManager.resize(this, this.resizeHandler);
                this.dispatchEventWith(mg.AlertManager.SHOW_OR_HIED_ALERT);
                return alert;
            }
            return null;
            var _a;
        };
        AlertManager.prototype.closeALert = function (alertClass) {
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
        AlertManager.prototype.closeAlertHandler = function (e) {
            if (e === void 0) { e = null; }
            if (!e && this._current) {
                this._current.hide();
                this.removeBlack();
                this._current = null;
                this.dispatchEventWith(mg.AlertManager.SHOW_OR_HIED_ALERT);
                return;
            }
            if (e) {
                e.target.hide();
                if (this._current == e.target) {
                    this._current = null;
                    this.removeBlack();
                    this.dispatchEventWith(mg.AlertManager.SHOW_OR_HIED_ALERT);
                }
            }
        };
        AlertManager.prototype.getInstance = function (alertClass) {
            var className = egret.getQualifiedClassName(alertClass);
            if (!this._instances[className]) {
                this._instances[className] = new alertClass();
            }
            return this._instances[className];
        };
        /**
         * 输出信息
         * @param info
         * @param params
         * @param fix
         * @param color
         * @param point
         */
        AlertManager.prototype.tip = function (content, color) {
            if (color === void 0) { color = 0xCFC9BE; }
            if (!this._enabled)
                return;
            if (content == Language.J_WJXDSLYM) {
                mg.alertManager.showAlert(dialog.list.PetListHome, true, true);
            }
            if (content == Language.J_BBYM) {
                utils.CheckUtil.checkBagSmelting();
            }
            this._messageBox.add(tips.BubbleTip, content, color, true);
        };
        AlertManager.prototype.propertyTip = function (type, value) {
            if (!this._enabled)
                return;
            //if (value <= 0) return;
            //this._propertyBox.add(tips.BubblePropertyTip, false, type, value);
        };
        AlertManager.prototype.petPropertyTip = function (type, value) {
            if (!this._enabled)
                return;
            //if (value <= 0) return;
            //this._propertyBox.add(tips.BubblePropertyTip, true, type, value);
        };
        AlertManager.prototype.sourceTip = function (content, color) {
            if (color === void 0) { color = 0xCFC9BE; }
            if (!this._enabled)
                return;
            this._sourceBox.add(tips.BubbleTip, content, color, false);
        };
        AlertManager.prototype.sourceAnimalTip = function (animal) {
            if (!this._enabled)
                return;
            this._messageBox.add(tips.NotifyAnimalSkillTips, animal);
        };
        Object.defineProperty(AlertManager.prototype, "enabled", {
            // public function info(content:String):void{
            // 	if(!_enabled) return;
            // 	_messageBox.add(ObjectPool.from(MessageItem,"init",{text:content,color:0x11ff00}) as MessageItem);
            // }
            // public function error(content:String):void{
            // 	if(!_enabled) return;
            // 	_messageBox.add(ObjectPool.from(MessageItem,"init",{text:content,color:0xff0000}) as MessageItem);
            // }
            get: function () {
                return this._enabled;
            },
            set: function (value) {
                this._enabled = value;
            },
            enumerable: true,
            configurable: true
        });
        AlertManager.prototype.onClose = function (e) {
            this.closeAlertHandler();
        };
        AlertManager.prototype.showBlack = function (isTouchHide, backAlpha, alert) {
            if (isTouchHide === void 0) { isTouchHide = true; }
            if (backAlpha === void 0) { backAlpha = true; }
            this.addChildAt(this._black, 0);
            this.resizeBlack();
            egret.Tween.removeTweens(this._black);
            egret.Tween.get(this._black).to({ alpha: backAlpha ? 0.7 : 1 }, 300);
            if (isTouchHide)
                this._black.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        AlertManager.prototype.removeBlack = function (force) {
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
        AlertManager.prototype.resizeBlack = function () {
            this._black.graphics.clear();
            this._black.graphics.beginFill(0x0, 1);
            this._black.graphics.drawRect(0, 0, mg.stageManager.stageWidth, mg.stageManager.stageHeight);
            this._black.graphics.endFill();
        };
        AlertManager.prototype.resizeHandler = function (w, h) {
            if (this._current) {
                this._current.x = w * .5;
                this._current.y = h * .5;
                this._current.alpha = this._current.scaleX = this._current.scaleY = 0;
                egret.Tween.get(this._current).to({ x: (w - this._current.width) * .5, y: (h - this._current.height) * .5, scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.backOut);
                this.resizeBlack();
            }
            this._sourceBox.x = 0;
            this._sourceBox.y = h - 350;
            this._messageBox.x = w * .5;
            this._messageBox.y = h - 420;
            this._propertyBox.x = 0;
            this._propertyBox.y = h - 300;
        };
        Object.defineProperty(AlertManager.prototype, "current", {
            get: function () {
                return this._current;
            },
            enumerable: true,
            configurable: true
        });
        AlertManager.SHOW_OR_HIED_ALERT = "SHOW_OR_HIED_ALERT";
        return AlertManager;
    }(egret.Sprite));
    mg.AlertManager = AlertManager;
    __reflect(AlertManager.prototype, "mg.AlertManager", ["mg.ITipManager"]);
})(mg || (mg = {}));
