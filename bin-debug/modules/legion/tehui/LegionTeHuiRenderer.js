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
    var LegionTeHuiRenderer = (function (_super) {
        __extends(LegionTeHuiRenderer, _super);
        function LegionTeHuiRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        LegionTeHuiRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data = this.data;
                var reward = "";
                var rewards = [];
                this.btnPay.visible = false;
                this.btnReward.visible = false;
                this.imgBuyFinsh.visible = false;
                if (data.otherRewards) {
                    this.moneyGroup.visible = false;
                    switch (data.rmb) {
                        case 30:
                            reward = Language.C_PTZM;
                            break;
                        case 128:
                            reward = Language.C_GJZM;
                            break;
                        case 488:
                            reward = Language.C_SLZM;
                            break;
                    }
                    rewards = data.otherRewards.split(";");
                    if (data.hashMyValueStr(data.rewardCfgId.toString())) {
                        if (data.getTimes <= 0) {
                            this.btnReward.visible = true;
                        }
                        else {
                            this.imgBuyFinsh.visible = true;
                        }
                    }
                    else {
                        this.btnPay.visible = true;
                        this.btnPay.source = "btnMoney_json.btn_sg_chongzhi_" + data.rmb;
                    }
                }
                else {
                    this.moneyGroup.visible = true;
                    reward = Language.C_QYYS;
                    rewards = data.templateRewards.split(";");
                    this.labDiamonds.text = data.templateConsume.split("_")[1];
                    if (data.getTimes > 0) {
                        this.imgBuyFinsh.visible = true;
                        this.moneyGroup.visible = false;
                    }
                    else {
                        this.btnPay.visible = true;
                        this.btnPay.source = "btnMoney_json.btn_buy";
                    }
                }
                this.labHide.text = Language.getExpression(Language.E_ZYFL, reward);
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
        return LegionTeHuiRenderer;
    }(ui.LegionTeHuiRendererSkin));
    renderer.LegionTeHuiRenderer = LegionTeHuiRenderer;
    __reflect(LegionTeHuiRenderer.prototype, "renderer.LegionTeHuiRenderer");
})(renderer || (renderer = {}));
