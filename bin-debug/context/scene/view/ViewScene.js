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
    var ViewScene = (function (_super) {
        __extends(ViewScene, _super);
        function ViewScene() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = true;
            return _this;
        }
        ViewScene.prototype.initialize = function () {
            this._camera = new s.Camera();
            this._scene = new s.Scene(this);
            this.addChild(this._scene);
            this._black = new egret.Sprite();
        };
        ViewScene.prototype.initializeMapData = function (mapData) {
            this._scene.initialize(mapData);
            this._camera.initialize(mapData.width, mapData.height);
        };
        ViewScene.prototype.showBlack = function () {
            this._black.graphics.clear();
            this._black.graphics.beginFill(0x0, 0.4);
            this._black.graphics.drawRect(0, 0, mg.stageManager.stageWidth, mg.stageManager.stageHeight);
            this._black.graphics.endFill();
            //this._black.x = (600 - mg.stageManager.stageWidth)/2;
            //this.x = (mg.stageManager.stageWidth - 600)/2;
            this.addChild(this._black);
        };
        ViewScene.prototype.hideBlack = function () {
            if (this._black.parent != null) {
                this._black.parent.removeChild(this._black);
            }
        };
        ViewScene.prototype.reset = function () {
            this._camera.reset();
            //this._scene.reset();
            this.hideBlack();
        };
        ViewScene.prototype.start = function () {
            mg.stageManager.onResize(this, this.updateViewPort, false);
            mg.stageManager.stage.addEventListener(egret.Event.ENTER_FRAME, this.updateMoveRender, this);
            //mg.stageManager.addFrameTick(this, this.updateMoveRender);
            mg.stageManager.addTick(this, this.updateRender, 20);
            this.updateViewPort(mg.stageManager.stageWidth, mg.stageManager.stageHeight);
            this._scene.start();
        };
        ViewScene.prototype.stop = function () {
            mg.stageManager.offResize(this, this.updateViewPort);
            mg.stageManager.stage.removeEventListener(egret.Event.ENTER_FRAME, this.updateMoveRender, this);
            //mg.stageManager.removeFrameTick(this, this.updateMoveRender);
            mg.stageManager.removeTick(this, this.updateRender);
            this._scene.stop();
        };
        ViewScene.prototype.updateViewPort = function (width, height) {
            this._camera.updateViewPort(width, height);
            this._scene.updateViewPort(width, height);
        };
        Object.defineProperty(ViewScene.prototype, "width", {
            get: function () {
                return this._camera.viewPort.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewScene.prototype, "height", {
            get: function () {
                return this._camera.viewPort.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewScene.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewScene.prototype, "scene", {
            get: function () {
                return this._scene;
            },
            enumerable: true,
            configurable: true
        });
        ViewScene.prototype.lookAt = function (target, forceFellow) {
            this._camera.lookAt(target, forceFellow);
            this.updateMoveRender();
        };
        ViewScene.prototype.updateMoveRender = function () {
            this._camera.updateRender();
            this._scene.scale(this._camera.factor);
            this._scene.pos(this._camera.sceneX, this._camera.sceneY);
        };
        ViewScene.prototype.updateRender = function (timeStamp) {
            this._scene.updateRender(timeStamp);
        };
        return ViewScene;
    }(egret.Sprite));
    s.ViewScene = ViewScene;
    __reflect(ViewScene.prototype, "s.ViewScene", ["s.IView", "egret.DisplayObject"]);
})(s || (s = {}));
