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
    var TitlePetObject = (function (_super) {
        __extends(TitlePetObject, _super);
        function TitlePetObject() {
            var _this = _super.call(this) || this;
            _this._bloodMergeVisible = true;
            return _this;
        }
        TitlePetObject.prototype.createChildren = function () {
            this._bloodMergeBack = new egret.Bitmap();
            this._bloodMerge = new egret.Bitmap();
            this._titleResId = null;
            //this._bloodMergeBack.visible = false;
        };
        TitlePetObject.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            RES.getResAsync("scene_json.player_merge_back", function (t) {
                _this._bloodMergeBack.texture = t;
                _this._bloodMergeBack.fillMode = egret.BitmapFillMode.SCALE;
                _this._bloodMergeBack.scale9Grid = new egret.Rectangle(2, 2, 2, 1);
                _this._bloodMergeBack.width = _this.BLOOD_WIDTH;
                _this._bloodMergeBack.height = 5;
                _this._blood.touchEnabled = false;
            }, this);
            //this._bloodMergeBack.texture=mg.assetsManager.getRes("scene_json.blood_back");
            RES.getResAsync("scene_json.player_merge_blood", function (t) {
                _this._bloodMerge.texture = t;
                _this._bloodMerge.fillMode = egret.BitmapFillMode.SCALE;
                _this._bloodMerge.scale9Grid = new egret.Rectangle(2, 1, 2, 1);
                //this._bloodMerge.width = this.BLOOD_WIDTH;
                _this._bloodMerge.height = 3;
                _this._blood.touchEnabled = false;
            }, this);
            //this._bloodMerge.texture=mg.assetsManager.getRes("scene_json.merge_blood");
        };
        TitlePetObject.prototype.reset = function () {
            _super.prototype.reset.call(this);
            if (this._titleEff) {
                if (this._titleEff.parent) {
                    this._titleEff.parent.removeChild(this._titleEff);
                }
                this._titleEff.stop();
                this._titleEff.reset();
            }
        };
        TitlePetObject.prototype.updateMpValue = function () {
            this._bloodMerge.width = this._mp / this._mpMax * (this.BLOOD_WIDTH - 2);
        };
        Object.defineProperty(TitlePetObject.prototype, "bloodMergeVisible", {
            get: function () {
                return this._bloodMergeVisible;
            },
            set: function (value) {
                if (this._bloodMergeVisible != value) {
                    this._bloodMergeVisible = value;
                    this.updateBloodMergeDisplay();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitlePetObject.prototype, "soldierType", {
            set: function (value) {
                if (this._soldierType != value) {
                    this._soldierType = value;
                    this.updateSoldierType();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitlePetObject.prototype, "marktitleSkin", {
            get: function () {
                return this._titleResId;
            },
            set: function (v) {
                this._titleResId = v;
                this.updateMarkTitle();
            },
            enumerable: true,
            configurable: true
        });
        TitlePetObject.prototype.updateDisplayList = function () {
            _super.prototype.updateDisplayList.call(this);
            this.updateBloodMergeDisplay();
            this.updateSoldierType();
            this.updateMarkTitle();
            utils.callLater(this, this.updatePosition);
        };
        TitlePetObject.prototype.updateBloodMergeDisplay = function () {
            if (!this._scene || !this._bloodMergeVisible) {
                if (this._bloodMergeBack.parent)
                    this._bloodMergeBack.parent.removeChild(this._bloodMergeBack);
                if (this._bloodMerge.parent)
                    this._bloodMerge.parent.removeChild(this._bloodMerge);
                this._bloodMergeBack.scaleX = this._bloodMergeBack.scaleY = this.getScale();
                this._bloodMerge.scaleX = this._bloodMerge.scaleY = this.getScale();
            }
            else {
                if (!this._bloodMergeBack.parent)
                    this._scene.bloodLayer.addChild(this._bloodMergeBack);
                if (!this._bloodMerge.parent)
                    this._scene.bloodLayer.addChild(this._bloodMerge);
            }
            utils.callLater(this, this.updatePosition);
        };
        TitlePetObject.prototype.updateSoldierType = function () {
            if (this._scene && this._bloodMergeVisible) {
                if (!this._soldierIcon) {
                    this._soldierIcon = new egret.Bitmap();
                }
                this._soldierIcon.texture = mg.assetsManager.getRes("common_json.img_pet_job" + this._soldierType + "_png");
                if (!this._soldierIcon.parent) {
                    this._scene.bloodLayer.addChild(this._soldierIcon);
                }
                this._soldierIcon.scaleX = this._soldierIcon.scaleY = this.getScale();
            }
            else {
                if (this._soldierIcon && this._soldierIcon.parent) {
                    this._soldierIcon.parent.removeChild(this._soldierIcon);
                }
            }
            utils.callLater(this, this.updatePosition);
        };
        TitlePetObject.prototype.getTitleScale = function () {
            return TypeGame.isFormationGame() ? 2.0 : 1.2;
        };
        TitlePetObject.prototype.updateMarkTitle = function () {
            //if(app.gameContext.typeGame == TypeGame.CHAPTER_BOSS) return;
            if (this._scene && this._titleResId) {
                if (!this._titleEff) {
                    this._titleEff = new s.AnimationSprite();
                }
                this._titleEff.resId = this._titleResId;
                this._titleEff.play();
                if (!this._titleEff.parent) {
                    this._scene.battleFontContainer.addChild(this._titleEff);
                }
                this._titleEff.scaleX = this._titleEff.scaleY = this.getTitleScale();
            }
            else {
                if (this._titleEff) {
                    if (this._titleEff.parent) {
                        this._titleEff.parent.removeChild(this._titleEff);
                    }
                    this._titleEff.stop();
                    this._titleEff.reset();
                }
            }
            utils.callLater(this, this.updatePosition);
        };
        TitlePetObject.prototype.updatePosition = function () {
            _super.prototype.updatePosition.call(this);
            this.updateBloodMergePosition();
            this.updateSoldierTypePosition();
            this.updateMarkTitlePosition();
        };
        TitlePetObject.prototype.updateBloodMergePosition = function () {
            if (this._bloodMergeVisible) {
                this._bloodMergeBack.x = this._bloodBack.x;
                this._bloodMerge.x = this._blood.x + 1;
                this._bloodMergeBack.y = this._bloodBack.y + 5 * this.getScale();
                this._bloodMerge.y = this._blood.y + 5 * this.getScale();
            }
        };
        TitlePetObject.prototype.updateSoldierTypePosition = function () {
            if (this._bloodMergeVisible && this._soldierIcon) {
                this._soldierIcon.x = this._bloodBack.x - 26 * this.getScale();
                this._soldierIcon.y = this._bloodBack.y - 12 * this.getScale();
            }
        };
        TitlePetObject.prototype.updateMarkTitlePosition = function () {
            if (this._titleEff) {
                this._titleEff.x = this._position.x + this._offset.x;
                this._titleEff.y = this._nameLab.y - 25 * this.getScale();
            }
        };
        return TitlePetObject;
    }(s.TitleObject));
    s.TitlePetObject = TitlePetObject;
    __reflect(TitlePetObject.prototype, "s.TitlePetObject");
})(s || (s = {}));
