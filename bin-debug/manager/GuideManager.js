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
    var GuideManager = (function () {
        function GuideManager() {
            this._oldQuanPointX = 300;
            this._oldQuanPointY = 400;
        }
        Object.defineProperty(GuideManager, "instance", {
            get: function () {
                if (!GuideManager._instance) {
                    GuideManager._instance = new GuideManager();
                }
                return GuideManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        GuideManager.prototype.initialize = function (stage) {
            this._arrow = new GuideArrow();
            this._quan = new s.AnimationSprite();
            this._quan.resId = '6149';
            this._quan.touchEnabled = this._quan.touchChildren = false;
        };
        GuideManager.prototype.guide = function (guideItem, time) {
            if (time === void 0) { time = 0; }
            if (this._current) {
                this.stopGuide();
            }
            this._current = guideItem;
            this._current.onChange(this, this.guideItemHandler);
            this._current.onEnd(this, this.guideItemCloseHandler);
            this._current.start(time);
        };
        /**立即引导 */
        GuideManager.prototype.guideImmediately = function (component, tip, direct, isShow) {
            if (direct === void 0) { direct = -1; }
            if (isShow === void 0) { isShow = false; }
            if (copy.CopyWinInstance.instance.copyWinTipView)
                return;
            if (copy.CopyFailInstance.instance.copyFailTipView && !isShow)
                return;
            this.guideHandler(component, tip, direct);
        };
        /**立即停止引导 */
        GuideManager.prototype.guideStopImmediately = function (component, qiangzhi) {
            if (qiangzhi === void 0) { qiangzhi = false; }
            if (qiangzhi) {
                this.stopGuildHandler();
                return;
            }
            if (this._currentDisplay == component)
                this.stopGuildHandler();
        };
        GuideManager.prototype.guideItemHandler = function () {
            if (this._current) {
                this.guideHandler(this._current.component, this._current.tip, this._current.direct);
            }
        };
        GuideManager.prototype.guideHandler = function (component, tip, direct) {
            if (direct === void 0) { direct = -1; }
            this.stopGuildHandler();
            this._currentDisplay = component;
            if (this._currentDisplay) {
                // egret.Tween.get(this._mask).to({hotX:rect.x,hotY:rect.y,hotWidth: rect.width,hotHeight:rect.height},1000,utils.Ease.expoOut);
                mg.layerManager.tip.addChild(this._arrow);
                this._arrow.visible = false;
                mg.layerManager.tip.addChild(this._quan);
                this._direct = direct;
                egret.Tween.removeTweens(this._quan);
                this._quan.x = this._oldQuanPointX;
                this._quan.y = this._oldQuanPointY;
                this._quan.scaleX = this._quan.scaleY = 1;
                this.updatePosition();
                this._arrow.setContent(this._direct, tip);
                this._arrow.start();
                this._quan.play();
                //this.tweenBig();
                mg.stageManager.onResize(this, this.resizeHandler);
            }
        };
        GuideManager.prototype.resizeHandler = function () {
            utils.timer.once(200, this, this.updatePosition);
        };
        GuideManager.prototype.updatePosition = function () {
            var point = this._currentDisplay.localToGlobal();
            // if(preRectangle&&(point.x||point.y)){
            //     preRectangle.x=point.x;
            //     preRectangle.y=point.y;
            // }
            var arrowWidth = 234;
            var arrowHeight = 121;
            var tx = point.x;
            var ty = point.y;
            var tw = this._currentDisplay.width;
            var th = this._currentDisplay.height;
            if (this._direct == -1) {
                if (tx > mg.stageManager.stageWidth / 2 && (tx - mg.stageManager.stageWidth / 2) > 200) {
                    this._direct = TypeDirection.RIGHT;
                }
                else if (Math.abs(tx + tw - mg.stageManager.stageWidth / 2) > 200) {
                    this._direct = TypeDirection.LEFT;
                }
                else if (ty > mg.stageManager.stageHeight / 2) {
                    this._direct = TypeDirection.DOWN;
                }
                else {
                    this._direct = TypeDirection.UP;
                }
            }
            switch (this._direct) {
                case TypeDirection.RIGHT:
                    this._arrow.x = tx - arrowWidth;
                    this._arrow.y = ty + th / 2 - arrowHeight / 2;
                    break;
                case TypeDirection.LEFT:
                    this._arrow.x = tx + tw;
                    this._arrow.y = ty + th / 2 - arrowHeight / 2;
                    break;
                case TypeDirection.DOWN:
                    this._arrow.x = tx + tw / 2 - arrowWidth / 2;
                    this._arrow.y = ty - arrowHeight;
                    break;
                case TypeDirection.UP:
                    this._arrow.x = tx + tw / 2 - arrowWidth / 2;
                    this._arrow.y = ty + th;
                    break;
            }
            // this._quan.x = tx + tw / 2;
            // this._quan.y = ty + th / 2;
            this.tweenMoveStart(tx + tw / 2, ty + th / 2);
        };
        GuideManager.prototype.tweenMoveStart = function (xPoint, yPoint) {
            if (this._oldQuanPointX == xPoint && this._oldQuanPointY == yPoint) {
                this._arrow.visible = true;
                this.tweenBig();
                return;
            }
            var time = Math.min(400, (Math.abs(xPoint - this._oldQuanPointX) + Math.abs(yPoint - this._oldQuanPointY)));
            this._oldQuanPointX = xPoint;
            this._oldQuanPointY = yPoint;
            egret.Tween.get(this._quan).to({ x: xPoint, y: yPoint }, time).call(this.tweenMoveEnd, this);
        };
        GuideManager.prototype.tweenMoveEnd = function () {
            this._quan.x = this._oldQuanPointX;
            this._quan.y = this._oldQuanPointY;
            this._arrow.visible = true;
            this.tweenBig();
        };
        GuideManager.prototype.tweenBig = function () {
            egret.Tween.get(this._quan).to({ scaleX: 2, scaleY: 2 }, 200).call(this.tweenSamll, this);
        };
        GuideManager.prototype.tweenSamll = function () {
            egret.Tween.get(this._quan).to({ scaleX: 1, scaleY: 1 }, 100);
        };
        GuideManager.prototype.guideItemCloseHandler = function (e) {
            this.stopGuide();
        };
        GuideManager.prototype.stopGuide = function () {
            //egret.Tween.removeTweens(this._mask);
            //this._mask.remove();
            if (this._current) {
                this._current.stop();
                this._current.offChange();
                this._current.offEnd();
                utils.ObjectPool.to(this._current, true);
                this._current = null;
            }
            this.stopGuildHandler();
        };
        GuideManager.prototype.stopGuildHandler = function () {
            mg.stageManager.offResize(this, this.resizeHandler);
            utils.timer.clear(this, this.updatePosition);
            this._arrow.stop();
            if (this._arrow.parent) {
                this._arrow.parent.removeChild(this._arrow);
            }
            this._quan.stop();
            egret.Tween.removeTweens(this._quan);
            if (this._quan.parent) {
                this._quan.parent.removeChild(this._quan);
            }
        };
        Object.defineProperty(GuideManager.prototype, "current", {
            get: function () {
                return this._current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuideManager.prototype, "isHashArrowAndQuan", {
            get: function () {
                if (this._arrow && this._arrow.parent && this._quan && this._quan.parent) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return GuideManager;
    }());
    mg.GuideManager = GuideManager;
    __reflect(GuideManager.prototype, "mg.GuideManager");
    var GuideArrow = (function (_super) {
        __extends(GuideArrow, _super);
        function GuideArrow() {
            var _this = _super.call(this) || this;
            _this.i = 0;
            _this._container = new egret.DisplayObjectContainer();
            _this.addChild(_this._container);
            _this._skinlUp = new ui.GuideArrowUpSKin();
            _this._skinlDown = new ui.GuideArrowDownSKin();
            _this._skinlLeft = new ui.GuideArrowLeftSKin();
            _this._skinlRight = new ui.GuideArrowRightSKin();
            _this.touchEnabled = _this.touchChildren = false;
            return _this;
        }
        GuideArrow.prototype.setContent = function (direct, text) {
            this._direct = direct;
            this._container.x = this._container.y = 0;
            if (this._skinlUp.parent)
                this._skinlUp.parent.removeChild(this._skinlUp);
            if (this._skinlDown.parent)
                this._skinlDown.parent.removeChild(this._skinlDown);
            if (this._skinlLeft.parent)
                this._skinlLeft.parent.removeChild(this._skinlLeft);
            if (this._skinlRight.parent)
                this._skinlRight.parent.removeChild(this._skinlRight);
            switch (direct) {
                case TypeDirection.UP:
                    this._container.addChild(this._skinlUp);
                    this._skinlUp.lab.text = text;
                    break;
                case TypeDirection.DOWN:
                    this._container.addChild(this._skinlDown);
                    this._skinlDown.lab.text = text;
                    break;
                case TypeDirection.LEFT:
                    this._container.addChild(this._skinlLeft);
                    this._skinlLeft.lab.text = text;
                    break;
                case TypeDirection.RIGHT:
                    this._container.addChild(this._skinlRight);
                    this._skinlRight.lab.text = text;
                    break;
            }
        };
        GuideArrow.prototype.start = function () {
            mg.stageManager.addTick(this, this.renderHandler, 30);
            //egret.startTick(this.renderHandler,this);
        };
        GuideArrow.prototype.stop = function () {
            mg.stageManager.removeTick(this, this.renderHandler);
            //egret.stopTick(this.renderHandler,this);
        };
        GuideArrow.prototype.renderHandler = function (timeStamp) {
            switch (this._direct) {
                case TypeDirection.UP:
                    this._container.y = Math.sin(this.i / 10) * 10;
                    break;
                case TypeDirection.RIGHT:
                    this._container.x = -Math.sin(this.i / 10) * 10;
                    break;
                case TypeDirection.DOWN:
                    this._container.y = -Math.sin(this.i / 10) * 10;
                    break;
                case TypeDirection.LEFT:
                    this._container.x = Math.sin(this.i / 10) * 10;
                    break;
            }
            this.i++;
            return true;
        };
        return GuideArrow;
    }(egret.DisplayObjectContainer));
    mg.GuideArrow = GuideArrow;
    __reflect(GuideArrow.prototype, "mg.GuideArrow");
    var GuideMaskGruop = (function () {
        function GuideMaskGruop() {
            this._alpha = 0.8;
            this._backs = [];
            var total = 4;
            while (total--) {
                var back = new egret.Shape();
                back.touchEnabled = true;
                this._backs.push(back);
            }
            this._hotRect = new egret.Rectangle();
        }
        GuideMaskGruop.prototype.add = function (parent) {
            for (var _i = 0, _a = this._backs; _i < _a.length; _i++) {
                var back = _a[_i];
                parent.addChild(back);
            }
            mg.stageManager.onResize(this, this.resizeHandler, true);
        };
        GuideMaskGruop.prototype.remove = function () {
            for (var _i = 0, _a = this._backs; _i < _a.length; _i++) {
                var back = _a[_i];
                if (back.parent) {
                    back.parent.removeChild(back);
                }
            }
            mg.stageManager.offResize(this, this.resizeHandler);
        };
        Object.defineProperty(GuideMaskGruop.prototype, "hotX", {
            get: function () {
                return this._hotRect.x;
            },
            set: function (value) {
                this._hotRect.x = value;
                egret.callLater(this.update, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuideMaskGruop.prototype, "hotY", {
            get: function () {
                return this._hotRect.y;
            },
            set: function (value) {
                this._hotRect.y = value;
                egret.callLater(this.update, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuideMaskGruop.prototype, "hotWidth", {
            get: function () {
                return this._hotRect.width;
            },
            set: function (value) {
                this._hotRect.width = value;
                egret.callLater(this.update, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuideMaskGruop.prototype, "hotHeight", {
            get: function () {
                return this._hotRect.height;
            },
            set: function (value) {
                this._hotRect.height = value;
                egret.callLater(this.update, this);
            },
            enumerable: true,
            configurable: true
        });
        GuideMaskGruop.prototype.resizeHandler = function (w, h) {
            this.update();
        };
        GuideMaskGruop.prototype.update = function () {
            var back;
            ;
            for (var _i = 0, _a = this._backs; _i < _a.length; _i++) {
                back = _a[_i];
                back.graphics.clear();
            }
            this._backs[0].x = 0;
            this._backs[0].y = 0;
            this._backs[0].graphics.beginFill(0x0, this._alpha);
            this._backs[0].graphics.drawRect(0, 0, this._hotRect.x, this._hotRect.y + this._hotRect.height);
            this._backs[0].graphics.endFill();
            this._backs[1].x = this._hotRect.x;
            this._backs[1].y = 0;
            this._backs[1].graphics.beginFill(0x0, this._alpha);
            this._backs[1].graphics.drawRect(0, 0, mg.stageManager.stageWidth - this._hotRect.x, this._hotRect.y);
            this._backs[1].graphics.endFill();
            this._backs[2].x = this._hotRect.x + this._hotRect.width;
            this._backs[2].y = this._hotRect.y;
            this._backs[2].graphics.beginFill(0x0, this._alpha);
            this._backs[2].graphics.drawRect(0, 0, mg.stageManager.stageWidth - this._hotRect.x - this._hotRect.width, mg.stageManager.stageHeight - this._hotRect.y);
            this._backs[2].graphics.endFill();
            this._backs[3].x = 0;
            this._backs[3].y = this._hotRect.y + this._hotRect.height;
            this._backs[3].graphics.beginFill(0x0, this._alpha);
            this._backs[3].graphics.drawRect(0, 0, this._hotRect.x + this._hotRect.width, mg.stageManager.stageHeight - this._hotRect.y - this._hotRect.height);
            this._backs[3].graphics.endFill();
        };
        return GuideMaskGruop;
    }());
    mg.GuideMaskGruop = GuideMaskGruop;
    __reflect(GuideMaskGruop.prototype, "mg.GuideMaskGruop");
})(mg || (mg = {}));
