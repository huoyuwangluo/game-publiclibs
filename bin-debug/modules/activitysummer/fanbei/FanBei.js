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
var view;
(function (view) {
    var activity;
    (function (activity) {
        var FanBei = (function (_super) {
            __extends(FanBei, _super);
            function FanBei() {
                return _super.call(this) || this;
            }
            FanBei.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            FanBei.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this.btnChongzhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            FanBei.prototype.exit = function () {
                this.btnChongzhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            FanBei.prototype.onBuyClick = function (e) {
                mg.uiManager.show(MallScene);
            };
            return FanBei;
        }(ui.FanBeiSkin));
        activity.FanBei = FanBei;
        __reflect(FanBei.prototype, "view.activity.FanBei", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
