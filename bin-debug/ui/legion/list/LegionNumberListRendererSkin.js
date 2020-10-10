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
    var LegionNumberListRendererSkin = (function (_super) {
        __extends(LegionNumberListRendererSkin, _super);
        function LegionNumberListRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.LegionNumberListRendererSkin';
            return _this;
        }
        return LegionNumberListRendererSkin;
    }(base.ItemRenderer));
    ui.LegionNumberListRendererSkin = LegionNumberListRendererSkin;
    __reflect(LegionNumberListRendererSkin.prototype, "ui.LegionNumberListRendererSkin");
})(ui || (ui = {}));
