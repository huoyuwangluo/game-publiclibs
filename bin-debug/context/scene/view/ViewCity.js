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
    var ViewCity = (function (_super) {
        __extends(ViewCity, _super);
        function ViewCity() {
            var _this = _super.call(this) || this;
            _this.skinName = "MainChapterCityMapSkin";
            return _this;
            // this.touchEnabled = true;
        }
        ViewCity.prototype.initialize = function () {
            this._map = new main.ChapterBossMainMap();
            this._black = new eui.Image();
            this._black.source = 'main_pop_backBg_jpg';
            this._black.scale9Grid = new egret.Rectangle(12, 3, 12, 20);
            this.imgYunDown.mask = this.imgMaskYun0;
            this.imgYunUp.mask = this.imgMaskYun1;
            this._group = new eui.Group();
            this._group.touchEnabled = false;
            this._group.touchChildren = false;
            this._contextBack = new eui.Image();
            this._contextBack.source = "scene_json.scene_qipao";
            this._contextBack.scale9Grid = new egret.Rectangle(81, 6, 80, 17);
            this._contextBack.width = 140;
            this._group.addChild(this._contextBack);
            this._contextLab = new eui.Label();
            this._contextLab.textColor = 0xF5E8BE;
            this._contextLab.size = 15;
            this._contextLab.lineSpacing = 3;
            this._contextLab.width = 130;
            // this._contextLab.verticalAlign = "middle";
            this._group.addChild(this._contextLab);
        };
        Object.defineProperty(ViewCity.prototype, "camera", {
            get: function () { return null; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ViewCity.prototype, "scene", {
            get: function () { return null; },
            enumerable: true,
            configurable: true
        });
        ;
        ViewCity.prototype.reset = function () { };
        ViewCity.prototype.start = function () {
            mg.stageManager.onResize(this, this.resize, true);
        };
        ViewCity.prototype.stop = function () {
            this.removeCityViewFormScene();
            mg.stageManager.offResize(this, this.resize);
        };
        ViewCity.prototype.resize = function (w, h) {
            this.width = w;
            this.height = h - 250 - 35;
            this._black.width = w;
            this._black.height = h;
            this.scroller.height = h - 250 - 35;
            this.y = h - this.scroller.height - 250;
            this.imgMaskYun0.height = this.scroller.height;
            this.imgMaskYun1.height = this.scroller.height;
            this.imgYunUp.y = 0;
            this.imgYunDown.y = this.scroller.height - this.imgYunDown.height;
            this.imgMaskGuoDu0.height = this.scroller.height;
            this.imgMaskGuoDu1.height = this.scroller.height;
        };
        ViewCity.prototype.addCityViewToScene = function () {
            this.addChild(this._black);
            this.addChild(this.scroller);
            if (this._map) {
                this.mapGroup.addChild(this._map);
                this._map.enter();
                this.scroller.bounces = false;
                if (this.scroller.verticalScrollBar) {
                    this.scroller.verticalScrollBar.autoVisibility = false;
                    this.scroller.verticalScrollBar.visible = false;
                }
                this.mapGroup.validateNow();
                this.scroller.validateNow();
                if (this._map.currCity) {
                    egret.Tween.removeTweens(this.scroller.viewport);
                    this.scroller.viewport.scrollV = 0;
                    this.moveToCurrCity(this._map.currCity);
                }
            }
            this.addPeopleFightEffect();
            this.updataCardEffect();
            this.addChild(this.imgMaskYun0);
            this.addChild(this.imgMaskYun1);
            this.addChild(this.imgYunDown);
            this.addChild(this.imgYunUp);
            this.yunTween(false);
            this.yunTween(true);
            GameModels.chapter.addEventListener(mo.ModelSceneChapter.SHOWCHAPTER_GUODUEFF, this.showChapterGuoDuEff, this);
        };
        ViewCity.prototype.removeCityViewFormScene = function () {
            if (this._map) {
                this._map.exit();
            }
            egret.Tween.removeTweens(this.imgYunDown);
            egret.Tween.removeTweens(this.imgYunUp);
            if (this._black.parent)
                this._black.parent.removeChild(this._black);
            if (this.scroller.parent)
                this.scroller.parent.removeChild(this.scroller);
            if (this.imgYunUp.parent)
                this.imgYunUp.parent.removeChild(this.imgYunUp);
            if (this.imgYunDown.parent)
                this.imgYunDown.parent.removeChild(this.imgYunDown);
            if (this.imgMaskYun0.parent)
                this.imgMaskYun0.parent.removeChild(this.imgMaskYun0);
            if (this.imgMaskYun1.parent)
                this.imgMaskYun1.parent.removeChild(this.imgMaskYun1);
            this.removePeopleFightEffect();
            this.removeChatGroup();
            this.removeChapterGuoDuEff();
            utils.timer.clear(this, this.updataCardEffect);
            GameModels.chapter.removeEventListener(mo.ModelSceneChapter.SHOWCHAPTER_GUODUEFF, this.showChapterGuoDuEff, this);
        };
        ViewCity.prototype.showChapterGuoDuEff = function () {
            var _this = this;
            this.removeChapterGuoDuEff();
            this.addChild(this.imgMaskGuoDu0);
            this.addChild(this.imgMaskGuoDu1);
            this._imgLeft = new eui.Image("img_mianMap_Yun1_png");
            this._imgRight = new eui.Image("img_mianMap_Yun1_png");
            this._imgLeft.mask = this.imgMaskGuoDu0;
            this._imgRight.mask = this.imgMaskGuoDu1;
            this._imgRight.rotation = 180;
            this._imgLeft.width = this._imgRight.width = 576;
            this._imgLeft.height = this._imgRight.height = 1100;
            this._imgLeft.anchorOffsetX = this._imgLeft.anchorOffsetY = 0;
            this._imgRight.anchorOffsetX = 576;
            this._imgRight.anchorOffsetY = 1100;
            var startX = this.width / 2 - 300 - this._imgLeft.width;
            this._imgLeft.x = startX;
            this._imgLeft.y = this.scroller.height - this._imgLeft.height + 50;
            this.addChild(this._imgLeft);
            var startX1 = this.width / 2 + 300;
            this._imgRight.x = startX1;
            this._imgRight.y = this.scroller.height - this._imgRight.height + 50;
            this.addChild(this._imgRight);
            egret.Tween.get(this._imgLeft).to({ x: startX + this._imgLeft.width - 80 }, 500, egret.Ease.quintIn);
            egret.Tween.get(this._imgRight).to({ x: startX1 - 400 }, 500, egret.Ease.quintIn).call(function () {
                _this._tartMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                _this._tartMovie.resId = "zhangjieguodu2";
                _this._tartMovie.replaceSlotBitmap("wz_frame", "chapterGuoDu_json.wz_" + GameModels.chapter.mainMapTemplate.id);
                _this._tartMovie.replaceSlotBitmap("wzgk_frame", "chapterGuoDu_json.wzgk_" + GameModels.chapter.mainCityTemplate.order);
                _this._tartMovie.replaceSlotBitmap("zj_frame", "chapterGuoDu_json.zj_" + GameModels.chapter.mainMapTemplate.id);
                _this._tartMovie.updateReplaceSlot();
                _this._tartMovie.timeScale = 0.8;
                _this._tartMovie.x = _this.width / 2 + 200;
                _this._tartMovie.y = _this.scroller.height - _this._tartMovie.height - 400;
                _this.addChild(_this._tartMovie);
                _this._tartMovie.playOnce("newAnimation");
                _this._tartMovie.onCompleteOnce(_this, function () {
                    if (this._tartMovie) {
                        this._tartMovie.stop();
                        this._tartMovie.offCompleteOnce();
                    }
                    if (this._tartMovie && this._tartMovie.parent) {
                        this._tartMovie.parent.removeChild(this._tartMovie);
                        this._tartMovie = null;
                    }
                    this.dragonBoneMovieClipCallFun();
                });
            });
        };
        ViewCity.prototype.dragonBoneMovieClipCallFun = function () {
            var _this = this;
            var endX = this.width / 2 - 300 - this._imgLeft.width;
            var endX1 = this.width / 2 + 300;
            egret.Tween.get(this._imgLeft).to({ x: endX }, 200);
            egret.Tween.get(this._imgRight).to({ x: endX1 }, 200).call(function () {
                _this.removeChapterGuoDuEff();
                _this.addCityViewToScene();
                GameModels.chapter.changeChapterStep();
            });
        };
        ViewCity.prototype.removeChapterGuoDuEff = function () {
            if (this._imgRight)
                egret.Tween.removeTweens(this._imgRight);
            if (this._imgRight && this._imgRight.parent) {
                this._imgRight.parent.removeChild(this._imgRight);
                this._imgRight = null;
            }
            if (this._imgLeft)
                egret.Tween.removeTweens(this._imgLeft);
            if (this._imgLeft && this._imgLeft.parent) {
                this._imgLeft.parent.removeChild(this._imgLeft);
                this._imgLeft = null;
            }
            if (this._tartMovie) {
                this._tartMovie.stop();
                this._tartMovie.offCompleteOnce();
            }
            if (this._tartMovie && this._tartMovie.parent) {
                this._tartMovie.parent.removeChild(this._tartMovie);
                this._tartMovie = null;
            }
            if (this.imgMaskGuoDu0.parent)
                this.imgMaskGuoDu0.parent.removeChild(this.imgMaskGuoDu0);
            if (this.imgMaskGuoDu1.parent)
                this.imgMaskGuoDu1.parent.removeChild(this.imgMaskGuoDu1);
        };
        ViewCity.prototype.yunTween = function (isUp) {
            if (isUp === void 0) { isUp = false; }
            if (!isUp) {
                egret.Tween.removeTweens(this.imgYunUp);
                this.imgYunUp.x = this.width / 2 - 300 - this.imgYunUp.width;
                egret.Tween.get(this.imgYunUp).to({ x: 600 + this.imgYunUp.width }, 20000).call(this.yunTween, this, [false]);
            }
            else {
                egret.Tween.removeTweens(this.imgYunDown);
                this.imgYunDown.x = this.width / 2 - 300 - this.imgYunDown.width;
                egret.Tween.get(this.imgYunDown).to({ x: 600 + this.imgYunDown.width }, 25000).call(this.yunTween, this, [true]);
            }
        };
        ViewCity.prototype.addPeopleFightEffect = function () {
            this.removePeopleFightEffect();
            if (!this._effect) {
                if (this.currCity) {
                    this._effect = utils.ObjectPool.from(s.AnimationSprite);
                    this._effect.resId = "36001";
                    this._effect.x = this.currCity.x + 90;
                    this._effect.y = this.currCity.y - 60;
                    this._effect.play();
                    this._map.addChildAt(this._effect, this._map.getChildIndex(this._map.imgBg) + 1);
                }
            }
        };
        ViewCity.prototype.removePeopleFightEffect = function () {
            if (this._effect) {
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
                this._effect.stop();
                utils.ObjectPool.to(this._effect, true);
                this._effect = null;
            }
        };
        ViewCity.prototype.updataCardEffect = function () {
            utils.timer.clear(this, this.updataCardEffect);
            this.addCardEffect();
            utils.timer.once(30000, this, this.updataCardEffect);
        };
        ViewCity.prototype.addCardEffect = function () {
            this.removeChatGroup();
            var point = this.getCityPos();
            if (!point)
                return;
            var point1 = this.getCityPos();
            var index = 0;
            while (index < 10) {
                if (point1.x == point.x && point1.y == point.y) {
                    point1 = this.getCityPos();
                    index++;
                }
                else {
                    break;
                }
            }
            var dire = TypeDirection.getDirection8(point.x, point.y, point1.x, point1.y);
            if (!this._effectDirect) {
                this._effectDirect = new s.DirectAnimationSprite();
                this._effectDirect.initialize(game.TypeAnimaAsset.EFFECT_DIRECT_5, true, true);
                this._effectDirect.setResId("30010");
                this._effectDirect.direct = dire;
                this._effectDirect.anchorOffsetX = this._effectDirect.anchorOffsetY = 0;
                this._effectDirect.x = 0;
                this._effectDirect.y = 0;
                this._effectDirect.play();
                this._group.addChild(this._effectDirect);
                this._map.addChild(this._group);
                //logger.log("马车行驶的方向是", TypeDirection.getDirectionsStr(dire));
                if (GameModels.user.player.level <= 100) {
                    this._group.addChild(this._contextBack);
                    this._group.addChild(this._contextLab);
                    this._contextLab.text = Language.languageGroupText;
                    this._contextBack.width = this._contextLab.width + 20 > 140 ? 140 : this._contextLab.width + 20;
                    this._contextBack.height = this._contextLab.height + 30;
                    this._contextBack.x = this._effectDirect.width / 2;
                    this._contextBack.y = this._effectDirect.height / 2 - this._contextBack.height - 30;
                    this._contextLab.x = this._contextBack.x + 8;
                    this._contextLab.y = this._contextBack.y + 5;
                }
                this._group.x = point.x;
                this._group.y = point.y;
                egret.Tween.get(this._group).to({ x: point1.x, y: point1.y }, 5000).call(this.removeChatGroup, this);
            }
        };
        ViewCity.prototype.removeChatGroup = function () {
            if (this._group) {
                egret.Tween.removeTweens(this._group);
                if (this._effectDirect) {
                    if (this._effectDirect.parent) {
                        this._effectDirect.parent.removeChild(this._effectDirect);
                    }
                    this._effectDirect.stop();
                    utils.ObjectPool.to(this._effectDirect, true);
                    this._effectDirect = null;
                }
                if (this._contextBack.parent)
                    this._contextBack.parent.removeChild(this._contextBack);
                if (this._contextLab.parent)
                    this._contextLab.parent.removeChild(this._contextLab);
                this._group.removeChildren();
                if (this._group.parent)
                    this._group.parent.removeChild(this._group);
            }
        };
        ViewCity.prototype.getCityPos = function () {
            var item = this.randomBuyAllCity;
            return item ? new egret.Point(item.x, item.y) : null;
        };
        Object.defineProperty(ViewCity.prototype, "currCity", {
            get: function () {
                return this._map ? this._map.currCity : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewCity.prototype, "randomBuyPassCity", {
            get: function () {
                return this._map ? this._map.randomBuyPassCity : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewCity.prototype, "randomBuyAllCity", {
            get: function () {
                return this._map ? this._map.randomBuyAllCity : null;
            },
            enumerable: true,
            configurable: true
        });
        ViewCity.prototype.moveToCurrCity = function (item) {
            if (!item)
                return;
            var cy = this.scroller.viewport.height / 2;
            egret.Tween.removeTweens(this.scroller.viewport);
            var toY = item.y - cy;
            if (toY > this.scroller.viewport.contentHeight - this.scroller.height) {
                toY = this.scroller.viewport.contentHeight - this.scroller.height;
            }
            if (toY < 0) {
                toY = 0;
            }
            egret.Tween.get(this.scroller.viewport).to({ scrollV: toY }, 1000, utils.Ease.expoOut);
        };
        return ViewCity;
    }(eui.Component));
    s.ViewCity = ViewCity;
    __reflect(ViewCity.prototype, "s.ViewCity", ["s.IView", "egret.DisplayObject"]);
})(s || (s = {}));
