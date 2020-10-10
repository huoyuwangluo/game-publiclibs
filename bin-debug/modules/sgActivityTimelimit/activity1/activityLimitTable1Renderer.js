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
    var activityLimitTable1Renderer = (function (_super) {
        __extends(activityLimitTable1Renderer, _super);
        function activityLimitTable1Renderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        activityLimitTable1Renderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var voList = this.data;
            this.imgBuyFinsh.visible = false;
            this.btnGet.visible = true;
            this.btnGet.touchEnabled = true;
            this.btnGet.filters = null;
            this.btnGet.skinName = "skins.SnapBigButton3Skin";
            this.btnGet.label = Language.C_LJLQ;
            if (voList) {
                this.labDesc.text = voList.templateDes;
                this.labCount.text = ((voList.progress > voList.targetCnt) ? voList.targetCnt : voList.progress) + "/" + voList.targetCnt;
                var rewards = voList.templateReward.split(";");
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
                if (voList.status == 0) {
                    this.labCount.textColor = 0xff0000;
                    this.btnGet.skinName = "skins.SnapBigButton2Skin";
                    this.btnGet.label = Language.C_QDC;
                    if (voList.actType == game.sgActivityType.act3) {
                        this.btnGet.filters = utils.filterUtil.grayFilters;
                        this.btnGet.touchEnabled = false;
                        this.btnGet.label = Language.C_WDC;
                    }
                }
                else if (voList.status == 1) {
                    this.labCount.textColor = 0x00ff00;
                }
                else {
                    this.imgBuyFinsh.visible = true;
                    this.btnGet.visible = false;
                    this.labCount.textColor = 0x00ff00;
                }
            }
            else {
                for (var i = 0; i < this._rwards.length; i++) {
                    this._rwards[i].dataSource = null;
                }
            }
        };
        return activityLimitTable1Renderer;
    }(ui.activityLimitTable1RendererSkin));
    renderer.activityLimitTable1Renderer = activityLimitTable1Renderer;
    __reflect(activityLimitTable1Renderer.prototype, "renderer.activityLimitTable1Renderer");
})(renderer || (renderer = {}));
