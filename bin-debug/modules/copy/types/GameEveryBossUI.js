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
    var GameEveryBossUI = (function (_super) {
        __extends(GameEveryBossUI, _super);
        function GameEveryBossUI() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.OWNER_BLOOD_WIDTH = 143;
            return _this;
        }
        Object.defineProperty(GameEveryBossUI, "instance", {
            get: function () {
                if (!GameEveryBossUI._instance) {
                    GameEveryBossUI._instance = new GameEveryBossUI();
                }
                return GameEveryBossUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**打开全民BOSS显示 **/
        GameEveryBossUI.prototype.enter = function (battleScene, userPlayer) {
            this.ui.provokeBtn.visible = false;
            // this.OWNER_BLOOD_WIDTH = this.ui.belongBlood.width;
            this._battleScene = battleScene;
            this._userPlayer = userPlayer;
            this._curOwnerVO = this._battleScene.owner;
            this._userPlayer.vo.onTeamTargetChange(this, this.userPlayerChangeHandler);
            this._userPlayer.vo.onTeamDead(this, this.userPlayerDeadHandler);
            this._userPlayer.vo.onTeamRelife(this, this.userPlayerRelifeHandler);
            this._battleScene.onOwnerChange(this, this.ownerChangeHandler);
            //this._battleScene.onMineTargetChange(this, this.mineChangeHandler);
            //this._battleScene.onBossStateChange(this, this.bossStateChangeHandler);
            this._battleScene.onBossShieldStart(this, this.everyBossShieldStart);
            this._battleScene.onBossShieldEnd(this, this.everyBossShieldEnd);
            this._battleScene.onSeiveMaxReward(this, this.seiveMaxRewardHandler);
            this._battleScene.onReceiveProvoke(this, this.receiveProvokeHandler);
            this.ownerChangeHandler();
            this.userPlayerChangeHandler();
            this.ownerHpChangeHandler();
            this.ui.listAttacker.dataProvider = this._battleScene.attackersCollection;
            this.ui.attackerScroll.validateNow();
            this.ui.attackerScroll.viewport.scrollV = 0;
            this._battleScene.onAttacksChange(this, this.attackersChangeHandker);
            this.attackersChangeHandker(false);
            this.ui.shieldGroup.visible = false;
            this.ui.shieldReward.visible = false;
            this.ui.relifeView.visible = false;
            if (this._battleScene && this._battleScene.copyVO && this._battleScene.copyVO.openLevel == 20) {
                this.ui.validateNow();
                this.ui.btnAttack.validateNow();
                // mg.guideManager.guideImmediately(this.ui.btnAttack, Language.C_DJGJGSZ);
                this.ui.provokeInfo.show();
            }
            this.ui.listAttacker.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            this.ui.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rewardHandler, this);
            this.ui.btnAttack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attackTouchHandler, this);
            this.ui.btnAttackBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attackBossHandler, this);
            this.ui.showBossBlood(this._battleScene.boss);
            this.ui.btnAttack.visible = true;
            this.ui.haveGrp.visible = true;
            this.ui.btnAttackBoss.visible = true;
            this._dpMask = new egret.Shape();
            this._dpMask.rotation = -90;
            this.ui.bossShield.mask = this._dpMask;
            this.ui.shieldGroup.addChild(this._dpMask);
            this._dpMask.x = this.ui.bossShield.x + this.ui.bossShield.width / 2;
            this._dpMask.y = this.ui.bossShield.y + this.ui.bossShield.height / 2;
            this._xpMaskRadius = Math.sqrt(this.ui.bossShield.width * this.ui.bossShield.width + this.ui.bossShield.height * this.ui.bossShield.height);
        };
        /**关闭全民BOSS显示 */
        GameEveryBossUI.prototype.exit = function () {
            utils.timer.clear(this);
            if (this._battleScene && this._battleScene.copyVO && this._battleScene.copyVO.openLevel == 20)
                mg.guideManager.guideStopImmediately(this.ui.btnAttack);
            mg.uiManager.remove(s.UserfaceName.playerRelife);
            if (this._curOwnerVO) {
                //this._curOwnerVO.offPropertyChange(TypeProperty.HP, this, this.ownerHpChangeHandler);
                //this._curOwnerVO.offPropertyChange(TypeProperty.MaxHP, this, this.ownerHpChangeHandler);
                this._curOwnerVO.offTeamHpChange(this, this.ownerHpChangeHandler);
                this._curOwnerVO = null;
            }
            if (this._battleScene) {
                this._battleScene.offOwnerChange(this, this.ownerChangeHandler);
                //this._battleScene.offBossStateChange(this, this.bossStateChangeHandler);
                //this._battleScene.offMineTargetChange(this, this.mineChangeHandler);
                this._battleScene.offAttacksChange(this, this.attackersChangeHandker);
                this._battleScene.offBossShieldStart(this, this.everyBossShieldStart);
                this._battleScene.offBossShieldEnd(this, this.everyBossShieldEnd);
                this._battleScene.offSeiveMaxReward(this, this.seiveMaxRewardHandler);
                this._battleScene.offReceiveProvoke(this, this.receiveProvokeHandler);
            }
            if (this._userPlayer) {
                this._userPlayer.vo.offTeamTargetChange(this, this.userPlayerChangeHandler);
                this._userPlayer.vo.offTeamDead(this, this.userPlayerDeadHandler);
                this._userPlayer.vo.offTeamRelife(this, this.userPlayerRelifeHandler);
            }
            if (this.ui.listAttacker)
                this.ui.listAttacker.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            if (this.ui.btnReward)
                this.ui.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rewardHandler, this);
            if (this.ui.btnAttack)
                this.ui.btnAttack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.attackTouchHandler, this);
            if (this.ui.btnAttackBoss)
                this.ui.btnAttackBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attackBossHandler, this);
            // egret.Tween.removeTweens(this.ui.bossShield);
            // this.ui.belongBlood.width = this.OWNER_BLOOD_WIDTH;
            this.ui.hideBossBlood();
            this.ui.provokeInfo.reset();
            this.ui.provokeBtn.reset();
            this._battleScene = null;
            this._userPlayer = null;
            this._curOwnerVO = null;
            if (this._effectHuo) {
                if (this._effectHuo.parent) {
                    this._effectHuo.parent.removeChild(this._effectHuo);
                }
                this._effectHuo.stop();
                utils.ObjectPool.to(this._effectHuo, true);
                this._effectHuo = null;
            }
            GameModels.copyBoss.requestBossCopyInfo(null);
        };
        GameEveryBossUI.prototype.listItemTapHandler = function (e) {
            this.attackPlayerHandler(e.item);
        };
        GameEveryBossUI.prototype.userPlayerChangeHandler = function () {
            this.updateAttackBossButton();
            this.updateAttackDisplay();
        };
        GameEveryBossUI.prototype.userPlayerDeadHandler = function () {
            this.updateAttackDisplay();
        };
        GameEveryBossUI.prototype.userPlayerRelifeHandler = function () {
            this.updateAttackDisplay();
        };
        GameEveryBossUI.prototype.ownerChangeHandler = function () {
            this.ownerUpdate();
        };
        //我的攻击列表发生变化
        GameEveryBossUI.prototype.attackersChangeHandker = function (isAdd) {
            if (this._battleScene.attackersCollection.length > 0) {
                if (isAdd) {
                    /**暂时不设置自动反击 */
                    //this._battleScene.syncTarget(this._battleScene.attackersCollection.getItemAt(0));
                }
                //mg.effectManager.addBeAttackedEffect();
            }
            else {
                //mg.effectManager.removeBeAttackedEffect();
            }
        };
        GameEveryBossUI.prototype.ownerHpChangeHandler = function () {
            if (!this._curOwnerVO)
                return;
            this.ui.belongBlood.width = this._curOwnerVO.getTeamHp() / this._curOwnerVO.getTeamHpMax() * this.OWNER_BLOOD_WIDTH;
        };
        GameEveryBossUI.prototype.everyBossShieldStart = function (data) {
            var lastTime = 14;
            if (data) {
                lastTime = data.lastTime;
            }
            if (lastTime > 5) {
                this.ui.shieldReward.show(data);
            }
            this.ui.shieldGroup.visible = true;
            this._effectHuo = new s.AnimationSprite();
            this._effectHuo.resId = TypeEffectId.BOOSHEAD_EFF;
            this._effectHuo.x = this.ui.bossShield.x + this.ui.bossShield.width / 2;
            this._effectHuo.y = this.ui.bossShield.y + this.ui.bossShield.height / 2;
            this._effectHuo.play();
            this.ui.shieldGroup.addChild(this._effectHuo);
            for (var i = 0; i < lastTime; i++) {
                utils.timer.once(i * 1000, this, this.drawXpProgress, false, 360 / lastTime * i);
            }
            // this.ui.bossShield.width = 150 * (lastTime / 15);
            // egret.Tween.get(this.ui.bossShield).to({ width: 0 }, lastTime * 1000, utils.Ease.linearNone);
        };
        /**
         * 绘制圆形遮罩进度
         * @param angle 角度
         * @param isAnticlockwise 是否逆时针
         */
        GameEveryBossUI.prototype.drawXpProgress = function (angle, isAnticlockwise) {
            if (isAnticlockwise === void 0) { isAnticlockwise = true; }
            this._dpMask.graphics.clear();
            this._dpMask.graphics.beginFill(0x00ffff, 1);
            this._dpMask.graphics.lineTo(this._xpMaskRadius, 0);
            this._dpMask.graphics.drawArc(0, 0, this._xpMaskRadius, 0, angle * Math.PI / 180, isAnticlockwise);
            this._dpMask.graphics.lineTo(0, 0);
            this._dpMask.graphics.endFill();
        };
        GameEveryBossUI.prototype.everyBossShieldEnd = function () {
            this.ui.shieldGroup.removeChild(this._dpMask);
            this.ui.shieldGroup.visible = false;
            if (this._effectHuo) {
                if (this._effectHuo.parent) {
                    this._effectHuo.parent.removeChild(this._effectHuo);
                }
                this._effectHuo.stop();
                utils.ObjectPool.to(this._effectHuo, true);
                this._effectHuo = null;
            }
            this.ui.shieldReward.hide();
            utils.timer.clear(this);
            // egret.Tween.removeTweens(this.ui.bossShield);
        };
        GameEveryBossUI.prototype.seiveMaxRewardHandler = function () {
            mg.alertManager.tip(Language.J_GXHDBHDJL);
        };
        GameEveryBossUI.prototype.receiveProvokeHandler = function (data) {
            this.ui.provokeInfo.show(data);
        };
        //添加奖励监听事件
        GameEveryBossUI.prototype.rewardHandler = function (e) {
            var data = data = app.gameContext.gameCurrent.copyVO;
            var gameType = app.gameContext.typeGame;
            if (data) {
                if (gameType == TypeGame.GOD_DOMAIN || gameType == TypeGame.FAMILY_BOSS || gameType == TypeGame.DEATH_BOSS) {
                    mg.alertManager.showAlert(DropPreviewAlert, true, true, data.template.dropShow, data.template.parm1, true);
                }
                else {
                    mg.alertManager.showAlert(DropPreviewAlert, true, true, data.template.dropShow, null);
                }
            }
            // if (gameType == TypeGame.GOD_DOMAIN) {
            //     // var dataSetting: templates.dataSetting = this.getDomainDataSetting(data.template.step);
            //     if (data) {
            //         mg.alertManager.showAlert(DropPreviewAlert, true, true, data.template.dropShow, null);
            //         // mg.alertManager.showAlert(DropPreviewAlert, true, true, data.template.dropShow, dataSetting.value);
            //     }
            // } else {
            //     if (data) {
            //         mg.alertManager.showAlert(DropPreviewAlert, true, true, data.template.dropShow, null);
            //     }
            // }
        };
        GameEveryBossUI.prototype.bossStateChangeHandler = function () {
            if (this._battleScene && this._battleScene.copyVO && this._battleScene.copyVO.openLevel == 20) {
                mg.guideManager.guideStopImmediately(this.ui.btnAttack);
            }
        };
        GameEveryBossUI.prototype.attackTouchHandler = function (e) {
            var playerVO = this._curOwnerVO = this._battleScene.owner;
            if (playerVO == GameModels.user.player) {
                GameModels.sceneEveryBoss.dropOwner();
            }
            else {
                this.attackPlayerHandler(playerVO);
            }
            if (this._battleScene && this._battleScene.copyVO && this._battleScene.copyVO.openLevel == 20)
                mg.guideManager.guideStopImmediately(this.ui.btnAttack);
        };
        GameEveryBossUI.prototype.attackBossHandler = function (e) {
            // var bossVO: vo.GameMonsterVO = GameModels.sceneCrossServer.getBossVO();
            // if (bossVO) {
            //     app.gameContext.gameCurrent.startAttack(bossVO);
            //     //GameModels.sceneEveryBoss.syncTarget(bossVO);
            // }
        };
        GameEveryBossUI.prototype.attackPlayerHandler = function (playerVO) {
            if (!playerVO || (playerVO && playerVO.uid == GameModels.user.player.uid))
                return;
            if (playerVO.isSelfTeam(GameModels.user.player.getTeamTarget())) {
                mg.alertManager.tip(Language.J_ZZTZGWJ);
                return;
            }
            var leaderVO = playerVO.getTeamLeaderVO();
            if (leaderVO == null)
                return;
            app.gameContext.gameCurrent.startAttack(leaderVO);
            //this._battleScene.syncTarget(playerVO);
        };
        GameEveryBossUI.prototype.updateAttackDisplay = function () {
            if (!this._curOwnerVO) {
                this.ui.btnAttack.alpha = 0.8;
                this.ui.btnAttack.enabled = false;
                this.ui.btnAttack.label = Language.C_WGSZ;
                this.ui.labWho.text = Language.Z_WU;
                return;
            }
            if (this._userPlayer.vo == this._curOwnerVO) {
                //自己
                this.ui.btnAttack.alpha = 1;
                this.ui.btnAttack.enabled = true;
                this.ui.btnAttack.label = Language.C_QXGSZ;
                this.ui.labWho.text = Language.Z_WO;
                this.ui.provokeBtn.show(this._battleScene);
                return;
            }
            this.ui.provokeBtn.hide();
            var targetVO = this._userPlayer.getTeamTargetVO();
            if (targetVO != null && (targetVO == this._curOwnerVO || targetVO.master == this._curOwnerVO)) {
                this.ui.btnAttack.alpha = 0.8;
                this.ui.btnAttack.enabled = false;
                this.ui.btnAttack.label = Language.C_ZAGJGSZ;
                //别人
                this.ui.labWho.text = this._curOwnerVO.name;
                return;
            }
            //别人
            this.ui.btnAttack.alpha = 1;
            this.ui.btnAttack.enabled = true;
            this.ui.btnAttack.label = Language.C_GJGSZ;
            this.ui.labWho.text = this._curOwnerVO.name;
        };
        GameEveryBossUI.prototype.ownerUpdate = function () {
            this.ui.provokeInfo.hide();
            if (this._curOwnerVO) {
                //this._curOwnerVO.offPropertyChange(TypeProperty.HP, this, this.ownerHpChangeHandler);
                //this._curOwnerVO.offPropertyChange(TypeProperty.MaxHP, this, this.ownerHpChangeHandler);
                this._curOwnerVO.offTeamHpChange(this, this.ownerHpChangeHandler);
                this.ui.belongName.text = "";
            }
            this._curOwnerVO = this._battleScene.owner;
            if (this._curOwnerVO) {
                var isSameLegoin = (this._curOwnerVO != GameModels.user.player && this._curOwnerVO.legionId != "" && this._curOwnerVO.legionId == GameModels.user.player.legionId);
                this.ui.belongName.text = this._curOwnerVO.name + (isSameLegoin ? "(" + Language.C_TJT + ")" : "");
                this.ui.belongHead.source = ResPath.getPlayerIconSmall(this._curOwnerVO.headIcon);
                this.ui.imgSameLegoin.visible = this._curOwnerVO.legionId ? true : false;
                this.ui.imgSameLegoin.source = "common_json.img_union_point" + this._curOwnerVO.legionId + "_png";
                // this.ui.imgSameLegoin.visible = isSameLegoin;
                //this._curOwnerVO.onPropertyChange(TypeProperty.HP, this, this.ownerHpChangeHandler);
                //this._curOwnerVO.onPropertyChange(TypeProperty.MaxHP, this, this.ownerHpChangeHandler);
                this._curOwnerVO.onTeamHpChange(this, this.ownerHpChangeHandler);
                this.ownerHpChangeHandler();
            }
            else {
                this.ui.belongName.text = Language.Z_WU;
                this.ui.belongHead.source = null;
                this.ui.imgSameLegoin.visible = false;
            }
            this.updateAttackBossButton();
            this.updateAttackDisplay();
        };
        GameEveryBossUI.prototype.updateAttackBossButton = function () {
            var targetVO = this._userPlayer.getTeamTargetVO();
            // if (targetVO == GameModels.sceneCrossServer.getBossVO()) {
            //     this.ui.btnAttackBoss.alpha = 0.8;
            //     this.ui.btnAttackBoss.enabled = false;
            // }
            // else {
            this.ui.btnAttackBoss.alpha = 1.0;
            this.ui.btnAttackBoss.enabled = true;
            // }
            //this.ui.btnAttackBoss.enabled = bool;
        };
        return GameEveryBossUI;
    }(copy.GameUIBase));
    copy.GameEveryBossUI = GameEveryBossUI;
    __reflect(GameEveryBossUI.prototype, "copy.GameEveryBossUI");
})(copy || (copy = {}));
