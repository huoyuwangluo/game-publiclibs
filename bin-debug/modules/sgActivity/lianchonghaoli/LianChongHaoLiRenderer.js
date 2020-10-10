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
    var LianChongHaoLiRenderer = (function (_super) {
        __extends(LianChongHaoLiRenderer, _super);
        function LianChongHaoLiRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        LianChongHaoLiRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.btnGet.visible = false;
                this.imgBuyFinsh.visible = false;
                var data = this.data;
                var rewards = data.templLianChongHaoLi.rewards.split(";");
                var days = GameModels.sgActivity.getDay(data.type);
                if (data.value == 2) {
                    this.imgBuyFinsh.visible = true;
                }
                else if (data.value == 0) {
                    this.btnGet.visible = true;
                    this.btnGet.skinName = "skins.SnapBigButton3Skin";
                    this.btnGet.label = Language.J_LKLQ;
                }
                else {
                    this.btnGet.visible = true;
                    this.btnGet.skinName = "skins.SnapBigButton2Skin";
                    if (days == data.templLianChongHaoLi.days) {
                        this.btnGet.label = Language.C_QCZ;
                    }
                    else {
                        this.btnGet.label = Language.C_WDC;
                    }
                }
                if (days >= data.templLianChongHaoLi.days) {
                    this.labCount.y = 90;
                    this.labCount.textColor = TypeColor.GREEN1;
                    this.labCount.text = Language.getExpression(Language.E_D1TL, data.templLianChongHaoLi.days);
                }
                else {
                    this.btnGet.visible = false;
                    this.labCount.y = 56;
                    this.labCount.textColor = TypeColor.RED1;
                    this.labCount.text = Language.getExpression(Language.E_D1TLKQ, data.templLianChongHaoLi.days);
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
        return LianChongHaoLiRenderer;
    }(ui.LianChongHaoLiRendererSkin));
    renderer.LianChongHaoLiRenderer = LianChongHaoLiRenderer;
    __reflect(LianChongHaoLiRenderer.prototype, "renderer.LianChongHaoLiRenderer");
})(renderer || (renderer = {}));
