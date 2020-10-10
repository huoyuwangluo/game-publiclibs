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
    var FootLightObject = (function (_super) {
        __extends(FootLightObject, _super);
        function FootLightObject() {
            return _super.call(this) || this;
        }
        Object.defineProperty(FootLightObject.prototype, "skin", {
            get: function () {
                return this._skin;
            },
            set: function (v) {
                var _this = this;
                this._skin = v;
                if (this._skin) {
                    RES.getResAsync("scene_json.typePetRank_" + this._skin, function (t) {
                        _this.texture = t;
                        _this.anchorOffsetX = _this.texture.textureWidth / 2;
                        _this.anchorOffsetY = _this.texture.textureHeight / 2;
                    }, this);
                }
                else {
                    this.texture = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        FootLightObject.prototype.reset = function () {
            this._skin = null;
            this.texture = null;
        };
        FootLightObject.prototype.addTo = function (scene) {
            if (!this.parent) {
                scene.shadowLayer.addChild(this);
                this.start();
            }
        };
        FootLightObject.prototype.remove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
                this.stop();
            }
        };
        FootLightObject.prototype.pos = function (x, y) {
            this.x = x;
            this.y = y;
        };
        FootLightObject.prototype.start = function () {
            mg.stageManager.addTick(this, this.updateRender, 60);
        };
        FootLightObject.prototype.stop = function () {
            mg.stageManager.removeTick(this, this.updateRender);
        };
        FootLightObject.prototype.updateRender = function () {
            this.scaleX = this.scaleY = Math.sin(mg.stageManager.timeStamp / 400) * 0.1 + 1;
        };
        return FootLightObject;
    }(egret.Bitmap));
    s.FootLightObject = FootLightObject;
    __reflect(FootLightObject.prototype, "s.FootLightObject");
})(s || (s = {}));
