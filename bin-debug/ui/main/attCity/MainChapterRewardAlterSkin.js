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
    var MainChapterRewardAlterSkin = (function (_super) {
        __extends(MainChapterRewardAlterSkin, _super);
        function MainChapterRewardAlterSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'MainChapterRewardAlterSkin';
            return _this;
        }
        return MainChapterRewardAlterSkin;
    }(base.View));
    ui.MainChapterRewardAlterSkin = MainChapterRewardAlterSkin;
    __reflect(MainChapterRewardAlterSkin.prototype, "ui.MainChapterRewardAlterSkin");
})(ui || (ui = {}));
