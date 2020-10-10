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
    var GameNpc = (function (_super) {
        __extends(GameNpc, _super);
        function GameNpc(type) {
            if (type === void 0) { type = 0; }
            var _this = _super.call(this, type ? type : TypeActor.NPC) || this;
            _this._fixedMoveSpeed = 3;
            return _this;
        }
        GameNpc.prototype.createAnimation = function () {
            this._animation = new s.AnimationBitmap();
            this.animation.frameRate = 5;
            this.addChild(this.animation);
            this.titleHeight = 100;
        };
        GameNpc.prototype.createTitle = function () {
            this._title = new s.TitleNpcObject();
        };
        GameNpc.prototype.initialize = function (vo) {
            _super.prototype.initialize.call(this, vo);
            if (vo.template instanceof templates.cityNpc) {
                this.title.marktitleSkin = vo.template.titleRes;
                this._openId = vo.template.open;
                this._npcType = vo.template.type;
            }
            this.resId = vo.resId;
            this.nameVisible = true;
        };
        GameNpc.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.title.marktitleSkin = null;
            this._openId = 0;
            this._npcType = 0;
            this.resId = "";
            this.title.reset();
        };
        Object.defineProperty(GameNpc.prototype, "animation", {
            get: function () {
                return this._animation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameNpc.prototype, "resId", {
            set: function (v) {
                if (this._resId == v)
                    return;
                this._resId = v;
                if (this._resId) {
                    var modleData = Templates.getTemplateById(templates.Map.DATAMODEL, this._resId);
                    if (modleData) {
                        this.titleHeight = modleData.HPHight;
                    }
                    if (this._hitRect) {
                        this._hitRect.height = this.titleHeight;
                        this._hitRect.x = -(this._hitRect.width / 2);
                        this._hitRect.y = -this._hitRect.height;
                    }
                }
                this.updateAnimation();
                this.animation.play();
            },
            enumerable: true,
            configurable: true
        });
        GameNpc.prototype.updateAvatarDisplay = function (isShow) {
            if (_super.prototype.updateAvatarDisplay.call(this, isShow)) {
                this.updateAnimation();
                return true;
            }
            return false;
        };
        GameNpc.prototype.updateAnimation = function () {
            if (!this._skinEnabled)
                return;
            if (this._resId == undefined)
                return;
            this.animation.setResId(this._avatarEnabled ? this._resId : null);
        };
        Object.defineProperty(GameNpc.prototype, "bloodVisible", {
            get: function () {
                return this._title.bloodVisible;
            },
            set: function (v) {
                this._title.bloodVisible = v;
                if (v) {
                    this._title.hpMax = this._vo.battleHpMax;
                    this._title.hp = this._vo.hp;
                    this._vo.onPropertyChange(TypeProperty.Hp, this, this.propertyChangeHandler);
                    this._vo.onPropertyChange(TypeProperty.MaxHp, this, this.propertyChangeHandler);
                }
                else {
                    this._vo.offPropertyChange(TypeProperty.Hp, this, this.propertyChangeHandler);
                    this._vo.offPropertyChange(TypeProperty.MaxHp, this, this.propertyChangeHandler);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameNpc.prototype, "title", {
            get: function () {
                return this._title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameNpc.prototype, "configId", {
            get: function () {
                return this._vo.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameNpc.prototype, "openId", {
            get: function () {
                return this._openId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameNpc.prototype, "npcType", {
            get: function () {
                return this._npcType;
            },
            enumerable: true,
            configurable: true
        });
        return GameNpc;
    }(s.SmartObject));
    s.GameNpc = GameNpc;
    __reflect(GameNpc.prototype, "s.GameNpc");
})(s || (s = {}));
