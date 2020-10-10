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
    var sgSummerXianGouLiBaoRenderer = (function (_super) {
        __extends(sgSummerXianGouLiBaoRenderer, _super);
        function sgSummerXianGouLiBaoRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2];
            return _this;
        }
        sgSummerXianGouLiBaoRenderer.prototype.dataChanged = function () {
            if (this.data) {
                var data = this.data;
                var rewards = data.template.rewards.split(";");
                var index = 0;
                this.labDesc.text = data.template.name;
                if (data.template.needVip <= 0) {
                    this.labVip.text = "";
                }
                else {
                    this.labVip.text = Language.getExpression(Language.E_VIP1TQ, data.template.needVip);
                }
                for (var i = 0; i < 3; i++) {
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
                this.btnBuy.filters = null;
                this.btnBuy.touchEnabled = true;
                var num = data.template.buyTimes - data.holidayBuyCount;
                var cost = parseInt(data.template.consume.split("_")[1]);
                if (cost > 0) {
                    // this.btnBuy.y = 67;
                    this.btnBuy.label = cost + Language.C_MS;
                    if (num <= 0) {
                        this.btnBuy.label = Language.J_JRYMW;
                        this.btnBuy.filters = utils.filterUtil.grayFilters;
                        this.btnBuy.touchEnabled = false;
                    }
                }
                else {
                    this.btnBuy.label = Language.C_LQ;
                    if (num <= 0) {
                        this.btnBuy.label = Language.C_YLQ;
                        this.btnBuy.filters = utils.filterUtil.grayFilters;
                        this.btnBuy.touchEnabled = false;
                    }
                    // this.btnBuy.y = 78;
                }
                this.labCount.visible = true;
                this.labCount.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_JRSY12C, (num > 0 ? '0x34e22c' : '0xEF401C'), num));
                // if (data.template.buyTimes <= 1) {
                // 	this.labCount.visible = false;
                // }
                this.blabSale.text = "" + (data.template.discount / 10);
                this.labPrice.text = "" + data.template.consume1.split("_")[1];
            }
            else {
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
            }
        };
        return sgSummerXianGouLiBaoRenderer;
    }(ui.sgSummerXianGouLiBaoRendererSkin));
    renderer.sgSummerXianGouLiBaoRenderer = sgSummerXianGouLiBaoRenderer;
    __reflect(sgSummerXianGouLiBaoRenderer.prototype, "renderer.sgSummerXianGouLiBaoRenderer");
})(renderer || (renderer = {}));
