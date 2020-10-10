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
    /**九曲之都BOSS */
    var GameWoorsBoss = (function (_super) {
        __extends(GameWoorsBoss, _super);
        function GameWoorsBoss(type) {
            return _super.call(this, type ? type : TypeGame.WOORS_BOSS) || this;
        }
        GameWoorsBoss.prototype.enter = function (copyVO) {
            _super.prototype.enter.call(this, copyVO);
        };
        GameWoorsBoss.prototype.exit = function () {
            copy.GameWoorsBossUI.instance.exit();
            GameModels.sceneWoorsServer.exit();
            _super.prototype.exit.call(this);
        };
        GameWoorsBoss.prototype.start = function () {
            _super.prototype.start.call(this);
            GameModels.sceneWoorsServer.onPlayerDead(this, this.playerDeadHandler);
        };
        GameWoorsBoss.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.sports;
        };
        GameWoorsBoss.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 3;
        };
        GameWoorsBoss.prototype.displayMyPlayer = function () {
            _super.prototype.displayMyPlayer.call(this);
            this._player.autoAttack = false;
        };
        GameWoorsBoss.prototype.sightInitHandler = function () {
            this._modelScene.syncTarget(GameModels.sceneWoorsServer.boss);
            this.enableControl();
            this.enableObjectsTap();
        };
        GameWoorsBoss.prototype.stop = function () {
            GameModels.sceneWoorsServer.offPlayerDead();
            _super.prototype.stop.call(this);
        };
        GameWoorsBoss.prototype.startUI = function () {
            copy.GameWoorsBossUI.instance.enter(this._player);
        };
        GameWoorsBoss.prototype.startAttack = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                if (smartVO.legionId == GameModels.user.player.legionId) {
                    mg.alertManager.tip(Language.J_XTJTBNHXGJ);
                    return;
                }
            }
            _super.prototype.startAttack.call(this, smartVO);
        };
        /**玩家复活 */
        GameWoorsBoss.prototype.userRelifeHandler = function () {
            _super.prototype.userRelifeHandler.call(this);
            //this._player.target=this.getObjectByVO(GameModels.sceneCrossServer.boss);
            this._modelScene.syncTarget(GameModels.sceneWoorsServer.getBossVO());
        };
        GameWoorsBoss.prototype.playerDeadHandler = function (data) {
            var bodyVO = data.body;
            var killerVO = data.killer;
            if (this._player.target && this._player.target.vo == bodyVO) {
                if (killerVO == this._player.vo)
                    mg.alertManager.tip(Language.getExpression(Language.E_1BJBL, bodyVO.name));
                this._modelScene.syncTarget(GameModels.sceneWoorsServer.getBossVO());
                //this._player.target=this.getObjectByVO(GameModels.sceneCrossServer.boss);
            }
        };
        GameWoorsBoss.prototype.getFlagChangHandler = function () {
            var npcVO = GameModels.sceneWoorsServer.getNpcVO();
            if (npcVO) {
                var min = Number.MAX_VALUE;
                for (var _i = 0, _a = GameModels.sceneWoorsServer.flagOwerServerIds; _i < _a.length; _i++) {
                    var serverId = _a[_i];
                    min = Math.min(min, parseInt(serverId));
                }
                var name = Language.getExpression(Language.E_GS1F, min);
                var npc = this.getObjectByVO(npcVO);
                npc.titleName = name;
                if (GameModels.sceneWoorsServer.isOwerServer()) {
                    npc.titleColor = 0x00FF00;
                }
                else {
                    npc.titleColor = 0xFF0000;
                }
            }
        };
        GameWoorsBoss.prototype.startGetFlag = function () {
            this.getObjectByVO;
            var npcVO = GameModels.sceneWoorsServer.getNpcVO();
            if (npcVO) {
                var node = battle.manager.getAroundEmptyNode(this._scene, this._scene.getNode(npcVO.tileX, npcVO.tileY), this._player.tileNode);
                if (!node)
                    return;
                this._player.movePathTo(node.x, node.y);
                this._player.onTileChange(this, this.playerTileChangeHandler2);
            }
        };
        GameWoorsBoss.prototype.playerTileChangeHandler2 = function () {
            var npcVO = GameModels.sceneWoorsServer.getNpcVO();
            if (!npcVO) {
                this._player.clearMovePath();
                this._player.offTileChange(this, this.playerTileChangeHandler2);
                return;
            }
            if (Math.abs(this._player.tileX - npcVO.tileX) <= 1 && Math.abs(this._player.tileY - npcVO.tileY) <= 1) {
                this._player.clearMovePath();
                this._player.offTileChange(this, this.playerTileChangeHandler2);
            }
        };
        Object.defineProperty(GameWoorsBoss.prototype, "sceneEveryBoss", {
            get: function () {
                return GameModels.sceneWoorsServer;
            },
            enumerable: true,
            configurable: true
        });
        //点模型暂时不要
        GameWoorsBoss.prototype.addNpcToSight = function (npcVO) {
            var npc = _super.prototype.addNpcToSight.call(this, npcVO);
            npc.nameVisible = true;
            //npc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGetFlag, this);
            return npc;
        };
        // protected removeObjectFromSight(smartVO: vo.GameSmartVO): SmartObject {
        // 	var smartObject: SmartObject = super.removeObjectFromSight(smartVO);
        // 	if (smartObject instanceof s.GameNpc) {
        // 		smartObject.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGetFlag, this);
        // 	}
        // 	return smartObject;
        // }
        // private onStartGetFlag(): void {
        // 	GameModels.sceneCrossServer.requestKuaFuStartGetFlag();
        // }
        GameWoorsBoss.prototype.endHandler = function (result, totalStar, dropItems, winUId) {
            this.end(result, totalStar, dropItems, GameModels.scene.getObjectByUId(winUId));
        };
        return GameWoorsBoss;
    }(s.GameMutiPlayerBoss));
    s.GameWoorsBoss = GameWoorsBoss;
    __reflect(GameWoorsBoss.prototype, "s.GameWoorsBoss");
})(s || (s = {}));
