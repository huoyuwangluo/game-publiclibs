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
var battle;
(function (battle) {
    var BattleFontType = (function () {
        function BattleFontType() {
        }
        BattleFontType.getTag = function (type) {
            switch (type) {
                case BattleFontType.FONT_SHANBI: return "x_sb";
                case BattleFontType.FONT_WUDI: return "x_wd";
                case BattleFontType.FONT_BAOJI: return "x_bj";
                case BattleFontType.FONT_HUDUN: return "x_xs";
                case BattleFontType.FONT_FENTAN: return "x_ft";
                case BattleFontType.FONT_ZUIJI: return "x_zj";
                case BattleFontType.FONT_FANSHANG: return "x_fs";
                //case BattleFontType.FONT_DIANRAN: return "x_dr";
                //case BattleFontType.FONT_LIUXUE: return "x_lx";
                //case BattleFontType.FONT_DIANLIU: return "x_dl";
                case BattleFontType.FONT_KEZHI: return "x_kz";
            }
            return "";
        };
        BattleFontType.getTagNumName = function (type) {
            switch (type) {
                case BattleFontType.FONT_NONE: return "x_sh";
                case BattleFontType.FONT_BAOJI: return "x_bj";
                case BattleFontType.FONT_HUIXUE: return "x_zl";
                case BattleFontType.FONT_FENTAN: return "x_ft";
                case BattleFontType.FONT_HUDUN: return "x_ft";
                case BattleFontType.FONT_ZUIJI: return "x_fs";
                case BattleFontType.FONT_FANSHANG: return "x_fs";
                case BattleFontType.FONT_DIANRAN: return "x_cx";
                case BattleFontType.FONT_LIUXUE: return "x_cx";
                case BattleFontType.FONT_DIANLIU: return "x_cx";
                case BattleFontType.FONT_KEZHI: return "x_fs";
                case BattleFontType.FONT_WUSHUANG: return "x_bj";
                case BattleFontType.FONT_ZHONGDU: return "x_cx";
            }
            return "x_sh";
        };
        BattleFontType.FONT_NONE = 0; //无前缀
        BattleFontType.FONT_BAOJI = 1; //暴击
        BattleFontType.FONT_HUIXUE = 2; //回血
        BattleFontType.FONT_HUDUN = 3; //护盾吸收
        BattleFontType.FONT_FENTAN = 4; //护盾吸收
        BattleFontType.FONT_ZUIJI = 5; //追击
        BattleFontType.FONT_FANSHANG = 6; //反击,反弹等反伤
        BattleFontType.FONT_DIANRAN = 7; //持续伤害，点燃
        BattleFontType.FONT_LIUXUE = 8; //持续伤害，流血
        BattleFontType.FONT_DIANLIU = 9; //延时伤害，电流
        BattleFontType.FONT_KEZHI = 10; //克制
        BattleFontType.FONT_WUSHUANG = 11; //无双
        BattleFontType.FONT_ZHONGDU = 12; //持续伤害，中毒
        BattleFontType.FONT_SHANBI = 21; //闪避
        BattleFontType.FONT_WUDI = 22; //无敌
        BattleFontType.FONT_BUFF = 101; //BUFF飘字
        BattleFontType.FONT_SKILL = 201; //SKILL飘字
        return BattleFontType;
    }());
    battle.BattleFontType = BattleFontType;
    __reflect(BattleFontType.prototype, "battle.BattleFontType");
    var BattlePool = (function () {
        function BattlePool() {
        }
        BattlePool.hasRes = function () {
            return RES.hasRes('battle_font_json');
        };
        BattlePool.fromImagePool = function () {
            var item = utils.ObjectPool.from(BattleImage);
            item.alpha = 1;
            return item;
        };
        BattlePool.toImagePool = function (v) {
            v.reset();
            utils.ObjectPool.to(v);
        };
        BattlePool.fromFontPool = function () {
            var item = utils.ObjectPool.from(BattleFont);
            item.alpha = 1;
            return item;
        };
        BattlePool.toFontPool = function (v) {
            v.reset();
            utils.ObjectPool.to(v);
        };
        return BattlePool;
    }());
    battle.BattlePool = BattlePool;
    __reflect(BattlePool.prototype, "battle.BattlePool");
    var BattleImage = (function (_super) {
        __extends(BattleImage, _super);
        function BattleImage() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            return _this;
        }
        BattleImage.prototype.initialize = function (texture) {
            this.texture = texture;
        };
        BattleImage.prototype.reset = function () {
            this.texture = null;
        };
        return BattleImage;
    }(egret.Bitmap));
    battle.BattleImage = BattleImage;
    __reflect(BattleImage.prototype, "battle.BattleImage", ["utils.IPool"]);
    var BattleFont = (function (_super) {
        __extends(BattleFont, _super);
        function BattleFont() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this.touchEnabled = _this.touchChildren = false;
            return _this;
        }
        BattleFont.prototype.initialize = function (fontType, value, skillName) {
            if (value === void 0) { value = 0; }
            if (skillName === void 0) { skillName = ""; }
            var that = this;
            var tx = 0;
            var ty = 0;
            var title;
            var fontTypeTag = "";
            if (fontType == BattleFontType.FONT_SKILL) {
                fontTypeTag = "skill_bg";
                value = 0; //防止飘数字
            }
            else if (fontType == BattleFontType.FONT_BUFF) {
                fontTypeTag = "buff_" + value;
                value = 0; //防止飘数字
            }
            else {
                fontTypeTag = BattleFontType.getTag(fontType);
            }
            var hasTile = false;
            if (fontTypeTag != "") {
                title = BattlePool.fromImagePool();
                title.texture = that.getTexture(fontTypeTag);
                that.addChild(title);
                title.x = tx;
                title.y = 0;
                tx += title.texture ? title.texture.textureWidth : 0;
                hasTile = true;
                if (skillName != "") {
                    if (!that.skillTF) {
                        that.skillTF = new egret.TextField();
                        that.skillTF.size = 18;
                        that.skillTF.stroke = 2;
                        that.skillTF.textColor = 0xf6eac6;
                    }
                    that.skillTF.text = skillName;
                    //skillTF.anchorOffsetX = skillTF.width / 2;
                    //skillTF.anchorOffsetY = skillTF.height / 2;
                    that.skillTF.x = (tx - that.skillTF.textWidth) / 2 - 22;
                    that.skillTF.y = 8;
                    that.addChild(that.skillTF);
                }
            }
            if (value > 0) {
                value = value >> 0;
                var numStr = value.toString();
                var hpTypeTag = BattleFontType.getTagNumName(fontType);
                if (hpTypeTag == "x_sh") {
                    numStr = "-" + numStr;
                }
                else if (hpTypeTag == "x_zl") {
                    numStr = "+" + numStr;
                }
                for (var i = 0, length = numStr.length; i < length; i++) {
                    var bitmap = BattlePool.fromImagePool();
                    bitmap.texture = that.getTexture(hpTypeTag + "_" + numStr.charAt(i));
                    if (!bitmap.texture)
                        continue;
                    bitmap.x = tx;
                    bitmap.y = hasTile ? (title.height / 2 - bitmap.height / 2) : 0;
                    tx += bitmap.texture.textureWidth;
                    that.addChild(bitmap);
                }
            }
        };
        BattleFont.prototype.reset = function () {
            var that = this;
            if (that.skillTF) {
                that.removeChild(that.skillTF);
                that.skillTF.text = "";
            }
            while (that.numChildren) {
                BattlePool.toImagePool(that.removeChildAt(0));
            }
            this.alpha = 1.0;
            this.scaleX = this.scaleY = 1.0;
        };
        BattleFont.prototype.getTexture = function (name) {
            return RES.getRes("battle_font_json." + name);
        };
        return BattleFont;
    }(egret.DisplayObjectContainer));
    battle.BattleFont = BattleFont;
    __reflect(BattleFont.prototype, "battle.BattleFont", ["utils.IPool"]);
    var BattleManager = (function () {
        function BattleManager() {
            this._cachePoint = new egret.Point();
            /*private showProAdd(proAddStr: string, target: s.SmartObject) {
                if (!s.SceneConfig.BATTLE_TEXT_SHOW || !target.vo) return;
                var bitmapFont: BattleFont = BattlePool.fromFontPool();
                bitmapFont.initialize(BattleFontType.FONT_SKILL, 0, proAddStr);
                var scaleRate: number = this.getScale();
                bitmapFont.anchorOffsetX = bitmapFont.width / 2 - 22;
                bitmapFont.anchorOffsetY = bitmapFont.height / 2;
                app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
                bitmapFont.x = target.x + 22;
                bitmapFont.y = target.y - 220;
                bitmapFont.scaleX = bitmapFont.scaleY = scaleRate;
                var end1: number = bitmapFont.y - 120;
                //egret.Tween.get(bitmapFont).to({ y: end1, scaleX: 1.1*scaleRate, scaleY: 1.1*scaleRate }, 500, utils.Ease.cubicIn).to({ y: end2, scaleX: 1*scaleRate, scaleY: 1*scaleRate }, 600, utils.Ease.cubicOut).call(this.removeDamage, this, [bitmapFont]);
                //egret.Tween.get(bitmapFont).to({ y: end1, scaleX: scaleRate, scaleY: scaleRate }, 600, utils.Ease.quartOut).call(this.removeDamage, this, [bitmapFont]);
                egret.Tween.get(bitmapFont).to({ y: end1, scaleX: 1.0 * scaleRate, scaleY: 1.0 * scaleRate }, 1500, utils.Ease.quartOut).call(this.removeDamage, this, [bitmapFont]);
            }*/
            //技能飘字
            this.showSkillQueue = [];
            this.showSkillLastTime = {};
            this.showSkillInterval = 400;
            //天赋飘字
            this.showTalentQueue = [];
            this.showTalentLastTime = {};
            this.showTalentInterval = 500;
        }
        BattleManager.prototype.initialize = function (scene) {
            this._scene = scene;
        };
        /**
         * 回血
         * @param target 回血单位
         * @param hpbase 回血基本值
         * @param skillVO 使用的技能
         */
        BattleManager.prototype.skillRecover = function (target, hpbase, skill) {
            if (!TypeGame.isClientGame())
                return 0;
            var hp = (hpbase * (skill.coefficients) / 100 + skill.fixValue) >> 0;
            if (hp > 0) {
                this.hpRecover(target.vo, hp);
            }
            return hp;
        };
        BattleManager.prototype.getScale = function () {
            return TypeGame.isFormationGame() ? 2.0 : 1.0;
        };
        BattleManager.prototype.getMinScale = function () {
            return TypeGame.isFormationGame() ? 2.0 : 1.0;
        };
        /**
         * 技能伤害[后端传过来的伤害值]
         * @param target 被伤害单位
         * @param caster 伤害主体或者直接填写伤害值
         */
        BattleManager.prototype.skillHurtByServer = function (casterVO, targetVO, damage, fontType) {
            var that = this;
            if (!targetVO)
                return;
            if (!casterVO)
                return;
            //if (casterVO.stateDead) return;
            //if (targetVO.stateDead) return;
            var targetObject = app.gameContext.scene.getActorByVO(targetVO);
            if (!targetObject)
                return;
            if (!targetObject.avatarEnabled)
                return; //不显示外观时，飘血也不显示
            //开始飘字
            if (fontType == BattleFontType.FONT_SHANBI) {
                this.showDodge(targetVO);
            }
            else if (fontType == BattleFontType.FONT_WUDI) {
                this.showWuDi(targetVO);
            }
            else if (fontType == BattleFontType.FONT_BAOJI || fontType == BattleFontType.FONT_KEZHI || fontType == BattleFontType.FONT_ZUIJI) {
                this.showCrit(targetVO, damage, fontType, casterVO);
            }
            else if (fontType == BattleFontType.FONT_HUDUN || fontType == BattleFontType.FONT_FENTAN) {
                that.showGeDang(targetVO, damage, fontType, casterVO);
            }
            else if (fontType == BattleFontType.FONT_HUIXUE) {
                this.showRecover(targetVO, damage, fontType);
            }
            else if (fontType == BattleFontType.FONT_DIANRAN || fontType == BattleFontType.FONT_LIUXUE || fontType == BattleFontType.FONT_DIANLIU || fontType == BattleFontType.FONT_ZHONGDU) {
                this.showCXDamage(targetVO, damage, fontType);
            }
            else if (fontType == BattleFontType.FONT_WUSHUANG) {
                this.showXPDamage(targetVO, damage, casterVO);
            }
            else {
                that.showDamage(targetVO, damage, fontType, casterVO);
            }
            if (fontType == BattleFontType.FONT_NONE || fontType == BattleFontType.FONT_BAOJI) {
                if (targetObject)
                    targetObject.flash();
            }
        };
        BattleManager.prototype.isNeedPiaoZi = function (targetVO) {
            if (!app.gameContext.scene)
                return;
            if (!s.SceneConfig.BATTLE_TEXT_SHOW || !targetVO.isInitialize)
                return null;
            var targetObject = app.gameContext.scene.getActorByVO(targetVO);
            if (!targetObject)
                return null;
            if (!targetObject.avatarEnabled)
                return null; //不显示外观时，飘血也不显示
            if (TypeGame.isFormationGame() == false) {
                if (!app.gameContext.isMySelf(targetObject)) {
                    var gamePlayer = app.gameContext.scene.manager.player;
                    var teamTargetVO = gamePlayer.getTeamTargetVO();
                    if (targetVO.isSelfTeam(teamTargetVO)) {
                        return targetObject;
                    }
                    if (targetVO.master && gamePlayer.vo && gamePlayer.vo.isSelfTeam(targetVO.master.getTeamTarget())) {
                        return targetObject;
                    }
                    return null;
                }
            }
            //if (!app.gameContext.isMySelf(targetObject)) return false; //只显示自己的飘字
            return targetObject;
        };
        /*
        private isNeedPiaoZi(casterVO: vo.GameSmartVO, targetVO: vo.GameSmartVO) {
            return targetVO.effectEnabled;
            // if(casterVO instanceof vo.GamePetVO){
            // 	return (casterVO.master==GameModels.user.player)
            // }
            // return (casterVO.type!=TypeActor.MONSTER&&(casterVO==GameModels.user.player||targetVO==GameModels.user.player));
        }
        */
        /**
         * 回血后飘字
         *
         */
        BattleManager.prototype.hpRecover = function (bodyVO, hp, showFont) {
            if (showFont === void 0) { showFont = true; }
            if (bodyVO == null)
                return;
            bodyVO.hpRecover(hp);
            if (hp && showFont) {
                this.showRecover(bodyVO, hp, BattleFontType.FONT_HUIXUE);
            }
        };
        /*public hpHurt(bodyVO: vo.GameSmartVO, targetVO: vo.GameSmartVO, hp: number) {
            var body: s.SmartObject = app.gameContext.gameCurrent.getObjectByVO(bodyVO);
            var target: s.SmartObject = app.gameContext.gameCurrent.getObjectByVO(targetVO);
            if (body && target) {
                this.hpHurtHandler(body, target, hp);
                if (!this.isNeedPiaoZi(body.vo, target.vo)) {
                    this.showDamage(target.vo, hp, BattleFontType.HP_CDMG, body.vo);
                }
            }
        }*/
        /**扣血逻辑 */
        BattleManager.prototype.hpHurtHandler = function (body, target, hp) {
            if (body.type == TypeActor.PLAYER) {
                var mergePetVO = body.vo.getCurrentMergePet();
                if (mergePetVO) {
                    return mergePetVO.hpHurted(hp, target.vo);
                }
                if (hp <= 0)
                    return 0;
                body.hpHurted(hp, target.vo);
                return hp;
            }
            body.hpHurted(hp, target.vo);
            return hp;
        };
        /**显示天赋触发效果 */
        BattleManager.prototype.showSkillName = function (body, skillId) {
            //if (!this.isNeedPiaoZi(body.vo)) return;
            var skillTemplate = Templates.getTemplateById(templates.Map.SKILLNEW, skillId);
            if (!skillTemplate)
                return;
            if (skillTemplate.skillType != s.TypeSkill.TYPE_SKILL_NORMAL) {
                if (s.TypeSkill.isCampSkill(skillTemplate.skillType)) {
                    //this.showBigSkillFont(Math.floor(skillId/100)+"", body);
                    //this.showBigSkillFont(skillTemplate.name, body);
                    if (app.gameContext.isMySelf(body) || app.gameContext.isMyFriend(body)) {
                        var resId = Math.floor(skillId / 10) * 10 + 1;
                        copy.CopyMainView.instance.showXianTongEffect(resId);
                        mg.soundManager.playSound("camp_skill_" + resId, 1, true, true);
                    }
                }
                else if (s.TypeSkill.isBigSkill(skillTemplate.skillType)) {
                    //this.showBigSkillFont(Math.floor(skillId/100)+"", body);
                    this.showBigSkillFont(skillTemplate.name, body);
                    //this.showRightDefeatMovie(body);
                }
                else {
                    this.showSkillFont(skillTemplate.name, body);
                }
            }
        };
        /**显示BUFF飘字效果 */
        BattleManager.prototype.showBuff = function (bodyVO, buffTemplate) {
            if (!this.isNeedPiaoZi(bodyVO))
                return;
            if (buffTemplate.drifting > 0) {
                var moveDown = (buffTemplate.group == 2);
                this.showTalentFont(buffTemplate.drifting, bodyVO, moveDown);
            }
            if (buffTemplate.effectId > 0) {
                if (buffTemplate.effectPos > 10 && buffTemplate.effectPos < 20) {
                    this.showBuffEffect10_13(bodyVO, buffTemplate.effectPos, buffTemplate.effectId);
                }
                else if (buffTemplate.effectPos > 20 && buffTemplate.effectPos < 30) {
                    this.showBuffEffect20_23(bodyVO, buffTemplate.effectPos, buffTemplate.effectId);
                }
            }
        };
        BattleManager.prototype.showBuffEffect10_13 = function (targetVO, pos, effectId) {
            var scaleRate = this.getScale();
            var x = game.MapConfig.getReaX(targetVO.tileX);
            var y = game.MapConfig.getReaY(targetVO.tileY);
            if (pos == 11) {
                y = y - 120; //头顶飘特效
            }
            else if (pos == 12) {
                y = y - 60; //身上飘特效
            }
            var addToFront = (pos < 13);
            var boom = utils.ObjectPool.from(s.AnimationSprite);
            boom.scaleX = boom.scaleY = scaleRate;
            boom.resId = "" + effectId;
            boom.x = x;
            boom.y = y;
            boom.play();
            if (addToFront) {
                app.gameContext.scene.addEffectFront(boom);
            }
            else {
                app.gameContext.scene.addEffectBehind(boom);
            }
            boom.onComplete(this, this.removeBoom, boom);
        };
        BattleManager.prototype.showBuffEffect20_23 = function (targetVO, pos, effectId) {
            var scaleRate = this.getScale();
            var x = game.MapConfig.getReaX(targetVO.tileX);
            var y = game.MapConfig.getReaY(targetVO.tileY);
            var addToFront = (pos < 23);
            var boom = utils.ObjectPool.from(s.AnimationSprite);
            boom.scaleX = boom.scaleY = scaleRate;
            boom.resId = "" + effectId;
            boom.x = x;
            boom.y = y;
            boom.alpha = 0;
            boom.play();
            if (addToFront) {
                app.gameContext.scene.addEffectFront(boom);
            }
            else {
                app.gameContext.scene.addEffectBehind(boom);
            }
            egret.Tween.get(boom).to({ alpha: 1 }, 200, utils.Ease.quadIn).
                to({}, 1500, utils.Ease.linearNone).
                to({ alpha: 0 }, 300, utils.Ease.linearNone).call(this.removeBoom, this, [boom]);
            /*egret.Tween.get(boom).to({ }, 1500, utils.Ease.backOut).call(function (boom: s.AnimationSprite) {
                egret.Tween.get(boom).to({ alpha:0 }, 300, utils.Ease.quartIn).call(this.removeBoom, this, [boom]);
            }, this, [boom]);*/
        };
        BattleManager.prototype.removeBoom = function (boom) {
            boom.offAllComplete();
            boom.stop();
            boom.alpha = 1.0;
            boom.resId = null;
            app.gameContext.scene.removeEffect(boom);
            utils.ObjectPool.to(boom);
        };
        BattleManager.prototype.showDodge = function (targetVO) {
            if (!this.isNeedPiaoZi(targetVO))
                return;
            if (!BattlePool.hasRes())
                return;
            var scaleRate = this.getMinScale();
            var bitmapFont = BattlePool.fromFontPool();
            bitmapFont.initialize(BattleFontType.FONT_SHANBI);
            bitmapFont.scaleX = bitmapFont.scaleY = 1;
            bitmapFont.anchorOffsetX = bitmapFont.width / 2;
            bitmapFont.anchorOffsetY = bitmapFont.height / 2;
            app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
            bitmapFont.x = game.MapConfig.getReaX(targetVO.tileX);
            bitmapFont.y = game.MapConfig.getReaY(targetVO.tileY) - 60;
            var angle = -90;
            var end = utils.MathUtil.getLinePointByAngle(bitmapFont.x, bitmapFont.y, 100, angle, this._cachePoint);
            egret.Tween.get(bitmapFont).to({ x: end.x, y: end.y, scaleX: 1.2 * scaleRate, scaleY: 1.2 * scaleRate }, 500, utils.Ease.quartOut).call(this.removeDamage, this, [bitmapFont]);
        };
        BattleManager.prototype.showWuDi = function (targetVO) {
            if (!this.isNeedPiaoZi(targetVO))
                return;
            if (!BattlePool.hasRes())
                return;
            var scaleRate = this.getMinScale();
            var bitmapFont = BattlePool.fromFontPool();
            bitmapFont.initialize(BattleFontType.FONT_WUDI);
            bitmapFont.scaleX = bitmapFont.scaleY = scaleRate;
            bitmapFont.anchorOffsetX = bitmapFont.width / 2;
            bitmapFont.anchorOffsetY = bitmapFont.height / 2;
            app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
            bitmapFont.x = game.MapConfig.getReaX(targetVO.tileX);
            bitmapFont.y = game.MapConfig.getReaY(targetVO.tileY) - 60;
            var angle = -90;
            var end = utils.MathUtil.getLinePointByAngle(bitmapFont.x, bitmapFont.y, 100, angle, this._cachePoint);
            egret.Tween.get(bitmapFont).to({ x: end.x, y: end.y, scaleX: 1.2 * scaleRate, scaleY: 1.2 * scaleRate }, 500, utils.Ease.quartOut).call(this.removeDamage, this, [bitmapFont]);
        };
        BattleManager.prototype.showDamage = function (targetVO, damage, fontType, bodyVO) {
            if (!this.isNeedPiaoZi(targetVO))
                return;
            if (!BattlePool.hasRes())
                return;
            var scaleRate = this.getMinScale();
            var bitmapFont = BattlePool.fromFontPool();
            bitmapFont.initialize(fontType, damage);
            bitmapFont.scaleX = bitmapFont.scaleY = scaleRate;
            bitmapFont.anchorOffsetX = bitmapFont.width / 2;
            bitmapFont.anchorOffsetY = bitmapFont.height / 2;
            app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
            bitmapFont.x = game.MapConfig.getReaX(targetVO.tileX);
            bitmapFont.y = game.MapConfig.getReaY(targetVO.tileY) - 60;
            var angle = bodyVO ? utils.MathUtil.getAngle(targetVO.tileX - bodyVO.tileX, targetVO.tileY - bodyVO.tileY) : -90;
            angle += ((Math.random() * 20) - 10);
            var end = utils.MathUtil.getLinePointByAngle(bitmapFont.x, bitmapFont.y, 50 + ((Math.random() * 40) - 20), angle, this._cachePoint);
            egret.Tween.get(bitmapFont).to({ x: end.x, y: end.y, scaleX: scaleRate, scaleY: scaleRate }, 350, utils.Ease.quartOut).call(this.removeDamage, this, [bitmapFont]);
        };
        BattleManager.prototype.showRecover = function (targetVO, value, fontType) {
            if (!this.isNeedPiaoZi(targetVO))
                return;
            if (!BattlePool.hasRes())
                return;
            var scaleRate = this.getMinScale();
            var bitmapFont = BattlePool.fromFontPool();
            bitmapFont.initialize(fontType, value);
            bitmapFont.scaleX = bitmapFont.scaleY = scaleRate;
            bitmapFont.anchorOffsetX = bitmapFont.width / 2;
            bitmapFont.anchorOffsetY = bitmapFont.height / 2;
            app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
            bitmapFont.x = game.MapConfig.getReaX(targetVO.tileX);
            bitmapFont.y = game.MapConfig.getReaY(targetVO.tileY) - 60;
            var angle = -90;
            var end = utils.MathUtil.getLinePointByAngle(bitmapFont.x, bitmapFont.y, 100, angle, this._cachePoint);
            egret.Tween.get(bitmapFont).to({ x: end.x, y: end.y, scaleX: 1.2 * scaleRate, scaleY: 1.2 * scaleRate }, 500, utils.Ease.quartOut).call(this.removeDamage, this, [bitmapFont]);
        };
        BattleManager.prototype.showCXDamage = function (targetVO, value, fontType) {
            if (!this.isNeedPiaoZi(targetVO))
                return;
            if (!BattlePool.hasRes())
                return;
            var scaleRate = this.getMinScale();
            var bitmapFont = BattlePool.fromFontPool();
            bitmapFont.initialize(fontType, value);
            bitmapFont.scaleX = bitmapFont.scaleY = scaleRate;
            bitmapFont.anchorOffsetX = bitmapFont.width / 2;
            bitmapFont.anchorOffsetY = bitmapFont.height / 2;
            app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
            bitmapFont.x = game.MapConfig.getReaX(targetVO.tileX);
            bitmapFont.y = game.MapConfig.getReaY(targetVO.tileY) - 60;
            var angle = -90;
            var end = utils.MathUtil.getLinePointByAngle(bitmapFont.x, bitmapFont.y, 50, angle, this._cachePoint);
            egret.Tween.get(bitmapFont).to({ x: end.x, y: end.y, scaleX: 1.1 * scaleRate, scaleY: 1.1 * scaleRate }, 350, utils.Ease.quartOut).call(this.removeDamage, this, [bitmapFont]);
        };
        BattleManager.prototype.showCrit = function (targetVO, damage, fontType, bodyVO) {
            if (bodyVO === void 0) { bodyVO = null; }
            if (!this.isNeedPiaoZi(targetVO))
                return;
            if (!BattlePool.hasRes())
                return;
            var scaleRate = this.getMinScale();
            var bitmapFont = BattlePool.fromFontPool();
            bitmapFont.initialize(fontType, damage);
            bitmapFont.anchorOffsetX = bitmapFont.width / 2;
            bitmapFont.anchorOffsetY = bitmapFont.height / 2;
            app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
            bitmapFont.x = game.MapConfig.getReaX(targetVO.tileX) + (Math.random() * 40 - 20);
            bitmapFont.y = game.MapConfig.getReaY(targetVO.tileY) - 80 + (Math.random() * 40 - 20);
            bitmapFont.scaleX = bitmapFont.scaleY = 1.5 * scaleRate;
            egret.Tween.get(bitmapFont).to({ scaleX: 1.2 * scaleRate, scaleY: 1.2 * scaleRate }, 300, utils.Ease.backOut).call(function (bitmapFont) {
                egret.Tween.get(bitmapFont).to({ y: bitmapFont.y - 100, alpha: 0, scaleX: 1 * scaleRate, scaleY: 1 * scaleRate }, 500, utils.Ease.quartIn).call(this.removeDamage, this, [bitmapFont]);
            }, this, [bitmapFont]);
        };
        BattleManager.prototype.showGeDang = function (targetVO, damage, fontType, bodyVO) {
            if (bodyVO === void 0) { bodyVO = null; }
            if (!this.isNeedPiaoZi(targetVO))
                return;
            if (!BattlePool.hasRes())
                return;
            var scaleRate = this.getMinScale();
            var bitmapFont = BattlePool.fromFontPool();
            bitmapFont.initialize(fontType, damage);
            bitmapFont.anchorOffsetX = bitmapFont.width / 2;
            bitmapFont.anchorOffsetY = bitmapFont.height / 2;
            app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
            bitmapFont.x = game.MapConfig.getReaX(targetVO.tileX) + (Math.random() * 40 - 20);
            bitmapFont.y = game.MapConfig.getReaY(targetVO.tileY) - 80 + (Math.random() * 40 - 20);
            bitmapFont.scaleX = bitmapFont.scaleY = 1.2 * scaleRate;
            egret.Tween.get(bitmapFont).to({ scaleX: 1.0 * scaleRate, scaleY: 1.0 * scaleRate }, 200, utils.Ease.backOut).call(function (bitmapFont) {
                egret.Tween.get(bitmapFont).to({ y: bitmapFont.y - 60, alpha: 0, scaleX: 1 * scaleRate, scaleY: 1 * scaleRate }, 300, utils.Ease.quartIn).call(this.removeDamage, this, [bitmapFont]);
            }, this, [bitmapFont]);
            /*bitmapFont.x = game.MapConfig.getReaX(targetVO.tileX);
            bitmapFont.y = game.MapConfig.getReaY(targetVO.tileY) - 80;
            var angle: number = bodyVO ? utils.MathUtil.getAngle(targetVO.tileX - bodyVO.tileX, targetVO.tileY - bodyVO.tileY) : -90;
            var end: egret.Point = utils.MathUtil.getLinePointByAngle(bitmapFont.x, bitmapFont.y, 100, angle, this._cachePoint);
            bitmapFont.scaleX = bitmapFont.scaleY = scaleRate;
            egret.Tween.get(bitmapFont).to({ scaleX: 1.1 * scaleRate, scaleY: 1.1 * scaleRate }, 200, utils.Ease.backOut).
                to({ x: end.x, y: end.y, alpha: 0 }, 400, utils.Ease.quartIn).call(this.removeDamage, this, [bitmapFont]);*/
        };
        BattleManager.prototype.showXPDamage = function (targetVO, damage, bodyVO) {
            if (!this.isNeedPiaoZi(targetVO))
                return;
            if (!BattlePool.hasRes())
                return;
            var scaleRate = this.getMinScale();
            var bitmapFont = BattlePool.fromFontPool();
            bitmapFont.initialize(BattleFontType.FONT_WUSHUANG, damage);
            bitmapFont.anchorOffsetX = bitmapFont.width / 2;
            bitmapFont.anchorOffsetY = bitmapFont.height / 2;
            app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
            bitmapFont.x = game.MapConfig.getReaX(targetVO.tileX);
            bitmapFont.y = game.MapConfig.getReaY(targetVO.tileY) - 120;
            bitmapFont.scaleX = bitmapFont.scaleY = 2 * scaleRate;
            var angle = -90;
            var end = utils.MathUtil.getLinePointByAngle(bitmapFont.x, bitmapFont.y, 100, angle, this._cachePoint);
            egret.Tween.get(bitmapFont).to({ x: end.x, y: end.y, scaleX: 1.5 * scaleRate, scaleY: 1.5 * scaleRate }, 800, utils.Ease.quartOut).call(this.removeDamage, this, [bitmapFont]);
            //var angle: number = bodyVO ? utils.MathUtil.getAngle(targetVO.tileX - bodyVO.tileX, targetVO.tileY - bodyVO.tileY) : -90;
            //angle += ((Math.random() * 10) - 10);
            //var end: egret.Point = utils.MathUtil.getLinePointByAngle(bitmapFont.x, bitmapFont.y, 100 + ((Math.random() * 40) - 20), angle, this._cachePoint);
            //egret.Tween.get(bitmapFont).to({ x: end.x, y: end.y, scaleX: 1.5 * scaleRate, scaleY: 1.5 * scaleRate }, 1500, utils.Ease.quartOut).call(this.removeDamage, this, [bitmapFont]);
        };
        BattleManager.prototype.getEmptySupportMovie = function () {
            var ret = null;
            if (this._supportMovieList == null) {
                this._supportMovieList = [];
            }
            for (var _i = 0, _a = this._supportMovieList; _i < _a.length; _i++) {
                var movie = _a[_i];
                if (movie.parent == null) {
                    ret = movie;
                    break;
                }
            }
            if (ret == null) {
                if (this._supportMovieList.length > 10)
                    return null;
                ret = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                ret.resId = "big_skill";
                //ret.timeScale = 2.0;
                this._supportMovieList.push(ret);
            }
            return ret;
        };
        BattleManager.prototype.removeSupportMovie = function (mv) {
            //logger.error("removeSupportMovie");
            mv.stop();
            if (mv.parent) {
                mv.parent.removeChild(mv);
            }
        };
        BattleManager.prototype.showBigSkillFont = function (wz, target) {
            if (!this.isNeedPiaoZi(target.vo))
                return;
            var dataModel = target.getModel();
            if (!dataModel)
                return;
            var movie = this.getEmptySupportMovie();
            if (movie == null)
                return;
            var scaleRate = 1;
            movie.scaleX = movie.scaleY = scaleRate;
            var headPath = ResPath.getPetIconSmall(dataModel.resId + "");
            movie.replaceSlotImage("tx", headPath);
            var petConfigId = target.vo ? target.vo.petConfigId : 0;
            var petTpl = Templates.getTemplateById(templates.Map.GENERAL, petConfigId);
            var godDevil = petTpl ? petTpl.godDevil : 0;
            if (app.gameContext.isMyFriend(target)) {
                movie.replaceSlotTextField("wz", wz, 0);
                if (godDevil == 1) {
                    movie.replaceSlotDisplayIndex("bg", 2);
                    movie.replaceSlotDisplayIndex("bone", 1);
                }
                else if (godDevil == 2) {
                    movie.replaceSlotDisplayIndex("bg", 3);
                    movie.replaceSlotDisplayIndex("bone", 1);
                }
                else {
                    movie.replaceSlotDisplayIndex("bg", 0);
                    movie.replaceSlotDisplayIndex("bone", 0);
                }
            }
            else {
                movie.replaceSlotTextField("wz", wz, 1);
                if (godDevil > 0) {
                    movie.replaceSlotDisplayIndex("bg", 4);
                    movie.replaceSlotDisplayIndex("bone", 1);
                }
                else {
                    movie.replaceSlotDisplayIndex("bg", 1);
                    movie.replaceSlotDisplayIndex("bone", 0);
                }
            }
            movie.updateReplaceSlot();
            var p = app.gameContext.scene.localToGlobal(target.x, (target.y - target.titleHeight + 150));
            movie.x = p.x;
            movie.y = p.y;
            app.gameContext.scene.view.addChild(movie);
            movie.playOnce("newAnimation");
            movie.onCompleteOnce(this, this.removeSupportMovie);
        };
        BattleManager.prototype.showLeftDefeatMovie = function (target) {
            if (!this.isNeedPiaoZi(target.vo))
                return;
            var dataModel = target.getModel();
            if (!dataModel)
                return;
            if (this._leftHintMovie == null) {
                this._leftHintMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                this._leftHintMovie.resId = "defeat_owner";
            }
            var headPath = ResPath.getPetIconSmall(dataModel.resId);
            this._leftHintMovie.replaceSlotBitmap("tx", headPath);
            this._leftHintMovie.updateReplaceSlot();
            this._leftHintMovie.x = mg.stageManager.stage.stageWidth / 2 - 150;
            this._leftHintMovie.y = 400;
            mg.stageManager.stage.addChild(this._leftHintMovie);
            this._leftHintMovie.playOnce("newAnimation");
            this._leftHintMovie.onCompleteOnce(this, function () {
                this._leftHintMovie.stop();
                if (this._leftHintMovie.parent) {
                    this._leftHintMovie.parent.removeChild(this._leftHintMovie);
                }
            });
        };
        BattleManager.prototype.showRightDefeatMovie = function (target) {
            if (!this.isNeedPiaoZi(target.vo))
                return;
            var dataModel = target.getModel();
            if (!dataModel)
                return;
            if (this._rightHintMovie == null) {
                this._rightHintMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                this._rightHintMovie.resId = "defeat_enemy";
            }
            var headPath = ResPath.getPetIconSmall(dataModel.resId);
            this._rightHintMovie.replaceSlotBitmap("tx", headPath);
            this._rightHintMovie.updateReplaceSlot();
            this._rightHintMovie.x = mg.stageManager.stage.stageWidth / 2 + 150;
            this._rightHintMovie.y = 400;
            mg.stageManager.stage.addChild(this._rightHintMovie);
            this._rightHintMovie.playOnce("newAnimation");
            this._rightHintMovie.onCompleteOnce(this, function () {
                this._rightHintMovie.stop();
                if (this._rightHintMovie.parent) {
                    this._rightHintMovie.parent.removeChild(this._rightHintMovie);
                }
            });
        };
        //开场属性加成
        BattleManager.prototype.showStartProAdd = function (hpAdd, atkAdd, target) {
            if (hpAdd > 0)
                this.showSkillFont(Language.P_SM + hpAdd + "%", target);
            if (atkAdd > 0) {
                //utils.timer.once(300, this, function () {
                this.showSkillFont(Language.P_GJ + atkAdd + "%", target);
                //});
            }
        };
        BattleManager.prototype.setShowSkillLastTime = function (uid, time) {
            this.showSkillLastTime[uid] = time;
        };
        BattleManager.prototype.getShowSkillLastTime = function (uid) {
            if (this.showSkillLastTime[uid]) {
                return this.showSkillLastTime[uid];
            }
            return 0;
        };
        BattleManager.prototype.pushShowSkill = function (skillName, obj) {
            var objId = obj.vo.sceneObjectId;
            var lastShowTime = this.getShowSkillLastTime(objId);
            var now = egret.getTimer();
            if (lastShowTime < now) {
                lastShowTime = now;
            }
            this.showSkillQueue.push({ obj: obj, skillName: skillName, showTime: lastShowTime });
            lastShowTime += this.showSkillInterval;
            this.setShowSkillLastTime(objId, lastShowTime);
        };
        BattleManager.prototype.clearShowSkill = function () {
            if (this.showSkillQueue.length > 0) {
                this.showSkillQueue = [];
            }
        };
        BattleManager.prototype.showSkillFont = function (skillName, target) {
            if (!this.isNeedPiaoZi(target.vo))
                return;
            //if (!s.SceneConfig.BATTLE_TEXT_SHOW || !target.vo) return;
            //var now: number = egret.getTimer();
            this.pushShowSkill(skillName, target);
            this.checkShowSkillQueue();
        };
        BattleManager.prototype.checkShowSkillQueue = function () {
            utils.timer.clear(this, this.checkShowSkillQueue);
            if (this.showSkillQueue.length == 0)
                return;
            var now = egret.getTimer();
            for (var i = this.showSkillQueue.length - 1; i >= 0; i--) {
                if (this.showSkillQueue[i].showTime <= now) {
                    this.doShowSkillFont(this.showSkillQueue[i].skillName, this.showSkillQueue[i].obj);
                    this.showSkillQueue.splice(i, 1);
                }
            }
            if (this.showSkillQueue.length > 0) {
                utils.timer.once(this.showSkillInterval, this, this.checkShowSkillQueue);
            }
        };
        BattleManager.prototype.doShowSkillFont = function (skillName, target) {
            //logger.error("doShowSkillFont::" + skillName);
            if (!s.SceneConfig.BATTLE_TEXT_SHOW || !target.vo)
                return;
            var bitmapFont = BattlePool.fromFontPool();
            bitmapFont.initialize(BattleFontType.FONT_SKILL, 0, skillName);
            //var scaleRate: number = this.getScale() * 1.25;
            var scaleRate = this.getScale();
            bitmapFont.anchorOffsetX = bitmapFont.width / 2 - 22;
            bitmapFont.anchorOffsetY = bitmapFont.height / 2;
            app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
            bitmapFont.x = target.x;
            bitmapFont.y = target.y - target.titleHeight / 2 + 50;
            bitmapFont.scaleX = bitmapFont.scaleY = 0.8 * scaleRate;
            var end1 = bitmapFont.y - 50;
            var end2 = end1 - 50;
            egret.Tween.get(bitmapFont).to({ y: end1, scaleX: 1.2 * scaleRate, scaleY: 1.2 * scaleRate }, 500, utils.Ease.linearNone)
                .to({ y: end2, scaleX: 0.8 * scaleRate, scaleY: 0.8 * scaleRate }, 500, utils.Ease.linearNone)
                .call(this.removeDamage, this, [bitmapFont]);
        };
        BattleManager.prototype.setShowTalentLastTime = function (uid, time) {
            this.showTalentLastTime[uid] = time;
        };
        BattleManager.prototype.getShowTalentLastTime = function (uid) {
            if (this.showTalentLastTime[uid]) {
                return this.showTalentLastTime[uid];
            }
            return 0;
        };
        BattleManager.prototype.pushShowTalent = function (drifting, targetVO, moveDown) {
            var lastShowTime = this.getShowTalentLastTime(targetVO.uid);
            var now = egret.getTimer();
            if (lastShowTime < now) {
                lastShowTime = now;
            }
            this.showTalentQueue.push({ vo: targetVO, drifting: drifting, moveDown: moveDown, showTime: lastShowTime });
            lastShowTime += this.showTalentInterval;
            this.setShowTalentLastTime(targetVO.uid, lastShowTime);
        };
        BattleManager.prototype.clearShowTalent = function () {
            if (this.showTalentQueue.length > 0) {
                this.showTalentQueue = [];
            }
        };
        BattleManager.prototype.showTalentFont = function (drifting, targetVO, moveDown) {
            if (moveDown === void 0) { moveDown = false; }
            if (!this.isNeedPiaoZi(targetVO))
                return;
            if (!drifting)
                return;
            if (!BattlePool.hasRes())
                return;
            this.pushShowTalent(drifting, targetVO, moveDown);
            this.checkShowTalentQueue();
        };
        BattleManager.prototype.checkShowTalentQueue = function () {
            utils.timer.clear(this, this.checkShowTalentQueue);
            if (this.showTalentQueue.length == 0)
                return;
            var now = egret.getTimer();
            for (var i = this.showTalentQueue.length - 1; i >= 0; i--) {
                if (this.showTalentQueue[i].showTime < now) {
                    this.doShowTalentFont(this.showTalentQueue[i].drifting, this.showTalentQueue[i].vo, this.showTalentQueue[i].moveDown);
                    this.showTalentQueue.splice(i, 1);
                }
            }
            if (this.showTalentQueue.length > 0) {
                utils.timer.once(500, this, this.checkShowTalentQueue);
            }
        };
        BattleManager.prototype.doShowTalentFont = function (drifting, targetVO, moveDown) {
            //logger.error("doShowTalentFont::" + drifting);
            var target = this.isNeedPiaoZi(targetVO);
            if (!target)
                return;
            var scaleRate = this.getMinScale();
            var bitmapFont = BattlePool.fromFontPool();
            bitmapFont.initialize(BattleFontType.FONT_BUFF, drifting);
            bitmapFont.anchorOffsetX = bitmapFont.width / 2;
            bitmapFont.anchorOffsetY = bitmapFont.height;
            app.gameContext.scene.battleFontContainer.addChild(bitmapFont);
            bitmapFont.x = target.x; //game.MapConfig.getReaX(targetVO.tileX);
            bitmapFont.y = target.y - target.titleHeight - bitmapFont.height; //game.MapConfig.getReaY(targetVO.tileY) - 150;
            bitmapFont.scaleX = bitmapFont.scaleY = scaleRate;
            egret.Tween.get(bitmapFont).to({}, 800, utils.Ease.linearNone).call(this.removeDamage, this, [bitmapFont]);
            // var end1: number = bitmapFont.y - 80;
            // var end2: number = end1 - 60;
            // if(moveDown)
            // {
            // 	end2 = end1 + 10;
            // }
            // egret.Tween.get(bitmapFont).to({ y: end1, scaleX: 1.2 * scaleRate, scaleY: 1.2 * scaleRate }, 600, utils.Ease.cubicOut).to({ y: end2, scaleX: 1 * scaleRate, scaleY: 1 * scaleRate }, 800, utils.Ease.cubicIn).call(this.removeDamage, this, [bitmapFont]);
        };
        BattleManager.prototype.removeText = function (bitmapFont) {
            if (bitmapFont.parent) {
                bitmapFont.parent.removeChild(bitmapFont);
            }
        };
        BattleManager.prototype.removeDamage = function (bitmapFont) {
            if (bitmapFont.parent) {
                bitmapFont.parent.removeChild(bitmapFont);
            }
            BattlePool.toFontPool(bitmapFont);
        };
        BattleManager.prototype.isType = function (type, types) {
            for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                var t = types_1[_i];
                if (t == type)
                    return true;
            }
            return false;
        };
        /*
        private getSmartObjects(scene: s.Scene, x: number, y: number, enemyTypes: number[], except: s.SmartObject = null, results: s.SmartObject[] = null): s.SmartObject[] {
            if (!results) results = [];
            var node: PF.Node = scene.getNode(x, y);
            if (node && node.objects && node.objects.length) {
                for (var object of node.objects) {
                    if (!object) continue;
                    if (except == object) continue;
                    if (object.stateDead) continue;
                    if (object.tileNode != node) continue;
                    if (this.isType(object.type, enemyTypes)) {
                        if (results.indexOf(object) == -1) results.push(object);
                    }
                }
            }
            return results;
        }
        */
        /**
         * 获得目标格子周围的离起始格子最近的空格子
         * @param startNode 起点
         * @param endNode 终点
         * @param scene 当前场景
         * @param aroundEnabled 是否取周围所有格子，默认只取当前方向相邻方向的格子
         */
        BattleManager.prototype.getAroundEmptyNode = function (scene, node, startNode, around, disRate) {
            if (around === void 0) { around = 1; }
            if (disRate === void 0) { disRate = 1; }
            var startTileX = startNode.x;
            var startTileY = startNode.y;
            var direction = TypeDirection.getDirection8(node.x, node.y, startTileX, startTileY);
            direction = TypeDirection.getRealDirection8(direction);
            var result = this.getDirectNextNode(node, direction, scene, null, disRate);
            if (result)
                return result;
            function getRealAngle(angle) {
                while (angle < 0) {
                    angle += 360;
                }
                while (angle > 360) {
                    angle %= 360;
                }
                return angle;
            }
            function getAngleOff(d1, d2) {
                var off = Math.abs(d1 - d2);
                if (off > 180)
                    return 360 - off;
                return off;
            }
            if (around < disRate)
                around = disRate;
            var angle = getRealAngle(utils.MathUtil.getAngle(node.x - startTileX, node.y - startTileY));
            var endAround = 100;
            while (around <= endAround) {
                var array = this.getAroundNodes(node, around, scene);
                if (array && array.length) {
                    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                        var curnode = array_1[_i];
                        curnode.angle = getRealAngle(utils.MathUtil.getAngle(curnode.x - startTileX, curnode.y - startTileY));
                    }
                    array.sort(function (a, b) {
                        return getAngleOff(angle, a.angle) > getAngleOff(angle, b.angle) ? 1 : -1;
                    });
                    return array[0];
                }
                around++;
            }
            return null;
        };
        BattleManager.prototype.getAroundEmptyNodeByPos = function (scene, node, startTileX, startTileY, around) {
            if (startTileY === void 0) { startTileY = 0; }
            if (around === void 0) { around = 1; }
            var startNode = scene.getNode(startTileX, startTileY);
            if (startNode) {
                return this.getAroundEmptyNode(scene, node, startNode, around);
            }
            return null;
        };
        BattleManager.prototype.getNodeDistance = function (node1, node2) {
            return Math.max(Math.abs(node2.x - node1.x), Math.abs(node2.y - node1.y));
        };
        BattleManager.prototype.getNodeSpace2 = function (node1X, node1Y, node2X, node2Y) {
            return Math.max(Math.abs(node2X - node1X), Math.abs(node2Y - node1Y));
        };
        /***
         * 获取下一个可以行走的格子
         * @param scene
         * @param startNode
         * @param endNode
         * @param targetSpace
         * @param except
         * @param except
         */
        BattleManager.prototype.getNextWalkableNode = function (scene, startNode, endNode, targetSpace, except, checkObject) {
            if (targetSpace === void 0) { targetSpace = 0; }
            if (except === void 0) { except = null; }
            if (checkObject === void 0) { checkObject = true; }
            if (this.getNodeDistance(startNode, endNode) == targetSpace) {
                return endNode;
            }
            var direction = TypeDirection.getDirection8(startNode.x, startNode.y, endNode.x, endNode.y);
            direction = TypeDirection.getRealDirection8(direction);
            var total = 4;
            var index = 0;
            var point = new egret.Point();
            while (index < total) {
                var direct1 = TypeDirection.getRealDirection8(direction + index);
                var direct2 = TypeDirection.getRealDirection8(direction - index);
                if (direct1 == direct2) {
                    var resultNode = this.getDirectNextNode(startNode, direct1, scene, point, 1, checkObject);
                    if (resultNode && resultNode != except) {
                        if (!checkObject || !resultNode.hasObject()) {
                            return resultNode;
                        }
                    }
                }
                else {
                    var node1 = this.getDirectNextNode(startNode, direct1, scene, point, 1, checkObject);
                    var node2 = this.getDirectNextNode(startNode, direct2, scene, point, 1, checkObject);
                    if (node1 && node2 && node1 != except) {
                        var distance1 = this.getNodeDistance(startNode, node1);
                        var distance2 = this.getNodeDistance(startNode, node2);
                        return distance1 < distance2 ? node1 : node2;
                    }
                    if (node1 && node1 != except) {
                        if (!checkObject || !node1.hasObject()) {
                            return node1;
                        }
                    }
                    if (node2 && node2 != except) {
                        if (!checkObject || !node2.hasObject()) {
                            return node2;
                        }
                    }
                }
                index++;
            }
            return null;
        };
        /**
         * 随机获得目标格子周围可用的格子
         * @param node 目标格子
         * @param scene 当前场景
         * @param around 圈数 0 为全地图查找
         */
        BattleManager.prototype.getAroundRandomNode = function (scene, node, aroundMax) {
            if (aroundMax === void 0) { aroundMax = 0; }
            var around = 1;
            var endAround = aroundMax ? aroundMax : 100;
            while (around <= endAround) {
                var array = this.getAroundNodes(node, around, scene);
                if (array && array.length) {
                    return array[(Math.random() * array.length) >> 0];
                }
                around++;
            }
            return null;
        };
        /**
         * 随机获得当前格子周围可用的格子并与目标格子相邻
         * @param node 目标格子
         * @param scene 当前场景
         * @param around 圈数 0 为全地图查找
         */
        BattleManager.prototype.getAroundRandomFromNode = function (scene, centerNode, targetNode, aroundMax) {
            if (aroundMax === void 0) { aroundMax = 0; }
            var around = 1;
            var endAround = aroundMax ? aroundMax : 100;
            while (around <= endAround) {
                var array = this.getAroundNodes(centerNode, around, scene);
                if (array && array.length) {
                    while (array.length) {
                        var node = array.splice((Math.random() * array.length) >> 0, 1)[0];
                        if (node != targetNode && Math.abs(targetNode.x - node.x) <= 1 && Math.abs(targetNode.y - node.y) <= 1) {
                            return node;
                        }
                    }
                }
                around++;
            }
            return null;
        };
        BattleManager.prototype.getAroundNodes = function (endNode, around, scene) {
            var array = [];
            var node;
            node = this._scene.getWalkableNode(endNode.x, endNode.y - around);
            if (node)
                array.push(node);
            node = this._scene.getWalkableNode(endNode.x + around, endNode.y - around);
            if (node)
                array.push(node);
            node = this._scene.getWalkableNode(endNode.x + around, endNode.y);
            if (node)
                array.push(node);
            node = this._scene.getWalkableNode(endNode.x + around, endNode.y + around);
            if (node)
                array.push(node);
            node = this._scene.getWalkableNode(endNode.x, endNode.y + around);
            if (node)
                array.push(node);
            node = this._scene.getWalkableNode(endNode.x - around, endNode.y + around);
            if (node)
                array.push(node);
            node = this._scene.getWalkableNode(endNode.x - around, endNode.y);
            if (node)
                array.push(node);
            node = this._scene.getWalkableNode(endNode.x - around, endNode.y - around);
            if (node)
                array.push(node);
            return array;
        };
        /**
         * 取得两个格子的距离（非像素，格子的绝对距离）
         * @param node1 起点
         * @param node2 终点
         */
        // private getNodeDistance(node1: PF.Node, node2: PF.Node, scene: s.Scene): number {
        // 	var x: number = utils.MathUtil.abs(node1.x - node2.x);
        // 	var y: number = utils.MathUtil.abs(node1.y - node2.y);
        // 	return Math.sqrt(x * x + y * y);
        // }
        /**
         * 取得从当前格，当前方向的算出的下一个格子位置，格子如果不可行走则返回NULL
         * @param node1 起点
         * @param node2 终点
         * @param cachePoint 复用的点对象，传入此对象可以节省内存开销（可选）
         */
        BattleManager.prototype.getDirectNextNode = function (node, direct, scene, cachePoint, disRate, checkObject) {
            if (cachePoint === void 0) { cachePoint = null; }
            if (disRate === void 0) { disRate = 1; }
            if (checkObject === void 0) { checkObject = true; }
            var point = TypeDirection.getOffsetByDirection(direct, cachePoint);
            if (disRate > 1) {
                point.x *= disRate;
                point.y *= disRate;
            }
            if (checkObject) {
                return this._scene.getWalkableNode(node.x + point.x, node.y + point.y);
            }
            else {
                return this._scene.getNode(node.x + point.x, node.y + point.y);
            }
        };
        return BattleManager;
    }());
    battle.BattleManager = BattleManager;
    __reflect(BattleManager.prototype, "battle.BattleManager");
    battle.manager = new BattleManager();
})(battle || (battle = {}));
