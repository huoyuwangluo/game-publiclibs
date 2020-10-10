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
var dialog;
(function (dialog) {
    var WenGuan;
    (function (WenGuan) {
        var CampChallenge = (function (_super) {
            __extends(CampChallenge, _super);
            function CampChallenge() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.colorarry = [0xfbdfa1, 0xbe39f6, 0x51b3fe];
                return _this;
            }
            CampChallenge.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._renderers = [];
                for (var i = 0; i < 3; i++) {
                    this._renderers.push(this["box" + i]);
                }
            };
            CampChallenge.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this._startTime = 0;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            CampChallenge.prototype.destory = function () {
                _super.prototype.destory.call(this);
                if (this._renderers) {
                    this._renderers.length = 0;
                    this._renderers = null;
                }
            };
            CampChallenge.prototype.enter = function (data) {
                this._count = 0;
                this._angle = 0;
                GameModels.legion.isOpenWuGuanView = true;
                this.btn_tz.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btn_refresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnMoney.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnFirstGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                GameModels.legion.addEventListener(mo.ModelLegion.CHANGE_UNION_FENGLU, this.showView, this);
                GameModels.legion.addEventListener(mo.ModelLegion.UNION_FIRSTGIFT, this.showView, this);
                this.imgJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHander, this);
                GameModels.scene.onJoinScene(this, this.updataJoinFightState);
                this.updataJoinFightState();
                GameModels.legion.updateMiliary(utils.Handler.create(this, function () {
                    this.showView();
                }));
            };
            CampChallenge.prototype.exit = function () {
                this._count = 0;
                this._angle = 0;
                egret.Tween.removeTweens(this.imgPreBg);
                this.btn_tz.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btn_refresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.btnMoney.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                GameModels.legion.removeEventListener(mo.ModelLegion.UNION_FIRSTGIFT, this.showView, this);
                this.btnFirstGift.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                GameModels.legion.removeEventListener(mo.ModelLegion.CHANGE_UNION_FENGLU, this.showView, this);
                this.imgJoin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoinHander, this);
                GameModels.scene.offJoinScene();
            };
            CampChallenge.prototype.onJoinHander = function () {
                mg.uiManager.removeAllDialogs();
                app.gameContext.enterWuGuanFight();
            };
            CampChallenge.prototype.updataJoinFightState = function () {
                if (GameModels.scene.getjoinSceneListByType(TypeGame.WUGUAN_FIGHT)) {
                    this.imgJoin.visible = true;
                    this.btn_tz.visible = false;
                }
                else {
                    this.imgJoin.visible = false;
                    this.btn_tz.visible = true;
                }
            };
            CampChallenge.prototype.updataRefreshBtn = function () {
                if (GameModels.legion.SelfInfo.Step <= 4 || GameModels.legion.EnemyInfo.MonsterId > 0) {
                    this.btn_refresh.visible = false;
                    this.consumeGroup.visible = false;
                }
                else {
                    this.btn_refresh.visible = true;
                    this.consumeGroup.visible = true;
                }
            };
            CampChallenge.prototype.onTabClick = function (e) {
                switch (e.target) {
                    case this.btn_tz:
                        if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.WUGUAN_TIAOZHAN) {
                            GameModels.task.requestSubmit();
                        }
                        // app.gameContext.enterWuGuanFight();
                        mg.alertManager.showAlert(PrewarEmbattle, true, true, 4, null);
                        break;
                    case this.btn_refresh:
                        if (GameModels.user.player.diamonds >= 20) {
                            GameModels.legion.updateEnemy(utils.Handler.create(this, function () {
                                this.otherpeople();
                                this.showConsume();
                                this.updataRefreshBtn();
                            }));
                        }
                        else {
                            mg.alertManager.tip(Language.J_MSBZ);
                        }
                        break;
                    case this.imgHelp:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 3801).des);
                        break;
                    case this.btnMoney:
                        mg.uiManager.show(dialog.WenGuan.CampSalary);
                        break;
                    case this.btnFirstGift:
                        mg.alertManager.showAlert(CampFirstImperatorGiftAlert, true, true);
                        break;
                }
            };
            CampChallenge.prototype.tweenPreviewImgHandler = function () {
                this._count++;
                this._angle = this._count * 360;
                egret.Tween.get(this.imgPreBg).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
            };
            CampChallenge.prototype.showView = function () {
                this.imgPreBg.visible = GameModels.legion.firstRewardFlag < 2;
                this.btnFirstGift.visible = GameModels.legion.firstRewardFlag < 2;
                this.btnFirstGift.isWarn = GameModels.legion.firstRewardFlag == 1;
                egret.Tween.removeTweens(this.imgPreBg);
                this.tweenPreviewImgHandler();
                this.btnMoney.isWarn = GameModels.legion.LastStep > 0;
                var itmes = GameModels.legion.TopThreeList;
                for (var i = 0; i < itmes.length; i++) {
                    if (itmes[i]) {
                        this._renderers[i].updata(itmes[i]);
                    }
                }
                this.myself.updata(GameModels.legion.SelfInfo);
                var data = GameModels.legion.SelfInfo;
                var wuguandata = Templates.getTemplateByProperty(templates.Map.CAMPWU, "step", data.Step);
                var reword = wuguandata.rewards.split(";")[0];
                var item = Templates.getTemplateById(templates.Map.ITEM, parseInt(reword.split("_")[0]));
                this.icon0.source = item.icon;
                this.labSalarynum0.text = reword.split("_")[1] + Language.C_MS;
                this.otherpeople();
                this.showConsume();
                this.updataRefreshBtn();
            };
            //对手信息处理
            CampChallenge.prototype.otherpeople = function () {
                this.EnemyGroup.visible = false;
                this.SelfGroup.visible = false;
                this.labMax.visible = true;
                var otherdata = GameModels.legion.EnemyInfo;
                if (GameModels.legion.SelfInfo.Step <= 1)
                    return;
                if (otherdata.PlayerId == "" && otherdata.MonsterId <= 0)
                    return;
                this.EnemyGroup.visible = true;
                this.SelfGroup.visible = true;
                this.labMax.visible = false;
                var temp = Templates.getTemplateById(templates.Map.OTHERMONSTER, otherdata.MonsterId);
                this.labName.text = temp ? temp.name : otherdata.PlayerName;
                this.img_office.source = "military_json.office_" + otherdata.Step;
                this.lablv.text = temp ? temp.lv + "" : otherdata.PlayerLevel + "";
                this.labFight.text = temp ? utils.htmlUtil.computeModelTatolFighting(temp.properties).toString() : otherdata.FightPower + "";
                this.imgHead.source = temp ? ResPath.getPetIconSmall(temp.resId) : ResPath.getPlayerIconSmall(otherdata.HeadIcon);
                var wuguandata = Templates.getTemplateByProperty(templates.Map.CAMPWU, "step", otherdata.Step);
                this.lable_position.text = wuguandata.name;
                this.lable_position.textColor = otherdata.Step > 3 ? 0xd3d3d3 : this.colorarry[otherdata.Step - 1];
                var item = Templates.getTemplateById(templates.Map.ITEM, parseInt(wuguandata.consume.split("_")[0]));
                var reword = wuguandata.rewards.split(";")[0];
                var item = Templates.getTemplateById(templates.Map.ITEM, parseInt(reword.split("_")[0]));
                this.icon.source = item.icon;
                this.labSalarynum.text = reword.split("_")[1] + Language.C_MS;
            };
            //刷新消耗处理
            CampChallenge.prototype.showConsume = function () {
                var str = [];
                this.labNeed.text = Language.getExpression(Language.E_1MS, Language.C_XH);
                this.labCount.text = GameModels.user.player.diamonds + "/" + "20";
                if (GameModels.user.player.diamonds >= 20) {
                    this.labCount.textColor = 0x00ff00;
                }
                else {
                    this.labCount.textColor = 0xff0000;
                }
            };
            return CampChallenge;
        }(ui.CampChallengeSkin));
        WenGuan.CampChallenge = CampChallenge;
        __reflect(CampChallenge.prototype, "dialog.WenGuan.CampChallenge");
    })(WenGuan = dialog.WenGuan || (dialog.WenGuan = {}));
})(dialog || (dialog = {}));
