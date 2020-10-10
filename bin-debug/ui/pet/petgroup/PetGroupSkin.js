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
    var PetGroupSkin = (function (_super) {
        __extends(PetGroupSkin, _super);
        function PetGroupSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'PetGroupSkin';
            return _this;
        }
        return PetGroupSkin;
    }(base.View));
    ui.PetGroupSkin = PetGroupSkin;
    __reflect(PetGroupSkin.prototype, "ui.PetGroupSkin");
})(ui || (ui = {}));
