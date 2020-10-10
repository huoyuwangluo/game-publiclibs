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
    var GameLegionWar = (function (_super) {
        __extends(GameLegionWar, _super);
        function GameLegionWar(type) {
            if (type === void 0) { type = 0; }
            return _super.call(this, type ? type : TypeGame.LEGION_WAR) || this;
        }
        GameLegionWar.prototype.enter = function () {
            this._isEnter = true;
            this._isEnterOver = false;
            //this._objectTouchEnabled = true;
            this._sceneModel = GameModels.sceneLegin;
            this._scene.clear(true);
            this.enterMap(22007);
            this.enableObjectsTap();
        };
        GameLegionWar.prototype.exit = function () {
            this.removeNpcs();
            GameModels.city.removeEventListener(mo.ModelCity.FLAG_CHANGE, this.flagChange, this);
            GameModels.sceneLegin.exit();
            copy.GameLegionWarUI.instance.exit();
            mg.alertManager.closeALert();
            this._player.focusMode = false;
            _super.prototype.exit.call(this);
        };
        GameLegionWar.prototype.start = function () {
            _super.prototype.start.call(this);
            this.addNpcs();
            GameModels.city.addEventListener(mo.ModelCity.FLAG_CHANGE, this.flagChange, this);
            GameModels.sceneLegin.enableSight();
            this.enableControl();
            //this._player.autoAttack = true;
        };
        GameLegionWar.prototype.stop = function () {
            this._player.offDeadAll();
            this.disableControl();
            _super.prototype.stop.call(this);
        };
        GameLegionWar.prototype.onSceneTap = function (tileX, tileY) {
            copy.GameLegionWarUI.instance.cancelAutoAttackCamp();
            _super.prototype.onSceneTap.call(this, tileX, tileY);
        };
        /**是否为敌方单位 */
        GameLegionWar.prototype.isEnemyObject = function (fs, target) {
            if (fs == target || fs == null || target == null)
                return false;
            var ret = false;
            if (fs.master != target.master) {
                var sceneFlag1 = fs.master && fs.master.vo ? fs.master.vo.sceneFlag : (fs.vo ? fs.vo.sceneFlag : "");
                var sceneFlag2 = target.master && target.master.vo ? target.master.vo.sceneFlag : (target.vo ? target.vo.sceneFlag : "");
                if (sceneFlag1 != "" && sceneFlag1 != sceneFlag2) {
                    ret = true;
                }
            }
            return ret;
        };
        GameLegionWar.prototype.startUI = function () {
            copy.GameLegionWarUI.instance.enter(this, this._modelScene, utils.Handler.create(this, this.playerHeadTouchHandler, null, false), this._player);
        };
        GameLegionWar.prototype.playerHeadTouchHandler = function (playerVO) {
            var leaderVO = playerVO.getTeamLeaderVO();
            if (leaderVO == null)
                return;
            this.startAttack(playerVO);
        };
        GameLegionWar.prototype.userDeadHandler = function (killerVO, lostContent) {
            copy.CopyMainView.instance.relifeView.show(killerVO ? killerVO.name : "NONE", lostContent, 15, 20, this, function (useGold) {
                this._modelScene.requestRelife(useGold ? 1 : 0);
            });
        };
        /**其他玩家死亡 */
        GameLegionWar.prototype.otherPlayerDeadHandler = function (bodyVO, killerVO, lostContent) {
            if (killerVO == this._player.vo) {
                mg.alertManager.tip(Language.getExpression(Language.E_CGJS2, bodyVO.name, lostContent));
            }
            if (this._player.target && this._player.target.vo == bodyVO) {
                //this._player.target=null;
                this._modelScene.syncTarget(null);
            }
        };
        GameLegionWar.prototype.addNpcs = function () {
            this._npcs = [];
            for (var _i = 0, _a = this._scene.data.npcs; _i < _a.length; _i++) {
                var npcData = _a[_i];
                var npcTemplate = Templates.getTemplateById(templates.Map.CITYNPC, npcData.id);
                if (!npcTemplate) {
                    logger.error("NPC 又配错啦！！！ id=" + npcData.id);
                    continue;
                }
                if (npcTemplate.type >= 4 && npcTemplate.type <= 6) {
                    if (npcTemplate.type == 5)
                        this._flagNode1 = npcData.node;
                    else if (npcTemplate.type == 4)
                        this._flagNode2 = npcData.node;
                    else if (npcTemplate.type == 6)
                        this._flagNode3 = npcData.node;
                    continue; //阵营旗子先不显示，等后端数据返回再显示
                }
            }
        };
        GameLegionWar.prototype.getNpcs = function () {
            return this._npcs;
        };
        GameLegionWar.prototype.removeNpcs = function () {
            for (var _i = 0, _a = this._npcs; _i < _a.length; _i++) {
                var npc = _a[_i];
                utils.ObjectPool.to(npc, true);
            }
            this._npcs = null;
        };
        GameLegionWar.prototype.flagChange = function (e) {
            var flagLevels = e.data;
            for (var _i = 0, _a = this._npcs; _i < _a.length; _i++) {
                var npc = _a[_i];
                var npcType = npc.vo.template.type;
                if (npcType >= 4 && npcType <= 6) {
                    this._scene.removeNpc(npc);
                }
            }
            var flagList = Templates.getList(templates.Map.CAMPFLAG);
            for (var i = 0; i < flagLevels.length; i++) {
                for (var _b = 0, flagList_1 = flagList; _b < flagList_1.length; _b++) {
                    var flagData = flagList_1[_b];
                    if (flagData.id == flagLevels[i]) {
                        var index = i + 1;
                        var npcId = flagData["npcId" + index];
                        var npcTemplate = Templates.getTemplateById(templates.Map.CITYNPC, npcId);
                        var npcVO = vo.fromPool(vo.GameNpcVO, npcTemplate);
                        var npc = utils.ObjectPool.from(s.GameNpc);
                        npc.tapEnabled = true;
                        npc.initialize(npcVO);
                        npc.bloodVisible = false;
                        npc.setTile(this["_flagNode" + index]);
                        this._scene.addNpc(npc);
                        this._npcs.push(npc);
                    }
                }
            }
        };
        return GameLegionWar;
    }(s.GameMutiPlayerBoss));
    s.GameLegionWar = GameLegionWar;
    __reflect(GameLegionWar.prototype, "s.GameLegionWar");
})(s || (s = {}));
