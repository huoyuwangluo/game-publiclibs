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
    var FlyIcon = (function (_super) {
        __extends(FlyIcon, _super);
        function FlyIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            return _this;
        }
        FlyIcon.prototype.initialize = function (data) {
            if (data) {
                this.updateIcon(data.icon);
            }
            else {
                if (this._resData) {
                    this._resData.offReference(this, this.updateAsset);
                    this._resData = null;
                }
            }
        };
        FlyIcon.prototype.updateIcon = function (id) {
            if (this._resData) {
                this._resData.offReference(this, this.updateAsset);
                this._resData = null;
            }
            this._resData = mg.assetsManager.getIconData(id);
            if (this._resData) {
                this._resData.holdReference(this, this.updateAsset);
            }
        };
        FlyIcon.prototype.updateAsset = function (data) {
            if (!data)
                return;
            this.texture = data;
            this.anchorOffsetX = this.texture.textureWidth / 2;
            this.anchorOffsetY = this.texture.textureHeight / 2;
        };
        FlyIcon.prototype.reset = function () {
            this.stop();
            if (this._resData) {
                this._resData.offReference(this, this.updateAsset);
                this._resData = null;
            }
            this.texture = null;
        };
        FlyIcon.prototype.start = function (start, end, caller, method) {
            this.x = start.x;
            this.y = start.y;
            utils.TweenUtil.bezier(this, 1000, end.x, end.y, 100 + Math.random() * 100, end.y, this.rotation, 0.5, caller, method);
        };
        FlyIcon.prototype.stop = function () {
            utils.TweenUtil.killBezier(this);
        };
        return FlyIcon;
    }(eui.Image));
    s.FlyIcon = FlyIcon;
    __reflect(FlyIcon.prototype, "s.FlyIcon", ["utils.IPool"]);
    var FlyIconsEffect = (function () {
        function FlyIconsEffect() {
            this._scale = 1;
            this._icons = [];
            this._flyingIcons = [];
        }
        FlyIconsEffect.prototype.initialize = function (items, startPoint, parent) {
            if (parent === void 0) { parent = null; }
            this._parent = parent;
            this._startPoint = startPoint;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var itemVO = items_1[_i];
                if (!itemVO.count)
                    continue;
                var icon = utils.ObjectPool.from(FlyIcon);
                icon.initialize(itemVO);
                this._icons.push(icon);
            }
            this._endPoint = mg.uiManager.getView(main.MainUIView).getBagPostion(true);
        };
        FlyIconsEffect.prototype.initializeConfigStr = function (data, startPoint, parent, endPoint, scale) {
            if (parent === void 0) { parent = null; }
            if (endPoint === void 0) { endPoint = null; }
            if (scale === void 0) { scale = 1; }
            this._parent = parent;
            this._startPoint = startPoint;
            this._scale = scale;
            var items;
            if (data instanceof Array) {
                items = data;
            }
            else {
                items = data.split(";");
            }
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var item_1 = items_2[_i];
                if (item_1.split("_")[0] == "101") {
                    var moneyPoint = mg.uiManager.getView(main.MainUIView).getMoneyPostion(true);
                    mg.effectManager.flyEffects("6160", 10, startPoint, moneyPoint, mg.layerManager.top);
                    continue;
                }
                if (item_1.split("_")[0] == "201") {
                    var moneyPoint = mg.uiManager.getView(main.MainUIView).getDiamondPostion(true);
                    mg.effectManager.flyEffects("6161", 10, startPoint, moneyPoint, mg.layerManager.top);
                    continue;
                }
                var icon = utils.ObjectPool.from(FlyIcon);
                icon.initialize(Templates.getItemTemplateById(item_1.split("_")[0]));
                this._icons.push(icon);
            }
            if (endPoint) {
                this._endPoint = endPoint;
            }
            else {
                this._endPoint = mg.uiManager.getView(main.MainUIView).getBagPostion(true);
            }
        };
        FlyIconsEffect.prototype.clear = function () {
            for (var _i = 0, _a = this._flyingIcons; _i < _a.length; _i++) {
                var icon = _a[_i];
                if (icon.parent) {
                    icon.parent.removeChild(icon);
                    icon.reset();
                    utils.ObjectPool.to(icon);
                }
            }
            this._flyingIcons.length = 0;
            this._parent = null;
        };
        FlyIconsEffect.prototype.start = function () {
            this.doFly();
            var totalTime = this._icons.length * 100 + 2000;
            utils.timer.once(totalTime, this, this.end);
        };
        FlyIconsEffect.prototype.doFly = function () {
            if (this._icons.length) {
                var icon = this._icons.pop();
                icon.scaleX = icon.scaleY = this._scale;
                if (this._parent) {
                    this._parent.addChild(icon);
                }
                else {
                    mg.layerManager.uiEffect.addChild(icon);
                }
                this._flyingIcons.push(icon);
                icon.start(this._startPoint, this._endPoint, this, this.removeIconHandler);
            }
            if (this._icons.length) {
                utils.timer.once(100, this, this.doFly);
            }
        };
        FlyIconsEffect.prototype.removeIconHandler = function (icon) {
            var index = this._flyingIcons.indexOf(icon);
            if (index >= 0)
                this._flyingIcons.splice(index, 1);
            if (icon.parent) {
                icon.parent.removeChild(icon);
            }
            icon.reset();
            utils.ObjectPool.to(icon);
            if (!this._flyingIcons.length) {
                this.end();
            }
        };
        FlyIconsEffect.prototype.end = function () {
            this.clear();
            utils.timer.clearAll(this);
            if (this._complete) {
                this._complete.run();
                this._complete = null;
            }
        };
        FlyIconsEffect.prototype.onComplete = function (caller, method) {
            this.offComplete();
            this._complete = utils.Handler.create(caller, method, null, true);
        };
        FlyIconsEffect.prototype.offComplete = function () {
            if (this._complete) {
                this._complete.recover();
                this._complete = null;
            }
        };
        return FlyIconsEffect;
    }());
    s.FlyIconsEffect = FlyIconsEffect;
    __reflect(FlyIconsEffect.prototype, "s.FlyIconsEffect");
})(s || (s = {}));
