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
    var LadderViewRecordRenderer = (function (_super) {
        __extends(LadderViewRecordRenderer, _super);
        function LadderViewRecordRenderer() {
            return _super.call(this) || this;
        }
        LadderViewRecordRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.imgShengLi0.visible = this.imgShengLi1.visible = false;
            if (this.data) {
                var data = this.data;
                this.imgHead0.source = ResPath.getPlayerIconSmall(GameModels.user.player.headIcon);
                this.labName0.text = GameModels.user.player.name;
                this.imgHead1.source = ResPath.getPlayerIconSmall(data.head);
                this.labName1.text = data.playerName;
                if (data.result) {
                    this.imgShengLi0.visible = true;
                    if (data.action) {
                        this.labDes.text = Language.J_JGSL;
                    }
                    else {
                        this.labDes.text = Language.J_FSSL;
                    }
                }
                else {
                    this.imgShengLi1.visible = true;
                    if (data.action) {
                        this.labDes.text = Language.J_JGSP;
                    }
                    else {
                        this.labDes.text = Language.J_FSSP;
                    }
                }
                this.labTmei.text = utils.DateUtil.formatDateInChinese(new Date(data.battleTime * 1000), true);
                if (data.scoreChange == 0) {
                    this.labCount.textColor = 0x00ff00;
                    this.labCount.text = GameModels.ladder1.type == 0 ? Language.J_JFBB : Language.J_PMBB;
                }
                else {
                    if (data.scoreChange < 0) {
                        this.labCount.textColor = 0xff0000;
                        this.labCount.text = (GameModels.ladder1.type == 0 ? (Language.C_JF + ":") : Language.C_PM) + data.scoreChange;
                    }
                    else {
                        this.labCount.textColor = 0x00ff00;
                        this.labCount.text = (GameModels.ladder1.type == 0 ? (Language.C_JF + ":") : Language.C_PM) + "+" + data.scoreChange;
                    }
                }
            }
        };
        return LadderViewRecordRenderer;
    }(ui.LadderViewRecordRendererSkin));
    renderer.LadderViewRecordRenderer = LadderViewRecordRenderer;
    __reflect(LadderViewRecordRenderer.prototype, "renderer.LadderViewRecordRenderer");
})(renderer || (renderer = {}));
