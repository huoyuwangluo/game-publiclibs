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
    var StoryTalkSkin = (function (_super) {
        __extends(StoryTalkSkin, _super);
        function StoryTalkSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'skin.StoryTalkSkin';
            return _this;
        }
        return StoryTalkSkin;
    }(base.View));
    ui.StoryTalkSkin = StoryTalkSkin;
    __reflect(StoryTalkSkin.prototype, "ui.StoryTalkSkin");
})(ui || (ui = {}));
