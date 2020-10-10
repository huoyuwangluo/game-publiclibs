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
        var HeFuFanBei = (function (_super) {
            __extends(HeFuFanBei, _super);
            function HeFuFanBei() {
                return _super.call(this) || this;
            }
            HeFuFanBei.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            HeFuFanBei.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this.btnChongzhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            HeFuFanBei.prototype.exit = function () {
                this.btnChongzhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
            };
            HeFuFanBei.prototype.onBuyClick = function (e) {
                mg.uiManager.show(MallScene);
            };
            return HeFuFanBei;
        }(ui.HeFuFanBeiSkin));
        activity.HeFuFanBei = HeFuFanBei;
        __reflect(HeFuFanBei.prototype, "view.activity.HeFuFanBei", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
