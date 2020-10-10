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
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            return _this;
        }
        /**
         * 初始化
         */
        Icon.prototype.initialize = function (data) {
            this.source = data;
        };
        /**
         * 重置 会释放资源
         */
        Icon.prototype.reset = function () {
            if (this._resData) {
                this._resData.offReference(this, this.updateAsset);
                this._resData = null;
            }
            this.texture = null;
            egret.superSetter(Icon, this, "source", null);
        };
        Object.defineProperty(Icon.prototype, "source", {
            get: function () {
                return this._data;
            },
            /**
             * 设置资源 设置为NULL会释放资源
             */
            set: function (data) {
                egret.superSetter(Icon, this, "source", null);
                this.updateIcon(null);
                this.texture = null;
                if (data instanceof egret.Texture) {
                    this.texture = data;
                    return;
                }
                if (typeof data == 'string') {
                    if (data.indexOf('.') >= 0) {
                        egret.superSetter(Icon, this, "source", data);
                        return;
                    }
                    this.updateIcon(data);
                    return;
                }
                this.updateIcon(null);
            },
            enumerable: true,
            configurable: true
        });
        Icon.prototype.updateIcon = function (id) {
            if (this._resData) {
                this._resData.offReference(this, this.updateAsset);
                this._resData = null;
            }
            this.texture = null;
            this._resData = mg.assetsManager.getIconData(id);
            if (this._resData) {
                this._resData.holdReference(this, this.updateAsset);
            }
        };
        Icon.prototype.updateAsset = function (data) {
            this.texture = data;
        };
        Icon.prototype.removeSelf = function () {
            if (this.parent) {
                return this.parent.removeChild(this);
            }
            return null;
        };
        return Icon;
    }(eui.Image));
    components.Icon = Icon;
    __reflect(Icon.prototype, "components.Icon", ["utils.IPool"]);
})(components || (components = {}));
