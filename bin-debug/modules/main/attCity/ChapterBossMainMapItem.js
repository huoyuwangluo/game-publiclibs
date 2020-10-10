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
var mainMap;
(function (mainMap) {
    var ChapterBossMainMapItem = (function (_super) {
        __extends(ChapterBossMainMapItem, _super);
        function ChapterBossMainMapItem() {
            var _this = _super.call(this) || this;
            _this._timeArr = [5, 6, 7, 8, 9, 10];
            return _this;
            //this.cacheAsBitmap = true;
        }
        ChapterBossMainMapItem.prototype.dataChange = function () {
            //this.expProgress.setMinWidth(0);
            if (this.dataSource) {
                utils.timer.clear(this, this.updataProgress);
                this.imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                if (this._effect) {
                    if (this._effect.parent) {
                        this._effect.parent.removeChild(this._effect);
                    }
                    this._effect.stop();
                    utils.ObjectPool.to(this._effect, true);
                    this._effect = null;
                }
                this.imgLock.visible = false;
                this.imgBg.filters = null;
                this.labChapter.filters = this.imgChapter.filters = this.imgLock.filters = this.imgEff.filters = null;
                this.currentState = "city" + this.dataSource.resource;
                this.imgBg.source = "chapterMap_json.img_mianCity" + this.dataSource.resource;
                this.expProgress.visible = false;
                this.imgCity.visible = false;
                this.labChapter.text = "" + this.dataSource.id;
                if (this.dataSource.id == GameModels.chapter.totalChapter) {
                    this.expProgress.visible = true;
                    this.imgCity.visible = true;
                    var num = Math.floor(Math.random() * (this._timeArr.length - 1));
                    this._totalTime = this._lastTime = this._timeArr[num];
                    this.expProgress.value = ((this._totalTime - this._lastTime) / this._totalTime) * 100;
                    utils.timer.loop(1000, this, this.updataProgress);
                }
                else {
                    if (this.dataSource.id > GameModels.chapter.totalChapter) {
                        this.imgLock.visible = true;
                        this.imgBg.filters = utils.filterUtil.grayFilters;
                        this.labChapter.filters = this.imgChapter.filters = this.imgLock.filters = this.imgEff.filters = utils.filterUtil.grayFilters;
                    }
                    else {
                        this.expProgress.visible = true;
                        this.imgCity.visible = true;
                        var num = Math.floor(Math.random() * (this._timeArr.length - 1));
                        this._totalTime = this._lastTime = this._timeArr[num];
                        this.expProgress.value = ((this._totalTime - this._lastTime) / this._totalTime) * 100;
                        utils.timer.loop(1000, this, this.updataProgress);
                    }
                }
                this.invalidateProperties();
            }
            else {
                this.imgBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                if (this._effect) {
                    if (this._effect.parent) {
                        this._effect.parent.removeChild(this._effect);
                    }
                    this._effect.stop();
                    utils.ObjectPool.to(this._effect, true);
                    this._effect = null;
                }
                utils.timer.clear(this, this.updataProgress);
            }
        };
        ChapterBossMainMapItem.prototype.updataProgress = function () {
            if (!this.dataSource)
                return;
            if (this.dataSource.id > GameModels.chapter.totalChapter)
                return;
            if (this._lastTime <= -1) {
                //logger.log("转化前当前城池的点===", this.x + "_" + this.y);
                var point = this.localToGlobal();
                //logger.log("转化后当前城池的点===", point.x + "_" + point.y);
                var point1 = new egret.Point(point.x + this.width / 2, point.y + this.height / 2);
                if (app.gameContext.typeGame == TypeGame.ATKCITY && !mg.uiManager.hasDialog && !mg.alertManager.current) {
                    mg.effectManager.flyEffects("6160", 3, point1, mg.uiManager.getView(main.MainUIView).getFoodPostion(true), mg.layerManager.top);
                    var flyItem = new s.FlyIconsEffect();
                    flyItem.initializeConfigStr("701;301", point1, mg.layerManager.top, mg.uiManager.getView(main.MainUIView).getFoodPostion(true), 0.5);
                    flyItem.start();
                }
                var num = Math.floor(Math.random() * (this._timeArr.length - 1));
                this._totalTime = this._lastTime = this._timeArr[num];
                this.expProgress.value = ((this._totalTime - this._lastTime) / this._totalTime) * 100;
                utils.timer.clear(this, this.updataProgress);
                utils.timer.loop(1000, this, this.updataProgress);
                return;
            }
            this.expProgress.value = ((this._totalTime - this._lastTime) / this._totalTime) * 100;
            this._lastTime--;
        };
        ChapterBossMainMapItem.prototype.onClick = function (evt) {
            if (!this.dataSource)
                return;
            if (this.dataSource.id == GameModels.chapter.totalChapter) {
                app.gameContext.enterChapterBoss("");
                mg.uiManager.removeAllDialogs();
            }
            else {
                if (this.dataSource.id > GameModels.chapter.totalChapter) {
                    mg.alertManager.tip(Language.J_GCHWKQ);
                }
                else {
                    mg.alertManager.tip(Language.J_GCYBGZ);
                }
            }
        };
        ChapterBossMainMapItem.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.dataSource) {
                if (this.dataSource.id == GameModels.chapter.totalChapter) {
                    this.imgBg.source = "chapterMap_json.img_mianCity0" + this.dataSource.resource;
                    this._effect = this.fromEffect("30001");
                    this._effect.y = this.imgEff.y - 15;
                }
                else if (this.dataSource.id < GameModels.chapter.totalChapter) {
                    this._effect = this.fromEffect("30006");
                    this._effect.y = this.imgEff.y - 25;
                }
                if (this._effect) {
                    this._effect.x = this.imgEff.x;
                    this._effect.frameRate = 6;
                    this._effect.play();
                    this.addChild(this._effect);
                }
            }
        };
        return ChapterBossMainMapItem;
    }(ui.ChapterBossMainMapItemSkin));
    mainMap.ChapterBossMainMapItem = ChapterBossMainMapItem;
    __reflect(ChapterBossMainMapItem.prototype, "mainMap.ChapterBossMainMapItem");
})(mainMap || (mainMap = {}));
