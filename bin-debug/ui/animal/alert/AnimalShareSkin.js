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
    var AnimalShareSkin = (function (_super) {
        __extends(AnimalShareSkin, _super);
        function AnimalShareSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'AnimalShareSkin';
            return _this;
        }
        return AnimalShareSkin;
    }(base.View));
    ui.AnimalShareSkin = AnimalShareSkin;
    __reflect(AnimalShareSkin.prototype, "ui.AnimalShareSkin");
})(ui || (ui = {}));
