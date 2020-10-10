var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var DrumChatObject = (function () {
        function DrumChatObject() {
            this._contextBack = new egret.Bitmap();
            this._position = new egret.Point();
            this._offset = new egret.Point();
            this._contextLab = new eui.Label();
            this._contextLab.textColor = 0xF5E8BE;
            this._contextLab.size = 18;
            this._contextLab.width = 230;
            // this._contextLab.height = 36;
            this._contextLab.lineSpacing = 3;
            this._contextLab.verticalAlign = "middle";
            this.createChildren();
            this.initialize();
        }
        DrumChatObject.prototype.createChildren = function () {
        };
        DrumChatObject.prototype.initialize = function () {
            var _this = this;
            RES.getResAsync("scene_json.scene_qipao", function (t) {
                _this._contextBack.texture = t;
                // this._contextBack.fillMode = egret.BitmapFillMode.SCALE;
                _this._contextBack.scale9Grid = new egret.Rectangle(81, 6, 80, 17);
                _this._contextBack.width = 250;
                // this._contextBack.height = 80;
            }, this);
        };
        DrumChatObject.prototype.addTo = function (scene) {
            this._scene = scene;
            this.updateDrumChatDisplay();
        };
        DrumChatObject.prototype.remove = function () {
            this._scene = null;
            this.updateDrumChatDisplay();
        };
        DrumChatObject.prototype.reset = function () {
            this._contextBack = null;
            this._position = null;
            this._offset = null;
            this._contextLab = null;
        };
        Object.defineProperty(DrumChatObject.prototype, "updataConText", {
            set: function (v) {
                if (this._conText != v) {
                    this._conText = v;
                    this.updateDrumChatDisplay();
                }
            },
            enumerable: true,
            configurable: true
        });
        DrumChatObject.prototype.updateDrumChatDisplay = function () {
            if (!this._conText || !this._scene) {
                if (this._contextBack.parent) {
                    this._contextBack.parent.removeChild(this._contextBack);
                }
                if (this._contextLab.parent) {
                    this._contextLab.parent.removeChild(this._contextLab);
                }
                return;
            }
            if (app.gameContext.typeGame == TypeGame.CHAPTER_BOSS || app.gameContext.typeGame == TypeGame.DOOR_BOSS) {
                this._contextLab.text = this._conText;
                if (!this._contextBack.parent) {
                    this._contextBack.height = this._contextLab.height + 40;
                    this._scene.bloodLayer.addChild(this._contextBack);
                }
                if (!this._contextLab.parent) {
                    this._scene.labelLayer.addChild(this._contextLab);
                }
                this.updateDrumChatPosition();
            }
            else {
                if (this._contextBack.parent) {
                    this._contextBack.parent.removeChild(this._contextBack);
                }
                if (this._contextLab.parent) {
                    this._contextLab.parent.removeChild(this._contextLab);
                }
            }
        };
        DrumChatObject.prototype.pos = function (x, y) {
            this._position.x = x >> 0;
            this._position.y = y >> 0;
            this.updateDrumChatPosition();
        };
        Object.defineProperty(DrumChatObject.prototype, "titleHeight", {
            get: function () {
                return -this._offset.y;
            },
            set: function (value) {
                this._offset.y = -value;
                this.updateDrumChatPosition();
            },
            enumerable: true,
            configurable: true
        });
        DrumChatObject.prototype.updateDrumChatPosition = function () {
            if (this._contextBack.parent && this._contextBack) {
                this._contextBack.x = this._position.x + this._offset.x - this._contextBack.width / 2 + 120;
                this._contextBack.y = this._position.y + this._offset.y - this._contextBack.width / 2 + 20;
            }
            if (this._contextLab.parent && this._contextLab) {
                this._contextLab.x = this._position.x + this._offset.x - this._contextLab.width / 2 + 127;
                this._contextLab.y = this._position.y + this._offset.y - this._contextLab.width / 2 + 20;
            }
        };
        return DrumChatObject;
    }());
    s.DrumChatObject = DrumChatObject;
    __reflect(DrumChatObject.prototype, "s.DrumChatObject");
})(s || (s = {}));
