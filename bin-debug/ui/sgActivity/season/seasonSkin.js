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
    var seasonSkin = (function (_super) {
        __extends(seasonSkin, _super);
        function seasonSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'seasonSkin';
            return _this;
        }
        return seasonSkin;
    }(base.View));
    ui.seasonSkin = seasonSkin;
    __reflect(seasonSkin.prototype, "ui.seasonSkin");
})(ui || (ui = {}));
