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
    var WelfareActivityRenderer = (function (_super) {
        __extends(WelfareActivityRenderer, _super);
        function WelfareActivityRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        WelfareActivityRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data = this.data;
                this.labDesc.textFlow = utils.TextFlowMaker.generateTextFlow(data.templateDes1);
                var rewards = data.templateRewards.split(";");
                var index = 0;
                for (var i = 0; i < 4; i++) {
                    var iconBox = this._rwards[i];
                    iconBox.labName.stroke = 1;
                    if (i < rewards.length) {
                        iconBox.dataSource = rewards[i];
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                mg.effectManager.unbindEffect(this.btnGet);
                this.imgBuyFinsh.visible = false;
                this.btnGet.visible = false;
                if (data.state == 0) {
                    this.btnGet.visible = true;
                    this.btnGet.filters = null;
                    this.btnGet.label = Language.C_LQ;
                    this.btnGet.touchEnabled = true;
                    mg.effectManager.bindEffect(this.btnGet, TypeEffectId.BUTTON_EFF_BIG_RED);
                }
                else if (data.state == 1) {
                    this.btnGet.visible = true;
                    this.btnGet.label = Language.C_WDC;
                    this.btnGet.filters = utils.filterUtil.grayFilters;
                    this.btnGet.touchEnabled = false;
                }
                else {
                    this.btnGet.visible = false;
                    this.imgBuyFinsh.visible = true;
                }
                this.labPro.text = data.myValue + "/" + data.templateValue;
                data.myValue >= data.templateValue ? this.labPro.textColor = 0x00ff00 : this.labPro.textColor = 0xff0000;
            }
        };
        return WelfareActivityRenderer;
    }(ui.WelfareActivityRendererSkin));
    renderer.WelfareActivityRenderer = WelfareActivityRenderer;
    __reflect(WelfareActivityRenderer.prototype, "renderer.WelfareActivityRenderer");
})(renderer || (renderer = {}));
