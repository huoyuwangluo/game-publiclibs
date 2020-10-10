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
var copy;
(function (copy) {
    var CopyUnionSkillItem = (function (_super) {
        __extends(CopyUnionSkillItem, _super);
        function CopyUnionSkillItem() {
            var _this = _super.call(this) || this;
            _this._rate = 2;
            return _this;
        }
        CopyUnionSkillItem.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._xpMaskArr = [];
            this._lastTime = [];
            this._totalTime = [];
            this._effectArr = [];
            this._skillIconList = [this.btnSkill1, this.btnSkill2, this.btnSkill3];
            this._time = [this.labTime1, this.labTime2, this.labTime3];
            this._skillLockList = [this.skillLock1, this.skillLock2, this.skillLock3];
            this._skillLockMask = [this.imgMask1, this.imgMask2, this.imgMask3];
            this._skillProMask = [this.imgProMask1, this.imgProMask2, this.imgProMask3];
            this._groupArr = [this.group1, this.group2, this.group3];
            this._xpMask1 = new egret.Shape();
            this.imgPro1.mask = this._xpMask1;
            this._xpMask1.anchorOffsetX = this._xpMask1.width / 2;
            this._xpMask1.anchorOffsetX = this._xpMask1.height / 2;
            this._xpMask1.x = this.imgPro1.x;
            this._xpMask1.y = this.imgPro1.y;
            this._xpMask2 = new egret.Shape();
            this.imgPro2.mask = this._xpMask2;
            this._xpMask2.anchorOffsetX = this._xpMask2.width / 2;
            this._xpMask2.anchorOffsetX = this._xpMask2.height / 2;
            this._xpMask2.x = this.imgPro2.x;
            this._xpMask2.y = this.imgPro2.y;
            this._xpMask3 = new egret.Shape();
            this.imgPro3.mask = this._xpMask3;
            this._xpMask3.anchorOffsetX = this._xpMask3.width / 2;
            this._xpMask3.anchorOffsetX = this._xpMask3.height / 2;
            this._xpMask3.x = this.imgPro3.x;
            this._xpMask3.y = this.imgPro3.y;
            this._xpMaskArr = [this._xpMask1, this._xpMask2, this._xpMask3];
        };
        CopyUnionSkillItem.prototype.uiChangeHandler = function () {
            if (copy.CopyWinInstance.instance.copyWinTipView || copy.CopyFailInstance.instance.copyFailTipView) {
                this.stopGuide();
                mg.guideManager.guideStopImmediately(this.btnJiaSu);
                return;
            }
            if (mg.uiManager.hasDialog || mg.alertManager.current || mg.TipManager.instance.current) {
                this.stopGuide();
                mg.guideManager.guideStopImmediately(this.btnJiaSu);
            }
            else {
                this.startGuide();
            }
        };
        CopyUnionSkillItem.prototype.startGuide = function () {
            if (app.gameContext.typeGame != TypeGame.CHAPTER_BOSS) {
                this.stopGuide();
                mg.guideManager.guideStopImmediately(this.btnJiaSu);
                return;
            }
            if (mg.uiManager.hasDialog || mg.alertManager.current || mg.TipManager.instance.current) {
                this.stopGuide();
                mg.guideManager.guideStopImmediately(this.btnJiaSu);
                return;
            }
            var autoIndex = game.state.getItem(GameModels.user.player.uid, TypeSetting.AUTO_PLAY_SKILL);
            if (GameModels.chapter.data.Id == 1001003 || GameModels.chapter.data.Id == 1001004 || GameModels.chapter.data.Id == 1001005) {
                if (this._lastTime[0] > this._totalTime[0] && autoIndex != 2) {
                    mg.guideManager.guideImmediately(this.btnSkill1, Language.J_DJSRZYJ, TypeDirection.DOWN);
                    return;
                }
            }
            var click = game.state.getItem(GameModels.user.player.uid, TypeSetting.CLICK_AUTO_SKILL);
            if (GameModels.chapter.data.Id >= 1001006 && autoIndex != 2 && !click && GameModels.user.player.level < 80) {
                mg.guideManager.guideImmediately(this.btnAuto, Language.J_DJZDFR, TypeDirection.DOWN);
                game.state.setItem(GameModels.user.player.uid, TypeSetting.CLICK_AUTO_SKILL, true);
                return;
            }
            if (!GameModels.user.player.battleSpeedRate && GameModels.user.player.level >= 35 && GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_9) <= 0) {
                if (this._isStory == false) {
                    this._isStory = true;
                    mg.StoryManager.instance.startBigStory(125, this, this.storyCallFun);
                }
                else {
                    if (app.gameContext.typeGame != TypeGame.CHAPTER_BOSS)
                        return;
                    mg.guideManager.guideImmediately(this.btnJiaSu, Language.J_DJJS, TypeDirection.DOWN);
                }
            }
        };
        CopyUnionSkillItem.prototype.storyCallFun = function () {
            if (app.gameContext.typeGame != TypeGame.CHAPTER_BOSS)
                return;
            mg.guideManager.guideImmediately(this.btnJiaSu, Language.J_DJJS, TypeDirection.DOWN);
        };
        CopyUnionSkillItem.prototype.stopGuide = function () {
            mg.guideManager.guideStopImmediately(this.btnSkill1);
            mg.guideManager.guideStopImmediately(this.btnAuto);
        };
        CopyUnionSkillItem.prototype.start = function () {
            // if (app.gameContext.typeGame == TypeGame.CHAPTER_BOSS && GameModels.chapter.totalChapter == 1) {
            //     this.btnTiaoGuo.visible = true;
            // }
            this._currCampJibanTemp = GameModels.pet.getLegionSkillByGameType(app.gameContext.typeGame);
            var tem = this._currCampJibanTemp;
            for (var i = 0; i < this._skillIconList.length; i++) {
                this._time[i].text = "";
                if (tem) {
                    var strArr = tem.skill.split(";");
                    if (strArr[i]) {
                        var skillNew = Templates.getTemplateById(templates.Map.SKILLNEW, strArr[i]);
                        this.startMaskProgress(i, skillNew.id);
                    }
                }
            }
            this.startGuide();
        };
        CopyUnionSkillItem.prototype.enter = function () {
            this._isStory = false;
            // GameModels.common.tiaoguoTag = false;
            this.btnTiaoGuo.visible = false;
            this.btnJiaSu.visible = GameModels.user.player.level >= 16;
            if (app.gameContext.typeGame == TypeGame.CHAPTER_BOSS && GameModels.chapter.totalChapter == 1) {
                this.btnJiaSu.visible = false;
            }
            this._currCampJibanTemp = GameModels.pet.getLegionSkillByGameType(app.gameContext.typeGame);
            game.state.setItem(GameModels.user.player.uid, TypeSetting.CLICK_AUTO_SKILL, false);
            this._isShiFang = [false, false, false];
            for (var i = 0; i < GameModels.scene.campSkillTimeList.length; i++) {
                if (GameModels.scene.campSkillTimeList[i] == -1) {
                    this._isShiFang[i] = true;
                }
                else {
                    this._isShiFang[i] = false;
                }
            }
            this.ininView();
            this.btnAuto.filters = GameModels.chapter.data.Id >= 1001006 ? null : utils.filterUtil.grayFilters;
            if (app.gameContext.typeGame == TypeGame.CHAPTER_BOSS && GameModels.chapter.data.Id == 1001002) {
                this.addChild(this.talkGroup);
            }
            else {
                this.removeChild(this.talkGroup);
            }
            if (app.gameContext.typeGame == TypeGame.CHAPTER_BOSS && (GameModels.user.player.level == 80 || GameModels.user.player.level == 90 ||
                GameModels.user.player.level == 100 || GameModels.user.player.level == 110)) {
                var count = 5 - GameModels.pet.formatUpListRedCount;
                if (count > 0) {
                    this.addChild(this.talkGroup0);
                    this.labDes.text = Language.getExpression(Language.E_ZSZ1HJKJS, count);
                }
                else {
                    this.removeChild(this.talkGroup0);
                }
            }
            else {
                this.removeChild(this.talkGroup0);
            }
            for (var i = 0; i < this._groupArr.length; i++) {
                this._groupArr[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnTouchHandler, this);
                this._groupArr[i].addEventListener(egret.TouchEvent.TOUCH_END, this.btnTouchHandler, this);
                this._groupArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTouchHandler, this);
            }
            this.btnAuto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAutoClick, this);
            //this.btnTiaoGuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTiaoGuoClick, this);
            this.btnJiaSu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJiaSuClick, this);
            mg.uiManager.addEventListener(egret.Event.CHANGE, this.uiChangeHandler, this);
            mg.alertManager.addEventListener(mg.AlertManager.SHOW_OR_HIED_ALERT, this.uiChangeHandler, this);
            mg.TipManager.instance.addEventListener(mg.TipManager.SHOW_OR_HIED_TIP, this.uiChangeHandler, this);
            copy.CopyWinInstance.instance.addEventListener(copy.CopyWinInstance.SHOW_OR_HIED_WINVIEW, this.uiChangeHandler, this);
            copy.CopyFailInstance.instance.addEventListener(copy.CopyFailInstance.SHOW_OR_HIED_FAILVIEW, this.uiChangeHandler, this);
        };
        CopyUnionSkillItem.prototype.exit = function () {
            // GameModels.common.tiaoguoTag = false;
            this._currCampJibanTemp = null;
            this.stopGuide();
            mg.guideManager.guideStopImmediately(this.btnJiaSu);
            this._isShiFang = [false, false, false];
            this.resetView();
            for (var i = 0; i < this._groupArr.length; i++) {
                egret.Tween.removeTweens(this._groupArr[i]);
                this._groupArr[i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnTouchHandler, this);
                this._groupArr[i].removeEventListener(egret.TouchEvent.TOUCH_END, this.btnTouchHandler, this);
                this._groupArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTouchHandler, this);
            }
            this.btnAuto.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAutoClick, this);
            //this.btnTiaoGuo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTiaoGuoClick, this);
            this.btnJiaSu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJiaSuClick, this);
            mg.uiManager.removeEventListener(egret.Event.CHANGE, this.uiChangeHandler, this);
            mg.alertManager.removeEventListener(mg.AlertManager.SHOW_OR_HIED_ALERT, this.uiChangeHandler, this);
            mg.TipManager.instance.removeEventListener(mg.TipManager.SHOW_OR_HIED_TIP, this.uiChangeHandler, this);
            copy.CopyWinInstance.instance.removeEventListener(copy.CopyWinInstance.SHOW_OR_HIED_WINVIEW, this.uiChangeHandler, this);
            copy.CopyFailInstance.instance.removeEventListener(copy.CopyFailInstance.SHOW_OR_HIED_FAILVIEW, this.uiChangeHandler, this);
        };
        CopyUnionSkillItem.prototype.resetView = function () {
            for (var i = 0; i < this._effectArr.length; i++) {
                if (this._effectArr[i]) {
                    this._effectArr[i].stop();
                    if (this._effectArr[i].parent) {
                        this._effectArr[i].parent.removeChild(this._effectArr[i]);
                    }
                    this._effectArr[i].visible = true;
                    this._effectArr[i].offAllComplete();
                    this.toEffect(this._effectArr[i]);
                }
            }
            this._effectArr.length = 0;
            if (this._xpMask1.parent)
                this.removeChild(this._xpMask1);
            if (this._xpMask2.parent)
                this.removeChild(this._xpMask2);
            if (this._xpMask3.parent)
                this.removeChild(this._xpMask3);
            utils.timer.clear(this, this.updataProgressMask1);
            utils.timer.clear(this, this.updataProgressMask2);
            utils.timer.clear(this, this.updataProgressMask3);
            utils.timer.clear(this, this.closeTimeUpdateHandler);
            utils.timer.clear(this);
        };
        /**绘制遮罩 */
        CopyUnionSkillItem.prototype.drawXpProgress = function (mask, angle, isAnticlockwise) {
            if (isAnticlockwise === void 0) { isAnticlockwise = false; }
            mask.graphics.clear();
            mask.graphics.beginFill(0x00ffff, 1);
            mask.graphics.lineTo(Math.sqrt(3200), 0);
            mask.graphics.drawArc(0, 0, Math.sqrt(3200), 0, angle * Math.PI / 180, isAnticlockwise);
            mask.graphics.lineTo(0, 0);
            mask.graphics.endFill();
        };
        /**初始化 */
        CopyUnionSkillItem.prototype.ininView = function () {
            this.resetView();
            if (!GameModels.user.player.battleSpeedRate) {
                this.btnJiaSu.source = "legionSkill_json.btn_legionSkill_one";
            }
            else {
                this.btnJiaSu.source = "legionSkill_json.btn_legionSkill_double";
            }
            for (var i = 0; i < this._skillIconList.length; i++) {
                var eff = utils.ObjectPool.from(s.AnimationSprite);
                eff.resId = "34008";
                eff.x = this._skillIconList[i].x;
                eff.y = this._skillIconList[i].y;
                // eff.frameRate = 24;
                this._groupArr[i].addChildAt(eff, this.getChildIndex(this._skillIconList[i]) - 1);
                eff.play();
                eff.visible = false;
                this._effectArr.push(eff);
            }
            this.group1.addChild(this._xpMask1);
            this.group2.addChild(this._xpMask2);
            this.group3.addChild(this._xpMask3);
            this._cdCount = 0;
            this.showAutoPlaySkillState();
            this.btnSkill1.source = "legionSkill_json.img_legionSkill_601101";
            this.btnSkill2.source = "legionSkill_json.img_legionSkill_601201";
            this.btnSkill3.source = "legionSkill_json.img_legionSkill_601301";
            for (var i = 0; i < this._xpMaskArr.length; i++) {
                this.drawXpProgress(this._xpMaskArr[i], 0);
                this._skillLockMask[i].visible = false;
            }
            var tem = this._currCampJibanTemp;
            for (var i = 0; i < this._skillIconList.length; i++) {
                this._time[i].text = "";
                if (tem) {
                    var strArr = tem.skill.split(";");
                    if (strArr[i]) {
                        var skillNew = Templates.getTemplateById(templates.Map.SKILLNEW, strArr[i]);
                        this._totalTime[i] = GameModels.user.player.battleSpeedRate ? (skillNew.cd + 1000) / this._rate : (skillNew.cd + 1000);
                        this._skillLockList[i].visible = false;
                        this._skillProMask[i].visible = true;
                        this._skillIconList[i].source = "legionSkill_json.img_legionSkill_" + strArr[i];
                        this._skillIconList[i].filters = null;
                        this._lastTime[i] = GameModels.scene.campSkillTimeList[i] <= 0 ? 0 : GameModels.scene.campSkillTimeList[i];
                        //this.startMaskProgress(i, skillNew.id);
                    }
                    else {
                        this._skillLockList[i].visible = true;
                        this._skillProMask[i].visible = false;
                        this._skillIconList[i].filters = utils.filterUtil.grayFilters;
                    }
                }
                else {
                    this._skillLockList[i].visible = true;
                    this._skillProMask[i].visible = false;
                    this._skillIconList[i].filters = utils.filterUtil.grayFilters;
                }
            }
        };
        CopyUnionSkillItem.prototype.startMaskProgress = function (index, skillId) {
            if (skillId === void 0) { skillId = 0; }
            if (index == 0) {
                utils.timer.clear(this, this.updataProgressMask1);
                this.updataProgressMask1(index, skillId);
                utils.timer.loop(200, this, this.updataProgressMask1, true, index, skillId);
            }
            else if (index == 1) {
                utils.timer.clear(this, this.updataProgressMask2);
                this.updataProgressMask2(index, skillId);
                utils.timer.loop(200, this, this.updataProgressMask2, true, index, skillId);
            }
            else {
                utils.timer.clear(this, this.updataProgressMask3);
                this.updataProgressMask3(index, skillId);
                utils.timer.loop(200, this, this.updataProgressMask3, true, index, skillId);
            }
        };
        // private onTiaoGuoClick(): void {
        //     GameModels.common.tiaoguoTag = true;
        //     GameModels.scene.notifyStoryEnd(1);
        // }
        CopyUnionSkillItem.prototype.onJiaSuClick = function () {
            if (GameModels.platform.isPay && GameModels.user.player.level < 35 && GameModels.user.player.vip < 1) {
                mg.alertManager.tip(Language.J_35JHVIP1KQJS);
                return;
            }
            if (!GameModels.user.player.battleSpeedRate) {
                //发送加速
                this.btnJiaSu.source = "legionSkill_json.btn_legionSkill_double";
                for (var i = 0; i < this._totalTime.length; i++) {
                    this._totalTime[i] = this._totalTime[i] / this._rate;
                    this._lastTime[i] = this._lastTime[i] / this._rate;
                }
                GameModels.scene.sceneNotifyBattleSetting(1);
                mg.guideManager.guideStopImmediately(this.btnJiaSu);
                if (GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_9) <= 0) {
                    GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_9);
                }
            }
            else {
                //发送不加速
                this.btnJiaSu.source = "legionSkill_json.btn_legionSkill_one";
                for (var i = 0; i < this._totalTime.length; i++) {
                    this._totalTime[i] = this._totalTime[i] * this._rate;
                    this._lastTime[i] = this._lastTime[i] * this._rate;
                }
                GameModels.scene.sceneNotifyBattleSetting(0);
            }
        };
        CopyUnionSkillItem.prototype.onAutoClick = function () {
            if (GameModels.chapter.data.Id < 1001006) {
                mg.alertManager.tip(Language.J_DLGKQ);
                return;
            }
            var autoIndex = game.state.getItem(GameModels.user.player.uid, TypeSetting.AUTO_PLAY_SKILL);
            if (autoIndex) {
                game.state.setItem(GameModels.user.player.uid, TypeSetting.AUTO_PLAY_SKILL, autoIndex == 1 ? 2 : 1);
                // game.state.setItem(GameModels.user.player.uid, TypeSetting.CLICK_AUTO_SKILL, true);
                this.showAutoPlaySkillState();
                if (this._currCampJibanTemp) {
                    this.stopGuide();
                    this.autoPlaySkill();
                }
            }
        };
        /**发送释放节能 */
        CopyUnionSkillItem.prototype.syncUseXP = function (index, skillId) {
            logger.log("告诉服务器是要放阵营技了{" + "skillId=" + skillId + "index=" + index + "}");
            GameModels.scene.syncUseXP(skillId);
            this._isShiFang[index] = true;
            this._effectArr[index].visible = false;
            this._lastTime[index] = 0;
            this.drawXpProgress(this._xpMaskArr[index], 0);
            this._cdCount = 3;
            utils.timer.clear(this, this.updataProgressMask1);
            utils.timer.clear(this, this.updataProgressMask2);
            utils.timer.clear(this, this.updataProgressMask3);
            utils.timer.clear(this, this.closeTimeUpdateHandler);
            this.closeTimeUpdateHandler();
            utils.timer.loop(1000, this, this.closeTimeUpdateHandler);
        };
        /**自动释放技能 */
        CopyUnionSkillItem.prototype.autoPlaySkill = function () {
            var autoIndex = game.state.getItem(GameModels.user.player.uid, TypeSetting.AUTO_PLAY_SKILL);
            if (autoIndex && autoIndex == 2) {
                var strArr = this._currCampJibanTemp.skill.split(";");
                for (var i = this._skillIconList.length - 1; i >= 0; i--) {
                    if (strArr[i] && this._lastTime[i] >= this._totalTime[i] && this._cdCount <= 0 && this._isShiFang[i] == false) {
                        this.syncUseXP(i, parseInt(strArr[i]));
                        //this.playProgress(i, parseInt(strArr[i]));
                    }
                }
            }
        };
        /**自动手动的显示状态 */
        CopyUnionSkillItem.prototype.showAutoPlaySkillState = function () {
            var autoIndex = game.state.getItem(GameModels.user.player.uid, TypeSetting.AUTO_PLAY_SKILL);
            if (autoIndex) {
                if (autoIndex == 1) {
                    this.btnAuto.source = "legionSkill_json.btn_legionSkill_zidong";
                }
                else {
                    this.btnAuto.source = "legionSkill_json.btn_legionSkill_shoudong";
                }
            }
            else {
                game.state.setItem(GameModels.user.player.uid, TypeSetting.AUTO_PLAY_SKILL, 1);
                this.btnAuto.source = "legionSkill_json.btn_legionSkill_zidong";
            }
        };
        /**第一个技能进度条 */
        CopyUnionSkillItem.prototype.updataProgressMask1 = function (index, skillId) {
            if (skillId === void 0) { skillId = 0; }
            if (this._isShiFang[index] == true) {
                this.drawXpProgress(this._xpMaskArr[index], 0);
                return;
            }
            var autoIndex = game.state.getItem(GameModels.user.player.uid, TypeSetting.AUTO_PLAY_SKILL);
            if (this._lastTime[index] > this._totalTime[index]) {
                utils.timer.clear(this, this.updataProgressMask1);
                this.drawXpProgress(this._xpMaskArr[index], 360);
                this._effectArr[index].visible = true;
                if (autoIndex && autoIndex == 2 && skillId && this._isShiFang[index] == false) {
                    this.syncUseXP(index, skillId);
                    //this.playProgress(index, skillId);
                }
                else {
                    this.startGuide();
                }
                return;
            }
            this.drawXpProgress(this._xpMaskArr[index], (this._lastTime[index] / this._totalTime[index]) * 360);
            this._lastTime[index] = this._lastTime[index] + 200;
        };
        /**第二个技能进度条 */
        CopyUnionSkillItem.prototype.updataProgressMask2 = function (index, skillId) {
            if (skillId === void 0) { skillId = 0; }
            if (this._isShiFang[index] == true) {
                this.drawXpProgress(this._xpMaskArr[index], 0);
                return;
            }
            var autoIndex = game.state.getItem(GameModels.user.player.uid, TypeSetting.AUTO_PLAY_SKILL);
            if (this._lastTime[index] > this._totalTime[index]) {
                utils.timer.clear(this, this.updataProgressMask2);
                this.drawXpProgress(this._xpMaskArr[index], 360);
                this._effectArr[index].visible = true;
                if (autoIndex && autoIndex == 2 && skillId && this._isShiFang[index] == false) {
                    this.syncUseXP(index, skillId);
                    //this.playProgress(index, skillId);
                }
                return;
            }
            this.drawXpProgress(this._xpMaskArr[index], (this._lastTime[index] / this._totalTime[index]) * 360);
            this._lastTime[index] = this._lastTime[index] + 200;
        };
        /**第三个技能进度条 */
        CopyUnionSkillItem.prototype.updataProgressMask3 = function (index, skillId) {
            if (skillId === void 0) { skillId = 0; }
            if (this._isShiFang[index] == true) {
                this.drawXpProgress(this._xpMaskArr[index], 0);
                return;
            }
            var autoIndex = game.state.getItem(GameModels.user.player.uid, TypeSetting.AUTO_PLAY_SKILL);
            if (this._lastTime[index] > this._totalTime[index]) {
                utils.timer.clear(this, this.updataProgressMask3);
                this.drawXpProgress(this._xpMaskArr[index], 360);
                this._effectArr[index].visible = true;
                if (autoIndex && autoIndex == 2 && skillId && this._isShiFang[index] == false) {
                    this.syncUseXP(index, skillId);
                    //this.playProgress(index, skillId);
                }
                return;
            }
            this.drawXpProgress(this._xpMaskArr[index], (this._lastTime[index] / this._totalTime[index]) * 360);
            this._lastTime[index] = this._lastTime[index] + 200;
        };
        /**公共cd倒计时 */
        CopyUnionSkillItem.prototype.closeTimeUpdateHandler = function () {
            if (this._cdCount <= 0) {
                utils.timer.clear(this, this.closeTimeUpdateHandler);
                this._cdCount = 0;
                for (var i = 0; i < this._time.length; i++) {
                    this._time[i].text = "";
                    this._skillLockMask[i].visible = false;
                }
                if (this._currCampJibanTemp) {
                    var strArr = this._currCampJibanTemp.skill.split(";");
                    for (var i = 0; i < this._skillIconList.length; i++) {
                        if (strArr[i] && this._isShiFang[i] == false) {
                            this.startMaskProgress(i, parseInt(strArr[i]));
                        }
                    }
                    this.autoPlaySkill();
                }
                return;
            }
            for (var i = 0; i < this._time.length; i++) {
                if (this._skillLockList[i] && !this._skillLockList[i].visible) {
                    this._time[i].text = "" + this._cdCount;
                    this._skillLockMask[i].visible = true;
                }
            }
            this._cdCount--;
        };
        CopyUnionSkillItem.prototype.btnTouchHandler = function (e) {
            if (!this._currCampJibanTemp) {
                for (var i = 0; i < this._groupArr.length; i++) {
                    if (e.currentTarget == this._groupArr[i]) {
                        mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: i + 1, config: this._currCampJibanTemp });
                        break;
                    }
                }
                return;
            }
            var strArr = this._currCampJibanTemp.skill.split(";");
            for (var i = 0; i < this._groupArr.length; i++) {
                if (e.currentTarget == this._groupArr[i]) {
                    switch (e.type) {
                        case egret.TouchEvent.TOUCH_BEGIN:
                            egret.Tween.removeTweens(this._groupArr[i]);
                            this._groupArr[i].scaleX = this._groupArr[i].scaleY = 1;
                            egret.Tween.get(this._groupArr[i]).to({ scaleX: 0.9, scaleY: 0.9 }, 300, utils.Ease.cubicOut);
                            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.btnTouchHandler, this);
                            break;
                        case egret.TouchEvent.TOUCH_END:
                            egret.Tween.removeTweens(this._groupArr[i]);
                            egret.Tween.get(this._groupArr[i]).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.cubicOut);
                            if (this.stage)
                                this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.btnTouchHandler, this);
                            break;
                        case egret.TouchEvent.TOUCH_TAP:
                            if (strArr[i]) {
                                if (this._lastTime[i] >= this._totalTime[i] && this._cdCount <= 0 && this._isShiFang[i] == false) {
                                    this.syncUseXP(i, parseInt(strArr[i]));
                                    this.stopGuide();
                                    //this.playProgress(i, parseInt(strArr[i]));
                                }
                                else {
                                    if (this._isShiFang[i] == true) {
                                        mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: i + 1, config: this._currCampJibanTemp });
                                        //mg.alertManager.tip(Language.J_MCZDZNSFYC);
                                    }
                                    else {
                                        mg.alertManager.tip(Language.J_JNLQZ);
                                    }
                                }
                            }
                            else {
                                mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: i + 1, config: this._currCampJibanTemp });
                            }
                            break;
                    }
                }
            }
        };
        return CopyUnionSkillItem;
    }(ui.CopyUnionSkillItemSkin));
    copy.CopyUnionSkillItem = CopyUnionSkillItem;
    __reflect(CopyUnionSkillItem.prototype, "copy.CopyUnionSkillItem");
})(copy || (copy = {}));
