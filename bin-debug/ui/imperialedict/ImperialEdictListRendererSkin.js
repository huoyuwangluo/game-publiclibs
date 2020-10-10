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
    var ImperialEdictListRendererSkin = (function (_super) {
        __extends(ImperialEdictListRendererSkin, _super);
        function ImperialEdictListRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.ImperialEdictListRendererSkin';
            return _this;
        }
        return ImperialEdictListRendererSkin;
    }(base.ItemRenderer));
    ui.ImperialEdictListRendererSkin = ImperialEdictListRendererSkin;
    __reflect(ImperialEdictListRendererSkin.prototype, "ui.ImperialEdictListRendererSkin");
})(ui || (ui = {}));
