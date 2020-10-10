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
    var HeFuLeiChongSkin = (function (_super) {
        __extends(HeFuLeiChongSkin, _super);
        function HeFuLeiChongSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'normal.HeFuLeiChongSkin';
            return _this;
        }
        return HeFuLeiChongSkin;
    }(base.View));
    ui.HeFuLeiChongSkin = HeFuLeiChongSkin;
    __reflect(HeFuLeiChongSkin.prototype, "ui.HeFuLeiChongSkin");
})(ui || (ui = {}));
