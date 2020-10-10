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
    var KingBattlefieldRenderer = (function (_super) {
        __extends(KingBattlefieldRenderer, _super);
        function KingBattlefieldRenderer() {
            return _super.call(this) || this;
        }
        KingBattlefieldRenderer.prototype.initialize = function () {
            this.enableHandler();
        };
        KingBattlefieldRenderer.prototype.initializeData = function (data) {
            this.reset();
            this._swordInfo = data;
            if (!data.playerVO) {
                this.head.visible = false;
                this.occupy.visible = true;
                this.plunder.visible = false;
                this.labName.text = "";
                this.imgSameLegoin.visible = false;
            }
            else {
                this.head.visible = true;
                this.occupy.visible = false;
                this.head.source = ResPath.getPlayerIconSmall(data.playerVO.headIcon);
                this.plunder.visible = !(data.playerVO.uid == GameModels.user.player.uid);
                this.labName.text = data.playerVO.name;
                this.labName.textColor = (data.playerVO.uid == GameModels.user.player.uid ? 0x34E22C : 0x1291CE);
                this.imgSameLegoin.visible = data.playerVO.legionId ? true : false;
                this.imgSameLegoin.source = "common_json.img_union_point" + data.playerVO.legionId + "_png";
                //this.imgSameLegoin.visible=(data.playerVO!=GameModels.user.player&&data.playerVO.legionId==GameModels.user.player.legionId);
            }
            if (data.pos == 1) {
                this.labState.text = Language.getExpression(Language.E_1BQY, 8);
            }
            else if (data.pos == 2 || data.pos == 3) {
                this.labState.text = Language.getExpression(Language.E_1BQY, 5);
            }
            else {
                this.labState.text = Language.getExpression(Language.E_1BQY, 3);
            }
        };
        KingBattlefieldRenderer.prototype.disableHandler = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this._swordInfo = null;
            this.head.source = null;
        };
        KingBattlefieldRenderer.prototype.enableHandler = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        };
        KingBattlefieldRenderer.prototype.touchHandler = function (e) {
            egret.Tween.removeTweens(this);
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.scaleX = this.scaleY = 1;
                    egret.Tween.get(this).to({
                        scaleX: 0.7,
                        scaleY: 0.7,
                    }, 300, utils.Ease.cubicOut);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    if (this._swordInfo.playerVO && this._swordInfo.playerVO.uid != "" && this._swordInfo.playerVO.uid != GameModels.user.player.uid) {
                        var playerVO = GameModels.sceneKingBattle.getObjectByUId(this._swordInfo.playerVO.uid);
                        if (!playerVO.isTeamAllDead) {
                            var gameKingBattle = app.gameContext.manager.getGameKingBattlefieldFight();
                            gameKingBattle.startAttack(playerVO);
                            break;
                        }
                    }
                    else {
                        var pos = GameModels.sceneKingBattle.getSwordPos((this._swordInfo.pos - 1));
                        var gameChaper = app.gameContext.manager.getGameKingBattlefieldFight();
                        gameChaper.startMove(pos.x, pos.y);
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.circOut);
                    if (this.stage)
                        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    break;
            }
        };
        return KingBattlefieldRenderer;
    }(ui.KingBattlefieldRendererSkin));
    renderer.KingBattlefieldRenderer = KingBattlefieldRenderer;
    __reflect(KingBattlefieldRenderer.prototype, "renderer.KingBattlefieldRenderer");
})(renderer || (renderer = {}));
