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
    var ChengZhuangSplictDialogSkin = (function (_super) {
        __extends(ChengZhuangSplictDialogSkin, _super);
        function ChengZhuangSplictDialogSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.ChengZhuangSplictDialogSkin';
            return _this;
        }
        return ChengZhuangSplictDialogSkin;
    }(base.View));
    ui.ChengZhuangSplictDialogSkin = ChengZhuangSplictDialogSkin;
    __reflect(ChengZhuangSplictDialogSkin.prototype, "ui.ChengZhuangSplictDialogSkin");
})(ui || (ui = {}));
