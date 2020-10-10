var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIStructer = (function () {
    function UIStructer(name, viewClass, aglin, popType, offRatio, level, destoryTime, titleName) {
        if (popType === void 0) { popType = 0; }
        if (offRatio === void 0) { offRatio = null; }
        if (level === void 0) { level = 0; }
        if (destoryTime === void 0) { destoryTime = 0; }
        if (titleName === void 0) { titleName = ""; }
        this._isshow = false;
        this._aglin = aglin;
        this._popType = popType;
        this._offRatio = offRatio;
        this._level = level;
        this._name = name;
        this._viewClass = viewClass;
        this._className = egret.getQualifiedClassName(viewClass);
        this._position = new egret.Point();
        this._destoryTime = destoryTime;
    }
    UIStructer.prototype.destory = function () {
        this._name = null;
        this._aglin = null;
        this._popType = 0;
        this._offRatio = null;
        if (this._view) {
            if (this._view.parent) {
                if (TypePop.isPopOrFloat(this.popType)) {
                    mg.dialogManager.close(this);
                }
                else {
                    if (this._view.parent) {
                        this._view.parent.removeChild(this._view);
                    }
                }
            }
        }
        this.deleteView();
        this._position = null;
    };
    /**添加界面到显示 */
    UIStructer.prototype.add = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this._isshow) {
            this._isshow = true;
            utils.timer.clear(this, this.deleteView);
            this.createView();
            if (TypePop.isPopOrFloat(this.popType)) {
                mg.dialogManager.pop(this);
            }
            else {
                TypePop.getLayer(TypePop.FIX).addChild(this._view);
                this.updatePosition();
            }
            (_a = this._mediator.added).call.apply(_a, [this._mediator].concat(args));
            return true;
        }
        //提层级
        TypePop.getLayer(this.popType).addChild(this._view);
        return false;
        var _a;
    };
    /**从显示中移除界面 */
    UIStructer.prototype.remove = function () {
        if (this._isshow) {
            this._isshow = false;
            this._mediator.removed();
            if (TypePop.isPopOrFloat(this.popType)) {
                mg.dialogManager.close(this);
            }
            else {
                if (this._view.parent) {
                    this._view.parent.removeChild(this._view);
                }
            }
            //mg.TipManager.instance.unBindUI(this._view);
            //销毁时间 -1：不销毁视图 0：退出时立即销毁视图 >0:按照给定秒数后销毁视图
            if (this._destoryTime >= 0) {
                if (!this._destoryTime) {
                    this.deleteView();
                }
                else {
                    utils.timer.once(this._destoryTime * 1000, this, this.deleteView);
                }
            }
            else {
                //只销毁需要立即回收的资源
                if (this._view instanceof base.View) {
                    this._view.destoryImmediately();
                }
            }
            return true;
        }
        return false;
    };
    UIStructer.prototype.update = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        mg.dialogManager.show(this);
        if (this._isshow) {
            this._mediator.update.apply(this._mediator, args);
        }
    };
    UIStructer.prototype.updatePosition = function () {
        var p = utils.AlignUtil.getAreaAglinPoint(this.aglin, mg.stageManager.stageWidth, mg.stageManager.stageHeight, this.view, this.offRatio ? this.offRatio.x : 0, this.offRatio ? this.offRatio.y : 0, this.position);
        this.view.x = p.x;
        this.view.y = p.y;
    };
    /**创建界面 */
    UIStructer.prototype.createView = function () {
        if (!this._view) {
            this._view = new this._viewClass();
            Mediator.registerMediator(this._view);
            this._mediator = Mediator.getMediator(this._view);
        }
        return this._view;
    };
    /**销毁界面 */
    UIStructer.prototype.deleteView = function () {
        if (this._view) {
            Mediator.removeMediator(this._view);
            this._mediator.offAll();
            this._mediator = null;
            if (this._view instanceof base.View) {
                this._view.destory();
            }
            this._view = null;
        }
    };
    Object.defineProperty(UIStructer.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "className", {
        get: function () {
            return this._className;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "view", {
        get: function () {
            return this._view ? this._view : this.createView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "clazz", {
        get: function () {
            return this._viewClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "aglin", {
        get: function () {
            return this._aglin;
        },
        set: function (value) {
            this._aglin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "popType", {
        get: function () {
            return this._popType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "offRatio", {
        get: function () {
            return this._offRatio;
        },
        set: function (v) {
            this._offRatio = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "realWidth", {
        get: function () {
            return this._view.width * this._view.scaleX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "realHeight", {
        get: function () {
            return this._view.height * this._view.scaleY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "mediator", {
        get: function () {
            return this._mediator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIStructer.prototype, "isshow", {
        get: function () {
            return this._isshow;
        },
        enumerable: true,
        configurable: true
    });
    return UIStructer;
}());
__reflect(UIStructer.prototype, "UIStructer");
