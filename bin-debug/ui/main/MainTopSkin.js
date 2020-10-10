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
    var MainTopSkin = (function (_super) {
        __extends(MainTopSkin, _super);
        function MainTopSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'skin.MainTopSkin';
            return _this;
        }
        return MainTopSkin;
    }(base.View));
    ui.MainTopSkin = MainTopSkin;
    __reflect(MainTopSkin.prototype, "ui.MainTopSkin");
})(ui || (ui = {}));
