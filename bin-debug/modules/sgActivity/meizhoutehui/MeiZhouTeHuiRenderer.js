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
    var MeiZhouTeHuiRenderer = (function (_super) {
        __extends(MeiZhouTeHuiRenderer, _super);
        function MeiZhouTeHuiRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        MeiZhouTeHuiRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.btnChongZhi.visible = false;
                this.btnGet.visible = false;
                this.imgBuyFinsh.visible = false;
                var data = this.data;
                if (!data.otherRewards) {
                    var rewards = data.templateRewards.split(";");
                    this.btnChongZhi.source = "btnMoney_json.btn_sg_chongzhi_" + 0;
                    if (data.getTimes > 0) {
                        this.imgBuyFinsh.visible = true;
                        this.labCount.text = Language.C_SYXGCS + "0";
                        this.labCount.textColor = 0xff0000;
                    }
                    else {
                        this.btnChongZhi.visible = true;
                        this.labCount.text = Language.C_SYXGCS + "1";
                        this.labCount.textColor = 0x00ff00;
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
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(data.actType);
                    this.btnChongZhi.source = "btnMoney_json.btn_sg_chongzhi_" + data.rmb;
                    var rewards = data.otherRewards.split(";");
                    var count = vo.buyCountByValueStr(data.rewardCfgId.toString());
                    var leftCount = data.rechargeParams - count;
                    if (leftCount < 0)
                        leftCount = 0;
                    this.labCount.text = Language.C_SYXGCS + leftCount;
                    this.labCount.textColor = data.rechargeParams > count ? 0x00ff00 : 0xff0000;
                    if (count < data.rechargeParams) {
                        if (data.getTimes >= count) {
                            this.btnChongZhi.visible = true;
                        }
                        else {
                            this.btnGet.visible = true;
                        }
                    }
                    else {
                        if (data.getTimes >= count) {
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
            }
            else {
                for (var i = 0; i < this._rwards.length; i++) {
                    this._rwards[i].dataSource = null;
                }
            }
        };
        return MeiZhouTeHuiRenderer;
    }(ui.MeiZhouTeHuiRendererSkin));
    renderer.MeiZhouTeHuiRenderer = MeiZhouTeHuiRenderer;
    __reflect(MeiZhouTeHuiRenderer.prototype, "renderer.MeiZhouTeHuiRenderer");
})(renderer || (renderer = {}));
