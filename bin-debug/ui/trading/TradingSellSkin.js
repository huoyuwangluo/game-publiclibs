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
    var TradingSellSkin = (function (_super) {
        __extends(TradingSellSkin, _super);
        function TradingSellSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.TradingSellSkin';
            return _this;
        }
        return TradingSellSkin;
    }(base.View));
    ui.TradingSellSkin = TradingSellSkin;
    __reflect(TradingSellSkin.prototype, "ui.TradingSellSkin");
})(ui || (ui = {}));
