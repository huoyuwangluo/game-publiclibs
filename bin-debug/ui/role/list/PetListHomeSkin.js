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
    var PetListHomeSkin = (function (_super) {
        __extends(PetListHomeSkin, _super);
        function PetListHomeSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'PetListHomeSkin';
            return _this;
        }
        return PetListHomeSkin;
    }(base.View));
    ui.PetListHomeSkin = PetListHomeSkin;
    __reflect(PetListHomeSkin.prototype, "ui.PetListHomeSkin");
})(ui || (ui = {}));
