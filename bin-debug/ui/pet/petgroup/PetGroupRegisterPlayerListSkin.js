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
    var PetGroupRegisterPlayerListSkin = (function (_super) {
        __extends(PetGroupRegisterPlayerListSkin, _super);
        function PetGroupRegisterPlayerListSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'PetGroupRegisterPlayerListSkin';
            return _this;
        }
        return PetGroupRegisterPlayerListSkin;
    }(base.View));
    ui.PetGroupRegisterPlayerListSkin = PetGroupRegisterPlayerListSkin;
    __reflect(PetGroupRegisterPlayerListSkin.prototype, "ui.PetGroupRegisterPlayerListSkin");
})(ui || (ui = {}));
