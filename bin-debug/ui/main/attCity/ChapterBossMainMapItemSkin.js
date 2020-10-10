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
    var ChapterBossMainMapItemSkin = (function (_super) {
        __extends(ChapterBossMainMapItemSkin, _super);
        function ChapterBossMainMapItemSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'ChapterBossMainMapItemSkin';
            return _this;
        }
        return ChapterBossMainMapItemSkin;
    }(base.View));
    ui.ChapterBossMainMapItemSkin = ChapterBossMainMapItemSkin;
    __reflect(ChapterBossMainMapItemSkin.prototype, "ui.ChapterBossMainMapItemSkin");
})(ui || (ui = {}));
