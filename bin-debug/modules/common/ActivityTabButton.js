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
var renderer;
(function (renderer) {
    var ActivityTabButton = (function (_super) {
        __extends(ActivityTabButton, _super);
        function ActivityTabButton() {
            var _this = _super.call(this) || this;
            _this._minscale = 0.9;
            _this._sound = 'ButtonClick_1';
            _this._soundOvedrride = false;
            return _this;
        }
        ActivityTabButton.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.imgBg.source = this.data.image;
                this.labName.text = this.data.name;
            }
            else {
                this.imgBg.source = null;
                this.labName.text = "";
            }
        };
        ActivityTabButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        };
        ActivityTabButton.prototype.touchHandler = function (e) {
            egret.Tween.removeTweens(this.imgGp);
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.imgGp.scaleX = this.imgGp.scaleY = 1;
                    egret.Tween.get(this.imgGp).to({ scaleX: this._minscale, scaleY: this._minscale }, 300, utils.Ease.cubicOut);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    if (this._sound)
                        mg.soundManager.playSound(this._sound, 1, this._soundOvedrride, true);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    egret.Tween.get(this.imgGp).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.circOut);
                    if (this.stage)
                        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    break;
            }
        };
        Object.defineProperty(ActivityTabButton.prototype, "setImgIcon", {
            set: function (value) {
                this.imgBg.source = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivityTabButton.prototype, "setLabName", {
            set: function (value) {
                this.labName.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivityTabButton.prototype, "notifyData", {
            /**得到通知活动数据 */
            get: function () {
                return this._notifyData;
            },
            /**设置通知活动数据 */
            set: function (value) {
                this._notifyData = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivityTabButton.prototype, "actType", {
            /**得到活动类型 */
            get: function () {
                return this._actType;
            },
            /**设置活动类型 */
            set: function (value) {
                this._actType = value;
            },
            enumerable: true,
            configurable: true
        });
        return ActivityTabButton;
    }(ui.ActivityTabButtonSkin));
    renderer.ActivityTabButton = ActivityTabButton;
    __reflect(ActivityTabButton.prototype, "renderer.ActivityTabButton");
})(renderer || (renderer = {}));
