var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var SkillShowBase = (function () {
        function SkillShowBase(effectType) {
            this.autoRecover = true;
            this.toPoolTime = 0;
            this._closeEffect = false;
            this._fullDirect = false;
            this._releaseEffect = "";
            this._flyEffect = "";
            this._hitEffect = "";
            this._effectType = effectType;
        }
        Object.defineProperty(SkillShowBase.prototype, "type", {
            get: function () {
                return this._effectType;
            },
            enumerable: true,
            configurable: true
        });
        SkillShowBase.prototype.initialize = function (body, target, targetList, releaseEffect, flyEffect, hitEffect) {
            var that = this;
            that._body = body;
            that._scene = body.scene;
            that._target = target;
            that._targetList = targetList;
            that._model = body.getModel();
            //that._releaseEffect = "0";//releaseEffect;
            that._releaseEffect = releaseEffect;
            that._flyEffect = flyEffect;
            that._hitEffect = hitEffect;
            that.createEffect();
        };
        SkillShowBase.prototype.createEffect = function () {
            /*var that:SkillShowBase=this;
            var effectStr:string = "";
            if(TypeSkill.TYPE_SKILL_NORMAL == that._skillType)
            {
                effectStr = that._model.skillEffect0;
            }
            else if(TypeSkill.TYPE_SKILL_SMALL == that._skillType)
            {
                effectStr = that._model.skillEffect1;
            }
            else if(TypeSkill.TYPE_SKILL_BIG == that._skillType)
            {
                effectStr = that._model.skillEffect2;
            }
            else if(TypeSkill.TYPE_SKILL_SPECIAL == that._skillType)
            {
                effectStr = that._model.skillEffect4;
            }
            if(effectStr != "" && effectStr != "0")
            {
                var arr:string[] = effectStr.split("|");
                that._releaseEffect = arr[0];
                that._flyEffect = arr[1];
                that._hitEffect = arr[2];
            }*/
        };
        SkillShowBase.prototype.start = function () {
            this.playReleaseEffect(); //播放释法特效
            this.readyDoHurt();
        };
        SkillShowBase.prototype.reset = function () {
            this.autoRecover = true;
            utils.timer.clear(this, this.end);
            utils.timer.clear(this, this.doHurt);
        };
        SkillShowBase.prototype.destory = function () {
            var that = this;
            that._body = null;
            that._scene = null;
            that._targetList = null;
            that._model = null;
        };
        SkillShowBase.prototype.end = function () {
            utils.timer.clear(this, this.end);
        };
        SkillShowBase.prototype.readyDoHurt = function () {
            //utils.timer.once(300, this, this.doHurt);
            var delayHurt = 300;
            var effectData = Templates.getTemplateById(templates.Map.EFFECT, this._hitEffect);
            if (effectData) {
                delayHurt -= 50 * (effectData.hitFrame - 1);
            }
            if (delayHurt <= 0) {
                this.doHurt();
            }
            else {
                utils.timer.once(delayHurt, this, this.doHurt);
            }
        };
        SkillShowBase.prototype.rockAfter = function () {
        };
        SkillShowBase.prototype.getScale = function () {
            if (TypeGame.isFormationGame()) {
                return 1.0;
            }
            return 0.65;
        };
        SkillShowBase.prototype.addBoom = function (resId, addToFront, x, y, frameRate, rotation) {
            if (frameRate === void 0) { frameRate = 10; }
            if (rotation === void 0) { rotation = 0; }
            if (this._closeEffect)
                return;
            if (this._body && !this._body.isNeedShowEffect())
                return;
            if (resId == "" || resId == "0")
                return;
            var boom = utils.ObjectPool.from(s.AnimationSprite);
            boom.resId = resId;
            boom.frameRate = GameModels.user.player.battleSpeedRate == 0 ? frameRate : frameRate * 2;
            boom.x = x;
            boom.y = y;
            logger.error("resId=" + resId + ";x" + x + ";y=" + y);
            if (addToFront) {
                app.gameContext.scene.addEffectFront(boom);
            }
            else {
                app.gameContext.scene.addEffectBehind(boom);
            }
            boom.scaleX = boom.scaleY = this.getScale();
            boom.play();
            boom.onComplete(this, this.boomOverHandler, boom);
        };
        SkillShowBase.prototype.boomOverHandler = function (boom) {
            boom.offAllComplete();
            boom.stop();
            boom.scaleX = boom.scaleY = 1.0;
            boom.resId = null;
            app.gameContext.scene.removeEffect(boom);
            utils.ObjectPool.to(boom);
        };
        SkillShowBase.prototype.addDirectBoom = function (resId, addToFront, x, y, direct, frameRate) {
            if (frameRate === void 0) { frameRate = 12; }
            if (this._closeEffect)
                return;
            if (this._body && !this._body.isNeedShowEffect())
                return;
            if (resId == "" || resId == "0")
                return;
            var boom = utils.ObjectPool.from(s.DirectAnimationSprite);
            boom.initialize(game.TypeAnimaAsset.EFFECT_DIRECT_5, true, this._fullDirect);
            boom.scaleX = boom.scaleY = this.getScale();
            boom.setResId(resId);
            boom.frameRate = GameModels.user.player.battleSpeedRate == 0 ? frameRate : frameRate * 2;
            boom.x = x;
            boom.y = y;
            boom.direct = direct;
            if (addToFront) {
                app.gameContext.scene.addEffectFront(boom);
            }
            else {
                app.gameContext.scene.addEffectBehind(boom);
            }
            boom.play();
            boom.onComplete(this, this.directBoomOverHandler, boom);
        };
        SkillShowBase.prototype.directBoomOverHandler = function (boom) {
            if (this._closeEffect)
                return;
            boom.offAllComplete();
            boom.stop();
            boom.scaleX = boom.scaleY = 1.0;
            boom.setResId("");
            app.gameContext.scene.removeEffect(boom);
            utils.ObjectPool.to(boom);
        };
        SkillShowBase.prototype.addFontEffect = function (resId, x, y, frameRate) {
            if (frameRate === void 0) { frameRate = 12; }
            if (this._closeEffect)
                return;
            if (this._body && !this._body.isNeedShowEffect())
                return;
            if (resId == "" || resId == "0")
                return;
            var boom = utils.ObjectPool.from(s.AnimationSprite);
            boom.resId = resId;
            boom.frameRate = GameModels.user.player.battleSpeedRate == 0 ? frameRate : frameRate * 2;
            boom.x = x;
            boom.y = y;
            app.gameContext.scene.battleFontContainer.addChild(boom);
            boom.play();
            boom.onComplete(this, this.fontEffectOverHandler, boom);
        };
        SkillShowBase.prototype.fontEffectOverHandler = function (boom) {
            boom.offAllComplete();
            boom.gotoAndStopEnd();
            boom.resId = null;
            if (boom.parent)
                boom.parent.removeChild(boom);
            utils.ObjectPool.to(boom);
        };
        SkillShowBase.prototype.playReleaseEffect = function () {
            if (this._closeEffect)
                return;
            if (this._body == null)
                return;
            if (this._releaseEffect != "" && this._releaseEffect != "0") {
                var resIdArr = this._releaseEffect.split(";");
                this.addBoom(resIdArr[0], true, this._body.x, this._body.y);
                if (resIdArr.length > 1) {
                    this.addBoom(resIdArr[1], false, this._body.x, this._body.y);
                }
            }
        };
        SkillShowBase.prototype.playHitEffect = function (fs, targetCount) {
            if (this._closeEffect)
                return;
            if (fs == null)
                return;
            if (targetCount <= 1) {
                this.doPlayHitEffect(fs.x, fs.y, this._hitEffect);
            }
            else {
                var delayTime = Math.floor(Math.random() * 200);
                utils.timer.once(delayTime, this, this.doPlayHitEffect, false, fs.x, fs.y, this._hitEffect);
            }
        };
        SkillShowBase.prototype.doPlayHitEffect = function (x, y, hitEffect) {
            if (this._closeEffect)
                return;
            if (hitEffect != "" && hitEffect != "0") {
                var resIdArr = hitEffect.split(";");
                this.addBoom(resIdArr[0], true, x, y);
                if (resIdArr.length > 1) {
                    this.addBoom(resIdArr[1], false, x, y);
                }
            }
        };
        SkillShowBase.prototype.doHurt = function () {
            utils.timer.once(1500, this, this.end); //回收
            if (this._closeEffect)
                return;
            var that = this;
            if (!that._body.vo)
                return;
            var targetList = that._targetList;
            var targetCount = targetList.length;
            for (var _i = 0, targetList_1 = targetList; _i < targetList_1.length; _i++) {
                var fs = targetList_1[_i];
                that.playHitEffect(fs, targetList.length); //播放击中特效
            }
            var effectData = Templates.getTemplateById(templates.Map.EFFECT, this._hitEffect);
            if (effectData && effectData.hitSound > 0) {
                mg.soundManager.playSound("" + effectData.hitSound);
            }
            //if(this._skillType == TypeSkill.TYPE_SKILL_BIG)
            {
                //this.shockScreen(1200); //援军技阵屏效果
            }
        };
        /**震屏 */
        SkillShowBase.prototype.shockScreen = function (time) {
            if (this._closeEffect)
                return;
            utils.TweenUtil.shock(mg.layerManager.map, time, 20);
        };
        /**碎屏 */
        SkillShowBase.prototype.splitScreen = function () {
            if (this._closeEffect)
                return;
            if (this._body == null)
                return;
            this.addFontEffect("1102", this._body.x, this._body.y - 150, 6);
            this.addFontEffect("1101", this._body.x, this._body.y - 150, 6);
        };
        return SkillShowBase;
    }());
    s.SkillShowBase = SkillShowBase;
    __reflect(SkillShowBase.prototype, "s.SkillShowBase", ["utils.IPool"]);
})(s || (s = {}));
