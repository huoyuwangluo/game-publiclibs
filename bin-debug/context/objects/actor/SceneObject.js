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
(function (s_1) {
    var SceneObject = (function (_super) {
        __extends(SceneObject, _super);
        function SceneObject(type) {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this._tileObstructEnabled = true;
            _this._addToTime = 0; //添加到场景的时间点
            _this._type = type;
            _this.touchEnabled = _this.touchChildren = false;
            return _this;
        }
        SceneObject.prototype.addTo = function (scene) {
            this._scene = scene;
            this.updateMaskState();
            this._addToTime = egret.getTimer();
        };
        SceneObject.prototype.getPosWeight = function () {
            return 0;
        };
        SceneObject.prototype.remove = function () {
            if (this._tileNode && this._scene) {
                this._scene.removeNodeObject(this);
                this._tileNode = null;
            }
            this._scene = null;
        };
        SceneObject.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        SceneObject.prototype.reset = function () {
            this.offAllTileChange();
        };
        SceneObject.prototype.pos = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Object.defineProperty(SceneObject.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        SceneObject.prototype.setTile = function (tile) {
            if (this._tileNode != tile) {
                if (this._tileObstructEnabled) {
                    if (this._scene)
                        this._scene.updateNodeObject(this, tile);
                }
                this._tileNode = tile;
                if (this._tileNode) {
                    this.updateTilePosition();
                    this.updateMaskState();
                    if (this._tileChangeHandlers) {
                        this._tileChangeHandlers.runWith(this);
                    }
                }
            }
        };
        SceneObject.prototype.setTileNoUpdate = function (tile) {
            if (this._tileNode != tile) {
                if (this._tileObstructEnabled) {
                    if (this._scene)
                        this._scene.updateNodeObject(this, tile);
                }
                this._tileNode = tile;
                if (this._tileNode) {
                    this.updateMaskState();
                    if (this._tileChangeHandlers) {
                        this._tileChangeHandlers.runWith(this);
                    }
                }
            }
        };
        SceneObject.prototype.updateMaskState = function () {
            if (this._scene && this._tileNode)
                this.alpha = this._scene.getMaskState(this._tileNode.x, this._tileNode.y) ? 0.8 : 1;
        };
        SceneObject.prototype.updateTilePosition = function () {
            if (this._tileNode == null)
                return;
            this.pos(game.MapConfig.getReaX(this._tileNode.x), game.MapConfig.getReaY(this._tileNode.y));
        };
        Object.defineProperty(SceneObject.prototype, "tileNode", {
            get: function () {
                return this._tileNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneObject.prototype, "tileX", {
            get: function () {
                return this._tileNode ? this._tileNode.x : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneObject.prototype, "tileY", {
            get: function () {
                return this._tileNode ? this._tileNode.y : 0;
            },
            enumerable: true,
            configurable: true
        });
        SceneObject.prototype.onTileChange = function (caller, method) {
            if (!this._tileChangeHandlers) {
                this._tileChangeHandlers = new utils.Handlers(false);
            }
            this._tileChangeHandlers.add(caller, method);
        };
        SceneObject.prototype.offTileChange = function (caller, method) {
            if (this._tileChangeHandlers) {
                this._tileChangeHandlers.remove(caller, method);
            }
        };
        SceneObject.prototype.offAllTileChange = function () {
            if (this._tileChangeHandlers) {
                this._tileChangeHandlers.clear();
            }
        };
        Object.defineProperty(SceneObject.prototype, "scene", {
            get: function () { return this._scene; },
            set: function (s) {
                this._scene = s;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneObject.prototype, "vo", {
            get: function () { return null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneObject.prototype, "stateDead", {
            get: function () { return false; },
            enumerable: true,
            configurable: true
        });
        SceneObject.prototype.updateRender = function (timeStamp) { };
        return SceneObject;
    }(egret.DisplayObjectContainer));
    s_1.SceneObject = SceneObject;
    __reflect(SceneObject.prototype, "s.SceneObject", ["s.ISceneObject", "utils.IPool"]);
})(s || (s = {}));
