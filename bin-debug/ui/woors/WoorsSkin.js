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
    var WoorsSkin = (function (_super) {
        __extends(WoorsSkin, _super);
        function WoorsSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.WoorsSkin';
            return _this;
        }
        return WoorsSkin;
    }(base.View));
    ui.WoorsSkin = WoorsSkin;
    __reflect(WoorsSkin.prototype, "ui.WoorsSkin");
})(ui || (ui = {}));
