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
    /**单人玩家副本 */
    var GameSiginPlayerBoss = (function (_super) {
        __extends(GameSiginPlayerBoss, _super);
        function GameSiginPlayerBoss(type) {
            var _this = _super.call(this, type) || this;
            /**倒计时时间 */
            _this._countdownValue = 0;
            _this._delayTime = 0;
            _this._delayTime = 2;
            return _this;
        }
        GameSiginPlayerBoss.prototype.enter = function (mapId) {
            _super.prototype.enter.call(this);
            this._scene.clear(true);
            this.enterMap(mapId);
        };
        GameSiginPlayerBoss.prototype.exit = function () {
            _super.prototype.exit.call(this);
            this._player.remove();
        };
        GameSiginPlayerBoss.prototype.start = function () {
            _super.prototype.start.call(this);
            if (this._countdownValue > 0 && GameModels.scene.isBackEnter <= 0) {
                //this._player.come(500);
                s.CopyTimerCountDown.instance.start(this._countdownValue, this, this.startHandler);
            }
            else if (this._delayTime > 0) {
                //this._player.come(500);
                utils.timer.once(this._delayTime * 1000, this, this.startHandler);
            }
            else {
                this.startHandler();
            }
            var startX = 22;
            var startY = 37;
            if (this._view.scene.data.born != null) {
                startX = this._view.scene.data.born.x;
                startY = this._view.scene.data.born.y;
            }
            else {
                startX = this._player.vo.tileX;
                startY = this._player.vo.tileY;
            }
            this._scene.cameraManager.lookAtCenterFix(startX + 2, startY - 6);
        };
        GameSiginPlayerBoss.prototype.startHandler = function () {
            s.CopyTimerCountDown.instance.stop();
            if (app.gameContext.typeGame == TypeGame.CHAPTER_BOSS && GameModels.scene.isBackEnter <= 0) {
                if (GameModels.chapter.totalChapter == 23) {
                    mg.StoryManager.instance.startBigStory(136, this, this.mainStroyCallFun);
                }
                else if (GameModels.chapter.totalChapter == 32) {
                    mg.StoryManager.instance.startBigStory(137, this, this.mainStroyCallFun);
                }
                else if (GameModels.chapter.totalChapter == 42) {
                    mg.StoryManager.instance.startBigStory(138, this, this.mainStroyCallFun);
                }
                else if (GameModels.chapter.totalChapter == 1) {
                    mg.StoryManager.instance.startBigStory(101, this, this.mainStroyCallFun);
                }
                else {
                    this.mainStroyCallFun();
                }
            }
            else {
                this.mainStroyCallFun();
            }
            _super.prototype.startHandler.call(this);
            /*this._player.damgeEnabled=false;
            this._player.autoAttack=true;
            this._player.start();
            super.startHandler();*/
        };
        GameSiginPlayerBoss.prototype.mainStroyCallFun = function () {
            GameModels.scene.startGame(this, this.onStartGame);
            if (TypeGame.isFormationGame(true) && !TypeGame.noHaveLegionSkill()) {
                copy.CopyMainView.instance.unionSkillItem.start();
            }
        };
        GameSiginPlayerBoss.prototype.onStartGame = function () {
            if (this._scene == null)
                return;
            this._scene.cameraManager.lookAtCenterMax(this._player.vo.tileX + 2, this._player.vo.tileY - 6);
        };
        GameSiginPlayerBoss.prototype.displayMyPlayer = function () {
            _super.prototype.displayMyPlayer.call(this, s.AISmartSync);
            this._player.showStartProAdd();
        };
        GameSiginPlayerBoss.prototype.stop = function () {
            s.CopyTimerCountDown.instance.stop();
            this._player.stop();
            this._player.remove();
            utils.timer.clearAll(this);
            this._scene.offDropClear();
            this._scene.offDropOne();
            _super.prototype.stop.call(this);
        };
        GameSiginPlayerBoss.prototype.isMyCampObject = function (fs) {
            var ret = false;
            if (fs.type == TypeActor.NPC) {
                ret = true;
            }
            else {
                var sceneFlag = fs.master && fs.master.vo ? fs.master.vo.sceneFlag : (fs.vo ? fs.vo.sceneFlag : "");
                if (sceneFlag == this._player.vo.uid) {
                    ret = true;
                }
            }
            return ret;
        };
        /**是否为敌方单位 */
        GameSiginPlayerBoss.prototype.isEnemyObject = function (fs, target) {
            if (fs == target || fs == null || target == null)
                return false;
            var ret = false;
            if (this.isMyCampObject(fs) && !this.isMyCampObject(target) || !this.isMyCampObject(fs) && this.isMyCampObject(target)) {
                ret = true;
            }
            else {
                ret = false;
            }
            return ret;
        };
        /**是否为友方单位 */
        GameSiginPlayerBoss.prototype.isFriendObject = function (fs, target) {
            if (fs == target || fs == null || target == null)
                return false;
            var ret = false;
            if (this.isMyCampObject(fs) && this.isMyCampObject(target)) {
                ret = true;
            }
            else {
                ret = _super.prototype.isFriendObject.call(this, fs, target);
            }
            return ret;
            /*var isNPCFs = fs.type == TypeActor.NPC;
            var isNPCTarget = target.type == TypeActor.NPC;
            if (isNPCFs && isNPCTarget) {
                ret = false;
            }
            else if (isNPCFs || isNPCTarget) {
                ret = (target.master == this.player || fs.master == this.player);
            }
            else {
                ret = super.isFriendObject(fs, target);
            }
            return ret;*/
        };
        GameSiginPlayerBoss.prototype.endHandler = function (result, totalStar, dropItems, playerLv, selfEndVo, otherEndVo) {
            logger.log("游戏战斗结束===", result);
            // if (GameModels.common.tiaoguoTag == true) {
            // 	copy.CopyMainView.instance.showBossDead();
            // 	this.end(result, totalStar, dropItems, playerLv, selfEndVo, otherEndVo);
            // 	return;
            // }
            if (result) {
                copy.CopyMainView.instance.showBossDead();
                utils.timer.once(2000, this, this.end, false, result, totalStar, dropItems, playerLv, selfEndVo, otherEndVo);
            }
            else {
                utils.timer.once(2000, this, this.end, false, result, totalStar, dropItems, playerLv, selfEndVo, otherEndVo);
                //this.end(result, totalStar, dropItems, playerLv, selfEndVo, otherEndVo);
            }
        };
        return GameSiginPlayerBoss;
    }(s.GameSightsBase));
    s.GameSiginPlayerBoss = GameSiginPlayerBoss;
    __reflect(GameSiginPlayerBoss.prototype, "s.GameSiginPlayerBoss");
})(s || (s = {}));
