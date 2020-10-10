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
var s;
(function (s) {
    var GameKingBattleGround = (function (_super) {
        __extends(GameKingBattleGround, _super);
        function GameKingBattleGround(type) {
            if (type === void 0) { type = 0; }
            return _super.call(this, type ? type : TypeGame.KING_BATTLE_GROUD) || this;
        }
        GameKingBattleGround.prototype.enter = function () {
            this._isEnter = true;
            this._isEnterOver = false;
            this._battleModel = GameModels.sceneKingBattle;
            this._objectTouchEnabled = true;
            this._scene.clear(true);
            this.enterMap(29001);
        };
        GameKingBattleGround.prototype.exit = function () {
            GameModels.sceneKingBattle.exit();
            copy.GameKingBattleUI.instance.exit();
            mg.alertManager.closeALert();
            this._player.focusMode = false;
            _super.prototype.exit.call(this);
            this.removeSelectEffects();
            this._scene.removeAllBox(false);
        };
        GameKingBattleGround.prototype.start = function () {
            _super.prototype.start.call(this);
            this.addSelectEffects();
            GameModels.sceneKingBattle.enableSight();
        };
        GameKingBattleGround.prototype.displayMyPlayer = function () {
            _super.prototype.displayMyPlayer.call(this);
            this._player.petGroup.formatPosition(((this._player.direct / 2) >> 0) * 2);
            this._player.autoAttack = false;
            this.enableControl();
        };
        GameKingBattleGround.prototype.stop = function () {
            this._player.offDeadAll();
            this.disableControl();
            _super.prototype.stop.call(this);
        };
        GameKingBattleGround.prototype.startUI = function () {
            copy.GameKingBattleUI.instance.enter(this._modelScene, utils.Handler.create(this, this.startAttack, null, false));
        };
        /**其他玩家死亡 */
        GameKingBattleGround.prototype.otherPlayerDeadHandler = function (bodyVO, killerVO, lostContent) {
            _super.prototype.otherPlayerDeadHandler.call(this, bodyVO, killerVO, lostContent);
            if (this._player.target && this._player.target.vo == bodyVO) {
                //this._player.target=null;
                this._modelScene.syncTarget(null);
            }
        };
        GameKingBattleGround.prototype.addSelectEffects = function () {
            if (!this._selectEffectList)
                this._selectEffectList = [];
            for (var i = 0; i < 5; i++) {
                var pos = GameModels.sceneKingBattle.getSwordPos(i);
                var selectEffect = utils.ObjectPool.from(s.AnimationSprite);
                selectEffect.resId = (i == 0) ? "6333" : (i <= 2 ? "6332" : "6331"); //(i==0||i==1)?"6331":((i==2 || i==3)?"6332":"6333");
                selectEffect.frameRate = 8;
                selectEffect.x = game.MapConfig.getReaX(pos["x"]);
                selectEffect.y = game.MapConfig.getReaY(pos["y"]);
                this._scene.addEffectBehind(selectEffect);
                selectEffect.play();
                this._selectEffectList.push(selectEffect);
            }
        };
        GameKingBattleGround.prototype.removeSelectEffects = function () {
            if (this._selectEffectList) {
                for (var _i = 0, _a = this._selectEffectList; _i < _a.length; _i++) {
                    var effect = _a[_i];
                    effect.stop();
                    utils.ObjectPool.to(effect, true);
                }
                this._selectEffectList.length = 0;
            }
        };
        //--------------------------------------------
        GameKingBattleGround.prototype.userDeadHandler = function (killerVO) {
            copy.CopyMainView.instance.relifeView.show(killerVO ? killerVO.name : "NONE", "", 15, 20, this, function (useGold) {
                this._modelScene.requestRelife(useGold ? 1 : 0);
            });
        };
        GameKingBattleGround.prototype.refreshScoreBox = function () {
            if (this._boxList) {
                for (var _i = 0, _a = this._boxList; _i < _a.length; _i++) {
                    var box = _a[_i];
                    box.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getBox, this);
                }
            }
            this._boxList = [];
            this._scene.removeAllBox(false);
            var posList = GameModels.sceneKingBattle.boxList;
            for (var i = 0; i < posList.length; i++) {
                var box_1 = utils.ObjectPool.from(s.GameBox);
                box_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getBox, this);
                box_1.tapEnabled = true;
                this._scene.addBox(box_1);
                box_1.x = game.MapConfig.getReaX(posList[i].X);
                box_1.y = game.MapConfig.getReaY(posList[i].Y);
                box_1.xy = posList[i];
                this._boxList.push(box_1);
            }
        };
        /** 请求宝箱奖励*/
        GameKingBattleGround.prototype.getBox = function (e) {
            var box = e.currentTarget;
            GameModels.sceneKingBattle.getBox(box.xy, utils.Handler.create(this, this.complete));
        };
        GameKingBattleGround.prototype.complete = function () {
            mg.alertManager.tip(Language.J_KQBXCG);
        };
        return GameKingBattleGround;
    }(s.GameMutiPlayerBoss));
    s.GameKingBattleGround = GameKingBattleGround;
    __reflect(GameKingBattleGround.prototype, "s.GameKingBattleGround");
})(s || (s = {}));
