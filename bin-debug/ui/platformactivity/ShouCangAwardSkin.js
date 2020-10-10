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
    var ShouCangAwardSkin = (function (_super) {
        __extends(ShouCangAwardSkin, _super);
        function ShouCangAwardSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'normal.ShouCangAwardSkin';
            return _this;
        }
        return ShouCangAwardSkin;
    }(base.View));
    ui.ShouCangAwardSkin = ShouCangAwardSkin;
    __reflect(ShouCangAwardSkin.prototype, "ui.ShouCangAwardSkin");
})(ui || (ui = {}));
