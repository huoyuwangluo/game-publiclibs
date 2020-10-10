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
    var TitlePlayerObject = (function (_super) {
        __extends(TitlePlayerObject, _super);
        function TitlePlayerObject() {
            var _this = _super.call(this) || this;
            _this._bloodMergeMax = 100;
            _this._bloodMergeValue = 0;
            _this._peerageVisible = false;
            _this._marktitleVisible = false;
            return _this;
        }
        TitlePlayerObject.prototype.createChildren = function () {
            this._bloodMergeBack = new egret.Bitmap();
            this._bloodMerge = new egret.Bitmap();
            this._titleResId = null;
            //this._bloodMergeOffset = new egret.Point();
            // this._titleEff = new s.AnimationSprite();
        };
        TitlePlayerObject.prototype.initialize = function () {
            var _this = this;
            /*this._bloodOffset.x = 1;
            this._bloodOffset.y = 1;
            //this._bloodMergeOffset.x = 1;
            //this._bloodMergeOffset.y = 1;

            RES.getResAsync("scene_json.player_blood_back", (t) => {
                this._bloodBack.texture = t;
                this._bloodBack.fillMode = egret.BitmapFillMode.SCALE;
                this._bloodBack.scale9Grid = new egret.Rectangle(2, 2, 4, 2);
                this._bloodBack.width = this.BLOOD_WIDTH;
                this._bloodBack.height = this.BLOOD_HEIGHT;
            }, this);
            //this._bloodBack.texture=mg.assetsManager.getRes("scene_json.player_blood_back");


            RES.getResAsync("scene_json.player_enemy_blood", (t) => {
                this._blood.texture = t;
                this._blood.fillMode = egret.BitmapFillMode.SCALE;
                this._blood.scale9Grid = new egret.Rectangle(2, 1, 2, 1);
                this._blood.width = this.BLOOD_WIDTH;
                this._blood.height = this.BLOOD_HEIGHT - 2;
                this._bloodSpace = this._bloodBack.height;
            }, this);
            //this._blood.texture=mg.assetsManager.getRes("scene_json.player_enemy_blood");
            */
            _super.prototype.initialize.call(this);
            RES.getResAsync("scene_json.player_blood_back", function (t) {
                _this._bloodMergeBack.texture = t;
                _this._bloodMergeBack.fillMode = egret.BitmapFillMode.SCALE;
                _this._bloodMergeBack.scale9Grid = new egret.Rectangle(2, 2, 4, 2);
                _this._bloodMergeBack.width = _this.BLOOD_WIDTH;
                _this._bloodMergeBack.height = _this.BLOOD_HEIGHT;
            }, this);
            //this._bloodMergeBack.texture=mg.assetsManager.getRes("scene_json.blood_back");
            RES.getResAsync("scene_json.player_merge_blood", function (t) {
                _this._bloodMerge.texture = t;
                _this._bloodMerge.fillMode = egret.BitmapFillMode.SCALE;
                _this._bloodMerge.scale9Grid = new egret.Rectangle(2, 1, 2, 1);
                //this._bloodMerge.width = this.BLOOD_WIDTH;
                _this._bloodMerge.height = _this.BLOOD_HEIGHT - 2;
            }, this);
            //this._bloodMerge.texture=mg.assetsManager.getRes("scene_json.merge_blood");
            this._nameLab.textColor = TypeColor.ORANGE;
        };
        Object.defineProperty(TitlePlayerObject.prototype, "hpMaxMerge", {
            get: function () {
                return this._bloodMergeMax;
            },
            /////////////////////////////GETTER SETTER//////////////////////////
            /*public set greened(v: boolean) {
                this._nameLab.textColor = TypeColor.GREEN;
                //this._blood.texture=mg.assetsManager.getRes("scene_json.player_blood");
                RES.getResAsync("scene_json.player_blood", (t) => {
                    this._blood.texture = t;
                }, this);
            }
    
            public set blued(v: boolean) {
                this._nameLab.textColor = TypeColor.BULE;
                //this._blood.texture=mg.assetsManager.getRes("scene_json.player_friend_blood");
                RES.getResAsync("scene_json.player_friend_blood", (t) => {
                    this._blood.texture = t;
                }, this);
            }*/
            set: function (value) {
                this._bloodMergeMax = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitlePlayerObject.prototype, "hpMerge", {
            get: function () {
                return this._bloodMergeValue;
            },
            set: function (value) {
                this._bloodMergeValue = value;
                this._bloodMerge.width = this._bloodMergeValue / this._bloodMergeMax * this.BLOOD_WIDTH;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitlePlayerObject.prototype, "bloodMergeVisible", {
            get: function () {
                return this._bloodMergeVisible;
            },
            set: function (value) {
                if (this._bloodMergeVisible != value) {
                    this._bloodMergeVisible = value;
                    this.updateDisplayList();
                }
            },
            enumerable: true,
            configurable: true
        });
        TitlePlayerObject.prototype.setWuguanLevel = function (step, legionId) {
            this._legionId = legionId;
            if (this._peerageLevel != step) {
                this._peerageLevel = step;
                this.updatePeerageLevel();
            }
        };
        Object.defineProperty(TitlePlayerObject.prototype, "marktitleSkin", {
            set: function (v) {
                // if (this._marktitleSkin != v) {
                //     this._marktitleSkin = v;
                //     this.updateMarkTitle();
                // }
                this._titleResId = v;
                this.updateMarkTitle();
            },
            enumerable: true,
            configurable: true
        });
        /////////////////////////////UPDATE DISPLAYLIST//////////////////////////
        TitlePlayerObject.prototype.updateDisplayList = function () {
            this.updateNameDisplay();
            this.updateBloodDisplay();
            this.updateBloodYellowDisplay();
            this.updatePeerageLevel();
            this.updateMarkTitle();
            utils.callLater(this, this.updatePosition);
        };
        /////////////////////////////UPDATER//////////////////////////
        TitlePlayerObject.prototype.updatePeerageLevel = function () {
            var _this = this;
            if (this._legionId && this._peerageLevel && this._scene) {
                if (!this._peerageIcon) {
                    this._peerageIcon = new egret.Bitmap();
                }
                //this._peerageIcon.texture=mg.assetsManager.getRes("scene_json.peerage_"+this._peerageLevel);
                RES.getResAsync("scene_json." + this._legionId + "_peerage_" + this._peerageLevel, function (t) {
                    _this._peerageIcon.texture = t;
                }, this);
                if (!this._peerageIcon.parent && this._scene) {
                    this._scene.bloodLayer.addChild(this._peerageIcon);
                }
                this._peerageVisible = true;
            }
            else {
                if (this._peerageIcon && this._peerageIcon.parent) {
                    this._peerageIcon.parent.removeChild(this._peerageIcon);
                }
                this._peerageVisible = false;
            }
            utils.callLater(this, this.updatePosition);
        };
        TitlePlayerObject.prototype.updateMarkTitle = function () {
            if (app.gameContext.typeGame == TypeGame.CHAPTER_BOSS)
                return;
            if (this._scene && this._titleResId) {
                if (!this._titleEff) {
                    this._titleEff = new s.AnimationSprite();
                    this._titleEff.resId = this._titleResId;
                    this._titleEff.play();
                }
                else {
                    this._titleEff.resId = this._titleResId;
                    this._titleEff.play();
                }
                this._scene.bloodLayer.addChild(this._titleEff);
            }
            else {
                if (this._titleEff) {
                    if (this._titleEff.parent) {
                        this._titleEff.parent.removeChild(this._titleEff);
                    }
                    this._titleEff.reset();
                }
            }
            // if (this._marktitleSkin && this._scene) {
            //     if (!this._marktitle) {
            //         this._marktitle = new eui.Image();
            //     }
            //     this._marktitle.source = ResPath.getShowTitlePath(this._marktitleSkin);
            //     this._marktitle.anchorOffsetX = 100;
            //     this._marktitle.anchorOffsetY = 40;
            //     var infos = RES.getRes('title_config_json');
            //     if (infos) {
            //         for (var info of infos) {
            //             if (info.id == this._marktitleSkin) {
            //                 this._marktitle.anchorOffsetX = info.anchorX;
            //                 this._marktitle.anchorOffsetY = info.anchorY;
            //                 break;
            //             }
            //         }
            //     }
            //     if (!this._marktitle.parent && this._scene) {
            //         this._scene.bloodLayer.addChild(this._marktitle);
            //     }
            //     this._marktitleVisible = true;
            // } else {
            //     if (this._marktitle) {
            //         if (this._marktitle.parent) {
            //             this._marktitle.parent.removeChild(this._marktitle);
            //         }
            //         this._marktitle.source = null;
            //     }
            //     this._marktitleVisible = false;
            // }
            utils.callLater(this, this.updatePosition);
        };
        TitlePlayerObject.prototype.updateBloodYellowDisplay = function () {
            if (!this._scene || !this._bloodMergeVisible) {
                if (this._bloodMergeBack.parent)
                    this._bloodMergeBack.parent.removeChild(this._bloodMergeBack);
                if (this._bloodMerge.parent)
                    this._bloodMerge.parent.removeChild(this._bloodMerge);
            }
            else {
                if (!this._bloodMergeBack.parent)
                    this._scene.bloodLayer.addChild(this._bloodMergeBack);
                if (!this._bloodMerge.parent)
                    this._scene.bloodLayer.addChild(this._bloodMerge);
            }
        };
        TitlePlayerObject.prototype.updatePosition = function () {
            this.updateNamePosition();
            this.updateBloodPosition();
            this.updatePeeragePosition();
            this.updateMarkTitlePosition();
        };
        TitlePlayerObject.prototype.updateNamePosition = function () {
            if (this._nameVisible) {
                this._nameLab.x = this._position.x + this._offset.x - this._nameWidthHalf;
                this._nameLab.y = this._position.y + this._offset.y - 25;
            }
        };
        TitlePlayerObject.prototype.updateBloodPosition = function () {
            _super.prototype.updateBloodPosition.call(this);
            if (this._bloodMergeVisible) {
                this._bloodMergeBack.x = this._bloodBack.x; //this._position.x + this._offset.x - this.BLOOD_WIDTH_HALF;
                this._bloodMerge.x = this._blood.x; //this._position.x + this._offset.x - this.BLOOD_WIDTH_HALF;
                this._bloodMergeBack.y = this._bloodBack.y; //this._position.y + this._offset.y - this._bloodSpace;
                this._bloodMerge.y = this._blood.y; //this._position.y + this._offset.y - this._bloodSpace;
            }
        };
        TitlePlayerObject.prototype.updatePeeragePosition = function () {
            if (this._peerageVisible) {
                this._peerageIcon.x = this._position.x + this._offset.x + this.BLOOD_WIDTH_HALF / 2 + 25;
                this._peerageIcon.y = this._position.y + this._offset.y - this._peerageIcon.height / 2 - 12;
            }
        };
        TitlePlayerObject.prototype.updateMarkTitlePosition = function () {
            // if (this._marktitleVisible) {
            //     this._marktitle.x = this._position.x + this._offset.x;
            //     this._marktitle.y = this._nameVisible ? (this._nameLab.y - 30) : (this._position.y + this._offset.y - 10);
            // }
            if (this._titleEff) {
                this._titleEff.x = this._position.x + this._offset.x;
                //this._titleEff.y = this._nameVisible ? (this._nameLab.y - 30) : (this._position.y + this._offset.y - 10);
                this._titleEff.y = this._nameVisible ? (this._nameLab.y - 30) : (this._position.y + this._offset.y - 35);
            }
        };
        return TitlePlayerObject;
    }(s.TitleObject));
    s.TitlePlayerObject = TitlePlayerObject;
    __reflect(TitlePlayerObject.prototype, "s.TitlePlayerObject");
})(s || (s = {}));
