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
    var LegionShareFriendListRenderer = (function (_super) {
        __extends(LegionShareFriendListRenderer, _super);
        function LegionShareFriendListRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        LegionShareFriendListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.btnGet.visible = false;
                this.imgBuyFinsh.visible = false;
                var data = this.data;
                var temp = Templates.getTemplateById(templates.Map.SHAREFRIENDREWARD, data.key);
                if (temp) {
                    this.labDesc.text = temp.name;
                    var status = data.value;
                    if (status <= 1) {
                        this.btnGet.visible = true;
                        if (status == 0) {
                            this.btnGet.label = Language.C_WDC;
                            this.btnGet.skinName = "skins.SnapBigButton2Skin";
                        }
                        else {
                            this.btnGet.label = Language.C_LQ;
                            this.btnGet.skinName = "skins.SnapBigButton3Skin";
                        }
                    }
                    else {
                        this.imgBuyFinsh.visible = true;
                    }
                    var rewards = temp.rewards.split(";");
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
            }
            else {
                for (var i = 0; i < this._rwards.length; i++) {
                    this._rwards[i].dataSource = null;
                }
            }
        };
        return LegionShareFriendListRenderer;
    }(ui.LegionShareFriendListRendererSkin));
    renderer.LegionShareFriendListRenderer = LegionShareFriendListRenderer;
    __reflect(LegionShareFriendListRenderer.prototype, "renderer.LegionShareFriendListRenderer");
})(renderer || (renderer = {}));
