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
    var PetGongMingMainSkin = (function (_super) {
        __extends(PetGongMingMainSkin, _super);
        function PetGongMingMainSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'PetGongMingMainSkin';
            return _this;
        }
        return PetGongMingMainSkin;
    }(base.View));
    ui.PetGongMingMainSkin = PetGongMingMainSkin;
    __reflect(PetGongMingMainSkin.prototype, "ui.PetGongMingMainSkin");
})(ui || (ui = {}));
