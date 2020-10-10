var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var GameBase = (function () {
        function GameBase(type) {
            this._exitEnterGame = s.GameAtkCity;
            this._type = type;
            this._viewClass = TypeGame.getView(this._type);
            this._modelScene = TypeGame.getModelScene(this._type);
            this.createChildren();
            //this._enemys = [];
            //this._enemys[TypeActor.PLAYER] = this.getEnemy(TypeActor.PLAYER);
            //this._enemys[TypeActor.PET] = this.getEnemy(TypeActor.PET);
            //this._enemys[TypeActor.MONSTER] = this.getEnemy(TypeActor.MONSTER);
            //this._enemys[TypeActor.BOSS] = this.getEnemy(TypeActor.BOSS);
            //this._enemys[TypeActor.ROBOT] = this.getEnemy(TypeActor.ROBOT);
        }
        Object.defineProperty(GameBase.prototype, "viewClass", {
            get: function () { return this._viewClass; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBase.prototype, "view", {
            get: function () { return this._view; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBase.prototype, "player", {
            get: function () {
                return this._player;
            },
            enumerable: true,
            configurable: true
        });
        GameBase.prototype.createChildren = function () { };
        //protected getEnemy(type: number): number[] { return []; }
        //public getEnemyTypes(type: number): number[] { return this._enemys[type]; }
        /**是否为敌方单位 */
        GameBase.prototype.isEnemyObject = function (fs, target) {
            if (fs == target || fs == null || target == null)
                return false;
            var ret = false;
            if (fs.master != target.master) {
                ret = true;
            }
            return ret;
            //return this._scene && this._scene.isEnemyObject(fs, target);
        };
        /**是否为友方单位 */
        GameBase.prototype.isFriendObject = function (fs, target) {
            if (fs == target || fs == null || target == null)
                return false;
            var ret = false;
            if (fs.master == target.master) {
                ret = true;
            }
            return ret;
            //return this._scene && this._scene.isFriendObject(fs, target);
        };
        GameBase.prototype.initialize = function (view) {
            this._view = view;
            this._scene = view.scene;
            this._mapData = this._scene && this._scene.data;
            this._player = this._scene && this._scene.manager.player;
        };
        GameBase.prototype.enter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._isEnter = true;
            this._isEnterOver = false;
        };
        GameBase.prototype.enterOver = function () {
            if (this._scene)
                this._scene.layerRenderEnabled = true;
            if (this._enterOverHandlers) {
                this._enterOverHandlers.run();
                this._enterOverHandlers.clear();
            }
            this._isEnterOver = true;
            app.gameContext.isFirstStartGame = false;
        };
        GameBase.prototype.enterMap = function (mapId) {
            this._mapData.initialize(mapId);
            if (!this._isEnter)
                return;
            this._scene.view.initializeMapData(this._mapData);
            this.enterOver();
            mg.soundManager.playBackGround(this._mapData.bgm);
            GameModels.scene.setFightEnabled(true);
            GameModels.scene.setAttackEnabled(true);
            this._scene.hideHighLightObject();
        };
        GameBase.prototype.exit = function () {
            utils.timer.clear(this, this.startUI);
            this.stop();
            this.disableControl();
            utils.timer.clearAll(this);
            this._scene.manager.clear();
            this._isEnter = false;
            this._isEnterOver = false;
            this._exitOpenUI = null;
            this._exitOpenUITabIndex = null;
            this._exitOpenUIfailParam = null;
            this._copyVO = null;
            battle.manager.clearShowTalent();
            GameModels.user.player.resetState();
            GameModels.user.player.resetMergeState();
            mg.soundManager.stopBackGround();
            GameModels.scene.storySupportPetId = 0;
        };
        GameBase.prototype.start = function () {
            this.startHandler();
        };
        GameBase.prototype.stop = function () { };
        GameBase.prototype.startUI = function () { };
        GameBase.prototype.startHandler = function () {
            if (this._startHandlers) {
                this._startHandlers.run();
            }
            utils.timer.once(500, this, this.startUI);
        };
        GameBase.prototype.end = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this._endHandlers) {
                (_a = this._endHandlers).runWith.apply(_a, args);
            }
            var _a;
        };
        GameBase.prototype.enableControl = function () {
            mg.controlManager.onTap(this, this.onSceneTap);
            //mg.controlManager.onRockChange(this, this.onRockChange);
            //mg.controlManager.onRockEnd(this, this.onRockEnd);
        };
        GameBase.prototype.disableControl = function () {
            mg.controlManager.offTap();
            //mg.controlManager.offRockChange();
            //mg.controlManager.offRockEnd();
            //mg.controlManager.removeControl();
        };
        /*protected isRocking() {
            return mg.controlManager.isRock();
        }

        protected getRockDirection() {
            return mg.controlManager.getRockDirection();
        }*/
        GameBase.prototype.onSceneTap = function (tileX, tileY) {
            this.startMove(tileX, tileY);
        };
        /*protected onRockChange() {
            if (this.getRockDirection() == -1) {
                return;
            }
            this.stopAttack();
            this.stopMove();
            if (!this._rockCachePoint) {
                this._rockCachePoint = new egret.Point();
            }
            var targetNode: PF.Node = battle.manager.getDirectNextNode(this._player.tileNode, this.getRockDirection(), this._scene, this._rockCachePoint);
            if (!targetNode) {
                return;
            }
            this.startMove(targetNode.x, targetNode.y);
            this._player.onMoveEnd(this, this.onRockChange);
        }

        protected onRockEnd() {
            this.stopAttack();
            this.stopMove();
            this._player.offMoveEnd();
        }*/
        GameBase.prototype.objectTouchHandler = function (e) {
            var target = e.currentTarget;
            if (target instanceof s.SmartObject) {
                if (this.isEnemyObject(this._player, target)) {
                    this.startAttack(target.vo);
                }
                else {
                    this.startMove(target.vo.tileX, target.vo.tileY);
                }
            }
        };
        //--------------------Move-------------------
        GameBase.prototype.startMove = function (tileX, tileY) {
            /*if (this._player) {
                this._player.target = null;
                this._player.movePathTo(tileX, tileY);
            }*/
            var xyList = this.getAStarPath(tileX, tileY);
            if (xyList.length > 0) {
                GameModels.scene.syncPositionList(xyList, 0);
            }
        };
        GameBase.prototype.getAStarPath = function (tileX, tileY) {
            var xyList = [];
            if (this._player) {
                var leader = this._player.getTeamLeader();
                if (leader != null) {
                    var endNode = this._scene.getNode(tileX, tileY);
                    var aStarPath = null;
                    if (leader.tileNode && leader.tileNode.walkable && endNode && endNode.walkable) {
                        aStarPath = this._scene.findPath(leader.tileX, leader.tileY, tileX, tileY);
                    }
                    else {
                        aStarPath = [];
                    }
                    if (aStarPath.length > 0) {
                        aStarPath.shift();
                    }
                    else {
                        if (endNode && endNode.walkable) {
                            aStarPath.push(endNode);
                        }
                    }
                    for (var _i = 0, aStarPath_1 = aStarPath; _i < aStarPath_1.length; _i++) {
                        var node = aStarPath_1[_i];
                        var xyValue = node.x * 10000 + node.y;
                        xyList.push(xyValue);
                    }
                }
            }
            return xyList;
        };
        //--------------------Attack-------------------
        GameBase.prototype.startAttack = function (smartVO) {
            if (smartVO instanceof vo.GamePlayerVO) {
                smartVO = smartVO.getTeamLeaderVO();
            }
            if (smartVO != null) {
                var xyList = this.getAStarPath(smartVO.tileX, smartVO.tileY);
                GameModels.scene.syncPositionList(xyList, smartVO.sceneObjectId);
            }
        };
        GameBase.prototype.onEnterOverOnce = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._enterOverHandlers) {
                this._enterOverHandlers = new utils.Handlers(true);
            }
            this._enterOverHandlers.add(caller, method, args);
        };
        GameBase.prototype.offEnterOver = function (caller, method) {
            if (this._enterOverHandlers) {
                this._enterOverHandlers.remove(caller, method);
            }
        };
        GameBase.prototype.offAllEnterOver = function () {
            if (this._enterOverHandlers) {
                this._enterOverHandlers.clear();
            }
        };
        GameBase.prototype.onStart = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._startHandlers)
                this._startHandlers = new utils.Handlers(false);
            this._startHandlers.add(caller, method, args);
        };
        GameBase.prototype.offStart = function (caller, method) {
            if (this._startHandlers) {
                this._startHandlers.remove(caller, method);
            }
        };
        GameBase.prototype.offAllStart = function () {
            if (this._startHandlers) {
                this._startHandlers.clear();
            }
        };
        GameBase.prototype.onEnd = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._endHandlers)
                this._endHandlers = new utils.Handlers(false);
            this._endHandlers.add(caller, method, args);
        };
        GameBase.prototype.onEndOnce = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._endHandlers)
                this._endHandlers = new utils.Handlers(false);
            this._endHandlers.add(caller, method, args, true);
        };
        GameBase.prototype.offEnd = function (caller, method) {
            if (this._endHandlers) {
                this._endHandlers.remove(caller, method);
            }
        };
        GameBase.prototype.offAllEnd = function () {
            if (this._endHandlers) {
                this._endHandlers.clear();
            }
        };
        GameBase.prototype.getObjectByVO = function (smartVO) {
            return null;
        };
        /**
         * 获得离当前单位最近的敌人
         * @param body 当前单位
         * @param actorType 敌人单位类型
         * @param range	是否限定在一定的范围内 0为不限定
         */
        GameBase.prototype.getMinEnemyVO = function (body, enmeyTypes, range, except) {
            if (range === void 0) { range = 0; }
            if (except === void 0) { except = null; }
            var minDistance = 10000;
            var minObject;
            for (var _i = 0, enmeyTypes_1 = enmeyTypes; _i < enmeyTypes_1.length; _i++) {
                var enemyType = enmeyTypes_1[_i];
                var objects = this._modelScene.getObjectVOList(enemyType);
                for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
                    var object = objects_1[_a];
                    if (object.stateDead || object == body || object == except)
                        continue;
                    var distance = utils.MathUtil.getDistance(body.tileX, body.tileY, object.tileX, object.tileY);
                    if (range != 0 && distance > range)
                        continue;
                    if (body.type == TypeActor.PET && object.type == TypeActor.PET) {
                        if (object.groupId == body.groupId)
                            continue;
                    }
                    if (distance < minDistance) {
                        minObject = object;
                        minDistance = distance;
                    }
                }
            }
            return minObject;
        };
        Object.defineProperty(GameBase.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBase.prototype, "modelScene", {
            get: function () {
                return this._modelScene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBase.prototype, "isEnter", {
            get: function () {
                return this._isEnter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBase.prototype, "isEnterOver", {
            get: function () {
                return this._isEnterOver;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBase.prototype, "mapData", {
            get: function () {
                return this._mapData;
            },
            enumerable: true,
            configurable: true
        });
        GameBase.prototype.setExitGame = function (gameclazz) {
            this._exitEnterGame = gameclazz;
        };
        GameBase.prototype.setExitOpenUI = function (uiName, tabIndex, failParam) {
            if (tabIndex === void 0) { tabIndex = 0; }
            if (failParam === void 0) { failParam = null; }
            this._exitOpenUI = uiName;
            this._exitOpenUITabIndex = tabIndex;
            this._exitOpenUIfailParam = failParam;
        };
        GameBase.prototype.getExitAutoOpenUI = function () {
            return '';
        };
        GameBase.prototype.getExitAutoOpenUITableIndex = function () {
            return 0;
        };
        GameBase.prototype.getExitAutoOpenUIfailParam = function () {
            return this._exitOpenUIfailParam;
        };
        GameBase.prototype.getExitGame = function () {
            return this._exitEnterGame;
        };
        Object.defineProperty(GameBase.prototype, "copyVO", {
            get: function () {
                return this._copyVO;
            },
            enumerable: true,
            configurable: true
        });
        return GameBase;
    }());
    s.GameBase = GameBase;
    __reflect(GameBase.prototype, "s.GameBase");
})(s || (s = {}));
