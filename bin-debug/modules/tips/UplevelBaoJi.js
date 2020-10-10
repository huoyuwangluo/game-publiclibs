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
var tips;
(function (tips) {
    var UplevelBaoJi = (function (_super) {
        __extends(UplevelBaoJi, _super);
        function UplevelBaoJi() {
            var _this = _super.call(this) || this;
            _this._posXs = [-100, 50, 0, 50, 100];
            _this._posYs = [-100, 50, 0, 50, 100];
            _this.touchEnabled = _this.touchChildren = false;
            return _this;
        }
        UplevelBaoJi.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.anchorOffsetX = 50;
            this.anchorOffsetY = 50;
            this._isFirst = true;
            // mg.layerManager.tip.addChild(this);
            // this.x = mg.stageManager.stageWidth * .5;
            // this.y = mg.stageManager.stageHeight - 400;
        };
        UplevelBaoJi.prototype.show = function (isSuper) {
            var _this = this;
            var resId;
            if (isSuper)
                resId = "6339";
            else
                resId = "6341";
            var posX, posY;
            if (this._isFirst) {
                this._isFirst = false;
                var posXIndex = 2;
                var posYIndex = 2;
                var indexX = this._posXs[posXIndex];
                var indexY = this._posYs[posYIndex];
                this._posXs.splice(posXIndex, 1);
                this._posYs.splice(posYIndex, 1);
                mg.effectManager.playEffectOnce(resId, 0, 0, this.gpEffect).onCompleteOnce(this, function () {
                    _this._posXs.push(indexX);
                    _this._posYs.push(indexY);
                });
                return;
            }
            if (this._posXs.length <= 0) {
                posX = (Math.random() * 201 >> 0) - 100;
                posY = (Math.random() * 201 >> 0) - 100;
                mg.effectManager.playEffectOnce(resId, posX, posY, this.gpEffect);
            }
            else {
                var posXIndex = Math.random() * this._posXs.length >> 0;
                var posYIndex = Math.random() * this._posYs.length >> 0;
                var indexX = this._posXs[posXIndex];
                var indexY = this._posYs[posYIndex];
                this._posXs.splice(posXIndex, 1);
                this._posYs.splice(posYIndex, 1);
                posX = indexX + (Math.random() * 21 >> 0) - 10;
                posY = indexY + (Math.random() * 21 >> 0) - 10;
                mg.effectManager.playEffectOnce(resId, posX, posY, this.gpEffect).onCompleteOnce(this, function () {
                    _this._posXs.push(indexX);
                    _this._posYs.push(indexY);
                });
            }
        };
        UplevelBaoJi.prototype.reset = function () {
            this._posXs = [];
            this._posYs = [];
        };
        return UplevelBaoJi;
    }(ui.UplevelBaoJiSkin));
    tips.UplevelBaoJi = UplevelBaoJi;
    __reflect(UplevelBaoJi.prototype, "tips.UplevelBaoJi");
})(tips || (tips = {}));
