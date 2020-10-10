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
var main;
(function (main) {
    var StoryFloatBig = (function (_super) {
        __extends(StoryFloatBig, _super);
        function StoryFloatBig() {
            return _super.call(this) || this;
        }
        StoryFloatBig.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._storyInfos = [];
            this.talkItem.touchEnabled = this.talkItem.touchChildren = false;
            this.talkItem.visible = false;
            this._black = new egret.Sprite();
            this.addChildAt(this._black, 0);
        };
        StoryFloatBig.prototype.clear = function () {
            this.talkItem.clear();
            this.talkItem.visible = false;
            this._leftTime = 0;
            this._storyId = 0;
            this._playIndex = 0;
            this._storyInfos.length = 0;
        };
        /**开始启动剧情 */
        StoryFloatBig.prototype.startStory = function (storyId) {
            this.clear();
            this._storyId = storyId;
            this.start();
        };
        StoryFloatBig.prototype.start = function () {
            if (this._storyId <= 0) {
                this.endStory();
                return;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playNext, this);
            mg.stageManager.onResize(this, this.resizeHandler, true);
            this.resizeHandler();
            this._playIndex = 0;
            this._storyInfos = [];
            var list = Templates.getList(templates.Map.MAINSTORY);
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var info = list_1[_i];
                if (info.teamId == this._storyId) {
                    this._storyInfos.push(info);
                }
            }
            this.talkItem.visible = true;
            this.talkItem.setInfo(this._storyInfos[this._playIndex]);
            utils.timer.loop(1000, this, this.updataLastTalkTime);
        };
        StoryFloatBig.prototype.resizeHandler = function () {
            this._black.graphics.clear();
            this._black.graphics.beginFill(0x0, 0.7);
            this._black.graphics.drawRect(0, 0, mg.stageManager.stageWidth, mg.stageManager.stageHeight);
            this._black.graphics.endFill();
            this._black.x = (600 - mg.stageManager.stageWidth) / 2;
            this.x = (mg.stageManager.stageWidth - 600) / 2;
        };
        StoryFloatBig.prototype.updataLastTalkTime = function () {
            this._leftTime++;
            if (this._leftTime >= 15) {
                this.playNext(null);
            }
        };
        StoryFloatBig.prototype.playNext = function (e) {
            utils.timer.clear(this, this.updataLastTalkTime);
            this._leftTime = 0;
            if (this.talkItem.isFinish && this._playIndex >= this._storyInfos.length - 1) {
                this.endStory();
                return;
            }
            if (!this.talkItem.isFinish) {
                this.talkItem.onTalkFinish();
            }
            else {
                this._playIndex++;
                this.talkItem.setInfo(this._storyInfos[this._playIndex]);
            }
            utils.timer.loop(1000, this, this.updataLastTalkTime);
        };
        StoryFloatBig.prototype.endStory = function () {
            this.clear();
            utils.timer.clear(this, this.updataLastTalkTime);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playNext, this);
            mg.stageManager.offResize(this, this.resizeHandler);
            mg.StoryManager.instance.endBigStory();
            this._storyId = 0;
        };
        return StoryFloatBig;
    }(ui.StoryFloatBigSkin));
    main.StoryFloatBig = StoryFloatBig;
    __reflect(StoryFloatBig.prototype, "main.StoryFloatBig");
})(main || (main = {}));
