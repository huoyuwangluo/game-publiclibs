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
var components;
(function (components) {
    var FlipExhibitor = (function (_super) {
        __extends(FlipExhibitor, _super);
        /**
         * 图片展示器
         * @param type 0 为图片  1为动画
         * @param totalTransition 用以过渡的个数
         */
        function FlipExhibitor(type, totalTransition) {
            if (type === void 0) { type = 0; }
            if (totalTransition === void 0) { totalTransition = 2; }
            var _this = _super.call(this) || this;
            _this._space = 300;
            _this._type = type;
            _this._totalTransition = totalTransition;
            _this._list = [];
            _this.touchEnabled = _this.touchChildren = false;
            _this.createChildren();
            return _this;
        }
        /**
         * 初始化
         * @param 资源名列表
         * @param 资源注册点
         */
        FlipExhibitor.prototype.initialize = function (resNames, registerPoints) {
            if (registerPoints === void 0) { registerPoints = null; }
            this._resNames = resNames;
            this._registerPoints = registerPoints;
            this._total = this._resNames.length;
            this.update();
        };
        FlipExhibitor.prototype.reset = function () {
            this._resNames = null;
            this._registerPoints = null;
            this._lastSelectedIndex = undefined;
            this._selectedIndex = undefined;
        };
        Object.defineProperty(FlipExhibitor.prototype, "tapEnabled", {
            get: function () {
                return this.touchEnabled;
            },
            set: function (value) {
                if (value) {
                    this.touchEnabled = true;
                    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                }
                else {
                    this.touchEnabled = false;
                    this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        FlipExhibitor.prototype.touchHandler = function (e) {
            var p = this.globalToLocal(e.stageX, e.stageY);
            var h = this._space / 2;
            if (p.x < -h && p.y < 0 && p.y > -200) {
                if (this._selectedIndex > 0) {
                    this.selectedIndex--;
                    this.dispatchEventWith(egret.Event.CHANGE);
                }
            }
            else if (p.x > h && p.y < 0 && p.y > -200) {
                if (this._selectedIndex < this._total) {
                    this.selectedIndex++;
                    this.dispatchEventWith(egret.Event.CHANGE);
                }
            }
        };
        Object.defineProperty(FlipExhibitor.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (value) {
                if (value >= this._total) {
                    value = this._total - 1;
                }
                if (value < 0) {
                    value = 0;
                }
                if (this._selectedIndex != value) {
                    this._lastSelectedIndex = this._selectedIndex;
                    this._selectedIndex = value;
                    this.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        FlipExhibitor.prototype.update = function () {
            var tween = this._lastSelectedIndex != undefined;
            var showTotal = this._list.length;
            var start = -(this._totalTransition * this._space);
            var center = this._totalTransition;
            for (var i = 0; i < showTotal; i++) {
                var realIndex = this._selectedIndex + (i - center);
                if (realIndex < 0 || realIndex >= this._total) {
                    this._list[i].visible = false;
                    continue;
                }
                this._list[i].visible = true;
                if (this._type == 0) {
                    this._list[i].source = this._resNames[realIndex];
                }
                else {
                    this._list[i].resId = this._resNames[realIndex];
                    if (i == center) {
                        this._list[i].play();
                    }
                    else {
                        this._list[i].stop();
                    }
                }
                if (this._registerPoints && realIndex < this._registerPoints.length) {
                    this._list[i].anchorOffsetX = this._registerPoints[realIndex].x;
                    this._list[i].anchorOffsetY = this._registerPoints[realIndex].y;
                }
                egret.Tween.removeTweens(this._list[i]);
                if (!tween) {
                    this._list[i].x = start + this._space * i;
                    this._list[i].scaleX = this._list[i].scaleY = (i == center ? 1 : 0.7);
                    this._list[i].alpha = (i == center ? 1 : 0.3);
                    continue;
                }
                var isRight = this._selectedIndex > this._lastSelectedIndex ? 1 : -1;
                this._list[i].x = start + this._space * i + this._space * isRight;
                this._list[i].scaleX = this._list[i].scaleY = ((i == (center - isRight)) ? 1 : 0.7);
                this._list[i].alpha = ((i == (center - isRight)) ? 1 : 0.3);
                egret.Tween.get(this._list[i]).to({
                    x: start + this._space * i,
                    scaleX: (i == center ? 1 : 0.7),
                    scaleY: (i == center ? 1 : 0.7),
                    alpha: (i == center ? 1 : 0.3)
                }, 500, utils.Ease.circOut);
            }
        };
        FlipExhibitor.prototype.createChildren = function () {
            var total = this._totalTransition * 2 + 1;
            if (total == this._list.length)
                return;
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var object = _a[_i];
                if (this._type == 1) {
                    object.stop();
                }
                if (object.parent) {
                    object.parent.removeChild(object);
                }
                if (this._type == 0) {
                    object.source = null;
                }
                else {
                    utils.ObjectPool.to(object, true);
                    object.resId = null;
                    object = null;
                }
            }
            this._list.length = 0;
            for (var i = 0; i < total; i++) {
                if (this._type == 0) {
                    this._list[i] = new eui.Image();
                }
                else {
                    this._list[i] = utils.ObjectPool.from(s.AnimationSprite);
                }
                this._list[i].touchEnabled = false;
                this.addChild(this._list[i]);
            }
        };
        return FlipExhibitor;
    }(egret.DisplayObjectContainer));
    components.FlipExhibitor = FlipExhibitor;
    __reflect(FlipExhibitor.prototype, "components.FlipExhibitor");
})(components || (components = {}));
