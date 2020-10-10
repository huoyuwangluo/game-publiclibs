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
    var HeFuLeiChongRenderer = (function (_super) {
        __extends(HeFuLeiChongRenderer, _super);
        function HeFuLeiChongRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2];
            return _this;
        }
        HeFuLeiChongRenderer.prototype.dataChanged = function () {
            if (this.data) {
                this.imgReceived.visible = false;
                this.btnGet.visible = false;
                this.btnchongzhi.visible = false;
                var temp = this.data;
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
                if (temp.hefuRewardState == 2) {
                    this.btnchongzhi.visible = true;
                }
                else if (temp.hefuRewardState == 1) {
                    this.btnGet.visible = true;
                }
                else {
                    this.imgReceived.visible = true;
                }
            }
            else {
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
            }
        };
        return HeFuLeiChongRenderer;
    }(ui.HeFuLeiChongRendererSkin));
    renderer.HeFuLeiChongRenderer = HeFuLeiChongRenderer;
    __reflect(HeFuLeiChongRenderer.prototype, "renderer.HeFuLeiChongRenderer");
})(renderer || (renderer = {}));
