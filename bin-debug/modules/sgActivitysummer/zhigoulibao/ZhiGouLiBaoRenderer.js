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
    var ZhiGouLiBaoRenderer = (function (_super) {
        __extends(ZhiGouLiBaoRenderer, _super);
        function ZhiGouLiBaoRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        ZhiGouLiBaoRenderer.prototype.dataChanged = function () {
            if (this.data) {
                this.btnChongZhi.visible = false;
                this.btnGet.visible = false;
                this.imgBuyFinsh.visible = false;
                var item = this.data;
                var temp = Templates.getTemplateByProperty(templates.Map.HOLIDAYRECHARGE, "rechargeId", item.key);
                this.btnChongZhi.source = "btnMoney_json.btn_sg_chongzhi_" + temp.value;
                var rewards = temp.rewards.split(";");
                var buyCount = GameModels.activitySummer.getZhigouRechargeData(item.key);
                var getCount = GameModels.activitySummer.getZhigouGotRewardData(item.key);
                this.labCount.text = Language.C_SYXGCS + (temp.buyTimes - buyCount);
                this.labCount.textColor = temp.buyTimes > buyCount ? 0x00ff00 : 0xff0000;
                if (buyCount < temp.buyTimes) {
                    if (getCount >= buyCount) {
                        this.btnChongZhi.visible = true;
                    }
                    else {
                        this.btnGet.visible = true;
                    }
                }
                else {
                    if (getCount >= buyCount) {
                        this.imgBuyFinsh.visible = true;
                    }
                    else {
                        this.btnGet.visible = true;
                    }
                }
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
            }
            else {
                for (var i = 0; i < this._rwards.length; i++) {
                    this._rwards[i].dataSource = null;
                }
            }
        };
        return ZhiGouLiBaoRenderer;
    }(ui.ZhiGouLiBaoRendererSkin));
    renderer.ZhiGouLiBaoRenderer = ZhiGouLiBaoRenderer;
    __reflect(ZhiGouLiBaoRenderer.prototype, "renderer.ZhiGouLiBaoRenderer");
})(renderer || (renderer = {}));
