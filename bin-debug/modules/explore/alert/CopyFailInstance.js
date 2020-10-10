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
var copy;
(function (copy) {
    var CopyFailInstance = (function (_super) {
        __extends(CopyFailInstance, _super);
        function CopyFailInstance() {
            return _super.call(this) || this;
        }
        Object.defineProperty(CopyFailInstance, "instance", {
            get: function () {
                if (!CopyFailInstance._instance) {
                    CopyFailInstance._instance = new CopyFailInstance();
                }
                return CopyFailInstance._instance;
            },
            enumerable: true,
            configurable: true
        });
        CopyFailInstance.prototype.add = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._copyFailTipView) {
                this._copyFailTipView = new copy.CopyFailTipView();
            }
            this._copyFailTipView.x = mg.stageManager.stageWidth / 2 - this._copyFailTipView.width / 2;
            this._copyFailTipView.y = mg.stageManager.stageHeight / 2 - this._copyFailTipView.height / 2;
            (_a = this._copyFailTipView).enter.apply(_a, [caller, method].concat(args));
            if (!this._black) {
                this._black = new eui.Image();
                this._black.source = 'uiMain_json.img_main_graybg1';
                this._black.alpha = 0.8;
                this._black.scale9Grid = new egret.Rectangle(8, 8, 8, 8);
            }
            this._black.width = mg.stageManager.stageWidth;
            this._black.height = mg.stageManager.stageHeight;
            if (this._black)
                this.addChild(this._black);
            if (this._copyFailTipView)
                this.addChild(this._copyFailTipView);
            mg.layerManager.mainUITop.addChild(this);
            if (this._black)
                this._black.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            this.dispatchEventWith(copy.CopyFailInstance.SHOW_OR_HIED_FAILVIEW);
            var _a;
        };
        CopyFailInstance.prototype.remove = function () {
            if (this._black)
                this._black.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            if (this._copyFailTipView) {
                if (this._copyFailTipView.parent) {
                    this._copyFailTipView.parent.removeChild(this._copyFailTipView);
                }
                this._copyFailTipView.exit();
                this._copyFailTipView = null;
            }
            if (this._black && this._black.parent) {
                this._black.parent.removeChild(this._black);
                this._black = null;
            }
            if (this && this.parent) {
                this.parent.removeChild(this);
            }
            this.dispatchEventWith(copy.CopyFailInstance.SHOW_OR_HIED_FAILVIEW);
            GameModels.scene.removeEndGameDataFromList();
        };
        CopyFailInstance.prototype.closeHandler = function () {
            if (this._copyFailTipView) {
                this._copyFailTipView.close();
            }
        };
        Object.defineProperty(CopyFailInstance.prototype, "copyFailTipView", {
            get: function () {
                return this._copyFailTipView;
            },
            enumerable: true,
            configurable: true
        });
        CopyFailInstance.SHOW_OR_HIED_FAILVIEW = "SHOW_OR_HIED_FAILVIEW";
        return CopyFailInstance;
    }(egret.DisplayObjectContainer));
    copy.CopyFailInstance = CopyFailInstance;
    __reflect(CopyFailInstance.prototype, "copy.CopyFailInstance");
})(copy || (copy = {}));
