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
    var PetGongMingListSkin = (function (_super) {
        __extends(PetGongMingListSkin, _super);
        function PetGongMingListSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'PetGongMingListSkin';
            return _this;
        }
        return PetGongMingListSkin;
    }(base.View));
    ui.PetGongMingListSkin = PetGongMingListSkin;
    __reflect(PetGongMingListSkin.prototype, "ui.PetGongMingListSkin");
})(ui || (ui = {}));
