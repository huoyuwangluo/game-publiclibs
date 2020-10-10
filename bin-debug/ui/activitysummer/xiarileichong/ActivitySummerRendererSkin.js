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
var ui;
(function (ui) {
    var ActivitySummerRendererSkin = (function (_super) {
        __extends(ActivitySummerRendererSkin, _super);
        function ActivitySummerRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.ActivitySummerRendererSkin';
            return _this;
        }
        return ActivitySummerRendererSkin;
    }(base.ItemRenderer));
    ui.ActivitySummerRendererSkin = ActivitySummerRendererSkin;
    __reflect(ActivitySummerRendererSkin.prototype, "ui.ActivitySummerRendererSkin");
})(ui || (ui = {}));
