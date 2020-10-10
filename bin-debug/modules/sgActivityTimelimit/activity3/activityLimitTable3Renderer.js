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
    var activityLimitTable3Renderer = (function (_super) {
        __extends(activityLimitTable3Renderer, _super);
        function activityLimitTable3Renderer() {
            return _super.call(this) || this;
        }
        /**0道具 1武将 2宠物 3神兵 */
        activityLimitTable3Renderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var vo1 = this.data;
            if (vo1) {
                this.reward0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChoose, this);
                this.labDesc.text = vo1.templactExchange.des;
                if (!vo1.selecdData) {
                    this.reward0.icon.source = "common_json.img_add_png";
                    this.reward0.labName.text = "";
                    this.reward0.labCount.text = "";
                    this.reward0.quality.source = "qualityBg_json.img_qlt_1_png";
                }
                else {
                    this.reward0.labCount.text = "";
                    if (vo1.selecdData instanceof vo.GamePetVO) {
                        this.reward0.quality.source = ResPath.getPetQualityByStar(vo1.selecdData.star, vo1.selecdData.isHashFourSkill);
                        var item1 = Templates.getTemplateById(templates.Map.ITEM, vo1.selecdData.refId);
                        this.reward0.icon.source = item1.icon;
                        this.reward0.labName.text = vo1.selecdData.name;
                        this.reward0.labName.textColor = TypeQuality.getStarColor(vo1.selecdData.star);
                    }
                    else {
                        this.reward0.quality.source = ResPath.getQuality(vo1.selecdData.quality);
                        this.reward0.icon.source = vo1.selecdData.icon;
                        this.reward0.labName.text = vo1.selecdData.name;
                        this.reward0.labName.textColor = TypeQuality.getQualityColor(vo1.selecdData.quality);
                    }
                }
                this.reward1.dataSource = vo1.templactExchange.costMoney;
                this.reward2.dataSource = vo1.templactExchange.itemId;
                // var count: number = vo.templactExchange.buyTimes - vo.value;
                this.labCount.text = Language.C_SDXGCS + vo1.value;
                this.labCount.textColor = vo1.value > 0 ? 0x00ff00 : 0xff0000;
                this.btnGet.filters = vo1.value > 0 ? null : utils.filterUtil.grayFilters;
                this.btnGet.touchEnabled = vo1.value > 0 ? true : false;
            }
            else {
                this.reward0.dataSource = null;
                this.reward1.dataSource = null;
                this.reward2.dataSource = null;
                this.reward0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChoose, this);
            }
        };
        activityLimitTable3Renderer.prototype.onChoose = function () {
            var vo = this.data;
            if (vo) {
                mg.alertManager.showAlert(limitChooseItem, true, true, vo);
            }
        };
        return activityLimitTable3Renderer;
    }(ui.activityLimitTable3RendererSkin));
    renderer.activityLimitTable3Renderer = activityLimitTable3Renderer;
    __reflect(activityLimitTable3Renderer.prototype, "renderer.activityLimitTable3Renderer");
})(renderer || (renderer = {}));
