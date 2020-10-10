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
    var petWanFaMainDilogRendererSkin = (function (_super) {
        __extends(petWanFaMainDilogRendererSkin, _super);
        function petWanFaMainDilogRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.petWanFaMainDilogRendererSkin';
            return _this;
        }
        return petWanFaMainDilogRendererSkin;
    }(base.ItemRenderer));
    ui.petWanFaMainDilogRendererSkin = petWanFaMainDilogRendererSkin;
    __reflect(petWanFaMainDilogRendererSkin.prototype, "ui.petWanFaMainDilogRendererSkin");
})(ui || (ui = {}));
