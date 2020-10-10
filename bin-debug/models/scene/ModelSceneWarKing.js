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
var mo;
(function (mo) {
    /**王者争霸*/
    var ModelSceneWarKing = (function (_super) {
        __extends(ModelSceneWarKing, _super);
        function ModelSceneWarKing() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelSceneWarKing.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._attackersCollection = new eui.ArrayCollection();
            this._player = GameModels.user.player;
        };
        ModelSceneWarKing.prototype.enterGame = function (caller, method) {
            this._battleScene = GameModels.scene;
            this.exit();
            this.addlistenerRoutes();
            GameModels.scene.enterGame(TypeGame.CROSS_PET_FIGHT, "", this, function (result) {
                method.call(caller, result);
            });
        };
        ModelSceneWarKing.prototype.enableSight = function () {
            this.initAttacks();
        };
        ModelSceneWarKing.prototype.exit = function () {
            this.offAllAttacksChange();
            this.clearAttacks();
            this.removelistenerRoutes();
        };
        ModelSceneWarKing.prototype.addlistenerRoutes = function () {
            this._battleScene.onSightAdd(this, this.sightAddHandler);
            this._battleScene.onSightRemove(this, this.sightRemoveHandler);
            this._battleScene.onTargetChange(this, this.targetChangeHandler);
            this._battleScene.onObjectTeamStatusChange(this, this.objectStatusChangeHandler);
        };
        ModelSceneWarKing.prototype.removelistenerRoutes = function () {
            this._battleScene.offSightAdd(this, this.sightAddHandler);
            this._battleScene.offSightRemove(this, this.sightRemoveHandler);
            this._battleScene.offTargetChange();
            this._battleScene.offObjectTeamStatusChange(this, this.objectStatusChangeHandler);
            this.offAllAttacksChange();
        };
        ModelSceneWarKing.prototype.sightAddHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.addToAttacks(smartVO, false);
            }
        };
        ModelSceneWarKing.prototype.sightRemoveHandler = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                this.removeFromAttacks(smartVO);
            }
        };
        ModelSceneWarKing.prototype.targetChangeHandler = function (smartVO, target) {
            if (target == GameModels.user.player && (smartVO instanceof vo.GamePlayerVO)) {
                this.addToAttacks(smartVO, true);
            }
        };
        ModelSceneWarKing.prototype.objectStatusChangeHandler = function (smartVO, isAlife, killer, lostContent) {
            if (smartVO instanceof vo.GamePlayerVO) {
                if (smartVO.stateDead) {
                    this.removeFromAttacks(smartVO);
                }
                else {
                    this.addToAttacks(smartVO, false);
                }
            }
        };
        /**同步位置信息 */
        ModelSceneWarKing.prototype.syncPosition = function (type, objectId, x, y) {
            GameModels.scene.syncPosition(type, objectId, x, y);
        };
        /**同步技能施放 */
        ModelSceneWarKing.prototype.syncSkill = function (castObjId, skillId, targetObjId, direct, posX, posY) {
            GameModels.scene.syncSkill(castObjId, skillId, targetObjId, direct, posX, posY);
        };
        // /**同步解合体 */
        // public syncMerge(petUId: string, status: boolean) {
        //     GameModels.scene.syncMerge(petUId, status);
        // }
        /**请求复活 （0:常规，1:原地立即复活）*/
        ModelSceneWarKing.prototype.requestRelife = function (type) {
            GameModels.scene.requestRelife(type);
        };
        /**同步当前目标 */
        ModelSceneWarKing.prototype.syncTarget = function (smartVO) {
            GameModels.scene.syncTarget(smartVO);
        };
        /**取视野对象 */
        ModelSceneWarKing.prototype.getObjectByUId = function (uid) {
            return GameModels.scene.getObjectByUId(uid);
        };
        /**取对象列表 */
        ModelSceneWarKing.prototype.getObjectVOList = function (actorType) {
            return GameModels.scene.getObjectVOList(actorType);
        };
        ModelSceneWarKing.prototype.initAttacks = function () {
            for (var _i = 0, _a = this._battleScene.sights; _i < _a.length; _i++) {
                var smartVO = _a[_i];
                if (smartVO instanceof vo.GamePlayerVO) {
                    this._attackersCollection.addItem(smartVO);
                }
            }
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.runWith(false);
            }
        };
        /**添加到攻击列表 */
        ModelSceneWarKing.prototype.addToAttacks = function (playerVO, prior) {
            if (playerVO == GameModels.user.player)
                return;
            var index = this._attackersCollection.getItemIndex(playerVO);
            if (index < 0) {
                prior ? this._attackersCollection.addItemAt(playerVO, 0) : this._attackersCollection.addItem(playerVO);
            }
            else {
                if (prior) {
                    this._attackersCollection.removeItemAt(index);
                    this._attackersCollection.addItemAt(playerVO, 0);
                }
            }
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.runWith(true);
            }
        };
        /**从攻击列表移除 */
        ModelSceneWarKing.prototype.removeFromAttacks = function (playerVO) {
            var index = this._attackersCollection.getItemIndex(playerVO);
            if (index >= 0) {
                this._attackersCollection.removeItemAt(index);
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        /**清空攻击列表 */
        ModelSceneWarKing.prototype.clearAttacks = function () {
            if (this._attackersCollection.length) {
                this._attackersCollection.removeAll();
                if (this._attacksChangeHandlers) {
                    this._attacksChangeHandlers.runWith(false);
                }
            }
        };
        Object.defineProperty(ModelSceneWarKing.prototype, "attackersCollection", {
            //获取攻击列表
            get: function () {
                return this._attackersCollection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSceneWarKing.prototype, "killer", {
            /**击杀者 */
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        ModelSceneWarKing.prototype.onAttacksChange = function (caller, method) {
            if (!this._attacksChangeHandlers) {
                this._attacksChangeHandlers = new utils.Handlers(false);
            }
            this._attacksChangeHandlers.add(caller, method, null, false);
        };
        ModelSceneWarKing.prototype.offAttacksChange = function (caller, method) {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.remove(caller, method);
            }
        };
        ModelSceneWarKing.prototype.offAllAttacksChange = function () {
            if (this._attacksChangeHandlers) {
                this._attacksChangeHandlers.clear();
            }
        };
        return ModelSceneWarKing;
    }(mo.ModelBase));
    mo.ModelSceneWarKing = ModelSceneWarKing;
    __reflect(ModelSceneWarKing.prototype, "mo.ModelSceneWarKing", ["mo.IModelMutilScene", "mo.IModelScene"]);
})(mo || (mo = {}));
