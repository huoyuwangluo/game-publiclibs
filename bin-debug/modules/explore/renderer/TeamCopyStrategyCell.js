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
    var TeamCopyStrategyCell = (function (_super) {
        __extends(TeamCopyStrategyCell, _super);
        function TeamCopyStrategyCell() {
            return _super.call(this) || this;
        }
        TeamCopyStrategyCell.prototype.dataChanged = function () {
            if (this.data) {
                var helpTmp = this.data;
                var tmp = Templates.getTemplateById(templates.Map.OTHERMONSTER, helpTmp.monsterId);
                this.bossHead.source = ResPath.getBossIconSmall(tmp.resId);
                this.labName.text = tmp.name;
                this.labtype.textFlow = utils.TextFlowMaker.generateTextFlow(helpTmp.rank);
                this.labDes.textFlow = utils.TextFlowMaker.generateTextFlow(helpTmp.des);
            }
            else {
                this.bossHead.source = null;
            }
        };
        return TeamCopyStrategyCell;
    }(ui.TeamCopyStrategyRendererSkin));
    renderer.TeamCopyStrategyCell = TeamCopyStrategyCell;
    __reflect(TeamCopyStrategyCell.prototype, "renderer.TeamCopyStrategyCell");
})(renderer || (renderer = {}));
