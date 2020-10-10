var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var TitleObject = (function () {
        function TitleObject() {
            this.BLOOD_WIDTH = 80;
            this.BLOOD_WIDTH_HALF = 40;
            this.BLOOD_HEIGHT = 6;
            this._titleScale = 1.0;
            this._mpMax = 100;
            this._mp = 0;
            this._bloodMax = 100;
            this._bloodValue = 0;
            this._bloodVisible = false;
            this._nameVisible = false;
            this._levelVisible = false;
            this._position = new egret.Point();
            this._offset = new egret.Point();
            this._bloodBack = new egret.Bitmap();
            this._blood = new egret.Bitmap();
            this._nameLab = new egret.TextField();
            this._nameLab.fontFamily = game.GameConfig.DEFAULT_FONT_NAME;
            this._nameLab.textColor = TypeColor.WHITE;
            this._nameLab.textAlign = egret.HorizontalAlign.CENTER;
            this._nameLab.size = 18;
            this._nameLab.stroke = 2;
            //this._nameLab.bold = true;
            this._nameLab.strokeColor = 0x0;
            this._nameLab.touchEnabled = false;
            this._nameLab.multiline = false;
            this._levelLab = new egret.TextField();
            this._levelLab.fontFamily = game.GameConfig.DEFAULT_FONT_NAME;
            this._levelLab.textColor = TypeColor.WHITE;
            this._levelLab.textAlign = egret.HorizontalAlign.RIGHT;
            this._levelLab.size = 18;
            this._levelLab.stroke = 2;
            //this._nameLab.bold = true;
            this._levelLab.strokeColor = 0x0;
            this._levelLab.touchEnabled = false;
            this._levelLab.multiline = false;
            this.createChildren();
            this.initialize();
        }
        TitleObject.prototype.createChildren = function () {
        };
        TitleObject.prototype.initialize = function () {
            var _this = this;
            RES.getResAsync("scene_json.player_blood_back", function (t) {
                _this._bloodBack.texture = t;
                _this._bloodBack.fillMode = egret.BitmapFillMode.SCALE;
                _this._bloodBack.scale9Grid = new egret.Rectangle(2, 2, 4, 2);
                _this._bloodBack.width = _this.BLOOD_WIDTH;
                _this._bloodBack.height = _this.BLOOD_HEIGHT;
                _this._bloodBack.touchEnabled = false;
            }, this);
            RES.getResAsync("scene_json.player_enemy_blood", function (t) {
                _this._blood.texture = t;
                _this._blood.fillMode = egret.BitmapFillMode.SCALE;
                _this._blood.scale9Grid = new egret.Rectangle(2, 1, 2, 1);
                //this._blood.width = this.BLOOD_WIDTH;
                _this._blood.height = _this.BLOOD_HEIGHT - 2;
                _this._blood.touchEnabled = false;
            }, this);
        };
        TitleObject.prototype.getScale = function () {
            return TypeGame.isFormationGame() ? 2.5 : 1.5;
        };
        TitleObject.prototype.setGreen = function () {
            var _this = this;
            RES.getResAsync("scene_json.player_blood", function (t) {
                _this._blood.texture = t;
            }, this);
        };
        TitleObject.prototype.setBlue = function () {
            var _this = this;
            RES.getResAsync("scene_json.player_friend_blood", function (t) {
                _this._blood.texture = t;
            }, this);
        };
        TitleObject.prototype.setRed = function () {
            var _this = this;
            RES.getResAsync("scene_json.player_enemy_blood", function (t) {
                _this._blood.texture = t;
            }, this);
        };
        TitleObject.prototype.addTo = function (scene) {
            this._scene = scene;
            this.updateDisplayList();
        };
        TitleObject.prototype.remove = function () {
            this._scene = null;
            this.updateDisplayList();
        };
        TitleObject.prototype.reset = function () {
            this._bloodMax = 100;
            this._bloodValue = 0;
            this._mpMax = 100;
            this._mp = 0;
            this._bloodVisible = false;
            this._nameVisible = false;
            this._levelVisible = false;
        };
        Object.defineProperty(TitleObject.prototype, "nameVisible", {
            get: function () {
                return this._nameVisible;
            },
            set: function (value) {
                if (this._nameVisible != value) {
                    this._nameVisible = value;
                    this.updateDisplayList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "levelVisible", {
            get: function () {
                return this._levelVisible;
            },
            set: function (value) {
                if (this._levelVisible != value) {
                    this._levelVisible = value;
                    this.updateDisplayList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "bloodVisible", {
            get: function () {
                return this._bloodVisible;
            },
            set: function (value) {
                if (this._bloodVisible != value) {
                    this._bloodVisible = value;
                    this.updateDisplayList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "color", {
            set: function (value) {
                this._nameLab.textColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "titleHeight", {
            get: function () {
                return -this._offset.y;
            },
            set: function (value) {
                this._offset.y = -value;
                utils.callLater(this, this.updatePosition);
                //this.updatePosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "titleScale", {
            get: function () {
                return this._titleScale;
            },
            set: function (value) {
                this._titleScale = value;
                utils.callLater(this, this.updatePosition);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "name", {
            get: function () {
                return this._nameLab.text;
            },
            set: function (value) {
                if (TitleObject.SHOW_DEBUG_BUFF)
                    return;
                //this._nameLab.cacheAsBitmap=false;
                this._nameLab.width = 200;
                this._nameLab.height = 25;
                this._nameLab.text = value;
                //this._nameLab.width = this._nameLab.textWidth;
                //this._nameLab.height = this._nameLab.textHeight;
                this._nameWidthHalf = this._nameLab.width / 2;
                //this._nameLab.cacheAsBitmap=true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "level", {
            set: function (value) {
                this._levelLab.width = 50;
                this._levelLab.height = 25;
                this._levelLab.text = "" + value;
                this._levelWidth = this._levelLab.width + 25;
            },
            enumerable: true,
            configurable: true
        });
        TitleObject.prototype.showDebugBuffText = function (value) {
            if (!TitleObject.SHOW_DEBUG_BUFF)
                return;
            this._nameLab.width = 200;
            this._nameLab.height = 25;
            this._nameLab.text = value;
            this._nameLab.width = this._nameLab.textWidth;
            this._nameLab.height = this._nameLab.textHeight;
            this._nameWidthHalf = this._nameLab.width / 2;
        };
        Object.defineProperty(TitleObject.prototype, "hpMax", {
            get: function () {
                return this._bloodMax;
            },
            set: function (value) {
                this._bloodMax = value;
                this.updateBloodValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "hp", {
            get: function () {
                return this._bloodValue;
            },
            set: function (value) {
                this._bloodValue = value;
                this.updateBloodValue();
            },
            enumerable: true,
            configurable: true
        });
        TitleObject.prototype.updateBloodValue = function () {
            this._blood.width = this._bloodValue / this._bloodMax * this.BLOOD_WIDTH;
        };
        Object.defineProperty(TitleObject.prototype, "mpMax", {
            set: function (value) {
                this._mpMax = value;
                this.updateMpValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "mp", {
            set: function (value) {
                this._mp = value;
                this.updateMpValue();
            },
            enumerable: true,
            configurable: true
        });
        TitleObject.prototype.updateMpValue = function () {
            //this._nameLab.text = "[" + this._mp + "/" + this._mpMax + "]";
        };
        Object.defineProperty(TitleObject.prototype, "offsetX", {
            set: function (value) {
                this._offset.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "x", {
            set: function (value) {
                this._position.x = value >> 0;
                utils.callLater(this, this.updatePosition);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleObject.prototype, "y", {
            set: function (value) {
                this._position.y = value >> 0;
                utils.callLater(this, this.updatePosition);
            },
            enumerable: true,
            configurable: true
        });
        TitleObject.prototype.pos = function (x, y) {
            this._position.x = x >> 0;
            this._position.y = y >> 0;
            this.updatePosition();
        };
        TitleObject.prototype.updateDisplayList = function () {
            this.updateNameDisplay();
            this.updateLevelDisplay();
            this.updateBloodDisplay();
            //utils.callLater(this, this.updatePosition);
            this.updatePosition();
        };
        TitleObject.prototype.updateNameDisplay = function () {
            if (!this._scene || !this._nameVisible) {
                if (this._nameLab.parent)
                    this._nameLab.parent.removeChild(this._nameLab);
                this._nameLab.scaleX = this._nameLab.scaleY = this.getScale();
            }
            else {
                if (!this._nameLab.parent)
                    this._scene.labelLayer.addChild(this._nameLab);
            }
        };
        TitleObject.prototype.updateLevelDisplay = function () {
            if (!this._scene || !this._levelVisible) {
                if (this._levelLab.parent)
                    this._levelLab.parent.removeChild(this._levelLab);
                this._levelLab.scaleX = this._levelLab.scaleY = this.getScale();
            }
            else {
                if (!this._levelLab.parent)
                    this._scene.labelLayer.addChild(this._levelLab);
            }
        };
        TitleObject.prototype.updateBloodDisplay = function () {
            if (!this._scene || !this._bloodVisible) {
                if (this._bloodBack.parent)
                    this._bloodBack.parent.removeChild(this._bloodBack);
                if (this._blood.parent)
                    this._blood.parent.removeChild(this._blood);
                this._bloodBack.scaleX = this._bloodBack.scaleY = this.getScale();
                this._blood.scaleX = this._blood.scaleY = this.getScale();
            }
            else {
                if (!this._bloodBack.parent)
                    this._scene.bloodLayer.addChild(this._bloodBack);
                if (!this._blood.parent)
                    this._scene.bloodLayer.addChild(this._blood);
            }
        };
        TitleObject.prototype.updatePosition = function () {
            this.updateNamePosition();
            this.updateBloodPosition();
            this.updateLevelPosition();
        };
        TitleObject.prototype.updateNamePosition = function () {
            if (this._nameVisible) {
                this._nameLab.x = this._position.x + this._offset.x - this._nameWidthHalf * this.getScale();
                this._nameLab.y = this._position.y + this._offset.y * this._titleScale - 35 * this.getScale();
            }
        };
        TitleObject.prototype.updateBloodPosition = function () {
            if (this._bloodVisible) {
                this._blood.x = this._position.x + this._offset.x - this.BLOOD_WIDTH_HALF * this.getScale();
                this._bloodBack.x = this._blood.x;
                this._blood.y = this._position.y + this._offset.y * this._titleScale - 10 * this.getScale();
                this._bloodBack.y = this._blood.y - 1 * this.getScale();
            }
        };
        TitleObject.prototype.updateLevelPosition = function () {
            if (this._levelVisible) {
                this._levelLab.x = this._blood.x - this._levelWidth * this.getScale();
                this._levelLab.y = this._blood.y - 6 * this.getScale();
            }
        };
        TitleObject.SHOW_DEBUG_BUFF = false;
        return TitleObject;
    }());
    s.TitleObject = TitleObject;
    __reflect(TitleObject.prototype, "s.TitleObject");
})(s || (s = {}));
