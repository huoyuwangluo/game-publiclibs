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
    var zhouKaViewRenderer1Skin = (function (_super) {
        __extends(zhouKaViewRenderer1Skin, _super);
        function zhouKaViewRenderer1Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.zhouKaViewRenderer1Skin';
            return _this;
        }
        return zhouKaViewRenderer1Skin;
    }(base.ItemRenderer));
    ui.zhouKaViewRenderer1Skin = zhouKaViewRenderer1Skin;
    __reflect(zhouKaViewRenderer1Skin.prototype, "ui.zhouKaViewRenderer1Skin");
})(ui || (ui = {}));
