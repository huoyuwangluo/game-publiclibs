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
var mg;
(function (mg) {
    var StoryManager = (function (_super) {
        __extends(StoryManager, _super);
        function StoryManager() {
            var _this = _super.call(this) || this;
            _this._storyId = 0;
            return _this;
        }
        Object.defineProperty(StoryManager, "instance", {
            get: function () {
                if (!StoryManager._instance) {
                    StoryManager._instance = new StoryManager();
                    StoryManager._instance.initialize();
                }
                return StoryManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        StoryManager.prototype.initialize = function () {
            mg.layerManager.mapEffect.addChild(StoryManager._instance);
        };
        /**开始启动剧情 */
        StoryManager.prototype.startStory = function (storyId, call, handler) {
            if (call === void 0) { call = null; }
            if (handler === void 0) { handler = null; }
            this._caller = call;
            this._handler = handler;
            this._storyId = storyId;
            if (this.storyFloat == null) {
                this.storyFloat = new main.StoryFloat();
            }
            this.dispatchEventWith(mg.StoryManager.SHOW_OR_HIED_STORY);
            //GameModels.scene.setFightEnabled(false);
            this.addChild(this.storyFloat);
            this.storyFloat.startStory(storyId);
        };
        StoryManager.prototype.endStory = function () {
            //if (this._storyId > 0) {
            //GameModels.scene.notifyStoryEnd(this._storyId);
            //}            
            //GameModels.scene.setFightEnabled(true);
            this._storyId = 0;
            this.dispatchEventWith(mg.StoryManager.SHOW_OR_HIED_STORY);
            if (this.storyFloat.parent != null) {
                this.storyFloat.parent.removeChild(this.storyFloat);
                if (this._caller && this._handler) {
                    egret.callLater(this._handler, this._caller); //防止回调里用到定时器不起作用
                    //this._handler.call(this._caller);
                }
            }
        };
        /**开始启动剧情 */
        StoryManager.prototype.startBigStory = function (storyId, call, handler, data) {
            if (call === void 0) { call = null; }
            if (handler === void 0) { handler = null; }
            if (data === void 0) { data = null; }
            this._caller = call;
            this._handler = handler;
            this._data = data;
            this._storyId = storyId;
            if (this.storyFloatBig == null) {
                this.storyFloatBig = new main.StoryFloatBig();
            }
            this.dispatchEventWith(mg.StoryManager.SHOW_OR_HIED_STORY);
            //GameModels.scene.setFightEnabled(false);
            mg.layerManager.top.addChild(this.storyFloatBig);
            this.storyFloatBig.startStory(storyId);
        };
        StoryManager.prototype.endBigStory = function () {
            //if (this._storyId > 0) {
            //GameModels.scene.notifyStoryEnd(this._storyId);
            //}            
            //GameModels.scene.setFightEnabled(true);
            if (this._storyId == 101) {
                if (app.gameContext.scene) {
                    app.gameContext.scene.cameraManager.lookAtCenterFix(38, 22, false);
                }
            }
            else if (this._storyId == 102) {
                if (app.gameContext.scene) {
                    app.gameContext.scene.cameraManager.lookAtCenterFix(23, 37, false);
                }
            }
            this._storyId = 0;
            this.dispatchEventWith(mg.StoryManager.SHOW_OR_HIED_STORY);
            if (this.storyFloatBig.parent != null) {
                this.storyFloatBig.parent.removeChild(this.storyFloatBig);
                if (this._caller && this._handler) {
                    this._handler.call(this._caller, this._data);
                }
            }
        };
        Object.defineProperty(StoryManager.prototype, "storyId", {
            get: function () {
                return this._storyId;
            },
            enumerable: true,
            configurable: true
        });
        StoryManager.SHOW_OR_HIED_STORY = "SHOW_OR_HIED_STORY";
        return StoryManager;
    }(egret.Sprite));
    mg.StoryManager = StoryManager;
    __reflect(StoryManager.prototype, "mg.StoryManager");
})(mg || (mg = {}));
