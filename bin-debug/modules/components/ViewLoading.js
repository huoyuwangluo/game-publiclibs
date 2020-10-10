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
var view;
(function (view_1) {
    var ViewLoading = (function (_super) {
        __extends(ViewLoading, _super);
        function ViewLoading(view) {
            var _this = _super.call(this) || this;
            _this._view = view;
            _this.touchEnabled = true;
            _this._back = new egret.Shape();
            _this.addChild(_this._back);
            _this._midBack = new egret.Shape();
            _this.addChild(_this._midBack);
            _this._label = new eui.Label();
            _this.addChild(_this._label);
            _this._label.text = Language.C_SJHQZ + '...';
            return _this;
        }
        ViewLoading.prototype.add = function () {
            var backWidth = 220;
            var backHeight = 90;
            this._back.graphics.clear();
            this._back.graphics.beginFill(0x0, 0.3);
            this._back.graphics.drawRect(0, 0, this._view.width, this._view.height);
            this._back.graphics.endFill();
            this._midBack.graphics.beginFill(0x0, 0.8);
            this._midBack.graphics.drawRect((this._view.width - backWidth) / 2, (this._view.height - backHeight) / 2, backWidth, backHeight);
            this._midBack.graphics.endFill();
            this._label.validateNow();
            this._label.x = this._back.width / 2 - this._label.width / 2;
            this._label.y = this._back.height / 2 - this._label.height / 2;
            this._view.addChild(this);
        };
        ViewLoading.prototype.remove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return ViewLoading;
    }(egret.DisplayObjectContainer));
    view_1.ViewLoading = ViewLoading;
    __reflect(ViewLoading.prototype, "view.ViewLoading");
})(view || (view = {}));
