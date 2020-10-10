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
    var sgActivitySummerRenderer = (function (_super) {
        __extends(sgActivitySummerRenderer, _super);
        function sgActivitySummerRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2];
            return _this;
        }
        sgActivitySummerRenderer.prototype.dataChanged = function () {
            if (this.data) {
                this.imgBuyFinsh.visible = false;
                this.btnGet.visible = true;
                this.btnGet.touchEnabled = true;
                this.btnGet.filters = null;
                this.btnLingQuGet.visible = false;
                var temp = this.data;
                var rewards = temp.template.rewards.split(";");
                this.labDesc.text = temp.template.des;
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
                if (temp.holidayType == game.TypeSummerActivity.LJDL) {
                    this.showLeiJiDengLu(temp);
                }
                if (temp.holidayType == game.TypeSummerActivity.MRLC) {
                    this.showXiaRiLeiChong(temp);
                }
            }
            else {
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
            }
        };
        sgActivitySummerRenderer.prototype.showLeiJiDengLu = function (data) {
            if (data.holidayRewardState == 2) {
                this.btnGet.filters = utils.filterUtil.grayFilters;
                this.btnGet.touchEnabled = false;
                this.btnGet.label = Language.C_WDC;
            }
            else if (data.holidayRewardState == 1) {
                this.btnLingQuGet.visible = true;
                this.btnGet.visible = false;
            }
            else {
                this.imgBuyFinsh.visible = true;
                this.btnGet.visible = false;
            }
        };
        sgActivitySummerRenderer.prototype.showXiaRiLeiChong = function (data) {
            if (data.holidayRewardState == 2) {
                this.btnGet.label = Language.C_QCZ;
            }
            else if (data.holidayRewardState == 1) {
                this.btnLingQuGet.visible = true;
                this.btnGet.visible = false;
            }
            else {
                this.imgBuyFinsh.visible = true;
                this.btnGet.visible = false;
            }
        };
        return sgActivitySummerRenderer;
    }(ui.sgActivitySummerRendererSkin));
    renderer.sgActivitySummerRenderer = sgActivitySummerRenderer;
    __reflect(sgActivitySummerRenderer.prototype, "renderer.sgActivitySummerRenderer");
})(renderer || (renderer = {}));
