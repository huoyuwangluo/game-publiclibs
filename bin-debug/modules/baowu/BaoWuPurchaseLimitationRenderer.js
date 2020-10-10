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
    var BaoWuPurchaseLimitationRenderer = (function (_super) {
        __extends(BaoWuPurchaseLimitationRenderer, _super);
        function BaoWuPurchaseLimitationRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        BaoWuPurchaseLimitationRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.Btnbuy.visible = false;
                this.BtnGet.visible = false;
                this.imgFinsh.visible = false;
                var data = this.data;
                var rewards = [];
                if (data.otherRewards) {
                    rewards = data.otherRewards.split(";");
                    this.moneyGroup.visible = false;
                    var count = data.buyCountByValueStr(data.rewardCfgId.toString());
                    var leftCount = data.rechargeParams - count;
                    if (leftCount < 0)
                        leftCount = 0;
                    this.labCount.text = Language.C_XG + " : " + leftCount + "/" + data.rechargeParams;
                    this.labCount.textColor = data.rechargeParams > count ? 0x00ff00 : 0xff0000;
                    if (count < data.rechargeParams) {
                        if (data.getTimes >= count) {
                            this.Btnbuy.visible = true;
                            this.Btnbuy.source = "btnMoney_json.btn_sg_chongzhi_" + data.rmb;
                        }
                        else {
                            this.BtnGet.visible = true;
                        }
                    }
                    else {
                        if (data.getTimes >= count) {
                            this.imgFinsh.visible = true;
                        }
                        else {
                            this.BtnGet.visible = true;
                        }
                    }
                }
                else {
                    rewards = data.templateRewards.split(";");
                    this.moneyGroup.visible = true;
                    this.labDiamonds.text = data.templateConsume.split("_")[1];
                    if (data.getTimes > 0) {
                        this.imgFinsh.visible = true;
                        this.moneyGroup.visible = false;
                        this.labCount.text = Language.C_XG + " : " + "0/1";
                        this.labCount.textColor = 0xFF0000;
                    }
                    else {
                        this.Btnbuy.visible = true;
                        this.Btnbuy.source = "btnMoney_json.btn_buy";
                        this.labCount.text = Language.C_XG + " : " + "1/1";
                        this.labCount.textColor = 0x00FF00;
                    }
                }
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
        return BaoWuPurchaseLimitationRenderer;
    }(ui.BaoWuPurchaseLimitationRendererSkin));
    renderer.BaoWuPurchaseLimitationRenderer = BaoWuPurchaseLimitationRenderer;
    __reflect(BaoWuPurchaseLimitationRenderer.prototype, "renderer.BaoWuPurchaseLimitationRenderer");
})(renderer || (renderer = {}));
