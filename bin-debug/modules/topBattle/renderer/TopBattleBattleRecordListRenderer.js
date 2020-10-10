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
    var TopBattleBattleRecordListRenderer = (function (_super) {
        __extends(TopBattleBattleRecordListRenderer, _super);
        function TopBattleBattleRecordListRenderer() {
            return _super.call(this) || this;
        }
        TopBattleBattleRecordListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data1 = this.data;
                this.labStep.text = GameModels.topBattle.getFightName(data1.BattleStep);
                this.labName.textFlow = utils.htmlUtil.getUnderlineFormat(data1.PlayerName);
                if (data1.Result == 2) {
                    this.labEnd.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_F);
                    this.labEnd.textColor = TypeColor.RED1;
                }
                else if (data1.Result == 1) {
                    this.labEnd.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_SLA);
                    this.labEnd.textColor = TypeColor.GREEN1;
                }
                else {
                    this.labEnd.text = Language.C_LK;
                    this.labEnd.textColor = 0xd3d3d3;
                }
                this.labName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.labEnd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
        };
        TopBattleBattleRecordListRenderer.prototype.onBtnClick = function (e) {
            var data1 = this.data;
            switch (e.target) {
                case this.labName:
                    GameModels.friends.getPromptInfo(data1.PlayerId, utils.Handler.create(this, function (info, count) {
                        mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                    }));
                case this.labEnd:
                    if (data1.Result == 0)
                        return;
                    if (data1.Result == 3) {
                        mg.alertManager.tip(Language.J_BLLK);
                        return;
                    }
                    GameModels.topBattle.requsetGetRoomSceneEndInfo(data1.RoomId, utils.Handler.create(this, function () {
                        var leftEnd = GameModels.topBattle.leftEndVo;
                        var rightEnd = GameModels.topBattle.rightEndVo;
                        mg.alertManager.showAlert(CopyBattleStatistics, true, true, leftEnd, rightEnd, data1.Result);
                    }));
                    break;
            }
        };
        return TopBattleBattleRecordListRenderer;
    }(ui.TopBattleBattleRecordListRendererSkin));
    renderer.TopBattleBattleRecordListRenderer = TopBattleBattleRecordListRenderer;
    __reflect(TopBattleBattleRecordListRenderer.prototype, "renderer.TopBattleBattleRecordListRenderer");
})(renderer || (renderer = {}));
