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
    var RoleWingGodIconRenderer = (function (_super) {
        __extends(RoleWingGodIconRenderer, _super);
        function RoleWingGodIconRenderer() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            return _this;
        }
        RoleWingGodIconRenderer.prototype.dataChanged = function () {
            if (this.data) {
                var itemVO = this.data.item;
                this.imgSelect.visible = this.data.select;
                this.imgQuality.source = ResPath.getQuality(itemVO.quality);
                this.imgWing.source = ResPath.getItemIconKey(itemVO.icon);
                this.labNum.text = this.data.item.count;
                this.labLv.text = Language.getExpression(Language.E_1J1, itemVO.lv);
                this.labName.text = itemVO.name;
                this.labName.textColor = TypeQuality.getQualityColor(itemVO.quality);
            }
        };
        return RoleWingGodIconRenderer;
    }(ui.RoleWingGodIconRendererSkin));
    renderer.RoleWingGodIconRenderer = RoleWingGodIconRenderer;
    __reflect(RoleWingGodIconRenderer.prototype, "renderer.RoleWingGodIconRenderer");
})(renderer || (renderer = {}));
