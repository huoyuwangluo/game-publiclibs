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
    var CampBattlePlayerRenderer = (function (_super) {
        __extends(CampBattlePlayerRenderer, _super);
        function CampBattlePlayerRenderer() {
            return _super.call(this) || this;
        }
        CampBattlePlayerRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data1 = this.data;
                this.img_state2.visible = false;
                this.img_state3.visible = false;
                this.imgHead.filters = null;
                this.imgHead.source = ResPath.getPlayerIconSmall(data1.HeadIcon);
                this.imgQuality.filters = null;
                this.labName.text = data1.PlayerName;
                if (data1.PlayerId == GameModels.user.player.uid) {
                    this.labName.textColor = TypeColor.GREEN;
                }
                else {
                    this.labName.textColor = 0xA69369;
                }
                this.labFight.text = Language.P_ZL + data1.FightPower;
                this.labSkillCount.text = data1.WinCount.toString();
                this.labGuWuCount.text = data1.GuWuCount.toString();
                switch (data1.State) {
                    case 2:
                        this.img_state2.visible = true;
                        this.imgHead.filters = utils.filterUtil.grayFilters;
                        this.imgQuality.filters = utils.filterUtil.grayFilters;
                        break;
                    case 3:
                        this.img_state3.visible = true;
                        break;
                }
            }
        };
        return CampBattlePlayerRenderer;
    }(ui.CampBattlePlayerRendererSkin));
    renderer.CampBattlePlayerRenderer = CampBattlePlayerRenderer;
    __reflect(CampBattlePlayerRenderer.prototype, "renderer.CampBattlePlayerRenderer");
})(renderer || (renderer = {}));
