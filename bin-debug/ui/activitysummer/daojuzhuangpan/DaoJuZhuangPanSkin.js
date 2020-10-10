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
    var DaoJuZhuangPanSkin = (function (_super) {
        __extends(DaoJuZhuangPanSkin, _super);
        function DaoJuZhuangPanSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'normal.DaoJuZhuangPanSkin';
            return _this;
        }
        return DaoJuZhuangPanSkin;
    }(base.View));
    ui.DaoJuZhuangPanSkin = DaoJuZhuangPanSkin;
    __reflect(DaoJuZhuangPanSkin.prototype, "ui.DaoJuZhuangPanSkin");
})(ui || (ui = {}));
