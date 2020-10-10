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
    var TreasureIconSkin = (function (_super) {
        __extends(TreasureIconSkin, _super);
        function TreasureIconSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.TreasureIconSkin';
            return _this;
        }
        return TreasureIconSkin;
    }(base.ItemRenderer));
    ui.TreasureIconSkin = TreasureIconSkin;
    __reflect(TreasureIconSkin.prototype, "ui.TreasureIconSkin");
})(ui || (ui = {}));
