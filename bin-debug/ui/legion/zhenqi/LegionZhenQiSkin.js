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
    var LegionZhenQiSkin = (function (_super) {
        __extends(LegionZhenQiSkin, _super);
        function LegionZhenQiSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'normal.LegionZhenQiSkin';
            return _this;
        }
        return LegionZhenQiSkin;
    }(base.View));
    ui.LegionZhenQiSkin = LegionZhenQiSkin;
    __reflect(LegionZhenQiSkin.prototype, "ui.LegionZhenQiSkin");
})(ui || (ui = {}));
