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
var renderer;
(function (renderer) {
    var AnimalRewardBtnRenderer = (function (_super) {
        __extends(AnimalRewardBtnRenderer, _super);
        function AnimalRewardBtnRenderer() {
            return _super.call(this) || this;
        }
        AnimalRewardBtnRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var reward = this.data;
                var value = reward.templateValue;
                if (value > 10) {
                    this.lab.text = Language.getExpression(Language.E_DD1J, value);
                }
                else {
                    this.lab.text = Language.getExpression(Language.E_DL1R, value);
                }
                this.imgRedPoint.visible = reward.state == 0;
            }
        };
        return AnimalRewardBtnRenderer;
    }(ui.AnimalRewardBtnRendererSkin));
    renderer.AnimalRewardBtnRenderer = AnimalRewardBtnRenderer;
    __reflect(AnimalRewardBtnRenderer.prototype, "renderer.AnimalRewardBtnRenderer");
})(renderer || (renderer = {}));
