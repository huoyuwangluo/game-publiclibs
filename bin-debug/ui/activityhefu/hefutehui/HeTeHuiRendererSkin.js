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
    var HeTeHuiRendererSkin = (function (_super) {
        __extends(HeTeHuiRendererSkin, _super);
        function HeTeHuiRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.HeTeHuiRendererSkin';
            return _this;
        }
        return HeTeHuiRendererSkin;
    }(base.ItemRenderer));
    ui.HeTeHuiRendererSkin = HeTeHuiRendererSkin;
    __reflect(HeTeHuiRendererSkin.prototype, "ui.HeTeHuiRendererSkin");
})(ui || (ui = {}));
