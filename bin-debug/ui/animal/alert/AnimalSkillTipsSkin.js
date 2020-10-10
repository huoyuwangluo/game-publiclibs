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
    var AnimalSkillTipsSkin = (function (_super) {
        __extends(AnimalSkillTipsSkin, _super);
        function AnimalSkillTipsSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'AnimalSkillTipsSkin';
            return _this;
        }
        return AnimalSkillTipsSkin;
    }(base.View));
    ui.AnimalSkillTipsSkin = AnimalSkillTipsSkin;
    __reflect(AnimalSkillTipsSkin.prototype, "ui.AnimalSkillTipsSkin");
})(ui || (ui = {}));
