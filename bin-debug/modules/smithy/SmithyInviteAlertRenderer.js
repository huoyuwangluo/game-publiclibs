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
var SmithyInviteAlertRenderer = (function (_super) {
    __extends(SmithyInviteAlertRenderer, _super);
    function SmithyInviteAlertRenderer() {
        return _super.call(this) || this;
    }
    SmithyInviteAlertRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        if (data) {
            this.imgUnSelecd.visible = !data.selected;
            this.imgSelecd.visible = data.selected;
            var vo = data.vo;
            this.imgHead.source = ResPath.getPlayerIconSmall(vo.headIcon);
            this.imgLegion.source = "common_json.img_union_point" + vo.unionId + "_png";
            this.labLevel.text = vo.level + "";
            this.labName.text = vo.playerName;
            this.labVip.text = vo.vipLevel + "";
            this.labCount.text = vo.leftTimes + "";
        }
    };
    return SmithyInviteAlertRenderer;
}(ui.SmithyInviteAlertRendererSkin));
__reflect(SmithyInviteAlertRenderer.prototype, "SmithyInviteAlertRenderer");
