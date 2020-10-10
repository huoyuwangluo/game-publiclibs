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
    var activity;
    (function (activity) {
        var oneYuanBuyDialog = (function (_super) {
            __extends(oneYuanBuyDialog, _super);
            function oneYuanBuyDialog() {
                var _this = _super.call(this) || this;
                _this._hongYanRefId = [4, 9, 15, 20];
                return _this;
            }
            oneYuanBuyDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            oneYuanBuyDialog.prototype.enter = function (data) {
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceiveClick, this);
                this.showView();
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                this.skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
            };
            oneYuanBuyDialog.prototype.showView = function () {
                this.btnReceive.visible = false;
                this.getVipBox.visible = false;
                var hyVo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.yyqg);
                if (hyVo) {
                    var lastMs = GameModels.sgActivity.getLastDateSec(hyVo.actCfgId) * 0.001 >> 0;
                    this.labTime.text = Language.getExpression(Language.E_1HJS, utils.DateUtil.formatTimeLeftInChinese(lastMs));
                    var qArr = hyVo.actRewardListVO;
                    var isHashYYQG = true;
                    for (var i = 0; i < qArr.length; i++) {
                        if (qArr[i].getTimes <= 0) {
                            this._currData = qArr[i];
                            this.imgbg.source = "img_sg_oneyuan_bg" + i + "_png";
                            isHashYYQG = false;
                            this.btnReceive.visible = true;
                            if (hyVo.hashMyValueStr(qArr[i].rewardCfgId.toString())) {
                                this.btnReceive.source = "img_sg_oneyuan_reward_png";
                            }
                            else {
                                this.btnReceive.source = "btnMoney_json.btn_sg_chongzhi_" + this._currData.rmb;
                            }
                            var hongYanTmp = Templates.getTemplateById(templates.Map.HONGYAN, this._hongYanRefId[i]);
                            if (hongYanTmp) {
                                var skillVo = vo.fromPool(vo.SkillVO);
                                skillVo.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, hongYanTmp.skillId), 0);
                                this.skill.dataSource = skillVo;
                            }
                            break;
                        }
                    }
                    if (isHashYYQG)
                        mg.uiManager.remove(this);
                }
            };
            oneYuanBuyDialog.prototype.onReceiveClick = function (e) {
                var _this = this;
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.yyqg);
                if (!this._currData)
                    return;
                if (vo.hashMyValueStr(this._currData.rewardCfgId.toString())) {
                    if (this._currData.getTimes <= 0) {
                        if (utils.CheckUtil.checkBagSmelting())
                            return;
                        GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, this._currData.rewardCfgId, 0, utils.Handler.create(this, function () {
                            mg.alertManager.tip(Language.C_LQCG);
                            mg.uiManager.remove(_this);
                        }));
                    }
                }
                else {
                    this.btnReceive.visible = true;
                    this.btnReceive.source = "btnMoney_json.btn_sg_chongzhi_" + this._currData.rmb;
                    GameModels.platform.buy(this._currData.rmb, 1, "" + this._currData.template.id, this._currData.template.name, this._currData.template.des);
                }
            };
            oneYuanBuyDialog.prototype.onSkillClick = function (e) {
                mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this.skill.dataSource);
            };
            oneYuanBuyDialog.prototype.exit = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceiveClick, this);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
                this.skill.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillClick, this);
            };
            oneYuanBuyDialog.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            return oneYuanBuyDialog;
        }(ui.oneYuanBuyDialogSkin));
        activity.oneYuanBuyDialog = oneYuanBuyDialog;
        __reflect(oneYuanBuyDialog.prototype, "dialog.activity.oneYuanBuyDialog");
    })(activity = dialog.activity || (dialog.activity = {}));
})(dialog || (dialog = {}));
