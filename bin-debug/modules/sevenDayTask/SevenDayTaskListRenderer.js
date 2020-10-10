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
    var SevenDayTaskListRenderer = (function (_super) {
        __extends(SevenDayTaskListRenderer, _super);
        function SevenDayTaskListRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        SevenDayTaskListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var taskVo = this.data;
                this.labDesc.text = taskVo.template.des;
                this.moneyGroup.visible = false;
                this.btnGet.visible = true;
                this.imgBuyFinsh.visible = false;
                this.priceGroup.visible = false;
                this.labCount.text = "";
                if (taskVo.type != 4) {
                    this.labCount.text = taskVo.parm1 + "/" + taskVo.parm1Target;
                    this.labCount.textColor = taskVo.parm1 >= taskVo.parm1Target ? TypeColor.GREEN1 : TypeColor.RED1;
                }
                else {
                    this.moneyGroup.visible = true;
                    this.labDiamonds.text = taskVo.parm1Target.toString();
                    if (taskVo.parm1Target > 0) {
                        this.priceGroup.visible = true;
                        this.labDiamonds0.text = (taskVo.parm1Target * 2).toString();
                    }
                }
                if (taskVo.status == 1) {
                    if (taskVo.type != 4) {
                        this.labCount.text = Language.C_YWC;
                        this.labCount.textColor = TypeColor.GREEN1;
                        this.btnGet.label = Language.C_LJLQ;
                        this.btnGet.skinName = "skins.SnapBigButton3Skin";
                    }
                    else {
                        if (taskVo.parm1Target <= 0) {
                            this.btnGet.label = Language.C_LJLQ;
                            this.btnGet.skinName = "skins.SnapBigButton3Skin";
                        }
                        else {
                            this.btnGet.label = Language.C_GM;
                            this.btnGet.skinName = "skins.SnapBigButton2Skin";
                        }
                    }
                }
                else {
                    if (taskVo.status == 0) {
                        this.btnGet.label = taskVo.type == 4 ? Language.C_GM : Language.C_QW;
                        this.btnGet.skinName = "skins.SnapBigButton2Skin";
                    }
                    else {
                        this.btnGet.visible = false;
                        this.imgBuyFinsh.visible = true;
                        this.labCount.text = "";
                        this.priceGroup.visible = false;
                    }
                }
                var rewards = taskVo.template.rewards.split(";");
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
        };
        return SevenDayTaskListRenderer;
    }(ui.SevenDayTaskListRendererSkin));
    renderer.SevenDayTaskListRenderer = SevenDayTaskListRenderer;
    __reflect(SevenDayTaskListRenderer.prototype, "renderer.SevenDayTaskListRenderer");
})(renderer || (renderer = {}));
