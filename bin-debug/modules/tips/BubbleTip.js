var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tips;
(function (tips) {
    var BubbleTip = (function () {
        function BubbleTip() {
            this.autoRecover = true;
            this.toPoolTime = 0;
            this._back = new eui.Image();
            this._back.source = 'img_tips_textbg_png';
            this._back.scale9Grid = new egret.Rectangle(55, 3, 38, 25);
            this._back.width = 240;
            this._back.touchEnabled = false;
            this._labContent = new eui.Label();
            this._labContent.size = 18;
            this._labContent.textAlign = 'center';
            this._labContent.touchEnabled = false;
            this._labContent.width = 320;
            this._labContent.textColor = 0xc6b59e;
            this._labContent.stroke = 1;
            this._labContent.y = 6;
            this._labContent.x = -40;
            this._labContent.touchEnabled = false;
        }
        Object.defineProperty(BubbleTip.prototype, "x", {
            get: function () {
                return this._back.x;
            },
            set: function (v) {
                this._back.x = v;
                this._labContent.x = v - (this._isCenter ? 40 : 72);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BubbleTip.prototype, "y", {
            get: function () {
                return this._back.y;
            },
            set: function (v) {
                this._back.y = v;
                this._labContent.y = v + 6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BubbleTip.prototype, "width", {
            get: function () {
                return this._back.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BubbleTip.prototype, "height", {
            get: function () {
                return 35;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BubbleTip.prototype, "alpha", {
            set: function (v) {
                this._back.alpha = this._labContent.alpha = v;
            },
            enumerable: true,
            configurable: true
        });
        BubbleTip.prototype.add = function (box) {
            box.back.addChild(this._back);
            box.front.addChild(this._labContent);
        };
        BubbleTip.prototype.remove = function () {
            if (this._back.parent) {
                this._back.parent.removeChild(this._back);
            }
            if (this._labContent.parent) {
                this._labContent.parent.removeChild(this._labContent);
            }
        };
        BubbleTip.prototype.destory = function () {
            this.reset();
            this._back = null;
            this._labContent = null;
        };
        BubbleTip.prototype.initialize = function (text, color, isCenter) {
            if (isCenter === void 0) { isCenter = false; }
            this._labContent.text = text;
            this._labContent.textColor = color;
            this._isCenter = isCenter;
            if (this._isCenter) {
                this._labContent.size = 18;
                this._back.width = 240;
                this.x = -this.width * .5;
            }
            else {
                this._labContent.size = 16;
                this._back.width = 160;
                this.x = 0;
            }
            this.alpha = 1;
        };
        BubbleTip.prototype.reset = function () {
            utils.timer.clearAll(this);
        };
        BubbleTip.prototype.start = function (caller, method) {
            utils.timer.once(2000, this, this.startOverHandler, true, caller, method);
        };
        BubbleTip.prototype.startOverHandler = function (caller, method) {
            method.call(caller, this);
        };
        return BubbleTip;
    }());
    tips.BubbleTip = BubbleTip;
    __reflect(BubbleTip.prototype, "tips.BubbleTip", ["IMessageBoxItem", "utils.IPool"]);
})(tips || (tips = {}));
