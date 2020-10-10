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
    var CampBattleJoinRenderer = (function (_super) {
        __extends(CampBattleJoinRenderer, _super);
        function CampBattleJoinRenderer() {
            return _super.call(this) || this;
        }
        CampBattleJoinRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this._pos = -1;
                this._playerId = "";
                this._battleId = 0;
                this.img_upBg.visible = false;
                this.img_downBg.visible = false;
                this.img_up0.visible = false;
                this.img_up1.visible = false;
                this.img_down0.visible = false;
                this.img_down1.visible = false;
                var data1 = this.data;
                this._playerId = data1.PlayerId;
                this.labName.text = data1.PlayerName;
                this.imgHead.source = ResPath.getPlayerIconSmall(data1.HeadIcon);
                if (data1.PlayerId == GameModels.user.player.uid) {
                    this.labName.textColor = TypeColor.GREEN;
                }
                else {
                    this.labName.textColor = 0xA69369;
                }
                this.labFight.text = Language.C_ZZL + ":" + data1.FightPower;
                this.labGuWuCount.text = data1.GuWuCount.toString();
                this.img_up0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.img_up1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.img_down0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                this.img_down1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            }
        };
        CampBattleJoinRenderer.prototype.showChangePet = function (battleId, pos) {
            if (pos == 0) {
                this.img_downBg.visible = true;
                this.img_down0.visible = true;
                this.img_down1.visible = true;
                this.img_down0.x = 52;
            }
            else if (pos == 1) {
                this.img_downBg.visible = true;
                this.img_upBg.visible = true;
                this.img_down0.visible = true;
                this.img_up0.visible = true;
                this.img_up0.x = 34;
                this.img_down0.x = 78;
            }
            else {
                this.img_upBg.visible = true;
                this.img_up0.visible = true;
                this.img_up1.visible = true;
                this.img_up0.x = 8;
            }
            this._pos = pos;
            this._battleId = battleId;
        };
        CampBattleJoinRenderer.prototype.onBtnClick = function (e) {
            if (this._battleId <= 0)
                return;
            if (this._pos < 0)
                return;
            var road = 0;
            if (e.target == this.img_down0 || e.target == this.img_down1) {
                if (this._pos == 0) {
                    if (e.target == this.img_down0) {
                        road = 1;
                    }
                    else {
                        road = 2;
                    }
                }
                else {
                    road = 2;
                }
            }
            else if (e.target == this.img_up0 || e.target == this.img_up1) {
                if (this._pos == 2) {
                    if (e.target == this.img_up0) {
                        road = 1;
                    }
                    else {
                        road = 0;
                    }
                }
                else {
                    road = 0;
                }
            }
            GameModels.campBattle.requesChangePet(this._battleId, this._playerId, road, utils.Handler.create(this, function () {
                mg.alertManager.tip(Language.J_GHCG);
            }));
        };
        return CampBattleJoinRenderer;
    }(ui.CampBattleJoinRendererSkin));
    renderer.CampBattleJoinRenderer = CampBattleJoinRenderer;
    __reflect(CampBattleJoinRenderer.prototype, "renderer.CampBattleJoinRenderer");
})(renderer || (renderer = {}));
