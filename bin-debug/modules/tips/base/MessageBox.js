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
var MessageBox = (function (_super) {
    __extends(MessageBox, _super);
    function MessageBox(max) {
        var _this = _super.call(this) || this;
        _this._isRun = false;
        _this._speed = 600;
        _this._MAXCOUNT = max;
        _this._boxes = [];
        _this._temps = [];
        _this._back = new egret.DisplayObjectContainer();
        _this.addChild(_this._back);
        _this._mid = new egret.DisplayObjectContainer();
        _this.addChild(_this._mid);
        _this._midIcon = new egret.DisplayObjectContainer();
        _this.addChild(_this._midIcon);
        _this._front = new egret.DisplayObjectContainer();
        _this.addChild(_this._front);
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    Object.defineProperty(MessageBox.prototype, "back", {
        get: function () {
            return this._back;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageBox.prototype, "mid", {
        get: function () {
            return this._mid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageBox.prototype, "midIcon", {
        get: function () {
            return this._midIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageBox.prototype, "front", {
        get: function () {
            return this._front;
        },
        enumerable: true,
        configurable: true
    });
    MessageBox.prototype.add = function (tipClazz) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._temps.push({ clazz: tipClazz, args: args });
        if (!this._isRun) {
            this.addHandler();
        }
    };
    MessageBox.prototype.addHandler = function () {
        if (!this._temps.length) {
            this._isRun = false;
            return;
        }
        var data = this._temps.shift();
        var item = (_a = utils.ObjectPool.from).call.apply(_a, [utils.ObjectPool, data.clazz, true].concat(data.args));
        this._boxes.push(item);
        if (this._boxes.length > this._MAXCOUNT) {
            this.removeHandler(this._boxes.shift());
        }
        item.add(this);
        item.y = item.height;
        this.update();
        item.start(this, this.completeHandler);
        utils.timer.once(this._speed + (this._speed / 600) * 200, this, this.addHandler);
        this._isRun = true;
        var _a;
    };
    MessageBox.prototype.update = function () {
        var off = 0;
        for (var i = this._boxes.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this._boxes[i]);
            egret.Tween.get(this._boxes[i]).to({ y: off }, this._speed, egret.Ease.cubicInOut);
            //this._boxes[i].y=off;
            off -= this._boxes[i].height;
        }
    };
    MessageBox.prototype.completeHandler = function (item) {
        egret.Tween.removeTweens(item);
        var index = this._boxes.indexOf(item);
        if (index >= 0) {
            this._boxes.splice(index, 1);
            this.removeHandler(item);
        }
    };
    MessageBox.prototype.removeHandler = function (item) {
        egret.Tween.removeTweens(item);
        item.remove();
        utils.ObjectPool.to(item, true);
    };
    Object.defineProperty(MessageBox.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (v) {
            this._speed = v;
        },
        enumerable: true,
        configurable: true
    });
    return MessageBox;
}(egret.DisplayObjectContainer));
__reflect(MessageBox.prototype, "MessageBox");
