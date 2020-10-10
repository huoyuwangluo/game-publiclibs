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
    var GameWoorsBossUI = (function (_super) {
        __extends(GameWoorsBossUI, _super);
        function GameWoorsBossUI() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.OWNER_BLOOD_WIDTH = 143;
            _this._isShiedPet = false;
            return _this;
        }
        Object.defineProperty(GameWoorsBossUI, "instance", {
            get: function () {
                if (!GameWoorsBossUI._instance) {
                    GameWoorsBossUI._instance = new GameWoorsBossUI();
                }
                return GameWoorsBossUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**打开全民BOSS显示 **/
        GameWoorsBossUI.prototype.enter = function (userPlayer) {
            this.ui.provokeBtn.visible = false;
            // this.OWNER_BLOOD_WIDTH = this.ui.belongBlood.width;
            this._userPlayer = userPlayer;
            this._curOwnerVO = GameModels.sceneWoorsServer.owner;
            this._userPlayer.onTargetChange(this, this.userTargetChangeHandler);
            this._userPlayer.vo.onTeamDead(this, this.userPlayerDeadHandler);
            this._userPlayer.vo.onTeamRelife(this, this.userPlayerRelifeHandler);
            GameModels.sceneWoorsServer.onOwnerChange(this, this.ownerChangeHandler);
            GameModels.sceneWoorsServer.onBossSightChangHandler(this, this.bossSightChangHandler);
            GameModels.sceneWoorsServer.onReceiveProvoke(this, this.receiveProvokeHandler);
            GameModels.sceneWoorsServer.onBossShieldStart(this, this.everyBossShieldStart);
            GameModels.sceneWoorsServer.onBossShieldEnd(this, this.everyBossShieldEnd);
            GameModels.sceneWoorsServer.onSeiveMaxReward(this, this.seiveMaxRewardHandler);
            this.flagChangHandler();
            this.flagGetingHandler();
            this.ownerChangeHandler();
            this.userTargetChangeHandler();
            this.ownerHpChangeHandler();
            this.ui.listAttacker.dataProvider = GameModels.sceneWoorsServer.attackersCollection;
            GameModels.sceneWoorsServer.onAttacksChange(this, this.attackersChangeHandker);
            this.attackersChangeHandker(false);
            this.ui.shieldGroup.visible = false;
            this.ui.shieldReward.visible = false;
            this.ui.relifeView.visible = false;
            this.ui.btnAttackBoss.enabled = true;
            this.ui.btnAttack.visible = true;
            this.ui.swordGrp.touchChildren = false;
            this.ui.swordGrp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onKillHandler, this);
            this.ui.listAttacker.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            this.ui.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rewardHandler, this);
            this.ui.btnAttack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attackBelongHandler, this);
            this.ui.btnAttackBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attackBossHandler, this);
            this.bossSightChangHandler();
            this._dpMask = new egret.Shape();
            this._dpMask.rotation = -90;
            this.ui.bossShield.mask = this._dpMask;
            this.ui.shieldGroup.addChild(this._dpMask);
            this._dpMask.x = this.ui.bossShield.x + this.ui.bossShield.width / 2;
            this._dpMask.y = this.ui.bossShield.y + this.ui.bossShield.height / 2;
            this._xpMaskRadius = Math.sqrt(this.ui.bossShield.width * this.ui.bossShield.width + this.ui.bossShield.height * this.ui.bossShield.height);
        };
        /**关闭全民BOSS显示 */
        GameWoorsBossUI.prototype.exit = function () {
            utils.timer.clear(this);
            mg.uiManager.remove(s.UserfaceName.playerRelife);
            if (this._curOwnerVO) {
                //this._curOwnerVO.offPropertyChange(TypeProperty.HP, this, this.ownerHpChangeHandler);
                //this._curOwnerVO.offPropertyChange(TypeProperty.MaxHP, this, this.ownerHpChangeHandler);
                this._curOwnerVO.offTeamHpChange(this, this.ownerHpChangeHandler);
                this._curOwnerVO = null;
            }
            GameModels.sceneWoorsServer.offOwnerChange();
            GameModels.sceneWoorsServer.offBossSightChangHandler();
            GameModels.sceneWoorsServer.offReceiveProvoke();
            GameModels.sceneWoorsServer.offBossShieldStart();
            GameModels.sceneWoorsServer.offBossShieldEnd();
            GameModels.sceneWoorsServer.offSeiveMaxReward();
            GameModels.sceneWoorsServer.offAttacksChange(this, this.attackersChangeHandker);
            if (this._userPlayer) {
                this._userPlayer.offTargetChange(this, this.userTargetChangeHandler);
                this._userPlayer.vo.offTeamDead(this, this.userPlayerDeadHandler);
                this._userPlayer.vo.offTeamRelife(this, this.userPlayerRelifeHandler);
            }
            if (this.ui.listAttacker)
                this.ui.listAttacker.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            if (this.ui.btnReward)
                this.ui.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rewardHandler, this);
            if (this.ui.btnAttack)
                this.ui.btnAttack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.attackBelongHandler, this);
            if (this.ui.btnAttackBoss)
                this.ui.btnAttackBoss.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.attackBossHandler, this);
            // egret.Tween.removeTweens(this.ui.bossShield);
            // this.ui.belongBlood.width = this.OWNER_BLOOD_WIDTH;
            this.ui.hideBossBlood();
            this.ui.provokeInfo.reset();
            this.ui.provokeBtn.reset();
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
        GameWoorsBossUI.prototype.onKillHandler = function () {
            if (GameModels.sceneWoorsServer.flagLeftSecond > 0 && GameModels.sceneWoorsServer.flagPlayerId != "" && GameModels.sceneWoorsServer.flagPlayerId != GameModels.user.player.uid) {
                var other = GameModels.sceneWoorsServer.getObjectByUId(GameModels.sceneWoorsServer.flagPlayerId);
                if (other) {
                    this.attackPlayerHandler(other);
                }
            }
        };
        GameWoorsBossUI.prototype.listItemTapHandler = function (e) {
            this.attackPlayerHandler(e.item);
        };
        GameWoorsBossUI.prototype.userTargetChangeHandler = function () {
            this.updateAttackBossButton(this._userPlayer.targetVO != GameModels.sceneWoorsServer.getBossVO());
            this.updateAttackOwnerButton();
        };
        GameWoorsBossUI.prototype.userPlayerDeadHandler = function () {
            this.updateAttackBossButton(false);
            this.updateAttackOwnerButton();
        };
        GameWoorsBossUI.prototype.userPlayerRelifeHandler = function () {
            this.updateAttackBossButton(true);
            this.updateAttackOwnerButton();
        };
        GameWoorsBossUI.prototype.ownerChangeHandler = function () {
            this.ui.provokeInfo.hide();
            this.updateOwnerDisplay();
        };
        GameWoorsBossUI.prototype.bossSightChangHandler = function () {
            var bossVO = GameModels.sceneWoorsServer.getBossVO();
            this.ui.showBossBlood(bossVO);
            this.ui.haveGrp.visible = (bossVO != null ? true : false);
            this.ui.btnAttack.visible = (bossVO != null ? true : false);
            this.ui.btnAttackBoss.visible = (bossVO != null ? true : false);
        };
        GameWoorsBossUI.prototype.flagChangHandler = function () {
            if (GameModels.sceneWoorsServer.flagIsInTime == 1) {
                this.ui.swordGrp.visible = true;
                var tem = GameModels.sceneWoorsServer.getMonsterData(3511001);
                this.ui.flagHead.source = ResPath.getBossIconSmall(tem.resId);
                this.ui.labFlagName.text = "" + tem.name;
                this.ui.labFlagState.text = "";
                if (GameModels.sceneWoorsServer.isOwerServer()) {
                    this.ui.labFlagState.text = Language.C_YZL;
                    this.ui.labFlagState.textColor = 0x00FF00;
                }
                else {
                    this.ui.labFlagState.text = Language.C_KQD;
                    this.ui.labFlagState.textColor = 0xFF0000;
                }
            }
            else {
                this.ui.swordGrp.visible = false;
            }
        };
        GameWoorsBossUI.prototype.flagGetingHandler = function () {
            this._flagLeftSecond = GameModels.sceneWoorsServer.flagLeftSecond;
            egret.Tween.removeTweens(this.ui.swordTimePro);
            utils.timer.clear(this, this.loopExpTime);
            if (this._flagLeftSecond > 0) {
                this.ui.labFlagState.text = Language.C_KGJ;
                this.ui.labFlagState.textColor = 0xFF0000;
                this.ui.swordProgress.visible = true;
                this.ui.swordTimePro.value = (10 - this._flagLeftSecond) * 10;
                egret.Tween.get(this.ui.swordTimePro).to({ value: 100 }, this._flagLeftSecond * 1000, utils.Ease.linearNone);
                utils.timer.loop(1000, this, this.loopExpTime);
                var name = GameModels.sceneWoorsServer.flagServerId + GameModels.sceneWoorsServer.flagPlayerName;
                this.ui.labSwordState.text = Language.getExpression(Language.E_1ZZQDSJ, name);
            }
            else {
                this.ui.swordProgress.visible = false;
            }
        };
        GameWoorsBossUI.prototype.loopExpTime = function () {
            this._flagLeftSecond--;
            if (this._flagLeftSecond <= 0) {
                egret.Tween.removeTweens(this.ui.swordTimePro);
                utils.timer.clear(this, this.loopExpTime);
                this.ui.swordProgress.visible = false;
            }
        };
        GameWoorsBossUI.prototype.flagGetStopHandler = function (playerId) {
            this.ui.swordProgress.visible = false;
            if (playerId != "" && playerId == GameModels.user.player.uid) {
                mg.alertManager.tip(Language.C_QDCG);
            }
        };
        GameWoorsBossUI.prototype.receiveProvokeHandler = function (data) {
            this.ui.provokeInfo.show(data);
        };
        //我的攻击列表发生变化
        GameWoorsBossUI.prototype.attackersChangeHandker = function (isAdd) {
            if (GameModels.sceneWoorsServer.attackersCollection.length > 0) {
                //mg.effectManager.addBeAttackedEffect();
            }
            else {
                // mg.effectManager.removeBeAttackedEffect();
            }
        };
        GameWoorsBossUI.prototype.ownerHpChangeHandler = function () {
            if (!this._curOwnerVO)
                return;
            this.ui.belongBlood.width = this._curOwnerVO.getTeamHp() / this._curOwnerVO.getTeamHpMax() * this.OWNER_BLOOD_WIDTH;
        };
        GameWoorsBossUI.prototype.attackBelongHandler = function (e) {
            var playerVO = this._curOwnerVO = GameModels.sceneWoorsServer.owner;
            if (playerVO == GameModels.user.player) {
                GameModels.sceneWoorsServer.dropOwner();
            }
            else {
                this.attackPlayerHandler(playerVO);
            }
        };
        GameWoorsBossUI.prototype.attackBossHandler = function (e) {
            var bossVO = GameModels.sceneWoorsServer.getBossVO();
            if (bossVO) {
                GameModels.sceneWoorsServer.syncTarget(bossVO);
            }
        };
        GameWoorsBossUI.prototype.attackPlayerHandler = function (playerVO) {
            if (!playerVO || (playerVO && playerVO.uid == GameModels.user.player.uid))
                return;
            if (GameModels.user.player.target) {
                if (GameModels.user.player.target == playerVO) {
                    mg.alertManager.tip(Language.J_ZZTZGWJ);
                    return;
                }
            }
            GameModels.sceneWoorsServer.syncTarget(playerVO);
        };
        GameWoorsBossUI.prototype.updateAttackBossButton = function (bool) {
            this.ui.btnAttackBoss.enabled = bool;
            this.ui.btnAttackBoss.alpha = this.ui.btnAttackBoss.enabled ? 1 : 0.8;
        };
        GameWoorsBossUI.prototype.updateAttackOwnerButton = function () {
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
                this.ui.provokeBtn.show(GameModels.sceneWoorsServer);
                return;
            }
            this.ui.provokeBtn.hide();
            if (this._userPlayer.vo.target == this._curOwnerVO) {
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
        GameWoorsBossUI.prototype.updateOwnerDisplay = function () {
            if (this._curOwnerVO) {
                //this._curOwnerVO.offPropertyChange(TypeProperty.HP, this, this.ownerHpChangeHandler);
                //this._curOwnerVO.offPropertyChange(TypeProperty.MaxHP, this, this.ownerHpChangeHandler);
                this._curOwnerVO.offTeamHpChange(this, this.ownerHpChangeHandler);
                this.ui.belongName.text = "";
            }
            this._curOwnerVO = GameModels.sceneWoorsServer.owner;
            if (this._curOwnerVO) {
                var isSameLegoin = (this._curOwnerVO != GameModels.user.player && this._curOwnerVO.legionId == GameModels.user.player.legionId);
                this.ui.belongName.text = this._curOwnerVO.name + (isSameLegoin ? "(" + Language.C_TJT + ")" : "");
                this.ui.belongHead.source = ResPath.getPlayerIconSmall(this._curOwnerVO.headIcon);
                this.ui.imgSameLegoin.visible = this._curOwnerVO.legionId ? true : false;
                this.ui.imgSameLegoin.source = "common_json.img_union_point" + this._curOwnerVO.legionId + "_png";
                //this.ui.imgSameLegoin.visible = isSameLegoin;
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
            this.updateAttackBossButton(true);
            this.updateAttackOwnerButton();
        };
        //添加奖励监听事件
        GameWoorsBossUI.prototype.rewardHandler = function (e) {
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
        GameWoorsBossUI.prototype.everyBossShieldStart = function (data) {
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
        };
        /**
         * 绘制圆形遮罩进度
         * @param angle 角度
         * @param isAnticlockwise 是否逆时针
         */
        GameWoorsBossUI.prototype.drawXpProgress = function (angle, isAnticlockwise) {
            if (isAnticlockwise === void 0) { isAnticlockwise = true; }
            this._dpMask.graphics.clear();
            this._dpMask.graphics.beginFill(0x00ffff, 1);
            this._dpMask.graphics.lineTo(this._xpMaskRadius, 0);
            this._dpMask.graphics.drawArc(0, 0, this._xpMaskRadius, 0, angle * Math.PI / 180, isAnticlockwise);
            this._dpMask.graphics.lineTo(0, 0);
            this._dpMask.graphics.endFill();
        };
        GameWoorsBossUI.prototype.everyBossShieldEnd = function () {
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
            // egret.Tween.removeTweens(this.ui.bossShield);
        };
        GameWoorsBossUI.prototype.seiveMaxRewardHandler = function () {
            mg.alertManager.tip(Language.J_GXHDBHDJL);
        };
        return GameWoorsBossUI;
    }(copy.GameUIBase));
    copy.GameWoorsBossUI = GameWoorsBossUI;
    __reflect(GameWoorsBossUI.prototype, "copy.GameWoorsBossUI");
})(copy || (copy = {}));
