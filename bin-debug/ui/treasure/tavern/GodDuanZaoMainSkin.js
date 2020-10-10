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
    var GodDuanZaoMainSkin = (function (_super) {
        __extends(GodDuanZaoMainSkin, _super);
        function GodDuanZaoMainSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'GodDuanZaoMainSkin';
            return _this;
        }
        return GodDuanZaoMainSkin;
    }(base.View));
    ui.GodDuanZaoMainSkin = GodDuanZaoMainSkin;
    __reflect(GodDuanZaoMainSkin.prototype, "ui.GodDuanZaoMainSkin");
})(ui || (ui = {}));
