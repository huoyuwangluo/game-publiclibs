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
var copy;
(function (copy) {
    var GameTeamCopyUI = (function (_super) {
        __extends(GameTeamCopyUI, _super);
        function GameTeamCopyUI() {
            var _this = _super.call(this) || this;
            _this._monsterItems = [_this.ui.teamCopyItem0, _this.ui.teamCopyItem1, _this.ui.teamCopyItem2, _this.ui.teamCopyItem3];
            return _this;
        }
        Object.defineProperty(GameTeamCopyUI, "instance", {
            get: function () {
                if (!GameTeamCopyUI._instance) {
                    GameTeamCopyUI._instance = new GameTeamCopyUI();
                }
                return GameTeamCopyUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameTeamCopyUI.prototype.enter = function (userPlayer) {
            this._userPlayer = userPlayer;
            this.ui.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lookHandler, this);
            this.initSightMonsters();
            //this._userPlayer.onRelife(this, this.upDataSyncTarget);
            this._userPlayer.onTargetChange(this, this.targetChangeHandler);
            GameModels.scene.onSightAdd(this, this.sightAddHandler);
            GameModels.scene.onSightRemove(this, this.sightRemoveHandler);
            for (var _i = 0, _a = this._monsterItems; _i < _a.length; _i++) {
                var item = _a[_i];
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onkillClick, this);
            }
        };
        GameTeamCopyUI.prototype.exit = function () {
            this._sightMonsterList.length = 0;
            for (var _i = 0, _a = this._monsterItems; _i < _a.length; _i++) {
                var item = _a[_i];
                item.data = null;
                item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onkillClick, this);
            }
            this.ui.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.lookHandler, this);
            //this._userPlayer.offRelife(this, this.upDataSyncTarget);
            this._userPlayer.offTargetChange(this, this.targetChangeHandler);
            this._userPlayer = null;
            GameModels.scene.offSightAdd(this, this.sightAddHandler);
            GameModels.scene.offSightRemove(this, this.sightRemoveHandler);
        };
        GameTeamCopyUI.prototype.lookHandler = function (e) {
            var copyVO = GameModels.copyMaterial.getTypelistVOById(mo.ModelGameMaterial.COPY_TEAM, GameModels.copyMaterial.copyId());
            mg.alertManager.showAlert(TeamCopyStrategyAlert, false, true, copyVO);
        };
        /*private upDataSyncTarget(): void {
            // var smartVO: vo.GameSmartVO = (this._sightMonsterList && this._sightMonsterList[0]) ? this._sightMonsterList[0] : null;
            // if (smartVO) {
            // 	GameModels.user.player.setTarget(smartVO, true);
            // 	GameModels.scene.syncTarget(GameModels.user.player.uid, smartVO.uid);
            // }
            this._userPlayer.autoAttack = true;
            this._userPlayer.start();
        }*/
        GameTeamCopyUI.prototype.onkillClick = function (e) {
            var smartVO = e.currentTarget.data.smartVO;
            if (smartVO) {
                GameModels.scene.syncTarget(smartVO);
            }
        };
        GameTeamCopyUI.prototype.sightAddHandler = function (smartVO) {
            this.initSightMonsters();
        };
        GameTeamCopyUI.prototype.sightRemoveHandler = function (smartVO) {
            this.initSightMonsters();
        };
        /**目标变更 */
        GameTeamCopyUI.prototype.targetChangeHandler = function (sceneObject) {
            for (var i = 0; i < this._sightMonsterList.length; i++) {
                if (this._monsterItems[i]) {
                    this._monsterItems[i].data = { smartVO: this._sightMonsterList[i], isKill: (this._userPlayer.target && (this._userPlayer.target.vo.uid == this._sightMonsterList[i].uid)) };
                }
            }
        };
        GameTeamCopyUI.prototype.initSightMonsters = function () {
            this.getSightMonsters();
            for (var i = 0; i < 4; i++) {
                var monsterItem = this._monsterItems[i];
                if (i < this._sightMonsterList.length) {
                    monsterItem.data = { smartVO: this._sightMonsterList[i], isKill: (this._userPlayer.target && (this._userPlayer.target.vo.uid == this._sightMonsterList[i].uid)) };
                    this.ui.teamCopyMonsterGroup.addChild(monsterItem);
                }
                else {
                    if (monsterItem.parent) {
                        monsterItem.data = null;
                        monsterItem.parent.removeChild(monsterItem);
                    }
                }
            }
        };
        GameTeamCopyUI.prototype.getSightMonsters = function () {
            this._sightMonsterList = [];
            var sightMonsters = GameModels.scene.getObjectVOList(TypeActor.MONSTER);
            sightMonsters.sort(function (aVo, bVo) {
                if (aVo.type > bVo.type)
                    return -1;
                else if (aVo.type < bVo.type)
                    return 1;
                else if (aVo.configId > bVo.configId)
                    return -1;
                else if (aVo.configId < bVo.configId)
                    return 1;
                else
                    return 0;
            });
            if (sightMonsters.length <= 4)
                this._sightMonsterList = sightMonsters;
            for (var _i = 0, sightMonsters_1 = sightMonsters; _i < sightMonsters_1.length; _i++) {
                var smartVO = sightMonsters_1[_i];
                if (!this.isIdenticalById(smartVO.configId)) {
                    this._sightMonsterList.push(smartVO);
                }
            }
            for (var _a = 0, sightMonsters_2 = sightMonsters; _a < sightMonsters_2.length; _a++) {
                var smartVO = sightMonsters_2[_a];
                if (this._sightMonsterList.length < 4 && !this.isIdenticalByUniqueId(smartVO.uid)) {
                    this._sightMonsterList.push(smartVO);
                }
            }
        };
        GameTeamCopyUI.prototype.isIdenticalById = function (id) {
            for (var _i = 0, _a = this._sightMonsterList; _i < _a.length; _i++) {
                var smartVO = _a[_i];
                if (smartVO.configId == id) {
                    return true;
                }
            }
            return false;
        };
        GameTeamCopyUI.prototype.isIdenticalByUniqueId = function (id) {
            for (var _i = 0, _a = this._sightMonsterList; _i < _a.length; _i++) {
                var smartVO = _a[_i];
                if (smartVO.uid == id) {
                    return true;
                }
            }
            return false;
        };
        return GameTeamCopyUI;
    }(copy.GameUIBase));
    copy.GameTeamCopyUI = GameTeamCopyUI;
    __reflect(GameTeamCopyUI.prototype, "copy.GameTeamCopyUI");
})(copy || (copy = {}));
