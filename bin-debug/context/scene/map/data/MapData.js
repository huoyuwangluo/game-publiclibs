var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s_1) {
    var MapData = (function () {
        function MapData() {
            this.born = null;
            this.npcs = [];
            this.monsters = [];
            this.robots = [];
            var findOption = new PF.Option();
            findOption.allowDiagonal = true;
            findOption.dontCrossCorners = true;
            //findOption.heuristic=PF.Heuristic.euclidean;
            findOption.heuristic = PF.Heuristic.chebyshev;
            findOption.weight = 1;
            this._finder = new PF.BiBestFirstFinder(findOption);
            this._grid = new PF.Grid();
            this._dataMap = null;
        }
        Object.defineProperty(MapData.prototype, "hasData", {
            get: function () {
                return this._data != null || this._dataMap != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "id", {
            get: function () {
                return this._dataMap ? this._dataMap.id : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "name", {
            get: function () {
                return this._data ? this._data.name : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "grid", {
            /*
            public get thum():any{
                return this._data.thum;
            }
            */
            get: function () {
                return this._grid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "blockSigmentsX", {
            get: function () {
                return this._data.blockSigmentsX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "blockSigmentsY", {
            get: function () {
                return this._data.blockSigmentsY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "width", {
            get: function () {
                return this._dataMap.mapWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "height", {
            get: function () {
                return this._dataMap.mapHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "bgm", {
            get: function () {
                return this._dataMap ? this._dataMap.mapMusic : '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "mapRes", {
            get: function () {
                return this._dataMap ? this._dataMap.mapRes : this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "gridSigmentsX", {
            get: function () {
                return this._gridSigmentsX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapData.prototype, "gridSigmentsY", {
            get: function () {
                return this._gridSigmentsY;
            },
            enumerable: true,
            configurable: true
        });
        MapData.prototype.setMapScale = function (s) {
            game.MapConfig.TILE_WIDTH = 50 * s;
            game.MapConfig.TILE_HEIGHT = 50 * s;
        };
        MapData.prototype.getRealX = function (a) {
            return (a + 0.5) * game.MapConfig.TILE_WIDTH;
        };
        MapData.prototype.getRealY = function (b) {
            return (b + 0.5) * game.MapConfig.TILE_HEIGHT;
        };
        MapData.prototype.initialize = function (mapId) {
            this.reset();
            this._dataMap = Templates.getTemplateById(templates.Map.DATAMAP, mapId);
            if (this._dataMap == null) {
                throw ("map error::" + mapId);
            }
            this._gridSigmentsX = Math.ceil(this._dataMap.mapWidth / game.MapConfig.TILE_WIDTH);
            this._gridSigmentsY = Math.ceil(this._dataMap.mapHeight / game.MapConfig.TILE_HEIGHT);
            //this._gridSigmentsX=Math.ceil(this._data.width/game.MapConfig.TILE_WIDTH);
            //this._gridSigmentsY=Math.ceil(this._data.height/game.MapConfig.TILE_HEIGHT);
            var data = mg.assetsManager.getResMap(mapId);
            var walkables = null;
            if (!data || !data.walkables || TypeGame.isFormationGame()) {
                //throw("error!!!")
                this._data = null;
                this._grid.initialize(this._gridSigmentsX, this._gridSigmentsY);
            }
            else {
                this._data = data;
                walkables = [];
                for (var b = 0; b < this._gridSigmentsY; b++) {
                    if (!walkables[b])
                        walkables[b] = [];
                    if (!data.walkables[b])
                        data.walkables[b] = [];
                    for (var a = 0; a < this._gridSigmentsX; a++) {
                        walkables[b][a] = data.walkables[b][a] == 1 ? 1 : 0;
                    }
                }
                this._grid.initialize(this._gridSigmentsX, this._gridSigmentsY, walkables);
                var object;
                if (data.npcs) {
                    for (var _i = 0, _a = data.npcs; _i < _a.length; _i++) {
                        object = _a[_i];
                        var npc = utils.ObjectPool.from(s_1.MapNpcData);
                        npc.initialize(this._grid.getNodeAt(object.x, object.y), object);
                        this.npcs.push(npc);
                    }
                    this.npcs.sort(function (a, b) {
                        return a.index > b.index ? 1 : -1;
                    });
                }
                if (data.monsters) {
                    this.maxIndex = 0;
                    for (var _b = 0, _c = data.monsters; _b < _c.length; _b++) {
                        object = _c[_b];
                        var monster = utils.ObjectPool.from(s_1.MapMonsterData);
                        monster.initialize(this._grid.getNodeAt(object.x, object.y), object);
                        this.monsters.push(monster);
                        if (monster.index > this.maxIndex) {
                            this.maxIndex = monster.index;
                        }
                    }
                    this.monsters.sort(function (a, b) {
                        return a.index > b.index ? 1 : -1;
                    });
                }
                if (data.robots) {
                    for (var _d = 0, _e = data.robots; _d < _e.length; _d++) {
                        object = _e[_d];
                        var robot = utils.ObjectPool.from(s_1.MapRobotData);
                        robot.initialize(this._grid.getNodeAt(object.x, object.y), object);
                        this.robots.push(robot);
                    }
                    this.robots.sort(function (a, b) {
                        return a.index > b.index ? 1 : -1;
                    });
                }
            }
            var bornArr = this._dataMap.playerBirth.split(",");
            this.born = this.getNode(Number(bornArr[0]), Number(bornArr[1]));
            /*if(data.born) this.born=this.getNode(data.born.x,data.born.y);
            if(data.id)
            {
                this._dataMap = Templates.getTemplateById(templates.Map.DATAMAP, data.id) as templates.dataMap;
                if(this._dataMap != null)
                {
                    var bornArr:string[] = this._dataMap.playerBirth.split(",");
                    this.born=this.getNode(Number(bornArr[0]),Number(bornArr[1]));
                }
            }*/
            return this;
        };
        MapData.prototype.reset = function () {
            if (this._grid) {
                this._grid.reset();
            }
            for (var _i = 0, _a = this.npcs; _i < _a.length; _i++) {
                var npc = _a[_i];
                utils.ObjectPool.to(npc, false);
            }
            this.npcs.length = 0;
            for (var _b = 0, _c = this.monsters; _b < _c.length; _b++) {
                var monster = _c[_b];
                utils.ObjectPool.to(monster, false);
            }
            this.monsters.length = 0;
            for (var _d = 0, _e = this.robots; _d < _e.length; _d++) {
                var robot = _e[_d];
                utils.ObjectPool.to(robot, false);
            }
            this.robots.length = 0;
            this.born = null;
            // this.disposeMapRes();
        };
        /*
        public loadThum(caller:any,method:Function){
            RES.getResByUrl(`${game.GameConfig.resource_other}/map/thum/${this.id}.jpg`,function(texture:egret.Texture){
                this._data.thum=texture;
                method.call(caller);
            },this);
        }
        */
        // private disposeMapRes(){
        // 	MapBlock.dispose();
        // 	if(this.id) RES.destroyRes("resource/map/thum/"+this.id+".jpg");
        // }
        MapData.prototype.getNpcDataByIndex = function (index) {
            if (index < this.npcs.length)
                return this.npcs[index];
            return null;
        };
        MapData.prototype.getMonsterDataByIndex = function (index) {
            if (index < this.monsters.length)
                return this.monsters[index];
            return null;
        };
        MapData.prototype.getRobotDataByIndex = function (index) {
            if (index < this.robots.length)
                return this.robots[index];
            return null;
        };
        MapData.prototype.getNpcDataById = function (id) {
            for (var _i = 0, _a = this.npcs; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data.id == id)
                    return data;
            }
            return null;
        };
        MapData.prototype.getMonsterDataById = function (id) {
            for (var _i = 0, _a = this.monsters; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data.id == id)
                    return data;
            }
            return null;
        };
        MapData.prototype.getRandomMonsterDataById = function (id) {
            var list = [];
            for (var _i = 0, _a = this.monsters; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data.id == id) {
                    list.push(data);
                    return data;
                }
            }
            return list ? list[(Math.random() * list.length) >> 0] : null;
        };
        MapData.prototype.getRobotDataById = function (id) {
            for (var _i = 0, _a = this.robots; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data.id == id)
                    return data;
            }
            return null;
        };
        MapData.prototype.getStyle = function (a, b) {
            if (!this._data || !this._data.walkables)
                return 0;
            return this._data.walkables[b][a];
        };
        MapData.prototype.getMaskState = function (a, b) {
            //return this._data.walkables[b][a]==2;
            return this.getStyle(a, b) > 0;
        };
        MapData.prototype.getNode = function (a, b) {
            if (b < 0 || b >= this._gridSigmentsY)
                return null;
            if (a < 0 || a >= this._gridSigmentsX)
                return null;
            return this._grid.getNodeAt(a, b);
        };
        MapData.prototype.findPath = function (startX, startY, endX, endY) {
            this._grid.resetState();
            var arr = this._finder.findPath(startX, startY, endX, endY, this._grid);
            var paths = [];
            for (var i = 0; i < arr.length; i++) {
                var node = this.getNode(arr[i][0], arr[i][1]);
                paths.push(node);
            }
            return paths;
        };
        return MapData;
    }());
    s_1.MapData = MapData;
    __reflect(MapData.prototype, "s.MapData");
})(s || (s = {}));
