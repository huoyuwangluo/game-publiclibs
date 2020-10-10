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
    var DaoJuZhuangPanBoxSkin = (function (_super) {
        __extends(DaoJuZhuangPanBoxSkin, _super);
        function DaoJuZhuangPanBoxSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.DaoJuZhuangPanBoxSkin';
            return _this;
        }
        return DaoJuZhuangPanBoxSkin;
    }(base.ItemRenderer));
    ui.DaoJuZhuangPanBoxSkin = DaoJuZhuangPanBoxSkin;
    __reflect(DaoJuZhuangPanBoxSkin.prototype, "ui.DaoJuZhuangPanBoxSkin");
})(ui || (ui = {}));
