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
    var AncientEquipDressDialogSkin = (function (_super) {
        __extends(AncientEquipDressDialogSkin, _super);
        function AncientEquipDressDialogSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'dialog.AncientEquipDressDialogSkin';
            return _this;
        }
        return AncientEquipDressDialogSkin;
    }(base.View));
    ui.AncientEquipDressDialogSkin = AncientEquipDressDialogSkin;
    __reflect(AncientEquipDressDialogSkin.prototype, "ui.AncientEquipDressDialogSkin");
})(ui || (ui = {}));
