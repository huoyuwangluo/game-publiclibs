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
    var MainPublicNoticeSkin = (function (_super) {
        __extends(MainPublicNoticeSkin, _super);
        function MainPublicNoticeSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'skin.MainPublicNoticeSkin';
            return _this;
        }
        return MainPublicNoticeSkin;
    }(base.View));
    ui.MainPublicNoticeSkin = MainPublicNoticeSkin;
    __reflect(MainPublicNoticeSkin.prototype, "ui.MainPublicNoticeSkin");
})(ui || (ui = {}));
