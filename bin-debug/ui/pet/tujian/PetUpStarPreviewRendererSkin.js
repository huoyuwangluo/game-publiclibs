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
    var PetUpStarPreviewRendererSkin = (function (_super) {
        __extends(PetUpStarPreviewRendererSkin, _super);
        function PetUpStarPreviewRendererSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.PetUpStarPreviewRendererSkin';
            return _this;
        }
        return PetUpStarPreviewRendererSkin;
    }(base.ItemRenderer));
    ui.PetUpStarPreviewRendererSkin = PetUpStarPreviewRendererSkin;
    __reflect(PetUpStarPreviewRendererSkin.prototype, "ui.PetUpStarPreviewRendererSkin");
})(ui || (ui = {}));
