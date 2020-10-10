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
    var GameDropObject = (function (_super) {
        __extends(GameDropObject, _super);
        // private _effect:s.AnimationSprite;
        function GameDropObject() {
            var _this = _super.call(this, TypeActor.DROP) || this;
            _this._shadow = new egret.Bitmap();
            RES.getResAsync("scene_json.scene_shadow", function (t) {
                _this._shadow.texture = t;
                _this._shadow.anchorOffsetX = _this._shadow.width / 2;
                _this._shadow.anchorOffsetY = _this._shadow.height / 2;
            }, _this);
            _this._bitmap = new egret.Bitmap();
            _this.addChild(_this._bitmap);
            _this._nameLab = new egret.TextField();
            _this._nameLab.fontFamily = game.GameConfig.DEFAULT_FONT_NAME;
            _this._nameLab.textColor = 0xFFFFFF;
            _this._nameLab.size = 16;
            return _this;
            // this._effect=new s.AnimationSprite();
        }
        GameDropObject.prototype.addTo = function (scene) {
            _super.prototype.addTo.call(this, scene);
            scene.dropItemLayer.addChild(this);
            scene.shadowLayer.addChild(this._shadow);
            scene.labelLayer.addChild(this._nameLab);
            // if(!this._effect.resId){
            // 	this._effect.resId='6196';
            // }
            // scene.effectBehindLayer.addChild(this._effect);
            // this._effect.play();
        };
        GameDropObject.prototype.remove = function () {
            this.setTile(null);
            _super.prototype.remove.call(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
            if (this._shadow.parent) {
                this._shadow.parent.removeChild(this._shadow);
            }
            if (this._nameLab.parent) {
                this._nameLab.parent.removeChild(this._nameLab);
            }
            // if(this._effect.parent){
            // 	this._effect.stop();
            // 	this._effect.reset();
            // 	this._effect.parent.removeChild(this._effect);
            // }
        };
        GameDropObject.prototype.initialize = function (item) {
            var name = '??';
            var color;
            if (item instanceof vo.ItemVO) {
                this._itemVO = item;
                if (!this._itemVO.hasTemplate) {
                    return;
                }
                if (item.id == '101') {
                    this._isMoney = true;
                }
                else if (item.id == '201') {
                    this._isMoney = true;
                }
                else {
                    this._isMoney = false;
                }
                this.updateResData();
                name = this._itemVO.name;
                color = TypeQuality.getQualityColor(this._itemVO.quality);
                this._isMoney = false;
            }
            else {
                var itemId = item.toString();
                if (itemId == '101') {
                    name = Language.C_JB;
                    color = TypeQuality.getQualityColor(TypeQuality.WHITE);
                }
                else if (itemId == '201') {
                    name = Language.C_MS;
                    color = TypeQuality.getQualityColor(TypeQuality.ORANGE);
                }
                else {
                    color = TypeColor.WHITE;
                }
                this.updateResData(item.toString());
                this._isMoney = true;
            }
            this._nameLab.width = 200;
            this._nameLab.textColor = color;
            this._nameLab.text = name;
            this._nameLab.width = this._nameLab.textWidth;
            this._nameLab.height = this._nameLab.textHeight;
        };
        GameDropObject.prototype.reset = function () {
            if (this._resData) {
                this._resData.offReference(this, this.iconLoadedHandler);
                this._resData = null;
            }
            egret.Tween.removeTweens(this._bitmap);
            egret.Tween.removeTweens(this._shadow);
            this._bitmap.texture = null;
        };
        GameDropObject.prototype.updateResData = function (id) {
            if (id === void 0) { id = null; }
            if (this._resData) {
                this._resData.offReference(this, this.iconLoadedHandler);
                this._resData = null;
            }
            this._resData = mg.assetsManager.getIconData(id ? id : this._itemVO.icon);
            if (this._resData) {
                this._resData.holdReference(this, this.iconLoadedHandler);
            }
        };
        GameDropObject.prototype.iconLoadedHandler = function (texture) {
            if (!texture)
                return;
            this._bitmap.texture = texture;
            this._bitmap.anchorOffsetX = this._bitmap.texture.textureWidth / 2;
            this._bitmap.anchorOffsetY = this._bitmap.texture.textureHeight / 2;
            this._bitmap.scaleX = this._bitmap.scaleY = 0.9;
        };
        GameDropObject.prototype.setTile = function (tile, tween) {
            if (tween === void 0) { tween = true; }
            if (this._tileNode != tile) {
                if (this._tileNode) {
                    this._tileNode.drop = null;
                    if (this.scene)
                        this.scene.removeNodeObject(this);
                }
                this._tileNode = tile;
                if (this._tileNode) {
                    this._tileNode.drop = this;
                    this.x = this._scene.getMapRealX(this._tileNode.x);
                    this.y = this._scene.getMapRealY(this._tileNode.y);
                    if (tween) {
                        this._bitmap.y = -50;
                        var time = (Math.random() * 300) >> 0;
                        egret.Tween.get(this._bitmap).wait(time).to({ y: 0 }, 300, utils.Ease.backInOut);
                        this._shadow.scaleX = this._shadow.scaleY = 0.5;
                        egret.Tween.get(this._shadow).wait(time).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.backOut);
                    }
                    this.alpha = this._scene.getMaskState(this._tileNode.x, this._tileNode.y) ? 0.5 : 1;
                }
            }
        };
        Object.defineProperty(GameDropObject.prototype, "x", {
            get: function () {
                return egret.superGetter(GameDropObject, this, "x");
            },
            set: function (v) {
                egret.superSetter(GameDropObject, this, "x", v);
                this._shadow.x = v;
                this._nameLab.x = v - this._nameLab.width / 2;
                // this._effect.x=v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameDropObject.prototype, "y", {
            get: function () {
                return egret.superGetter(GameDropObject, this, "y");
            },
            set: function (v) {
                egret.superSetter(GameDropObject, this, "y", v);
                this._shadow.y = v;
                this._nameLab.y = v - 40;
                // this._effect.y=v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameDropObject.prototype, "alpha", {
            get: function () {
                return egret.superGetter(GameDropObject, this, "alpha");
            },
            set: function (v) {
                egret.superSetter(GameDropObject, this, "alpha", v);
                this._bitmap.alpha = v;
                this._shadow.alpha = v;
                this._nameLab.alpha = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameDropObject.prototype, "itemVO", {
            get: function () {
                return this._itemVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameDropObject.prototype, "isMoney", {
            get: function () {
                return this._isMoney;
            },
            enumerable: true,
            configurable: true
        });
        return GameDropObject;
    }(s.SceneObject));
    s.GameDropObject = GameDropObject;
    __reflect(GameDropObject.prototype, "s.GameDropObject");
})(s || (s = {}));
