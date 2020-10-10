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
var LegionNumberListRenderer = (function (_super) {
    __extends(LegionNumberListRenderer, _super);
    function LegionNumberListRenderer() {
        return _super.call(this) || this;
    }
    LegionNumberListRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var voData = this.data;
        if (voData) {
            this.labName.text = voData.playerName;
            this.labPwor.text = voData.fightPower + "";
            var tem1 = Templates.getTemplateById(templates.Map.WENGUAN, voData.wenguan);
            this.labWenGuan.text = tem1 ? tem1.name : "";
            var tem2 = Templates.getTemplateById(templates.Map.CAMPWU, voData.wuguan);
            this.labWuGuan.text = tem2 ? tem2.name : "";
            if (voData.online == 0) {
                this.labState.textColor = 0x7b7b7c;
                if (voData.lastLoginType <= 1) {
                    this.labState.text = Language.C_YTZQ;
                }
                else {
                    if (voData.lastLoginType == 3) {
                        this.labState.text = Language.C_JT1;
                    }
                    else if (voData.lastLoginType == 2) {
                        this.labState.text = Language.C_ZT;
                    }
                }
            }
            else {
                this.labState.text = Language.C_ZX;
                this.labState.textColor = TypeColor.GREEN;
            }
        }
    };
    return LegionNumberListRenderer;
}(ui.LegionNumberListRendererSkin));
__reflect(LegionNumberListRenderer.prototype, "LegionNumberListRenderer");
