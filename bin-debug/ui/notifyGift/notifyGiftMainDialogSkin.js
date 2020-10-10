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
    var notifyGiftMainDialogSkin = (function (_super) {
        __extends(notifyGiftMainDialogSkin, _super);
        function notifyGiftMainDialogSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'notifyGiftMainDialogSkin';
            return _this;
        }
        return notifyGiftMainDialogSkin;
    }(base.View));
    ui.notifyGiftMainDialogSkin = notifyGiftMainDialogSkin;
    __reflect(notifyGiftMainDialogSkin.prototype, "ui.notifyGiftMainDialogSkin");
})(ui || (ui = {}));
