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
    var notifyGiftMainDialog1Skin = (function (_super) {
        __extends(notifyGiftMainDialog1Skin, _super);
        function notifyGiftMainDialog1Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'notifyGiftMainDialog1Skin';
            return _this;
        }
        return notifyGiftMainDialog1Skin;
    }(base.View));
    ui.notifyGiftMainDialog1Skin = notifyGiftMainDialog1Skin;
    __reflect(notifyGiftMainDialog1Skin.prototype, "ui.notifyGiftMainDialog1Skin");
})(ui || (ui = {}));
