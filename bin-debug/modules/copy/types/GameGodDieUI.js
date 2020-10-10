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
    var GameGodDieUI = (function (_super) {
        __extends(GameGodDieUI, _super);
        function GameGodDieUI() {
            var _this = _super.call(this) || this;
            _this.OWNER_BLOOD_WIDTH = 143;
            if (!_this._bossHeadList) {
                _this._bossHeadList = [_this.ui.godDieBossHead0, _this.ui.godDieBossHead1, _this.ui.godDieBossHead2, _this.ui.godDieBossHead3, _this.ui.godDieBossHead4, _this.ui.godDieBossHead5];
            }
            return _this;
        }
        Object.defineProperty(GameGodDieUI, "instance", {
            get: function () {
                if (!GameGodDieUI._instance) {
                    GameGodDieUI._instance = new GameGodDieUI();
                }
                return GameGodDieUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameGodDieUI.prototype.enter = function (battleScene, battleAttackHandler) {
            this._isShow = true;
            this.ui.btnHeig.scaleY = 1;
            this.ui.goddieGroup.visible = this._isShow;
            this.ui.imgRedPoint.visible = false;
            // this.OWNER_BLOOD_WIDTH = this.ui.belongBlood.width;
            this._userPlayerVO = GameModels.user.player;
            this.ui.bloodGroup.visible = false;
            this.ui.btnAttack.visible = false;
            this.ui.haveGrp.visible = false;
            this.ui.labgoddieCount.visible = false;
            this._battleAttackHandler = battleAttackHandler;
            this._battleScene = GameModels.sceneGodDie;
            this.ui.listAttacker.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            GameModels.sceneGodDie.addEventListener(mo.ModelSceneGodDie.GET_INFO, this.updateBossInfo, this);
            GameModels.sceneGodDie.onAttacksChange(this, this.updateAttkList);
            this.ui.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rewardHandler, this);
            this.ui.btnAttack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.attackTouchHandler, this);
            for (var i = 0; i < this._bossHeadList.length; i++) {
                this._bossHeadList[this._bossHeadList.length - 1].visible = false;
                this._bossHeadList[i].enableHandler();
            }
            this.ui.btnJiangxing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnShenmi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnMeiRi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnTeQuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnShengZhi1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnJiFen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnHeig.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnHelp1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            GameModels.sceneGodDie.addEventListener(mo.ModelSceneGodDie.SCORE_CHANGE, this.updataScore, this);
            GameModels.sceneGodDie.addEventListener(mo.ModelSceneGodDie.LEFT_CHANGE, this.showLeftCount, this);
            this.ui.listAttacker.dataProvider = GameModels.sceneGodDie.attackersCollection;
            this.updateBossInfo();
            this.showLeftCount();
        };
        GameGodDieUI.prototype.exit = function () {
            if (this._curBossVO) {
                this._curBossVO.offTargetChange(this, this.curBossTargetChangeHandler);
            }
            if (this._curOwnerVO) {
                //this._curOwnerVO.offPropertyChange(TypeProperty.HP, this, this.ownerHpChangeHandler);
                //this._curOwnerVO.offPropertyChange(TypeProperty.MaxHP, this, this.ownerHpChangeHandler);
                this._curOwnerVO.offTeamHpChange(this, this.ownerHpChangeHandler);
                this._curOwnerVO.offTeamDead(this, this.showBossInfo);
            }
            GameModels.sceneGodDie.offAttacksChange(this, this.updateAttkList);
            this.ui.listAttacker.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            GameModels.sceneGodDie.removeEventListener(mo.ModelSceneGodDie.GET_INFO, this.updateBossInfo, this);
            if (this.ui.btnReward)
                this.ui.btnReward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rewardHandler, this);
            this.ui.btnAttack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.attackTouchHandler, this);
            this.ui.btnJiangxing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnShenmi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnMeiRi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnTeQuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnShengZhi1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnJiFen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnHeig.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            this.ui.btnHelp1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGoddieClick, this);
            GameModels.sceneGodDie.removeEventListener(mo.ModelSceneGodDie.SCORE_CHANGE, this.updataScore, this);
            GameModels.sceneGodDie.removeEventListener(mo.ModelSceneGodDie.LEFT_CHANGE, this.showLeftCount, this);
            for (var i = 0; i < this._bossHeadList.length; i++) {
                this._bossHeadList[i].disableHandler();
            }
            this._battleScene = null;
            this._curBossVO = null;
            this._userPlayerVO = null;
            this.ui.ownerGroup.visible = true;
            this.ui.btnAttack.visible = true;
            // this.ui.belongBlood.width=this.OWNER_BLOOD_WIDTH;
        };
        GameGodDieUI.prototype.showLeftCount = function () {
            this.ui.labgoddieCount.text = GameModels.sceneGodDie.leftCount + "/" + 5;
            this.ui.labgoddieCount.textColor = GameModels.sceneGodDie.leftCount > 0 ? 0x00ff00 : 0xff0000;
        };
        GameGodDieUI.prototype.btnGoddieClick = function (e) {
            if (e.currentTarget == this.ui.btnJiangxing) {
                mg.uiManager.show(treasure.TreasureMain, { tabIndex: 0 });
            }
            else if (e.currentTarget == this.ui.btnShenmi) {
                mg.uiManager.show(MallScene, { tabIndex: 1 });
            }
            else if (e.currentTarget == this.ui.btnMeiRi) {
                mg.uiManager.show(dialog.activity.sgDailyActivityMainDialog);
            }
            else if (e.currentTarget == this.ui.btnTeQuan) {
                mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1 });
            }
            else if (e.currentTarget == this.ui.btnShengZhi1) {
                mg.uiManager.show(pet.PetGroupMain);
            }
            else if (e.currentTarget == this.ui.btnJiFen) {
                mg.alertManager.showAlert(GodDieBossReward, true, true);
            }
            else if (e.currentTarget == this.ui.btnHelp1) {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 6001).des);
            }
            else {
                this._isShow = !this._isShow;
                this.ui.btnHeig.scaleY = this._isShow ? 1 : -1;
                this.ui.goddieGroup.visible = this._isShow;
            }
        };
        GameGodDieUI.prototype.updateBossInfo = function () {
            var dataArr = GameModels.sceneGodDie.bossList;
            for (var i = 0; i < this._bossHeadList.length; i++) {
                if (dataArr[i + GameModels.sceneGodDie.copyId * 6]) {
                    this._bossHeadList[i].initializeData(dataArr[i + GameModels.sceneGodDie.copyId * 6]);
                }
            }
            this.updataScore();
        };
        GameGodDieUI.prototype.updataScore = function () {
            this.ui.imgRedPoint.visible = GameModels.sceneGodDie.redPoint;
            if (GameModels.sceneGodDie.allFinsh) {
                this.ui.labJiFen.text = GameModels.sceneGodDie.score + "/" + GameModels.sceneGodDie.rewardArr[GameModels.sceneGodDie.rewardArr.length - 1].value;
            }
            else {
                var count = GameModels.sceneGodDie.rewardArr[0].value;
                for (var i = 0; i < GameModels.sceneGodDie.rewardArr.length; i++) {
                    if (GameModels.sceneGodDie.step.indexOf(GameModels.sceneGodDie.rewardArr[i].id) == -1) {
                        count = GameModels.sceneGodDie.rewardArr[i].value;
                        break;
                    }
                }
                this.ui.labJiFen.text = GameModels.sceneGodDie.score + "/" + count;
            }
        };
        GameGodDieUI.prototype.barLabelFunction = function (value, maximum) {
            return value + " / " + 100;
        };
        /**显示BOSS信息，血条 */
        GameGodDieUI.prototype.showBossInfo = function (bossVO) {
            if (this._curBossVO == bossVO)
                return;
            if (this._curBossVO) {
                this._curBossVO.offTargetChange(this, this.curBossTargetChangeHandler);
            }
            this._curBossVO = bossVO;
            if (this._curBossVO) {
                this.ui.showBossBlood(this._curBossVO);
                this._curBossVO.onTargetChange(this, this.curBossTargetChangeHandler);
                this.curBossTargetChangeHandler();
                this.ui.btnAttack.visible = true;
                this.ui.haveGrp.visible = true;
            }
            else {
                this.ui.hideBossBlood();
                this.ui.btnAttack.visible = false;
                this.ui.haveGrp.visible = false;
                this.curBossTargetChangeHandler();
            }
        };
        GameGodDieUI.prototype.curBossTargetChangeHandler = function () {
            this.updateOwner(this._curBossVO ? this._curBossVO.target : null);
        };
        /**刷新攻击按钮显示 */
        GameGodDieUI.prototype.updateAttackDisplay = function () {
            if (!this._curOwnerVO) {
                this.ui.btnAttack.alpha = 0.8;
                this.ui.btnAttack.enabled = false;
                this.ui.btnAttack.label = Language.Z_WU;
                this.ui.haveGrp.visible = false;
                this.ui.labWho.text = Language.Z_WU;
                return;
            }
            if (this._userPlayerVO == this._curOwnerVO) {
                //自己
                this.ui.btnAttack.alpha = 0.8;
                this.ui.btnAttack.enabled = false;
                this.ui.btnAttack.label = Language.C_WSGSZ;
                this.ui.labWho.text = Language.Z_WO;
                return;
            }
            if (this._userPlayerVO.target == this._curOwnerVO) {
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
        /**刷新归属者显示 */
        GameGodDieUI.prototype.updateOwner = function (ownerVO) {
            if (this._curOwnerVO) {
                //this._curOwnerVO.offPropertyChange(TypeProperty.HP, this, this.ownerHpChangeHandler);
                //this._curOwnerVO.offPropertyChange(TypeProperty.MaxHP, this, this.ownerHpChangeHandler);
                this._curOwnerVO.offTeamHpChange(this, this.ownerHpChangeHandler);
                this.ui.belongName.text = "";
            }
            this._curOwnerVO = ownerVO;
            if (this._curOwnerVO) {
                this.ui.ownerGroup.visible = true;
                var isSameLegoin = (this._curOwnerVO != GameModels.user.player && this._curOwnerVO.legionId == GameModels.user.player.legionId && GameModels.user.player.legionId != "");
                this.ui.belongName.text = this._curOwnerVO.name + (isSameLegoin ? "(" + Language.C_TJT + ")" : "");
                this.ui.belongHead.source = ResPath.getPlayerIconSmall(this._curOwnerVO.headIcon);
                this.ui.imgSameLegoin.visible = this._curOwnerVO.legionId ? true : false;
                this.ui.imgSameLegoin.source = "common_json.img_union_point" + this._curOwnerVO.legionId + "_png";
                //this.ui.imgSameLegoin.visible = isSameLegoin;
                //this._curOwnerVO.onPropertyChange(TypeProperty.HP, this, this.ownerHpChangeHandler);
                //this._curOwnerVO.onPropertyChange(TypeProperty.MaxHP, this, this.ownerHpChangeHandler);
                this._curOwnerVO.onTeamHpChange(this, this.ownerHpChangeHandler);
                this._curOwnerVO.onTeamDead(this, this.showBossInfo, null);
                this.ownerHpChangeHandler();
            }
            else {
                this.ui.ownerGroup.visible = false;
            }
            this.updateAttackDisplay();
        };
        /**血条刷新 */
        GameGodDieUI.prototype.ownerHpChangeHandler = function () {
            if (!this._curOwnerVO)
                return;
            this.ui.belongBlood.width = this._curOwnerVO.getTeamHp() / this._curOwnerVO.getTeamHpMax() * this.OWNER_BLOOD_WIDTH;
        };
        GameGodDieUI.prototype.attackTouchHandler = function (e) {
            if (!this._curOwnerVO)
                return;
            var playerVO = this._curOwnerVO;
            this.attackPlayerHandler(playerVO);
        };
        GameGodDieUI.prototype.attackPlayerHandler = function (playerVO) {
            if (!playerVO || (playerVO && playerVO.uid == GameModels.user.player.uid))
                return;
            if (GameModels.user.player.target) {
                if (GameModels.user.player.target == playerVO) {
                    mg.alertManager.tip(Language.J_ZZTZGWJ);
                    return;
                }
            }
            GameModels.sceneGodDie.syncTarget(playerVO);
        };
        //添加奖励监听事件
        GameGodDieUI.prototype.rewardHandler = function (e) {
            if (this._curBossVO) {
                var bossData = GameModels.sceneGodDie.getMonsterData(this._curBossVO.configId);
                if (!bossData)
                    return;
                var list = bossData.parm1.split(";");
                mg.alertManager.showAlert(GodDiePreviewAlert, true, true, bossData.parm1);
            }
        };
        GameGodDieUI.prototype.updateAttkList = function () {
            this.ui.listAttacker.dataProvider = GameModels.sceneGodDie.attackersCollection;
        };
        GameGodDieUI.prototype.listItemTapHandler = function (e) {
            var playerVO = e.item;
            if (!playerVO || (playerVO && playerVO.uid == GameModels.user.player.uid))
                return;
            if (GameModels.user.player.target) {
                if (GameModels.user.player.target.type == TypeActor.PLAYER) {
                    if (GameModels.user.player.target == playerVO) {
                        mg.alertManager.tip(Language.J_ZZTZGWJ);
                        return;
                    }
                }
            }
            if (playerVO.isTeamAllDead) {
                mg.alertManager.tip(Language.J_GWJYSW);
                return;
            }
            if (this._battleAttackHandler) {
                this._battleAttackHandler.runWith(playerVO);
            }
        };
        return GameGodDieUI;
    }(copy.GameUIBase));
    copy.GameGodDieUI = GameGodDieUI;
    __reflect(GameGodDieUI.prototype, "copy.GameGodDieUI");
})(copy || (copy = {}));
