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
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(view) {
            var _this = _super.call(this) || this;
            _this._stared = false;
            _this._layerRenderEnabled = true;
            _this._tapEnabled = true;
            _this._enterFinish = false;
            _this._centerPoint = new egret.Point();
            //高亮某个单位
            _this.showHighLightFlag = false;
            _this._view = view;
            _this._thum = new s.MapThum();
            _this._thum.scaleX = _this._thum.scaleY = 10;
            _this._copyBG = new s.MapThum();
            _this._copyBG.scaleX = _this._copyBG.scaleY = 2.5;
            _this._blockContainer = new egret.DisplayObjectContainer();
            _this._blockContainer.touchChildren = _this._blockContainer.touchEnabled = false;
            _this.addChild(_this._blockContainer);
            //this._blockContainer.cacheAsBitmap = true;
            _this._objectsContainer = new egret.DisplayObjectContainer();
            _this._objectsContainer.touchChildren = _this._objectsContainer.touchEnabled = false;
            _this.addChild(_this._objectsContainer);
            _this._shadowContainer = new egret.DisplayObjectContainer();
            _this._shadowContainer.touchChildren = _this._shadowContainer.touchEnabled = false;
            _this._objectsContainer.addChild(_this._shadowContainer);
            _this._dropItemContainer = new egret.DisplayObjectContainer();
            _this._dropItemContainer.touchChildren = _this._dropItemContainer.touchEnabled = false;
            _this._objectsContainer.addChild(_this._dropItemContainer);
            _this._effectBehindContainer = new egret.DisplayObjectContainer();
            _this._effectBehindContainer.touchChildren = _this._effectBehindContainer.touchEnabled = false;
            _this._objectsContainer.addChild(_this._effectBehindContainer);
            _this.gridContainer = new egret.DisplayObjectContainer();
            _this.gridContainer.touchChildren = _this.gridContainer.touchEnabled = false;
            _this.gridContainer.alpha = 0.5;
            _this.grids = [];
            _this._objectsContainer.addChild(_this.gridContainer);
            _this._actorBodyContainer = new egret.DisplayObjectContainer();
            _this._actorBodyContainer.touchChildren = _this._actorBodyContainer.touchEnabled = false;
            _this._objectsContainer.addChild(_this._actorBodyContainer);
            _this._bloodContainer = new egret.DisplayObjectContainer();
            _this._bloodContainer.touchChildren = _this._bloodContainer.touchEnabled = false;
            _this._objectsContainer.addChild(_this._bloodContainer);
            _this._labelContainer = new egret.DisplayObjectContainer();
            _this._labelContainer.touchChildren = _this._labelContainer.touchEnabled = false;
            _this._objectsContainer.addChild(_this._labelContainer);
            _this._effectFrontContainer = new egret.DisplayObjectContainer();
            _this._effectFrontContainer.touchChildren = _this._effectFrontContainer.touchEnabled = false;
            _this._objectsContainer.addChild(_this._effectFrontContainer);
            _this._battleFontContainer = new egret.DisplayObjectContainer();
            _this._battleFontContainer.touchChildren = _this._battleFontContainer.touchEnabled = false;
            _this._objectsContainer.addChild(_this._battleFontContainer);
            _this._blocks = [];
            _this._actors = [];
            _this._effects = [];
            _this._players = [];
            _this._pets = [];
            _this._monsters = [];
            _this._npcs = [];
            _this._drops = [];
            _this._boxs = [];
            _this._manager = new s.SceneManager(_this);
            _this._manager.initialize();
            _this._cameraManager = new s.CameraManager(view);
            return _this;
            //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        }
        Object.defineProperty(Scene.prototype, "view", {
            get: function () {
                return this._view;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "manager", {
            get: function () {
                return this._manager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "cameraManager", {
            get: function () {
                return this._cameraManager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "mapWidth", {
            get: function () {
                return this._data.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "mapHeight", {
            get: function () {
                return this._data.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "touchX", {
            get: function () {
                return this._touchX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "touchY", {
            get: function () {
                return this._touchY;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.pos = function (x, y) {
            this.x = x;
            this.y = y;
            this.drawBlock(-x, -y);
            this.updateSights(this._view.camera.x, this._view.camera.y);
        };
        Scene.prototype.scale = function (v) {
            if (this.scaleX == v)
                return;
            this.scaleX = this.scaleY = v;
            this.updateViewPort(mg.stageManager.stageWidth, mg.stageManager.stageHeight);
        };
        Scene.prototype.initialize = function (data) {
            if (this._mapId != data.id) {
                this._thum.reset();
                this._copyBG.reset();
                this.clearBlock();
                this._data = data;
                if (!data.hasData)
                    return;
                this._mapId = this._data.id;
                this._thum.initialize(data.mapRes);
                this.addChildAt(this._thum, 0);
                if (TypeGame.isFormationGame()) {
                    this._copyBG.initialize(data.mapRes, false);
                    this.addChildAt(this._copyBG, 1);
                }
                else {
                    this.initMapBlock();
                    if (this._copyBG.parent != null) {
                        this._copyBG.parent.removeChild(this._copyBG);
                    }
                }
                this.drawGrid();
                this.updateAllGrid();
                return;
            }
        };
        Scene.prototype.initMapBlock = function () {
            var totalX = Math.ceil(this.mapWidth / game.MapConfig.BLOCK_SIZE);
            var totalY = Math.ceil(this.mapHeight / game.MapConfig.BLOCK_SIZE);
            var total = totalX * totalY;
            while (this._blocks.length < total) {
                this._blocks.push(s.MapCache.fromPool(this._data));
            }
            while (this._blocks.length > total) {
                s.MapCache.toPool(this._blocks.pop());
            }
            var index = 0;
            for (var h = 0; h < totalY; h++) {
                for (var w = 0; w < totalX; w++) {
                    index = h * totalX + w;
                    this._blocks[index].x = w * game.MapConfig.BLOCK_SIZE;
                    this._blocks[index].y = h * game.MapConfig.BLOCK_SIZE;
                }
            }
        };
        Scene.prototype.updateViewPort = function (width, height) {
            this._totalBlockX = Math.ceil(width / game.MapConfig.BLOCK_SIZE / this._view.camera.factor) + 1;
            this._totalBlockY = Math.ceil(height / game.MapConfig.BLOCK_SIZE / this._view.camera.factor) + 1;
            //totalX = Math.ceil(totalX / this._view.camera.factor);
            //totalY = Math.ceil(totalY / this._view.camera.factor);
            /*var total: number = this._totalBlockX * this._totalBlockY;
            while (this._blocks.length < total) {
                this._blocks.push(MapCache.fromPool(this._data));
            }
            while (this._blocks.length > total) {
                MapCache.toPool(this._blocks.pop());
            }
            for (var block of this._blocks) {
                if (!block.parent) this._blockContainer.addChild(block);
            }*/
            this._startBlockX = -1;
            this._startBlockY = -1;
        };
        Scene.prototype.clearBlock = function () {
            // while (this._blocks.length) {
            // 	MapCache.toPool(this._blocks.pop());
            // }
            for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                var block = _a[_i];
                block.reset();
            }
            this._startBlockX = -1;
            this._startBlockY = -1;
            s.MapCache.clear();
        };
        Scene.prototype.drawBlock = function (x, y) {
            if (!this._data.hasData) {
                return;
            }
            if (!this._enterFinish)
                return;
            if (TypeGame.isFormationGame())
                return; //阵型对冲模式，直接加截整张地图
            var startX = Math.floor(x / this._view.camera.factor);
            var startY = Math.floor(y / this._view.camera.factor);
            var startBlockX = Math.floor(startX / game.MapConfig.BLOCK_SIZE);
            var startBlockY = Math.floor(startY / game.MapConfig.BLOCK_SIZE);
            if (startBlockX < 0)
                startBlockX = 0;
            if (startBlockY < 0)
                startBlockY = 0;
            if (this._blocks.length && (this._startBlockX != startBlockX || this._startBlockY != startBlockY)) {
                this._startBlockX = startBlockX;
                this._startBlockY = startBlockY;
                var endBlockX = Math.min(startBlockX + this._totalBlockX, this._data.blockSigmentsX);
                var endBlockY = Math.min(startBlockY + this._totalBlockY, this._data.blockSigmentsY);
                var totalX = Math.ceil(this.mapWidth / game.MapConfig.BLOCK_SIZE);
                var totalY = Math.ceil(this.mapHeight / game.MapConfig.BLOCK_SIZE);
                var block;
                for (var h = 0; h < totalY; h++) {
                    for (var w = 0; w < totalX; w++) {
                        block = this._blocks[h * totalX + w];
                        if (h >= startBlockY && h < endBlockY && w >= startBlockX && w < endBlockX) {
                            block.load(w, h);
                            if (!block.parent)
                                this._blockContainer.addChildAt(block, 0);
                        }
                        else {
                            block.reset();
                            if (block.parent)
                                this._blockContainer.removeChild(block);
                        }
                    }
                }
                /*var i: number = 0;
                for (var b: number = startBlockY; b < endBlockY; b++) {
                    for (var a: number = startBlockX; a < endBlockX; a++) {
                        this._blocks[i].load(a, b);
                        i++;
                    }
                }*/
            }
        };
        Scene.prototype.clear = function (recover) {
            this.removeAllEffect(recover);
            //玩家和武将需要单独进行管理
            this.removeAllPlayers(recover);
            this.removeAllPets(recover);
            this.removeAllMonsters(recover);
            this.removeAllNpc(recover);
            this.removeAllDrop(recover);
            this.removeAllBattleFont();
            this._enterFinish = false;
        };
        Object.defineProperty(Scene.prototype, "layerRenderEnabled", {
            get: function () {
                return this._layerRenderEnabled;
            },
            set: function (v) {
                if (this._layerRenderEnabled == v)
                    return;
                this._layerRenderEnabled = v;
                if (this._layerRenderEnabled) {
                    if (!this._blockContainer.parent) {
                        this.addChild(this._blockContainer);
                    }
                    if (!this._objectsContainer.parent) {
                        this.addChild(this._objectsContainer);
                    }
                    //if (!this._copyBG.parent) {
                    //	this.addChildAt(this._copyBG, 1);
                    //}
                }
                else {
                    if (this._blockContainer.parent) {
                        this._blockContainer.parent.removeChild(this._blockContainer);
                    }
                    if (this._objectsContainer.parent) {
                        this._objectsContainer.parent.removeChild(this._objectsContainer);
                    }
                    //if (this._copyBG.parent) {
                    //	this._copyBG.parent.removeChild(this._copyBG);
                    //}
                }
            },
            enumerable: true,
            configurable: true
        });
        //private tapHandler(e: egret.TouchEvent) {
        Scene.prototype.tapHandler = function (sceneX, sceneY) {
            if (!this._tapEnabled)
                return;
            //this._touchX = e.stageX;
            //this._touchY = e.stageY;
            var has = false;
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (actor.tapEnabled) {
                    if (actor.hitTestPoint(sceneX, sceneY)) {
                        actor.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
                        has = true;
                    }
                }
            }
            if (has) {
                //e.stopImmediatePropagation();
                return true;
            }
            if (this._tapHandlers) {
                this._tapHandlers.run();
            }
            return false;
        };
        Scene.prototype.onTapHandler = function (caller, method) {
            if (!this._tapHandlers)
                this._tapHandlers = new utils.Handlers(false);
            this._tapHandlers.add(caller, method);
        };
        Scene.prototype.offTapHandler = function (caller, method) {
            if (this._tapHandlers) {
                this._tapHandlers.remove(caller, method);
            }
        };
        Object.defineProperty(Scene.prototype, "tapEnabled", {
            get: function () {
                return this._tapEnabled;
            },
            set: function (value) {
                if (this._tapEnabled != value) {
                    this._tapEnabled = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.drawGrid = function () {
            /*
            if (!this._gridShape) this._gridShape = new egret.Shape();
            this._blockContainer.addChild(this._gridShape);
            this._gridShape.graphics.clear();
            this._gridShape.graphics.beginFill(0xFF0000, 0.5);
            logger.log(game.MapConfig.TILE_WIDTH, game.MapConfig.TILE_HEIGHT);
            for (var b: number = 0; b < this._data.gridSigmentsY; b++) {
                for (var a: number = 0; a < this._data.gridSigmentsX; a++) {
                    var style: number = this._data.getStyle(a, b);
                    if (style == 1) {
                        this._gridShape.graphics.drawRect(a * game.MapConfig.TILE_WIDTH, b * game.MapConfig.TILE_HEIGHT, game.MapConfig.TILE_WIDTH, game.MapConfig.TILE_HEIGHT);
                    }
                }
            }
            this._gridShape.graphics.beginFill(0xFFFF00, 0.5);
            for (var b: number = 0; b < this._data.gridSigmentsY; b++) {
                for (var a: number = 0; a < this._data.gridSigmentsX; a++) {
                    var style: number = this._data.getStyle(a, b);
                    if (style == 2) {
                        this._gridShape.graphics.drawRect(a * game.MapConfig.TILE_WIDTH, b * game.MapConfig.TILE_HEIGHT, game.MapConfig.TILE_WIDTH, game.MapConfig.TILE_HEIGHT);
                    }
                }
            }
            this._gridShape.graphics.endFill();
            */
        };
        /**开始场景的渲染 */
        Scene.prototype.start = function () {
            if (!this._stared) {
                this._stared = true;
                mg.stageManager.addTick(this, this.updateSort, 2);
                //egret.Tween.removeTweens(this._view.camera);
                //this.startCamera();
            }
        };
        /**结束场景的渲染*/
        Scene.prototype.stop = function () {
            if (this._stared) {
                this._stared = false;
                mg.stageManager.removeTick(this, this.updateSort);
            }
            egret.Tween.removeTweens(this.view.camera);
        };
        /**跟踪目标移动 */
        Scene.prototype.lookAt = function (actor, forceFellow) {
            if (forceFellow === void 0) { forceFellow = true; }
            //this._view.camera.lookAt(actor, forceFellow);
            this._cameraManager.lookAt(actor, forceFellow);
            this._enterFinish = true;
        };
        Scene.prototype.updateCenterPoint = function () {
            var minX = -1;
            var maxX = -1;
            var minY = -1;
            var maxY = -1;
            var totalX = 0;
            var totalY = 0;
            var cnt = 0;
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (minX == -1 || actor.x < minX)
                    minX = actor.x;
                if (maxX == -1 || actor.x > maxX)
                    maxX = actor.x;
                if (minY == -1 || actor.y < minY)
                    minY = actor.y;
                if (maxY == -1 || actor.y > maxY)
                    maxY = actor.y;
                var weight = actor.getPosWeight();
                totalX += weight * actor.x;
                totalY += weight * actor.y;
                cnt += weight;
            }
            //var newX: number = Math.floor((minX + maxX) / 2);
            //var newY: number = Math.floor((minY + maxY) / 2);
            var newX = Math.floor(totalX / cnt);
            var newY = Math.floor(totalY / cnt);
            if (Math.abs(newX - this._centerPoint.x) > 100 || Math.abs(newY - this._centerPoint.y) > 100) {
                this._centerPoint.setTo(newX, newY);
            }
        };
        Scene.prototype.setCenter = function (x, y) {
            this._centerPoint.setTo(x, y);
        };
        Object.defineProperty(Scene.prototype, "center", {
            get: function () { return this._centerPoint; },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.updateSights = function (x, y) {
            if (this.showHighLightFlag)
                return; //高亮模式不重排
            //var tileX: number = (x / game.MapConfig.TILE_WIDTH / this._view.camera.factor) >> 0;
            //var tileY: number = (y / game.MapConfig.TILE_HEIGHT / this._view.camera.factor) >> 0;
            var tileX = (x / game.MapConfig.TILE_WIDTH) >> 0;
            var tileY = (y / game.MapConfig.TILE_HEIGHT) >> 0;
            //this.updateCenterGrid(tileX, tileY);
            //if (tileX != this._lastTileX || tileY != this._lastTileY) {
            this._lastTileX = tileX;
            this._lastTileY = tileY;
            var rangeTileX = Math.ceil(this._view.camera.viewPort.halfWidth / game.MapConfig.TILE_WIDTH / this._view.camera.factor);
            var rangeTileY = Math.ceil(this._view.camera.viewPort.halfHeight / game.MapConfig.TILE_HEIGHT / this._view.camera.factor);
            //if(rangeTileX > 10) rangeTileX = 10;
            //if(rangeTileY > 10) rangeTileY = 10;
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (actor == this._manager.player || actor == this._view.camera.target) {
                    actor.updateAvatarDisplay(true); //玩家自己始终显示
                    continue;
                }
                if (Math.abs(tileX - actor.tileX) > rangeTileX) {
                    actor.updateAvatarDisplay(false);
                }
                else if (Math.abs(tileY - actor.tileY) > rangeTileY) {
                    actor.updateAvatarDisplay(false);
                }
                else {
                    if (this.isNeedShowAvatar(actor)) {
                        actor.updateAvatarDisplay(true);
                    }
                    else {
                        actor.updateAvatarDisplay(false);
                    }
                }
            }
            //}
        };
        //是否需要显示外观
        Scene.prototype.isNeedShowAvatar = function (targetObject) {
            if (!targetObject)
                return false;
            if (targetObject.isTeamLeader())
                return true;
            if (TypeGame.isFormationGame() == false) {
                if (TypeActor.isPlayerOrPet(targetObject.type) && !app.gameContext.isMySelf(targetObject)) {
                    var gamePlayer = app.gameContext.scene.manager.player;
                    var teamTargetVO = gamePlayer.getTeamTargetVO();
                    var targetVO = targetObject.vo;
                    if (targetVO.isSelfTeam(teamTargetVO)) {
                        return true;
                    }
                    if (targetVO.master && gamePlayer.vo && gamePlayer.vo.isSelfTeam(targetVO.master.getTeamTarget())) {
                        return true;
                    }
                    return false;
                }
            }
            return true;
        };
        /**更新渲染 */
        Scene.prototype.updateRender = function (timeStamp) {
            if (!this._stared)
                return;
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var object = _a[_i];
                object.updateRender(timeStamp);
            }
            return true;
        };
        /**更新排序 */
        Scene.prototype.updateSort = function () {
            //if(this.showHighLightFlag) return; //高亮模式不重排
            var t = egret.getTimer();
            var self = this;
            // for(var actor of self._actors){
            // 	actor.zsort=self._actorBodyContainer.getChildIndex(actor);
            // }
            // self._actors.sort((function(a:SmartObject,b:SmartObject):any{
            // 	if((a as any).zsort<(b as any).zsort&&(a as any).y>(b as any).y){
            // 		this.swapChildren(a,b);
            // 	}
            // 	return (a.y>b.y)?1:-1;
            // }).bind(self._actorBodyContainer));
            self._actors.sort(function (a, b) {
                return (a.y > b.y) ? 1 : -1;
            });
            for (var _i = 0, _a = self._actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                self._actorBodyContainer.addChild(actor);
            }
            self.updateCenterPoint();
            //logger.log('sort-passtime:',egret.getTimer()-t);
        };
        Scene.prototype.showHighLightObject = function (object) {
            if (this.showHighLightFlag == true)
                return;
            this.showHighLightFlag = true;
            this.view.showBlack();
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (actor != object) {
                    actor.stopAnimation();
                }
            }
            if (GameModels.user.player.battleSpeedRate == 0) {
                utils.timer.once(1200, this, this.hideHighLightObject);
            }
            else {
                utils.timer.once(600, this, this.hideHighLightObject);
            }
            //this._black = 
            /*this._actorBodyContainer.addChild(object);
            for (var actor of this._actors) {
                if (actor != object) {
                    //actor.updateAvatarDisplay(false);
                }
            }*/
            /*this._shadowContainer.visible = false;
            this._bloodContainer.visible = false;
            this._labelContainer.visible = false;
            //this._effectFrontContainer.visible = false;
            this._effectBehindContainer.visible = false;
            this._battleFontContainer.visible = false;*/
        };
        Scene.prototype.hideHighLightObject = function () {
            if (this.showHighLightFlag == false)
                return;
            utils.timer.clear(this, this.hideHighLightObject);
            /*if (this._black && this._black.parent) {
                this._black.parent.removeChild(this._black);
            }*/
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                actor.playAnimation();
            }
            this.view.hideBlack();
            this.showHighLightFlag = false;
            /*this._shadowContainer.visible = true;
            this._bloodContainer.visible = true;
            this._labelContainer.visible = true;
            this._effectFrontContainer.visible = true;
            this._effectBehindContainer.visible = true;
            this._battleFontContainer.visible = true;
            this.updateSort();*/
        };
        /**添加玩家 */
        Scene.prototype.addPlayer = function (object) {
            /*
            return null;*/
            /*
            if(TypeGame.isFormationGame() || TypeGame.CURRENT_GAME_TYPE == TypeGame.PERSONAL_BOSS)
            {
                if(this._players.indexOf(object) == -1)
                {
                    this._players.push(object);
                    return object;
                }
            }
            else
            {
                if (this.addActor(object) != null) {
                    this._players.push(object);
                    return object;
                }
            }
                */
            ///*
            if (this._players.indexOf(object) == -1) {
                this._players.push(object);
                return object;
            }
            //*/
            return null;
        };
        Scene.prototype.removePlayer = function (object) {
            if (this.removeActor(object) != null) {
                var index = this._players.indexOf(object);
                this._players.splice(index, 1);
                return object;
            }
            return null;
        };
        Scene.prototype.removeAllPlayers = function (recover) {
            for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
                var player = _a[_i];
                this.removeActor(player);
                if (recover && !player.isuser)
                    utils.ObjectPool.to(player, true);
            }
            this._players.length = 0;
        };
        /**添加武将 */
        Scene.prototype.addPet = function (object) {
            if (this.addActor(object) != null) {
                this._pets.push(object);
                return object;
            }
            return null;
        };
        Scene.prototype.removePet = function (object) {
            if (this.removeActor(object) != null) {
                var index = this._pets.indexOf(object);
                this._pets.splice(index, 1);
                return object;
            }
            return null;
        };
        Scene.prototype.removeAllPets = function (recover) {
            for (var _i = 0, _a = this._pets; _i < _a.length; _i++) {
                var pet = _a[_i];
                this.removeActor(pet);
                if (recover)
                    utils.ObjectPool.to(pet, true);
            }
            this._pets.length = 0;
        };
        /**添加怪物 */
        Scene.prototype.addMonster = function (object) {
            if (this.addActor(object) != null) {
                this._monsters.push(object);
                return object;
            }
            return null;
        };
        Scene.prototype.removeMonster = function (object) {
            var index = this._monsters.indexOf(object);
            if (index > -1) {
                this._monsters.splice(index, 1);
            }
            if (this.removeActor(object) != null) {
                return object;
            }
            return null;
        };
        Scene.prototype.removeAllMonsters = function (recover) {
            for (var _i = 0, _a = this._monsters; _i < _a.length; _i++) {
                var monster = _a[_i];
                this.removeActor(monster);
                if (recover)
                    utils.ObjectPool.to(monster, true);
            }
            this._monsters.length = 0;
        };
        Object.defineProperty(Scene.prototype, "deadAllMonster", {
            get: function () {
                var allDead = true;
                for (var _i = 0, _a = this._monsters; _i < _a.length; _i++) {
                    var monster = _a[_i];
                    if (!monster.stateDead) {
                        allDead = false;
                        break;
                    }
                }
                return allDead;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "monsters", {
            get: function () {
                return this._monsters;
            },
            enumerable: true,
            configurable: true
        });
        /**添加NPC*/
        Scene.prototype.addNpc = function (object) {
            if (this.addActor(object) != null) {
                this._npcs.push(object);
                return object;
            }
            return null;
        };
        Scene.prototype.removeNpc = function (object) {
            if (this.removeActor(object) != null) {
                var index = this._npcs.indexOf(object);
                this._npcs.splice(index, 1);
                return object;
            }
            return null;
        };
        /**添加宝箱*/
        Scene.prototype.addBox = function (object) {
            if (this.addActor(object) != null) {
                this._boxs.push(object);
                return object;
            }
            return null;
        };
        Scene.prototype.removeNpcByData = function (data) {
            for (var i = 0; i < this._npcs.length; i++) {
                var npc = this._npcs[i];
                if (npc instanceof s.GameNpc) {
                    if (npc.configId == data.id) {
                        if (this.removeActor(npc) != null) {
                            this._npcs.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            return null;
        };
        Scene.prototype.removeAllNpc = function (recover) {
            for (var _i = 0, _a = this._npcs; _i < _a.length; _i++) {
                var npc = _a[_i];
                this.removeActor(npc);
                if (recover)
                    utils.ObjectPool.to(npc, true);
            }
            this._npcs.length = 0;
        };
        Scene.prototype.removeBoxByXY = function (xy) {
            for (var i = 0; i < this._boxs.length; i++) {
                if (this._boxs[i].xy == xy) {
                    if (this.removeActor(this._boxs[i]) != null) {
                        this._boxs.splice(i, 1);
                        break;
                    }
                }
            }
        };
        Scene.prototype.removeAllBox = function (recover) {
            for (var _i = 0, _a = this._boxs; _i < _a.length; _i++) {
                var box = _a[_i];
                this.removeActor(box);
                if (recover)
                    utils.ObjectPool.to(box, true);
            }
            this._boxs.length = 0;
        };
        /**添加角色 */
        Scene.prototype.addActor = function (object) {
            object.addTo(this);
            if (this._actors.indexOf(object) < 0) {
                this._actors.push(object);
                return object;
            }
            return null;
        };
        Scene.prototype.removeActor = function (object) {
            var index = this._actors.indexOf(object);
            if (index >= 0) {
                //object.setTile(null);
                this._actors.splice(index, 1);
                object.remove();
                return object;
            }
            return null;
        };
        Scene.prototype.getMonsterCountByConfigId = function (configId) {
            var total = 0;
            for (var _i = 0, _a = this.monsters; _i < _a.length; _i++) {
                var monster = _a[_i];
                if (monster.vo.configId != configId)
                    continue;
                total++;
            }
            return total;
        };
        Scene.prototype.getMinMonsterByConfigId = function (body, configId, excepts, isUser) {
            if (excepts === void 0) { excepts = null; }
            if (isUser === void 0) { isUser = true; }
            if (isUser == false) {
                for (var _i = 0, _a = this.monsters; _i < _a.length; _i++) {
                    var monster = _a[_i];
                    if (monster.vo.configId == configId) {
                        return monster;
                    }
                }
                return null;
            }
            var result;
            var min = 10000;
            for (var _b = 0, _c = this.monsters; _b < _c.length; _b++) {
                var monster = _c[_b];
                if (monster.vo.configId != configId)
                    continue;
                var d = utils.MathUtil.getDistance(monster.x, monster.y, body.x, body.y);
                if (d < min) {
                    if (excepts && excepts.indexOf(monster) >= 0) {
                        continue;
                    }
                    min = d;
                    result = monster;
                }
            }
            return result;
        };
        /**
         * 获得离当前单位最近的敌人
         * @param body 当前单位
         * @param actorType 敌人单位类型
         * @param range	是否限定在一定的范围内 0为不限定
         */
        Scene.prototype.getMinEnemy = function (body, range, except) {
            if (range === void 0) { range = 0; }
            if (except === void 0) { except = null; }
            var minDistance = 10000;
            var minObject = null;
            var objects = this.getAllEnemyList(body);
            for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
                var object = objects_1[_i];
                if (object.isTeamAllDead() || object == body || object.master == body.master || object == except)
                    continue;
                var distance = utils.MathUtil.getDistance(body.x, body.y, object.x, object.y);
                if (range != 0 && distance > range)
                    continue;
                if (body.type == TypeActor.PET && object.type == TypeActor.PET) {
                    if (object.groupId == body.groupId)
                        continue;
                }
                if (distance < minDistance) {
                    minObject = object.getTeamLeader();
                    minDistance = distance;
                }
            }
            return minObject;
        };
        /**
         * 获得离当前单位一定范围内的随机敌人
         * @param body 当前单位
         * @param actorType 敌人单位类型
         * @param range	是否限定在一定的范围内 0为不限定
         */
        Scene.prototype.getRandomEnemy = function (body, rangeX, rangeY) {
            if (rangeX === void 0) { rangeX = 200; }
            if (rangeY === void 0) { rangeY = 400; }
            var objects = this.getAllEnemyList(body);
            var targets = [];
            targets.push.apply(targets, this.getRangeObjects(body, objects, rangeX, rangeY));
            if (targets.length)
                return targets[(Math.random() * targets.length) >> 0];
            return this.getMinEnemy(body, 0);
        };
        Scene.prototype.getMinDrop = function (body) {
            if (!this._drops.length)
                return null;
            var minObject;
            var minDistanceX = 100000;
            var minDistanceY = 100000;
            var length = this._drops.length;
            for (var i = 0; i < length; i++) {
                var object = this._drops[i];
                var distanceX = object.tileX - body.tileX;
                var distanceY = object.tileY - body.tileY;
                if (distanceX == 0 && distanceY == 0) {
                    return object;
                }
                if ((Math.abs(distanceX) < minDistanceX && Math.abs(distanceY) < minDistanceY)) {
                    minObject = object;
                    minDistanceX = Math.abs(distanceX);
                    minDistanceY = Math.abs(distanceY);
                }
                else if (Math.abs(distanceX) == minDistanceX && Math.abs(distanceY) == minDistanceY && (distanceX > 0)) {
                    minObject = object;
                }
            }
            return minObject;
        };
        /**
         * 获得当前单位周围的敌人,随机取一个
         * @param body 当前单位
         * @param actorType 敌人单位类型
         */
        Scene.prototype.getAroundEnemy = function (body, enemyType, except) {
            if (except === void 0) { except = null; }
            var array = [this.getNode(body.tileNode.x, body.tileNode.y - 1),
                this.getNode(body.tileNode.x + 1, body.tileNode.y - 1),
                this.getNode(body.tileNode.x + 1, body.tileNode.y),
                this.getNode(body.tileNode.x + 1, body.tileNode.y + 1),
                this.getNode(body.tileNode.x, body.tileNode.y + 1),
                this.getNode(body.tileNode.x - 1, body.tileNode.y + 1),
                this.getNode(body.tileNode.x - 1, body.tileNode.y),
                this.getNode(body.tileNode.x - 1, body.tileNode.y - 1)];
            while (array.length) {
                var node = array.splice((Math.random() * array.length) >> 0, 1)[0];
                if (node && node.hasObject()) {
                    var objects = node.objects;
                    for (var _i = 0, objects_2 = objects; _i < objects_2.length; _i++) {
                        var object = objects_2[_i];
                        if (!object || object.stateDead || object == body || object == except || object.type != enemyType)
                            continue;
                        if (body.type == TypeActor.PET && object.type == TypeActor.PET) {
                            if (object.groupId == body.groupId)
                                continue;
                        }
                        return object;
                    }
                }
            }
            return null;
        };
        Scene.prototype.getObjects = function (type) {
            switch (type) {
                case TypeActor.ROBOT:
                case TypeActor.PLAYER: return this._players;
                case TypeActor.PET: return this._pets;
                case TypeActor.BOSS:
                case TypeActor.MONSTER: return this._monsters;
                case TypeActor.NPC: return this._npcs;
                case TypeActor.BOX: return this._boxs;
            }
        };
        Scene.prototype.isFightActer = function (acter) {
            if (acter.type == TypeActor.ROBOT || acter.type == TypeActor.PLAYER || acter.type == TypeActor.PET || acter.type == TypeActor.BOSS || acter.type == TypeActor.MONSTER) {
                return true;
            }
            return false;
        };
        /**是否为敌方单位 */
        Scene.prototype.isEnemyObject = function (fs, target) {
            return app.gameContext.gameCurrent.isEnemyObject(fs, target);
            /*if (fs == target || fs == null || target == null) return false;
            var ret: boolean = false;
            if (fs.master != target.master) {
                ret = true;
            }
            return ret;*/
        };
        /**是否为友方单位 */
        Scene.prototype.isFriendObject = function (fs, target) {
            return app.gameContext.gameCurrent.isFriendObject(fs, target);
            /*if (fs == target || fs == null || target == null) return false;
            var ret: boolean = false;
            if (fs.master == target.master) {
                ret = true;
            } else {
                //var sceneFlag1:string = fs.master && fs.master.vo ? fs.master.vo.sceneFlag : ( fs.vo ? fs.vo.sceneFlag : "");
                //var sceneFlag2:string = target.master && target.master.vo ? target.master.vo.sceneFlag : ( target.vo ? target.vo.sceneFlag : "");
                //if(sceneFlag1 != "" && sceneFlag1 == sceneFlag2){
                //    ret = true;
                //}
            }
            return ret;*/
        };
        //友方全体包括自己
        Scene.prototype.getAllFriendList = function (fs) {
            var list = [];
            // if (this.game != null) {
            // }
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (!this.isFightActer(actor))
                    continue;
                if (actor.stateDead)
                    continue;
                if (this.isFriendObject(fs, actor)) {
                    list.push(actor);
                }
            }
            return list;
        };
        //敌方所有人
        Scene.prototype.getAllEnemyList = function (fs) {
            var list = [];
            // if (this.game != null) {
            // }
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (!this.isFightActer(actor))
                    continue;
                if (actor.stateDead)
                    continue;
                if (this.isEnemyObject(fs, actor)) {
                    list.push(actor);
                }
            }
            return list;
        };
        /**获取目标格子中的敌方单位 */
        Scene.prototype.getEnemyListByPosition = function (fs, posX, posY) {
            var list = [];
            // if (this.game != null) {
            // }
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (!this.isFightActer(actor))
                    continue;
                if (actor.stateDead && !actor.isJustDead)
                    continue;
                if (this.isEnemyObject(fs, actor) && actor.tileX == posX && actor.tileY == posY) {
                    list.push(actor);
                }
            }
            return list;
        };
        /**获取目标格子中的友方单位 */
        Scene.prototype.getFriendListByPosition = function (fs, posX, posY) {
            var list = [];
            // if (this.game != null) {
            // }
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (!this.isFightActer(actor))
                    continue;
                if (actor.stateDead)
                    continue;
                if (this.isFriendObject(fs, actor) && actor.tileX == posX && actor.tileY == posY) {
                    list.push(actor);
                }
            }
            return list;
        };
        // private getMinObject(body:SmartObject,list:SceneObject[],range:number=0,except:SmartObject=null):SceneObject{
        //     var minObject:SceneObject;
        //     var minDistance:number=100000;
        // 	var length:number=list.length;
        // 	for(var i:number=0;i<length;i++){
        // 		var object:SceneObject=list[i];
        // 		if((object as any).stateDead||object==body||object==except) continue;
        // 		var distance:number=utils.MathUtil.getDistance(body.x,body.y,object.x,object.y);
        // 		if(range!=0&&distance>range) continue;
        // 		if(distance<minDistance){
        //             minObject=object;
        // 			minDistance=distance;
        //         }
        // 	}
        //     return minObject;
        // }
        Scene.prototype.getRangeObjects = function (body, list, rangeX, rangeY) {
            var objects = [];
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var object = list[i];
                if (object.stateDead || object == body)
                    continue;
                if (Math.abs(body.x - object.x) < rangeX && Math.abs(body.y - object.y) < rangeY) {
                    objects.push(object);
                }
            }
            return objects;
        };
        /**添加特效 */
        Scene.prototype.addEffectFront = function (effect) {
            if (this._effects.indexOf(effect) < 0) {
                this._effects.push(effect);
                this._effectFrontContainer.addChild(effect);
                return effect;
            }
            return null;
        };
        Scene.prototype.addEffectBehind = function (effect) {
            if (this._effects.indexOf(effect) < 0) {
                this._effects.push(effect);
                this._effectBehindContainer.addChild(effect);
                return effect;
            }
            return null;
        };
        Scene.prototype.removeEffect = function (effect) {
            var index = this._effects.indexOf(effect);
            if (index >= 0) {
                this._effects.splice(index, 1);
                if (effect.parent) {
                    effect.parent.removeChild(effect);
                }
                return effect;
            }
            return null;
        };
        Scene.prototype.removeAllEffect = function (recover) {
            for (var _i = 0, _a = this._effects; _i < _a.length; _i++) {
                var effect = _a[_i];
                if (effect.parent) {
                    effect.parent.removeChild(effect);
                }
                if (recover) {
                    utils.ObjectPool.to(effect, true);
                }
            }
            this._effects.length = 0;
        };
        /**添加掉落物 */
        Scene.prototype.addDrop = function (item) {
            if (this._drops.indexOf(item) < 0) {
                this._drops.push(item);
                item.addTo(this);
                return item;
            }
            return null;
        };
        Scene.prototype.removeDrop = function (item) {
            var index = this._drops.indexOf(item);
            if (index >= 0) {
                this._drops.splice(index, 1);
                item.remove();
                if (this._dropOneHandler) {
                    this._dropOneHandler.runWith(item.itemVO, this._drops.length == 0);
                }
                /*if (this._drops.length == 0) {
                    if (this._dropClearHandler) {
                        this._dropClearHandler.run();
                    }
                }*/
                return item;
            }
            return null;
        };
        Scene.prototype.removeAllDrop = function (recover, notify) {
            if (recover === void 0) { recover = true; }
            if (notify === void 0) { notify = true; }
            for (var _i = 0, _a = this._drops; _i < _a.length; _i++) {
                var item = _a[_i];
                item.remove();
                utils.ObjectPool.to(item, true);
            }
            this._drops.length = 0;
            if (notify && this._dropClearHandler) {
                this._dropClearHandler.run();
            }
        };
        Scene.prototype.removeAllBattleFont = function () {
            while (this._effectFrontContainer.numChildren > 0) {
                this._effectFrontContainer.removeChildAt(0);
            }
            while (this._battleFontContainer.numChildren > 0) {
                this._battleFontContainer.removeChildAt(0);
            }
        };
        Object.defineProperty(Scene.prototype, "hasDrop", {
            get: function () {
                return this._drops.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "drops", {
            get: function () {
                return this._drops;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.onDropClear = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offDropClear();
            this._dropClearHandler = utils.Handler.create(caller, method, args, false);
        };
        Scene.prototype.offDropClear = function () {
            if (this._dropClearHandler) {
                this._dropClearHandler.recover();
                this._dropClearHandler = null;
            }
        };
        Scene.prototype.onDropOne = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offDropOne();
            this._dropOneHandler = utils.Handler.create(caller, method, args, false);
        };
        Scene.prototype.offDropOne = function () {
            if (this._dropOneHandler) {
                this._dropOneHandler.recover();
                this._dropOneHandler = null;
            }
        };
        Object.defineProperty(Scene.prototype, "shadowLayer", {
            get: function () {
                return this._shadowContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "dropItemLayer", {
            get: function () {
                return this._dropItemContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "effectBehindLayer", {
            get: function () {
                return this._effectBehindContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "actorBodyLayer", {
            get: function () {
                return this._actorBodyContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "effectFrontLayer", {
            get: function () {
                return this._effectFrontContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "bloodLayer", {
            get: function () {
                return this._bloodContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "labelLayer", {
            get: function () {
                return this._labelContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "battleFontContainer", {
            get: function () {
                return this._battleFontContainer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 根据VO获取角色引用
         */
        Scene.prototype.getActorByVO = function (smartVO) {
            if (!smartVO)
                return null;
            var length = this._actors.length;
            for (var i = 0; i < length; i++) {
                var smartObject = this._actors[i];
                if (smartObject.vo == smartVO)
                    return smartObject;
            }
            return null;
        };
        Scene.prototype.getSmartObjectBySceneObjectId = function (objectId) {
            for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
                var smartObject = _a[_i];
                if (smartObject.vo != null && smartObject.vo.sceneObjectId == objectId) {
                    return smartObject;
                }
            }
            return smartObject;
        };
        /**取得当前格子的遮挡状态 */
        Scene.prototype.getMaskState = function (a, b) {
            return this._data.getMaskState(a, b);
        };
        /**寻路 */
        Scene.prototype.findPath = function (startX, startY, endX, endY) {
            return this._data.findPath(startX, startY, endX, endY);
        };
        /**获取格子的像素居中位置X */
        Scene.prototype.getMapRealX = function (a) {
            return this._data.getRealX(a);
        };
        /**获取格子的像素居中位置Y */
        Scene.prototype.getMapRealY = function (b) {
            return this._data.getRealY(b);
        };
        /**更新对象占用节点 */
        Scene.prototype.updateNodeObject = function (object, endNode) {
            var lastNode = object.tileNode;
            if (lastNode) {
                if (lastNode.objects && !!lastNode.objects.length) {
                    var i = lastNode.objects.indexOf(object);
                    if (i >= 0) {
                        lastNode.objects.splice(i, 1);
                    }
                }
                //this.updateGrid(lastNode);
            }
            if (endNode) {
                var i = endNode.objects.indexOf(object);
                if (i == -1) {
                    endNode.objects.push(object);
                }
                //this.updateGrid(endNode);
            }
            this.updateAllGrid();
        };
        /**移除此节点指定对象的占用状态 */
        Scene.prototype.removeNodeObject = function (object) {
            var node = object.tileNode;
            if (node) {
                if (node.objects && !!node.objects.length) {
                    var i = node.objects.indexOf(object);
                    if (i >= 0)
                        node.objects.splice(i, 1);
                }
                //this.updateGrid(node);
                this.updateAllGrid();
            }
        };
        Scene.prototype.updateCenterGrid = function (tileX, tileY) {
            if (!this.centerGrid) {
                this.centerGrid = new egret.Shape();
                this.centerGrid.graphics.beginFill(0xFF0000, 0.5);
                this.centerGrid.graphics.drawRect(0, 0, game.MapConfig.TILE_WIDTH, game.MapConfig.TILE_HEIGHT);
                this.centerGrid.graphics.endFill();
                this._objectsContainer.addChild(this.centerGrid);
                //this.addChildAt(this.centerGrid, this.getChildIndex(this._objectsContainer));
            }
            this.centerGrid.x = tileX * game.MapConfig.TILE_WIDTH;
            this.centerGrid.y = tileY * game.MapConfig.TILE_HEIGHT;
        };
        Scene.prototype.updateAllGrid = function () {
            /*if (this.gridContainer != null) {
                while (this.gridContainer.numChildren > 0) {
                    this.gridContainer.removeChildAt(0);
                }
            }

            for (var b: number = 0; b < this._data.gridSigmentsY; b++) {
                for (var a: number = 0; a < this._data.gridSigmentsX; a++) {
                    var node: PF.Node = this._data.getNode(a, b);
                    this.updateGrid(node);
                }
            }*/
        };
        Scene.prototype.updateGrid = function (node) {
            if (!this.gridContainer) {
                //this.gridContainer = new egret.DisplayObjectContainer();
                //this.addChildAt(this.gridContainer, this.getChildIndex(this._objectsContainer));
                //this.gridContainer.alpha = 0.5;
                //this.grids = [];
            }
            var shape;
            if (!this.grids[node.y]) {
                this.grids[node.y] = [];
            }
            if (!this.grids[node.y][node.x]) {
                shape = new egret.Shape();
                shape.graphics.beginFill(0x000000, 1);
                shape.graphics.drawRect(0, 0, game.MapConfig.TILE_WIDTH, game.MapConfig.TILE_HEIGHT);
                shape.graphics.endFill();
                shape.x = node.x * game.MapConfig.TILE_WIDTH;
                shape.y = node.y * game.MapConfig.TILE_HEIGHT;
                this.grids[node.y][node.x] = shape;
            }
            shape = this.grids[node.y][node.x];
            //if (node.objects && !!node.objects.length) {
            if (node.hasObject()) {
                this.gridContainer.addChild(shape);
                for (var _i = 0, _a = node.objects; _i < _a.length; _i++) {
                    var aa = _a[_i];
                    if (aa.tileNode != node) {
                        var a = 1;
                    }
                }
            }
            else {
                if (shape.parent) {
                    shape.parent.removeChild(shape);
                }
            }
        };
        /**
         * 该节点是否有对象占用
         * @param a
         * @param b
         * @param object 如果传入此参数，则该对象占用此节点才会返回true 否则即使此节点有对象占用也会返回false
         */
        Scene.prototype.hasNodeObject = function (a, b, object) {
            if (object === void 0) { object = null; }
            var node = this.getNode(a, b);
            if (node) {
                return node.hasObject(object);
            }
            return false;
        };
        /**通过像素获取的格子引用 */
        Scene.prototype.getNodeByPixel = function (pixelX, pixelY) {
            var a = (pixelX / game.MapConfig.TILE_WIDTH) >> 0;
            var b = (pixelY / game.MapConfig.TILE_HEIGHT) >> 0;
            return this.getNode(a, b);
        };
        /**获取的格子引用 */
        Scene.prototype.getNode = function (a, b) {
            return this._data ? this._data.getNode(a, b) : null;
        };
        Scene.prototype.getWalkableNode = function (x, y, except) {
            if (except === void 0) { except = null; }
            var node = this.getNode(x, y);
            if (node && node.walkable) {
                if (!node.object && !node.hasObject()) {
                    return node;
                }
            }
            return null;
        };
        return Scene;
    }(egret.Sprite));
    s.Scene = Scene;
    __reflect(Scene.prototype, "s.Scene");
})(s || (s = {}));
