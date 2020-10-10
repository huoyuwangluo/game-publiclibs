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
    var CopyWinInstance = (function (_super) {
        __extends(CopyWinInstance, _super);
        function CopyWinInstance() {
            return _super.call(this) || this;
        }
        Object.defineProperty(CopyWinInstance, "instance", {
            get: function () {
                if (!CopyWinInstance._instance) {
                    CopyWinInstance._instance = new CopyWinInstance();
                }
                return CopyWinInstance._instance;
            },
            enumerable: true,
            configurable: true
        });
        CopyWinInstance.prototype.add = function (copyWinVO) {
            if (!this._copyWinTipView) {
                this._copyWinTipView = new copy.CopyWinTipView();
            }
            this._copyWinTipView.x = mg.stageManager.stageWidth / 2 - this._copyWinTipView.width / 2;
            this._copyWinTipView.y = mg.stageManager.stageHeight / 2 - this._copyWinTipView.height / 2;
            this._copyWinTipView.enter(copyWinVO);
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
            if (this._copyWinTipView)
                this.addChild(this._copyWinTipView);
            this.visible = true;
            mg.layerManager.mainUITop.addChild(this);
            if (this._black)
                this._black.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            this.dispatchEventWith(copy.CopyWinInstance.SHOW_OR_HIED_WINVIEW);
        };
        CopyWinInstance.prototype.remove = function () {
            if (this._black)
                this._black.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            if (this._copyWinTipView) {
                this._copyWinTipView.exit();
                if (this._copyWinTipView.parent) {
                    this._copyWinTipView.parent.removeChild(this._copyWinTipView);
                }
                this._copyWinTipView = null;
            }
            if (this._black && this._black.parent) {
                this._black.parent.removeChild(this._black);
                this._black = null;
            }
            if (this && this.parent) {
                this.parent.removeChild(this);
            }
            this.dispatchEventWith(copy.CopyWinInstance.SHOW_OR_HIED_WINVIEW);
            GameModels.scene.removeEndGameDataFromList();
        };
        CopyWinInstance.prototype.closeHandler = function () {
            if (this._copyWinTipView) {
                this._copyWinTipView.close();
            }
        };
        Object.defineProperty(CopyWinInstance.prototype, "visibleView", {
            set: function (v) {
                if (this.parent && this)
                    this.visible = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyWinInstance.prototype, "copyWinTipView", {
            get: function () {
                return this._copyWinTipView;
            },
            enumerable: true,
            configurable: true
        });
        CopyWinInstance.SHOW_OR_HIED_WINVIEW = "SHOW_OR_HIED_WINVIEW";
        return CopyWinInstance;
    }(egret.DisplayObjectContainer));
    copy.CopyWinInstance = CopyWinInstance;
    __reflect(CopyWinInstance.prototype, "copy.CopyWinInstance");
})(copy || (copy = {}));
