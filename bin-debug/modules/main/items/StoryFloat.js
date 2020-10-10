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
    var StoryFloat = (function (_super) {
        __extends(StoryFloat, _super);
        function StoryFloat() {
            var _this = _super.call(this) || this;
            _this.playIndex = 0;
            _this.storyId = 0;
            //private _black: egret.Sprite;
            _this.lastTalkTime = 0;
            _this.movingCount = 0;
            return _this;
        }
        StoryFloat.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        StoryFloat.prototype.childrenCreated = function () {
            var that = this;
            //that._black = new egret.Sprite();
            //that.headGroup.addChildAt(that._black, 0);
            that.showList = [];
            that.talkList = [this.talkItem0, this.talkItem1, this.talkItem2, this.talkItem3, this.talkItem4];
            for (var _i = 0, _a = that.talkList; _i < _a.length; _i++) {
                var talkItem = _a[_i];
                talkItem.touchEnabled = talkItem.touchChildren = false;
                talkItem.visible = false;
            }
        };
        StoryFloat.prototype.clear = function () {
            var that = this;
            that.curTalkItem = null;
            for (var _i = 0, _a = that.talkList; _i < _a.length; _i++) {
                var talkItem = _a[_i];
                talkItem.visible = false;
                talkItem.clear();
            }
            that.showList.splice(0, that.showList.length);
            that.leftHeadIMG.reset();
            that.rightHeadIMG.reset();
            //that.headGroup.x = -350;
            that.leftHeadIMG.x = -500;
            that.rightHeadIMG.x = 600;
            that.lastTalkTime = 0;
        };
        /**开始启动剧情 */
        StoryFloat.prototype.startStory = function (storyId) {
            var that = this;
            that.clear();
            that.storyId = storyId;
            that.start();
        };
        StoryFloat.prototype.start = function () {
            //this._black.visible = false;
            utils.timer.loop(100, this, this.onSecondInterval);
            var that = this;
            if (that.talkList == null || that.storyId <= 0) {
                that.endStory();
                return;
            }
            that.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, that.playNext, that);
            mg.stageManager.onResize(this, this.resizeHandler, true);
            that.resizeHandler(0, 0);
            that.playIndex = 0;
            that.storyInfos = [];
            var list = Templates.getList(templates.Map.MAINSTORY);
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var info = list_1[_i];
                if (info.teamId == that.storyId) {
                    that.storyInfos.push(info);
                }
            }
            that.playNext(null);
        };
        StoryFloat.prototype.resizeHandler = function (w, h) {
            //this._black.graphics.clear();
            //this._black.graphics.beginFill(0x0, 0.7);
            //this._black.graphics.drawRect(0, 0, mg.stageManager.stageWidth, mg.stageManager.stageHeight);
            //this._black.graphics.endFill();
            //this._black.x = (600 - mg.stageManager.stageWidth)/2;
            this.x = (mg.stageManager.stageWidth - 600) / 2;
        };
        StoryFloat.prototype.onSecondInterval = function () {
            if (this.lastTalkTime == 0)
                return;
            var t = 2500;
            if (this.playIndex >= this.storyInfos.length) {
                t = 3000;
            }
            if (egret.getTimer() - this.lastTalkTime > t) {
                this.playNext(null);
            }
        };
        StoryFloat.prototype.getFreeTalkItem = function () {
            var ret = null;
            for (var _i = 0, _a = this.talkList; _i < _a.length; _i++) {
                var talkItem = _a[_i];
                if (talkItem.visible == false) {
                    ret = talkItem;
                    break;
                }
            }
            return ret;
        };
        StoryFloat.prototype.playNext = function (e) {
            utils.timer.clear(this, this.playNext);
            var that = this;
            that.lastTalkTime = egret.getTimer();
            if (that.movingCount > 0)
                return;
            if (that.curTalkItem != null && that.curTalkItem.getIsFinish() == false) {
                that.curTalkItem.onTalkFinish();
                return;
            }
            if (that.playIndex >= that.storyInfos.length) {
                that.endStory();
                return;
            }
            //对话
            var storyInfo = that.storyInfos[that.playIndex];
            that.playIndex++;
            //移动镜头
            if (storyInfo.cameraMove != "" && storyInfo.cameraMove != "0") {
                var arr = storyInfo.cameraMove.split(",");
                var moveX = parseInt(arr[0]);
                var moveY = parseInt(arr[1]);
                var delayTime = 500 + parseInt(arr[2]);
                var tScene = app.gameContext.scene;
                if (tScene != null) {
                    if (moveX == 0 && moveX == 0) {
                        tScene.cameraManager.lookAtPlayer();
                    }
                    else {
                        moveX = tScene.getMapRealX(moveX);
                        moveY = tScene.getMapRealX(moveY);
                        tScene.cameraManager.lookAtViewHight({ x: moveX, y: moveY });
                    }
                    utils.timer.once(delayTime, this, this.playNext);
                }
                else {
                    this.playNext(null);
                }
                return;
            }
            //this._black.visible = true;
            var item = that.getFreeTalkItem();
            item.setInfo(storyInfo);
            item.visible = true;
            if (storyInfo.playSound != "") {
                mg.soundManager.playSound(storyInfo.playSound);
            }
            if (storyInfo.direction == 0) {
                item.x = 0;
                //that.setLeftHead(storyInfo.BustId);				
                //egret.Tween.get(that.leftHeadIMG).to({ x: -60 }, 300, utils.Ease.linearNone);
                //egret.Tween.get(that.rightHeadIMG).to({ x: 260 }, 300, utils.Ease.linearNone);
                //egret.Tween.get(that.leftHeadIMG).to({ x: 0 }, 300, utils.Ease.linearNone);
                //egret.Tween.get(that.rightHeadIMG).to({ x: 350 }, 300, utils.Ease.linearNone);
            }
            else {
                item.x = 0;
                //that.setRightHead(storyInfo.BustId);
                //egret.Tween.get(that.leftHeadIMG).to({ x: -160 }, 300, utils.Ease.linearNone);
                //egret.Tween.get(that.rightHeadIMG).to({ x: 160 }, 300, utils.Ease.linearNone);
            }
            that.showList.push(item);
            if (that.curTalkItem != null) {
                that.curTalkItem.onHideFinishTag();
            }
            that.curTalkItem = item;
            //对话框移动
            that.playTalkItemMove();
            //that.playIndex ++;
        };
        StoryFloat.prototype.playTalkItemMove = function () {
            var that = this;
            that.movingCount = 0;
            for (var _i = 0, _a = that.showList; _i < _a.length; _i++) {
                var talkItem = _a[_i];
                var startY = 620 - (that.showList.length - that.movingCount) * 120;
                var endY = startY - 120;
                talkItem.y = startY;
                egret.Tween.get(talkItem).to({ y: endY }, 100, utils.Ease.linearNone).call(this.onTalkItemMoveFinish, this, [talkItem]);
                that.movingCount++;
            }
        };
        StoryFloat.prototype.onTalkItemMoveFinish = function (item) {
            var that = this;
            that.movingCount--;
            if (item.y < 0) {
                item.visible = false;
                item.clear();
                var index = that.showList.indexOf(item);
                if (index > -1) {
                    that.showList.splice(index, 1);
                }
            }
        };
        StoryFloat.prototype.setLeftHead = function (modelId) {
            var that = this;
            var value = modelId == 0 ? 1100 : modelId;
            var tpl = Templates.getTemplateById(templates.Map.DATAMODEL, value);
            //that.leftHeadIMG.setPetBody(tpl?tpl.resId.toString():null,tpl.getSound?false:true);
            //that.headGroup.addChild(that.leftHeadIMG);
            //that.headGroup.addChildAt(that.rightHeadIMG, 0);
        };
        StoryFloat.prototype.setRightHead = function (modelId) {
            var that = this;
            var value = modelId == 0 ? 1100 : modelId;
            var tpl = Templates.getTemplateById(templates.Map.DATAMODEL, value);
            //that.rightHeadIMG.setPetBody(tpl?tpl.resId.toString():null,tpl.getSound?false:true);
            //that.headGroup.addChild(that.rightHeadIMG);
            //that.headGroup.addChildAt(that.leftHeadIMG, 0);
        };
        StoryFloat.prototype.endStory = function () {
            utils.timer.clear(this, this.onSecondInterval);
            var that = this;
            if (that.stage != null) {
                that.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, that.playNext, that);
            }
            mg.stageManager.offResize(this, this.resizeHandler);
            mg.StoryManager.instance.endStory();
            that.storyId = 0;
        };
        return StoryFloat;
    }(ui.StoryFloatSkin));
    main.StoryFloat = StoryFloat;
    __reflect(StoryFloat.prototype, "main.StoryFloat");
})(main || (main = {}));
