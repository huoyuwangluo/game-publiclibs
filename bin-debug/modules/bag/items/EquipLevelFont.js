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
var item;
(function (item) {
    var EquipLevelFont = (function (_super) {
        __extends(EquipLevelFont, _super);
        function EquipLevelFont() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = _this.touchChildren = false;
            return _this;
        }
        Object.defineProperty(EquipLevelFont.prototype, "level", {
            set: function (level) {
                while (this.numChildren) {
                    EquipLevelFont.toImagePool(this.removeChildAt(0));
                }
                var tx = 0;
                var shen;
                var lvShen = convert.getGodLevel(level);
                var lv;
                if (lvShen) {
                    shen = EquipLevelFont.fromImagePool();
                    shen.texture = this.getShenTexture();
                    this.addChild(shen);
                    shen.x = 0;
                    shen.y = 0;
                    tx += shen.width;
                    lv = lvShen;
                }
                else {
                    lv = convert.getLevel(level);
                }
                var numStr = lv.toString();
                var length = numStr.length;
                for (var index = 0; index < length; index++) {
                    var bitmap = EquipLevelFont.fromImagePool();
                    bitmap.texture = this.getNumTexture(numStr.charAt(index));
                    bitmap.x = tx;
                    bitmap.y = 0;
                    tx += bitmap.width;
                    this.addChild(bitmap);
                }
                if (!lvShen) {
                    var ji = EquipLevelFont.fromImagePool();
                    ji.texture = this.getLevelTexture();
                    this.addChild(ji);
                    ji.x = tx;
                }
            },
            enumerable: true,
            configurable: true
        });
        EquipLevelFont.prototype.getNumTexture = function (num) {
            return RES.getRes("common_json.item_" + num);
        };
        EquipLevelFont.prototype.getLevelTexture = function () {
            return RES.getRes("common_json.item_ji");
        };
        EquipLevelFont.prototype.getShenTexture = function () {
            return RES.getRes("common_json.item_shen");
        };
        EquipLevelFont.fromPool = function () {
            if (this._pool.length)
                return this._pool.pop();
            return new EquipLevelFont();
        };
        EquipLevelFont.toPool = function (v) {
            this._pool.push(v);
        };
        EquipLevelFont.fromImagePool = function () {
            if (this._imgPool.length)
                return this._imgPool.pop();
            return new egret.Bitmap();
        };
        EquipLevelFont.toImagePool = function (v) {
            this._imgPool.push(v);
        };
        EquipLevelFont._pool = [];
        EquipLevelFont._imgPool = [];
        return EquipLevelFont;
    }(egret.DisplayObjectContainer));
    item.EquipLevelFont = EquipLevelFont;
    __reflect(EquipLevelFont.prototype, "item.EquipLevelFont");
})(item || (item = {}));
