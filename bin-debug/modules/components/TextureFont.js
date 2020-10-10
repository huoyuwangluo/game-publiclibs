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
var component;
(function (component) {
    var TextureFont = (function (_super) {
        __extends(TextureFont, _super);
        function TextureFont() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = _this.touchChildren = false;
            return _this;
        }
        TextureFont.prototype.initialize = function (textureName, numbertag, beginTag, endTag) {
            if (beginTag === void 0) { beginTag = ""; }
            if (endTag === void 0) { endTag = ""; }
            this._textureName = textureName;
            this._numbertag = numbertag;
            this._beginTag = beginTag;
            this._endTag = endTag;
        };
        TextureFont.prototype.setValue = function (v, hasBegin, hasEnd) {
            if (hasBegin === void 0) { hasBegin = false; }
            if (hasEnd === void 0) { hasEnd = false; }
            while (this.numChildren) {
                TextureFont.toImagePool(this.removeChildAt(0));
            }
            var tx = 0;
            var begin;
            if (hasBegin && this._beginTag) {
                begin = TextureFont.fromImagePool();
                begin.texture = this.getTexture(this._beginTag);
                this.addChild(begin);
                begin.x = 0;
                begin.y = 0;
                tx += begin.width;
            }
            var numStr = v.toString();
            var length = numStr.length;
            for (var index = 0; index < length; index++) {
                var bitmap = TextureFont.fromImagePool();
                bitmap.texture = this.getTexture(this._numbertag + numStr.charAt(index));
                bitmap.x = tx;
                bitmap.y = 0;
                tx += bitmap.width;
                this.addChild(bitmap);
            }
            if (hasEnd && this._endTag) {
                var end;
                end = TextureFont.fromImagePool();
                end.texture = this.getTexture(this._endTag);
                this.addChild(end);
                end.x = tx;
                end.y = 0;
            }
        };
        TextureFont.prototype.getTexture = function (name) {
            return RES.getRes(this._textureName + "." + name);
        };
        TextureFont.fromPool = function () {
            if (this._pool.length)
                return this._pool.pop();
            return new TextureFont();
        };
        TextureFont.toPool = function (v) {
            this._pool.push(v);
        };
        TextureFont.fromImagePool = function () {
            if (this._imgPool.length)
                return this._imgPool.pop();
            return new egret.Bitmap();
        };
        TextureFont.toImagePool = function (v) {
            this._imgPool.push(v);
        };
        TextureFont._pool = [];
        TextureFont._imgPool = [];
        return TextureFont;
    }(egret.DisplayObjectContainer));
    component.TextureFont = TextureFont;
    __reflect(TextureFont.prototype, "component.TextureFont");
})(component || (component = {}));
