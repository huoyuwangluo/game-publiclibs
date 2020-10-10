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
    var GameChapterBoss = (function (_super) {
        __extends(GameChapterBoss, _super);
        function GameChapterBoss(type) {
            var _this = _super.call(this, type ? type : TypeGame.CHAPTER_BOSS) || this;
            _this._countdownValue = 0;
            _this._delayTime = 1.5;
            return _this;
        }
        GameChapterBoss.prototype.enter = function (mapId) {
            /*this._isEnter = true;
            this._isEnterOver = false;
            this._scene.clear(true);
            this.enterMap(mapId);*/
            _super.prototype.enter.call(this, mapId);
            mg.soundManager.playBackGround("bgm_tianti");
        };
        GameChapterBoss.prototype.exit = function () {
            _super.prototype.exit.call(this);
            if (this._tartMovie) {
                this._tartMovie.stop();
                if (this._tartMovie.parent) {
                    this._tartMovie.parent.removeChild(this._tartMovie);
                }
            }
        };
        GameChapterBoss.prototype.start = function () {
            _super.prototype.start.call(this);
            this.playEff();
        };
        GameChapterBoss.prototype.playEff = function () {
            if (!this._tartMovie) {
                this._tartMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                this._tartMovie.resId = "zyz";
            }
            this._tartMovie.x = mg.stageManager.stage.stageWidth / 2;
            this._tartMovie.y = mg.stageManager.stage.stageHeight / 2 - 100;
            mg.layerManager.mapEffect.addChild(this._tartMovie);
            this._tartMovie.playOnce("newAnimation");
            this._tartMovie.onCompleteOnce(this, function () {
                this._tartMovie.stop();
                if (this._tartMovie.parent) {
                    this._tartMovie.parent.removeChild(this._tartMovie);
                }
            });
        };
        GameChapterBoss.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.chapterBossMainView;
        };
        GameChapterBoss.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 0;
        };
        //protected onSceneTap(tileX: number, tileY: number) {
        //	super.onSceneTap(tileX, tileY);
        //	this._player.movePathTo(tileX, tileY);
        //}
        GameChapterBoss.prototype.startUI = function () {
            //copy.CopyMainView.instance.showBossBlood(GameModels.scene.sights[0] as vo.GameMonsterVO);
            //utils.TweenUtil.shock(mg.layerManager.map, 1000, 20);
        };
        return GameChapterBoss;
    }(s.GameSiginPlayerBoss));
    s.GameChapterBoss = GameChapterBoss;
    __reflect(GameChapterBoss.prototype, "s.GameChapterBoss");
})(s || (s = {}));
