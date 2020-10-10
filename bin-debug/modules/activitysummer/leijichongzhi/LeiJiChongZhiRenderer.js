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
    var LeiJiChongZhiRenderer = (function (_super) {
        __extends(LeiJiChongZhiRenderer, _super);
        function LeiJiChongZhiRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2];
            return _this;
        }
        LeiJiChongZhiRenderer.prototype.dataChanged = function () {
            if (this.data) {
                this.imgBuyFinsh.visible = false;
                this.btnGet.visible = true;
                this.btnGet.touchEnabled = true;
                this.btnGet.filters = null;
                this.btnLingQuGet.visible = false;
                this.labNo.visible = false;
                this.labBuChong.visible = false;
                var temp = this.data;
                // logger.log("==============", temp.template.id);
                var rewards = temp.template.rewards.split(";");
                var index = 0;
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
                if (temp.holidayRewardState == 2) {
                    this.btnGet.label = Language.C_QCZ;
                }
                else if (temp.holidayRewardState == 1) {
                    this.btnLingQuGet.visible = true;
                    this.btnGet.visible = false;
                }
                else {
                    this.imgBuyFinsh.visible = true;
                    this.btnGet.visible = false;
                }
                if (GameModels.activitySummer.tatolValueArr[parseInt(temp.template.target) - 1] == null) {
                    this.labNo.visible = true;
                    this.labNo.text = Language.C_ZWKQ;
                    this.imgBuyFinsh.visible = false;
                    this.btnGet.visible = false;
                    this.btnLingQuGet.visible = false;
                }
                else {
                    if (parseInt(temp.template.target) < GameModels.activitySummer.tatolValueArr.length) {
                        if (temp.holidayRewardState == 2) {
                            if (GameModels.user.player.vip >= 3) {
                                this.labNo.visible = false;
                                this.btnGet.visible = true;
                                this.btnGet.label = Language.C_QBC;
                            }
                            else {
                                this.labNo.visible = true;
                                this.btnGet.visible = false;
                                this.labNo.text = Language.C_YGQ;
                                this.labBuChong.visible = true;
                            }
                        }
                    }
                }
            }
            else {
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
            }
        };
        return LeiJiChongZhiRenderer;
    }(ui.LeiJiChongZhiRendererSkin));
    renderer.LeiJiChongZhiRenderer = LeiJiChongZhiRenderer;
    __reflect(LeiJiChongZhiRenderer.prototype, "renderer.LeiJiChongZhiRenderer");
})(renderer || (renderer = {}));
