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
    var ActivityHeFuMainDialogSkin = (function (_super) {
        __extends(ActivityHeFuMainDialogSkin, _super);
        function ActivityHeFuMainDialogSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.ActivityHeFuMainDialogSkin';
            return _this;
        }
        return ActivityHeFuMainDialogSkin;
    }(base.View));
    ui.ActivityHeFuMainDialogSkin = ActivityHeFuMainDialogSkin;
    __reflect(ActivityHeFuMainDialogSkin.prototype, "ui.ActivityHeFuMainDialogSkin");
})(ui || (ui = {}));
