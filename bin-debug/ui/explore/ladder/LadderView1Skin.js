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
    var LadderView1Skin = (function (_super) {
        __extends(LadderView1Skin, _super);
        function LadderView1Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.LadderView1Skin';
            return _this;
        }
        return LadderView1Skin;
    }(base.View));
    ui.LadderView1Skin = LadderView1Skin;
    __reflect(LadderView1Skin.prototype, "ui.LadderView1Skin");
})(ui || (ui = {}));
