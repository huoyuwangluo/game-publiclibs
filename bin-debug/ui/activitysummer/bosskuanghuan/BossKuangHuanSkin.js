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
    var BossKuangHuanSkin = (function (_super) {
        __extends(BossKuangHuanSkin, _super);
        function BossKuangHuanSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'normal.BossKuangHuanSkin';
            return _this;
        }
        return BossKuangHuanSkin;
    }(base.View));
    ui.BossKuangHuanSkin = BossKuangHuanSkin;
    __reflect(BossKuangHuanSkin.prototype, "ui.BossKuangHuanSkin");
})(ui || (ui = {}));
