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
    var GameBox = (function (_super) {
        __extends(GameBox, _super);
        function GameBox(type) {
            if (type === void 0) { type = 0; }
            var _this = _super.call(this, type ? type : TypeActor.NPC) || this;
            _this._fixedMoveSpeed = 3;
            return _this;
        }
        GameBox.prototype.createAnimation = function () {
            this._img = new eui.Image();
            this._img.source = "legionWar_json.img_legionwar_box1";
            this.addChild(this._img);
            this.titleHeight = 100;
            if (this._hitRect) {
                this._hitRect.height = this.height;
                this._hitRect.width = this.width;
                this._hitRect.x = this.x;
                this._hitRect.y = this.y;
            }
            _super.prototype.createAnimation.call(this);
        };
        Object.defineProperty(GameBox.prototype, "boxSource", {
            set: function (v) {
                this._img.source = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBox.prototype, "xy", {
            get: function () {
                return this._xy;
            },
            set: function (v) {
                this._xy = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBox.prototype, "boxData", {
            get: function () {
                return this._boxData;
            },
            set: function (v) {
                this._boxData = v;
            },
            enumerable: true,
            configurable: true
        });
        return GameBox;
    }(s.SmartObject));
    s.GameBox = GameBox;
    __reflect(GameBox.prototype, "s.GameBox");
})(s || (s = {}));
