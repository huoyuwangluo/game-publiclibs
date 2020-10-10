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
    var GameEveryBoss = (function (_super) {
        __extends(GameEveryBoss, _super);
        function GameEveryBoss(type) {
            if (type === void 0) { type = 0; }
            return _super.call(this, type ? type : TypeGame.EVERYONE_BOSS) || this;
        }
        GameEveryBoss.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.copyboss;
        };
        GameEveryBoss.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 1;
        };
        Object.defineProperty(GameEveryBoss.prototype, "sceneEveryBoss", {
            get: function () {
                return GameModels.sceneEveryBoss;
            },
            enumerable: true,
            configurable: true
        });
        GameEveryBoss.prototype.enter = function (copyVO) {
            _super.prototype.enter.call(this, copyVO);
        };
        GameEveryBoss.prototype.exit = function () {
            copy.GameEveryBossUI.instance.exit();
            GameModels.sceneEveryBoss.exit();
            _super.prototype.exit.call(this);
        };
        GameEveryBoss.prototype.start = function () {
            _super.prototype.start.call(this);
            //GameModels.sceneEveryBoss.onPlayerDead(this,this.playerDeadHandler);
            //this.enableControl();
        };
        GameEveryBoss.prototype.displayMyPlayer = function () {
            _super.prototype.displayMyPlayer.call(this, s.AISmartSync);
            logger.log('我的出生点:', this._player.vo.tileX, this._player.vo.tileY);
            this._player.autoAttack = false;
        };
        /*
        protected displayMyPlayer() {
            super.displayMyPlayer(AISmartSync);
        }*/
        GameEveryBoss.prototype.sightInitHandler = function () {
            //this._player.target=this.getObjectByVO(GameModels.sceneEveryBoss.boss);
            this.enableControl();
            this.startAttack(GameModels.sceneEveryBoss.boss);
            //this._modelScene.syncTarget(GameModels.sceneEveryBoss.boss);
        };
        GameEveryBoss.prototype.stop = function () {
            GameModels.sceneEveryBoss.offPlayerDead();
            _super.prototype.stop.call(this);
        };
        GameEveryBoss.prototype.startUI = function () {
            copy.GameEveryBossUI.instance.enter(GameModels.sceneEveryBoss, this._player);
        };
        GameEveryBoss.prototype.addPlayerToSight = function (playerVO) {
            var player = _super.prototype.addPlayerToSight.call(this, playerVO);
            logger.log(player.vo.name + "\u51FA\u751F\u70B9:", player.vo.tileX, player.vo.tileY);
            return player;
        };
        /**玩家复活 */
        GameEveryBoss.prototype.userRelifeHandler = function () {
            _super.prototype.userRelifeHandler.call(this);
            //this._player.target=this.getObjectByVO(GameModels.sceneEveryBoss.boss);
            this.startAttack(GameModels.sceneEveryBoss.boss);
            //this._modelScene.syncTarget(GameModels.sceneEveryBoss.boss);
        };
        /*
        protected playerDeadHandler(data:any){
            var bodyVO:vo.GameSmartVO=data.body;
            var killerVO:vo.GameSmartVO=data.killer;
            var targetVO:vo.GameSmartVO = this._player.getTeamTargetVO();
            if(targetVO==bodyVO || targetVO.master==bodyVO){
                if(killerVO==this._player.vo) mg.alertManager.tip(Language.getExpression(Language.E_1BJBL,bodyVO.name));
                this.startAttack(GameModels.sceneEveryBoss.boss);
            }
        }
        */
        GameEveryBoss.prototype.endHandler = function (result, totalStar, dropItems, winUId) {
            this.end(result, totalStar, dropItems, GameModels.scene.getObjectByUId(winUId));
        };
        return GameEveryBoss;
    }(s.GameMutiPlayerBoss));
    s.GameEveryBoss = GameEveryBoss;
    __reflect(GameEveryBoss.prototype, "s.GameEveryBoss");
})(s || (s = {}));
