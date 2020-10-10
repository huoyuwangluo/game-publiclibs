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
    var HeadInfo2Skin = (function (_super) {
        __extends(HeadInfo2Skin, _super);
        function HeadInfo2Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'HeadInfo2Skin';
            return _this;
        }
        return HeadInfo2Skin;
    }(base.View));
    ui.HeadInfo2Skin = HeadInfo2Skin;
    __reflect(HeadInfo2Skin.prototype, "ui.HeadInfo2Skin");
})(ui || (ui = {}));
