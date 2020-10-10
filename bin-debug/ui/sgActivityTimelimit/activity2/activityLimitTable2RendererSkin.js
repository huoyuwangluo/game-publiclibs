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
    var activityLimitTable2RendererSkin = (function (_super) {
        __extends(activityLimitTable2RendererSkin, _super);
        function activityLimitTable2RendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.activityLimitTable2RendererSkin';
            return _this;
        }
        return activityLimitTable2RendererSkin;
    }(base.ItemRenderer));
    ui.activityLimitTable2RendererSkin = activityLimitTable2RendererSkin;
    __reflect(activityLimitTable2RendererSkin.prototype, "ui.activityLimitTable2RendererSkin");
})(ui || (ui = {}));
