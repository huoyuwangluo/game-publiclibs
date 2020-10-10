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
    var HeTeHuiRenderer = (function (_super) {
        __extends(HeTeHuiRenderer, _super);
        function HeTeHuiRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2];
            return _this;
        }
        HeTeHuiRenderer.prototype.dataChanged = function () {
            if (this.data) {
                this.btnBuy.visible = true;
                this.imgYimai.visible = false;
                var temp = this.data;
                var rewards = temp.template.rewards.split(";");
                var index = 0;
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
                if (temp.template instanceof templates.mergeBuy) {
                    this.blabSale.text = "" + (temp.template.discount / 10);
                    this.btnBuy.label = temp.template.consume.split("_")[1];
                }
                if (temp.hefuRewardState == 3) {
                    this.btnBuy.visible = false;
                    this.imgYimai.visible = true;
                }
            }
            else {
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
            }
        };
        return HeTeHuiRenderer;
    }(ui.HeTeHuiRendererSkin));
    renderer.HeTeHuiRenderer = HeTeHuiRenderer;
    __reflect(HeTeHuiRenderer.prototype, "renderer.HeTeHuiRenderer");
})(renderer || (renderer = {}));
