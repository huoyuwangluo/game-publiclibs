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
    var TopBattlePlayerItems = (function (_super) {
        __extends(TopBattlePlayerItems, _super);
        function TopBattlePlayerItems() {
            var _this = _super.call(this) || this;
            _this._text = "";
            _this._textColor = 0;
            _this.touchChildren = false;
            return _this;
        }
        Object.defineProperty(TopBattlePlayerItems.prototype, "labText", {
            get: function () {
                return this._text;
            },
            set: function (v) {
                if (this._text != v) {
                    this._text = v;
                    this.labName.text = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerItems.prototype, "labTextColor", {
            get: function () {
                return this._textColor;
            },
            set: function (v) {
                if (this._textColor != v) {
                    this._textColor = v;
                    this.labName.textColor = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerItems.prototype, "imageSource", {
            get: function () {
                return this._imageSource;
            },
            set: function (v) {
                if (this._imageSource != v) {
                    this._imageSource = v;
                    this.imgBg.source = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopBattlePlayerItems.prototype, "playerVo", {
            get: function () {
                return this._playerVo;
            },
            set: function (v) {
                this._playerVo = v;
            },
            enumerable: true,
            configurable: true
        });
        return TopBattlePlayerItems;
    }(ui.TopBattlePlayerItemsSkin));
    item.TopBattlePlayerItems = TopBattlePlayerItems;
    __reflect(TopBattlePlayerItems.prototype, "item.TopBattlePlayerItems");
})(item || (item = {}));
