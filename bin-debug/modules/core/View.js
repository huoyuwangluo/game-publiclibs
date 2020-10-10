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
var base;
(function (base) {
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            return _super.call(this) || this;
        }
        View.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initialize();
        };
        View.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        View.prototype.reset = function () { };
        ;
        /**标记关闭时需要立即释放的独立资源图片*/
        View.prototype.markDestoryImage = function () {
            var imgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                imgs[_i] = arguments[_i];
            }
            if (!this._markDestoryImages)
                this._markDestoryImages = [];
            (_a = this._markDestoryImages).push.apply(_a, imgs);
            var _a;
        };
        /**标记关闭时需要释放的图集资源*/
        View.prototype.markDestoryTexture = function () {
            var textureNames = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                textureNames[_i] = arguments[_i];
            }
            if (!this._markDestoryTextures)
                this._markDestoryTextures = [];
            (_a = this._markDestoryTextures).push.apply(_a, textureNames);
            var _a;
        };
        /**刷新所有标记的独立资源图片的显示 */
        View.prototype.refreshMarkImagesDisplay = function () {
            if (!this._markDestoryImages)
                return;
            for (var _i = 0, _a = this._markDestoryImages; _i < _a.length; _i++) {
                var img = _a[_i];
                this.refreshImageDisplay(img);
            }
        };
        /**刷新独立资源图片的显示 */
        View.prototype.refreshImageDisplay = function (img) {
            var source = img.source;
            img.source = null;
            img.source = source;
        };
        /**释放关闭时需要立即释放的独立资源图片 */
        View.prototype.destoryImmediately = function () {
            if (!this._markDestoryImages)
                return;
            for (var _i = 0, _a = this._markDestoryImages; _i < _a.length; _i++) {
                var img = _a[_i];
                RES.destroyRes(img.source);
            }
        };
        /**销毁当前视图（释放图集文件） */
        View.prototype.destory = function () {
            if (this._markDestoryImages) {
                for (var _i = 0, _a = this._markDestoryImages; _i < _a.length; _i++) {
                    var img = _a[_i];
                    RES.destroyRes(img.source);
                }
                this._markDestoryImages.length = 0;
            }
            this._markDestoryImages = null;
            if (this._markDestoryTextures) {
                for (var _b = 0, _c = this._markDestoryTextures; _b < _c.length; _b++) {
                    var textureName = _c[_b];
                    RES.destroyRes(textureName);
                }
                this._markDestoryTextures.length = 0;
            }
            this._markDestoryTextures = null;
        };
        /**
         * 取出界面特效
         * 特效创建接口统一 方便对其进行回收
         */
        View.prototype.fromEffect = function (resId) {
            var aniamtion = utils.ObjectPool.from(s.AnimationSprite);
            aniamtion.resId = resId;
            return aniamtion;
        };
        /**回收界面特效 */
        View.prototype.toEffect = function (aniamtion) {
            aniamtion.touchEnabled = aniamtion.touchChildren = false;
            utils.ObjectPool.to(aniamtion, true);
        };
        View.prototype.addEffect = function (id, x, y, parent, fps, index) {
            if (parent === void 0) { parent = null; }
            if (fps === void 0) { fps = 12; }
            if (index === void 0) { index = -1; }
            if (!this._effectPool) {
                this._effectPool = [];
            }
            var effect = this.fromEffect(id);
            effect.x = x;
            effect.y = y;
            var container = (parent ? parent : this);
            index == -1 ? container.addChild(effect) : container.addChildAt(effect, index);
            effect.frameRate = fps;
            effect.play();
            this._effectPool.push(effect);
            return effect;
        };
        View.prototype.removeEffect = function (effect) {
            if (effect) {
                var index = this._effectPool.indexOf(effect);
                if (index >= 0) {
                    this._effectPool.splice(index, 1);
                    effect.stop();
                    if (effect.parent) {
                        effect.parent.removeChild(effect);
                    }
                    effect.offAllComplete();
                    this.toEffect(effect);
                    return true;
                }
            }
            return false;
        };
        View.prototype.removeEffectHandler = function (effect) {
            if (!effect)
                return false;
            effect.stop();
            if (effect.parent) {
                effect.parent.removeChild(effect);
            }
            effect.offAllComplete();
            this.toEffect(effect);
            return true;
        };
        View.prototype.removeEffectByResId = function (id) {
            if (!this._effectPool)
                return;
            for (var i = 0; i < this._effectPool.length; i++) {
                var effect = this._effectPool[i];
                if (effect.resId == id) {
                    if (this.removeEffect(effect)) {
                        i--;
                    }
                }
            }
        };
        View.prototype.clearEffect = function () {
            if (!this._effectPool)
                return;
            for (var _i = 0, _a = this._effectPool; _i < _a.length; _i++) {
                var effect = _a[_i];
                effect.stop();
                if (effect.parent) {
                    effect.parent.removeChild(effect);
                }
                this.toEffect(effect);
            }
            this._effectPool.length = 0;
        };
        Object.defineProperty(View.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            /**设置数据源 */
            set: function (value) {
                if (this._dataSource != value) {
                    this._dataSource = value;
                    this.dataChange();
                }
            },
            enumerable: true,
            configurable: true
        });
        View.prototype.dataChange = function () {
        };
        View.prototype.updateTitle = function (name) {
            base.Dialog.instance.updateTitle(name);
        };
        View.prototype.clearList = function (list) {
            var index = 0;
            while (index < list.numChildren) {
                var itemRender = list.getChildAt(index);
                if (itemRender) {
                    itemRender.data = null;
                }
                index++;
            }
            list.dataProvider = null;
        };
        return View;
    }(eui.Component));
    base.View = View;
    __reflect(View.prototype, "base.View");
})(base || (base = {}));
