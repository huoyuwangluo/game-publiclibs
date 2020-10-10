var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mg;
(function (mg) {
    var LayerManager = (function () {
        function LayerManager() {
        }
        Object.defineProperty(LayerManager, "instance", {
            get: function () {
                if (!LayerManager._instance) {
                    LayerManager._instance = new LayerManager();
                }
                return LayerManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        LayerManager.prototype.initialize = function (stage) {
            this._stage = stage;
            this._root = new egret.DisplayObjectContainer();
            this._log = new egret.DisplayObjectContainer();
            stage.addChild(this._root);
            stage.addChild(this._log);
            this._world = new egret.DisplayObjectContainer();
            this._world.touchEnabled = true;
            this._map = new egret.DisplayObjectContainer();
            this._mapEffect = new egret.DisplayObjectContainer();
            this._world.addChild(this._map);
            this._world.addChild(this._mapEffect);
            this._mainUI = new egret.DisplayObjectContainer();
            this._mainUIUp = new egret.DisplayObjectContainer();
            this._dialog = new egret.DisplayObjectContainer();
            this._mainUITop = new egret.DisplayObjectContainer();
            this._alert = new egret.DisplayObjectContainer();
            this._remind = new egret.DisplayObjectContainer();
            this._tip = new egret.DisplayObjectContainer();
            this._top = new egret.DisplayObjectContainer();
            this._door = new egret.DisplayObjectContainer();
            this._notice = new egret.DisplayObjectContainer();
            this._loading = new egret.DisplayObjectContainer();
            this._tipUp = new egret.DisplayObjectContainer();
            this._root.addChild(this._world);
            this._root.addChild(this._mainUI);
            this._root.addChild(this._mainUIUp);
            this._root.addChild(this._dialog);
            this._root.addChild(this._mainUITop);
            this._root.addChild(this._alert);
            this._root.addChild(this._remind);
            this._root.addChild(this._tip);
            this._root.addChild(this._tipUp);
            this._root.addChild(this._top);
            this._root.addChild(this._door);
            this._root.addChild(this._notice);
            this._root.addChild(this._loading);
        };
        LayerManager.prototype.initializeSdkLayer = function (sdk) {
            if (sdk === void 0) { sdk = null; }
            this._sdk = sdk;
            if (this._sdk)
                this._stage.addChild(this._sdk);
        };
        LayerManager.prototype.enable = function () {
            this._root.touchEnabled = true;
        };
        LayerManager.prototype.disable = function () {
            this._root.touchEnabled = false;
        };
        LayerManager.prototype.registerEffectLayer = function (layer) {
            this._effect = layer;
        };
        Object.defineProperty(LayerManager.prototype, "root", {
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "log", {
            /**日志**/
            get: function () {
                return this._log;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "world", {
            /**世界 包括map&mapObjects**/
            get: function () {
                return this._world;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "map", {
            /**地图**/
            get: function () {
                return this._map;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "mapEffect", {
            /**地图表现层**/
            get: function () {
                return this._mapEffect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "mainUI", {
            /**主UI**/
            get: function () {
                return this._mainUI;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "uiEffect", {
            /**主UIEffect**/
            get: function () {
                return this._effect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "mainUIUp", {
            /**UI上层**/
            get: function () {
                return this._mainUIUp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "dialog", {
            /**弹出窗口**/
            get: function () {
                return this._dialog;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "mainUITop", {
            /**弹出窗口**/
            get: function () {
                return this._mainUITop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "remind", {
            /**提示窗口**/
            get: function () {
                return this._remind;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "tip", {
            /**提示**/
            get: function () {
                return this._tip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "tipUp", {
            /**提示上面一层**/
            get: function () {
                return this._tipUp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "alert", {
            /**警告窗口**/
            get: function () {
                return this._alert;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "top", {
            /**上层,特效**/
            get: function () {
                return this._top;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "notice", {
            /**广播**/
            get: function () {
                return this._notice;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "loading", {
            /**加载**/
            get: function () {
                return this._loading;
            },
            enumerable: true,
            configurable: true
        });
        return LayerManager;
    }());
    mg.LayerManager = LayerManager;
    __reflect(LayerManager.prototype, "mg.LayerManager");
})(mg || (mg = {}));
