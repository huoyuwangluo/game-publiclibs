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
    var sgXianGouLiBaoSkin = (function (_super) {
        __extends(sgXianGouLiBaoSkin, _super);
        function sgXianGouLiBaoSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'normal.sgXianGouLiBaoSkin';
            return _this;
        }
        return sgXianGouLiBaoSkin;
    }(base.View));
    ui.sgXianGouLiBaoSkin = sgXianGouLiBaoSkin;
    __reflect(sgXianGouLiBaoSkin.prototype, "ui.sgXianGouLiBaoSkin");
})(ui || (ui = {}));
