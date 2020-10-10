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
var app;
(function (app) {
    var ContextBase = (function (_super) {
        __extends(ContextBase, _super);
        function ContextBase() {
            var _this = _super.call(this) || this;
            _this._scene = null;
            return _this;
        }
        ContextBase.prototype.initialize = function () {
            this._manager = s.GameManager.instance;
        };
        ContextBase.prototype.reset = function () {
        };
        ContextBase.prototype.stop = function () {
        };
        /**
         * 注册界面
         * @param name 界面名称
         * @param viewClass 界面类
         * @param aglin	对齐方式
         * @param offRatio	偏移位置
         * @param popType	界面弹出类型
         * @param level	是否为弹出界面
         * @param destoryTime 销毁时间
         * 			[-1]:	关闭时不销毁视图(但会销毁已经标记过的单个Image资源).
         * 			[0]:	关闭时立即销毁视图(销毁标记过的单个Image资源和图集文件).
         * 			[大于0]:	关闭时按照给定秒数后销毁视图.
         * @return
         */
        ContextBase.prototype.registerUI = function (name, viewClass, aglin, offRatio, popType, level, destoryTime) {
            if (offRatio === void 0) { offRatio = null; }
            if (level === void 0) { level = 0; }
            if (destoryTime === void 0) { destoryTime = 0; }
            mg.uiManager.register(name, viewClass, aglin, offRatio, popType, level, destoryTime);
        };
        Object.defineProperty(ContextBase.prototype, "scene", {
            get: function () {
                if (this._scene == null && this._manager.view) {
                    this._scene = this._manager.view.scene;
                }
                return this._scene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextBase.prototype, "manager", {
            get: function () {
                return this._manager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextBase.prototype, "gameCurrent", {
            get: function () {
                return this.manager.gameCurrent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextBase.prototype, "typeGame", {
            /**当前玩法类型 */
            get: function () {
                return this.gameCurrent ? this.gameCurrent.type : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextBase.prototype, "typeGameLast", {
            /**上一个玩法类型 */
            get: function () {
                return this.manager.lastGameType;
            },
            enumerable: true,
            configurable: true
        });
        //是不是玩家自己
        ContextBase.prototype.isMySelf = function (object) {
            if (this.scene && (this.scene.manager.player == object || this.scene.manager.player == object.master)) {
                return true;
            }
            return false;
        };
        //是不是友军
        ContextBase.prototype.isMyFriend = function (object) {
            if (this.scene && (this.scene.isFriendObject(this.scene.manager.player, object) || this.scene.isFriendObject(this.scene.manager.player, object.master))) {
                return true;
            }
            return false;
        };
        //是不是敌军
        ContextBase.prototype.isMyEnemy = function (object) {
            if (this.scene && (this.scene.isEnemyObject(this.scene.manager.player, object) || this.scene.isEnemyObject(this.scene.manager.player, object.master))) {
                return true;
            }
            return false;
        };
        return ContextBase;
    }(egret.EventDispatcher));
    app.ContextBase = ContextBase;
    __reflect(ContextBase.prototype, "app.ContextBase");
})(app || (app = {}));
