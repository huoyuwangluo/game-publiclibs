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
var mg;
(function (mg) {
    var ControlManager = (function (_super) {
        __extends(ControlManager, _super);
        //private _rocker: RockControler;
        //private _rockStartHandler: utils.Handler;
        //private _rockEndHandler: utils.Handler;
        // private _isCancelTap: boolean;
        function ControlManager() {
            var _this = _super.call(this) || this;
            // private _remoteView: components.MoveControl;
            _this._enabled = false;
            return _this;
        }
        Object.defineProperty(ControlManager, "instance", {
            get: function () {
                if (!ControlManager._instance) {
                    ControlManager._instance = new ControlManager();
                }
                return ControlManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化
         */
        ControlManager.prototype.initialize = function (stage, scene) {
            this._scene = scene;
            this._clickEffect = new s.AnimationSprite();
            this._clickEffect.frameRate = 12;
            this._clickEffect.resId = "6100";
            //this._rocker = new RockControler();
            //this._rocker.initialize(stage, mg.layerManager.top, scene);
            //this._rocker.initializeSkin('contr_back_png', 'contr_button_png');
            scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        // public get isControl(): boolean {
        //     return this._remoteView ? this._remoteView.isControl : false;
        // }
        // public get direction(): number {
        //     return this._remoteView ? TypeDirection.getRealDirection8(TypeDirection.getAngleDirection8(this._remoteView.angle)) : 0;
        // }
        ControlManager.prototype.onTouchTap = function (evt) {
            this.sceneTapHandler(evt.stageX, evt.stageY);
        };
        ControlManager.prototype.sceneTapHandler = function (x, y) {
            // if (this._isCancelTap) {
            //     this._isCancelTap = false;
            //     return;
            // }
            if (!this._cachePoint)
                this._cachePoint = new egret.Point();
            var point = this._scene.globalToLocal(x, y, this._cachePoint);
            if (app.gameContext.scene.tapHandler(point.x, point.y)) {
                return; //如果点击到其他可点的东西
            }
            this._clickEffect.x = point.x;
            this._clickEffect.y = point.y;
            this._clickEffect.gotoAndPlay(1);
            this._clickEffect.onComplete(this, this.effectOverHandler);
            app.gameContext.scene.effectBehindLayer.addChild(this._clickEffect);
            if (this._tapHandler) {
                this._tapHandler.runWith(game.MapConfig.getTileX(point.x), game.MapConfig.getTileY(point.y));
            }
        };
        ControlManager.prototype.effectOverHandler = function () {
            this._clickEffect.stop();
            this._clickEffect.offAllComplete();
            if (this._clickEffect.parent) {
                this._clickEffect.parent.removeChild(this._clickEffect);
            }
        };
        ControlManager.prototype.onTap = function (caller, method) {
            this.offTap();
            //this._rocker.onTap(this,this.sceneTapHandler);
            this._tapHandler = utils.Handler.create(caller, method, null, false);
            // if (this._scene) this._scene.onTapHandler(this, this.sceneTapHandler);
        };
        ControlManager.prototype.offTap = function () {
            //this._rocker.offTap();
            if (this._tapHandler) {
                this._tapHandler.recover();
                this._tapHandler = null;
                // if (this._scene) this._scene.offTapHandler(this, this.sceneTapHandler);
            }
        };
        return ControlManager;
    }(egret.Sprite));
    mg.ControlManager = ControlManager;
    __reflect(ControlManager.prototype, "mg.ControlManager");
    /*
    class RockControler extends egret.DisplayObjectContainer {
        private _radius: number = 100;
        private _safeDistance: number;
        private _bar: eui.Image;
        private _bg: eui.Image;

        private _start: egret.Point;
        private _move: egret.Point;
        private _cache: egret.Point;
        private _stage: egret.Stage;
        private _contianer: egret.DisplayObjectContainer;
        private _hot: egret.DisplayObjectContainer;
        private _maxRange: number;
        private _direction: number;
        private _isRock: boolean;
        private _beginHandler: utils.Handler;
        private _endHandler: utils.Handler;
        private _changeHandler: utils.Handler;
        private _tapHandler: utils.Handler;
        public constructor() {
            super();
            this.touchEnabled = this.touchChildren = false;
        }

        public initialize(stage: egret.Stage, contianer: egret.DisplayObjectContainer, hot: egret.DisplayObjectContainer, radius: number = 100): void {
            this._stage = stage;
            this._contianer = contianer;
            this._hot = hot;
            this._contianer.addChild(this);

            this._radius = radius;

            this._safeDistance = this._radius * 0.2;
            this._maxRange = this._radius - 20;
            this._start = new egret.Point();
            this._cache = new egret.Point();
            this._move = new egret.Point();

            this._hot.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        }

        public initializeSkin(bgSKin: string, barSkin: string) {
            this._bg = new eui.Image();
            this._bg.source = bgSKin;
            this._bg.anchorOffsetX = 184 / 2;
            this._bg.anchorOffsetY = 184 / 2;

            this._bar = new eui.Image();
            this._bar.source = barSkin;
            this._bar.anchorOffsetX = 184 / 2;
            this._bar.anchorOffsetY = 184 / 2;
        }

        private touchBeginHandler(evt: egret.TouchEvent): void {
            this._start.x = evt.stageX;
            this._start.y = evt.stageY;

            this._direction = -1;

            this._stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
            this._stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
            this._stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
        }

        private touchMoveHandler(evt: egret.TouchEvent): void {
            this._move.x = evt.stageX;
            this._move.y = evt.stageY;
            var length: number = Math.min(utils.MathUtil.getDistance(this._start.x, this._start.y, this._move.x, this._move.y), this._maxRange);
            if (!this._isRock && length > 20) {
                this._isRock = true;
                this.addControl();
                if (this._beginHandler) {
                    this._beginHandler.run();
                }
            }
            //var length: number = Math.min(utils.MathUtil.getDistance(this._start.x, this._start.y, this._move.x, this._move.y), this._maxRange);
            this._cache = utils.MathUtil.getLinePoint(this._start.x, this._start.y, this._move.x, this._move.y, length);
            this._bar.x = this._cache.x;
            this._bar.y = this._cache.y;

            if (length <= this._safeDistance) {
                if (this._direction != -1) {
                    this._direction = -1;
                    // if (this._changeHandler) {
                    //     this._changeHandler.runWith(this._direction);
                    // }
                }
                return;
            }
            var curDirection = this.getDirection();
            if (this._direction != curDirection) {
                this._direction = curDirection;
                if (this._changeHandler) {
                    this._changeHandler.runWith(this._direction);
                }
            }
        }

        private cancelHandler(evt: egret.TouchEvent): void {
            this._stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
            this._stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
            this._stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
            if (this._isRock) {
                this.removeControl();
                this._isRock = false;
                if (this._endHandler) {
                    this._endHandler.run();
                }
            }else{
                if (this._tapHandler) {
                    this._tapHandler.runWith(this._start.x,this._start.y);
                }
            }
        }

        private addControl() {
            if (this._bg.parent) return;
            this.addChild(this._bg);
            this._bg.x = this._start.x;
            this._bg.y = this._start.y;
            this.addChild(this._bar);
            this._bar.x = this._start.x;
            this._bar.y = this._start.y;
        }

        private removeControl() {
            if (this._bg.parent) this._bg.parent.removeChild(this._bg);
            if (this._bar.parent) this._bar.parent.removeChild(this._bar);
        }

        public remove(){
            this._stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
            this._stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
            this._stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
            if (this._isRock) {
                this.removeControl();
                this._isRock = false;
            }
        }

        public get direction(): number {
            return this._direction;
        }

        private getDirection(): number {
            var directAngle: number = 360 / 8;
            var angle = utils.MathUtil.toLAngle(utils.MathUtil.getAngle(this._move.x - this._start.x, this._move.y - this._start.y) - (directAngle / 2));
            var direct = (((angle / directAngle)) >> 0);
            return (direct + 3) % 8;
        }

        public get isRock(): boolean {
            return this._isRock;
        }

        public onBegin(caller: any, method: Function) {
            this.offBegin();
            this._beginHandler = utils.Handler.create(caller, method, null, false);
        }

        public offBegin() {
            if (this._beginHandler) {
                this._beginHandler.recover();
                this._beginHandler = null;
            }
        }

        public onEnd(caller: any, method: Function) {
            this.offEnd();
            this._endHandler = utils.Handler.create(caller, method, null, false);
        }

        public offEnd() {
            if (this._endHandler) {
                this._endHandler.recover();
                this._endHandler = null;
            }
        }

        public onChange(caller: any, method: Function) {
            this.offChange();
            this._changeHandler = utils.Handler.create(caller, method, null, false);
        }

        public offChange() {
            if (this._changeHandler) {
                this._changeHandler.recover();
                this._changeHandler = null;
            }
        }

        public onTap(caller: any, method: Function) {
            this.offTap();
            this._tapHandler = utils.Handler.create(caller, method, null, false);
        }

        public offTap() {
            if (this._tapHandler) {
                this._tapHandler.recover();
                this._tapHandler = null;
            }
        }
    }*/
})(mg || (mg = {}));
