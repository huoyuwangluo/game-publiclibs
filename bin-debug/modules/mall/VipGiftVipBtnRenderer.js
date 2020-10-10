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
    var VipGiftVipBtnRenderer = (function (_super) {
        __extends(VipGiftVipBtnRenderer, _super);
        function VipGiftVipBtnRenderer() {
            return _super.call(this) || this;
        }
        VipGiftVipBtnRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.imgDown.source = "xgVipBtn_json.img_VIP" + this.data.index;
                this.imgUp.source = "xgVipBtn_json.img_VIP0" + this.data.index;
                this.imgSelecd.visible = this.data.selected;
                this.imgDown.visible = this.data.selected;
                this.imgUp.visible = !this.data.selected;
                this.labTitle.text = this.data.title;
                this.labTitle.textColor = this.data.selected ? 0xF7E173 : 0x837662;
            }
        };
        return VipGiftVipBtnRenderer;
    }(ui.VipGiftVipBtnRendererSkin));
    renderer.VipGiftVipBtnRenderer = VipGiftVipBtnRenderer;
    __reflect(VipGiftVipBtnRenderer.prototype, "renderer.VipGiftVipBtnRenderer");
})(renderer || (renderer = {}));
