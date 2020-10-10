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
    var HeadInfo1Skin = (function (_super) {
        __extends(HeadInfo1Skin, _super);
        function HeadInfo1Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.HeadInfo1Skin';
            return _this;
        }
        return HeadInfo1Skin;
    }(base.ItemRenderer));
    ui.HeadInfo1Skin = HeadInfo1Skin;
    __reflect(HeadInfo1Skin.prototype, "ui.HeadInfo1Skin");
})(ui || (ui = {}));
