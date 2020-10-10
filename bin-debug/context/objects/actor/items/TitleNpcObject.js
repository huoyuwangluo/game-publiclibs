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
    var TitleNpcObject = (function (_super) {
        __extends(TitleNpcObject, _super);
        function TitleNpcObject() {
            var _this = _super.call(this) || this;
            _this._marktitleVisible = false;
            _this._tasktitleVisible = false;
            return _this;
        }
        TitleNpcObject.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            //this.setBlue();
            /*this._bloodOffset.x = 1;
            this._bloodOffset.y = 1;
            RES.getResAsync("scene_json.player_blood_back", (t) => {
                this._bloodBack.texture = t;
                this._bloodBack.fillMode = egret.BitmapFillMode.SCALE;
                this._bloodBack.scale9Grid = new egret.Rectangle(2, 2, 4, 2);
                this._bloodBack.width = this.BLOOD_WIDTH;
                this._bloodBack.height = this.BLOOD_HEIGHT;
            }, this);
            //this._bloodBack.texture=mg.assetsManager.getRes("scene_json.blood_back");


            RES.getResAsync("scene_json.player_friend_blood", (t) => {
                this._blood.texture = t;
                this._blood.fillMode = egret.BitmapFillMode.SCALE;
                this._blood.scale9Grid = new egret.Rectangle(2, 1, 2, 1);
                this._blood.width = this.BLOOD_WIDTH;
                this._blood.height = this.BLOOD_HEIGHT - 2;
                this._bloodSpace = this._bloodBack.height;
            }, this);*/
            //this._blood.texture=mg.assetsManager.getRes("scene_json.friend_blood");
        };
        TitleNpcObject.prototype.updateDisplayList = function () {
            this.updateNameDisplay();
            this.updateBloodDisplay();
            this.updateMarkTitle();
            this.updateTaskTitle();
            utils.callLater(this, this.updatePosition);
        };
        Object.defineProperty(TitleNpcObject.prototype, "marktitleSkin", {
            set: function (v) {
                if (this._marktitleSkin != v) {
                    this._marktitleSkin = v;
                    this.updateMarkTitle();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleNpcObject.prototype, "tasktitleSkin", {
            set: function (v) {
                if (this._tasktitleSkin != v) {
                    this._tasktitleSkin = v;
                    this.updateTaskTitle();
                }
            },
            enumerable: true,
            configurable: true
        });
        TitleNpcObject.prototype.updateTaskTitle = function () {
            if (!!this._tasktitleSkin && this._scene) {
                if (!this._tasktitle) {
                    this._tasktitle = new s.AnimationSprite();
                }
                this._tasktitle.resId = this._tasktitleSkin;
                if (!this._tasktitle.parent && this._scene) {
                    this._scene.effectFrontLayer.addChild(this._tasktitle);
                }
                this._tasktitle.play();
                this._tasktitleVisible = true;
            }
            else {
                if (this._tasktitle) {
                    this._tasktitle.stop();
                    if (this._tasktitle.parent) {
                        this._tasktitle.parent.removeChild(this._tasktitle);
                    }
                    this._tasktitle.reset();
                }
                this._tasktitleVisible = false;
            }
            utils.callLater(this, this.updateTaskPosition);
        };
        TitleNpcObject.prototype.updateMarkTitle = function () {
            var _this = this;
            if (!!this._marktitleSkin && this._scene) {
                if (!this._marktitle) {
                    this._marktitle = new egret.Bitmap();
                }
                RES.getResAsync("scene_json.titel_" + this._marktitleSkin, function (t) {
                    _this._marktitle.texture = t;
                    _this.updatePosition();
                }, this);
                if (!this._marktitle.parent && this._scene) {
                    this._scene.bloodLayer.addChild(this._marktitle);
                }
                this._marktitleVisible = true;
            }
            else {
                if (this._marktitle && this._marktitle.parent) {
                    this._marktitle.parent.removeChild(this._marktitle);
                }
                this._marktitleVisible = false;
            }
            utils.callLater(this, this.updatePosition);
        };
        TitleNpcObject.prototype.updatePosition = function () {
            this.updateNamePosition();
            this.updateBloodPosition();
            if (this._marktitleVisible) {
                this._marktitle.x = this._position.x + this._offset.x - this._marktitle.width / 2;
                this._marktitle.y = this._nameVisible ? (this._nameLab.y - 40) : (this._position.y + this._offset.y - 40);
            }
        };
        TitleNpcObject.prototype.updateTaskPosition = function () {
            this.updatePosition();
            if (this._tasktitleVisible) {
                this._tasktitle.x = this._position.x + this._offset.x;
                this._tasktitle.y = this._nameVisible ? (this._nameLab.y - 10) : (this._position.y + this._offset.y - 10);
            }
        };
        return TitleNpcObject;
    }(s.TitleObject));
    s.TitleNpcObject = TitleNpcObject;
    __reflect(TitleNpcObject.prototype, "s.TitleNpcObject");
})(s || (s = {}));
