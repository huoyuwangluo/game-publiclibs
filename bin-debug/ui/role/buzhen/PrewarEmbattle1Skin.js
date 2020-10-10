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
    var PrewarEmbattle1Skin = (function (_super) {
        __extends(PrewarEmbattle1Skin, _super);
        function PrewarEmbattle1Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'PrewarEmbattle1Skin';
            return _this;
        }
        return PrewarEmbattle1Skin;
    }(base.View));
    ui.PrewarEmbattle1Skin = PrewarEmbattle1Skin;
    __reflect(PrewarEmbattle1Skin.prototype, "ui.PrewarEmbattle1Skin");
})(ui || (ui = {}));
