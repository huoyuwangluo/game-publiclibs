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
    var activityLimitTable3RendererSkin = (function (_super) {
        __extends(activityLimitTable3RendererSkin, _super);
        function activityLimitTable3RendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.activityLimitTable3RendererSkin';
            return _this;
        }
        return activityLimitTable3RendererSkin;
    }(base.ItemRenderer));
    ui.activityLimitTable3RendererSkin = activityLimitTable3RendererSkin;
    __reflect(activityLimitTable3RendererSkin.prototype, "ui.activityLimitTable3RendererSkin");
})(ui || (ui = {}));
