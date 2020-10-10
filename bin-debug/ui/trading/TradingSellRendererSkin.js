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
    var TradingSellRendererSkin = (function (_super) {
        __extends(TradingSellRendererSkin, _super);
        function TradingSellRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.TradingSellRendererSkin';
            return _this;
        }
        return TradingSellRendererSkin;
    }(base.ItemRenderer));
    ui.TradingSellRendererSkin = TradingSellRendererSkin;
    __reflect(TradingSellRendererSkin.prototype, "ui.TradingSellRendererSkin");
})(ui || (ui = {}));
