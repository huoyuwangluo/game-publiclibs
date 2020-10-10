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
    var BingFaSkillListRenderer = (function (_super) {
        __extends(BingFaSkillListRenderer, _super);
        function BingFaSkillListRenderer() {
            return _super.call(this) || this;
        }
        BingFaSkillListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                if (this.data instanceof vo.SkillVO) {
                    var skillVo = this.data;
                    this.imgQuality.source = ResPath.getQuality(1);
                    this.imgIcon.source = skillVo.icon;
                    this.labName.text = skillVo.name;
                    this.imgXiYou.visible = skillVo.group == 12;
                }
            }
        };
        return BingFaSkillListRenderer;
    }(ui.BingFaSkillListRendererSkin));
    renderer.BingFaSkillListRenderer = BingFaSkillListRenderer;
    __reflect(BingFaSkillListRenderer.prototype, "renderer.BingFaSkillListRenderer");
})(renderer || (renderer = {}));
