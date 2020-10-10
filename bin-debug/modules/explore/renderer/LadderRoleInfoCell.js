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
    var LadderRoleInfoCell = (function (_super) {
        __extends(LadderRoleInfoCell, _super);
        function LadderRoleInfoCell() {
            return _super.call(this) || this;
        }
        LadderRoleInfoCell.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnDebrs.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopImmediatePropagation();
                this.parent.dispatchEventWith("ENTER", false, this.data);
            }, this);
            this.imgJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                app.gameContext.enterLadderFight("");
            }, this);
        };
        LadderRoleInfoCell.prototype.updataJoinFightState = function () {
            if (GameModels.scene.getjoinSceneListByType(TypeGame.LADDER_FIGHT)) {
                this.imgJoin.visible = true;
                this.btnDebrs.visible = false;
            }
            else {
                this.imgJoin.visible = false;
                this.btnDebrs.visible = true;
            }
        };
        LadderRoleInfoCell.prototype.updateRoleData = function (data, index) {
            this._playerData = data;
            this._index = index;
            if (this.currentState == LadderRoleInfoCell.OTHERSTATE) {
                this.labXunZhang.text = data.myOrAddMedal.toString();
                this.imgQiangDi.visible = this._playerData.fightPower > GameModels.ladder.roleData.fightPower;
            }
            else {
                this.labXunZhang.text = data.ladderRanking.toString();
                this.labMyShengWang.text = GameModels.user.player.shengwang + "";
            }
            this.btnDebrs.label = this._index == 3 ? Language.C_SD : Language.C_TZ;
            this.labName.text = data.name;
            // this.imgRanking.source = data.step;
            var ladderStep = this._playerData.step;
            this.imgGrade.source = dialog.explore.TypeGrade.getGradeImage(ladderStep);
            if (ladderStep != dialog.explore.TypeGrade.EXTREME) {
                this.imgLv.visible = true;
                this.imgLv.source = dialog.explore.TypeGrade.getLvImge(ladderStep, this._playerData.lv);
            }
            else {
                this.imgLv.visible = false;
            }
            this.labJiFen.text = data.myOrAddScore.toString();
            this.labFightPower.text = data.fightPower.toString();
            this.labYuanBao.text = data.yuanBao.toString();
            var profession = this._playerData.profession;
            this.icon.setIcon(ResPath.getPlayerIconSmall(this._playerData.playerHeadIcon));
            this.updataJoinFightState();
        };
        Object.defineProperty(LadderRoleInfoCell.prototype, "data", {
            get: function () {
                return { player: this._playerData, index: this._index };
            },
            enumerable: true,
            configurable: true
        });
        /** 其他玩家*/
        LadderRoleInfoCell.OTHERSTATE = "other";
        /** 本命玩家*/
        LadderRoleInfoCell.OWNSTATE = "own";
        return LadderRoleInfoCell;
    }(ui.LadderRoleInfoCellSkin));
    renderer.LadderRoleInfoCell = LadderRoleInfoCell;
    __reflect(LadderRoleInfoCell.prototype, "renderer.LadderRoleInfoCell");
})(renderer || (renderer = {}));
