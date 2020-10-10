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
    var SkillEffectBase = (function (_super) {
        __extends(SkillEffectBase, _super);
        //释法特效		
        //private _releaseResId:string = "0";
        //命中特效
        //private _hitResId:string = "0";
        //protected _releaseEffect: AnimationSprite;
        //protected _hitEffect: AnimationSprite;
        //public constructor(type:number, hitResId:string = "0", releaseResId:string = "0") {
        function SkillEffectBase(type) {
            var _this = _super.call(this, type) || this;
            _this._fullDirect = false;
            _this._closeEffect = false;
            return _this;
            //this._hitResId = hitResId;
            //this._releaseResId = releaseResId;
        }
        SkillEffectBase.prototype.reset = function () {
            _super.prototype.reset.call(this);
            //this.removeAllEffect();
        };
        SkillEffectBase.prototype.start = function () {
            _super.prototype.start.call(this);
            this.playReleaseEffect();
        };
        SkillEffectBase.prototype.addBoom = function (resId, addToFront, x, y, frameRate, rotation) {
            if (frameRate === void 0) { frameRate = 12; }
            if (rotation === void 0) { rotation = 0; }
            if (this._closeEffect)
                return;
            //if (!this._body) return;
            if (this._body && !this._body.avatarEnabled)
                return;
            if (resId == "" || resId == "0")
                return;
            var boom = utils.ObjectPool.from(s.AnimationSprite);
            boom.resId = resId;
            boom.frameRate = frameRate;
            boom.x = x;
            boom.y = y;
            if (addToFront) {
                app.gameContext.scene.addEffectFront(boom);
            }
            else {
                app.gameContext.scene.addEffectBehind(boom);
            }
            boom.play();
            boom.onComplete(this, this.boomOverHandler, boom);
        };
        SkillEffectBase.prototype.boomOverHandler = function (boom) {
            boom.offAllComplete();
            boom.stop();
            boom.resId = null;
            app.gameContext.scene.removeEffect(boom);
            utils.ObjectPool.to(boom);
        };
        SkillEffectBase.prototype.addDirectBoom = function (resId, addToFront, x, y, direct, frameRate) {
            if (frameRate === void 0) { frameRate = 12; }
            if (this._closeEffect)
                return;
            if (this._body && !this._body.avatarEnabled)
                return;
            if (resId == "" || resId == "0")
                return;
            var boom = utils.ObjectPool.from(s.DirectAnimationSprite);
            boom.initialize(game.TypeAnimaAsset.EFFECT_DIRECT_5, true, this._fullDirect);
            boom.setResId(resId);
            boom.frameRate = frameRate;
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
        SkillEffectBase.prototype.directBoomOverHandler = function (boom) {
            if (this._closeEffect)
                return;
            boom.offAllComplete();
            boom.stop();
            boom.setResId("");
            app.gameContext.scene.removeEffect(boom);
            utils.ObjectPool.to(boom);
        };
        SkillEffectBase.prototype.addFontEffect = function (resId, x, y, frameRate) {
            if (frameRate === void 0) { frameRate = 12; }
            if (this._closeEffect)
                return;
            if (this._body && !this._body.avatarEnabled)
                return;
            if (resId == "" || resId == "0")
                return;
            var boom = utils.ObjectPool.from(s.AnimationSprite);
            boom.resId = resId;
            boom.frameRate = frameRate;
            boom.x = x;
            boom.y = y;
            app.gameContext.scene.battleFontContainer.addChild(boom);
            boom.play();
            boom.onComplete(this, this.fontEffectOverHandler, boom);
        };
        SkillEffectBase.prototype.fontEffectOverHandler = function (boom) {
            boom.offAllComplete();
            boom.gotoAndStopEnd();
            boom.resId = null;
            if (boom.parent)
                boom.parent.removeChild(boom);
            utils.ObjectPool.to(boom);
        };
        SkillEffectBase.prototype.playReleaseEffect = function () {
            if (this._closeEffect)
                return;
            if (this._body == null)
                return;
            if (this._template.releaseEffect != "" && this._template.releaseEffect != "0") {
                var resIdArr = this._template.releaseEffect.split(";");
                this.addBoom(resIdArr[0], true, this._body.x, this._body.y);
                if (resIdArr.length > 1) {
                    this.addBoom(resIdArr[1], false, this._body.x, this._body.y);
                }
            }
        };
        SkillEffectBase.prototype.playHitEffect = function (fs, targetCount) {
            if (this._closeEffect)
                return;
            if (fs == null)
                return;
            if (targetCount <= 1) {
                this.doPlayHitEffect(fs.x, fs.y, this._template.hitEffect);
            }
            else {
                var delayTime = Math.floor(Math.random() * 200);
                utils.timer.once(delayTime, this, this.doPlayHitEffect, false, fs.x, fs.y, this._template.hitEffect);
            }
        };
        SkillEffectBase.prototype.doPlayHitEffect = function (x, y, hitEffect) {
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
        SkillEffectBase.prototype.doHurt = function () {
            if (this._closeEffect)
                return;
            var that = this;
            if (!that._body.vo)
                return;
            var targetList = that.getTargetList();
            var targetCount = targetList.length;
            if (s.TypeSkill.isLockEnemy(this.getLockTarget())) {
                for (var _i = 0, targetList_1 = targetList; _i < targetList_1.length; _i++) {
                    var target = targetList_1[_i];
                    that.playHitEffect(target, targetCount); //播放击中特效
                }
            }
            else {
                for (var _a = 0, targetList_2 = targetList; _a < targetList_2.length; _a++) {
                    var target = targetList_2[_a];
                    that.playHitEffect(target, targetCount); //播放击中特效
                    battle.manager.skillRecover(target, that._body.vo.attack, this._template);
                }
            }
            if (this._template.skillType == 3) {
                this.shockScreen(1200); //援军技阵屏效果
            }
        };
        /**震屏 */
        SkillEffectBase.prototype.shockScreen = function (time) {
            if (this._closeEffect)
                return;
            utils.TweenUtil.shock(mg.layerManager.map, time, 20);
        };
        /**碎屏 */
        SkillEffectBase.prototype.splitScreen = function () {
            if (this._closeEffect)
                return;
            if (this._body == null)
                return;
            this.addFontEffect("1102", this._body.x, this._body.y - 150, 6);
            this.addFontEffect("1101", this._body.x, this._body.y - 150, 6);
        };
        /**击退 */
        SkillEffectBase.prototype.beatBack = function () {
            if (this._closeEffect)
                return;
            if (!this._target)
                return;
            if (this._target.type == TypeActor.MONSTER || this._target.type == TypeActor.BOSS) {
                this._target.setBeatBackState(this._body);
            }
        };
        return SkillEffectBase;
    }(s.SkillBase));
    s.SkillEffectBase = SkillEffectBase;
    __reflect(SkillEffectBase.prototype, "s.SkillEffectBase");
})(s || (s = {}));
